<template>
    <div  :class="ifActiveNotification.notification">
      <div class="notification_content">
        <!-- <i class='check' :class="ifActiveNotification.check"></i> -->
        <img v-if="element.status === 200 || element.status === 201" src="/icons/check-green.png" alt="message-icon">
        <img v-if="element.status === 401 || element.status === 500 || element.status === 422" src="/icons/error.png" alt="message-icon">
        <img v-if="element.status === 2022" src="/icons/alert.png" alt="message-icon">
        <div class="notification_content_message">
          <span class="text text-1">{{ifActiveNotification.titulo}}</span>
            <!-- <span class="text text-1" v-if="e.status === 401 || e.status === 500 ">¡Petición fallida!</span> -->
          <span class="text text-2">{{element.text}}</span>
        </div>
      </div>

      <span class="notification_close" @click="()=>closeMessage()">
        <!-- <i class="fa fa-close " ></i> -->
        <img src="/icons/close-black.png" alt="close tipin">
      </span>
      <div :class="ifActiveNotification.progress"></div>
    </div>
</template>
<script>
import {computed, watch} from 'vue';
export default {
    props: {
        element:{
            type: Object,
            default: {text: '', status: null},
        }
    },
    setup(props){
        const closeMessage = ()=> {
          props.element.status = null;
          props.element.text ='';
        };

        //Detecta un cambio en el prop y luego de determinado tiempo ejecuta la funcion closeMessage para limpiar el prop
          watch(props.element, () => {
            setTimeout(() => {
            closeMessage();
          }, 10000);   
            
        })

        //retorna el color del mensaje dependiendo del status de la respuesta
     let colorMessage = computed(()=> props.element.status === 200 || props.element.status === 201 || props.element.status === 2022  ? '#2897D5' : 'red  ')  //ref('#4070f4');

      const ifActiveNotification = computed(()=>{
        if(props.element.status === 200 || props.element.status === 201 ){
          return{
            notification: "notification",
            titulo: "Petición exitosa",
            progress: "notification_progress active", 
            ///color: "#4070f4"

          }
        }
        else if(props.element.status === 401 || props.element.status === 500 || props.element.status === 422 || props.element.status === 499){
          return{
            notification: "notification notification_error",
            titulo: "¡Petición fallida!",
            progress: "notification_progress active"
          }
        }
          else if(props.element.status === 2022){
            return{
              notification: "notification",
              progress: "notification_progress active", 
              titulo: "¡Ups! error en la sesión",
            }
          }
        else{
          return{
            notification: "notification notification_hidden",
            titulo: "Petición"
          }
        }

      });

     return{
        closeMessage, ifActiveNotification, colorMessage
     }
    }
}
</script>
<style lang="scss" scoped>

.notification_hidden{
  transform: translateX(calc(100% + 35px)) !important;
  opacity: 0.04 !important;
  transition: .2s;
}
    
.notification{
  position: fixed;
  top: 45px;
    right: 35px;
    border-radius: 12px;
    background: rgb(250, 250, 250);
    padding: 20px 35px 20px 25px;
    box-shadow: 0 5px 10px rgb(0 0 0 / 10%);
    border-left: 6px solid #2897D5;
    width: 260px;
    height: auto;
    min-height: 84px;
    z-index: 2000;
    overflow: hidden;
    opacity: 1;
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.35);
    transform: translateX(0%);
    transition: all 0.2s;

    @media(max-width: 300px){
      right: 10px;
    }

}

.notification_error{
    opacity: 1;
    border-left:  6px solid red;
}
.notification_content{
  display: flex;
  align-items: center;
  gap: 8px;
  img{
    max-width: 24px;
    max-height: 24px;
  }
}

.notification_content .check{
  display: flex;
  align-items: center;
  justify-content: center;
height: 35px;
    width: 35px;
  background-color: v-bind(colorMessage);
  color: map-get($colores , 'alterno' );
  font-size: 20px;
  border-radius: 50%;
}

.notification_content .notification_content_message{
display: flex;
    flex-direction: column;
    margin: 0 10px;
    color: #241F4B;
    width: 90%;
 // align-items: center;
}

.text{
  color: map-get($colores , 'secundario');
  font-weight: 400;
  font-size: 14px;
}

.text.text-1{
  font-weight: 600;
  //color: #3333;
}


.notification_close{
  position: absolute;
  top: 10px;
  right: 15px;
  padding: 5px;
  cursor: pointer;
  opacity: 0.5;
  &:hover{
    opacity: 0.7;
  }
  img{
    max-width: 15px;
    max-height: 15px;
  }
}

.notification_progress{
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
  background: #ddd;
  &::before{
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background-color: v-bind(colorMessage);
  }
}
// .notification_progress.error::before{
//   background-color: red;
// }
.notification_progress.active:before{
  animation: progress 10s linear forwards;
}

@keyframes progress {
  100%{
    right: 100%;
  }
}

</style>