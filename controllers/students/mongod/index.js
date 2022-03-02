const Student = require("../../../database/mongodb/models/student");
const serialize = require("./serializer"); // serializer custom to db

const listData = () => {
  return Student.find({})
    .populate({
      path: "cityid",
      model: "city",
      select: "city_mm city_en",
    })
    .populate({
      path: "townshipid",
      model: "township",
      select: "township_mm township_en",
    })
    .then(serialize);
};

const findData = (prop, val) => {
  if (prop === "id") prop = "_id";
  return Student.find({ [prop]: val })
    .populate({
      path: "cityid",
      model: "city",
      select: "city_mm city_en",
    })
    .populate({
      path: "townshipid",
      model: "township",
      select: "township_mm township_en",
    })
    .then((resp) => {
      return serialize(resp[0]);
    });
};

const findDataBy = (params) => {
  // if (prop === "id") prop = "_id";
  return Student.find(params)
    .populate({
      path: "cityid",
      model: "city",
      select: "city_mm city_en",
    })
    .populate({
      path: "townshipid",
      model: "township",
      select: "township_mm township_en",
    })
    .then(serialize);
};

const addData = (dataObj) => {
  return Student.create(dataObj).then(serialize);
};

const updateData = (id, dataObj) => {
  return Student.findByIdAndUpdate(id, dataObj).then(serialize);
};

const deleteData = (id) => {
  return Student.findByIdAndDelete(id).then(serialize);
};

const dropAll = () => {
  return Student.remove();
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
