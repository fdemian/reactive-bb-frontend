import { lazy } from 'react';
import { Drawer } from 'antd';
import { MobileDrawerProps } from './editorTypes';
import {
  insertTweet,
  insertInstagram,
} from './toolbarUtils';

const EquationModal = lazy(() => import('./EquationModal/EquationModal'));
const TweetToolbar = lazy(() => import('./TweetToolbar'));
const TableToolbar = lazy(() => import('./TableToolbar'));
const VideoToolbar = lazy(() => import('./VideoToolbar'));
const InstagramToolbar = lazy(() => import('./InstagramToolbar'));
const InsertImageToolbar = lazy(
  () => import('./ImageModal/InsertImageToolbar')
);

const MobileDrawer = (props: MobileDrawerProps) => {
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
    instagramToolbarVisible,
    toggleInstagramToolbar,
    tableToolbarVisible,
    toggleTableToolbar,
    videoToolbar,
    toggleVideoToolbar,
    insertImage,
    t,
  } = props;

  if (!isMobile) return null;

  const insertTable = ({
    columns,
    rows,
  }: {
    columns: number;
    rows: number;
  }) => {
    editor.executeCommand('INSERT_TABLE', { columns, rows });
  };

  const insertVideo = (props: string) => {
    editor.executeCommand('INSERT_VIDEO', props);
  };

  const closeFn = () => {
    toggleEquationModal(false);
    toggleImageModal();
    toggleTweetToolbar();
    toggleTableToolbar();
    toggleVideoToolbar();
  };

  const open =
    equationModalVisible ||
    tweetToolbarVisible ||
    instagramToolbarVisible ||
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
          insertTweet={(t) => { insertTweet(t, editor); }}
          toggleToolbar={toggleTweetToolbar}
          t={t}
        />
      ) : null}
      {instagramToolbarVisible ? (
        <InstagramToolbar
          insertInstagram={(t) => { insertInstagram(t, editor); }}
          toggleToolbar={toggleInstagramToolbar}
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
        <InsertImageToolbar
          okFn={insertImage}
          cancelFn={toggleImageModal}
          t={t}
        />
      ) : null}
    </Drawer>
  );
};

export default MobileDrawer;
