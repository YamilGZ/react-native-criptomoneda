import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

export const Header = () => {
  return (
      <Text style={styles.encabezado}>Criptomonedas</Text>
  );
};

const styles = StyleSheet.create({
  encabezado: {
    paddingTop: 50,
    fontFamily: 'Lato-Black',
    backgroundColor: '#5e49e2',
    paddingBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 20,
    color: '#fff',
    marginBottom: 30
  },
});
