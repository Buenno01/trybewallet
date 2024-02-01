import { ExpenseType } from '../../@types/WalletType';
import MoedasIcone from '../../assets/Moedas.svg';

type TotalExpenseProps = {
  expenses: ExpenseType[];
  selectedCurrency: string;
};

function TotalExpense({ expenses, selectedCurrency }: TotalExpenseProps) {
  return (
    <p className="text-secondary-blue flex items-center gap-2">
      <span>
        <img src={ MoedasIcone } alt="Icone moedas" />
      </span>
      <b>
        Total de despesas:
      </b>
      <span data-testid="total-field">
        {
        expenses.reduce((acc, curr) => {
          acc += (Number(curr.value) * Number(curr.exchangeRates[curr.currency].ask));
          return acc;
        }, 0)
          .toFixed(2)
        }
      </span>
      <span data-testid="header-currency-field">
        {' '}
        {selectedCurrency}
      </span>
    </p>
  );
}

export default TotalExpense;
