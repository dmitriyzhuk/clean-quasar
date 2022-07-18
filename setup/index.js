/**
 * Config Setup
 * in bamboo `Plan configurations` on tab build in item `npm build` set `Environment variables`
 *
 *    APP_ENV='${bamboo.environment}'
 *
 * then in tab `Variables` add a new var `environment` and set:
 *
 *    branch develop -> dev
 *    branch uat     -> uat
 *    branch master  -> prod
 */
let config = require('./config.js');
if (process.env.APP_ENV == 'dev') config = require('./config.dev.js');
if (process.env.APP_ENV == 'uat') config = require('./config.uat.js');
if (process.env.APP_ENV == 'prod') config = require('./config.prod.js');
module.exports = config;
