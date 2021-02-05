import React, {useContext} from 'react';
import ConfigProvider from './Context.js';
import { StyleSheet, Text, View } from 'react-native';
import App from './App.js';

const Provider = ({pageProps}) => {
  return (
    <ConfigProvider>
      <App {...pageProps}/>
    </ConfigProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Provider;

