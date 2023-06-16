<template>
<div class="tsy-checkbox-group-example">
  <div class="h1">复选框 sy-checkbox-group</div>
  <sy-checkbox-group v-model="selected" :options="options"></sy-checkbox-group>
  <p>当前选定的值 {{selected}}</p>

  <m-viewer :markdown='content'/>

</div>
</template>

<script>

const content = `
pug 模板
\`\`\` javascript
sy-checkbox-group(v-model='selected' :options='options')
\`\`\`

vue 实例绑定的值
\`\`\` javascript
this.options = [{
  label: '选项一',
  value: 1
}, {
  label: '蓝色',
  value: 'b'
}, {
  label: '橙子',
  value: 'orange'
}]
\`\`\`


和radio的情况一样，这里复写了checkbox
`

export default {
  setup() {
    return {
      content
    }
  },

  created() {

    this.options = [
      {
        label: "选项一",
        value: 1,
      },
      {
        label: "蓝色",
        value: "b",
      },
      {
        label: "橙子",
        value: "orange",
      },
    ];
  },
  data() {
    return {
      selected: [],
    };
  },
};
</script>
