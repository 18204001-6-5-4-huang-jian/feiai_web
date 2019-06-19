<template>
  <div slot="right" class="content-page" v-if="abnormal_page">
    <div class="filter-container content-search">
      <el-button size="mini" class="return-home" @click="goBack()">返 回</el-button>
      <el-form :model="qc" :inline=true>
        <el-input style="width: 200px;" size="small" clearable class="filter-item" placeholder="姓名"
                  v-model.trim="qc.userName">
        </el-input>
        <el-input style="width: 200px;margin-left: 10px;" clearable size="small" class="filter-item" placeholder="SID"
                  v-model.trim="qc.sid">
        </el-input>
        <el-input style="width: 200px;margin-left: 10px;" clearable size="small" class="filter-item" placeholder="手机号"
                  v-model.trim="qc.phone">
        </el-input>
        <el-select v-model="qc.groupName" clearable placeholder="请选择分组方案" size="small" class="filter-item"
                   style="width: 200px;margin-left: 10px;">
          <el-option :value="item.value" :key="item.key" :label="item.label"
                     v-for="item in $store.state.groups"></el-option>
        </el-select>
        <el-select v-model="qc.abnormalType" clearable placeholder="异常类型" size="small" class="filter-item"
                   style="width: 200px;margin-left: 10px;">
          <el-option :value="item.value" :key="item.key" :label="item.label"
                     v-for="item in $store.state.abnormalType"></el-option>
        </el-select>
        <el-select v-model="qc.overallStatusCy" clearable placeholder="总体状态" size="small" class="filter-item"
                   style="width: 200px;margin-left: 10px;">
          <el-option :value="item.value" :key="item.key" :label="item.label"
                     v-for="item in $store.state.overallStatusCy"></el-option>
        </el-select>
        <div class="clear">
          <!--<el-cascader-->
          <!--v-if="$store.state.hospitalType==1"-->
          <!--style="float: left;width: 200px;margin-right: 15px;"-->
          <!--:options="$store.state.regionOptions"-->
          <!--placeholder="所属地区"-->
          <!--:props="props"-->
          <!--v-model="ids"-->
          <!--size="small"-->
          <!--:show-all-levels="false"-->
          <!--change-on-select-->
          <!--@change="getQcId"-->
          <!--&gt;</el-cascader>-->
          <!--<el-cascader-->
          <!--v-if="$store.state.hospitalType==1"-->
          <!--style="float: left;width: 200px;margin-right: 15px;"-->
          <!--:options="$store.state.regionOptions"-->
          <!--placeholder="所属区"-->
          <!--:props="props"-->
          <!--v-model="ids"-->
          <!--size="small"-->
          <!--:show-all-levels="false"-->
          <!--change-on-select-->
          <!--@change="getQcIdArea"-->
          <!--&gt;</el-cascader>-->
          <!--<el-cascader-->
          <!--v-if="$store.state.hospitalType==1"-->
          <!--style="float: left;width: 200px;margin-right: 15px;"-->
          <!--:options="$store.state.regionOptions"-->
          <!--placeholder="所属社区"-->
          <!--:props="props"-->
          <!--v-model="ids"-->
          <!--size="small"-->
          <!--:show-all-levels="false"-->
          <!--change-on-select-->
          <!--@change="getQcIdcommunity"-->
          <!--&gt;</el-cascader>-->
        </div>
        <div style="margin-top: 10px;">
          <el-button size="small" type="primary" icon="el-icon-search" @click="query" v-if="btnAuth.abnormal_query_btn">
            查询
          </el-button>
          <el-button type="primary" size="small" icon="el-icon-close" @click="reset" v-if="btnAuth.abnormal_query_btn">
            重置
          </el-button>
        </div>
      </el-form>
    </div>

    <div class="content-page-table">
      <div class="table-btn-group">
        <router-link to="/abnormal/abnormal">
          <el-button size="small" type="primary" icon="el-icon-plus">新增</el-button>
        </router-link>
      </div>
      <!--数据列表-->
      <el-table
        :data="queryResult.tableData"
        border
        stripe
        :default-sort="{prop: 'inGroupDate', order: 'descending'}"
        style="width: 100%;">
        <el-table-column
          prop="sid"
          label="SID"
          width="80">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
        >
        </el-table-column>
        <el-table-column
          prop="communityName"
          label="所属社区"
          width="120"
          v-if="$store.state.hospitalType == 3 || $store.state.hospitalType == 1"
        >
        </el-table-column>
        <el-table-column
          prop="areaName"
          label="所属地区"
          width="120"
          v-if="$store.state.hospitalType == 1"
        >
        </el-table-column>
        <el-table-column
          label="分组方案"
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
          label="异常类型"
        >
          <template slot-scope="scope">
            <span>{{scope.row.abnormalType | abnormalType}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="记录日期"
        >
          <template slot-scope="scope">
            <span>{{scope.row.aTime | entryTime}}</span>
          </template>
        </el-table-column>
        <!--
        <el-table-column
          prop="commdeptName"
          label="所属区"
        >
        </el-table-column>
        <el-table-column
          prop="nickName"
          label="所属社区"
        >
        </el-table-column> -->

        <el-table-column
          label="操作"
          width="200px"
        >
          <template slot-scope="scope">
            <router-link to="/abnormal/abnormalForm">
              <el-button type="text" size="small" @click="openDialog">查看</el-button>
            </router-link>
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
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Right',
    data () {
      return {
        //权限判定
        abnormal_page: false,
        btnAuth: {
          abnormal_query_btn: true,
        },
        //弹窗状态
        centerDialogVisible: false,
        areaFlag: '',
        //按钮状态
        loadingState: false,
        //下载链接
        downloadUrl: '',
        //查询条件
        "qc": {
          "name": null,
          "phone": null,
          "sid": null,
          "group": null,
          "abnormalType": null,
          "overallStatusCy": null,
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
      let obj = this.checkPageAuth(this, "abnormal_page", this.btnAuth);
      this.query()
    },
    methods: {

      //打开弹窗
      openDialog(){
        this.centerDialogVisible = true
      },

      //查询
      query(){
        $axios_http({
          url: "/abnormalRecordRestful/abnormal/list/getErrorList",
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
            alert('submit!');
          } else {
            console.log('error submit!!');
            this.loadingState = false
            return false;
          }
        });
      },

      //表单重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.centerDialogVisible = false
      },

      //重置检索条件
      reset(){
        Object.assign(this.$data.qc, this.$options.data().qc)
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
  .clear {
    zoom: 1
  }

  .clear:after {
    display: block;
    clear: both;
    content: "";
  }
</style>
