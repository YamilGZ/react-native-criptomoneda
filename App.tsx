import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, Image, ScrollView } from 'react-native';
import { Header, Formulario, Cotizacion } from './src/components';
import axios from 'axios';

export interface ResultadoCotizacion {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  high_24h: number;
  low_24h: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  last_updated: string;
  image: string;
}

const App = () => {

  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [consultarAPI, guardarConsultarAPI] = useState(false);
  const [cargando, guardarCargando] = useState(false);
  const [resultado, guardarResultado] = useState<ResultadoCotizacion | null>(null);

  useEffect(() => {
    if (!consultarAPI) {
      return;
    }

    const cotizarCriptomoneda = async () => {
      guardarCargando(true);
      guardarResultado(null);

      try {
        const url = 'https://api.coingecko.com/api/v3/coins/markets';
        const { data } = await axios.get<ResultadoCotizacion[]>(url, {
          params: {
            vs_currency: moneda.toLowerCase(),
            ids: criptomoneda,
            order: 'market_cap_desc',
            per_page: 1,
            page: 1,
            sparkline: false,
          },
        });

        if (data && data.length > 0) {
          guardarResultado(data[0]);
        } else {
          console.warn('No se encontraron datos para la cotización');
        }
      } catch (error) {
        console.error('Error al cotizar:', error);
      } finally {
        guardarCargando(false);
        guardarConsultarAPI(false);
      }
    };

    cotizarCriptomoneda();
  }, [consultarAPI]);

  return (
    <ScrollView>
      <Header />

      <Image
        style={styles.imagen}
        source={require('./assets/img/cryptomonedas.png')}
      />

      <View style={styles.contenido}>
        <Formulario
          moneda={moneda}
          criptomoneda={criptomoneda}
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
          guardarConsultarAPI={guardarConsultarAPI}
        />
      </View>

      <View style={{ marginTop: 40 }}>
        {cargando ? (
          <ActivityIndicator size="large" color="#5E49E2" />
        ) : (
          <Cotizacion resultado={resultado} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contenido: {
    marginHorizontal: '2.5%',
  },
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '1%',
  },
  cargando: {
    marginTop: 20,
  },
});

export default App;
