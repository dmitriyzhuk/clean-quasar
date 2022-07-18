import { boot } from 'quasar/wrappers';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { AccountService } from 'domain/services';
import { container } from 'setup/di';
import { authanticate } from 'src/utils';

export default boot(async () => {
  console.log('booting setup...');

  // primeAxios
  const primeAxios = axios.create({
    baseURL: `${container.get('primeApiBaseURL')}`,
    headers: {
      Accept: 'application/vnd.api+json;charset=UTF-8',
      'Content-Type': 'application/vnd.api+json;charset=UTF-8',
    },
  });
  axiosRetry(primeAxios, { retries: 3 });

  console.log('booting PrimeAxios...');
  container.add({ PrimeAxios: primeAxios });

  // apiAxios
  const apiAxios = axios.create({
    baseURL: `${container.get('apiBaseURL')}`,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // axiosRetry(apiAxios, { retries: 3 });

  console.log('booting ApiAxios...');
  container.add({ ApiAxios: apiAxios });

  // auth
  const auth = await container.get<AccountService>('AccountService').init();
  if (auth) await authanticate(auth);
});
