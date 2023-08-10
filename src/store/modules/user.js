import router from "@/router"
import { getToken, setToken, removeToken } from "@/utils/auth"
import { reqLogin, getUserInfo, reqLogout } from "@/api/user"

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  roles: [],
  introduce: '',
  routes: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_INTRODUCE: (state, introduce) => {
    state.introduce = introduce
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  async userLogin({ commit }, data) {
    let result = await reqLogin(data)

    if (result.code === 200) {
      commit('SET_TOKEN', result.data)
      setToken(result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error(result.data))
    }
  },
  async userInfo({ commit }) {
    let result = await getUserInfo()
    if (result.code === 200) {
      const { name, avatar, roles, introduce, routes } = result.data

      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      commit('SET_ROLES', roles)
      commit('SET_INTRODUCE', introduce)
      // 返回数据
      return Promise.resolve(routes)
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  async userLogout({ commit }) {
    let result = await reqLogout()
    if (result.code === 200) {
      commit('SET_NAME', '')
      commit('SET_AVATAR', '')
      commit('SET_INTRODUCE', '')
      commit('SET_ROLES', [])
      removeToken()
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions
}
