const router = require("express").Router(); 
const stripe = require("stripe")("sk_test_Y17KokhC3SRYCQTLYiU5ZCD2");  //individual key

const calculateOrderAmount = items => {
   
    return 1400;     //change this. create payment model in db?
                    //fix donation amount to 5$?
  };

  router.post("/create-payment-intent", async (req, res) => {               
    const { items } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd"
    });
    res.send({
      clientSecret: paymentIntent.client_secret
    });
  });



module.exports = router;