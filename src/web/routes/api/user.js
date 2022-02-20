const usersDb = require("../../../../controllers/users");
const utils = require("../../../../utilities/utilities");
const { handleError } = require("../error_handler");

const users = (module.exports = {});

users.index = (req, res, next) => {
  usersDb
    .listUsers()
    .then((data) => {
      const handler_response = utils.isEmptyArray(data)
        ? { status: "FAIL", data: [] }
        : { status: "SUCCESS", data: data };

      res.status(200).json(handler_response);
    })
    .catch((err) => {
      console.log(`Error ${err}`);
      res.status(500).json(handleError(err));
    });
};

users.show = (req, res, next) => {
  usersDb
    .findUser("id", req.params.id)
    .then((data) => {
      const handler_response = utils.isEmptyObject(data)
        ? { status: "FAIL", data: {} }
        : { status: "SUCCESS", data: data };

      res.status(200).json(handler_response);
    })
    .catch((err) => {
      console.log(`Error ${err}`);
      res.status(500).json(handleError(err));
    });
};

users.create = (req, res, next) => {
  usersDb
    .addUser(req.body)
    .then((data) => {
      const handler_response = utils.isEmptyObject(data)
        ? { status: "FAIL", data: {} }
        : { status: "SUCCESS", data: data };

      res.status(200).json(handler_response);
    })
    .catch((err) => {
      console.log(`Error ${err}`);
      res.status(500).json(handleError(err));
    });
};

users.update = (req, res, next) => {
  usersDb
    .updateUser(req.params.id, req.body)
    .then((data) => {
      const handler_response = utils.isEmptyObject(data)
        ? { status: "FAIL", data: {} }
        : { status: "SUCCESS", data: data };

      res.status(200).json(handler_response);
    })
    .catch((err) => {
      console.log(`Error ${err}`);
      res.status(500).json(handleError(err));
    });
};

users.delete = (req, res, next) => {
  usersDb
    .deleteUser(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};
