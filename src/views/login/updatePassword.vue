<template>
  <div class="change-container">
    <div class='top'>
      <!--<img src="../../assets/img/login_logo.png" alt="logo" class="login-img">-->
      <p class="tips">为了数据安全，请您修改登录密码！</p>
      </div>
   <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="120px" class="demo-ruleForm">
      <el-form-item label="旧密码" prop="pwd">
        <el-input type="password" v-model="ruleForm2.pwd" auto-complete="off"  placeholder="请输入旧密码" class="login-input"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input type="password" v-model="ruleForm2.newPwd" auto-complete="off"  class="login-input" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"  class="login-input" placeholder="请再次输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updatePsd('ruleForm2')">确认</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('新密码不能为空'));
        } else {
          if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(value))) {
            callback(new Error('新密码只能由字母和数字组成，长度为6-16位'))
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(value))) {
            callback(new Error('新密码只能由字母和数字组成，长度为6-16位'))
          }else if (value !== this.ruleForm2.newPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        imgUrl:'',
        ruleForm2: {
          pwd: '',
          newPwd: '',
          checkPass:'',
        },
        rules2: {
          pwd: [
            { required: true,message:'旧密码不能为空' , trigger: 'blur' },
            { required: true,message:'旧密码不能为空' , trigger: 'change' },
          ],
          newPwd: [
            { required: true,message:'新密码不能为空' , trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' },
            { validator: validatePass, trigger: 'change' }
          ],
          checkPass: [
            { required: true,message:'请再次输入密码' , trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' },
            { validator: validatePass2, trigger: 'change' }
          ],
        }
      };
    },
     mounted(){
    },
    methods: {
      updatePsd(formName) {
        var that=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $axios_http({
              url: '/auth/user/updateUserPwd',
              data: {
                // loginName: window.sessionStorage.getItem('loginName')?window.sessionStorage.getItem('loginName'):window.sessionStorage.getItem('token_nickname'),
                pwd: this.ruleForm2.pwd,
                newPwd:this.ruleForm2.newPwd,
              },
              vueObj: this
            }).then((res)=>{
              this.$message({
                type:'success',
                message:'修改密码成功',
                duration:1000
              })
              setTimeout(function(){
                that.$router.replace('/login')
              },1000)

            })
          } else {
            return false;
          }
        });
      },
      cancel(){
        this.$router.replace('/login')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scope>
.change-container{
  width: 800px;
  background: #fff;
  padding:10px 30px 30px;
  margin: 100px auto;
  .top{
    width: 100%;
    img{
      width: 300px;
      margin: 0 auto;
      display: block;
    }
  }
  form{
    width: 500px;
    margin:0 auto;
    .yanzheng{
      width: 150px;
      margin-right:10px;
    }
  }
  .tips{
    color: red;
    text-align: center;
    margin:30px 0 15px;
  }
}

</style>
<style>
  /*input：-webkit-autofill{ -webkit-box-shadow: 0 0 0px 1000px white inset;border:1px solid #666 !important;}*/
</style>
