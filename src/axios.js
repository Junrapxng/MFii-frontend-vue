import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:7770',
  withCredentials: true,  // Important for sending cookies
});

export default api;