// src/services/apiClient.js
import axios from 'axios';

const BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3001';

const api = axios.create({
  baseURL: BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

export default api;
