<template>
  <div class="example-image-cropper-main">
    <div>
      <h1>sy-img-cropper</h1>
      <p>图像剪切，通过img属性传入要裁剪的图片，通过getImageData方法获得剪切后的图片的额base64, 窗口大小跟随父节点, 通过windowSize{width: 200, height: 150}指定 要得到的 图片的大小</p>
      <p>&lt;sy-img-cropper ref="cropper" :img="input"/&gt;</p>
      <p>通过this.$refs.cropper.getImageData()获得剪切后的图片</p>
    </div>
    <button @click="pickfile">选择图片</button>
    <div class="cropper-wrapper">
      <sy-img-cropper ref="cropper" :img="input"/>
    </div>
    
    <button @click="getImageData">获得图像</button>
    <img :src="output" class="output"/>
  </div>

</template>

<script>
export default {
  data() {
    return {
      output: '',
      input: require('../assets/beach.jpg')
    }
  },
  methods: {
    getImageData() {
      this.output = this.$refs.cropper.getImageData()
    },
    pickfile() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.input = reader.result;
        };
      };
      input.click();
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