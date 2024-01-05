import PropTypes from 'prop-types';
import { Suspense } from 'react';
import { Button, Drawer, Skeleton } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faReply, faCheck } from '@fortawesome/free-solid-svg-icons';
import Editor from '../Editor/Editor';
import './Posts.css';

const ReplyTitle = ({  topic, isMobile }) => {
    if (isMobile) return null;

    return (
    <span className="reply-title">
      <FontAwesomeIcon icon={faReply} size="lg" />
            &nbsp; &nbsp;
            <strong>{topic.name}</strong>
            &nbsp;
    </span>
    );
};

ReplyTitle.propTypes = {
    topic: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        views: PropTypes.number.isRequired,
        replies: PropTypes.number.isRequired,
        created: PropTypes.instanceOf(Date).isRequired,
        closed: PropTypes.bool.isRequired,
        tags: PropTypes.string.isRequired,
        user: PropTypes.shape({
            id: PropTypes.number.isRequired,
            avatar: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
        }),
        category: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
        })
    }),
    isMobile: PropTypes.bool.isRequired
};

const ReplyDrawer = (props) => {
    const {
        topic,
        user,
        containerRef,
        onClose,
        open,
        createPost,
        isMobile,
        mentions,
        setMentions,
    } = props;

    if (!user) return null;

    return (
        <Drawer
            className="reply-drawer"
            title={
                <>
                    <ReplyTitle topic={topic} isMobile={isMobile} />
                    <span className="reply-buttons">
            <Button
                danger
                type="primary"
                className="reply-cancel-btn"
                onClick={onClose}
                size={isMobile ? 'default' : 'large'}
                style={{ marginLeft: isMobile ? '0%' : '50px' }}
            >
              &nbsp;
                <FontAwesomeIcon icon={faTimes} />
                &nbsp; Discard
            </Button>
                        &nbsp;
                        <Button
                            onClick={createPost}
                            type="primary"
                            size={isMobile ? 'default' : 'large'}
                        >
              Post &nbsp;
                            <FontAwesomeIcon icon={faCheck} />
            </Button>
          </span>
                </>
            }
            placement={isMobile ? 'top' : 'bottom'}
            height={isMobile ? 474 : 500}
            onClose={onClose}
            open={open}
        >
          <Suspense fallback={<Skeleton avatar paragraph={{ rows: 4 }} />}>
            <div className="post-composer-container">
                <Editor
                    containerRef={containerRef}
                    setMentions={setMentions}
                    mentions={mentions}
                    user={user}
                    initialState={undefined}
                    isMobile={isMobile}
                />
            </div>
          </Suspense>
        </Drawer>
    );
};


ReplyDrawer.propTypes = {
    createPost: PropTypes.func,
    onClose: PropTypes.func,
    open: PropTypes.bool,
    user: PropTypes.any,
    topic: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        views: PropTypes.number.isRequired,
        replies: PropTypes.number.isRequired,
        created: PropTypes.instanceOf(Date).isRequired,
        closed: PropTypes.bool.isRequired,
        tags: PropTypes.string.isRequired,
        user: PropTypes.shape({
            id: PropTypes.number.isRequired,
            avatar: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
        }),
        category: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
        })
    }),
    containerRef: PropTypes.any.isRequired,
    isMobile: PropTypes.bool.isRequired,
    mentions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            avatar: PropTypes.string,
            username: PropTypes.string.isRequired,
            banned: PropTypes.bool.isRequired,
            banReason: PropTypes.string
        })
    ),
    setMentions: PropTypes.func.isRequired
};

export default ReplyDrawer;
