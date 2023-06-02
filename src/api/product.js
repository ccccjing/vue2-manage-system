import request from "@/utils/request"

export function reqProduct(currentPage, pageSize) {
  return request({
    path:`/admin/product/baseTrademark/${currentPage}/${pageSize}`,
    method: 'get'
  })
}
