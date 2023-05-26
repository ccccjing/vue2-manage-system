<template>
  <div class="tags-view-container">
    <scroll-pane class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedTags"
        :key="tag.path"
        class="tags-view-item"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
      >
        {{ tag.title }}
        <span class="el-icon-close" v-if="!isAffix(tag)"></span>
      </router-link>
    </scroll-pane>
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
      affixTags: []
    }
  },
  computed: {
    ...mapGetters([
      'visitedTags',
      'routes'
    ])
  },
  methods: {
    isActive(tag) {
      return tag.path === this.$route.path
    },
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
    }
  },
  mounted() {
    this.initTags()
    console.log(this.visitedTags);
    console.log(path);
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