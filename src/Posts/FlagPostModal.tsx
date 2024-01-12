import { Input, Radio, Space } from 'antd';
import { useTranslation } from 'react-i18next';

const { TextArea } = Input;

type FlagPostProps = {
    flagReasonValue:number;
    setFlagReasonValue:(p:number)=> void; 
    setFlagTextValue:(p:any)=> void;
};

const FlagPostModal = ({ flagReasonValue, setFlagReasonValue, setFlagTextValue }:FlagPostProps) => {
    const { t } = useTranslation('modcp', { keyPrefix: 'modcp' });

    const onChange = (e:any) => {
        setFlagReasonValue(e.target.value);
    };

    const onReasonTextChange = (e:any) => {
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

export default FlagPostModal;
