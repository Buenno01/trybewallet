import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import Table from '../components/Table';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockExpenses from './helpers/mockExpenses';
import App from '../App';
import mockData from './helpers/mockData';

const getAllTableElements = () => [
  screen.getByTestId(/table-heading/i),
  ...document.querySelectorAll('tbody tr'),
];

const mockFetch = () => {
  return vi.spyOn(global, 'fetch').mockResolvedValue({
    json: async () => mockData,
    ok: true,
    status: 200,
  } as Response);
};

const fillFormPattern = {
  description: 'Test description',
  tag: 'Alimentação',
  value: '100',
  method: 'Dinheiro',
  currency: 'USD',
};

export const fillForm = async (user: UserEvent, fillWith = fillFormPattern) => {
  const input = {
    description: screen.getByTestId(/description-input/i),
    tag: screen.getByTestId(/tag-input/i),
    value: screen.getByTestId(/value-input/i),
    method: screen.getByTestId(/method-input/i),
    currency: screen.getByTestId(/currency-input/i),
  };

  await user.clear(input.description);
  await user.type(input.description, fillWith.description);

  await user.clear(input.value);
  await user.type(input.value, fillWith.value);

  await user.selectOptions(input.tag, fillWith.tag);
  await user.selectOptions(input.method, fillWith.method);
  await user.selectOptions(input.currency, fillWith.currency);
};

describe('Table', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });
  it('Should render empty table when there are nothing in the store', () => {
    renderWithRouterAndRedux(<Table />, { initialEntries: ['/carteira'] });
    const [header, ...rows] = getAllTableElements();
    expect(header).toBeInTheDocument();
    expect(rows).toHaveLength(0);
  });

  it('Should render the table with the expenses', () => {
    renderWithRouterAndRedux(<Table />, { initialEntries: ['/carteira'], initialState: { wallet: { expenses: mockExpenses } } });
    const [header, ...rows] = getAllTableElements();
    expect(header).toBeInTheDocument();
    expect(rows).toHaveLength(3);
  });

  it('Should render a new expense when it\'s added', async () => {
    const mock = mockFetch();

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const [header, ...rows] = getAllTableElements();
    const button = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(header).toBeInTheDocument();
    expect(rows).toHaveLength(0);
    expect(mock).toHaveBeenCalledTimes(1);

    await fillForm(user);

    await user.click(button);

    const [, ...newRows] = getAllTableElements();

    expect(header).toBeInTheDocument();
    expect(newRows).toHaveLength(1);
    expect(mock).toHaveBeenCalledTimes(2);

    await fillForm(user);

    await user.click(button);

    const [, ...newRows2] = getAllTableElements();

    expect(header).toBeInTheDocument();
    expect(newRows2).toHaveLength(2);
    expect(mock).toHaveBeenCalledTimes(3);
  });

  it('Should render the table without the deleted expense', async () => {
    const { user, store } = renderWithRouterAndRedux(<Table />, { initialEntries: ['/carteira'], initialState: { wallet: { expenses: mockExpenses } } });
    const getExpenses = () => store.getState().wallet.expenses;

    const expenses = getExpenses();
    const [, ...rows] = getAllTableElements();

    expect(rows).toHaveLength(3);
    expect(expenses).toHaveLength(3);

    const deleteButton = screen.getAllByRole('button', { name: /excluir/i });

    await user.click(deleteButton[0]);

    const newExpenses = getExpenses();
    const [, ...newRows] = getAllTableElements();

    expect(newRows).toHaveLength(2);
    expect(newExpenses).toHaveLength(2);

    await user.click(deleteButton[1]);

    const newExpenses2 = getExpenses();
    const [, ...newRows2] = getAllTableElements();

    expect(newRows2).toHaveLength(1);
    expect(newExpenses2).toHaveLength(1);
  });

  it('Should toggle the editor mode when the edit button is clicked', async () => {
    mockFetch();
    const { user, store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const getEditor = () => store.getState().wallet.editor;

    await fillForm(user);

    await user.click(screen.getByTestId(/submit-btn/i));

    const editButton = screen.getAllByTestId(/edit-btn/i)[0];

    const editorBefore = getEditor();

    await user.click(editButton);

    const editorDuring = getEditor();

    await fillForm(user);

    await user.click(screen.getByTestId(/submit-btn/i));

    const editorAfter = getEditor();

    expect(editorBefore).toBe(false);
    expect(editorDuring).toBe(true);
    expect(editorAfter).toBe(false);
  });

  it.todo('Should render the table with the edited expense', async () => {
    const mock = mockFetch();
    const { user, store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const getExpenses = () => store.getState().wallet.expenses;
    const submitButton = screen.getByTestId(/submit-btn/i);
    const editWith = {
      description: 'Edited description',
      tag: 'Lazer',
      value: '200',
      method: 'Cartão de crédito',
      currency: 'EUR',
    };

    await fillForm(user);
    await user.click(submitButton);

    const editButton = screen.getByTestId(/edit-btn/i);
    const [, beforeTableElement] = getAllTableElements();
    const expensesBefore = getExpenses();

    await user.click(editButton);
    await fillForm(user, editWith);
    await user.click(submitButton);

    const [, afterTableElement] = getAllTableElements();
    const expensesAfter = getExpenses();

    expect(beforeTableElement).not.toBe(afterTableElement);

    expect(expensesBefore[0]).not.toBe(expensesAfter[0]);
    expect(expensesBefore[0].id).toBe(expensesAfter[0].id);

    expect(mock).toHaveBeenCalledTimes(1);
  });
});
