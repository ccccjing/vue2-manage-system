import { getToken } from "@/utils/auth"
import request from "@/utils/request"

// export function reqLogin(data) {
//   return request({
//     path: '/user/login',
//     method: 'post',
//     data
//   })
// }

// export function getUserInfo() {
//   return request({
//     path: '/user/userInfo',
//     method: 'get',
//     data: getToken()
//   })
// }

export function reqLogin(data) {
  return request({
    path: '/admin/acl/index/login',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request({
    path: '/admin/acl/index/info',
    method: 'get'
  })
}

export function reqLogout() {
  return request({
    path: '/admin/acl/index/logout',
    method: 'post'
  })
}
