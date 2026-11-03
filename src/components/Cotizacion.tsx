import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { ResultadoCotizacion } from '../../App';

interface CotizacionProps {
  resultado: ResultadoCotizacion | null;
}

export const Cotizacion = ({ resultado }: CotizacionProps) => {
  if (!resultado) {
    return null;
  }

  const { current_price, high_24h, low_24h, price_change_percentage_24h, last_updated } = resultado;

  return (
    <View style={styles.resultado}>
      <Text style={[styles.texto, styles.precio]}>
        <Text style={styles.span}>{current_price.toLocaleString()}</Text>
      </Text>
      <Text style={styles.texto}>
        Precio más alto del día:{' '}
        <Text style={styles.span}>{high_24h.toLocaleString()}</Text>
      </Text>
      <Text style={styles.texto}>
        Precio más bajo del día:{' '}
        <Text style={styles.span}>{low_24h.toLocaleString()}</Text>
      </Text>
      <Text style={styles.texto}>
        Variación últimas 24 horas:{' '}
        <Text
          style={[
            styles.span,
            price_change_percentage_24h >= 0 ? styles.alza : styles.baja,
          ]}>
          {price_change_percentage_24h.toFixed(2)}%
        </Text>
      </Text>
      <Text style={styles.texto}>
        Última Actualización:{' '}
        <Text style={styles.span}>
          {new Date(last_updated).toLocaleString('es-ES', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })}
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  resultado: {
    backgroundColor: '#5E49E2',
    padding: 20,
  },
  texto: {
    color: '#FFF',
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  precio: {
    fontSize: 38,
    textAlign: 'center',
  },
  span: {
    fontFamily: 'Lato-Black',
  },
  alza: {
    color: '#7CFC00',
  },
  baja: {
    color: '#FF4500',
  },
});
