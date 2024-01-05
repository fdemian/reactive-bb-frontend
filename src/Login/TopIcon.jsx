import { getConfig } from '../App/utils';
import './Login.css';

const TopIcon = () => {
    const config = getConfig();
    return (
        <div className="icon-header">
            <img src={config.logoURL} alt={config.name} className="icon-logo" /> &nbsp;
            <span className="login-icon-text">{config.name}</span>
        </div>
    );
};

export default TopIcon;