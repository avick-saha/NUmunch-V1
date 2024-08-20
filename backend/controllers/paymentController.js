const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Order = require('../models/Order.js')
const stripe = require('stripe')('sk_test_51OKlibFTBEHW1myd4lyUjD2gNh9QwoPctXRSZVNWLnUphm0BOWAV6Hpz8hHiM2WkZ6tjpRQbT66EmwXfDmEhGSph00Crkio1RV');
const Razorpay = require('razorpay');
const crypto = require('crypto');

// This razorpayInstance will be used to 
// access any resource from razorpay 
const razorpayInstance = new Razorpay({

  // Replace with your key_id 
  key_id: process.env.RAZORPAY_KEY_ID,

  // Replace with your key_secret 
  key_secret: process.env.RAZORPAY_SECRET

});

let orderData;

exports.processPaymentRazorpay = (req, res) => {
  const { amount, currency, data } = req.body;
  orderData = req.body
  console.log(req.body)

  razorpayInstance.orders.create({ amount, currency },
    (err, order) => {
      if (!err)
        res.json(order)
      else
        res.send(err);
    })
}

exports.validatePaymentRazorpay = (req, res) => {
  // // STEP 7: Receive Payment Data 
  const {razorpay_order_id, razorpay_payment_id} = req.body;      
  const razorpay_signature =  req.headers['x-razorpay-signature']; 
  
  // Pass yours key_secret here 
  const key_secret = process.env.RAZORPAY_SECRET;      

  // STEP 8: Verification & Send Response to User 
    
  // Creating hmac object  
  let hmac = crypto.createHmac('sha256', key_secret);  

  // Passing the data to be hashed 
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id); 
    
  // Creating the hmac in the required format 
  const generated_signature = hmac.digest('hex').toString(); 

  if(generated_signature === req.body.razorpay_signature){ 
      res.json({success:true, message:"Payment has been verified"}) 
      // console.log(orderData)
      const order = new Order({
        shippingInfo: {
          address: orderData.data.shippingInfo.address,
          city: orderData.data.shippingInfo.city,
          state: orderData.data.shippingInfo.state,
          country: orderData.data.shippingInfo.country,
          pinCode: orderData.data.shippingInfo.pinCode,
          phoneNo: orderData.data.shippingInfo.phoneNo,
        },
        orderItems: orderData.data.cartItems.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          product: item.product,
        })),
        user: orderData.data.user,
        paymentInfo: {
          id: req.body.razorpay_payment_id,
          status: 'pending',
        },
        paidAt: Date.now(),
        itemsPrice: orderData.data.cartItems.price,
        taxPrice: orderData.data.tax,
        shippingPrice: orderData.data.shippingCharges,
        totalPrice: orderData.data.totalPrice,
        orderStatus: 'Processing',
      });
      order.save();
      
  } 
  else{
    res.json({success:false, message:"Payment verification failed"}) 
  }
  
  console.log(req.body)
}


// Stripe Payment Gateway
exports.processPayment = catchAsyncErrors(async (req, res) => {
  try {

    console.log(req.body);

    if (isValidRequest(req.body)) {
      const line_items = createLineItems(req.body.data.cartItems);

      const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        success_url: 'https://numunch1-2.onrender.com/success',
        cancel_url: 'https://numunch1-2.onrender.com/cancel',
      });

      const order = new Order({
        shippingInfo: {
          address: req.body.data.shippingInfo.address,
          city: req.body.data.shippingInfo.city,
          state: req.body.data.shippingInfo.state,
          country: req.body.data.shippingInfo.country,
          pinCode: req.body.data.shippingInfo.pinCode,
          phoneNo: req.body.data.shippingInfo.phoneNo,
        },
        orderItems: req.body.data.cartItems.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          product: item.product,
        })),
        user: req.body.data.user,
        paymentInfo: {
          id: session.id,
          status: 'pending',
        },
        paidAt: Date.now(),
        itemsPrice: req.body.data.cartItems.price,
        taxPrice: req.body.data.tax,
        shippingPrice: req.body.data.shippingCharges,
        totalPrice: req.body.data.totalPrice,
        orderStatus: 'Processing',
      });
      await order.save();
      res.json({ url: session.url });
    } else {
      res.status(400).json({ error: 'Invalid request. Please provide user and cartItems in the request body.' });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
})

function isValidRequest(body) {
  return body && body.data && body.data.user && body.data.cartItems && Array.isArray(body.data.cartItems) && body.data.cartItems.length > 0;
}

function createLineItems(cartItems) {
  if (!Array.isArray(cartItems)) {
    cartItems = [cartItems];
  }

  return cartItems.map((item) => ({
    price_data: {
      currency: 'inr',
      product_data: {
        name: item.name,
        images: [item.image],
        metadata: {
          id: item._id,
        },
      },
      unit_amount: item.price
    },
    quantity: item.stock,
  }));
}
