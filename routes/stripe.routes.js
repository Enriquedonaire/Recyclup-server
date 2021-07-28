const router = require("express").Router(); 
const stripe = require("stripe")("sk_test_Y17KokhC3SRYCQTLYiU5ZCD2");  //individual key

const calculateOrderAmount = items => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;     //change this. create payment model in db
  };

  router.post("/create-payment-intent", async (req, res) => {                  //change to router.post
    const { items } = req.body;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd"
    });
    res.send({
      clientSecret: paymentIntent.client_secret
    });
  });



module.exports = router;