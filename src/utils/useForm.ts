import { ChangeEvent, useState } from 'react';

type FormElementsTypes = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
type ChangeEventTypes = ChangeEvent<FormElementsTypes>;

const useForm = <T>(initialValues: T):
[values: T, handleChange: (e: ChangeEventTypes) => void] => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e: ChangeEventTypes) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return [
    values,
    handleChange,
  ];
};

export default useForm;
