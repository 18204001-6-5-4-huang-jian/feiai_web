<template>
  <div slot="right" class="content-page" v-if="regionalNumber_page">
    <div class="content">
      <div class="filter-container content-search">
        <router-link to="/home/home">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <el-form :model="qc" :inline=true class="clear">
          <!--<el-cascader-->
          <!--style="float: left;width: 200px;margin-right: 15px;"-->
          <!--:options="$store.state.regionOptions"-->
          <!--placeholder="所属区"-->
          <!--:props="props"-->
          <!--v-model="ids"-->
          <!--size="small"-->
          <!--filterable-->
          <!--:show-all-levels="false"-->
          <!--change-on-select-->
          <!--@change="getQcId"-->
          <!--&gt;</el-cascader>-->
          <el-date-picker
            v-model="qc.startTime"
            type="date"
            size="small"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="预约时间(起)"
            class="filter-item">
          </el-date-picker>
          <el-date-picker
            v-model="qc.endTime"
            type="date"
            size="small"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="预约时间(止)"
            class="filter-item">
          </el-date-picker>
          <div>
            <el-button size="small" type="primary" icon="el-icon-search"
                       @click="query(1,$store.state.regionalNumberPageSize)">查询
            </el-button>
            <el-button type="primary" size="small" icon="el-icon-close" @click="reset">重置</el-button>
          </div>
        </el-form>
      </div>
      <div class="content-page-table">
        <div class="table-btn-grooup">
          <el-button size="small" type="primary" icon="el-icon-document" @click="downLoad">导出EXCEL</el-button>
        </div>
        <!--数据列表-->
        <el-table
          :data="queryResult.tableData"
          border
          ref="multipleTable"
          style="width: 100%;">
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="55">
          </el-table-column>
          <el-table-column
            prop="communityName"
            label="所属社区"
          >
          </el-table-column>
          <el-table-column
            prop="period"
            label="预约时间"
          >
          </el-table-column>
          <el-table-column
            prop="amount"
            label="放号数量"
            width="120"
          >
          </el-table-column>

          <el-table-column
            prop="allBookingSums"
            label="已预约人数"
          >
          </el-table-column>
          <!--<el-table-column-->
            <!--prop="allCheckSums"-->
            <!--label="已检查人数"-->
          <!--&gt;-->
          <!--</el-table-column>-->
          <el-table-column
            label="操作"
            width="150"
          >
            <template slot-scope="scope">
              <router-link
                :to="{path:'/home/regionalNumberList',query:{communityDeptId:scope.row.communityDeptId,id:scope.row.id}}">
                <el-button size="small" class="btnStyle" type="text">查看详情</el-button>
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
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import {date} from '@/utils'
  export default {
    data () {
      return {
        btnAuth: {
          one_colonscopyList_btn: false,
          colonscopyList_query_btn: false,
          colonscopyList_EXCEL_btn: false,
          colonscopyList_add_btn: false
        },
        downloadLoading: false,
        downloadUrl: SERVER_NAME + '/base/hospital/community/list/queryPutCodeForExcel',
        //社区
        deptGroup: [],
        regionalNumber_page: false,
        //查询条件
        "qc": {
//          "communityDeptId":null,
          "startTime": '',
          "endTime": '',
          "loginName": null,
          "pageNum": 1,
          "pageSize": 10,
//
        },
        //查询结果
        "queryResult": {
          "pageNum": 1,//当前页
          "pageSize": 10,//每页的条数
          "pages": 0,
          "total": 0,
          "tableData": []
        },
        props: {
          value: 'id',
          children: 'child',
          label: 'name'
        },
        ids: [],
      }
    },
    mounted(){
      let obj = this.checkPageAuth(this, "regionalNumber_page", this.btnAuth)
       this.query()
    },
    methods: {
      //导出excel
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['所属社区', '预约时间', '放号数量', '已预约人数', '已查人数']
          const filterVal = ['commName', 'period', 'amount', 'alSums1', 'alSums2']
          const list = this.queryResult.tableData
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '放号一览表',
            autoWidth: true
          })
          this.downloadLoading = false
        })
      },
      //下载
      downLoad(){
        if(this.$route.query.type == 1){
            var url = `${SERVER_NAME}/allocation/record/export/list/queryForAreaCTListExcel?depts=&startTime=${this.qc.startTime}&endTime=${this.qc.endTime}`
        }else if(this.$route.query.type == 2){
           var url = `${SERVER_NAME}/allocation/record/export/list/queryForAreaCJListExcel?depts=&startTime=${this.qc.startTime}&endTime=${this.qc.endTime}`
        }
        console.log(url)
        window.open(url,'_blank')
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === '1') {
            return date(v[j])
          } else {
            return v[j]
          }
        }))
      },
      //获取选中区
      getQcId(value){
        this.qc.deptid = value[value.length-1]
      },
      //查询
      query(){
        if (this.$route.query.type == 1) {
          var url = '/allocation/record/find/findRecordByTypeCt'
        } else {
          var url = '/allocation/record/find/findRecordByTypeCj'
        }
        $axios_http({
          url: url,
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
      //重置检索条件
      reset(){
        Object.assign(this.$data.qc, this.$options.data().qc)
        this.ids = []
        this.query(this.$store.state.regionalNumberPageNo, this.$store.state.regionalNumberPageSize);
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
  .content {
    /*background: #fff;*/
    /*padding: 10px;*/
  }

  .btnStyle {
    padding-left: 10px;
  }

  .return-home {
    display: block;
    text-align: center;
    float: left;
    margin-bottom: 20px;
  }

  .table-btn-grooup {
    margin-bottom: 10px;
  }

  .filter-item {
    width: 200px;
    /*margin-right: 10px;*/
  }
</style>
