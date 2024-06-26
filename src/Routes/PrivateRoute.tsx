/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useApolloClient, useQuery } from '@apollo/client';
import { SET_LOGIN, GET_IS_LOGGED_IN } from '../Login/queries';
import { clearUser } from '../Login/authUtils';
import { getBanStatus, getUserType } from '../Login/authUtils';

export interface PrivateRoutePropsRedux {
  requiresActiveUser: boolean;
  modRoute: boolean;
  adminRoute: boolean;
}

interface PrivateRouteProps {
  component: () => React.ReactElement;
  requiresActiveUser: boolean;
  modRoute: boolean;
  adminRoute: boolean;
}

const PrivateRoute = ({
  component: Component,
  ...rest
}: PrivateRouteProps): React.ReactElement | null => {
  const navigate = useNavigate();
  const { requiresActiveUser, modRoute, adminRoute } = rest;
  const loginQuery = useQuery(GET_IS_LOGGED_IN);
  const isLoggedIn = loginQuery.data && loginQuery.data.loggedIn === true;
  const client = useApolloClient();
  const location = useLocation();
  const banStatus = getBanStatus();
  const userType = getUserType();

  const logoutFn = async () => {
    clearUser();
    await client.resetStore();
    client.writeQuery({
      query: SET_LOGIN,
      data: {
        loggedIn: false,
      },
      variables: {
        status: false,
      },
    });
  };

  if (!isLoggedIn) {
    logoutFn();
    const navigateProps = {
      to: '/login',
      state: { from: location },
    };
    return <Navigate {...navigateProps} />;
  }

  if (adminRoute && userType !== 'A') {
    navigate('/');
    return null;
  }

  if (modRoute && userType === 'U') {
    navigate('/');
    return null;
  }

  if (isLoggedIn && requiresActiveUser && banStatus.banned) {
    navigate('/banned');
    return null;
  }

  return <Component />;
};

export default PrivateRoute;
