import Head from "next/head";
import Header from "./Header";
import styles from '../styles/Home.module.scss';

export default function Layout(post) {
  const {
    children,
    handleFetchProducts,
    handleNewProduct,
    products,
    view,
    setView,
    setQuery,
    filterKey
  } = post;
  return (
    <div className={styles.mainContainer}>
      <main className={styles.main}>

        <Head>
          <link rel="icon" href="" />
          <title>Product Tracker</title>
          <meta name="description" content="tool that tracks and manages web applications developed by the Province of BC" />
          <link rel="icon" href="" />
        </Head>

        <Header
          handleFetchProducts={handleFetchProducts}
          handleNewProduct={handleNewProduct}
          products={products}
          view={view}
          setView={setView}
          setQuery={setQuery}
          filterKey={filterKey}
        />

        {children}

      </main>
    </div>
  );
}