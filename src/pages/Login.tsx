import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Input from '../components/Input';
import { LoginFormType } from '../@types/LoginFormType';
import Button from '../components/Button';
import { loginAction } from '../redux/actions';
import useForm from '../hooks/useForm';
import Logo from '../components/Logo';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [form, handleChange] = useForm<LoginFormType>({ email: '', password: '' });

  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const emailIsValid = regex.test(form.email);
  const passwordIsValid = form.password.length >= 6;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/carteira');
    dispatch(loginAction({ ...form }));
  };

  return (
    <div className="flex flex-col h-screen justify-center">
      <form
        className="w-1/3 py-16 px-28 flex flex-col gap-16
        self-center bg-white rounded-lg shadow-lg"
        onSubmit={ handleSubmit }
      >
        <span className="flex justify-center w-full">
          <Logo />
        </span>
        <fieldset className="flex flex-col gap-4">
          <Input.Root
            data-testid="email-input"
            type="text"
            placeholder="E-mail:"
            name="email"
            value={ form.email }
            onChange={ handleChange }
          />
          <Input.Root
            data-testid="password-input"
            type={ showPassword ? 'text' : 'password' }
            placeholder="Senha:"
            name="password"
            value={ form.password }
            onChange={ handleChange }
          >
            <Input.Button
              data-testid="eye-button"
              Icon={
            showPassword ? FaRegEye : FaRegEyeSlash
          }
              onClick={ () => setShowPassword(!showPassword) }
            />
          </Input.Root>
          <Button
            text="Entrar"
            disabled={ !(emailIsValid && passwordIsValid) }
            type="submit"
          />
        </fieldset>
      </form>
    </div>
  );
}

export default Login;
