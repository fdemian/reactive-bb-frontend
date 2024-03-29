import { GET_CATEGORY } from './Queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getIsMobile } from '../App/utils';
import Loading from '../Loading/LoadingIndicator';
import TopicList from '../Topics/TopicList';
import { Divider } from 'antd';
import { getUserType } from '../Login/authUtils';
import './Category.css';

export const Component = () => {
  const topicsTranslation = useTranslation('topics', { keyPrefix: 'topics' });
  const { t } = useTranslation('category', { keyPrefix: 'category' });
  const isMobile = getIsMobile();
  const userType = getUserType();

  ///
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_CATEGORY, {
    variables: { id: parseInt(id ?? '0', 10) },
  });

  if (error) return <p>Error</p>;

  if (loading || !data) return <Loading />;

  const { category } = data;
  const { description, name } = category;

  return (
    <div>
      <h1 className="category-title-header">{name}</h1>
      <h2 className="category-title-description">{description}</h2>
      <br />
      <Divider plain style={{ width: '80%' }}>
        {t('topicsInCategory')}
      </Divider>
      <TopicList
        userType={userType ?? ''}
        pinnedTopics={[]}
        topics={category.topics ?? []}
        isMobile={isMobile}
        t={topicsTranslation.t}
      />
    </div>
  );
};
