/**
 * WHAT: A single configured axios instance every API call goes through.
 *
 * WHY: Centralizes the backend base URL and (from Milestone 2 onward)
 * will centralize attaching the auth token to every request, so we
 * never repeat that logic in individual components.
 */
import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  withCredentials: true, // needed once auth uses httpOnly cookies (Milestone 2)
})
