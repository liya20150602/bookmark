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
        <a  @click="regFormVisible = true">注册</a>
      </div>
      <el-dialog title="登录"  :visible.sync="dialogFormVisible" custom-class="loginForm">
        <p class="error" v-if="loginErr">{{loginErr}}</p>
        <el-form :model="form" :rules="rules" ref="loginForm">
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="userName">
            <el-input v-model="form.userName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" prop="pwd">
            <el-input type="password" v-model="form.pwd" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="login('loginForm')">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="注册" :visible.sync="regFormVisible"  custom-class="regForm">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="regForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="密码" prop="pwd">
            <el-input type="password" v-model="ruleForm2.pwd" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="ruleForm2.age"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('regForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="regFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="register('regForm')">确 定</el-button>
        </div>
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

    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        // this.checkEmail(callback)
        if (this.ruleForm2.pwd !== '') {
          this.$refs.regForm.validateField('pwd');
        }
        callback();
      }
    };
    return {
      time: '',
      dialogFormVisible: false,
      regFormVisible:false,
      form: {
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
      regRules: {
        pwd: [
          { validator: validatePass, trigger: 'blur' }
        ]
      },

      formLabelWidth: '120px',
      loginErr:'',
      ruleForm2: {
        pwd: '',
        checkPass: '',
        age: ''
      },
      rules2: {
        pwd: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  mounted(){
    this.initWeather()
    this.formatTime()
  },
  watch:{
    'regForm.userName'(val){
      this.checkUserName()
    },
    'regForm.email'(val){
      this.checkEmail()
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
        account:this.form.userName,
        password:this.form.pwd
      }
      console.log(this.$refs[formName])
      this.$refs[formName].validate((valid) => {
        if (valid) {
          service.login(para).then(data=>{
            // this.dialogFormVisible=false
          }).catch(err=>{
            this.loginErr=err.msg
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });




    },
    checkUserName(){
      service.checkLoginName({loginName:this.regForm.userName}).then(data=>{

      }).catch(err=>{

      })
    },
    checkEmail(){
      service.checkEmail({email:this.regForm.email}).then(data=>{
console.log(new Error("邮箱已经存在"))
      }).catch(err=>{

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
        this.regFormVisible=false
      }).catch(err=>{

      })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
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
      .login{
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
      }
    }
  }
  .loginForm{
    width: 300px;
  }
</style>
