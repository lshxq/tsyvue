<template>
    <div>
       

        <m-viewer :markdown='c1' class="mb20"/>

        <sy-button @click="visible = true">默认窗体</sy-button>
        <sy-button @click="customizedHeaderVisible = true">自定义Header</sy-button>
        <sy-button @click="customizedFooterVisible = true">自定义Footer</sy-button>
        
        <sy-dialog v-model:visible="visible" title="弹出窗口" width="60%" >
            <div class="panel">
                <m-viewer :markdown='desc'/>
            </div>
        </sy-dialog>

        <sy-dialog v-model:visible="customizedHeaderVisible" title="弹出窗口" width="60%" >
            <div class="panel">
                <m-viewer :markdown='customizedYHeaderDesc'/>
            </div>
            <template v-slot:header>
                <div>Customized header</div>
            </template>
        </sy-dialog>

        <sy-dialog v-model:visible="customizedFooterVisible" title="弹出窗口" width="60%" >
            <div class="panel">
                <m-viewer :markdown='customizedFooterDesc'/>
            </div>
            <template v-slot:footer>
                <div class="footer">Customized footer</div>
            </template>
        </sy-dialog>

    </div>
      

</template>


<script>
export default {
    data() {
        return {
            c1:`弹出一个模态窗体，通过默认的slot传入需要在窗体内显示的内容。


# 参数 Props
|props|值|说明|
|-|-|-|
|width|String|窗体的宽度，比如790px, 或60%|
|height|String|通常情况下，dialog可以自动识别内容高度，从而决定对话框高度，但是有些时候，比如内容中包含图片，图片都是异步加载的，会导致无法第一时间确定内容高度，可以通过height属性设置dialog的高度|
|title|String|窗体的标题|
|v-model:visible|Boolean default false|是否显示弹窗|



# 插槽 Slots
|slots|说明|
|-|-|
|default|dialog需要显示的内容，可以通过这个默认插槽传入|
|header|自定义头部，如果需要显示icon，或者更改默认的header的样式，可以不传入title，而使用命名插槽header来提供自定义的header|
|footer|通常情况下对话框会生成一个默认的footer，包含一个关闭按钮。如果有自定义的需求，可以利用命名插槽 footer 来提供自定义的footer。|
            `,
            desc: `
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
            customizedYHeaderDesc: `

\`\`\`html
<template>
<button @click='visible=true'>显示弹框<button>

<sy-dialog v-model:visible="visible" title="弹出窗口" width="790px">
    <div class="panel">
        命名插槽 header 的例子
    </div>
    <template v-slot:header>
        <div class="header">Customized header</div>
    </template>
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
            customizedFooterDesc: `

\`\`\`html
<template>
<button @click='visible=true'>显示弹框<button>

<sy-dialog v-model:visible="visible" title="弹出窗口" width="790px">
    <div class="panel">
        命名插槽 footer 的例子
    </div>
    <template v-slot:footer>
        <div class="footer">Customized footer</div>
    </template>
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
            visible: false,
            customizedHeaderVisible: false,
            customizedFooterVisible:false,
        }
    }
}
</script>

<style scoped>
.footer {
    padding: 10px;
}
</style>