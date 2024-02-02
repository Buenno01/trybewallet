import { useTypedSelector } from '../../hooks/useTypedSelector';
import TableContent from './TableContent';
import TableHeading from './TableHeading';
import TableRow from './TableRow';

const tableHeading = [
  'Descrição',
  'Tag',
  'Método de pagamento',
  'Valor',
  'Moeda',
  'Câmbio utilizado',
  'Valor convertido',
  'Moeda de conversão',
  'Editar/Excluir',
];

function Table() {
  const { expenses } = useTypedSelector((state) => state.wallet);
  return (
    <div className="w-5/6 bg-secondary-blue rounded-xl py-5 px-16">
      <table className="w-full">
        <TableRow className="border-b-2 text-white border-white">
          {tableHeading.map((heading) => (
            <TableHeading key={ heading }>
              {heading}
            </TableHeading>
          ))}
        </TableRow>
        <tbody>
          {
          expenses.map((expense) => (
            <TableRow key={ expense.id }>
              <TableContent expense={ expense } />
            </TableRow>
          ))
      }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
