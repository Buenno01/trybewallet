import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div className="bg-emerald-400">
      <div
        className="h-screen flex flex-col
      bg-coins-pattern bg-cover bg-no-repeat"
      >
        <Routes>
          <Route path="/" element={ <Login /> } />
          <Route path="/carteira" element={ <Wallet /> } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
