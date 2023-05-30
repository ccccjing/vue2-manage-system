const state = {
  visitedTags: [],
  cachedTags: [], // 组件缓存
}

const mutations = {
  ADD_VISITED_TAGS: (state, tag) => {
    if(state.visitedTags.some(t => t.path === tag.path)) return
    state.visitedTags.push(
      Object.assign({}, tag, {
        title: tag.meta.title || 'no-name'
      })
    )
  },
  ADD_CACHED_TAGS: (state, tag) => {
    if(state.cachedTags.includes(tag.name)) return
    if(!tag.meta.noCached) {
      state.cachedTags.push(tag.name)
    }
  },
  DEL_VISITED_TAGS: (state, tag) => {
    for(const [i, t] of state.visitedTags.entries()) {
      if(tag.path === t.path) {
        state.visitedTags.splice(i, 1)
        break
      }
    }
  },
  DEL_CACHED_TAGS: (state, tag) => {
    const index = state.cachedTags.indexOf(tag.name)
    index > -1 && state.cachedTags.splice(index, 1)
  },
  DEL_OTHER_VISITED_TAGS: (state, tag) => {
    state.visitedTags = state.visitedTags.filter((t) => {
      return t.meta.affix || tag.path === t.path
    })
  },
  DEL_OTHER_CACHED_TAGS: (state, tag) => {
    const index = state.cachedTags.indexOf(tag.name)
    if(index > -1) {
      state.cachedTags = state.cachedTags.slice(index, index + 1)
    } else {
      state.cachedTags = []
    }
  },
  UPDATE_VISITED_TAG: (state, tag) => {
    for(let t of state.visitedTags) {
      if(t.path === tag.path) {
        t = Object.assign(t, tag)
        break
      }
    }
  },
  DEL_ALL_VISITED_TAGS: state => {
    const affixs = state.visitedTags.filter(tag => tag.meta.affix)
    state.visitedTags = affixs
  },
  DEL_ALL_CACHED_TAGS: state => {
    state.cachedTags = []
  }
}

const actions = {
  addTags({ dispatch }, tag) {
    dispatch('addVisitedTags', tag)
    dispatch('addCachedTags', tag)
  },
  addVisitedTags({ commit }, tag) {
    commit('ADD_VISITED_TAGS', tag)
  },
  addCachedTags({ commit }, tag) {
    commit('ADD_CACHED_TAGS', tag)
  },
  delTags({ dispatch, state }, tag) {
    return new Promise(resolve => {
      dispatch('delVisitedTags', tag)
      dispatch('delCachedTags', tag)
      resolve({
        visitedTags: [...state.visitedTags],
        cachedTags: [...state.cachedTags]
      })
    })
  },
  delVisitedTags({ commit, state }, tag) {
    return new Promise(resolve => {
      commit('DEL_VISITED_TAGS', tag)
      resolve([...state.visitedTags])
    })
  },
  delCachedTags({ commit, state }, tag) {
    return new Promise(resolve => {
      commit('DEL_CACHED_TAGS', tag)
      resolve([...state.cachedTags])
    })
  },
  delOtherTags({ dispatch, state }, tag) {
    return new Promise(resolve => {
      dispatch('delOtherVisitedTags', tag)
      dispatch('delOtherCachedTags', tag)
      resolve({
        visitedTags: [...state.visitedTags],
        cachedTags: [...state.cachedTags]
      })
    })
  },
  delOtherVisitedTags({ commit, state }, tag) {
    return new Promise(resolve=> {
      commit('DEL_OTHER_VISITED_TAGS', tag)
      resolve([...state.visitedTags])
    })
  },
  delOtherCachedTags({ commit, state }, tag) {
    return new Promise(resolve => {
      commit('DEL_OTHER_CACHED_TAGS', tag)
      resolve([...state.cachedTags])
    })
  },
  updateVisitedTag({ commit }, tag) {
    commit('UPDATE_VISITED_TAG', tag)
  },
  delAllTags({ dispatch, state }) {
    return new Promise(resolve => {
      dispatch('delAllVisitedTags')
      dispatch('delAllCachedTags')
      resolve({
        visitedTags: [...state.visitedTags],
        cachedTags: [...state.cachedTags]
      })
    })
  },
  delAllVisitedTags({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_VISITED_TAGS')
      resolve([...state.visitedTags])
    })
  },
  delAllCachedTags({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_CACHED_TAGS')
      resolve([...state.cachedTags])
    })
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions
}
