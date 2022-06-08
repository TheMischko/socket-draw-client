<template>
    <ModalComponent :is-modal-open="modalOpen" :classList="['login-modal']">
        <h1>Online Drawing</h1>
        <div v-if="activePage === 'loginPage'" class="content">
            <LoginPage @change-page="changePage" @token-acquired="tokenAcquired"/>
        </div>
        <div v-else class="content">
            <RegisterPage @change-page="changePage" @token-acquired="tokenAcquired"/>
        </div>
    </ModalComponent>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue';
import ModalComponent from '../UI/Modal/ModalComponent';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
// eslint-disable-next-line
const props = defineProps({
    modalOpen: Boolean
});
const activePage = ref("loginPage");
const emits = defineEmits(["accessTokenAcquired"]);

const changePage = (page) => {
    activePage.value = page;
}

const tokenAcquired = (token) => {
    emits("accessTokenAcquired", token);
}

</script>

<style lang="css">
    .login-modal{
        width: 800px;
        height: 600px;

        box-shadow: 9px 9px black;
        border: 4px solid black;

        background-color: #eae2b7;
    }
</style>