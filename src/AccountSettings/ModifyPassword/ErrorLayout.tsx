import { Alert } from 'antd';

interface ErrorLayoutProps {
  tr: (key: string) => string;
  isError: boolean;
  message: string;
  onClose: () => void;
}

const ErrorLayout = ({ tr, isError, message, onClose }: ErrorLayoutProps) => {
  if (!isError) return null;

  return (
    <Alert
      message={tr('passwordUpdateError')}
      description={message}
      onClose={onClose}
      type="error"
      closable
    />
  );
};

export default ErrorLayout;
