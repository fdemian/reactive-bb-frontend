import { useEffect } from 'react';
import Loading from '../Loading/LoadingIndicator';
import { useParams, Navigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { VALIDATE_USER } from './Mutations';

export const Component = () => {
    let { token } = useParams();
    const [validateUser, { loading, data }] = useMutation(VALIDATE_USER);

    useEffect(() => {
        validateUser({
            variables: {
                token: token,
            },
        });
    }, [validateUser, token]);

    if (loading || !data) return <Loading />;

    if (!data.validateUser.ok) {
        return <p>Error</p>;
    } else {
        return (
            <Navigate
                to={`/registersuccess/${data.validateUser.id}`}
                replace={true}
            />
        );
    }
};
