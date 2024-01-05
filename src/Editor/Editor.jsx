import PropTypes from "prop-types";
import { useState /*, useEffect*/, lazy, Suspense } from 'react';
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
//import { getDefaultLocale } from '../App/utils';
import emojiData from 'emojibase-data/en/data.json';
import './Editor.css';

const MobileDrawer = lazy(() => import('./MobileDrawer'));
const Toolbar = lazy(() => import('./Toolbar'));
const ToolbarMobile = lazy(() => import('./ToolbarMobile'));

const Editor = (props) => {
    //const locale = getDefaultLocale();
    const { initialState, containerRef, user, mentions, setMentions, isMobile } = props;
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
    const [formats, setFormats] = useState({});
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);
    const [updatedList, setUpdatedList] = useState(false);
    const [suggestions, setSuggestions] = useState(initialMentions);
    const [equationModalVisible, setEquationModal] = useState(false);
    const [imageModalVisible, setImageModal] = useState(false);
    const [bgColorModalVisible, setBgColorModal] = useState(false);
    const [fontColorModalVisible, setFontColorModal] = useState(false);
    const [inlineImageModalVisible, setInlineImageModalVisible] = useState(false);
    const [inlineImagemodalProps, setInlineImageModalProps] = useState({});
    const [inlineModalUpdateVisible, setInlineModalUpdateVisible] = useState(false);

    const [tweetToolbarVisible, setTweetToolbar] = useState(false);
    const toggleTweetToolbar = (status) =>
        setTweetToolbar(status === false ? status : !tweetToolbarVisible);
    const [tableToolbarVisible, setTableToolbar] = useState(false);
    const toggleTableToolbar = (status) =>
        setTableToolbar(status === false ? status : !tableToolbarVisible);
    const [videoToolbar, setVideoToolbar] = useState(false);
    const toggleVideoToolbar = (status) =>
        setVideoToolbar(status === false ? status : !videoToolbar);

    // TODO: reorder and name this.
    const [equation, setEquation] = useState('f(x)');
    const [inline, setInline] = useState(true);

    // Toggle functions (utility functions).
    const toggleImageModal = (status) =>
        setImageModal(status === false ? status : !imageModalVisible);
    const toggleEquationModal = (status) =>
        setEquationModal(status === false ? status : !equationModalVisible);
    const toggleBgColorModal = (status) =>
        setBgColorModal(status === false ? status : !bgColorModalVisible);
    const toggleFontColorModal = (status) =>
        setFontColorModal(status === false ? status : !fontColorModalVisible);
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

    const insertEquation = (props) => {
        containerRef.current.focus();
        containerRef.current.executeCommand('INSERT_EQUATION', props);
        toggleEquationModal();
    };
    const insertImage = (props) => {
        containerRef.current.focus();
        containerRef.current.executeCommand('INSERT_IMAGE', props);
        toggleImageModal();
    };

    const insertInlineImage = (image) => {
        if(!containerRef.current)
            return;
        containerRef.current.focus();
        containerRef.current.executeCommand("INSERT_IMAGE_INLINE", image);
    }

    const onSearchChange = (match) => {
        if (match.length < 3) return;
        getMentionCandidates({
            variables: {
                search: match,
            },
        });
        setUpdatedList(true);
    };

    const clearFormatting = () => {
        if(!containerRef.current)
            return;
        containerRef.current.focus();
        containerRef.current.executeCommand("CLEAR_FORMATTING");
    }

    if (data && !loading && updatedList) {
        const { mentionCandidates } = data;

        if (mentionCandidates !== null) {
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
        isReadOnly: false,
        autoFocus: true,
        onError: (error) => {
            throw error;
        },
        plugins: [],
        imageConfig: {
            addCaptionText: t('internal.addCaption'),
            defaultCaptionText: t('internal.enterCaption'),
        },
        inlineImage: {
            showModal: (modalProps) => {
                setInlineModalUpdateVisible(true);
                setInlineImageModalProps(modalProps);
            }
        },
        excalidrawConfig: {
            modal: ExcalidrawModal
        },
        twitterConfig: {
            loadingComponent: ({ tweetId }) => (
                <p>
                    {t('internal.loadingTweet')}...(ID={tweetId})
                </p>
            ),
        },
        collapsibleConfig: {
            open: true,
        },
        citation: {
           sourceLinkComponent: ({ sourceLink }) => (
           <a
               href={sourceLink}
               className="source-link-component"
           >
              <FontAwesomeIcon icon={faArrowUp} size="lg" />
           </a>
           )
            /*
            authorComponent: ({ author }) => (
             <a href={author.link} className="author-link-container">
               <AccountAvatar
                 avatar={author.avatar}
                 username={author.name}
                 size="5px"
                 shape="circle"
               />
               <span className="author-link-quote">{author.name}</span>
             </a>
            ),*/
        },
        mentions: {
            onSearchChange: onSearchChange,
            onAddMention: (mention) => {
                setMentions([...mentions, mention.name]);
            },
            onRemoveMention: ({ name }) => {
                const newMentions = mentions.filter((m) => m !== name);
                setMentions(newMentions);
            },
            entryComponent: ({ option: { avatar, name } }) => (
                <>
                    <AccountAvatar avatar={avatar} username={name} size="5px" shape="circle" />
                    &nbsp; <strong className="user-name-mentions">{name}</strong>
                </>
            ),
            mentionsData: suggestions,
        },
        emojiConfig: {
            emojiData: emojiData,
        },
        dragAndDropImage: {
            handleDroppedFile: async (file) => {
                const uploadRet = await uploadImage({ variables: { image: file } });
                if (uploadRet.data) {
                    const { src } = uploadRet.data.uploadImage;
                    if (src === null) {
                        notification.error({
                            message: 'Failed to upload File',
                            description: "Couldn't upload file to the server (file type not allowed).",
                            placement: 'topRight',
                        });
                        return;
                    }
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
                    isMobile={isMobile}
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

Editor.propTypes = {
 initialState: PropTypes.string.isRequired,
 containerRef: PropTypes.any.isRequired,
 user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    banned: PropTypes.bool.isRequired,
    banReason: PropTypes.string
 }),
 mentions: PropTypes.arrayOf(
   PropTypes.shape({
       id: PropTypes.number.isRequired,
       avatar: PropTypes.string,
       username: PropTypes.string.isRequired,
       banned: PropTypes.bool.isRequired,
       banReason: PropTypes.string
   })
 ),
 setMentions: PropTypes.func.isRequired,
 isMobile: PropTypes.bool.isRequired
}

export default Editor;
