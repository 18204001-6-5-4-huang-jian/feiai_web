<template>
  <div slot="right" class="content-page" v-if="CTBooking_page">
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
          v-model="ids"
          :size="$store.state.style.assemblyModel"
          filterable
          change-on-select
          @change="getQcId"
        ></el-cascader>
        <el-select v-model="qc.groupName" clearable placeholder="请选择分组方案" :size="$store.state.style.assemblyModel" class="filter-item">
          <el-option :value="item.value" :key="item.key" :label="item.label"
                     v-for="item in $store.state.groups"></el-option>
        </el-select>
        <el-select v-model="qc.overallStatusCy" clearable placeholder="总体状态" :size="$store.state.style.assemblyModel" class="filter-item">
          <el-option :value="item.value" :key="item.key" :label="item.label"
                     v-for="item in $store.state.overallStatusCy"></el-option>
        </el-select>
        <el-date-picker
          v-model="qc.startTime"
          type="date"
          clearable
          :size="$store.state.style.assemblyModel"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          placeholder="预约开始时间"
          class="filter-item" v-if="activeName == 'second'">
        </el-date-picker>
        <el-date-picker
          clearable
          v-model="qc.endTime"
          type="date"
          :size="$store.state.style.assemblyModel"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          placeholder="预约结束时间"
          class="filter-item" v-if="activeName == 'second'">
        </el-date-picker>
        <!--<el-cascader-->
        <!--:options="$store.state.regionOptions"-->
        <!--placeholder="所属社区"-->
        <!--:props="props"-->
        <!--v-model="ids"-->
        <!--:size="$store.state.style.assemblyModel"-->
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
        <el-button :size="$store.state.style.assemblyModel" type="primary" icon="el-icon-plus" @click="openDialog('3')" v-if="btnAuth.CTBookingButton1">
          新增
        </el-button>
        <!--<el-button :size="$store.state.style.assemblyModel" type="primary" icon="el-icon-document">-->
          <!--<a :href="downloadUrl">导出EXCEL</a>-->
        <!--</el-button>-->
        <!--<el-button class="filter-item" type="primary" :size="$store.state.style.assemblyModel" icon="el-icon-close">退出研究</el-button>-->
      </div>
      <el-tabs v-model="activeName" type="card" style="margin-top: 20px;" @tab-click="handleClick" :size="$store.state.style.assemblyModel">
        <el-tab-pane label="未预约" name="first">
          <!--未预约数据列表-->
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
                <span>{{scope.row.overallStatusCy | overallStatusCy}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              v-if="btnAuth.CTBookingButton2"
            >
              <template slot-scope="scope">
                <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel" @click="openDialog('2',scope.row)" v-if="btnAuth.CTBookingButton2">立即预约</el-button>
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
        </el-tab-pane>
        <el-tab-pane label="已预约" name="second">
          <!--已预约数据列表-->
          <el-table
            :data="queryResult1.tableData"
            border
            stripe
            :style="{'font-size':$store.state.style.fontSize18}"
            :default-sort="{prop: 'inGroupDate', order: 'descending'}">
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
              prop="communityName"
              label="所属社区"
              v-if="$store.state.hospitalType == 3 || $store.state.hospitalType == 1"
            >
            </el-table-column>
            <el-table-column
              prop="areaName"
              label="所属地区"
              v-if="$store.state.hospitalType == 1"
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
                <span>{{scope.row.overallStatusCy | overallStatusCy}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="预约来源"
            >
              <template slot-scope="scope">
                <span>{{scope.row.source | source}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="period"
              label="预约CT时间"
            >
            </el-table-column>
            <el-table-column
              label="操作"
            >
              <template slot-scope="scope" v-if="scope.row.source=='SYSTEM'">
                <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel" @click="openDialog('1',scope.row)" v-if="btnAuth.CTBookingButton3&&scope.row.overdue!=1">取消预约</el-button>
                <router-link :to="{name:'reservations',query:{type:1,id:scope.row.id,}}">
                  <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel" v-if="btnAuth.CTBookingButton4" >查看预约单</el-button>
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
                    @size-change="pageSizeChange1"
                    @current-change="currentPageChange1"
                    :current-page="queryResult1.pageNum"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="queryResult1.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="queryResult1.total">
                  </el-pagination>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>


    </div>
    <div>
      <!--//立即预约-->
      <el-dialog
        title="立即预约"
        :visible.sync="insertDialogVisible"
        width="40%"
        @close="resetForm('insertForm')"
        center>
        <div>
          <el-form :model="insertForm" :rules="insertFormRules" ref="insertForm" label-width="100px"
                   class="demo-ruleForm">
            <el-row>
              <el-col :span="24">
                <el-form-item label="剩余放号数量" :label-width="formLabelWidth">
                  {{insertForm.reserveable}}
                </el-form-item>
              </el-col>
              <!--<el-col :span="24">-->
              <!--<el-form-item label="项目名称" :label-width="formLabelWidth" prop="examinationName">-->
              <!--<el-input v-model="insertForm.examinationName" auto-complete="off" :size="$store.state.style.assemblyModel" class="filter-item"></el-input>-->
              <!--</el-form-item>-->
              <!--</el-col>-->
              <el-col :span="24" v-if="submitType">
                <el-form-item label="SID" :label-width="formLabelWidth" prop="sid">
                  <el-input v-model="insertForm.sid" auto-complete="off" :size="$store.state.style.assemblyModel" class="filter-item"
                            @input="getUserName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-if="submitType">
                <el-form-item label="姓名" :label-width="formLabelWidth" prop="userName">
                  <el-input v-model="insertForm.userName" auto-complete="off" :size="$store.state.style.assemblyModel"
                            class="filter-item"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="就诊时间" :label-width="formLabelWidth" prop="period">
                  <el-select v-model="period" placeholder="就诊时间" :size="$store.state.style.assemblyModel" @change="changePeriod"
                             style="width: 220px;">
                    <el-option :value="item.value" :key="item.period" :label="item.period"
                               v-for="item in periodData"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="就诊地点" :label-width="formLabelWidth">
                  {{insertForm.deptName}}
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="就诊科室" :label-width="formLabelWidth">
                  {{insertForm.name}}
                </el-form-item>
              </el-col>
            </el-row>
            <div class="button-group">
              <el-button type="primary" @click="submitForm('insertForm')" :loading="buttonDisabled">保存</el-button>
              <el-button @click="resetForm('insertForm')">取消</el-button>
            </div>
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
        CTBooking_page: false,
        btnAuth: {
          CTBookingButton1:false,//ct预约新增
          CTBookingButton2:false,//ct未预约立即预约
          CTBookingButton3:false,//ct已预约取消预约
          CTBookingButton4:false,//ct已预约查看预约单
        },
        buttonDisabled: false,
        //tab页选中值
        activeName: 'first',
        //标签选中值
        tabPosition: '未预约',
        //弹窗状态
        insertDialogVisible: false,
        areaFlag: '',
        //按钮状态
        loadingState: false,
        //下载链接
        downloadUrl: '',
        //查询条件
        "qc": {
          "depts":'',
          "userName": null,
          "phone": null,
          "sid": null,
          "groupName": null,
          "overallStatusCy": null,
          "startTime": null,
          "endTime": null,
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
        //查询结果
        "queryResult1": {
          "pageNum": 1,//当前页
          "pageSize": 10,//每页的条数
          "pages": 0,
          "total": 0,
          "tableData": []
        },
        formLabelWidth: '180px',
        //新增预约表单
        insertForm: {
          userName: null,
          sid: null,
          period: null,
        },
        //预约数据
        bookingForm: {},
        //新增预约表单验证规则
        insertFormRules: {
          period: [{required: true, message: '必填', trigger: 'blur'}],
          sid: [{required: true, message: '必填', trigger: 'blur'}],
          userName: [{required: true, message: '必填', trigger: 'blur'}],
        },


        props: {
          value: 'id',
          children: 'children',
          label: 'deptName'
        },
        ids: [],
        period: '',
        periodData: [],
        insertFormData: [],
        submitType: true,
      }
    },
    mounted(){
      this.$store.commit('LOGOUT_USER');
      let obj = this.checkPageAuth(this, "CTBooking_page", this.btnAuth);
      this.query()
      this.query1()
    },
    methods: {
      //获取选中区
      getQcId(value){
        this.qc.depts = value[value.length-1]
      },
      //tab点击切换
      handleClick(tab, event) {
        if (this.activeName == 'first') {
          this.qc.endTime = ''
          this.qc.startTime = ''
          this.query()
        } else {
          this.query1()
        }
      },
      //打开弹窗
      openDialog(count, row){
        if (count == 1) {
          this.submitType = false
          this.$confirm('确定取消预约?', '提示', {
            closeOnClickModal: false,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            $axios_http({
              url: "/bookIngInfoRestful/bookinfo/cancel/cancelAllocation",
              data: {
                id: row.id
              },
              vueObj: this
            }).then((res) => {
              $successMsg(this, "取消预约成功")
              this.query1()
            })
          }).catch(() => {

          });
        } else if (count == 2) {
          this.submitType = false
          $axios_http({
            url: "/index/booking/info/list",
            data: {
                flag:1
            },
            vueObj: this
          }).then((res) => {
            if (res.data.result.length > 0) {
              this.periodData = []
              this.insertFormData = res.data.result
              this.insertDialogVisible = true
              for (let i = 0; i < this.insertFormData.length; i++) {
                this.periodData.push({
                  period: this.getDate(this.insertFormData[i].reservationDate) + ' ' + this.insertFormData[i].startTime + '-' + this.insertFormData[i].endTime,
                  value: this.insertFormData[i].id
                })
              }
              this.insertForm.reserveable = this.insertFormData[0].amount
              this.insertForm.deptName = this.insertFormData[0].bookingDeptName
              this.insertForm.name = this.insertFormData[0].examinationPlace
              this.period = this.periodData[0].period
              this.bookingForm.recordId = this.insertFormData[0].id
              this.bookingForm.id = row.id
              console.log(this.insertForm)
            } else {
              this.$message({
                message: '没有可预约时间',
                type: 'warning'
              });
            }
          })
        } else if (count == 3) {
          this.submitType = true
          this.bookingForm.bookingType = 1
          $axios_http({
            url: "/index/booking/info/list",
            data: {
                flag:1
            },
            vueObj: this
          }).then((res) => {
            if (res.data.result.length > 0) {
              this.periodData = []
              this.insertFormData = res.data.result
              this.insertDialogVisible = true
              for (let i = 0; i < this.insertFormData.length; i++) {
                this.periodData.push({
                  period: this.getDate(this.insertFormData[i].reservationDate) + ' ' + this.insertFormData[i].startTime + '-' + this.insertFormData[i].endTime,
                  value: this.insertFormData[i].id
                })
              }
              this.insertForm.reserveable = this.insertFormData[0].amount
              this.insertForm.deptName = this.insertFormData[0].bookingDeptName
              this.insertForm.name = this.insertFormData[0].examinationPlace
              this.period = this.periodData[0].period
              this.bookingForm.recordId = this.insertFormData[0].id
            } else {
              this.$message({
                message: '没有可预约时间',
                type: 'warning'
              });
            }
          })
        }
      },
      //通过sid获取用户姓名
      getUserName(value){
        console.log(value)
        $axios_http({
          url: '/fit/personInfo',
          data: {
            sid: value
          },
          vueObj: this
        }).then((res) => {
          console.log(res.data.result.userName)
          this.insertForm.userName = res.data.result.userName
          this.bookingForm.sid = res.data.result.sid
        })
      },
      //入组时间
      getDate(value){
        if (value != '' && value != null && value != undefined) {
          var value = new Date(value)
          return `${value.getFullYear()}年${value.getMonth() + 1}月${value.getDate()}日`
        }
        return value
      },
      //查询
      query(){
        let _url;
        if(this.activeName=='first'){
          _url="/bookIngInfoRestful/bookinfo/bookinfoCTNolist"
        }else if(this.activeName=='second'){
          _url="/bookIngInfoRestful/bookinfo/bookinfoCTYeslist"
        }
        $axios_http({
          url: _url,
          data: this.qc,
          vueObj: this
        }).then((res) => {
          if(this.activeName=='first'){
            this.queryResult.tableData = res.data.result.list;
            this.queryResult.pages = res.data.result.pages//获取总共多少页
            this.queryResult.pageNum = res.data.result.pageNum//获取当前第几页
            this.queryResult.pageSize = res.data.result.pageSize//获取当前每页多少条数据
            this.queryResult.total = res.data.result.total//获取总共条数
          }else if(this.activeName=='second'){

            this.queryResult1.tableData = res.data.result.list;
            this.queryResult1.pages = res.data.result.pages//获取总共多少页
            this.queryResult1.pageNum = res.data.result.pageNum//获取当前第几页
            this.queryResult1.pageSize = res.data.result.pageSize//获取当前每页多少条数据
            this.queryResult1.total = res.data.result.total//获取总共条数
          }
        })
      },
      //查询
      query1(){
        $axios_http({
          url: "/bookIngInfoRestful/bookinfo/bookinfoCTYeslist",
          data: this.qc,
          vueObj: this
        }).then((res) => {
          this.queryResult1.tableData = res.data.result.list;
          this.queryResult1.pages = res.data.result.pages//获取总共多少页
          this.queryResult1.pageNum = res.data.result.pageNum//获取当前第几页
          this.queryResult1.pageSize = res.data.result.pageSize//获取当前每页多少条数据
          this.queryResult1.total = res.data.result.total//获取总共条数
        })
      },
      //选择列表
      changePeriod(obj) {
        console.log(obj)
        for (let i = 0; i < this.insertFormData.length; i++) {
          if (obj == this.insertFormData[i].id) {
            this.insertForm.reserveable = this.insertFormData[i].amount
            this.insertForm.deptName = this.insertFormData[i].bookingDeptName
            this.insertForm.name = this.insertFormData[i].examinationPlace
            this.bookingForm.recordId = this.insertFormData[i].id
          }
        }
        console.log(this.bookingForm)
      },

      //表单提交
      submitForm(formName) {
        var url
        if (this.submitType) {
          url = '/bookIngInfoRestful/bookinfo/submitBookIngInfo'
        } else {
          url = '/bookIngInfoRestful/bookinfo/submitUpdateStatis'
        }
        $axios_http({
          url: url,
          data: this.bookingForm,
          vueObj: this
        }).then((res) => {
          $successMsg(this, '预约成功')
          this.query()
          this.query1()
          this.insertDialogVisible = false
        })
      },

      //表单重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.insertDialogVisible = false
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
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange1(pageSize) {
        this.qc.pageSize = pageSize
        this.query1()
        console.log(`每页 ${pageSize} 条`)
      },
      //切换当前页事件，做重新查询操作
      currentPageChange1(currentPage) {
        this.qc.pageNum = currentPage
        this.query1()
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
  .button-group{
    text-align: center;
  }
</style>
