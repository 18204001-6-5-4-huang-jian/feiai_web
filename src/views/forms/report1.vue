<template>
  <div class="j_content" v-if="report1_page">
    <div style="min-width: 941px;">
      <div class="btns">
        <el-button type="normal" size="small" class="fl" @click="goBack()">返回</el-button>
        <!--<el-button type="normal" size="small" class="fr" @click="submit()" v-if="!show">保存</el-button>-->
        <p class="text">表B1-结肠镜检查结果记录表</p>
      </div>
      <div class="formcon">
        <div class="title">
          第一部分：参与者基本信息
        </div>
        <div class="tables">
          <el-form :inline="true" :model="users" label-width="100px" class="demo-form-inline" :disabled="show" :rules="usersRules" ref="usersRules">
             <el-row>
              <el-col :span="12">
                <el-form-item label="sid:" class="formoneline" prop="sid">
                  <el-input v-model.trim="users.sid" auto-complete="off" size="mini" style="width: 200px;"
                                class="smallInput" @blur="getInfo" :disabled="addconsopy" ref="sid"></el-input>
                  <!-- <span>{{users.sid}}</span> -->
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="年龄:" class="formoneline" prop="age">
                  <el-input v-model.trim="users.age" auto-complete="off" size="mini" style="width: 200px;"
                                class="smallInput" :disabled="true" ref="age"></el-input>
                  <!-- <span>{{users.idCard}}</span> -->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="身份证号:" class="formhalfline" prop="idCard">
                  <el-input v-model.trim="users.idCard" auto-complete="off" size="mini" style="width: 200px;"
                                  class="smallInput" :disabled="true" ref="idCard"></el-input>
                  <!-- <span>{{users.userName}}</span> -->
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别:" class="formhalfline" prop="sex">
                  <el-input v-model.trim="users.sex" auto-complete="off" size="mini" style="width: 200px;"
                                  class="smallInput" :disabled="true" ref="sex"></el-input>
                  <!-- <span>{{users.sex | sex}}</span> -->
                </el-form-item>
              </el-col>
             </el-row>
             <el-row>
              <el-col :span="12">
                <el-form-item label="姓名:" class="formhalfline" prop="userName">
                  <el-input v-model.trim="users.userName" auto-complete="off" size="mini" style="width: 200px;"
                                  class="smallInput" :disabled="true" ref="userName"></el-input>
                  <!-- <span>{{users.age}}</span> -->
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="检查日期:" class="formhalfline">
                  <el-date-picker :readonly="show"
                                  :clearable="false"
                                  v-model="formInline.surveyDate"
                                  type="date"
                                  size="small"
                                  style="width:160px;"
                                  format="yyyy年MM月dd日"
                                  value-format="yyyy-MM-dd"
                                  placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
             </el-row>
          </el-form>
        </div>
      </div>
      <div class="formcon">
        <div class="title">
          二、直肠指诊
        </div>
        <div class="tables" style="position:relative;">
          <img src="../../assets/formimg/icon_1.png" class="rightimg" alt="">
          <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" :rules="rules2"
                   :disabled="show">
            <el-form-item label="参与者是否进行了直肠指诊（无法耐受肠镜检查者）？" class="formoneline" prop="item21">
              <el-radio-group v-model="formInline.item21" @change='changeRadio'>
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="有无肿块" class="formoneline" prop="item21A"
                          v-if="item_2_1_a_show || formInline.item21=='1'">
              <el-radio-group v-model="formInline.item21A">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label=" " class="formoneline" prop="" v-show="formInline.item21A=='1'">
              <el-form-item label="肿块距肛" class="forminline" prop="item21B">
                <el-input type="text" :readonly="show" v-model="formInline.item21B" class="zdysinputsmall"
                          style="width:60px;"></el-input>
              </el-form-item>
              <el-form-item label="cm，" class="forminline" prop="item21C">
                <el-input type="text" :readonly="show" v-model="formInline.item21C" class="zdysinputsmall"
                          style="width:60px;"></el-input>
              </el-form-item>
              <el-form-item label="点钟，占据肠腔" class="forminline" prop="item21D">
                <el-input type="text" :readonly="show" v-model="formInline.item21D" class="zdysinputsmall"
                          style="width:60px;"></el-input>
              </el-form-item>
              <el-form-item label="/" class="forminline" prop="item21E">
                <el-input type="text" :readonly="show" v-model="formInline.item21E" class="zdysinputsmall"
                          style="width:60px;"></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item label="参与者是否完成了结肠镜检查？" class="formoneline" prop="item22">
              <el-radio-group v-model="formInline.item22" :disabled="show">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="formcon" v-if="formInline.item22 == '1'">
        <div class="title">
          三、肠镜检查结果
        </div>
        <div class="tables">
          <el-form :inline="true" :model="formInline2" ref="formvalidate3" class="demo-form-inline"
                   :rules="formvalidate3rules" :disabled="show">
            <div>
              <el-form-item label="肠镜操作方式?" class="formhalfline" prop="item31">
                <el-radio-group v-model="formInline2.item31" :disabled="show">
                  <el-radio label="1">单人</el-radio>
                  <el-radio label="2">双人</el-radio>
                  <el-radio label="3">单/双人</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否采用麻醉？" class="formhalfline" prop="item32">
                <el-radio-group v-model="formInline2.item32" :disabled="show">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <el-form-item label="肠镜到达深度？" class="formoneline" prop="item33">
              <el-radio-group v-model="formInline2.item33" :disabled="show">
                <el-radio label="1" class="mb5">回肠末端</el-radio>
                <el-radio label="2" class="mb5">回盲瓣</el-radio>
                <el-radio label="3" class="mb5">升结肠</el-radio>
                <el-radio label="4" class="mb5">肝曲</el-radio>
                <el-radio label="5" class="mb5">横结肠</el-radio>
                <el-radio label="6" class="mb5">脾曲</el-radio>
                <el-radio label="7" class="mb5">降结肠</el-radio>
                <el-radio label="8" class="mb5">乙状结肠</el-radio>
                <el-radio label="9" class="mb5">直肠</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="肠道准备情况？" class="formoneline" prop="item34">
              <el-radio-group v-model="formInline2.item34" :disabled="show">
                <el-radio label="1">I 级（肠道准备满意）</el-radio>
                <el-radio label="2">II级（肠道准备比较满意）</el-radio>
                <el-radio label="3">III级（肠道准备不满意）</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="肠镜完成时间:" class="formoneline" prop="item35">
              <el-input placeholder="请输入" v-model="formInline2.item35" size="small" style="width:160px;"
                        :readonly="show">
                <template slot="append">分钟</template>
              </el-input>
            </el-form-item>
            <el-form-item label="是否发生并发症（可多选）？" class="formoneline" prop="item36">
              <el-checkbox-group v-model="formInline2.item36" style="height: auto;" :disabled="show">
                <div>
                  <el-checkbox label="1" name="item36" style="margin-bottom: 15px;">无</el-checkbox>
                </div>
                <div>
                  <el-checkbox label="2" name="item36" style="margin-bottom: 15px;"
                               :disabled="(formInline2.item36 && formInline2.item36.indexOf('1') >= 0)">肠道穿孔
                  </el-checkbox>
                </div>
                <div>
                  <el-checkbox label="3" name="item36" style="margin-bottom: 15px;"
                               :disabled="(formInline2.item36 && formInline2.item36.indexOf('1') >= 0)">出血（出血程度
                  </el-checkbox>

                  <el-form-item label="" class="forminline" prop="item3631" style="padding-left:20px;">
                    <el-input v-model="formInline2.item3631" :readonly="show"
                              :disabled="(formInline2.item36 && formInline2.item36.indexOf('1') >= 0)"
                              style="width: 150px;" size="small"></el-input>
                  </el-form-item>
                  <el-form-item label="" class="forminline" prop="item3632" style="padding-left:20px;">
                    <span :class="{gray:formInline2.item36 && formInline2.item36.indexOf('1') >= 0}">处理情况 </span>
                    <el-input v-model="formInline2.item3632" :readonly="show"
                              :disabled="(formInline2.item36 && formInline2.item36.indexOf('1') >= 0)"
                              style="width: 150px;" size="small"></el-input>
                    <span :class="{gray:formInline2.item36 && formInline2.item36.indexOf('1') >= 0}">）</span>
                  </el-form-item>
                </div>
                <div>
                  <el-checkbox label="4" name="item36" style="margin-bottom: 20px;"
                               :disabled="(formInline2.item36 && formInline2.item36.indexOf('1') >= 0)">其他
                  </el-checkbox>
                  <el-form-item label="" class="forminline" prop="item364Other" style="padding-left:20px;">
                    <el-input v-model="formInline2.item364Other" :readonly="show"
                              :disabled="(formInline2.item36 && formInline2.item36.indexOf('1') >= 0)"
                              style="width: 120px" size="small"></el-input>
                  </el-form-item>
                </div>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="是否检出息肉？" class="formoneline" prop="item37">
              <el-radio-group v-model="formInline2.item37" :disabled="show" @change="checkRecordList">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
              </el-radio-group>
              <el-form-item label="检出的息肉具体数为" class="forminline" prop="item37A" style="padding-left:20px;"
                            v-if="formInline2.item37 == 1">
                <el-input v-model="formInline2.item37A" :readonly="show" style="width: 120px" size="small"></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item label="是否检出除息肉外其他病变？" class="formoneline mt5input" prop="item38">
              <el-radio-group v-model="formInline2.item38" :disabled="show" @change="checkRecordList">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
              </el-radio-group>
              <el-form-item label="其他病变类型（请说明）：" ref="formvalidate3_other" class="forminline" prop="item38Other"
                            v-if="formInline2.item38 == '1'" style="margin-left: 40px;">
                <el-input v-model="formInline2.item38Other" :readonly="show" style="width: 120px;margin-right: 20px;"
                          size="small"></el-input>
              </el-form-item>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="formcon" v-if="formInline.item22 == '1'">
        <div class="title">
          四、内镜下病变信息记录表（此表可根据实际病变数添加）
        </div>
        <div class="tables">
          <div v-for="(x,index) in hosCjResultLesionsPOList">
            <div class="title nobg">病变部位{{index + 1}}
              <el-button type="danger" icon="el-icon-delete" size="mini" v-if="index && !show"
                         style="padding:6px 10px;margin-left:10px;" @click="removeOther(index)"></el-button>
            </div>
            <div style="border:1px solid #999999;padding:20px; margin-bottom: 20px;">
              <!-- 必填 -->
              <el-form :inline="true" :model="x" :validate-on-rule-change="false" class="demo-form-inline"
                       ref="lesionsRecordForm" :rules="lesionsRecordRule" :disabled="show" v-if="recordListShow">
                <el-form-item label="部位:" class="formhalfline" prop="item1">
                  <el-select v-model="x.item1" placeholder="请选择" size="small" :disabled="show">
                    <el-option
                      v-for="item in partmentoptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">{{item.label}}
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="距肛:" class="formhalfline" prop="item2">
                  <el-input placeholder="请输入" v-model="x.item2" size="small" :readonly="show" style="width:160px;">
                    <template slot="append">厘米</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="镜下考虑病变类型:" class="formhalfline" prop="item3">
                  <el-input placeholder="请输入" v-model="x.item3" :readonly="show" size="small"></el-input>
                </el-form-item>
                <el-form-item label="病理标本号:" class="formhalfline" prop="item4">
                  <el-input placeholder="请输入" v-model="x.item4" :readonly="show" size="small" ref="item4"></el-input>
                </el-form-item>
                <el-form-item label="最大直径:" class="formhalfline" prop="item5">
                  <el-input placeholder="请输入" v-model="x.item5" :readonly="show" ref="item5" size="small"
                            style="width:160px;">
                    <template slot="append">厘米</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="形状:" class="formhalfline" prop="item6">
                  <el-radio-group v-model="x.item6" :disabled="show">
                    <el-radio label="1">隆起</el-radio>
                    <el-radio label="2">扁平</el-radio>
                    <el-radio label="3">凹陷</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="有无蒂:" class="formhalfline" prop="item7">
                  <el-radio-group v-model="x.item7" :disabled="show">
                    <el-radio label="1">有</el-radio>
                    <el-radio label="2">无</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="蒂形状:" class="formhalfline" prop="item8" v-if="x.item7==1">
                  <el-radio-group v-model="x.item8" :disabled="show">
                    <el-radio label="1">广蒂</el-radio>
                    <el-radio label="2">亚蒂</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="颜色:" class="formhalfline" prop="item9">
                  <el-radio-group v-model="x.item9" :disabled="show">
                    <el-radio label="1">红色</el-radio>
                    <el-radio label="2">灰白色</el-radio>
                    <el-radio label="3">其它</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="有无出血:" class="formhalfline" prop="item10">
                  <el-radio-group v-model="x.item10" :disabled="show">
                    <el-radio label="1">出血</el-radio>
                    <el-radio label="2">不出血</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
              <!-- 非必填 -->
              <el-form :inline="true" :model="x" :validate-on-rule-change="false" class="demo-form-inline"
                       ref="lesionsRecordForm" :rules="lesionsRecordFalseRule" :disabled="show" v-if="!recordListShow">
                <el-form-item label="部位:" class="formhalfline" prop="item1">
                  <el-select v-model="x.item1" placeholder="请选择" size="small" :disabled="show">
                    <el-option
                      v-for="item in partmentoptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">{{item.label}}
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="距肛:" class="formhalfline" prop="item2">
                  <el-input placeholder="请输入" v-model="x.item2" size="small" :readonly="show" style="width:160px;">
                    <template slot="append">厘米</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="镜下考虑病变类型:" class="formhalfline" prop="item3">
                  <el-input placeholder="请输入" v-model="x.item3" :readonly="show" size="small"></el-input>
                </el-form-item>
                <el-form-item label="病理标本号:" class="formhalfline" prop="item4">
                  <el-input placeholder="请输入" v-model="x.item4" :readonly="show" size="small" ref="item4"></el-input>
                </el-form-item>
                <el-form-item label="最大直径:" class="formhalfline" prop="item5">
                  <el-input placeholder="请输入" v-model="x.item5" :readonly="show" ref="item5" size="small"
                            style="width:160px;">
                    <template slot="append">厘米</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="形状:" class="formhalfline" prop="item6">
                  <el-radio-group v-model="x.item6" :disabled="show">
                    <el-radio label="1">隆起</el-radio>
                    <el-radio label="2">扁平</el-radio>
                    <el-radio label="3">凹陷</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="有无蒂:" class="formhalfline" prop="item7">
                  <el-radio-group v-model="x.item7" :disabled="show">
                    <el-radio label="1">有</el-radio>
                    <el-radio label="2">无</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="蒂形状:" class="formhalfline" prop="item8" v-if="x.item7==1">
                  <el-radio-group v-model="x.item8" :disabled="show">
                    <el-radio label="1">广蒂</el-radio>
                    <el-radio label="2">亚蒂</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="颜色:" class="formhalfline" prop="item9">
                  <el-radio-group v-model="x.item9" :disabled="show">
                    <el-radio label="1">红色</el-radio>
                    <el-radio label="2">灰白色</el-radio>
                    <el-radio label="3">其它</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="有无出血:" class="formhalfline" prop="item10">
                  <el-radio-group v-model="x.item10" :disabled="show">
                    <el-radio label="1">出血</el-radio>
                    <el-radio label="2">不出血</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class=" text-right">
            <el-button type="text" class="hosCjResultLesionsPOList" @click="addbbFun" v-if="!show">添加病变部位</el-button>
          </div>
          <!-- <el-form :model="formInline6" label-width="130px" ref="formInline4" :validate-on-rule-change="false" :rules="formvalidate4rules" :disabled="show">
            <div class="title nobg">其他病变</div>
            <div style="border:1px solid #999999;padding:20px 0;">
              <el-form-item label="其它病变:" prop="otherLesions" >
                <el-input type="textarea" :readonly="show" v-model="formInline6.otherLesions"></el-input>
              </el-form-item>
              <el-form-item label="内镜下诊断:" prop="endoscopicDiagnosis" >
                <el-input type="textarea" :readonly="show" v-model="formInline6.endoscopicDiagnosis"></el-input>
              </el-form-item>
              <el-form-item label="诊断医生:" prop="diagnosisDoctor" >
                <el-input type="text" :readonly="show" v-model="formInline6.diagnosisDoctor" class="zdysinput" style="width:80px;"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="是否做了病理:" prop="pathology">
                <el-radio-group v-model="formInline6.pathology" :disabled="show">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </el-form> -->
        </div>
      </div>
      <div class="formcon" v-if="formInline.item22 == '1'">
        <div class="title">
          五、内镜图像
        </div>
        <div class="form-body-content">
          <el-row>
            <el-col :span="24">
              <!-- 多图片上传 -->
              <uploadMultipleSubmit  v-if="!show" @getUrl='getUrl' @getUrl2='getUrl2'></uploadMultipleSubmit>
              <!-- 查看图片展示区 -->
              <seePics  :fileList="fileList" v-if="show"></seePics>
            </el-col>
          </el-row>
        </div>
        <div class="tables">
          <el-form :model="formInline6" label-width="130px" ref="formInline4" :validate-on-rule-change="false"
                   :rules="formvalidate4rules" :disabled="show">
            <div class="title nobg">其他病变</div>
            <div style="border:1px solid #999999;padding:20px 0;">
              <el-form-item label="其它病变:" prop="otherLesions">
                <el-input type="textarea" :readonly="show" v-model="formInline6.otherLesions"></el-input>
              </el-form-item>
              <el-form-item label="内镜下诊断:" prop="endoscopicDiagnosis">
                <el-input type="textarea" :readonly="show" v-model="formInline6.endoscopicDiagnosis"></el-input>
              </el-form-item>
              <el-form-item label="诊断医生:" prop="diagnosisDoctor">
                <el-input type="text" :readonly="show" v-model="formInline6.diagnosisDoctor" class="zdysinput"
                          style="width:80px;"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="是否做了病理:" prop="pathology">
                <el-radio-group v-model="formInline6.pathology" :disabled="show">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
      <div>
        <!--<div class="formcon" style="border:none;">-->
        <!--<el-form :model="formInline7" label-width="130px" ref="formInline7" >-->
        <!--</el-form>-->
        <!--</div>-->
        <p class="txsm">
          填写说明：
        </p>
        <p class="txsm">1、肠道准备情况：I
          级（肠道准备满意）：肠腔内无粪便或渣，无粪水潴留，肠液清亮，操作顺利，观察良好；II级（肠道准备比较满意）：肠腔内无粪便残渣，肠腔内有污浊粪水，操作比较顺利及观察基本清晰；III级（肠道准备不满意）：肠腔内有粪便残渣或粪块，操作不顺利，甚至因肠道准备不足，检查或治疗被迫停止。
        </p>
        <p class="txsm">
          2、部位为距肛**cm（以退镜长度为准），并以肠前壁正中为时钟12点位置，肠后壁正中为6点钟，顺时针描写在肠腔的位置。
        </p>
        <p class="txsm">
          3、每一个病变信息中的需要填写完整
        </p>
      </div>
      <div class="text-center" style="margin-top: 40px;">
        <router-link :to="{path:'/colonscopy/report2',query:{id:ShowData.pathologyId,sid:ShowData.sid,show:1}}">
          <el-button type="primary" v-if="ShowData.pathologyId">查看病理结果</el-button>
        </router-link>
      </div>
      <div class="text-center" style="margin-top: 40px;" v-if="!show">

        <el-button type="primary" @click="submit()">提交</el-button>
        <el-button @click=goBack()>取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import uploadMultipleSubmit from '../components/uploadMultipleSubmit'   //上传图片
  import seePics from '../components/seePics'   //查看图片
  export default {
    components:{
      uploadMultipleSubmit,
      seePics
    },
    name: 'report1',
    data() {
      const oneDecimaljglm = (rule, value, callback) => {
        if (value != null && value != "" || value == undefined) {
          if (value >= 0) {
            const that = this
            this.hosCjResultLesionsPOList.forEach(function (item) {
              console.log(item)
              if (item.item2 != null && item.item2 != '' && item.item2 != undefined)
                that.$set(item, ['item2'], (item.item2 * 1).toFixed(1))
            })
            callback();
          } else {
            callback(new Error('请输入非负数!'))
          }
        } else {
          callback()
        }
      }
      const oneDecimaljglm1 = (rule, value, callback) => {
        if (value == null && value == "" || value == undefined) {
          callback()
        } else {
          if (value >= 0) {
            const that = this
            this.hosCjResultLesionsPOList.forEach(function (item) {
              console.log(item)
              if (item.item2 != null && item.item2 != '' && item.item2 != undefined)
                that.$set(item, ['item2'], (item.item2 * 1).toFixed(1))
            })
            callback();
          } else {
            callback(new Error('请输入非负数!'))
          }
        }

      }
      const oneDecimalzdzz = (rule, value, callback) => {
        if (value != null && value != "" || value == undefined) {
          if (value >= 0 && value <= 10) {
            const that = this
            this.hosCjResultLesionsPOList.forEach(function (item) {
              if (item.item5 != null && item.item5 != '' && item.item5 != undefined)
                that.$set(item, ['item5'], (item.item5 * 1).toFixed(1))
            })
            callback();
          } else {
            callback(new Error('直径:(0.1-10)厘米'))
          }
        } else {
          callback()
        }
      }
      const oneDecimalzdzz1 = (rule, value, callback) => {
        if (value == null && value == "" || value == undefined) {
          callback()
        } else {
          if (value >= 0 && value <= 10) {
            const that = this
            this.hosCjResultLesionsPOList.forEach(function (item) {
              if (item.item5 != null && item.item5 != '' && item.item5 != undefined)
                that.$set(item, ['item5'], (item.item5 * 1).toFixed(1))
            })
            callback();
          } else {
            callback(new Error('直径:(0.1-10)厘米'))
          }
        }
      }
      const ifneedothers = (rule, value, callback) => {
        if (this.formInline2['item38'] == '1' && (value == null || value == "" || value == undefined)) {
          callback(new Error('请输入'))
        } else {
          callback();
        }
      }
      const item35 = (rule, value, callback) => {
        if (value != null && value != "" || value == undefined) {
          if (value >= 0) {
            callback()
          } else {
            callback(new Error('请输入非负数!'))
          }
        } else {
          callback(new Error('请输入'))
        }
      }
      const item36 = (rule, value, callback) => {
        if (value.indexOf('1') > -1 && value.length > 1) {
          this.$set(this.formInline2, ['item36'], ['1'])
          this.$set(this.formInline2, ['item3631'], '')
          this.$set(this.formInline2, ['item3632'], '')
          this.$set(this.formInline2, ['item364Other'], '')
        }
        this.$refs.formvalidate3.validateField('item3631')
        this.$refs.formvalidate3.validateField('item3632')
        this.$refs.formvalidate3.validateField('item364Other')
        callback();
      }
      const item38 = (rule, value, callback) => {
        if (value == '1') {
          this.$refs.formvalidate3.validateField('item38Other')
        } else {
          this.$refs.formvalidate3_other.clearValidate()
        }
        callback();
      }
      const item3631 = (rule, value, callback) => {
        if (this.formInline2['item36'].indexOf('1') < 0 && this.formInline2['item36'].indexOf('3') >= 0 && (value == null || value == "" || value == undefined)) {
          callback(new Error('请输入'))
        } else {
          callback();
        }
      }
      const item3632 = (rule, value, callback) => {
        if (this.formInline2['item36'].indexOf('1') < 0 && this.formInline2['item36'].indexOf('3') >= 0 && (value == null || value == "" || value == undefined)) {
          callback(new Error('请输入'))
        } else {
          callback();
        }
      }
      const item364Other = (rule, value, callback) => {
        if (this.formInline2['item36'].indexOf('1') < 0 && this.formInline2['item36'].indexOf('4') >= 0 && (value == null || value == "" || value == undefined)) {
          callback(new Error('请输入'))
        } else {
          callback();
        }
      }
      var validateItem_3_7_a = (rule, value, callback) => {
        if (value && !(/^\+?[1-9][0-9]*$/.test(value))) {
          callback(new Error('请输入正整数'))
        } else if (value * 1 < 1 || value * 1 > 20) {
          callback(new Error('次数：1-20之间'));
        } else {
          callback();
        }
      };
      const item21A = (rule, value, callback) => {
        if (value != '1') {
          this.formInline['item21B'] = null
          this.formInline['item21C'] = null
          this.formInline['item21D'] = null
          this.formInline['item21E'] = null
        }
        callback();
      }
      const item_2_1_b_change = (rule, value, callback) => {
        if (this.formInline['item21A'] == '1') {
          if (!value || isNaN(value * 1) || value * 1 <= 0) {
            callback(new Error('请输入正数'))
          } else {
            callback();
          }
        } else {
          callback();
        }
      }
      const item_2_1_b_blur = (rule, value, callback) => {
        if (this.formInline['item21A'] == '1') {
          if (!value || isNaN(value * 1) || value * 1 <= 0) {
            callback(new Error('请输入正数'))
          } else {
            this.formInline['item21B'] = (value * 1).toFixed(1)
            callback();
          }
        } else {
          callback();
        }
      }
      const item21C = (rule, value, callback) => {
        if (this.formInline['item21A'] == '1') {
          if (value == null || value == '' || value == undefined || isNaN(value * 1) || ((value * 1) % 1 != 0) || value * 1 < 0 || value * 1 > 12) {
            callback(new Error('请输入0-12的整数'))
          } else {
            callback();
          }
        } else {
          callback();
        }
      }
      const item21D = (rule, value, callback) => {
        if (this.formInline['item21A'] == '1') {
          if (value == null || value == '' || value == undefined || isNaN(value * 1) || ((value * 1) % 1 != 0) || value * 1 < 0) {
            callback(new Error('请输入正整数'))
          } else {
            if (this.formInline['item21E'] && this.formInline['item21E'] < value) {
              callback(new Error('分子不能大于分母'))
            } else {
              callback();
            }
          }
        } else {
          callback();
        }
      }
      const item21E = (rule, value, callback) => {
        if (this.formInline['item21A'] == '1') {
          if (value == null || value == '' || value == undefined || isNaN(value * 1) || ((value * 1) % 1 != 0) || value * 1 < 0) {
            callback(new Error('请输入正整数'))
          } else {
            if (this.formInline['item21D'] && this.formInline['item21D'] > value) {
              callback(new Error('分母不能小于分子'))
            } else {
              callback();
            }
          }
        } else {
          callback();
        }
      }
      return {
        show: false,
        addconsopy:false,    //是添加还是录入肠镜结果
        item_2_1_a_show: false,   //int 有无肿块 默认隐藏
        report1_page: false,
        recordListShow: true,
        btnAuth: {},
        dialogImageUrl: '',   //图片弹窗url
        picVisible: false,    //查看大图
        fileList2: [],
        users: {
          idCard: '',
          userName: '',
          sex: '',
          age: '',
          sid:''
        },
        formInline: {
          id: null,
          // sid: 'TC10001',//受试者唯一标识值固定为TC0001
          todoId: '1', //待办id值固定为1
          colonoscopyRecordId: this.$route.query.id, //结肠镜检查记录 值固定为1
          surveyDate: new Date(),//检查日期
          item21: '',//参与者是否进行了直肠指诊，1：是，2：否
          item22: '',//参与者是否完成了结肠镜检查，1：是，2：否
          item21A: null,//int 有无肿块 1：有，2：无
          item21B: null,//double 肿块距肛cm
          item21C: null,//几点钟
          item21D: null,//占据肠腔 分子
          item21E: null,//占据肠腔 分母
        },
        formInline2: {
          item36: [],
          item37A: null
        },
        ShowData: {},
        formInline6: {},
        hosCjResultLesionsPOList: [{}],// 其他病变
        requireRule: {required: true, message: '请输入', trigger: 'change'},
        usersRules:{
           'sid': [
            {required: true, message: '请输入sid', trigger: 'blur'},
          ],
          'userName': [
            {required: true, message: '请输入姓名', trigger: 'blur'},
          ],
          'sex': [
            {required: true, message: '请填写性别', trigger: 'blur'},
          ],
          'age': [
            {required: true, message: '请输入年龄', trigger: 'blur'},
          ],
          'idCard': [
            {required: true, message: '请输入身份证号', trigger: 'blur'},
          ]
        },
        rules2: {
          'item31': [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          'item32': [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          'item21': [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          'item22': [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          'item21A': [
            {required: true, message: '请选择', trigger: 'change'},
            {message: '', trigger: 'change', validator: item21A}
          ],
          'item21B': [
            {message: '', trigger: 'change', validator: item_2_1_b_change},
            {message: '', trigger: 'blur', validator: item_2_1_b_blur}
          ],
          'item21C': [
            {message: '', trigger: 'change,blur', validator: item21C}
          ],
          'item21D': [
            {message: '', trigger: 'change,blur', validator: item21D}
          ],
          'item21E': [
            {message: '', trigger: 'change,blur', validator: item21E}
          ]
        },
        formvalidate3rules: {
          'item31': [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          'item32': [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          'item33': [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          'item34': [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          'item35': [
            {required: true, message: '请输入', trigger: 'change'},
            {message: '请输入非负数', trigger: 'change', validator: item35}
          ],
          'item37': [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          'item38': [
            {required: true, message: '请选择', trigger: 'change'},
//            { message: '', trigger: 'change', validator: item38}
          ],
          'item38Other': [
            {message: '请输入', trigger: 'change', validator: ifneedothers}
          ],
          'item36': [
            {required: true, message: '请选择', trigger: 'change'},
            {message: '', trigger: 'change', validator: item36}
          ],
          'item3631': [
            {message: '请输入', trigger: 'change', validator: item3631},
            {min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'change'}
          ],
          'item3632': [
            {message: '请输入', trigger: 'change', validator: item3632},
            {min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'change'}
          ],
          'item37A': [
            {required: true, message: '请输入', trigger: 'change'},
            // {validator:validateItem_3_7_a, message: '个数: 1 - 20 个', }
          ],
        },
        lesionsRecordRule: {
          'item1': [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          'item2': [
            {required: true, message: '请输入', trigger: 'change'},
            {message: '请输入非负数', trigger: 'blur', validator: oneDecimaljglm}
          ],
          'item3': [
            {required: true, message: '请输入', trigger: 'change'}
          ],
          'item4': [
            {required: false, message: '请输入', trigger: 'change'}
          ],
          'item5': [
            {required: true, message: '请输入', trigger: 'change'},
            {message: '直径(0.1-10)厘米', trigger: 'blur', validator: oneDecimalzdzz}
          ],
          'item6': [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          'item7': [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          'item8': [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          'item9': [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          'item10': [
            {required: true, message: '请选择', trigger: 'change'}
          ]
        },
        lesionsRecordFalseRule: {
          'item1': [
            {required: false, message: '请选择', trigger: 'change'}
          ],
          'item2': [
            {required: false, message: '请输入', trigger: 'change'},
            {message: '请输入非负数', trigger: 'blur', validator: oneDecimaljglm1}
          ],
          'item3': [
            {required: false, message: '请输入', trigger: 'change'}
          ],
          'item4': [
            {required: false, message: '请输入', trigger: 'change'}
          ],
          'item5': [
            {message: '直径(0.1-10)厘米', trigger: 'blur', validator: oneDecimalzdzz1}
          ],
          'item6': [
            {required: false, message: '请选择', trigger: 'change'}
          ],
          'item7': [
            {required: false, message: '请选择', trigger: 'change'}
          ],
          'item8': [
            {required: false, message: '请选择', trigger: 'change'}
          ],
          'item9': [
            {required: false, message: '请选择', trigger: 'change'}
          ],
          'item10': [
            {required: false, message: '请选择', trigger: 'change'}
          ]
        },
//        lesionsRecordRule: {
//
//        },
//        formvalidate4rules:{
//
//        },
        formvalidate4rules: {
          'otherLesions': [
            {required: true, message: '请输入', trigger: 'change'}
          ],
          'endoscopicDiagnosis': [
            {required: true, message: '请输入', trigger: 'change'}
          ],
          'diagnosisDoctor': [
            {required: true, message: '请输入', trigger: 'change'}
          ],
          'pathology': [
            {required: true, message: '请选择', trigger: 'change'}
          ]
        },
        uploadRecordIds:'',
        partmentoptions: [{
          value: '1',
          label: '回肠末端'
        }, {
          value: '2',
          label: '回盲瓣'
        }, {
          value: '3',
          label: '升结肠'
        }, {
          value: '4',
          label: '肝曲'
        }, {
          value: '5',
          label: '横结肠'
        }, {
          value: '6',
          label: '脾曲'
        }, {
          value: '7',
          label: '降结肠'
        }, {
          value: '8',
          label: '降乙交界'
        }, {
          value: '9',
          label: '乙状结肠'
        }, {
          value: '10',
          label: '直乙交界'
        }, {
          value: '11',
          label: '直肠'
        }]
      }
    },
    created() {
      let obj = this.checkPageAuth(this, "report1_page", this.btnAuth)
      this.formInline.id = this.$route.query.id
      this.show = this.$route.query.show
       if (this.$route.query.flag == 2 || this.$route.query.flag == 3) {
        //  录入 +  查看
         this.queryDetail();
         this.addconsopy=true;
       }else if(this.$route.query.flag == 1){
        //  新增
         this.addconsopy=false;
       }

      if (this.show) {
        this.queryInfo()
        this.rules2 = {}
        this.formvalidate3rules = {}
        this.lesionsRecordRule = {}
        this.formvalidate4rules = {}
      }
    },
    watch: {},
    methods: {
      getUrl(data){
        this.uploadRecordIds=data;
      },
      getUrl2(data){
        this.uploadRecordIds=data;
      },
      // 获取个人信息
      getInfo(){
        this.users.userName = ''
        this.users.sex = ''
        this.users.age = ''
        this.users.idCard = ''
        if(this.users.sid){
          $axios_http({
            url: '/fit/personInfo',
            data: {
              sid: this.users.sid
            },
            vueObj: this
          }).then((res) => {
            this.users.userName = res.data.result.userName
            this.users.sex = res.data.result.sex == 1 ? '男' : '女'
            this.users.age = res.data.result.age + '岁'
            this.users.idCard = res.data.result.idCard
            this.users.sid = res.data.result.sid
          })
        }
      },
      checkRecordList(){
        if (this.formInline2.item37 == "2" && this.formInline2.item38 == "2") {
          this.recordListShow = false;
          for (let i = 0; i < this.$refs.lesionsRecordForm.length; i++) {
            this.$refs.lesionsRecordForm[i].resetFields();
          }
          this.hosCjResultLesionsPOList = [{}];
        } else {
          this.recordListShow = true;
          for (let i = 0; i < this.$refs.lesionsRecordForm.length; i++) {
            this.$refs.lesionsRecordForm[i].resetFields();
          }
          this.hosCjResultLesionsPOList = [{}];
        }
      },
      changeRadio(){
        if (this.formInline.item21 == 1) {
          this.item_2_1_a_show = true
        } else {
          this.item_2_1_a_show = false
          this.formInline.item21A = null
        }
      },
      //查询user
      queryDetail(){
        $axios_http({
          url: '/fit/personInfo',
          data: {
            sid: this.$route.query.sid
          },
          vueObj: this
        }).then((res) => {
          this.users = res.data.result
          this.users.age = this.users.age + '岁'
          this.users.sex = this.users.sex == 1 ? '男' : '女'

        })
      },
      queryInfo(){
        $axios_http({
          url: '/hospital/colonoscopy/queryColonoscopyResultDetails',
          data: {
            id: this.formInline.id,
          },
          vueObj: this
        }).then((res) => {
          const dd = res.data.result
          this.ShowData = res.data.result
          this.formInline.surveyDate = dd.surveyDate
          this.formInline.item21 = dd.item21 + ''
          this.formInline.item22 = dd.item22 + ''
          this.formInline.item21A = dd.item21A + ''
          this.formInline.item21B = dd.item21B
          this.formInline.item21C = dd.item21C
          this.formInline.item21D = dd.item21D
          this.formInline.item21E = dd.item21E

          this.formInline2.item31 = dd.item31 + ''
          this.formInline2.item32 = dd.item32 + ''
          this.formInline2.item33 = dd.item33 + ''
          this.formInline2.item34 = dd.item34 + ''
          this.formInline2.item35 = dd.item35 + ''
          this.formInline2.item36 = []
          if (dd.item361 == '1') {
            this.formInline2.item36.push('1')
          }
          if (dd.item362 == '1') {
            this.formInline2.item36.push('2')
          }
          if (dd.item363 == '1') {
            this.formInline2.item36.push('3')
          }
          if (dd.item364 == '1') {
            this.formInline2.item36.push('4')
          }
          this.formInline2.item3631 = dd.item3631
          this.formInline2.item3632 = dd.item3632
          this.formInline2.item364Other = dd.item364Other
          this.formInline2.item37 = dd.item37 + ''
          this.formInline2.item37A = dd.item37A
          this.formInline2.item38 = dd.item38 + ''
          this.formInline2.item38Other = dd.item38Other

          this.formInline6.diagnosisDoctor = dd.diagnosisDoctor
          this.formInline6.endoscopicDiagnosis = dd.endoscopicDiagnosis
          this.formInline6.otherLesions = dd.otherLesions
          this.formInline6.pathology = dd.pathology + ''
          this.fileList = res.data.result.uploadIds.join(',')
          this.hosCjResultLesionsPOList = dd.hosCjResultLesionsPOList
          if (this.hosCjResultLesionsPOList.length) {
            this.hosCjResultLesionsPOList.forEach(function (item) {
              for (var i in item) {
                if (item[i]) {
                  item[i] = item[i] + ''
                } else {
                  item[i] = ''
                }
              }
            })
          }
        })
      },
      addbbFun(){// 添加病变部位//最多3个//对应数据：hosCjResultLesionsPOList
        if (this.hosCjResultLesionsPOList.length >= 3) {
          this.$alert('您最多可添加3个表格', '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
        } else {
          this.hosCjResultLesionsPOList.push({})
        }
      },
      removeOther(index){// 删除病变部位
        this.hosCjResultLesionsPOList.splice(index, 1)
      },
      clearFiled(type){ // 清空表单 type为空时清空所有
        if (!type) {
          this.$refs.formInline.resetFields() // 二、直肠指诊
          // this.$refs.formInline7.resetFields() // 是否做了病理:
          this.$set(this.formInline, ['surveyDate'], new Date()) // 重置日期
        }
        if (this.$refs.formInline4) {
          this.$refs.formInline4.resetFields() // 其它病变 内镜下诊断 诊断医生
        }
        // 三、肠镜检查结果
        this.formInline2 = {item36: []}
        if (this.$refs.formvalidate3) {
          this.$nextTick(function () { // 视图更新完成之后再移除校验
            this.$refs.formvalidate3.clearValidate()
          })
        }
        // 病变部位们 --直接用resetFields会导致单选不更新视图，所以单独清空数据和验证
        this.hosCjResultLesionsPOList = [{}]
        if (this.$refs.lesionsRecordForm && this.$refs.lesionsRecordForm.length) { // 病变部位们
          this.$refs.lesionsRecordForm.forEach(function (item) {
            item.clearValidate()
          })
        }
        this.formInline6.pathology = ''
      },
      submit(){ //提交
        const that = this

        // 验证form
        let validd = true
        this.$refs.usersRules.validate((valid) => {
          if (!valid) {
            validd = false
          }

        })
        this.$refs.formInline.validate((valid) => {
          if (!valid) {
            validd = false
          }
        })
        if (that.formInline.item22 == '1') {// 参与者完成了结肠镜检查
          this.$refs.formvalidate3.validate((valid) => {
            if (!valid) {
              validd = false
            }
          })
          this.$refs.formInline4.validate((valid) => {
            if (!valid) {
              validd = false
            }
          })
          if (this.$refs.lesionsRecordForm && this.$refs.lesionsRecordForm.length) {
            this.$refs.lesionsRecordForm.forEach(function (item) {
              item.validate((valid) => {
                if (!valid) {
                  validd = false
                }
              })
            })
          }
        } else {
          this.clearFiled(1) //不清空formInline
        }
        if (validd) {
          //给病变集合添加sid
          if (this.hosCjResultLesionsPOList.length) {
            this.hosCjResultLesionsPOList.forEach(function (item) {
              that.$set(item, ['sid'], that.formInline.sid)
            })
          }
          //设置数据
          let dd = JSON.parse(JSON.stringify(that.formInline)) //1,2
          if (dd.item21A == null) {
            delete dd.item21A
          }
          if (dd.item21B == null) {
            delete dd.item21B
          }
          if (dd.item21C == null) {
            delete dd.item21C
          }
          if (dd.item21D == null) {
            delete dd.item21D
          }
          if (dd.item21E == null) {
            delete dd.item21E
          }
          // dd.pathology = that.formInline7.pathology
          if (that.formInline.item22 == '1') {
            dd.hosCjResultLesionsPOList = JSON.parse(JSON.stringify(that.hosCjResultLesionsPOList))
            dd = Object.assign(dd, this.formInline2, this.formInline6) // 合并数据
            if (dd.item36.indexOf('1') >= 0) { // 参与者完成了结肠镜检查
              dd.item361 = 1
              dd.item362 = 2
              dd.item363 = 2
              dd.item364 = 2
              dd.item3631 = ''
              dd.item3632 = ''
              dd.item364Other = ''
            } else {
              dd.item361 = 2
              if (dd.item36.indexOf('2') >= 0) {
                dd.item362 = 1
              } else {
                dd.item362 = 2
              }
              if (dd.item36.indexOf('3') >= 0) {
                dd.item363 = 1
              } else {
                dd.item363 = 2
              }
              if (dd.item36.indexOf('4') >= 0) {
                dd.item364 = 1
              } else {
                dd.item364 = 2
              }
            }
            //删除没用的数据
            delete dd.item36
          }
          // 设置时间格式
          if (dd.surveyDate.indexOf('T') >= 0) {
            dd.surveyDate = dd.surveyDate.split('T')[0]
          }
          dd.sid = this.users.sid
          let _url='';
          if(this.$route.query.flag == 2){   //录入
            dd.hosCjRecordStatusId = this.$route.query.hosCjRecordStatusId;
            _url="/hospital/colonoscopy/colonoscopyResultEnter"
          }else{   //新增
            _url="/hospital/colonoscopy/addColonoscopyResult"
          }
            dd.uploadRecordIds=this.uploadRecordIds;
          $axios_http({
            url: _url,
            data: dd,
            vueObj: this
          }).then((res) => {
            $successMsg(this, "保存成功");
            if (this.formInline6.pathology == "1") {
              this.$confirm('<p>现在去填写《表B2-病理结果记录表》吗？</p>', '', {
                confirmButtonText: '是',
                cancelButtonText: '否',
                dangerouslyUseHTMLString: true,
                center: true
              }).then(() => {
                if(this.$route.query.flag == 2){
                  //显示操作成功浮动提示框
                  this.$router.replace({
                    path: '/form/report2',
                    query: {
                      sid: this.$route.query.sid,
                      resultId: res.data.result.hosCjResultId,
                      hosCjRecordStatusId: res.data.result.hosCjRecordStatusId,
                      flag: 1
                    }
                  });
                }else if(this.$route.query.flag == 1){
                  this.$router.replace({
                    path: '/form/report2',
                    query: {
                      sid: res.data.result.sid,
                      resultId: res.data.result.hosCjResultId,
                      hosCjRecordStatusId: res.data.result.hosCjRecordStatusId,
                      flag: 1
                    }
                  });
                }

                //清空数据
                //  this.clearFiled()
              }).catch(() => {
                this.$router.go(-1);
              });
            } else {
              //显示操作成功浮动提示框
              $successMsg(this, "保存成功");
              this.$router.replace('/enteroscopy/enteroscopy')
              // this.clearFiled();
            }
          })
        } else {
          return false;
        }

      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.picVisible = true;
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .text-right {
    text-align: right;
    margin-top: -20px
  }

  .text-center {
    text-align: center;
  }

  .j_content {
    padding: 10px;
    height: 100%;
    overflow: auto;
    background: #fff !important;
    width: 100%;
  }

  .btns {
    padding: 20px;
  }

  .btns .text {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    line-height: 1.5;
    margin: 0;
    padding: 0;
  }

  .formcon {
    margin: 0px 20px 20px;
    border: 1px solid rgb(204, 204, 204);
  }

  .formcon .title {
    font-size: 16px;
    text-align: center;
    line-height: 2;
    background: rgb(204, 204, 204);
    color: #000000;
  }

  .formcon .title.nobg {
    background: none;
  }

  .tables {
    margin: 40px 50px 30px 50px;
    font-size: 0;
    line-height: 0;
  }

  .formoneline {
    width: 100%;
    margin-right: 0 !important;
  }

  .formhalfline {
    width: 49%;
    margin-right: 0 !important;
  }

  .mb5 {
    margin-bottom: 8px;
  }

  .hosCjResultLesionsPOList {
    font-size: 20px;
    font-weight: bold;
    color: #3a8ee6;
  }

  .txsm {
    font-size: 14px;
    margin: 10px 50px;
  }

  .rightimg {
    position: absolute;
    right: -50px;
    top: -40px;
    border: 1px solid #000000;
    border-width: 0 0 1px 1px;
  }

  .forminline {
    display: inline-block;
    vertical-align: middle;
    margin-top: -5px;
  }
</style>
<style>
  .mt5input .el-radio-group {
    margin-top: 5px;
  }

  .zdysinput input {
    border-width: 0 0 1px 0;
    border-radius: 0;
  }

  .zdysinputsmall input {
    border-width: 0 0 1px 0;
    border-radius: 0;
    line-height: 30px;
    height: 30px;
  }

  .j_content .el-input-group__append {
    padding: 0 10px;
  }

  .j_content .el-form-item.is-error .el-input__inner, .j_content .el-form-item.is-error .el-input__inner:focus, .j_content .el-form-item.is-error .el-textarea__inner, .j_content .el-form-item.is-error .el-textarea__inner:focus, .j_content .el-message-box__input input.invalid, .j_content .el-message-box__input input.invalid:focus {
    border-color: #f56c6c !important;
  }

  .j_content .el-form-item__error {
    z-index: 9;
  }

  .j_content .el-radio__input.is-disabled.is-checked + span.el-radio__label {
    color: #409EFF;
  }

  .j_content .el-radio__input.is-disabled.is-checked .el-radio__inner {
    background-color: #409EFF;
    border-color: #409EFF;
  }

  .j_content .el-radio__input.is-disabled.is-checked .el-radio__inner::after {
    background-color: #f5f7fa;
  }

  .j_content .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    border-color: #dcdfe6;
    color: #606266;
    cursor: not-allowed;
  }

  .j_content .el-textarea.is-disabled .el-textarea__inner {
    background-color: #fff;
    border-color: #dcdfe6;
    color: #606266;
    cursor: not-allowed;
  }

  .j_content .el-checkbox__input.is-disabled.is-checked + span.el-checkbox__label {
    color: #409EFF;
    cursor: not-allowed;
  }

  .j_content .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background-color: #409EFF;
    border-color: #409EFF;
  }

  .j_content .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
    border-color: #fff;
  }

  .zdysinput.el-input.is-disabled .el-input__inner {
    background: transparent;
  }

  .gray {
    color: #c0c4cc;
  }

  .el-upload-list--picture-card .el-upload-list__item-status-label {
    display: none !important;
  }
</style>
