// import axios from "axios";
// const jwtToken = localStorage.getItem("jwt")
// // export const API_BASE_URL = 'http://localhost:5454';

// export const API_BASE_URL = 'https://socialmediaappbackend-production-8a21.up.railway.app/';



// export const api = axios.create({
//   baseURL: API_BASE_URL, 
//   headers: {
//     'Authorization':`Bearer ${jwtToken}`,
//     'Content-Type': 'application/json',
//   },
// });


// import axios from "axios";

// const jwtToken = localStorage.getItem("jwt");

// export const API_BASE_URL = 'https://socialmediaappbackend-production-8a21.up.railway.app';

// export const api = axios.create({
//   baseURL: API_BASE_URL, 
//   headers: {
//     'Authorization': `Bearer ${jwtToken}`,
//     'Content-Type': 'application/json',
//   },
// });

import axios from "axios";

// Get JWT token from localStorage
const getJwtToken = () => localStorage.getItem("jwt");

// API Base URL without trailing slash
export const API_BASE_URL = 'https://socialmediaappbackend-production-8a21.up.railway.app';

// Create axios instance with enhanced configuration
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'https://socialmediaapp-nikhil.netlify.app',
    'Access-Control-Allow-Credentials': 'true'
  },
  timeout: 15000, // Increased timeout
  withCredentials: false // Changed to false since we're handling CORS on the server side
});

// Request interceptor to include the latest JWT token and handle URL formatting
api.interceptors.request.use(
  (config) => {
    const token = getJwtToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // Ensure trailing slashes are handled correctly
    if (config.url && config.url.endsWith('//')) {
      config.url = config.url.slice(0, -1);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response Error:', error.response.data);
      if (error.response.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem('jwt');
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request Error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);
