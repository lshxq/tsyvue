<template>
<div class="example-tsy-arrow">
  <m-viewer :markdown="content"/>
  
  <div v-for="cnt of counts" :key="cnt" class="mt10">
    <div>cnt: {{cnt }}</div>
    <div><sy-arrow :count='cnt'/></div>
  </div>
  
</div>
</template>

<script>
const content = `# sy-arrow

生成箭头

\`\`\`html
<sy-arrow :count='cnt'/>
\`\`\`
|props|值|说明|
|-|-|-|
|cnt|Number default 1|产生的箭头个数|


`

export default {
  setup() {
    const counts = [];
    for (let idx=1; idx<=10; idx++) {
      counts.push(idx);
    }
    
    return {
      content,
      counts
    }
  }
}
</script>