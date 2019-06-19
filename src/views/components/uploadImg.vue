<template>
<div class="pics">
  <el-upload
    :action=uploadUrl
    :multiple=true
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :http-request="handlePicture"
    :on-remove="handleRemove">
    <i class="el-icon-plus"></i>
  </el-upload>
  <el-dialog :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
</div>
</template>

<script>
  export default {
    name: 'seePic',
    data () {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        uploadUrl:`${SERVER_NAME}/ct/pathology/image/upload`
      }
    },
    created(){
       console.log(SERVER_NAME)
    },
    mounted(){

    },
    methods:{
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handlePicture(file,fileList){
       console.log(file,1)
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
