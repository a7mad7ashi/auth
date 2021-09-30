const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const CustomerSchema = new mongoose.Schema({
  Cname: { String, unique: false },
  password: String,
  phone: String,
  address: String,
}, {timestamps: true});
CustomerSchema.plugin(passportLocalMongoose, { usernameField: "Cname", unique:false });
module.exports = mongoose.model("customer", CustomerSchema);
