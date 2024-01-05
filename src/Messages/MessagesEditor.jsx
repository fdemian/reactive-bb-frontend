import PropTypes from 'prop-types';
import { Button } from 'antd';
import CalliopeEditor from 'kalliope';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faShare } from '@fortawesome/free-solid-svg-icons';
import { notification } from 'antd';
import './Messages.css';
import { getDefaultLocale } from '../App/utils';
import { useMutation } from '@apollo/client';
import { UPLOAD_IMAGE } from '../Editor/Queries';

const MessagesEditor = ({
                            initialState,
                            selectedUser,
                            sendMessage,
                            clearMessage,
                            containerRef,
                            t
                        }) => {
    const [uploadImage] = useMutation(UPLOAD_IMAGE);
    const locale = getDefaultLocale();
    const config = {
        placeholderText: '',
        initialState: initialState,
        isReadOnly: false,
        autoFocus: false,
        onError: (error) => {
            throw error;
        },
        plugins: [],
        dragAndDropImage: {
            handleDroppedFile: async (file) => {
                const uploadRet = await uploadImage({ variables: { image: file } });
                if (uploadRet.data) {
                    const { src } = uploadRet.data.uploadImage;
                    if (src === null) {
                        notification.error({
                            message: 'Failed to upload File',
                            description: "Couldn't upload file to the server (file type not allowed).",
                            placement: 'topRight'
                        });
                        return;
                    }
                    const imageSrc = `/static/uploads/${src}`;
                    containerRef.current.executeCommand('INSERT_IMAGE', {
                        src: imageSrc,
                        altText: src
                    });
                }
            }
        },
        collapsibleConfig: {
            open: false
        },
        mentions: {
            onSearchChange: () => {},
            onAddMention: (mention) => {
                console.clear();
                console.log(mention);
            },
            mentionsData: []
        },
        emojiConfig: {
            locale: locale
        }
    };

    return (
        <div className="messages-editor">
            <CalliopeEditor config={config} containerRef={containerRef} setFormats={() => {}} />
            <span className="button-group">
        <Button
            aria-label={t('clear')}
            className="chats-clear-button"
            onClick={clearMessage}
        >
          {t('clear')} &nbsp;
            <FontAwesomeIcon icon={faTrash} />
        </Button>
        <Button
            aria-label={t('send')}
            className="chats-send-button"
            type="primary"
            onClick={() => sendMessage(selectedUser, false)}
        >
          {t('send')} &nbsp;
            <FontAwesomeIcon icon={faShare} />
        </Button>
      </span>
        </div>
    );
};

MessagesEditor.propTypes = {
  initialState: PropTypes.string.isRequired,
  selectedUser: PropTypes.number.isRequired,
  sendMessage: PropTypes.func.isRequired,
  clearMessage: PropTypes.func.isRequired,
  containerRef: PropTypes.shape({
      current: PropTypes.shape({
          executeCommand: PropTypes.func.isRequired
      })
  }),
  t: PropTypes.func.isRequired
};

export default MessagesEditor;
