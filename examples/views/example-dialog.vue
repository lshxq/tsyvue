<template>
    <div>
        <div class="h1">弹出框 sy-dialog</div>

        <m-viewer :markdown='c1'/>

        <div class="button primary mt20" @click="visible = true">显示弹框</div>

        <sy-dialog v-model:visible="visible" title="弹出窗口" width="60%" >
            <div class="panel">
                <m-viewer :markdown='c2'/>
            </div>
        </sy-dialog>

    </div>
      

</template>


<script>
export default {
    data() {
        return {
            c1:`弹出一个模态窗体，通过默认的slot传入需要在窗体内显示的内容。

|props|值|说明|
|-|-|-|
|width|String|窗体的宽度，比如790px, 或60%|
|height|String|通常情况下，dialog可以自动识别内容高度，从而决定对话框高度，但是有些时候，比如内容中包含图片，图片都是异步加载的，会导致无法第一时间确定内容高度，可以通过height属性设置dialog的高度|
|title|String|窗体的标题|
|v-model:visible|Boolean default false|是否显示弹窗|
            `,
            c2: `
\`\`\`html
<template>
<button @click='visible=true'>显示弹框<button>

<sy-dialog v-model:visible="visible" title="弹出窗口" width="790px">
    <div class="panel">
        这个div就是我们要在弹框里显示额内容。可以通过设置这个div的样式, 决定弹框的高度
    </div>
</sy-dialog>
</template>
\`\`\`

\`\`\`javascript

export default {
    data() {
        return {
            visible: false
        }
    }
}

\`\`\`
`,
            visible:false,
        }
    }
}
</script>

<style scoped>
</style>