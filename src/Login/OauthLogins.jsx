import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Tooltip } from 'antd';
import { getOauthConfig } from '../App/utils';
import './Login.css';

const oauthIcons = [
    {
        name: 'google',
        icon: faGoogle
    },
    {
        name: 'github',
        icon: faGithub
    },
    {
        name: 'facebook',
        icon: faFacebook
    },
    {
        name: 'twitter',
        icon: faTwitter
    }
];

const getOauthLink = (service, config) => {
    const { link, clientId, scope, extraParams, name } = service;
    const redirectURI = `${config.redirectURI}/oauth/${name}`;
    const params = `response_type=code&redirect_uri=${redirectURI}&scope=${scope}&client_id=${clientId}`;
    return `${link}?${params}${extraParams}`;
};

const getOuathIcon = (name) => {
    return oauthIcons.find((i) => i.name === name).icon;
};

const OauthLogins = ({ t }) => {
    const oauthConfig = getOauthConfig();
    const services = oauthConfig.services;
    return (
        <>
            <h2 className="oauth-logins-text">{t('oauthLogins')}</h2>
            <div className="oauth-icons" key="oauth-icons">
                {services.map((l) => (
                    <Tooltip
                        key={`oauth-icons-${l.name}`}
                        placement="bottom"
                        title={`${t('logInPopup')} ${l.name}`}
                    >
                        <a
                            href={getOauthLink(l, oauthConfig)}
                            aria-label={`${t('logInPopup')} ${l.name}`}
                        >
                            <FontAwesomeIcon
                                className={`oauth-login-icon oauth-${l.name}`}
                                icon={getOuathIcon(l.name)}
                                size="5x"
                            />
                        </a>
                    </Tooltip>
                ))}
            </div>
        </>
    );
};

OauthLogins.propTypes = {
    t: PropTypes.func.isRequired
};

export default OauthLogins;
