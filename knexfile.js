let config = require("./config/index");
/**
  In terminal open mysql and create a new database. Then include the name of
  the database and your username and password in the development details below.
  Run the following terminal command
  $ mysql
  ## CREATE DATABASE DB_NAME;
  Note: remember the semicolon syntax
  ## \q
*/
module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "localhost",
      user: "root",
      password: null,
      database: "kho_backend_uat",
      port: 3306,
    },
    migrations: {
      directory: __dirname + "/database/mysqldb/migrations",
    },
    seeds: {
      directory: __dirname + "/database/mysqldb/seeds/development",
    },
  },
  production: {
    client: "mysql",
    connection: {
      host: config.PG.HOST,
      user: config.PG.USER,
      password: config.PG.PASSWORD,
      database: config.PG.DATABASE,
      port: config.PG.PORT,
      ssl: true,
    },
    migrations: {
      directory: __dirname + "/database/mysqldb/migrations",
    },
    seeds: {
      directory: __dirname + "/database/mysqldb/seeds/production",
    },
  },
};
