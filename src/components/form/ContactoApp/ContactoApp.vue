<template>
    <div>
        <section class="contacto" id="viewContacto">
            <div v-motion-slide-visible-left class="circle_background"></div>
            <div class="polilineasvg_contact">
                <!-- <polilineasvg/> -->
            </div>
            
            <div class="contacto_container">
             

                <div v-motion-slide-visible-left class="contacto_container_phone">
                    <div class="contacto_container_phone_header">
                        <div class="contacto_container_phone_header_container">
                            <div class="contacto_container_phone_header_container_picture">
                                <img src='/logo/logoNavbar.png' alt="logo tipin">
                            </div>

                            <div class="contacto_container_phone_header_container_info">
                                <h4>Tipin</h4>
                                <h5>Estamos disponibles</h5>
                            </div>
                                <button class="contacto_container_phone_header_container_trash" :style="conversation.length > 1 ? 'opacity: 1' : 'opacity: 0.5'" :disabled="conversation.length <= 1" @click="resetConversation"> <img src="/icons/trash.png" alt="icontipin"></button>
                        </div>
                    </div>
                    <div ref="phone_content" id="phone_content" class="contacto_container_phone_body">
                        <BaseSteep v-for="(question, index) in conversation" :key="index" :question="question"
                            :error="stateInput.error" />
                    </div>

                    <div class="contacto_container_phone_footer">
                        <form :class="stylesendMessage">
                            <BaseInput label="escribe tu mensaje..." :type="stateInput.type"
                                v-model.trim="stateInput.message" />
                            <button @click.prevent="send" type="submit" :disabled="stateInput.message.length === 0 || Loading === true">
                                Enviar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script setup>
import { reactive, provide, ref, nextTick,inject, computed } from 'vue';
import BaseInput from '@/components/form/base/BaseInput.vue'
import BaseSteep from '@/components/form/ContactoApp/BaseSteep.vue';
import useContactUs from '@/hooks/useContactUs';

/**
 * representa el contenido del div que contiene la conversacion
 */
const phone_content = ref(null)
/**
 *  Este dato contendrá lo que escriba el cliente para luego pasarlo al dato que contendrá los datos de cliente
 * @typedef {Object} stateInput
 * @property {Number} steep sirve para ubicarnos dentro de la conversacion 
 * @property {String} message contiene el valor que escribe el cliente dentro del input
 */
const stateInput = reactive({
    type: 'text',
    steep: 0,
    message: '',
});


/**
 *  Message seria la informacion completa del cliente que luego será enviada por correo
 * @type {Object}
 */
const message = reactive({
    name: 'cliente',
    email: '',
    message: ''
});

provide('message', message);

const {notification} = inject('authUser');
const Loading = ref(false);
const stylesendMessage = computed(()=> Loading.value ? 'contacto_container_phone_footer_content active' : 'contacto_container_phone_footer_content');

/**
 * Expresiones reegulares que servirán para la comparacion
 */
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    // telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

/**
 *  En conversation se iran almacenando dentro de objetos los mensajes de tipin y del cliente que a su vez se estaran iterando en el html
 * @type {Array<Object>}
 */
let conversation = ref([{ question: "Hola, ¿Cuál es tu nombre?", res: '' }]);

const resetConversation = ()=>{
  
    stateInput.steep = 0;
    stateInput.message = ''
    conversation.value = [{ question: "Hola, ¿Cuál es tu nombre?", res: '' }]
}

/**
 * funcion que compara las expresiones regulares con los mensajes del cliente que se le iran enviando como parametro
 */
const validateInput = (expresion, input, campo) => {
    if (!expresion.test(input)) return false
    return true
}

//Funcion que baja el scroll de la conversacion hasta el final
const scrollToBottom = async () => {
    const container = phone_content.value //representa el contenido del div que contiene la conversacion
    await nextTick(() => {
        container.scrollTop = container.scrollHeight + 120
    })
}

/**
 * funcion que agrega los mensajes como un objeto dentro del array conversation.value
 * @param {String} errorMsg este parametro contiene el error que será agregado a la conversacion si el cliente se equivoca
 */
const pushMessage = (errorMsg) => {

    const questionMessages = {
        '1': `¡Mucho gusto ${message.name}! Ahora indícanos tu correo`,
        '2': `perfecto, ahora dinos, ¿cuál es tu consulta?`,
        '3': `ok, estos son tus datos nombre: ${message.name}. \n
                    correo: ${message.email}. \n
                    ¿está de acuerdo con su solicitud?
                    responda con si o no`,
        '4': 'Perfecto, su consulta se ha enviado'
    }

    // se busca un objeto en especifico del array conversation.value para agregarle en su propiedad .res la respuesta del cliente
    conversation.value[conversation.value.length - 1].res = stateInput.message;

    stateInput.message = '';

    //se agrega un nuevo objeto con el mensaje de tipin y el .res debe ir vacio para agregarse luego
    conversation.value.push({ question: errorMsg ? errorMsg : questionMessages[stateInput.steep], res: '' })

    //una vez agregado el mensaje se ejecuta scrollBottom para bajar el scroll
    scrollToBottom();
}

const incrementStep = () => {
    stateInput.steep += 1;
    pushMessage()
}

const decrementStep = () => {
    stateInput.steep -= 1;
    pushMessage()
}

const sendMsg = async(props = {}) => {
    //console.log("paso numero: ", stateInput.steep)
    if (stateInput.steep === 3) {
        Loading.value = true;
      //  console.log('paso valido');
        try {
            const response = await useContactUs.SendConsult(message);
      //      console.log("respuesta del contactUs: ", response);
            notification.text = response.data.message;
            notification.status = response.status;
            resetConversation();

        } catch (error) {
          //  console.log(error);
            if(error.response.status == 422){
                notification.text = 'datos invalidos';
                notification.status = error.response.status;
            }
        }
        Loading.value = false;
        return
    }
    if (props.state) {
        message[props.state] = stateInput.message;
    }
    incrementStep()
}

const send = () => {

    const response = {
        "0": () => validateInput(expresiones.nombre, stateInput.message) ? sendMsg({ state: "name" }) : pushMessage("Intenta usar un nombre valido."),
        "1": () => validateInput(expresiones.correo, stateInput.message) ? sendMsg({ state: "email" }) : pushMessage("Por favor, envia un correo valido."),
        "2": () => stateInput.message.length >= 10 ? sendMsg({ state: "message" }) : pushMessage("La consulta debe ser mayor a 10 caracteres."),
        "3": () => {
            if (stateInput.message.toLowerCase() === ('si')) {
               // console.log("respondio con un sii")
                return sendMsg()
            }
            if (stateInput.message.toLowerCase() === ('no')) {
                return decrementStep()
            }

            return pushMessage('Debe ser si o no.')
        },
        "4": () => pushMessage('Su solicitud ya ha sido enviada')
    }

    return response[stateInput.steep]();
}



</script>
<style lang="scss" scoped>


.contacto_container_phone_header_container_trash{
    width: 26px;
    height: 26px;
    background: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    opacity: 0.6;
    img{
        max-width: 100%;
        max-height: 100%;
    }
}

.wifisvginfinity{
    svg{
    width: 65px !important;
    height: 65px !important;
  }
}
.circle_background{
    position: absolute;
    bottom: -165px;
    left: -100px;
    width: 585px;
    height: 585px;
    border-radius: 50%;
    z-index: 1;
    background: map-get($colores , 'gradientePrincipal');
    @media(max-width: 400px){
        bottom: -382px;
    }
}

.polilineasvg_contact{
    position: absolute;
    right: 10px;
    bottom: 10px;
    transform: rotate(-45deg);
     svg{
        width: 206px !important;
    height: 200px !important;
    }
    @media(max-width: 800px){
        display: none;
    }
}


.wifisvginfinity{
    position: absolute;
    top: -25px;
    @media(max-width:1075px){
            position: absolute;
    top: -24px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    }
    @media(max-width: 500px){
        top: -35px;
    }
}
.contacto {
    position: relative;
    // min-height: 100vh;
    height: auto;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 40px 0 100px;
    // overflow: hidden;
    // background: map-get($colores , "alternoSecundario");
    // &:before {
    // content: "";
    // position: absolute;
    // bottom: -100px;
    // right: -100px;
    // width: 300px;
    // height: 300px;
    // border-radius: 50%;
    // z-index: 1;
    // background: linear-gradient(to top, #2897D5, #75C6C3);
    // }
}

.contacto_container_description p a{
    color: #25D366;
    font-weight: $fontWeight-md;
    font-size: $spanWidth;
    text-decoration: none;
    cursor: pointer;
    &:hover{
        color: #25d365ae;

    }
}

// .svgPolilinea{
//     z-index: 10;
//     position: absolute;
//     right: 152px;
//     transform: rotate(45deg);
//     top: -55px;
//     svg{ 
//         width: 300px !important;
//         height: 300px !important;
//     }

// }

.contacto_container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row-reverse;
    gap: 40px;
    max-width: 1200px;
    width: 75%;

    @media(max-width: 1075px) {
        flex-direction: column;
        align-items: center;
    }

    @media(max-width: 650px) {
        width: 100%;
        flex-direction: column;
        //  margin: 0 1rem;
        align-items: center;
        //  margin-top: 5rem;
    }
}

.contacto_container_phone {
    // width: 390px;
    // height: 700px;
    // padding: 40px 10px 0px;
    // display: flex;
    // flex-direction: column;
    // border-radius: 18px;
    // background: green;

    position: relative;
    z-index: 20 !important;
    max-width: 325px;
    width: 100%;
    border: 12px solid white;
    border-radius: 40px;
    box-shadow: 2px 2px 15px rgb(0 0 0 / 30%);
    background: hsl(270deg, 20%, 96%);
    overflow: hidden;

    @media(max-width:400px) {
        width: 95%;
        box-shadow: 2px 2px 15px rgb(0 0 0 / 20%);
    }
}

.contacto_container_phone_header {
    // background: linear-gradient(to left, #F05677, hsl(21deg 100% 79%));
    //background: map-get($colores , "principal" );
    // background: linear-gradient(to right, #2897D5, #75C6C3);
    background: map-get($colores , "secundario");
    border-radius: 30px 30px 5px 5px;
    display: flex;
    align-items: flex-end;
    height: 100px;
    padding-bottom: 1rem;
    color: white;
    position: relative;
    box-shadow: 2px 0px 7px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;

    &::before {
        content: "";
        top: 0;
        left: 50%;
        transform: translate(-50%, -40%);
        border-radius: 15px;
        position: absolute;
        background: white;
        width: 200px;
        height: 40px;
    }
}

.contacto_container_phone_header_container {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 0 1rem;


}

.contacto_container_phone_header_container_picture {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 42px;
    height: 42px;
    padding: 2px;
    border-radius: 50%;
    border: 1px solid #efefefe0;

    img {
        //margin: 0 auto;
        width: 32px;
        height: 22px;
    }
}

.contacto_container_phone_header_container_info {
    width: 60%;
    margin-right: auto;
}

.contacto_container_phone_body {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 40px 13px 0px;
    height: 450px;
    overflow-y: scroll;
    overflow-x: hidden;

    @media(max-width:400px) {
        height: 370px;
    }
}

.contacto_container_phone_footer {
    position: relative;
    height: 70px;
    display: flex;
    align-items: center;
    /* margin: 0 0.75rem 0.5rem 0.75rem; */
    background: white;
    border-radius: 15px 15px 0px 0px;
}

.contacto_container_phone_footer_content.active {
    
    &::before{
        content: 'Cargando...';
        color: white;
        width: 92%;
        transition: .4s;
    }
}

.contacto_container_phone_footer_content {
    position: relative;
    color: rgba(153, 153, 153, 0.61);
    font-size: 0.8em;
    padding: 5px;
    margin: 0 auto;
    height: auto;
    width: 100%;
    display: flex;
    justify-content: flex-start;
   

    // gap: 20px;
    @media(max-width: 752px) {
        padding: 5px;
    }
    &::before{
    content: "";
    position: absolute;
    right: 20px;
    width: 0%;
    height: 84%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #F05677;
    border-radius: 20px;
    z-index: 100;
    font-size: 17px;
    font-family: $font-principal;
    font-weight: 400;
    line-height: 23.71px;
    transition: .3s;
    color: transparent;
        }

    input {
        font-size: $spanWidth;
        width: 80%;
        background: hsl(270deg, 20%, 96%);
        border-radius: 20px 0px 0px 20px;
    }

    button {
        width: 25%;
        border: none;
        border-radius: 0px 20px 20px 0px;
        font-size: $fontSize-textSm;
        font-family: $font-principal;
        font-weight: $fontWeight-lg;
        line-height: 53px;
        text-transform: uppercase;
        color: map-get($colores , "alterno");
        transition: .3s ease;
        cursor: pointer;
        background: map-get($colores, "secundario");
        &:hover {
            font-size: 12px;
            background: map-get($colores , "principal");

            transition: .1s ease;
        }
    }
}


.contacto_container_description {
    position: relative;
    height: 200px;
    width: 45%;
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: start;
    background: map-get($colores , 'alterno' );
    border-radius: 40px 40px 40px 0px;
    box-shadow: 4px 4px 4px 1px rgb(0 0 0 / 10%);
    z-index: 10;
    

    h2 {
        text-transform: uppercase;
        color: map-get($colores , "principal");
    }

    @media(max-width: 1075px) {
        width: 55%;
        text-align: center;
    }

    @media(max-width: 900px) {
        width: 55%;
        text-align: center;
        align-items: center;
        //   margin-top: 5rem;
        //  margin-bottom: 5rem;
    }

    @media(max-width: 700px) {
        width: 90%;
    }

}


// .contacto_bodytitle{
//     width: 50%;
//     margin: 0 auto;
// }

// .contacto_bodytitle_title{
//     color: map-get($colores , "principal" );
//     text-align: center;
//     text-transform: uppercase;
// }

// form{

// }

// .contacto_bodyForm_form_borde{
//     position: relative;
//     min-width: 48%;
//     height: auto;
//     border-radius: 11px;
//     padding: 2px;
//     background: linear-gradient(to right, #2897D5, #75C6C3);
//     @media(max-width: 902px){
//     width: 100% !important;
//     }
//         &:nth-child(3){
//             width: 70%;

//         }
// }

input {
    // width: 100%;
    // height: 98%;
    outline: none;
    border: solid 1px transparent;
    padding: 10px 20px !important;
    font-weight: 200;
    // font-size: 20px;
    // line-height: 29px;
    // border-radius: 11px;
    font-family: $font-principal;
    z-index: 1;

    &:focus {
        border-color: none;
    }
}

// textarea{
//     resize: vertical;
// }

// .contacto_bodyForm_form_button{
//     width: 25%;
//     background: #F05677;
//     border: none;
//     border-radius: 9px;
//     background: map-get($colores , "principal" );
//     font-size: $fontSize-titulo;
//     font-family: $font-principal;
//     font-weight: $fontWeight-lg;
//     line-height:53px;
//     text-transform: uppercase;
//     color: map-get($colores , "alterno");
//     transition: .3s ease;
//     cursor: pointer;
//     z-index: 2;
//     @media(max-width: 902px){
//         width: 100% !important;
//     }
//     &:hover{
//         background: map-get($colores , "secundario");
//         transform: scale(.98);
//     }
// }


.contacto_container_phone_body {
    scrollbar-color: rgba(129, 129, 129, 0.514);
    scrollbar-width: 8px;
}

.contacto_container_phone_body::-webkit-scrollbar {
    width: 4px;
}

/* Estilos barra (thumb) de scroll */
/* color del scrollbar */
// .contacto_container_phone_body::-webkit-scrollbar-thumb {
//     background: map-get($colores , "principal");
//   border-radius: 15px;
//     //animation: animatescroll 1s ease-in-out infinite;
// }

// /* fondo del scroll */
// .contacto_container_phone_body::-webkit-scrollbar-track {
//     background: rgba(0,0,0,.1);
//    // filter: blur(10px);
// }
</style>