<template>
 
<div class="tsy-images">
  <m-viewer :markdown="content"/>
  
  <div class="mt30">sy-image 接收src，src可以是一个图片的字符串，也可以 是 图片地址的数组，确保图片地址在浏览器中可以访问到即可。多个图片自动排列，有悬停点击效果，点击图片自动预览。同时至此 width和height属性，不传入大小有默认值。 默认宽度100像素。</div>
  <sy-img class="mt30" :src="images"/>
</div>
</template>

<script>
export default {
  setup() {
    return {
      content: `
我们经常会遇到需要迭代展示的一些图片，每次都开发相同的逻辑很烦，我对img标签做了一些封装，形成了sy-img标签。添加了一些默认行为
\`\`\` html
<sy-img :src='imageArr'
        width='300px'/>
\`\`\`

\`\`\` javascript 
// 在vue上绑定的images
data() {
  return {
    images: [
      './images/1.jpg',
      './images/2.jpg',
      './images/3.jpg',
      './images/4.jpg'
    ]
  }
}
\`\`\`

|属性|值|说明|
|-|-|-|
|src|Array、String|图片地址，可以是一组图片，或一个图片|
|preview|Boolean default true|是否开启预览， 开启预览后，鼠标悬停会提示点击查看预览|
|width|Strting default "220px"|图片的宽度|
|height|String|通常不指定图片高度，根据宽度自适应|
      `
    }
  },
  data() {
    const images = []
    for (let idx=0; idx<4; idx++) {
      images.push(`https://picsum.photos/1000/600?${idx}`)
    }
    return {
      images
    };
  }
}
</script>