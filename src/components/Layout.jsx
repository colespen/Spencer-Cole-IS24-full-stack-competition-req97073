import Head from "next/head";
import Header from "./Header";
import styles from '../styles/Home.module.scss';

export default function Layout(post) {
  const {
    children,
    handleFetchProducts,
    handleNewProduct,
    products,
    view
  } = post;
  return (
    <div className={styles.mainContainer}>
      <main className={styles.main}>

        <Head>
          <link rel="icon" href="" />
          <title>Product Tracker</title>
          <meta name="description" content="Track products..." />
          <link rel="icon" href="" />
        </Head>
        
        <Header
          handleFetchProducts={handleFetchProducts}
          handleNewProduct={handleNewProduct}
          products={products}
          view={view}
        />

        {children}

      </main>
    </div>
  );
}