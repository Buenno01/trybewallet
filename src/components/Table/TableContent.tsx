import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { ExpenseType } from '../../@types/WalletType';
import Button from '../Button';
import TableDataCell from './TableDataCell';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { removeExpenseAction, startEditExpenseAction } from '../../redux/actions';

type TableContentProps = {
  expense: ExpenseType;
};

function TableContent({ expense }: TableContentProps) {
  const { expenses } = useTypedSelector((state) => state.wallet);
  const dispatch = useDispatch();
  const { currency, description, exchangeRates, method, tag, value, id } = expense;

  return (
    <>
      <TableDataCell>
        {description}
      </TableDataCell>

      <TableDataCell>
        {tag}
      </TableDataCell>

      <TableDataCell>
        {method}
      </TableDataCell>

      <TableDataCell>
        {Number(value).toFixed(2)}
      </TableDataCell>

      <TableDataCell className="text-sm">
        {exchangeRates[currency].name}
      </TableDataCell>

      <TableDataCell>
        {
          parseFloat(exchangeRates[currency].ask).toFixed(2)
        }
      </TableDataCell>

      <TableDataCell>
        {
          (Number(value) * Number(exchangeRates[currency].ask))
            .toFixed(2)
        }
      </TableDataCell>

      <TableDataCell>
        Real
      </TableDataCell>

      <TableDataCell className="gap-2 text-xl">
        <Button
          Icon={ FaPencilAlt }
          data-testid="edit-btn"
          className=" w-8 h-8 flex justify-center items-center p-0 text-inherit"
          text=""
          aria-label="Editar"
          onClick={ () => { dispatch(startEditExpenseAction(id)); } }
        />
        <Button
          Icon={ FaTrashAlt }
          data-testid="delete-btn"
          className=" w-8 h-8 flex justify-center items-center p-0 text-red-500"
          text=""
          aria-label="Excluir"
          onClick={ () => { dispatch(removeExpenseAction(id, expenses)); } }
        />
      </TableDataCell>
    </>
  );
}

export default TableContent;
