<template>
  <div slot="right" class="content-page" v-if="home_page">
    <div class="filter-container content-search">
      <el-button size="mini" class="return-home" @click="goBack()">返 回</el-button>
      <el-form :model="qc" :inline=true>
        <el-input style="width: 200px;" size="small" clearable class="filter-item" placeholder="姓名"
                  v-model.trim="qc.name">
        </el-input>
        <el-input style="width: 200px;" clearable size="small" class="filter-item" placeholder="SID"
                  v-model.trim="qc.sid">
        </el-input>
        <el-input style="width: 200px;" clearable size="small" class="filter-item" placeholder="手机号"
                  v-model.trim="qc.phone">
        </el-input>
        <el-select v-model="qc.sex" clearable placeholder="性别" size="small" class="filter-item" style="width: 200px;">
          <el-option :value="item.value" :key="item.key" :label="item.label"
                     v-for="item in $store.state.sex"></el-option>
        </el-select>
        <el-select v-model="qc.group" clearable placeholder="请选择分组方案" size="small" class="filter-item"
                   style="width: 200px;">
          <el-option :value="item.value" :key="item.key" :label="item.label"
                     v-for="item in $store.state.groups"></el-option>
        </el-select>
        <el-date-picker
          v-model="qc.inGroupDateStart"
          type="date"
          clearable
          size="small"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          placeholder="入组日期"
          class="filter-item">
        </el-date-picker>
        <el-date-picker
          clearable
          v-model="qc.inGroupDateEnd"
          type="date"
          size="small"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          placeholder="结束日期"
          class="filter-item">
        </el-date-picker>
        <el-select v-model="qc.overallStatusCy" clearable placeholder="总体状态" size="small" class="filter-item">
          <el-option :value="item.value" :key="item.key" :label="item.label"
                     v-for="item in $store.state.overallStatusCy"></el-option>

        </el-select>
        <div>
          <el-button size="small" type="primary" icon="el-icon-search" @click="query" v-if="btnAuth.list_query_btn">查询
          </el-button>
          <el-button type="primary" size="small" icon="el-icon-close" @click="reset" v-if="btnAuth.list_query_btn">重置
          </el-button>
        </div>
      </el-form>
    </div>

    <div class="content-page-table">
      <div class="table-btn-group">
        <!--<el-button size="small" type="primary" icon="el-icon-document">-->
          <!--<a :href="downloadUrl">导出EXCEL</a>-->
        <!--</el-button>-->
        <!--<el-button class="filter-item" type="primary" size="small" icon="el-icon-close">退出研究</el-button>-->
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
        >
          <template slot-scope="scope">
            <span>{{scope.row.sex | reverseSex}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
        >
        </el-table-column>
        <el-table-column
          prop="cellPhone"
          label="手机号"
        >
        </el-table-column>
        <el-table-column
          prop="commdeptName"
          label="所属区"
        >
        </el-table-column>
        <el-table-column
          prop="nickName"
          label="所属社区"
        >
        </el-table-column>
        <el-table-column
          label="分组"
        >
          <template slot-scope="scope">
            <span>{{scope.row.group | group}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200px"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openDialog">重新预约</el-button>
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
                  <el-input v-model="ruleForm.name" class="filter-item" size="small"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="活动区域" prop="region">
                  <el-select v-model="ruleForm.region" placeholder="请选择活动区域" size="small" class="filter-item">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="即时配送" prop="delivery">
                  <el-switch v-model="ruleForm.delivery" size="small"></el-switch>
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
                  <el-input type="textarea" v-model="ruleForm.desc" size="small"></el-input>
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
        home_page: false,
        btnAuth: {
          list_query_btn: true,
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
              name: '中华人民共和贺卡聚隆科技 '
            }, {
              sid: '123',
              name: '中华人民共和贺卡聚隆科技 '
            },
            {
              sid: '123',
              name: '中华人民共和贺卡聚隆科技 '
            }, {
              sid: '123',
              name: '中华人民共和贺卡聚隆科技 '
            },
            {
              sid: '123',
              name: '中华人民共和贺卡聚隆科技 '
            }, {
              sid: '123',
              name: '中华人民共和贺卡聚隆科技 '
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
      let obj = this.checkPageAuth(this, "home_page", this.btnAuth);
    },
    methods: {

      //打开弹窗
      openDialog(){
        this.centerDialogVisible = true
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
        this.centerDialogVisible = false
      },

      //重置检索条件
      reset(){
        Object.assign(this.$data.qc, this.$options.data().qc)
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
  .filter-item {
    width: 200px;
  }
</style>
