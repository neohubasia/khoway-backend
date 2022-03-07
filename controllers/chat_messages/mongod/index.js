const ChatMessage = require("../../../database/mongodb/models/chat_message");
const serialize = require("../../serializer"); // serializer custom to db

const listData = () => {
  return ChatMessage.find({}).then(serialize);
};

const findData = (prop, val) => {
  if (prop === "id") prop = "_id";
  return ChatMessage.find({
    [prop]: val,
  }).then((resp) => {
    return serialize(resp[0]);
  });
};

const findDataBy = (params) => {
  return ChatMessage.find(params).then(serialize);
};

const addData = (dataObj) => {
  return ChatMessage.create(dataObj).then(serialize);
};

const updateData = (id, dataObj) => {
  return ChatMessage.findByIdAndUpdate(id, dataObj).then(serialize);
};

const deleteData = (id) => {
  return ChatMessage.findByIdAndDelete(id).then(serialize);
};

const dropAll = () => {
  return ChatMessage.remove();
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
