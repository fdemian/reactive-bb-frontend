import { Suspense, lazy, useState } from 'react';
import { useQuery } from '@apollo/client';
import { getDefaultPageItems } from '../App/utils';
import { Col, Row, Spin, Collapse, Divider } from 'antd';
import UserAvatar from '../UserAvatar/UserAvatar';
import { GET_POST_EDITS } from './Queries';
import { UserType } from '../User/userTypes';

const Renderer = lazy(() => import('../Editor/Renderer'));
const PaginationFooter = lazy(
  () => import('../PaginationFooter/PaginationFooter')
);

type ModerationLogProps = {
  t: (key: string) => string;
};

type PostEditType = {
  user: UserType;
  date: Date;
  previous: string;
  current: string;
  editsCount: number;
};

const ModerationLog = ({ t }: ModerationLogProps) => {
  const PAGE_LIMIT = parseInt(getDefaultPageItems() ?? '0', 10);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_OFFSET = 0;
  //const PAGE_OFFSET = (initialPage - 1) * PAGE_LIMIT;
  const { loading, data, fetchMore } = useQuery(GET_POST_EDITS, {
    variables: {
      limit: PAGE_LIMIT,
      offset: PAGE_OFFSET,
    },
  });

  const onChangePage = (page: number) => {
    const _offset = (currentPage - 1) * PAGE_LIMIT;
    const _limit = (currentPage - 1) * PAGE_LIMIT + PAGE_LIMIT;

    setCurrentPage(page);
    //setSearchParams({ page: page });
    fetchMore({
      variables: {
        offset: _offset,
        limit: _limit,
      },
    });

    // Scroll to the top of the page.
    window.scroll(0, 0);
  };

  if (loading) return <p>Loading</p>;

  const { editsCount, postEdits } = data.postEdits;

  if (editsCount === 0)
    return <h2 style={{ textAlign: 'center' }}>{t('noModLogs')}</h2>;

  const numberOfPages = Math.ceil(editsCount / PAGE_LIMIT);

  return (
    <div>
      {postEdits.map((postEdit: PostEditType) => (
        <>
          <Collapse
            bordered={false}
            expandIcon={() => (
              <UserAvatar
                avatar={postEdit.user.avatar}
                username={postEdit.user.username}
                size="large"
                shape="circle"
              />
            )}
            items={[
              {
                key: postEdit.date.toString(),
                label: (
                  <span>
                    &nbsp; {postEdit.user.username}{' '}
                    <strong>({postEdit.date.toString()})</strong>
                  </span>
                ),
                children: (
                  <>
                    <Row>
                      <Col span={12}>
                        <h2>{t('previous')}</h2>
                      </Col>
                      <Col span={12}>
                        <h2>{t('current')}</h2>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <Suspense fallback={<Spin />}>
                          <Renderer content={postEdit.previous} />
                        </Suspense>
                      </Col>
                      <Col span={12}>
                        <Suspense fallback={<Spin />}>
                          <Renderer content={postEdit.current} />
                        </Suspense>
                      </Col>
                    </Row>
                  </>
                ),
              },
            ]}
          />
          <br />
        </>
      ))}
      <Divider />
      <PaginationFooter
        lastPage={numberOfPages}
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    </div>
  );
};

export default ModerationLog;
