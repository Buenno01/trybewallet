import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { ExpenseType } from '../../@types/WalletType';
import Button from '../Button';
import TableDataCell from './TableDataCell';

type TableContentProps = {
  expense: ExpenseType;
};

function TableContent({ expense }: TableContentProps) {
  const { currency, description, exchangeRates, method, tag, value, id } = expense;

  const handleEdit = (expenseId: number) => {
    return expenseId;
  };

  const handleDelete = (expenseId: number) => {
    return expenseId;
  };
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
          className=" w-8 h-8 flex justify-center items-center p-0 text-inherit"
          text=""
          aria-label="Editar"
          onClick={ () => { handleEdit(id); } }
        />
        <Button
          Icon={ FaTrashAlt }
          className=" w-8 h-8 flex justify-center items-center p-0 text-red-500"
          text=""
          aria-label="Excluir"
          onClick={ () => { handleDelete(id); } }
        />
      </TableDataCell>
    </>
  );
}

export default TableContent;
