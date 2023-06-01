import axios from "axios";

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

request.interceptors.request.use(config => {
  const { path } = config
  config.baseURL = config.baseURL + path

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
