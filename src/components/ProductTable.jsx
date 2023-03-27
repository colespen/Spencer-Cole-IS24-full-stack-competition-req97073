import { dateSort } from "../helpers/sort";
import styles from "../styles/Home.module.scss";

const ProductTable = ({ products }) => {

  const ProductTableBodyItems = () => {
    const defaultDateSort = dateSort(products);
    return (
      defaultDateSort.map((product) => (
        <tbody key={product.id} className={styles.tableBody}>
          <tr className={styles.tableData}>
            <td><strong>{product.productName}</strong></td>
            <td>{product.productOwnerName}</td>
            <td>
              <ul>
                {product.Developers.map((dev, i) =>
                  <li key={product.id + i}>{dev}</li>
                )}
              </ul>
            </td>
            <td>{product.scrumMasterName}</td>
            <td>{product.startDate}</td>
            <td>{product.methodology}</td>
            <td><small>{product.productId}</small></td>
          </tr>
        </tbody>)
      ));
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.tableHeaders}>
          <th>Product</th>
          <th>Owner</th>
          <th>Developers</th>
          <th>ScrumMaster</th>
          <th>Start Date</th>
          <th>Methodology</th>
          <th>ID</th>
        </tr>
      </thead>
      <ProductTableBodyItems />
    </table>
  );
};

export default ProductTable;