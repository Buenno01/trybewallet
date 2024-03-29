import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

function Wallet() {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <WalletForm />
      <Table />
    </div>
  );
}

export default Wallet;
