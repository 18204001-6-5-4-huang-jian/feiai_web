<template>
  <div slot="right" class="content-page" v-if="reservations_page">
    <div class="content">
      <div class="filter-container">
        <el-button size="small" class="returns" @click="goBack()">返回</el-button>
        <el-button size="small" class="print" @click="printContent('print')">打印</el-button>
      </div>
      <div id="print">
        <div class="booking-list-welcome" v-if="$route.query.type == 1">
          <div class="p-title">亲爱的参加者：感谢您参加中国国家肺癌和结直肠癌筛查研究项目！</div>
          <div>温馨提醒</div>
          <div>1、检查时,请勿佩戴金属首饰及腰带；</div>
          <div>2、如备孕及孕期请勿此项检查，及时与社区工作人员联系；</div>
          <div>3、请您按照预约时间，到指定地点进行筛查；</div>
          <div class="p-title">4、如有疑问，请咨询社区工作人员；</div>
          <p>感谢您的合作！</p>
        </div>
        <div class="booking-list-welcome" v-if="$route.query.type == 2">
          <div class="p-title">亲爱的参加者：感谢您参加中国国家肺癌和结直肠癌筛查研究项目！</div>
          <div>温馨提醒：为保证结肠镜检查能顺利进行，请您：</div>
          <div>1、在检查前1-2天开始进食无渣的半流质饮食，如稀饭、蛋花等。</div>
          <div>2、检查当天需要禁食，如饥饿者可进食糖水或无渣糖，糖尿病患者可进食少量牛奶。</div>
          <div class="p-title">
            3、检查前日晚或检查前日晨进行肠道清洁，具体详情请咨询工作人员。
          </div>
          <p>感谢您的合作！</p>
        </div>
        <div class="booking-list">
          <span class="booking-list-tit">个人信息</span>
          <el-row class="booking-list-item">
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="9">
                    <div class="grid-content bg-purple">
                      SID:
                    </div>
                  </el-col>
                  <el-col :span="15">
                    <div class="grid-content bg-purple-light">
                      {{detailData.sid}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-row>
                  <el-col :span="9">
                    <div class="grid-content bg-purple">
                      受试者姓名:
                    </div>
                  </el-col>
                  <el-col :span="15">
                    <div class="grid-content bg-purple-light">
                      {{detailData.userName}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row class="booking-list-item">
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="9">
                    <div class="grid-content bg-purple">
                      手机号:
                    </div>
                  </el-col>
                  <el-col :span="15">
                    <div class="grid-content bg-purple-light">
                      {{detailData.phone}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-row>
                  <el-col :span="9">
                    <div class="grid-content bg-purple">
                      入组日期:
                    </div>
                  </el-col>
                  <el-col :span="15">
                    <div class="grid-content bg-purple-light">
                      {{detailData.entryTime | entryTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row class="booking-list-item">
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="9">
                    <div class="grid-content bg-purple">
                      分组方案:
                    </div>
                  </el-col>
                  <el-col :span="15">
                    <div class="grid-content bg-purple-light">
                      {{detailData.groupName | group}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="booking-list">
          <span class="booking-list-tit">预约信息</span>
          <el-row class="booking-list-item">
            <el-col :span="24">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      预约时间:
                    </div>
                  </el-col>
                  <el-col :span="15">
                    <div class="grid-content bg-purple-light">
                      {{detailData.period}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row class="booking-list-item">
            <el-col :span="24">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      就诊医院:
                    </div>
                  </el-col>
                  <el-col :span="15">
                    <div class="grid-content bg-purple-light">
                      {{detailData.deptName}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row class="booking-list-item">
            <el-col :span="24">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      就诊科室:
                    </div>
                  </el-col>
                  <el-col :span="15">
                    <div class="grid-content bg-purple-light">
                      {{detailData.examinationPlace}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>

          </el-row>
        </div>
      </div>

    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        reservations_page: false,
        btnAuth: {
          bookingManagement_query_btn: false,
          bookingDetail_query_btn: false,
          exportExcel_btn: false,
          booking_add_btn: false,
          booking_user_add_btn: false,
        },
        formLabelWidth: '100px',
        "detailData": {
          "sid": "",
          "name": "",
          "phone": "",
          "inGroupDate": "",
          "group": "",
          "proName": "",
          "bookingTime": "",
          "deptName": "",
          "examinationPlace": "",
          "deptDesc": ''
        }
      }
    },
    mounted(){
      let obj = this.checkPageAuth(this, "reservations_page", this.btnAuth)
      this.query();
    },
    methods: {
      //查询
      query(){
        $axios_http({
          url: "/bookIngInfoRestful/bookinfo/find/findDetailByID",
          data: {
            id: this.$route.query.id,
            type: this.$route.query.type
          },
          vueObj: this
        }).then((res) => {
          this.detailData = res.data.result;
        })
      },
      printContent: function (element) {
          this.$print('#print')
//        let subOutputRankPrint = document.getElementById(element);
//        let newContent = subOutputRankPrint.innerHTML;
//        let oldContent = document.body.innerHTML;
//        document.body.innerHTML = newContent;
//        window.print();
//        window.location.reload();
//        document.body.innerHTML = oldContent;
//        return false;
      },
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .booking-list {
    margin: 40px auto;
    width: 700px;
    padding: 20px;
    border: 1px solid #e5e5e5;
    position: relative;
  }

  .booking-list1 {
    margin-top: 50px;
    margin-left: 80px;
    width: 700px;
    padding: 20px;
    border: 1px solid #e5e5e5;
    position: relative;
  }

  .booking-list-item {
    height: 40px;
    line-height: 40px;
  }

  .booking-list-tit {
    position: absolute;
    top: -22px;
    display: inline-block;
    padding: 10px;
    background: #ffffff;

  }

  .returns {
    float: left;
  }

  .print {
    float: right;
  }

  .content-page {
    padding: 20px;
    background: #fff;
    width: 100%;
    height: 100%;
  }

  .booking-list-welcome {
    margin: 50px auto;
    font-size: 14px;
    width: 700px;
    /*padding-left: 300px;*/
  }

  .booking-list-welcome p {
    height: 24px;
    line-height: 30px;
  }

  .p-title {
    margin-bottom: 20px;
  }

  #print {
    padding-top: 20px;
    max-width:1200px;
    margin:auto;
  }

  .print-title {
    margin-top: 10px;
    font-size: 16px;
  }

  .print-title-list {
    margin-top: 10px;
    margin-left: 80px;

  }

  .print-title-1 {
    margin-top: 20px;
    margin-left: 80px
  }
</style>
