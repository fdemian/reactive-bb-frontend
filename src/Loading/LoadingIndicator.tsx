import { Spin, Alert } from 'antd';

const Loading = (): React.ReactElement => {
  return (
    <div className="loading-indicator">
      <Spin description="Loading...">
        <Alert title="Loading" description="Please wait." type="info" />
      </Spin>
    </div>
  );
};

export default Loading;
