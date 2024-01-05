import { Alert } from 'antd';
import PropTypes from "prop-types";

const ErrorLayout = ({ tr, isError, message, onClose }) => {
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

ErrorLayout.propTypes = {
  tr: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ErrorLayout;
