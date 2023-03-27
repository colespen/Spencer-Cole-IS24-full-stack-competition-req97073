import Head from "next/head";

import styles from '../styles/Home.module.scss';

export default function Layout({ children }) {
  return (
    <div className={styles.mainContainer}>
      <main className={styles.main}>
        <Head>
          <link rel="icon" href="" />
          <title>Product Tracker</title>
          <meta name="description" content="Track products..." />
          <link rel="icon" href="" />
        </Head>
        {children}
      </main>
    </div>
  );
}