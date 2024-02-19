<template>
     <div class="formApp">
        <div class="text">Contacto</div>
        <form @submit.prevent="sendMsg">
           <div class="form-row">
              <div class="input-data">
                 <input id="name" type="text" v-model="message.name" required>
                 <div class="underline"></div>
                 <label for="name">Nombre</label>
              </div>

           </div>
           <div class="form-row">
              <div class="input-data">
                 <input id="email" type="text" v-model="message.email" required>
                 <div class="underline"></div>
                 <label for="email">Email</label>
              </div>

           </div>
           <div class="form-row">
              <div class="input-data textarea">
                 <textarea id="mensaje" rows="8" cols="80" v-model="message.message" required></textarea>
                 <br />
                 <div class="underline"></div>
                 <label for="mensaje">Escribe tu mensaje</label>
                 <br />

              </div>
           </div>

           <div class="form-row ">
                <div class="input-data">
                    <input v-if="!loading" class="submit-btn" type="submit" value="Enviar">
                    <input v-else class="submit-btn" type="submit" value="Cargando..." disabled>

                </div>
            </div>
        </form>
     </div>
</template>

<script setup>
import useContactUs from '@/hooks/useContactUs';
import { reactive, ref ,inject,  } from 'vue';


const {notification} = inject('authUser');
const loading = ref(false);

/**
 *  Message seria la informacion completa del cliente que luego será enviada por correo
 * @type {Object}
 */
 const message = reactive({
    name: '',
    email: '',
    message: ''
});

/**
 * Expresiones reegulares que servirán para la comparacion
 */
 const expresiones = {
    name: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras y espacios, pueden llevar acentos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    // telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}


/**
 * funcion que compara las expresiones regulares con los mensajes del cliente que se le iran enviando como parametro
 */
 const validateInput = (expresion, input, campo) => {
    if (!expresion.test(input)) return false
    return true
}


// const validateInputs = ()=>{
//     if( !validateInput(expresiones.name, message.name) || !validateInput(expresiones.email, message.email)  ) return false
// }

const sendMsg = async() => {
        loading.value = true;
        try {
            if( !validateInput(expresiones.name, message.name) || !validateInput(expresiones.email, message.email)  ) throw new Error("Campos invalidos");

            const response = await useContactUs.SendConsult(message);
            console.log("sendMsg: response: ", response);
            notification.text = response.data.message;
            notification.status = response.status;

        } catch (error) {
           console.log("sendMsg error: ", error);
            // if(error.response.status == 422){
                notification.text = 'datos invalidos';
                notification.status = 401
        }
        loading.value = false;
    }


</script>

<style lang="scss" scoped>



.formApp{
  max-width: 400px;
  background: #fff;
  width: 800px;
  padding: 25px 20px 10px 20px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
  border-radius: 8px;
}
.formApp .text{
  text-align: center;
  font-size: 35px;
  font-weight: 600;
  background: map-get($colores, 'gradientePrincipal' );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.formApp form{
  padding: 30px 0 0 0;
}
.formApp form .form-row{
  display: flex;
  margin: 32px 0;
}
form .form-row .input-data{
  width: 100%;
  height: 40px;
  margin: 0 20px;
  position: relative;
}
form .form-row .textarea{
  height: 70px;
}
.input-data input,
.textarea textarea{
  display: block;
  width: 100%;
  height: 100%;
  border: none;
  font-size: 16px;
  font-weight: 300;
  border-bottom: 2px solid rgba(0,0,0, 0.12);
  margin-top: 5px;
  letter-spacing: 0;

}
.input-data input:focus ~ label, .textarea textarea:focus ~ label,
.input-data input:valid ~ label, .textarea textarea:valid ~ label

{
  transform: translateY(-20px);
  font-size: 14px;
  color: #3498db;
}

.input-data input:invalid{
    color: red;
}
.textarea textarea{
  resize: none;
  padding-top: 10px;
}
.input-data label{
  position: absolute;
  pointer-events: none;
  bottom: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
  color: map-get($colores, 'secundario');
}
.textarea label{
  width: 100%;
  bottom: 40px;
  background: #fff;
}
.input-data .underline{
  position: absolute;
  bottom: 0;
  height: 2px;
  width: 100%;
}
.input-data .underline:before{
  position: absolute;
  content: "";
  height: 2px;
  width: 100%;
  background: #3498db;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.3s ease;
}
.input-data input:focus ~ .underline:before,
.input-data input:valid ~ .underline:before,
.textarea textarea:focus ~ .underline:before,
.textarea textarea:valid ~ .underline:before{
  transform: scale(1);
}
// .submit-btn .input-data{
//   overflow: hidden;
//   height: 45px!important;
//   width: 25%!important;
// }
// .submit-btn .input-data .inner{
//   height: 100%;
//   width: 300%;
//   position: absolute;
//   left: -100%;
//   transition: all 0.4s;
// }
.submit-btn .input-data:hover .inner{
  left: 0;
}
.submit-btn{
  border: none;
  color: #fff;
  font-size: 17px;
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;
  position: relative;
  background: map-get($colores, 'secundario');
  border-radius: 8px;
}
.submit-btn:hover{
  background: map-get($colores, 'principal');
    
}
@media (max-width: 650px) {

.formApp{
    max-width: 300px;
    margin-top: 20px;
}
  .formApp .text{
    font-size: 30px;
  }
  .formApp form{
    padding: 10px 0 0 0;
  }
  .formApp form .form-row{
    display: block;
  }
  form .form-row .input-data{
    margin: 35px 0!important;
  }
  .submit-btn .input-data{
    width: 40%!important;
  }
}


</style>


