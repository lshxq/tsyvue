<template>
    

    <m-viewer :markdown='buttonDesc'/>

    <div class="mt20">
        <sy-button @click="handleButtonClick('default button clicked')">default</sy-button>
        <sy-button @click="handleButtonClick('primary button clicked')" type='primary'>primary</sy-button>
        <sy-button @click="handleButtonClick('success button clicked')" type='success'>success</sy-button>
        <sy-button @click="handleButtonClick('warning button clicked')" type='warning'>warning</sy-button>
        <sy-button @click="handleButtonClick('danger button clicked')" type='danger'>danger</sy-button>
    </div>

    <m-viewer :markdown='buttonDisabledDesc' class="mt20"/>

    <div class="mt20">
        <sy-button @click="handleButtonClick('default button clicked')" disabled>default</sy-button>
        <sy-button @click="handleButtonClick('primary button clicked')" type='primary' disabled>primary</sy-button>
        <sy-button @click="handleButtonClick('success button clicked')" type='success' disabled>success</sy-button>
        <sy-button @click="handleButtonClick('warning button clicked')" type='warning' disabled>warning</sy-button>
        <sy-button @click="handleButtonClick('danger button clicked')" type='danger' disabled>danger</sy-button>
    </div>

    <m-viewer :markdown='desc' class="mt20"/>


</template>

<script setup>

function handleButtonClick(param) {

    alert(param)
}

const desc =`
# Props
|props|值|说明|
|-|-|-|
|type|String default 'normal'|按钮的类型。normal：普通按钮； primary：主按钮； success：成功按钮； warning：警告按钮； danger：危险按钮； |
|disabled|Boolean default false|按钮禁用，禁止响应点击事件|
`

const buttonDesc = `
\`\`\`html
<sy-button @click="handleButtonClick('default button clicked')">default</sy-button>

<sy-button @click="handleButtonClick('type='primary' button clicked')" type='primary'>primary</sy-button>

<sy-button @click="handleButtonClick('type='success' button clicked')" type='success'>success</sy-button>

<sy-button @click="handleButtonClick('warning button clicked')" type='warning'>warning</sy-button>

<sy-button @click="handleButtonClick('type='danger' button clicked')" type='danger'>danger</sy-button>

\`\`\`
`

const buttonDisabledDesc = `
\`\`\`html
<sy-button @click="handleButtonClick('won't work')" disabled>default</sy-button>

<sy-button @click="handleButtonClick('won't work')" type='primary' disabled>primary</sy-button>

<sy-button @click="handleButtonClick('won't work')" type='success' disabled>success</sy-button>

<sy-button @click="handleButtonClick('won't work')" type='warning' disabled>warning</sy-button>

<sy-button @click="handleButtonClick('won't work')" type='danger' disabled>danger</sy-button>

\`\`\``
</script>