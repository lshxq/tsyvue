<template>
    

    <m-viewer :markdown='linkDesc'/>

    <div class="mt20">
        <sy-link @click="handleButtonClick('default link clicked')">default</sy-link>
        <sy-link @click="handleButtonClick('primary link clicked')" type='primary'>primary</sy-link>
        <sy-link @click="handleButtonClick('success link clicked')" type='success'>success</sy-link>
        <sy-link @click="handleButtonClick('warning link clicked')" type='warning'>warning</sy-link>
        <sy-link @click="handleButtonClick('danger link clicked')" type='danger'>danger</sy-link>
    </div>

    <m-viewer :markdown='linkDisabledDesc' class="mt20"/>

    <div class="mt20">
        <sy-link @click="handleButtonClick('default link clicked')" disabled>default</sy-link>
        <sy-link @click="handleButtonClick('primary link clicked')" type='primary' disabled>primary</sy-link>
        <sy-link @click="handleButtonClick('success link clicked')" type='success' disabled>success</sy-link>
        <sy-link @click="handleButtonClick('warning link clicked')" type='warning' disabled>warning</sy-link>
        <sy-link @click="handleButtonClick('danger link clicked')" type='danger' disabled>danger</sy-link>
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

const linkDesc = `
\`\`\`html
<sy-link @click="handleButtonClick('default link clicked')">default</sy-link>

<sy-link @click="handleButtonClick('type='primary' link clicked')" type='primary'>primary</sy-link>

<sy-link @click="handleButtonClick('type='success' link clicked')" type='success'>success</sy-link>

<sy-link @click="handleButtonClick('warning link clicked')" type='warning'>warning</sy-link>

<sy-link @click="handleButtonClick('type='danger' link clicked')" type='danger'>danger</sy-link>

\`\`\`
`

const linkDisabledDesc = `
\`\`\`html
<sy-link @click="handleButtonClick('won't work')" disabled>default</sy-link>

<sy-link @click="handleButtonClick('won't work')" type='primary' disabled>primary</sy-link>

<sy-link @click="handleButtonClick('won't work')" type='success' disabled>success</sy-link>

<sy-link @click="handleButtonClick('won't work')" type='warning' disabled>warning</sy-link>

<sy-link @click="handleButtonClick('won't work')" type='danger' disabled>danger</sy-link>

\`\`\``
</script>