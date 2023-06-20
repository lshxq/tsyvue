<template>
    <div class="example-easy-ditu">
        <sy-easy-ditu access-key="n3fPB3RqcWncf5KCHNDG2Kb1GhrQnWro" :center="center" :markers="markers"></sy-easy-ditu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            center: {
                longitude: 116.404,
                latitude: 39.915
            },
            markers: [{
                longitude: 116.404,
                latitude: 39.915
            }]
        }
    }
}
</script>

<style scoped>
.example-easy-ditu {
    height: 600px;
    width: 100%;
    border: 1px solid gray;
}
</style>