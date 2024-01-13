import { Button, Switch } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import KatexSelector from './KatexSelector';
import KatexRenderer from './KatexRenderer';

type OkFnProps = { equation: string; inline: boolean };

type EditorModalProps = {
  cancelFn: (p: any) => void;
  okFunction: (p: OkFnProps) => void;
  inline: boolean;
  setInline: (p: boolean) => void;
  equation: string;
  setEquation: (p: string) => void;
  t: (key: string) => string;
};

const EditorModal = ({
  cancelFn,
  okFunction,
  inline,
  setInline,
  equation,
  setEquation,
  t,
}: EditorModalProps) => {
  return (
    <>
      <div>
        <KatexSelector equation={equation} setEquation={setEquation} t={t} />
        &nbsp;
        <Switch
          size="default"
          checkedChildren="Inline"
          unCheckedChildren="Block"
          onChange={setInline}
          defaultChecked
        />
        <KatexRenderer equation={equation} inline={false} onClick={() => {}} />
        <div className="equation-confirmation-buttons">
          <Button
            danger
            type="primary"
            className="cancel-equation-btn"
            onClick={cancelFn}
          >
            {t('toolbar.cancel')} &nbsp;
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          &nbsp;
          <Button
            type="primary"
            aria-label={t('equationModal.insertEquationText')}
            onClick={() => okFunction({ equation: equation, inline: inline })}
          >
            {t('equationModal.insertEquationText')} &nbsp;
            <FontAwesomeIcon icon={faCheck} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditorModal;
