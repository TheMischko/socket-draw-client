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
import { notify } from '@/notification';
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
    
    const parsedRes = await res.json();
    console.log(parsedRes);

    if(parsedRes.status === "error"){
        switch (parsedRes.err_key){
            case "WRNG_ARG": {
                notify("You didn't fill all the inputs.", "danger"); 
                return;}
            case "PSW_SHORT": {
                notify("Your password is too short.", "danger"); 
                return;}
            case "MAIL_INVALID": {
                notify("Your email is not valid.", "danger"); 
                return;}
            case "USR_LGN_EXSTS": {
                notify("User with that login already exists.", "danger"); 
                return;}
            case "USR_MAIL_EXSTS": {
                notify("User with that email already exists.", "danger"); 
                return;}
        }
    }

    emit("tokenAcquired", parsedRes.token);
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