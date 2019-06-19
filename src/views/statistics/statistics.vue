<template>
  <div slot="right" class="content-page" v-if="statistics_page">
    <div>
      <!--数据列表-->
      <div v-for="item in queryResult.tableData" class="statistics-table">
        <el-table
          :data="item"
          border
          show-summary
          style="width: 100%;margin-top: 10px;">
          <el-table-column
            type="index"
            label="序号"
            center
            width="50">
          </el-table-column>
          <el-table-column
            prop="deptName"
            label="机构"
            v-if="item[0].deptName !=null"
          >
          </el-table-column>
          <el-table-column
            prop="nickName"
            label="用户"
            v-if="item[0].nickName !=null"
          >
          </el-table-column>
          <el-table-column
            label="分组"
            v-if="item[0].groupName !=null"
          >
            <template slot-scope="scope">
              <span>{{scope.row.groupName | group}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="groupNum"
            label="入组总人数"
            v-if="item[0].groupNum !=null"
          >
          </el-table-column>
          <el-table-column
            prop="agroupNum"
            label="A组"
            v-if="item[0].agroupNum !=null"
          >
          </el-table-column>
          <el-table-column
            prop="bgroupNum"
            label="B组"
            v-if="item[0].bgroupNum !=null"
          >
          </el-table-column>
          <el-table-column
            prop="cgroupNum"
            label="C组"
            v-if="item[0].cgroupNum !=null"
          >
          </el-table-column>
          <el-table-column
            prop="hazardsNum"
            label="危险因素评估数"
            v-if="item[0].hazardsNum !=null"
          >
          </el-table-column>
          <el-table-column
            prop="personInfoNum"
            label="个人信息已录入数"
            v-if="item[0].personInfoNum !=null"
          >
          </el-table-column>
          <el-table-column
            prop="fitCheckNum"
            label="FIT实际检查数"
            v-if="item[0].fitCheckNum !=null"
          >
          </el-table-column>
          <el-table-column
            prop="fitPositiveNum"
            label="FIT阳性"
            v-if="item[0].fitPositiveNum !=null"
          >
          </el-table-column>
          <el-table-column
            prop="fitNegativeNum"
            label="FIT阴性"
            v-if="item[0].fitNegativeNum !=null"
          >
          </el-table-column>
          <el-table-column
            prop="bookinfoCTNoNum"
            label="待预约CT"
            v-if="item[0].bookinfoCTNoNum !=null"
          >
          </el-table-column>
          <el-table-column
          prop="bookinfoCJNoNum"
          label="待预约肠镜"
          v-if="item[0].bookinfoCJNoNum !=null"
        >
        </el-table-column>
          <el-table-column
            prop="cTnoticeNum"
            label="CT结果已通知人数"
            v-if="item[0].cTnoticeNum !=null"
          >
          </el-table-column>
          <el-table-column
            prop="cJnoticeNum"
            label="肠镜结果已通知人数"
            v-if="item[0].cJnoticeNum !=null"
          >
          </el-table-column>
          <el-table-column
            prop="ctbookings"
            label="CT已预约人数"
            v-if="item[0].ctbookings !=null"
          >
          </el-table-column>
          <el-table-column
            prop="ctresult"
            label="CT结果录入数"
            v-if="item[0].ctresult !=null"
          >
          </el-table-column>
          <el-table-column
            prop="cjbookings"
            label="肠镜已预约人数"
            v-if="item[0].cjbookings !=null"
          >
          </el-table-column>
          <el-table-column
            prop="cjresult"
            label="肠镜结果已录入人数"
            v-if="item[0].cjresult !=null"
          >
          </el-table-column>
          <el-table-column
            prop="cjCancerNum"
            label="结肠癌人数"
            v-if="item[0].cjCancerNum !=null"
          >
          </el-table-column>
          <el-table-column
            prop="meetingNoNum"
            label="待会诊人数"
            v-if="item[0].meetingNoNum !=null"
          >
          </el-table-column>
          <el-table-column
            prop="meetingYesNum"
            label="已会诊人数"
            v-if="item[0].meetingYesNum !=null"
          >
          </el-table-column>
        </el-table>
      </div>
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
        statistics_page: false,
        btnAuth: {
          statisticsButton1: false,
          statisticsButton3: false,
          statisticsButton5: false,
        },
        ids: [],
        //查询结果
        "queryResult": {
          "pageNo": 1,//当前页
          "pageSize": 10,//每页的条数
          "totalPageCount": 0,
          "tableData": {},
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
        deptLevel:'1'
      }
    },
      mounted(){
        this.$store.commit('LOGOUT_USER');
        let obj = this.checkPageAuth(this, "statistics_page", this.btnAuth);
        this.query()
      },
      methods: {
        //获取选中区
        getQcId(value){
          this.qc.deptid = value[value.length-1]
        },
        //打开弹窗
        openDialog(){
          this.centerDialogVisible = true
        },

        //查询
        query(){
          $axios_http({
            url: "/system/dataStatistics?deptLevel="+this.$store.state.hospitalType,
            data:{},
            vueObj: this
          }).then((res) => {
            console.log(res.data.result)
            this.queryResult.tableData = res.data.result;
            console.log(
                this.queryResult.tableData
              )
          })
        },

        //表单提交
        submitForm(formName)
        {
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
        resetForm(formName){
          this.$refs[formName].resetFields();
          this.centerDialogVisible = false
        },

        //重置检索条件
        reset(){
          Object.assign(this.$data.qc, this.$options.data().qc)
          this.query()
        },

        //每页显示查询结果条数变更事件，做重新查询操作
        pageSizeChange(pageSize){
          this.qc.pageSize = pageSize
          console.log(`每页 ${pageSize} 条`)
        },
        //切换当前页事件，做重新查询操作
        currentPageChange(currentPage){
          this.qc.pageNo = currentPage
          console.log(`当前页: ${currentPage}`);
        }
      }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.statistics-table{
  background: #fff;
  margin-top: 20px;
  padding: 20px 10px;
}
</style>
