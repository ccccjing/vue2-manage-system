import Vue from "vue"
import store from "@/store"

Vue.directive('isTrue', {
  bind: function(el, binding, vnode) {
    if (!store.state.user.buttons.includes(binding.value)) {
      el.style.backgroundColor = '#a0cfff'
      el.style.borderColor = '#a0cfff'
      el.disabled = true
    }
  }
})