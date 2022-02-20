const {
  listUsers,
  findUser,
  addUser,
  updateUser,
  deleteUser,
} = require("./mongod/index");

const exportDb = {
  listUsers,
  findUser,
  addUser,
  updateUser,
  deleteUser,
};

module.exports = exportDb;
