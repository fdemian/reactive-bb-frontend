import PropTypes from "prop-types";
import { useState } from 'react';
import { Input, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck} from '@fortawesome/free-solid-svg-icons';
import './Toolbar.css';

const VideoToolbar = ({ insertVideo, toggleToolbar, t }) => {
    const [videoURL, setVideoURL] = useState('');

    return (
        <div className="toolbar">
            <div className="toolbar-single">
                <Input
                    className="video-url-input"
                    role="textbox"
                    aria-label={t('toolbar.videoURL')}
                    placeholder={t('toolbar.videoURL')}
                    value={videoURL}
                    onChange={(e) => setVideoURL(e.target.value)}
                />
                &nbsp;
                <span className="video-toolbar-buttons">
          <Button
              danger
              type="primary"
              aria-label={t('toolbar.cancel')}
              onClick={toggleToolbar}
              className="cancel-darkred-btn"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
              &nbsp; {t('toolbar.cancel')}
          </Button>
                    &nbsp;
                    <Button
                        aria-label={t('toolbar.confirm')}
                        type="primary"
                        onClick={() => {
                            insertVideo(videoURL);
                            toggleToolbar();
                        }}
                    >
            <FontAwesomeIcon icon={faCheck} size="lg" />
                        &nbsp; {t('toolbar.confirm')}
          </Button>
        </span>
            </div>
        </div>
    );
};

VideoToolbar.propTypes = {
    insertVideo: PropTypes.func.isRequired,
    toggleToolbar: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
};


export default VideoToolbar;
