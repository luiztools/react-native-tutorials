import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { Input, Text } from 'react-native-elements';
import { Feather as Icon } from '@expo/vector-icons';

export default function App() {

  const [text, setText] = useState('BTCUSDT');
  const [symbol, setSymbol] = useState('btcusdt')
  const [data, setData] = useState({});

  const { lastJsonMessage } = useWebSocket(`wss://stream.binance.com:9443/ws/${symbol}@ticker`, {
    onOpen: () => { },
    onMessage: () => {
      if (lastJsonMessage) {
        setData({
          priceChange: parseFloat(lastJsonMessage.p),
          priceChangePercent: parseFloat(lastJsonMessage.P),
          open: lastJsonMessage.o,
          close: lastJsonMessage.c,
          high: lastJsonMessage.h,
          low: lastJsonMessage.l,
          numberOfTrades: lastJsonMessage.n,
          quoteVolume: lastJsonMessage.q,
          baseVolume: lastJsonMessage.v
        });
      }
    },
    onError: (event) => console.error(event),
    shouldReconnect: (closeEvent) => true,
    reconnectInterval: 3000
  });

  function getSignal(value) {
    return value >= 0 ? `+${value}` : value;
  }

  const searchButton = <Icon.Button
    name="search"
    size={24}
    color='black'
    backgroundColor='transparent'
    onPress={evt => setSymbol(text.toLowerCase())} />;

  return (
    <View style={{ flexDirection: 'column', marginTop: 40, margin: 20, alignContent: 'center' }}>
      <Text h1>CryptoWatch 1.0</Text>
      <Input
        title="Digite o par de moedas."
        autoCapitalize='characters'
        leftIcon={<Icon name='dollar-sign' size={24} color='black' />}
        value={text}
        rightIcon={searchButton}
        onChangeText={txt => setText(txt.toUpperCase())} />
      <View style={styles.line}>
        <Text style={styles.bold}>Preço Atual: </Text>
        <Text>{data.close}</Text>
      </View>
      <View style={styles.line}>
        <Text style={styles.bold}>Alteração: </Text>
        <Text>{getSignal(data.priceChange)} ({getSignal(data.priceChangePercent)}%)</Text>
      </View>
      <View style={styles.line}>
        <Text style={styles.bold}>Máxima 24h: </Text>
        <Text>{data.high}</Text>
      </View>
      <View style={styles.line}>
        <Text style={styles.bold}>Mínima 24h: </Text>
        <Text>{data.low}</Text>
      </View>
      <View style={styles.line}>
        <Text style={styles.bold}>Trades: </Text>
        <Text>{data.numberOfTrades}</Text>
      </View>
      <View style={styles.line}>
        <Text style={styles.bold}>Volume: </Text>
        <Text>{data.quoteVolume}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    flexDirection: 'row',
    width: '100%',
    marginHorizontal: 10,
    marginVertical: 10
  },
  bold: {
    fontWeight: 'bold'
  }
})