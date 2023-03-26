import styles from "../styles/Home.module.css";

const Table = ({ products }) => {

  const productTableBodyItems = products.map((product) => (
    <tbody key={product.id} className={styles.tableBody}>
      <tr className={styles.tableData}>
        <td>{product.productId}</td>
        <td>{product.productName}</td>
        <td>{product.productOwnerName}</td>
        <td>{product.Developers}</td>
        <td>{product.scrumMasterName}</td>
        <td>{product.startDate}</td>
        <td>{product.methodology}</td>
      </tr>
    </tbody>)
  );

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.tableHeaders}>
          <th>productId</th>
          <th>productName</th>
          <th>productOwnerName</th>
          <th>Developers</th>
          <th>scrumMasterName</th>
          <th>startDate</th>
          <th>methodology</th>
        </tr>
      </thead>
      {productTableBodyItems}
    </table>
  );
}

export default Table;