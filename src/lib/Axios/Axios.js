import axios from "axios";
import envConfig from '../../config'

const Axios = axios.create({
  baseURL: envConfig.baseUrl,
  timeout: 50000,
  crossdomain: true,
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});

export default Axios;
