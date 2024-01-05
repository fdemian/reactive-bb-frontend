import { useQuery, useMutation } from '@apollo/client';
import { getUserId } from '../Login/authUtils';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Loading from '../Loading/LoadingIndicator';
import BookrmarkList from './BookmarkPostList';
import { GET_BOOKMARKS_BY_USER } from './Queries';
import { REMOVE_BOOKMARK } from '../Posts/Mutations';
import './Bookmarks.css';

export const Component = () => {
    
    const userId = getUserId();
    const { t } = useTranslation('bookmarks', { keyPrefix: 'bookmarks' });

    const { data, loading, error } = useQuery(GET_BOOKMARKS_BY_USER, {
        variables: { user: userId },
        skip: !userId
    });

    const [removeBookmark] = useMutation(REMOVE_BOOKMARK, {
        update(cache, { data: { removeBookmark } }) {
            cache.modify({
                fields: {
                    bookmarksByUser(bookmarksByUser = []) {
                        // Workarround checking for __ref prop.
                        // TODO: investigate why .filter(b => b.id !== id) is not working.
                        const { id } = removeBookmark;
                        return bookmarksByUser.filter((b) => b.__ref !== 'Bookmark:' + id);
                    }
                }
            });
        }
    });

    if (loading) return <Loading />;

    if (error) 
    return(
    <>
      <Helmet>
        <title>{t('bookmarks')}</title>
      </Helmet>
      <h1>{t('error')}</h1>
    </>
    );
    
    const { bookmarksByUser } = data;
    
    if(bookmarksByUser.length === 0)
        return(
        <>
        <Helmet>
           <title>{t('bookmarks')}</title>
         </Helmet>
          <h1 className="bookmarks-header">{t('bookmarks')}</h1>
          <h2 className="bookmarks-header">{t('noBookmarks')}</h2>
        </>    
        )

    return (
    <>
      <Helmet>
        <title>{t('bookmarks')}</title>
      </Helmet>
      <div className="bookmarks-container">
         <h1 className="bookmarks-header">{t('bookmarks')}</h1>
         <BookrmarkList
            t={t}
            userId={userId}
            bookmarks={bookmarksByUser}
            removeBookmark={removeBookmark}
        />
      </div>
    </>
    );
};