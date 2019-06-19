<template>
  <div slot="right" class="content-page detail" v-if="followDetail_page">
    <div class="content">
      <el-button size="small" class="return-home" :size="$store.state.style.assemblyModel" @click=goBack()>返回</el-button>
    </div>
    <div class="booking-list">
      <span class="booking-list-tit">基本信息</span>
      <el-row class="booking-list-item">
        <el-col :sm="8" :lg="8" :xl="7">
          <div class="grid-content bg-purple">
            <el-row>
              <el-col :sm="12" :lg="10" :xl="8">
                <div class="grid-content bg-purple col-title">
                  SID：
                </div>
              </el-col>
              <el-col :sm="11" :lg="10" :xl="16">
                <div class="grid-content bg-purple-light">
                  {{detailData.base.sid}}
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :sm="8" :lg="8" :xl="7">
          <div class="grid-content bg-purple-light">
            <el-row>
              <el-col :sm="12" :lg="10" :xl="8">
                <div class="grid-content bg-purple col-title">
                  姓名：
                </div>
              </el-col>
              <el-col :sm="11" :lg="14" :xl="16">
                <div class="grid-content bg-purple-light">
                  {{detailData.base.userName}}
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :sm="8" :lg="8" :xl="7">
          <div class="grid-content bg-purple-light">
            <el-row>
              <el-col :sm="12" :lg="10" :xl="8">
                <div class="grid-content bg-purple col-title">
                  性别：
                </div>
              </el-col>
              <el-col :sm="11" :lg="14" :xl="16">
                <div class="grid-content bg-purple-light">
                  {{detailData.base.sex | sex}}
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row class="booking-list-item">
        <el-col :sm="8" :lg="8" :xl="7">
          <div class="grid-content bg-purple ">
            <el-row>
              <el-col :sm="12" :lg="10" :xl="8">
                <div class="grid-content bg-purple col-title">
                  手机号：
                </div>
              </el-col>
              <el-col :sm="11" :lg="14" :xl="16">
                <div class="grid-content bg-purple-light">
                  {{detailData.base.phone}}
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :sm="8" :lg="8" :xl="7">
          <div class="grid-content bg-purple">
            <el-row>
              <el-col :sm="12" :lg="10" :xl="8">
                <div class="grid-content bg-purple col-title">
                  入组日期：
                </div>
              </el-col>
              <el-col :sm="11" :lg="14" :xl="16">
                <div class="grid-content bg-purple-light">
                  {{detailData.base.entryTime | entryTime}}
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :sm="8" :lg="8" :xl="7">
          <div class="grid-content bg-purple">
            <el-row>
              <el-col :sm="12" :lg="10" :xl="8">
                <div class="grid-content bg-purple col-title">
                  分组方案：
                </div>
              </el-col>
              <el-col :sm="11" :lg="14" :xl="16">
                <div class="grid-content bg-purple-light">
                  {{detailData.base.groupName | group}}
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row class="booking-list-item">
        <el-col :sm="8" :lg="8" :xl="7">
          <div class="grid-content bg-purple">
            <el-row>
              <el-col :sm="12" :lg="10" :xl="8">
                <div class="grid-content bg-purple col-title">
                  总体状态：
                </div>
              </el-col>
              <el-col :sm="11" :lg="14" :xl="16">
                <div class="grid-content bg-purple-light">
                  {{detailData.base.overallStatusCy | overallStatusCy}}
                </div>
              </el-col>
            </el-row>

          </div>
        </el-col>
      </el-row>
    </div>

    <seePics  :fileList="fileList"></seePics>
    <!--&lt;!&ndash;数据列表&ndash;&gt;-->
    <!--<div class="followDetail">-->
      <!--<h5>随访</h5>-->
     <!--<el-card>-->
        <!--<div class="text item clearfix">-->
         <!--<span class="fl">《表3.2-阳性筛查者随访调查表》</span>-->
         <!--<span class="fr"><el-button type="text" size="small"  >查看</el-button></span>-->
       <!--</div>-->
       <!--<div class="text item clearfix">-->
         <!--<span class="fl">《表4.1-诊断检查信息表》</span>-->
         <!--<span class="fr"><el-button type="text" size="small"  >录入</el-button></span>-->
       <!--</div>-->
       <!--<div class="text item clearfix">-->
         <!--<span class="fl">《表4.2-癌症报告表》</span>-->
         <!--<span class="fr"><el-button type="text" size="small"  >录入</el-button></span>-->
       <!--</div>-->
       <!--<div class="text item clearfix">-->
         <!--<span class="fl">《表4.3-原发性肺癌诊断信息表》</span>-->
         <!--<span class="fr"><el-button type="text" size="small"  >录入</el-button></span>-->
       <!--</div>-->
     <!--</el-card>-->
    <!--</div>-->

  </div>
</template>
<script>
  import seePics from '../components/seePics'   //查看图片
  export default {
    components:{
      seePics,
    },
    data () {
      return {
        followDetail_page: false,
        btnAuth: {
          examination_query_btn: false,
        },
        fileList:'',
        formLabelWidth: '100px',
        "detailData":{
          "base":{//基本信息
            "sid":"",
            "name":"",
            "age":"",
            "sex":"",
            "phone":"",
            "inGroupDate":"",
            "group":"",
            "overall_status_cy":"",
            "reviewStatus":"",
            "riskFactorStatus":""
          },
        },
      }
    },
    mounted(){
      let obj = this.checkPageAuth(this, "followDetail_page", this.btnAuth)
      this.query()
    },
    methods: {
      //查询
      query(){
        $axios_http({
          url: "/followRecordRestful/follow/findFollowRecordById",
          data: {
            id: this.$route.query.id
          },
          vueObj: this
        }).then((res) => {
            this.detailData.base = res.data.result
          this.fileList = res.data.result.uploadIdStr

        })
      },
      //日期格式化
      dateFormat:function(row, column) {
        var date = row[column.property];
        if (date == undefined) {
          return "";
        }
        return date.substring(0,11)
      },
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content-page{
    background: #fff;
    padding:20px;
  }
  h5{
    margin: 30px 0 10px;
    font-size: 16px;
    font-weight: normal;
  }
  .followDetail .el-card{
    width:50%;
    box-shadow: none;
    border:1px solid #e5e5e5;
  }
   .text {
    font-size: 14px;
    color:#333;
  }

  .item {
    padding: 10px 0;
  }

  .box-card {
    width: 480px;
  }
  .followDetail .el-button{
    font-size: 14px;
    padding: 0;
  }
</style>
