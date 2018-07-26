<template>
  <div >
    <div class="main" :style="{zoom:zoom}">
      <top></top>
      <search></search>
      <tab ></tab>
      <div class="loading" @click="getRandomBgImg">
        <p >切换<span :class="{'witchBg':witchClass}"> </span></p>
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
        zoom:1,
        witchClass: false
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
        this.witchClass=true
        service.getRandomBgImg(param).then(res => {
          this.bgImgId = res.id
            setTimeout(()=>{
              console.log(res)
              const $body = document.getElementsByTagName("body")[0]
              $body.style.background = "url('" + res.bgImgUrl + "') no-repeat 0 center"
              $body.style.backgroundSize = "100%"
              this.witchClass=false
              console.log(res.bgImgUrl )
            },900)

        }).catch(err => {
          console.log(err)
          this.witchClass=false
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .loading{
    position: absolute;
    z-index: 3;
    bottom: 50px;
    right: 50px;
    width: 40px;
    cursor: pointer;
    transition: all 3s linear;
    p{
      position:absolute;
      left:0;
      right:0;
      top:0;
      bottom:0;
      margin:auto;
      height:50px;
      width:50px;
      text-align: center;
      line-height:50px;
      font-size: 14px;
      color:#f1d32f;
      -webkit-animation: fontSize 3s linear infinite;
      span{
        position:absolute;
        display:block;
        height:50px;
        width:50px;
        border-radius:50%;
        -webkit-box-shadow:0 3px 8px rgba(12,143,234,0.9);
        box-shadow:0 3px 8px rgba(12,143,234,0.9);
        left:0;
        top:0;
      }
    }
  }
  @-webkit-keyframes loading {
    to {
      -webkit-transform: rotate(0)
    }
    from {
      -webkit-transform: rotate(-360deg)
    }
  }
  @-webkit-keyframes fontSize {
    0% {
      font-size: 14px;
    }
    50% {
      font-size: 18px;
    }
    100%{
      font-size: 14px;
    }
  }
  .witchBg{
    -webkit-animation: loading .3s linear infinite;
  }
</style>
