<template>
  <div slot="right" class="content-page">
    <!--新增-->
    <el-dialog
      title="新增FIT"
      :visible.sync="dialogVisible"
      width="40%"
      @close="resetForm('addForm')"
      center>
      <div>
        <el-form :model="form" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
          <el-form-item style="text-align: center;">
            <el-button type="primary" @click="submitForm('form')">保存</el-button>
            <el-button @click="resetForm('addForm','insertDialogVisible')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Right',
    data () {
      return {
        btnAuth: {
          buttonRoleAdd: false,
        },
        dialogVisible:false
      }
    },
    mounted(){
    },
    methods: {
      resetForm(formName,dialog) {
        this.$refs[formName].resetFields();
        this[dialog] = false
      },
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
