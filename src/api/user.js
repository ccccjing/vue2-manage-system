import { getToken } from "@/utils/auth"
import request from "@/utils/request"
// 登录请求
export function reqLogin(data) {
  return request({
    path: '/admin/acl/index/login',
    method: 'post',
    data
  })
}
// 获取用户信息请求
export function getUserInfo() {
  return request({
    path: '/admin/acl/index/info',
    method: 'get'
  })
}
// 退出登录请求
export function reqLogout() {
  return request({
    path: '/admin/acl/index/logout',
    method: 'post'
  })
}

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