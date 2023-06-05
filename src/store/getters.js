const getters = {
  aside: state => state.app.aside,
  visitedTags: state => state.tags.visitedTags,
  cachedTags: state => state.tags.cachedTags,
  routes: state => state.permission.routes,
  username: state => state.user.name,
  avatar: state => state.user.avatar,
  token: state => state.user.token,
  category1: state => state.category.category1,
  category2: state => state.category.category2,
  category3: state => state.category.category3,
  category3Id: state => state.category.category3Id,
  category2Id: state => state.category.category2Id,
  category1Id: state => state.category.category1Id
}

export default getters
