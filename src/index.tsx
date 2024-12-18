import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './Routes/Routes';
import { useNewClient } from './apolloConfig';
import { ApolloProvider } from '@apollo/client';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18';
import 'antd/dist/reset.css';

const ReactiveBB = () => {
  const client = useNewClient();
  const router = createBrowserRouter(routes);

  return (
    <ApolloProvider client={client}>
      <I18nextProvider i18n={i18n}>
        <RouterProvider router={router} />
      </I18nextProvider>
    </ApolloProvider>
  );
};

export default ReactiveBB;
