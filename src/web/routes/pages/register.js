const express = require("express");
const router = express.Router();
const fs = require("fs");
const connect = require("connect-ensure-login");
const config = require("../../../../config/index");
const menuAccess = require("../../../../utilities/menu-access");
let registersDb = require("../../../../controllers/registers");
const {
  generateTokenSign,
} = require("../../../../models/middlewares/jwt-generate");

router.get("/registers", connect.ensureLoggedIn(), (req, res, next) => {
  res.render("pages/user-register-list", {
    ...menuAccess.getProgram(
      req.user.role,
      "registerMenu.registerSubMenu.list"
    ), // admin may change on req.user => role
    token: generateTokenSign(config.JWT.CREDENTIAL.USERNAME),
    app: config.APP,
  });
});

router
  .get("/register/:id?", connect.ensureLoggedIn(), async (req, res, next) => {
    let data = {};
    if (req.params.id) data = await registersDb.findData("id", req.params.id);
    res.render("pages/user-register-entry", {
      ...menuAccess.getProgram(
        req.user.role,
        "registerMenu.registerSubMenu.entry"
      ), // admin may change on req.user => role
      token: generateTokenSign(config.JWT.CREDENTIAL.USERNAME),
      app: config.APP,
      data: data,
    });
  })
  .post("/register", (req, res, next) => {
    let db,
      status = "FAIL";
    if (!req.body.id) {
      // insert data
      db = registersDb.addData(req.body);
    } else {
      // update data
      const { ["id"]: removed, ...data } = req.body;
      db = registersDb.updateData(req.body.id, data);
    }
    db.then((result) => {
      if (result !== null) status = "SUCCESS";
      res.json({ status: status, data: result });
    }).catch((error) => {
      console.log(`Error ${error}`);
      res.json({ status: status, data: error });
    });
  });

module.exports = router;
