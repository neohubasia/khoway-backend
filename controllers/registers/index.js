const {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  deleteData,
} = require("./mongod/index");

const exportDb = {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  deleteData,
};

module.exports = exportDb;
