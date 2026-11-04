import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Header, Formulario, Cotizacion } from './src/components';
import { obtenerTasaUSD } from './src/helpers';
import axios from 'axios';

/**
 * Datos de cotización devueltos por CoinGecko para una criptomoneda.
 * La app solo consume un subconjunto de campos.
 */
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

/**
 * Componente principal de la aplicación.
 * Mantiene el estado global, dispara la cotización y renderiza
 * header, imagen, formulario y resultado.
 */
const App = () => {
  // Moneda fiduciaria seleccionada (PYG, USD, MXN, EUR, GBP).
  const [moneda, guardarMoneda] = useState('');

  // ID de CoinGecko de la criptomoneda seleccionada (ej. bitcoin).
  const [criptomoneda, guardarCriptomoneda] = useState('');

  // Flag que activa la consulta a la API desde el useEffect.
  const [consultarAPI, guardarConsultarAPI] = useState(false);

  // Indica si la app está consultando la API.
  const [cargando, guardarCargando] = useState(false);

  // Resultado de la cotización obtenido de CoinGecko.
  const [resultado, guardarResultado] = useState<ResultadoCotizacion | null>(null);

  /**
   * useEffect que escucha el flag consultarAPI.
   * Cuando Formulario activa el flag, se consulta CoinGecko y se guarda el resultado.
   * Si la moneda es PYG, se consulta en USD y se convierte usando la tasa del día.
   */
  useEffect(() => {
    // Si no se solicitó consulta, no hacemos nada.
    if (!consultarAPI) {
      return;
    }

    const cotizarCriptomoneda = async () => {
      guardarCargando(true);
      guardarResultado(null);

      try {
        const monedaTarget = moneda.toUpperCase();

        // CoinGecko no soporta PYG, por lo que consultamos en USD y convertimos después.
        const monedaAPI = monedaTarget === 'PYG' ? 'usd' : monedaTarget.toLowerCase();

        const url = 'https://api.coingecko.com/api/v3/coins/markets';
        const { data } = await axios.get<ResultadoCotizacion[]>(url, {
          params: {
            vs_currency: monedaAPI,
            ids: criptomoneda,
            order: 'market_cap_desc',
            per_page: 1,
            page: 1,
            sparkline: false,
          },
        });

        if (data && data.length > 0) {
          const cripto = data[0];

          // Conversión manual a PYG porque CoinGecko no la ofrece.
          if (monedaTarget === 'PYG') {
            const tasa = await obtenerTasaUSD('PYG');
            if (tasa) {
              cripto.current_price = cripto.current_price * tasa;
              cripto.high_24h = cripto.high_24h * tasa;
              cripto.low_24h = cripto.low_24h * tasa;
            }
          }

          guardarResultado(cripto);
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
    <>
      {/** Barra de estado con iconos oscuros (negros) */}
      <StatusBar barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/** Encabezado de la app */}
        <Header />

        {/** Imagen principal */}
        <Image
          style={styles.imagen}
          source={require('./assets/img/cryptomonedas.png')}
        />

        {/** Formulario de selección */}
        <View style={styles.contenido}>
          <Formulario
            moneda={moneda}
            criptomoneda={criptomoneda}
            guardarMoneda={guardarMoneda}
            guardarCriptomoneda={guardarCriptomoneda}
            guardarConsultarAPI={guardarConsultarAPI}
          />
        </View>

        {/** Área de resultado o spinner de carga */}
        <View style={styles.resultadoArea}>
          {cargando ? (
            <ActivityIndicator size="large" color="#5E49E2" />
          ) : (
            <Cotizacion resultado={resultado} moneda={moneda} />
          )}
        </View>

        {/** Espacio inferior para evitar que los botones del celular tapen el contenido */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    backgroundColor: '#fff', // Forzar fondo blanco aunque el celular tenga modo oscuro.
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '1%',
  },
  resultadoArea: {
    marginTop: 40,
  },
  bottomPadding: {
    height: 50, // Espacio para los botones de navegación del celular.
  },
  cargando: {
    marginTop: 20,
  },
});

export default App;
