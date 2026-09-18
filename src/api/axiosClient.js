import axios from 'axios';

const localApiUrl = `http://${window.location.hostname}:3001`;

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || localApiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
