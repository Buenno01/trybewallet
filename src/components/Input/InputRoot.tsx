import { InputHTMLAttributes, ReactNode } from 'react';

interface RootProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
  labelText?: string;
}

function InputRoot({ children = '', labelText = '', ...rest }: RootProps) {
  return (
    <label className="flex flex-col">
      {labelText}
      <span className="flex border border-gray-300 relative">
        <input
          className="border-none"
          { ...rest }
        />
        {children}
      </span>
    </label>
  );
}

export default InputRoot;
