<template>
  <div class="example-directives-main" v-resize="resized">
    <m-viewer :markdown="content"/>

    <div class="v-drag-container" v-loading="loading">
      <div class="v-drag-item" v-drag>拽我</div>
      <sy-water-drop  :zoom="1" v-drag/>
    </div>

    {{size}}
  </div>
</template>

<script>
export default {
  created() {
    this.content = `# 指令集
### v-loading
接受true和false作为参数，在指定element中生成一个mask，用来显示数据加载过程。

### v-drag
在一个绝对定位的dom节点上加上 v-drag 指令，使其可以自由拖动, data-drag-range-h 和 data-drag-range-v 可以限定拖动范围， 接受的值 如 0,200

### v-resize
一个事件，注册一个回电函数，获得变化后的size
`
  },

  data() {
    return {
      size: {},
      loading: true
    }
  },
  mounted() {
    const that = this
    setTimeout(() => {
      that.loading = false
    }, 3000) 
  },
  methods: {
    resized(data) {
      this.size = data
    }
  }
}
</script>

<style>
.example-directives-main {
  height: 100%;
  overflow: auto;
}

.v-drag-container {
  height: 500px;
  background: linear-gradient(45deg, rgb(133, 223, 156), rgb(144, 118, 164), rgb(196, 129, 183));
  position: relative;
  overflow: auto;
}

.v-drag-item {
  display: inline-block;
  width: 100px;
  height: 100px;
  background: #333333;
  cursor: move;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 10px 10px 10px gray;
  left: 300px;
  top: 100px;
}
</style>