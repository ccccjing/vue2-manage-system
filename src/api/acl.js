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
// 获取角色列表
export const reqRoleList = (currentPage, pageSize, roleName) => request({
  path: `/admin/acl/role/${currentPage}/${pageSize}/?roleName=${roleName}`,
  method: 'GET'
})
// 添加或修改角色
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
// 删除角色
export const reqRemoveRole = (roleId) => request({
  path: `/admin/acl/role/remove/${roleId}`,
  method: 'DELETE'
})
// 获取角色所有权限
export const reqAllPermission = (roleId) => request({
  path: `/admin/acl/permission/toAssign/${roleId}`,
  method: 'GET'
})
// 设置角色权限
export const reqSetPermission = (data) => request({
  path: '/admin/acl/permission/doAssignAcl',
  method: 'POST',
  data
})

// ---------------------------------菜单管理------------------------------
// 获取所有菜单
export const reqHasPermission = () => request({
  path: '/admin/acl/permission',
  method: 'GET'
})
// 添加或修改菜单
export const reqAddOrUpdateMenu = (data) => {
  if (data.id) {
    return request({
      path: '/admin/acl/permission/update',
      method: 'PUT',
      data
    })
  } else {
    return request({
      path: '/admin/acl/permission/save',
      method: 'POST',
      data
    })
  }
}
// 删除菜单
export const reqRemovePermission = (id) => request({
  path: `/admin/acl/permission/remove/${id}`,
  method: 'DELETE'
})
