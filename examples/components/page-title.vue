<template>
<template v-if="route.meta && route.meta.label && route.meta.label.trim().length > 0">
    <h1>{{route.meta.label}}</h1>
    <hr class="mb20"/>
</template>

</template>

<script setup>

import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<style scoped>
h1 {
    color: orange;
}
</style>