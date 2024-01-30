import { ButtonHTMLAttributes, ElementType } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon?: ElementType;
  text: string;
}

function Button({ text, Icon = undefined, ...rest }:ButtonProps) {
  return (
    <button
      className="
      bg-secondary-blue hover:bg-opacity-80 active:bg-opacity-70 disabled:bg-opacity-50
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
