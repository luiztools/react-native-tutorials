import { StatusBar } from 'expo-status-bar';
import React from 'react';

import AppTab from './AppTab';

export default function App() {
  return (
    <>
      <AppTab />
      <StatusBar style="light" />
    </>
  );
}