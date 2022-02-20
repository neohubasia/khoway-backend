const express = require("express");
const router = express.Router();
const connect = require("connect-ensure-login");
const config = require("../../../../config/index");
const menuAccess = require("../../../../utilities/menu-access");
const teachersDb = require("../../../../controllers/teachers");
const {
  generateTokenSign,
} = require("../../../../models/middlewares/jwt-generate");

router.get("/teachers", connect.ensureLoggedIn(), (req, res, next) => {
  res.render("pages/teacher-list", {
    ...menuAccess.getProgram(req.user.role, "courseMenu.teacherSubMenu.list"), // admin may change on req.user => role
    token: generateTokenSign(config.JWT.CREDENTIAL.USERNAME),
    app: config.APP,
  });
});

router
  .get("/teacher/:id?", connect.ensureLoggedIn(), async (req, res, next) => {
    let data = {};
    if (req.params.id) data = await teachersDb.findData("id", req.params.id);
    res.render("pages/teacher-entry", {
      ...menuAccess.getProgram(
        req.user.role,
        "courseMenu.teacherSubMenu.entry"
      ), // admin may change on req.user => role
      token: generateTokenSign(config.JWT.CREDENTIAL.USERNAME),
      app: config.APP,
      data: data,
    });
  })
  .post("/teacher", (req, res, next) => {
    let db,
      status = "FAIL";
    if (!req.body.id) {
      // insert data
      db = teachersDb.addData(req.body);
    } else {
      // update data
      const { ["id"]: removed, ...data } = req.body;
      db = teachersDb.updateData(req.body.id, data);
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
