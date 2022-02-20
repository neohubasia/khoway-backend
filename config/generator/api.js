const genDatabase = require("../../../../controllers/generators");
const utils = require("../../../../utilities/utilities");
const { handleError } = require("../error_handler");

const genExport = (module.exports = {});

genExport.index = (req, res, next) => {
  genDatabase
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

genExport.show = (req, res, next) => {
  genDatabase
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

genExport.showBy = (req, res, next) => {
  delete req.query._;

  genDatabase
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

genExport.create = (req, res, next) => {
  genDatabase
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

genExport.update = (req, res, next) => {
  genDatabase
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

genExport.delete = (req, res, next) => {
  genDatabase
    .deleteData(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

genExport.deleteAll = (req, res, next) => {
  genDatabase
    .dropAll()
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};
