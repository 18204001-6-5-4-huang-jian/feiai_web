<template>
  <div slot="right" class="content-page" v-if="home_page">
    <div v-if="$store.state.hospitalType == 5">
      <el-row :gutter="30" class="home-row">
        <el-col>
          <div class="grid-content bg-purple homessage-list">
            <div class="homessage-list quick">
              <div class="home-message-title" :style="{'font-size':$store.state.style.fontSize18}">快捷业务</div>
              <div class="home-message"  v-if="btnAuth.homeButton1">
                <router-link :to="{name:'qualification',query:{type:2}}">
                  <div class="home-message-quick">
                    <img src="../../assets/img/adduser.png" alt="">
                    <p :style="{'font-size':$store.state.style.fontSize18}">新增受试者</p>
                  </div>
                </router-link>
                <!--<router-link :to="{path:'/booking/enterBooking'}">-->
                   <!--<div class="home-message-quick margin">-->
                      <!--<img src="../../assets/img/booking-center.png" alt="">-->
                      <!--<p>快速预约</p>-->
                   <!--</div>-->
                <!--</router-link>-->
              </div>
            </div>
            <div class="homessage-list news">
              <el-row>
                <div class="home-message-title" :style="{'font-size':$store.state.style.fontSize18}">消息中心</div>
                <div class="home-message1 welcome-title">
                  <h1>欢迎参加中国国家肺癌和结直肠癌筛查研究</h1>
                  <p>让更多的中国人远离癌症之苦</p>
                </div>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="24">
          <div class="grid-content bg-purple homessage-list">
            <div class="home-message-title" :style="{'font-size':$store.state.style.fontSize18}">待办事项</div>
            <div class="home-message-un">
              <ul>
                <li class="home-message-un-person"  v-if="btnAuth.homeButton2">
                  <router-link :to="{name:'subject',query:{type:1}}">
                  <div class="un-person-div">
                    <el-badge :value="backlog.personalNum" class="un-icon">
                      <img src="../../assets/img/small-person.png" alt="" class="unicon-image">
                      <!--<i class="iconfont">&#xe82b;</i>-->
                    </el-badge>
                    <span>待录入个人信息</span>
                  </div>
                  </router-link>
                </li>
                <li class="home-message-un-person"  v-if="btnAuth.homeButton3">
                  <router-link :to="{name:'subject',query:{type:2}}">
                  <div class="un-person-div">
                    <el-badge :value="backlog.riskFactorsNum" class="un-icon">
                      <img src="../../assets/img/small-person.png" alt="" class="unicon-image">
                      <!--<i class="iconfont">&#xe82b;</i>-->
                    </el-badge>
                    <span>待录入危险因素</span>
                  </div>
                  </router-link>
                </li>
                <li class="home-message-un-booking-ct"  v-if="btnAuth.homeButton4">
                  <router-link :to="{name:'CTBooking'}">
                  <div class="un-booking-ct-div">
                    <el-badge :value="backlog.bookingCTNum" class="un-icon">
                      <img src="../../assets/img/small-booking-ct.png" alt="" class="unicon-image">
                    </el-badge>
                    <span>待预约CT</span>
                  </div>
                  </router-link>
                </li>
                <li class="home-message-un-booking-enter"  v-if="btnAuth.homeButton5">
                  <router-link :to="{name:'enterBooking'}">
                  <div class="un-booking-enter-div">
                    <el-badge :value="backlog.bookingEnteroscopy" class="un-icon">
                      <img src="../../assets/img/small-booking-enter.png" alt="" class="unicon-image">
                    </el-badge>
                    <span>待预约肠镜</span>
                  </div>
                  </router-link>
                </li>
                <li class="home-message-un-fit"  v-if="btnAuth.homeButton6">
                  <router-link :to="{name:'FIT',query:{type:1}}">
                  <div class="un-fit-div">
                    <el-badge :value="backlog.FITNum" class="un-icon">
                      <img src="../../assets/img/small-fit.png" alt="" class="unicon-image">
                    </el-badge>
                    <span>待完善FIT信息</span>
                  </div>
                  </router-link>
                </li>
                <li class="home-message-un-fafang-ct"  v-if="btnAuth.homeButton7">
                  <router-link :to="{name:'imageMangement',query:{type:1}}">
                  <div class="un-fafang-ct-div">
                    <el-badge :value="backlog.CTReportNum" class="un-icon">
                      <img src="../../assets/img/small-fafang-ct.png" alt="" class="unicon-image">
                    </el-badge>
                    <span>待发放CT</span>
                  </div>
                  </router-link>
                </li>
                <li class="home-message-un-fafang-enter"  v-if="btnAuth.homeButton8">
                  <router-link :to="{name:'enteroscopy',query:{type:1}}">
                  <div class="un-fafang-enter-div">
                    <el-badge :value="backlog.grantEnteroscopyNum" class="un-icon">
                      <img src="../../assets/img/small-fafang-enter.png" alt="" class="unicon-image">
                    </el-badge>
                    <span>待发放肠镜报告</span>
                  </div>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-if="$store.state.hospitalType == 3">
      <el-row :gutter="30" class="home-row">
        <el-col>
          <div class="grid-content bg-purple homessage-list">
            <div class="homessage-list quick">
              <div class="home-message-title" :style="{'font-size':$store.state.style.fontSize18}">快捷业务</div>
              <div class="home-message">
                <router-link to="/home/regionalHospitalNumber">
                  <div class="home-message-quick">
                    <img src="../../assets/img/number.png" alt="">
                    <p :style="{'font-size':$store.state.style.fontSize18}">放号</p>
                  </div>
                </router-link>
              </div>
            </div>
            <div class="homessage-list news">
              <el-row>
                <div class="home-message-title" :style="{'font-size':$store.state.style.fontSize18}">消息中心</div>
                <div class="home-message1 welcome-title">
                  <h1>欢迎参加中国国家肺癌和结直肠癌筛查研究</h1>
                  <p>让更多的中国人远离癌症之苦</p>
                </div>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="24">
          <div class="grid-content bg-purple homessage-list">
            <div class="home-message-title" :style="{'font-size':$store.state.style.fontSize18}">待办事项</div>
            <div class="home-message-un">
              <ul>
                <li class="home-message-un-image"  v-if="btnAuth.homeButton12">
                  <router-link :to="{name:'imageMangement',query:{type:2}}">
                    <div class="un-image-div">
                      <el-badge :value="backlog.ctNumber" class="un-icon">
                        <img src="../../assets/img/small-image.png" alt="" class="unicon-image">
                      </el-badge>
                      <span>待录入影像数据</span>
                    </div>
                  </router-link>
                </li>
                <!--<li class="home-message-un-person"  v-if="btnAuth.homeButton13">-->
                  <!--<router-link :to="{name:'subject',query:{type:2}}">-->
                    <!--<div class="un-person-div">-->
                      <!--<el-badge :value="backlog.personalNum" class="un-icon">-->
                        <!--<img src="../../assets/img/small-person.png" alt="" class="unicon-image">-->
                        <!--&lt;!&ndash;<i class="iconfont">&#xe82b;</i>&ndash;&gt;-->
                      <!--</el-badge>-->
                      <!--<span>待上传影像</span>-->
                    <!--</div>-->
                  <!--</router-link>-->
                <!--</li>-->
                <li class="home-message-un-enter-data"  v-if="btnAuth.homeButton13">
                  <router-link :to="{name:'enteroscopy',query:{type:2}}">
                    <div class="un-enter-data-div">
                      <el-badge :value="backlog.enteroscopy" class="un-icon">
                        <img src="../../assets/img/small-enter-data.png" alt="" class="unicon-image">
                      </el-badge>
                      <span>待录入肠镜数据</span>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-if="$store.state.hospitalType == 1">
      <el-row :gutter="30" class="home-row">
        <el-col :span="24">
          <div class="grid-content bg-purple homessage-list">
            <div class="homessage-list">
              <el-row>
                <div class="home-message-title" :style="{'font-size':$store.state.style.fontSize18}">消息中心</div>
                <div class="home-message1 welcome-title">
                  <!--<img src="../../assets/img/info.png" class="news-img"/>-->
                  <h1>欢迎参加中国国家肺癌和结直肠癌筛查研究</h1>
                  <p>让更多的中国人远离癌症之苦</p>
                </div>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="24">
          <div class="grid-content bg-purple homessage-list">
            <div class="home-message-title" :style="{'font-size':$store.state.style.fontSize18}">待办事项</div>
            <div class="home-message-un">
              <ul>
                <li class="home-message-un-huizhen-ct"  v-if="btnAuth.homeButton14">
                  <router-link :to="{name:'imageMangement',query:{type:3}}">
                    <div class="un-huizhen-ct-div">
                      <el-badge :value="backlog.countryNum" class="un-icon">
                        <img src="../../assets/img/small-huizhen-ct.png" alt="" class="unicon-image">
                      </el-badge>
                      <span>待会诊CT结果</span>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="30" class="home-row1">
      <el-col :span="12">
        <div class="grid-content bg-purple homessage-list">
          <div class="homessage-list">
            <div class="home-message-title" :style="{'font-size':$store.state.style.fontSize18}">统计</div>
            <div class="home-echart">
              <!-- <echart></echart> -->
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple homessage-list">
          <div class="homessage-list">
            <el-row>
              <div class="home-message-title" :style="{'font-size':$store.state.style.fontSize18}">排行榜</div>
              <div class="home-echart1">
                <!-- <echart1></echart1> -->
              </div>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import echart from '../components/echart.vue'
  import echart1 from '../components/echart1.vue'
  export default {
    components:{
      echart,
      echart1
    },
    name: 'Right',
    data () {
      return {
        tabPosition: 'first',
        allocationListData: [],
        allocationListData1: [],
        "backlog": {
          "personalNum": '',//待完善个人信息
          "bookingCTNum": '',//待预约CT
          "bookingEnteroscopy": '',//待预约肠镜
          "FITNum": '',//待完善FIT信息
          "CTReportNum": '',//待发放CT报告
          "grantEnteroscopyNum": '',//待发放肠镜报告
          "followNum": '',//待随诊
          "countryNum":'',//国家待会诊
          "enteroscopy":'',//待录入肠镜
          "ctNumber":"",//地区待录入ct
          "riskFactorsNum":'',//待录入危险因素
        },
        //权限判定
        home_page: false,
        btnAuth: {
          homeButton1:false,   //社区新增受试者
          homeButton2:false,   //社区待录入个人信息
          homeButton3:false,   //社区待录入危险因素
          homeButton4:false,   //社区待预约CT
          homeButton5:false,   //社区待预约肠镜
          homeButton6:false,   //社区待完善FIT信息
          homeButton7:false,   //社区待发放CT报告
          homeButton8:false,   //社区待发放肠镜报告
          homeButton9:false,   //社区待随诊
          homeButton10:false,  //社区ct立即预约
          homeButton11:false,  //社区肠镜立即预约
          homeButton12:false,  //地区待录入影像数据
          homeButton13:false,  //地区待录入肠镜数据
          homeButton14:false,  //国家待会诊CT结果
          homeButton15:false,  //放号
        },
        //查询条件
        "qc": {
          "name": "",
          "desc": ""
        },
        //查询结果
        "queryResult": {
          "pageNo": 1,//当前页
          "pageSize": 10,//每页的条数
          "totalPageCount": 0,
          "tableData": []
        },
        //分页
        "queryResultSource": {
          "pageNoSource": 1,//当前页
          "pageSizeSource": 15,//每页的条数
          "totalPageCount": 0
        },
        allocateResourcesData: [],
        formLabelWidth: '80px',
        rules: {
          name: [
            {required: true, message: '请输入角色名称', trigger: 'blur'},
            {min: 1, max: 16, message: '长度在1到16个字符', trigger: 'blur'}
          ],
          desc: [
            {required: true, message: '请输入角色描述信息', trigger: 'blur'},
            {min: 1, max: 32, message: '长度在1到32个字符', trigger: 'blur'}
          ]
        }
      }
    },
    mounted(){
      this.$store.commit('LOGOUT_USER');
      this.checkPageAuth(this, "home_page", this.btnAuth);
      if(this.$store.state.hospitalType == 5){
        this.querybookingNumber()
        this.queryTodoQuery()
      }else if(this.$store.state.hospitalType == 1){
        this.queryBookingNumberCountry()
      }else if(this.$store.state.hospitalType == 3){
        this.queryNum();
      }

    },
    methods: {
      //国家代办查看
      queryBookingNumberCountry(){
        $axios_http({
          url: "/index/ct/unmeeting/number",
          data: {},
          vueObj: this
        }).then((res) => {
          if (res.data.result != 0) {
            this.backlog.countryNum = res.data.result
          }

        })
      },
      //社区代办查看
      querybookingNumber(){
        $axios_http({
          url: "/index/booking/info/list",
          data: {
              flag:2
          },
          vueObj: this
        }).then((res) => {
          this.allocationListData1 = res.data.result
        })
        $axios_http({
          url: "/index/booking/info/list",
          data: {
            flag:1
          },
          vueObj: this
        }).then((res) => {
          this.allocationListData = res.data.result


        })
      },
      queryTodoQuery(){
        //待完善个人信息
        $axios_http({
          url: "/index/person/info/number/entry/status",
          data: {
            status: 2
          },
          vueObj: this
        }).then((res) => {
          if (res.data.result != 0) {
            this.backlog.personalNum = res.data.result
          }
        })
        //待录入危险因素
        $axios_http({
          url: "/index/person/info/count/hazards",
          data: {
          },
          vueObj: this
        }).then((res) => {
          if (res.data.result != 0) {
            this.backlog.riskFactorsNum = res.data.result
          }
        })
//        //带随诊
//        $axios_http({
//          url: "/index/follow/number/count/status",
//          data: {
//            status: 2
//          },
//          vueObj: this
//        }).then((res) => {
//          if (res.data.result != 0) {
//            this.backlog.followNum = res.data.result
//          }
//        })
        //待发放肠镜报告总量
        $axios_http({
          url: "/index/colorectal/report/count/grant",
          data: {},
          vueObj: this
        }).then((res) => {
          if (res.data.result != 0) {
            this.backlog.grantEnteroscopyNum = res.data.result
          }

        })
        //待发放CT报告
        $axios_http({
          url: "/index/ct/report/count/grant",
          data: {},
          vueObj: this
        }).then((res) => {
          if (res.data.result != 0) {
            this.backlog.CTReportNum = res.data.result
          }

        })
        //待完善FIT信息
        $axios_http({
          url: "/index/fit/info/number/count/todo",
          data: {},
          vueObj: this
        }).then((res) => {
          if (res.data.result != 0) {
            this.backlog.FITNum = res.data.result
          }
        })
        //待预约肠镜
        $axios_http({
          url: "/index/booking/info/number/type/status",
          data: {
            type: 2,
            status: 1
          },
          vueObj: this
        }).then((res) => {
          if (res.data.result != 0) {
            this.backlog.bookingEnteroscopy = res.data.result
          }

        })
        //待预约CT
        $axios_http({
          url: "/index/booking/info/number/type/status",
          data: {
            type: 1,
            status: 1
          },
          vueObj: this
        }).then((res) => {
          if (res.data.result != 0) {
            this.backlog.bookingCTNum = res.data.result
          }

        })

      },
      queryNum(){
         //待录入肠镜数据
        $axios_http({
          url: "/index/colorectal/unenter/number",
          data: {},
          vueObj: this
        }).then((res) => {
          if (res.data.result != 0) {
            this.backlog.enteroscopy = res.data.result
          }

        })
        //ct结果待录入
        $axios_http({
          url: "/index/ct/result/status/count",
          data: {
            status: 2
          },
          vueObj: this
        }).then((res) => {
          if (res.data.result != 0) {
            this.backlog.ctNumber = res.data.result
          }

        })
      }

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1{
    margin:0!important;
  }
  .home-message {
    height: 156px;
    text-align: center;
    background: #ffffff;
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    border-radius: 4px;
    line-height: 30px;
    padding: 20px 30px;
    margin-top: 10px;
  }
  .home-message1 {
    height: 156px;
    text-align: center;
    background: #ffffff;
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    border-radius: 4px;
    padding-top:40px;
    margin-top: 10px;
  }
  .homessage-list{
    /*margin-top: 20px;*/
  }
  .home-message-quick{
    width: 96px;
    height: 116px;
    float: left;
    background: #f9f9fb;
  }
  .home-message-quick img{
    margin-top: 28px;
  }

  .home-message p {
    color: #7d7d7d;
    font-size: 14px;
  }

  .home-message-title {
    height:15px;
    line-height: 15px;
    padding-left: 10px;
    color: #7179e0;
    font-weight:700;
    border-left:4px solid #4ce29f;
  }
  .home-message-un{
    padding-top:10px
  }
  .home-message-un ul{
    list-style-type: none;
  }
  .home-message-un ul li{
    list-style-type: none;
    float: left;
    width: 189px;
    height: 70px;
    margin-bottom:10px;
    margin-right: 15px;
    border-radius: 8px;
  }
  .home-message-un-person{
     background:linear-gradient(to right, #dc6fea,#9567f4);
   }
  .un-person-div{
    padding-left: 20px;
    color: #fff;
    background: url("../../assets/img/un-peison.png") no-repeat 150px 25px/48px 48px;
  }
  .home-message-un-person div span{
    height: 70px;
    line-height: 70px;
  }
  .home-message-un-booking-ct{
    background:linear-gradient(to right, #5fabfd,#6a8cff);
  }
  .un-booking-ct-div{
    padding-left: 20px;
    color: #fff;
    background: url("../../assets/img/un-booking-ct.png") no-repeat 150px 25px/48px 48px;
  }
  .home-message-un-booking-ct div span{
    height: 70px;
    line-height: 70px;
  }
  .home-message-un-booking-enter{
    background:linear-gradient(to right, #fe8267,#fe7094);
  }
  .un-booking-enter-div{
    padding-left: 20px;
    color: #fff;
    background: url("../../assets/img/un-booking-enter.png") no-repeat 150px 25px/48px 48px;
  }
  .home-message-un-booking-enter div span{
    height: 70px;
    line-height: 70px;
  }

  .home-message-un-fafang-ct{
    background:linear-gradient(to right, #6ef0df,#33cdb7);
  }
  .un-fafang-ct-div{
    padding-left: 20px;
    color: #fff;
    background: url("../../assets/img/un-fafang-ct.png") no-repeat 150px 25px/48px 48px;
  }
  .home-message-un-fafang-ct div span{
    height: 70px;
    line-height: 70px;
  }
  .home-message-un-fafang-enter{
    background:linear-gradient(to right, #f5cf68,#fd6cbd);
  }
  .un-fafang-enter-div{
    padding-left: 20px;
    color: #fff;
    background: url("../../assets/img/un-fafang-enter.png") no-repeat 150px 25px/48px 48px;
  }
  .home-message-un-fafang-enter div span{
    height: 70px;
    line-height: 70px;
  }
  .home-message-un-fit{
    background:linear-gradient(to right, #32c6c2,#17a6d0);
  }
  .un-fit-div{
    padding-left: 20px;
    color: #fff;
    background: url("../../assets/img/un-fit.png") no-repeat 150px 25px/48px 48px;
  }
  .home-message-un-fit div span{
    height: 70px;
    line-height: 70px;
  }
  .home-message-un-image{
    background:linear-gradient(to right, #dc6fea,#9567f4);
  }
  .un-image-div{
    padding-left: 20px;
    color: #fff;
    background: url("../../assets/img/un-image.png") no-repeat 150px 25px/48px 48px;
  }
  .home-message-un-image div span{
    height: 70px;
    line-height: 70px;
  }
  .home-message-chart{
    height:400px!important;
  }
  .home-message-un-enter-data div span{
    height: 70px;
    line-height: 70px;
  }
  .home-message-un-enter-data{
    background:linear-gradient(to right, #32c6c2,#17a6d0);
  }
  .un-enter-data-div{
    padding-left: 20px;
    color: #fff;
    background: url("../../assets/img/un-enter-data.png") no-repeat 150px 25px/48px 48px;
  }
  .home-message-un-enter-data div span{
    height: 70px;
    line-height: 70px;
  }
  .home-message-un-huizhen-ct{
    background:linear-gradient(to right, #32c6c2,#17a6d0);
  }
  .un-huizhen-ct-div{
    padding-left: 20px;
    color: #fff;
    background: url("../../assets/img/un-huizhen-ct.png") no-repeat 150px 25px/48px 48px;
  }
  .home-message-un-huizhen-ct div span{
    height: 70px;
    line-height: 70px;
  }

  .quick{
    float: left;
  }
  .news{
    float: left;
    margin-left: 20px;
    width:calc(100% - 185px);
  }
  .margin{
    margin-left: 20px;
    /*background: #fff;*/
  }
  .news-img{
    height: 100px;
  }
  .un-icon{
    position: relative;
    top: -10px;
  }
  .iconfont{
    font-size: 20px;
  }
  .unicon-image{
    height: 20px;
    width: 20px;
  }
  .rink{
    float: left;
    width:50%;
  }
  .static{
    float: left;
    width:50%;
  }
  .home-row{
    margin-bottom:20px;
  }
  .home-row1{
    margin-top:10px;
  }
  .home-echart{
    width:100%;
    height:380px;
    background: #fff;
    margin-top: 10px;
    border-radius: 4px;
    background-image:url('../../assets/img/chart1.png');
    background-size:82% 102%;
    background-repeat: no-repeat;
    background-position:46px center;
  }
  .home-echart1{
    width:100%;
    height:380px;
    background: #fff;
    margin-top: 10px;
    border-radius:4px;
    background-image:url('../../assets/img/chart2.png');
    background-repeat:no-repeat;
    background-size:82% 100%;
    background-position:46px center;
  }
</style>
<style>
  .regional-number .el-button{
    margin-bottom:0px;
    margin-top: -10px;
  }

</style>
