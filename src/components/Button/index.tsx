import { ButtonHTMLAttributes, ElementType } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon?: ElementType;
  text: string;
}

function Button({ text, Icon = undefined, ...rest }:ButtonProps) {
  return (
    <button
      { ...rest }
      className={ twMerge(
        `
      bg-secondary-blue hover:bg-opacity-80 active:bg-opacity-70 disabled:bg-opacity-50
      text-white font-bold
      py-2 px-4 rounded`,
        rest.className,
      ) }
    >
      {text}
      {Icon && <Icon />}
    </button>
  );
}

export default Button;
