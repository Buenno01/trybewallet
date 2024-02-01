import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockExpenses from './helpers/mockExpenses';
import Header from '../components/Header';

const VALID_EMAIL = 'example@email.com';

describe('Wallet Header', () => {
  it('Should render the wallet header with the balance and the email', () => {
    renderWithRouterAndRedux(
      <Header />,
      {
        initialEntries: ['/carteira'],
        initialState: {
          user: { email: VALID_EMAIL },
          wallet: {
            expenses: mockExpenses,
          },
        },
      },
    );

    const email = screen.getByTestId(/email-field/i);
    const balance = screen.getByTestId(/total-field/i);

    expect(email).toBeInTheDocument();
    expect(balance).toBeInTheDocument();

    expect(email).toHaveTextContent(VALID_EMAIL);
    expect(balance).toHaveTextContent('467.50');
  });
});
