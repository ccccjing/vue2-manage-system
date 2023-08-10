import { constantRoutes, asyncRoutes, anyRoutes } from "@/router"
import router from "@/router"
import cloneDeep from 'lodash/cloneDeep'

// 筛选出异步路由
function filterAsyncRoutes (asyncRoutes, routes) {
  return asyncRoutes.filter((item) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        return filterAsyncRoutes(item.children, routes)
      }
      return true
    }
  })
}

const state ={
  routes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = [...constantRoutes, ...routes, anyRoutes]
  }
}

const actions = {
  getRoutes({ commit }, routes) {
    // 筛选动态路由并深度克隆
    let accessRoutes = filterAsyncRoutes(cloneDeep(asyncRoutes), routes) || []
    commit('SET_ROUTES', accessRoutes);

    // anyRoutes路由要放在最后，否则会白屏/404
    [...accessRoutes, anyRoutes].forEach(route => {
      router.addRoute(route)
    })
    console.log(router.getRoutes())
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
