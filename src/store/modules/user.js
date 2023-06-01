import { getToken, setToken, removeToken } from "@/utils/auth"
import { reqLogin } from "@/api/user"

const state = {
  token: getToken()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  async userLogin({ commit }, data) {
    let result = await reqLogin(data)

    if(result.code === 200) {
      commit('SET_TOKEN', result.data.token)
      setToken(result.data.token)
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
