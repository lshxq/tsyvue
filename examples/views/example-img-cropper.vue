<template>
 
  <div class="example-image-cropper-main">
    <m-viewer :markdown="content"/>

    <button @click="pickfile" class="mb20">选择图片</button>
    <div class="cropper-wrapper">
      <sy-img-cropper ref="cropper" :img="input"/>
    </div>
    
    <button @click="getImageData" class="mt20">获得图像</button>
    <img :src="output" class="output"/>
  </div>

</template>

<script>
export default {
  data() {
    this.content = `
\`\`\` html
<div class="cropper-wrapper">
  <sy-img-cropper ref="cropper" :img="input"/>
</div>
\`\`\`

图像剪切，通过img属性传入要裁剪的图片，通过getImageData方法获得剪切后的图片的base64, 窗口大小跟随父节点。
\`\`\` javascript
this.$refs.cropper.getImageData() // 获得剪切后的图片
\`\`\`

Props
|参数名|值|说明|
|-|-|-|
|img|String|被截切的图片，可以访问到的url或者是图片的base64|
|window-size|Object default {width: 200, height: 150}|裁切窗口的尺寸，就是剪切后得到图片的大小，有width和height两个属性，都是Number类型，单位是px|
|panel-size|Object|裁切面板的大小，可以不指定，不指定时，panel默认填充父节点|
`

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