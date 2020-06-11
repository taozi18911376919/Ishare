import axios from 'axios';
import { parseCookies } from 'nookies';
import { fromJS } from 'immutable';

const network = axios.create({
  withCredentials: process.env.NODE_ENV === 'production',
});

network.interceptors.request.use(config => {
  const { token } = parseCookies();
  const Authorization = token ? { Authorization: `Bearer ${token}` } : {};
  config.headers = {
    ...config.headers,
    ...Authorization,
  };
  return config;
});

const NETWORK_CODE = {
  ERROR_OK: 0,
};

network.interceptors.response.use(response => {
  if ('data' in response && response.data) {
    const { data, code } = response.data;
    if (code === NETWORK_CODE.ERROR_OK) {
      return fromJS(data);
    }
  }
  return undefined;
});

export default network;
