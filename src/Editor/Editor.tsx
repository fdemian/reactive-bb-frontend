/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import { useState, lazy, Suspense } from 'react';
import { Spin, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import CalliopeEditor from 'kalliope';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { GET_MENTION_USERS, UPLOAD_IMAGE } from './Queries';
import AccountAvatar from '../UserAvatar/UserAvatar';
import EditorFooter from './Footer';
import ExcalidrawModal from './ExcalidrawModal/ExcalidrawModal';
import emojiData from 'emojibase-data/en/data.json';
import {
  EditorProps,
  MentionType,
  EntryComponentTypes,
  InlineImageProps,
  ImageProps,
  InsertEquationProps,
} from './editorTypes';
import './Editor.css';
import { CalliopeFormatTypes } from './toolbarUtils';
import { InlineImageModalProps } from './InlineImageModal/InlineImageModal';

const MobileDrawer = lazy(() => import('./MobileDrawer'));
const Toolbar = lazy(() => import('./Toolbar'));
const ToolbarMobile = lazy(() => import('./ToolbarMobile'));

const Editor = (props: EditorProps) => {
  //const locale = getDefaultLocale();
  const { initialState, containerRef, user, mentions, setMentions, isMobile } =
    props;
  const ToolbarComponent = isMobile ? ToolbarMobile : Toolbar;
  const defaultMentions = user
    ? [
        {
          id: user.id,
          name: user.username,
          link: `/users/${user.id}/${user.username}`,
          avatar: user.avatar,
        },
      ]
    : [];

  //
  const { t } = useTranslation('editor', { keyPrefix: 'editor' });

  // All states.
  const initialMentions = mentions.length > 0 ? mentions : defaultMentions;
  //const [emojiData, setEmojiData] = useState(null);
  const [formats, setFormats] = useState<CalliopeFormatTypes | null>(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [updatedList, setUpdatedList] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState(initialMentions);
  const [equationModalVisible, setEquationModal] = useState(false);
  const [imageModalVisible, setImageModal] = useState(false);
  const [bgColorModalVisible, setBgColorModal] = useState(false);
  const [fontColorModalVisible, setFontColorModal] = useState(false);
  const [inlineImageModalVisible, setInlineImageModalVisible] = useState(false);
  const [inlineImagemodalProps, setInlineImageModalProps] =
    useState<InlineImageModalProps | null>(null);
  const [inlineModalUpdateVisible, setInlineModalUpdateVisible] =
    useState(false);

  const [tweetToolbarVisible, setTweetToolbar] = useState(false);
  const toggleTweetToolbar = () => {
    setTweetToolbar(!tweetToolbarVisible);
  };
  const [tableToolbarVisible, setTableToolbar] = useState(false);
  const toggleTableToolbar = () => {
    setTableToolbar(!tableToolbarVisible);
  };
  const [videoToolbar, setVideoToolbar] = useState(false);
  const toggleVideoToolbar = () => {
    setVideoToolbar(!videoToolbar);
  };

  // TODO: reorder and name this.
  const [equation, setEquation] = useState('f(x)');
  const [inline, setInline] = useState(true);

  // Toggle functions (utility functions).
  const toggleImageModal = () => {
    setImageModal(!imageModalVisible);
  };
  const toggleEquationModal = () => {
    setEquationModal(!equationModalVisible);
  };
  const toggleBgColorModal = () => {
    setBgColorModal(!bgColorModalVisible);
  };
  const toggleFontColorModal = () => {
    setFontColorModal(!fontColorModalVisible);
  };
  //const toggleExcalidrawModal = (status) => setExcalidrawModal(status === false ? status : !excalidrawModalVisible);

  const toggleExcalidrawModal = () => {
    containerRef.current.executeCommand('INSERT_EXCALIDRAW', null);
  };

  const [getMentionCandidates, { data, loading, error }] =
    useLazyQuery(GET_MENTION_USERS);
  const [uploadImage] = useMutation(UPLOAD_IMAGE);

  /*
    useEffect(() => {
        async function fetchData() {
            if (locale === null) return null;
            const data = await import(`node_modules/emojibase-data/${locale}/data.json`);
            setEmojiData(data.default);
        }
        fetchData();
    }, [locale]);
    */

  const insertEquation = (props: InsertEquationProps) => {
    containerRef.current.focus();
    containerRef.current.executeCommand('INSERT_EQUATION', props);
    toggleEquationModal();
  };

  const insertImage = (props: ImageProps) => {
    containerRef.current.focus();
    containerRef.current.executeCommand('INSERT_IMAGE', props);
    toggleImageModal();
  };

  const insertInlineImage = (image: InlineImageProps) => {
    if (!containerRef.current) return;
    containerRef.current.focus();
    containerRef.current.executeCommand('INSERT_IMAGE_INLINE', image);
  };

  const onSearchChange = (match: string) => {
    if (match === null || match.length < 3) return;
    getMentionCandidates({
      variables: {
        search: match,
      },
    });
    setUpdatedList(true);
  };

  const clearFormatting = () => {
    if (!containerRef.current) return;
    containerRef.current.focus();
    containerRef.current.executeCommand('CLEAR_FORMATTING');
  };

  if (data && !loading && updatedList) {
    const { mentionCandidates } = data;
    if (mentionCandidates !== null && mentionCandidates !== undefined) {
      const _suggestions = mentionCandidates.map((u) => ({
        id: u.id,
        name: u.username,
        link: `/users/${u.id}/${u.username}`,
        avatar: u.avatar,
      }));
      setSuggestions(_suggestions);
    }
    setUpdatedList(false);
  }

  if (error) {
    console.log(':::>');
    console.log(error);
    /*
        notification.error({
          message: 'Mention candidates error',
          description: 'Error getting mention candidates.',
          placement: "topRight"
        })*/
  }

  const config = {
    placeholderText: t('toolbar.placeholderText'),
    initialState: initialState,
    readOnly: false,
    autoFocus: true,
    onError: (error: Error) => {
      throw error;
    },
    plugins: [],
    imageConfig: {
      addCaptionText: t('internal.addCaption'),
      defaultCaptionText: t('internal.enterCaption'),
    },
    inlineImage: {
      showModal: (modalProps: InlineImageModalProps) => {
        setInlineModalUpdateVisible(true);
        setInlineImageModalProps(modalProps);
      },
    },
    excalidrawConfig: {
      modal: ExcalidrawModal,
    },
    twitterConfig: {
      loadingComponent: ({ tweetId }: { tweetId: string }) => (
        <p>
          {t('internal.loadingTweet')}...(ID={tweetId})
        </p>
      ),
    },
    collapsibleConfig: {
      open: true,
    },
    citation: {
      sourceLinkComponent: ({ sourceLink }: { sourceLink: string }) => (
        <a href={sourceLink} className="source-link-component">
          <FontAwesomeIcon icon={faArrowUp} size="lg" />
        </a>
      ),
      authorComponent: null /*({ author }) => (
             <a href={author.link} className="author-link-container">
               <AccountAvatar
                 avatar={author.avatar}
                 username={author.name}
                 size="5px"
                 shape="circle"
               />
               <span className="author-link-quote">{author.name}</span>
             </a>
            ),*/,
    },
    mentions: {
      onSearchChange: onSearchChange,
      onAddMention: (mention: MentionType) => {
        setMentions([...mentions, mention]);
      },
      onRemoveMention: ({ name }: { name: string }) => {
        const newMentions: MentionType[] = mentions.filter(
          (m) => m.name !== name
        );
        setMentions(newMentions);
      },
      entryComponent: ({ option: { avatar, name } }: EntryComponentTypes) => (
        <>
          <AccountAvatar
            avatar={avatar ?? ''}
            username={name}
            size={5}
            shape="circle"
          />
          &nbsp; <strong className="user-name-mentions">{name}</strong>
        </>
      ),
      mentionsData: suggestions,
    },
    emojiConfig: {
      emojiData: emojiData,
    },
    dragAndDropImage: {
      handleDroppedFile: async (file: File) => {
        const uploadRet = await uploadImage({
          variables: { image: file },
        });
        if (uploadRet.data) {
          if (!uploadRet.data?.uploadImage) {
            notification.error({
              message: 'Failed to upload File',
              description:
                "Couldn't upload file to the server (file type not allowed).",
              placement: 'topRight',
            });
            return;
          }
          const { src } = uploadRet.data.uploadImage;
          const imageSrc = `/static/uploads/${src}`;
          containerRef.current.executeCommand('INSERT_IMAGE', {
            src: imageSrc,
            altText: imageSrc,
          });
        }
      },
    },
  };

  return (
    <>
      <Suspense fallback={<Spin data-testid="toolbar-spin" />}>
        <ToolbarComponent
          clearFormatting={clearFormatting}
          editor={containerRef.current}
          formats={formats}
          tweetToolbarVisible={tweetToolbarVisible}
          toggleTweetToolbar={toggleTweetToolbar}
          tableToolbarVisible={tableToolbarVisible}
          toggleTableToolbar={toggleTableToolbar}
          videoToolbar={videoToolbar}
          toggleVideoToolbar={toggleVideoToolbar}
          toggleEquationModal={toggleEquationModal}
          toggleExcalidrawModal={toggleExcalidrawModal}
          insertEquation={insertEquation}
          bgColorModalVisible={bgColorModalVisible}
          fontColorModalVisible={fontColorModalVisible}
          equationModalVisible={equationModalVisible}
          imageModalVisible={imageModalVisible}
          toggleImageModal={toggleImageModal}
          toggleBgColorModal={toggleBgColorModal}
          toggleFontColorModal={toggleFontColorModal}
          insertImage={insertImage}
          t={t}
          equation={equation}
          setEquation={setEquation}
          inline={inline}
          setInline={setInline}
        />
      </Suspense>
      <div className="editor-shell-container">
        <CalliopeEditor
          config={config}
          containerRef={containerRef}
          setFormats={setFormats}
          setCanUndo={setCanUndo}
          setCanRedo={setCanRedo}
        />
      </div>
      <EditorFooter
        inlineModalUpdateVisible={inlineModalUpdateVisible}
        setInlineModalUpdateVisible={setInlineModalUpdateVisible}
        inlineImagemodalProps={inlineImagemodalProps}
        inlineImageModalVisible={inlineImageModalVisible}
        setInlineImageModalVisible={setInlineImageModalVisible}
        insertInlineImage={insertInlineImage}
        insertImage={insertImage}
        editor={containerRef.current}
        canUndo={canUndo}
        canRedo={canRedo}
        t={t}
      />
      <Suspense fallback={<Spin />}>
        <MobileDrawer
          formats={formats}
          isMobile={isMobile}
          editor={containerRef.current}
          tweetToolbarVisible={tweetToolbarVisible}
          toggleTweetToolbar={toggleTweetToolbar}
          tableToolbarVisible={tableToolbarVisible}
          toggleTableToolbar={toggleTableToolbar}
          videoToolbar={videoToolbar}
          toggleVideoToolbar={toggleVideoToolbar}
          toggleEquationModal={toggleEquationModal}
          insertEquation={insertEquation}
          equationModalVisible={equationModalVisible}
          imageModalVisible={imageModalVisible}
          toggleImageModal={toggleImageModal}
          insertImage={insertImage}
          t={t}
          equation={equation}
          setEquation={setEquation}
          inline={inline}
          setInline={setInline}
        />
      </Suspense>
    </>
  );
};

export default Editor;
