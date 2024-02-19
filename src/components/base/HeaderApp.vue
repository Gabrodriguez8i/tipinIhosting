<script setup>
import { computed, inject, ref } from 'vue';
import { Icon } from '@iconify/vue';

const headers = inject('headers');
const currentSection = inject('currentSection');


const menu = ref(false);
// activar desactivar menu
const activeMenu = (menuIndex = null) => {
    if(menuIndex != 4) menu.value = !menu.value;
}
const navigation = computed(() => menu.value ? 'header_container_navbar header_container_navbar_active' : 'header_container_navbar')
const iconTlf = computed(() => menu.value ? 'menutoggle menuactive' : 'menutoggle')

window.addEventListener('scroll', function () {
    const height = document.getElementById('header').clientHeight;
    const navbar = document.querySelector('#navbarDown');
    navbar.classList.toggle('header_container_fixed', window.scrollY > height + 1)
});


</script>
<template>
    <header class="header" id="header">
        <div class="header_container" id="navbarDown">
            <div href="#" class="header_container_logo"><img src="/logo/logoNavbar.png" alt="logo header tipin"></div>

            <div :class="iconTlf" id="icono" @click="activeMenu"></div>
            <nav :class="navigation">
                <a v-for="(header, index) in headers" :key="header" target="_self" :href=" index == 4 ? '#' : `#${index}`"
                    class="header_container_navbar_link" :class="{ active: index == currentSection }"
                    @click="()=> index == 4 ? activeMenu(index) : activeMenu()" aria-label="link tipin">
                    {{ header.menu ? header.menu : header }}

                    <div v-if="header.subMenu" class="headerBx_navbar_UserBx_container">
                        <div class="headerBx_navbar_UserBx_container_menu">
                            <a v-for="(menu,index) in header.subMenu" key="index" :href="menu.enlace" :target="menu.target">
                                <Icon :icon="menu.iconName" color="red" width="19"></Icon>
                                {{ menu.name }}
                            </a>
                        </div>
                    </div>
                </a>
                <!-- User Account Menu -->
                <!-- <div class="headerBx_navbar_UserBx">
                    <a class="headerBx_navbar_UserBx_profile">
                        <Icon icon="fa-regular:user"></Icon>
                    </a>

                    <div class="headerBx_navbar_UserBx_container">
                        <div class="headerBx_navbar_UserBx_container_menu">
                            <h3 v-if="authUser.token != null && authUser.user != null">
                                {{ authUser.user.name }}
                            </h3>
                            <a v-if="authUser.token == null" class="headerBx_navbar_UserBx_container_menu_link" target="_blank" href="https://sms.tipin.cl/login">
                                <Icon icon="ph:user-circle" color="red" width="20"></Icon>
                                Ingreso
                            </a>

                            <a v-if="authUser.token == null" class="headerBx_navbar_UserBx_container_menu_link" href="#3" @click="() => planesSteep = 'Modalidades' ">
                                <Icon icon="ph:user-circle-plus" color="red" width="20"></Icon>
                                Registro
                            </a>

                            <a v-if="authUser.token != null && authUser.user != null" class="headerBx_navbar_UserBx_container_menu_link" @click="logoutSession" :disabled="buttonState">
                                <Icon icon="uil:signout" color="red" width="20"></Icon>
                                Salir
                            </a>

                        </div>
                    </div>
                </div> -->

                <!-- <div v-if="authUser.token != null && authUser.user != null" class="button_logout">
                    <button @click="logoutSession" :disabled="buttonState">
                        <a v-if="!buttonState">Salir</a>
                        <a v-if="buttonState">Cargando...</a>
                    </button>
                </div> -->

                <!-- <div class="redes_social_body redes_social_body_header">
                    <a class="redes_social_body_icon" href="https://www.facebook.com/tipinchile" target="_blank">
                        <Icon icon="ion:social-facebook" width="19"></Icon>
                    </a>
                    <a class="redes_social_body_icon" href="https://www.instagram.com/tipin.chile/" target="_blank">
                        <Icon icon="ion:logo-instagram" width="19"></Icon>
                    </a>
                    <a class="redes_social_body_icon" href="https://wa.link/15336z" target="_blank">
                        <Icon icon="ion:logo-whatsapp" width="19"></Icon>
                    </a>
                </div> -->
            </nav>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    height: 65px;

    @media(max-width: 560px) {

        min-height: 70px; //importante el min para que cuanndo se convierta en fixed  la pagina no suba
    }


}

.header_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: .3s ease;
    width: 100%;
    height: 100%;
    max-height: 65px;
    padding: 10px 40px;

    @media(max-width: 790px) {
        padding: 10px;
    }

}

.header_container_logo {
    height: 100%;
    width: 90px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media(max-width: 700px) {
        width: 75px;
    }

    img {
        width: 100%;
    }
}

.header_container_fixed {
    position: fixed;
    max-width: 100%;
    width: 100%;
    background: map-get($colores, "secundario");
    top: 0;
    height: 65px;
    z-index: 100;
    box-shadow: 0px 6px 10px 1px rgb(0 0 0 / 30%);
    padding: 5px 40px;

    @media(max-width: 790px) {
        padding: 10px;
    }

    &:before {
        display: none;
    }

    .header_container_navbar_link {
        color: map-get($colores, "alterno");
    }

    .header_container_logo {
        // width: 100px;
    }
}

.header_container_navbar {
    position: relative;
    // width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    z-index: 100;

    @media(max-width: 1180px) {
        position: fixed;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
        padding: 100px 20px;
        gap: 20px;
        min-height: 100%;
        left: -110%;
        top: 0;
        width: 45%;
        transition: all 0.4s ease;
        background: #241F4B;
        box-shadow: 2px 0px 7px 4px rgb(0, 0, 0, 0.3);
        z-index: 100;
    }

    @media(max-width:700px) {
        width: 40%;
    }

    @media(max-width:450px) {
        width: 55%;
    }

}

.header_container_navbar_active {
    left: 0;
}

.header_container_navbar_link {
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 30px;
    text-align: center;
    color: map-get($colores, "alterno");
    text-transform: uppercase;
    text-decoration: none;

    display: grid;
    place-items: center;
    min-width: 72px;
    height: 35px;
    // width: 95px;
    width: 100px;
    padding: 0 5px;
    cursor: pointer;
    transition: .3s ease-in-out;
    border-radius: 10px;
    margin-left: 10px;

    &:hover {
        background: map-get($colores , "principal");
        color: map-get($colores, "secundario" );

        .headerBx_navbar_UserBx_profile {
            background: map-get($colores, 'gradientePrincipal' );
            transform: scale(.9);

        }
        .headerBx_navbar_UserBx_container { //------------------------------------------ igual a headerBx_navbar_UserBx headerBx_navbar_UserBx_container
            display: block;
            top: 32px;
            min-height: 70px;
            visibility: visible;
            z-index: 100;
            transition: .2s ease-in-out;
            opacity: 1;
            @media(max-width: 1180px){
                top: -60px;
                width: 208px;
                padding: 10px 0px 0px 20px
            }
        }

        

    }

    @media(max-width: 1080px) {
        margin-left: 0px;
    }
}

.header_container_navbar_link.active {

    background: map-get($colores , "principal");
    // color: map-get($colores, "alterno" );
    border-radius: 10px;
    height: 35px;
    color: map-get($colores , "secundario");
}

// .header_container_navbar_logoSmall{
//     position: absolute;
//     width: 67px;
//     height: 37px;
//     top: 5px;
//     left: 30px;
// }


.menutoggle {
    display: none;

    @media(max-width:1180px) {
        position: relative;
        display: flex !important;
        justify-content: center;
        align-items: center;
        top: 0px;
        right: 0px;
        width: 45px;
        height: 45px;
        background: map-get($colores , "secundario");
        border-radius: 10px;
        cursor: pointer;
        transition: 0.2s;
        z-index: 1000;
        overflow: hidden;

        &::before {
            content: '';
            position: absolute;
            width: 28px;
            height: 2px;
            background: #fff;
            transition: .2s;
            transform: translateY(10px);
        }

        &::after {


            content: '';
            position: absolute;
            width: 28px;
            height: 2px;
            background: #fff;
            transition: .2s;
            transform: translateY(-10px);
            box-shadow: 0 10px 0 #fff;
            /*linea en medio*/
        }
    }

    @media(max-width: 370px) {
        width: 60px;
        height: 60px;

        &::before,
        &::after {
            width: 24px;
        }
    }
}

.menuactive {
    background: rgb(200, 9, 9);

    &::after {
        transform: translateY(0px) rotate(45deg);
        box-shadow: 0 0 0 #fff;
    }

    &::before {
        transform: translateY(0px) rotate(-45deg);
    }
}

.button_logout {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    width: 105px;
    color: white;
    text-align: center;
    padding: 5px 15px;
    border-radius: 10px;

    background: #241F4B;

    &:hover {
        background: #F05677;

        // transform: scale(0.90);
        button {
            transform: scale(0.90);

            a {
                text-shadow: none;
            }
        }
    }


    button {
        border: none;
        background: none;
        color: white;
        cursor: pointer;

        //     display: flex;
        // justify-content: space-between;
        // cursor: crosshair;
        // width: 100%;
        // height: 100%;


        a {
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 30px;
            text-align: center;
            text-transform: uppercase;
            text-shadow: 0px 1px 2px #f05677;
        }
    }
}



.redes_social_body {
    position: absolute;
    left: 20px;
    bottom: 10px;
    width: 100px;
    height: 50px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    z-index: 10;

    @media(max-width: 790px) {
        right: auto;
        left: auto;
        width: 20%;
        margin: 0 auto;
        justify-content: center;
        gap: 10px;
        bottom: -100px;
    }

    @media(max-width: 590px) {
        bottom: 15px;
    }

    @media(max-width: 490px) {
        bottom: 20px;
    }

    @media(max-width: 415px) {
        display: none;
    }
}

.redes_social_body_header {
    display: none !important;
    position: relative !important;
    justify-content: center;
    gap: 15px;
    width: 100%;
    margin-top: 15px;
    left: 0 !important;
    bottom: 0 !important;

    @media(max-width:1180px) {
        display: flex !important;

    }
    @media(max-width:500px){
        position: absolute !important;
        bottom: 8px !important;

    }

}


.redes_social_body_icon {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: map-get($colores , 'principal');
    padding: 2px;
    height: 35px;
    width: 35px;
    cursor: pointer;
    color: map-get($colores, 'alterno' );

    &:hover {
        transform: scale(0.8);
    }
}

// .redes_social_body_icon:hover{
//   transform: scale(0.4);
// }
// .redes_social_body_icon img {
//     width: 24px;
//     height: 24px;
// }








/* USER HEADER START---------------------------------------------------------- */


.UserBx_icons_size {
    color: #333;
    font-size: 14px;
}

.headerBx_navbar_UserBx {
    position: relative;
    width: 50px;
    display: flex;
    justify-content: center;
    transition: 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);

    &:hover {
        .headerBx_navbar_UserBx_profile {
            background: map-get($colores, 'gradientePrincipal' );
            transform: scale(.9);

        }
        .headerBx_navbar_UserBx_container { //----------------------------------igual a 
            display: block;
            top: 32px;
            min-height: 70px;
            visibility: visible;
            z-index: 100;
            transition: .2s ease-in-out;
            opacity: 1;
            @media(max-width: 1180px){
                top: -60px;
                width: 208px;
                padding: 10px 0px 0px 20px
            }
        }

        // .headerBx_navbar_UserBx_container_menu{
        //         top: 0px;      

        //     }
        // .headerBx_navbar_UserBx_container_menu{
        //     opacity: 1;
        // }
    }
}

.headerBx_navbar_UserBx_profile {
    border-radius: 50%;
    cursor: pointer;
    height: 35px;
    overflow: hidden;
    position: relative;
    width: 35px;
    background: map-get($colores , 'principal');
    color: map-get($colores, 'alterno');
    font-size: 15px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scale(1);


}


// .headerBx_navbar_UserBx_profile img {
//     width: 100%;
//     top: 0;
//     position: absolute;
//     object-fit: cover;
//     left: 0;
//     height: 100%;
// }

.headerBx_navbar_UserBx_container {
    position: absolute;
    display: none;
    top: 120px;
    right: -10px;
    width: 200px;
    height: 10px;
    background: transparent;
    padding: 28px 0px 0px;
    z-index: -1;
    opacity: 0;
    @media(max-width: 1180px){
        right: -204px;
        width: 170px;
    }
}

.headerBx_navbar_UserBx_container_menu {
    // opacity: 0;
    position: relative;
    // top: 40px;
    background-color: #FFF;
    box-sizing: 0 5px 25px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    padding: 10px 20px;
    width: 100%;
    height: auto;
    min-height: 100px;
    max-height: 170px;
    box-shadow: 2px 6px 10px 2px rgb(0 0 0 / 10%);
    // transition: .5s;
}

.headerBx_navbar_UserBx_container_menu::before {
    background-color: #fff;
    content: '';
    height: 40px;
    position: absolute;
    right: 16px;
    transform: rotate(45deg);
    top: -5px;
    width: 40px;
    @media(max-width:1180px){
        top: 40px;
        right: 148px;

    }
}

.headerBx_navbar_UserBx_container_menu h3 {
    color: #555;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.3em;
    padding: 20px 0px;
    text-align: left;
    width: 100%;
    margin-top: 0;
}

.headerBx_navbar_UserBx_container_menu a {
    text-decoration: none;
    display: flex;
    gap: 10px;
    align-items: center;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: left;
    list-style: none;
    padding: 10px 0px;
    color: map-get($colores , 'secundario' );
    font-size: 13px;
    font-weight: 500;
    &:hover{
        opacity: 0.8;
    }
}


.headerBx_navbar_UserBx_container_menu_link{
    display: inline-block;
    font-size: 13px;
    font-weight: 500;
    padding-left: 15px;
    text-decoration: none;
    text-transform: uppercase;
    transition: 0.5s;
    cursor: pointer;
}

.headerBx_navbar_UserBx_container_menu ul li:hover img {
    opacity: 1;
}

.headerBx_navbar_UserBx_container_menu ul li:hover a {
    color: var(--blue-dark);
}




/* USER HEADER END------------------------------------------------------------------ */
</style>