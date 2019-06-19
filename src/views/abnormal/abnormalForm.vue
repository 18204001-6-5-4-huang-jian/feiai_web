<template>
  <div slot="right" class="content-page" v-if="abnormalForm_page">
  </div>
</template>

<script>
  export default {
    name: 'Right',
    data () {
      return {
        //权限判定
        abnormalForm_page: false,
        btnAuth: {
          abnormal_query_btn: true,
        },
      }
    },
    mounted(){
      this.$store.commit('LOGOUT_USER');
      let obj = this.checkPageAuth(this, "abnormalForm_page", this.btnAuth);
    },
    methods: {
      //查询
      query(){
        $axios_http({
          url: "/abnormalRecordRestful/abnormal/list/getErrorList",
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

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .clear {
    zoom: 1
  }

  .clear:after {
    display: block;
    clear: both;
    content: "";
  }
</style>
