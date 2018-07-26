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
          >
            <a @click="jumpUrlOrPanel(item)" class="tab-icon" target="_blank" @contextmenu.prevent="rightClick">
              <div v-if="item.bookmarkPhoto && !item.bookmarkColor"
                   class="tab-icon-img"
                   :class="{opacity:delBtnShow}"
                   :style="{backgroundImage:'url('+item.bookmarkPhoto+')'}">
                <div class="tab-icon-option"></div>
                <i v-show="delBtnShow" class="delete-btn el-icon-circle-close-outline" @click.stop="delUrl"></i>
                <i @click.stop="editUrl(item)" class="edit-btn el-icon-edit-outline"></i>
              </div>
              <div v-if="!item.bookmarkPhoto && item.bookmarkColor"
                   class="tab-icon-default"
                   :class="{opacity:delBtnShow}"
                   :style="{backgroundColor:item.bookmarkColor}">
                {{item.bookmarkTitle.substring(0,2)}}
                <div class="tab-icon-option"></div>
                <i v-show="delBtnShow" class="delete-btn el-icon-circle-close-outline" @click.stop="delUrl"></i>
                <i @click.stop="editUrl(item)" class="edit-btn el-icon-edit-outline"></i>
              </div>
            </a>
            <p>{{item.bookmarkTitle}}</p>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
    <editSidebar v-if="showEditSidebar" :close="closeEditSidebar" :item="selectItem"></editSidebar>
  </div>

</template>

<script>
  import animate from 'animate.css'
  import service from '@/api/service'
  import editSidebar from '@/components/editSidebar'
  import utils from '@/utils/'
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        activeName: 'first',
        delBtnShow: false,
        del: false,
        showEditSidebar: false,
        selectItem: {},
        isLogin: false
      };
    },
    components: {editSidebar},
    props: {
      clickCount: Number
    },
    computed: mapState({
      userInfo: state => state.userName,
      token: state => state.token,
      bookmarks: state => state.bookmarks,
      categoryTabs: state => state.category
    }),
    mounted() {
      console.log(this.bookmarks)
      if (this.userInfo) {
        this.isLogin = true
      }
      //获取书签分类
      this.getBookmarkCategory()
      const $body = document.getElementsByClassName("main")[0]
      $body.addEventListener("click", () => {
        this.delBtnShow = false
      })


    },
    methods: {
      getBookmarkCategory() {
        this.$store.dispatch("getCategoryActions").then(res => {
          this.showCate(res)
        })
      },
      showCate(data) {
        data.forEach(value => {
          if (value.current) {
            this.activeName = value.categoryName
            //获取书签
            this.getBookmarks(value.id)
          }
        })
      },
      getBookmarks(categoryId) {
        this.$store.dispatch("getBookmarksAction", {categoryId: categoryId})
      },
      jumpUrlOrPanel(item) {
        if (item.bookmarkType == 0) {
          window.open(item.bookmarkUrl)
        } else if (item.bookmarkType == 1) {
          // 显示右侧面板
        }
      },
      handleClick(tab, event) {
        this.getBookmarks(this.categoryTabs[tab.index].id)
      },
      rightClick() {
        if (!this.userInfo) {
          this.delBtnShow = true
        } else {
          this.$message.warning("请先登录")
        }

      },
      editUrl(item) {
        this.showEditSidebar = true
        this.selectItem = item
      },
      delUrl() {
        this.del = true
      },
      closeEditSidebar(item) {
        this.showEditSidebar = false
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
    color: #fff;
    .el-tabs--border-card {
      > .el-tabs__header {
        background: rgba(0, 0, 0, 0.2);
        border-bottom: 0
      }
      background-color: transparent;
      border: 0;
      box-shadow: none;
      -webkit-box-shadow: none;
    }
    ul {
      text-align: left;
      li {
        display: inline-block;
        width: calc(100% / 8);
        height: 143px;
        text-align: center;
        padding: 2%;
        position: relative;
        .tab-icon {
          display: block;
          .tab-icon-img,
          .tab-icon-default {
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
            box-shadow: rgba(0, 0, 0, .3) 1px 1px 10px;
            .tab-icon-option {
              width: 100%;
              position: absolute;
              top: 0;
              left: 0;
              bottom: 0;
              z-index: 1;
            }
            .delete-btn {
              position: absolute;
              top: -12px;
              right: -14px;
              width: 20px;
              z-index: 2;
              font-size: 24px;
            }
            .edit-btn {
              position: absolute;
              top: 50%;
              left: 50%;
              width: 50%;
              height: 43%;
              font-size: 36px;
              color: #666;
              transform: translate(-50%, -50%);
              z-index: 2;
              display: none;
            }
          }
          .tab-icon-default {
            background-color: #eee;
            line-height: 110px;
          }
          &:hover {
            img {
              box-shadow: 1px 1px 8px 2px rgba(70, 107, 208, 0.2);
            }
            .opacity {
              .tab-icon-option {
                border-radius: 10%;
                background-color: rgba(255, 255, 255, 0.7);
              }
              .edit-btn {
                display: block;
              }
            }

          }
        }
        p {
          margin-top: 10px;
        }

      }

    }
  }
</style>
