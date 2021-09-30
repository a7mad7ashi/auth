const route = require("express").Router();
const productcontroller = require("../controllers/productController");
const router = require("./routes");

function isSiggnedIn(req, res, next) {
    if (req.isAuthenticated("customer")) {
      return next();
    }
    req.app.locals.user = null
    return next();
  }

route.get("/", isSiggnedIn, productcontroller.getproduct);
route.get("/createProduct", productcontroller.getRegisterProduct);
route.get("/", isSiggnedIn, productcontroller.getproduct);
route.get('/about', isSiggnedIn ,productcontroller.getabout)
route.post("/createProduct", productcontroller.productPost);

module.exports = route;
