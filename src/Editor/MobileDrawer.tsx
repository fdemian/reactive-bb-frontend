import { lazy } from 'react';
import { Drawer } from 'antd';
import { MobileDrawerProps } from './editorTypes';

const EquationModal = lazy(() => import('./EquationModal/EquationModal'));
const TweetToolbar = lazy(() => import('./TweetToolbar'));
const TableToolbar = lazy(() => import('./TableToolbar'));
const VideoToolbar = lazy(() => import('./VideoToolbar'));
const InsertImageToolbar = lazy(() => import('./ImageModal/InsertImageToolbar'));

const MobileDrawer = (props:MobileDrawerProps) => {
    const {
        isMobile,
        equationModalVisible,
        equation,
        setEquation,
        inline,
        setInline,
        editor,
        insertEquation,
        toggleEquationModal,
        imageModalVisible,
        toggleImageModal,
        tweetToolbarVisible,
        toggleTweetToolbar,
        tableToolbarVisible,
        toggleTableToolbar,
        videoToolbar,
        toggleVideoToolbar,
        insertImage,
        t,
    } = props;

    if (!isMobile) return null;

    const insertTweet = (url:string) => {
        const tweetId = url.split('status/')?.[1]?.split('?')?.[0];
        editor.executeCommand('INSERT_TWEET', tweetId);
    };

    const insertTable = ({columns, rows}:{ columns: number; rows:number;}) => {
        editor.executeCommand('INSERT_TABLE', { columns, rows });
    };

    const insertVideo = (props:string) => {
        editor.executeCommand('INSERT_VIDEO', props);
    };

    const closeFn = () => {
        toggleEquationModal(false);
        toggleImageModal();
        toggleTweetToolbar(false);
        toggleTableToolbar();
        toggleVideoToolbar(false);
    };

    const open =
        equationModalVisible ||
        tweetToolbarVisible ||
        tableToolbarVisible ||
        videoToolbar ||
        imageModalVisible;

    return (
        <Drawer onClose={closeFn} open={open}>
            {equationModalVisible ? (
                <EquationModal
                    equation={equation}
                    setEquation={setEquation}
                    okFunction={insertEquation}
                    cancelFn={toggleEquationModal}
                    inline={inline}
                    setInline={setInline}
                    t={t}
                />
            ) : null}
            {tweetToolbarVisible ? (
                <TweetToolbar
                    insertTweet={insertTweet}
                    toggleToolbar={toggleTweetToolbar}
                    t={t}
                />
            ) : null}
            {tableToolbarVisible ? (
                <TableToolbar
                    insertTable={insertTable}
                    toggleToolbar={toggleTableToolbar}
                    t={t}
                />
            ) : null}
            {videoToolbar ? (
                <VideoToolbar
                    insertVideo={insertVideo}
                    toggleToolbar={toggleVideoToolbar}
                    t={t}
                />
            ) : null}
            {imageModalVisible ? (
                <InsertImageToolbar okFn={insertImage} cancelFn={toggleImageModal} t={t} />
            ) : null}
        </Drawer>
    );
};

export default MobileDrawer;
