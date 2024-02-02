import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
}

function TableRow({ children, ...rest }: TableRowProps) {
  return (
    <tr
      { ...rest }
      className={ twMerge(
        `flex w-full h-12 content-center items-center
        border-b border-primary-green text-primary-green`,
        rest.className,
      ) }
    >
      {children}
    </tr>
  );
}

export default TableRow;
