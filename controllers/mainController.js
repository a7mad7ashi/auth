const user = require("../models/user");
const User = require("../models/user"),
  passport = require("passport"),
  customer = require("../models/customer"),
  product = require ('../models/registerProdect')
  Users = require('../models/user')

// const Car = require("../models/Cars");
// const Driver = require("../models/Driver");
// const AssingDriver = require("../models/AssingDriver");

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
// const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];

// module.exports.upload_get = async (req, res) => {
//   try {
//     const movie = await Movie.find();
//     res.render("index", {
//       movie,
//     });
//   } catch (err) {
//     console.log("err: " + err);
//   }
// };

// module.exports.upload_post = async (req, res) => {
//   const { carName, CarType, img, img2 } = req.body;
//   const car = new Car({
//     carName,
//     CarType,
//   });

//   // SETTING IMAGE AND IMAGE TYPES

//   try {
//     saveImage(car, img, img2);
//     const newMovie = await car.save();
//     res.redirect("/car");
//   } catch (err) {
//     console.log(err);
//   }
// };

// function saveImage(movie, imgEncoded, imgEncoded2) {
//   // CHECKING FOR IMAGE IS ALREADY ENCODED OR NOT
//   if (!imgEncoded && !imgEncoded2) return;

//   // ENCODING IMAGE BY JSON PARSE
//   // The JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string
//   const img = JSON.parse(imgEncoded);
//   const img2 = JSON.parse(imgEncoded2);

//   // CHECKING FOR JSON ENCODED IMAGE NOT NULL
//   // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
//   // AND HAVE VALID IMAGE TYPES WITH IMAGE MIME TYPES
//   if (img != null && imageMimeTypes.includes(img.type)) {
//     // https://nodejs.org/api/buffer.html
//     // The Buffer class in Node.js is designed to handle raw binary data.
//     // SETTING IMAGE AS BINARY DATA
//     movie.img = new Buffer.from(img.data, "base64");
//     movie.imgType = img.type;
//     movie.img2 = new Buffer.from(img2.data, "base64");
//     movie.imgType2 = img2.type;
//   }
// }

module.exports.getRegister = (req, res) => {
  res.render("register");
};


module.exports.registerUser = (req, res) => {
  User.register(
    new User({
      username: req.body.username,
      phone: req.body.phone,
      telephone: req.body.telephone,
    }),
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.render("register");
      }
      passport.authenticate("local")(req, res, function () {
        res.redirect("/login");
      });
    }
  );
};

module.exports.getHome = async (req, res) => {
  try {
    const userCount = await Users.count();
    const CustomCount = await customer.count();
    const productCount = await product.count();
    res.render("index", {
      CustomCount,productCount,userCount,
    });
  } catch (err) {
    console.log("err: " + err);
  }
  
};
module.exports.getlogin = (req, res) => {
  res.render("login");
};
module.exports.getlogout = (req, res) => {
  req.logout();
  req.session.destroy((err) => res.redirect('/login'));
  // res.redirect("/login");
};
module.exports.countCustomer = async (req, res) => {
  
};
