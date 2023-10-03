<template>
    <div class="example-percentage-main">
        <div class="h1">Percentage</div>

        <sy-percentage v-model="modelValue" class="mb30"></sy-percentage>

        <m-viewer :markdown='content'/>

        <sy-percentage v-model="modelValue" size="400" tick-length="25" class="mb30" value-color="hsl(33, 100%, 66%)" value-border-color="white"></sy-percentage>

    </div>
</template>

<script>

const content = `
pug 模板
\`\`\` javascript
sy-percentage(v-model='value')
\`\`\`

|props|值|说明|
|-|-|-|
|model-value|Number |0 - 100间的数值|
|size|Number default 200| 表盘默认的大小，高宽都是这个值 |
|tick-length|Number default 15| tick的长度 |
|value-color|String default lightgray| label 的颜色|
|value-border-color|String default white| label边框的颜色|

`

export default {
  setup() {
    return {
      content,
    }
  },
  data() {
    return {
      modelValue: 2
    }
  },
  mounted() {
    this.timerId = setInterval(() => {
      this.modelValue = Math.floor(Math.random() * 100);
    }, 2000);
  },
  unmounted() {
    clearInterval(this.timerId);
  }
}


</script>

<style scoped>
.example-percentage-main {
  background-color: black;
}
</style>