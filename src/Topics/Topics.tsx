import { useState, Suspense, lazy } from 'react';
import { useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { Card, Divider, Spin } from 'antd';
import { GET_TOPICS, GET_PINNED_TOPICS } from './Queries';
import { GET_CATEGORIES } from '../Categories/Queries';
import { GET_IS_LOGGED_IN } from '../Login/queries';
import { useTranslation } from 'react-i18next';
import { getFilteredTopics } from './utils';
import { useSearchParams } from 'react-router-dom';
import { getDefaultPageItems, getIsMobile } from '../App/utils';
import { getPageNumber } from '../utils/pageUtils';
import { getConfig } from '../App/utils';
import { getBanStatus, getUserType } from '../Login/authUtils';
import Loading from '../Loading/LoadingIndicator';
import './Topics.css';

// Lazy imports.
const NoTopics = lazy(() => import('./NoTopics'));
const TopicList = lazy(() => import('./TopicList'));
const TopicsHeader = lazy(() => import('./TopicsHeader'));
const TopicListFooter = lazy(
  () => import('../PaginationFooter/PaginationFooter')
);
const MobileCategoryDrawer = lazy(() => import('./MobileCategoryDrawer'));

interface CategoriesQueryType {
  __typename?: 'Category';
  id: number;
  name: string;
  description: string;
}

export const Component = () => {
  // Topics translation.
  const { t } = useTranslation('topics', { keyPrefix: 'topics' });

  //
  const config = getConfig();
  const banStatus = getBanStatus();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParams = searchParams.get('page');
  const initialPage = getPageNumber(pageParams);
  const PAGE_LIMIT = parseInt(getDefaultPageItems() ?? '5', 10);
  const PAGE_OFFSET = (initialPage - 1) * PAGE_LIMIT;

  //
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [categoriesDrawer, setCategoriesDrawer] = useState<boolean>(false);
  const toggleCategoriesDrawer = () => { setCategoriesDrawer(!categoriesDrawer); };
  const selectCategoriesMobile = (name: string) => {
    setCategoryFilter(name);
    toggleCategoriesDrawer();
  };

  const pinnedTopicsQuery = useQuery(GET_PINNED_TOPICS);
  const { loading, error, data, fetchMore } = useQuery(GET_TOPICS, {
    variables: {
      limit: PAGE_LIMIT,
      offset: PAGE_OFFSET,
    },
    pollInterval: 500,
  });
  const categoriesQuery = useQuery(GET_CATEGORIES);
  const loginQuery = useQuery(GET_IS_LOGGED_IN);
  const isMobile = getIsMobile();
  const userType = getUserType();

  if (error) return <p>Error</p>;

  if (loading || categoriesQuery.loading || pinnedTopicsQuery.loading || !data)
    return <Loading />;

  const defaultCategory:CategoriesQueryType = {    
    id: -1,
    name: 'Uncategorized',
    description: t('defaultCategory'),
  };

  const { topics, topicsCount } = data.topics;

  if(!topics)
    return <p>Error (no topics found)</p>;
  
  const { pinnedTopics } = pinnedTopicsQuery.data;
  const { categories } = categoriesQuery.data;
  const categoriesData = [defaultCategory].concat(categories);
  const filteredTopics = getFilteredTopics(topics, categoryFilter);
  const isLoggedIn = loginQuery.data?.loggedIn;

  if (topics.length === 0 && pinnedTopics.length === 0) {
    return (
      <Suspense fallback={<Spin />}>
        <NoTopics t={t} />
      </Suspense>
    );
  }

  // Total page calculation.
  const numberOfPages = Math.ceil(topicsCount / PAGE_LIMIT);

  // Page changed
  const onChangePage = (page: number) => {
    const _offset = (currentPage - 1) * PAGE_LIMIT;
    const _limit = (currentPage - 1) * PAGE_LIMIT + PAGE_LIMIT;
    setCurrentPage(page);
    setSearchParams({ page: page.toString() });
    fetchMore({
      variables: {
        offset: _offset,
        limit: _limit,
      },
    });

    // Scroll to the top of the page.
    window.scroll(0, 0);
  };

  return (
    <>
      <Helmet>
        <title>{config.name}</title>
      </Helmet>

      <h1 className="topics-title-title">{config.name}</h1>

      <Card
        className={`topics-list-container${isMobile ? '-mobile' : ''}`}
        bordered={false}
        title={
          isMobile ? null : <p className="topics-header-title">{t('topics')}</p>
        }
        style={{ marginTop: 24 }}
        bodyStyle={{ padding: '0 32px 40px 32px' }}
        extra={
          <Suspense fallback={<Spin />}>
            <TopicsHeader
              banStatus={banStatus}
              categories={categoriesData}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              toggleCategoriesDrawer={toggleCategoriesDrawer}
              tr={t}
              isLoggedIn={isLoggedIn}
              isMobile={isMobile}
            />
          </Suspense>
        }
      >
        <Suspense fallback={<Spin />}>
          <TopicList
            userType={userType ?? ''}
            pinnedTopics={pinnedTopics}
            topics={filteredTopics}
            isMobile={isMobile}
            t={t}
          />
        </Suspense>
        <Divider />
        <Suspense fallback={<Spin />}>
          <footer role="contentinfo">
            <TopicListFooter
              currentPage={currentPage}
              lastPage={numberOfPages}
              onChangePage={onChangePage}
            />
          </footer>
        </Suspense>
      </Card>
      {isMobile ? (
        <Suspense fallback={<Spin />}>
          <MobileCategoryDrawer
            categoriesData={categoriesData}
            categoriesDrawer={categoriesDrawer}
            toggleCategoriesDrawer={toggleCategoriesDrawer}
            selectCategoriesMobile={selectCategoriesMobile}
            t={t}
          />
        </Suspense>
      ) : null}
    </>
  );
};
