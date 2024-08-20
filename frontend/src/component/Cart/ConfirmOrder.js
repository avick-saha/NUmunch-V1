import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import axios from 'axios';
const ConfirmOrder = ({ history }) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );  
  const shippingCharges = subtotal > 1000 ? 0 : 0;
  const tax = subtotal * 0;
  const totalPrice = subtotal + tax + shippingCharges;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
  const proceedToPayment = () => {
    const data = {
      user: user,
      cartItems: cartItems,
      shippingCharges: shippingCharges,
      totalPrice: totalPrice,
      shippingInfo: shippingInfo,
      tax: tax,
    };
    console.log(data);
    axios.post('/api/v1/create-checkout-session', { data })
      .then((res) => {
        console.log(res);
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((error) => console.log(error));
  };
  const proceedToRazorpayPayment = async (e) => {
    const amount = subtotal * 100; // Correcting the amount calculation (remove the extra zero)
    const currency = "INR";
    const receiptId = "qwsaq1";
    const data = {
      user: user,
      cartItems: cartItems,
      shippingCharges: shippingCharges,
      totalPrice: totalPrice,
      shippingInfo: shippingInfo,
      tax: tax,
    };
    try {
      // Step 1: Create Order
      const orderResponse = await fetch("/api/v1/process-payment-razorpay", {
        method: "POST",
        body: JSON.stringify({
          amount,
          currency,
          receipt: receiptId,
          data
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const order = await orderResponse.json();
      console.log(order);

      // Step 2: Initialize Razorpay
      var options = {
        key: "rzp_test_QR9infxGzudj4f",
        amount,
        currency,
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id,
        handler: async function (response) {
          try {
            const validateResponse = await fetch(
              "/api/v1/validate-payment-razorpay",
              {
                method: "POST",
                body: JSON.stringify(response), // Send the entire response object for validation
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const jsonRes = await validateResponse.json();
            console.log(jsonRes); // this line shows the error message
            // Check if payment is successful
            if (jsonRes.success) {
              // Redirect to success page
              window.location.href = "https://numunch1-2.onrender.com/success";
            } else {
              // Handle unsuccessful payment (e.g., show error message to the user)
              console.log("Payment unsuccessful: ", jsonRes.message);
            }
          } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., show error message to the user)
          }
        },
        prefill: {
          name: "Web Dev Matrix",
          email: "webdevmatrix@example.com",
          contact: "9000000000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
      e.preventDefault();
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show error message to the user)
    }
  };
  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>
            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{subtotal}</span>
            </div>
            {/* <button onClick={proceedToPayment}>Proceed To Pay with Stripe</button> */}
            <button onClick={proceedToRazorpayPayment}>Proceed to Pay with Razorpay</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default ConfirmOrder;
