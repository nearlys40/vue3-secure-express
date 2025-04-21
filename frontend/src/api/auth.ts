import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
})

export const login = (data: { username: string; password: string }) => api.post('/auth/login', data)
export const register = (data: { username: string; password: string; role?: string }) =>
  api.post('/auth/register', data)
export const logout = () => api.post('/auth/logout')
export const refresh = () => api.post('/auth/refresh')
export const me = () => api.get('/me')
