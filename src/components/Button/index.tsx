import { ButtonHTMLAttributes, ElementType } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon?: ElementType;
  text: string;
}

function Button({ text, Icon = undefined, ...rest }:ButtonProps) {
  return (
    <button
      className="
      bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300
      text-white font-bold
      py-2 px-4 rounded"
      { ...rest }
    >
      {text}
      {Icon && <Icon />}
    </button>
  );
}

export default Button;
