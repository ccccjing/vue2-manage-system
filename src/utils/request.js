import axios from "axios";
import { getToken } from "./auth";

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

request.interceptors.request.use(config => {
  const { path } = config
  const token = getToken()
  config.baseURL = config.baseURL + path
  config.headers.token = token
  return config
}, error => {
  console.log(error)
})

request.interceptors.response.use(response => {
  return response.data
}, error => {
  console.log(error)
})

export default request
