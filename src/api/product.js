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
// -------------------------------------------SPU
// 获取已有spu品牌列表
export function reqHasSpu(currentPage, pageSize, category3Id) {
  return request({
    path: `/admin/product/${currentPage}/${pageSize}?category3Id=${category3Id}`,
    method: 'get'
  })
}
// 获取spu品牌列表
export function reqTrademarkList() {
  return request({
    path: '/admin/product/baseTrademark/getTrademarkList',
    method: 'get'
  })
}
// 获取品牌图片
export function reqSpuImageList(spuId) {
  return request({
    path: `/admin/product/spuImageList/${spuId}`,
    method: 'get'
  })
}
// 获取品牌属性
export function reqBaseSaleAttrList() {
  return request({
    path: '/admin/product/baseSaleAttrList',
    method: 'get'
  })
}
// 获取品牌已有属性
export function reqSpuSaleAttrList(spuId) {
  return request({
    path: `/admin/product/spuSaleAttrList/${spuId}`,
    method: 'get'
  })
}
// 添加或修改品牌
export function reqAddOrUpdateSpu(data) {
  if (data.id) {
    return request({
      path: '/admin/product/updateSpuInfo',
      method: 'post',
      data
    })
  } else {
    return request({
      path: '/admin/product/saveSpuInfo',
      method: 'post',
      data
    })
  }
}
// 新增SKU
export function reqAddSku(data) {
  return request({
    path: '/admin/product/saveSkuInfo',
    method: 'post',
    data
  })
}
// 获取sku列表
export function reqSkuList(spuId) {
  return request({
    path: `/admin/product/findBySpuId/${spuId}`,
    method: 'get'
  })
}
// 
export function reqRemoveSpu(spuId) {
  return request({
    path: `/admin/product/deleteSpu/${spuId}`,
    method: 'delete'
  })
}
// 获取SKU接口
export function reqSkuArr(page, limit) {
  return request({
    path: `/admin/product/list/${page}/${limit}`,
    method: 'get'
  })
}
// sku上架
export function reqOnSale(skuId) {
  return request({
    path: `/admin/product/onSale/${skuId}`,
    method: 'get'
  })
}
// sku下架
export function reqCancelSale(skuId) {
  return request({
    path: `/admin/product/cancelSale/${skuId}`,
    method: 'get'
  })
}
// sku商品详情
export function reqSkuInfo(skuId) {
  return request({
    path: `/admin/product/getSkuInfo/${skuId}`,
    method: 'get'
  })
}
// 
export function reqDeleteSku(skuId) {
  return request({
    path: `/admin/product/deleteSku/${skuId}`,
    method: 'delete'
  })
}
