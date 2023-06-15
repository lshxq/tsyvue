<template>
  <div class="sy-img-cropper-wrapper" v-resize="updateSize">
    <img-cropper-core
      ref="coreRef"
      v-if="panelSizeInner"
      v-bind="$attrs"
      :panel-size="panelSizeInner"
    />
  </div>
</template>

<script>
import ImgCropperCore from "./img-cropper-core.vue";

export default {
  name: "SyImgCropper",
  props: {
    panelSize: Object,
  },
  components: {
    ImgCropperCore,
  },
  data() {
    return {
      panelSizeInner: this.panelSize,
    };
  },
  methods: {
    updateSize(size) {
      this.panelSizeInner = size;
    },
    getImageData() {
      return this.$refs.coreRef.getImageData()
    }
  },
};
</script>

<style scoped>
.sy-img-cropper-wrapper {
  --height: 100%;
  --width: 100%;
  height: var(--height);
  width: var(--width);
  position: relative;
  user-select: none;
  overflow: hidden;
}
</style>