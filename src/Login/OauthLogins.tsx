import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGoogle,
    faGithub,
    faFacebook,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { Tooltip } from 'antd';
import { getOauthConfig } from '../App/utils';
import { TranslationFn } from '../utils/types';
import { OAuthService, OAuthConfig } from '../App/types';
import './Login.css';

type OauthIconType = {
    name: string;
    icon: any;
};

const oauthIcons: OauthIconType[] = [
    {
        name: 'google',
        icon: faGoogle,
    },
    {
        name: 'github',
        icon: faGithub,
    },
    {
        name: 'facebook',
        icon: faFacebook,
    },
    {
        name: 'twitter',
        icon: faTwitter,
    },
];

const getOauthLink = (service: OAuthService, config: OAuthConfig): string => {
    const { link, clientId, scope, extraParams, name } = service;
    const redirectURI = `${config.redirectURI}/oauth/${name}`;
    const params = `response_type=code&redirect_uri=${redirectURI}&scope=${scope}&client_id=${clientId}`;
    return `${link}?${params}${extraParams}`;
};

const getOuathIcon = (name: string): any | null => {
    const oauthIcon = oauthIcons.find((i) => i.name === name);
    if (!oauthIcon) return null;
    return oauthIcon.icon;
};

const OauthLogins = ({ t }: { t: TranslationFn }): React.ReactElement => {
    const oauthConfig: OAuthConfig = getOauthConfig();
    const services = oauthConfig.services;
    return (
        <>
            <h2 className="oauth-logins-text">{t('oauthLogins')}</h2>
            <div className="oauth-icons" key="oauth-icons">
                {services.map((l: OAuthService) => (
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

export default OauthLogins;
