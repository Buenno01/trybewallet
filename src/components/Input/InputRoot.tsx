import { InputHTMLAttributes, ReactNode } from 'react';

interface RootProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
  labelText?: string;
}

function InputRoot({ children = '', labelText = undefined, ...rest }: RootProps) {
  return (
    <label className="flex text-secondary-blue items-center gap-2">
      {
        labelText && (
          <b>
            {labelText}
          </b>
        )
      }
      <span className="flex border border-secondary-blue rounded-md relative w-full">
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
