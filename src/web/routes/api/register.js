const RegisterModel = require("../../../../database/mongodb/models/register");
const { handleError } = require("../error_handler");
const md5 = require("md5");
const utils = require("../../../../utilities/utilities");
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

registers.getChartData = (req, res, next) => {
  RegisterModel.aggregate([
    { $match: {created_at: { $gte:new Date("2021-01-01T00:00:00.000Z"), $lte: new Date("2022-02-30T00:00:00.000Z")}}},
    { $group: {_id: {
        "month": { $month: "$created_at" }, 
        "year": { $year: "$created_at" } ,
        "day": { $dayOfMonth: "$created_at" }
      }, 
      "count": { $sum: 1 }
    }},
    { $sort : { "_id.day":1} }
  ])
  .then((data) => {
    const handler_response = utils.isEmptyArray(data)
      ? { status: "FAIL", data: [] }
      : { status: "SUCCESS", data: data };

    res.status(200).json(handler_response);
  })
  .catch((err) => {
    console.log(`Error ${err}`);
    res.status(500).json(handleError(err));
  });
}
