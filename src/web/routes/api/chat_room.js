const chatRoomsDb = require("../../../../controllers/chat_rooms");
const utils = require("../../../../utilities/utilities");
const {
  handleError
} = require("../error_handler");

const chatRoom = (module.exports = {});

chatRoom.index = (req, res, next) => {
  chatRoomsDb
    .listData()
    .then((data) => {
      const handler_response = utils.isEmptyArray(data) ?
        {
          status: "FAIL",
          data: []
        } :
        {
          status: "SUCCESS",
          data: data
        };

      res.status(200).json(handler_response);
    })
    .catch((err) => {
      res.status(500).json(handleError(err));
    });
};

chatRoom.show = (req, res, next) => {
  chatRoomsDb
    .findData("id", req.params.id)
    .then((data) => {
      const handler_response = utils.isEmptyObject(data) ?
        {
          status: "FAIL",
          data: {}
        } :
        {
          status: "SUCCESS",
          data: data
        };

      res.status(200).json(handler_response);
    })
    .catch((err) => {
      res.status(500).json(handleError(err));
    });
};

chatRoom.showBy = (req, res, next) => {
  delete req.query._;

  chatRoomsDb
    .findDataBy(req.query)
    .then((data) => {
      const handler_response = utils.isEmptyArray(data) ?
        {
          status: "FAIL",
          data: []
        } :
        {
          status: "SUCCESS",
          data: data
        };

      res.status(200).json(handler_response);
    })
    .catch((err) => {
      res.status(500).json(handleError(err));
    });
};

chatRoom.create = (req, res, next) => {
  chatRoomsDb
    .addData(req.body)
    .then((data) => {
      const handler_response = utils.isEmptyObject(data) ?
        {
          status: "FAIL",
          data: {}
        } :
        {
          status: "SUCCESS",
          data: data
        };

      res.status(200).json(handler_response);
    })
    .catch((err) => {
      res.status(500).json(handleError(err));
    });
};

chatRoom.update = (req, res, next) => {
  chatRoomsDb
    .updateData(req.params.id, req.body)
    .then((data) => {
      const handler_response = utils.isEmptyObject(data) ?
        {
          status: "FAIL",
          data: {}
        } :
        {
          status: "SUCCESS",
          data: data
        };

      res.status(200).json(handler_response);
    })
    .catch((err) => {
      res.status(500).json(handleError(err));
    });
};

chatRoom.push = (req, res, next) => {
  chatRoomsDb
    .pushMessage(req.params.id, req.body)
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

chatRoom.delete = (req, res, next) => {
  chatRoomsDb
    .deleteData(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

chatRoom.deleteAll = (req, res, next) => {
  chatRoomsDb
    .dropAll()
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};