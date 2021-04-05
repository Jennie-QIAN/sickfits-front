import NProgress from 'nprogress';
import Router from 'next/router';
import Page from "../components/Page";
import '../components/styles/nprogress.css';
import { ApolloProvider } from '@apollo/client';
import withData from '../lib/withData';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

//getInitialProps is a specific Next.js thing
MyApp.getInitialProps = async function({ Component, ctx }) {
  let pageProps = {};
  if(Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query; //that will allow to get all the queries on specific pages
  return { pageProps };
}

export default withData(MyApp); 
//MyApp wrapped in withData. withData is imported. give me MyApp and give me WITH DATA