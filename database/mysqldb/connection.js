const config = require("../../config");

const environment = config.NODE_ENV || "development";
const knexConfig = require("../../config/knex-connect")[environment];
const connection = require("knex")(knexConfig);

module.exports = connection;
