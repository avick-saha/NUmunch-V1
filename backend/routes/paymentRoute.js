const express = require("express");
const {
  processPayment,
  validatePayment,
  processPaymentRazorpay,
  validatePaymentRazorpay
} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

// router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/create-checkout-session").post(processPayment);


router.route("/process-payment-razorpay").post(processPaymentRazorpay);
router.route("/validate-payment-razorpay").post(validatePaymentRazorpay);

module.exports = router;
