import getConfig from 'next/config';

const {
  publicRuntimeConfig: {
    API_BASE_URL,
    FACEBOOK_APPID,
  },
} = getConfig();


export default {
  apiBaseUrl: API_BASE_URL,
  facebookAppid: FACEBOOK_APPID,
};
