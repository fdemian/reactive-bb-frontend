import PropTypes from "prop-types";
import { useTranslation } from 'react-i18next';
import CalliopeEditor from 'kalliope';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import './Editor.css';

const Renderer = ({ content }) => {
    let parsedContent;
    const { t } = useTranslation('editor', { keyPrefix: 'editor' });

    try {
        parsedContent = content;
    } catch {
        parsedContent = undefined;
    }

    const config = {
        placeholderText: '',
        initialState: parsedContent,
        readOnly: true,
        onError: (error) => {
            throw error;
        },
        imageConfig: {
            addCaptionText: '',
            defaultCaptionText: '',
        },
        twitterConfig: {
            loadingComponent: ({ tweetId }) => (
                <p>
                    {t('internal.loadingTweet')}...(ID={tweetId})
                </p>
            ),
        },
        collapsibleConfig: {
            open: false,
        },
        emojiConfig: {
            emojiData: null,
        },
        citation: {
            sourceLinkComponent: ({ sourceLink }) => (
                <a href={sourceLink} className="source-link-component">
                    <FontAwesomeIcon icon={faArrowUp} size="lg" />
                </a>
            ),
        },
        plugins: [],
        mentions: {
            onSearchChange: () => {},
            onAddMention: () => {},
            entryComponent: () => {},
            mentionsData: [],
        },
        dragAndDropImage: {
            handleDroppedFile: () => {},
        },
    };

    return (
        <div className="renderer-readonly">
            <CalliopeEditor
                readOnly={config.readOnly}
                containerRef={null}
                setFormats={null}
                config={config}
            />
        </div>
    );
};

Renderer.propTypes = {
    content: PropTypes.string.isRequired
};

export default Renderer;