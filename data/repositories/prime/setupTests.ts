import axios from 'axios';
import { Locale } from '.';

export default class SetupTests {
  init() {
    const axiosInstance = axios.create({
      baseURL: 'https://captivateprime.adobe.com/primeapi/v2/',
      headers: {
        Authorization: 'oauth 601fc4cebfd9c30a4ba244fada809c36',
        Accept: 'application/vnd.api+json;charset=UTF-8',
      },
    });

    return axiosInstance;
  }

  config() {
    const locale: Locale = 'en-US';

    return {
      locale,
    };
  }
}
