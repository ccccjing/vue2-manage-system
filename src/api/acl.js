import request from "@/utils/request";

export const reqUserInfo = (currentPage, pageSize) => request({
  path: `/admin/acl/user/${currentPage}/${pageSize}`,
  method: 'GET'
})

export const reqAddOrUpdateUser = (data) => {
  if (data.id) {
    return request({
      path: '/admin/acl/user/update',
      method: 'put',
      data
    })
  } else {
    return request({
      path: '/admin/acl/user/save',
      method: 'post',
      data
    })
  }
}