<template>
  <div slot="right" class="content-page" v-if="CTexamination_page">
    <div class="filter-container content-search">
      <el-button size="mini" class="return-home" @click="goBack()">返 回</el-button>
      <el-tabs type="border-card">
        <el-tab-pane label="国家报告">
          <report></report>
        </el-tab-pane>
        <el-tab-pane label="地区报告">
          <report></report>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import report from './CTexaminationReport.vue'
  export default {
    components:{
      report
    },
    name: 'Right',
    data () {
      return {
        //权限判定
        CTexamination_page: false,
        btnAuth: {
          list_query_btn: true,
        },
      }
    },
    mounted(){
      this.$store.commit('LOGOUT_USER');
      let obj = this.checkPageAuth(this, "CTexamination_page", this.btnAuth);
    },
    methods: {}
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .filter-item {
    width: 200px;
  }
</style>
