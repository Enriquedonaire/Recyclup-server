/*const router = require("express").Router();



//return res.json on server side (no render)
router.get("/", (req, res, next) => {            //show our landing page with 10 random items 
  ItemModel.find()
  .then((items) => {
   
    //let myUserId = req.session.loggedInUser._id;
    const randomItem = () => {
      for(let i=1; i<=10; i++){
       return items[Math.floor(Math.random() * items.length)];
      }
      
    };
  
  })

  .catch((err) => {
    next(err);
  })

  /*
    res.render('auth/main.hbs', {general, programming, knock, jokes, myUserId, randomJoke, jokeProgramming, jokeGeneral, jokeKnock})
  })
 
});   


*/

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

module.exports = router;
