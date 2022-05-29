import axios from 'axios';

export default class SetupTests {
  init() {
    const apiAxios = axios.create({
      baseURL: 'https://dominos-aus-dev.cosocloud.com/api/',
      headers: {
        Authorization: 'oauth 0c8c98f94788c92ec1b652bcb6557c91',
        'Content-Type': 'application/json',
      },
    });

    return apiAxios;
  }
}
