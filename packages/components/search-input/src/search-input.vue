<template>
<div class="tsy-search-input-main">
  canceled due to element remove
</div>
</template>

<script>
export default {
  name: "SySearchInput",
  props: {
    placeholder: String,
  },
  data() {
    return {
      valueInner: "",
    };
  },
  methods: {
    exposeValue() {
      this.$emit("input", this.valueInner);
    },
  },
};
</script>

<style lang="css" scoped>
.tsy-search-input-main {
  width: 280px;
}

</style>
