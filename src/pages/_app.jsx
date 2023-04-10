import { GlobalState } from '../context/GlobalState';
import Layout from '../components/Layout';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalState>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GlobalState>
    </>
  );
}
