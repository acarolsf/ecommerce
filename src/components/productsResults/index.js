import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchProductsStart } from "../../redux/products/products.actions";

import Product from "./product";

import "./styles.scss";
import FormSelect from "./../forms/formSelect";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const ProductResults = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { filterType } = useParams();
  const { products } = useSelector(mapState);

  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
  }, [dispatch, filterType]);

  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    history.push(`/search/${nextFilter}`);
  };

  if (!Array.isArray(products)) return null;

  if (products.length < 1) {
    return (
      <div className="products">
        <p>No search results</p>
      </div>
    );
  }

  const configFilter = {
    defaultValue: filterType,
    options: [
      {
        name: "Show all",
        value: "",
      },
      {
        name: "Womens",
        value: "womens",
      },
      {
        name: "Mens",
        value: "mens",
      },
    ],
    handleChange: handleFilter,
  };

  return (
    <div className="products">
      <div classNam="wrap">
        <h1>Browse Products</h1>

        <FormSelect {...configFilter} />
        <div className="productResults">
          {products.map((product, index) => {
            const { productThumbnail, productName, productPrice } = product;

            if (
              !productThumbnail ||
              !productName ||
              typeof productPrice === "undefined"
            )
              return null;

            const configProduct = {
              productThumbnail,
              productName,
              productPrice,
            };

            return <Product {...configProduct} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductResults;
