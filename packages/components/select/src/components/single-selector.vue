<template>
  <div class="tsy-single-select-main" >
    <div class='input' @click="showOptions">
      <input  :value="valueDisplayComputed" readonly :placeholder="placeholder"/>
    </div>

    <sy-arrow class="select-arrow" color="#BBBBBB" :rotate="rotateComp" @click="showOptions"/>
    
    <div :class="optionPanelClassComputed">
      <div :class="optionItemClass(opt)" v-for="(opt, idx) of options" :key="idx" @click="optionClicked(opt)">{{opt.label}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: null,
    placeholder: String,
    options: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      expend: false
    }
  },
  mounted() {
    document.body.addEventListener('click', this.hideOptions)
  },
  unmounted() {
    document.body.removeEventListener('click', this.hideOptions)
  },
  computed: {
    rotateComp() {
      return this.expend ? 270 : 90
    },
    optionPanelClassComputed() {
      const {
        expend
      } = this
      return {
        'option-panel': true,
        expend
      }
    },

    valueDisplayComputed() {
      const {
        modelValue,
        options
      } = this;
      let str = '';
      for (const opt of options) {
        if (opt.value === modelValue) {
          str = opt.label;
        }
      }
      return str;
    }
  },
  methods: {
    showOptions() {
      event.stopPropagation()
      event.preventDefault()
      this.expend = true
    },
    hideOptions() {
      const that = this;
      that.expend = false
    },
    optionClicked(opt) {
      this.expend = false;
      this.$emit('update:modelValue', opt.value);
    },

    optionItemClass(opt) {
      const {
        modelValue
      } = this;
      return {
        'option-item': true,
        selected: modelValue === opt.value,
      }
    }
  }
}
</script>

<style scoped>
.tsy-single-select-main {
  display: inline-block;
  user-select: none;
  position: relative;
  background: white;
}

.select-arrow {
  position: absolute;
  right: 10px;
  top: 5px;
  cursor: pointer;
  transition: .5s all;
}


.tsy-select-main>.input {
  cursor: pointer;
}

.tsy-single-select-main>.input>input {
  margin: 1px;
  padding: 0 30px 0 15px;
  border-radius: 5px;
  height: 25px;
  width: 100%;
  border: 0;
  outline: 1px solid lightgray;
  box-sizing: border-box;
  cursor: pointer;
}
.tsy-single-select-main>.input>input:focus {
  outline: 1px solid #409EFF;
  border: 0;
}

.option-panel.expend {
  transform: scaleY(1);
}
.option-panel {
  position: absolute;
  top: 30px;
  background: white;
  width: 100%;
  box-shadow: 0 0 10px lightgray;
  border-radius: 5px;
  padding: 4px 0;
  transform: scaleY(0);
  transition: .5s;
  transform-origin: 0 0;
  z-index: 9999;
}
.option-panel>.option-item {
  padding: 5px 7px;
}
.option-panel>.option-item:hover {
  background: #EEE;
}
.option-panel>.option-item.selected {
  color: #409EFF;
  font-weight: bold;
}
</style>