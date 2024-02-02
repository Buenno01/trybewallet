import { useSelector } from 'react-redux';
import { GlobalStateType } from '../../@types/GlobalStateType';
import Logo from '../Logo';
import TotalExpense from './TotalExpense';
import UserInfo from './UserInfo';

function Header() {
  const {
    user: globalUser,
    wallet: globalWallet,
  } = useSelector((state: GlobalStateType) => state);

  return (
    <header
      className="flex justify-center gap-10 w-4/5 h-16 items-center
    bg-white py-20 shadow-lg px-52"
    >
      <span
        className="flex justify-between gap-10 items-baseline w-full"
      >
        <Logo />
        <TotalExpense
          expenses={ globalWallet.expenses }
          selectedCurrency="BRL"
        />
        <UserInfo email={ globalUser.email } />
      </span>
    </header>
  );
}

export default Header;
