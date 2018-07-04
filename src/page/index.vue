<template>
  <div>
    <top></top>
    <search></search>
    <tab></tab>
  </div>
</template>
<script>
  import top from '@/components/header'
  import search from '@/components/search'
  import tab from '@/components/tab'
  export default {
    name:'index',
    components:{top, search, tab},
    data(){
        return{
          // backgroundImage: "url(" + require("../../assets/save.png") + ")",
        }
    },
    mounted(){
      this.changeBg()
    },
    methods:{
      changeBg(){
        const $body=document.getElementsByTagName("body")[0]
        $body.style.background="url('"+require('../assets/bg/bg1.jpg')+"') no-repeat 0 center"
        $body.style.backgroundSize="100%"
        console.log($body)
      }
    }
  }
</script>
<style>

</style>
