import { useState } from 'react';
import { Input, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import './Toolbar.css';

interface InstagramToolbarProps {
  insertInstagram: (t: string) => void;
  toggleToolbar: () => void;
  t: (key: string) => string;
}

const InstagramToolbar = ({ insertInstagram, toggleToolbar, t }: InstagramToolbarProps) => {
  const [igUrl, setIgUrl] = useState('');

  return (
    <div className="toolbar">
      <div className="toolbar-single">
        <Input
          className="tweet-toolbar-url-input"
          role="textbox"
          aria-label="Tweet URL"
          placeholder="https://www.instagram.com/p/<igId>/"
          value={igUrl}
          onChange={(e) => { setIgUrl(e.target.value); }}
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
              insertInstagram(igUrl);
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

export default InstagramToolbar;
