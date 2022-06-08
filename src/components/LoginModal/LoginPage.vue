<template>
    <div>
        <p>In order to draw you have to login first.</p>
        <LoginForm ref="loginform" @values-changed="(info) => userInfo = info" @keydown="(e) => e.key === 'Enter' ? onLoginButtonClick() : ''"/>
        <div class="button-wrapper">
            <button class="register-button" @click="$emit('changePage', 'registerPage')">Don't have an account? Register now!</button>
            <button class="login-button" @click="onLoginButtonClick">Log in!</button>
        </div>
    </div>
</template>

<script setup>
import { defineEmits,  ref } from 'vue';
import LoginForm from '../UI/Forms/LoginForm';
import config from '@/config';
// eslint-disable-next-line
const emit = defineEmits(['changePage', 'tokenAcquired']);
// eslint-disable-next-line
let userInfo = ref({});

const onLoginButtonClick = async () => {
    const res = await fetch(`http://${config.hostAddress}/users/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: userInfo.value.login,
            password: userInfo.value.password,
        })
    });

    if(!res.ok) console.error(`${res.status} - ${res.statusText}`);

    const {token} = await res.json();
    emit("tokenAcquired", token);
}

</script>

<style scoped>
.login-page-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.button-wrapper{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.login-button{
    background-color:forestgreen;
    color: white;
    width: 250px;
    height: 80px;
}
.register-button{
    background-color:mediumblue;
    color: white;
    width: 250px;
    height: 80px;
}
</style>