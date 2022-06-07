<template>
    <form>
        <BaseInput  v-model="user.login"
                    label="Login"
                    type="text"
                    @change="valuesChanged" />

        <BaseInput  v-model="user.password"
                    label="Password"
                    type="password" 
                    @change="valuesChanged"/>
    </form>
</template>

<script setup>
import BaseInput from './BaseInput';
import { defineEmits } from 'vue';

const user = {
    login: "",
    password: ""
};

// eslint-disable-next-line
const emits = defineEmits(["valuesChanged"]);
// eslint-disable-next-line
const valuesChanged = () => {
    emits("valuesChanged", user);
};
</script>