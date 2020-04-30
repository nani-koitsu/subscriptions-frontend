import axios from "axios";


const Axios = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : '',
  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api' : '',
  timeout: 50000,
  crossdomain: true,
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});

export default Axios;
