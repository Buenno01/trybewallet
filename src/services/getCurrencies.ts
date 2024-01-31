const API_URL = 'https://economia.awesomeapi.com.br/json/all';

const getCurrencies = async (): Promise<string[]> => {
  try {
    const response = await fetch(API_URL);
    // if (!response.ok) throw new Error('Não foi possível obter as moedas');
    const data = await response.json();

    return Object.keys(data);
  } catch (err: any) {
    return [];
  }
};

export default getCurrencies;
