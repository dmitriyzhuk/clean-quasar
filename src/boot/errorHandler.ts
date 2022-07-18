import { boot } from 'quasar/wrappers';
import { errorHandler } from 'src/utils';

export default boot(({ app }) => {
  app.config.errorHandler = (error: unknown) => errorHandler(error);
});
