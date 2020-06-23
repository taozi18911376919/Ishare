/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
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

const nextConfig = withBundleAnalyzer({
  useFileSystemPublicRoutes: false,
  poweredByHeader: false,
  pageExtensions: ['jsx', 'js'],
  publicRuntimeConfig: {
    API_BASE_URL: process.env.API_BASE_URL,
    FACEBOOK_APPID: process.env.FACEBOOK_APPID,
    TWITTER_APPID: process.env.TWITTER_APPID,
    HOST: process.env.HOST,
  },
});

module.exports = nextConfig;
