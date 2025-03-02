import { Modal, Drawer, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { getIsMobile } from '../../App/utils';
import './ExcalidrawModal.css';
import { ReactElement } from 'react';

interface ExcalidrawModalProps {
  excalidrawComponent: ReactElement;
  setExcalidrawAPI: (api: any) => void;
  discard: () => void;
  save: () => void;
  onChange: () => void;
  closeOnClickOutside?: boolean | undefined;
  initialElements: readonly any[];
  initialAppState: any;
  initialFiles: any;
  isShown?: boolean | undefined;
  onClose: () => void;
  onDelete: () => void;
  onSave: (
    elements: readonly any[],
    appState: Partial<any>,
    files: any
  ) => void;
}

const ExcalidrawModal = (props: ExcalidrawModalProps) => {
  const {
    excalidrawComponent,
    setExcalidrawAPI,
    discard,
    save,
    onChange,
    initialElements,
    initialAppState,
    initialFiles,
    isShown = false,
  } = props;

  const isMobile = getIsMobile();
  const Excalidraw = excalidrawComponent;
  const ModalComponent = isMobile ? Drawer : Modal;
  const width = isMobile ? '100%' : 'auto';
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
          {t('modal.cancel')}
        </Button>,
        <Button key="ok" type="primary" onClick={save}>
          {t('modal.ok')}
        </Button>,
      ]}
    >
      <div className="excalidraw-modal-row">
        {' '}
        {/* @ts-expect-error */}
        <Excalidraw
          onChange={onChange}
          excalidrawAPI={(api: any) => {
            setExcalidrawAPI(api);
          }}
          initialData={{
            appState: initialAppState || { isLoading: false },
            elements: initialElements,
            files: initialFiles,
          }}
        />
      </div>
    </ModalComponent>
  );
};

export default ExcalidrawModal;
