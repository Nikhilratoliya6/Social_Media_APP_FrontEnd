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

// API Base URL with trailing slash to ensure proper path joining
export const API_BASE_URL = 'https://socialmediaappbackend-production-8a21.up.railway.app/';

// Create axios instance with dynamic header generation to get the latest token
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include the latest JWT token in every request
api.interceptors.request.use(
  (config) => {
    const token = getJwtToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
