import { Component as Topics } from '../Topics/Topics';
import { Component as Login } from '../Login/Login';
import { Component as Banned } from '../Banned/Banned';
import { Component as Logout } from '../Logout/Logout';
import { Component as Categories } from '../Categories/Categories';
import { Component as Category } from '../Category/Category';
import { Component as Register } from '../Register/Register';
import { Component as RegisterSuccess } from '../Register/RegisterSuccess';
import { Component as ActivationInfo } from '../Register/ActivationInfo';
import { Component as UserActivation } from '../Register/UserActivation';
import { Component as ModerationPanel } from '../ModerationPanel/ModerationPanel';
import { Component as AdminPanel } from '../AdminPanel/AdminPanel';
import { Component as TopicComposer } from '../NewTopic/TopicsComposer';
import { Component as Posts } from '../Posts/Posts';
import { Component as PostLink } from '../PostLink/PostLink';
import { Component as User } from '../User/User';
import { Settings as Settings } from '../AccountSettings/Settings';
import { Component as Bookmarks } from '../Bookmarks/Bookmarks';
import { Component as Search } from '../Search/Search';
import { Component as Messages } from '../Messages/Messages';
import { Component as Notifications } from '../Notifications/Notifications';
import { Component as Oauth } from '../Oauth/Oauth';
import { Component as OauthError } from '../Oauth/OauthError';
import { Component as ResetPassword } from '../ResetPassword/ResetPassword';
import { Component as ActivateNewPassword } from '../ResetPassword/ActivateNewPassword';
import { Component as NoMatch } from './NoMatch';

import App from '../App/App';
import ErrorBoundary from '../App/ErrorBoundary';
import PrivateRoute from './PrivateRoute';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    hydrateFallbackElement: <div>Loading</div>,
    children: [
      {
        path: '/',
        index: true,
        Component: Topics,
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'logout',
        Component: Logout,
      },
      {
        path: 'register',
        Component: Register,
      },
      {
        path: 'registersuccess/:id',
        Component: RegisterSuccess,
      },
      {
        path: 'activationinfo/:mail',
        Component: ActivationInfo,
      },
      {
        path: 'activation/:token',
        Component: UserActivation,
      } /**/,
      {
        path: 'banned',
        Component: () => {
          const props = {
            requiresActiveUser: false,
            modRoute: false,
            adminRoute: false,
          };
          return <PrivateRoute {...props} component={Banned} />;
        },
      } /**/,
      {
        path: 'modcp',
        Component: () => {
          const props = {
            requiresActiveUser: true,
            modRoute: true,
            adminRoute: false,
          };
          return <PrivateRoute {...props} component={ModerationPanel} />;
        },
      } /**/,
      {
        path: 'admincp',
        Component: () => {
          const props = {
            requiresActiveUser: true,
            modRoute: true,
            adminRoute: true,
          };
          return <PrivateRoute {...props} component={AdminPanel} />;
        },
      } /**/,
      {
        path: 'topics/new',
        Component: () => {
          const props = {
            requiresActiveUser: true,
            modRoute: false,
            adminRoute: false,
          };
          return <PrivateRoute {...props} component={TopicComposer} />;
        },
      } /**/,
      {
        path: 'topics/:id/:postName/:selectedPost',
        Component: Posts,
      },
      {
        path: 'topics/:id/*',
        Component: Posts,
      },
      {
        path: 'topics/:id/*',
        Component: Posts,
      },
      {
        path: 'postlink/:id',
        Component: PostLink,
      },
      {
        path: 'categories',
        Component: Categories,
      },
      {
        path: 'categories/:id/*',
        Component: Category,
      },
      {
        path: 'users/:id/:username',
        Component: () => {
          const props = {
            requiresActiveUser: false,
            modRoute: false,
            adminRoute: false,
          };
          return <PrivateRoute {...props} component={User} />;
        },
      },
      {
        path: 'settings',
        Component: () => {
          const props = {
            requiresActiveUser: true,
            modRoute: false,
            adminRoute: false,
          };
          return <PrivateRoute {...props} component={Settings} />;
        },
      },
      {
        path: 'bookmarks',
        Component: () => {
          const props = {
            requiresActiveUser: false,
            modRoute: false,
            adminRoute: false,
          };
          return <PrivateRoute {...props} component={Bookmarks} />;
        },
      },
      {
        path: 'search',
        Component: () => {
          const props = {
            requiresActiveUser: false,
            modRoute: false,
            adminRoute: false,
          };
          return <PrivateRoute {...props} component={Search} />;
        },
      } /**/,
      {
        path: 'messages',
        Component: () => {
          const props = {
            requiresActiveUser: false,
            modRoute: false,
            adminRoute: false,
          };
          return <PrivateRoute {...props} component={Messages} />;
        },
      } /**/,
      {
        path: 'notifications',
        Component: () => {
          const props = {
            requiresActiveUser: false,
            modRoute: false,
            adminRoute: false,
          };
          return <PrivateRoute {...props} component={Notifications} />;
        },
      },
      {
        path: 'oauth/:service',
        Component: Oauth,
      },
      {
        path: 'autherror/:service',
        Component: OauthError,
      },
      {
        path: 'forgotpass',
        Component: ResetPassword,
      },
      {
        path: 'resetpass/:token',
        Component: ActivateNewPassword,
      },
      {
        path: '*',
        Component: NoMatch,
      },
    ],
  },
];

export default routes;
