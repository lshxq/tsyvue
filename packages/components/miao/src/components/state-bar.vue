<template>
  <div class="state-bar-main">
    <div class="time-remain">{{timeRemain}}</div>
    <div class="score">{{score}}</div>
  </div>
</template>

<script>
export default {
  props: {
    timeRemain: Number,
    score: Number
  }
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
.time-remain {
  color: white;
  font-size: calc(var(--card-width) * .7);
}
.time-remain:before {
  content: 'Time remain:';
  font-size: calc(var(--card-width) / 5);
  display: block;
}

.score {
  color: white;
  font-size: calc(var(--card-width) * .7);
}
.score:before {
  content: 'Score:';
  font-size: calc(var(--card-width) / 5);
  display: block;
}
</style>