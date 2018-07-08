<template>
  <div >
    <div class="main" :style="{zoom:zoom}">
      <top></top>
      <search></search>
      <tab ></tab>
      <div id="randomChangeWallpaper" @click="getRandomBgImg">
        <img id="fengche" i18n-title="randomWallpaper" src="./../assets/bg/fengche.png">
        <div id="fengchegan"></div>
      </div>
    </div>

  </div>
</template>
<script>
  import top from '@/components/header'
  import search from '@/components/search'
  import tab from '@/components/tab'
  import service from '@/api/service'

  export default {
    name: 'index',
    components: {top, search, tab},
    data() {
      return {
        bgImgId: '',
        zoom:1
      }
    },
    mounted() {
      this.getRandomBgImg()
      window.addEventListener("resize",this.getZoom)
    },
    methods: {
      getZoom(){
        const $clientWidth = window.screen.width;
        const $bodyWidth = document.body.clientWidth;
        let ratio = ($bodyWidth / $clientWidth).toFixed(2)
        this.zoom = ratio < 0.5 ? 0.5 : ratio
      },
      getRandomBgImg() {
        let param = {}
        if (this.bgImgId !== '') {
          param = {id: this.bgImgId}
        }
        service.getRandomBgImg(param).then(res => {
          this.bgImgId = res.id
          const $body = document.getElementsByTagName("body")[0]
          $body.style.background = "url('" + res.bgImgUrl + "') no-repeat 0 center"
          $body.style.backgroundSize = "100%"
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  #fengche {
    position: absolute;
    z-index: 3;
    bottom: 20px;
    right: 0;
    width: 40px;
    cursor: pointer;
    transition: all 3s linear;
  }

  #fengchegan {
    position: absolute;
    z-index: 2;
    bottom: 0;
    right: 17px;
    width: 5px;
    height: 30px;
    transition: all .6s linear;
    background-color: red;
  }
</style>
