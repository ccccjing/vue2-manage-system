const state = {
  aside: {
    isCollapse: false
  }
}

const mutations = {
  TOGGLE_ASIDE: state => {
    state.aside.isCollapse = !state.aside.isCollapse
  }
}

const actions = {
  toggleAside({ commit }) {
    commit('TOGGLE_ASIDE')
  }
}

export default {
  namespance: true,
  state,
  mutations,
  actions
}
