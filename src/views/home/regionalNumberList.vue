<template>
  <div slot="right" class="content-page" v-if="regionalNumberList_page">
    <div class="content">
      <div class="filter-container content-search">
        <!--<router-link to="/home/areaHome">-->
          <el-button size="mini" class="return-home" @click="goBack()">返 回</el-button>
        <!--</router-link>-->
        <el-form :model="qc" :inline=true class="clear">
          <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="姓名" v-model="qc.name"   clearable>
          </el-input>
          <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="SID" v-model="qc.sid"   clearable>
          </el-input>
          <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="手机号" v-model="qc.phone"   clearable>
          </el-input>
          <!--<el-select v-model="qc.bookingStatus" clearable placeholder="是否预约" size="small" class="filter-item">-->
            <!--<el-option :value='1' v-bind:key="1" label="未预约"></el-option>-->
            <!--<el-option :value='2' v-bind:key="2" label="已预约"></el-option>-->
            <!--<el-option :value='3' v-bind:key="3" label="取消预约"></el-option>-->
          <!--</el-select>-->
          <!--<el-select v-model="qc.examinationStatus" clearable placeholder="是否检查" size="small" class="filter-item">-->
            <!--<el-option value="1" v-bind:key="1" label="未检查"></el-option>-->
            <!--<el-option value="2" v-bind:key="2" label="已检查"></el-option>-->
          <!--</el-select>-->
          <!--<el-select v-model="qc.finishedStatus" clearable placeholder="完成情况" size="small" class="filter-item">-->
            <!--<el-option value="1" v-bind:key="1" label="未完成"></el-option>-->
            <!--<el-option value="2" v-bind:key="2" label="已完成"></el-option>-->
          <!--</el-select>-->
          <div>
            <el-button size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.uncompletedfecalListPageSize)">查询</el-button>
            <el-button  type="primary" size="small" icon="el-icon-close" @click="reset" >重置</el-button>
          </div>
        </el-form>
      </div>
      <div class="content-page-table">
        <div class="table-btn-grooup">
          <!--<el-button  size="small" type="primary" icon="el-icon-search" >导出EXCEL</el-button>-->
          <!--<el-button  size="small" type="primary" icon="el-icon-plus" @click="add()" >新增</el-button>-->
          <!--<el-button  size="small" type="primary" icon="el-icon-search"  @click="openQuitDialog">一键处理</el-button>-->
        </div>
        <!--数据列表-->
        <el-table
          :data="queryResult.tableData"
          border
          :default-sort = "{prop: 'inGroupDate', order: 'descending'}"
          style="width: 100%;">
          <el-table-column
            type="selection"
            align="center"
            label="序号"
            width="55">
          </el-table-column>
          <el-table-column
            prop="sid"
            label="SID"
          >
          </el-table-column>
          <el-table-column
            label="姓名"
          >
            <template slot-scope="scope">
              <div class="subjectsName">
                <div>
                  {{scope.row.userName}}
                </div>
              </div>
            </template>
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
            width="160"
          >
          </el-table-column>
          <!--<el-table-column-->
            <!--prop="nickName"-->
            <!--label="所属社区"-->
          <!--&gt;-->
          <!--</el-table-column>-->
          <el-table-column
            label="分组"
          >
            <template slot-scope="scope">
              <span>{{scope.row.groupName | group}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="年度状态"
          >
            <template slot-scope="scope">
              <span>{{scope.row.overallStatusCy | overallStatusCy}}</span>
            </template>
          </el-table-column>
          <!--<el-table-column-->
            <!--label="预约状态"-->
          <!--&gt;-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.bookingStatus | bookingStatus}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--label="检查状态"-->
          <!--&gt;-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.examinationStatus | examinationStatus}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--label="完成情况"-->
          <!--&gt;-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.finishedStatus | finishedStatus}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
        </el-table>
        <!--分页栏-->
        <el-row>
          <el-col :span="10"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="14"><div class="grid-content bg-purple">
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
          </div></el-col>
        </el-row>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {

    data () {
      return {
        btnAuth:{
          one_colonscopyList_btn:false,
          colonscopyList_query_btn:false,
          colonscopyList_EXCEL_btn:false,
          colonscopyList_add_btn:false
        },
        //社区
        deptGroup:[],
        regionalNumberList_page:false,
        //查询条件
        "qc":{
          "recordId":'',
          "userName":null,
          "phone":null,
          "sid":null,
          "bookingStatus": null,
//          "examinationStatus": null,
//          "finishedStatus": null,
//          "commDeptId":null,
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
      }
    },
    mounted(){
      let obj = this.checkPageAuth(this,"regionalNumberList_page",this.btnAuth)
      this.qc.recordId = this.$route.query.id
      this.query();
//      this.queryDepartMent()
    },
    methods:{
      //查询社区
      queryDepartMent(){
        $axios_http({
          url:"/allocation/record/find/bookingrecordinfo",
          data:{
          },
          vueObj:this
        }).then((res)=>{
          this.deptGroup = res.data.data
        })
      },
      //查询
     query(pageNo,pageSize){
        $axios_http({
          url:"/allocation/record/find/bookingrecordinfo",
          data:this.qc,
          vueObj:this
        }).then((res)=>{
          this.queryResult.tableData = res.data.result.list;
          this.queryResult.pages = res.data.result.pages//获取总共多少页
          this.queryResult.pageNum = res.data.result.pageNum//获取当前第几页
          this.queryResult.pageSize = res.data.result.pageSize//获取当前每页多少条数据
          this.queryResult.total = res.data.result.total//获取总共条数
        })
      },
      //重置检索条件
      reset(){
        Object.assign(this.$data.qc, this.$options.data().qc)
        this.qc.recordId = this.$route.query.id
        this.query();
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

    }}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content{
  }
  .btnStyle{
    padding-left: 10px;
  }
  .return-home {
    display: block;
    text-align: center;
    float: left;
    margin-bottom:20px;
  }
  .table-btn-group{
    margin-top:20px;
    margin-bottom:10px;
  }

  .filter-item{
    width:200px;
    /*margin-right:10px;*/
  }
</style>
