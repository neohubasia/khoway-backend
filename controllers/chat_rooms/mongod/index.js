const ChatRoom = require("../../../database/mongodb/models/chat_room");
const serialize = require("../../serializer"); // serializer custom to db

const listData = () => {
  return ChatRoom.find({}).then(serialize);
};

const findData = (prop, val) => {
  if (prop === "id") prop = "_id";
  return ChatRoom.find({
    [prop]: val
  }).then((resp) => {
    return serialize(resp[0]);
  });
};

const findDataBy = (params) => {
  return ChatRoom.find(params).then(serialize);
};

const addData = (dataObj) => {
  return ChatRoom.create(dataObj).then(serialize);
};

const updateData = (id, dataObj) => {
  return ChatRoom.findByIdAndUpdate(id, dataObj).then(serialize);
};

const deleteData = (id) => {
  return ChatRoom.findByIdAndDelete(id)
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
  return ChatRoom.remove();
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