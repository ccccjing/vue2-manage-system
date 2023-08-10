import Vue from "vue";
import VueRouter from "vue-router";
import CommonLayout from "@/layout"

Vue.use(VueRouter)
// 静态路由
export const constantRoutes = [
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
    hidden: true,
    path: '/login',
    component: () => import('@/views/Login'),
    name: 'Login',
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
    path: '/screen',
    component: () => import('@/views/Screen'),
    name: 'Screen',
    meta: { title: '数据大屏', icon: 'el-icon-monitor'}
  },
  {
    hidden: true,
    path: '/404',
    component: () => import('@/views/404')
  },
  {
    hidden: true,
    path: '/401',
    component: () => import('@/views/401')
  },
  {
    path: '/system-manage',
    component: CommonLayout,
    redirect: '/system-manage/data-backup',
    name: 'SystemManage',
    meta: { title: '系统管理', icon: 'el-icon-setting' },
    children: [
      // {
      //   path: 'permission-manage',
      //   component: () => import('@/views/SystemManage/PermissionManage'),
      //   name: 'Acl',
      //   meta: { title: '权限管理' },
      //   children: [
      //     {
      //       path: 'user-management',
      //       component: () => import('@/views/SystemManage/AuthorityManagement/UserManagement'),
      //       name: 'User',
      //       meta: { title: '用户管理' }
      //     },
      //     {
      //       path: 'role-management',
      //       component: () => import('@/views/SystemManage/AuthorityManagement/RoleManagement'),
      //       name: 'Role',
      //       meta: { title: '角色管理' }
      //     },
      //     {
      //       path: 'menu-management',
      //       component: () => import('@/views/SystemManage/AuthorityManagement/MenuManagement'),
      //       name: 'Permission',
      //       meta: { title: '菜单管理' }
      //     }
      //   ]
      // },
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
]
// 异步路由
export const asyncRoutes = [
  {
    path: '/permission-manage',
    component: CommonLayout,
    redirect: '/permission-manage/user-management',
    name: 'Acl',
    meta: { title: '权限管理', icon: 'el-icon-s-custom' },
    children: [
      {
        path: 'user-management',
        component: () => import('@/views/AuthorityManagement/UserManagement.vue'),
        name: 'User',
        meta: { title: '用户管理' }
      },
      {
        path: 'role-management',
        component: () => import('@/views/AuthorityManagement/RoleManagement'),
        name: 'Role',
        meta: { title: '角色管理' }
      },
      {
        path: 'menu-management',
        component: () => import('@/views/AuthorityManagement/MenuManagement'),
        name: 'Permission',
        meta: { title: '菜单管理' }
      }
    ]
  },
  {
    path: '/product-manage',
    component: CommonLayout,
    name: 'Product',
    redirect: '/product-manage/product-type',
    meta: { title: '产品管理', icon: 'el-icon-medal'},
    children: [
      {
        path: 'product-type',
        component: () => import('@/views/PeoductManage/ProductType.vue'),
        name: 'Trademark',
        meta: { title: '产品类型' }
      },
      {
        path: 'product-attr',
        component: () => import('@/views/PeoductManage/ProductAttr'),
        name: 'Attr',
        meta: { title: '产品属性' }
      },
      {
        path: 'product-spu',
        component: () => import('@/views/PeoductManage/ProductSPU'),
        name: 'Spu',
        meta: { title: 'SPU管理' }
      },
      {
        path: 'product-sku',
        component: () => import('@/views/PeoductManage/ProductSKU'),
        name: 'Sku',
        meta: { title: 'SKU管理' }
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
// 其它路由
export const anyRoutes = {
  hidden: true,
  path: '/:pathMatch(.*)*',
  redirect: '/404'
}

// 防止多次点击路由报错
let routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err);
}

export default new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

