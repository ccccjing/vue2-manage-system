import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import { getToken } from './auth'
import store from '@/store'

NProgress.configure({ showSpinner: false })
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  document.title = `管理系统-${to.meta.title || '欢迎使用'}`
  NProgress.start()

  let token = getToken()
  let username = store.getters.username
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (username) {
        next()
      } else {
        try {
          const routes = await store.dispatch('userInfo')
          await store.dispatch('permission/getRoutes', routes)
          // 防止刷新页面白屏
          next({ ...to })
        } catch (error) {
          await store.dispatch('userLogout')
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})
// 全局后置守卫
router.afterEach(() => {
  NProgress.done()
})
