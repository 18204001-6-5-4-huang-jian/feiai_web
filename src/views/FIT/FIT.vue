<template>
  <div slot="right" class="content-page" v-if="FIT_page">
        <div class="filter-container content-search">
          <el-button :size="$store.state.style.assemblyModel" class="return-home" @click="goBack()">返 回</el-button>
          <el-form :model="qc" :inline=true>
            <el-input style="width: 200px;" :size="$store.state.style.assemblyModel" clearable class="filter-item" placeholder="姓名"
                      v-model.trim="qc.userName">
            </el-input>
            <el-input style="width: 200px;margin-left: 10px;" clearable :size="$store.state.style.assemblyModel" class="filter-item" placeholder="SID"
                      v-model.trim="qc.sid">
            </el-input>
            <el-input style="width: 200px;margin-left: 10px;" clearable :size="$store.state.style.assemblyModel" class="filter-item" placeholder="手机号"
                      v-model.trim="qc.phone">
            </el-input>
            <el-cascader
              v-if="$store.state.hospitalType != 1"
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
            <el-select v-model="qc.groupName" clearable placeholder="请选择分组方案" :size="$store.state.style.assemblyModel" class="filter-item" >
              <el-option :value="item.value" :key="item.key" :label="item.label" v-for="item in $store.state.groups"></el-option>
            </el-select>
            <el-select v-model="qc.codeEntryStatus" clearable placeholder="FIT编码录入状态" :size="$store.state.style.assemblyModel" class="filter-item" >
              <el-option :value="item.value" :key="item.key" :label="item.label" v-for="item in $store.state.entryStatus"></el-option>
            </el-select>
            <el-select v-model="qc.insertStatus" clearable placeholder="FIT结果录入状态" :size="$store.state.style.assemblyModel" class="filter-item" >
              <el-option :value="item.value" :key="item.key" :label="item.label" v-for="item in $store.state.entryStatus"></el-option>
            </el-select>
            <el-select v-model="qc.result" clearable placeholder="FIT结果" :size="$store.state.style.assemblyModel" class="filter-item" >
              <el-option :value="item.value" :key="item.key" :label="item.label" v-for="item in $store.state.result"></el-option>
            </el-select>
            <div>
              <el-button :size="$store.state.style.assemblyModel" type="primary" icon="el-icon-search" @click="query">查询</el-button>
              <el-button type="primary" :size="$store.state.style.assemblyModel" icon="el-icon-close" @click="reset" >重置</el-button>
            </div>
          </el-form>
        </div>

        <div class="content-page-table">
          <div class="table-btn-group">
            <el-button :size="$store.state.style.assemblyModel" type="primary" icon="el-icon-plus" @click="openDialog('1')" v-if="btnAuth.fitButton5">
              新增
            </el-button>
            <!--<el-button :size="$store.state.style.assemblyModel" type="primary" icon="el-icon-document">-->
              <!--<a :href="downloadUrl">导出EXCEL</a>-->
            <!--</el-button>-->
            <!--<el-button class="filter-item" type="primary" :size="$store.state.style.assemblyModel" icon="el-icon-close">退出研究</el-button>-->
          </div>
          <!--数据列表-->
          <el-table
            :data="queryResult.tableData"
            border
            stripe
            :size="$store.state.style.assemblyModel"
            :default-sort="{prop: 'inGroupDate', order: 'descending'}"
            :style="{'font-size':$store.state.style.fontSize18}">
            <el-table-column
              prop="sid"
              label="SID"
             >
            </el-table-column>
            <el-table-column
              prop="userName"
              label="姓名">
            </el-table-column>
            <el-table-column
              label="性别"
              width="70px"
            >
              <template slot-scope="scope">
                <span>{{scope.row.sex | sex}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="age"
              label="年龄"
              width="70px"
            >
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机号"
            >
            </el-table-column>
            <el-table-column
              prop="areaName"
              label="所属地区"
              v-if="$store.state.hospitalType == 1"
            >
            </el-table-column>
            <el-table-column
              prop="communityName"
              label="所属社区"
              v-if="$store.state.hospitalType == 3 || $store.state.hospitalType == 1"
            >
            </el-table-column>

            <el-table-column
              label="分组"
              width="70px"
            >
              <template slot-scope="scope">
                <span>{{scope.row.groupName | group}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="总体状态"
            >
              <template slot-scope="scope">
                <span>{{scope.row.overallStatusCy | overallStatusCy}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="编码录入状态"
            >
              <template slot-scope="scope">
                <span>{{scope.row.codeEntryStatus | entryStatus}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="噗噗管发放日期"
            >
              <template slot-scope="scope">
                <span>{{scope.row.releaseDate | entryTime}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="fitCode"
              label="噗噗管ID"
            >
            </el-table-column>
            <el-table-column
              label="FIT结果录入状态"
            >
              <template slot-scope="scope">
                <span>{{scope.row.resultEnterStatus | entryStatus}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="FIT结果录入日期"
            >
              <template slot-scope="scope">
                <span>{{scope.row.resultDate | entryTime}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="FIT结果"
            >
              <template slot-scope="scope">
                <span>{{scope.row.result | FITresult}}</span>
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
              <!--label="总体状态"-->
              <!--width="100"-->
            <!--&gt;-->
              <!--<template slot-scope="scope">-->
                <!--<span>{{scope.row.overallStatusCy | overallStatusCy}}</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column
              label="操作"
              width="200px"
            >
              <template slot-scope="scope">
                <el-button type="text":style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"  @click="openDialog('2',scope.row)" v-if="btnAuth.fitButton1 && scope.row.codeEntryStatus == 2">录入编码</el-button>
                <el-button type="text":style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"  @click="openDialog('3',scope.row)" v-if="btnAuth.fitButton2 && scope.row.codeEntryStatus == 1 && scope.row.resultEnterStatus != 1">录入结果</el-button>
                <el-button type="text":style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"  @click="openDialog('4',scope.row)" v-if="btnAuth.fitButton3 && scope.row.result != null">查看</el-button>
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  :action="uploadUrl(1,scope.row.id)"
                  :before-upload="beforeAvatarUpload"
                  :on-success="handleAvatarSuccess1"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :show-file-list='false'
                  style="display: inline-block;"
                  accept='image/*'>
                  <el-button slot="trigger" :size="$store.state.style.assemblyModel" :style="{'font-size':$store.state.style.fontSize18}"  type="text" v-if="btnAuth.fitButton4 &&(scope.row.result == 1 ||scope.row.result == 2 || scope.row.result == 3)">上传图片</el-button>
                </el-upload>
              </template>
            </el-table-column>
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
          <!--新增-->
          <el-dialog
            title="新增FIT"
            :visible.sync="insertDialogVisible"
            @close="resetForm('addForm')"
            :width="$store.state.style.dialogWidth"
            center>
            <div style="margin: auto;width: 350px;">
              <el-form :model="addForm" :rules="addFormRule" ref="addForm" label-width="80px" class="demo-ruleForm">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="SID" :label-width="formLabelWidth" prop="sid" >
                      <el-input v-model="addForm.sid" auto-complete="off" class="filter-item" @blur="getInfo()"  :size="$store.state.style.assemblyModel"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                      <el-input v-model="addForm.name" auto-complete="off" class="filter-item"  disabled  :size="$store.state.style.assemblyModel"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="电话号码" :label-width="formLabelWidth" prop="phone">
                      <el-input v-model="addForm.phone" auto-complete="off" class="filter-item" disabled  :size="$store.state.style.assemblyModel"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="噗噗管ID" :label-width="formLabelWidth" prop="fitCode">
                      <el-input v-model="addForm.fitCode" auto-complete="off" class="filter-item"  :size="$store.state.style.assemblyModel"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="工作人员编码" :label-width="formLabelWidth" prop="releasePersonCode">
                      <el-input v-model="addForm.releasePersonCode" auto-complete="off" class="filter-item"  :size="$store.state.style.assemblyModel"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="发放日期" :label-width="formLabelWidth" prop="releaseDate">
                      <el-date-picker
                        v-model="addForm.releaseDate"
                        type="date"
                        :picker-options="pickerOptions1"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        class="filter-item"
                        :size="$store.state.style.assemblyModel"
                        style="width: 200px;"
                        placeholder="发放日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div style="text-align: center;">
                  <el-button type="primary" @click="submitForm('addForm')" :loading="loadingState">保存</el-button>
                  <el-button @click="resetForm('addForm','insertDialogVisible')">取消</el-button>
                </div>
              </el-form>
            </div>
          </el-dialog>
          <!--发送短信-->
          <el-dialog
            title="发送短信"
            :visible.sync="sendMessageDialogVisible"
            :width="$store.state.style.dialogWidth"
            @close="resetForm('sendMessageForm')"
            center>
            <div>
              <el-form :model="sendMessageForm" :rules="sendMessageFormRule" ref="sendMessageForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="短信内容"  prop="text">
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="sendMessageForm.text">
                  </el-input>
                </el-form-item>
                <el-form-item label="手机号码"  prop="phone">
                  <el-input v-model="sendMessageForm.phone" auto-complete="off" class="filter-item"  :size="$store.state.style.assemblyModel"></el-input>
                </el-form-item>
                <div class="send-button-group">
                  <el-button type="primary" @click="sendForm('sendMessageForm')" :loading="loadingState">保存</el-button>
                  <el-button @click="resetForm('sendMessageForm','sendMessageDialogVisible')">取消</el-button>
                </div>
              </el-form>
            </div>
          </el-dialog>
          <!--录入FIT编码-->
          <el-dialog
            title="录入FIT编码"
            :visible.sync="entryDialogVisible"
            :width="$store.state.style.dialogWidth"
            @close="resetForm('entryForm')"
            center>
            <div style="width: 350px;margin: auto;">
              <el-form :model="entryForm" :rules="entryFormRule" ref="entryForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                  <!--<el-col :span="24">-->
                    <!--<el-form-item label="工作人员编码" :label-width="formLabelWidth" prop="releasePersonCode">-->
                      <!--<el-input v-model="entryForm.releasePersonCode" auto-complete="off" class="filter-item"  :size="$store.state.style.assemblyModel"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</el-col>-->
                  <el-col :span="24">
                    <el-form-item label="发放日期" :label-width="formLabelWidth" prop="releaseDate">
                      <el-date-picker
                        v-model="entryForm.releaseDate"
                        type="date"
                        :picker-options="pickerOptions1"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        class="filter-item"
                        :size="$store.state.style.assemblyModel"
                        style="width: 200px;"
                        placeholder="发放日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="噗噗管ID" :label-width="formLabelWidth" prop="fitCode">
                      <el-input v-model="entryForm.fitCode" auto-complete="off" class="filter-item"  :size="$store.state.style.assemblyModel"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div class="form-button">
                    <el-button type="primary" @click="entryForms('entryForm')" :loading="loadingState">保存</el-button>
                    <el-button @click="resetForm('entryForm','entryDialogVisible')">取消</el-button>
                </div>

              </el-form>
            </div>
          </el-dialog>

          <!--录入结果-->
          <el-dialog
            title="录入FIT结果"
            :visible.sync="entryResultDialogVisible"
            :width="$store.state.style.dialogWidthLarge"
            @close="resetForm('entryResultForm')"
            center>
            <div>
              <el-form :model="entryResultForm" :rules="entryResultFormRule" ref="entryResultForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                  <el-form-item label="结果日期" :label-width="formLabelWidth" prop="resultDate">
                    <el-date-picker
                      v-model="entryResultForm.resultDate"
                      :disabled="showFITResult"
                      type="date"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                      placeholder="结果日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item  :label-width="formLabelWidth" prop="resultStatus">
                    <el-radio v-model="entryResultForm.resultStatus" label="1"  :disabled="showFITResult">有结果</el-radio>
                    <el-radio v-model="entryResultForm.resultStatus" label="2"  :disabled="showFITResult">无结果</el-radio>
                  </el-form-item>
                  <div v-if="entryResultForm.resultStatus==1">
                    <el-col :span="16">
                      <el-form-item label="上线" :label-width="formLabelWidth" prop="upLineValue">
                        <el-input v-model="entryResultForm.upLineValue" auto-complete="off" class="lineWidth" style="width:220px"  :disabled="showFITResult"></el-input>
                      </el-form-item>
                      <el-form-item label="下线" :label-width="formLabelWidth" style="margin-top:10px" prop="downLineValue">
                        <el-input v-model="entryResultForm.downLineValue" auto-complete="off" class="lineWidth" style="width:220px" :disabled="showFITResult"></el-input>
                      </el-form-item>

                      <el-form-item label="图片上传" :label-width="formLabelWidth"  style="margin-top:10px" >
                        <el-upload
                          class="upload-demo"
                          ref="upload"
                          :action="uploadUrl(2)"
                          :before-upload="beforeAvatarUpload"
                          :on-success="handleAvatarSuccess"
                          :on-preview="handlePreview"
                          :limit="1"
                          :on-remove="handleRemove"
                          accept='image/*'
                          :auto-upload="false">
                          <el-button slot="trigger" :size="$store.state.style.assemblyModel" type="primary">选取文件</el-button>
                          <el-button style="margin-left: 10px;" :size="$store.state.style.assemblyModel" type="success" @click="submitUpload">上传到服务器</el-button>
                        </el-upload>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" class="right">
                      <img :src="getUrl()" alt="" style="width: 180px;height: 240px;">
                    </el-col>
                  </div>
                  <el-form-item label="请说明原因" :label-width="formLabelWidth" v-if="entryResultForm.resultStatus==2">
                    <el-input v-model="entryResultForm.noResonResult"  :disabled="showFITResult" auto-complete="off" class="lineWidth"></el-input>
                  </el-form-item>
                </el-row>
                <el-form-item label="检测结果是否在10分钟内读取" label-width="240px" style="margin-top:10px" prop="inTenMin" v-if="entryResultForm.resultStatus==1">
                  <el-radio v-model="entryResultForm.inTenMin" label="1"  :disabled="showFITResult">是</el-radio>
                  <el-radio v-model="entryResultForm.inTenMin" label="2"  :disabled="showFITResult">否</el-radio>
                </el-form-item>
                <div style="text-align: center;" v-if="!showFITResult">
                  <el-button type="primary" @click="entryResultForms('entryResultForm')" :loading="loadingState">保存</el-button>
                  <el-button @click="resetForm('entryResultForm','entryResultDialogVisible')">取消</el-button>
                </div>
              </el-form>
            </div>
          </el-dialog>

          <!--查看结果-->
          <el-dialog
            title="查看FIT结果"
            :visible.sync="showResultDialogVisible"
            :width="$store.state.style.dialogWidth"
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
                  <el-col :span="8" v-if="showResultForm.result != 4">
                    <img :src="fitImage" alt="" style="width: 180px;height: 240px;cursor: pointer" @click="showImgDialogVisible = true">
                  </el-col>
                </el-row>
                <el-form-item label="无结果原因"  v-if="showResultForm.result==4">
                  {{showResultForm.noResonResult}}
                </el-form-item>
                <div style="text-align: center;">
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
          <!-- 录入Fit结果发送短信弹窗 -->
          <el-dialog
              width="30%"
              :close-on-click-modal="false"
              :visible.sync="inputResultPrompt"
              append-to-body>
              <div v-if="resultInfo==2" class="resultInfo">
                <p>FIT结果为阳性</p>
                <p>请及时为该受试者预约结肠镜检查</p>
              </div>
              <div v-if="resultInfo==1" class="resultInfo">
                <p>FIT结果为阴性</p>
                <p>该受试者一年后随访</p>
              </div>
              <div v-if="resultInfo==3" class="resultInfo">
                <p>FIT结果为无效</p>
                <p>请重新检测</p>
              </div>
              <div v-if="resultInfo==4" class="resultInfo">
                <p>无结果</p>
                <p>请重新检测</p>
              </div>
              <!--<p style="text-align:center;margin-top:5px;" v-if="group !='C'">-->
                <!--<el-checkbox v-model="checked" v-if="resultInfo==2 || resultInfo==1 || resultInfo==3"  class="submitDialog-item-check">短信发送受试者</el-checkbox>-->
              <!--</p>-->
              <!--<p style="text-align:center;margin-top:5px;" v-if="group =='C'">-->
                <!--<el-checkbox v-model="checked"  v-if="resultInfo == 2"  class="submitDialog-item-check">短信发送受试者</el-checkbox>-->
              <!--</p>-->
              <!--<el-form :model="sendMessageForm" :rules="sendMessageFormRule" ref="sendMessageForm" label-width="100px" class="demo-ruleForm" v-if="checked" style="margin-top: 20px;">-->
                <!--<el-form-item label="短信内容"  prop="message">-->
                  <!--<el-input-->
                    <!--type="textarea"-->
                    <!--:rows="4"-->
                    <!--disabled-->
                    <!--placeholder="请输入内容"-->
                    <!--v-model="sendMessageForm.message">-->
                  <!--</el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="手机号码"  prop="phone">-->
                  <!--<el-input v-model="sendMessageForm.phone" auto-complete="off" class="filter-item"  :size="$store.state.style.assemblyModel"></el-input>-->
                <!--</el-form-item>-->
              <!--</el-form>-->
              <div style="margin-top: 20px;text-align: center;">
                <el-button :size="$store.state.style.assemblyModel" @click="closeInputResultDialog('sendMessageForm')" class="dialog-footer">确 定</el-button>
              </div>

            </el-dialog>
        </div>
        <router-view></router-view>
      </div>
</template>

<script>
  let loading;
  export default {
    name: 'Right',
    data () {
      var validateFitCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('噗噗管ID不能为空'));
        } else if (!(/^[A-Za-z0-9]{8}$/.test(value))) {
          callback(new Error('请输入8位数字或字母'));
        } else {
          callback();
        }
      };
      var validateLineValue = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('不能为空'));
        } else if (!(/\d/.test(value))) {
          callback(new Error('只能是数字'))
        } else if (!(/^[1-9]{1}$/.test(value))) {
          callback(new Error('数字范围1-9'));
        } else {
          callback();
        }
      };
      return {

        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        fitImage:'',
        //权限判定
        FIT_page: false,
        btnAuth: {
          fitButton1:false,//fit录入编码
          fitButton2:false,//fit录入结果
          fitButton3:false,//fit查看结果
          fitButton4:false,//fit上传图片
          fitButton5:false,//fit新增
          fitButton6:false,//发送短信
        },
        group:'',
        fileList:[],
        //图片查看弹窗状态
        showImgDialogVisible:false,
        //弹窗状态
        showResultDialogVisible:false,
        //新增弹窗
        insertDialogVisible:false,
        //录入编码弹窗
        entryDialogVisible:false,
        //录入fit结果弹窗
        entryResultDialogVisible:false,
        //查看fit结果
        showFITResult:false,
        //录入结果返回弹窗
        inputResultPrompt:false,
        //发送短信弹窗
        sendMessageDialogVisible:false,
        // FIT结果字段

        resultInfo:'',
        checked:false,
        areaFlag: '',
        //按钮状态
        loadingState:false,
        showResultForm:{},
        //下载链接
        downloadUrl:'',
        props: {
          value: 'id',
          children: 'children',
          label: 'deptName'
        },
        ids: [],
        //查询条件
        "qc": {
          "deptid":'',
          "userName": null,
          "phone": null,
          "sid": null,
          "groupName": null,
          "codeEntryStatus":null,
          "insertStatus":null,
          "pathUrl":'',
          "result":null,
          "pageNum":1,
          "pageSize":10,
        },
        //查询结果
        "queryResult": {
          "pageNum": 1,//当前页
          "pageSize": 10,//每页的条数
          "pages":0,
          "total":0,
          "tableData": []
        },
        formLabelWidth: '120px',
        //新增fit表单数据
        addForm:{
          'sid':'',
          'phone':'',
          'name':'',
          "fitCode":'',
          "releasePersonCode":'',
          "releaseDate":''
        },
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
        //新增fit验证规则
        addFormRule: {
          sid:{required: true, message: '必填', trigger: 'blur'},
          name:{required: true, message: '必填', trigger: 'change'},
          phone:{required: true, message: '必填', trigger: 'change'},
          fitCode:[
            {required:true,message:'必填',trigger:'blur'},
            {validator: validateFitCode, trigger: 'blur'}
          ],
          releasePersonCode:{required: true, message: '必填', trigger: 'blur'},
          releaseDate:{required: true, message: '必填', trigger: 'blur'},
        },
        //录入编码表单数据
        entryForm:{
          "fitCode":'',
          "releasePersonCode":'',
          "releaseDate":''
        },
        //录入编码验证规则
        entryFormRule: {
          fitCode:[
            {required:true,message:'必填',trigger:'blur'},
            {validator: validateFitCode, trigger: 'blur'}
          ],
          releasePersonCode:{required: true, message: '必填', trigger: 'blur'},
          releaseDate:{required: true, message: '必填', trigger: 'blur'},
        },
        //录入fit结果表单
        entryResultForm:{
          "resultDate":'',
          'upLineValue':null,
          'downLineValue':null,
          'noResonResult':'',
          'resultStatus':'',
          'inTenMin':'',
          'pathUrl':'',
        },
        //录入fit结果验证规则
        entryResultFormRule:{
          upLineValue:[
            {required:true,message:'必填',trigger:'blur'},
            {validator: validateLineValue, trigger: 'blur'}
          ],
          downLineValue:[
            {required:true,message:'必填',trigger:'blur'},
            {validator: validateLineValue, trigger: 'blur'}
          ],
          resultDate:[
            {required:true,message:'必填',trigger:'blur'},
          ],
          desc:[
            {required:true,message:'请输入角色描述信息',trigger:'blur'},
            {min:1,max:32,message:'长度在1到32个字符',trigger:'blur'}
          ],
          resultStatus:[
            {required:true,message:'必选',trigger:'change'},
          ],
          inTenMin:[
            {required:true,message:'必选',trigger:'change'},
          ]
        },
      }
    },
    mounted(){
      this.$store.commit('LOGOUT_USER');
      let obj = this.checkPageAuth(this, "FIT_page", this.btnAuth);
      if(this.$route.query.type &&this.$route.query.type == 1){
        this.qc.codeEntryStatus = '2'
      }
      this.query()
    },
    methods: {
      getUrl(){
        if(this.fileList.length == 0){
          return ''
        }else {
          return `${SERVER_NAME}/ct/find/image/path?id=${this.entryResultForm.pathUrl}`
        }
      },
      //获取选中区
      getQcId(value){
        this.qc.deptid = value[value.length-1]
      },
      handleAvatarSuccess(res, file,fileList) {
        loading.close();
        this.$message({
          message: '图片上传成功',
          type: 'success'
        });
        this.entryResultForm.pathUrl = res.result
        this.fileList = fileList
      },
      handleAvatarSuccess1(res, file,fileList) {
        loading.close();
        this.$message({
          message: '图片上传成功',
          type: 'success'
        });
        this.query()
      },
      beforeAvatarUpload(file){
          console.log(file)
        const isLt2M = file.size / 1024 / 1024 < 100
        if(!isLt2M) {
          this.$message({
            message: '上传文件大小不能超过 100MB!',
            type: 'warning'
          });
          return false;
        }else{
          loading = this.$loading({
            lock: true,
            text: '图片拼命上传中...',
            spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 0.5)'
          });
        }
      },
      // 上传
      uploadUrl(count,id){
          if(count == 1){
            return SERVER_NAME+"/fit/fileUploadById?id="+id
          }else {
            return SERVER_NAME+"/fit/fileUpload"
          }
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
          console.log(file,fileList)
        this.del(file.response.result)
      },
      del(id){
        $axios_http({
          url: '/ct/delete/image/record',
          data: {
            id:id
          },
          vueObj: this
        }).then((res) => {
          $successMsg(this, '删除成功')
        })
      },
      handlePreview(file) {
        console.log(file);
      },
      //打开弹窗
      openDialog(count,row){
          if(count==1){
            this.insertDialogVisible = true
          }else if(count==2){
            this.entryDialogVisible = true
            this.entryForm.id = row.id
          }else if(count==3){
            this.entryResultDialogVisible = true
            this.showFITResult = false
            this.entryResultForm.id = row.id
            this.group = row.groupName
          } else if(count==4){
            this.showResultDialogVisible = true
            this.showFITData(row)
          }

      },
      //通过sid获取用户信息
      getInfo(){
        if (this.addForm.sid){
            $axios_http({
              url: '/fit/personInfo',
              data:{
                sid:this.addForm.sid
            },
            vueObj: this
          }).then((res) => {
            this.addForm.name = res.data.result.userName
            this.addForm.phone = res.data.result.phone
          })
        }
      },

      //查询
      query(){
        $axios_http({
          url: "/fit/result/query",
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
      //查看fit结果
      showFITData(row){
        $axios_http({
          url: "/fit/result/getFItResult",
          data:{
              id:row.id
          },
          vueObj: this
        }).then((res) => {
          this.showResultForm = res.data.result
          if(res.data.result.pathUrl){
            this.fitImage = `${SERVER_NAME}/ct/find/image/path?id=${res.data.result.pathUrl}`
          }else {
            this.fitImage = ''
          }
        })
      },
      //表单提交
      entryResultForms(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $axios_http({
              url: "/fit/result/add",
              data: this.entryResultForm,
              vueObj: this
            }).then((res) => {
              console.log('录入成功')
              console.log(res.data)
              $successMsg(this,'录入成功')
              this.entryResultDialogVisible = false
              this.inputResultPrompt=true
              this.resultInfo=res.data.result.result
              if(this.group != 'C'){
                  if(this.resultInfo == 2 || this.resultInfo == 3 || this.resultInfo == 1){
                      this.checked = true
                  }else {
                      this.checked = false
                  }
              }else if(this.group == 'C'){
                  if(this.resultInfo == 2){
                      this.checked = true
                  }else {
                      this.checked = false
                  }
              }
//              if(this.checked){
//                $axios_http({
//                  url: "/system/messagetemplate?type=FIT&businessId="+this.entryResultForm.id,
//                  data: {
//                  },
//                  vueObj: this
//                }).then((res) => {
//                  this.sendMessageForm.message = res.data.result.message
//                  this.sendMessageForm.phone = res.data.result.phone
//                })
//              }
              this.query()
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //发送短信
      sendForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $axios_http({
              url: "/fit/result/add",
              data: this.entryResultForm,
              vueObj: this
            }).then((res) => {
              $successMsg(this,'发送成功')
              this.query()
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //表单提交
      entryForms(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $axios_http({
              url: "/fit/result/code/entry",
              data: this.entryForm,
              vueObj: this
            }).then((res) => {
              $successMsg(this,'录入成功')
              this.entryDialogVisible = false
              this.query()
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //表单提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $axios_http({
              url: "/fit/result/addFit",
              data: this.addForm,
              vueObj: this
            }).then((res) => {
              $successMsg(this,'新增成功')
              this.insertDialogVisible = false
              this.query()
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      closeInputResultDialog(formName){
//        if(this.checked){
//          this.$refs[formName].validate((valid) => {
//            if (valid) {
//              $axios_http({
//                url: "/fit/sendMessage",
//                data: {
//                  id: this.entryResultForm.id,
//                  phone:this.sendMessageForm.phone,
//                },
//                vueObj: this
//              }).then((res) => {
//                setTimeout(()=>{
//                  $successMsg(this, "发送成功")
//                },500)
//                Object.assign(this.$data.entryResultForm, this.$options.data().entryResultForm);
//                this.inputResultPrompt = false;
//                this.checked = false;
//                this.query()
//              })
//            } else {
//              console.log('error submit!!');
//              return false;
//            }
//          });
//          // 后台返回结果失败时 => 关闭弹框
//          this.inputResultPrompt = false;
//        }else {
//          Object.assign(this.$data.entryResultForm, this.$options.data().entryResultForm);
//          this.inputResultPrompt = false;
//          this.checked = false;
//        }
        this.inputResultPrompt = false;
      },
      //表单重置
      resetForm(formName,dialog) {
        this.$refs[formName].resetFields();
        this[dialog] = false
        this.fileList = []
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
  .resultInfo{
    text-align: center;
    line-height: 30px;
    font-size: 18px;
    font-weight: 500;
  }
  .right img{
    width: 100%;
    position:absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .send-button-group{
    text-align: center;
  }
</style>
<style>
  .form-button {
    text-align: center;
  }

</style>
