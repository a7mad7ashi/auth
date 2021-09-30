const router = require("express").Router();
const mainCont = require("../controllers/mainController");
const passport = require("passport");

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}



router.get("/dashboard", isLoggedIn, mainCont.getHome);
router.get("/register", mainCont.getRegister);
router.get("/login", mainCont.getlogin);
router.get("/logout", mainCont.getlogout);

router.post("/register", mainCont.registerUser);

router.post(
  "/login",
  passport.authenticate("user", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);

module.exports = router;
