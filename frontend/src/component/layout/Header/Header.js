// import React, { useState, Fragment } from "react";
// import { Link } from "react-router-dom";
// // import { ReactNavbar } from "overlay-navbar";
// // import logo from "../../../images/logo.png";


// // const options = {
// //   burgerColorHover: "#eb4034",
// //   logo,
// //   logoWidth: "20vmax",
// //   navColor1: "white",
// //   logoHoverSize: "10px",
// //   logoHoverColor: "#eb4034",
// //   link1Text: "Home",
// //   link2Text: "Products",
// //   link3Text: "Contact",
// //   link4Text: "About",
// //   link1Url: "/",
// //   link2Url: "/products",
// //   link3Url: "/contact",
// //   link4Url: "/about",
// //   link1Size: "1.3vmax",
// //   link1Color: "rgba(35, 35, 35,0.8)",
// //   nav1justifyContent: "flex-end",
// //   nav2justifyContent: "flex-end",
// //   nav3justifyContent: "flex-start",
// //   nav4justifyContent: "flex-start",
// //   link1ColorHover: "#eb4034",
// //   link1Margin: "1vmax",
// //   profileIconUrl: "/login",
// //   profileIconColor: "rgba(35, 35, 35,0.8)",
// //   searchIconColor: "rgba(35, 35, 35,0.8)",
// //   cartIconColor: "rgba(35, 35, 35,0.8)",
// //   profileIconColorHover: "#eb4034",
// //   searchIconColorHover: "#eb4034",
// //   cartIconColorHover: "#eb4034",
// //   cartIconMargin: "1vmax",
// // };

// const Header = ({ history }) => {

//   const [keyword, setKeyword] = useState("");

//   const searchSubmitHandler = (e) => {
//     e.preventDefault();
//     if (keyword.trim()) {
//       history.push(`/products/${keyword}`);
//     } else {
//       history.push("/products");
//     }
//   };
//   // return <ReactNavbar {...options} />;
//   return (
//     <nav className="navbar navbar-expand-lg bg-body-tertiary">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/">NUmunch</Link>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             {/* <li className="nav-item">
//               <Link className="nav-link active" aria-current="page" to="/">Home</Link>
//             </li> */}
//             <li className="nav-item">
//               <Link className="nav-link" to="/products">Products</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/contact">Contact Us</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/about">About Us</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/login">Login</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/cart">Cart</Link>
//             </li>
//           </ul>
//           <form className="d-flex" role="search">
//             <Link to="/search"><button className="btn btn-outline-success" type="submit">Search</button></Link>
//           </form>
//         </div>
//       </div>
//     </nav>
//   );
// };


// export default Header;


import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartIcon from "../../../images/cart.png";

const Header = () => {
  const [keyword, setKeyword] = useState("");
  const history = useHistory();
  const { isAuthenticated } = useSelector((state) => state.user);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand" to="/">
          <span>NU</span>munch
        </Link>

        {/* Toggler for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar content */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Left-aligned navbar items */}
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/policy">
                Privacy Policy
              </Link>
            </li>
          </ul>

          {/* Search form */}
          <form className="d-flex mx-auto w-50" onSubmit={searchSubmitHandler}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search Products"
              aria-label="Search"
              value={keyword}
              onChange={handleKeywordChange}
              style={{ flexGrow: 1 }}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>

          {/* Right-aligned navbar items */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/cart">
                {/* Adjust the size of the image here */}
                <img
                  src={CartIcon}
                  alt="Cart Icon"
                  style={{ width: "32px", height: "32px", marginRight: "8px" }} // Increased size
                />
                Cart
              </Link>
            </li>
            {!isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;