const state = {
  visitedTags: [],
  cachedTages: []
}

const mutations = {
  ADD_VISITED_TAGS: (state, tag) => {
    if(state.visitedTags.some(t => t.path === tag.path)) return
    state.visitedTags.push(
      Object.assign({}, tag, {
        title: tag.meta.title || 'no-name'
      })
    )
  }
}

const actions = {
  addTags({ dispatch }, view) {
    dispatch('addVisitedTags', view)
  },
  addVisitedTags({ commit }, tag) {
    commit('ADD_VISITED_TAGS', tag)
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions
}
