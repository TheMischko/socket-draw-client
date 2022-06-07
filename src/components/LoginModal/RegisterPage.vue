<template>
    <div>
        <p>Fill up all the necessary information and register.</p>
        <RegistrationForm @values-changed="(user) => userInfo = user" @keydown="(e) => e.key === 'Enter' ? onRegisterButtonClick() : ''"/>
        <button class="back-button" @click="$emit('changePage', 'loginPage')">Back on Login page!</button>
        <button class="register-button" @click="onRegisterButtonClick">Register me!</button>
    </div>
</template>

<script setup>
import RegistrationForm from '../UI/Forms/RegistrationForm';
import { defineEmits, ref } from 'vue';
import config from '@/config';
// eslint-disable-next-line
const emit = defineEmits(['changePage', 'tokenAcquired']);
// eslint-disable-next-line
let userInfo = ref({});

const onRegisterButtonClick = async () => {
    const res = await fetch(`http://${config.hostAddress}/users/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: userInfo.value.login,
            password: userInfo.value.password,
            email: userInfo.value.email
        })
    });

    if(!res.ok) console.error(`${res.status} - ${res.statusText}`);

    const {token} = await res.json();
    emit("tokenAcquired", token);
}
</script>

<style scoped>
.register-button{
    background-color: blueviolet;
    color: white;
    width: 250px;
}
.back-button{
    background-color: coral;
    color: white;
    width: 250px;
}
</style>