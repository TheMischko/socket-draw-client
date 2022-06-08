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
import { notify } from '@/notification';
// eslint-disable-next-line
const emit = defineEmits(['changePage', 'tokenAcquired']);
// eslint-disable-next-line
let userInfo = ref({});

const onLoginButtonClick = async () => {
    if(!userInfo.value.login){
        notify("You didn't fill up login input.", "danger")
        return;
    }
    if(!userInfo.value.password){
        notify("You didn't fill up password input.", "danger")
        return;
    }
    try{
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

        const parsedResponse = await res.json();
        if(parsedResponse.status === "error"){
            if(parsedResponse.err_key === "WRNG_PSW"){
                notify("You entered wrong password", "danger");
            } else if(parsedResponse.err_key === "WRNG_LOGIN"){
                notify("User with that login couldn't be found.", "danger");
            } else if(parsedResponse.err_key === "WRNG_ARG"){
                notify("You didn't fill up all the inputs.", "danger");
            }
            return;
        }
        notify("You have been logged in.", "primary");
        emit("tokenAcquired", parsedResponse.token);

    } catch(err) {
        notify("Connection lost during logging in.", "danger");
    }
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