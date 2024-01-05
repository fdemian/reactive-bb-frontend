import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import "./Navbar.css";

const NavLogo = ({ mobile, name, logoURL }) => {
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

NavLogo.propTypes = {
    mobile: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    logoURL: PropTypes.string.isRequired
};

export default NavLogo;