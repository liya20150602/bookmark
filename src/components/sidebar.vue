<template>
  <div class="right-sidebar" v-show="show">
    <div class="close" @click="closeSidebar">x</div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="添加" name="first">
        <toolPane></toolPane>
      </el-tab-pane>
      <el-tab-pane label="我的" name="second">我的</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import toolPane from './toolPane'

  export default {
    name: 'sidebar',
    components: {toolPane},
    props: {
      show: Boolean
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      closeSidebar() {
       this.$emit("close")
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
    padding:10px;
    z-index:1000;
    .close{
      text-align: right;
      cursor: pointer;
    }
  }
</style>
