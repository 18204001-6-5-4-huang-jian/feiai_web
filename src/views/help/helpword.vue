<template>
  <div slot="right" class="content-page" v-if="help_page">
    <div>
      <p>表单下载</p>
      <div class="list-wrapper">
        <el-row v-if="btnAuth.helpButton3">
          <el-col :span="12">
            <div class="grid-content bg-purple">《中国国家肺癌和结直肠癌筛查研究-数据管理平台用户手册》</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light"><span class="down"><a :href="serverName+'/file/download?id=3'" target="_blank" download="中国国家肺癌和结直肠癌筛查研究-数据管理平台用户手册">立即下载</a></span></div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">《CT结果表》</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light"><span class="down"><a :href="serverName+'/file/download?id=8'" target="_blank" download="CT结果表">立即下载</a></span></div>
          </el-col>
        </el-row>
        <el-row v-if="btnAuth.helpButton1">
          <el-col :span="12">
            <div class="grid-content bg-purple">《中国国家肺癌和结直肠癌筛查研究-数据管理平台用户手册》</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light"><span class="down"><a :href="serverName+'/file/download?id=1'" target="_blank" download="中国国家肺癌和结直肠癌筛查研究-数据管理平台用户手册">立即下载</a></span></div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">《CT结果表》</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light"><span class="down"><a :href="serverName+'/file/download?id=8'" target="_blank" download="CT结果表">立即下载</a></span></div>
          </el-col>
        </el-row>
        <el-row v-if="btnAuth.helpButton5">
          <el-col :span="12">
            <div class="grid-content bg-purple">《中国国家肺癌和结直肠癌筛查研究-数据管理平台用户手册》</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light"><span class="down"><a :href="serverName+'/file/download?id=5'" target="_blank" download="中国国家肺癌和结直肠癌筛查研究-数据管理平台用户手册">立即下载</a></span></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">《资格审核表》</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light"><span class="down"><a :href="serverName+'/file/download?id=6'" target="_blank" download="资格审核表">立即下载</a></span></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">《个人信息表》</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light"><span class="down"><a :href="serverName+'/file/download?id=7'" target="_blank" download="个人信息表">立即下载</a></span></div>
          </el-col>
        </el-row>
        <!--<el-row>-->
          <!--<el-col :span="12">-->
            <!--<div class="grid-content bg-purple">《表A2-联系信息与危险因素调查表》</div>-->
          <!--</el-col>-->
          <!--<el-col :span="12">-->
            <!--<div class="grid-content bg-purple-light"><span class="down"><a href="/static/受试者资格审核表.docx" target="_blank" download="联系信息与危险因素调查表">立即下载</a></span></div>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row>-->
          <!--<el-col :span="12">-->
            <!--<div class="grid-content bg-purple">《粪便隐血试验（FIT）结果告知书》</div>-->
          <!--</el-col>-->
          <!--<el-col :span="12">-->
            <!--<div class="grid-content bg-purple-light"><span class="">立即下载</span></div>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row>-->
          <!--<el-col :span="12">-->
            <!--<div class="grid-content bg-purple">《结肠镜检查结果记录表》</div>-->
          <!--</el-col>-->
          <!--<el-col :span="12">-->
            <!--<div class="grid-content bg-purple-light"><span class="down"><a href="../../../static/受试者资格审核表.docx" target="_blank" download="结肠镜检查结果记录表">立即下载</a></span></div>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row>-->
          <!--<el-col :span="12">-->
            <!--<div class="grid-content bg-purple">《病理检查结果表》</div>-->
          <!--</el-col>-->
          <!--<el-col :span="12">-->
            <!--<div class="grid-content bg-purple-light"><span class="down"><a href="../../../static/受试者资格审核表.docx" target="_blank" download="病理检查结果表">立即下载</a></span></div>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row>-->
          <!--<el-col :span="12">-->
            <!--<div class="grid-content bg-purple">《结肠镜筛查结果告知书》</div>-->
          <!--</el-col>-->
          <!--<el-col :span="12">-->
            <!--<div class="grid-content bg-purple-light"><span class="down"><a href="../../../static/受试者资格审核表.docx" target="_blank" download="结肠镜筛查结果告知书">立即下载</a></span></div>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row>-->
          <!--<el-col :span="12">-->
            <!--<div class="grid-content bg-purple">《违反方案事件记录表》</div>-->
          <!--</el-col>-->
          <!--<el-col :span="12">-->
            <!--<div class="grid-content bg-purple-light"><span class=""><a href="../../../static/受试者资格审核表.docx" target="_blank" download="结肠镜筛查结果告知书">立即下载</a></span></div>-->
          <!--</el-col>-->
        <!--</el-row>-->
      </div>
    </div>
    <!--<div style="margin-top: 30px;">-->
      <!--<p>操作说明</p>-->
      <!--<div class="list-wrapper1">-->
        <!--<el-row class="question">-->
          <!--<el-col :span="24">-->
            <!--<div class="grid-content bg-purple question-red">-->
              <!--1、登录后必须要修改登录密码吗?-->
            <!--</div>-->
          <!--</el-col>-->
          <!--<el-col :span="24">-->
            <!--<div class="grid-content bg-purple-light question-div">-->
              <!--答:是的,首次登录必须修改初始密码。-->
            <!--</div>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row class="question">-->
          <!--<el-col :span="24">-->
            <!--<div class="grid-content bg-purple question-red">-->
              <!--1、登录后必须要修改登录密码吗?-->
            <!--</div>-->
          <!--</el-col>-->
          <!--<el-col :span="24">-->
            <!--<div class="grid-content bg-purple-light question-div">-->
              <!--答:是的,首次登录必须修改初始密码。-->
            <!--</div>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row class="question">-->
          <!--<el-col :span="24">-->
            <!--<div class="grid-content bg-purple question-red">-->
              <!--1、登录后必须要修改登录密码吗?-->
            <!--</div>-->
          <!--</el-col>-->
          <!--<el-col :span="24">-->
            <!--<div class="grid-content bg-purple-light question-div">-->
              <!--答:是的,首次登录必须修改初始密码。-->
            <!--</div>-->
          <!--</el-col>-->
        <!--</el-row>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  export default {
    name: 'Right',
    data () {
      return {
        //权限判定
        help_page: false,
        serverName:SERVER_NAME,
        btnAuth: {
          helpButton1: false,
          helpButton3: false,
          helpButton5: false,
        },
      }
    },
    mounted(){
      this.$store.commit('LOGOUT_USER');
      let obj = this.checkPageAuth(this, "help_page", this.btnAuth);
    },
    methods: {}
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content-page {
    padding: 20px;
    background: #fff;
  }

  .list-wrapper {
    height: 240px;
    border: 1px solid #e5e5e5;
    margin-top: 20px;
    padding: 20px;
  }

  .list-wrapper1 {
    border: 1px solid #e5e5e5;
    margin-top: 20px;
    padding-top: 10px;
    padding-left: 20px;
  }

  .down {
    color: blue;
  }
  .question-red{
    color: red;
  }
  .question{
    margin-bottom: 10px;
  }

</style>
