<template>
<div class="tsy-preview-example">
  
  <div>
    <m-viewer :markdown="c1"/>
    <div>
      <sy-preview ref="previewRef" :images="images"></sy-preview>
      <img class="image" v-for="(url, idx) of images" :src="url" @click="$refs.previewRef.show(idx)" :key='idx'/>
    </div>

    <m-viewer :markdown="c2" class="mt100"/>
    <div>
      <sy-preview ref="preview2Ref" :images="[images[0]]"></sy-preview>
      <div class='button mt30' @click="$refs.preview2Ref.show()">显示预览</div>
    </div>
    
  </div>

  <div class="mt100">
    <div class="h2">Props</div>
    <sy-table :columns="propTableColumns" :data="propTableData">
      <template v-slot:comment="scope">{{scope.row.comment}}</template>
    </sy-table>
  </div>
</div>
</template>

<script>
import commentMixins from "../mixins/comment-mixins.js";

export default {
  mixins: [commentMixins],
  created() {
    this.c1 = `# 图片预览 sy-preview
用于预览图片，通过images传入需要预览的图片，在需要显示预览的时候，调用组件的show(idx)来显示对应的图片。
这个组件一上来是什么也不显示的，需要通过调用show函数，让其显示出来。
\`\`\` html
<sy-preview ref="previewRef" :images="images"></sy-preview>
<img class="image" v-for="(url, idx) of images" :src="url" @click="$refs.previewRef.show(idx)" :key='idx'/>
\`\`\`
img展示了每一个图片，并且给图片注册了点击事件，点击图片，显示images数组中的第N张图片
img通常应该是缩略图，这里没有设定 图片尺寸，默认展示了完整大小

`

    this.c2 = `这里只展示了一个 button 用来激活 预览，点击按钮，显示预览组件，由于数组只有一个图片，预览组件也只能展示一个图片
\`\`\` html
<sy-preview ref="preview2Ref" :images="[images[0]]"></sy-preview>
<div class='button' @click="$refs.preview2Ref.show()">显示预览</div>
\`\`\``
    this.propTableData = [
      {
        name: "images",
        type: "Array<URL>",
        comment: "需要预览的图片的url数组.",
      },
    ];
  },
  data() {
    const images = []
    for (let idx=0; idx<4; idx++) {
      images.push(`https://picsum.photos/1000/600?${idx}`)
    }
    return {
      images
    };
  },
};
</script>

<style lang="css" scoped>
.image {
  border: 1px solid gray;
  margin: 10px;
  cursor: pointer;
  width: 200px;
}

</style>
