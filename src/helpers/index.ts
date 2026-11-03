import axios from 'axios';

/**
 * Formatea un número como moneda usando el locale y currency apropiados.
 * Soporta PYG, USD, MXN, EUR y GBP.
 *
 * @param cantidad - Valor numérico a formatear.
 * @param moneda - Código ISO de la moneda (PYG, USD, MXN, EUR, GBP).
 * @returns Cadena formateada como moneda local.
 */
export const formatearCantidad = (cantidad: number, moneda: string): string => {
  const currencyMap: Record<string, string> = {
    PYG: 'es-PY',
    USD: 'en-US',
    MXN: 'es-MX',
    EUR: 'es-ES',
    GBP: 'en-GB',
  };

  return cantidad.toLocaleString(currencyMap[moneda] ?? 'en-US', {
    style: 'currency',
    currency: moneda,
  });
};

/**
 * Obtiene la tasa de cambio actual desde USD hacia otra moneda.
 * Utiliza la API pública de open.er-api.com (ExchangeRate-API).
 *
 * @param moneda - Código ISO de la moneda destino.
 * @returns Factor de conversión o null si falla la consulta.
 */
export const obtenerTasaUSD = async (moneda: string): Promise<number | null> => {
  // Si la moneda destino es USD, la tasa es 1:1.
  if (moneda === 'USD') {
    return 1;
  }

  try {
    const { data } = await axios.get('https://open.er-api.com/v6/latest/USD');
    const tasa = data?.rates?.[moneda];
    return typeof tasa === 'number' ? tasa : null;
  } catch (error) {
    console.error('Error al obtener tasa de cambio:', error);
    return null;
  }
};
