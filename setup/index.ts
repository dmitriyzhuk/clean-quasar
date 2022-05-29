let config = require('./config.ts');

switch (process.env.APP_ENV) {
  case 'uat':
    config = require('./config.uat.ts');
    break;
  case 'prod':
    config = require('./config.prod.ts');
    break;
  default:
}

export default {
  config,
};
