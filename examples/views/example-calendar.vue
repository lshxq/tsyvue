<template>
  <div class="example-calendar-main">
    <m-viewer :markdown="content"/>

    <div class="calendar-container"><sy-calendar v-model="date" ref="cldr"/></div>
    <div class="current-value">当前值： {{dateStr}}</div>

    <div><sy-button @click="setDisplay">返回当前月份</sy-button></div>
  </div>
</template>

<script>
export default {
  data() {
    this.content = `# 日历 sy-calendar
\`\`\` html
<div class="calendar-container">
  <sy-calendar v-model="date" ref="cldr"/>
</div>
\`\`\`

一个简朴的日历组件，通过v-model绑定当前选择的日期，默认值为今天。日历的宽度通过父容器确定。 可以通过 setDisplay函数设置当前面板显示的年月。
\`\`\` javascript
this.$refs.cldr.setDisplay(new Date()); // 设置当前显示的年月
\`\`\`


    `
    return {
      date: new Date()
    }
  },
  computed: {
    dateStr() {
      const {
        date
      } = this;
      return date.format('yyyy-MM-dd');
    }
  },
  methods: {
    setDisplay() {
      this.$refs.cldr.setDisplay(new Date());
    }
  }
}

</script>

<style lang="css" scoped>
.calendar-container {
  width: 300px;
  
}

.current-value {
  margin: 50px;
}
</style>