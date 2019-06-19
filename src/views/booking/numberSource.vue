<template>
  <div slot="right" class="content-page" v-if="numberSource_page">
    <div class="filter-container content-search">
      <el-button :size="$store.state.style.assemblyModel" class="return-home" @click="goBack()">返 回</el-button>
      <el-form :model="qc" :inline=true class="clear">
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
          <el-select v-model="qc.allocationType" clearable placeholder="检查项目类型" :size="$store.state.style.assemblyModel" class="filter-item">
          <el-option :value="item.value" :key="item.key" :label="item.label"
                     v-for="item in $store.state.allocationType"></el-option>
        </el-select>
          <el-date-picker
            v-model="qc.startTime"
            type="date"
            :size="$store.state.style.assemblyModel"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="预约时间(起)"
            class="filter-item">
          </el-date-picker>
          <el-date-picker
            v-model="qc.endTime"
            type="date"
            :size="$store.state.style.assemblyModel"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="预约时间(止)"
            class="filter-item">
          </el-date-picker>
          <div>
            <el-button :size="$store.state.style.assemblyModel" type="primary" icon="el-icon-search"
                       @click="query(1,$store.state.regionalNumberPageSize)">查询
            </el-button>
            <el-button type="primary" :size="$store.state.style.assemblyModel" icon="el-icon-close" @click="reset">重置</el-button>
          </div>
        </el-form>
    </div>

    <div class="content-page-table">
      <div class="table-btn-group">
        <router-link to="/home/regionalHospitalNumber">
          <el-button :size="$store.state.style.assemblyModel" type="primary" icon="el-icon-news" v-if="btnAuth.numberSourceButton1">放号
          </el-button>
        </router-link>
        <el-button :size="$store.state.style.assemblyModel" type="primary" icon="el-icon-document" @click="downLoad"  v-if="btnAuth.numberSourceButton2">导出EXCEL</el-button>
        <!--<el-button class="filter-item" type="primary" :size="$store.state.style.assemblyModel" icon="el-icon-close">退出研究</el-button>-->
      </div>
      <!--数据列表-->
      <el-table
          :data="queryResult.tableData"
          border
          :size="$store.state.style.assemblyModel"
          ref="multipleTable"
          :style="{'font-size':$store.state.style.fontSize18}">
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
            label="检查项目类型"
          >
          <template slot-scope="scope">
              <span>{{scope.row.allocationType | allocationType}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="period"
            label="预约时间"
          >
          </el-table-column>
          <el-table-column
            prop="amount"
            label="放号数量"
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
          >
            <template slot-scope="scope">
              <router-link
                :to="{path:'/booking/numberDetail',query:{communitydepts:scope.row.communitydepts,id:scope.row.id}}">
                <el-button :size="$store.state.style.assemblyModel" class="btnStyle" type="text"  v-if="btnAuth.numberSourceButton3">查看详情</el-button>
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
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'Right',
    data () {
      return {
        //权限判定
        numberSource_page: false,
        btnAuth: {
          numberSourceButton1:false,//号源管理放号
          numberSourceButton2:false,//号源管理导出EXCEL
          numberSourceButton3:false,//号源管理查看详情

        },
        downloadLoading: false,
        downloadUrl: SERVER_NAME + '/base/hospital/community/list/queryPutCodeForExcel',
        //社区
        deptGroup: [],
        regionalNumber_page: false,
        props: {
          value: 'id',
          children: 'children',
          label: 'deptName'
        },
        ids: [],
        //查询条件
        "qc": {
          "depts":'',
          "allocationType":null,
          "startTime": '',
          "endTime": '',
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
      this.$store.commit('LOGOUT_USER');
      let obj = this.checkPageAuth(this, "numberSource_page", this.btnAuth);
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
      //获取选中区
      getQcId(value){
        this.qc.depts = value[value.length-1]
      },
      //下载
      downLoad(){
        if(this.qc.allocationType==null){
         var url = `${SERVER_NAME}/allocation/record/export/list/queryForAreaCTListExcel?depts=&startTime=${this.qc.startTime}&endTime=${this.qc.endTime}&allocationType=0`
        }else{
          var url = `${SERVER_NAME}/allocation/record/export/list/queryForAreaCTListExcel?depts=&startTime=${this.qc.startTime}&endTime=${this.qc.endTime}&allocationType=${this.qc.allocationType}`
        }
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
      //查询
      query(){
        $axios_http({
          url: '/allocation/record/find/findRecordByTypeCt',
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

</style>
