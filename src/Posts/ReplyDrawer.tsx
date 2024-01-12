import { Suspense } from 'react';
import { Button, Drawer, Skeleton } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faReply, faCheck } from '@fortawesome/free-solid-svg-icons';
import Editor from '../Editor/Editor';
import { ReplyTitleProps, ReplyDrawerProps } from './postTypes';
import './Posts.css';

const ReplyTitle = ({  topic, isMobile }:ReplyTitleProps) => {
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

const ReplyDrawer = (props:ReplyDrawerProps) => {
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
                size={isMobile ? 'middle' : 'large'}
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
                            size={isMobile ? 'middle' : 'large'}
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

export default ReplyDrawer;
