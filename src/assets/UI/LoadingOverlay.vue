<template>
    <div v-if="props.show" id="loading-overlay">
        <div class="row-wrapper">
            <div v-for="(char, index) of Array.from(text)" :key="index" :class="['loading-char', index === active ? 'active' : '']">{{char}}</div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref, watch } from 'vue';

const props = defineProps({
    show: Boolean
});

const active = ref(0);

const text = "Loading app";

const loadingAnimInterval = setInterval(() => {
    active.value = (active.value + 1) % text.length;
}, 500);

watch(
    () => props.show,
    (newVal) => {
        if(newVal == false)
            clearInterval(loadingAnimInterval);
    }
)

</script>

<style scoped>
#loading-overlay{
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99999;
    background: rgb(192, 224, 255);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.row-wrapper{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.loading-char{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px;
    width: 64px;
    height: 64px;

    font-family: 'Loveyou';
    font-size: 48px;
    transform: scale(1);
    transition: all 0.25s ease;
}
.loading-char.active{
    transform: scale(1.2);
}
</style>