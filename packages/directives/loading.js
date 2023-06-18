
export default {
    name: 'loading',
    created(el) {
        if ('' === el.style.position) {
            console.log('set节点的postion为relative')
            el.style.position = 'relative'
        }
        const mask = document.createElement('div')
        mask.className='sy-loading-mask'
        mask.style.position = 'absolute'
        mask.style.display = 'flex'
        mask.style.justifyContent = 'center'
        mask.style.alignItems = 'center'
        mask.style.top = 0
        mask.style.left = 0
        mask.style.right = 0
        mask.style.bottom = 0
        mask.style.background = 'rgba(255, 255, 255, .8)'
        mask.style.visibility='hidden'
        mask.append('加载中。。。')
        el.append(mask)
    },

    updated(el, binding) {
        const mask = el.querySelector('.sy-loading-mask')
        if (binding.value) {
            mask.style.visibility='visible'
        } else {
            mask.style.visibility='hidden'
        }
    },

    beforeUnmount(el) {
        const mask = el.querySelector('.sy-loading-mask')
        el.removeChild(mask)
    }

}