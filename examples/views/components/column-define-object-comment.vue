<template>
  <div class="column-defined-comment-main">
    <p>ColumnDef 列定义对象</p>
    <m-viewer :markdown="content"/>
    <p> <img :src="namedSlotCodePng"/></p>
    <p>prop、getCentent、slot三者提供一种即可。</p>
  </div>
  </template>
  
  <script setup>
  const content = `\`\`\` javascript
  {
    label: String,        // 列名称
    prop: String,         // 在row中取值展示的key，字段的名字
    getContent: Function, // 一些列可能是有多个字段组成，比如 起止时间，可以利用这个函数组合处理列内容，函数接收的参数是当前行数据。
    slot: String          // 对于有交互行为的列，展示的可能是按钮、连接，不是text，可以利用命名slot的方式，用html模板来渲染。
    sorter: String        // 用来排序的列的key
    width: Number or %    // 定义列的宽度
  }
  \`\`\``
  </script>
  