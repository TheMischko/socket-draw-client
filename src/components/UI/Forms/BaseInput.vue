<template>
    <label>
        {{ label }}
    </label>
    <input  :placeholder="label"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            v-bind="$attrs"/>
</template>

<script setup>
import { defineProps } from 'vue';
// eslint-disable-next-line
const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    modelValue: {
        type: [String, Number],
        default: ''
    }
});
</script>

<style scoped>
label{
    display: block;

    font-family: Bebas;
    font-size: 24px;
}
input{
    box-shadow: 5px 5px black;
    border: 2px solid black;

    background: white;
    padding: 0.25em;
    margin-bottom: 0.5em;

    font-size: 20px;
}
</style>
