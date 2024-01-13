import App from '../App/App';
import ErrorBoundary from '../App/ErrorBoundary';
import PrivateRoute from './PrivateRoute';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        index: true,
        lazy: () => import('../Topics/Topics'),
      },
      {
        path: 'login',
        lazy: () => import('../Login/Login'),
      },
      {
        path: 'logout',
        lazy: () => import('../Logout/Logout'),
      },
      {
        path: 'register',
        lazy: () => import('../Register/Register'),
      },

      {
        path: 'registersuccess/:id',
        lazy: () => import('../Register/RegisterSuccess'),
      },
      {
        path: 'activationinfo/:mail',
        lazy: () => import('../Register/ActivationInfo'),
      },
      {
        path: 'activation/:token',
        lazy: () => import('../Register/UserActivation'),
      },
      {
        path: 'banned',
        async lazy() {
          const { Banned } = await import('../Banned/Banned');
          const props = {
            requiresActiveUser: false,
            modRoute: false,
            adminRoute: false,
          };
          return {
            Component: () => <PrivateRoute {...props} component={Banned} />,
          };
        },
      },
      {
        path: 'modcp',
        async lazy() {
          const { Component } = await import(
            '../ModerationPanel/ModerationPanel'
          );
          const props = {
            requiresActiveUser: true,
            modRoute: true,
            adminRoute: false,
          };
          return {
            Component: () => <PrivateRoute {...props} component={Component} />,
          };
        },
      },
      {
        path: 'admincp',
        async lazy() {
          const { Component } = await import('../AdminPanel/AdminPanel');
          const props = {
            requiresActiveUser: true,
            modRoute: true,
            adminRoute: true,
          };
          return {
            Component: () => <PrivateRoute {...props} component={Component} />,
          };
        },
      },
      {
        path: 'topics/new',
        async lazy() {
          const { Component } = await import('../NewTopic/TopicsComposer');
          const props = {
            requiresActiveUser: true,
            modRoute: false,
            adminRoute: false,
          };
          return {
            Component: () => <PrivateRoute {...props} component={Component} />,
          };
        },
      },
      {
        path: 'topics/:id/:postName/:selectedPost',
        lazy: () => import('../Posts/Posts'),
      },
      {
        path: 'topics/:id/*',
        lazy: () => import('../Posts/Posts'),
      },
      {
        path: 'topics/:id/*',
        lazy: () => import('../Posts/Posts'),
      },
      {
        path: 'postlink/:id',
        lazy: () => import('../PostLink/PostLink'),
      },
      {
        path: 'categories',
        lazy: () => import('../Categories/Categories'),
      },
      {
        path: 'categories/:id/*',
        lazy: () => import('../Category/Category'),
      },
      {
        path: 'users/:id/:username',
        async lazy() {
          const { Component } = await import('../User/User');
          const props = {
            requiresActiveUser: false,
            modRoute: false,
            adminRoute: false,
          };
          return {
            Component: () => <PrivateRoute {...props} component={Component} />,
          };
        },
      },
      {
        path: 'settings',
        async lazy() {
          const { Settings } = await import('../AccountSettings/Settings');
          const props = {
            requiresActiveUser: true,
            modRoute: false,
            adminRoute: false,
          };
          return {
            Component: () => <PrivateRoute {...props} component={Settings} />,
          };
        },
      },

      {
        path: 'bookmarks',
        async lazy() {
          const { Component } = await import('../Bookmarks/Bookmarks');
          const props = {
            requiresActiveUser: false,
            modRoute: false,
            adminRoute: false,
          };
          return {
            Component: () => <PrivateRoute {...props} component={Component} />,
          };
        },
      },
      {
        path: 'search',
        async lazy() {
          const { Component } = await import('../Search/Search');
          const props = {
            requiresActiveUser: false,
            modRoute: false,
            adminRoute: false,
          };
          return {
            Component: () => <PrivateRoute {...props} component={Component} />,
          };
        },
      },
      {
        path: 'messages',
        async lazy() {
          const { Component } = await import('../Messages/Messages');
          const props = {
            requiresActiveUser: false,
            modRoute: false,
            adminRoute: false,
          };
          return {
            Component: () => <PrivateRoute {...props} component={Component} />,
          };
        },
      },
      {
        path: 'notifications',
        async lazy() {
          const { Component } = await import('../Notifications/Notifications');
          const props = {
            requiresActiveUser: false,
            modRoute: false,
            adminRoute: false,
          };
          return {
            Component: () => <PrivateRoute {...props} component={Component} />,
          };
        },
      },
      {
        path: 'oauth/:service',
        lazy: () => import('../Oauth/Oauth'),
      },
      {
        path: 'autherror/:service',
        lazy: () => import('../Oauth/OauthError'),
      },
      {
        path: 'forgotpass',
        lazy: () => import('../ResetPassword/ResetPassword'),
      },
      {
        path: 'resetpass/:token',
        lazy: () => import('../ResetPassword/ActivateNewPassword'),
      },
      {
        path: '*',
        lazy: () => import('./NoMatch'),
      },
    ],
  },
];

export default routes;
