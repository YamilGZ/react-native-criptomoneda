import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { ResultadoCotizacion } from '../../App';

interface CotizacionProps {
  resultado: ResultadoCotizacion;
}

export const Cotizacion = ({ resultado }: CotizacionProps) => {
  const { name, symbol, current_price, market_cap, total_volume, price_change_percentage_24h, image } = resultado;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {image ? <Image source={{ uri: image }} style={styles.logo} /> : null}
        <Text style={styles.titulo}>{name} ({symbol.toUpperCase()})</Text>
        <Text style={styles.precio}>
          Precio actual: <Text style={styles.valor}>{current_price.toLocaleString()} USD</Text>
        </Text>
        <Text style={styles.texto}>
          Cap. de mercado: <Text style={styles.valor}>{market_cap.toLocaleString()}</Text>
        </Text>
        <Text style={styles.texto}>
          Volumen 24h: <Text style={styles.valor}>{total_volume.toLocaleString()}</Text>
        </Text>
        <Text style={styles.texto}>
          Variación 24h: {' '}
          <Text
            style={[
              styles.valor,
              price_change_percentage_24h >= 0 ? styles.alza : styles.baja,
            ]}>
            {price_change_percentage_24h.toFixed(2)}%
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  card: {
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 64,
    height: 64,
    marginBottom: 12,
  },
  titulo: {
    fontSize: 22,
    fontFamily: 'Lato-Black',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  precio: {
    fontSize: 18,
    fontFamily: 'Lato-Black',
    marginBottom: 8,
  },
  texto: {
    fontSize: 16,
    marginBottom: 4,
    fontFamily: 'Lato-Regular',
  },
  valor: {
    fontFamily: 'Lato-Black',
  },
  alza: {
    color: '#28a745',
  },
  baja: {
    color: '#dc3545',
  },
});
