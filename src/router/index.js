import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "@/views/HomePage.vue"
import CommonLayout from "@/layout"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: CommonLayout,
    children: [
      {
        path: '/homepage',
        component: HomePage
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
