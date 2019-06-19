<template>
  <div class="content-page" v-if="personalInformation_page">
    <div>
      <el-button :size="$store.state.style.assemblyModel" class="return-home" @click="goBack()">返 回</el-button>
    </div>
    <h3>研究对象个人信息记录表</h3>
    <el-row>
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
        <el-col :span="24">
          <el-form-item label="1. 姓名：" prop="userName">
            <el-input v-model="form.userName" style="width: 220px;" ref="userName" :size="$store.state.style.assemblyModel" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="2. 性别：" prop="sex">
            <el-input v-model="form.sex" auto-complete="off" :size="$store.state.style.assemblyModel" style="width: 40px;" ref="sex"
                      disabled></el-input>
            <span>1. 男  2. 女</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="3. 身份证号：" prop="idCard">
            <el-input v-model="form.idCard" auto-complete="off" :size="$store.state.style.assemblyModel" style="width: 220px;" ref="idCard"
                      disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="4. 出生日期：" prop="birth">
            <el-date-picker
              v-model="form.birth"
              type="date"
              :size="$store.state.style.assemblyModel"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              disabled
              ref="birth"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="5. 实足年龄：" prop="age">
            <el-input v-model="form.age" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px;" ref="age" disabled
            ></el-input>
            岁
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="6. 民族：" prop="volk">
            <el-input v-model="form.volk" auto-complete="off" :size="$store.state.style.assemblyModel" ref="volk" style="width: 40px;"
                      :disabled="disabledState"></el-input>
            <span>1. 汉族  &nbsp;2. 蒙古族&nbsp;3. 回族&nbsp;4. 满族&nbsp;5. 壮族&nbsp;6. 维吾尔族&nbsp;7. 哈萨克族 &nbsp;8. 其他,请注明
                <span>
                    <el-form-item label="" labelWidth="0" prop="volkOther" style="display: inline-block;"
                                  v-if="form.volk == 8">
                    （ <el-input v-model="form.volkOther"  auto-complete="off" :size="$store.state.style.assemblyModel" ref="volkOther" :disabled="disabledState"
                                style="width: 200px;"
                    ></el-input> ）
                    </el-form-item>
                </span>
                <span>
                     <el-form-item label="" labelWidth="0" prop="" style="display: inline-block;"
                                   v-if="form.volk != 8">
                    （ <el-input v-model="form.volkOther" disabled auto-complete="off" :size="$store.state.style.assemblyModel" ref="volkOther"
                                style="width: 100px;"
                     ></el-input> ）
                    </el-form-item>
                </span>
            9. 未知</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="7. 本人电话：" prop="phone">
            <el-input v-model="form.phone" auto-complete="off" ref="phone" :size="$store.state.style.assemblyModel" style="width: 220px;"
                      :disabled="disabledState"
            ></el-input>
            （手机,必填）
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="" prop="contact_area" style="display: inline-block;">
            <el-input v-model="form.contact_area" auto-complete="off" ref="contact_area" :size="$store.state.style.assemblyModel"
                      @change="getTelphone" style="width: 70px;" :disabled="disabledState"
            ></el-input>
          </el-form-item>
          -
          <el-form-item label="" labelWidth="=10px" prop="contact_telephone" style="display: inline-block;">
            <el-input v-model="form.contact_telephone" ref="contact_telephone" auto-complete="off" :size="$store.state.style.assemblyModel"
                      @change="getTelphone" style="width: 136px" :disabled="disabledState"
            ></el-input>
            （固定电话,尽量填）
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="8. 联系人电话（固定电话、手机至少填一项）:" label-width="360px" prop="contactNumber">(
            <el-form-item label="与本人关系:" label-width="108px" prop="contactRelationship" style="display: inline-block;">
              <el-input v-model="form.contactRelationship" ref="contactRelationship" auto-complete="off" :size="$store.state.style.assemblyModel"
                        style="width: 100px;" :disabled="disabledState"
              ></el-input>
            </el-form-item>
            )
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="手机：" prop="contactPhone">
            <el-input v-model="form.contactPhone" auto-complete="off" ref="contactPhone" :size="$store.state.style.assemblyModel"
                      style="width: 220px;" :disabled="disabledState"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="固定电话：" prop="contact_area_other" style="display: inline-block;">
            <el-input v-model="form.contact_area_other" auto-complete="off" ref="contact_area_other" :size="$store.state.style.assemblyModel"
                      @change="getContactTelephone" style="width: 70px;" :disabled="disabledState"
            ></el-input>
          </el-form-item>
          -
          <el-form-item label="" prop="contact_phone_other" style="display: inline-block;" labelWidth="10">
            <el-input v-model="form.contact_phone_other" ref="contact_phone_other" auto-complete="off" :size="$store.state.style.assemblyModel"
                      @change="getContactTelephone" style="width: 136px" :disabled="disabledState"
            ></el-input>
            <label class="error-tip"  v-if="errorMsg && !disabledState">固定电话、手机至少填一项</label>
          </el-form-item>
        </el-col>
        <!--<el-col :span="24">-->
          <!--<el-form-item label="9. 家庭住址：" required>-->
            <!--<el-form-item style="display: inline-block;" prop="homeAddress">-->
              <!--<el-cascader-->
                <!--:options="$store.state.cityInfo"-->
                <!--v-model="form.homeAddress"-->
                <!--:props="props"-->
                <!--clearable-->
                <!--style="width: 220px;"-->
                <!--ref="homeAddress"-->
                <!--@change="getPostCode('homeAddress','homeDetailedAddress','homePostcode')"-->
                <!--:size="$store.state.style.assemblyModel"-->
                <!--:disabled="disabledState"-->
              <!--&gt;-->
              <!--</el-cascader>-->
            <!--</el-form-item>-->
            <!--<el-form-item  prop="homeDetailedAddress">-->
              <!--<el-input v-model="form.homeDetailedAddress" auto-complete="off" type="textarea" ref="homeDetailedAddress" :size="$store.state.style.assemblyModel" style="width:600px;"placeholder="请输入家庭地址"-->
                        <!--:disabled="disabledState" @change="getPostCode('homeAddress','homeDetailedAddress','homePostcode')"-->
              <!--&gt;</el-input>-->
            <!--</el-form-item>-->
            <!--<div style="margin-top: 20px;">-->
              <!--<el-form-item>-->
                <!--<el-input v-model="form.homePostcode" auto-complete="off" ref="homePostcode" :size="$store.state.style.assemblyModel" style="width: 220px" placeholder="邮编"-->
                          <!--:disabled="disabledState"-->
                <!--&gt;</el-input>-->
              <!--</el-form-item>-->
              <!--<el-form-item prop="homePhone">-->
                <!--<el-input v-model="form.homePhone" auto-complete="off" ref="homePhone" :size="$store.state.style.assemblyModel" style="width: 220px" placeholder="联系电话"-->
                          <!--:disabled="disabledState"-->
                <!--&gt;</el-input>-->
              <!--</el-form-item>-->
            <!--</div>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <el-col :span="24">
          <el-form-item label="9. 常住地址：" required>
            <el-form-item style="display: inline-block;" prop="permanentAddress">
              <el-cascader
                :options="$store.state.cityInfo"
                v-model="form.permanentAddress"
                :props="props"
                clearable
                style="width: 220px;"
                :disabled="disabledState"
                ref="permanentAddress"
                :size="$store.state.style.assemblyModel"
                @change="getPostCode('permanentAddress','permanentDetailedAddress','permanentPostcode')"
              >
              </el-cascader>
            </el-form-item>
            <el-form-item  prop="permanentDetailedAddress" :inline-message="true">
              <el-input v-model="form.permanentDetailedAddress" type="textarea" auto-complete="off" ref="permanentDetailedAddress" :size="$store.state.style.assemblyModel" style="width: 600px;"  placeholder="请输入常住地址"
                        :disabled="disabledState" @change="getPostCode('permanentAddress','permanentDetailedAddress','permanentPostcode')"
              ></el-input>
            </el-form-item>
            <div style="margin-top: 20px;">
              <el-form-item prop="permanentPostcode" :inline-message="true">
                <el-input v-model="form.permanentPostcode" auto-complete="off" ref="permanentPostcode" :size="$store.state.style.assemblyModel" style="width: 220px" placeholder="邮编"
                          :disabled="disabledState"
                ></el-input>
              </el-form-item>
              <el-form-item prop="permanentPhone" :inline-message="true">
                <el-input v-model="form.permanentPhone" auto-complete="off" ref="permanentPhone" :size="$store.state.style.assemblyModel" style="width: 220px" placeholder="联系电话"
                          :disabled="disabledState"
                ></el-input>
              </el-form-item>
            </div>

          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="10. 工作单位：" required>
            <el-form-item style="display: inline-block;" prop="jobAddress">
              <el-cascader
                :options="$store.state.cityInfo"
                v-model="form.jobAddress"
                :props="props"
                clearable
                :disabled="disabledState"
                ref="jobAddress"
                style="width: 220px;"
                :size="$store.state.style.assemblyModel"
                @change="getPostCode('jobAddress','jobDetailedAddress','jobPostcode')"
              >
              </el-cascader>
            </el-form-item>

            <el-form-item prop="jobDetailedAddress" :inline-message="true">
              <el-input v-model="form.jobDetailedAddress" type="textarea" auto-complete="off" ref="jobDetailedAddress" :size="$store.state.style.assemblyModel" style="width: 600px" placeholder="请输入单位地址"
                        :disabled="disabledState" @change="getPostCode('jobAddress','jobDetailedAddress','jobPostcode')"
              ></el-input>
            </el-form-item>
            <div style="margin-top: 20px;">
              <el-form-item prop="jobPostcode" :inline-message="true">
                <el-input v-model="form.jobPostcode" auto-complete="off" ref="jobPostcode" :size="$store.state.style.assemblyModel" style="width: 220px" placeholder="邮编"
                          :disabled="disabledState"
                ></el-input>
              </el-form-item>
              <el-form-item prop="jobPhone" :inline-message="true">
                <el-input v-model="form.jobPhone" auto-complete="off" ref="jobPhone" :size="$store.state.style.assemblyModel" style="width: 220px" placeholder="联系电话"
                          :disabled="disabledState"
                ></el-input>
              </el-form-item>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24" style="margin-top: 20px;">
          <el-col :span="12">
            <el-form-item label="调查员签名：" prop="dcName">
              <el-input v-model="form.dcName"  auto-complete="off" ref="dcName" :size="$store.state.style.assemblyModel" style="width:220px"
                        :disabled="disabledState"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="调查日期：" prop="dcDate">
              <el-date-picker
                v-model="form.dcDate"
                type="date"
                ref="dcDate"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                :size="$store.state.style.assemblyModel"
                value-format="yyyy-MM-dd"
                :disabled="disabledState"
                :picker-options="pickerOptions1">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-col>
        <div class="addbtn" v-if="!disabledState">
          <el-button type="primary" @click="submitForm('ruleForm')"  :loading="buttonDisabled">保存</el-button>
          <el-button @click="goBack()">取消</el-button>
        </div>

      </el-form>
    </el-row>
    <el-dialog
      title=""
      :visible.sync="submitDialog"
      width="30%"
      :show-close="false"
      center>
      <div style="text-align: center;margin-bottom: 10px;"><img src="../../../src/assets/img/success.png" alt="" class="dialog-success"></div>
      <div style="text-align: center;">个人信息表填写成功保存成功</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="next()">去填写《危险因素表》</el-button>
        <el-button @click="returnHome()">返回首页</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    userName: 'Right',
    data () {
      var validatePhone = (rule, value, callback) => {
        if (value === '' || value == null) {
          callback(new Error('手机号不能为空'));
        } else if (!(/\d/.test(value))) {
          callback(new Error('手机号只能是数字'))
        } else if (value.length != 11) {
          callback(new Error('请输入合法的11位手机号'));
        } else {
          callback();
        }
      };
      var validatePhone1 = (rule, value, callback) => {
        if (value === '' || value == null) {
          callback(new Error('请输入正确的联系电话'));
        } else if (!(/\d/.test(value))) {
          callback(new Error('请输入正确的联系电话'))
        } else if (value.length <7 || value.length>11) {
          callback(new Error('请输入正确的联系电话'));
        } else {
          callback();
        }
      };
      var validatecontact_area = (rule, value, callback) => {
        if (value && !(/^\d{3,4}$/.test(value))) {
          callback(new Error('请输入3-4位区号'))
        } else {
          callback();
        }
      };
      var validatecontact_telephone = (rule, value, callback) => {
        if (value && !(/^\d{7,8}$/.test(value))) {
          callback(new Error('请输入7-8位座机号码'))
        } else {
          callback();
        }
      };

      var validatenumber6 = (rule, value, callback) => {
        if (value && !(/^\d{5,6}$/.test(value))) {
          callback(new Error('请输入5-6位邮编号码'))
        } else {
          callback();
        }
      };
      var validatePhone_other = (rule, value, callback) => {
        if (!value) {
          this.errorFlag = true
          callback();
        } else if (value && !(/\d/.test(value))) {
          this.errorFlag = true
          callback(new Error('手机号只能是数字'))
        } else if (value && value.length != 11) {
          this.errorFlag = true
          callback(new Error('请输入合法的11位手机号'));
        }else {
          this.errorFlag = false
          callback();
        }
      };
      var validatecontact_area_other = (rule, value, callback) => {
        if (!value) {
          this.errorFlag = true
          callback();
        } else if (value && !(/^\d{3,4}$/.test(value))) {
          this.errorFlag = true
          callback(new Error('请输入3-4位区号'))
        } else {
          this.errorFlag = false
          callback();
        }
      };
      var validatecontact_telephone_other = (rule, value, callback) => {
        if (!value) {
          this.errorFlag = true
          callback();
        } else if (value && !(/^\d{7,8}$/.test(value))) {
          this.errorFlag = true
          callback(new Error('请输入7-8位座机号码'))
        } else {
          this.errorFlag = false
          callback();
        }
      };
      var contactRelationship = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^[\u4e00-\u9fa5]{2,5}$/.test(value))) {
          callback(new Error('只能是2-5个汉字'))
        } else {
          callback();
        }
      };
      var contactRelationship1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^[\u4e00-\u9fa5]{1,10}$/.test(value))) {
          callback(new Error('只能是1-10个汉字'))
        } else {
          callback();
        }
      };
      var validate_address = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (value.length>50 ||value.length<5) {
          callback(new Error('请输入5-50个字符'))
        } else {
          callback();
        }
      };
      var validate_number10 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (value.length>10 ||value.length<1) {
          callback(new Error('请输入1-10个字符'))
        } else {
          callback();
        }
      };
      return {
        errorFlag: false,
        props: {
          value: 'label',
          children: 'children',
          label: 'label'
        },
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        //权限判定
        personalInformation_page: false,
        btnAuth: {
          countryAgencySearch_page: false,
        },
        buttonDisabled:false,
        //展示
        disabledState: false,
        submitDialog: false,
        detailData: this.$route.query.detailData,
        form: {
          userName: null,//姓名
          sex: null,//性别
          idCard: null,//身份证号码
          birth: null,//出生日期
          age: null,//实足年龄
          volk: null,//民族
          volkOther: null,//民族其他
          phone: null,//本人电话
          telephone: null,//座机号码
          contactRelationship: null,//与本人关系
          // contactPhone: '',//联系人电话
          contactTelephone: null,//联系人座机号码
          homePostcode:'',
          permanentPostcode:'',
          jobPostcode:'',
          homeAddress:[],
          permanentAddress:[],
          jobAddress:[],
          homeDetailedAddress: null,//家庭住址
          permanentDetailedAddress: null,//常住地址
          jobDetailedAddress: null,//工作地址
          dcName: null,//调查员签名
          dcDate: null,//调查日期
          permanentPhone:'',//常驻地址电话
          homePhone:'',//家庭住址联系电话
          jobPhone:''//
        },
        rules: {
          userName: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          sex: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          permanentPhone: [
            {required: false, message: '必填', trigger: 'blur'},
            {required: false, message: '必填', trigger: 'change'},
            {validator: validatePhone1, trigger: 'blur'},
            {validator: validatePhone1, trigger: 'change'}
          ],
          homePhone: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validatePhone1, trigger: 'blur'},
            {validator: validatePhone1, trigger: 'change'}
          ],
          jobPhone: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validatePhone1, trigger: 'blur'},
            {validator: validatePhone1, trigger: 'change'}
          ],
          idCard: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          birth: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          age: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          volk: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          volkOther: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validate_number10, trigger: 'blur'},
            {validator: validate_number10, trigger: 'change'}
          ],
          phone: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validatePhone, trigger: 'blur'},
            {validator: validatePhone, trigger: 'change'}
          ],
          contact_area: [
            {validator: validatecontact_area, trigger: 'blur'},
            {validator: validatecontact_area, trigger: 'change'},
          ],
          contact_telephone: [
            {validator: validatecontact_telephone, trigger: 'blur'},
            {validator: validatecontact_telephone, trigger: 'change'},
          ],
          contactRelationship: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: contactRelationship, trigger: 'blur'},
            {validator: contactRelationship, trigger: 'change'},
          ],
          // 联系人电话 => 手机
          contactPhone: [
            // {required: false, message: '必填', trigger: 'blur'},
            // {required: false, message: '必填', trigger: 'change'},
            {validator: validatePhone_other, trigger: 'blur'},
            {validator: validatePhone_other, trigger: 'change'}
          ],
          // 联系人电话 => 区号
          contact_area_other: [
            {validator: validatecontact_area_other, trigger: 'blur'},
            {validator: validatecontact_area_other, trigger: 'change'},
          ],
          // 联系人电话 => 固定电话
          contact_phone_other: [
            {validator: validatecontact_telephone_other, trigger: 'blur'},
            {validator: validatecontact_telephone_other, trigger: 'change'},
          ],
          homeDetailedAddress: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validate_address, trigger: 'blur'},
          ],
          permanentDetailedAddress: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validate_address, trigger: 'blur'},

          ],
          jobPostcode: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validatenumber6, trigger: 'blur'},
          ],
          permanentPostcode: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validatenumber6, trigger: 'blur'},
          ],
          jobDetailedAddress: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validate_address, trigger: 'blur'},
          ],
          homeAddress:[
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          permanentAddress:[
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          jobAddress:[
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          dcName: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: contactRelationship1, trigger: 'blur'},
          ],
          dcDate: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ]

        }
      }
    },
    mounted(){
      this.$store.commit('LOGOUT_USER');
      let obj = this.checkPageAuth(this, "personalInformation_page", this.btnAuth);
      if (this.$route.query.type == 1) {
        this.disabledState = true
        this.rules = {}
        this.getUserFormInfo()
      } else {
        this.disabledState = false
        this.form.id = this.$route.query.id
        this.getUserInfo()

      }
    },
    computed: {
      errorMsg () {
        if ((/^1[0-9]{10}$/.test(this.form.contactPhone))){
          console.log(1)
          return false
        } else if (/^\d{7,8}$/.test(this.form.contact_phone_other) && /^\d{3,4}$/.test(this.form.contact_area_other)) {
          console.log(2)
          return false
        } else if (!this.form.contactPhone && !this.form.contact_phone_other && !this.form.contact_area_other) {
          if (this.errorFlag) {
            console.log(3)
            return true
          }
        } else{
          return true
        }
      }
    },
    methods: {
      getPostCode(a,b,c){
        var _this = this
        if(this.form[a] == '' || this.form[b] == ''){
          this.form[c] = ''
        }
        var url = 'http://cpdc.chinapost.com.cn/web/index.php?m=postsearch&c=index&a=ajax_addr&searchkey='+this.form[a][0]+this.form[a][1]+this.form[a][2]+this.form[b]
        if(this.form[a]&& this.form[b]){
          $axios_http({
            url: "/system/queryPostCode?address="+this.form[a][0]+this.form[a][1]+this.form[a][2]+this.form[b],
            data: {
//              address: this.form[a][0]+this.form[a][1]+this.form[a][2]+this.form[b]
            },
            vueObj: this
          }).then((res) => {
            if(res.data.result.rs){
              if(res.data.result.rs[0].POSTCODE != -1){
                _this.form[c] = res.data.result.rs[0].POSTCODE
              }else {
                _this.form[c] = ''
              }

            }else {
              _this.form[c] = ''
            }
          })
//          this.$axios.get(url)
//            .then(function (response) {
//                console.log(_this)
//              if(response.data.rs){
//                if(response.data.rs[0].POSTCODE != -1){
//                  _this.form[c] = response.data.rs[0].POSTCODE
//                }else {
//                  _this.form[c] = ''
//                }
//
//              }else {
//                _this.form[c] = ''
//              }
//            })
        }
      },
      //查看个人信息表
      getUserFormInfo(){
        $axios_http({
          url: "/person/query/info/id",
          data: {
            id: this.$route.query.id
          },
          vueObj: this
        }).then((res) => {
          this.form = res.data.result
          console.log(this.form)
          this.form.birth = this.getDate(this.form.birth)
          this.form.dcDate = this.getDate(this.form.dcDate)
          if(this.form.contactTelephone){
            this.form.contact_area_other = this.form.contactTelephone.split('-')[0]
            this.form.contact_phone_other = this.form.contactTelephone.split('-')[1]
          }
          if(this.form.telephone){
            this.form.contact_area = this.form.telephone.split('-')[0]
            this.form.contact_telephone = this.form.telephone.split('-')[1]
          }
        })
      },
      //格式化日期
      getDate(value){
        if (value != '' && value != null && value != undefined) {
          var value = new Date(value)
          return `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`
        }
        return value
      },
      //获取个人信息表
      getUserInfo(){
        $axios_http({
          url: "/person/query/info/id",
          data: {
            id: this.$route.query.id
          },
          vueObj: this
        }).then((res) => {
          this.form.userName = res.data.result.userName
          this.form.sex = res.data.result.sex
          this.form.age = res.data.result.age
          this.form.idCard = res.data.result.idCard
          this.form.birth = this.getDate(res.data.result.birth)
          this.form.phone = res.data.result.phone

        })
      },
      //提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid, obj) => {
          if (!this.form.contactPhone && !this.form.contact_phone_other && !this.form.contact_area_other) {
            this.errorFlag = true
          } else {
            this.errorFlag = false
          }
          if (!valid) {
            for (var item in obj) {
              this.$refs[item].focus();
              return
            }
          }

          if (valid) {
            $axios_http({
              url: "/person/info/update",
              data: this.form,
              vueObj: this
            }).then((res) => {
              if (this.$route.query.type == 1) {
                this.submitDialog = true
              } else {
                this.goBack()
              }
              $successMsg(this, "保存成功")
            })
          }
        });
      },
      resetForm(formuserName) {
        this.$refs[formuserName].resetFields();
      },
      //拼接个人座机号码
      getTelphone(){
        if (this.form.contact_area && this.form.contact_telephone) {
          this.form.telephone = ''
          this.form.telephone = this.form.contact_area + '-' + this.form.contact_telephone
        }
      },
      //拼接其他联系人座机号码
      getContactTelephone(){
        if (this.form.contact_area_other && this.form.contact_phone_other) {
          this.form.contactTelephone = ''
          this.form.contactTelephone = this.form.contact_area_other + '-' + this.form.contact_phone_other
        }
      },
      //下一步
      next(){
        this.$router.replace({name: 'riskFactors', query: {}})
      },
      //返回首页
      returnHome(){
        this.$router.push({path: '/home/home'})
        this.submitDialog = false
      },
    },
    watch: {
      'form.volk': function (val, b) {
        if (val == 8) {
          this.$nextTick(function () {

          })
        } else {
          if (val == 1 || val == 2 || val == 3 || val == 4 || val == 5 || val == 6 || val == 7 || val == 9) {
            this.$nextTick(function () {
              this.form.volkOther = null
            })
          } else {
            this.form.volk = null
            this.form.volkOther = null
          }

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
    background: #fff;
    padding-top: 40px;
    padding-left: 40px;
    padding-bottom:30px;
  }

  .addbtn {
    margin-top: 50px;
    text-align: center;

  }

  .content-page-sid {
    color: #000;
    font-size: 16px;
    font-weight: 600;
    padding-left: 55px;
  }
</style>
<style>
  .content-page .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    /*color: #000;*/
  }
  .dialog-success {
    width: 40px;
    height: 40px;
  }
  .error-tip {
    color: #f56c6c;
    font-size: 12px;
    margin-left: 10px;
    font-weight: 400;
  }
</style>
