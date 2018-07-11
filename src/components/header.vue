<template>
  <div class="top">
    <div class="header">
      <div class="logo">
        <img src="./../assets/logo.png" alt=""/>
      </div>
      <div class="systemTime">
        {{time}}
      </div>
      <div class="login" v-if="!userInfo">
        <a  @click="dialogFormVisible = true">登录</a>
        <a  @click="regFormVisible = true">注册</a>
      </div>
      <div class="personal" v-else>
        <el-dropdown trigger="click"@command="handleCommand">
          <span class="el-dropdown-link">
            {{userInfo.loginName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown"  >
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-dialog title="登录"  :visible.sync="dialogFormVisible" width="460px" custom-class="loginForm">
        <p class="error" v-if="loginErr"><i class="el-icon-warning"></i>{{loginErr}}</p>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="userName">
            <el-input v-model="loginForm.userName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" prop="pwd">
            <el-input type="password" v-model="loginForm.pwd" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item >
            <el-button @click="dialogFormVisible = false">关 闭</el-button>
            <el-button type="primary" @click="login('loginForm')">登 录 </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="注册" :visible.sync="regFormVisible" width="460px" custom-class="regForm">
        <p class="error" v-if="regErr"><i class="el-icon-warning"></i>{{regErr}}</p>
        <el-form :model="regForm" status-icon :rules="regRules" ref="regForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="userName">
            <el-input  maxlength="100" v-model="regForm.userName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input type="password" minlength="6" v-model="regForm.pwd" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input  v-model="regForm.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="regFormVisible = false">关 闭</el-button>
            <el-button type="primary" @click="register('regForm')">注 册</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import service from '@/api/service'
  import AsyncValidator from 'async-validator'
export default {
  name: 'top',
  data(){

    var validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        if(value.length<100){
          this.checkUserName(callback)
        }else {
          callback(new Error('用户名太长'));
        }

      }
    };
    var validateEmail=(rule,value,callback)=>{
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else {
        var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        if(re.test(value)){
          this.checkEmail(callback)
        }else {
          callback(new Error('请输入正确的邮箱地址'));
        }
      }
    }
    return {
      time: '',
      dialogFormVisible: false,
      regFormVisible:false,
      loginForm: {
        userName: '',
        pwd: ''
      },
      rules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        pwd: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
      regForm: {
        pwd: '',
        checkPass: '',
        age: ''
      },
      regRules: {
        userName: [
          { required: true,validator: validateUserName, trigger: 'blur' }
        ],
        pwd: [
          { required: true, pattern: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,trigger: 'change', message: '不少于6位，包含大小写，数字，特殊字符',}
        ],
        email: [
          {required: true,type:'email',validator: validateEmail, trigger: 'change' }
        ]
      },

      formLabelWidth: '80px',
      loginErr:'',
      regErr:'',
      userInfo:''
    }
  },
  mounted(){
    this.initWeather()
    this.formatTime()
    this.getUserInfo()
  },
  watch:{
    'loginForm.userName':function (val) {
      this.loginErr=''
    },
    'loginForm.pwd':function (val) {
      this.loginErr=''
    },
    'regForm.userName':function (val) {
      this.regErr=''
    },
    'regForm.pwd':function (val) {
      this.regErr=''
    },
    'regForm.email':function (val) {
      this.regErr=''
    }
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
    login(formName){
      const para={
        account:this.loginForm.userName,
        password:this.loginForm.pwd
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          service.login(para).then(res=>{
            if(res.state==1){
              // 登录成功
              localStorage.setItem('userInfo',JSON.stringify(res.data))
              this.dialogFormVisible=false
            }else {
              this.loginErr=res.msg
            }
          }).catch(err=>{
            this.loginErr=err.msg
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    checkUserName(callback){
      service.checkLoginName({loginName:this.regForm.userName}).then(data=>{
        if(data.state==2){
          callback(new Error("用户名已经存在"))
        }else {
          callback()
        }
      }).catch(err=>{
        callback(new Error("接口错误请稍后重试"))
      })
    },
    checkEmail(callback){
      service.checkEmail({email:this.regForm.email}).then(data=>{
        if(data.state==2){
          callback(new Error("邮箱已经存在"))
        }else {
          callback()
        }
      }).catch(err=>{
        callback(new Error("接口错误请稍后重试"))
      })
    },
    register(formName){
      const para={
        loginName:this.regForm.userName,
        password:this.regForm.pwd,
        email:this.regForm.email
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
      service.register(para).then(data=>{
        if(data.state){
          //注册成功
          localStorage.setItem('userInfo',JSON.stringify(res.data))
          this.regFormVisible=false
        }else {
          //注册失败
        }

      }).catch(err=>{

      })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getUserInfo(){
      let userInfo=localStorage.getItem('userInfo')
      if(userInfo){
        userInfo=JSON.parse(userInfo)
      }
      this.userInfo=userInfo
    },
    handleCommand(command){
      console.log(command)
      if(command=="logout"){
        this.logout()
      }
    },
    logout(){
      service.logout().then(res=>{
        if(res.state==1){
          // 登出成功
          localStorage.setItem('userInfo','')
          this.userInfo=""
        }
      }).catch(err=>{
      })
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
      color:#fff;
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
      .login,
      .personal{
        float: right;
        display: inline-block;
        line-height: 40px;
        width: 10%;
        height: 40px;
        color: #fff;
        cursor: pointer;
        a{
          height: 100%;
          &+a{
            padding-left: 10px;
          }
        }
        .el-dropdown{
          color: #fff;
        }
      }
    }
    .error{
      color:red;
      padding-bottom: 20px;
      i{
        padding-right: 4px;
      }
    }
  }
  .loginForm{
    width: 300px;
  }
</style>
