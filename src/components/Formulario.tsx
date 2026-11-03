import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

interface Criptomoneda {
  id: string;
  symbol: string;
  name: string;
}

export const Formulario = () => {
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [criptomonedas, guardarCriptomonedas] = useState<Criptomoneda[]>([]);
  const [cargando, guardarCargando] = useState(true);

  useEffect (() => {
    const consultarAPI = async () => {
      const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1'
      try {
        const resultado = await axios.get<Criptomoneda[]>(url);
        guardarCriptomonedas(resultado.data)
      } catch (error) {
        console.error('Error al consultar CoinGecko:', error);
      } finally {
        guardarCargando(false);
      }
    }
    consultarAPI();
  }, [])

  const obtenerMoneda = (valor: string) => {
    guardarMoneda(valor);
  };

  const obtenerCriptomoneda = (valor: string) => {
    guardarCriptomoneda(valor);
  };

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>

      <Picker
        onValueChange={(valor: string) => obtenerMoneda(valor)}
        selectedValue={moneda}>
        <Picker.Item label="- Seleccione -" value="" />
        <Picker.Item label="Dolar de Estados Unidos" value="USD" />
        <Picker.Item label="Peso Mexicano" value="MXN" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra Esterlina" value="GBP" />
      </Picker>

      <Text style={styles.label}>Criptomoneda</Text>

      {cargando ? (
        <ActivityIndicator size="large" color="#5e49e2" />
      ) : (
        <Picker
          onValueChange={(valor: string) => obtenerCriptomoneda(valor)}
          selectedValue={criptomoneda}>
          <Picker.Item label="- Seleccione -" value="" />
          {criptomonedas.map(cripto => (
            <Picker.Item
              key={cripto.id}
              label={`${cripto.name} (${cripto.symbol.toUpperCase()})`}
              value={cripto.symbol.toUpperCase()}
            />
          ))}
        </Picker>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontSize: 22,
    marginVertical: 20,
  },
});
