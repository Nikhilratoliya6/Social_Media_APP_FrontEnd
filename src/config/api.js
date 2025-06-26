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

const jwtToken = localStorage.getItem("jwt");

export const API_BASE_URL = 'https://socialmediaappbackend-production-8a21.up.railway.app';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${jwtToken}`,
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for CORS with credentials
});

// Add request interceptor to update token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
