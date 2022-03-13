require("dotenv").config();

module.exports = {
  HOST: process.env.APP_HOST,
  PORT: process.env.APP_PORT,
  NODE_ENV: process.env.NODE_ENV,
  APP: {
    NAME: "khoway",
    FILE: "khoway-file",
    DESC: "Secret message service",
    DATABASE: process.env.DATABASE_NAME,
    COOKIE_SECRET: process.env.COOKIE_SECRET,
    WHITELISTED_DOMAINS: process.env.WHITELISTED_DOMAINS,
  },
  MONGO: {
    MONGO_HOST: process.env.MONGO_HOST,
    MONGO_PORT: process.env.MONGO_PORT,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASS: process.env.MONGO_PASS,
  },
  MYSQL: {
    HOST: process.env.MYSQL_HOST,
    PORT: process.env.MYSQL_PORT,
    USER: process.env.MYSQL_USER,
    PASS: process.env.MYSQL_PASS,
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
