<template>
  <div class="tabs">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">
        <ul>
          <li :class="{'animated':delBtnShow, 'shake':delBtnShow,'zoomOutDown':del}"
            @mouseenter="liMouseEnter" @mouseleave="liMouseLeaveOut">
            <a href="#" target="_blank" @contextmenu.prevent="editUrl()">
              <img  :class="{'opacity':editBtnShow}" src="./../assets/icon/tianmao.png" alt=""></a>
              <i v-show="delBtnShow" class="delete-btn el-icon-circle-close-outline" @click="delUrl"></i>
              <i v-show="editBtnShow" class="edit-btn el-icon-edit-outline"></i>
            <p>111</p>
          </li>
          <li :class="{'animated':delBtnShow, 'shake':delBtnShow,'zoomOutDown':del}"
              @mouseenter="liMouseEnter" @mouseleave="liMouseLeaveOut">
            <a href="#" target="_blank" @contextmenu.prevent="editUrl()">
              <img  :class="{'opacity':editBtnShow}" src="./../assets/icon/tianmao.png" alt=""></a>
            <i v-show="delBtnShow" class="delete-btn el-icon-circle-close-outline" @click="delUrl"></i>
            <i v-show="editBtnShow" class="edit-btn el-icon-edit-outline"></i>
            <p>111</p>
          </li>
          <li :class="{'animated':delBtnShow, 'shake':delBtnShow}">
            <a href="#" target="_blank" @contextmenu.prevent="editUrl()">
              <img src="./../assets/icon/tianmao.png" alt=""></a>
            <i v-show="delBtnShow" class="delete-btn el-icon-circle-close-outline" @click="delUrl"></i>
            <p>111</p>
          </li>
          <li>
            <img src="./../assets/icon/tianmao.png" alt="">
            <p>111</p>
          </li>
          <li>
            <img src="./../assets/icon/tianmao.png" alt="">
            <p>111</p>
          </li>
          <li>
            <img src="./../assets/icon/tianmao.png" alt="">
            <p>111</p>
          </li>
          <li>
            <img src="./../assets/icon/tianmao.png" alt="">
            <p>111</p>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
  import animate from 'animate.css'
  export default {
    data() {
      return {
        activeName: 'first',
        delBtnShow: false,
        editBtnShow: false,
        del:false
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      editUrl(){
        this.delBtnShow=true
        console.log("eidt")
      },
      delUrl(){
        this.del=true
        console.log('确认删除')
      },
      liMouseEnter(){
        if(this.delBtnShow){
          this.editBtnShow=true
          console.log("删除状态下，鼠标依")
        }
      },
      liMouseLeaveOut(){
        if(this.delBtnShow){
          this.editBtnShow=false
          console.log("删除状态下，鼠标移出")
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .animated{
    -webkit-animation-iteration-count:infinite;
    animation-iteration-count:infinite;
    -webkit-animation-duration: 2s;
    animation-duration: 2s;
  }
  .zoomOutDown{
    -webkit-animation-iteration-count:1;
    animation-iteration-count:1;
  }
  .tabs{
    width:80%;
    margin:20px auto;

    ul{
        li{
          display: inline-block;
          width: 7%;
          text-align: center;
          padding:2%;
          position: relative;
          img{
            width: 100%;
            height: 100%;
            border-radius: 12px;
            &.opacity{
              opacity: 0.5;
            }
          }
          .delete-btn{
            position:absolute;
            top:2%;
            right:0;
            width: 20px;
          }
          .edit-btn{
            position: absolute;
            top:50%;
            left:50%;
            width: 50%;
            height: 43%;
            font-size: 36px;
            color:#000;
            transform: translate(-50%, -50%);
          }
        a:hover{
          img{
            box-shadow: 1px 1px 8px 2px rgba(70,107,208,0.2);
          }

        }
      }

    }
  }
</style>
