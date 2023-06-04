import request from "@/utils/request"
// 获取产品列表请求
export function reqProduct(currentPage, pageSize) {
  return request({
    path:`/admin/product/baseTrademark/${currentPage}/${pageSize}`,
    method: 'get'
  })
}
// 添加，修改产品请求
export function reqAddOrUpdateProduct(data) {
  console.log(data)
  if(!data.id) {
    return request({
      path: '/admin/product/baseTrademark/save',
      method: 'post',
      data
    })
  } else {
    return request({
      path: '/admin/product/baseTrademark/update',
      method: 'put',
      data
    })
  }
}
// 删除产品请求
export function reqDelProduct(id) {
  return request({
    path: `/admin/product/baseTrademark/remove/${id}`,
    method: 'delete'
  })
}

export function reqCategory1() {
  return request({
    path: '/admin/product/getCategory1',
    method: 'get'
  })
}

export function reqCategory2(category1Id) {
  return request({
    path:`/admin/product/getCategory2/${category1Id}`,
    method: 'get',
  })
}

export function reqCategory3(category2Id) {
  return request({
    path: `/admin/product/getCategory3/${category2Id}`,
    method: 'get'
  })
}
