import PropTypes from "prop-types";
import {
    Suspense,
    lazy,
    useState
} from 'react';
import { useQuery } from '@apollo/client';
import { getDefaultPageItems } from '../App/utils';
import {
    Col,
    Row,
    Spin,
    Collapse,
    Divider
} from 'antd';
import UserAvatar from '../UserAvatar/UserAvatar';
import { GET_POST_EDITS } from './Queries';

const Renderer = lazy(() => import('../Editor/Renderer'));
const PaginationFooter = lazy(() => import('../PaginationFooter/PaginationFooter'));

const ModerationLog = ({ t }) => {
    const PAGE_LIMIT = parseInt(getDefaultPageItems(), 10);
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_OFFSET = 0;
    //const PAGE_OFFSET = (initialPage - 1) * PAGE_LIMIT;
    const { loading, data, fetchMore } = useQuery(GET_POST_EDITS, {
        variables: {
            limit: PAGE_LIMIT,
            offset: PAGE_OFFSET
        }
    });

    const onChangePage = (page) => {
        const _offset = (currentPage - 1) * PAGE_LIMIT;
        const _limit = (currentPage - 1) * PAGE_LIMIT + PAGE_LIMIT;

        setCurrentPage(page);
        //setSearchParams({ page: page });
        fetchMore({
            variables: {
                offset: _offset,
                limit: _limit
            }
        });

        // Scroll to the top of the page.
        window.scroll(0, 0);
    }

    if(loading)
        return <p>Loading</p>;

    const { editsCount, postEdits } = data.postEdits;

    if(editsCount === 0)
        return (
          <h2 style={{textAlign:'center'}}>{t("noModLogs")}</h2>
        );

    const numberOfPages = Math.ceil(editsCount/PAGE_LIMIT);

    return (
        <div>
            {postEdits.map(postEdit => (
                <>
                    <Collapse
                        bordered={false}
                        expandIcon={() =>
                            <UserAvatar
                                avatar={postEdit.user.avatar}
                                username={postEdit.user.username}
                                size="big"
                                shape="circle"
                            />}
                        items={[
                            {
                                key: postEdit.date.toString(),
                                label: <span>&nbsp; {postEdit.user.username} <strong>({postEdit.date.toString()})</strong></span>,
                                children: (
                                    <>
                                        <Row>
                                            <Col span={12}>
                                                <h2>{t("previous")}</h2>
                                            </Col>
                                            <Col span={12}>
                                                <h2>{t("current")}</h2>
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
                                )
                            }
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
}

ModerationLog.propTypes = {
  t: PropTypes.func.isRequired,
};

export default ModerationLog;