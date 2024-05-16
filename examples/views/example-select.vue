<template>
 
  <div class="example-select-main">
    <sy-left-right class="mt30">
      <template v-slot:left>
        <div>单选 当前值: {{singleValue1}}</div>
      </template>
      
      <template v-slot:right>
        <div ><sy-select :options="options" v-model="singleValue1" placeholder="请选择"/></div>
      </template>
      
    </sy-left-right>

    <sy-left-right class="mt30">
      <template v-slot:left>
        <div>单选 当前值: {{singleValue2}}</div>
      </template>
      
      <template v-slot:right>
        <div ><sy-select :options="options" v-model="singleValue2" placeholder="请选择"/></div>
      </template>
      
    </sy-left-right>

  </div>

</template>

<script setup>
import { ref } from 'vue'


const options = [
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


let singleValue1 = ref('')
let singleValue2 = ref('')
</script>


<style scoped>
.example-select-main {
  width: 500px;
}
</style>