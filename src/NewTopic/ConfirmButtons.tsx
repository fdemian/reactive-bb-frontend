import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faClose, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Composer.css';

type ConfirmButtonProps = {
    isDraft: boolean;
    editing: boolean;
    postStoryContent: () => void;
    postAsDraftFn: () => void;
    t:(key:string) => string;
};

const ConfirmButtons = (props:ConfirmButtonProps) => {
    const {
        isDraft,
        editing,
        postStoryContent /*,
		postAsDraftFn*/,
        t,
    } = props;

    const acceptText = editing ? t('editTopic') : t('createTopic');
    const acceptIcon = editing ? faEdit : faPlus;
    const navigate = useNavigate();
    //const draftText  = editing ? "Save draft" : "Save as draft";

    // New story. The user can save a draft.
    if (!editing)
        return (
            <Button.Group size="large">
                <Button
                    className="cancel-button"
                    danger
                    type="primary"
                    aria-label={t('cancel')}
                    size="large"
                    onClick={() => navigate('/')}
                >
                    <FontAwesomeIcon icon={faClose} size="lg" />
                    &nbsp; {t('cancel')}
                </Button>
                <Button
                    className="accept-button"
                    aria-label={acceptText}
                    type="primary"
                    size="large"
                    onClick={postStoryContent}
                >
                    <FontAwesomeIcon icon={acceptIcon} size="lg" />
                    &nbsp; {acceptText}
                </Button>
                {/*
    <Button
        type="primary"
        size="default"
        onClick={postAsDraftFn}
				disabled
      >
       <FontAwesomeIcon icon={saveDraftIcon} size="lg" />
       &nbsp; {draftText}
    </Button>
		*/}
            </Button.Group>
        );

    // Already existing story saved as draft.
    if (isDraft)
        return (
            <Button.Group size="large">
                <Button
                    className="cancel-button"
                    aria-label={t('cancel')}
                    danger
                    type="primary"
                    size="large"
                    onClick={() => navigate('/')}
                >
                    <FontAwesomeIcon icon={faClose} size="lg" />
                    &nbsp; {t('cancel')}
                </Button>
                <Button
                    aria-label={acceptText}
                    className="accept-button"
                    type="primary"
                    size="large"
                    onClick={postStoryContent}
                >
                    <FontAwesomeIcon icon={acceptIcon} size="lg" />
                    &nbsp; {acceptText}
                </Button>
                {/*
	  <Button
	    type="primary"
	    size="default"
	    className="PublishDraftButton"
	    onClick={postAsDraftFn}
	  >
	   <FontAwesomeIcon icon={acceptIcon} size="lg" />
	   &nbsp; {acceptText}
	 </Button>*/}
            </Button.Group>
        );

    // Already published story (was not saved as a draft).
    return (
        <Button.Group size="large">
            <Button
                aria-label={t('cancel')}
                className="cancel-button"
                danger
                size="large"
                onClick={() => navigate('/')}
            >
                <FontAwesomeIcon icon={faTimes} size="lg" />
                &nbsp; {t('cancel')}
            </Button>
            <Button
                className="accept-button"
                aria-label={acceptText}
                type="primary"
                size="large"
                onClick={postStoryContent}
            >
                <FontAwesomeIcon icon={acceptIcon} size="lg" />
                &nbsp; {acceptText}
            </Button>
        </Button.Group>
    );
};

export default ConfirmButtons;
