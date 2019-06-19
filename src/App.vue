<template>
	<div id="app">
      <router-view></router-view>
	</div>
</template>

<script>
  export default{
    name: 'APP',
    mounted(){
       let width = window.innerWidth
      console.log(width)
      if(width<1200){
          this.$store.state.style.dialogWidth = '40%'
          this.$store.state.style.dialogWidthLarge = '60%'
      }else if(width>1200 &&width<1500) {
         this.$store.state.style.dialogWidth = '40%'
         this.$store.state.style.dialogWidthLarge = '45%'
      }else if(width>1500 &&width<1800) {
        this.$store.state.style.dialogWidth = '35%'
        this.$store.state.style.dialogWidthLarge = '45%'
        console.log(this.$store.state.style.dialogWidth)
      } else{
        this.$store.state.style.dialogWidth = '30%'
        this.$store.state.style.dialogWidthLarge = '35%'
      }
    }
  }
</script>

<style lang="scss">
  @import './styles/index.scss';
  #app{
  	overflow-x: hidden;
    background: #f6f6f6;
    height:100%;
    width:100%;
  }
  .back{
    float: right;
    margin-right:60px;
    margin-top: 10px;
  }
</style>
<style>
  .el-input__icon {
    height: 100%;
    width: 25px;
    text-align: center;
    -webkit-transition: all .3s;
    transition: all .3s;
    line-height: 0px !important;
  }
</style>
