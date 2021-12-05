import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './Header';

export default function App() {
  return (
    <React.Fragment>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Hello World!</Text>
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#474A51',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black'
  }
});