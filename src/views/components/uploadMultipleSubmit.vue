<template>
<div class="pics">
  <ul class='fileList clearfix'>
    <li  class="fl" v-for="item in uploadFileList">
      <img :src="item.url" alt="">
      <div class="btnBox">
        <i class="el-icon-zoom-in" @click="zoom(item)"></i>
        <i class="el-icon-delete" @click="del(item)"></i>
      </div>
    </li>
    <li class="bBox fl">
      <input type="file" multiple="multiple" id="multipartFile" name="multipartFile" @change="getFile($event,id)" accept="image/*">
      <i class="el-icon-plus"></i>
    </li>
  </ul>
  <el-dialog :visible.sync="picVisible" width="900px">
    <div>
      <el-button size="mini" type="primary" plain @click="pre" :disabled="!showA">上一张</el-button>
      <el-button size="mini" type="primary" plain @click="next" :disabled="!showB">下一张</el-button>
    </div>
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
</div>
</template>

<script>
var objDeepCopy = function (source) {   //深拷贝
    var sourceCopy = source instanceof Array ? [] : {};
    for (var item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
    }
    return sourceCopy;
}
  export default {
    name: 'uploadFile',
    props:['id','flag'],
    data () {
      return {
       fileList:[],  //已选择文件
       uploadFileList:[],   //已上传文件
       pathUrls:[],   //上传成功返回的url数组
       pathUrl:[],
       picVisible:false,
       dialogImageUrl:'', //当前图片地址
       index:'' ,   //当前图片索引
       showA:true,
       showB:true
      }
    },
    mounted(){

    },

    methods:{
      zoom(item){
        this.picVisible=true;
        this.dialogImageUrl=item.url;
        this.index=this.uploadFileList.indexOf(item);
        if(this.index==0){
          this.showA=false
        }else{
          this.showA=true
        }
        if(this.index+1==this.uploadFileList.length){
          this.showB=false
        }else{
          this.showB=true
        }
      },
      del(item){
          for(let i =0;i<this.uploadFileList.length;i++){
              if(this.uploadFileList[i].id == item.id){
                this.uploadFileList.splice(i,1);
                for(let j =0;j<this.pathUrl.length;j++){
                  if(this.pathUrl[j] == item.id){
                    $axios_http({
                      url: '/ct/delete/image/record',
                      data: {
                          id:item.id
                      },
                      vueObj: this
                    }).then((res) => {
                      $successMsg(this, '删除成功')
                      this.pathUrl.splice(j,1);
                    })

                  }
                }
              }
          }
        this.$emit('getUrl',this.pathUrl.join(','))
      },
     //前一张
      pre(){
        this.index--;
        if(this.index==0){
          this.showA=false;
        }else{
          this.showA=true;
        }
        this.showB=true;
        this.dialogImageUrl=this.uploadFileList[this.index].url;

      },
      // 下一张
      next(){
        this.index++;
        if(this.index+1==this.uploadFileList.length){
          this.showB=false;
        }else{
          this.showB=true;
        }
        this.showA=true;
        this.dialogImageUrl=this.uploadFileList[this.index].url;
      },
      // 多图片上传
        getFile(event,id) {
          //追加isShow属性
          for(var i=0;i<event.target.files.length;i++){
            event.target.files[i].url=URL.createObjectURL(event.target.files[i]);
            this.fileList.push(event.target.files[i]);
          }
          // 上传
            let formData = new FormData();
            for(var i=0;i<this.fileList.length;i++){
              formData.append('file', this.fileList[i]);
            }
             const loading = this.$loading({
              lock: true,
              text: '图片拼命上传中...',
              spinner: 'el-icon-loading',
              background: 'rgba(255, 255, 255, 0.5)'
            });
            this.$axios.post(SERVER_NAME+'/ct/pathology/image/upload', formData,{
              headers: {
                'Content-Type': 'multipart/form-data',
              }
            }).then(res => {
               this.fileList = []
              loading.close();
              if(res.data.status=='SUCCESS'){
                  for(let i =0 ;i <res.data.result.length;i++){
                    var obj = {
                      name:res.data.result[i],
                      id:res.data.result[i],
                      url:SERVER_NAME + '/ct/find/image/path?id='+res.data.result[i]
                    }
                    this.pathUrl.push(res.data.result[i])
                    this.uploadFileList.push(obj)
                  }

                  this.$emit('getUrl',this.pathUrl.join(','))

                 this.$message({
                  message: '图片上传成功',
                  type: 'success'
                });
                event.target.value='';
              }else{
                this.$message({
                  message: res.data.statusMsg,
                  type: 'error'
                });
              }

            })
        },
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fileList .bBox{
  position: relative;
  border:1px dashed #dcdfe6;
  background:#fff;
  cursor: pointer;
  margin-left: 10px;
}
.bBox input{
  width: 80px;
  height: 80px;
  position: absolute;
  opacity: 0;
  cursor: pointer;
  z-index: 1;
}
.bBox i{
  font-size: 32px;
  position:absolute;
  top: 50%;
  left: 50%;
  color: #c4cbd5;
  transform: translate(-50%,-50%);
}
.fileList{
  border:1px solid rgb(153, 153, 153);
  padding-top: 10px;
  margin-bottom:20px;
}
.fileList li{
  margin-left:10px;
  width: 80px;
  height: 80px;
  overflow: hidden;
  position: relative;
  margin-bottom:10px;
}
.fileList li img{
  width: 80px;
  height: 80px;
  border:1px solid rgb(153, 153, 153);
}
.btnBox{
  display: none;
  position: absolute;
  background: rgba(0,0,0,0.5);
  width: 80px;
  height: 80px;
  top: 0;
  left: 0;
}
 .btnBox .el-icon-delete {
  display: inline-block;
  font-size: 20px;
  color: #fff;
  /*margin:30px 10px 0 50px;*/
  cursor: pointer;
}
.btnBox .el-icon-zoom-in {
  display: inline-block;
  font-size: 20px;
  color: #fff;
  margin:30px 10px 0 10px;
  cursor: pointer;
}
.fileList li:hover .btnBox{
  display: block;
}
.el-dialog__body button{
  color: #777;
  cursor: pointer;
  margin-top:-30px;
  margin-bottom:10px;
}
</style>
