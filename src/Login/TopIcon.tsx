import { getConfig } from '../App/utils';
import { ConfigType } from '../App/types';
import './Login.css';

const TopIcon = (): React.ReactElement => {
    const config: ConfigType = getConfig();
    return (
        <div className="icon-header">
            <img src={config.logoURL} alt={config.name} className="icon-logo" />{' '}
            &nbsp;
            <span className="login-icon-text">{config.name}</span>
        </div>
    );
};

export default TopIcon;
