import axios from "axios";

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

request.interceptors.request.use(config => {
  return config
}, error => {
  console.log(error)
})

request.interceptors.response.use(response => {
  console.log(response)
  return response
}, error => {
  console.log(error)
})

export default request
