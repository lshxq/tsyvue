<template>
<div class='sy-left-right-main' ref="mainRef">
  <div class='left' >
    <slot name='left'/>
  </div>
  <div class='right'>
    <slot name='right'/>
  </div>
</div>
</template>

<script>
export default {
  name: 'SyLeftRight',
  props: {
    width: String,
    leftWidth: String,
  },
  mounted() {
    const {
      width,
      leftWidth
    } = this
    if (width && width.match(/^\d+$/g)) {
      this.$refs.mainRef.style.setProperty('--width', `${width}px`)
    }
    if (leftWidth && leftWidth.match(/^\d+$/g)) {
      this.$refs.mainRef.style.setProperty('--left-width', `${leftWidth}px`)
    }
  }
}
</script>

<style scoped>
.sy-left-right-main {
  --width: 100%;
  --left-width: 50%;

  width: var(--width);
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}

.left {
  width: var(--left-width);
}
.right {
  width: calc(100% - var(--left-width));
}
</style>