import axios from 'axios'
import config from '../config/env.js'

const api = axios.create({
  baseURL: config.apiUrl + '/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true // Send cookies with requests
})

export default api
