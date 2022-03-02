const citiesDb = require("../../../../controllers/cities");
const utils = require("../../../../utilities/utilities");
const { handleError } = require("../error_handler");

const cities = (module.exports = {});

cities.index = (req, res, next) => {
  citiesDb
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

cities.show = (req, res, next) => {
  citiesDb
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

cities.showBy = (req, res, next) => {
  delete req.query._;
  // const obj = [];
  // Object.keys(req.query).map(function (i) {
  //   obj.push({ prop: i, val: req.query[i] });
  // });

  citiesDb
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

cities.create = (req, res, next) => {
  citiesDb
    .addData(req.body)
    .then((data) => {
      const handler_response = utils.isEmptyObject(data)
        ? { status: "FAIL", data: {} }
        : { status: "SUCCESS", data: data };

      res.status(200).json(handler_response);
    })
    .catch((err) => {
      cconsole.log(`Error ${err}`);
      res.status(500).json(handleError(err));
    });
};

cities.update = (req, res, next) => {
  citiesDb
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

cities.delete = (req, res, next) => {
  citiesDb
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

cities.deleteAll = (req, res, next) => {
  citiesDb
    .dropAll()
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};
