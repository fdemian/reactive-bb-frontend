import PropTypes from "prop-types";
import { useState } from 'react';
import {
    Input,
    Button,
    Checkbox,
    Select
} from 'antd';
import { $getNodeByKey } from "kalliope";

const UpdateInlineImageDialog = ({ activeEditor, nodeKey, onClose, t }) => {

    const editorState = activeEditor.getEditorState();
    const node = editorState.read(
        () => $getNodeByKey(nodeKey)
    );
    const [altText, setAltText] = useState(node.getAltText());
    const [showCaption, setShowCaption] = useState(node.getShowCaption());
    const [position, setPosition] = useState(node.getPosition());

    const handleShowCaptionChange = (e) => setShowCaption(e.target.checked);
    const handlePositionChange = (e) => setPosition(e);

    const handleOnConfirm = () => {
        const payload = {altText, position, showCaption};
        if (node) {
            activeEditor.update(() => {
                node.update(payload);
            });
        }
        onClose();
    };

    const options = [
        {
            value: "left",
            label: t("imageModal.positionLeft")
        },
        {
            value: "right",
            label:  t("imageModal.positionRight")
        },
        {
            value: "full",
            label: t("imageModal.positionFullWidth")
        }
    ];

    return(
    <>
        <div>
            <Input
                role="textbox"
                name="alttext"
                aria-label={t("imageModal.altText")}
                placeholder={t("imageModal.altText")}
                style={{ width: 'calc(100% - 200px)' }}
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
            />
        </div>
        <br />
        <div>
            <Select
                size="default"
                label={t("imageModal.selectPosition")}
                name="position"
                id="position-select"
                value={position}
                placeholder={t("imageModal.selectPosition")}
                onChange={handlePositionChange}
                style={{marginBottom: '1em', width: '208px'}}
                options={options}
            />
        </div>
        <div>
            &nbsp; <Checkbox checked={showCaption} onChange={handleShowCaptionChange} /> &nbsp; {t("imageModal.showCaption")}
        </div>
        <br />
        <Button
            danger
            type="primary"
            onClick={onClose}
        >
            {t("cancel")}
        </Button>
        <Button
          style={{marginLeft:"5px"}}
          type="primary"
          onClick={() => handleOnConfirm()}>
            {t("ok")}
        </Button>
    </>
    )
};

UpdateInlineImageDialog.propTypes = {
  activeEditor: PropTypes.any.isRequired,
  nodeKey: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default UpdateInlineImageDialog;