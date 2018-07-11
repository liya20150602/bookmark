<template>
  <div class="right-sidebar" v-show="show">
    <div class="close" @click="close">x</div>
    <div class="title">编辑图标</div>
    <div class="edit-content">
      <img src="" alt="">
      <el-input v-model="item"></el-input>
    </div>
  </div>
</template>
<script>


  export default {
    name: 'sidebar',
    props: {
      show: Boolean,
      close:Function,
      item:Object
    },
    data() {
      console.log("show:", (this.item))
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      closeSidebar() {
        this.show = false
      }
    }
  }
</script>
<style lang="scss" scoped>
  .right-sidebar{
    position: absolute;
    top:0;
    right:0;
    width: 400px;
    height: 100%;
    background: #fff;
    color:#000;
    padding:10px;
    .close{
      text-align: right;
      cursor: pointer;
    }
    .edit-content{
      width: 100%;
      background: #fefefe;
    }
  }
</style>
