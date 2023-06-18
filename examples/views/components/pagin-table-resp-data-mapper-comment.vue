<template>
<m-viewer :markdown="content"/>
</template>

<script setup>
const content = `sy-pagin-table 期待服务器返回这样的数据格式如下

\`\`\` javascript
{
  data:Array // 数组的每个元素代表一行数据,
  total:Number // 匹配检索条件的记录总数
}
\`\`\`

如果接口返回的不是这样的格式，可以利用这个钩子函数对返回的数据做变形，并返回 这个格式。
`
</script>