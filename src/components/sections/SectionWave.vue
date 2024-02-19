<template>
  <div class="sectionWave">
    <div class="sectionWave_content">
      <div class="sectionWave_content_text">
        <h2 v-motion-slide-visible-left class="sectionWave_content_text_title">
          {{ data.title }}
        </h2>
        <p v-if="data.subtitle" v-motion-slide-visible-left class="sectionWave_content_text_subtitle" >{{ data.subtitle }}</p>
      </div>

      <!-- <div v-if="data.waveRight" v-motion-slide-visible-right class="waveBannerRight" style="overflow: hidden;">
          <div style="height: 100%; overflow: hidden;" ><svg viewBox="0 0 500 150" preserveAspectRatio="none" style="height: 100%; width: 100%;"><path d="M174.09,-17.25 C248.02,37.02 134.59,74.52 202.98,150.00 L500.00,150.00 L500.00,0.00 Z" style="stroke: none; fill: #f05677;"></path></svg></div>
      </div> -->
      <div v-if="data.waveRight" v-motion-slide-visible-right class="waveBanner" style="overflow: hidden; height: 100%">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" style="height: 100%; width: 100%;"><path d="M213.19,0.00 C152.69,70.06 270.03,70.06 202.98,150.00 L500.00,150.00 L500.00,0.00 Z" style="stroke: none; fill: #f05677;"></path>
        </svg>
      </div>

      <div v-else v-motion-slide-visible-left class="waveBanner" style="overflow: hidden">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          style="height: 100%; width: 100%"
        >
          <path
            d="M208.09,0.00 C152.69,67.10 262.02,75.98 200.80,150.00 L0.00,150.00 L0.00,0.00 Z"
            style="stroke: none; fill: #f05677"
          ></path> 
        </svg>
      </div>
    
</div>
  </div>
</template>

<script>
export default{
    props:{
        data:{
            default: null
        }
    }
}
</script>

<style scoped>

.sectionWave_content{
    display: flex;
    flex-direction: row;
    min-height: 95vh; 
}

.sectionWave_content_text{
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 50px;
    z-index: 1;

}

.sectionWave_content_text_title{
    /* font-size: 55px; */
    max-width: 705px;
    color: white;
    text-transform: uppercase;
    line-height: 70.35px;
}
.sectionWave_content_text_subtitle{
    max-width: 605px;
    margin-top: 30px;
    color: white;
    line-height: 38px;
    font-size: 25px;
}
.waveBanner{
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    width: 185%;
    height: 100%;
}
.waveBannerRight{
    overflow: hidden;
    position: absolute;
    right: -80%;
    top: 0;
    bottom: 0;
    height: 100%;
}

@media (max-width:650px){
.sectionWave_content_text_title{

line-height: 48px;
}
.sectionWave_content_text_subtitle{
  font-size: 16px;
  line-height: 34px;
}
}
</style>
