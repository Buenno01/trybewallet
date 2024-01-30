import { ExpenseType } from '../../@types/WalletType';

type TotalExpenseProps = {
  expenses: ExpenseType[];
  selectedCurrency: string;
};

function TotalExpense({ expenses, selectedCurrency }: TotalExpenseProps) {
  return (
    <p>
      <span data-testid="total-field">
        Despesa Total:
        {' '}
        {expenses.reduce((acc, curr) => acc + curr.value, 0)}
      </span>
      <span data-testid="header-currency-field">
        {' '}
        {selectedCurrency}
      </span>
    </p>
  );
}

export default TotalExpense;
