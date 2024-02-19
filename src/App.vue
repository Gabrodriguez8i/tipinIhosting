<template>

  <main id="viewHome">
    <HeaderApp/>
    <NotificationBar :element="notification"/>

      <section class="bannerStart sectionCapture" id="0">
          
          <div class="bannerStart_text">
              <div class="bannerStart_text_imgBx">
                  <img src="/home/marca.png" class="bannerStart_text_imgBx_img" alt="tipin logo">
              </div>
              <h2 class="bannerStart_text_title">¡Mejora tus ventas y fidelización con tipin y SMS Marketing!</h2>

              <div class="bannerStart_text_decoration">
                  <span class="bannerStart_text_decoration_text">
                      {{ new Date().getFullYear() }}
                  </span>

                  <div class="bannerStart_text_decoration_separator"></div>

                  <div class="bannerStart_text_decoration_socials">
                      <a href="https//:facebook" aria-label="link facebook tipin">
                          <Icon icon="ion:social-facebook" color="white" width="40" ></Icon>
                      </a>
                      <a href="https//:instagram" aria-label="link instagram tipin">
                          <Icon icon="ion:logo-instagram" color="white" width="40"></Icon>
                      </a>

                  </div>
              </div>
          </div>

          <div class="bannerStart_backgroundBx">
              <img src="/home/banner.jpg" alt="banner tipin"  loading="eager">
          </div>

      </section>


      <section class="sectionAbout" id="viewNosotros">
          <h2 v-motion-slide-visible-bottom class="sectionAbout_content_title">¿PARA QUÉ USAR SMS MARKETING?</h2>
          <div class="sectionAbout_content sectionAbout_content_why">

              <div v-motion-slide-visible-bottom class="sectionAbout_content_row">
                  <div class="sectionAbout_content_row_iconRow">
                      <img class="sectionAbout_content_row_iconRow_img" src="/home/chat.png" alt="tipin icon chat" />
                  </div>
                  
                  <p class="sectionAbout_content_row_text">En restaurantes y pubs, utiliza SMS para enviar recordatorios de eventos, ofertas, confirmaciones y anulaciones de reservas, etc.</p>
              </div>

              <div v-motion-slide-visible-bottom class="sectionAbout_content_row">
                  <div class="sectionAbout_content_row_iconRow">
                      <img class="sectionAbout_content_row_iconRow_img" src="/home/chat.png" alt="tipin icon chat" />
                  </div>
                  
                  <p class="sectionAbout_content_row_text">En centros clínicos, utiliza SMS para confirmar horas, enviar resultados de exámenes, enviar promociones, suspensión de horas, etc.</p>
              </div>

              <div v-motion-slide-visible-bottom class="sectionAbout_content_row">
                  <div class="sectionAbout_content_row_iconRow">
                      <img class="sectionAbout_content_row_iconRow_img" src="/home/chat.png" alt="tipin icon chat" />
                  </div>
                  
                  <p class="sectionAbout_content_row_text">En comercios, utiliza SMS para envíar promociones y ofertas, descuentos personalizados, códigos de promoción, ofertas especiales de cyberday, etc</p>
              </div>
          </div>

      </section>


      <!-- why use -->
      <section class="sectionUse">
          <div>
              <h2 v-motion-slide-visible-left class="sectionAbout_content_title sectionAbout_content_title_left">¿POR QUÉ USAR SMS MARKETING?</h2>
  
              <div v-motion-slide-visible-left class="sectionUse_list">
                  <div class="sectionUse_list_bx">
                      <Icon icon="ic:outline-circle" color="#ed5273" width="28"></Icon>
                      <span class="sectionUse_list_bx_text">Baja tasa de desuscripción contra campañas de mailing y <b>94%</b>  promedio de Open Rate.</span>
                  </div>
  
                  <div class="sectionUse_list_bx">
                      <Icon icon="ic:outline-circle" color="#ed5273" width="28"></Icon>
                      <span class="sectionUse_list_bx_text"> <b>Aumenta la visibilidad y promociona descuentos, eventos y recordatorios.</b> </span>
                  </div>
  
                  <div class="sectionUse_list_bx">
                      <Icon icon="ic:outline-circle" color="#ed5273" width="28"></Icon>
                      <span class="sectionUse_list_bx_text"><b>Promueve la interacción activa.</b> En la actualidad, las personas consultan sus teléfonos móviles aproximadamente 80 veces al día. La publicidad a través de mensajes de texto (SMS) destaca por su notable tasa de apertura, brindando a las empresas la oportunidad de elevar el reconocimiento de su marca y enviar propuestas a los clientes de manera efectiva, con mayores posibilidades de captar su atención.</span>
                  </div>
              </div>
          </div>
          <div v-motion-slide-visible-right>
          <contactSimply />
          </div>
      </section>


      <section>
          <SectionImageText :info="infoSectionGlobal"/>
      </section>

      <section>
          <SectionImageText :info="infoSectionAgility"/>
      </section>

      <section>
          <SectionImageText :info="infoSectionCampaign"/>
      </section>

      <!-- section message conecta -->
      <section>
          <SectionWave :data="dataSectionWaveConecta"/>
      </section>

      <!-- section offers -->
      <section id="1" class="offers sectionCapture">
          <h2 v-motion-slide-visible-bottom class="sectionAbout_content_title offers_title">¿Qué ofrecemos?</h2>

          <div class="offers_cards">
              <div v-for="offer in dataOffers" class="offers_cards_bx">
                  <h3 class="offers_cards_bx_title">{{ offer.title }}:</h3>
                  <p class="offers_cards_bx_detail" :class="{'offers_cards_bx_detail_center': offer.detail == 'Próximamente.'}">{{ offer.detail }}</p>
              </div>


          </div>
      </section>

      <!-- section demo -->
      <section>
          <SectionWave :data="dataSectionWaveDemo"/>
      </section>

      <!-- section why -->
      <section class="whyTipin">
          <div class="whyTipin_textBx">
              <h2 v-motion-slide-visible-bottom class="sectionAbout_content_title whyTipin_textBx_title">¿POR QUÉ TIPIN?</h2>
              <h3 class="whyTipin_textBx_subtitle"> Bolsas de SMS personalizados con Planes a tu medida Valor preferencial para empresas partners.</h3>
              <a href="#contacto" class="whyTipin_textBx_btn"> Consulta por planes. </a>
          </div>
      </section>


      <!-- section message conecta -->
      <section>
          <SectionWave :data="dataSectionWaveReport"/>
      </section>

      <!-- table price -->
      <section id="2" class="tablePrice sectionCapture">
          <div class="tablePrice_text" v-motion-slide-visible-left>
              <h2 class="tablePrice_text_title tablePrice_text_title">Tabla  <br>de precios</h2>
          </div>

          <div class="tablePrice_tableBx" v-motion-slide-visible-right>

              <table border="1" class="tablePrice_tableBx_table" color="white">
              <tr align="center" style="background-color:#ed5273;border: transparent;">
                  <th width="100">
                      <h3>BOLSAS SMS </h3>
                      <span>[SIN FECHA DE VENCIMIENTO]</span> 
                  </th>
                  <th width="100">
                      <h3> VALOR X SMS CLP </h3>
                      <span>[S/IVA]</span>
                  </th>
              </tr>
              <tr align="center" style="background-color:#ed5273;border: transparent;">
                  <td>1000</td>
                  <td>20</td>
              </tr>
              <tr align="center" style="background-color:#ed5273;border: transparent;">
                  <td>2000</td>
                  <td>20</td>
              </tr>
              <tr align="center" style="background-color:#ed5273;border: transparent;">
                  <td>5000 hasta 149.999</td>
                  <td>18</td>
              </tr>
              </table>

              <table border="1" class="tablePrice_tableBx_table" color="white">
              <tr align="center" style="background-color:#ed5273;border: transparent;">
                  <th colspan="2">
                      <h3>PLANES CONTRATO</h3>
                  </th>
              </tr>
              <tr align="center" style="background-color:#ed5273;border: transparent;">
                  <td>
                      <span>
                          ENVIOS
                      </span>
                      <br>
                      <b>DESDE 150.000</b>
                  </td>
                  <td>
                      <span>PRECIO</span>
                      <br>
                      <b>
                          $12.5
                      </b>
                  </td>
              </tr>
              </table>
          </div>
      </section>

      <section class="footerBanner">
          <div id="contacto" class=" footerBanner_form" v-motion-slide-visible-left>
              <Contacto/>
          </div>

          <div class="footerBanner_text " v-motion-slide-visible-right>

              <div class="footerBanner_text_header">
                  <h2 class="footerBanner_text_header_title">¡CONVERSEMOS!</h2>
                  <span class="footerBanner_text_header_border"></span>
              </div>
              <div class="footerBanner_text_footer">
                  <span class="footerBanner_text_footer_title">SMS MARKETING</span>
                  <span class="footerBanner_text_footer_subtitle">/2024 </span>

                  <p class="footerBanner_text_footer_info">
                      Ingresa tus datos respondiendo los mensajes de nuestro formulario y un ejecutivo se contactará con usted, o escríbenos directamente a nuestro 
                      <a class="footerBanner_text_footer_info_link" href="https://wa.link/15336z" target="_blank" >Whatsapp</a>
                  </p>
              </div>
          </div>

          
          <div class="bannerStart_backgroundBx">
              <img src="/home/banner.jpg" alt="banner tipin">
          </div>
      </section>

  </main>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import SectionImageText from '@/components/sections/SectionImageText.vue';
import SectionWave from '@/components/sections/SectionWave.vue';
import Contacto from '@/components/form/ContactoApp/ContactoApp.vue'
import contactSimply from '@/components/form/contactSimply.vue';
import NotificationBar from '@/components/base/NotificationBar.vue';
import HeaderApp from '@/components/base/HeaderApp.vue'

import {inject, onMounted,  reactive, provide , ref} from 'vue';

let notification = reactive({});

provide('authUser', { notification }); // tarea para una actualizacion de Tipin= cambbiar el nombre provide!


// states para el capturador de elementos
const headers = [
  "Inicio", 
  "Servicios", 
  'Precios', 
];
provide('headers', headers);
const currentSection = ref('');
provide('currentSection', currentSection)



onMounted(() => {

  // INTERSECTION HEADER
  const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
              //cada vez que la func detecte el element, el valor currentSection cambia por el id del element
              //que se compara en el componente header por el index del array "header"
              currentSection.value = entry.target.getAttribute('id');
          }
      })
  },
      {
          rootMargin: '0% 0% -85% 0%',
      }
  );
  //todos los elementos que tengan la clase .section capture seran detectados por el intersection
  document.querySelectorAll('.sectionCapture').forEach((section) => {
      observer.observe(section)
  });

})


let infoSectionGlobal = {
  img: '/home/sectionInfo/info1.png',
  postion: 'normal',
  listText: [
      {
          textBold: 'Alcance global',
          text: 'Los servicios de mensajería tienen la capacidad de llevar el mensaje de una empresa a cualquier parte del mundo, llegando a todos aquellos que utilizan teléfonos móviles. Con alrededor de cinco mil millones de personas conectadas a través de dispositivos móviles, la publicidad por SMS puede desempeñar un papel fundamental en tu estrategia de marketing.'
      },
      {
          textBold: 'Genera oportunidades para negocios locales',
          text: 'Los profesionales del marketing pueden dirigir estratégicamente la publicidad por SMS a áreas geográficas específicas, convirtiéndose así en una herramienta poderosa para campañas a nivel local. Esta forma de publicidad permite a las empresas locales enviar ofertas urgentes a clientes que pueden visitar en cualquier momento.'
      },
  ]
};

let infoSectionAgility = {
  img: '/home/sectionInfo/info2.png',
  postion: 'normal',
  listText: [
      {
          textBold: 'Agilidad en la creación',
          text: ' La creación de una campaña de publicidad por SMS lleva solo unos minutos, siempre y cuando se disponga de los números de teléfono de los suscriptores (sin necesidad de contar con sus direcciones de correo electrónico).'
      },
      {
          textBold: 'Compatibilidad con otros canales de marketing',
          text: 'La publicidad por SMS se integra de manera efectiva con estrategias de marketing más amplias, como el marketing por correo electrónico y las notificaciones push web. Con frecuencia, los especialistas en marketing emplean la publicidad por SMS como un complemento a sus campañas de correo electrónico; por ejemplo, en situaciones donde un correo electrónico no ha sido abierto, la publicidad por SMS puede transmitir el mensaje directamente al teléfono móvil del usuario.'
      },
  ]
};

let infoSectionCampaign = {
  img: '/home/sectionInfo/info3.png',
  postion: 'reverse',
  listText: [
      {
          textBold: 'Combina tus campañas de marketing por SMS con la creación de landing pages responsive y efectivas para aumentar la tasa de conversión.',
      },
      {
          textBold: 'Canal complementario',
          text: 'Combina los envíos de SMS con los demás canales de marketing como el email marketing, las redes sociales o la publicidad online para conseguir una mayor efectividad a la hora de convertir a tus leads en clientes recurrentes.'
      },
  ]
};

let dataSectionWaveConecta = {
  waveRight: true,
  title: ' ¡Conecta de manera rápida y efectiva con tus clientes a través de sms!'
}

let dataOffers = [
  {
      title: ' NÚMERO CORTO',
      detail: 'Próximamente.' 
  },
  {
      title: ' NÚMERO LARGO',
      detail: ' Canal SMS empresarial por excelencia para comunicación de marketing y publicidad. Consta con un formato conocido por los clientes al incorporar el código del país (+569). Posee una tasa menor de bloqueo debido a la constante rotación de números.' 
  },
  {
      title: 'SMS CON URL',
      detail: 'Son SMS que incorporan una URL clicable, permitiendo redireccionar a los usuarios  a una página web.' 
  },
  {
      title: 'API',
      detail: 'Podemos integrar tus sistemas con nuestro web service mediante una interfaz, para que puedas diseñar estrategias interconectadas con callbots y otros canales. Regístrate para obtener tu cuenta, adquirir tu clave API a través de GUI o API y tu URL base.' 
  },
  {
      title: 'COMPLETA COBERTURA NACIONAL',
      detail: 'Contar con el mayor número de conexiones directas con operadores ofrecidas por un proveedor de mensajería garantiza una entrega de mensajes confiable y un rendimiento superior.' 
  },
  {
      title: 'MÁXIMA ESCALABILIDAD',
      detail: 'La tecnología e infraestructura de SMS de Tipin está diseñada para brindar escalabilidad y permite efectuar fácilmente billones de envíos diarios.' 
  },
  {
      title: 'ENRUTAMIENTO PRIORITARIO',
      detail: 'Configura múltiples niveles de priorización para tu tráfico de mensajes, asegurando así la entrega rápida de aquellos mensajes críticos para tu negocio.' 
  },
  {
      title: 'SEGURIDAD LIBRE DE FRICCIONES',
      detail: 'Brinda mayor protección a las cuentas de tus usuarios, desde su inicio de sesión y su registro, mediante autenticación de dos factores vía SMS. Combina el uso de Mobile Identity para así ofrecer máxima seguridad sin comprometer la experiencia del cliente.' 
  },
  {
      title: 'POSIBLIDAD DE MENSAJES EXTENSOS',
      detail: 'Próximamente.' 
  },
];

let dataSectionWaveDemo = {
  waveRight: false,
  title: '¡COMIENZA TU DEMO HOY Y APROVECHA 50 ENVÍOS GRATIS! ',
  subtitle: 'VENDE, PROMOCIONA, FIDELIZA Y CONTACTA A TUS CLIENTES EN UNA SOLA PLATAFORMA, SENCILLA DE USAR, CON ALTA DISPONIBILIDAD Y ENTREGABILIDAD.'
}

let dataSectionWaveReport = {
  waveRight: true,
  title: '¡AUTOGESTIONA LA REPORTERÍA DE TUS CAMPAÑAS ENVIADAS!'
}

</script>

<style lang="scss" scoped>
body{
  width: 100% !important;
}

section{
  background:  map-get($colores , "secundario");
  margin-bottom: 10px;
  min-height: 95vh;
  overflow: hidden;
}

.bannerStart{
  position: relative;
  height: 100vh;
  width: 100%;   
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0px;
}

.bannerStart_text{
  width: 60%;
  max-width: 700px;
  z-index: 2;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}

.bannerStart_text_imgBx{
  margin-bottom: 20px;
}
.bannerStart_text_imgBx_img{
  width: 200px;
  height: 140px;
}

.bannerStart_text_title{
  font-size: 65px;
  line-height: 82px;
  // letter-spacing: 2px;
  text-transform: uppercase;
  color: map-get($colores , "principal");
  margin-bottom: 40px;
}

.bannerStart_text_decoration{
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bannerStart_text_decoration_text{
  color: map-get($colores , "alternoSecundario");
  letter-spacing: 4px;
  width: 20%;
  text-align: center;
}

.bannerStart_text_decoration_separator{
  width: 60%;
  border-bottom: 1px solid map-get($colores , "alternoSecundario");
  margin-bottom: 0px;
}
.bannerStart_text_decoration_socials{
  display: flex;
  width: 20%;
  justify-content: space-around;
}
.bannerStart_backgroundBx{
  position: absolute;
  inset: 0 0 0 0;
  overflow: hidden;
  transition: .5s;
  opacity: 1;
  z-index: 1;
}
.bannerStart_backgroundBx img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.bannerStart_backgroundBx::after{
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  background-image: linear-gradient( to top, map-get($colores , "secundario") 22%, #0000002c );

}


// ABOUT ---
.sectionAbout{
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 50px;
}

.sectionAbout_content_title{
  margin-bottom: 80px;
  // font-size: 50px;
  line-height: 70px;
  text-align: center;
  color: map-get($colores , "principal");
  max-width: 600px;
}
.sectionAbout_content_title_left{
  text-align: left;
  margin-bottom: 25px;
}
.sectionAbout_content{
  display: flex;
  width: 100%;
  max-width: 1388px;
  justify-content: space-around;
  flex-wrap: wrap;
}

.sectionAbout_content_row{
  display: flex;
  width: 22%;
}

.sectionAbout_content_row_iconRow{
  margin: 0 18PX;
}
.sectionAbout_content_row_iconRow_img{
  width: 50px;
}
.sectionAbout_content_row_text{
  color: map-get($colores , "alternoSecundario");
  font-weight: 200;
  font-size: 20px;
  line-height: 25px;
}


// WHY USE
.sectionUse{
  display: flex;
  padding: 0px 210px;
  justify-content: space-between;
  align-items: center;
  min-height: 80vh;
}

.sectionUse_list{
  // margin: 0 40px;
  width: 70%;
}

.sectionUse_list_bx{
  display: flex;
  margin-bottom: 20px;  
}

.sectionUse_list_bx_text{
  color: map-get($colores , "alternoSecundario");
  font-size: 20px;
  font-weight: 200;
  margin: 0 10px;
  line-height: 30px;
  width: 80%;

}
// offers
.offers{
  background: map-get($colores , "principal");
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 140px 50px;
  min-height: 100vh;
}

.offers_title{
  color: map-get($colores , "alternoSecundario");
  text-transform: uppercase;
}

.offers_cards{
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  flex-wrap: wrap;
  max-width: 2000px;
}

.offers_cards_bx{
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 170px;
  max-width: 336px;
  margin: 0 74px 50px;
}

.offers_cards_bx_title{
  background: map-get($colores , "secundario");
  width: 60%;
  min-width: 280px;
  max-width: 340px;
  border-radius: 8px;
  color: map-get($colores , "alternoSecundario");
  font-size: 18px;
  // font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 15px;
}

.offers_cards_bx_detail{
  color: map-get($colores , "alternoSecundario");
  min-width: 270px;
  max-width: 320px;
  padding: 10px;
  // font-weight: 600;
  // font-size: 15px;
}

.offers_cards_bx_detail_center{
  text-align: center;
}

// whyTipin
.whyTipin{
  min-height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.whyTipin_textBx{
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.whyTipin_textBx_title{
  margin-bottom: 30px;
  max-width: 600px;
}

.whyTipin_textBx_subtitle{
  max-width: 400px;
  font-size: 22px;
  font-weight: 300;
  line-height: 30px;
  color: map-get($colores , "alternoSecundario");
  margin-bottom: 25px;
}

.whyTipin_textBx_btn{
  background: transparent;
  color: map-get($colores , "alternoSecundario");
  width: 250px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid map-get($colores , "principal");
  font-size: 15px;
  cursor: pointer;
  text-decoration: none;
}
.whyTipin_textBx_btn:hover{
  background: map-get($colores , "principal");
}

// table price
.tablePrice{
  display: flex;
  width: 100%;
  min-height: 95vh;
  align-items: center;
  justify-content: space-evenly;
  background: map-get($colores , "principal");
}

.tablePrice_text_title{
  font-size: 50px;
  max-width: 330px;
  text-align: end;
  color: map-get($colores , "secundario");
  text-transform: uppercase;
}
.tablePrice_tableBx{
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 55%;
}
.tablePrice_tableBx_table{
  background-color:#241F4B;
  border: none;
  width: 75%;
  color: white;
  margin-bottom: 40px;
}
th{
  padding: 10px;
}
th h3, th span{
  font-weight: 500;

}
// th h3{
// font-size: 20px;
// }
td{
  padding: 10px;
}

// footer
.footerBanner{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  // padding: 0 100px;
  margin-bottom: 0px;
}
.footerBanner_form{
  width: 60%;

}
.footerBanner_text{
  width: 40%;
}
.footerBanner_text, .footerBanner_imgBx, .footerBanner_form{
z-index: 3;

}

.footerBanner_text_header{
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.footerBanner_text_header_title{
  font-size: 50px;
  color: #ed5273;
}

.footerBanner_text_header_border{
  border-bottom: 2px solid #ed5273;
  width: 150px;
  margin: 0 15px;
}

.footerBanner_text_footer{
  color: #ed5273;
  letter-spacing: 4px;
}

.footerBanner_text_footer_info{
  color: white;
  max-width: 400px;
  margin: 10px 0px;
  letter-spacing: normal;
}

.footerBanner_text_footer_info_link{
  color: #25D366;
  font-weight: $fontWeight-md;
  font-size: $spanWidth;
  text-decoration: none;
  letter-spacing: normal;
  cursor: pointer;
  &:hover{
      color: #25d365ae;

  }
}

.footerBanner_imgBx{
  display: flex;
  width: 40%;
  align-items: center;
  justify-content: center;
}

.footerBanner_imgBx_logo{
  width: 250px;
}

.footerBanner_imgBx_logo_socials{
  display: flex;
  width: 20%;
  justify-content: space-around;
}
@media(max-width: 1350px){
  .offers_cards_bx{
  margin: 0 24px 50px;

  }
  .sectionUse, .sectionInfo, .footerBanner{
      padding: 100px 40px 0px;
  }
  .sectionAbout_content_row{
      width: 30%;
  }

}
@media(max-width: 790px){


  .sectionUse_list_bx_text, .sectionAbout_content_row_text{
      font-size: 16px;
  }

  .sectionAbout_content_title{
      margin-bottom: 30px;
      line-height: 40px;
      text-align: center !important;
  }

  .sectionAbout_content_why{
      flex-direction: column;
  }

  .sectionAbout_content_row{
      width: 95%;
      margin: 20px 0px;
  }

  .sectionUse{
      flex-direction: column;
      align-items: center;
      justify-content: center;
  }

  .sectionUse_list{   
      width: 98%;
      margin: 0 5px;
  }
  .offers_cards{
      justify-content: space-between;
  }

  // .sectionInfo{
  //     flex-direction: column;
  //     align-items: center;
  //     justify-content: center;
  //     gap: 20px;
  //     padding: 100px 20px;
  // }

  // .sectionInfo_list_bx_text{
  //     font-size: 16px;
  // }
}

@media(max-width: 650px){
  .offers_cards{
      flex-direction: column;
      align-items: center;
      justify-content: center;
  }
  // banner start
  .bannerStart_text{
      width: 90%;
  }
  .bannerStart_text_title{
      line-height: 45px;
      font-size: 30px;
  }
  // table
  .tablePrice {
      flex-direction: column;
  }
  .tablePrice_text_title{
      text-align: center;
  }
  .tablePrice_tableBx{
      width: 100%;
  }
  // why tipin:
  .whyTipin{
      padding: 30px;
  }

  // footer
  .footerBanner{
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-direction: column-reverse;
      gap: 35px;
  }

  .footerBanner_text{
      width: 80%;
      text-align: center;
  }
  .footerBanner_text_header{
      flex-direction: column;

  }

  .footerBanner_imgBx{
      width: 95%;
      align-items: center;
      justify-content: center;
      flex-direction: column-reverse;
  }
  .footerBanner_imgBx_logo{
      width: 120px;
  }
  .footerBanner_imgBx_logo_socials{
      margin-bottom: 20px;
  }

  .footerBanner_form{
      width: 100%;
  }
}
</style>