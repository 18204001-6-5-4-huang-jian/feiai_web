<template>
  <div class="container" id="nav" :style="{'font-size':$store.state.style.fontSize18}">
      <div class="nav-title">
          <span class="grid-content bg-purple white">
            中国国家肿瘤筛查研究— <span :style="{'font-size':$store.state.style.fontSize16}">肺癌和结直肠癌</span>
          </span>
      </div>
      <div class="nav-intercalate">
        <!--<router-link to="/help/helpword">-->
           <!--<span class="grid-content bg-purple white nav-intercalate-item">-->
            <!--下载中心-->
           <!--</span>-->
        <!--</router-link>-->
        <!--<span class="grid-content bg-purple white nav-intercalate-item">-->
          <!--项目管理-->
        <!--</span>-->
        <!--<span class="grid-content bg-purple white nav-intercalate-item">-->
          <!--系统管理-->
        <!--</span>-->
      </div>
      <div class="nav-quit">
        <span class="grid-content bg-purple nav-quit-item" >
          <i class="iconfont my-icon" :style="{'font-size':$store.state.style.fontSize18}">&#xe6f1;</i>
          <el-dropdown class="avatar-container" hide-on-click >
            <el-button type="text" class="iconfont my-icon" size="mini"> &#xe82b;&nbsp;</el-button>
            <el-dropdown-menu class="user-dropdown" slot="dropdown">
              <el-dropdown-item>
                <router-link :to="{path:'/updatePassword'}">
                  <span style="display:block;">修改密码</span>
                </router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        </span>
        <span class="grid-content bg-purple white nav-quit-item">
          {{$store.state.name}} <img src="../../assets/portrait/avatar-1.jpg" alt="" class="user-avatar">
        </span>
        <span class="grid-content bg-purple  nav-quit-item quit-button">
          <el-button type="text" class="iconfont" @click="logout()" size="mini"> &#xe704;&nbsp;<span :style="{'font-size':$store.state.style.fontSize18}">退出</span></el-button>
        </span>
      </div>

    <!--<el-menu class="navbar" mode="horizontal">-->
      <!--&lt;!&ndash;<img src="../../assets/portrlogin_bg.png.png" alt="" class="logoImg">&ndash;&gt;-->
      <!--<div class="navbar-fontWeight">癌症筛查智能管理平台</div>-->
      <!---->
    <!--</el-menu>-->
    <!-- 修改密码弹出框 -->
    <!--<el-dialog title="修改密码" width="30%" :visible.sync="$store.state.dialogVisiblePass" style="z-index:800" :modal-append-to-body=false center @close="resetForm('ruleForm2')">-->
      <!--<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="200px" class="demo-ruleForm">-->
        <!--<el-form-item label="请输入原密码" prop="oldpass">-->
          <!--<el-input type="password" v-model="ruleForm2.oldpass"size="small" auto-complete="off" style="width: 220px;"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="请输入新密码" prop="pass">-->
          <!--<el-input type="password" v-model="ruleForm2.pass" size="small" auto-complete="off" style="width: 220px;"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="请再次输入新密码" prop="checkPass">-->
          <!--<el-input type="password" v-model="ruleForm2.checkPass"size="small" auto-complete="off" style="width: 220px;"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
          <!--<el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>-->
          <!--<el-button type="primary" @click="$store.state.dialogVisiblePass=false">取消</el-button>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
    <!--</el-dialog>-->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import axios from 'axios'
  import router from '../../router';
  export default {
    data() {
      var checkOldPass = (rule, value, callback) => { if (!value) { return callback(new Error('原密码不能为空')); } let oldArr=value.toString().split(""); setTimeout(() => { if (oldArr.indexOf("/")>-1||oldArr.indexOf("\\")>-1) { callback(new Error('原密码输出错误，请重新输入')); } else { if (oldArr.length
        < 6|| oldArr.length>16) { callback(new Error('密码长度应该是6-16位')); } else { callback(); } } }, 1000); }; var validatePass = (rule, value, callback) => { if (value === '') { callback(new Error('新密码不能为空')); }else if(value.indexOf("\\")>-1||value.indexOf("/")>-1){ callback(new Error('新密码不能包含非法字符')); }else if(value.length
        < 6|| value.length>16){ callback(new Error('密码长度应该是6-16位')); }else{ if (this.ruleForm2.checkPass !== '') { this.$refs.ruleForm2.validateField('checkPass'); } callback(); } };
      var validatePass2 = (rule, value, callback) => { if (value === '') { callback(new Error('请再次输入密码')); } else if (value !== this.ruleForm2.pass) { callback(new Error('两次输入密码不一致!')); } else { callback(); } };
      return {
        loginName:'',
        ruleForm2: {
          pass: '',
          checkPass: '',
          oldpass: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          oldpass: [
            { validator: checkOldPass, trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'name',
        'avatar'
      ])
    },
    mounted(){
    },
    methods: {
      logout() {
        this.$confirm('您确认要退出登录吗？', '退出登录提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $axios_http({
            url: "/auth/loginout",
            data: {},
            vueObj: this
          }).then((res) => {
            router.push({path: "/login"});
            let type = window.localStorage.getItem('loginType')
            window.localStorage.clear();
            window.sessionStorage.clear();
            window.localStorage.setItem('loginType', type);
          })

        }).catch(function(err){
          console.log("取消登出"+err)
        });
      },
      modifyPassword(){
        console.log("已点击修改密码")
        this.$store.state.dialogVisiblePass=true;
      },
      //表单重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitForm(formName) {
        // console.log(valid);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $axios_http({
              url: "/auth/user/updateUserPwd",
              data: {
                // loginName:this.$route.query.loginName,
                pwd:this.ruleForm2.oldpass,
                newPwd:this.ruleForm2.pass
              },
              vueObj: this
            }).then((res) => {
              if(res.data.statusCode==824007){
                $failMsg(this, "用户原密码错误,请重试");
                this.ruleForm2.oldpass="";
                this.ruleForm2.pass="";
                this.ruleForm2.checkPass="";
              }else{
                $successMsg(this, "密码修改成功");
                this.ruleForm2.oldpass="";
                this.ruleForm2.pass="";
                this.ruleForm2.checkPass="";
                this.$store.state.dialogVisiblePass=false;
              }
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
<style scoped>
  #nav{
    min-width:1024px!important;
  }
  .my-icon{
    color: #aeaeae;
    margin-left: 20px;
  }
  .white{
    color: #fff;
  }
  .user-avatar{
    height:30px;
    width:30px;
    border-radius: 100%;
    position: relative;
    top:10px;
    margin-left:10px;
  }
  #nav .nav-title{
    float: left;
  }
  #nav .nav-intercalate{
    margin-left:80px;
    float: left;
  }
  #nav{
    font-size:14px;
  }
  .nav-intercalate-item{
    margin-left:15px;
  }
  .nav-quit{
    float: right;
    margin-right:40px;
  }
  .nav-quit-item{
    margin-left:25px;
  }
  .my-icon1{
    color: #aeaeae;
    margin-right: 5px;
  }
  .quit-button{
    color: #aeaeae!important;
    font-size: 14px;
  }
  .quit-button .el-button--text{
    color: #aeaeae;
  }
  .quit-button .el-button--text:hover{
    color: #fff;
  }
  .my-icon :hover{
    color: #fff;
  }
</style>
<style>

</style>

