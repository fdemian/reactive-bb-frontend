import PropTypes from 'prop-types';
import { Modal, Drawer, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { getIsMobile } from '../../App/utils';
import './ExcalidrawModal.css';

const ExcalidrawModal = (props) => {

    const {
        excalidrawComponent,
        setExcalidrawAPI,
        discard,
        save,
        onChange,
        initialElements,
        initialAppState,
        initialFiles,
        isShown = false
    } = props;

    const isMobile = getIsMobile();
    const Excalidraw = excalidrawComponent;
    const ModalComponent = isMobile ? Drawer : Modal;
    const width = isMobile ? "100%" : "auto";
    const { t } = useTranslation('editor', { keyPrefix: 'editor' });

    return (
        <ModalComponent
            title="Excalidraw"
            open={isShown}
            onOk={save}
            onCancel={discard}
            tabIndex={-1}
            width={width}
            placement="left"
            footer={[
                <Button
                    className="cancel-darkred-btn"
                    key="cancel"
                    type="primary"
                    danger
                    onClick={discard}
                >
                    {t("modal.cancel")}
                </Button>,
                <Button
                    key="ok"
                    type="primary"
                    onClick={save}
                >
                    {t("modal.ok")}
                </Button>
            ]}
        >
            <div className="excalidraw-modal-row">
                <Excalidraw
                    onChange={onChange}
                    excalidrawAPI={(api) => setExcalidrawAPI(api)}
                    initialData={{
                        appState: initialAppState || {isLoading: false},
                        elements: initialElements,
                        files: initialFiles,
                    }}
                />
            </div>
        </ModalComponent>
    );
}

ExcalidrawModal.propTypes = {
    excalidrawComponent: PropTypes.any.isRequired,
    excaliDrawApi: PropTypes.any.isRequired,
    discard: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    initialElements: PropTypes.array.isRequired,
    initialAppState: PropTypes.any.isRequired,
    initialFiles: PropTypes.array.isRequired,
    isShown: PropTypes.bool.isRequired
};

export default ExcalidrawModal;
