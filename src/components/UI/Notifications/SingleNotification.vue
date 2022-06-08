<template>
    <div ref="notificationElement" :class="['notification', type, deleteAnim ? 'deleteAnimation' : '']">
        <div class="content">{{text}}</div>
        <button @click="deleteHandler">&times;</button>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits} from 'vue';
// eslint-disable-next-line
const props = defineProps({
    text: String,
    type: {
        type: String,
        default: "primary"
    },
    id: Number
});
// eslint-disable-next-line
const emits = defineEmits(["remove"])
const deleteAnim = ref(false);

const deleteHandler = () => {
    deleteAnim.value = true;
    emits("remove", props.id);
}

setTimeout(() => deleteHandler(), 3000);
</script>

<style scoped>
.notification{
    width: 100%;
    height: 60px;
    box-shadow: 10px 10px black;
    border: 4px solid black;

    margin: 0.75em;
    padding: 0 0.5em;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    animation-name: showNotification;
    animation-duration: 0.25s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
}
.notification.deleteAnimation{
    animation-name: hideNotification;
    animation-duration: 0.25s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
}
.notification button{
    box-shadow: none;
    border: none;
    background: rgba(0,0,0,0.1);
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    transition: background-color, border-radius 0.2s ease;
}
.notification button:hover{
    background: rgba(0,0,0,0.2);
    border-radius: 0;
}
.primary{
    color: white;
    background-color:deepskyblue;
}
.primary button, .danger button{
    color: white;
}
.warning{
    color: black;
    background-color:gold;
}
.danger{
    color: white;
    background-color: crimson;
}

@keyframes showNotification {
    from{ 
        opacity: 0;
        transform: scale(0.7) rotateX(180deg);
    }
    to{
        opacity: 1;
        transform: scale(1) rotateX(180deg);;
    }

}
@keyframes hideNotification {
    from{
        opacity: 1;
        transform: scale(1) rotateX(180deg);;
    }
    to{ 
        opacity: 0;
        transform: scale(0.7) rotateX(180deg);
    }
    

}
</style>