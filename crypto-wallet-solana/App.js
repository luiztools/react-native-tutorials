global.Buffer = require('buffer').Buffer;
import { TouchableOpacity, StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { createWallet, recoverWallet, getBalance, transfer } from "./WalletService";
import { useState } from 'react';

export default function App() {

  const [wallet, setWallet] = useState({});
  const [balance, setBalance] = useState("0");
  const [privateKey, setPrivateKey] = useState("41fPhfN4WguMaVep8meP533SBtphE9FBdtJp12bnvctALS2ZyPhbKYzS97KPeQAcgaqaz7SNaAp2zZAj4Kds4Hiq");
  const [newTransfer, setNewTransfer] = useState({
    to: "84DAeL8XrucYZuNX5m5y8h5tVDUPgQkYVcqGk4F43VGk",
    value: "0.001"
  })

  function btnCreateClick() {
    const kp = createWallet();
    setWallet(kp);
    // console.log(kp.publicKeyDecoded)
    // console.log(kp.secretKeyDecoded)
  }

  async function refreshBalance() {
    const balance = await getBalance();
    setBalance(`${balance.sol}`);
  }

  function btnRecoverClick() {
    const kp = recoverWallet(privateKey);
    setWallet(kp);
    refreshBalance();
  }

  function btnTransferClick() {
    transfer(newTransfer.to, parseFloat(newTransfer.value))
      .then(tx => {
        console.log(tx);
        Alert.alert(tx);
        refreshBalance();
      })
      .catch(err => console.error(err))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carteira Cripto</Text>
      <View style={styles.p}>
        {
          !wallet || !wallet.publicKeyDecoded
            ? (
              <>
                <TouchableOpacity onPress={btnCreateClick} style={styles.button}>
                  <Text style={styles.buttonText}>Criar Nova Carteira</Text>
                </TouchableOpacity>
                <Text>   Ou informe sua PK abaixo para recuperar:</Text>
                <TextInput
                  value={privateKey}
                  onChangeText={txt => setPrivateKey(txt)}
                  style={styles.input} />
                <TouchableOpacity onPress={btnRecoverClick} style={styles.button}>
                  <Text style={styles.buttonText}>Recuperar Carteira</Text>
                </TouchableOpacity>
              </>
            )
            : (
              <>
                <View style={styles.p}>
                  <Text>   {wallet.publicKeyDecoded}</Text>
                </View>
                <View style={styles.p}>
                  <Text style={styles.bold}>   Saldo: </Text>
                  <Text>   {balance} SOL</Text>
                </View>
                <View style={styles.p}>
                  <Text style={styles.bold}>   Destino:</Text>
                  <TextInput
                    value={newTransfer.to}
                    keyboardType='ascii-capable'
                    style={styles.input}
                    onChangeText={txt => setNewTransfer({ ...newTransfer, to: txt })} />
                </View>

                <View style={styles.p}>
                  <Text style={styles.bold}>   Valor:</Text>
                  <TextInput
                    value={newTransfer.value}
                    keyboardType='decimal-pad'
                    onChangeText={txt => setNewTransfer({ ...newTransfer, value: txt })}
                    style={styles.input}
                  />
                </View>
                <TouchableOpacity onPress={btnTransferClick} style={styles.button}>
                  <Text style={styles.buttonText}>Enviar SOL</Text>
                </TouchableOpacity>
              </>
            )
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold"
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 10
  },
  p: {
    marginBottom: 10,
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 10,
    margin: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
