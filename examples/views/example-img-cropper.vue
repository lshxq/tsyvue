<template>
  <div class="example-image-cropper-main">
    <div>
      <h1>sy-img-cropper</h1>
      图像剪切，通过img属性传入要裁剪的图片，通过getImageData方法获得剪切后的图片的额base64, 窗口大小跟随父节点
    </div>
    <div class="cropper-wrapper">
      <sy-img-cropper ref="cropper" :img="require('../assets/beach.jpg')"/>
    </div>
    
    <button @click="getImageData">获得图像</button>
    <img :src="output" class="output"/>
  </div>

</template>

<script>
export default {
  data() {
    return {
      output: ''
    }
  },
  methods: {
    getImageData() {
      this.output = this.$refs.cropper.getImageData()
    }
  }
}
</script>

<style scoped>
.cropper-wrapper {
  width: 1000px;
  height: 700px;
  border: 1px solid gray;
}

.output {
  border: 1px solid red;
}
</style>