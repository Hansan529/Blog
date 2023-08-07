import axios from 'axios';

export const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API });
export const formApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});