const axios = require('axios')

const API_URL = process.env.API_URL || `http://localhost:5050`;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// axiosInstance.interceptors.request.use((config) => {
//   const token = document.cookie.split('=')[1]

//   if (token) {
//     config.headers = {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     }
//   }
//   return config;
// })

module.exports = axiosInstance;