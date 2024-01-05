import { Input, Radio, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const { TextArea } = Input;

const FlagPostModal = ({ flagReasonValue, setFlagReasonValue, setFlagTextValue }) => {
    const { t } = useTranslation('modcp', { keyPrefix: 'modcp' });

    const onChange = (e) => {
        setFlagReasonValue(e.target.value);
    };

    const onReasonTextChange = (e) => {
        const val = e.target.value;
        if (val.trim() === '') return;
        setFlagTextValue(e.target.value);
    };

    return (
        <>
            <div>
                <h1>{t('flagReason-0')}</h1>
                <Radio.Group onChange={onChange} value={flagReasonValue}>
                    <Space direction="vertical">
                        <Radio value={1}>{t('flagReason-1')}</Radio>
                        <Radio value={2}>{t('flagReason-2')}</Radio>
                        <Radio value={3}>{t('flagReason-3')}</Radio>
                        <Radio value={4}>{t('flagReason-other')}</Radio>
                    </Space>
                </Radio.Group>
            </div>
            <br />
            {flagReasonValue === 4 ? <TextArea rows={4} onChange={onReasonTextChange} /> : null}
        </>
    );
};

FlagPostModal.propTypes = {
    flagReasonValue: PropTypes.number.isRequired,
    setFlagReasonValue: PropTypes.func.isRequired,
    setFlagTextValue: PropTypes.func.isRequired,
};

export default FlagPostModal;
