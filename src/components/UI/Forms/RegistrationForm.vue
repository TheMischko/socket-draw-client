<template>
    <form>
        <BaseInput  v-model="newUser.login"
                    label="Your login name"
                    @change="valuesChanged" />
        <BaseInput  v-model="newUser.password"
                    label="Your password"
                    type="password"
                    @change="valuesChanged" />
        <BaseInput  v-model="newUser.email"
                    label="Your email address"
                    type="email"
                    @change="valuesChanged"/>
    </form>
</template>

<script setup>
import BaseInput from './BaseInput';
import { defineEmits } from 'vue';

const newUser = {
    login: "",
    password: "",
    email: ""
}
// eslint-disable-next-line
const emits = defineEmits(["valuesChanged"]);
// eslint-disable-next-line
const valuesChanged = () => {
    emits("valuesChanged", newUser);
}
</script>
