<template>
  <div class="content-page" v-if="adverseEvent_page">
    <div style="margin-bottom: 20px;">
      <el-button type="normal" size="small" @click="goBack()">返回</el-button>
    </div>
    <el-row>
      <el-col>
        <div class="content-page-sid">
          SID编码：12345678
        </div>

      </el-col>
    </el-row>
    <h3>表 5.5-不良事件记录表</h3>
    <div class="info">
      <span>研究方案定义的所有不良事件需在事件发生后30天内填写本表并上报数据系统，其中严重不良事件需在知晓事件发生的24小时内上报。</span>
    </div>
    <el-row>
      <table class="content-page-table">
        <tr>
          <td rowspan="2" class="content-table-firstTd"></td>
          <td rowspan="2">不良事件描述</td>
          <td rowspan="2">不良事件简称 <br>CTCAE V4</td>
          <td>
            CTCAE 4V
            分级
          </td>
          <td>
            与研究是
            否有关
          </td>
          <td rowspan="2" style="text-align: left;padding-left: 10px;">
            1=预期 <br>
            2=未预期到
          <td>
            是否为严重
            不良事件
          </td>
          <td>
            采取的措施
          </td>
          <td>
            结局
          </td>
          <td>
            不良事件发生日期
            和结局发生日期
          </td>
        </tr>
        <tr>
          <td class="content-td-left">
            1=轻度 <br>

            2=中度<br>

            3=严重<br>

            4=危及生活或致残<br>
            5=死亡
          </td>
          <td class="content-td-left">
            1=无关<br>
            2=可能性不大<br>
            3=可能<br>
            4=很可能<br>
            5=确定
          </td>
          <td class="content-td-left">
            1=是 <br>
            0=否
          </td>
          <td class="content-td-left">
            1=未采取措施<br>

            2=药物治疗<br>

            3=程序性治疗<br>

            4=住院治疗<br>

            5=其他

          </td>
          <td class="content-td-left">


            1=康复<br>

            2=好转<br>

            3=持续<br>

            4=死亡<br>

            5=不详<br>

          </td>
          <td class="content-td-left">


            如果在上报时不良事件仍存在请选择

            <el-checkbox disabled></el-checkbox>
            持续中

          </td>
        </tr>
        <template v-for="item,index in form.addverseEvent">
          <el-form :model="item" :rules="rules[index]" :ref="'form'+index" label-width="140px"
                   style="display:table-row-group;" class="demo-ruleForm">
            <tr>
              <td>
                {{index + 1}}
              </td>
              <td>
                <el-form-item prop="describe" labelWidth="0" class="form-item">
                  <el-input
                    type="textarea"
                    ref="describe"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    @change="rulesChange(item,index)"
                    v-model.trim="item.describe">
                  </el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="Abbreviation" labelWidth="0" class="form-item">
                  <el-input
                    type="textarea"
                    ref="Abbreviation"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    @change="rulesChange(item,index)"
                    v-model.trim="item.Abbreviation">
                  </el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="" prop="Classification" labelWidth="0px" class="form-item1">
                  <el-input v-model.trim="item.Classification" @change="rulesChange(item,index)" placeholder=""
                            size="small" style="width: 40px;" ref="Classification"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="" prop="Relevant" labelWidth="0px" class="form-item1">
                  <el-input v-model.trim="item.Relevant" placeholder="" @change="rulesChange(item,index)" size="small"
                            style="width: 40px;" ref="Relevant"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="" prop="Expect" labelWidth="0px" class="form-item1">
                  <el-input v-model.trim="item.Expect" placeholder="" @change="rulesChange(item,index)" size="small"
                            style="width: 40px;" ref="Expect"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="" prop="serious" labelWidth="0px" class="form-item1">
                  <el-input v-model.trim="item.serious" placeholder="" @change="rulesChange(item,index)" size="small"
                            style="width: 40px;" ref="serious"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="" prop="Measures" labelWidth="0px" class="form-item1">
                  <el-input v-model.trim="item.Measures" placeholder="" @change="rulesChange(item,index)" size="small"
                            style="width: 40px;" ref="Measures"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="" prop="Ending" labelWidth="0px" class="form-item1">
                  <el-input v-model.trim="item.Ending" placeholder="" @change="rulesChange(item,index)" size="small"
                            style="width: 40px;" ref="Ending"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="开始日期：" labelWidth="100px" prop="startDate">
                  <el-date-picker
                    v-model="item.startDate"
                    type="date"
                    ref="startDate"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    size="small"
                    @change="rulesChange(item,index)"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期：" labelWidth="100px" prop="endDate">
                  <el-date-picker
                    v-model="item.endDate"
                    type="date"
                    ref="endDate"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    size="small"
                    @change="rulesChange(item,index)"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期：" labelWidth="100px">
                  <el-checkbox v-model="item.continued" @change="continuedChange(item,index)"
                               :disabled="continuedState">持续中
                  </el-checkbox>
                </el-form-item>
              </td>
            </tr>
          </el-form>
        </template>

      </table>
      <div style="float: right;padding-right: 40px;">
        <div class="addButton">
          <el-button icon="el-icon-plus" circle :disabled="this.form.addverseEvent.length>10"
                     @click="addItem('plus')"></el-button>
          <el-button icon="el-icon-minus" circle :disabled="this.form.addverseEvent.length<4"
                     @click="addItem('minus')"></el-button>
        </div>
      </div>

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
        ruleChange: false,
        //权限判定
        adverseEvent_page: false,
        btnAuth: {
          countryAgencySearch_page: false,
        },
        //展示
        disabledState: true,
        form: {
          addverseEvent: [
            {
              describe: '',//描述
              Abbreviation: '',//简称
              Classification: '',//分级
              Relevant: '',//与研究是否有关
              Expect: '',//预期
              serious: '',//严重
              Measures: '',//措施
              Ending: '',//结局
              startDate: '',//开始日期
              endDate: '',//结束日期
              continued: false,//持续中
            },
            {
              describe: '',//描述
              Abbreviation: '',//简称
              Classification: '',//分级
              Relevant: '',//与研究是否有关
              Expect: '',//预期
              serious: '',//严重
              Measures: '',//措施
              Ending: '',//结局
              startDate: '',//开始日期
              endDate: '',//结束日期
              continued: false,//持续中
            },
            {
              describe: '',//描述
              Abbreviation: '',//简称
              Classification: '',//分级
              Relevant: '',//与研究是否有关
              Expect: '',//预期
              serious: '',//严重
              Measures: '',//措施
              Ending: '',//结局
              startDate: '',//开始日期
              endDate: '',//结束日期
              continued: false,//持续中
            },
          ]
        },
        continuedState: false,
        rules: [
          {
            describe: [
              {required: false, message: '必填', trigger: 'blur'},
            ],
            Abbreviation: [
              {required: false, message: '必填', trigger: 'blur'},
            ],
            Classification: [
              {required: false, message: '必填', trigger: 'blur'},
            ],
            Relevant: [
              {required: false, message: '必填', trigger: 'blur'},
            ],
            Expect: [
              {required: false, message: '必填', trigger: 'blur'},
            ],
            serious: [
              {required: false, message: '必填', trigger: 'blur'},
            ],
            Measures: [
              {required: false, message: '必填', trigger: 'blur'},
            ],
            Ending: [
              {required: false, message: '必填', trigger: 'blur'},
            ],
            startDate: [
              {required: false, message: '必填', trigger: 'blur'},
            ],
            endDate: [
              {required: false, message: '必填', trigger: 'blur'},
            ],
          },
          {
            describe: [
              {required: false, message: '必填', trigger: 'blur'},
            ],
            Abbreviation: [
              {required: false, message: '必填', trigger: 'blur'},
            ],
            Classification: [
              {required: false, message: '必填', trigger: 'blur'},
            ],
            Relevant: [
              {required: false, message: '必填', trigger: 'blur'},
            ],
            Expect: [
              {required: false, message: '必填', trigger: 'blur'},
            ],
            serious: [
              {required: false, message: '必填', trigger: 'blur'},
            ],
            Measures: [
              {required: false, message: '必填', trigger: 'blur'},
            ],
            Ending: [
              {required: false, message: '必填', trigger: 'blur'},
            ],
            startDate: [
              {required: false, message: '必填', trigger: 'blur'},
            ],
            endDate: [
              {required: false, message: '必填', trigger: 'blur'},
            ],
          },
          {
            describe: [
              {required: false, message: '必填', trigger: 'blur'},
            ],
            Abbreviation: [
              {required: false, message: '必填', trigger: 'blur'},
            ],
            Classification: [
              {required: false, message: '必填', trigger: 'blur'},
            ],
            Relevant: [
              {required: false, message: '必填', trigger: 'blur'},
            ],
            Expect: [
              {required: false, message: '必填', trigger: 'blur'},
            ],
            serious: [
              {required: false, message: '必填', trigger: 'blur'},
            ],
            Measures: [
              {required: false, message: '必填', trigger: 'blur'},
            ],
            Ending: [
              {required: false, message: '必填', trigger: 'blur'},
            ],
            startDate: [
              {required: false, message: '必填', trigger: 'blur'},
            ],
            endDate: [
              {required: false, message: '必填', trigger: 'blur'},
            ],
          },
        ],
        rulesArr: []
      }
    },
    mounted(){
      this.$store.commit('LOGOUT_USER');
      let obj = this.checkPageAuth(this, "adverseEvent_page", this.btnAuth);
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
      //
      addItem(method){
        if (method == 'plus') {
          this.form.addverseEvent.push({
            describe: null,//描述
            Abbreviation: null,//简称
            Classification: null,//分级
            Relevant: null,//与研究是否有关
            Expect: null,//预期
            serious: null,//严重
            Measures: null,//措施
            Ending: null,//结局
            startDate: null,//开始日期
            endDate: null,//结束日期
            continued: false,//持续中
          })
          this.rules.push(
            {
              describe: [
                {required: false, message: '必填', trigger: 'blur'},
              ],
              Abbreviation: [
                {required: false, message: '必填', trigger: 'blur'},
              ],
              Classification: [
                {required: false, message: '必填', trigger: 'blur'},
              ],
              Relevant: [
                {required: false, message: '必填', trigger: 'blur'},
              ],
              Expect: [
                {required: false, message: '必填', trigger: 'blur'},
              ],
              serious: [
                {required: false, message: '必填', trigger: 'blur'},
              ],
              Measures: [
                {required: false, message: '必填', trigger: 'blur'},
              ],
              Ending: [
                {required: false, message: '必填', trigger: 'blur'},
              ],
              startDate: [
                {required: false, message: '必填', trigger: 'blur'},
              ],
              endDate: [
                {required: false, message: '必填', trigger: 'blur'},
              ],
            },
          )
        } else if (method == 'minus') {
          this.form.addverseEvent.pop()
          this.rules.pop()
        }
      },
      checkChange(value){
        console.log(value)
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      //填入任意一个表单内容则改变该表单的验证状态
      rulesChange(item, index){
        for (var i in item) {
          if (item[i] == null) {
            item[i] = ''
          }
        }
        if (
          item.describe != '' ||
          item.Abbreviation != '' ||
          item.Classification != '' ||
          item.Relevant != '' ||
          item.Expect != '' ||
          item.serious != '' ||
          item.Measures != '' ||
          item.Ending != '' ||
          item.startDate != '' ||
          item.endDate != ''
        ) {
          this.continuedState = true
          for (let i in this.rules[index]) {
            this.rules[index][i][0].required = true
          }
        } else {
          this.continuedState = false
          for (let i in this.rules[index]) {
            this.rules[index][i][0].required = false
            this.$refs['form' + index][0].resetFields()
          }
        }
      },

      //通过表单的内容判断表单是否需要验证
      formChangeReturn(item){
        for (let i in item) {
          if (item[i] != '') {
            return false
          }
          return true
        }
      },

      //点击持续中,出发表单验证
      continuedChange(item, index){
        if (item.continued == true) {
          this.rules[index].endDate[0].required = false
          this.$refs['form' + index][0].validateField('endDate')
          item.endDate = ''
        } else {
          this.rules[index].endDate[0].required = true
        }
      }
    },
    watch: {}
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content-page-sid {
    color: #000;
    font-size: 16px;
    font-weight: 600;
    padding-left: 55px;
  }

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

  .info {
    text-align: center;
  }

  .content-page-table {
    margin: 20px auto;
    width: 90%;
  }

  .content-page-table td {
    border: 1px solid #000000;
    padding: 10px;
  }

  .content-td-left {
    text-align: left !important;
    padding-left: 10px;
    font-size: 12px;
  }

  .content-table-firstTd {
    width: 50px;
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

  .content-page .el-form-item__content {
    /*line-height:22px;*/
    padding-left: 0px !important;
    position: relative;
    font-size: 14px;
  }

  .form-item .el-form-item__error {
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 0px;
    position: relative;
    top: 100%;
    left: 0;
  }

  .content-page-table {
    font-size: 13px;
  }
</style>
