
const map = new WeakMap();

const debounce = function(fn, wait) {
  let timer = null;
  return function(entries) {
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(entries)
    }, wait)
  }
}


const ob = new ResizeObserver(debounce((entries) => {
  for(const entry of entries) {
    const handler = map.get(entry.target);
    if (handler) {
      if (entry.contentRect) { // chrome  78.0.3904.108
        handler(entry.contentRect)
      } else {
        const box = entry.borderBoxSize[0];
        if (box) {
          handler({
            width: box.inlineSize,
            height: box.blockSize
          })
        } else {
          handler(entry);
        }
      }
    }
  }
}, 300))




export default {
  name: 'resize',
  beforeMount(el, binding) {
    ob.observe(el, binding);
    map.set(el, binding.value)
  },

  unmounted(el) {
    ob.unobserve(el);
  }
}

