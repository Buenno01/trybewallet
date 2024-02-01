import { ExpenseType } from '../../@types/WalletType';
import mockData from './mockData';

const alimentacao = 'Alimentação';
const cartaodecredito = 'Cartão de Crédito';

const mockExpenses: ExpenseType[] = [
  {
    id: 0,
    description: 'Almoço',
    value: '25',
    currency: 'USD',
    method: 'Dinheiro',
    tag: alimentacao,
    exchangeRates: mockData,
  },
  {
    id: 1,
    description: 'Cinema',
    value: '1',
    currency: 'LTC',
    method: cartaodecredito,
    tag: 'Lazer',
    exchangeRates: mockData,
  },
  {
    id: 2,
    description: 'Uber',
    value: '5',
    currency: 'EUR',
    method: cartaodecredito,
    tag: 'Transporte',
    exchangeRates: mockData,
  },
];

export default mockExpenses;
