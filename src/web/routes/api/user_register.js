const registersDb = require("../../../../controllers/registers");
const utils = require("../../../../utilities/utilities");
const { handleError } = require("../error_handler");

const userRegisters = (module.exports = {});

userRegisters.index = (req, res, next) => {
  registersDb
    .listData()
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

userRegisters.show = (req, res, next) => {
  registersDb
    .findData("id", req.params.id)
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

userRegisters.showBy = (req, res, next) => {
  delete req.query._;

  registersDb
    .findDataBy(req.query)
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

userRegisters.create = (req, res, next) => {
  registersDb
    .addData(req.body)
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

userRegisters.update = (req, res, next) => {
  registersDb
    .updateData(req.params.id, req.body)
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

userRegisters.delete = (req, res, next) => {
  registersDb
    .deleteData(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

userRegisters.deleteAll = (req, res, next) => {
  registersDb
    .dropAll()
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};
