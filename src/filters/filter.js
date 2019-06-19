/**
 * Created by Administrator on 2017/11/13.
 */
//性别
let sex = value => {
  if(value==1){
    return '男'
  }else if(value==2){
    return '女'
  }else {
    return null
  }

}

//分组
let group = value => {
  if(value=='A'){
    return 'A组'
  }else if(value=='B'){
    return 'B组'
  }else if(value=='C'){
    return 'C组'
  }else{
    return null
  }
}

//总体状态
let overallStatusCy = value => {
  if(value==1){
    return '正常'
  }else if(value==2){
    return '退出'
  }else if(value==3){
    return '死亡'
  }else if(value==4){
    return '肠癌'
  }else if(value==5){
    return '肺癌'
  }else if(value==6){
    return '肠癌肺癌'
  }
}

//过滤时间
let date = value => {
  if (value == null || value == '') {
    return value
  } else {
    if (typeof value == 'object') {
      return value
    } else {
      return value.substring(0, 11)
    }
  }
}
//录入状态
let entryStatus = value => {
  if(value==1){
    return '已录入'
  }else if(value==2){
    return '未录入'
  }
}
//是或否
let okorno = value => {
  if(value==1){
    return '是'
  }else if(value==2){
    return '否'
  }
}
//预约筛查类型

let bookingType = value => {
  if(value==1){
    return '低剂量螺旋CT筛查'
  }else if(value==2){
    return '结肠镜筛查'
  }
}
//预约状态
let bookingStatus = value => {
  if(value==2){
    return '已预约'
  }else if(value==1){
    return '未预约'
  }else if(value==3){
    return '取消预约'
  }
}
//检查状态
let inspect = value => {
  if(value==1){
    return '已检查'
  }else if(value==2){
    return '未检查'
  }
}

//发放状态
let grant = value => {
  if(value==1){
    return '已发放'
  }else if(value==2){
    return '未发放'
  }else {
    return '未发放'
  }
}
//异常事件类型
let abnormalType = value => {
  if(value==1){
    return '违反方案'
  }else if(value==2){
    return '不良事件'
  }else if(value==3){
    return '退出研究'
  }
}
//随诊类型
let followType = value => {
  if(value==1){
    return 'CT随诊'
  }else if(value==2){
    return '肠镜随诊'
  }
}

//随诊状态
let followStatus = value => {
  if(value==1){
    return '已随诊'
  }else if(value==2){
    return '未随诊'
  }
}

//完成状态
let doneStatus = value => {
  if(value==1){
    return '已完成'
  }else if(value==2){
    return '未完成'
  }
}

//添加类型
let addType = value => {
  if(value==1){
    return '添加'
  }else if(value==2){
    return '系统触发'
  }
}

//添加类型
let FITresult = value => {
  if(value==1){
    return '阴性'
  }else if(value==2){
    return '阳性'
  }else if(value==3){
    return '无效'
  }else if(value==4){
    return '无结果'
  }
}
//ct结果录入状态
let resultEnterStatus = value => {
  if(value==1){
    return '地区已录入'
  }else if(value==2){
    return '地区未录入'
  }else if(value==3){
    return '国家会诊未录入'
  }else if(value==4){
    return '国家已录入'
  }
}

//是否
let yesOrNo = value => {
  if(value==1){
    return '是'
  }else if(value==2){
    return '否'
  }
}

//会诊级别
let meetingLevel = value => {
  if(value==0){
    return '不需要会诊'
  }else if(value==1){
    return '普通'
  }else if(value==2){
    return '加急（一周内）'
  }else if(value==3){
    return '非常紧急（马上）'
  }
}

//检查状态
let returnStatus = value => {
  if(value==1){
    return '已返回'
  }else if(value==2){
    return '未返回'
  }
}
//随访来源
let followResuce = value => {
  if(value==1){
    return '肺癌随访'
  }else if(value==2){
    return '肠癌随访'
  }
}
//短信通知状态
let messageStatus = value => {
  if(value==1){
    return '已通知'
  }else if(value==0){
    return '未通知'
  }
}
//预约来源
let source = value => {
  if(value == '' || value == null){
    return ''
  } else if(value=='OTHER'){
    return '其他系统'
  }else if(value == 'SYSTEM'){
    return '本系统'
  }
}
//检查项目类型
let allocationType=value => {
  if(value=='1'){
    return 'CT检查'
  }else{
    return '结肠镜检查'
  }
}
//入组时间
let entryTime = value => {
  if(value != '' && value != null && value != undefined){
    var value = new Date(value)
    return `${value.getFullYear()}年${value.getMonth()+1}月${value.getDate()}日`
  }
  return value
}
//入组时间
let entryTime1 = value => {
  if(value != '' && value != null && value != undefined){
    var value = new Date(value)
    return `${value.getFullYear()}年${value.getMonth()+1}月${value.getDate()}日${value.getHours()}时${value.getMinutes()}分`
  }
  return value
}
export {sex,group,overallStatusCy,entryStatus,date,inspect,grant,entryTime,followStatus,followType,abnormalType,doneStatus,addType,FITresult,resultEnterStatus,yesOrNo,meetingLevel,followResuce,returnStatus,bookingStatus,source,allocationType,bookingType,entryTime1,messageStatus,okorno}
