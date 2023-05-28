<template>
  <div class="example-blocks-main">
    <sy-left-right width="800">
      <template v-slot:left>
        <div class="switch-panel">
        <sy-switch v-model="short" label-on="极简" label-off="完整UI"/>
      </div>
      </template>
      
      <template v-slot:right>
        <div class="block-wrapper">
          <sy-blocks :default-visibility="true" :short="short" :row-count="21" :column-count="15"/>
        </div>
      </template>
    </sy-left-right>
    
    
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      short: false
    }
  }
}
</script>

<style scoped>
.block-wrapper {
  width: 400px;
  margin: 30px;
}

.switch-panel {
  padding: 30px;
}
</style>