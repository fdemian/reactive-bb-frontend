import PropTypes from "prop-types";
import { Button, Switch } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck} from '@fortawesome/free-solid-svg-icons';
import KatexSelector from './KatexSelector';
import KatexRenderer from './KatexRenderer';

const EditorModal = ({cancelFn, okFunction, inline, setInline, equation, setEquation, t }) => {
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

EditorModal.propTypes = {
    cancelFn: PropTypes.func.isRequired,
    okFunction: PropTypes.func.isRequired,
    inline: PropTypes.bool.isRequired,
    setInline: PropTypes.func.isRequired,
    equation: PropTypes.string.isRequired,
    setEquation: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
};

export default EditorModal;
