<template>
  <div slot="right" class="content-page" v-if="pathology_page">
    <div class="filter-container content-search">
      <el-button :size="$store.state.style.assemblyModel" class="return-home" @click="goBack()">返 回</el-button>
      <el-form :model="qc" :inline=true>
        <el-input style="width: 200px;" :size="$store.state.style.assemblyModel" clearable class="filter-item" placeholder="姓名"
                  v-model.trim="qc.userName">
        </el-input>
        <el-input style="width: 200px;margin-left: 10px;" clearable :size="$store.state.style.assemblyModel" class="filter-item" placeholder="SID"
                  v-model.trim="qc.sid">
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
        <!-- <el-input style="width: 200px;margin-left: 10px;" clearable :size="$store.state.style.assemblyModel" class="filter-item" placeholder="手机号"
                  v-model.trim="qc.phone">
        </el-input> -->
        <el-select v-model="qc.groupName" clearable placeholder="请选择分组方案" :size="$store.state.style.assemblyModel" class="filter-item">
          <el-option :value="item.value" :key="item.key" :label="item.label"
                     v-for="item in $store.state.groups"></el-option>
        </el-select>
        <el-select v-model="qc.overallStatusCy" clearable placeholder="总体状态" :size="$store.state.style.assemblyModel" class="filter-item">
          <el-option :value="item.value" :key="item.key" :label="item.label"
                     v-for="item in $store.state.overallStatusCy"></el-option>
        </el-select>
        <!--<el-cascader-->
        <!--:options="$store.state.regionOptions"-->
        <!--placeholder="所属社区"-->
        <!--:props="props"-->
        <!--v-model="ids"-->
        <!--:size="$store.state.style.assemblyModel"-->
        <!--v-if="$store.state.hospitalType != 1"-->
        <!--filterable-->
        <!--:show-all-levels="false"-->
        <!--style="float: left;width: 200px;margin-right: 15px;"-->
        <!--change-on-select-->
        <!--@change="getQcId"-->
        <!--&gt;</el-cascader>-->
        <div>
          <el-button :size="$store.state.style.assemblyModel" type="primary" icon="el-icon-search" @click="query">查询</el-button>
          <el-button type="primary" :size="$store.state.style.assemblyModel" icon="el-icon-close" @click="reset">重置</el-button>
        </div>
      </el-form>
    </div>

    <div class="content-page-table">
      <div class="table-btn-group">
        <router-link :to="{path:'/form/lungCancerPathology',query:{flag:1}}">
          <el-button type="primary" :size="$store.state.style.assemblyModel" icon="el-icon-plus" v-if="btnAuth.pathologyButton1">新增</el-button>
        </router-link>
        <el-button :size="$store.state.style.assemblyModel" type="primary" icon="el-icon-document"  @click="downLoad" v-if="btnAuth.pathologyButton2">导出EXCEL
        </el-button>
      </div>
      <!--数据列表-->
      <el-table
        :data="queryResult.tableData"
        border
        stripe
        :size="$store.state.style.assemblyModel"
        :default-sort="{prop: 'inGroupDate', order: 'descending'}"
        :style="{'font-size':$store.state.style.fontSize18}">
        <el-table-column
          prop="sid"
          label="SID"
        >
        </el-table-column>
        <el-table-column
          prop="hosPersonInfoPO.userName"
          label="姓名">
        </el-table-column>
        <el-table-column
          label="性别"
        >
          <template slot-scope="scope">
            <span>{{scope.row.hosPersonInfoPO.sex | sex}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="hosPersonInfoPO.phone"
          label="手机号"
        >
        </el-table-column>
        <el-table-column
          prop="deptmentVo.areaName"
          label="所属地区"
          v-if="$store.state.hospitalType == 1"
        >
        </el-table-column>
        <el-table-column
          prop="deptmentVo.communityName"
          label="所属社区"
          v-if="$store.state.hospitalType == 3 || $store.state.hospitalType == 1"
        >
        </el-table-column>


        <el-table-column
          label="分组"
        >
          <template slot-scope="scope">
            <span>{{scope.row.hosPersonScreenPO.groupName | group}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="110"

        >
          <template slot-scope="scope">
            <router-link :to="{path:'/form/lungCancerPathology',query:{id:scope.row.id,flag:2,}}">
              <el-button type="text" :style="{'font-size':$store.state.style.fontSize18}" :size="$store.state.style.assemblyModel" v-if="btnAuth.pathologyButton3">查看</el-button>
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
        pathology_page: false,
        btnAuth: {
          pathologyButton1: false,
          pathologyButton2: false,
          pathologyButton3: false,
        },
        //弹窗状态
        centerDialogVisible: false,
        //按钮状态
        loadingState: false,
        //下载链接
        props: {
          value: 'id',
          children: 'children',
          label: 'deptName'
        },
        ids: [],
        //查询条件
        "qc": {
          "userName":'',
          "deptid":'',
          "phone": '',
          "sid": '',
          "groupName": '',
          "overallStatusCy": '',
          "pageNum": 1,
          "pageSize": 10,
        },
        downloadUrl: `${SERVER_NAME}/ct/pathology/result/export`,
        //查询结果
        "queryResult": {
          "pageNum": 1,//当前页
          "pageSize": 10,//每页的条数
          "pages": 0,
          "total": 0,
          "tableData": []
        },
        formLabelWidth: '180px',

      }
    },
    mounted(){
      this.$store.commit('LOGOUT_USER');
      let obj = this.checkPageAuth(this, "pathology_page", this.btnAuth);
      this.query()
    },
    methods: {
      //获取选中区
      getQcId(value){
        this.qc.deptid = value[value.length-1]
      },
      //查询
      query(){
        $axios_http({
          url: "/ct/pathology/result/find/list",
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
      downLoad(){
          this.downloadUrl = `${SERVER_NAME}/ct/pathology/result/export?sid=${this.qc.sid}&userName${this.qc.userName}&phone=${this.qc.phone}&groupName=${this.qc.groupName}&overallStatusCy=${this.qc.overallStatusCy}`
          window.open(this.downloadUrl)
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
