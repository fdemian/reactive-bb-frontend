import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import '../Navbar.css';

const NavbarUnlogged = ({ t }: { t: (key: string) => string }) => {
  return (
    <>
      <Link to="/login" className="navbar-link-button">
        <span className="login-link-text">{t('login')} &nbsp;</span>
        <FontAwesomeIcon color="0618EC" icon={faSignInAlt} size="2x" />{' '}
      </Link>
      <Link to="/register" className="navbar-link-button navbar-register-link">
        <span className="register-link-text">{t('register')} &nbsp;</span>
        <FontAwesomeIcon color="0618EC" icon={faUserPlus} size="2x" />{' '}
      </Link>
    </>
  );
};

export default NavbarUnlogged;
