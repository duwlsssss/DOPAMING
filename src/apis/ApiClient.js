import axios from 'axios';

const BASE_URL = '';

export const ApiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
