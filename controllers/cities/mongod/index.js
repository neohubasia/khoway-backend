const City = require("../../../database/mongodb/models/city");
const serialize = require("../../serializer"); // serializer custom to db

const listData = () => {
  return City.find({}).then(serialize);
};

const findData = (prop, val) => {
  if (prop === "id") prop = "_id";
  return City.find({ [prop]: val }).then((resp) => {
    return serialize(resp[0]);
  });
};

const findDataBy = (params) => {
  // if (prop === "id") prop = "_id";
  return City.find(params).then(serialize);
};

const addData = (dataObj) => {
  return City.create(dataObj).then(serialize);
};

const updateData = (id, dataObj) => {
  return City.findByIdAndUpdate(id, dataObj).then(serialize);
};

const deleteData = (id) => {
  return City.findByIdAndDelete(id)
    .then((resp) => {
      return {
        id: resp._id.toString(),
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
  return City.remove();
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
