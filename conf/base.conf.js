var log4js = require("log4js");
var logger;
const TEST_SCRIPT = process.argv[4];

// Build name
const BUILD_NAME = process.argv[5];

// Target Environment
const TARGET_ENV = process.argv[6] || 'testing';

// LamdaTest Tunnel
const LT_TUNNEL = TARGET_ENV == 'development'

// Load .env if exists, once variable defined it won't look elsewhere
const dotenv = require('dotenv');
dotenv.config();

// Load .env.development OR .env.production OR .env.testing
dotenv.config({ path: `./.env.${TARGET_ENV}` });

// LamdaTest Credentials
const LT_USERNAME = process.env.LT_USERNAME;
const LT_ACCESS_KEY = process.env.LT_ACCESS_KEY;

// INVRS URL
const BASE_URL = process.env.BASE_URL;

// INVRS Credentials, testing by default
let LOGIN_USERNAME = process.env.INVRS_EMAIL;
let LOGIN_PASSWORD = process.env.INVRS_PASSWORD;
// Second INVRS Credentials, testing by default
let LOGIN_USERNAME_2 = process.env.INVRS_EMAIL_2;
let LOGIN_PASSWORD_2 = process.env.INVRS_PASSWORD_2;
switch (TARGET_ENV) {
  case 'development':
    LOGIN_USERNAME = process.env.INVRS_DEV_EMAIL;
    LOGIN_PASSWORD = process.env.INVRS_DEV_PASSWORD;
    LOGIN_USERNAME_2 = process.env.INVRS_DEV_EMAIL_2;
    LOGIN_PASSWORD_2 = process.env.INVRS_DEV_PASSWORD_2;
    log4js.configure({
      appenders: { console: { type: "console" } },
      categories: { default: { appenders: ["console"], level: "debug" } },
    });
    log4js.configure({
      appenders: { console: { type: "console" } },
      categories: { default: { appenders: ["console"], level: "info" } },
    });
    break;
  case 'production':
    LOGIN_USERNAME = process.env.INVRS_PROD_EMAIL;
    LOGIN_PASSWORD = process.env.INVRS_PROD_PASSWORD;
    LOGIN_USERNAME_2 = process.env.INVRS_PROD_EMAIL_2;
    LOGIN_PASSWORD_2 = process.env.INVRS_PROD_PASSWORD_2;
    log4js.configure({
      appenders: { console: { type: "console" } },
      categories: { default: { appenders: ["console"], level: "debug" } }
    });
    log4js.configure({
      appenders: { console: { type: "console" } },
      categories: { default: { appenders: ["console"], level: "info" } },
    });
    logger = log4js.getLogger(TARGET_ENV);
    break;
  case 'testing':
    LOGIN_USERNAME = process.env.INVRS_EMAIL;
    LOGIN_PASSWORD = process.env.INVRS_PASSWORD;
    log4js.configure({
      appenders: { console: { type: "console" } },
      categories: { default: { appenders: ["console"], level: "debug" } }
    });
    log4js.configure({
      appenders: { console: { type: "console" } },
      categories: { default: { appenders: ["console"], level: "info" } },
    });
    logger = log4js.getLogger(TARGET_ENV);
    break;
    case 'testingWithoutLogs' :
    LOGIN_USERNAME = process.env.INVRS_EMAIL;
    LOGIN_PASSWORD = process.env.INVRS_PASSWORD;
    log4js.configure({
      appenders: { cheese: { type: "file", filename: "cheese.log" } },
      categories: { default: { appenders: ["cheese"], level: "debug" } },
    });
    log4js.configure({
      appenders: { console: { type: "console" } },
      categories: { default: { appenders: ["console"], level: "info" } },
    });
    logger = log4js.getLogger(TARGET_ENV);
    break;
}

// Selenium Driver - max wait time for element located
const ELEMENT_WAIT_MS = 10000;

//log4js
 
// console.log('testing');
// logger.debug("Some debug messages");

console.debug({
  TEST_SCRIPT,
  BUILD_NAME,
  TARGET_ENV,
  LT_TUNNEL,
  LT_USERNAME,
  LT_ACCESS_KEY,
  BASE_URL,
  LOGIN_USERNAME,
  LOGIN_PASSWORD,
  LOGIN_USERNAME_2,
  LOGIN_PASSWORD_2,
  ELEMENT_WAIT_MS
});

module.exports = {
  TEST_SCRIPT,
  BUILD_NAME,
  TARGET_ENV,
  LT_TUNNEL,
  LT_USERNAME,
  LT_ACCESS_KEY,
  BASE_URL,
  LOGIN_USERNAME,
  LOGIN_PASSWORD,
  LOGIN_USERNAME_2,
  LOGIN_PASSWORD_2,
  ELEMENT_WAIT_MS,
  logger
};