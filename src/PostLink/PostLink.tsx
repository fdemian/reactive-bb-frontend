import { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { useQuery } from '@apollo/client';
import { Navigate, useParams } from 'react-router-dom';
import { getDefaultPageItems } from '../App/utils';
import format_title_string from '../utils/formats';
import Loading from '../Loading/LoadingIndicator';
import { GET_POSITION_IN_PAGE } from './Queries';

const PostLinkError = lazy(() => import('./PostLinkError'));

export const Component = () => {

    const params = useParams();
    const { id } = params;
    const pageItems = getDefaultPageItems();
    const postId = parseInt(id ?? "-1", 10);
    const { data, loading, error } = useQuery(GET_POSITION_IN_PAGE, {
        variables: {
            post: postId,
            itemscount: parseInt(pageItems ?? "5", 10)
        }
    });

    if (error)
        return (
            <Suspense
                fallback={<Spin />}
            >
                <PostLinkError />
            </Suspense>
        );

    if (loading) return <Loading />;

    if (data) {
        const { topicId, page, name } = data.postLink;
        const topicName = format_title_string(name);
        const url = `/topics/${topicId}/${topicName}/${postId}?page=${page}#post-${postId}`;

        return <Navigate to={url} />;
    }

    return null;
};
