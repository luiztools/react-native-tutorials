import { useEffect, useRef, useState } from "react";

/**
 * Hook genérico para conexão WebSocket com reconexão e controle de estado
 *
 * @param {string} url - URL completa do WebSocket
 * @param {object} options - Opções de configuração
 * @param {function} options.onMessage - Callback ao receber mensagem
 * @param {function} options.onOpen - Callback ao abrir conexão
 * @param {function} options.onError - Callback ao ocorrer erro
 * @param {function|boolean} options.shouldReconnect - Se deve reconectar automaticamente
 * @param {number} options.reconnectInterval - Intervalo entre reconexões (ms)
 * @param {number} options.maxRetries - Número máximo de tentativas de reconexão (-1 para ilimitado)
 */
export default function useWebSocket(url, options = {}) {
  const {
    onMessage,
    onOpen,
    onError,
    shouldReconnect = true,
    reconnectInterval = 3000,
    maxRetries = -1,
  } = options;

  const [lastMessage, setLastMessage] = useState(null);
  const [readyState, setReadyState] = useState("closed"); // 'connecting' | 'connected' | 'reconnecting' | 'closed'
  const [retryCount, setRetryCount] = useState(0);
  const wsRef = useRef(null);
  const reconnectTimeout = useRef(null);

  useEffect(() => {
    if (!url) return;

    let isMounted = true;

    const connect = () => {
      setReadyState(retryCount > 0 ? "reconnecting" : "connecting");
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        if (!isMounted) return;
        setReadyState("connected");
        setRetryCount(0);
        onOpen && onOpen();
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setLastMessage(data);
          onMessage && onMessage(data);
        } catch (err) {
          console.error("Erro ao processar mensagem WebSocket:", err);
        }
      };

      ws.onerror = (err) => {
        console.error("WebSocket erro:", err.message || err);
        onError && onError(err);
      };

      ws.onclose = () => {
        if (!isMounted) return;
        setReadyState("closed");

        const reconnect =
          typeof shouldReconnect === "function"
            ? shouldReconnect()
            : shouldReconnect;

        if (reconnect && (maxRetries === -1 || retryCount < maxRetries)) {
          console.warn(
            `WebSocket desconectado. Tentando reconectar (${retryCount + 1})...`
          );
          reconnectTimeout.current = setTimeout(() => {
            setRetryCount((prev) => prev + 1);
            connect();
          }, reconnectInterval);
        }
      };
    };

    connect();

    return () => {
      isMounted = false;
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
      if (wsRef.current) wsRef.current.close();
    };
  }, [url]);

  const sendMessage = (msg) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const payload = typeof msg === "string" ? msg : JSON.stringify(msg);
      wsRef.current.send(payload);
    } else {
      console.warn("WebSocket não está aberto, mensagem não enviada.");
    }
  };

  return {
    sendMessage,
    lastMessage,
    readyState, // 'connecting' | 'connected' | 'reconnecting' | 'closed'
    retryCount,
  };
}
