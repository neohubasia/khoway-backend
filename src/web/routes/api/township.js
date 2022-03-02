const townshipsDb = require("../../../../controllers/townships");
const utils = require("../../../../utilities/utilities");
const { handleError } = require("../error_handler");

const townships = (module.exports = {});

townships.index = (req, res, next) => {
  townshipsDb
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

townships.show = (req, res, next) => {
  townshipsDb
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

townships.showBy = (req, res, next) => {
  delete req.query._;

  townshipsDb
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

townships.create = (req, res, next) => {
  townshipsDb
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

townships.update = (req, res, next) => {
  townshipsDb
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

townships.delete = (req, res, next) => {
  townshipsDb
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

townships.deleteAll = (req, res, next) => {
  townshipsDb
    .dropAll()
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};
