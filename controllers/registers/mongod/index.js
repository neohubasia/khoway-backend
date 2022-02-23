const Register = require("../../../database/mongodb/models/register");
const serialize = require("../../serializer"); // serializer custom to db

const listData = () => {
  return Register.find({}).then(serialize);
};

const findData = async (prop, val) => {
  if (prop === "id") prop = "_id";
  return Register.find({ [prop]: val }).then((resp) => {
    return serialize(resp[0]);
  });
};

const findDataBy = (params) => {
  return Register.find(params).then(serialize);
};

const addData = (dataObj) => {
  return Register.create(dataObj).then(serialize);
};

const updateData = (id, dataObj) => {
  return Register.findByIdAndUpdate(id, dataObj).then(serialize);
};

const deleteData = (id) => {
  return Register.findByIdAndDelete(id)
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

module.exports = {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  deleteData,
};
