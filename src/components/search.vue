<template>
  <div class="search">
    <el-select v-model="select" style="width: 80px;">
      <el-option label="谷歌" value="google"></el-option>
      <el-option label="百度" value="baidu"></el-option>
      <el-option label="必应" value="bing"></el-option>
    </el-select>
    <el-autocomplete
      v-model="input5"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      @select="handleSelect"
      class="auto-search"
    ></el-autocomplete>
  </div>
</template>
<style lang="scss" scoped>
  .search{
    width: 700px;
    margin: 20px auto;
    .append{
      .el-select .el-input {
        width: 60px;
      }
    }
    .auto-search{
      width: 400px;
      margin-left:-8px;
      .el-input{
        background: red;
      }
      .el-input__inner{
          border-left:none
        }
    }
    .input-with-select .el-input-group__prepend {
      background-color: #fff;
    }
  }

</style>
<script>
  export default {
    data() {
      return {
        input3: '',
        input4: '',
        input5: '',
        select: 'baidu'
      }
    },
    methods:{
      querySearchAsync(queryString, cb) {
        console.log(queryString )
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          // cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      }
    }
  }
</script>
