const getters = {
  aside: state => state.app.aside,
  visitedTags: state => state.tags.visitedTags,
  cachedTags: state => state.tags.cachedTags,
  routes: state => state.permission.routes,
  username: state => state.user.name,
  avatar: state => state.user.avatar,
  token: state => state.user.token
}

export default getters
