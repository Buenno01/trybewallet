import { ChangeEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { WalletFormType } from '../@types/WalletFormType';
import useForm from '../hooks/useForm';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import { GlobalDispatch } from '../@types/GlobalStateType';
import { addExpenseAction, loadCurrenciesAction } from '../redux/actions';
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
  const { expenses } = useTypedSelector((state) => state.wallet);
  const dispatch: GlobalDispatch = useDispatch();
  const {
    currencies: currencyOptions,
  } = useTypedSelector((state) => state.wallet);

  const initialForm: WalletFormType = {
    currency: 'USD',
    description: '',
    method: 'Dinheiro',
    tag: 'Alimentação',
    value: '',
  };

  const [form, handleChange, resetForm] = useForm<WalletFormType>(initialForm);

  useEffect(() => {
    dispatch(loadCurrenciesAction());
  }, [dispatch]);

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
    dispatch(addExpenseAction(form, expenses));
    resetForm();
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
        disabled={ !isValidated }
        onClick={ handleClick }
        className="bg-primary-green"
        text="Adicionar despesa"
      />
    </form>
  );
}

export default WalletForm;
