<template>
    <div class="tsy-baidu-ditu-inner-main" ref="dituRef"></div>
</template>

<script>
export default {
    props: {
        center: {
            type: Object,
            default() {
                return {
                    longitude: 116.404,
                    latitude: 39.915
                }
            }
        },
        zoom: {
            type: Number,
            default() {
                return 19
            }
        },
        markers: {
            type: Array,
        }
    },

    computed: {
        markerIcon() {
            const BMapGL = window.BMapGL
            var myIcon = new BMapGL.Icon("markers.png", new BMapGL.Size(23, 25), {
                anchor: new BMapGL.Size(10, 25),
                imageOffset: new BMapGL.Size(0, 0 - 25)   // 设置图片偏移   
            });
            return myIcon
        }
    },

    mounted() {
        const BMapGL = window.BMapGL
        const that = this
        if (BMapGL) {
            const {
                center,
                zoom,
                markers
            } = that
            const map = new BMapGL.Map(this.$refs.dituRef);
            that.ditu = map
            map.centerAndZoom(new BMapGL.Point(center.longitude, center.latitude), zoom);
            map.enableScrollWheelZoom(true);

            var scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
            map.addControl(scaleCtrl);
            var zoomCtrl = new BMapGL.ZoomControl();  // 添加缩放控件
            map.addControl(zoomCtrl);

            if (markers && markers.length > 0) {
                for (const marker of markers) {
                    that.createMarker(marker)
                }
            }

            
        }
    },
    methods: {
        createMarker(marker) {
            const that = this
            const BMapGL = window.BMapGL
            var mm = new BMapGL.Marker(new BMapGL.Point(marker.longitude, marker.latitude), { icon: that.myIcon });
            that.ditu.addOverlay(mm);
        }
    }
}
</script>

<style scoped>
.tsy-baidu-ditu-inner-main {
    height: 100%;
    width: 100%;
}
</style>