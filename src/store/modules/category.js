import { reqCategory1, reqCategory2, reqCategory3 } from "@/api/product"

const state = {
  category1: [],
  category1Id: null,
  category2: [],
  category2Id: null,
  category3: [],
  category3Id: null
}

const mutations = {
  GET_CATEGORY1: (state, category1) => {
    state.category1 = category1
  },
  GET_CATEGORY1_ID: (state, id) => {
    state.category1Id = id
  },
  GET_CATEGORY2: (state, category2) => {
    state.category2 = category2
  },
  GET_CATEGORY2_ID: (state, id) => {
    state.category2Id = id
  },
  GET_CATEGORY3: (state, category3) => {
    state.category3 = category3
  },
  GET_CATEGORY3_ID: (state, id) => {
    state.category3Id = id
  }
}

const actions = {
  async getCategory1({ commit }) {
    const result = await reqCategory1()
    if (result.code === 200) {
      commit('GET_CATEGORY1', result.data)
    } else {
      return new Promise(new Error(result.message))
    }
  },
  async getCategory2({ commit }, id) {
    const result = await reqCategory2(id)
    if(result.code === 200) {
      commit('GET_CATEGORY2', result.data)
    } else {
      return new Promise(new Error(result.message))
    }
  },
  async getCategory3({ commit }, id) {
    if (id) {
      const result = await reqCategory3(id)
      if (result.code === 200) {
        commit('GET_CATEGORY3', result.data)
      } else {
        return new Promise(new error(result.message))
      }
    }
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions
}