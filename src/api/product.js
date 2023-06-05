import request from "@/utils/request"
// --------------------------------------------产品类型
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
// -------------------------------------------产品属性
// 获取一级分类
export function reqCategory1() {
  return request({
    path: '/admin/product/getCategory1',
    method: 'get'
  })
}
// 获取二级分类
export function reqCategory2(category1Id) {
  return request({
    path:`/admin/product/getCategory2/${category1Id}`,
    method: 'get',
  })
}
// 获取三级分类
export function reqCategory3(category2Id) {
  return request({
    path: `/admin/product/getCategory3/${category2Id}`,
    method: 'get'
  })
}
// 获取属性列表
export function reqAttrInfoList(category1Id, category2Id, category3Id) {
  return request({
    path: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get'
  })
}
// 添加或修改属性
export function reqAddOrUpdateAttr(data) {
  return request({
    path: '/admin/product/saveAttrInfo',
    method: 'post',
    data
  })
}
// 删除属性
export function reqDeleteAttr(attrId) {
  return request({
    path: `/admin/product/deleteAttr/${attrId}`,
    method: 'delete'
  })
}
