import { clearUser } from '../Login/authUtils';
import { useApolloClient } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { SET_LOGIN } from '../Login/queries';
import { clearBanStatus } from '../Login/authUtils';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Result, Typography, Button } from 'antd';

const { Paragraph, Text } = Typography;

export const Component = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const location = searchParams.get('from');
    const { t } = useTranslation('logout', { keyPrefix: 'logout' });

    // Logout code.
    const client = useApolloClient();
    clearBanStatus();
    clearUser();
    client.resetStore();
    client.writeQuery({
        query: SET_LOGIN,
        data: {
            loggedIn: false
        },
        variables: {
            status: false
        }
    });
    fetch('/api/logout', { method: 'POST' });

    const goToLoginPage = () => navigate('/login', { state: { from: location } });
    const goToMainPage = () => navigate('/');

    return (
        <Result
            status="info"
            title={t('title')}
            subTitle={t('subTitle')}
            extra={[
                <Button type="primary" key="loginbtn" onClick={goToLoginPage}>
                    {t('logIn')}
                </Button>,
                <Button type="primary" key="mainpagebtn" onClick={goToMainPage}>
                    {t('mainPageLink')}
                </Button>
            ]}
        >
            <div style={{ textAlign: 'center' }}>
                <Paragraph>{t('timedOutSession')}</Paragraph>
                <Paragraph>{t('sessionNotRenewed')}</Paragraph>
                <Paragraph>{t('sessionNotRenewedPage')}</Paragraph>
                <Paragraph>
                    {t('youCan')}
                    <Text strong>&nbsp; {t('logBackIn')} &nbsp;</Text>
                    {t('or')} &nbsp;
                    <Text strong>{t('goBack')}</Text>.
                </Paragraph>
            </div>
        </Result>
    );
}
