const mongoose = require("mongoose");
// const passportLocalMongoose = require("passport-local-mongoose");
const ProductSchema = new mongoose.Schema({
  productName: String,
  Price: String,
  Quantity: String,
  img: {
    type: Buffer,
    required: true,
  },
  imgType: {
    type: String,
    required: true,
  },
}, {timestamps: true});

ProductSchema.virtual("coverImagePath").get(function () {
  if (this.img != null && this.imgType != null) {
    return `data:${this.imgType};charset=utf-8;base64,${this.img.toString(
      "base64"
    )}`;
  }
});
// ProductSchema.plugin(passportLocalMongoose, { usernameField: "productName" });

module.exports = mongoose.model("product", ProductSchema);
