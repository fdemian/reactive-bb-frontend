import { useState } from 'react';
import { Input, Form, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck} from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types";

const InsertImageToolbar = ({ okFn, cancelFn, t }) => {
    const [form] = Form.useForm();
    const [imageURL, setImageURL] = useState('');
    const [altText, setAltText] = useState('');

    return (
    <Form
        role="form"
        form={form}
        aria-label="Image form"
        name="insertImage"
        onFinish={() => {}}
        onFinishFailed={() => {}}
        autoComplete="off"
        layout="inline"
        onSubmit={() => {}}
        hideRequiredMark
    >
        <Form.Item label="URL" name="url" rules={[]}>
            <Input
                className="img-url-input"
                name="url"
                role="textbox"
                aria-label="URL"
                placeholder="URL"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
            />
        </Form.Item>
        <Form.Item
            label={t("imageModal.altText")}
            name="alttext"
            rules={[]}
        >
            <Input
                className="alt-text-input"
                name="alttext"
                aria-label={t("imageModal.altText")}
                placeholder={t("imageModal.altText")}
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
            />
        </Form.Item>
        <span className="insert-image-buttons">
            <Button danger type="primary" onClick={cancelFn} className="cancel-darkred-btn insert-cancel-btn">
              <FontAwesomeIcon icon={faTimes} size="lg" />
                &nbsp; {t('toolbar.cancel')}
            </Button>
            &nbsp;
            <Button type="primary" onClick={() => okFn({ src: imageURL, altText: altText })}>
              <FontAwesomeIcon icon={faCheck} size="lg" />
              &nbsp; {t('toolbar.confirm')}
            </Button>
        </span>
    </Form>
    );
};

InsertImageToolbar.propTypes = {
    okFn: PropTypes.func.isRequired,
    cancelFn: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
};

export default InsertImageToolbar;
