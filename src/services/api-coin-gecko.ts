import axios from 'axios';

const apiCoinGecko = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_COINGECKO,
  headers: {
    accept: 'application/json',
    "x-cg-demo-api-key": process.env.NEXT_PUBLIC_KEY_COINGECKO
  },
});

apiCoinGecko.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default apiCoinGecko;