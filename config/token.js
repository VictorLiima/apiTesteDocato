const jwt = require("jsonwebtoken");
const authConfig = require("./auth");
/*
    MD5 Hash:
    Your Hash: bfbcfb4a520749f9416a90a3123c7098
    Your String: docatoteste
*/
module.exports = {
  async generateToken(params) {
    return jwt.sign(params, authConfig.secret, { expiresIn: 86400 });
  },
};
