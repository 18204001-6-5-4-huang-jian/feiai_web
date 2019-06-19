<template>
  <div slot="" class="content-page" v-if="subject_page">
    <div class="filter-container content-search">
      <el-button :size="$store.state.style.assemblyModel" class="return-home" @click="goBack()">返 回</el-button>
      <el-form :model="qc" :inline=true>
        <el-input :size="$store.state.style.assemblyModel" clearable class="filter-item" placeholder="姓名"
                  v-model.trim="qc.userName">
        </el-input>
        <el-input clearable :size="$store.state.style.assemblyModel" class="filter-item" placeholder="SID"
                  v-model.trim="qc.sid">
        </el-input>
        <el-input clearable :size="$store.state.style.assemblyModel" class="filter-item" placeholder="手机号"
                  v-model.trim="qc.phone">
        </el-input>
        <el-select v-model="qc.sex" clearable placeholder="性别" :size="$store.state.style.assemblyModel" class="filter-item">
          <el-option :value="item.value" :key="item.key" :label="item.label"
                     v-for="item in $store.state.sex"></el-option>
        </el-select>
        <el-cascader
          v-if="$store.state.hospitalType != 5"
          style="position: relative;top: -5px;margin-right: 10px;width: 200px;"
          :options="$store.state.regionOptions"
          placeholder="所属社区"
          :props="props"
          v-model="ids"
          :size="$store.state.style.assemblyModel"
          filterable
          change-on-select
          @change="getQcId"
        ></el-cascader>
        <el-date-picker
          v-model="qc.startentryTime"
          type="date"
          clearable
          :size="$store.state.style.assemblyModel"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          placeholder="入组日期"
          class="filter-item">
        </el-date-picker>
        <el-date-picker
          clearable
          v-model="qc.endentryTime"
          type="date"
          :size="$store.state.style.assemblyModel"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          placeholder="结束日期"
          class="filter-item">
        </el-date-picker>

        <el-select v-model="qc.groupName" clearable placeholder="请选择分组方案" :size="$store.state.style.assemblyModel" class="filter-item">
          <el-option :value="item.value" :key="item.key" :label="item.label"
                     v-for="item in $store.state.groups"></el-option>
        </el-select>
        <el-select v-model="qc.overallStatusCy" clearable placeholder="总体状态" :size="$store.state.style.assemblyModel" class="filter-item">
          <el-option :value="item.value" :key="item.key" :label="item.label"
                     v-for="item in $store.state.overallStatusCy"></el-option>
        </el-select>
        <el-select v-model="qc.personInfoEntryStatus" clearable placeholder="个人信息表" :size="$store.state.style.assemblyModel" class="filter-item">
          <el-option :value="item.value" :key="item.key" :label="item.label"
                     v-for="item in $store.state.entryStatus"></el-option>
        </el-select>
        <el-select v-model="qc.hazardsEntryStatus" clearable placeholder="危险因素调查表" :size="$store.state.style.assemblyModel" class="filter-item">
          <el-option :value="item.value" :key="item.key" :label="item.label"
                     v-for="item in $store.state.entryStatus"></el-option>
        </el-select>
        <div>
          <el-button :size="$store.state.style.assemblyModel" type="primary" icon="el-icon-search" @click="query">
            查询
          </el-button>
          <el-button type="primary" :size="$store.state.style.assemblyModel" icon="el-icon-close" @click="reset">
            重置
          </el-button>
        </div>

      </el-form>
    </div>

    <div class="content-page-table">
      <div class="table-btn-group">
        <!--<el-button :size="$store.state.style.assemblyModel" type="primary" icon="el-icon-document" v-if="btnAuth.subject_export_excel_btn">-->
          <!--<a :href="downloadUrl">导出EXCEL</a>-->
        <!--</el-button>-->
        <!--<el-button class="filter-item" type="primary" :size="$store.state.style.assemblyModel" icon="el-icon-close">退出研究</el-button>-->
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
          label="SID"
         >
        </el-table-column>
        <el-table-column
          prop="userName"
          label="姓名">
        </el-table-column>
        <el-table-column
          label="性别"
        >
          <template slot-scope="scope">
            <span>{{scope.row.sex | sex}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
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
            <span>{{scope.row.overallStatusCy | overallStatusCy }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="个人信息表"
        >
          <template slot-scope="scope">
            <router-link :to="{name:'personalInformation',query:{id:scope.row.personInfoId,type:'2',sid:scope.row.sid}}">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"
                         v-if="btnAuth.subjectButton1 && scope.row.personInfoEntryStatus == 2 && scope.row.overallStatusCy != 2">
                录入
              </el-button>
            </router-link>
            <router-link :to="{name:'personalInformation',query:{id:scope.row.personInfoId,type:'1'}}">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"
                         v-if="btnAuth.subjectButton2 && scope.row.personInfoEntryStatus == 1">查看
              </el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="危险因素表"
        >
          <template slot-scope="scope">
            <router-link :to="{name:'riskFactors',query:{personInfoId:scope.row.personInfoId,id:scope.row.id,type:1}}">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"
                         v-if="btnAuth.subjectButton3 && scope.row.hazardsEntryStatus == 2 && scope.row.overallStatusCy != 2 ">录入
              </el-button>
            </router-link>
            <router-link :to="{name:'riskFactors',query:{id:scope.row.id,type:2}}">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel"
                         v-if="btnAuth.subjectButton4 && scope.row.hazardsEntryStatus == 1">查看
              </el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <router-link :to="{path:'detail',query:{id:scope.row.id,sid:scope.row.sid}}" v-if="btnAuth.subjectButton5">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel">查看详情</el-button>
            </router-link>
            <!--<el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel" @click="openDialog('1',scope.row.id)"-->
                       <!--v-if="btnAuth.subjectButton6 && scope.row.overallStatusCy == 1">退出研究-->
            <!--</el-button>-->
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
                :size="$store.state.style.assemblyModel"
                layout="total, sizes, prev, pager, next, jumper"
                :total="queryResult.total">
              </el-pagination>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <!--退出研究弹窗-->
      <el-dialog
        title="退出研究"
        :visible.sync="quitDialogVisible"
        width="40%"
        @close="resetForm('quitForm')"
        center>
        <div>
          <el-form :model="quitForm" :rules="quitFormRules" ref="quitForm">
            <el-form-item label="退出日期" :label-width="formLabelWidth" prop="quitdate">
              <el-date-picker
                v-model="quitForm.quitdate"
                type="date"
                :picker-options="pickerOptions1"
                :size="$store.state.style.assemblyModel"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="退出日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="退出原因" :label-width="formLabelWidth" prop="reason">
              <el-radio-group v-model="quitForm.reason">
                <br>
                <el-radio label="受试者拒绝随访" style="margin-top: 15px;"></el-radio>
                <br>
                <el-radio label="受试者失联" style="margin-top: 15px;"></el-radio>
                <br>
                <el-radio label="撤回知情同意书主动退出研究" style="margin-top: 15px;"></el-radio>
                <br>
                <el-radio label="随机分配无效" style="margin-top: 15px;"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item style="text-align: center;">
              <el-button type="primary" @click="submitQuitForm('quitForm')" :loading="buttonDisabled">保存</el-button>
              <el-button @click="resetForm('quitForm')">取消</el-button>
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
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        //权限判定
        subject_page: false,
        btnAuth: {
          subjectButton1:false,   //个人信息表录入
          subjectButton2:false,   //个人信息表查看
          subjectButton3:false,   //危险因素表录入
          subjectButton4:false,   //危险因素表查看
          subjectButton5:false,   //查看受试者详情
          subjectButton6:false,   //退出研究
        },
        //弹窗状态
        quitDialogVisible: false,
        areaFlag: '',
        //按钮状态
        buttonDisabled: false,
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
          "deptid":'',
          "userName": null,
          "phone": null,
          "sid": null,
          "sex": null,
          "startentryTime": null,
          "endentryTime": null,
          "groupName": null,
          "overallStatusCy": null,
          "caStatus": null,
          "faStatus": null,
          "hazardsEntryStatus": null,
          "personInfoEntryStatus": null,
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
        currentPage: 1,
        formLabelWidth: '180px',
        //表单数据
        "quitForm": {
          "sid": null,
          "reason": null,
          "quitdate": null
        },

        //表单验证规则
        "quitFormRules": {
          quitdate: {required: true, message: '必填', trigger: 'change'},
          reason: {required: true, message: '必填', trigger: 'change'},
        },
      }
    },
    mounted(){
      this.$store.commit('LOGOUT_USER');
      let obj = this.checkPageAuth(this, "subject_page", this.btnAuth);
      if( this.$route.query.type &&this.$route.query.type == 1){
          this.qc.personInfoEntryStatus = '2'
      }else if( this.$route.query.type &&this.$route.query.type == 2){
        this.qc.hazardsEntryStatus = '2'
      }
      this.query()

    },
    methods: {

      //打开弹窗
      openDialog(count, id){
        if (count == 1) {
          this.quitDialogVisible = true
          this.quitForm.perscrid = id
        }
      },

      //查询
      query(){
        $axios_http({
          url: "/person/info/list",
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
      //获取选中区
      getQcId(value){
         this.qc.deptid = value[value.length-1]
      },

      //退出研究
      submitQuitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.buttonDisabled = true
            $axios_http({
              url: "/person/quit/research",
              data: this.quitForm,
              vueObj: this
            }).then((res) => {
              $successMsg(this, "退出成功")
              this.quitDialogVisible = false
              this.query()
            })
          } else {
            console.log('error submit!!');
            this.buttonDisabled = false
            return false;
          }
        });
      },
      //表单提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.buttonDisabled = true
            alert('submit!');
          } else {
            console.log('error submit!!');
            this.buttonDisabled = false
            return false;
          }
        });
      },

      //表单重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.quitDialogVisible = false
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
  .filter-item {
    width: 200px;
  }
</style>
