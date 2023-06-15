import ImgCropper from './src/img-cropper.vue'

ImgCropper.install = function(Vue) {
  Vue.component(ImgCropper.name, ImgCropper)
}

export default ImgCropper