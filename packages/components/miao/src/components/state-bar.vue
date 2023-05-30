<template>
  <div class="state-bar-main">
    <div class="state-item">
      <div class="label">{{t('state.timeRemain')}}</div>
      <div class="time-remain">{{timeRemain}}</div>
    </div>
    
    <div class="state-item">
      <div class="label">{{t('state.score')}}</div>
      <div class="time-remain">{{score}}</div>
    </div>
  </div>
</template>

<script>
import LangMixin from '../mixins/lang-mixin.js'


export default {
  props: {
    timeRemain: Number,
    score: Number
  },
  mixins: [LangMixin]
}
</script>


<style scoped>

.state-bar-main {
  padding: calc(var(--main-height) / 100);
  position: absolute;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  top: 0;
  left: 0;
  width: var(--main-width);
  height: var(--card-height);
  box-sizing: border-box;
}
.state-item>.label {
  font-size: calc(var(--card-width) / 5);
  display: block;
  color: white;
}
.time-remain {
  color: white;
  font-size: calc(var(--card-width) * .7);
}



.score {
  color: white;
  font-size: calc(var(--card-width) * .7);
}
</style>