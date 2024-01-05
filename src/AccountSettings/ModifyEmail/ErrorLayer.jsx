import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ErrorLayer = ({ error, tr }) => {
    if (!error) return null;

    return (
        <div className="security-view password-success-layer">
            <FontAwesomeIcon
                icon={faTimes}
                size="2x"
                color="red"
                className="alert-circle"
            />
            <p>{tr('update.email.fail')}</p>
        </div>
    );
};

ErrorLayer.propTypes = {
    error: PropTypes.bool.isRequired,
    tr: PropTypes.func.isRequired,
};
export default ErrorLayer;
