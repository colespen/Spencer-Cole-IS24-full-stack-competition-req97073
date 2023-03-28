import { useRouter } from "next/router";
import { dateSort, kebabCase } from "../helpers/sort";

import styles from "../styles/Home.module.scss";

const ProductTable = (props) => {
  const { products, setFormType, formType } = props
  const router = useRouter();

  const editTableByIdOnClick = (product) => {
    setFormType("Edit");

    router.push({
      pathname: "/product/[id]",
      query: {
        id: product.id
      },
      // asPath: `product/${product.id}-${kebabCase(product.productName)}`
    });
  };


  const ProductTableBodyItems = () => {
    if (products) {
      const defaultDateSort = dateSort(products);
      return (
        defaultDateSort.map((product) => (
          <tbody
            key={product.id} className={styles.tableBody}
            onClick={() => editTableByIdOnClick(product)}
          >
            <tr className={styles.tableData}>
              <td>
                <strong>{product.productName}</strong>
              </td>
              <td>{product.productOwnerName}</td>
              <td className={styles.developerList}>
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
          </tbody>
        ))
      );
    }
    else return null;
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