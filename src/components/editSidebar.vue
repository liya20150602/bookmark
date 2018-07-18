<template>
  <div class="right-sidebar">
    <div class="close" @click.stop="close">x</div>
    <div class="title">编辑图标</div>
    <div class="edit-content">
      <div class="bookmark-form">
        <div class="tab-icon-img">
          <img  v-if="item.bookmarkPhoto && !item.bookmarkColor"  :src="item.bookmarkPhoto" alt="">
          <p v-else :style="{background:item.bookmarkColor}">{{item.bookmarkTitle.substring(0,2)}} </p>
        </div>
        <el-form  :model="copyItem" status-icon  ref="form">
          <el-form-item>
            <el-input v-model="copyItem.bookmarkUrl" placeholder="网站地址" class="input"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="copyItem.bookmarkTitle" placeholder="网站名称"  class="input"></el-input>
          </el-form-item>


          <el-form-item>
            <el-button type="primary update-button" :disabled="buttonDisable" @click.stop="updateBookMark">更新</el-button>
          </el-form-item>
        </el-form>
      </div>


    </div>
  </div>
</template>
<script>
  import utils from '@/utils/'

  export default {
    name: 'sidebar',
    props: {
      close:Function,
      item:Object
    },
    data() {
      console.log(this.item)
      return {
        buttonDisable: false,
        copyItem:Object.assign({},this.item)
      };
    },
    watch:{
      copyItem:{
        handler(curVal){
          if( !utils.isNul(curVal.bookmarkUrl)&& !utils.isNul(curVal.bookmarkTitle)){
            this.buttonDisable=false
          }else {
            this.buttonDisable=true
          }
        },
        deep: true
      },
      item(val){
        this.copyItem=Object.assign({},this.item)
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      updateBookMark(){
        //更新
        console.log('更新',this.copyItem)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .right-sidebar{
    position: absolute;
    top:0;
    right:0;
    bottom: 0;
    width: 400px;
    background: #fff;
    color:#000;
    padding:10px;
    .close{
      text-align: right;
      cursor: pointer;
    }
    .edit-content{
      position: absolute;
      top:60px;
      bottom: 0px;
      left:0;
      width: 400px;
      background: #e6e6e6;
      .bookmark-form{
        box-sizing: border-box;
        width: 100%;
        padding:20px;
        .tab-icon-img{
          width: 120px;
          height: 120px;
          line-height: 120px;
          margin: 20px auto;
          p,img{
            width: 100%;
            height: 100%;
            border-radius: 10%;
            color: #fff;
          }
        }
        .update-button{
          width: 80%;
        }
      }

    }
  }
</style>
