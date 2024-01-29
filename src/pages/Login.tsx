import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Input from '../components/Input';
import { LoginFormType } from '../@types/LoginFormType';
import Button from '../components/Button';
import { loginAction } from '../redux/actions';
import useForm from '../utils/useForm';

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
    dispatch(loginAction(form.email));
  };

  return (
    <div className="flex flex-col h-screen justify-center">
      <form
        className="w-64 gap-4 p-4 flex flex-col self-center bg-white rounded-lg shadow-lg"
        onSubmit={ handleSubmit }
      >
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
      </form>
    </div>
  );
}

export default Login;
