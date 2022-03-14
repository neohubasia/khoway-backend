const express = require("express");
const router = express.Router();
const async = require("async");
const connect = require("connect-ensure-login");
const config = require("../../../../config/index");
const menuAccess = require("../../../../utilities/menu-access");
const {
  generateTokenSign,
} = require("../../../../models/middlewares/jwt-generate");

const User = require("../../../../database/mongodb/models/user");
const Register = require("../../../../database/mongodb/models/register");
const ChatRoom = require("../../../../database/mongodb/models/chat_room");

const dashbordCard = async () => {
  const countUser = function (callback) {
    User.countDocuments().exec((error, count) => {
      if (error) {
        callback(error, undefined);
      } else {
        callback(undefined, count);
      }
    });
  };

  const countRegister = function (callback) {
    Register.countDocuments().exec((error, count) => {
      if (error) {
        callback(error, undefined);
      } else {
        callback(undefined, count);
      }
    });
  };

  const countChatRoom = function (callback) {
    ChatRoom.countDocuments({}).exec((error, count) => {
      if (error) {
        callback(error, undefined);
      } else {
        callback(undefined, count);
      }
    });
  };

  return [countUser, countRegister, countChatRoom];
};

router.get("/", connect.ensureLoggedIn(), async (req, res, next) => {
  async.parallel(await dashbordCard(), function (error, results) {
    res.render("pages/dashboard", {
      ...menuAccess.getProgram(req.user.role, "dashMenu.null.null"), // admin may change on req.user => role
      token: generateTokenSign(config.JWT.CREDENTIAL.USERNAME),
      app: config.APP,
      data: results,
    });
  });
});

module.exports = router;
