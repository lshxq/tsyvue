<template>
  <div class="sy-img-cropper-main" ref="mainRef" @scroll="scrollScale($event)" style="mainPanelStyleComp">
    <img :src="img" :style="imgStyleComp" ref='imgRef' @load="imgLoaded()" draggable="false"/>
    <div class="window" v-drag :style="windowStyleComp"  :data-drag-range-h="dragRangeH" :data-drag-range-v="dragRangeV" @dragged="updateWindowPos"></div>
    <canvas ref="canvasRef" class="canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: 'SyImgCropperCore',
  props: {
    img: String,
    panelSize: Object,
    windowSize: {
      type: Object,
      default() {
        return {
          width: 200,
          height: 150
        }
      }
    }
  },
  data() {
    return {
      scale: 1,
      imgSize: false,
      windowPos: {
        left: 100,
        top: 100
      }
    }
  },
  computed: {
    mainPanelStyleComp() {
      const {
        panelSize
      } = this
      return {
        width: `${panelSize.width}px`,
        height: `${panelSize.height}px`
      }
    },
    minScale() {
      const {
        imgSize,
        windowSize
      } = this
      if (imgSize) {
        const {
          width,
          height
        } = imgSize
        const scaleW = windowSize.width / width
        const scaleH = windowSize.height / height
        return Math.max(scaleW, scaleH)
      }
      return 0.01
    },
    dragRangeH() {
      const {
        panelSize, 
        windowSize
      } = this
      return `0,${panelSize.width - windowSize.width}`
    },
    dragRangeV() {
      const {
        panelSize, 
        windowSize
      } = this
      return `0,${panelSize.height - windowSize.height}`
    },
    imgStyleComp() {
      return {
        transform: `scale(${this.scale})`
      }
    },
    windowStyleComp() {
      return {
        width: `${this.windowSize.width}px`,
        height: `${this.windowSize.height}px`,
        left: `${this.windowPos.left}px`,
        top: `${this.windowPos.top}px`
      }
    }
  },
  mounted() {
    const {
      windowSize,
      panelSize
    } = this
    const mainPanel = this.$refs.mainRef


    this.windowPos = {
      top: (panelSize.height - windowSize.height) / 2,
      left: (panelSize.width - windowSize.width) / 2,
    }
    
    // mainPanel.style.setProperty('--height', `${panelSize.height}px`)
    // mainPanel.style.setProperty('--width', `${panelSize.width}px`)

    mainPanel.addEventListener('wheel', this.scrollScale)
  },

  beforeUnmount() {
    this.$refs.mainRef.removeEventListener('wheel', this.scrollScale)
  },

  methods: {

    getImageData() {
      const {
        windowSize,
        windowPos,
        panelSize,
        imgSize,
      } = this
      const canvas = this.$refs.canvasRef;
      const ctx = canvas.getContext('2d');
      canvas.width = imgSize.width * this.scale;
      canvas.height = imgSize.height * this.scale;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(this.$refs.imgRef, 0, 0, canvas.width, canvas.height);

      const offsetX = (panelSize.width - canvas.width) / 2
      const offsetY = (panelSize.height - canvas.height) / 2
      const x = windowPos.left - offsetX
      const y = windowPos.top  - offsetY
      const imgData = ctx.getImageData(x, y, windowSize.width, windowSize.height)
      
      canvas.width = windowSize.width
      canvas.height = windowSize.height
      ctx.putImageData(imgData, 0, 0)
      return canvas.toDataURL('image/png')
    },
    updateWindowPos({target}) {
      this.windowPos = {
        left: target.offsetLeft,
        top: target.offsetTop
      }
    },
    scrollScale(evt) {
      const direction =  Math.sign(evt.deltaY) * 0.05
      this.scale += direction
      if (this.scale < this.minScale) {
        this.scale = this.minScale
      }
    },
    imgStyle() {
      return {}
    },
    imgLoaded() {
      console.log(this.$refs.imgRef.width, )
      this.imgSize = {
        height: this.$refs.imgRef.height,
        width: this.$refs.imgRef.width
      }
      const rateWidth = this.panelSize.width / this.imgSize.width
      const rateHeight = this.panelSize.height / this.imgSize.height
      this.scale = Math.min(rateWidth, rateHeight)
    }
  }
}
</script>

<style scoped>
.sy-img-cropper-main {
  --height: 100%;
  --width: 100%;
  height: var(--height);
  width: var(--width);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  user-select: none;
  overflow: hidden;
}


.window {
  background: transparent;
  position: absolute;
  outline: rgba(0, 0, 0, 0.5) 1500px solid;
}

.canvas {
  position: absolute;
  top: 100%;
  border: 1px solid red;
}
</style>