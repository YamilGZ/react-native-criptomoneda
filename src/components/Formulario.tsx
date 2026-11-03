import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Formulario = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Formulario</Text>
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
