<template>
  <div slot="right" class="content-page detail" v-if="detail_page">
    <div class="content">
      <el-button size="small" class="return-home" @click=goBack()>返回</el-button>
    </div>
    <div class="booking-list">
      <span class="booking-list-tit">个人信息</span>
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
                  {{detailData.base.sex | reverseSex}}
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
                  总体状态:
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
                  资格审核表:
                </div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content bg-purple-light">
                  {{detailData.base.reviewStatus | insertStatus}}
                  <router-link to="/home/subjectInsert">
                    <el-button type="text" v-if=" detailData.base.reviewStatus == '1'"> 录入</el-button>
                  </router-link>
                  <router-link :to="{path:'/subjects/showSubjectInsert',query:{id:detailData.base.sid}}">
                    <el-button type="text" v-if=" detailData.base.reviewStatus == '2'"> 查看</el-button>
                  </router-link>
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
                  危险因素调查:
                </div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content bg-purple-light">
                  {{detailData.base.riskFactorStatus | insertStatus}}
                  <router-link :to="{path:'/home/riskFactors',query:{id:detailData.base.sid,flag:5}}">
                    <el-button type="text" v-if=" detailData.base.riskFactorStatus == '1'"> 录入</el-button>
                  </router-link>
                  <router-link :to="{path:'/subjects/showRiskFactor',query:{id:detailData.base.sid}}">
                    <el-button type="text" v-if="detailData.base.riskFactorStatus == '2'"> 查看</el-button>
                  </router-link>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>

    <!--数据列表-->
    <h5>FIT列表</h5>
    <el-table
      :data="detailData.fit"
      border
      style="width: 100%;background: #fff!important;">
      <el-table-column
        prop="code_entry_status"
        label="编码"
      >
      </el-table-column>
      <el-table-column
        prop="releaseDate"
        label="编码录入时间"
        :formatter="dateFormat"
        width="160"
      >
      </el-table-column>
      <el-table-column
        label="结果录入状态"
        width="120"
      >
        <template slot-scope="scope">
          <span>{{scope.row.insertStatus | insertStatus}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="120"
        label="结果录入时间 "
        :formatter="dateFormat"
        prop="resultDate"
      >
      </el-table-column>
      <el-table-column
        label="是否有结果"
        width="120"
      >
        <template slot-scope="scope">
          <span>{{scope.row.resultStatus | resultStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="upLineValue"
        label="上线值"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="downLineValue"
        label="下线值"
        width="100"
      >
      </el-table-column>
      <el-table-column
        label="FIT结果"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{scope.row.result | result}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="noResonResult"
        label="无结果原因"
        width="160"
      >
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
  export default {
    data () {
      return {
        detail_page: false,
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
          "fit": [//fit检查
            {
              "code_entry_status": "1",//编号录入状态
              "insert_status": "2",//结果录入状态
              "fit_sode": "3",//FIT编码，即噗噗管ID
              "release_date": "",//发放日期，录入FIT编码日期
              "release_person_code": "",//FIT编码，即噗噗管ID
              "test_date": "",//检测日期
              "result_status": "",//是否有结果，1：有结果，2：无结构
              "result_date": "",//录入结果时间
              "up_line_value": "",//上线值
              "down_line_value": "",//下线值
              "result": "",//FIT阴阳性判断：阳性：上线>=4且下线>=4；阴性：上线>=4且下线<4；无效：上线<4；无结果
              "no_reson_result": "",//无结果原因
              "sid": ""//受试者唯一标识
            }
          ],
        },
      }
    },
    mounted(){
      let obj = this.checkPageAuth(this, "detail_page", this.btnAuth)
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

</style>
<style>
  .el-table__header-wrapper {
    background: #fff;
  }

  .detail .el-table th {
    background: #f4f4f4 !important;

  }
</style>
