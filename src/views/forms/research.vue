<template>
  <div class="content-page" v-if="research_page">
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
    <h3>表 5.2-退出研究情况记录表</h3>
    <div class="info">
      <span class="demo-ruleForm-info">说明：</span><span>在未完成所有研究内容前，若研究对象主动退出或被研究人员劝退，需提供以下信息</span>
      <h5 class="demo-ruleForm-h5">（本表必须有研究现场负责人签字）</h5>
    </div>
    <el-row>
      <el-form :model="form" :rules="rules" ref="form" label-width="140px" class="demo-ruleForm">
        <el-col :span="24" style="margin-top: 20px;">
          <el-form-item label="1. 退出研究日期：" prop="exitDate">
            <el-date-picker
              v-model="form.exitDate"
              type="date"
              ref="exitDate"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              size="small"
              value-format="yyyy-MM-dd"
              :disabled="disabledState"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24" style="margin-top: 20px;">
          <el-form-item label="2. 退出研究原因（单选）： " labelWidth="200px" prop="exitReason" class="form-item">
            <br>
            <el-radio-group v-model="form.exitReason" :disabled="disabledState">
              <br>
              <table class="content-reason-table">
                <tr>
                  <td>
                    <el-radio :label="1" ref="exitReason">随访完成</el-radio>
                  </td>
                  <td>
                    <el-radio :label="2">发生死亡（与研究干预措施有关）</el-radio>
                  </td>
                </tr>
                <tr>
                  <td>
                    <el-radio :label="3">失访</el-radio>
                  </td>
                  <td>
                    <el-radio :label="4">发生死亡（与研究干预措施无关）</el-radio>
                  </td>
                </tr>
                <tr>
                  <td>
                    <el-radio :label="5">研究对象拒绝随访</el-radio>
                  </td>
                  <td>
                    <el-radio :label="6">确诊为原发性肺癌</el-radio>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <el-radio :label="7">其他，请说明：
                      <el-form-item labelWidth="0px" prop="exitReason_other" style="display: inline-block;"
                                    class="content-page-itemleft" :inline-message="true">
                        <el-input v-model.trim.trim="form.exitReason_other" :disabled="form.exitReason != 7"
                                  style="width: 220px;"
                                  ref="exitReason_other" size="small"></el-input>
                      </el-form-item>
                    </el-radio>
                  </td>
                </tr>
              </table>
            </el-radio-group>

          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="3.	研究对象拒绝随访的原因（可多选）： " labelWidth="282px" prop="refusalReason" class="form-item">
            <br>
            <el-checkbox-group v-model="form.refusalReason" @change="checkChange" :disabled="disabledState"
                               style="height: 370px;margin-top: 10px;">
              <table class="content-reason-table-check">
                <tr>
                  <td>
                    <el-checkbox label="交通问题" ref="refusalReason">交通问题</el-checkbox>
                  </td>
                  <td>
                    <el-checkbox label="对研究存在不满">对研究存在不满</el-checkbox>
                  </td>
                </tr>
                <tr>
                  <td>
                    <el-checkbox label="担心隐私泄露">担心隐私泄露</el-checkbox>
                  </td>
                  <td>
                    <el-checkbox label="担心医疗费用负担">担心医疗费用负担</el-checkbox>
                  </td>
                </tr>
                <tr>
                  <td>
                    <el-checkbox label="拒绝接受CT检查">拒绝接受CT检查</el-checkbox>
                  </td>
                  <td>
                    <el-checkbox label="担心对医疗保健权益的影响">担心对医疗保健权益的影响</el-checkbox>
                  </td>
                </tr>
                <tr>
                  <td>
                    <el-checkbox label="拒绝接受生物标记物检测">拒绝接受生物标记物检测</el-checkbox>
                  </td>
                  <td>
                    <el-checkbox label="担心对象同时参与了其他研究">担心对象同时参与了其他研究</el-checkbox>
                  </td>
                </tr>
                <tr>
                  <td>
                    <el-checkbox label="拒绝呼吸功能测定">拒绝呼吸功能测定</el-checkbox>
                  </td>
                  <td>
                    <el-checkbox label="调查对象撤销之情同意">调查对象撤销之情同意</el-checkbox>
                  </td>
                </tr>
                <tr>
                  <td>
                    <el-checkbox label="身体疾病/认知障碍">身体疾病/认知障碍</el-checkbox>
                  </td>
                  <td>
                    <el-checkbox label="调查对象已撤离">调查对象已撤离</el-checkbox>
                  </td>
                </tr>
                <tr>
                  <td>
                    <el-checkbox label="家庭负担">家庭负担</el-checkbox>
                  </td>
                  <td>
                    <el-checkbox label="未给出原因">未给出原因</el-checkbox>
                  </td>
                </tr>
                <tr>
                  <td>
                    <el-checkbox label="对研究失去兴趣">对研究失去兴趣</el-checkbox>
                  </td>
                  <td>
                    <el-checkbox label="其他，请说明：">其他，请说明：
                      <el-form-item labelWidth="0px" prop="refusalReason_other" style="display: inline-block;"
                                    class="content-page-itemleft" :inline-message="true">
                        <el-input v-model.trim="form.refusalReason_other"
                                  :disabled="form.refusalReason.indexOf('其他，请说明：')==-1" style="width: 150px;"
                                  ref="refusalReason_other" size="small"></el-input>
                      </el-form-item>
                    </el-checkbox>
                  </td>
                </tr>
              </table>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="24" style="margin-top: 20px;">
          <el-form-item label="4. 研究对象是否在年度筛查间隔中，由于阳性筛查结果而进行诊断性检查？ " labelWidth="485px" prop="item4" class="form-item">
            <br>
            <el-radio-group v-model="form.item4" :disabled="disabledState">
              <br>
              <el-radio :label="1" ref="item4">有</el-radio>
              <el-radio :label="2">没有</el-radio>
              <el-radio :label="3">不确定</el-radio>
            </el-radio-group>
            <br>
            <div v-if="form.item4 == 2">
              <div>
                如果没有进行诊断性检查，请说明原因（单选）：
              </div>
              <el-form-item labelWidth="0px" prop="item4_reason" style="display: inline-block;"
                            class="content-page-itemleft">
                <el-radio-group v-model="form.item4_reason" :disabled="disabledState">
                  <br>
                  <table class="content-reason-table">
                    <tr>
                      <td>
                        <el-radio :label="1" ref="item4_reason"> 研究人员不清楚筛查结果或建议</el-radio>
                      </td>
                      <td>
                        <el-radio :label="2">研究人员建议一年后重复检查</el-radio>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <el-radio :label="3">研究人员清楚筛查结果及建议但
                          不建议随访
                        </el-radio>
                      </td>
                      <td>
                        <el-radio :label="4">研究人员建议在期望随访时间之后
                          进行随访检查
                        </el-radio>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <el-radio :label="5">研究对象因经济原因拒绝随访</el-radio>
                      </td>
                      <td>
                        <el-radio :label="6">原因未知</el-radio>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <el-radio :label="7"> 研究对象因除经济外的其他原因
                          拒绝随访（经济不是首要原因）
                        </el-radio>
                      </td>
                      <td>
                        <el-radio :label="8">其他，请说明：
                          <el-form-item labelWidth="0px" prop="item4_reason_other" style="display: inline-block;"
                                        :inline-message="true"
                                        class="content-page-itemleft">
                            <el-input v-model.trim="form.item4_reason_other" :disabled="form.item4_reason != 8"
                                      style="width: 220px;" ref="item4_reason_other" size="small"
                            ></el-input>
                          </el-form-item>
                        </el-radio>
                      </td>
                    </tr>
                  </table>
                </el-radio-group>
              </el-form-item>

            </div>

          </el-form-item>
        </el-col>
        <el-col :span="24" style="margin-top: 20px;">
          <el-form-item label="5.  研究对象是否同意将来被联系：" labelWidth="240px" prop="item5">
            <el-radio-group v-model="form.item5" :disabled="disabledState">
              <br>
              <el-radio :label="3" ref="item5">是</el-radio>
              <el-radio :label="6">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否同意联系内容被记录：" labelWidth="240px" prop="item6">
            <el-radio-group v-model="form.item6" :disabled="disabledState">
              <br>
              <el-radio :label="3" ref="item6">是</el-radio>
              <el-radio :label="6">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="如果同意被联系，被联系的间隔为：" labelWidth="250px" prop="item7">
            <el-input v-model.trim="form.item7" style="width: 150px;" ref="item7" size="small"
                      :disabled="disabledState"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="6. 备注：" labelWidth="70px" prop="item8">
            <el-input
              type="textarea"
              style="width: 60%;"
              :rows="2"
              :disabled="disabledState"
              placeholder="请输入内容"
              v-model="form.item8">
            </el-input>

          </el-form-item>
        </el-col>
        <el-col :span="24" style="margin-top: 20px;">
          <el-col :span="12">
            <el-form-item label="现场负责人签名：" prop="chargePerson" class="zdysinput">
              <el-input v-model.trim="form.chargePerson" auto-complete="off" ref="chargePerson" size="small"
                        style="width:220px" :disabled="disabledState"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="签名日期：" prop="signatureDate">
              <el-date-picker
                v-model="form.signatureDate"
                type="date"
                ref="signatureDate"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                size="small"
                value-format="yyyy-MM-dd"
                :disabled="disabledState"
                :picker-options="pickerOptions1">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24" style="margin-top: 20px;">
          <el-col :span="12">
            <el-form-item label="填表者签名：" prop="fillerPerson" class="zdysinput">
              <el-input v-model.trim="form.fillerPerson" auto-complete="off" ref="fillerPerson" size="small"
                        style="width:220px" :disabled="disabledState"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="填表日期：" prop="formDate">
              <el-date-picker
                v-model="form.formDate"
                type="date"
                ref="formDate"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                size="small"
                value-format="yyyy-MM-dd"
                :disabled="disabledState"
                :picker-options="pickerOptions1">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-col>
        <div class="addbtn">
          <el-form-item v-if="!disabledState">
            <el-button type="primary" @click="submitForm('form')">保存</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: 'Right',
    data () {


      return {
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        //权限判定
        research_page: false,
        btnAuth: {
          countryAgencySearch_page: false,
        },
        //展示
        disabledState: false,
        form: {
          exitDate: null,//退出研究时间
          exitReason: null,//退出研究原因
          exitReason_other: null,//退出研究其他
          refusalReason: [],//拒绝随访原因
          refusalReason_other: null,//拒绝随访原因其他
          item4: null,//研究对象是否在年度筛查间隔中，由于阳性筛查结果而进行诊断性检查？
          item4_reason: null,//研究对象原因
          item4_reason_other: null,//研究对象原因其他
          item5: null,//是否同意联系
          item6: null,//是否同意联系内容记录
          item7: null,//被联系间隔时间
          item8: null,//备注
          chargePerson: null,//负责人签名
          signatureDate: null,//签名日期
          fillerPerson: null,//填表人签名
          formDate: null,//填表日期

        },
        rules: {
          exitDate: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          exitReason: [
            {required: true, message: '必填', trigger: 'change'},
          ],
          refusalReason: [
            {required: true, message: '必填', trigger: 'change'},
          ],
          exitReason_other: [
            {required: false, message: '必填', trigger: 'change'},
            {required: false, message: '必填', trigger: 'blur'},
          ],
          refusalReason_other: [
            {required: false, message: '必填', trigger: 'change'},
            {required: false, message: '必填', trigger: 'blur'},
          ],
          item4: [
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4_reason: [
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4_reason_other: [
            {required: false, message: '必填', trigger: 'change'},
            {required: false, message: '必填', trigger: 'blur'},
          ],
          item5: [
            {required: true, message: '必填', trigger: 'change'},
          ],
          item6: [
            {required: false, message: '必填', trigger: 'change'},
          ],
          item7: [
            {required: false, message: '必填', trigger: 'change'},
          ],
          item8: [
            {required: false, message: '必填', trigger: 'change'},
          ],
          chargePerson: [
            {required: true, message: '必填', trigger: 'change'},
            {required: true, message: '必填', trigger: 'blur'},
          ],
          signatureDate: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          fillerPerson: [
            {required: true, message: '必填', trigger: 'change'},
            {required: true, message: '必填', trigger: 'blur'},
          ],
          formDate: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],

        },
        rulesArr: [
          'exitReason',
          'refusalReason',
          'item4',
          'item4_reason',
          'item5',
          'item6',
          'item7',
          'item8',

        ]
      }
    },
    mounted(){
      this.$store.commit('LOGOUT_USER');
      let obj = this.checkPageAuth(this, "research_page", this.btnAuth);
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid, obj) => {
          if (!valid) {
            for (var item in obj) {
              for (let i = 0; i < this.rulesArr.length; i++) {
                if (item == this.rulesArr[i]) {
                  console.log(item)
                  this.$refs[item].$el.focus();
                  return
                }
              }
              this.$refs[item].focus();
              break;
            }
          }
          if (valid) {
            alert('成功啦')
          }
        });
      },
      checkChange(value){
        console.log(value)
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    watch: {
      'form.exitReason': function (val, b) {
        if (val == '7') {
          this.$nextTick(function () {
            this.rules.exitReason_other[0].required = true
            this.rules.exitReason_other[1].required = true
          })
        } else {
          this.$nextTick(function () {
            this.rules.exitReason_other[0].required = false
            this.rules.exitReason_other[1].required = false
            this.form.exitReason_other = null
            this.$refs.form.validateField('exitReason_other')
          })
        }
      },
      'form.item4': function (val, b) {
        if (val != '2') {
          this.$nextTick(function () {
            this.form.item4_reason = null
            this.form.item4_reason_other = null
          })
        }
      },
      'form.refusalReason': function (val, b) {
        if (val.indexOf('其他，请说明：') > -1) {
          this.$nextTick(function () {
            this.rules.refusalReason_other[0].required = true
            this.rules.refusalReason_other[1].required = true
          })
        } else {
          this.$nextTick(function () {
            this.rules.refusalReason_other[0].required = false
            this.rules.refusalReason_other[1].required = false
            this.form.refusalReason_other = null
            this.$refs.form.validateField('refusalReason_other')
          })
        }
      },
      'form.item4_reason': function (val, b) {
        if (val == '8') {
          this.$nextTick(function () {
            this.rules.item4_reason_other[0].required = true
            this.rules.item4_reason_other[1].required = true
          })
        } else {
          this.$nextTick(function () {
            this.rules.item4_reason_other[0].required = false
            this.rules.item4_reason_other[1].required = false
            this.form.item4_reason_other = null
            this.$refs.form.validateField('item4_reason_other')
          })
        }
      },
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .return-home {
    display: block;
    /*text-align: center;*/
    margin-bottom: 20px;
  }

  h3 {
    text-align: center;
    margin-bottom: 20px;
  }

  .content-page {
    padding-top: 40px;
    padding-left: 40px;
    background: #fff;
  }

  .content-page-sid {
    color: #000;
    font-size: 16px;
    font-weight: 600;
    padding-left: 55px;
  }

  .demo-ruleForm {
    padding-left: 50px;
  }

  .demo-ruleForm-info {
    font-weight: 600;
  }

  .demo-ruleForm-h5 {
    padding-left: 40px;
  }

  .info {
    padding-left: 20%;
  }

  .content-reason-table {
    margin-top: 10px;
  }

  .content-reason-table tr td {
    border: 1px solid #666;
    padding: 10px 20px;
    /*width: 250px !important;*/
  }

  .content-reason-table-check td {
    border: 1px solid #666;
    width: 350px;
    padding-left: 20px;
  }

  .addbtn {
    margin-top: 50px;
    text-align: center;
    float: left;
    margin-left: 300px;

  }
</style>
<style>
  .zdysinput input {
    border-width: 0 0 1px 0;
    border-color: #000;
    border-radius: 0;
    /*padding-left:10px;*/
  }

  .content-page .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    /*color: #000;*/
  }

  .form-item .el-form-item__content {
    /*line-height:22px;*/
    padding-left: 40px;
    position: relative;
    font-size: 14px;
    margin-left: 10px !important;
  }

  .content-page-itemleft .el-form-item__content {
    padding-left: 0px;
  }
</style>
