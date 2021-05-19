import Vue from 'vue'

let doMove = (el, binding) => {
  el.style.cursor = 'move'
  el.onmousedown = (e) => {
    // 算出鼠标相对元素的位置
    let initLeft = el.offsetLeft
    let initTop = el.offsetTop
    let movStartLeft = e.clientX
    let movStartTop = e.clientY
    document.onmousemove = (e) => {
      // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
      let left = e.clientX - movStartLeft
      let top = e.clientY - movStartTop
      let positionLeft = (initLeft + left) < 0 ? 0 : (initLeft + left)
      let positionTop = (initTop + top) < 0 ? 0 : (initTop + top)
      let maxLeft = document.body.clientWidth - el.offsetWidth
      let maxHeight = document.body.clientHeight - el.offsetHeight
      positionLeft = positionLeft > maxLeft ? maxLeft : positionLeft
      positionTop = positionTop > maxHeight ? maxHeight : positionTop
      el.style.left = positionLeft + 'px'
      el.style.top = positionTop + 'px'
      if (typeof binding.value === 'function') {
        binding.value({
          el: e,
          status: 'draging',
          left: positionLeft,
          top: positionTop
        })
      }
      // 当鼠标松开，且未触发onmouseup时
      if (!e.buttons) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
    document.onmouseup = (doc) => {
      document.onmousemove = null
      document.onmouseup = null
      if (typeof binding.value === 'function') {
        binding.value({
          el: e,
          status: 'dragend'
        })
      }
    }
  }
}

Vue.directive('drag', {
  bind: function (el, binding) {
    el.style.position = 'fixed'
    el.style.zIndex = 9999
    if (binding.value) {
      doMove(el, binding)
    }
  },
  update: function (el, binding) {
    // 聚焦元素
    if (binding.value) {
      doMove(el, binding)
    } else {
      el.style.cursor = 'default'
      el.onmousedown = null
    }
  }
})
