import axios from 'axios';

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

export const obtenerTasaUSD = async (moneda: string): Promise<number | null> => {
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
