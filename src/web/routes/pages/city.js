const express = require("express");
const router = express.Router();
const connect = require("connect-ensure-login");
const config = require("../../../../config/index");
const citiesDb = require("../../../../controllers/cities");
const menuAccess = require("../../../../utilities/menu-access");
const {
  generateTokenSign,
} = require("../../../../models/middlewares/jwt-generate");

router.get("/cities", connect.ensureLoggedIn(), (req, res, next) => {
  res.render("pages/city-list", {
    ...menuAccess.getProgram(req.user.role, "generalMenu.citySubMenu.list"), // admin may change on req.user => role
    token: generateTokenSign(config.JWT.CREDENTIAL.USERNAME),
    app: config.APP,
  });
});

router
  .get("/city/:id?", connect.ensureLoggedIn(), async (req, res, next) => {
    let data = {};
    if (req.params.id) data = await citiesDb.findData("id", req.params.id);
    res.render("pages/city-entry", {
      ...menuAccess.getProgram(req.user.role, "generalMenu.citySubMenu.entry"), // admin may change on req.user => role
      token: generateTokenSign(config.JWT.CREDENTIAL.USERNAME),
      app: config.APP,
      data: data,
    });
  })
  .post("/city", (req, res, next) => {
    let db,
      status = "FAIL";
    if (!req.body.id) {
      // insert data
      db = citiesDb.addData(req.body);
    } else {
      // update data
      const { ["id"]: removed, ...data } = req.body;
      db = citiesDb.updateData(req.body.id, data);
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
