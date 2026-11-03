import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Cotizacion = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Cotización</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  texto: {
    fontSize: 18,
  },
});
