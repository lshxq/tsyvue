<template>
    <div class="tsy-link-main">
        <div :class="buttonClass" @click.stop="buttonClicked">
            <slot>{{$slots.default}}</slot>
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'SyLink',
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
            const classes = ['tsy-link', this.type]
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

.tsy-link-main {
    display: inline-block;
    margin-right: 10px;
}

.tsy-link {
    --color: #606266;

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
    border: 1px solid var(--border-color);
    text-decoration: none; /* 添加这一行来移除下划线 */
}

.tsy-link:hover {
    --color: #409eff;
    text-decoration: underline; /* 鼠标悬停时添加下划线 */
}

.tsy-link:active {
    outline: none;
}

.tsy-link.disabled {
    --color: #c0c4cc;
    cursor: not-allowed;
}
    
    
    
    
    
    
    
    
    
    




.tsy-link.primary {
    --color: #409eff;
}

.tsy-link.primary:hover {
    --color: #66b1ff;
}

.tsy-link.primary:active {
    --color: #3a8ee6;
}

.tsy-link.disabled.primary {
    --color: #a0cfff;
}













.tsy-link.success {
    --color: #67c23a;
}

.tsy-link.success:hover {
    --color: #85ce61;
}

.tsy-link.success:active {
    --color: #5daf34;
}

.tsy-link.disabled.success {
    --color: #b3e19d;
}














.tsy-link.warning {
    --color: #e6a23c;
}

.tsy-link.warning:hover {
    --color: #ebb563;
}

.tsy-link.warning:active {
    --color: #cf9236;
}

.tsy-link.disabled.warning {
    --color: #f3d19e;
}















.tsy-link.danger {
    --color: #f56c6c;
}

.tsy-link.danger:hover {
    --color: #f78989;
}

.tsy-link.danger:active {
    --color: #dd6161;
}

.tsy-link.disabled.danger {
    --color: #fab6b6;
}

</style>