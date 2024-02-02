import { ReactNode } from 'react';

type TableRowProps = {
  children: ReactNode;
};

function TableRow({ children }: TableRowProps) {
  return (
    <tr className="flex w-full">
      {children}
    </tr>
  );
}

export default TableRow;
