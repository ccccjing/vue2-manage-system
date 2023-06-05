import Vue from "vue";
import VueRouter from "vue-router";
import CommonLayout from "@/layout"

Vue.use(VueRouter)

export const routes = [
  {
    hidden: true,
    path: '/redirect',
    component: CommonLayout,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/RedirectPage/RedirectPage.vue')
      }
    ]
  },
  {
    path: '/',
    component: CommonLayout,
    redirect: '/home-page',
    children: [
      {
        path: 'home-page',
        component: () => import('@/views/HomePage.vue'),
        name: 'HomePage',
        meta: { title: '首页', icon: 'el-icon-s-home', affix: 'true' }
      }
    ]
  },
  {
    hidden: true,
    path: '/login',
    component: () => import('@/views/Login'),
    name: 'Login',
  },
  {
    path: '/system-manage',
    component: CommonLayout,
    redirect: '/system-manage/permission-manage',
    meta: { title: '系统管理', icon: 'el-icon-setting' },
    children: [
      {
        path: 'permission-manage',
        component: () => import('@/views/SystemManage/PermissionManage'),
        name: 'PermissionManage',
        meta: { title: '权限管理'}
      },
      {
        path: 'data-backup',
        component: () => import('@/views/SystemManage/DataBackup'),
        name: 'DataBackup',
        meta: { title: '数据备份' }
      },
      {
        path: 'file-manage',
        component: () => import('@/views/SystemManage/FileManage'),
        name: 'FileManage',
        meta: { title: '文件管理' }
      }
    ]
  },
  {
    path: '/product-manage',
    component: CommonLayout,
    redirect: '/product-manage/product-type',
    meta: { title: '产品管理', icon: 'el-icon-medal'},
    children: [
      {
        path: 'product-type',
        component: () => import('@/views/PeoductManage/ProductType.vue'),
        name: 'ProductType',
        meta: { title: '产品类型' }
      },
      {
        path: 'product-attr',
        component: () => import('@/views/PeoductManage/ProductAttr'),
        name: 'ProductAttr',
        meta: { title: '产品属性' }
      },
      {
        path: 'product-spu',
        component: () => import('@/views/PeoductManage/ProductSPU'),
        name: 'ProductSPU',
        meta: { title: 'SPU' }
      },
      {
        path: 'product-audit',
        component: () => import('@/views/PeoductManage/ProductAudit.vue'),
        name: 'ProductAudit',
        meta: { title: '产品审核' }
      }
    ]
  }
]

// 防止多次点击路由报错
let routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err);
}

export default new VueRouter({
  routes
})

