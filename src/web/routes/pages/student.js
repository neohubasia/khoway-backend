const express = require("express");
const router = express.Router();
const fs = require("fs");
const connect = require("connect-ensure-login");
const config = require("../../../../config/index");
const menuAccess = require("../../../../utilities/menu-access");
const studentsDb = require("../../../../controllers/students");
const {
  generateTokenSign,
} = require("../../../../models/middlewares/jwt-generate");

router.get("/students", connect.ensureLoggedIn(), (req, res, next) => {
  res.render("pages/student-list", {
    ...menuAccess.getProgram(req.user.role, "courseMenu.studentSubMenu.list"), // admin may change on req.user => role
    token: generateTokenSign(config.JWT.CREDENTIAL.USERNAME),
    app: config.APP,
  });
});

router
  .get("/student/:id?", connect.ensureLoggedIn(), async (req, res, next) => {
    let data = {};
    if (req.params.id) data = await studentsDb.findData("id", req.params.id);
    res.render("pages/student-entry", {
      ...menuAccess.getProgram(
        req.user.role,
        "courseMenu.studentSubMenu.entry"
      ), // admin may change on req.user => role
      token: generateTokenSign(config.JWT.CREDENTIAL.USERNAME),
      app: config.APP,
      data: data,
    });
  })
  .post("/student", (req, res, next) => {
    let db,
      status = "FAIL";
    let remove_images = req.body.remove_images || [];
    req.body.profile_images = req.body.profile_images || [];
    if (remove_images && remove_images.length > 0) {
      remove_images.map((file, fileIdx) => {
        // console.log(file.replace(/\\/g, "/"));
        // fs.unlinkSync(file.replace(/\\/g, "/"));
        fs.unlink("./public" + file.replace(/\\/g, "/"), function (err) {
          if (err) console.error("File Unlink Error", err);
          else console.log(fileIdx, "File has been Deleted");
        });
      });
    }
    if (!req.body.id) {
      // insert data
      db = studentsDb.addData(req.body);
    } else {
      // update data
      const { ["id"]: removed, ...data } = req.body;
      db = studentsDb.updateData(req.body.id, data);
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
