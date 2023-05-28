<template>
<div class="tsy-radio-group-main">
  <sy-radio v-for="(opt, idx) of options" 
            :key="idx" :label="opt.label" 
            :value="opt.value" 
            :checked="isChecked(opt)" 
            @radio-clicked="radioClicked"/>
</div>
</template>

<script>
export default {
  name: "SyRadioGroup",
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    modelValue: null,
  },
  methods: {
    isChecked(opt) {
      return this.modelValue == opt.value;
    },
    radioClicked(checked, value) {
      this.$emit("update:model-value", value);
    },
  },
};
</script>

<style lang="css" scoped>
.tsy-radio-group-main {
  display: flex;
  flex-flow: row wrap;
}

</style>
