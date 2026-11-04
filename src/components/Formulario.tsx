import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

/**
 * Representación mínima de una criptomoneda devuelta por CoinGecko.
 */
interface Criptomoneda {
  id: string;     // Identificador único usado por CoinGecko (ej. bitcoin).
  symbol: string; // Símbolo de la criptomoneda (ej. btc).
  name: string;   // Nombre legible (ej. Bitcoin).
}

/**
 * Props del componente Formulario.
 */
interface FormularioProps {
  moneda: string;                              // Moneda fiduciaria seleccionada.
  guardarMoneda: (valor: string) => void;       // Setter de moneda.
  criptomoneda: string;                        // ID de la criptomoneda seleccionada.
  guardarCriptomoneda: (valor: string) => void; // Setter de criptomoneda.
  guardarConsultarAPI: (valor: boolean) => void; // Disparador de la consulta en App.tsx.
}

/**
 * Formulario de selección.
 * Carga las 10 principales criptomonedas desde CoinGecko y permite
 * seleccionar una moneda fiduciaria y una criptomoneda para cotizar.
 */
export const Formulario = ({
  moneda,
  guardarMoneda,
  criptomoneda,
  guardarCriptomoneda,
  guardarConsultarAPI,
}: FormularioProps) => {
  // Listado de criptomonedas obtenidas de CoinGecko.
  const [criptomonedas, guardarCriptomonedas] = useState<Criptomoneda[]>([]);

  /**
   * useEffect inicial: consulta a CoinGecko las 10 criptomonedas con mayor
   * capitalización de mercado y las guarda en el estado local.
   */
  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1';
      try {
        const resultado = await axios.get<Criptomoneda[]>(url);
        guardarCriptomonedas(resultado.data);
      } catch (error) {
        console.error('Error al consultar CoinGecko:', error);
      }
    };
    consultarAPI();
  }, []);

  /**
   * Actualiza la moneda fiduciaria seleccionada.
   */
  const obtenerMoneda = (valor: string) => {
    guardarMoneda(valor);
  };

  /**
   * Actualiza la criptomoneda seleccionada (guarda el id de CoinGecko).
   */
  const obtenerCriptomoneda = (valor: string) => {
    guardarCriptomoneda(valor);
  };

  /**
   * Valida que ambos campos tengan valor y dispara la consulta de cotización.
   */
  const cotizarPrecio = () => {
    if (moneda.trim() === '' || criptomoneda.trim() === '') {
      mostrarAlerta();
      return;
    }

    // Activa el flag para que App.tsx ejecute el useEffect de cotización.
    guardarConsultarAPI(true);
  };

  /**
   * Muestra una alerta nativa cuando faltan campos por completar.
   */
  const mostrarAlerta = () => {
    Alert.alert('Error...', 'Ambos campos son obligatorios', [{ text: 'OK' }]);
  };

  return (
    <View>
      {/** Selector de moneda fiduciaria */}
      <Text style={styles.label}>Moneda</Text>

      <View style={styles.pickerContainer}>
        <Picker
          dropdownIconColor="#000"
          onValueChange={(valor: string) => obtenerMoneda(valor)}
          selectedValue={moneda}>
          <Picker.Item label="- Seleccione -" value="" />
          <Picker.Item label="Guaraní Paraguayo" value="PYG" />
          <Picker.Item label="Dolar de Estados Unidos" value="USD" />
          <Picker.Item label="Peso Mexicano" value="MXN" />
          <Picker.Item label="Euro" value="EUR" />
          <Picker.Item label="Libra Esterlina" value="GBP" />
        </Picker>
      </View>

      {/** Selector de criptomoneda */}
      <Text style={styles.label}>Criptomoneda</Text>

      <View style={styles.pickerContainer}>
        <Picker
          dropdownIconColor="#000"
          onValueChange={(valor: string) => obtenerCriptomoneda(valor)}
          selectedValue={criptomoneda}>
          <Picker.Item label="- Seleccione -" value="" />
          {criptomonedas.map((cripto) => (
            <Picker.Item
              key={cripto.id}
              label={`${cripto.name} (${cripto.symbol.toUpperCase()})`}
              value={cripto.id}
            />
          ))}
        </Picker>
      </View>

      {/** Botón que dispara la cotización */}
      <TouchableHighlight
        style={styles.btnCotizar}
        onPress={() => cotizarPrecio()}>
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
    color: '#000',
  },
  pickerContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  btnCotizar: {
    backgroundColor: '#5e49e2',
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  textoCotizar: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
