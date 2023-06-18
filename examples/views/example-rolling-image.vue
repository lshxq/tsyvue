<template>
  <div class="example-rolling-image">
    <m-viewer :markdown="content"/>

    <div class="example-rolling-image-wrapper">
      <sy-rolling-image :images="images"/>
    </div>
    

    
  </div>
</template>

<script>
export default {
  created() {
    this.content = `# 旋转图片 sy-rolling-image
\`\`\` html
<sy-rolling-image :images="images"/>
\`\`\`

|属性|值|说明|
|-|-|-|
|image|Array|图片数组|
    `
  },
  data() {
    const images = []
    for (let idx=0; idx<12; idx++) {
      images.push(`https://picsum.photos/200/300?${idx}`)
    }

    return {
      images
    }
  }
}
</script>

<style scoped>
.example-rolling-image-wrapper {
  background: #000;
}


</style>