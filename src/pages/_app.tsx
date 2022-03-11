/* eslint-disable */
import { muiTheme } from '@/styles/baseStyles';
import '@/styles/globalStyles.css';
import { ThemeProvider } from '@material-ui/core/styles';
import 'nprogress/nprogress.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Layout from '@/components/Layout';
import { useNProgress } from '@/hooks';
import { client } from '@/app/apolloClient';
import { ApolloProvider } from '@apollo/client';

function App({ Component, pageProps }): JSX.Element {
  useNProgress();

  return (
    <ThemeProvider theme={muiTheme}>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
