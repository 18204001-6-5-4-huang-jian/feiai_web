<template>
	<el-menu mode="vertical" background-color="#409CFD" text-color="red" active-text-color="#fff" router  default-active="/home/home">
		<sidebar-item :itemRootList="itemRootList"></sidebar-item>
	</el-menu>
</template>


<script>
  import { mapGetters } from 'vuex';
  import SidebarItem from './SidebarItem';
  export default {
    props:['itemRootList'],
    components: { SidebarItem }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

	.el-menu {
			min-height: 100%;
	}
  .logoImg{
        height:20px;
  }
</style>
