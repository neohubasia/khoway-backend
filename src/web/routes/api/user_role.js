const programAccess = require("../../../../config/program-access.json");
const { handleError } = require("../error_handler");

const userRoles = (module.exports = {});

userRoles.index = (req, res, next) => {
  try {
    res.json({
      status: "SUCCESS",
      data: JSON.parse(JSON.stringify(programAccess)),
    });
  } catch (error) {
    console.log(`Error ${err}`);
    res.status(500).json(handleError(err));
  }
};
