<template>
  <div slot="right" class="content-page" v-if="yearFollow_page">
    <div class="filter-container content-search">
      <el-button size="mini" class="return-home" @click="goBack()">返 回</el-button>
      <el-form :model="qc" :inline=true>
        <el-input style="width: 200px;" size="small" clearable class="filter-item" placeholder="姓名"
                  v-model.trim="qc.name">
        </el-input>
        <el-input style="width: 200px;margin-left: 10px;" clearable size="small" class="filter-item" placeholder="SID"
                  v-model.trim="qc.sid">
        </el-input>
        <el-input style="width: 200px;margin-left: 10px;" clearable size="small" class="filter-item" placeholder="手机号"
                  v-model.trim="qc.phone">
        </el-input>
        <el-cascader
          v-if="$store.state.hospitalType != 1"
          style="position: relative;top: -5px;margin-right: 10px;width: 200px;"
          :options="$store.state.regionOptions"
          placeholder="所属社区"
          :props="props"
          v-model="ids"
          size="small"
          filterable
          change-on-select
          @change="getQcId"
        ></el-cascader>
        <el-select v-model="qc.group" clearable placeholder="请选择分组方案" size="small" class="filter-item"
                   style="width: 200px;margin-left: 10px;">
          <el-option :value="item.value" :key="item.key" :label="item.label"
                     v-for="item in $store.state.groups"></el-option>
        </el-select>
        <el-select v-model="qc.overallStatusCy" clearable placeholder="总体状态" size="small" class="filter-item"
                   style="width: 200px;margin-left: 10px;">
          <el-option :value="item.value" :key="item.key" :label="item.label"
                     v-for="item in $store.state.overallStatusCy"></el-option>
        </el-select>
        <el-select v-model="qc.group" clearable placeholder="随访来源" size="small" class="filter-item"
                   style="width: 200px;margin-left: 10px;">
          <el-option :value="item.value" :key="item.key" :label="item.label"
                     v-for="item in $store.state.followResuce"></el-option>
        </el-select>
        <el-select v-model="qc.group" clearable placeholder="随访状态" size="small" class="filter-item"
                   style="width: 200px;margin-left: 10px;">
          <el-option :value="item.value" :key="item.key" :label="item.label"
                     v-for="item in $store.state.followStatus"></el-option>

        </el-select>
        <el-select v-model="qc.group" clearable placeholder="随访结果" size="small" class="filter-item"
                   style="width: 200px;margin-left: 10px;">
          <el-option :value="item.value" :key="item.key" :label="item.label"
                     v-for="item in $store.state.followResult"></el-option>
        </el-select>
        <el-date-picker
          v-model="qc.inGroupDateStart"
          type="date"
          clearable
          size="small"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          style="width: 200px;"
          placeholder="计划随访开始日期"
          class="filter-item">
        </el-date-picker>
        <el-date-picker
          clearable
          v-model="qc.inGroupDateEnd"
          type="date"
          size="small"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          style="width: 200px;"
          placeholder="计划随访结束日期"
          class="filter-item">
        </el-date-picker>
        <div>
          <el-button size="small" type="primary" icon="el-icon-search" v-if="btnAuth.list_query_btn" @click="query()">查询</el-button>
          <el-button type="primary" size="small" icon="el-icon-close" v-if="btnAuth.list_query_btn" @click="reset()">重置</el-button>
        </div>
      </el-form>
    </div>

    <div class="content-page-table">
      <div class="table-btn-group">
        <el-button size="small" type="primary" icon="el-icon-plus" @click="openDialog">新增</el-button>
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
          prop="name"
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
          prop="cellPhone"
          label="手机号"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="commdeptName"
          label="所属社区"
        >
        </el-table-column>
        <el-table-column
          label="分组"
          width="70"
        >
          <template slot-scope="scope">
            <span>{{scope.row.group | group}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="cellPhone"
          label="入组日期"
        >
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
            <span>{{scope.row.overallStatusCy | overallStatusCy}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="计划随访时间"
          width="120"
        >
          <template slot-scope="scope">
            <span>{{scope.row.overallStatusCy | overallStatusCy}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="随访状态"
        >
          <template slot-scope="scope">
            <span>{{scope.row.overallStatusCy | overallStatusCy}}</span>
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
          <template slot-scope="scope">
            <router-link to="/follow/followDetail">
              <el-button type="text" size="small" @click="openDialog" v-if="scope.row.status == 1">随访</el-button>
            </router-link>
            <router-link to="/follow/followDetail">
              <el-button type="text" size="small" @click="openDialog" v-if="scope.row.status == 2">查看</el-button>
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
                :current-page="queryResult.pageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="queryResult.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                v-bind:total="queryResult.totalRowCount">
              </el-pagination>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-dialog
        title="新增随访"
        :visible.sync="addFollowDialog"
        width="30%"
        @close="resetForm('ruleForm')"
        center>
        <div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-row>
              <el-col :span="24">
                <el-form-item label="SID：" prop="sid" label-width="100px">
                  <el-input v-model="ruleForm.sid" class="filter-item" size="small"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="姓名：" prop="name" label-width="100px">
                  <el-input v-model="ruleForm.name" class="filter-item" size="small"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="随诊来源：" prop="resource" label-width="100px">
                  <el-select v-model="ruleForm.resource" placeholder="请选择随诊来源" size="small" class="filter-item">
                    <el-option label="肠癌随诊" value="1"></el-option>
                    <el-option label="肺癌随诊" value="2"></el-option>
                  </el-select>
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
        yearFollow_page: false,
        btnAuth: {
          list_query_btn: true,
        },
        //弹窗状态
        addFollowDialog: false,
        areaFlag: '',
        //按钮状态
        loadingState: false,
        //下载链接
        downloadUrl: '',
        props: {
          value: 'id',
          children: 'children',
          label: 'deptName'
        },
        ids: [],
        //查询条件
        "qc": {
          "depts":'',
          "name": null,
          "phone": null,
          "sid": null,
          "group": null,
          "pageNo": 1,
          "pageSize": 10,
        },
        //查询结果
        "queryResult": {
          "pageNo": 1,//当前页
          "pageSize": 10,//每页的条数
          "totalPageCount": 0,
          "tableData": [
            {
              sid: '123',
              name: '中华',
              status: '1'
            },

          ]
        },
        //分页
        "queryResultSource": {
          "pageNoSource": 1,//当前页
          "pageSizeSource": 15,//每页的条数
          "totalPageCount": 0
        },
        formLabelWidth: '180px',
        //表单数据
        ruleForm: {
          sid: '',
          name: '',
          resource: ''
        },

        //表单验证规则
        rules: {
          name: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          sid: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          resource: [
            {required: true, message: '必填', trigger: 'change'}
          ]
        }
      }
    },
    mounted(){
      this.$store.commit('LOGOUT_USER');
      let obj = this.checkPageAuth(this, "yearFollow_page", this.btnAuth);
    },
    methods: {
      //获取选中区
      getQcId(value){
        this.qc.depts = value[value.length-1]
      },
      //打开弹窗
      openDialog(){
        this.addFollowDialog = true
      },

      //查询
      query(){
        $axios_http({
          url: "/base/hospital/type/detail/notListDetailById",
          data: this.qc,
          vueObj: this
        }).then((res) => {
          this.queryResult.tableData = res.data.data;
          this.queryResult.totalPageCount = res.data.pageInfo.totalPageCount//获取总共多少页
          this.queryResult.totalRowCount = res.data.pageInfo.totalRowCount//获取总共条数
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
        console.log(`每页 ${pageSize} 条`)
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.qc.pageNo = currentPage
        console.log(`当前页: ${currentPage}`);
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
