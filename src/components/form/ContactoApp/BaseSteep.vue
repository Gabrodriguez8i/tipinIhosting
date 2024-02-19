<template>
    <div class="contacto_container_phone_body_steep">
        <div v-motion-slide-left class="contacto_container_phone_body_message message_bot">
            <h6 class="contacto_container_phone_body_message_user">tipin</h6>
            <p>{{ question.question }}</p>
        </div>
        <div v-motion-slide-right v-if="question.res != ''" class="contacto_container_phone_body_message message_client">
            <h6 class="contacto_container_phone_body_message_user">{{ message.name }}</h6>
            <p>{{ question.res }}</p>
        </div>
    </div>
</template>
<script>
import { inject } from 'vue';

export default {
    props: {
        question: {
            type: Object,
            default: '',
        },
        error: {
            type: Boolean,
            default: false,
        }
    },
    setup(props) {
        const message = inject('message');

        return { message }
    }
}



</script>

<style lang="scss">
.contacto_container_phone_body_steep {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 26px;
    align-items: flex-end;
}

.contacto_container_phone_body_message {
    position: relative;
    display: flex;
    align-items: center;
    width: 70%;
    border-radius: 14px;
    padding: 0.75rem;
    font-size: 0.6rem;
    margin-bottom: 0.75rem;
    word-break: break-word;//para que no sobresalga el texto
    p{ 
        word-wrap: break-word; 
    }
}

.message_bot {
    border-bottom-left-radius: 5px;
    margin-right: auto;
    color: #ede5f4;
    background: #F05677;
}

.message_client {
    border-bottom-right-radius: 5px;
    background: white;
    color: map-get($colores, "secundario");
}

.contacto_container_phone_body_message_user {
    position: absolute;
    opacity: 0.8;
    top: -22px;
    color: map-get($colores, "secundario");
}
</style>