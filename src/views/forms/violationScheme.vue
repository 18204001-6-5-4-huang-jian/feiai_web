<template>
  <div class="j_content" v-if="violationScheme_page">
    <div style="min-width: 941px;">
      <div class="back">
        <el-button type="normal" size="small" class="fl" @click="goBack()">返回</el-button>
      </div>
      <el-row>
        <el-col>
          <div class="content-page-sid">
            SID编码：12345678
          </div>

        </el-col>
      </el-row>
      <h3>表 5.4-违反方案事件记录表</h3>
      <div class="formcon">
        <div class="tables">
          <el-form :model="formInline" class="demo-form-inline cmb cmba" :rules="rules" ref="formInline">
            <div class="texts" id="1a">
              1.请勾选方案违规的种类
            </div>
            <el-form-item prop="item_1a_1">
              <el-checkbox-group v-model="formInline.item_1a_1" style="height: auto;">
                <el-checkbox name="item_1a_1" label="1" class="db">01=筛查对象随机分配无效；</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item prop="item_1a_2">
              <el-checkbox-group v-model="formInline.item_1a_2" style="height: auto;">
                <el-checkbox name="item_1a_2" label="2" class="db cmbi">02=对筛查对象进行了一次以上的随机分配（初始ID为：TC
                  <el-input v-model="formInline.item_1a_2_id" size="small" :disabled="formInline.item_1a_2 == false"
                            :maxlength='5' style="width:100px;height:34px;line-height: 34px;"></el-input>
                  ）
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item prop="item_1a_3">
              <el-checkbox-group v-model="formInline.item_1a_3" style="height: auto;">
                <el-checkbox name="item_1a_3" label="3" class="db">03=筛查对象在完成研究前未填写知情同意书；</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item prop="item_1a_4">
              <el-checkbox-group v-model="formInline.item_1a_4" style="height: auto;">
                <el-checkbox label="4" class="db">04=筛查对象在筛查之前已报告或确诊患有癌症；</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item prop="item_1a_5">
              <el-checkbox-group v-model="formInline.item_1a_5" style="height: auto;">
                <el-checkbox name="item_1a_5" label="5" class="db">05=随机化分组后的对象接受了其它干预组提供的筛查，请具体说明
                  <el-input v-model="formInline.item_1a_5_des" size="small" class="specialWidth"></el-input>
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item prop="item_1a_6">
              <el-checkbox-group v-model="formInline.item_1a_6" style="height: auto;">
                <el-checkbox name="item_1a_6" label="6" class="db">06=向筛查对象报告了错误的结果；</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item prop="item_1a_7">
              <el-checkbox-group v-model="formInline.item_1a_7" style="height: auto;">
                <el-checkbox prop="item_1a_7" label="7" class="db">07=进行了重复的筛查；</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item prop="item_1a_8">
              <el-checkbox-group v-model="formInline.item_1a_8" style="height: auto;">
                <el-checkbox label="8" name="item_1a_8" class="db">08=受保护的医疗信息遭泄露；</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item prop="item_1a_9">
              <el-checkbox-group v-model="formInline.item_1a_9" style="height: auto;">
                <el-checkbox label="9" name="item_1a_9" class="db">09=随机分组分配ID号后，因受试者主观原因（备注原因：
                  <el-input v-model="formInline.item_1a_9_cause" size="small" style="width:220px;"></el-input>
                  ），在进行到一定程度后决意退出试验（预约或完成了哪些检查，请说明：
                  <el-input v-model="formInline.item_1a_9_des" size="small" style="width:220px;"></el-input>
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item prop="item_1a_10">
              <el-checkbox-group v-model="formInline.item_1a_10" style="height: auto;">
                <el-checkbox label="10" class="db">10=其它，请说明（请在下方详细说明任何上述未涉及的违规情况）：

                  <el-input type="textarea" style="display:block; padding-right: 20px;"
                            v-model="formInline.item_1a_10_other"></el-input>

                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="text-center" style="margin-top: 40px;">
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="goBack()">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'report4',
    data() {
      var checkitems = (items, index) => {
        for (let i = 1; i <= index; i++) {
          if (this.formInline[items + i]) {
            return true;
            break;
          }
        }
        return false;
      };
      var set_item = (items, index, b) => {
        for (let i = 1; i <= index; i++) {
          this.formInline[items + i] = b;
        }
      };

      var item_1a_1 = (rule, value, callback) => {
        if (value) {
          callback()
//          document.getElementById('3a' ).scrollIntoView(true);
        }

      };
      var item_1a_2 = (rule, value, callback) => {
        if (value) {
          if (this.formInline.item_1a_2_id === '' || this.formInline.item_1a_2_id === null || this.formInline.item_1a_2_id === undefined) {
            callback(new Error('请输入初始ID'))
          } else callback();
        }
        else this.formInline.item_1a_2_id = '';
        callback()
      };
      var item_1a_5 = (rule, value, callback) => {
        if (value)
          if (this.formInline.item_1a_5_des === '' || this.formInline.item_1a_5_des === null || this.formInline.item_1a_5_des === undefined) {
            callback(new Error('请输入具体说明'))
          } else callback();
        else {
          this.formInline.item_1a_5_des = '';
          callback()
        }

      };
      var item_1a_9 = (rule, value, callback) => {
        if (value)
          if (this.formInline.item_1a_9_cause === '' || this.formInline.item_1a_9_des === '' || this.formInline.item_1a_9_cause === null || this.formInline.item_1a_9_cause === undefined === '' || this.formInline.item_1a_9_des === null || this.formInline.item_1a_9_des === undefined) {
            callback(new Error('请输入原因'))
          } else callback();
        else {
          this.formInline.item_1a_9_cause = '';
          this.formInline.item_1a_9_des = '';
          callback()
        }

      };
      var item_1a_10 = (rule, value, callback) => {
        if (value)
          if (this.formInline.item_1a_10_other === '' || this.formInline.item_1a_10_other === null || this.formInline.item_1a_10_other === undefined) {
            callback(new Error('请输入其他情况'))
          } else callback();
        else {
          this.formInline.item_1a_10_other = '';
          callback()
        }

      };
      return {
        //权限判定
        violationScheme_page: false,
        btnAuth: {
          countryAgencySearch_page: false,
        },
        formInline: {
          "deptCode": '',
          "eventType": "1",//1代表违反方案 2.代表不良事件 值固定为1
          "schemeType": '2',
          "sid": this.$route.query.sid,//受试者sid  值固定为TC0001
          "quitLogId": this.$route.query.quitLogId,
          "id": this.$route.query.schemeId,
          "tbDate": new Date(),//填表日期
          "tbrName": "",//填表人姓名
          "zkzName": "",//质控者姓名
          "investigatorCode": "",//筛查现场编码
          "checkYear": new Date(),//检查年份
          "item_1a_1": false,// 筛查对象随机分配无效   1：是，2：否
          "item_1a_2": false,//对筛查对象进行了一次以上的随机分配  1：是，2：否
          "item_1a_2_id": "",// 初始ID
          "item_1a_3": false,// 筛查对象在完成研究前未填写知情同意书   1：是，2：否
          "item_1a_4": false,//筛查对象在筛查之前已报告或确诊患有癌症 1：是，2：否
          "item_1a_5": false,//随机化分组后的对象接受了其它干预组提供的筛查   1：是，2：否
          "item_1a_5_des": "",//具体说明
          "item_1a_6": false,//向筛查对象报告了错误的结果   1：是，2：否
          "item_1a_7": false,//进行了重复的筛查   1：是，2：否
          "item_1a_8": false,//受保护的医疗信息遭泄露 1：是，2：否
          "item_1a_9": false,//随机分组分配ID号后，因受试者主观原因 1：是，2：否
          "item_1a_9_cause": "",//具体原因
          "item_1a_9_des": "",//说明
          "item_1a_10": false,//其它，请说明（请在下方详细说明任何上述未涉及的违规情况）
          "item_1a_10_other": "",
        },
        rules: {
          item_1a_1: [{validator: item_1a_1, trigger: 'change'}],
          item_1a_2: [{validator: item_1a_2, trigger: 'change'}],
          item_1a_2_id: [{max: 5}],
          item_1a_5: [{validator: item_1a_5, trigger: 'change'}],
          item_1a_9: [{validator: item_1a_9, trigger: 'change'}],
          item_1a_10: [{validator: item_1a_10, trigger: 'change'}],
        }


      }
    },
    created(){
      this.formInline.item_1a_2_id = ''
    },
    mounted(){
      this.$store.commit('LOGOUT_USER');
      let obj = this.checkPageAuth(this, "violationScheme_page", this.btnAuth);
    },
    methods: {
      ifaidcheck () { //请勾选方案违规的种类--是否选了这项
        if (this.formInline.item_1a_1 || this.formInline.item_1a_2 || this.formInline.item_1a_3 || this.formInline.item_1a_4 || this.formInline.item_1a_5 || this.formInline.item_1a_6 || this.formInline.item_1a_7 || this.formInline.item_1a_8 || this.formInline.item_1a_9 || this.formInline.item_1a_10) {
          return true
        } else {
          return false
        }
      },
      submitForm() {

      },
      goBackD2(){
        // flag:0,异常列表进入D2表单；1：退出研究查看列表进入D2表单；2、新增受试者进入D2；3、未完成危险因素进入D2；4、受试者管理列表退出研究按钮进入D2；5、受试者管理列表查看详情危险因素按钮进入D2
        // flag为0,1,4.返回相应的列表页；为2 时返回首页；为3 时返回首页待办未完成危险因素列表页；5为返回受试者详情
        if (this.$route.query.flag == 0 || this.$route.query.flag == 1 || this.$route.query.flag == 4) {
          this.$router.go(-1)
        } else if (this.$route.query.flag == 2) {
          this.$router.push('/home/home')
        } else if (this.$route.query.flag == 3) {
          this.$router.push('/home/uncompletedRiskFactors')
        } else if (this.$route.query.flag == 5) {
          this.$router.replace({path: '/subjects/subjectsDetail', query: {id: this.$route.query.sid}})
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .text-right {
    text-align: right;
  }

  .text-center {
    text-align: center;
  }

  .j_content {
    padding: 10px;
    height: 100%;
    overflow: auto;
    background: #fff;
  }

  .btns {
    padding: 20px;
  }

  .btns .text {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    line-height: 1.5;
    margin: 0;
    padding: 0;
  }

  .formcon {
    margin: 0 20px 20px;
    /*border: 1px solid rgb(204, 204, 204);*/
  }

  .formcon .title {
    font-size: 16px;
    text-align: center;
    line-height: 2;
    background: rgb(204, 204, 204);
    color: #000000;
  }

  .formcon .title.nobg {
    background: none;
  }

  .tables {
    margin: 40px 50px 30px 50px;
    font-size: 0;
    line-height: 0;
  }

  .formoneline {
    width: 100%;
    margin-right: 0 !important;
  }

  .formhalfline {
    width: 50%;
    margin-right: 0 !important;
  }

  .mb5 {
    margin-bottom: 8px;
  }

  .addbb {
    font-size: 20px;
    font-weight: bold;
    color: #3a8ee6;
  }

  .zdysinput input {
    border-width: 0 0 1px 0;
  }

  .txsm {
    font-size: 14px;
    padding: 20px 50px;
    border-top: 1px solid #cccccc;
  }

  .texts {
    color: #606266;
    line-height: 40px;
    font-weight: bold;
    font-size: 14px;
  }

  .textsnormal {
    color: #606266;
    line-height: 2;
    font-size: 14px;
  }

  .db {
    display: block;
    margin-left: 30px;
    line-height: 30px;
    padding-right: 5px;
  }

  .specialWidth {
    width: calc(100% - 450px);
    min-width: 220px;
  }

  h3 {
    text-align: center;
    margin-bottom: 20px;
  }

  .content-page-sid {
    color: #000;
    font-size: 16px;
    font-weight: 600;
    padding-left: 55px;
  }
</style>
<style>
  .db .el-checkbox__input {
    vertical-align: top;
    margin-top: 11px;
  }

  .db .el-checkbox__label {
    white-space: normal;
    width: 100%;
    line-height: 34px;
    padding-right: 10px;
  }

  .el-input-group__append {
    padding: 0 10px;
  }

  .cmb .el-checkbox-group {
    overflow: hidden;
  }

  .cmbi .el-input {
    width: 90px;
  }

  .cmbi .el-input input {
    border: 0px !important;
    padding: 0 !important;
    background: url('../../assets/formimg/icon_inputbg.png') no-repeat center;
    background-size: contain;
    letter-spacing: 11px !important;
    padding-left: 10px !important;
    font-size: 14px;
  }

  .cmba .el-form-item__error {
    padding-left: 50px;
  }

  .cmba190 .el-form-item__error {
    padding-left: 190px;
  }

</style>
