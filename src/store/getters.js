const getters = {
  aside: state => state.app.aside,
  visitedTags: state => state.tags.visitedTags,
  cachedTags: state => state.tags.cachedTags,
  routes: state => state.permission.routes
}

export default getters
