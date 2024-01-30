import { useSelector } from 'react-redux';
import { GlobalStateType } from '../../@types/GlobalStateType';
import Logo from './Logo';
import TotalExpense from './TotalExpense';

function Header() {
  const {
    user: globalUser,
    wallet: globalWallet,
  } = useSelector((state: GlobalStateType) => state);

  return (
    <header className="flex justify-between w-full">
      <Logo />
      <span className="flex gap-4">
        <p data-testid="email-field">
          Email:
          {' '}
          {globalUser.email}
        </p>
        <TotalExpense
          expenses={ globalWallet.expenses }
          selectedCurrency={ globalWallet.currencies[0] }
        />
      </span>
    </header>
  );
}

export default Header;
