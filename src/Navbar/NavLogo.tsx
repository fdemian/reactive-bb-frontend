import { Link } from 'react-router-dom';
import './Navbar.css';

interface NavLogoProps {
  mobile: boolean;
  name: string;
  logoURL: string;
}

const NavLogo = ({
  mobile,
  name,
  logoURL,
}: NavLogoProps): React.ReactElement => {
  return (
    <Link to="/" className="topnav header-logo">
      <img
        width={50}
        height={mobile ? 30 : 50}
        src={logoURL}
        alt={`${name} logo`}
        aria-label={`${name} logo`}
        className={mobile ? 'navbar-logo-mobile' : 'navbar-logo'}
      />
      &nbsp;
      {mobile ? null : <span className="forum-name-navbar">{name}</span>}
    </Link>
  );
};

export default NavLogo;
