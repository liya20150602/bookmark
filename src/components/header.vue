<template>
  <div class="top">
    <div class="header">
      <div class="logo">
        <img src="./../assets/logo.png" alt=""/>
      </div>
      <div class="systemTime">
        {{time}}
      </div>
      <div class="login" >
        <a  @click="dialogFormVisible = true">登录</a>
      </div>
      <el-dialog title="注册|登录" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="form.tel" auto-complete="off"></el-input>
            <a href=""> 获取验证码</a>
          </el-form-item>
          <el-form-item label="验证码" :label-width="formLabelWidth">
            <el-input v-model="form.code" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import service from './../api/service.js';
export default {
  name: 'top',
  data(){
    return {
      time: '',
      dialogFormVisible: false,
      form: {
        tel: '',
        code: ''
      },
      formLabelWidth: '120px'
    }
  },
  mounted(){
    this.initWeather()
    this.formatTime()
  },
  methods:{
    initWeather(){
      (function(T,h,i,n,k,P,a,g,e){g=function(){P=h.createElement(i);a=h.getElementsByTagName(i)[0];P.src=k;P.charset="utf-8";P.async=1;a.parentNode.insertBefore(P,a)};T["ThinkPageWeatherWidgetObject"]=n;T[n]||(T[n]=function(){(T[n].q=T[n].q||[]).push(arguments)});T[n].l=+new Date();if(T.attachEvent){T.attachEvent("onload",g)}else{T.addEventListener("load",g,false)}}(window,document,"script","tpwidget","//widget.seniverse.com/widget/chameleon.js"))
      tpwidget("init", {
        "flavor": "slim",
        "location": "WX4FBXXFKE4F",
        "geolocation": "enabled",
        "language": "zh-chs",
        "unit": "c",
        "theme": "chameleon",
        "container": "tp-weather-widget",
        "bubble": "enabled",
        "alarmType": "badge",
        "uid": "UF6777F480",
        "hash": "7ffc653ddb6b9acac3aedbe1bc32ac1d"
      });
      tpwidget("show");
    },
    formatTime(){
      setInterval(()=>{
        this.time=this.$moment().format("YYYY年MM月DD日 HH:mm:ss dddd")
      },1000)

    },
    login(){
      console.log("登录")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
  .top{
    background: rgba(0,0,0,.2);
    .header{
      width: 90%;
      margin: 0 auto;
      height: 40px;
      .logo{
        width:88px;
        height:100%;
        float:left;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .systemTime{
        text-align: right;
        display: inline-block;
        width:70%;
        line-height: 40px;
      }
      .login{
        float: right;
        display: inline-block;
        line-height: 40px;
        width: 10%;
        height: 40px;
        color: #535FFF;
        cursor: pointer;
        a{
          height: 100%;
          display: block;
        }
      }
    }
  }

</style>
