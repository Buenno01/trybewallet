import { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
  labelText?: string;
}

function Select({ options, labelText = '', ...rest }: SelectProps) {
  return (
    <label className="flex text-secondary-blue items-center gap-2">
      <b>
        {labelText}
      </b>
      <span className="flex border border-secondary-blue rounded-md relative">
        <select { ...rest } className="bg-inherit w-full p-2">
          {
            options.length > 0
          && options.map((option) => (
            <option key={ option } value={ option } label={ option }>{option}</option>
          ))
        }
        </select>
      </span>
    </label>
  );
}

export default Select;
