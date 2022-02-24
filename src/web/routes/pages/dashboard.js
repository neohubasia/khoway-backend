const express = require("express");
const router = express.Router();
const connect = require("connect-ensure-login");
const config = require("../../../../config/index");
const menuAccess = require("../../../../utilities/menu-access");
const {
  generateTokenSign,
} = require("../../../../models/middlewares/jwt-generate");

router.get("/", connect.ensureLoggedIn(), (req, res, next) => {
  res.render("pages/dashboard", {
    ...menuAccess.getProgram(req.user.role, "dashMenu.null.null"), // admin may change on req.user => role
    token: generateTokenSign(config.JWT.CREDENTIAL.USERNAME),
    app: config.APP,
  });
});

module.exports = router;
