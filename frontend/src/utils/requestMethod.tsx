import axios from 'axios'

export const BASE_URL = 'https://k10s208.p.ssafy.io'

export const authRequest = axios.create({
  baseURL: BASE_URL,
})
