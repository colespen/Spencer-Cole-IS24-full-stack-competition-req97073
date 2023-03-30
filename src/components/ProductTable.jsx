import { useRouter } from "next/router";
import { dateSort, kebabCase, filterIdTop, sortNewToTop } from "../helpers/sort";

import styles from "../styles/Home.module.scss";

const ProductTable = (props) => {
  const {
    products,
    setFormType,
    setFilterKey,
    currId,
    initLengthRef
  } = props;
  const router = useRouter();

  const editTableByIdOnClick = (product) => {
    setFormType("Edit");
    // set the id of selected table
    localStorage.setItem("prevId", JSON.stringify(product.id));
    router.push({
      pathname: "/product/[id]",
      query: {
        id: product.id
      },
      // asPath: `product/${product.id}-${kebabCase(product.productName)}`
    });
  };

  const handleFilterName = (e) => {
    setFilterKey(e.target.id);
  };
  // change color for last added
  const getBackgroundColor = (product, products) => {
    if (product.id === products.length - 1) {
      return "#23296a";
    }
    // return "#6a523e";
    return "revert-layer"
  };

  const ProductTableBodyItems = () => {
    if (products) {
      const defaultDateSort = dateSort(products);
      const productIdSort = filterIdTop(defaultDateSort, currId);
      const newToTop = sortNewToTop(productIdSort, initLengthRef);
      return (
        newToTop.map((product) => (
          <tbody
            key={product.id} className={styles.tableBody}
            onClick={() => editTableByIdOnClick(product)}
            style={{ backgroundColor: getBackgroundColor(product, products) }}
          >
            <tr className={styles.tableData}>
              <td className={styles.productName}>
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
    } else {
      return null;
    }
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.tableHeaders}>
          <th id="productName"
            onClick={handleFilterName}
          >Product</th>
          <th id="productOwnerName"
            onClick={handleFilterName}
          >Owner</th>
          <th id="Developers"
            onClick={handleFilterName}
          >Developers</th>
          <th id="scrumMasterName"
            onClick={handleFilterName}
          >ScrumMaster</th>
          <th id="startDate"
            onClick={handleFilterName}
          >Start Date</th>
          <th id="methodology"
            onClick={handleFilterName}
          >Methodology</th>
          <th id="productId"
            onClick={handleFilterName}
          >ID</th>
        </tr>
      </thead>
      <ProductTableBodyItems />
    </table>
  );
};

export default ProductTable;