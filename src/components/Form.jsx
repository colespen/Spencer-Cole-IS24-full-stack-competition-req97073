import { useState } from "react";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';
import styles from "../styles/Home.module.scss";

const Form = (props) => {
  const { formRef, handleOnSubmit, newProduct,
    handleOnChange, handleDeveloperChange,
    handleRemoveDeveloper, handleAddDeveloper,
    handleReset, formType, formTitle, btnColor
  } = props;

  const handleButtonTypeSubmit = (e) => {
    formRef.current.btnId = e.target.id;
  };

  return (
    <>
    {!formTitle &&
      <h2 className={styles.formTitle}>{!formType ? "Edit Product" : "Create Product"}</h2>}
    {formTitle && <h2 className={styles.formTitle}>Product {formTitle}</h2>}
    <form
      ref={formRef}
      onSubmit={handleOnSubmit}
      className={styles.form}
    >
      <label>
        Product Name<br />
        <input
          name="productName"
          value={newProduct.productName}
          onChange={handleOnChange}
          required
        />
      </label>
      <label>
        Product Owner Name<br />
        <input
          name="productOwnerName"
          value={newProduct.productOwnerName}
          onChange={handleOnChange}
          required
        />
      </label>
      <div className={styles.developers}>
        Developers
        {newProduct.Developers.map((developer, index) => (
          <div
            key={index}
            className={styles.developersInner} >
            <small className={styles.developerHeader}>
              Developer {index + 1}<br />
              <input
                name="Developers"
                value={developer}
                onChange={(e) => handleDeveloperChange(index, e.target.value)}
                required
              />
            </small>
            {newProduct.Developers.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveDeveloper(index)}
              >
                <small>Remove Developer</small>
              </button>
            )}
          </div>
        ))}
        {newProduct.Developers.length < 5 && (
          <button
            type="button"
            onClick={handleAddDeveloper}>
            Add Developer
          </button>
        )}
      </div>
      <label>
        Scrum Master Name<br />
        <input
          name="scrumMasterName"
          value={newProduct.scrumMasterName}
          onChange={handleOnChange}
          required
        />
      </label>
      <label>
        Start Date<br />
        <input
          name="startDate"
          value={newProduct.startDate.replace(/\//g, "-")}
          onChange={handleOnChange}
          type="date"
          required
          disabled={!formType}
          style={{ color: !formType ? "darkgrey" : "inherit" }}
          className={styles.date}
        />
      </label>
      <label>
        Methodology<br />
        <div className={styles.radioBtns}>
          <input
            name="methodology"
            id="Agile"
            value={newProduct.methodology}
            onChange={handleOnChange}
            type="radio"
            required
            checked={newProduct.methodology === "Agile"}
            style={{ width: "20px", minWidth: "20px" }}
          />
          <label htmlFor="agile">Agile</label>
          <input
            name="methodology"
            id="Waterfall"
            value={newProduct.methodology}
            onChange={handleOnChange}
            type="radio"
            required
            checked={newProduct.methodology === "Waterfall"}
            style={{ width: "20px", minWidth: "20px" }}
          />
          <label htmlFor="waterfall">Waterfall</label>
        </div>
      </label>

      <div className={styles.submitForm}>
        {formType &&
          <button
            id="add-btn"
            type="submit"
            data-tip data-for="submit-tooltip"
            onClick={handleButtonTypeSubmit}
            style={{backgroundColor: btnColor}}
          >Add Product
          </button>}
        {!formType &&
          <button
            id="edit-btn"
            type="submit"
            data-tip data-for="submit-tooltip"
            onClick={handleButtonTypeSubmit}
            style={{backgroundColor: btnColor}}
          >Edit Product
          </button>}

        <button type="reset" onClick={handleReset}>
          Reset
        </button>
        <Tooltip id="submit-tooltip" place="top"
          type="error" effect="solid" />
      </div>
    </form>

    </>
  );
};
export default Form;