import Vue from 'vue';
import Router from 'vue-router';

const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout';
/* layout */
/* login */
const Login = _import('login/index');
const authRedirect = _import('login/authredirect');
const updatePassword = _import('login/updatePassword');
/* dashboard */
const dashboard = _import('dashboard/index');
/* resource */
const resourceList = _import('resource/resourceList')
const resourceInsert = _import('resource/resourceInsert')
const resourceUpdate = _import('resource/resourceUpdate')

/* reqResource */
const reqResourceList = _import('resource/reqResourceList')
const reqResourceInsert = _import('resource/reqResourceInsert')
const reqResourceUpdate = _import('resource/reqResourceUpdate')
/* components */
const role = _import('components/role')
const roleListUpdate = _import('components/roleListUpdate')
const roleListInsert = _import('components/roleListInsert')
const allocatingMenu = _import('components/allocatingMenu')
const userList = _import('components/userList')
const userListInsert = _import('components/userListInsert')
const userListUpdate = _import('components/userListUpdate')
const allocatingRole = _import('components/allocatingRole')

/* departments */
const departmentList = _import('departments/departmentList')
const departmentInsert = _import('departments/departmentInsert')
const departmentUpdate = _import('departments/departmentUpdate')
const departmentTree = _import('departments/departmentTree')

/* operation */
const operationLog = _import('operation/operationLog')
/* operation */
const helpword = _import('help/helpword')

/* dictionary */
const dictionary = _import('dictionary/dictionary')
const dictionaryInsert = _import('dictionary/dictionaryInsert')
const dictionaryUpdate = _import('dictionary/dictionaryUpdate')
const dictionaryType = _import('dictionary/dictionaryType')
const dictionaryTypeInsert = _import('dictionary/dictionaryTypeInsert')
const dictionaryTypeUpdate = _import('dictionary/dictionaryTypeUpdate')
/* home */
const home = _import('home/home')
const regionalHospitalNumber = _import('home/regionalHospitalNumber')
const regionalNumber = _import('home/regionalNumber')
const regionalNumberList = _import('home/regionalNumberList')
/* forms */
const CTexamination = _import('forms/CTexamination')
const report = _import('forms/report')
const CTexamination1 = _import('forms/CTexamination1')
const CTexaminationReport = _import('forms/CTexaminationReport')
const CTexaminationReport1 = _import('forms/CTexaminationReport1')
const personalInformation = _import('forms/personalInformation')
const qualification = _import('forms/qualification')
const research = _import('forms/research')
const violationScheme = _import('forms/violationScheme')
const adverseEvent = _import('forms/adverseEvent')
const list = _import('forms/list')
const colonDiagInfo = _import('forms/colonDiagInfo')
const report1 = _import('forms/report1')
const report2 = _import('forms/report2')
const report3 = _import('forms/report3')
const riskFactors = _import('forms/riskFactors')
const lungCancerPathology = _import('forms/lungCancerPathology')
/* subject */
const subject = _import('subject/subject')
const detail = _import('subject/detail')
/* booking */
const CTBooking = _import('booking/CTBooking')
const enterBooking = _import('booking/enterBooking')
const reservations = _import('booking/reservations')
const numberSource = _import('booking/numberSource')
const numberDetail = _import('booking/numberDetail')
/* image */
const imageMangement = _import('image/imageMangement')
/* pathology */
const pathology = _import('pathology/pathology')
/* enteroscopy */
const enteroscopy = _import('enteroscopy/enteroscopy')
/* management */
const management = _import('cancer/management')
/* FIT */
const FIT = _import('FIT/FIT')

/* follow */
const follow = _import('follow/follow')
const followDetail = _import('follow/followDetail')

/* yearFollow */
const yearFollow = _import('yearFollow/yearFollow')
const yearFollowDetail = _import('yearFollow/yearFollowDetail')

/* end */
const endEvent = _import('end/endEvent')

/* abnormal */
const abnormal = _import('abnormal/abnormal')
const abnormalForm = _import('abnormal/abnormalForm')
/* statistics */
const statistics = _import('statistics/statistics')


Vue.use(Router);

export const constantRouterMap = [
  {path: '/login', component: Login, hidden: true},
  {path: '/authredirect', component: authRedirect, hidden: true},
  {
    path: '/updatePassword', component: updatePassword, name: '修改密码页面', hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/login',
    name: '首页',
    hidden: true,
    children: [{path: '/home/home', component: home}]
  },
  {
    path: '/components',
    component: Layout,
    redirect: '/',
    name: '系统管理',
    icon: 'zujian',
    children: [
      {path: 'role', component: role, name: '角色管理', meta: {requireAuth: 'rolePageMain'}},
      {path: 'roleListUpdate', component: roleListUpdate, name: '角色编辑试试', meta: {requireAuth: 'rolePageEditor'}},
      {path: 'roleListInsert', component: roleListInsert, name: '角色添加', meta: {requireAuth: 'rolePageAdd'}},
      {path: 'allocatingMenu', component: allocatingMenu, name: '角色分配权限', meta: {requireAuth: 'rolePageAllauth'}},
      {path: 'userList', component: userList, meta: {requireAuth: 'userPageMain'}, name: '用户管理'},
      {path: 'userListInsert', component: userListInsert, name: '用户添加', meta: {requireAuth: 'userPageAdd'}},
      {path: 'userListUpdate', component: userListUpdate, name: '用户编辑', meta: {requireAuth: 'userPageEditor'}},
      {path: 'allocatingRole', component: allocatingRole, name: '分配菜单权限', meta: {requireAuth: 'userPageAllrole'}}
    ]
  },
  {
    path: '/operation',
    component: Layout,
    redirect: '/',
    name: '操作日志管理',
    icon: 'zujian',
    children: [
      {
        path: 'operationLog', component: operationLog, name: '操作日志', meta: {requireAuth: 'page_operation'}
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/',
    name: '操作日志管理',
    icon: 'zujian',
    children: [
      {
        path: 'dashboard', component: dashboard, name: '操作日志'
      }
    ]
  },
  {
    path: '/resource',
    component: Layout,
    redirect: '/',
    name: '资源管理',
    icon: 'zujian',
    children: [
      {
        path: 'resourceList',
        component: resourceList,
        name: '页面资源',
        meta: {requireAuth: 'page_resourceList'}
      },
      {
        path: 'resourceInsert',
        component: resourceInsert,
        name: '页面资源添加页面',
        meta: {requireAuth: 'page_resource_add'}
      },
      {
        path: 'resourceUpdate',
        component: resourceUpdate,
        name: '页面资源编辑页面',
        meta: {requireAuth: 'page_resource_update'}
      },
      {
        path: 'reqResourceList',
        component: reqResourceList,
        name: '请求资源',
        meta: {requireAuth: 'page_reqResourceList'}
      },
      {
        path: 'reqResourceInsert',
        component: reqResourceInsert,
        name: '请求资源添加页面',
        meta: {requireAuth: 'page_resource_add'}
      },
      {
        path: 'reqResourceUpdate',
        component: reqResourceUpdate,
        name: '请求资源编辑页面',
        meta: {requireAuth: 'page_resource_update'}
      }
    ]
  },
  {
    path: '/departments',
    component: Layout,
    redirect: '/',
    name: '部门管理',
    icon: 'zujian',
    children: [
      {
        path: 'departmentList',
        component: departmentList,
        name: '部门管理页',
        meta: {requireAuth: 'page_departmentList'}
      },
      {
        path: 'departmentInsert',
        component: departmentInsert,
        name: '部门管理添加页面',
        meta: {requireAuth: 'page_department_add'}
      },
      {
        path: 'departmentUpdate',
        component: departmentUpdate,
        name: '部门管理编辑页面',
        meta: {requireAuth: 'page_department_update'}
      },
      {
        path: 'departmentTree',
        component: departmentTree,
        name: '部门树形结构页',
        meta: {requireAuth: 'page_department_tree'}
      }
    ]
  },
  {
    path: '/dictionary',
    component: Layout,
    redirect: '/',
    name: '数据字典管理',
    icon: 'zujian',
    children: [
      {
        path: 'dictionary',
        component: dictionary,
        name: '数据字典',
        meta: {requireAuth: 'page_dictionary'}
      },
      {
        path: 'dictionaryInsert',
        component: dictionaryInsert,
        name: '数据字典添加页面',
        meta: {requireAuth: 'page_dictionary_add'}
      },
      {
        path: 'dictionaryUpdate',
        component: dictionaryUpdate,
        name: '数据字典编辑页面',
        meta: {requireAuth: 'page_dictionary_update'}
      },
      {
        path: 'dictionaryType',
        component: dictionaryType,
        name: '数据字典类型',
        meta: {requireAuth: 'page_dictionaryType'}
      },
      {
        path: 'dictionaryTypeInsert',
        component: dictionaryTypeInsert,
        name: '数据字典类型添加页面',
        meta: {requireAuth: 'page_dictionaryType_add'}
      },
      {
        path: 'dictionaryTypeUpdate',
        component: dictionaryTypeUpdate,
        name: '数据字典类型编辑页面',
        meta: {requireAuth: 'page_dictionaryType_update'}
      }
    ]
  },
  {
    path: '/home',
    component: Layout,
    redirect: '/',
    name: '首页',
    icon: 'zujian',
    children: [
      {
        path: 'home', component: home, name: '首页详情', meta: {requireAuth: 'home_page'}
      },
      {
        path: 'regionalHospitalNumber', component: regionalHospitalNumber, name: '放号页面', meta: {requireAuth: 'regionalHospitalNumber_page'}
      },
      {
        path: 'regionalNumber', component: regionalNumber, name: '放号一览表', meta: {requireAuth: 'regionalNumber_page'}
      },
      {
        path: 'regionalNumberList', component: regionalNumberList, name: '放号详情', meta: {requireAuth: 'regionalNumberList_page'}
      },
    ]

  },
  //受试者管理
  {
    path: '/subject',
    component: Layout,
    redirect: '/',
    name: '受试者管理',
    icon: 'zujian',
    children: [
      //受试者管理
      {
        path: 'subject', component: subject, name: 'subject', meta: {requireAuth: 'subject_page'}
      },
      {
        path: 'detail', component: detail, name: '受试者管理详情', meta: {requireAuth: 'detail_page'}
      },

    ]

  },

  //预约管理
  {
    path: '/booking',
    component: Layout,
    redirect: '/',
    name: '预约管理',
    icon: 'zujian',
    children: [
      //ct预约
      {
        path: 'CTBooking', component: CTBooking, name: 'CTBooking', meta: {requireAuth: 'CTBooking_page'}
      },
      //肠镜预约
      {
        path: 'enterBooking', component: enterBooking, name: 'enterBooking', meta: {requireAuth: 'enterBooking_page'}
      },
      //查看预约单
      {
        path: 'reservations', component: reservations, name: 'reservations', meta: {requireAuth: 'reservations_page'}
      },
       //号源管理
       {
        path: 'numberSource', component: numberSource, name: 'numberSource', meta: {requireAuth: 'numberSource_page'}
      },
      //放号查看详情
      {
        path: 'numberDetail', component: numberDetail, name: 'numberDetail', meta: {requireAuth: 'numberDetail_page'}
      },
    ]
  },

  //影像数据管理
  {
    path: '/image',
    component: Layout,
    redirect: '/',
    name: '影像数据管理',
    icon: 'zujian',
    children: [
      //影像数据管理
      {
        path: 'imageMangement',
        component: imageMangement,
        name: 'imageMangement',
        meta: {requireAuth: 'imageMangement_page'}
      },
    ]
  },
  //影像数据管理
  {
    path: '/pathology',
    component: Layout,
    redirect: '/',
    name: '肺癌病理管理',
    icon: 'zujian',
    children: [
      //影像数据管理
      {
        path: '/pathology/pathology',
        component: pathology,
        name: 'pathology',
        meta: {requireAuth: 'pathology_page'}
      },
    ]
  },

  //肠镜数据管理
  {
    path: '/enteroscopy',
    component: Layout,
    redirect: '/',
    name: '肠镜数据管理',
    icon: 'zujian',
    children: [
      //肠镜数据管理
      {
        path: 'enteroscopy', component: enteroscopy, name: 'enteroscopy', meta: {requireAuth: 'enteroscopy_page'}
      },
    ]
  },

  //FIT管理
  {
    path: '/FIT',
    component: Layout,
    redirect: '/',
    name: 'FIT管理',
    icon: 'zujian',
    children: [
      //FIT管理
      {
        path: 'FIT', component: FIT, name: 'FIT', meta: {requireAuth: 'FIT_page'}
      },
    ]
  },

  //阳性随诊管理
  {
    path: '/follow',
    component: Layout,
    redirect: '/',
    name: '阳性随诊管理',
    icon: 'zujian',
    children: [
      //阳性随诊管理
      {
        path: 'follow', component: follow, name: 'follow', meta: {requireAuth: 'follow_page'}
      },
      //查看详情
      {
        path: 'followDetail', component: followDetail, name: 'followDetail', meta: {requireAuth: 'followDetail_page'}
      },
      {
        path: 'followDetail', component: followDetail, name: '阳性随诊管理', meta: {requireAuth: 'home_page'}
      },
    ]
  },
  //年度随访管理
  {
    path: '/yearFollow',
    component: Layout,
    redirect: '/',
    name: '年度随访管理',
    icon: 'zujian',
    children: [
      //年度随访管理
      {
        path: 'yearFollow', component: yearFollow, name: 'yearFollow', meta: {requireAuth: 'yearFollow_page'}
      },
      //年度随访管理
      {
        path: 'yearFollowDetail',
        component: yearFollowDetail,
        name: yearFollowDetail,
        meta: {requireAuth: 'yearFollowDetail_page'}
      },
      {
        path: 'yearFollowDetail', component: yearFollowDetail, name: '年度随访管理', meta: {requireAuth: 'home_page'}
      },
    ]
  },

  //终点事件管理
  {
    path: '/end',
    component: Layout,
    redirect: '/',
    name: '终点事件管理',
    icon: 'zujian',
    children: [
      {
        path: 'endEvent', component: endEvent, name: '终点事件管理', meta: {requireAuth: 'endEvent_page'}
      },
    ]
  },

  //异常事件管理
  {
    path: '/abnormal',
    component: Layout,
    redirect: '/',
    name: '异常事件管理',
    icon: 'zujian',
    children: [
      {
        path: 'abnormal', component: abnormal, name: '异常事件管理', meta: {requireAuth: 'abnormal_page'}
      },
      {
        path: 'abnormalForm', component: abnormalForm, name: '异常事件查看表单', meta: {requireAuth: 'abnormalForm_page'}
      },
    ]
  },

  //数据统计
  {
    path: '/statistics',
    component: Layout,
    redirect: '/',
    name: '数据统计',
    icon: 'zujian',
    children: [
      {
        path: 'statistics', component: statistics, name: '数据统计', meta: {requireAuth: 'statistics_page'}
      },
    ]
  },
  //癌症受试者管理
  {
    path: '/cancer',
    component: Layout,
    redirect: '/',
    name: '癌症受试者管理',
    icon: 'zujian',
    children: [
      {
        path: 'management', component: management, name: '癌症受试者管理', meta: {requireAuth: 'cancerManagement_page'}
      },
    ]
  },
  {
    path: '/form',
    component: Layout,
    redirect: '/',
    name: '表单',
    icon: 'zujian',
    children: [
      //CT检查结果表
      {
        path: 'CTexamination',
        component: CTexamination,
        name: 'CTexamination',
        meta: {requireAuth: 'CTexamination_page'}
      },
      {
        path: 'report',
        component: report,
        name: 'report',
        meta: {requireAuth: 'CTexamination_page'}
      },
      {
        path: 'CTexamination1',
        component: CTexamination1,
        name: 'CTexamination1',
        meta: {requireAuth: 'CTexamination_page'}
      },
      //ct报告
      {
        path: 'CTexaminationReport',
        component: CTexaminationReport,
        name: 'CTexaminationReport',
        meta: {requireAuth: 'CTexaminationReport_page'}
      },
      //ct报告
      {
        path: 'CTexaminationReport1',
        component: CTexaminationReport1,
        name: 'CTexaminationReport1',
        meta: {requireAuth: 'CTexaminationReport_page'}
      },
      //个人信息记录表
      {
        path: 'personalInformation',
        component: personalInformation,
        name: 'personalInformation',
        meta: {requireAuth: 'personalInformation_page'}
      },
      //研究对象资格审核表
      {
        path: 'qualification',
        component: qualification,
        name: 'qualification',
        meta: {requireAuth: 'qualification_page'}
      },
      //退出研究情况记录表
      {
        path: 'research', component: research, name: '退出研究情况记录表', meta: {requireAuth: 'research_page'}
      },
      //违反方案事件记录表
      {
        path: 'violationScheme',
        component: violationScheme,
        name: '表 5.4-违反方案事件记录表',
        meta: {requireAuth: 'violationScheme_page'}
      },
      //不良事件记录表
      {
        path: 'adverseEvent', component: adverseEvent, name: '表5.5-不良事件记录表', meta: {requireAuth: 'adverseEvent_page'}
      },
      {
        path: 'list', component: list, name: '列表页', meta: {requireAuth: 'home_page'}
      },
      //表4.3 原发性肺癌诊断信息表
      {
        path: 'colonDiagInfo',
        component: colonDiagInfo,
        name: 'colonDiagInfo',
        meta: {requireAuth: 'colonDiagInfo_page'}
      },
      //结肠镜检查结果记录表
      {
        path: 'report1', component: report1, name: 'report1', meta: {requireAuth: 'report1_page'}
      },
      //病理检查结果表
      {
        path: 'report2', component: report2, name: 'report2', meta: {requireAuth: 'report2_page'}
      },
      //结直肠癌筛查结果告知书
      {
        path: 'report3', component: report3, name: 'report3', meta: {requireAuth: 'report3_page'}
      },
      //危险因素表
      {
        path: 'riskFactors', component: riskFactors, name: 'riskFactors', meta: {requireAuth: 'report3_page'}
      },
      //肺癌病理结果表
      {
        path: 'lungCancerPathology',
        component: lungCancerPathology,
        name: 'lungCancerPathology',
        meta: {requireAuth: 'lungCancerPathology_page'}
      },
    ]

  },
  //数据统计
  {
    path: '/help',
    component: Layout,
    redirect: '/',
    name: '帮助文档',
    icon: 'zujian',
    children: [
      {
        path: 'helpword', component: helpword, name: '帮助文档', meta: {requireAuth: 'help_page'}
      },
    ]
  },
]
export default new Router({
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
});

