<template>
  <div class="toolPane">
    <div class="search">
      <el-input
        placeholder="请输入内容"
        v-model="search">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button @click="add">
        <i class="el-icon-plus"></i>
      </el-button>
    </div>
    <el-tabs  tab-position="left"  v-model="editableTabsValue2" @tab-click="tabClick" >
      <el-tab-pane
        v-for="(item, index) in editableTabs2"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        {{item.content}}
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
  export default {
    data(){
      return{
        search:'',
        editableTabsValue2:'用户管理',
        editableTabs2: [{
          title: '用户管理',
          name: '用户管理',
          content: '用户管理sss'
        }, {
          title: '配置管理',
          name: '配置管理',
          content: '配置管理 content'
        }, {
          title: '定时任务补偿',
          name: '定时任务补偿',
          content: '定时任务补偿 content'
        }],
        tabIndex: 2
      }
    },
    methods: {
      tabClick(tab){
        this.editableTabs2[tab.index].content="我是被添加的"
        console.log(tab.index)
        console.log(tab.name)
      },
      add(){
        console.log("增加")
      }
    }
  }
</script>

<style lang="scss" scoped>
  .toolPane{
    .search{
      margin: 20px 0;
      .el-input{
        width:70%;
      }
    }
    .el-tabs__item{
      background: yellow;
    }
    .el-tabs{

      .el-tabs__nav{
        background: red;
      }
      .el-tabs--top .el-tabs--left .el-tabs__item:nth-child(2){
        text-align: left;
        padding-left:0
      }
    }

  }
</style>
