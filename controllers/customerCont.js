const passport = require("passport");

const Customer = require("../models/customer");
const Cart = require("../models/cart");

// passport.use(customer.createStrategy());
// passport.serializeUser(customer.serializeUser());
// passport.deserializeUser(customer.deserializeUser());

// module.exports.logincustomer = (req, res) => {
//   res.render("signincustomer");
// };
module.exports.getCustomer = async (req, res) => {
  try {
    const Custom = await Customer.find();
    res.render("customer", {
      Custom,
    });
  } catch (err) {
    console.log("err: " + err);
  }
};

module.exports.registeCustomer = async (req, res) => {

  
  try {
    
    if (req.body.Cphone=="")
    (req.body.Cphone="9090")
    const cus = await Customer.register(
     
      new Customer({
        
        Cname: req.body.Cname,
        phone: req.body.Cphone,
        address: req.body.Caddress,
      
      }),
        req.body.password
        
    );
    
    res.redirect("/customer");
  } catch (err) {
    console.log(err);
  }
};
module.exports.getsigninCustomer = (req,res)=>{
  res.render("signincustomer")
}
module.exports.logoutCus = (req,res)=>{
  req.logout();
  req.session.destroy((err) => res.redirect('/'));
}

module.exports.getCartPage = (req,res)=>{
  res.render("cart")
}

module.exports.addToCart = async(req, res)=>{
  const id = req.params.id
  console.log(id)
  try {
    const cart = await Cart.create({
      productId: id,
      quantity: 1,
    });
    res.redirect("/")
  } catch (error) {
    console.log(error)
  }
  
}

