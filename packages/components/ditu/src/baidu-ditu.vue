<template>
    <div class="tsy-baidu-ditu-main">
        <baidu-ditu-inner v-if="apiLoaded" v-bind="$attrs"></baidu-ditu-inner>
    </div>
</template>

<script>
import Utils from '../../../utils.js'
import BaiduDituInner from './baidu-ditu-inner.vue'


export default {
    
    props: {
        accessKey: String
    },

    components: {
        BaiduDituInner
    },

    data() {
        return {
            apiLoaded: window.BMapGL
        }
    },

    mounted() {
        const that = this
        const {
            accessKey
        } = that
        if (!window.BMapGL) {
            window.baiduDituInitialize = () => {
                that.apiLoaded = !!window.BMapGL
            }
            Utils.loadScript(`https://api.map.baidu.com/api?v=1.0&type=webgl&ak=${accessKey}&callback=baiduDituInitialize()`).then(() => {
            }).catch(() => {
                console.log('加载地图API失败。' + accessKey)
            })
        }
    }
}
</script>

<style scoped>
.tsy-baidu-ditu-main {
    height: 100%;
    width: 100%;
    background: lightgray;
}
</style>