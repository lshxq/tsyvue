<template>
<div :class="buttonClass">
    <slot>{{$slots.default}}</slot>
</div>
</template>

<script>
export default {
    name: 'SyButton',
    props: {
        primary: {
            type: Boolean,
            default() {
                return false;
            }
        },
        success: {
            type: Boolean,
            default() {
                return false;
            }
        },
        danger: {
            type: Boolean,
            default() {
                return false;
            }
        }
    },
    computed: {
        buttonClass() {
            const classes = ['tsy-button']
            if (this.primary) {
                classes.push('primary')
            } else if (this.success) {
                classes.push('success')
            } else if (this.danger) {
                classes.push('danger')
            }
            return classes;
        }
    }
}
</script>

<style scoped>


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
    margin-right: 10px;
    border: 1px solid var(--border-color);
    min-width: 60px;
    text-align: center;
    cursor: pointer;
    background-color: var(--bg-color);
    border-radius: 3px;
    color: var(--color);
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
</style>