const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose"),
  User = require("./models/user"),
  Customer = require("./models/customer")
  Routers = require("./routes/routes"),
  cRoutes = require("./routes/customerRoute"),
proute = require("./routes/productRoute");

//Connecting database
mongoose.connect("mongodb://localhost/ace");
app.use(
  require("express-session")({
    secret: "Any normal Word", //decode or encode session
    resave: false,
    saveUninitialized: false,
  })
);
// passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser()); //session encoding
passport.deserializeUser(User.deserializeUser()); //session decoding
passport.use("user" ,new LocalStrategy(User.authenticate()));

passport.serializeUser(Customer.serializeUser());
passport.deserializeUser(Customer.deserializeUser());
passport.use("customer", new LocalStrategy(Customer.authenticate()));
// passport.use(new LocalStrategy(customer.authenticate()));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
// Assets

app.use(express.static(__dirname + "/public"));
//=======================
//      R O U T E S
//=======================

app.use(Routers);
app.use(cRoutes);
app.use(proute);
//Listen On Server
app.listen(process.env.PORT || 3000, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Server Started At Port 3000");
  }
});
