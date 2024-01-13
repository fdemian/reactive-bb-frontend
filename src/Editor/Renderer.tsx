import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import CalliopeEditor from 'kalliope';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import './Editor.css';

interface RendererParse { content: string | null }

const Renderer = ({ content }: RendererParse) => {
  const containerRef = useRef(null);

  let parsedContent;
  const { t } = useTranslation('editor', { keyPrefix: 'editor' });

  try {
    parsedContent = content;
  } catch {
    parsedContent = undefined;
  }

  const config = {
    placeholderText: '',
    initialState: parsedContent ?? undefined,
    readOnly: true,
    autoFocus: false,
    excalidrawConfig: {
      modal: () => <div></div>,
    },
    inlineImage: {
      showModal: () => {},
    },
    onError: (error: Error) => {
      throw error;
    },
    imageConfig: {
      addCaptionText: '',
      defaultCaptionText: '',
    },
    twitterConfig: {
      loadingComponent: ({ tweetId }: { tweetId: string }) => (
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
      sourceLinkComponent: ({ sourceLink }: { sourceLink: string }) => (
        <a href={sourceLink} className="source-link-component">
          <FontAwesomeIcon icon={faArrowUp} size="lg" />
        </a>
      ),
      authorComponent: null,
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
        containerRef={containerRef}
        setFormats={() => {}}
        config={config}
        setCanUndo={() => {}}
        setCanRedo={() => {}}
      />
    </div>
  );
};

export default Renderer;
