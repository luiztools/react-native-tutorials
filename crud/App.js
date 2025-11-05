import { StatusBar } from 'expo-status-bar';

import AppTab from './AppTab';

export default function App() {
  return (
    <>
      <AppTab />
      <StatusBar style="light" />
    </>
  );
}