require("dotenv").config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  APP: {
    NAME: "khoway",
    FILE: "khoway-file",
    DESC: "Secret message service",
  },
  MONGO: {
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PW: process.env.MONGO_PW,
  },
  MYSQL: {
    HOST: process.env.MYSQL_HOST,
    USER: process.env.MYSQL_USER,
    PORT: process.env.MYSQL_PORT,
    DB: process.env.MYSQL_DB,
    PW: process.env.MYSQL_PW,
  },
  JWT: {
    TEXT: "9E0HU8L48",
    HASH: "SHA256",
    SECRET: "C57B465081874C256CFD78D9EC226DCD111D03E08E21ABB8DCAF0CF7DA71D362",
    CREDENTIAL: {
      USERNAME: "9E0HU8L48",
      PASSWORD: "123098321",
    },
  },
};
