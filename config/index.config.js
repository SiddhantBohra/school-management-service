const { cleanEnv, str, port, url, num } = require('envalid');
const os = require('os');
const pjson = require('../package.json');
const utils = require('../libs/utils');

require('dotenv').config();

const env = cleanEnv(process.env, {
  SERVICE_NAME: str({ default: pjson.name }),
  USER_PORT: port({ default: 5111 }),
  ADMIN_PORT: port({ default: 5222 }),
  ADMIN_URL: url({ default: `http://localhost:5222` }),
  ENV: str({ default: 'development' }),
  REDIS_URI: str({ default: 'redis://127.0.0.1:6379' }),
  CORTEX_REDIS: str({ default: 'redis://127.0.0.1:6379' }),
  CORTEX_PREFIX: str({ default: 'none' }),
  CORTEX_TYPE: str({ default: utils.slugify(pjson.name) }),
  OYSTER_REDIS: str({ default: 'redis://127.0.0.1:6379' }),
  OYSTER_PREFIX: str({ default: 'none' }),
  CACHE_REDIS: str({ default: 'redis://127.0.0.1:6379' }),
  CACHE_PREFIX: str({ default: `${utils.slugify(pjson.name)}:ch` }),
  MONGO_URI: str({
    default: `mongodb://localhost:27017/${utils.slugify(pjson.name)}`,
  }),
  LONG_TOKEN_SECRET: str(),
  SHORT_TOKEN_SECRET: str(),
  NACL_SECRET: str(),
  MAX_REQUESTS_PER_WINDOW: num({ default: 100 }),
  WINDOW_SIZE_IN_SECONDS: num({ default: 60 }),
});

const config = require(`./envs/${env.ENV}.js`);

config.dotEnv = {
  SERVICE_NAME: env.SERVICE_NAME,
  ENV: env.ENV,
  CORTEX_REDIS: env.CORTEX_REDIS,
  CORTEX_PREFIX: env.CORTEX_PREFIX,
  CORTEX_TYPE: env.CORTEX_TYPE,
  OYSTER_REDIS: env.OYSTER_REDIS,
  OYSTER_PREFIX: env.OYSTER_PREFIX,
  CACHE_REDIS: env.CACHE_REDIS,
  CACHE_PREFIX: env.CACHE_PREFIX,
  MONGO_URI: env.MONGO_URI,
  USER_PORT: env.USER_PORT,
  ADMIN_PORT: env.ADMIN_PORT,
  ADMIN_URL: env.ADMIN_URL,
  LONG_TOKEN_SECRET: env.LONG_TOKEN_SECRET,
  SHORT_TOKEN_SECRET: env.SHORT_TOKEN_SECRET,
  MAX_REQUESTS_PER_WINDOW: env.MAX_REQUESTS_PER_WINDOW,
  WINDOW_SIZE_IN_SECONDS: env.WINDOW_SIZE_IN_SECONDS,
};

module.exports = config;
