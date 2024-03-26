<template>
    <Teleport to="body">
        <div v-if="visible" class="sy-dialog">
            <div class="sy-dialog-panel">
                <div class="header">
                    {{title}}
                    <slot name="header"></slot>
                    <div class="buttons">
                        <div class=" header-button close">+</div>
                    </div>
                </div>
                <div class="body"><slot></slot></div>
                <div class="footer"><slot name="footer"></slot></div>
            </div>
            
        </div>
        
    </Teleport>

</template>
<script>

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
        }

    },
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
}

.sy-dialog-panel > .header {
    padding: 5px 10px;
    border-bottom: 1px solid lightgray;
    color:rgb(34, 32, 32);
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: rgb(238, 236, 236);
    user-select: none;
    justify-content: space-between;
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
</style>