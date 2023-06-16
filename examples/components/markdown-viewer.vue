<template>
<div class="markdown-viewer-main">
    <mavon-editor class='mavon-view-panel'
        :model-value='markdown' 
        :editable='false'
        :toolbarsFlag='false'
        :subfield='false'
        :boxShadow='false'
        default-open="preview"
        previewBackground='white'></mavon-editor>
</div>
    
</template>

<script>

import {mavonEditor} from 'mavon-editor';

export default {
    props: {
        markdown: String
    },
    components: {
        mavonEditor
    }
}
</script>