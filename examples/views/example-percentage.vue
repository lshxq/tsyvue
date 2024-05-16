<template>
 
    <div class="example-percentage-main">
        <div class="h1">Percentage</div>

        

        <div class="mb100">
          <input type="range" id="volume" name="volume" min="0" max="100" v-model="modelValue" />
        </div>
        

        <sy-percentage v-model="modelValue" class="mb30"></sy-percentage>

        <m-viewer :markdown='content'/>

        <sy-percentage v-model="modelValue" size="400" tick-length="25" tick-width="5" class="mb30" value-color="hsl(33, 100%, 66%)" value-border-color="white"></sy-percentage>

    </div>
</template>

<script setup>

import { ref } from 'vue'

const modelValue = ref(50);

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
|tick-width|Number default 2| tick的宽度 |
|value-color|String default lightgray| label 的颜色|
|value-border-color|String default white| label边框的颜色|

`

</script>

<style scoped>
.example-percentage-main {
  background-color: black;
}

#volume {
  width: 300px;
}
</style>