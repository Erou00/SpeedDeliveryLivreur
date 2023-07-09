import axios from "axios";
const ApiManager = axios.create({
    baseURL: 'http://192.168.1.37:8080/api',
    responseType: 'json',
    withCredentials:false,
  });   
  
  export default ApiManager;       