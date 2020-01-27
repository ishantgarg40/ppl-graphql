const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports = {
  authenticateUserOnLogin: async data => {
    try {
      const response = await userModel.findOne({ username: data.username });
      if (!response) {
        throw new Error("user dosen't exist!");
      }
      const valid = await bcrypt.compare(data.password, response.password);
      if (!valid) {
        throw new Error("Invalid password");
      }
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
};
