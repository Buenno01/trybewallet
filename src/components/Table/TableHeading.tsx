import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface TableHeadingProps extends React.HTMLAttributes<HTMLTableCaptionElement> {
  children: ReactNode;
}

function TableHeading({ children, ...rest }: TableHeadingProps) {
  return (
    <th
      { ...rest }
      className={ twMerge(
        'flex w-1/8 justify-center',
        rest.className,
      ) }
    >
      {children}
    </th>
  );
}

export default TableHeading;
