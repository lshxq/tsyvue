<template>

  
<div class="tsy-tags-example">
  <m-viewer :markdown="content"/>

  <sy-tags :items="tags" @delete="tagDeleted"></sy-tags>
  <sy-tags class="mt30" :items="tags" :removable="removable" @delete="tagDeleted"></sy-tags>

  <div class="mt100">
    <div class="h2">Props</div>
    <sy-table :columns="propTableColumns" :data="propTableData">
      <template v-slot:comment="scope">{{scope.row.comment}}</template>
    </sy-table>
  </div>
  <div class="mt100">
    <div class="h2">Events</div>
    <sy-table :columns="eventTableColumns" :data="eventTableData">
      <template v-slot:comment="scope">{{scope.row.comment}}   </template>
    </sy-table>
  </div>
</div> 
</template>

<script>
const tt = (tag, idx) => {
  if (typeof tag === 'object') {
    return `${tag.text} ${idx}`
  }
  return `${tag} ${idx}`
}
import commentMixin from '../mixins/comment-mixins'

export default {
  mixins: [commentMixin],
  created() {
    this.content = `
虽然element中也有实现tags，但是他还是需要自己迭代，使用比较麻烦，这里提供了一个更好用的实现，能满足绝大部分场景
组件接受items是个数组，数组元素可以是简单的字符串，或者是个tag对象
\`\`\` javascript
{
  text: String // tag展示内容
  type: String, // success, info, warning, danger
  removable: Boolean // false, 是否可以被移除
}
\`\`\`

\`\`\` html
<sy-tags :items="tags" @delete="tagDeleted"></sy-tags>
  
<sy-tags class="mt30" :items="tags" removable="removable" @delete="tagDeleted"></sy-tags>
\`\`\`

vue实例上绑定的 tags

\`\`\` javascript
tihs.tags = [
  'default',
  {
    text: 'success', 
    type: 'success'       // 指定了type
  },      
  {
    text: 'info', 
    type: 'info'
  },
  {
    text: 'warning', 
    type: 'warning'
  },
  {
    text: 'danger', 
    type: 'danger', 
    removable: true    // 标记了removable，可以单独自定谁可以删除
  }, 
]
\`\`\`


vue中的点击事件处理
\`\`\` javascript
tagDeleted(tag, idx) { // tag就是数组中的item， idx是数组的下标
  console.log(tag, idx)
}
\`\`\`
    `

    this.propTableData = [{
      name: 'items',
      type: 'Array[tag]',
      comment: 'tag对象数组'
    }, {
      name: 'removable',
      type: "Boolean(false)",
      comment: '是否显示删除按钮，默认是不显示，除了这个全局配置，也可以在tag对象中单独指定'
    }]
    this.eventTableData = [{
      name: 'delete',
      comment: '删除tag事件，两个参数分别是 tag数组中的tag对象，和在数组中的位置'
    }]
  },
  data() {
    return {
      removable: true,
      tags: [
        'default',
        {
          text: 'success',
          type: 'success'
        },
        {
          text: 'info',
          type: 'info'
        },
        {
          text: 'warning',
          type: 'warning'
        },
        {
          text: 'danger',
          type: 'danger',
          removable: true
        }
      ]
    }
  },
  methods: {
    tagClicked(tag, idx) {
      alert(`tag点击 ${tt(tag, idx)}`)
    },
    tagDeleted(tag, idx) {
      alert(`tag删除 ${tt(tag, idx)}`)
    }
  }
}
</script>