import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:7770/api',
  withCredentials: true,  // Important for sending cookies
  credentials: 'include'
});

const url = 'http://localhost:7770/api';

export { api, url };