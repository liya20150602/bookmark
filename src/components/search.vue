<template>
  <div class="search">
    <el-select v-model="select" style="width: 80px;">
      <el-option label="谷歌" value="google"></el-option>
      <el-option label="百度" value="baidu"></el-option>
      <el-option label="必应" value="bing"></el-option>
    </el-select>
    <el-autocomplete class="auto-search"
      v-model="searchKeyWord"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      :trigger-on-focus=false
      @select="handleSelect"
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
        select: 'baidu',
        searchKeyWord: '',
        restaurants:[]
      }
    },
    methods:{
      querySearchAsync(queryString, cb) {
        const _cb = "findSuggestions"
        const qsData = {
          'wd': this._.trim(this.searchKeyWord),
          'p': '3',
          'cb': _cb,
          't': new Date().getMilliseconds().toString()
        }
        this.$http({
          method: 'get',
          url: "http://suggestion.baidu.com",
          params: qsData,
        }).then(res => {
          if (res.status === 200) {
            //格式 findSuggestions({q:"电影",p:false,s:["电影天堂"]});
            const cbNameStart = res.data.indexOf("(")
            const cbNameEnd = res.data.indexOf(")")
            let resultData = res.data.substring(cbNameStart + 1, cbNameEnd).replace("\\","") // 获取（）中部分

            //字符串处理q=>"q" 否则JSON.parse解析不了
            const tempResultData = []
            resultData.split(",").forEach(item => {
              tempResultData.push(item.replace(/(\w+):/, "\"$1\":"))
            })

            //获取联想返回的数据，s属性
            let resultData_s = tempResultData.join(",")
            resultData_s = JSON.parse(resultData_s).s

            if(resultData_s.length>0){
              resultData_s.forEach(value => {
                this.restaurants.push({"key": value, "value": value})
              })
            }else {
              this.restaurants=[]
            }

            cb(this.restaurants);
          }
        }).catch(err => {
          throw err
        })
      },
      handleSelect(item) {
        console.log(item);
        window.open('https://www.baidu.com/s?wd='+item.key)
      }
    }
  }
</script>
