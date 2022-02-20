const User = require("../../../database/mongodb/models/user");
const serialize = require("../../serializer"); // serializer custom to db

const listUsers = () => {
  return User.find({}).then(serialize);
};

const findUser = (prop, val) => {
  if (prop === "id") prop = "_id";
  return User.find({ [prop]: val }).then((resp) => {
    return serialize(resp[0]);
  });
};

const addUser = (dataObj) => {
  const { phone, username, password, role } = dataObj;
  return User.register({ phone, username, role, active: true }, password).then(
    serialize
  );
};

const updateUser = async (id, dataObj) => {
  const { password } = dataObj;
  console.log(dataObj);
  return User.findByIdAndUpdate(id, dataObj).then(async (resp) => {
    await resp.setPassword(password);
    const updatedUser = await resp.save();
    return serialize(updatedUser);
  });
};

const deleteUser = (id) => {
  return User.findByIdAndDelete(id)
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
  listUsers,
  findUser,
  addUser,
  updateUser,
  deleteUser,
};
