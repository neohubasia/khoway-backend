const express = require("express");
const router = express.Router();

// api routing
const dev = require("./develop");
const students = require("./student");
const teachers = require("./teacher");

// setup routing
const cities = require("./city");
const townships = require("./township");

// user routing
const users = require("./user");
const registers = require("./register");
const userRoles = require("./user_role");
const userRegisters = require("./user_register");

// schema vialidation
const validateWare = require("../../../../models/middlewares/data-validator");
const studentSchema = require("../../../../models/validations/students/schema");

module.exports = router;

// working with json
router.get("/user-roles", userRoles.index);

router.post("/sign-up", registers.create);
router.post("/sign-in", registers.login);
router.get("/chart-data", registers.getChartData);

router
  .get("/users", users.index)
  .get("/user/:id", users.show)
  .post("/user", users.create)
  .post("/user/:id", users.updateWithPass)
  .post("/user-no-pass/:id", users.updateWithoutPass)
  .delete("/user/:id", users.delete);

router
  .get("/townships", townships.index)
  .get("/township/:id", townships.show)
  .get("/township", townships.showBy)
  .post("/township", townships.create)
  .post("/township/:id", townships.update)
  .delete("/township/:id", townships.delete)
  .delete("/students", townships.deleteAll);

router
  .get("/cities", cities.index)
  .get("/city/:id", cities.show)
  .get("/city", cities.showBy)
  .post("/city", cities.create)
  .post("/city/:id", cities.update)
  .delete("/city/:id", cities.delete)
  .delete("/cities", cities.deleteAll);

router
  .get("/students", students.index)
  .get("/student/:id", students.show)
  .get("/student", students.showBy)
  .post("/student", validateWare(studentSchema), students.create)
  .post("/student/:id", validateWare(studentSchema), students.update)
  .delete("/student/:id", students.delete)
  .delete("/students", students.deleteAll);

router
  .get("/teachers", teachers.index)
  .get("/teacher/:id", teachers.show)
  .get("/teacher", teachers.showBy)
  .post("/teacher", teachers.create)
  .post("/teacher/:id", teachers.update)
  .delete("/teacher/:id", teachers.delete)
  .delete("/teachers", teachers.deleteAll);

router
  .get("/registers", userRegisters.index)
  .get("/register/:id", userRegisters.show)
  .get("/register", userRegisters.showBy)
  .post("/register", userRegisters.create)
  .post("/register/:id", userRegisters.update)
  .delete("/register/:id", userRegisters.delete)
  .delete("/registers", userRegisters.deleteAll);

/* start chat_room api */
const chatRooms = require("./chat_room");
router
  .get("/chat_rooms", chatRooms.index)
  .get("/chat_room/:id", chatRooms.show)
  .get("/chat_room", chatRooms.showBy)
  .post("/chat_room", chatRooms.create)
  .post("/chat_room/:id", chatRooms.update)
  .post("/chat_room/send_message/:id", chatRooms.pushMessage)
  .delete("/chat_room/:id", chatRooms.delete)
  .delete("/chat_rooms", chatRooms.deleteAll);
/* end chat_room api */