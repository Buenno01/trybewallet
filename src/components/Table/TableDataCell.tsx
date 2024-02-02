import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface TableDataCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

function TableDataCell({ children, ...rest }: TableDataCellProps) {
  return (
    <td
      { ...rest }
      className={ twMerge(
        'flex w-1/8 justify-center text-center',
        rest.className,
      ) }
    >
      { children }
    </td>
  );
}

export default TableDataCell;
