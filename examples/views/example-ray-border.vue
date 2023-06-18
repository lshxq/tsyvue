<template>
  <div class="example-ray-border-main">
    <m-viewer :markdown="content"/>

    <sy-ray-border :radius="5" :width="300" :height="500" color1="#e6f03c,#faf01e,#50befa,transparent" color2="#d232fa,#aab4f0,#f0c8fa,transparent">
      <div class="content-panel">
        <h1>23</h1>
      </div>
    </sy-ray-border>
  </div>
</template>

<script setup>
const content = `# 电光边框 sy-ray-border
\`\`\` html
<sy-ray-border :radius="5" :width="300" :height="500" color1="#e6f03c,#faf01e,#50befa,transparent" color2="#d232fa,#aab4f0,#f0c8fa,transparent">
  <div class="content-panel">
    <h1>23</h1>
  </div>
</sy-ray-border>
\`\`\`

用这个包保住，就可以个获得一个电光边框

|属性|值|说明|
|-|-|-|
|radius|Number|边框圆角的半径|
|width|Number|盒子宽度|
|height|Number|盒子高度|
|color1/color2|String|逗号分割的各种颜色，渐变效果|
`
</script>

<style scoped>

.content-panel {
  display: flex;
  background: red;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  user-select: none;
}

.content-panel>h1 {
  font-size: 140px;
  color: black;
  -webkit-text-stroke: 4px white;
}
</style>