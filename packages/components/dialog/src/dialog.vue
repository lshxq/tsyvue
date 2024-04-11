<template>
    <Teleport to="body">
        <div v-if="show" class="sy-dialog">
            <div class="sy-dialog-panel" :style="dialogPanelStyleComp" ref="dialogPanelRef">
                <div class="header">
                    <div class="left">
                        <slot name="header"></slot>
                        {{title}}
                    </div>
                    
                    <div class="buttons">
                        <div class="header-button close" @click="close">+</div>
                    </div>
                </div>
                <div class="body" ref="dialogBodyRef"><slot></slot></div>
                <div class="footer">
                    <template v-if="customizedFooter">
                        <slot name="footer"/>
                    </template>
                    <div v-else class="button primary" @click="close">关闭</div>
                </div>
            </div>
        </div>
    </Teleport>

</template>
<script>

const delay = .5

export default {
    name: 'SyDialog',
    props: {
        visible: {
            type: Boolean,
            default() {
                return false;
            }
        },
        title: String,
        width: {
            type: String,
            default() {
                return '60%'
            }
        },
        height: String
    },
    components: {
    },
    data() {
        return {
            show: false
        }
    },
    computed: {
        customizedFooter() {
            const that = this
            return that.$slots.footer
        },
        dialogPanelStyleComp() {
            const {
                width,
                height
            } = this
            const style = {}

            if (width) {
                style.width = width
            }

            if (height) {
                style.height = height
            }
            return style;
        }
    },
    watch: {
        visible(vis) {
            const that = this
            if (vis) {
                that.show = true
                that.$nextTick(() => {
                    const {
                        height
                    } = that
                    
                    !height && (that.$refs.dialogPanelRef.style.height = 'auto')
                    that.$refs.dialogPanelRef.style.opacity = .5
                    that.$refs.dialogPanelRef.style.transition = 'initial'
                    setTimeout(() => {
                        const realHeight = that.$refs.dialogPanelRef.offsetHeight
                        that.$refs.dialogPanelRef.style.height = '0px'
                        that.$refs.dialogBodyRef.style.overflow = 'hidden'
                        requestAnimationFrame(() => {
                            that.$refs.dialogPanelRef.style.transition = `all ${delay}s`
                            requestAnimationFrame(() => {
                                that.$refs.dialogPanelRef.style.height = height || `${realHeight}px`
                                that.$refs.dialogPanelRef.style.opacity = 1
                                setTimeout(() => {
                                    that.$refs.dialogBodyRef.style.overflow = 'auto'
                                }, delay * 1000)
                            })
                        })
                    }, 1) 
                })
                
            }
        }
    },
    methods: {
        close() {
            this.$refs.dialogPanelRef.style.height = `0px`
            this.$refs.dialogPanelRef.style.opacity = .2
            setTimeout(() => {
                this.$emit('update:visible', false);
                this.show = false
            }, delay * 1000)
            
        }
    }
}
</script>

<style lang="css" scoped>

.sy-dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* 半透明背景 */
    z-index: 9999; /* 确保在最顶层 */
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(200, 200, 200, .8);
}

.sy-dialog-panel {
    display: flex;
    flex-direction: column;
    border: 1px solid lightgray;
    border-radius: 10px;
    overflow: hidden;
    background-color: white;
}

.sy-dialog-panel > .body {
    padding: 10px;
    overflow: auto;
    flex-grow: 1;
}

.sy-dialog-panel > .header {
    padding: 5px 10px;
    border-bottom: 1px solid rgb(230, 227, 227);
    color:rgb(34, 32, 32);
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: rgb(238, 236, 236);
    user-select: none;
    justify-content: space-between;
}

.sy-dialog-panel > .header > .left {
    display: flex;
    flex-flow: row nowrap;
}

.sy-dialog-panel > .header > .buttons {
    display: flex;
    flex-direction: row;
}

.sy-dialog-panel > .header > .buttons > .header-button{
    cursor: pointer;
}

.sy-dialog-panel > .header > .buttons > .header-button:hover{
    color: rgb(53, 145, 231);
}

.sy-dialog-panel > .header > .buttons > .close {
    color: gray;
    transform: rotate(45deg);
    font-size: 30px;
}

.sy-dialog-panel > .footer {
    padding: 5px 10px;
    flex-grow: 0;
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid lightgray;
}
</style>