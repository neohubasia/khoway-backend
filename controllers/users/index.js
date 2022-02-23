const {
  listUsers,
  findUser,
  addUser,
  updateUserWithPass,
  updateUserWithoutPass,
  deleteUser,
} = require("./mongod/index");

const exportDb = {
  listUsers,
  findUser,
  addUser,
  updateUserWithPass,
  updateUserWithoutPass,
  deleteUser,
};

module.exports = exportDb;
