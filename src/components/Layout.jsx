import Head from "next/head";
import Header from "./Header";
import styles from '../styles/Home.module.scss';

export default function Layout({ children }) {
  return (
    <div className={styles.mainContainer}>
      <main className={styles.main}>

        <Head>
          <link rel="icon" href="" />
          <title>App Tracker</title>
          <meta name="description" content="tool that tracks and manages web applications developed by the Province of BC" />
          <link rel="icon" href="" />
        </Head>

        <Header />

        {children}

      </main>
    </div>
  );
}
