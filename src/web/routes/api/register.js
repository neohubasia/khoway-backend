const RegisterModel = require("../../../../database/mongodb/models/register");
const utils = require("../../../../utilities/utilities");
const { handleError } = require("../error_handler");
const avatar = require("cartoon-avatar");
const moment = require("moment");
const md5 = require("md5");

const registers = (module.exports = {});

registers.create = (req, res, next) => {
  const { fullname, username, password } = req.body;
  const registerModel = new RegisterModel({
    avatar: avatar.generate_avatar(),
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
  const start_date = moment(req.query.start_date, "DD/MM/YYYY", true).format();
  const end_date = moment(req.query.end_date, "DD/MM/YYYY", true).format();
  RegisterModel.aggregate([
    {
      $match: {
        created_at: { $gte: new Date(start_date), $lte: new Date(end_date) },
      },
    },
    {
      $group: {
        _id: { DOY: { $dayOfYear: "$created_at" } },
        firstDate: { $min: "$created_at" },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ])
    .then((data) => {
      // firstDate as label_date
      data.forEach(
        (result) =>
          (result.label_date = moment(result.firstDate).format("DD/MM/YYYY"))
      );
      const handler_response = utils.isEmptyArray(data)
        ? { status: "FAIL", data: [] }
        : { status: "SUCCESS", data: data };

      res.status(200).json(handler_response);
    })
    .catch((err) => {
      console.log(`Error ${err}`);
      res.status(500).json(handleError(err));
    });
};
