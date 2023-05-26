<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.hasOneShowingChild) &&
        !item.alwaysShow
      "
    >
      <el-menu-item
        :index="resolvePath(onlyOneChild.path)"
        :class="{ 'submenu-title-noDropdown': !isNest }"
      >
        <i :class="onlyOneChild.meta.icon"></i>
        <span slot="title">{{ onlyOneChild.meta.title }}</span>
      </el-menu-item>
    </template>
    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title">
        <i :class="item.meta.icon"></i>
        <span slot="title" v-if="!aside.isCollapse">{{ item.meta.title }}</span>
      </template>
      <aside-item
        v-for="child in item.children"
        :key="child.path"
        :isNest="true"
        :item="child"
        :basePath="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path-browserify'
import { mapGetters } from 'vuex'

export default {
  name: 'AsideItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null,
    }
  },
  computed: {
    ...mapGetters([
      'aside'
    ])
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if(item.hidden) {
          return false
        } else {
          this.onlyOneChild = item
          return true
        }
      })

      if(showingChildren.length === 1) {
        return true
      }

      if(showingChildren.length === 0) {
        this.onlyOneChild = {
          ...parent, path: '',
          noShowingChildren: true
        }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if(this.basePath === '/') {
        return '/' + routePath
      }
      if(this.basePath.includes(routePath)) {
        return this.basePath
      }
      if(this.basePath) {
        // console.log(this.basePath + "/" + routePath)
        return path.resolve(this.basePath, routePath)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>