import axios from 'axios';
import configApi from '../config/api';

const request = axios.create();

request.interceptors.request.use(
  config => {
    config.baseURL = configApi.API_ENDPOINT;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.response) {
      return Promise.resolve(error.response.data);
    } else if (error.request) {
      return Promise.resolve(error.request);
    } else {
      return Promise.resolve(error);
    }
  }
);

export default request;
