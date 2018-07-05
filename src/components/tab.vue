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
              :class="{'animated':delBtnShow, 'shake':delBtnShow,'zoomOutDown':del}"
              @mouseenter.stop="liMouseEnter" @mouseleave.stop="liMouseLeaveOut">
            <a :href="item.bookmarkUrl" class="img-icon" target="_blank" @contextmenu.prevent="editUrl()">
              <!--<img v-if="item.bookmarkPhoto && !item.bookmarkColor" :class="{'opacity':editBtnShow}" :src="item.bookmarkPhoto" alt="">-->
              <img v-if="item.bookmarkPhoto && !item.bookmarkColor":class="{'opacity':editBtnShow}" src="./../assets/icon/tianmao.png" alt="">
              <div v-if="!item.bookmarkPhoto && item.bookmarkColor" :style="{backgroundColor:item.bookmarkColor}" class="img-icon-default">sss</div>
            </a>

            <i v-show="delBtnShow" class="delete-btn el-icon-circle-close-outline" @click="delUrl"></i>
            <i v-show="editBtnShow" class="edit-btn el-icon-edit-outline"></i>
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
      handleClick(tab, event) {
        console.log(tab, event);
        this.getBookmarks(this.categoryTabs[tab.index].id)
      },
      editUrl() {
        this.delBtnShow = true
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

    ul {
      text-align: left;
      li {
        display: inline-block;
        width: calc(100% / 5);
        height: 143px;
        text-align: center;
        padding: 2%;
        position: relative;
        .img-icon{
          width: 110px;
          height: 110px;
          display: block;
          &.opacity {
            opacity: 0.5;
          }
          img{
            width: 100%;
            height: 100%;
            border-radius: 12% !important;
          }
          .img-icon-default{
            width: 100%;
            height: 100%;
            background: #eee;
            border-radius: 12% !important;
          }
        }

        .delete-btn {
          position: absolute;
          top: 2%;
          right: 0;
          width: 20px;
        }
        .edit-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 50%;
          height: 43%;
          font-size: 36px;
          color: #000;
          transform: translate(-50%, -50%);
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
