import { useState } from 'react';
import { Input, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck} from '@fortawesome/free-solid-svg-icons';
import './Toolbar.css';

type TweetToolbarProps = {
    insertTweet:(t:string) => void;
    toggleToolbar: () => void;
    t:(key:string) => string;
}

const TweetToolbar = ({ insertTweet, toggleToolbar, t }:TweetToolbarProps) => {
    const [tweetURL, setTweetURL] = useState('');

    return (
        <div className="toolbar">
            <div className="toolbar-single">
                <Input
                    className="tweet-toolbar-url-input"
                    role="textbox"
                    aria-label="Tweet URL"
                    placeholder="https://twitter.com/<user>/status/<tweetId>"
                    value={tweetURL}
                    onChange={(e) => setTweetURL(e.target.value)}
                />
                &nbsp;
                <span className="tweet-toolbar-confirm-buttons">
          <Button
              danger
              type="primary"
              onClick={toggleToolbar}
              className="cancel-darkred-btn"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
              &nbsp; {t('toolbar.cancel')}
          </Button>
                    &nbsp;
                    <Button
                        type="primary"
                        onClick={() => {
                            insertTweet(tweetURL);
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

export default TweetToolbar;
