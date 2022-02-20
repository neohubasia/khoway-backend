require("dotenv").config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  APP: {
    NAME: "Template",
    FILE: "khoway-file",
    DESC: "Itemplate Core Project",
  },
  MONGO: {
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PW: process.env.MONGO_PW,
  },
  PG: {
    HOST: process.env.PG_HOST,
    USER: process.env.PG_USER,
    DATABASE: process.env.PG_DATABASE,
    PASSWORD: process.env.PG_PASSWORD,
    PORT: process.env.PG_PORT,
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
