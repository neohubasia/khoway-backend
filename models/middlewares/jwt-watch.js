const jwt = require("jsonwebtoken");
const config = require("../../config");

const checkToken = (req, res, next) => {
  // Express headers are auto converted to lowercase
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  token =
    token && token.startsWith("Bearer ")
      ? token.slice(7, token.length)
      : undefined;
  // token is provided
  if (token) {
    jwt.verify(token, config.JWT.SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          status: "FAIL",
          message: "Auth token is invalid",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      status: "FAIL",
      message: "Auth token is required",
    });
  }
};

module.exports = {
  checkToken: checkToken,
};
