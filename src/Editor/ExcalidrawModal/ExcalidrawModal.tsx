import { Modal, Drawer, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { getIsMobile } from '../../App/utils';
import './ExcalidrawModal.css';

type ExcalidrawModalProps = {
  excalidrawComponent: any;
  excaliDrawApi: any;
  discard: (e:any) => void;
  save: (e:any) => void;
  setExcalidrawAPI: (e:any) => void;
  onChange: (e:any) => void;
  initialElements: any[];
  initialAppState: any;
  initialFiles: any[];
  isShown: boolean;
};

const ExcalidrawModal = (props:ExcalidrawModalProps) => {

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
                    excalidrawAPI={(api:any) => setExcalidrawAPI(api)}
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

export default ExcalidrawModal;
