import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { formatearCantidad } from '../helpers';
import type { ResultadoCotizacion } from '../../App';

/**
 * Props del componente Cotizacion.
 */
interface CotizacionProps {
  resultado: ResultadoCotizacion | null; // Datos de la cotización obtenidos de CoinGecko.
  moneda: string;                         // Código ISO de la moneda fiduciaria seleccionada.
}

/**
 * Muestra el resultado de la cotización de una criptomoneda:
 * logo, nombre, precio actual, precios alto/bajo del día,
 * variación porcentual 24h y última actualización.
 */
export const Cotizacion = ({ resultado, moneda }: CotizacionProps) => {
  // Si aún no hay resultado (usuario no cotizó), no se renderiza nada.
  if (!resultado) {
    return null;
  }

  const {
    name,
    symbol,
    current_price,
    high_24h,
    low_24h,
    price_change_percentage_24h,
    last_updated,
    image,
  } = resultado;

  // Fallback a USD por si la prop llega vacía.
  const monedaSeleccionada = moneda || 'USD';

  return (
    <View style={styles.resultado}>
      {/** Logo de la criptomoneda */}
      {image ? <Image source={{ uri: image }} style={styles.logo} /> : null}

      {/** Nombre y símbolo */}
      <Text style={[styles.texto, styles.titulo]}>
        {name} ({symbol.toUpperCase()})
      </Text>

      {/** Precio actual formateado como moneda */}
      <Text style={[styles.texto, styles.precio]}>
        <Text style={styles.span}>
          {formatearCantidad(current_price, monedaSeleccionada)}
        </Text>
      </Text>

      {/** Precio más alto del día */}
      <Text style={styles.texto}>
        Precio más alto del día:{' '}
        <Text style={styles.span}>
          {formatearCantidad(high_24h, monedaSeleccionada)}
        </Text>
      </Text>

      {/** Precio más bajo del día */}
      <Text style={styles.texto}>
        Precio más bajo del día:{' '}
        <Text style={styles.span}>
          {formatearCantidad(low_24h, monedaSeleccionada)}
        </Text>
      </Text>

      {/** Variación porcentual con color según alza o baja */}
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

      {/** Última actualización formateada a 24h sin segundos */}
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
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  titulo: {
    fontFamily: 'Lato-Black',
    fontSize: 20,
    textTransform: 'uppercase',
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
    color: '#7CFC00', // Verde para alza.
  },
  baja: {
    color: '#FF4500', // Rojo/naranja para baja.
  },
});
