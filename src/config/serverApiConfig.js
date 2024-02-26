export const API_BASE_URL =
  process.env.NODE_ENV == 'production' || process.env.REACT_APP_DEV_REMOTE == 'remote'
    ? 'http://65.2.123.154:4100/'
    : 'http://65.2.123.154:4100/';
export const DOWNLOAD_BASE_URL =
  process.env.NODE_ENV == 'production' || process.env.REACT_APP_DEV_REMOTE == 'remote'
    ? 'https://calm-ruby-barracuda-sock.cyclic.app/download/'
    : 'https://calm-ruby-barracuda-sock.cyclic.app/download/';
export const ACCESS_TOKEN_NAME = 'x-auth-token';
export const S3_BASE_URL = 'https://guage09.s3.ap-south-1.amazonaws.com/';
