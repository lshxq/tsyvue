<template>
    <m-viewer :markdown='buttonDesc'/>

    <div class="mt20">
        <sy-button @click="buttonClicked('default button clicked')">default</sy-button>
        <sy-button @click="buttonClicked('primary button clicked')" primary>primary</sy-button>
        <sy-button @click="buttonClicked('success button clicked')" success>success</sy-button>
        <sy-button @click="buttonClicked('danger button clicked')" danger>danger</sy-button>
    </div>

</template>

<script setup>

function buttonClicked(param) {
    alert(param)
}

const buttonDesc = `
\`\`\`html
<sy-button @click="buttonClicked('default button clicked')">default</sy-button>

<sy-button @click="buttonClicked('primary button clicked')" primary>primary</sy-button>

<sy-button @click="buttonClicked('success button clicked')" success>success</sy-button>

<sy-button @click="buttonClicked('danger button clicked')" danger>danger</sy-button>

\`\`\`
`
</script>