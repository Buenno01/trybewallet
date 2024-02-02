import { ChangeEvent, useState } from 'react';

type FormElementsTypes = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
type ChangeEventTypes = ChangeEvent<FormElementsTypes>;

const useForm = <T>(initialValues: T, resetValues: T = initialValues):
[
  values: T,
  handleChange: (e: ChangeEventTypes) => void,
  resetForm: () => void,
] => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e: ChangeEventTypes) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setValues(resetValues);
  };

  return [
    values,
    handleChange,
    resetForm,
  ];
};

export default useForm;
