import LogoImage from '../assets/Logo.svg';

function Logo() {
  return (
    <h1 className="w-fit h-fit">
      <img src={ LogoImage } alt="TrybeWallet" />
    </h1>
  );
}

export default Logo;
