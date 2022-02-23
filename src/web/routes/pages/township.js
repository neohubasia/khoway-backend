const express = require("express");
const router = express.Router();
const connect = require("connect-ensure-login");
const config = require("../../../../config/index");
const menuAccess = require("../../../../utilities/menu-access");
const townshipsDb = require("../../../../controllers/townships");
const {
  generateTokenSign,
} = require("../../../../models/middlewares/jwt-generate");

router.get("/townships", connect.ensureLoggedIn(), (req, res, next) => {
  res.render("pages/township-list", {
    ...menuAccess.getProgram(req.user.role, "generalMenu.townshipSubMenu.list"), // admin may change on req.user => role
    token: generateTokenSign(config.JWT.CREDENTIAL.USERNAME),
    app: config.APP,
  });
});

router
  .get("/township/:id?", connect.ensureLoggedIn(), async (req, res, next) => {
    let data = {};
    if (req.params.id) data = await townshipsDb.findData("id", req.params.id);
    res.render("pages/township-entry", {
      ...menuAccess.getProgram(
        req.user.role,
        "generalMenu.townshipSubMenu.entry"
      ), // admin may change on req.user => role
      token: generateTokenSign(config.JWT.CREDENTIAL.USERNAME),
      app: config.APP,
      data: data,
    });
  })
  .post("/township", (req, res, next) => {
    let db,
      status = "FAIL";
    if (!req.body.id) {
      // insert data
      db = townshipsDb.addData(req.body);
    } else {
      // update data
      const { ["id"]: removed, ...data } = req.body;
      db = townshipsDb.updateData(req.body.id, data);
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
