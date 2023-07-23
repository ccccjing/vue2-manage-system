import request from "@/utils/request";

export const reqUserInfo = (currentPage, pageSize, username) => request({
  path: `/admin/acl/user/${currentPage}/${pageSize}/?username=${username}`,
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

export const reqAllRole = (userId) => {
  return request({
    path: `/admin/acl/user/toAssign/${userId}`,
    method: 'GET'
  })
}

export const reqSetUserRole = (data) => request({
  path: '/admin/acl/user/doAssignRole',
  method: 'POST',
  data
})

export const reqRemoveUser = (userID) => request({
  path: `/admin/acl/user/remove/${userID}`,
  method: 'DELETE'
})

export const reqRemoveUsers = (data) => request({
  path: '/admin/acl/user/batchRemove',
  method: 'DELETE',
  data
})