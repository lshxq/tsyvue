<template>
<div class="tsy-split-screen-vertical-example-main  pb30">
  <m-viewer :markdown="content"/>

  <div class="h1">纵向分屏 sy-split-screen-vertical</div>
  <div class="example-panel">
    <sy-split-screen-vertical :left="200">
      <template v-slot:left>left</template>
      <template v-slot:right>right</template>
    </sy-split-screen-vertical>
  </div>
</div>
</template>

<script>
import commentMixin from '../mixins/comment-mixins.js'

export default {
  mixins: [commentMixin],
  created() {
    this.content = `# 纵向分屏 sy-split-screen-vertical
\`\`\` html
<sy-split-screen-vertical :left="200">
  <template v-slot:left>left</template>
  <template v-slot:right>right</template>
</sy-split-screen-vertical>
\`\`\`

Props
|参数名|值|说明|
|-|-|-|
|left|Number default 320|左侧的初始宽度，默认值320px|


Slots
|插槽名字|说明|
|-|-|
|left|左侧|
|right|右侧|
`


    this.propTableData = [
      {
        name: 'left',
        type: 'Number',
        comment: '左侧的初始宽度，默认值320px'
      }
    ]
  }
}
</script>

<style lang="css" scoped>
.tsy-split-screen-vertical-example-main {
  height: 100%;
}

.tsy-split-screen-vertical-example-main .example-panel {
  display: block;
  height: 400px;
  width: 800px;
  border: 1px solid gray;
}

</style>