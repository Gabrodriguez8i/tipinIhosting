<template>
    <div v-if="info != null" class="sectionInfo" :class="{'sectionInfo_reverse': info.postion == 'reverse'}">
        <div v-motion-slide-visible-bottom class="sectionInfo_imageBx">
            <img v-if="info.img" class="sectionInfo_imageBx_img" :src="info.img" alt="image info tipin">
        </div>
        <div v-motion-slide-visible-bottom class="sectionInfo_list">
            <div v-for="item in info.listText" class="sectionInfo_list_bx">
                <Icon icon="ic:outline-circle" color="#ed5273" width="28"></Icon>
                <span class="sectionInfo_list_bx_text"><b>{{item.textBold}}{{ !item.text ? '' : ':' }}</b> {{ item.text }}</span>
            </div>
        </div>

    </div>

</template>

<script>
import { Icon } from '@iconify/vue';
export default {
  props: {
    info: { 
        default: null 
    },
  },
  components:{
    Icon
  },
  setup(props) {

  //   onBeforeMount( () =>{

  // //Configurar libreria Tiltjs para ofrecer movimientos a la tabla
	// // VanillaTilt.init(document.querySelectorAll(".planes_content_cards_card"), {
	// // 	max: 8,
	// // 	speed: 500,
  // //    perspective: 10000,
  // //    scale: 0.99,
  // //    startX: 0,
  // //    startY:  2
	// // });
  //   })
  }
};
</script>

<style lang="scss" scoped>
.sectionInfo{
    display: flex;
    padding: 0 170px;
    justify-content: space-between;
    align-items: center;
    min-height: 95vh;

}

.sectionInfo_reverse{
    flex-direction: row-reverse;
}

.sectionInfo_imageBx{
    width: 50%;
    max-width: 600px;
}

.sectionInfo_imageBx_img{
    max-width: 95%;
}


.sectionInfo_list{
    margin: 0 40px;
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
}

.sectionInfo_list_bx{
    display: flex;
    margin-bottom: 20px;
    width: 95%; 
}

.sectionInfo_list_bx_text{
    color: white;
    font-size: 20px;
    font-weight: 200;
    margin: 0 10px;
    line-height: 30px;
    width: 90%;

}

@media(max-width: 790px){
    .sectionInfo{
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        padding: 100px 20px;
    }
    .sectionInfo_list{
        width: 98%;
    }

    .sectionInfo_list_bx_text{
        font-size: 16px;
    }
}

</style>