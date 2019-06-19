<template>
  <div slot="right" class="content-page" v-if="imageMangement_page">
    <div class="filter-container content-search">
      <el-button :size="$store.state.style.assemblyModel" class="return-home" @click="goBack()">返 回</el-button>
      <el-form :model="qc" :inline=true>
        <el-input style="width: 200px;" :size="$store.state.style.assemblyModel" clearable class="filter-item" placeholder="姓名"
                  v-model.trim="qc.userName">
        </el-input>
        <el-input style="width: 200px;margin-left: 10px;" clearable :size="$store.state.style.assemblyModel" class="filter-item" placeholder="SID"
                  v-model.trim="qc.sid">
        </el-input>
        <el-cascader
          v-if="$store.state.hospitalType != 5"
          style="position: relative;top: -5px;margin-right: 10px;width: 200px;"
          :options="$store.state.regionOptions"
          placeholder="所属社区"
          clearable
          :props="props"
          v-model="ids"
          :size="$store.state.style.assemblyModel"
          filterable
          change-on-select
          @change="getQcId"
        ></el-cascader>
        <!-- <el-input style="width: 200px;margin-left: 10px;" clearable :size="$store.state.style.assemblyModel" class="filter-item" placeholder="手机号"
                  v-model.trim="qc.phone">
        </el-input> -->
        <el-select v-model="qc.groupName" clearable placeholder="请选择分组方案" :size="$store.state.style.assemblyModel" class="filter-item">
          <el-option :value="item.value" :key="item.key" :label="item.label"
                     v-for="item in $store.state.groups"></el-option>
        </el-select>
        <!--<el-select v-model="qc.isCheck" clearable placeholder="是否检查" :size="$store.state.style.assemblyModel" class="filter-item">-->
          <!--<el-option :value="item.value" :key="item.key" :label="item.label"-->
                     <!--v-for="item in $store.state.inspect"></el-option>-->
        <!--</el-select>-->
        <el-select v-model="qc.ctResStatus" clearable placeholder="结果录入状态" :size="$store.state.style.assemblyModel" class="filter-item">
          <el-option :value="item.value" :key="item.key" :label="item.label"
                     v-for="item in $store.state.CTResultStatus"></el-option>
        </el-select>
        <el-select v-model="qc.isMeeting" clearable placeholder="是否会诊" :size="$store.state.style.assemblyModel" class="filter-item">
          <el-option :value="item.value" :key="item.key" :label="item.label"
                     v-for="item in $store.state.yesOrNo"></el-option>
        </el-select>
        <el-select v-model="qc.meetingStatus" clearable placeholder="是否返回会诊结果" :size="$store.state.style.assemblyModel" class="filter-item">
          <el-option :value="item.value" :key="item.key" :label="item.label"
                     v-for="item in $store.state.yesOrNo"></el-option>
        </el-select>
        <el-select v-model="qc.reportGrantStatus" clearable placeholder="报告发放状态" :size="$store.state.style.assemblyModel" class="filter-item">
          <el-option :value="item.value" :key="item.key" :label="item.label"
                     v-for="item in $store.state.grant"></el-option>
        </el-select>
        <!--<el-cascader-->
          <!--:options="$store.state.regionOptions"-->
          <!--placeholder="所属社区"-->
          <!--:props="props"-->
          <!--v-model="ids"-->
          <!--:size="$store.state.style.assemblyModel"-->
          <!--v-if="$store.state.hospitalType != 1"-->
          <!--filterable-->
          <!--:show-all-levels="false"-->
          <!--style="float: left;width: 200px;margin-right: 15px;"-->
          <!--change-on-select-->
          <!--@change="getQcId"-->
        <!--&gt;</el-cascader>-->


        <div>
          <el-button :size="$store.state.style.assemblyModel" type="primary" icon="el-icon-search" @click="query">查询
          </el-button>
          <el-button type="primary" :size="$store.state.style.assemblyModel" icon="el-icon-close" @click="reset">重置
          </el-button>
        </div>
      </el-form>
    </div>

    <div class="content-page-table">
      <div class="table-btn-group">
        <!--<el-button :size="$store.state.style.assemblyModel" type="primary" icon="el-icon-document" v-if="btnAuth.imageMangement_export_excel_btn">-->
        <!--<a :href="downloadUrl" >导出EXCEL</a>-->
        <!--</el-button>-->
        <router-link :to="{path:'/form/CTexamination',query:{flag:3}}">
          <el-button type="primary" :size="$store.state.style.assemblyModel" icon="el-icon-plus" v-if="btnAuth.imageButton1">新增</el-button>
        </router-link>
      </div>
      <!--数据列表-->
      <el-table
        :data="queryResult.tableData"
        border
        :size="$store.state.style.assemblyModel"
        stripe
        :default-sort="{prop: 'inGroupDate', order: 'descending'}"
        :style="{'font-size':$store.state.style.fontSize18}">
        <el-table-column
          prop="sid"
          label="SID"
          >
        </el-table-column>
        <el-table-column
          prop="hosPersonInfoPO.userName"
          label="姓名">
        </el-table-column>
        <el-table-column
          label="性别"
        >
          <template slot-scope="scope">
            <span>{{scope.row.hosPersonInfoPO.sex | sex}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="hosPersonInfoPO.age"
          label="年龄"
        >
        </el-table-column>
        <el-table-column
          prop="deptmentVo.areaName"
          label="所属地区"
          v-if="$store.state.hospitalType == 1"
        >
        </el-table-column>
        <el-table-column
          prop="deptmentVo.communityName"
          label="所属社区"
          v-if="$store.state.hospitalType == 3 || $store.state.hospitalType == 1"
        >
        </el-table-column>


        <el-table-column
          label="分组"
        >
          <template slot-scope="scope">
            <span>{{scope.row.hosPersonScreenPO.groupName | group}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="总体状态"
        >
          <template slot-scope="scope">
            <span>{{scope.row.hosPersonScreenPO.overallStatusCy | overallStatusCy}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="CT结果"
          v-if="$store.state.hospitalType == 3"
        >
          <template slot-scope="scope">
            <router-link :to="{path:'/form/CTexamination',query:{flag:1,sid:scope.row.sid,id:scope.row.id,}}">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"
                         v-if="btnAuth.imageButton2 && scope.row.resultEnterStatus == 2">录入
              </el-button>
            </router-link>
            <router-link :to="{path:'/form/CTexamination',query:{resultId:scope.row.resultId,type:2,flag:2}}">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"
                         v-if="btnAuth.imageButton3 && scope.row.resultEnterStatus == 1">查看
              </el-button>
            </router-link>
            <router-link :to="{path:'/form/CTexamination',query:{resultId:scope.row.resultId,type:2,flag:2}}">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"
                         v-if="btnAuth.imageButton3 && scope.row.resultEnterStatus == 3">查看
              </el-button>
            </router-link>
            <router-link :to="{path:'/form/CTexamination1',query:{resultId:scope.row.resultId,type:1,flag:2,}}">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"
                         v-if="btnAuth.imageButton3 &&  scope.row.resultEnterStatus == 4">查看
              </el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="CT结果"
          v-if="$store.state.hospitalType == 1"
        >
          <template slot-scope="scope">
            <router-link :to="{path:'/form/CTexamination1',query:{resultId:scope.row.resultId,id:scope.row.id,type:1,flag:1,areaId:scope.row.areaReportId}}">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"
                         v-if="btnAuth.imageButton2 && scope.row.resultEnterStatus == 3">会诊
              </el-button>
            </router-link>
            <router-link :to="{path:'/form/CTexamination1',query:{resultId:scope.row.resultId,type:1,flag:2,countryState:2}}">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"
                         v-if="btnAuth.imageButton3 &&  scope.row.resultEnterStatus == 4">查看
              </el-button>
            </router-link>
            <router-link :to="{path:'/form/CTexamination',query:{resultId:scope.row.resultId,type:1,flag:2}}">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"
                         v-if="btnAuth.imageButton3 && scope.row.resultEnterStatus == 1 ">查看
              </el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="CT报告"
          v-if="$store.state.hospitalType == 3 "
        >
          <template slot-scope="scope">
            <router-link :to="{path:'/form/CTexaminationReport1',query:{areaId:scope.row.areaReportId,type:1,meetingResultStatus:scope.row.meetingResultStatus,meetingStatus:scope.row.meetingStatus}}">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"
                         v-if="btnAuth.imageButton4 && scope.row.reportEnterStatus == 2">编辑
              </el-button>
            </router-link>
            <router-link :to="{path:'/form/CTexaminationReport1',query:{areaId:scope.row.areaReportId,type:2,meetingResultStatus:scope.row.meetingResultStatus,meetingStatus:scope.row.meetingStatus}}">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"
                         v-if="btnAuth.imageButton5 && scope.row.reportEnterStatus == 1">查看
              </el-button>
            </router-link>
            <router-link :to="{path:'/form/CTexaminationReport1',query:{areaId:scope.row.areaReportId,type:2,meetingResultStatus:scope.row.meetingResultStatus,meetingStatus:scope.row.meetingStatus}}">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"
                         v-if="btnAuth.imageButton5 && scope.row.reportEnterStatus == 3">查看
              </el-button>
            </router-link>
            <router-link :to="{path:'/form/CTexaminationReport1',query:{nationId:scope.row.nationReportId,areaId:scope.row.areaReportId,type:2,meetingResultStatus:scope.row.meetingResultStatus,meetingStatus:scope.row.meetingStatus,flag:2}}">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"
                         v-if="btnAuth.imageButton5 && scope.row.reportEnterStatus == 4">查看
              </el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="CT报告"
          v-if="$store.state.hospitalType == 5 "
        >
          <template slot-scope="scope">
            <router-link :to="{path:'/form/CTexaminationReport1',query:{areaId:scope.row.areaReportId,type:2}}">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"
                         v-if="btnAuth.imageButton5 && scope.row.reportEnterStatus != 2 && scope.row.resultEnterStatus != 2">查看
              </el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="CT报告"
          v-if="$store.state.hospitalType == 1"
        >
          <template slot-scope="scope">
            <router-link :to="{path:'/form/CTexaminationReport1',query:{nationId:scope.row.nationReportId,areaId:scope.row.areaReportId,type:3,meetingStatus:scope.row.meetingStatus}}">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"
                         v-if="btnAuth.imageButton4 && scope.row.reportEnterStatus == 3">编辑
              </el-button>
            </router-link>
            <router-link :to="{path:'/form/CTexaminationReport1',query:{areaId:scope.row.areaReportId,type:2,meetingStatus:scope.row.meetingStatus}}">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"
                         v-if="btnAuth.imageButton5 && scope.row.reportEnterStatus == 1">查看
              </el-button>
            </router-link>
            <router-link :to="{path:'/form/CTexaminationReport1',query:{nationId:scope.row.nationReportId,areaId:scope.row.areaReportId,type:4,meetingStatus:scope.row.meetingStatus}}">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"
                         v-if="btnAuth.imageButton5 && scope.row.reportEnterStatus == 4">查看
              </el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="请求会诊"
          v-if="$store.state.hospitalType == 3 || $store.state.hospitalType == 1"
        >
          <template slot-scope="scope">
            <span>{{scope.row.meetingStatus | yesOrNo}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="会诊级别"
          v-if="$store.state.hospitalType == 3 || $store.state.hospitalType == 1"
        >
          <template slot-scope="scope">
            <span>{{scope.row.meetingLevel | meetingLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="会诊结果"
          v-if="$store.state.hospitalType == 3 || $store.state.hospitalType == 1"
        >
          <template slot-scope="scope">
            <span>{{scope.row.meetingResultStatus | returnStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="报告下发状态"
        >
          <template slot-scope="scope">
            <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"
                       v-if="btnAuth.imageButton6 && scope.row.reportGrantStatus != 1&& scope.row.reportEnterStatus != 2 && scope.row.resultEnterStatus != 2"
                       @click="reportGrant(scope.row.id,'1')">发放
            </el-button>
            <span v-if="scope.row.reportGrantStatus == 1">已发放</span>
          </template>
        </el-table-column>
        <!--<el-table-column-->
          <!--label="短信通知状态"-->
        <!--&gt;-->
          <!--<template slot-scope="scope">-->
            <!--<span>{{scope.row.messageStatus | messageStatus}}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--label="操作"-->
          <!--v-if="btnAuth.imageButton7"-->
        <!--&gt;-->
          <!--<template slot-scope="scope">-->
            <!--<el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"  @click="openDialog('1',scope.row)" v-if="btnAuth.imageButton7 &&scope.row.reportEnterStatus != 2 && scope.row.resultEnterStatus != 2">-->
              <!--发送短信-->
            <!--</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
      <!--分页栏-->
      <el-row>
        <el-col :span="24" style="text-align: center;">
          <div class="grid-content bg-purple">
            <div class="block" style="margin-top: 18px">
              <el-pagination
                @size-change="pageSizeChange"
                @current-change="currentPageChange"
                :current-page="queryResult.pageNum"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="queryResult.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="queryResult.total">
              </el-pagination>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <!--发送短信-->
      <el-dialog
        title="发送短信"
        :visible.sync="sendMessageDialogVisible"
        width="30%"
        @close="resetForm('sendMessageForm')"
        center>
        <div>
          <el-form :model="sendMessageForm" :rules="sendMessageFormRule" ref="sendMessageForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="短信内容"  prop="message">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                disabled
                v-model="sendMessageForm.message">
              </el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="sendMessageForm.phone" auto-complete="off" class="filter-item"  :size="$store.state.style.assemblyModel"></el-input>
            </el-form-item>
            <div class="send-button-group">
              <el-button type="primary" @click="sendForm('sendMessageForm')" :loading="loadingState">发送</el-button>
              <el-button @click="resetForm('sendMessageForm','sendMessageDialogVisible')">取消</el-button>
            </div>
          </el-form>
        </div>
      </el-dialog>
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="50%"
        @close="resetForm('ruleForm')"
        center>
        <div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
              <el-col :span="24">
                <el-form-item label="活动名称" prop="name">
                  <el-input v-model="ruleForm.name" class="filter-item" :size="$store.state.style.assemblyModel"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="活动区域" prop="region">
                  <el-select v-model="ruleForm.region" placeholder="请选择活动区域" :size="$store.state.style.assemblyModel" class="filter-item">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="即时配送" prop="delivery">
                  <el-switch v-model="ruleForm.delivery" :size="$store.state.style.assemblyModel"></el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="特殊资源" prop="resource">
                  <el-radio-group v-model="ruleForm.resource">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="活动形式" prop="desc">
                  <el-input type="textarea" v-model="ruleForm.desc" :size="$store.state.style.assemblyModel"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item style="text-align: center;">
              <el-button type="primary" @click="submitForm('ruleForm')" :loading="loadingState">保存</el-button>
              <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'Right',
    data () {
      return {
        //权限判定
        imageMangement_page: false,
        btnAuth: {
          imageButton1:false,//肺癌ct新增
          imageButton2:false,//肺癌ct结果录入
          imageButton3:false,//肺癌ct结果查看
          imageButton4:false,//肺癌ct报告录入
          imageButton5:false,//肺癌ct报告查看
          imageButton6:false,//肺癌ct发放
          imageButton7:false,//发送短信
        },
        props: {
          value: 'id',
          children: 'children',
          label: 'deptName'
        },
        //发送短信弹窗
        sendMessageDialogVisible:false,
        ids: [],
        //弹窗状态
        centerDialogVisible: false,
        areaFlag: '',
        //按钮状态
        loadingState: false,
        //下载链接
        downloadUrl: '',
        //发送短信
        sendMessageForm:{
          'message':'',
          'phone':'',
          'sid':'',
        },
        sendMessageFormRule:{
          phone:{required: true, message: '必填', trigger: 'blur'},
          message:{required: true, message: '必填', trigger: 'blur'},
        },
        //查询条件
        "qc": {
          "deptid":'',
          "userName": null,
          "phone": null,
          "sid": null,
          "groupName": null,
          "isCheck": null,
          "ctResStatus": null,
          "isMeeting": null,
          "meetingStatus": null,
          "reportGrantStatus":'',
          "pageNum": 1,
          "pageSize": 10,
        },
        //查询结果
        "queryResult": {
          "pageNum": 1,//当前页
          "pageSize": 10,//每页的条数
          "pages": 0,
          "total": 0,
          "tableData": []
        },
        formLabelWidth: '180px',
        //表单数据
        ruleForm: {
          name: '',
          region: '',
          resource: '',
          desc: ''
        },

        //表单验证规则
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'},
            {required: true, message: '请输入活动名称', trigger: 'change'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change'}
          ],
          region: [
            {required: true, message: '请选择活动区域', trigger: 'change'}
          ],
          resource: [
            {required: true, message: '请选择活动资源', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '请填写活动形式', trigger: 'blur'}
          ]
        }
      }
    },
    mounted(){
      this.$store.commit('LOGOUT_USER');
      let obj = this.checkPageAuth(this, "imageMangement_page", this.btnAuth);
      if(this.$route.query.type && this.$route.query.type == 1){
        this.qc.reportGrantStatus = '2'
      }else if(this.$route.query.type && this.$route.query.type == 2){
        this.qc.ctResStatus = '2'
      }else if(this.$route.query.type && this.$route.query.type == 3){
        this.qc.isMeeting = '1'
        this.qc.meetingStatus = '2'
      }
      this.query()
    },
    methods: {

      //打开弹窗
      openDialog(count,row){
        if(count == 1){
          this.sendMessageDialogVisible = true
          this.sendMessageForm.id = row.id
          this.sendMessageForm.resultId = row.resultId
          $axios_http({
            url: "/system/messagetemplate?type=CTNOTICE&businessId="+row.resultId,
            data: {
            },
            vueObj: this
          }).then((res) => {
            this.sendMessageForm.message = res.data.result.message
            this.sendMessageForm.phone = res.data.result.phone
          })
        }
      },
      //发送短信
      sendForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $axios_http({
              url: "/ct/sendMessage",
              data: {
                id:this.sendMessageForm.id,
                phone:this.sendMessageForm.phone,
                resultId:this.sendMessageForm.resultId
              },
              vueObj: this
            }).then((res) => {
              $successMsg(this,'发送成功')
              this.sendMessageDialogVisible = false
              this.query()
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //发放
      grantReport(row){
        $axios_http({
          url: "/hospital/colonoscopy/updateReportGrantStatus",
          data: {
            id:row.hosCjRecordStatusId,
            sid:row.sid
          },
          vueObj: this
        }).then((res) => {
          $successMsg(this, '发放成功')
          this.query()
        })
      },
      //获取选中区
      getQcId(value){
        this.qc.deptid = value[value.length-1]
      },
      //查询
      query(){
        $axios_http({
          url: "/ct/select/ctrecord/list",
          data: this.qc,
          vueObj: this
        }).then((res) => {
          this.queryResult.tableData = res.data.result.list;
          this.queryResult.pages = res.data.result.pages//获取总共多少页
          this.queryResult.pageNum = res.data.result.pageNum//获取当前第几页
          this.queryResult.pageSize = res.data.result.pageSize//获取当前每页多少条数据
          this.queryResult.total = res.data.result.total//获取总共条数
        })
      },
      //发放报告
      reportGrant(id, status){
        $axios_http({
          url: "/ct/update/ctrecodestatus",
          data: {
            id: id,
            reportGrantStatus: status
          },
          vueObj: this
        }).then((res) => {
          $successMsg(this, '发放成功')
          this.query()
        })
      },
      //表单提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loadingState = true
            alert('submit!');
          } else {
            console.log('error submit!!');
            this.loadingState = false
            return false;
          }
        });
      },

      //表单重置
      resetForm(formName,dilog) {
        this.$refs[formName].resetFields();
        this[dilog] = false
      },

      //重置检索条件
      reset(){
        Object.assign(this.$data.qc, this.$options.data().qc)
        this.ids = []
        this.query()
      },

      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.qc.pageSize = pageSize
        this.query()
        console.log(`每页 ${pageSize} 条`)
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.qc.pageNum = currentPage
        this.query()
        console.log(`当前页: ${currentPage}`);
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
<style>
  .el-textarea.is-disabled .el-textarea__inner{
    background: #fff;
  }
  .send-button-group{
    text-align: center;
  }
</style>
