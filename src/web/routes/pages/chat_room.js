const express = require("express");
const router = express.Router();
const connect = require("connect-ensure-login");
const config = require("../../../../config/index");
const menuAccess = require("../../../../utilities/menu-access");
const chatRoomsDb = require("../../../../controllers/chat_rooms");
const {
  generateTokenSign,
} = require("../../../../models/middlewares/jwt-generate");

router.get("/chat_rooms", connect.ensureLoggedIn(), (req, res, next) => {
  chatRoomsDb.listData().then((result) => {
    res.render("pages/chat-room-list", {
      ...menuAccess.getProgram(req.user.role, "roomMenu.roomSubMenu.list"), // admin may change on req.user => role
      token: generateTokenSign(config.JWT.CREDENTIAL.USERNAME),
      app: config.APP,
      data: result,
    });
  })
});

router
  .get("/chat_room/:id?", connect.ensureLoggedIn(), async (req, res, next) => {
    let data = {};
    if (req.params.id) data = await chatRoomsDb.findData("id", req.params.id);
    /*res.render("pages/chat-room-entry", {
      ...menuAccess.getProgram(req.user.role, "roomMenu.roomSubMenu.entry"), // admin may change on req.user => role
      token: generateTokenSign(config.JWT.CREDENTIAL.USERNAME),
      app: config.app,
      data: data,
    });*/
    res.render("pages/chat-room-entry", {
      ...menuAccess.getProgram(req.user.role, "roomMenu.roomSubMenu.entry"), // admin may change on req.user => role
      token: generateTokenSign(config.JWT.CREDENTIAL.USERNAME),
      app: config.APP,
      data: data,
    });
  })
  .post("/chat_room", (req, res, next) => {
    let db,
      status = "FAIL";
    if (!req.body.id) {
      // insert data
      db = chatRoomsDb.addData(req.body);
    } else {
      // update data
      const id = req.body.id;
      const {
        ["id"]: removed, ...data
      } = req.body;
      db = chatRoomsDb.updateData(req.body.id, data);
    }
    db.then((result) => {
      if (result != null) status = "SUCCESS";
      res.json({
        status: status,
        data: result
      });
    }).catch((error) => {
      console.log(`Error ${error}`);
      res.json({
        status: status,
        data: error
      });
    });
  });

module.exports = router;