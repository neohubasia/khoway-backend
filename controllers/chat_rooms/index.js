const {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  deleteData,
  dropAll,
  pushMessage,
} = require("./mongod/index");
// = require('./memory/index')
// = require('./postgres/index')
// switch out db as required

const exportDb = {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  deleteData,
  dropAll,
  pushMessage,
};

module.exports = exportDb;
