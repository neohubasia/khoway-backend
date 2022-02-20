const {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  deleteData,
  dropAll,
} = require("./mysql/index");
// = require('./memory/index')
// = require('./postgres/index')
// switch out db as required

const teachersDb = {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  deleteData,
  dropAll,
};

module.exports = teachersDb;
