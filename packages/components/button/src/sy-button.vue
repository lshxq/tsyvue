<template>
<div class="tsy-button-main">
    <div :class="buttonClass" @click.stop="buttonClicked">
        <slot>{{$slots.default}}</slot>
    </div>
</div>

</template>

<script>
export default {
    name: 'SyButton',
    props: {
        type: {
            type:String,
            default() {
                return 'normal'
            }
        },
        disabled: {
            type: Boolean,
            default() {
                return false;
            }
        },
    },
    
    computed: {
        buttonClass() {
            const classes = ['tsy-button', this.type]
            if (this.disabled) {
                classes.push('disabled')
            }
            return classes;
        }
    },

    methods: {
        buttonClicked() {
            event.preventDefault();
            event.stopPropagation();
            if (!this.disabled) {
                this.$emit('click')
                return true
            }
            return false
        }
    }
}
</script>

<style scoped>

.tsy-button-main {
    display: inline-block;
    margin-right: 10px;
}

.tsy-button {
    --color: #606266;
    --bg-color: #fff;
    --border-color: #dcdfe6;

    line-height: 1;
    padding: 12px 20px;
    font-size: 14px;
    white-space: nowrap;
    box-sizing: border-box;
    outline: none;
    font-weight: 500;
    transition: .1s;
    user-select: none;
    display: inline-block;
    min-width: 60px;
    text-align: center;
    cursor: pointer;
    border-radius: 3px;
    color: var(--color);
    background-color: var(--bg-color);
    border: 1px solid var(--border-color);
    
}

.tsy-button:hover {
    --color: #409eff;
    --border-color: #c6e2ff;
    --bg-color: #ecf5ff;
}

.tsy-button:active {
    --color: #3a8ee6;
    --border-color: #3a8ee6;
    outline: none;
}

.tsy-button.disabled {
    --color: #c0c4cc;
    --border-color: #ebeef5;
    --bg-color: #fff;
    cursor: not-allowed;
}














.tsy-button.primary {
    --color: #fff;
    --bg-color: #409eff;
    --border-color: #409eff;
}

.tsy-button.primary:hover {
    --bg-color: #66b1ff;
    --border-color: #66b1ff;
    --color: #fff;
}

.tsy-button.primary:active {
    --bg-color: #3a8ee6;
    --border-color: #3a8ee6;
    --color: #fff;
}

.tsy-button.disabled.primary {
    --color: #fff;
    --bg-color: #a0cfff;
    --border-color: #a0cfff;
}













.tsy-button.success {
    --color: #fff;
    --bg-color: #67c23a;
    --border-color: #67c23a;
}

.tsy-button.success:hover {
    --bg-color: #85ce61;
    --border-color: #85ce61;
    --color: #fff;
}

.tsy-button.success:active {
    --bg-color: #5daf34;
    --border-color: #5daf34;
    --color: #fff;
}

.tsy-button.disabled.success {
    --color: #fff;
    --bg-color: #b3e19d;
    --border-color: #b3e19d;
}














.tsy-button.warning {
    --color: #fff;
    --bg-color: #e6a23c;
    --border-color: #e6a23c;
}

.tsy-button.warning:hover {
    --bg-color: #ebb563;
    --border-color: #ebb563;
    --color: #fff;
}

.tsy-button.warning:active {
    --bg-color: #cf9236;
    --border-color: #cf9236;
    --color: #fff;
}

.tsy-button.disabled.warning {
    --color: #fff;
    --bg-color: #f3d19e;
    --border-color: #f3d19e;
}















.tsy-button.danger {
    --color: #fff;
    --bg-color: #f56c6c;
    --border-color: #f56c6c;
}

.tsy-button.danger:hover {
    --bg-color: #f78989;
    --border-color: #f78989;
    --color: #fff;
}

.tsy-button.danger:active {
    --bg-color: #dd6161;
    --border-color: #dd6161;
    --color: #fff;
}

.tsy-button.disabled.danger {
    --color: #fff;
    --bg-color: #fab6b6;
    --border-color: #fab6b6;
}

</style>