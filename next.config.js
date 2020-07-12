/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const withSass = require('@zeit/next-sass');
const Dotenv = require('dotenv');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const envPath = path.join(__dirname, './.env');
const isExistENV = fs.existsSync(envPath);

if (isExistENV) {
  Dotenv.config({
    path: envPath,
    safe: true,
    systemvars: true,
  });
}

const nextConfig = withBundleAnalyzer(withSass({
  // css config
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: process.env.NODE_ENV !== 'production' ? '[local]___[hash:base64:4]' : '[hash:base64:8]',
  },
  useFileSystemPublicRoutes: false,
  poweredByHeader: false,
  pageExtensions: ['jsx', 'js'],
  publicRuntimeConfig: {
    API_BASE_URL: process.env.API_BASE_URL,
    FACEBOOK_APPID: process.env.FACEBOOK_APPID,
    HOST: process.env.HOST,
  },
}));

module.exports = nextConfig;
