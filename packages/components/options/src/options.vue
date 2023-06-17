<template>
<div class="tsy-options-main" v-loading="loading">
  <div class="tsy-options-type-2" v-if="type == 2">
    <template v-if="multiple">
      <sy-checkbox-group :options="optionsComputed" :modelValue="reasonableValue" @update:modelValue="valueChanged"></sy-checkbox-group>
    </template>
    <sy-radio-group v-else :options="optionsComputed" :modelValue="reasonableValue" @update:modelValue="optionClicked"></sy-radio-group>
  </div>
  
  <div class="tsy-options-type-3" v-if="type == 3">
    <div class="block-options">
      <div class="label">{{labelComp}}：</div>
      <div class="options">
        <div class="option" :class="blockOptionsOptionClass(opt)" v-for="(opt, idx) of optionsComputed" :key="idx" @click="optionClicked(opt.value)">{{opt.label}}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
const cachedRequest = {};

export default {
  name: "SyOptions",
  props: {
    label: String,
    modelValue: null,
    multiple: {
      type: Boolean,
      default() {
        return false;
      },
    },
    url: String,
    respDataMapper: Function,
    mock: null,
    cachable: {
      type: Boolean,
      default() {
        return true;
      },
    },
    type: {
      type: null,
      default() {
        return 1;
      },
    },
    firstOption: Object,
    options: Array,
  },
  created() {},
  data() {
    return {
      loading: false,
      optionsInner: [],
    };
  },
  computed: {
    reasonableValue() {
      const {
        modelValue,
        multiple
      } = this
      if (multiple) {
        if (modelValue instanceof Array) {
          return modelValue
        } else {
          if (modelValue !== undefined) {
            return [modelValue]
          } else {
            return []
          }
        }
      }
      return modelValue
    },
    optionsComputed() {
      const {
        firstOption,
        optionsInner,
      } = this
      const arr = []
      if (firstOption) {
        arr.push(firstOption)
      }
      optionsInner.map(opt => arr.push(opt))
      return arr;
    },
    placeholderComp() {
      const { label } = this;
      if (label) {
        return `请选择${label}`;
      }
      return "";
    },
    labelComp() {
      const { label = "选项集合" } = this;
      return label;
    },
  },
  mounted() {
    const {
      options
    } = this
    if (options) {
      this.optionsInner = options
    } else {
      this.loadData();
    }
    
  },
  methods: {
    valueChanged(newValue) {
      this.$emit("update:modelValue", newValue);
    },
    blockOptionsOptionClass(opt) {
      const { reasonableValue,multiple } = this;
      let selected = false
      if (multiple) {
        const found = reasonableValue.find((str) => {
          return str === opt.value
        })
        selected = found !== undefined
      } else {
        selected = reasonableValue === opt.value
      }
      return {
        selected,
      };
    },
    optionClicked(val) {
      const {
        multiple,
        reasonableValue
      } = this
      if (multiple) {
        const idx = reasonableValue.findIndex(ele => ele === val)
        if (idx >= 0) { // 需要移除
          reasonableValue.splice(idx, 1)
        } else { // 需要添加
          reasonableValue.push(val)
        }
        this.$emit('update:modelValue', reasonableValue)
      } else {
        this.$emit('update:modelValue', val)
      }
    },
    loadData() {
      const that = this;
      const { url, respDataMapper, mock, cachable } = that;
      if (url) {
        let prom = cachedRequest[url];
        if (!prom || !cachable) {
          that.loading = true;
          prom = that.$axios({
            url,
            mock,
          });
          cachedRequest[url] = prom;
        }
        prom
          .then((resp) => {
            let respData = resp.data;
            if (respDataMapper) {
              respData = respDataMapper(respData);
            }
            this.optionsInner = respData;
          })
          .catch((ex) => {
            console.log(`加载Options失败 ${url}`, ex);
          })
          .finally(() => {
            that.loading = false;
          });
      }
    },
  },
};
</script>

<style lang="css" scoped>
.block-options {
  display: flex;
  align-items: center;
  user-select: none;
}

.block-options .label {
  min-width: 80px;
  margin-bottom: 10px;
}

.block-options .options {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}

.block-options .options .option {
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 10px;
}

.block-options .options .option:hover, .block-options .options .option.selected {
  background-color: #D9B300;
  color: white;
}

.tsy-options-type-1 {
  display: flex;
  align-items: center;
}

.tsy-options-type-1 .label {
  margin-right: 10px;
  min-width: 120px;
}

</style>
