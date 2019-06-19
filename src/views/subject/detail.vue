<template>
  <div slot="right" class="content-page detail" v-if="detail_page">
    <div class="content">
      <el-button :size="$store.state.style.assemblyModel" class="return-home" @click=goBack()>返回</el-button>
    </div>
    <div class="booking-list">
      <span class="booking-list-tit">个人信息</span>
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
        <el-col :sm="8" :lg="8" :xl="7">
          <div class="grid-content bg-purple">
            <el-row>
              <el-col :sm="12" :lg="10" :xl="8">
                <div class="grid-content bg-purple col-title">
                  资格审核表：
                </div>
              </el-col>
              <el-col :sm="11" :lg="14" :xl="16">
                <div class="grid-content bg-purple-light">
                  <router-link :to="{path:'/form/qualification',query:{id:detailData.base.id,type:1}}" v-if="btnAuth.subjectDetailButton5">
                    <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}"> 查看</el-button>
                  </router-link>
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
                  危险因素调查：
                </div>
              </el-col>
              <el-col :sm="11" :lg="14" :xl="16">
                <div class="grid-content bg-purple-light">
                {{detailData.base.riskFactorStatus}}
                <router-link :to="{path:'/form/riskFactors',query:{id:detailData.base.id,personInfoId:detailData.base.personInfoId,type:1}}">
                <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" v-if="btnAuth.subjectDetailButton1 && detailData.base.hazardsEntryStatus == '2'"> 录入</el-button>
                </router-link>
                <router-link :to="{path:'/form/riskFactors',query:{id:detailData.base.id,type:2}}">
                <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" v-if="btnAuth.subjectDetailButton2 && detailData.base.hazardsEntryStatus == '1'"> 查看</el-button>
                </router-link>
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
                  个人信息表：
                </div>
              </el-col>
              <el-col :sm="11" :lg="14" :xl="16">
                <div class="grid-content bg-purple-light">
                  <div class="grid-content bg-purple-light">
                    <router-link
                      :to="{path:'/form/personalInformation',query:{id:detailData.base.personInfoId,type:'1'}}">
                      <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" v-if="btnAuth.subjectDetailButton3 && detailData.base.personInfoEntryStatus == '1'"> 查看</el-button>
                    </router-link>
                    <router-link
                      :to="{path:'/form/personalInformation',query:{id:detailData.base.personInfoId,type:'2'}}">
                      <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" v-if=" btnAuth.subjectDetailButton4 &&detailData.base.personInfoEntryStatus == '2'">录入 </el-button>
                    </router-link>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="detail-table">
      <h3>筛查项目预约情况</h3>
      <el-table
        :data="detailData.bookingData"
        border
        :size="$store.state.style.assemblyModel"
        style="width: 1001px;font-size: 16px;">
        <el-table-column
          label="筛查类型"
          width="200">
          <template slot-scope="scope">
            <span>{{scope.row.bookingType | bookingType}}</span>
            <!--1是ct-->
          </template>
        </el-table-column>
        <el-table-column
          label="预约状态"
          width="200"
        >
          <template slot-scope="scope">
            <span>{{scope.row.bookingStatus | bookingStatus}}</span>
            <!--1是未预约2是已预约-->
          </template>
        </el-table-column>
        <el-table-column
          label="预约时间"
          prop="period"
          width="200"
        >
        </el-table-column>
        <el-table-column
          label="预约来源"
          width="200"
        >
          <template slot-scope="scope">
            <span>{{scope.row.source | source}}</span>
            <!--1是未预约2是已预约-->
          </template>
        </el-table-column>
        <el-table-column
          label="预约单"
          width="200"
        >
          <template slot-scope="scope">
            <router-link :to="{name:'reservations',query:{type:1,id:scope.row.id,}}" v-if="scope.row.bookingType == 1">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel" v-if="scope.row.bookingStatus == 2 && btnAuth.subjectDetailButton6">查看预约单</el-button>
            </router-link>
            <router-link :to="{name:'reservations',query:{type:2,id:scope.row.id,}}" v-if="scope.row.bookingType == 2">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel" v-if="scope.row.bookingStatus == 2 && btnAuth.subjectDetailButton6">查看预约单</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>

      <h3>低剂量螺旋CT筛查情况</h3>
      <el-table
        :data="detailData.CTData"
        border
        :style="$store.state.hospitalType == 5? 'width:601px;font-size: 16px!important':'width: 1401px;font-size: 16px!important'"
        >

        <el-table-column
          label="检测日期"
          width="200"
        >
          <template slot-scope="scope">
            <span>{{scope.row.examinationDate | entryTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="CT结果"
          width="200"
          v-if="$store.state.hospitalType == 3|| $store.state.hospitalType == 1"
        >
          <template slot-scope="scope">
            <router-link :to="{path:'/form/CTexamination',query:{resultId:scope.row.resultId,type:1,flag:2}}">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"
                         v-if="btnAuth.subjectDetailButton8 &&  scope.row.resultEnterStatus == 1">查看
              </el-button>
            </router-link>
            <router-link :to="{path:'/form/CTexamination1',query:{resultId:scope.row.resultId,type:1,flag:2}}">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"
                         v-if="btnAuth.subjectDetailButton8 &&  scope.row.resultEnterStatus == 3">查看
              </el-button>
            </router-link>
            <router-link :to="{path:'/form/CTexamination1',query:{resultId:scope.row.resultId,type:1,flag:2}}">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"
                         v-if="btnAuth.subjectDetailButton8 &&  scope.row.resultEnterStatus == 4">查看
              </el-button>
            </router-link>
            <span v-if="scope.row.resultEnterStatus == 2">未录入</span>
          </template>
        </el-table-column>
        <el-table-column
          label="CT报告"
          v-if="$store.state.hospitalType == 3 "
        >
          <template slot-scope="scope">
            <router-link :to="{path:'/form/CTexaminationReport1',query:{areaId:scope.row.areaReportId,type:2,flag:1}}">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"
                         v-if="btnAuth.subjectDetailButton7 && scope.row.reportEnterStatus == 1">查看
              </el-button>
            </router-link>
            <router-link :to="{path:'/form/CTexaminationReport1',query:{areaId:scope.row.areaReportId,type:2,flag:1}}">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"
                         v-if="btnAuth.subjectDetailButton7 && scope.row.reportEnterStatus == 3">查看
              </el-button>
            </router-link>
            <router-link :to="{path:'/form/CTexaminationReport1',query:{areaId:scope.row.areaReportId,type:2,flag:2}}">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"
                         v-if="btnAuth.subjectDetailButton7 && scope.row.reportEnterStatus == 4">查看
              </el-button>
            </router-link>
            <span v-if="scope.row.resultEnterStatus == 2">未录入</span>
          </template>
        </el-table-column>
        <el-table-column
          label="CT报告"
          v-if="$store.state.hospitalType == 5 "
        >
          <template slot-scope="scope">
            <router-link :to="{path:'/form/CTexaminationReport1',query:{areaId:scope.row.areaReportId,type:2}}">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"
                         v-if="btnAuth.subjectDetailButton7 && scope.row.reportEnterStatus != 2 && scope.row.resultEnterStatus != 2">查看
              </el-button>
            </router-link>
            <span v-if="scope.row.resultEnterStatus == 2">未录入</span>
          </template>
        </el-table-column>
        <el-table-column
          label="CT报告"
          v-if="$store.state.hospitalType == 1"
        >
          <template slot-scope="scope">
            <router-link :to="{path:'/form/CTexaminationReport1',query:{areaId:scope.row.areaReportId,type:2,meetingStatus:scope.row.meetingStatus}}">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"
                         v-if="btnAuth.subjectDetailButton7 && scope.row.reportEnterStatus == 1">查看
              </el-button>
            </router-link>
            <router-link :to="{path:'/form/CTexaminationReport1',query:{nationId:scope.row.nationReportId,areaId:scope.row.areaReportId,type:4,meetingStatus:scope.row.meetingStatus}}">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"
                         v-if="btnAuth.subjectDetailButton7 && scope.row.reportEnterStatus == 4">查看
              </el-button>
            </router-link>
            <span v-if="scope.row.resultEnterStatus == 2">未录入</span>
          </template>
        </el-table-column>


        <!--<el-table-column-->
          <!--label="CT报告"-->
          <!--width="200"-->
        <!--&gt;-->
          <!--<template slot-scope="scope">-->
            <!--<router-link :to="{path:'/form/CTexaminationReport',query:{id:scope.row.areaReportId,flag:1}}">-->
              <!--<el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"-->
                         <!--v-if="btnAuth.subjectDetailButton7 && scope.row.reportEnterStatus == 3">查看-->
              <!--</el-button>-->
            <!--</router-link>-->
            <!--<router-link :to="{path:'/form/CTexaminationReport',query:{id:scope.row.areaReportId,flag:2}}">-->
              <!--<el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"-->
                         <!--v-if="btnAuth.subjectDetailButton7 && scope.row.reportEnterStatus == 1">查看-->
              <!--</el-button>-->
            <!--</router-link>-->
            <!--<router-link :to="{path:'/form/CTexaminationReport',query:{id:scope.row.nationReportId,flag:2}}">-->
              <!--<el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"-->
                         <!--v-if="btnAuth.subjectDetailButton7 && scope.row.reportEnterStatus == 4">查看-->
              <!--</el-button>-->
            <!--</router-link>-->
            <!--<span v-if="scope.row.resultEnterStatus == 2">未录入</span>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <el-table-column
          v-if="$store.state.hospitalType == 3 || $store.state.hospitalType == 1"
          label="是否会诊"
          width="200"
        >
          <template slot-scope="scope">
            <span>{{scope.row.meetingStatus | yesOrNo}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="会诊级别"
          width="200"
          v-if="$store.state.hospitalType == 3 || $store.state.hospitalType == 1"
        >
          <template slot-scope="scope">
            <span>{{scope.row.meetingLevel | meetingLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="是否返回会诊结果"
          width="200"
          v-if="$store.state.hospitalType == 3 || $store.state.hospitalType == 1"
        >
          <template slot-scope="scope">
            <span>{{scope.row.meetingResultStatus | yesOrNo}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="报告发放"
          width="200"
        >
          <template slot-scope="scope">
            <span>{{scope.row.reportGrantStatus | grant}}</span>
          </template>
        </el-table-column>

      </el-table>
      <!--数据列表-->
      <h3>FIT列表</h3>
      <el-table
        :data="FITData"
        border
        style="width: 1401px;background: #fff!important;font-size: 16px!important;">
        <el-table-column
          label="编码录入状态"
          width="200"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.codeEntryStatus == 2">未录入</span>
            <span v-if="scope.row.codeEntryStatus == 1">已录入</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="releaseDate"
          label="噗噗管发放日期"
          :formatter="dateFormat"
          width="200"
        >
        </el-table-column>
        <el-table-column
          label="噗噗管ID"
          width="200"
        >
          <template slot-scope="scope">
            <span>{{scope.row.fitCode}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="结果录入状态"
          width="200"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.resultEnterStatus == 2">未录入</span>
            <span v-if="scope.row.resultEnterStatus == 1">已录入</span>
          </template>
        </el-table-column>

        <el-table-column
          label="结果录入日期"
          :formatter="dateFormat"
          prop="resultDate"
          width="200"
        >
        </el-table-column>
        <el-table-column
          label="FIT结果"
          width="200"
        >
          <template slot-scope="scope">
            <span>{{scope.row.result | FITresult}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel" v-if="scope.row.resultEnterStatus == 1 && btnAuth.subjectDetailButton9" @click="openFitDialog(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <h3>结肠镜筛查情况</h3>
      <el-table
        :data="detailData.colonoscopyData"
        border
        :style="$store.state.hospitalType == 5? 'width:601px;font-size: 16px!important':'width: 1001px;font-size: 16px!important'">
        <el-table-column
          label="检查日期"
          width="200"
        >
          <template slot-scope="scope">
            <span>{{scope.row.examinationDate | entryTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="肠镜结果"
          width="200"
          v-if="$store.state.hospitalType == 3 || $store.state.hospitalType == 1"
        >
          <template slot-scope="scope">
            <router-link :to="{name:'report1',query:{id:scope.row.resultId,show:1,sid:scope.row.sid,flag:3}}"
                         v-if="scope.row.resultEnterStatus == 1">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel">查看</el-button>
            </router-link>
            <span v-else>未录入</span>
          </template>
        </el-table-column>
        <el-table-column
          label="肠镜病理结果"
          width="200"
          v-if="$store.state.hospitalType == 3 || $store.state.hospitalType == 1"
        >
          <template slot-scope="scope">
            <router-link :to="{path:'/form/report2',query:{pathologyId:scope.row.pathologyId,sid:scope.row.sid,show:1}}"
                         v-if="scope.row.pathologyEnterStatus == 1">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel">查看</el-button>
            </router-link>
            <span v-else>未录入</span>
          </template>
        </el-table-column>
        <el-table-column
          label="肠镜告知书"
          width="200"
        >
          <template slot-scope="scope">
            <router-link :to="{name:'report3',query:{sid:scope.row.sid,reportId:scope.row.reportId,show:1}}"
                         v-if="scope.row.reportEnterStatus == 1">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel">查看</el-button>
            </router-link>
            <span v-else>未录入</span>
          </template>
        </el-table-column>
        <el-table-column
          label="告知书发放"
          width="200"
        >
          <template slot-scope="scope">
            <span>{{scope.row.reportGrantStatus | grant}}</span>
          </template>
        </el-table-column>
      </el-table>

      <h3>异常事件列表</h3>
      <el-table
        :data="detailData.abnormalData"
        border
        style="width: 601px;font-size: 16px!important">
        <el-table-column
          label="异常事件类型"
          width="200">
          <template slot-scope="scope">
            <span>{{scope.row.abnormalType | abnormalType}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="添加类型"
          width="200"
        >
          <template slot-scope="scope">
            <span>{{scope.row.addType | addType}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="录入状态"
          width="200"
        >
          <template slot-scope="scope">
            <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"
                       v-if="btnAuth.subject_abnormalEnterStatus_show_btn && scope.row.enterStatus == 1">查看
            </el-button>
            <span v-else>未录入</span>
          </template>
        </el-table-column>
      </el-table>


      <h3>随诊列表</h3>
      <el-table
        :data="detailData.followData"
        border
        style="width: 601px;font-size: 16px!important">
        <el-table-column
          label="随诊类型"
          width="200">
          <template slot-scope="scope">
            <span>{{scope.row.followType | followType}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="随诊状态"
          width="200">
          <template slot-scope="scope">
            <span>{{scope.row.followStatus | followStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="随诊日期"
          width="200"
          prop="followDate">
        </el-table-column>
        <!--<el-table-column-->
        <!--label="随诊医生"-->
        <!--prop="followDoctor">-->
        <!--</el-table-column>-->
      </el-table>
      <!--查看结果-->
      <el-dialog
        title="查看FIT结果"
        :visible.sync="showResultDialogVisible"
        width="30%"
        center>
        <div>
          <el-form :model="showResultForm" ref="showResultForm" label-width="120px" class="demo-ruleForm">
            <el-row>
              <el-col :span="12">
                <el-form-item label="FIT结果"  prop="upLineValue" >
                  {{showResultForm.result | FITresult}}
                </el-form-item>
                <el-form-item label="上线"  prop="upLineValue" v-if="showResultForm.result != 4">
                  {{showResultForm.upLineValue}}
                </el-form-item>
                <el-form-item label="下线"  style="margin-top:10px" prop="downLineValue" v-if="showResultForm.result != 4">
                  {{showResultForm.downLineValue}}
                </el-form-item>
                <el-form-item label="10分钟内读取"  style="margin-top:10px" prop="inTenMin" v-if="showResultForm.result != 4">
                  {{showResultForm.inTenMin | yesOrNo}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <img :src="fitImage" alt="" style="width: 200px;height: 200px;" @click="showImgDialogVisible = true">
              </el-col>
            </el-row>
            <el-form-item label="无结果原因"  v-if="showResultForm.result==4">
              {{showResultForm.noResonResult}}
            </el-form-item>
            <div style="text-align: center;" v-if="!showFITResult">
              <el-button type="primary" @click="showResultDialogVisible = false">返回</el-button>
            </div>
          </el-form>
        </div>
      </el-dialog>
      <el-dialog
        title="查看FIT结果"
        :visible.sync="showImgDialogVisible"
        width="40%"
        center>
        <div style="overflow:scroll">
          <img :src="fitImage" alt="" style="max-width: 100%;max-height: 100%;">
        </div>
      </el-dialog>

    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        detail_page: false,
        showFITResult:false,
        showImgDialogVisible:false,
        btnAuth: {
          subjectDetailButton1:false,  //社区受试者详情录入危险因素
          subjectDetailButton2:false,  //受试者详情查看危险因素
          subjectDetailButton3:false,  //受试者详详情查看个人信息
          subjectDetailButton4:false,  //社区受试者详情录入个人信息
          subjectDetailButton5:false,  //受试者详情资格审核表
          subjectDetailButton6:false,  //受试者详情预约单查看
          subjectDetailButton7:false,  //受试者详情查看ct报告
          subjectDetailButton8:false, //受试者详情查看ct结果
          subjectDetailButton9:false, //受试者详情查看FIT结果
        },
        FITData: [],
        fitImage:'',
        formLabelWidth: '100px',
        showResultDialogVisible:false,
        showResultForm:{},
        "detailData": {
          "base": {},
          "followData": [],
          "FITData": [],
          "abnormalData": [],
          "colonoscopyData": [],
          "CTData": [],
          "bookingData":[]

        },
      }
    },
    mounted(){
      let obj = this.checkPageAuth(this, "detail_page", this.btnAuth)
      this.getAllList()
      this.query()
    },
    methods: {
      //查询
      query(){
        $axios_http({
          url: "/person/info/get",
          data: {
            perscrid: this.$route.query.id
          },
          vueObj: this
        }).then((res) => {
          this.detailData.base = res.data.result

        })
      },
      //打开弹窗
      openFitDialog(row){
          this.showResultDialogVisible = true
          this.showResultForm = row
        if(row.pathUrl){
          this.fitImage = `${SERVER_NAME}/ct/find/image/path?id=${row.pathUrl}`
        }else{
          this.fitImage = ''
        }
      },
      //日期格式化
      dateFormat: function (row, column) {
        var date = row[column.property];
        if (date == undefined) {
          return "";
        }
        var value = new Date(row[column.property])
        return `${value.getFullYear()}年${value.getMonth() + 1}月${value.getDate()}日`
      },
      //获取详情列表集合
      getAllList(){
        //受试者随诊集合
        $axios_http({
          url: "/person/follow/list",
          data: {
            perscrid: this.$route.query.id
          },
          vueObj: this
        }).then((res) => {
          this.detailData.followData = res.data.result
        })

        //受试者FIT集合
        $axios_http({
          url: "/person/fit/list",
          data: {
            perscrid: this.$route.query.id
          },
          vueObj: this
        }).then((res) => {
          this.FITData = res.data.result

          console.log(this.detailData, 1111)
        })
        //预约集合
        $axios_http({
          url: "/person/booking/list",
          data: {
            sid: this.$route.query.sid
          },
          vueObj: this
        }).then((res) => {
          this.detailData.bookingData = res.data.result
        })

        //受试者异常事件集合
        $axios_http({
          url: "/person/abnormal/list",
          data: {
            perscrid: this.$route.query.id
          },
          vueObj: this
        }).then((res) => {
          this.detailData.abnormalData = res.data.result
        })

        //受试者肠镜集合
        $axios_http({
          url: "/person/colonoscopy/list",
          data: {
            perscrid: this.$route.query.id
          },
          vueObj: this
        }).then((res) => {
          this.detailData.colonoscopyData = res.data.result
        })

        //受试者CT集合
        $axios_http({
          url: "/person/ct/list",
          data: {
            perscrid: this.$route.query.id
          },
          vueObj: this
        }).then((res) => {
          this.detailData.CTData = res.data.result
        })
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
  .col-title{
    text-align: center;
  }

  h3 {
    margin-top: 40px;
    margin-bottom:10px;
  }

  .booking-list {
    margin: 30px auto;
    padding-top:20px;
    border: 1px solid #e5e5e5;
    position: relative;
  }

  .booking-list-item {
    height: 50px;
    line-height: 40px;
  }

  .booking-list-tit {
    position: absolute;
    top: -22px;
    display: inline-block;
    padding: 10px;
    background: #ffffff;

  }
</style>
<style>
  .el-table__header-wrapper {
    background: #fff;
  }

  .detail .cell {
    height: 35px !important;
    line-height: 35px !important;
  }

  .detail .el-table__expand-icon {
    height: 35px !important;
    line-height: 35px !important;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    min-width: 200px;
    color: #909399;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .demo-ruleForm{
    /*padding-left:100px;*/
  }
  .content-page .gutter{
    border-top:0;
    border-bottom:0;
    border-right:0;
  }
</style>
