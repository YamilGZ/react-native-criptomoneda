import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Header, Formulario } from './src/components';

const App = () => {
  return (
    <>
      <Header />

      <Image 
        style={styles.imagen}
        source={require('./assets/img/cryptomonedas.png')}
      />

      <View style={styles.contenido}>
        <Formulario />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contenido: {
    marginHorizontal: '2.5%'
  },
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '1%'
  },
});

export default App;
