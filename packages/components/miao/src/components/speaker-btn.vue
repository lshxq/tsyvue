<template>
  <div class="speaker-main" @click="toggleValue">
    <img :src="modelValue ? speakerOn : speakerOff" draggable="false"/>

  </div>
</template>

<script>

import speakerOn from '../assets/speaker-on.png'
import speakerOff from '../assets/speaker-off.png'

export default {
  props: {
    modelValue: Boolean
  },
  created() {
    this.speakerOn = speakerOn
    this.speakerOff = speakerOff
  },
  methods: {
    toggleValue() {
      this.$emit('update:modelValue', !this.modelValue)
    }
  }
}
</script>

<style scoped>
.speaker-main {
  cursor: pointer;
}
.speaker-main img {
  width: 100%;
  height: 100%;
}
</style>