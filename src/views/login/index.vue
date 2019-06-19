<template>
  <div class="login-container">
    <div class="login">
      <div class="form-box">
        <!--<img src="../../assets/img/login_logo.png" alt="logo" class="login-img">-->
        <div class="logo">中国国家肺癌和结直肠癌筛查管理平台</div>
        <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm"
                 label-width="0px"
                 class="card-box login-form">
          <!--<el-form-item prop="loginName">
            <el-input name="loginName" type="text" v-model="loginForm.loginName" autoComplete="on" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input name="pwd" type="password"  v-model="loginForm.pwd" autoComplete="on"
              placeholder="密码" @keyup.enter.native="handleLogin('loginForm')"  @blur="checkMsg()"></el-input>
          </el-form-item>-->
          <!--<el-form-item prop="pwd">
            <el-input name="pwd" type="password"  v-model="loginForm.pwd" autoComplete="on"
                      placeholder="密码" @keyup.enter.native="handleLogin('loginForm')"  @blur="checkMsg()"></el-input>
          </el-form-item>-->
          <el-form-item prop="loginType" class="login-input">
            <i class="icon iconfont icon-leixing"></i>
            <el-select v-model="loginForm.loginType" placeholder="请选择账户类型" style="width: 328px;">
              <el-option
                style="width: 246px;"
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="loginName" class="login-input">
            <i class="icon iconfont icon-yonghu"></i>
            <el-input name="loginName" type="text" v-model="loginForm.loginName" placeholder="用户名" ><i slot="prefix" class="el-input__icon iconfont icon-user"></i></el-input>
          </el-form-item>
          <el-form-item prop="pwd" class="login-input">
            <i class="icon iconfont icon-mima"></i>
            <el-input name="pwd" type="password" v-model="loginForm.pwd" placeholder="密码"> <i slot="prefix" class="el-input__icon iconfont icon-mima1"></i></el-input>
          </el-form-item>
          <el-form-item prop="capText">
            <el-input name="capText" type="text" v-model="loginForm.capText" autoComplete="on" style="width:145px;"
                      placeholder="图片校验码" @keyup.enter.native="handleLogin('loginForm')" class="yanzheng"></el-input>
            <span class="svg-container" @click="changeImgUrl"><img id="codeImg"
                                                                   style="width:100%;vertical-align:middle;height:38px;margin-top: -2px;"
                                                                   alt="点击更换" title="图片验证" :src="imgUrl"/></span>
            <el-button type="text" @click="changeImgUrl">看不清，换一张</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width:100%;" :loading="loading"
                       @click.native.prevent="handleLogin('loginForm')">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>


  </div>
</template>

<script>
  import {isWscnEmail} from 'utils/validate';
  import socialSign from './socialsignin';
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
  import ElForm from "../../../node_modules/element-ui/packages/form/src/form.vue";
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";
  export default {
    components: {
      ElInput,
      ElForm,
      ElButton,
      socialSign
    },
    name: 'login',
    data() {
      const validatePass = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'));
        } else {
          callback();
        }
      };
      return {
        disabled: false,
        nickName: '',
        imgUrl: SERVER_NAME + '/auth/authCode/images',
        testCode: '获取验证码',
        loginForm: {
          loginName: '',
          pwd: '',
          capText: '',
          loginType:window.localStorage.getItem('loginType') || '5'
        },
        options:[
          {
            value: '5',
            label: '招募机构'
          },
          {
            value: '3',
            label: '医院'
          },
          {
            value: '1',
            label: '国家'
          }
        ],
        loginRules: {
          loginName: [
            {required: true, message: '用户名不能为空', trigger: 'blur'}
          ],
          pwd: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ],
          capText: [
            {required: true, message: '请填写图片验证码', trigger: 'blur'}
          ],
          loginType: [
            {required: true, message: '请填写账户类型', trigger: 'blur'}
          ]
        },
        loading: false,
        showDialog: false,
        hospitalType: ''

      }
    },
    mounted(){
      this.changeImgUrl()
    },
    methods: {
      checkMsg(){
//        console.log('sfd');
      },
      changeImgUrl(){
        var num = Math.ceil(Math.random() * 10);
        this.imgUrl = SERVER_NAME + '/auth/authCode/images/?' + num
      },
      hasAuth(authName){
        localStorage.setItem(authName, authName)

      },
      handleLogin(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.isshow = false;
            $axios_http({
              url: '/auth/login',
              data: {
                loginname: this.loginForm.loginName,
                pwd: this.loginForm.pwd,
                capText: this.loginForm.capText,
                loginType:this.loginForm.loginType
              },
              vueObj: this
            }).then((res) => {
              this.hospitalType = res.data.result.hospitalType;
              var strCookie = document.cookie;
              if (res.data.status == 'SUCCESS') {
                var strCookie = document.cookie;
                var arrCookie = strCookie.split("; ");
                for (var i = 0; i < arrCookie.length; i++) {
                  var arr = arrCookie[i].split("=");
                  if ('nickName' == arr[0]) {
                    this.nickName = res.data.result.nickName
                  }
                }
                this.nickName = res.data.result.nickName
                var co = 'LOGINNAME=' + this.loginForm.loginName + ';TOKEN=' + res.data.result.token + ';nickName=' + this.nickName;
                window.localStorage.clear()
                window.sessionStorage.setItem('token', co);
                window.localStorage.setItem('name', res.data.result.nickName);
                window.localStorage.setItem('loginType', this.loginForm.loginType);
                this.$store.commit('get_name', window.localStorage.getItem('name'))
                window.localStorage.setItem('hospitalType', res.data.result.hospitalType);
                this.$store.commit('get_hospitalType', window.localStorage.getItem('hospitalType'))
                 if(this.$store.state.hospitalType != 5){
                   $axios_http({
                     url:"/index/find/deptment/tree",
                     data:{},
                   }).then((res)=>{
                     this.$store.state.regionOptions = res.data.result.children
                   })
                 }
                  $axios_http({
                    url: "/auth/user/resource",
                    data: {},
                    vueObj: this
                  }).then((res) => {
                    let btnArr = res.data.result.buttons;
                    let pageArr = res.data.result.pages;
                    for (var i = 0; i < btnArr.length; i++) {
                      this.hasAuth(btnArr[i]);
                    }
                    for (var j = 0; j < pageArr.length; j++) {
                      this.hasAuth(pageArr[j]);
                    }
                    this.$store.commit('allAuthResource', res.data.result.menu.child);
                    setTimeout(()=>{
                      this.$router.replace({path: '/home/home'})
                    },100)
                    //this.totalData = res.data.data.menu.child;
                  })


              } else  {

                //if (res.data.statusMsg === '811015'){
                $failMsg(this, res.data.statusMsg);
                //}
//                $failMsg(this, "账号或密码错误，请重新登录");
                this.isshow = true;

                // console.log("111111111111111111")
                // this.alerts = true;

//                console.log("登陆失败")
                // console.log(this.errmsg)
                //                 alert(res.data.statusCode + ' : ' + res.data.statusMsg);
              }
              //                if(res.response. == )
            }).catch((err) => {
//              console.log(err)
            })
          }
        })
      },

    },
    created() {
      // window.addEventListener('hashchange', this.afterQRScan);
    },
    destroyed() {
      // window.removeEventListener('hashchange', this.afterQRScan);
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";

  .phone_error {
    color: #ff4949;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 37%;
    left: 35px;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 5px;
  }

  .testCode {
    color: #ff4949;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 55%;
    left: 35px;
  }

  .login-container {

    height: 100vh;
    /*background-color: #2d3a4b;*/
    background: url(../../assets/img/login_bg.png) no-repeat 100% 100% /100% 100%;
    background-position-x: 66%;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px white inset !important;
      /*-webkit-text-fill-color: #fff !important;*/
      /*-webkit-box-shadow:none !important;*/
    }
    input {
      /*background: transparent !important;*/
      /* border: 0px;
       -webkit-appearance: none;
       border-radius: 0px;
       padding: 12px 5px 12px 15px;
       color: #eeeeee;
       height: 47px;*/
    }
    .login {
      width: 24%;
      float: right;
      min-width: 425px;
      height: 597px;
      margin: 7% 16% 0 auto;
      background-color: #fff;
    }
    .form-box {
      padding: 80px 0px 0px 0px;
      text-align: center;
    }
    .login-img {
      width: 80%;
    }
    .el-input {
      /*display: inline-block;*/
      /*height: 48px;*/
      /*width: 75%;*/
      /*margin-left: 83px;*/
      border-top: none;
    }
    .svg-container {
      display: inline-block;
      width: 20%;
      cursor: pointer;
      padding: 6px 0px 6px 0px;
      color: #889aa4;
      background: none;
      border: none;
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: #eeeeee;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      width: 400px;
      padding: 0px 35px 15px 35px;
      margin: 0 auto;

    }
    .big {
      text-align: left;
      border: none;
      height: 30px;
    }
    .el-form-item {
      /*border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;*/
      /*width: 100%;*/
      /*height: 40px;*/
      /*border: solid 1px #e1e1e1;*/
      border-radius: 4px;
      margin: 36px auto;
    }
    .forget-pwd {
      color: #fff;
    }
    .yanzheng {
      margin-left: -11px;
      width: 45%;
      border-top: none;
    }
    .svg-container {
      padding: 0;
    }
    .icon {
      position: absolute;
      left: 36px;
      color: #ccc;
    }
    .icon-ico-pwd1 {
      left: 53px;
    }
    .iconfont{
      margin-left: 10px;
    }
    .login-input .el-input__inner{
      padding-left: 40px;
    }
  }

</style>
<style>
  /* .el-input .el-input__inner{
     background: #fff !important;
   }*/
  input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
    background-color: rgb(20, 255, 189) !important;
  }

  .logo {
    color: #0856A7;
    font-weight: 600;
    font-size:18px;
  }
</style>
