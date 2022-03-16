import axios from "axios"

const { REACT_APP_BACKEND_URL } = process.env

const API_URL =
  process.env.NODE_ENV === "production"
    ? REACT_APP_BACKEND_URL
    : REACT_APP_BACKEND_URL
    ? REACT_APP_BACKEND_URL
    : "http://localhost:5000"
console.log({ API_URL })
export const apiClient = axios.create({
  baseURL: API_URL,
})
