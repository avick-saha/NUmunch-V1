// import React from "react";
// import { Link } from "react-router-dom";
// import { Rating } from "@material-ui/lab";

// const ProductCard = ({ product }) => {
//   const options = {
//     value: product.ratings,
//     readOnly: true,
//     precision: 0.5,
//   };
//   return (
//     <div>
//       <h1>hello</h1>
//       <Link className="productCard" to={`/product/${product._id}`}>
//       <img src={product.images[0].url} alt={product.name} />
//       <p>{product.name}</p>
//       <div>
//         <Rating {...options} />{" "}
//         <span className="productCardSpan">
//           {" "}
//           ({product.numOfReviews} Reviews)
//         </span>
//       </div>
//       <span>{`₹${product.price}`}</span>
//     </Link>
    
//     </div>
    
    
//   );
// };

// export default ProductCard;

import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings || 0, // Ensure a default value
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="">
      <Link className="productCard" to={`/product/${product._id}`}>
        <img src={product.images[0]?.url} alt={product.name} />
        <p>{product.name}</p>
        <div>
          <Rating {...options} />{" "}
          <span className="productCardSpan">
            {`(${product.numOfReviews || 0} Reviews)`}
          </span>
        </div>
        <span>{`₹${product.price || 0}`}</span>
      </Link>
    </div>
  );
};

export default ProductCard;
