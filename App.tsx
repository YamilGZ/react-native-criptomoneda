import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Header } from './src/components';

const App = () => {
  return (
    <>
      <Header />

      <Image 
        style={styles.imagen}
        source={require('./assets/img/cryptomonedas.png')}
      />
    </>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '1%'
  },
});

export default App;
