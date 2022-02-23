const knex = require("../../../database/mysqldb/connection");
const utils = require("../../../utilities/utilities");

const listData = () => {
  return knex.raw(`SELECT * FROM teachers;`).then((data) => data[0]);
};

const findData = (prop, val) => {
  return knex
    .raw(`SELECT * FROM teachers WHERE ${prop}= '${val}'`)
    .then((data) => data[0][0]);
};

const findDataBy = (prop, val) => {
  return knex
    .raw(`SELECT * FROM teachers WHERE ${prop}= '${val}'`)
    .then((data) => data[0]);
};

const addData = (dataObj) => {
  dataObj.id = utils.objectId();
  return knex("teachers")
    .insert(dataObj)
    .returning("*")
    .then((data) => data[0]);
};

const updateData = (id, dataObj) => {
  return knex("teachers")
    .where("id", "=", id)
    .update(dataObj)
    .then((data) => {
      if (data === 1) {
        return { id: id };
      }
      return null;
    });
};

const deleteData = (id) => {
  return knex("teachers")
    .where("id", id)
    .del()
    .then((data) => {
      return {
        id: id,
        status: "SUCCESS",
        message: "Delete Successful",
      };
    })
    .catch((err) => {
      return {
        status: "FAIL",
        message: "Delete Unsuccessful",
      };
    });
};

const dropAll = () => {
  return knex.raw(`
    DELETE FROM teachers;
    ALTER SEQUENCE teachers_id_seq RESTART WITH 1;
  `);
};

module.exports = {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  deleteData,
  dropAll,
};
