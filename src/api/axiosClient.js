import axios from 'axios';

const isLocalEnvironment = ['localhost', '127.0.0.1'].includes(window.location.hostname);
const localApiUrl = `http://${window.location.hostname}:3001`;
const deployedApiUrl = '/api';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || (isLocalEnvironment ? localApiUrl : deployedApiUrl),
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
