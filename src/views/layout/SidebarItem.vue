<template>
	<div class="menu-list" style="color: #fff!important;">
    <el-menu mode="vertical" background-color="#384152" text-color="#fff" active-text-color="#fff" :unique-opened="true" router :default-active="$route.path" >
      <div v-for="(totalItem,index) in  totalData" :key="totalItem.id">
        <el-submenu :index="index+toString()+1" v-if="totalItem.child">
          <template slot="title">
            <i :class="['iconfont','myicon',totalItem.icon]"></i>
            <span class="white" :style="{'font-size':$store.state.style.fontSize18}">{{totalItem.name}}</span>
          </template>
          <el-menu-item-group v-for="(item,secIndex) in  totalItem.child" :key="item.id">
            <el-menu-item :index="item.url" class="el-menu-item1" :disabled="item.url=='/'" :style="{'font-size':$store.state.style.fontSize16}">{{item.name}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item v-else-if="!totalItem.child" :index="totalItem.url" :key="totalItem.id" :disabled="totalItem.url=='/'">
          <i :class="['iconfont','myicon',totalItem.icon]"></i>
          <span slot="title" :style="{'font-size':$store.state.style.fontSize18}">{{totalItem.name}}</span>
        </el-menu-item>
      </div>
    </el-menu>
	</div>
</template>

<script>
  export default {
    name: 'SidebarItem',
    props:['itemRootList'],
    data(){
    	return {
    		'totalData': [],
        icon:'icon-guanli01'
    	}
    },
    watch:{
      itemRootList:function(val) {
        this.totalData=val
      }
    },
    mounted: function() {
      //allAuthResource
      this.totalData=localStorage.getItem('allAuthResource')
      console.log(this.$store.state.allAuthResource);
      if(this.$store.state.allAuthResource.length>0){
        this.totalData = this.$store.state.allAuthResource;
      }else{
        $axios_http({
          url: "/auth/user/resource",
          data: {},
          vueObj: this
        }).then((res)=> {
          console.log("获取用户资源")
          console.log(res)
          let btnArr=res.data.result.buttons;
          let pageArr=res.data.result.pages;
          for (var i = 0; i < btnArr.length; i++) {
            this.hasAuth(btnArr[i]);
          }
          for(var j=0;j<pageArr.length;j++){
            this.hasAuth(pageArr[j]);
          }
          this.totalData = res.data.result.menu.child;
        })
      }

    },
    methods:{
      hasAuth(authName){
            localStorage.setItem(authName,authName)
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	.svg-icon {
		margin-right: 15px;
	}

	.hideSidebar .menu-indent {
		display: block;
		text-indent: 10px;
	}
	/* .router-link-exact-active{
		display: block;
		background: red;
		width: 100%;
	} */
	/* .router-link-active{
		color:#20A0FF;
	} */
	.activeFat{
		position: relative;
	}
	.setWidth{
		position: absolute;left:0;top:0;
		padding-left:21%;
		display: block;
		width: 100%;
		height: 100%;
		line-height: 50px;
	}
  .firstMenu a{
    padding-left:0px!important;
  }
  .menu-list{
    width: 152px;
  }
  .myicon{
    color: #fff;
    width:15px!important;
    height:15px!important;
    margin-right:8px;
  }
</style>
<style>
  /*.el-menu{*/
    /*overflow-x: hidden;*/
  /*}*/
  .menu-list ul .el-menu .sidebar-container{
    overflow-x: hidden;
  }
  .menu-list ul ul.el-menu.el-menu--inline{
    overflow-x: hidden;
  }
  .menu-list ul .el-menu-item{
    padding:0 10px!important;
    font-size:14px;
  }
  .menu-list ul .el-submenu{
    padding:0!important;
    font-size:14px;
  }
  .menu-list ul .el-submenu__title{
    padding:0!important;
  }
  .menu-list ul .el-menu-item1{
    padding:0 45px!important;
    font-size:12px;
  }
  .menu-list ul .is-active{
    background: linear-gradient(to right, #6c84fe,#4bc8fe);
  }
  .menu-list ul .el-submenu__title{
    padding-left: 10px!important;
  }
  .el-submenu__icon-arrow  ::before{
    color: #fff!important;
    background: #fff!important;
  }
  .el-menu-item, .el-submenu__title{
    height: 40px!important;
    line-height: 40px!important;
  }
  .el-submenu__title i{
    color: #fff!important;
  }
  .el-menu-item-group .el-menu-item-group__title{
    padding: 0px!important;
  }
</style>

