import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const VALID_EMAIL = 'example@email.com';
const VALID_PASSWORD = '123456';

const INVALID_EMAIL = 'exampleemail.com';
const INVALID_PASSWORD = '123';

describe('Login Page', () => {
  it('Should render the login page with the email and password inputs and a button disabled by default', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });
    expect(screen.getByTestId(/email-input/i)).toBeInTheDocument();
    expect(screen.getByTestId(/password-input/i)).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('Should enable the button when the email and password are valid', async () => {
    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(button).toBeDisabled();

    await user.type(emailInput, INVALID_EMAIL);

    expect(button).toBeDisabled();

    await user.clear(emailInput);
    await user.type(emailInput, VALID_EMAIL);

    expect(button).toBeDisabled();

    await user.type(passwordInput, INVALID_PASSWORD);

    expect(button).toBeDisabled();

    await user.clear(passwordInput);
    await user.type(passwordInput, VALID_PASSWORD);

    expect(button).not.toBeDisabled();
  });

  it('Should show the password when the eye button is clicked', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const passwordInput = screen.getByTestId(/password-input/i);
    const eyeButton = screen.getByTestId(/eye-button/i);

    expect(passwordInput).toHaveAttribute('type', 'password');

    await eyeButton.click();

    expect(passwordInput).toHaveAttribute('type', 'text');

    await eyeButton.click();

    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('Should navigate to the wallet page when the form is submitted', async () => {
    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const button = screen.getByRole('button', { name: /entrar/i });

    await user.type(emailInput, VALID_EMAIL);
    await user.type(passwordInput, VALID_PASSWORD);

    await user.click(button);

    expect(screen.getByText(/despesas/i)).toBeInTheDocument();
  });

  it('Should save the user data in the store when the form is submitted', async () => {
    const { user, store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const button = screen.getByRole('button', { name: /entrar/i });

    await user.type(emailInput, VALID_EMAIL);
    await user.type(passwordInput, VALID_PASSWORD);

    await user.click(button);

    const { user: { email } } = store.getState();

    expect(email).toBe(VALID_EMAIL);
  });
});
