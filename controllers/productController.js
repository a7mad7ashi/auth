const product = require("../models/registerProdect");
const passport = require("passport");


const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];

module.exports.getproduct = async (req, res) => {
  try {
    const pro = await product.find();
    //console.log(pro); 
    // req.body.session = "hello"
    // console.log(req.body)
    // console.log(passport.serializeUser())
    // console.log(passport.session)
    res.render("products", {
      pro,
    });
  } catch (err) {
    console.log("err: " + err);
  }
};

module.exports.getRegisterProduct = async (req, res) => {
  try {
    const pro = await product.find();
    res.render("registerProduct", {
      pro,
    });
  } catch (err) {
    console.log("err: " + err);
  }

  // res.render("registerProduct");
};

// module.exports.registerProduct = async (req, res) => {
//   try {
//     const newProduct = await product.register(
//       new product({
//       productName: req.body.productName,
//       Price: req.body.productPrice,
//       producImage: req.body.Image,
//     });
//     console.log(newProduct);
//     res.redirect("/createProduct");
//   } catch (err) {
//     console.log(err);
//   }
// };

// module.exports.registerProduct = async (req, res) => {
//   try {
//     const newProduct = await product.register(
//       new product({
//         username: req.body.productName,
//         Price: req.body.productPrice,
//         // productImage: req.body.Image,
//       })
//     );
//     console.log(cus);
//   } catch (err) {
//     console.log(err);
//   }
// };
module.exports.productPost = async (req, res) => {
  const { productName, Price, Quantity, img } = req.body;
  //console.log(req.body);
  const prod = new product({
    productName,
    Price,
    Quantity,
  });

  // SETTING IMAGE AND IMAGE TYPES
  saveImage(prod, img);
  try {
    const newMovie = await prod.save();
    res.redirect("/createProduct");
  } catch (err) {
    console.log(err);
  }
};

function saveImage(prod, imgEncoded) {
  // CHECKING FOR IMAGE IS ALREADY ENCODED OR NOT
  if (!imgEncoded) return;

  //console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
  //console.log(imgEncoded);
  // ENCODING IMAGE BY JSON PARSE
  // The JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string
  // const img = JSON.parse(imgEncoded);
  const img = JSON.parse(imgEncoded);
  //console.log("img:", img);

  // CHECKING FOR JSON ENCODED IMAGE NOT NULL
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
  // AND HAVE VALID IMAGE TYPES WITH IMAGE MIME TYPES
  if (img != null && imageMimeTypes.includes(img.type)) {
    // https://nodejs.org/api/buffer.html
    // The Buffer class in Node.js is designed to handle raw binary data.
    // SETTING IMAGE AS BINARY DATA
    prod.img = new Buffer.from(img.data, "base64");
    prod.imgType = img.type;
  }
}
module.exports.getabout= (req,res)=>{
  res.render('about')
}

