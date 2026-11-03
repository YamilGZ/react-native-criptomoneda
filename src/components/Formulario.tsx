import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

interface Criptomoneda {
  id: string;
  symbol: string;
  name: string;
}

interface FormularioProps {
  moneda: string;
  guardarMoneda: (valor: string) => void;
  criptomoneda: string;
  guardarCriptomoneda: (valor: string) => void;
  guardarConsultarAPI: (valor: boolean) => void;
}

export const Formulario = ({moneda, guardarMoneda, criptomoneda, guardarCriptomoneda, guardarConsultarAPI}: FormularioProps) => {

  const [criptomonedas, guardarCriptomonedas] = useState<Criptomoneda[]>([]);

  useEffect (() => {
    const consultarAPI = async () => {
      const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1'
      try {
        const resultado = await axios.get<Criptomoneda[]>(url);
        guardarCriptomonedas(resultado.data)
      } catch (error) {
        console.error('Error al consultar CoinGecko:', error);
      }
    }
    consultarAPI();
  }, [])

  // Almacena las selecciones del usuario
  const obtenerMoneda = (valor: string) => {
    guardarMoneda(valor);
  };

  const obtenerCriptomoneda = (valor: string) => {
    guardarCriptomoneda(valor);
  };

  const cotizarPrecio = () => {
    if (moneda.trim() === '' || criptomoneda.trim() === '') {
      mostrarAlerta()
      return;
    }

    // cambiar el state de consultar api
    guardarConsultarAPI(true)

  }

  const mostrarAlerta = () => {
    Alert.alert(
      'Error...',
      'Ambos campos son obligatorios',
      [
        {text: 'OK'}
      ]
    )
  }

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

        <Picker
          onValueChange={(valor: string) => obtenerCriptomoneda(valor)}
          selectedValue={criptomoneda}>
          <Picker.Item label="- Seleccione -" value="" />
          {criptomonedas.map(cripto => (
            <Picker.Item
              key={cripto.id}
              label={`${cripto.name} (${cripto.symbol.toUpperCase()})`}
              value={cripto.id}
            />
          ))}
        </Picker>

        <TouchableHighlight
          style={styles.btnCotizar}
          onPress={() => cotizarPrecio()}
        >
          <Text style={styles.textoCotizar}>Cotizar</Text>
        </TouchableHighlight>

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
  btnCotizar: {
    backgroundColor: '#5e49e2',
    padding: 10,
    marginTop: 20,
    borderRadius: 10
  },
  textoCotizar: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    textAlign: 'center'
  },
});
