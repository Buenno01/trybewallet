import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { WalletFormType } from '../@types/WalletFormType';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import { GlobalDispatch } from '../@types/GlobalStateType';
import {
  addExpenseAction,
  editExpenseAction,
  loadCurrenciesAction,
} from '../redux/actions';
import { useTypedSelector } from '../hooks/useTypedSelector';

const categoryOptions = [
  'Alimentação',
  'Lazer',
  'Trabalho',
  'Transporte',
  'Saúde',
];

const paymentOptions = [
  'Dinheiro',
  'Cartão de crédito',
  'Cartão de débito',
];

function WalletForm() {
  const dispatch: GlobalDispatch = useDispatch();

  const {
    editor,
    idToEdit,
    expenses,
    currencies: currencyOptions,
  } = useTypedSelector((state) => state.wallet);

  const [form, setForm] = useState<WalletFormType>({} as WalletFormType);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const initialForm: WalletFormType = {
    description: '',
    tag: 'Alimentação',
    value: '',
    method: 'Dinheiro',
    currency: 'BRL',
  };

  useEffect(() => {
    dispatch(loadCurrenciesAction());

    if (editor) {
      const foundedExpense = expenses.find((expense) => expense.id === idToEdit);

      setForm(foundedExpense as WalletFormType);
    } else {
      setForm(initialForm);
    }
  }, [dispatch, editor]);

  const isValidated: boolean = !!(
    form.description !== ''
    && form.value !== '0'
    && form.value !== ''
    && form.tag !== ''
    && form.method !== ''
    && form.method !== '--'
    && form.currency !== ''
    && form.currency !== '--'
  );

  const handleClick = () => {
    if (editor) {
      dispatch(editExpenseAction(idToEdit, form, expenses));
    } else {
      dispatch(addExpenseAction(form, expenses));
    }
    setForm(initialForm);
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!Number.isNaN(parseFloat(value)) || value === '') {
      handleChange(e);
    }
  };

  return (
    <form
      onSubmit={ (e) => { e.preventDefault(); } }
      className="flex flex-col justify-center gap-10 w-4/5 items-center
      bg-white pb-10 shadow-lg rounded-b-lg"
    >
      <fieldset className="w-full bg-primary-gray px-52 py-10">
        <span className="flex justify-between w-full">
          <Input.Root
            data-testid="description-input"
            name="description"
            type="text"
            labelText="Descrição da despesa"
            value={ form.description }
            onChange={ (e) => { handleChange(e); } }
          />
          <Select
            data-testid="tag-input"
            name="tag"
            options={ categoryOptions }
            labelText="Categoria"
            value={ form.tag }
            onChange={ (e) => { handleChange(e); } }
          />
        </span>
        <span className="flex justify-between w-full">
          <Input.Root
            data-testid="value-input"
            name="value"
            type="number"
            labelText="Valor"
            value={ form.value }
            onChange={ (e) => { handleChangeValue(e); } }
          />
          <Select
            data-testid="method-input"
            name="method"
            options={ paymentOptions }
            labelText="Método de pagamento"
            value={ form.method }
            onChange={ (e) => { handleChange(e); } }
          />
          <Select
            data-testid="currency-input"
            name="currency"
            options={ [...currencyOptions] || [] }
            labelText="Moeda"
            value={ form.currency }
            onChange={ (e) => { handleChange(e); } }
          />
        </span>
      </fieldset>
      <Button
        data-testid="submit-btn"
        disabled={ !isValidated }
        onClick={ handleClick }
        className="bg-primary-green"
        text={ editor ? 'Editar despesa' : 'Adicionar despesa' }
      />
    </form>
  );
}

export default WalletForm;
