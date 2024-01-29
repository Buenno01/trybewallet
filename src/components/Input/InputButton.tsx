import { ButtonHTMLAttributes, ElementType } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: ElementType;
}

function InputButton({ Icon, ...rest }: ButtonProps) {
  return (
    <button
      className="absolute right-0 top-0 bottom-0 px-2"
      type="button"
      { ...rest }
    >
      <Icon />
    </button>
  );
}

export default InputButton;
