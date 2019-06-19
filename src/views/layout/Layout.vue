<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <el-container>
      <el-header height="50px">
        <navbar></navbar>
      </el-header>
      <el-container>
        <el-aside width="152px">
          <sidebar class="sidebar-container" style="background: #000;" :itemRootList="itemRootList"></sidebar>
        </el-aside>
        <el-main>
          <app-main></app-main>
        </el-main>
      </el-container>
    </el-container>
	</div>
</template>

<script>
  import { Navbar, Sidebar, AppMain } from 'views/layout';
 // console.log(Sidebar)
  export default {
    name: 'layout',
    data() {
      return{
        itemRootList:[]   //左侧菜单
      }
    },
    components: {
      Navbar,
      Sidebar,
      AppMain
    },
    created(){
      // this.getTree()

      // 假登录
      this.simulationLogin()
    },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar;
      }
    },
    methods: {
      getTree() {
          // 下拉公用请求，解决强制刷新页面bug
        if(this.$store.state.regionOptions.length==0 && this.$store.state.hospitalType != 5){
          $axios_http({
            url:"/index/find/deptment/tree",
            data:{},
          }).then((res)=>{
            this.$store.state.regionOptions = res.data.result.children
          })
        }
      },

      //假登录先关
      simulationLogin() {
        $axios_http({
          url:"/auth/simulationLogin",
          data:{
            	loginname:this.$route.query.loginName
          },
        }).then(res=>{
           if(res.data.status==='SUCCESS'){
                window.sessionStorage.setItem('token', this.$route.query.loginName);
                window.localStorage.setItem('name', res.data.result.nickName);
                this.$store.commit('get_name', window.localStorage.getItem('name'))
                window.localStorage.setItem('hospitalType', res.data.result.hospitalType);
                this.$store.commit('get_hospitalType', window.localStorage.getItem('hospitalType'))

            this.getTree();
            this.getresource();
          }
        })
      },
      getresource(){
        $axios_http({
                    url: "/auth/user/resource",
                    data: {},
                    vueObj: this
                  }).then((res) => {
                    let btnArr = res.data.result.buttons;
                    let pageArr = res.data.result.pages;
                    for (var i = 0; i < btnArr.length; i++) {
                      this.hasAuth(btnArr[i]);
                    }
                    for (var j = 0; j < pageArr.length; j++) {
                      this.hasAuth(pageArr[j]);
                    }
                    this.itemRootList = res.data.result.menu.child
                    this.$store.commit('allAuthResource', res.data.result.menu.child);
                  })
      },
      hasAuth(authName){
            localStorage.setItem(authName,authName)
      }

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
/*@import "src/styles/mixin.scss";*/
.app-wrapper {
  height: 100%;
  width: 100%;
}
.el-header {
  background-color: #252a34;
  height: 50px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  line-height: 50px !important;
}

.el-aside {
  background-color: #384152 !important;
  color: #333;
  line-height: 200px;
}

.el-main {
  background-color: #e9f0f9;
  color: #333;
  padding: 25px;
}
.el-container {
  height: 100%;
  width: 100%;
}
.sidebar-container {
  background: #384152 !important;
}
</style>
