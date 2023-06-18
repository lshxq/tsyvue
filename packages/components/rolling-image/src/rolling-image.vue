<template>
  <div class="tsy-rolling-image-main">
    <div class="pics" ref="picsRef">
      <img v-for='(img, idx) of images' :src="img" :key="idx" draggable="false">
    </div>
  </div>
</template>

<script>

export default {
  name: 'SyRollingImage',
  props: {
    images: {
      type: Array,
      default() {
        const arr = []
        for (let idx=0; idx<18; idx++) {
          arr.push(`https://picsum.photos/200/300?${idx}`)
        }
        return arr
      }
    }
  },
  mounted() {
    const pics = this.$refs.picsRef;
    const images = pics.children;
    for (let idx=0; idx<images.length; idx++) {
      images[idx].style.transform = `rotateY(${360 / images.length * idx}deg) translateZ(${images.length * 50}px) `
    }
  }
}
</script>

<style scoped>
.tsy-rolling-image-main {
  --margin-top: 10%;
  --img-width: 300px;
  --img-height: 225px;
  height: calc(var(--img-height) * 3);
  width: 100%;
  display: flex;
  justify-content: center;
  perspective: 2500px;
  position: relative;
}
.pics {
  display: flex;
  width: var(--img-width);
  height: var(--img-height);
  transform-style: preserve-3d;
  margin-top: var(--margin-top);
  animation: action 60s linear infinite;
}
@keyframes  action{
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
}
.pics>img {
  width: var(--img-width);
  height: var(--img-height);
  position: absolute;
  -webkit-box-reflect: below 15px -webkit-linear-gradient(transparent 10%, rgba(255,255,255, .3));
  user-select: none;
}


</style>
