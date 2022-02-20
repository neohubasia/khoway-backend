const express = require("express");
const router = express.Router();
const connect = require("connect-ensure-login");
const config = require("../../../../config/index");
const usersDb = require("../../../../controllers/users");
const menuAccess = require("../../../../utilities/menu-access");
const {
  generateTokenSign,
} = require("../../../../models/middlewares/jwt-generate");

router.get("/getuser", connect.ensureLoggedIn(), (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.send({ user: req.user });
});

router.get("/users", connect.ensureLoggedIn(), (req, res, next) => {
  res.render("pages/user-list", {
    ...menuAccess.getProgram(req.user.role, "adminMenu.userSubMenu.list"), // admin may change on req.user => role
    token: generateTokenSign(config.JWT.CREDENTIAL.USERNAME),
    app: config.APP,
  });
});

router
  .get("/user/:id?", connect.ensureLoggedIn(), async (req, res, next) => {
    let data = {};
    if (req.params.id) data = await usersDb.findUser("id", req.params.id);
    res.render("pages/user-entry", {
      ...menuAccess.getProgram(req.user.role, "adminMenu.userSubMenu.entry"), // admin may change on req.user => role
      token: generateTokenSign(config.JWT.CREDENTIAL.USERNAME),
      app: config.APP,
      data: data,
    });
  })
  .post("/user", (req, res, next) => {
    let db,
      status = "FAIL";
    if (!req.body.id) {
      // insert data
      db = usersDb.addUser(req.body);
    } else {
      // update data
      const { ["id"]: removed, ...data } = req.body;
      db = usersDb.updateUser(req.body.id, data);
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
