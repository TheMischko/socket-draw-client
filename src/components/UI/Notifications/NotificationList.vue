<template>
    <div class="notification-list">
        <SingleNotification v-for="(notification, index) in notifications" 
            :key="notification.text.trim()" 
            :text="notification.text" 
            :type="notification.type" 
            :id="index" 
            @remove="deleteHandler"/>
    </div>
</template>

<script setup>
import SingleNotification from './SingleNotification';
import { reactive } from '@vue/reactivity';

let notifications = reactive([]);

const deleteHandler = (id) => {
    setTimeout(() => {
        notifications.splice(id, 1);
    }, 250)
}

document.addEventListener("pushNotification", (e) => {
    try{
        notifications.push(e.detail);
    } catch(err) {
        console.error("Wrong data with pushNotificationEvent");
    }
});

</script>

<style scoped>
.notification-list{
    position: absolute;
    z-index: 9999;
    height: auto;
    width: 300px;
    bottom: 0;
    left: 50%;
    transform: rotateX(180deg);
}

</style>