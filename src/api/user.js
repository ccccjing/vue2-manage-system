import request from "@/utils/request"

export function login(data) {
  return request({
    path: '/user/login',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request({
    path: '/user/userInfo',
    method: 'get'
  })
}

export function getMovies() {
  return request({
    path: '/movies',
    method: 'post',
    data: {username: 'admin', passowrd: '111111'}
  })
}
