import { lazy, Suspense } from 'react';
import { List, Avatar, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from './Queries';
import { GET_IS_LOGGED_IN } from '../Login/queries';
import { useTranslation } from 'react-i18next';
import Loading from '../Loading/LoadingIndicator';
import './Categories.css';

const defaultCategory = {
  id: -1,
  name: 'Uncategorized',
  description: 'Default category.',
};

const NewCategoryForm = lazy(() => import('./NewCategoryForm'));

export const Component = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const loginQuery = useQuery(GET_IS_LOGGED_IN);
  const isLoggedIn = loginQuery.data?.loggedIn;

  const { t } = useTranslation('categories', { keyPrefix: 'categories' });

  if (error) return <p>Error</p>;

  if (loading) return <Loading />;

  const { categories } = data;
  const categoriesData = [defaultCategory].concat(categories);

  return (
    <>
      <div style={{ width: '80%', marginLeft: '10%' }}>
        <h1 style={{ textAlign: 'center' }}>{t('categories')}</h1>
        <br />
        <br />
        <List
          itemLayout="horizontal"
          dataSource={categoriesData}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    size={{
                      xs: 64,
                      sm: 64,
                      md: 64,
                      lg: 64,
                      xl: 64,
                      xxl: 80,
                    }}
                  >
                    {item.name[0]}
                  </Avatar>
                }
                title={
                  <span className="categories-name">
                    <Link
                      to={`/categories/${item.id}/${item.name.toLowerCase()}`}
                    >
                      {item.name}
                    </Link>
                  </span>
                }
                description={
                  <span className="categories-description">
                    {item.description}
                  </span>
                }
              />
            </List.Item>
          )}
        />
      </div>
      <br />
      <br />
      {isLoggedIn ? (
        <Suspense fallback={<Spin />}>
          <NewCategoryForm isLoggedIn={true} t={t} />
        </Suspense>
      ) : null}
    </>
  );
};
