<template>
  <div class="tabs">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        :key="item.id"
        v-for="(item, index) in categoryTabs"
        :label="item.categoryName"
        :name="item.categoryName"
      >
        <ul>
          <li :key="item.id"
              v-for="(item,index) in bookmarks"
              :class="{'animated1':delBtnShow, 'shake':delBtnShow,'zoomOutDown':del}"
              @mouseenter.stop="liMouseEnter" @mouseleave.stop="liMouseLeaveOut">
            <a @click="jumpUrlOrPanel(item)" class="tab-icon" :class="{opacity:delBtnShow}" target="_blank" @contextmenu.prevent="rightClick">
              <div v-if="item.bookmarkPhoto && !item.bookmarkColor" class="tab-icon-img":style="{backgroundImage:'url('+require('./../assets/icon/tianmao.png')+')'}">
                <i v-show="delBtnShow" class="delete-btn el-icon-circle-close-outline" @click.stop="delUrl"></i>
                <i v-show="editBtnShow" @click.stop="editUrl" class="edit-btn el-icon-edit-outline"></i>
              </div>
              <div v-if="!item.bookmarkPhoto && item.bookmarkColor" :style="{backgroundColor:item.bookmarkColor}" class="tab-icon-default">
                {{item.bookmarkTitle.substring(0,2)}}
                <i v-show="delBtnShow" class="delete-btn el-icon-circle-close-outline" @click.stop="delUrl"></i>
                <i v-show="editBtnShow" @click.stop="editUrl" class="edit-btn el-icon-edit-outline"></i></div>
            </a>
            <p>{{item.bookmarkTitle}}</p>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
  import animate from 'animate.css'
  import service from '@/api/service'

  export default {
    data() {
      return {
        activeName: 'first',
        delBtnShow: false,
        editBtnShow: false,
        del: false,
        categoryTabs: [],
        bookmarks:[]
      };
    },
    props: {
      clickCount: Number
    },
    mounted() {
      //获取书签分类
      this.getBookmarkCategory()
      const $body = document.getElementsByClassName("main")[0]
      $body.addEventListener("click", () => {
        this.delBtnShow = false
      })
    },
    methods: {
      getBookmarkCategory() {
        service.getBookmarkCategory().then(data => {
          data.forEach(value => {
            if (value.current) {
              this.activeName = value.categoryName
              //获取书签
              this.getBookmarks(value.id)
            }
          })
          this.categoryTabs = data
        })
      },
      getBookmarks(categoryId){
        service.getBookmarks({categoryId:categoryId}).then(data=>{
          this.bookmarks = data
        })
      },
      jumpUrlOrPanel(item){
        if(item.bookmarkType==0){
          window.open(item.bookmarkUrl)
        }else if(item.bookmarkType==1){
          // 显示右侧面板
        }
        console.log(item)
      },
      handleClick(tab, event) {
        console.log(tab, event);
        this.getBookmarks(this.categoryTabs[tab.index].id)
      },
      rightClick(){
        this.delBtnShow = true
      },
      editUrl() {

        console.log("eidt")
      },
      delUrl() {
        this.del = true
        console.log('确认删除')
      },
      liMouseEnter(event) {
        if (this.delBtnShow) {
          this.editBtnShow = true
          console.log("删除状态下，鼠标依")
        }
      },
      liMouseLeaveOut() {
        if (this.delBtnShow) {
          this.editBtnShow = false
          console.log("删除状态下，鼠标移出")
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .animated {
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-duration: 2s;
    animation-duration: 2s;
  }

  .zoomOutDown {
    -webkit-animation-iteration-count: 1;
    animation-iteration-count: 1;
  }

  .tabs {
    width: 80%;
    margin: 20px auto;
    color:#fff;
    .el-tabs--border-card{
      >.el-tabs__header{
        background:rgba(0,0,0,0.2);
        border-bottom:0
      }
      background-color: transparent;
      border:0;
      box-shadow:none;
      -webkit-box-shadow: none;
    }
    ul {
      text-align: left;
      li {
        display: inline-block;
        width: calc(100% / 6);
        height: 143px;
        text-align: center;
        padding: 2%;
        position: relative;
        .tab-icon{
          display: block;
          .tab-icon-img,
          .tab-icon-default{
            position: relative;
            width: 110px;
            height: 110px;
            margin-right: auto;
            margin-left: auto;
            cursor: pointer;
            transition: all .2s linear;
            border-radius: 10%;
            background-position: center;
            background-size: 100%;
            box-shadow: rgba(0,0,0,.3) 1px 1px 10px;
            .delete-btn {
              position: absolute;
              top: -4px;
              right: -7px;
              width: 20px;
            }
            .edit-btn {
              position: absolute;
              top: 50%;
              left: 50%;
              width: 50%;
              height: 43%;
              font-size: 36px;
              color: #fff;
              transform: translate(-50%, -50%);
            }
          }
          &.opacity:hover {
            opacity: 0.5;
          }
          .tab-icon-default{
           background-color: #eee;
            line-height: 110px;
          }
        }

        p{
          margin-top:10px;
        }
        a:hover {
          img {
            box-shadow: 1px 1px 8px 2px rgba(70, 107, 208, 0.2);
          }

        }
      }

    }
  }
</style>
