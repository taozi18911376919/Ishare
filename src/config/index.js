import getConfig from 'next/config';

const {
  publicRuntimeConfig: {
    API_BASE_URL,
  },
} = getConfig();


export default {
  apiBaseUrl: API_BASE_URL,
};
