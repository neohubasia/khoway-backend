const RegisterModel = require("../../../../database/mongodb/models/register");
const { handleError } = require("../error_handler");
const md5 = require("md5");

const registers = (module.exports = {});

registers.create = (req, res, next) => {
  const { fullname, username, password } = req.body;
  const registerModel = new RegisterModel({
    fullname,
    username,
    password,
  });
  // save the user to database
  registerModel.save((err, data) => {
    err || !data
      ? res.status(500).json(handleError(err))
      : res.json({
          status: "SUCCESS",
          data: data,
        });
  });
};

registers.login = (req, res, next) => {
  const { username, password } = req.body;
  RegisterModel.findOne({ username }).exec(async (err, data) => {
    err || !data
      ? res.status(500).json(handleError(err))
      : data.comparePassword(md5(password), (err, isMatch) => {
          err || !isMatch
            ? res.json({
                status: "MISMATCH",
                data: null,
              })
            : res.json({
                status: "SUCCESS",
                data: data,
              });
        });
  });
};
