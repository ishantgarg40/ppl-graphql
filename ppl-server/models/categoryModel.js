const mongoose = require("mongoose");

const categoryModel = mongoose.Schema({
  name: String,
  filedata: Object
});

module.exports = mongoose.model("categoryModel", categoryModel);
