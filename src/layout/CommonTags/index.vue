<template>
  <div class="tags-view-container">
    <scroll-pane class="tags-view-wrapper" ref="scrollPane">
      <router-link
        v-for="tag in visitedTags"
        ref="tag"
        :key="tag.path"
        class="tags-view-item"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span
          class="el-icon-close"
          v-if="!isAffix(tag)"
          @click.prevent.stop="closeSelectedTag(tag)"
        ></span>
      </router-link>
    </scroll-pane>
    <ul
      :style="{left:left+'px',top:top+'px'}"
      class="contextmenu"
      v-show="visible"
    >
      <li @click="refreshSelectedTag(selectedTag)">刷新页面</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">关闭当前页面</li>
      <li @click="closeOtherTags">关闭其他页面</li>
      <li @click="closeAllTags(selectedTag)">关闭所有页面</li>
    </ul>
  </div>
</template>

<script>
import path from 'path-browserify'
import { mapGetters } from 'vuex'
import ScrollPane from './ScrollPane.vue'

export default {
  name: 'CommonTags',
  components: { ScrollPane },
  data() {
    return {
      affixTags: [],
      top: 0,
      left: 0,
      visible: false,
      selectedTag: {}
    }
  },
  computed: {
    ...mapGetters([
      'visitedTags',
      'routes'
    ])
  },
  watch: {
    $route() {
      this.addTags()
    },
    visible(value) {
      if(value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  methods: {
    // 判断是否是当前页路由
    isActive(tag) {
      return tag.path === this.$route.path
    },
    // 判断是否是固定页
    isAffix(tag) {
      return tag.meta && tag.meta.affix
    },
    // 筛选出固定标签页
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if(route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            path: tagPath,
            fullPath: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if(route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if(tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    // 初始化标签
    initTags() {
      const affixTags = this.affixTags = this.filterAffixTags(this.routes)
      for(const tag of affixTags) {
        if(tag.name) {
          this.$store.dispatch('addVisitedTags', tag)
        }
      }
    },
    addTags() {
      const { name } = this.$route
      if(name) {
        this.$store.dispatch('addTags', this.$route)
      }
      return false
    },
    closeSelectedTag(tag) {
      this.$store.dispatch('delTags', tag).then(({ visitedTags }) => {
        if(this.isActive(tag)) {
          this.toLastTag(visitedTags, tag)
        }
      })
    },
    refreshSelectedTag(tag) {
      this.$store.dispatch('delCachedTags', tag).then(() => {
        const { fullPath } = tag
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    },
    closeOtherTags() {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('delOtherTags', this.selectedTag).then(() => {
        // this.moveToCurrentTag()
      })
    },
    // moveToCurrentTag() {
    //   const tags = this.$refs.tag
    //   this.$nextTick(() => {
    //     for(let tag of tags) {
    //       if(tag.to.path === this.$route.path) {
    //         this.$refs.scrollPane.moveToTarget(tag)
    //         if(tag.to.fullPath !== this.$route.fullPath) {
    //           this.$store.dispatch('updateVisitedTag', this.$route)
    //         }
    //         break
    //       }
    //     }
    //   })
    // },
    closeAllTags(tag) {
      this.$store.dispatch('delAllTags').then(({ visitedTags }) => {
        if(this.affixTags.some(t => t.path === tag.path)) return
        this.toLastTag(visitedTags, tag)
      })
    },
    toLastTag(visitedTags, tag) { 
      const lastTag = visitedTags.slice(-1)[0]
      if(lastTag) {
        this.$router.push(lastTag.fullPath)
      } else {
        if (tag.name === 'Dashboard') {
          // to reload home page
          this.$router.replace({ path: '/redirect' + tag.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    openMenu(tag, e) {
      const offsetLeft = this.$el.getBoundingClientRect().left
      const offsetWidth = this.$el.offsetWidth
      const maxLeft = offsetWidth - 105
      const left = e.clientX - offsetLeft + 115

      if(left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY + 20
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
    console.log(this.visitedTags);
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 2px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #007AFF;
        color: #fff;
        border-color: #007AFF;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}

.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>