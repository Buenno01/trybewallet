import { screen } from '@testing-library/react';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import { vi } from 'vitest';
import WalletForm from '../components/WalletForm';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import * as actions from '../redux/actions';
import mockData from './helpers/mockData';

const getInputsAndButton = () => ({
  description: screen.getByTestId(/description-input/i),
  tag: screen.getByTestId(/tag-input/i),
  value: screen.getByTestId(/value-input/i),
  method: screen.getByTestId(/method-input/i),
  currency: screen.getByTestId(/currency-input/i),
  button: screen.getByText(/Adicionar despesa/i),
});

const fillForm = async (user: UserEvent) => {
  const { description, tag, value, method, currency } = getInputsAndButton();

  await user.type(description, 'Test description');
  await user.selectOptions(tag, 'Alimentação');
  await user.type(value, '100');
  await user.selectOptions(method, 'Dinheiro');
  await user.selectOptions(currency, 'USD');
};

const mockFormState = {
  description: 'Test description',
  tag: 'Alimentação',
  value: '100',
  method: 'Dinheiro',
  currency: 'USD',
};

const mockFetch = () => vi.spyOn(global, 'fetch').mockResolvedValue({
  json: async () => mockData,
  ok: true,
  status: 200,
} as Response);

describe.only('Wallet Form', () => {
  it('Should render the wallet form with the inputs and the button', () => {
    mockFetch();
    renderWithRouterAndRedux(<WalletForm />, { initialEntries: ['/carteira'] });
    const inputsAndButton = Object.values(getInputsAndButton());
    inputsAndButton.forEach((element) => expect(element).toBeInTheDocument());
  });

  it('Should button be disabled when the inputs are empty and enabled when they\'re fulfilled', async () => {
    mockFetch();
    const { user } = renderWithRouterAndRedux(<WalletForm />, { initialEntries: ['/carteira'] });

    const button = screen.getByText(/adicionar despesa/i);

    expect(button).toBeDisabled();

    await fillForm(user);

    expect(button).toBeEnabled();
  });

  it('Should not let the user type a value that is not a number', async () => {
    mockFetch();
    const { user } = renderWithRouterAndRedux(<WalletForm />, { initialEntries: ['/carteira'] });
    const value = screen.getByTestId(/value-input/i);

    await user.type(value, '2xoh>]/*1abc');

    expect(value).toHaveValue(21);
  });

  it('Should load no currencies if the fetch fails', async () => {
    const mockedFetch = vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => mockData,
      ok: false,
      status: 400,
    } as Response);

    renderWithRouterAndRedux(<WalletForm />, { initialEntries: ['/carteira'] });

    expect(mockedFetch).toBeCalledTimes(1);

    const currency = screen.getByTestId(/currency-input/i);

    expect(currency).toHaveTextContent('');
  });

  it('Should call the dispatch function when the button is clicked', async () => {
    mockFetch();
    const { user } = renderWithRouterAndRedux(<WalletForm />, { initialEntries: ['/carteira'] });

    const button = screen.getByText(/Adicionar despesa/i);

    await fillForm(user);

    expect(button).toBeEnabled();
  });

  it('Should save the expense in the wallet state', async () => {
    const mockedFetch = mockFetch();

    const addExpenseAction = vi.spyOn(actions, 'addExpenseAction');

    const { user, store } = renderWithRouterAndRedux(<WalletForm />, { initialEntries: ['/carteira'] });

    const { expenses } = store.getState().wallet;

    expect(mockedFetch).toBeCalledTimes(1);

    await fillForm(user);

    expect(expenses.length).toBe(0);

    const button = screen.getByText(/Adicionar despesa/i);

    await user.click(button);

    expect(store.getState().wallet.expenses.length).toBe(1);
    expect(addExpenseAction).toBeCalledWith(mockFormState, expenses);
    expect(mockedFetch).toBeCalledTimes(2);
  });
});
