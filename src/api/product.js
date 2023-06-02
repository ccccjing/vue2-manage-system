import request from "@/utils/request"

export function reqProduct(currentPage, pageSize) {
  return request({
    path:`/admin/product/baseTrademark/${currentPage}/${pageSize}`,
    method: 'get'
  })
}

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
