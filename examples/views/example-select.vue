<template>
  <div class="example-select-main">
    <sy-left-right class="mt30">
      <template v-slot:left>
        <div>单选 当前值: {{singleValue}}</div>
      </template>
      
      <template v-slot:right>
        <div ><sy-select :options="options" v-model="singleValue" placeholder="请选择"/></div>
      </template>
      
    </sy-left-right>

  </div>

</template>

<script>
export default {
  data() {
    this.options = [
      {
        label: '选项1',
        value: 1
      },
      {
        label: 'BBBB',
        value: 'B'
      },
      {
        label: '3333',
        value: 3
      }
    ]
    return {
      singleValue: null,
      multiValue: null,
    }
  }
}
</script>


<style scoped>
.example-select-main {
  width: 500px;
}
</style>