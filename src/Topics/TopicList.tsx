import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { List, Spin, Statistic } from 'antd';
import format_title_string from '../utils/formats';
import { format } from 'date-fns';
import { TopicsListParams } from './topicTypes';

// Lazy imports.
const Avatar = lazy(() => import('../UserAvatar/UserAvatar'));
const CategoryLink = lazy(() => import('./CategoryLink'));
const ClosedIcon = lazy(() => import('./ClosedIcon'));
const PinTopic = lazy(() => import('./PinTopic'));
const PinnedIndicator = lazy(() => import('./PinnedIndicator'));

const getDate = (date:string) => format(new Date(date), 'MMM d yyyy');

const TopicsList = (props:TopicsListParams) => {

    const {
        topics,
        pinnedTopics,
        isMobile,
        userType,
        t
    } = props;

    const allTopics = pinnedTopics.concat(topics);

    return (
        <List
            size="large"
            rowKey="id"
            loading={false}
            dataSource={allTopics}
            renderItem={(item) => (
                <List.Item
                    key={item.created.toString()}
                    actions={
                        isMobile
                            ? []
                            : [
                                <Statistic key="author-statistic" title={t('author')} value={item.user.username} />,
                                <Statistic key="created-statistic"  title={t('created')} value={getDate(item.created)} />,
                                <Statistic key="replies-statistic" title={t('replies')} value={item.replies} />,
                                <Statistic key="views-statistic" title={t('views')} value={item.views} />
                            ]
                    }
                >
                    <List.Item.Meta
                        avatar={
                            <>
                                {
                                    (userType === 'M' || userType == 'A') ?
                                        <Suspense fallback={<Spin />}>
                                            <PinTopic topic={item} />
                                        </Suspense>
                                        :
                                        ( item.pinned &&
                                            <Suspense fallback={<Spin />}>
                                                <PinnedIndicator topic={item} />
                                            </Suspense>
                                        )
                                }
                                <Suspense fallback={<Spin />}>
                                    <Avatar
                                        avatar={item.user.avatar}
                                        username={item.user.username}
                                        shape="square"
                                        size={{ xs: 64, sm: 64, md: 64, lg: 64, xl: 64, xxl: 80 }}
                                    />
                                </Suspense>
                            </>
                        }
                        title={
                            <>
                                <Link
                                    className="topic-link"
                                    data-testid="topic-link"
                                    to={`/topics/${item.id}/${format_title_string(item.name)}`}
                                >
                                    {isMobile ? (
                                        <p className="topic-item-title-mobile">{item.name}</p>
                                    ) : (
                                        <span className="topic-item-title">{item.name}</span>
                                    )}
                                </Link>
                                <Suspense fallback={<Spin />}>
                                    <CategoryLink category={item.category} isMobile={isMobile} />
                                    <ClosedIcon closed={item.closed} />
                                </Suspense>
                            </>
                        }
                        description={
                            isMobile ? (
                                <p className="category-date-mobile">{getDate(item.created)}</p>
                            ) : null
                        }
                    />
                </List.Item>
            )}
        />
    );
};

export default TopicsList;