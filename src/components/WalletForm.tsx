import { ChangeEvent, useEffect, useState } from 'react';
import { WalletFormType } from '../@types/WalletFormType';
import useForm from '../utils/useForm';
import Input from './Input';
import Select from './Select';
import getCurrencies from '../services/getCurrencies';

const initialForm: WalletFormType = {
  currency: '',
  description: '',
  method: '',
  tag: '',
  value: 0,
};

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
  const [form, handleChange] = useForm<WalletFormType>(initialForm);
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);

  useEffect(() => {
    const currencies = async () => {
      const data = await getCurrencies();
      if (data) {
        setCurrencyOptions(data);
      }
    };
    currencies();
  }, []);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!Number.isNaN(parseFloat(value))) {
      handleChange(e);
    }
  };

  return (
    <form
      onSubmit={ (e) => { e.preventDefault(); } }
      className="flex flex-col justify-center gap-10 w-4/5 items-center
    bg-primary-gray py-10 shadow-lg rounded-b-lg px-52"
    >
      <fieldset className="w-full">
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
            options={ currencyOptions || [] }
            labelText="Moeda"
            value={ form.currency }
            onChange={ (e) => { handleChange(e); } }
          />
        </span>
      </fieldset>
      <button>Adicionar despesa</button>
    </form>
  );
}

export default WalletForm;
