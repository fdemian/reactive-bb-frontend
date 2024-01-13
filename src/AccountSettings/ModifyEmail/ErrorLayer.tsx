import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ApolloError } from '@apollo/client';

type ErrorLayerProps = {
    error: ApolloError | undefined;
    tr: (key: string) => string;
};

const ErrorLayer = ({ error, tr }: ErrorLayerProps) => {
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

export default ErrorLayer;
