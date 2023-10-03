<template>
<div class="tsy-percentage-main" ref="mainRef" :style="mainStyleComp">

  <div class="label" :style="labelStyleComp">{{modelValue}}%</div>

  <div v-for="(bar, index) in bars" :key="index" :style="tickStyle(bar)" class="tick"></div>

</div>
</template>

<script>
export default {
  name: "SyPercentage",
  props: {
    size: {
      type: Number,
      default() {
        return 200
      }
    },
    modelValue: {
      type: Number,
      default() {
        return 0
      }
    },
    tickLength: {
      default() {
        return 15
      },
      type: Number
    },
    valueColor: {
      type: String,
      default() {
        return 'lightgray'
      }
    },
    valueBorderColor: {
      type: String,
      default() {
        return 'white'
      }
    }
  },
  data() {
    const barLength = 100
    const bars = []

    const radius = this.size / 2 - 10;
    const centerX = this.size / 2;
    const centerY = this.size / 2;

    for (let idx=0; idx<barLength; idx++) {
      const angle = 360 / barLength * idx - 90;
      const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
      const y = centerY + radius * Math.sin((angle * Math.PI) / 180);
      const rotation = angle + 90;

      bars.push({
        idx,
        x,
        y,
        rotation
      });
    }
    return {
      bars,
    }
  },
  computed: {
    labelStyleComp() {
      const {
        size
      } = this
      return {
        fontSize: `${size / 4}px`
      }
    },
    mainStyleComp() {
      const {
        size
      } = this
      return {
        height: `${size}px`,
        width: `${size}px`
      }
    }
  },
  methods: {
    tickStyle(bar) {
      const {
        modelValue,
        tickLength
      } = this
      const style =  {
        height: `${tickLength}px`,
        left: bar.x + 'px',
        top: bar.y + 'px',
        transform: 'rotate(' + bar.rotation + 'deg)'
      }

      if (bar.idx < modelValue) {
        style.backgroundColor = `hsl(${360 / this.bars.length * bar.idx}, 100%, 64%)`
      }

      return style;
    }
  },
  mounted() {
    this.$refs.mainRef.style.setProperty('--label-color', this.valueColor);
    this.$refs.mainRef.style.setProperty('--label-ray-color', this.valueBorderColor);
  },


  unmounted() {
  },
};
</script>


<style scoped>


.tsy-percentage-main {
  position: relative;
  display: inline-block;
  --label-color: rgb(71, 125, 241);
  --label-ray-color: rgb(33, 66, 55);
}

.tick {
  background-color: gray;
  width: 2px;
  height: 10px;
  position: absolute;
  transition: all 1s;
}

.label {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--label-color);
  text-shadow: 1px 1px 2px var(--label-ray-color), -1px -1px 2px var(--label-ray-color), -1px 1px 2px var(--label-ray-color), 1px -1px 2px var(--label-ray-color);
}
</style>