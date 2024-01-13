import { useState, lazy, Suspense } from 'react';
import { Tooltip, Badge, Modal, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMicrophone,
    faUpload,
    faCloudArrowUp,
    faTrash,
    faUndo,
    faRedo,
} from '@fortawesome/free-solid-svg-icons';
import { FooterProps } from './editorTypes';
import './Toolbar.css';

const ImageModal = lazy(() => import('./ImageModal/ImageModal'));
const InlineImageModal = lazy(
    () => import('./InlineImageModal/InlineImageModal')
);
const UpdateInlineImageDialog = lazy(
    () => import('./InlineImageModal/UpdateInlineImageModal')
);

const EditorFooter = (props: FooterProps) => {
    const {
        inlineModalUpdateVisible,
        setInlineModalUpdateVisible,
        inlineImagemodalProps,
        inlineImageModalVisible,
        setInlineImageModalVisible,
        insertImage,
        insertInlineImage,
        editor,
        canUndo,
        canRedo,
        t,
    } = props;

    const [isSpeechToText, setIsSpeechToText] = useState(false);
    const [imageURL, setImageURL] = useState<string | null>('');
    const [altText, setAltText] = useState('');
    const [position, setPostion] = useState('left');
    const [showCaption, setShowCaption] = useState(false);
    const [uploadModalVisible, setUploadModalVisible] = useState(false);
    const toggleModalVisible = () => setUploadModalVisible(!uploadModalVisible);

    const SUPPORT_SPEECH_RECOGNITION =
        'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;

    const modalButtonsText = {
        okText: t('ok'),
        cancelText: t('cancel'),
    };

    const modalMainProps = {
        imageModal: {
            title: t('toolbar.uploadImage'),
            open: uploadModalVisible,
            onOk: () => {
                if (imageURL) insertImage({ src: imageURL, altText: altText });

                toggleModalVisible();
                setImageURL('');
            },
            okButtonProps: {
                disabled:
                    (imageURL ?? '').trim() === '' || altText.trim() === '',
            },
            onCancel: () => {
                toggleModalVisible();
                setImageURL('');
            },
        },
        inlineModalUpdate: {
            title: t('inlineModalUpdateTitle'),
            open: inlineModalUpdateVisible,
            onCancel: () => {
                setInlineModalUpdateVisible(false);
            },
            footer: null,
        },
        inlineImageModal: {
            title: t('imageModal.inlineImageModalTitle'),
            open: inlineImageModalVisible,
            onOk: () => {
                const payload = {
                    altText,
                    position,
                    showCaption,
                    src: imageURL ?? '',
                };
                if (imageURL) {
                    insertInlineImage(payload);
                }
                setInlineImageModalVisible(false);
                setImageURL('');
            },
            okButtonProps: {
                disabled:
                    (imageURL ?? '').trim() === '' || altText.trim() === '',
            },
            onCancel: () => {
                setInlineImageModalVisible(false);
                setImageURL('');
            },
        },
    };

    return (
        <div className="toolbar-footer">
            {SUPPORT_SPEECH_RECOGNITION ? (
                <>
                    <Tooltip
                        placement="bottom"
                        title={t('toolbar.speechToText')}
                        key="SPEECH_TO_TEXT"
                    >
                        <button
                            aria-label={t('toolbar.speechToText')}
                            className="toolbar-style-button"
                            key="SPEECH_TO_TEXT"
                            onClick={() => {
                                editor.executeCommand(
                                    'SPEECH_TO_TEXT',
                                    !isSpeechToText
                                );
                                setIsSpeechToText(!isSpeechToText);
                            }}
                        >
                            <Badge
                                dot={true}
                                status={isSpeechToText ? 'success' : 'default'}
                            >
                                <FontAwesomeIcon
                                    icon={faMicrophone}
                                    size="lg"
                                />
                            </Badge>
                        </button>
                    </Tooltip>
                </>
            ) : null}
            <Tooltip
                placement="bottom"
                title={t('toolbar.uploadImage')}
                key="UPLOAD_IMAGE_TOOLTIP"
            >
                <button
                    aria-label={t('toolbar.uploadImage')}
                    className="toolbar-style-button"
                    key="UPLOAD_IMAGE"
                    onClick={toggleModalVisible}
                >
                    <FontAwesomeIcon icon={faUpload} size="lg" />
                </button>
            </Tooltip>
            <Tooltip
                placement="bottom"
                title={t('toolbar.inlineImage')}
                key="INLINE_IMAGE_UPLOAD_TOOLTIPO"
            >
                <button
                    aria-label={t('toolbar.inlineImage')}
                    className="toolbar-style-button"
                    key="UPLOAD_inline_IMAGE"
                    onClick={() => setInlineImageModalVisible(true)}
                >
                    <FontAwesomeIcon icon={faCloudArrowUp} size="lg" />
                </button>
            </Tooltip>
            <Tooltip
                placement="bottom"
                title={t('toolbar.clearEditor')}
                key="clear"
            >
                <button
                    aria-label={t('toolbar.clearEditor')}
                    className="toolbar-style-button"
                    key="CLEAR"
                    onClick={() => editor.clear()}
                >
                    <FontAwesomeIcon icon={faTrash} size="lg" />
                </button>
            </Tooltip>
            <Tooltip
                placement="bottom"
                title={t('toolbar.undo')}
                key="undo-tooltip"
            >
                <button
                    aria-label={t('toolbar.undo')}
                    className="toolbar-style-button"
                    key="UNDO"
                    onClick={() => editor.executeCommand('UNDO', null)}
                >
                    <FontAwesomeIcon
                        icon={faUndo}
                        color={canUndo ? 'black' : 'gainsboro'}
                        size="lg"
                    />
                </button>
            </Tooltip>
            <Tooltip
                placement="bottom"
                title={t('toolbar.redo')}
                key="redo-tooltip"
            >
                <button
                    aria-label={t('toolbar.redo')}
                    className="toolbar-style-button"
                    key="REDO"
                    onClick={() => editor.executeCommand('REDO', null)}
                >
                    <FontAwesomeIcon
                        icon={faRedo}
                        color={canRedo ? 'black' : 'gainsboro'}
                        size="lg"
                    />
                </button>
            </Tooltip>
            <span>
                <Badge
                    dot={true}
                    status={isSpeechToText ? 'processing' : 'error'}
                />
                &nbsp;{' '}
                {isSpeechToText ? <strong>REC</strong> : <strong>OFF</strong>}
            </span>
            <Modal {...modalButtonsText} {...modalMainProps['imageModal']}>
                <Suspense fallback={<Spin />}>
                    <ImageModal
                        t={t}
                        imageURL={imageURL}
                        setImageURL={setImageURL}
                        altText={altText}
                        setAltText={setAltText}
                    />
                </Suspense>
            </Modal>
            <Modal
                {...modalButtonsText}
                {...modalMainProps['inlineModalUpdate']}
            >
                <Suspense fallback={<Spin />}>
                    <UpdateInlineImageDialog
                        {...inlineImagemodalProps}
                        onClose={() => setInlineModalUpdateVisible(false)}
                        t={t}
                    />
                </Suspense>
            </Modal>
            <Modal
                {...modalButtonsText}
                {...modalMainProps['inlineImageModal']}
            >
                <Suspense fallback={<Spin />}>
                    <InlineImageModal
                        imageURL={imageURL ?? ''}
                        setImageURL={setImageURL}
                        altText={altText}
                        setAltText={setAltText}
                        position={position}
                        setPosition={setPostion}
                        showCaption={showCaption}
                        setShowCaption={setShowCaption}
                        t={t}
                    />
                </Suspense>
            </Modal>
        </div>
    );
};

export default EditorFooter;
