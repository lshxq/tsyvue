<template>
<div class="tsy-checkbox-group-main">
  <sy-checkbox v-for="(opt, idx) of options" 
               :key="idx" 
               :label="opt.label" 
               :value="opt.value" 
               :checked="checkboxState(opt)" @checkbox-clicked="checkboxClicked"></sy-checkbox>
</div>
</template>

<script>
export default {
  name: "SyCheckboxGroup",
  props: {
    modelValue: Array,
    options: Array,
  },
  computed: {},
  methods: {
    checkboxState(opt) {
      const { modelValue } = this;
      if (modelValue instanceof Array) {
        const idx = modelValue.findIndex((ele) => ele === opt.value);
        return idx >= 0;
      } else {
        return opt.value === modelValue;
      }
    },
    checkboxClicked(checked, radioValue) {
      const { modelValue } = this;
      const arr = [];

      if (checked) {
        // 添加
        modelValue.map((ele) => {
          arr.push(ele);
        });
        if (radioValue != undefined) {
          arr.push(radioValue);
        }
        
      } else {
        // 移除
        modelValue.map((ele) => {
          if (ele != radioValue) {
            arr.push(ele);
          }
        });
      }
      this.$emit("update:modelValue", arr);
    },
  },
};
</script>

<style lang="css" scoped></style>
