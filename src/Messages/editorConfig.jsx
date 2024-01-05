import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import AccountAvatar from '../UserAvatar/UserAvatar';
import { getDefaultLocale } from '../App/utils';

const locale = getDefaultLocale();

const config = {
    placeholderText: '',
    initialState: undefined,
    isReadOnly: false,
    autoFocus: false,
    onError: (error) => {
        throw error;
    },
    plugins: [],
    imageConfig: {},
    twitterConfig: {
        loadingComponent: ({ tweetId }) => <p>(ID={tweetId})</p>
    },
    citation: {
        sourceLinkComponent: ({ sourceLink }) => (
            <a href={sourceLink} className="source-link-component">
                <FontAwesomeIcon icon={faArrowUp} size="lg" />
            </a>
        )
    },
    mentions: {
        onSearchChange: () => {},
        onAddMention: (mention) => {
            console.clear();
            console.log(mention);
            //setMentions([...mentions, mention]);
        },
        entryComponent: ({ avatar, name }) => (
            <>
                <AccountAvatar avatar={avatar} username={name} size="5px" shape="circle" />
                &nbsp; <strong>{name}</strong>
            </>
        ),
        mentionsData: []
    },
    collapsibleConfig: {
        open: false
    },
    dragAndDropImage: {
        handleDroppedFile: async () => {
            /*
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
              */
        }
    },
    emojiConfig: {
        locale: locale
    }
};

export default config;
