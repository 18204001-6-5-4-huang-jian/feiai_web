<template>
  <div slot="right" class="content-page detail" v-if="yearFollowDetail_page">
    <div class="content">
      <el-button size="small" class="return-home" @click=goBack()>返回</el-button>
    </div>
    <div class="booking-list">
      <span class="booking-list-tit">基本信息</span>
      <el-row class="booking-list-item">
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple col-title">
                  SID:
                </div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content bg-purple-light">
                  {{detailData.base.sid}}
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple-light">
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple col-title">
                  姓名:
                </div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content bg-purple-light">
                  {{detailData.base.name}}
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple-light">
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple col-title">
                  性别:
                </div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content bg-purple-light">
                  {{detailData.base.sex | sex}}
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row class="booking-list-item">
        <el-col :span="7">
          <div class="grid-content bg-purple ">
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple col-title">
                  手机号:
                </div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content bg-purple-light">
                  {{detailData.base.phone}}
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple col-title">
                  入组日期:
                </div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content bg-purple-light">
                  {{detailData.base.inGroupDate | date}}
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple col-title">
                  分组方案:
                </div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content bg-purple-light">
                  {{detailData.base.group}} 组<span
                  v-if="detailData.base.group == 'C'">{{detailData.base.riskLevel | riskLevel}}</span>
                </div>

              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row class="booking-list-item">
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple col-title">
                  年度状态:
                </div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content bg-purple-light">
                  {{detailData.base.overallStatusCy | overallStatusCy}}
                </div>
              </el-col>
            </el-row>

          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple col-title">
                  计划随访时间:
                </div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content bg-purple-light">
                  {{detailData.base.overallStatusCy | overallStatusCy}}
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple col-title">
                  随访状态:
                </div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content bg-purple-light">
                  {{detailData.base.overallStatusCy | overallStatusCy}}
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--数据列表-->
    <div class="followDetail">
      <h5>随访</h5>
      <el-card>
        <div class="text item clearfix">
          <span class="fl">《表3.2-阳性筛查者随访调查表》</span>
          <span class="fr"><el-button type="text" size="small">查看</el-button></span>
        </div>
        <div class="text item clearfix">
          <span class="fl">《表4.1-诊断检查信息表》</span>
          <span class="fr"><el-button type="text" size="small">录入</el-button></span>
        </div>
        <div class="text item clearfix">
          <span class="fl">《表4.2-癌症报告表》</span>
          <span class="fr"><el-button type="text" size="small">录入</el-button></span>
        </div>
        <div class="text item clearfix">
          <span class="fl">《表4.3-原发性肺癌诊断信息表》</span>
          <span class="fr"><el-button type="text" size="small">录入</el-button></span>
        </div>
      </el-card>
    </div>

  </div>
</template>
<script>
  export default {
    data () {
      return {
        yearFollowDetail_page: false,
        btnAuth: {
          examination_query_btn: false,
        },
        formLabelWidth: '100px',
        "detailData": {
          "base": {//基本信息
            "sid": "",
            "name": "",
            "age": "",
            "sex": "",
            "phone": "",
            "inGroupDate": "",
            "group": "",
            "overall_status_cy": "",
            "reviewStatus": "",
            "riskFactorStatus": ""
          },
        },
      }
    },
    mounted(){
      let obj = this.checkPageAuth(this, "yearFollowDetail_page", this.btnAuth)
    },
    methods: {
      //查询
      query(){
        $axios_http({
          url: "/base/hospital/person/detail/get/" + this.$route.query.id,
          data: {},
          vueObj: this
        }).then((res) => {
          this.detailData.base = res.data.data.base
          this.detailData.fit = res.data.data.fit
          this.detailData.dna = res.data.data.dna
          this.detailData.colonoscopy = res.data.data.colonoscopy
        })
      },
      //日期格式化
      dateFormat: function (row, column) {
        var date = row[column.property];
        if (date == undefined) {
          return "";
        }
        return date.substring(0, 11)
      },
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content-page {
    background: #fff;
    padding: 20px;
  }

  h5 {
    margin: 30px 0 10px;
    font-size: 16px;
    font-weight: normal;
  }

  .followDetail .el-card {
    width: 50%;
    box-shadow: none;
    border: 1px solid #e5e5e5;
  }

  .text {
    font-size: 14px;
    color: #333;
  }

  .item {
    padding: 10px 0;
  }

  .box-card {
    width: 480px;
  }

  .followDetail .el-button {
    font-size: 14px;
    padding: 0;
  }
</style>
