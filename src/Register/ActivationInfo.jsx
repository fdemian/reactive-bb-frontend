import { Result, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import './Register.css';

const { Paragraph, Text, Link } = Typography;

export const Component = () => {
    const { t } = useTranslation('register', { keyPrefix: 'register' });
    let { mail } = useParams();
    return (
        <Result status="info" title={t('activationInfoTitle')}>
            <Paragraph>
                <Text style={{ fontSize: 16 }}>{t('activationInfoSubMail')}</Text> &nbsp;
                <Link href={`mailto:${mail}`} style={{ fontSize: 16 }}>
                    {mail}
                </Link>
                .
            </Paragraph>
            <Paragraph>
                <Text style={{ fontSize: 16 }}>{t('doesntArrive')}</Text>
            </Paragraph>
        </Result>
    );
};
