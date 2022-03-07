const chatMessagesDb = require("../../../../controllers/chat_messages");
const utils = require("../../../../utilities/utilities");
const { handleError } = require("../error_handler");

const chatMessages = (module.exports = {});

chatMessages.index = (req, res, next) => {
  chatMessagesDb
    .listData()
    .then((data) => {
      const handler_response = utils.isEmptyArray(data)
        ? { status: "FAIL", data: [] }
        : { status: "SUCCESS", data: data };

      res.status(200).json(handler_response);
    })
    .catch((err) => {
      res.status(500).json(handleError(err));
    });
};

chatMessages.show = (req, res, next) => {
  chatMessagesDb
    .findData("id", req.params.id)
    .then((data) => {
      const handler_response = utils.isEmptyObject(data)
        ? { status: "FAIL", data: {} }
        : { status: "SUCCESS", data: data };

      res.status(200).json(handler_response);
    })
    .catch((err) => {
      res.status(500).json(handleError(err));
    });
};

chatMessages.showBy = (req, res, next) => {
  delete req.query._;

  chatMessagesDb
    .findDataBy(req.query)
    .then((data) => {
      const handler_response = utils.isEmptyArray(data)
        ? { status: "FAIL", data: [] }
        : { status: "SUCCESS", data: data };

      res.status(200).json(handler_response);
    })
    .catch((err) => {
      res.status(500).json(handleError(err));
    });
};

chatMessages.create = (req, res, next) => {
  chatMessagesDb
    .addData(req.body)
    .then((data) => {
      const handler_response = utils.isEmptyObject(data)
        ? { status: "FAIL", data: {} }
        : { status: "SUCCESS", data: data };

      res.status(200).json(handler_response);
    })
    .catch((err) => {
      res.status(500).json(handleError(err));
    });
};

chatMessages.update = (req, res, next) => {
  chatMessagesDb
    .updateData(req.params.id, req.body)
    .then((data) => {
      const handler_response = utils.isEmptyObject(data)
        ? { status: "FAIL", data: {} }
        : { status: "SUCCESS", data: data };

      res.status(200).json(handler_response);
    })
    .catch((err) => {
      res.status(500).json(handleError(err));
    });
};

chatMessages.delete = (req, res, next) => {
  chatMessagesDb
    .deleteData(req.params.id)
    .then((data) => {
      const handler_response = utils.isEmptyObject(data)
        ? { status: "FAIL", message: "Delete Unsuccessful" }
        : { status: "SUCCESS", message: "Delete Successful" };

      res.status(200).json(handler_response);
    })
    .catch((err) => {
      res.status(500).json(handleError(err));
    });
};

chatMessages.deleteAll = (req, res, next) => {
  chatMessagesDb
    .dropAll()
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};
