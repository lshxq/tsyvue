<template>
<m-viewer :markdown="content"/>
</template>

<script setup>
const content = `\`\`\` javascript
{
  label: String, // 显示的值
  value: String, // 提交的值
}
\`\`\``
</script>