<template>
 
  <div class="example-paginator-main">
    <m-viewer :markdown='content'/>
    <sy-paginator :total="999" :curr="curr" @pagin="pagin"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curr: 3,
    }
  },
  computed: {
    content() {
      return `
\`\`\` html
<sy-paginator 
    :total="999" 
    :curr="${this.curr}" 
    @pagin="pagin"/>
\`\`\`

告诉他一共有多少条记录，当前在第几页，监听页面变化的pagin事件，事件处理函数会接收到变化后的pageNo和pageSize的值。
      `
    }
  },
  methods: {
    pagin(paginInfo) {
      const {
        pageNo,
        pageSize
      } = paginInfo;
      this.curr = pageNo;
      console.log(pageSize)
    }
  }
}
</script>