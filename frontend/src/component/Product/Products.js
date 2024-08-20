import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";

const categories = ["All", "Veg", "Non Veg", "Beverage"]; // Add "All" option

const Products = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [priceFilter, setPriceFilter] = useState([25, 150]);
  const [category, setCategory] = useState("");
  const [appliedPriceFilter, setAppliedPriceFilter] = useState(null);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  useEffect(() => {
    fetchProducts();
  }, [dispatch, keyword, currentPage, category, appliedPriceFilter]);

  const fetchProducts = () => {
    dispatch(getProduct(keyword, currentPage, appliedPriceFilter || priceFilter, category));
  };

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const priceHandler = (event, newPrice) => {
    setPriceFilter(newPrice);
  };

  const handleCategoryClick = (selectedCategory) => {
    if (selectedCategory === "All") {
      setCategory("");
      window.location.href = "/Products" // Reset category to empty string to show all products
    } else {
      setCategory(selectedCategory);
    }
    setCurrentPage(1);
  };

  const handleApplyPriceFilter = () => {
    setAppliedPriceFilter(priceFilter);
    setCurrentPage(1); // Reset page when applying price filter
  };

//   return (
//     <Fragment>
//       {loading ? (
//         <Loader />
//       ) : (
//         <Fragment>
//           <MetaData title="PRODUCTS -- TMP Online" />
//           <h2 className="productsHeading">Products</h2>

//           <div className="products">
//             {products &&
//               products.map((product) => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//           </div>

//           <div className="filterBox">
//             <Typography>Price</Typography>
//             <Slider
//               value={priceFilter}
//               onChange={priceHandler}
//               valueLabelDisplay="auto"
//               aria-labelledby="range-slider"
//               min={25}
//               max={150}
//             />
//             <div className="price-inputs">
//               <span>From</span>
//               <input
//                 type="number"
//                 value={priceFilter[0]}
//                 onChange={(e) => setPriceFilter([e.target.value, priceFilter[1]])}
//               />
//               <span>To</span>
//               <input
//                 type="number"
//                 value={priceFilter[1]}
//                 onChange={(e) => setPriceFilter([priceFilter[0], e.target.value])}
//               />
//             </div>
//             <button
//               onClick={handleApplyPriceFilter}
//               type="submit"
//               className="applyButton"
//             >
//               Apply
//             </button>
//           </div>

//           <Typography>Categories</Typography>
//           <ul className="categoryBox">
//             {categories.map((category) => (
//               <li
//                 className="category-link"
//                 key={category}
//                 onClick={() => handleCategoryClick(category)}
//               >
//                 {category}
//               </li>
//             ))}
//           </ul>

//           {resultPerPage < filteredProductsCount && (
//             <div className="paginationBox">
//               <Pagination
//                 activePage={currentPage}
//                 itemsCountPerPage={resultPerPage}
//                 totalItemsCount={productsCount}
//                 onChange={setCurrentPageNo}
//                 nextPageText="Next"
//                 prevPageText="Prev"
//                 firstPageText="1st"
//                 lastPageText="Last"
//                 itemClass="page-item"
//                 linkClass="page-link"
//                 activeClass="pageItemActive"
//                 activeLinkClass="pageLinkActive"
//               />
//             </div>
//           )}
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };
return (
  <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <MetaData title="PRODUCTS -- TMP Online" />
        <h2 className="productsHeading">Products</h2>

        <div className="products">
          {products &&
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>

        <div className="filterBox">
          <Typography>Price</Typography>
          <form >
            <Slider
              value={priceFilter}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={25}
              max={150}
            />
            <div className="price-inputs">
              <span>From</span>
              <input
                type="number"
                value={priceFilter[0]}
                onChange={(e) => setPriceFilter([e.target.value, priceFilter[1]])}
              />
              <span>To</span>
              <input
                type="number"
                value={priceFilter[1]}
                onChange={(e) => setPriceFilter([priceFilter[0], e.target.value])}
              />
            </div>
            <button
              onClick={handleApplyPriceFilter}
              type="submit"
              className="applyButton"
            >
              Apply
            </button>
          </form>

          <Typography>Categories</Typography>
          <ul className="categoryBox">
            {categories.map((category) => (
              <li
                className="category-link"
                key={category}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        {resultPerPage < filteredProductsCount && (
          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        )}
      </Fragment>
    )}
  </Fragment>
);
};

export default Products;
