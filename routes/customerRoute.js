const router = require("express").Router(),
  custCont = require("../controllers/customerCont");
  const passport = require("passport");
router.get("/customer", custCont.getCustomer);

router.post("/customer", custCont.registeCustomer);
router.get("/signincustomer", custCont.getsigninCustomer);
router.get("/logoutCus", custCont.logoutCus);
router.get("/cart", custCont.getCartPage)
router.get("/cart/:id", custCont.addToCart)


const currentUserFun = async (req,res,next) => {
  req.app.locals.user = req.user.Cname;
  next();
} 



// router.get("*", currentUserFun)

router.post(
  "/signincustomer", 
  passport.authenticate("customer"), currentUserFun, (req, res) => {
    if (req.user.Cname){
      res.redirect("/")
    }else {
      res.redirect("/signincustomer")
    }
  }

);
module.exports = router;
