import axios from 'axios';
import { parseCookies } from 'nookies';
import { fromJS } from 'immutable';
import qs from 'qs';

const network = axios.create();

network.interceptors.request.use(config => {
  const { token } = parseCookies();
  const Authorization = token ? { Authorization: `Bearer ${token}` } : {};
  if (!('Authorization' in config.headers)) {
    config.headers = {
      ...config.headers,
      ...Authorization,
    };
  }
  // eslint-disable-next-line no-undef
  if (config.url.indexOf('upload-image') === -1) {
    config.data = qs.stringify(config.data);
  }

  return config;
});

const NETWORK_CODE = {
  ERROR_OK: 0,
};

network.interceptors.response.use(response => {
  if ('data' in response && response.data) {
    const { data, code, message } = response.data;
    if (code === NETWORK_CODE.ERROR_OK) {
      return fromJS(data);
    }
    if (JSON.stringify(data) === '[]') {
      throw Error(message);
    }
    throw Error(JSON.stringify(data));
  }
  return undefined;
});

export default network;
