<template>
  <div id="ctExaminationReport" v-if="CTexaminationReport_page">
    <div class="filter-container content-search">
      <el-button size="mini" class="return-home" @click="goBack()">返 回</el-button>
      <el-button size="small" class="print" @click="printContent('print')" v-if="button == 2 && showDataState">打印</el-button>
    </div>
    <div class="ctExaminationReport-content">
      <div class="title">
      <h2>CT诊断报告单</h2>
    </div>
      <el-form :model="form" :rules="rules" ref="form" class="form-body">
        <div id="print">
          <h3 style="text-align: center;">CT诊断报告单</h3>
          <div class="booking-list1" style="padding-bottom: 0px;">
            <span class="booking-list1-tit">个人信息</span>
            <el-row class="booking-list1-item">
              <el-col :span="8">
                <div class="grid-content bg-purple-light">
                  SID: {{form.sid}}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple-light">
                  姓名： {{form.hosPersonInfoPO.userName}}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple-light">
                  性别：{{form.hosPersonInfoPO.sex | sex}}
                </div>
              </el-col>
            </el-row>
            <el-row class="booking-list1-item">
              <el-col :span="8">
                <div class="grid-content bg-purple-light">
                  年龄：{{form.hosPersonInfoPO.age}}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple-light">
                  检查日期: {{form.checkTime}}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple-light">
                  报告日期： {{form.reportDate}}
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="booking-list1">
            <span class="booking-list1-tit">检测结果</span>
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple-light">
                  <span>扫描技术：平扫，层厚：{{form.flabImageDeep}}mm、薄层：{{form.flabImageShallow}}mm</span>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple-light">
                  <span>检查所见：第{{form.scanCount}}次胸部低剂量CT扫描，检查范围包括整个胸廓。</span>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div v-if="form.tubercle1!=null" class="tubercle">{{form.tubercle1}}</div>
                <div v-if="form.tubercle2!=null" class="tubercle">{{form.tubercle2}}</div>
                <div v-if="form.tubercle3!=null" class="tubercle">{{form.tubercle3}}</div>
                <div v-if="form.tubercle4!=null" class="tubercle">{{form.tubercle4}}</div>
                <div v-if="form.tubercle5!=null" class="tubercle">{{form.tubercle5}}</div>
                <div v-if="form.tubercle6!=null" class="tubercle">{{form.tubercle6}}</div>
                <div v-if="form.tubercle7!=null" class="tubercle">{{form.tubercle7}}</div>
                <div v-if="form.tubercle8!=null" class="tubercle">{{form.tubercle8}}</div>
                <div v-if="form.tubercle9!=null" class="tubercle">{{form.tubercle9}}</div>
                <div v-if="form.tubercle10!=null" class="tubercle">{{form.tubercle10}}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple-light">
                  <div v-if="form.anomalousEvent!=null" class="anomalousEvent">{{form.anomalousEvent}}</div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="booking-list1">
            <span class="booking-list1-tit">影像学诊断</span>
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple-light">
                  <span>{{form.imagingDiagnosis}}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="sid：" prop="value">
              <span>{{form.sid}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="姓名：" prop="value">
              <span>{{form.hosPersonInfoPO.userName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="性别：" prop="value">
              <span>{{form.hosPersonInfoPO.sex | sex}}</span>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="年龄：" prop="value">
              <span>{{form.hosPersonInfoPO.age}}岁</span>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-form-item label="检测日期：" prop="value">
                <span>{{form.checkTime}}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple-light">
              <el-form-item label="报告日期:" prop="reportDate">
                <el-date-picker
                  v-model="form.reportDate"
                  type="date"
                  size="small"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  style="width: 200px;"
                  ref="reportDate"
                  :disabled="showDataState">
                </el-date-picker>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form-item label="扫描技术：" prop="value">
                <span>平扫，层厚：{{form.flabImageDeep}}mm、薄层：{{form.flabImageShallow}}mm</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form-item label="检查所见：" prop="value">
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <span>第{{form.scanCount}}次胸部低剂量CT扫描，检查范围包括整个胸廓。</span>
            </div>
          </el-col>
        </el-row>
        <div class="tubercle-content">
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple" v-if="form.tubercle1 != null">
                <el-form-item label="" prop="tubercle1">
                  <el-input v-model="form.tubercle1" placeholder="" :disabled="showDataState" ref="tubercle1"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple" v-if="form.tubercle2 != null">
                <el-form-item label="" prop="tubercle2">
                  <el-input v-model="form.tubercle2" placeholder="" :disabled="showDataState" ref="tubercle2"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple" v-if="form.tubercle3 != null">
                <el-form-item label="" prop="tubercle3">
                  <el-input v-model="form.tubercle3" placeholder="" :disabled="showDataState" ref="tubercle3"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple" v-if="form.tubercle4 != null">
                <el-form-item label="" prop="tubercle4">
                  <el-input v-model="form.tubercle4" placeholder="" :disabled="showDataState" ref="tubercle4"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple" v-if="form.tubercle5 != null">
                <el-form-item label="" prop="tubercle5">
                  <el-input v-model="form.tubercle5" placeholder="" :disabled="showDataState" ref="tubercle5"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple" v-if="form.tubercle6 != null">
                <el-form-item label="" prop="tubercle6">
                  <el-input v-model="form.tubercle6" placeholder="" :disabled="showDataState" ref="tubercle6"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple" v-if="form.tubercle7 != null">
                <el-form-item label="" prop="tubercle7">
                  <el-input v-model="form.tubercle7" placeholder="" :disabled="showDataState" ref="tubercle7"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple" v-if="form.tubercle8 != null">
                <el-form-item label="" prop="tubercle8">
                  <el-input v-model="form.tubercle8" placeholder="" :disabled="showDataState" ref="tubercle8"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple" v-if="form.tubercle9 != null">
                <el-form-item label="" prop="tubercle9">
                  <el-input v-model="form.tubercle9" placeholder="" :disabled="showDataState" ref="tubercle9"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple" v-if="form.tubercle10 != null">
                <el-form-item label="" prop="tubercle10">
                  <el-input v-model="form.tubercle10"  placeholder="" :disabled="showDataState" ref="tubercle10"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </div>
        <el-row v-if="form.anomalousEvent">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form-item label="" prop="anomalousEvent">
                <el-input
                  type="textarea"
                  ref="anomalousEvent"
                  :autosize="{ minRows: 2, maxRows: 14}"
                  placeholder="请输入内容"
                  :disabled="showDataState"
                  v-model="form.anomalousEvent">
                </el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <el-form-item label="影像学诊断：" prop="imagingDiagnosis">
              <el-input
                type="textarea"
                ref="imagingDiagnosis"
                :autosize="{ minRows: 2, maxRows: 14}"
                placeholder="请输入内容"
                :disabled="showDataState"
                v-model="form.imagingDiagnosis">
              </el-input>
            </el-form-item>
          </div>
        </el-col>
          <el-col :span="24" v-if="$route.query.meetingResultStatus == 1 || $route.query.meetingStatus == 1 ||$route.query.flag == 2" >
            <div class="grid-content bg-purple" v-if="button != 2">
              <el-form-item label="会诊意见：" prop="meetingOpinion">
                <el-input
                  type="textarea"
                  ref="meetingOpinion"
                  :autosize="{ minRows: 2, maxRows: 14}"
                  placeholder="请输入内容"
                  :disabled="showDataState"
                  v-model="form.meetingOpinion">
                </el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="24" v-if="$route.query.flag == 2" >
            <div class="grid-content bg-purple">
              <el-form-item label="会诊意见：" prop="meetingOpinion">
                <el-input
                  type="textarea"
                  ref="meetingOpinion"
                  :autosize="{ minRows: 2, maxRows: 14}"
                  placeholder="请输入内容"
                  :disabled="showDataState"
                  v-model="form.meetingOpinion">
                </el-input>
              </el-form-item>
            </div>
          </el-col>
      </el-row>
        <!--<el-row style="margin-top: 50px;">-->
          <!--<el-col :span="24">-->
            <!--<div class="grid-content bg-purple">-->
              <!--<el-form-item label="会诊意见：" prop="imagingDiagnosis">-->
                <!--<el-input-->
                  <!--type="textarea"-->
                  <!--ref="imagingDiagnosis"-->
                  <!--:autosize="{ minRows: 2, maxRows: 14}"-->
                  <!--placeholder="请输入内容"-->
                  <!--:disabled="showDataState"-->
                  <!--v-model="form.imagingDiagnosis">-->
                <!--</el-input>-->
              <!--</el-form-item>-->
            <!--</div>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <el-form-item style="margin-top: 20px;margin-bottom: 20px;text-align: center;" v-if="!showDataState">
          <el-button type="primary" @click="submit('form')">保存</el-button>
          <el-button @click="goBack()">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default{
    props:[
      "id",
      "type",
      "button"
    ],
    name: 'informing',
    data(){
      return {
        CTexaminationReport_page: false,
        date: '',
        tableTubercleList: [],
        //表单数据
        form: {
          meetingOpinion:'',
          hosPersonInfoPO:{},
          reportDate:'',
          flabImageDeep:'',
          flabImageShallow:'',
          imagingDiagnosis:'',
          anomalousEvent:'',
          tubercle1:'',
          tubercle2:'',
          tubercle3:'',
          tubercle4:'',
          tubercle5:'',
          tubercle6:'',
          tubercle7:'',
          tubercle8:'',
          tubercle9:'',
          tubercle10:'',
        },
        rules:{
          reportDate: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          imagingDiagnosis: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          anomalousEvent: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          tubercle1: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          tubercle2: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          tubercle3: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          tubercle4: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          tubercle5: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          tubercle6: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          tubercle7: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          tubercle8: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          tubercle9: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          tubercle10: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          meetingOpinion: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
        },
        showDataState: false,
      }
    },
    created(){
      let obj = this.checkPageAuth(this, "CTexaminationReport_page", this.btnAuth)
      if(this.type == 1){
        this.showDataState = false
      }else if(this.type == 2){
        this.showDataState = true
      }
      this.getCTReport(this.id)
    },
    methods: {

      printContent: function (element) {
        let subOutputRankPrint = document.getElementById(element);
        let newContent = subOutputRankPrint.innerHTML;
        let oldContent = document.body.innerHTML;
        document.body.innerHTML = newContent;
        window.print();
        window.location.reload();
        document.body.innerHTML = oldContent;
        return false;
      },
      //根据id查看受试者ct报告
      getCTReport(id){
        $axios_http({
          url: "/ct/report/select",
          data: {
            id: id,
          },
          vueObj: this
        }).then((res) => {
          this.form = res.data.result
          console.log(this.form.imagingDiagnosis)
          this.form.reportDate = this.getDate(this.form.reportDate)
          this.form.checkTime = this.getDate(this.form.checkTime)
        })

      },
      buttonChange(value){
         if(value == 2){
           this.getCTReport(this.$route.query.areaId)
         } else {
           this.getCTReport(this.$route.query.id)
         }
      },
      //保存ct报告
      submit(formName){
        this.$refs[formName].validate((valid, obj) => {
          if (!valid) {
            for (var item in obj) {
              if (this.$refs[item].focus) {
                this.$refs[item].focus();
              } else {
                this.$refs[item].$el.focus();
              }
              break;
            }

          }
          if (valid) {
            if (this.$store.state.hospitalType == 3) {
              this.form.type = 2
            } else if (this.$store.state.hospitalType == 1) {
              this.form.type = 1
            }
            this.form.id = this.id
            $axios_http({
              url: "/ct/report/update",
              data: this.form,
              vueObj: this
            }).then((res) => {
              $successMsg(this, '保存成功')
              this.$router.push({path: '/image/imageMangement'})
            })
          }
        });


      },
      //入组时间
      getDate(value){
        if (value != '' && value != null && value != undefined) {
          var value = new Date(value)
          return `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`
        }
        return value
      },
    }

  }
</script>

<style scoped>
  #ctExaminationReport {
    background: #fff;
    padding-bottom: 20px;
  }

  .title {
    margin-bottom: 20px;
    text-align: center;
  }

  .ctExaminationReport-content {
    margin: auto;
    padding-top: 20px;
  }

  .weight-font {
    font-weight: 600;
  }

  .tubercle-content {
    margin-top: 20px;
  }
  .booking-list1 {
    font-size:14px;
    margin: 40px auto;
    width: 700px;
    padding: 20px;
    border: 1px solid #e5e5e5;
    position: relative;
  }
  .booking-list1-item {
    height: 40px;
    /*line-height: 40px;*/
  }

  .booking-list1-tit {
    position: absolute;
    top: -22px;
    display: inline-block;
    padding: 10px;
    background: #ffffff;

  }
  .tubercle{
  }
  .anomalousEvent{
    margin-top: 10px;
  }
  #print{
   width: 700px;;
    margin:auto;
    display: none;
  }
  #print h3 {
    text-align: center;
  }
  .print {
    float: right;
  }
  .form-body{
    max-width: 1200px;
    margin:40px auto;
    /*border:1px solid #e5e5e5;*/
    padding:20px;
  }
</style>
<style>
  .content-page .el-textarea.is-disabled .el-textarea__inner{
    background: #fff;
    color: #000!important;
  }
  .content-page .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    color: #000;
  }
</style>
