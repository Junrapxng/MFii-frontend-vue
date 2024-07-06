import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.25.46.35:7770',
  withCredentials: true,  // Important for sending cookies
  credentials: 'include'
});

const url = 'http://172.25.46.35:7770';

export { api, url };