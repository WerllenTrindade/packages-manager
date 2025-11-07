import axios from 'axios';
import Constants from 'expo-constants';

const WEBHOOK_URL = Constants.expoConfig?.extra?.WEBHOOK_URL as string;

const api = axios.create({
  baseURL: WEBHOOK_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
