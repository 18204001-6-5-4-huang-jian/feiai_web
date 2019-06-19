<template>
  <div slot="right" class="content-page" v-if="follow_page">
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
          v-if="$store.state.hospitalType != 5"
          style="position: relative;top: -5px;margin-right: 10px;width: 200px;"
          :options="$store.state.regionOptions"
          placeholder="所属社区"
          :props="props"
          clearable
          v-model="ids"
          :size="$store.state.style.assemblyModel"
          filterable
          change-on-select
          @change="getQcId"
        ></el-cascader>
        <el-select v-model="qc.groupName" clearable placeholder="请选择分组方案" :size="$store.state.style.assemblyModel" class="filter-item" style="width: 200px;margin-left: 10px;">
          <el-option :value="item.value" :key="item.key" :label="item.label" v-for="item in $store.state.groups"></el-option>
        </el-select>
        <el-select v-model="qc.overallStatusCy" clearable placeholder="总体状态" :size="$store.state.style.assemblyModel" class="filter-item" style="width: 200px;margin-left: 10px;">
          <el-option :value="item.value" :key="item.key" :label="item.label" v-for="item in $store.state.overallStatusCy"></el-option>
        </el-select>
        <el-select v-model="qc.followType" clearable placeholder="随访来源" :size="$store.state.style.assemblyModel" class="filter-item" style="width: 200px;margin-left: 10px;">
          <el-option :value="item.value" :key="item.key" :label="item.label" v-for="item in $store.state.followResuce"></el-option>
        </el-select>
        <el-select v-model="qc.followStatus" clearable placeholder="随访状态" :size="$store.state.style.assemblyModel" class="filter-item" style="width: 200px;margin-left: 10px;">
          <el-option :value="item.value" :key="item.key" :label="item.label" v-for="item in $store.state.followStatus"></el-option>

        </el-select>
        <el-select v-model="qc.followResult" clearable placeholder="随访结果" :size="$store.state.style.assemblyModel" class="filter-item" style="width: 200px;margin-left: 10px;">
          <el-option :value="item.value" :key="item.key" :label="item.label" v-for="item in $store.state.followResult"></el-option>
        </el-select>
        <el-date-picker
          v-model="qc.startTime"
          type="date"
          clearable
          :size="$store.state.style.assemblyModel"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          style="width: 200px;"
          placeholder="计划随访开始日期"
          class="filter-item">
        </el-date-picker>
        <el-date-picker
          clearable
          v-model="qc.endTime"
          type="date"
          :size="$store.state.style.assemblyModel"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          style="width: 200px;"
          placeholder="计划随访结束日期"
          class="filter-item">
        </el-date-picker>
        <div>
          <el-button :size="$store.state.style.assemblyModel" type="primary" icon="el-icon-search"  @click="query()">查询</el-button>
          <el-button type="primary" :size="$store.state.style.assemblyModel" icon="el-icon-close" @click="reset()">重置</el-button>
        </div>
      </el-form>
    </div>

    <div class="content-page-table">
      <div class="table-btn-group">
        <el-button :size="$store.state.style.assemblyModel" type="primary" icon="el-icon-plus" @click="openDialog">新增</el-button>
      </div>
      <!--数据列表-->
      <el-table
        :data="queryResult.tableData"
        border
        stripe
        :default-sort="{prop: 'inGroupDate', order: 'descending'}"
        :style="{'font-size':$store.state.style.fontSize18}">
        <el-table-column
          prop="sid"
          label="SID">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="姓名">
        </el-table-column>
        <el-table-column
          label="性别"
          width="60"
        >
          <template slot-scope="scope">
            <span>{{scope.row.sex | sex}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          width="60"
        >
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="communityName"
          label="所属社区"
        >
        </el-table-column>
        <el-table-column
          label="分组"
          width="70"
        >
          <template slot-scope="scope">
            <span>{{scope.row.groupName | group}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="入组日期"
        >
        <template slot-scope="scope">
            <span>{{scope.row.entryTime | entryTime}}</span>
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
          label="随访来源"
        >
          <template slot-scope="scope">
            <span>{{scope.row.followType | followResuce}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="计划随访时间"
          width="120"
        >
          <template slot-scope="scope">
            <span>{{scope.row.followDate | entryTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="随访状态"
        >
          <template slot-scope="scope">
            <span>{{scope.row.followStatus | followStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="随访结果"
        >
          <template slot-scope="scope">
            <span>{{scope.row.overallStatusCy | overallStatusCy}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope" style="cursor: pointer!important;">
            <el-upload
              class="upload-demo"
              ref="upload"
               multiple
              :action="uploadUrl(1,scope.row.id)"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess1"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :show-file-list='false'
              style="display: inline-block;"
              accept='image/*'>
              <el-button slot="trigger" :size="$store.state.style.assemblyModel" :style="{'font-size':$store.state.style.fontSize18}"  type="text" v-if="btnAuth.followButton1">上传图片</el-button>
            </el-upload>
            <router-link :to="{path:'/follow/followDetail',query:{id:scope.row.id}}">
              <el-button type="text":style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"  v-if="btnAuth.followButton2">查看</el-button>
            </router-link>

          </template>
        </el-table-column>
      </el-table>
      <!--分页栏-->
      <el-row>
        <el-col :span="10">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="14">
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
      <el-dialog
        title="新增随诊"
        :visible.sync="addFollowDialog"
        :width="$store.state.style.dialogWidth"
        @close="resetForm('ruleForm')"
        center>
        <div style="width: 350px;margin: auto;">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm">
            <el-row>
              <el-col :span="24">
                <el-form-item label="SID：" prop="sid" label-width="100px">
                  <el-input v-model="ruleForm.sid" class="filter-item" :size="$store.state.style.assemblyModel" @change="getInfo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="姓名：" prop="name" label-width="100px">
                  <el-input v-model="ruleForm.name" class="filter-item" :size="$store.state.style.assemblyModel"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="随诊来源：" prop="fllowType" label-width="100px">
                  <el-select v-model="ruleForm.followType" placeholder="请选择随诊来源" :size="$store.state.style.assemblyModel" class="filter-item">
                    <el-option label="肠癌随诊" value="1"></el-option>
                    <el-option label="肺癌随诊" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <div style="text-align: center;">
              <el-button type="primary" @click="submitForm('ruleForm')" :loading="loadingState">保存</el-button>
              <el-button @click="resetForm('ruleForm')">取消</el-button>
            </div>
          </el-form>
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
      return {
        //权限判定
        follow_page: false,
        btnAuth: {
          followButton1: false,
          followButton2: false,
        },
        //弹窗状态
        addFollowDialog:false,
        areaFlag: '',
        //按钮状态
        loadingState:false,
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
          "depts":'',
          "pageNum":"1",
          "pageSize":"10",
          "sid":null,
          "userName":null,
          "phone":null,
          "groupName":null,
          "overallStatusCy":null,
          "followType":null,
          "followStatus":null,
          "startTime":null,
          "endTime":null
          }
        ,
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
          sid:'',
          name: '',
          followType: ''
        },
        //图片
        fileList:[],

        //表单验证规则
        rules: {
          name: [
            { required: true, message: '必填', trigger: 'blur' },
          ],
          sid: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          followType: [
            { required: true, message: '必填', trigger: 'change' }
          ]
        }
      }
    },
    mounted(){
      this.$store.commit('LOGOUT_USER');
      let obj = this.checkPageAuth(this, "follow_page", this.btnAuth);
      if( this.$route.query.type &&this.$route.query.type == 1){
        this.qc.followStatus = '2'
      }
      this.query()
    },
    methods: {
      //获取选中区
      getQcId(value){
        this.qc.depts = value[value.length-1]
      },
      //通过sid获取用户信息
      getInfo(){
        if (this.ruleForm.sid){
          $axios_http({
            url: '/fit/personInfo',
            data:{
              sid:this.ruleForm.sid
            },
            vueObj: this
          }).then((res) => {
            this.ruleForm.name = res.data.result.userName
          })
        }
      },
      //打开弹窗
      openDialog(){
        this.addFollowDialog = true
      },

      //查询
      query(){
        $axios_http({
          url: "/followRecordRestful/follow/getFollowRecordList",
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

      //表单提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loadingState = true
            $axios_http({
              url: "/followRecordRestful/follow/saveHosBookingInfoPO",
              data: {
                       sid:this.ruleForm.sid,
                followType:this.ruleForm.followType
              },
              vueObj: this
            }).then((res) => {
              this.loadingState = false
              this.addFollowDialog = false
              this.query()
            })
          } else {
            this.loadingState = false
            return false;
    }
  });
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
          return SERVER_NAME+"/followRecordRestful/follow/image/upload?id="+id
        }else {
          return SERVER_NAME+"/followRecordRestful/follow/image/upload"
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
  //表单重置
  resetForm(formName) {
    this.$refs[formName].resetFields();
    this.addFollowDialog = false
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
  .bBox input{
    width: 80px;
    height:30px;
    line-height:30px;
    position: absolute;
    opacity: 0;
    top:10px;
    left:10px;
    cursor: pointer!important;
    z-index: 1;
    padding:10px;
  }
</style>
