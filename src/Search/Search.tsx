import { useState, useEffect, lazy, Suspense } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { getDefaultPageItems } from '../App/utils';
import { getPageNumber } from '../utils/pageUtils';
import { useTranslation } from 'react-i18next';
import { Spin, Card, Breadcrumb, Divider } from 'antd';
import Loading from '../Loading/LoadingIndicator';
import SearchResults from './SearchResults';
import SearchHeader from './SearchHeader';
import { SEARCH_TERM } from './Queries';
import './Search.css';

const PaginationFooter = lazy(
  () => import('../PaginationFooter/PaginationFooter')
);

export const Component = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('term');
  const pageParams = searchParams.get('page');
  const { t } = useTranslation('search', { keyPrefix: 'search' });
  const [searchIn, setSearchIn] = useState<string[]>([]);
  const [search, setSearch] = useState<string | null>(searchTerm);
  const initialPage = getPageNumber(pageParams);
  const PAGE_LIMIT = parseInt(getDefaultPageItems() ?? '5', 10);
  const PAGE_OFFSET = (initialPage - 1) * PAGE_LIMIT;
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  // Total page calculation.
  const [performSearch, { data, loading, error, fetchMore }] = useLazyQuery(
    SEARCH_TERM,
    {
      variables: {
        term: search ?? "",
        where: searchIn.length === 0 ? ['titles', 'posts'] : searchIn,
        limit: PAGE_LIMIT,
        offset: PAGE_OFFSET,
      },
    }
  );

  useEffect(() => {
    if (searchTerm || search) {
      const where = searchIn.length === 0 ? ['titles', 'posts'] : searchIn;
      performSearch({
        variables: {
          term: searchTerm ?? "",
          where: where,
          limit: PAGE_LIMIT,
          offset: PAGE_OFFSET,
        },
      });
      setSearch(searchTerm);
      setSearchIn(where);
    }
  }, [PAGE_LIMIT, PAGE_OFFSET, performSearch, search, searchIn, searchTerm]);

  const onSearch = (value: string) => {
    if (!value || value.trim() === '') return;
    setSearch(value);
    setSearchParams({
      page: '1',
      term: value,
    });
    setCurrentPage(1);
    performSearch({
      variables: {
        term: value,
        where: searchIn.length === 0 ? ['titles'] : searchIn,
        limit: PAGE_LIMIT,
        offset: 0,
      },
    });
  };

  // Page changed
  const onChangePage = (page: number) => {
    const _offset = (currentPage - 1) * PAGE_LIMIT;
    const _limit = (currentPage - 1) * PAGE_LIMIT + PAGE_LIMIT;
    setCurrentPage(page);
    setSearchParams({ page: page.toString(), term: search ?? '' });
    fetchMore({
      variables: {
        offset: _offset,
        limit: _limit,
        term: search,
        where: searchIn,
      },
    });
    // Scroll to the top of the page.
    window.scroll(0, 0);
  };

  if (error) return <p>{t('error')}</p>;

  if (search && !data && loading) return <Loading />;

  let numberOfPages = 1;

  if (data?.search && data?.search.total) {
    numberOfPages = Math.ceil(data.search.total / PAGE_LIMIT);
  }

  const breadCrumbItems = [
    {
      title: <Link to="/">Home</Link>,
    },
    {
      title: <p>{t('search')}</p>,
    },
  ];
  
  return (
    <Card>
      <Breadcrumb items={breadCrumbItems} />
      <h1 role="presentation" className="search-title" aria-label={t('search')}>
        {t('search')}
      </h1>
      {search ? (
        <h2>
          {t('searchedFor')} <code>{search}</code> {t('in')}{' '}
          <strong>{t('topics')}</strong>.
        </h2>
      ) : (
        <h2>{t('noSearch')}</h2>
      )}
      <Divider />
      <SearchHeader
        setSearchIn={setSearchIn}
        searchIn={searchIn}
        search={search ?? ''}
        onSearch={onSearch}
        t={t}
      />
      {(searchTerm || search) && data?.search ? (
        <SearchResults t={t} data={data.search} />
      ) : null}
      <Suspense fallback={<Spin />}>
        <PaginationFooter
          currentPage={currentPage}
          lastPage={numberOfPages}
          onChangePage={onChangePage}
        />
      </Suspense>
    </Card>
  );
};
