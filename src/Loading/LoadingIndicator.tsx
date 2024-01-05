import { Spin, Alert } from 'antd';

const Loading = (): React.ReactElement => {
    return (
        <div className="loading-indicator">
            <Spin tip="Loading...">
                <Alert message="Loading" description="Please wait." type="info" />
            </Spin>
        </div>
    );
};

export default Loading;