<template>
<div class="pagin-data-comment-main">
  <m-viewer :markdown="content"/>
</div>
</template>

<script setup>
const content = `如果后端接受的分页信息不是pageNo和pageSize，可以利用这个钩子函数，在发起ajax请求前，进行更名。
### 参数:
\`\`\` javascript 
{
  pageNo: Number, // 页号
  pageSize: NUmber, // 一页的记录数
}
\`\`\`

### 返回:
\`\`\` javascript
{
  XXXX: Number, // 从命名后的 页号
  XXXX: NUmber, // 从命名后的 记录数
}
\`\`\`
`
</script>