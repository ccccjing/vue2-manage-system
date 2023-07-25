import request from "@/utils/request";

// ---------------------------------用户管理------------------------------
// 获取用户角色信息
export const reqUserInfo = (currentPage, pageSize, username) => request({
  path: `/admin/acl/user/${currentPage}/${pageSize}/?username=${username}`,
  method: 'GET'
})
// 添加或修改用户信息
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
// 获取所有角色
export const reqAllRole = (userId) => {
  return request({
    path: `/admin/acl/user/toAssign/${userId}`,
    method: 'GET'
  })
}
// 设置用户角色
export const reqSetUserRole = (data) => request({
  path: '/admin/acl/user/doAssignRole',
  method: 'POST',
  data
})
// 单个删除用户
export const reqRemoveUser = (userID) => request({
  path: `/admin/acl/user/remove/${userID}`,
  method: 'DELETE'
})
// 批量删除用户
export const reqRemoveUsers = (data) => request({
  path: '/admin/acl/user/batchRemove',
  method: 'DELETE',
  data
})

// ---------------------------------角色管理------------------------------
export const reqRoleList = (currentPage, pageSize, roleName) => request({
  path: `/admin/acl/role/${currentPage}/${pageSize}/?roleName=${roleName}`,
  method: 'GET'
})

export const reqAddOrUpdateRole = (data) => {
  if (data.id) {
    return request({
      path: '/admin/acl/role/update',
      method: 'PUT',
      data
    })
  } else {
    return request({
      path: '/admin/acl/role/save',
      method: 'POST',
      data
    })
  }
}

export const reqRemoveRole = (roleId) => request({
  path: `/admin/acl/role/remove/${roleId}`,
  method: 'DELETE'
})
