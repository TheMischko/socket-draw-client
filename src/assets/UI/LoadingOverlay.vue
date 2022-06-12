<template>
    <div v-if="props.show" id="loading-overlay">
        <h1>Loading...</h1>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    show: Boolean
});
</script>

<style scoped>
#loading-overlay{
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99999;
    background: rgba(255, 255, 255, 1);
}
</style>