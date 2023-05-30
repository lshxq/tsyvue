<template>
  <div class="miao-main" v-resize="mainSize">
    <miao-ui v-if="windowSize" 
             :width="windowSize.width" 
             :height="windowSize.height" 
             :images="images"
             game-name="喵了个咪"/>
  </div>
</template>

<script>

import MiaoUi from './components/miao-ui.vue'
import img0 from './assets/0.png'
import img1 from './assets/1.png'
import img2 from './assets/2.png'
import img3 from './assets/3.png'
import img4 from './assets/4.png'
import img5 from './assets/5.png'
import img6 from './assets/6.png'
import img7 from './assets/7.png'
import img8 from './assets/8.png'
import img9 from './assets/9.png'
import img10 from './assets/10.png'

export default {
  name: 'SyMiao',
  components: {
    MiaoUi,
  },
  props: {
    images: {
      type: Array,
      default() {
        return [
          img0,
          img1,
          img2,
          img3,
          img4,
          img5,
          img6,
          img7,
          img8,
          img9,
          img10,
        ]
      }
    }
  },
  data() {
    return {
      windowSize: false
    }
  },
  methods: {
    mainSize(size) {
      const rate = 1.8

      this.windowSize = size.height / size.width > rate ? {
        width: size.width * devicePixelRatio,
        height: size.width * rate * devicePixelRatio
      } : size
    }
  }
}
</script>

<style scoped>
.miao-main {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>