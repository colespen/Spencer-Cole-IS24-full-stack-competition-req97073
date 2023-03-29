import { useState } from "react";
import { useRouter } from "next/router";
import { dateSort, kebabCase } from "../helpers/sort";

import styles from "../styles/Home.module.scss";

const ProductTable = (props) => {
  const {
    products,
    setFormType,
    setFilterKey,
    currId,
    setCurrId
  } = props;
  const router = useRouter();

  console.log("currId: ", currId);

  const editTableByIdOnClick = (product) => {
    setFormType("Edit");
    setCurrId(product.id);

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

  const ProductTableBodyItems = () => {
    if (products) {
      const defaultDateSort = dateSort(products, currId);
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