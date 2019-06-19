import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import permission from './modules/permission';
import getters from './getters';
import cityInfo from '../utils/citys'

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    hospitalType: window.localStorage.getItem('hospitalType'),    //1-社区；2-地区；3-国家；4-第三方
    name: window.localStorage.getItem('name'),
    activeIndex: '/home/home',
    regionOptions:[],
    cityInfo:cityInfo,
    list: [],
    allAuthResource: [],
    pageSize: 10,
    dialogVisiblePass:false,
    resourcePageNo: 1,
    resourcePageSize: 10,
    reqResourcePageNo: 1,
    reqResourcePageSize: 10,

    //页面样式改变
  style:{
    fontSize18:'16px',
    fontSize16:'16px',
    fontSize14:'14px',
    assemblyModel:'medium',
    dialogWidth:'25%',
    dialogWidthLarge:'40%'
  },




    dictionaryPageNo: 1,
    dictionaryPageSize: 10,
    dictionaryTypePageNo: 1,
    dictionaryTypePageSize: 10,

    departmentPageNo: 1,
    departmentPageSize: 10,

    userListNo: 1,
    userListSize: 10,
    roleListNo: 1,
    roleListSize: 10,
    employeeName: "AAA",


    //分组
    groups: [
      {
        value: 'A',
        label: 'A组',
        key: '1'
      },
      {
        value: 'B',
        label: 'B组',
        key: '2'
      },
      {
        value: 'C',
        label: 'C组',
        key: '3'
      },
    ],
    //性别
    sex: [
      {
        value: '1',
        label: '男',
        key: '1'
      },
      {
        value: '2',
        label: '女',
        key: '2'
      }
    ],
    //总体状态
    overallStatusCy: [
      {
        value: '1',
        label: '正常',
        key: '1'
      },
      {
        value: '2',
        label: '退出',
        key: '2'
      },
      {
        value: '3',
        label: '死亡',
        key: '3'
      },
      {
        value: '4',
        label: '肠癌',
        key: '4'
      },
      {
        value: '5',
        label: '肺癌',
        key: '5'
      },
      // {
      //   value: '6',
      //   label: '肠癌肺癌',
      //   key: '6'
      // },
    ],
    //录入状态
    entryStatus: [
      {
        value: '1',
        label: '已录入',
        key: '1'
      },
      {
        value: '2',
        label: '未录入',
        key: '2'
      },
    ],

    //检查状态
    inspect: [
      {
        value: '1',
        label: '已检查',
        key: '1'
      },
      {
        value: '2',
        label: '未检查',
        key: '2'
      },
    ],
    //预约状态
    bookingStatus: [
      {
        value: '1',
        label: '已预约',
        key: '1'
      },
      {
        value: '2',
        label: '未预约',
        key: '2'
      },
    ],
    //是否
    whether: [
      {
        value: '1',
        label: '是',
        key: '1'
      },
      {
        value: '2',
        label: '否',
        key: '2'
      },
    ],

    //发放状态
    grant: [
      {
        value: '1',
        label: '已发放',
        key: '1'
      },
      {
        value: '2',
        label: '未发放',
        key: '2'
      },
    ],
    //fit结果
    result: [
      {
        value: '2',
        label: '阳性',
        key: '2'
      },
      {
        value: '1',
        label: '阴性',
        key: '1'
      },
      {
        value: '3',
        label: '无效',
        key: '3'
      },
      {
        value: '4',
        label: '无结果',
        key: '4'
      },
    ],
    //录入状态
    followResult: [
      {
        value: '1',
        label: '正常',
        key: '1'
      },
      {
        value: '2',
        label: '失联/拒绝',
        key: '2'
      },
      {
        value: '3',
        label: '死亡',
        key: '3'
      },
      {
        value: '4',
        label: '肺癌',
        key: '4'
      },
      {
        value: '5',
        label: '肠癌',
        key: '5'
      },
      {
        value: '6',
        label: '结直肠癌',
        key: '6'
      },
    ],
    //随访来源
    followResuce: [
      {
        value: '1',
        label: '肺癌随访',
        key: '1'
      },
      {
        value: '2',
        label: '肠癌随访',
        key: '2'
      },
    ],
    //异常类型
    abnormalType: [
      {
        value: '1',
        label: '违反方案',
        key: '1'
      },
      {
        value: '2',
        label: '不良事件',
        key: '2'
      },
    ],
    //随访状态
    followStatus: [
      {
        value: '1',
        label: '已随访',
        key: '1'
      },
      {
        value: '2',
        label: '未随访',
        key: '2'
      },
    ],
    //CT结果录入状态
    CTResultStatus: [
      {
        value: '1',
        label: '已录入',
        key: '1'
      },
      {
        value: '2',
        label: '未录入',
        key: '2'
      },
      {
        value: '3',
        label: '国家会诊未录入',
        key: '3'
      },
      {
        value: '4',
        label: '国家会诊已录入',
        key: '4'
      },
    ],
    //是否
    yesOrNo: [
      {
        value: '1',
        label: '是',
        key: '1'
      },
      {
        value: '2',
        label: '否',
        key: '2'
      },
    ],
    //检查类型
    allocationType: [
      {
        value: '2',
        label: '肠镜检查',
        key: '2'
      },
      {
        value: '1',
        label: 'CT检查',
        key: '1'
      },
    ],
  },
  mutations: {
    get_name(state, data){
      state.name = data
    },
    get_hospitalType(state, data){
      state.hospitalType = data
    },
    update_list(state, data){
      state.list = data
    },
    allAuthResource(state, data){
      state.allAuthResource = data
    },
    get_pageSize(state, data){
      state.pageSize = data
    },
    get_pageNo(state, data){
      state.pageNo = data
    },
    get_resourcePageSize(state, data){
      state.resourcePageSize = data
    },
    get_resourcePageNo(state, data){
      state.resourcePageNo = data
    },
    get_reqResourcePageSize(state, data){
      state.reqResourcePageSize = data
    },
    get_reqResourcePageNo(state, data){
      state.reqResourcePageNo = data
    },
    get_dictionaryPageSize(state, data){
      state.dictionaryPageSize = data
    },
    get_dictionaryPageNo(state, data){
      state.dictionaryPageNo = data
    },
    get_dictionaryTypePageSize(state, data){
      state.dictionaryTypePageSize = data
    },
    get_dictionaryTypePageNo(state, data){
      state.dictionaryTypePageNo = data
    },
    get_departmentPageSize(state, data){
      state.departmentPageSize = data
    },
    get_departmentPageNo(state, data){
      state.departmentPageNo = data
    },
    get_roleListSize(state, data){
      state.roleListSize = data
    },
    get_roleListNo(state, data){
      state.roleListNo = data
    },
    get_userListSize(state, data){
      state.userListSize = data
    },
    get_userListNo(state, data){
      state.userListNo = data
    }

  },
  modules: {
    app,
    user,
    permission
  },
  getters
});

export default store
