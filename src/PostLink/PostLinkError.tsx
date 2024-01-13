import { Result, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import { useTranslation } from 'react-i18next';

const { Paragraph, Text } = Typography;

const PostLinkError = (): React.ReactElement => {
    const { t } = useTranslation('postLink', { keyPrefix: 'postLink' });

    return (
        <Result
            status="error"
            title={t('postAccessError')}
            subTitle={t('invalidLink')}
        >
            <div className="desc">
                <Paragraph>
                    <Text strong style={{ fontSize: 16 }}>
                        {t('canDoText')}:
                    </Text>
                </Paragraph>
                <Paragraph>
                    <FontAwesomeIcon icon={faCircleXmark} /> &nbsp;{' '}
                    {t('postDeleted')}. &nbsp;{' '}
                    <Link to="/search">{t('searchPosts')}</Link>
                </Paragraph>
                <Paragraph>
                    <FontAwesomeIcon icon={faCircleXmark} /> &nbsp;{' '}
                    {t('topicDeleted')}. &nbsp;{' '}
                    <Link to="/">{t('goMainPage')}.</Link>
                </Paragraph>
            </div>
        </Result>
    );
};

export default PostLinkError;
