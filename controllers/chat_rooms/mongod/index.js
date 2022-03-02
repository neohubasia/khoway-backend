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

const pushMessage = (id, dataObj) => {
  dataObj.sendtime = new Date();
  dataObj.status = true;
  return ChatRoom.updateOne(
    { _id: id },
    { $push: { message: dataObj } }
  ).then((resp) => {
    return {
      status: "SUCCESS",
      message: "Massage Sending Successful"
    }
  }).catch((err) => {
    return {
      status: "FAIL",
      message: "Message Sending Unsuccessful",
    };
  });
}

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
  pushMessage,
};