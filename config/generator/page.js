const express = require("express");
const router = express.Router();
const connect = require("connect-ensure-login");
const config = require("../../../../config/index");
const menuAccess = require("../../../../utilities/menu-access");
const genDatabase = require("../../../../controllers/generators");
const { generateTokenSign } = require("../../models/middlewares/jwt-generate");

router.get("/routings", connect.ensureLoggedIn(), (req, res, next) => {
  res.render("pages/runnerPage-list", {
    ...menuAccess.getProgram(req.user.role, "menuList"), // admin may change on req.user => role
    token: generateTokenSign(config.jwt.credential.USERNAME),
    app: config.app,
  });
});

router
  .get("/routing/:id?", connect.ensureLoggedIn(), async (req, res, next) => {
    let data = {};
    if (req.params.id) data = await genDatabase.findData("id", req.params.id);
    res.render("pages/runnerPage-entry", {
      ...menuAccess.getProgram(req.user.role, "menuEntry"), // admin may change on req.user => role
      token: generateTokenSign(config.jwt.credential.USERNAME),
      app: config.app,
      data: data,
    });
  })
  .post("/routing", (req, res, next) => {
    let db,
      status = "FAIL";
    if (!req.body.id) {
      // insert data
      db = genDatabase.addData(req.body);
    } else {
      // update data
      const id = req.body.id;
      const { ["id"]: removed, ...data } = req.body;
      db = genDatabase.updateData(req.body.id, data);
    }
    db.then((result) => {
      if (result != null) status = "SUCCESS";
      res.json({ status: status, data: result });
    }).catch((error) => {
      console.log(`Error ${error}`);
      res.json({ status: status, data: error });
    });
  });

module.exports = router;
