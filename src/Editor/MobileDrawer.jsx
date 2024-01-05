import { lazy } from 'react';
import { Drawer } from 'antd';
import PropTypes from "prop-types";

const EquationModal = lazy(() => import('./EquationModal/EquationModal'));
const TweetToolbar = lazy(() => import('./TweetToolbar'));
const TableToolbar = lazy(() => import('./TableToolbar'));
const VideoToolbar = lazy(() => import('./VideoToolbar'));
const InsertImageToolbar = lazy(() => import('./ImageModal/InsertImageToolbar'));

const MobileDrawer = (props) => {
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

    const insertTweet = (url) => {
        const tweetId = url.split('status/')?.[1]?.split('?')?.[0];
        editor.executeCommand('INSERT_TWEET', tweetId);
    };

    const insertTable = ({columns, rows }) => {
        editor.executeCommand('INSERT_TABLE', { columns, rows });
    };

    const insertVideo = (props) => {
        editor.executeCommand('INSERT_VIDEO', props);
    };

    const closeFn = () => {
        toggleEquationModal(false);
        toggleImageModal(false);
        toggleTweetToolbar(false);
        toggleTableToolbar(false);
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

MobileDrawer.propTypes = {
    isMobile: PropTypes.bool.isRequired,
    equationModalVisible: PropTypes.bool.isRequired,
    equation: PropTypes.string.isRequired,
    setEquation: PropTypes.func.isRequired,
    inline: PropTypes.bool.isRequired,
    setInline: PropTypes.func.isRequired,
    editor: PropTypes.any.isRequired,
    insertEquation: PropTypes.func.isRequired,
    toggleEquationModal: PropTypes.func.isRequired,
    imageModalVisible: PropTypes.bool.isRequired,
    toggleImageModal: PropTypes.func.isRequired,
    tweetToolbarVisible: PropTypes.bool.isRequired,
    toggleTweetToolbar: PropTypes.func.isRequired,
    tableToolbarVisible: PropTypes.bool.isRequired,
    toggleTableToolbar: PropTypes.func.isRequired,
    videoToolbar: PropTypes.bool.isRequired,
    toggleVideoToolbar: PropTypes.func.isRequired,
    insertImage: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
};

export default MobileDrawer;
