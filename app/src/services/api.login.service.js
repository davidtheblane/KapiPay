import { create } from 'axios';

const API_URL = process.env.API_USER_URL;

const axiosInstance = create({
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

export default axiosInstance;