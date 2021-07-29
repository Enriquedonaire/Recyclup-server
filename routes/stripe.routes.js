const router = require("express").Router(); 
const stripe = require("stripe")("sk_test_51JII5pGg1ODUJ9EWW2XMyG1fDB5s28IWEjMRAmLdra0r4bW5TtiWZpliiFyjaAGoo6yVNH4PqfZc5NPjlS4sh7fl00dXcMyL5y");
const DonationModel = require('../models/Donation.model.js')
const calculateOrderAmount = items => {
   
    return 500;     //change this. create payment model in db?
                    //fixed donation amount to 5$ for now
  };

  router.post("/create-payment-intent", async (req, res) => {   
    console.log(req.session)
              
    const {items } = req.body;
              //items??     

    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd"
    });
    res.send({
      clientSecret: paymentIntent.client_secret
    });

  });

  router.post('/createdonation', (req, res, next)=> {
    let myUserId = req.session.loggedInUser._id; 
    DonationModel.create({amount: 500, donationId: myUserId})
    .then((result) => {
      res.send(200).json(result, "Payment successful. Thank you for donating.")
    }).catch((err) => {
      res.send(500).json(err, "Sorry, your payment didn't work. Please try again.")
    });
  } )




module.exports = router;