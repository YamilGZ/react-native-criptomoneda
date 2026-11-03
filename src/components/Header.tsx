import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

/**
 * Header de la aplicación.
 * Muestra el título "Criptomonedas" con la fuente local Lato-Black
 * y un padding superior diferente según la plataforma (iOS/Android).
 */
export const Header = () => {
  return (
    <View>
      <Text style={styles.encabezado}>Criptomonedas</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  encabezado: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30, // Mayor padding en iOS por el notch.
    fontFamily: 'Lato-Black',
    backgroundColor: '#5e49e2',
    paddingBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 20,
    color: '#fff',
    marginBottom: 30,
  },
});
