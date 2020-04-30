
const {
  REACT_APP_DEV_BASE_URL,
  REACT_APP_PROD_BASE_URL } = process.env

const devKeys = {
  baseUrl: REACT_APP_DEV_BASE_URL
}
const prodKeys = {
  baseUrl: REACT_APP_PROD_BASE_URL
}
const envConfig = (process.env.NODE_ENV === 'production') ? prodKeys
  : devKeys

export default envConfig