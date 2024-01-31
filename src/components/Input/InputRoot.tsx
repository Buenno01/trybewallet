import { InputHTMLAttributes, ReactNode } from 'react';

interface RootProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
  labelText?: string;
}

function InputRoot({ children = '', labelText = '', ...rest }: RootProps) {
  return (
    <label className="flex text-secondary-blue items-center gap-2">
      <b>
        {labelText}
      </b>
      <span className="flex border border-secondary-blue rounded-md relative">
        <input
          className="border-none p-1 placeholder:text-secondary-blue bg-inherit w-full"
          { ...rest }
        />
        {children}
      </span>
    </label>
  );
}

export default InputRoot;
