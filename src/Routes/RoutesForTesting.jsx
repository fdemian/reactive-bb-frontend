import React from 'react';
import PrivateRoute from './PrivateRoute';
import Topics from '../Topics/Topics';
import Login from '../Login/Login';
import Logout from  '../Logout/Logout';
import Banned from '../Banned/Banned';
import { Component as  Categories } from '../Categories/Categories';
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
import { Component as Settings } from '../AccountSettings/Settings';
import { Component as Bookmarks } from '../Bookmarks/Bookmarks';
import { Component as Search } from '../Search/Search';
import { Component as Messages } from '../Messages/Messages';
import { Component as Notifications } from '../Notifications/Notifications';
import { Compnoent as Oauth } from '../Oauth/Oauth';
import { Compnoent as OauthError } from '../Oauth/OauthError';
import { Component as ResetPassword } from '../ResetPassword/ResetPassword';
import { Component as ActivateNewPassword } from '../ResetPassword/ActivateNewPassword';
import NoMatch from './NoMatch';

const routes = [
      {
        path: '/',
        index: true,
        Component: Topics,
        hydrateFallbackElement: <p>Loading</p>,
        action() {
          return {};
        },
      },
      {
        path: 'login',
        Component: Login,
        hydrateFallbackElement: <p>Loading</p>,
        action() {
          return {};
        },
      },
      {
        path: 'logout',
        Component: Logout,
        hydrateFallbackElement: <p>Loading</p>,
        action() {
          return {};
        },
      },
      {
        path: 'register',
        Component: Register,
        hydrateFallbackElement: <p>Loading</p>,
        action() {
          return {};
        },
      },
      {
        path: 'registersuccess/:id',
        Component: RegisterSuccess,
        hydrateFallbackElement: <p>Loading</p>,
      },
      {
        path: 'activationinfo/:mail',
        Component: ActivationInfo,
        hydrateFallbackElement: <p>Loading</p>,
        action() {
          return {};
        },
      },
      {
        path: 'activation/:token',
        Component: UserActivation,
        hydrateFallbackElement: <p>Loading</p>,
        action() {
          return {};
        },
      },
      {
        path: 'banned',
        Component: () => {
          const props = {
            requiresActiveUser: false,
            modRoute: false,
            adminRoute: false,
          };
          return <PrivateRoute {...props} component={<Banned/>} />;
        },
        hydrateFallbackElement: <p>Loading</p>,
        action() {
          return {};
        },
      },
      {
        path: 'modcp',
        Component: () => {
            const props = {
              requiresActiveUser: false,
              modRoute: false,
              adminRoute: false,
            };
            return <PrivateRoute {...props} component={<ModerationPanel />} />;
          },
          hydrateFallbackElement: <p>Loading</p>,
          action() {
            return {};
          },
      },
      {
        path: 'admincp',
        Component: () => {
            const props = {
              requiresActiveUser: false,
              modRoute: false,
              adminRoute: false,
            };
            return <PrivateRoute {...props} component={<AdminPanel />} />;
          },
          hydrateFallbackElement: <p>Loading</p>,
          action() {
            return {};
          },
      },
      {
        path: 'admincp',
        Component: () => {
            const props = {
              requiresActiveUser: false,
              modRoute: false,
              adminRoute: false,
            };
            return <PrivateRoute {...props} component={<AdminPanel />} />;
          },
          hydrateFallbackElement: <p>Loading</p>,
          action() {
            return {};
          },
      },
      {
        path: 'topics/new',
        Component: () => {
            const props = {
                requiresActiveUser: true,
                modRoute: false,
                adminRoute: false,
            };
            return {
              Component: () => <PrivateRoute {...props} component={TopicComposer} />,
            };
          },
          hydrateFallbackElement: <p>Loading</p>,
          action() {
            return {};
          },
      },
      {
        path: 'topics/:id/:postName/:selectedPost',
        Component: Posts,
        hydrateFallbackElement: <p>Loading</p>,
        action() {
          return {};
        },
      },
      {
        path: 'topics/:id/*',
        Component: Posts,
        hydrateFallbackElement: <p>Loading</p>,
        action() {
          return {};
        },
      },
      {
        path: 'topics/:id/*',
        Component: Posts,
        hydrateFallbackElement: <p>Loading</p>,
        action() {
          return {};
        },
      },
      {
        path: 'postlink/:id',
        Component: PostLink,
        hydrateFallbackElement: <p>Loading</p>,
        action() {
          return {};
        },
      },
      {
        path: 'categories',
        Component: Categories,
        hydrateFallbackElement: <p>Loading</p>,
        action() {
          return {};
        },
      },
      {
        path: 'categories/:id/*',
        Component: Category,
        hydrateFallbackElement: <p>Loading</p>,
      },
      {
        path: 'users/:id/:username',
        Component: () => {
         const props = {
            requiresActiveUser: false,
            modRoute: false,
            adminRoute: false,
          };
          return {
              Component: () => <PrivateRoute {...props} component={User} />,
          };
        },
        hydrateFallbackElement: <p>Loading</p>,
      },
      {
        path: 'settings',
        Component: () => {
         const props = {
            requiresActiveUser: true,
            modRoute: false,
            adminRoute: false
          };
          return {
              Component: () => <PrivateRoute {...props} component={Settings} />,
          };
        },
        hydrateFallbackElement: <p>Loading</p>,
      },
      {
        path: 'bookmarks',
        Component: () => {
         const props = {
            requiresActiveUser: false,
            modRoute: false,
            adminRoute: false,
          };
          return {
              Component: () => <PrivateRoute {...props} component={Bookmarks} />,
          };
        },
        hydrateFallbackElement: <p>Loading</p>,
      },
      {
        path: 'search',
        Component: () => {
            const props = {
               requiresActiveUser: false,
               modRoute: false,
               adminRoute: false,
             };
             return {
                 Component: () => <PrivateRoute {...props} component={<Suspense fallback={<p>Loading</p>}><Await><Search /></Await></Suspense>} />,
             };
           },
           hydrateFallbackElement: <p>Loading</p>,
      },
      {
        path: 'messages',
        Component: () => {
            const props = {
              requiresActiveUser: false,
              modRoute: false,
              adminRoute: false,
            };
            return {
              Component: () => <PrivateRoute {...props} component={Messages} />,
            };
           },
           hydrateFallbackElement: <p>Loading</p>,
      },
      {
        path: 'notifications',
        Component: () => {
            const props = {
              requiresActiveUser: false,
              modRoute: false,
              adminRoute: false,
            };
            return {
              Component: () => <PrivateRoute {...props} component={Notifications} />,
            };
           },
           hydrateFallbackElement: <p>Loading</p>,
      },
      {
        path: 'oauth/:service',
        Component: Oauth,
        hydrateFallbackElement: <p>Loading</p>,
      },
      {
        path: 'autherror/:service',
        Component: OauthError,
        hydrateFallbackElement: <p>Loading</p>,
      },
      {
        path: 'forgotpass',
        Component: ResetPassword,
        hydrateFallbackElement: <p>Loading</p>,
      },
      {
        path: 'resetpass/:token',
        Component: ActivateNewPassword,
        hydrateFallbackElement: <p>Loading</p>,
      },
      {
        path: '*',
        Component: NoMatch,
      },
];

export default routes;
