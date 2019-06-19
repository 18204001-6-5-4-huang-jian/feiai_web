<template>
  <div class="content-page" v-if="personalInformation_page">
    <div>
      <el-button :size="$store.state.style.assemblyModel" class="return-home" @click="goBack()">返 回</el-button>
      <!--<el-button :size="$store.state.style.assemblyModel" class="return-home" @click="printContent()">打印</el-button>-->
    </div>
    <div ref="print">
      <h3>危险因素调查表</h3>
      <el-row>
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="140px">
          <el-col :span="24">
            <el-form-item label="1. 姓名：" prop="name">
              <el-input v-model="form.name" style="width: 220px;" ref="name" :size="$store.state.style.assemblyModel" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="2. 性别：" prop="sex">
              <el-input v-model="form.sex" auto-complete="off" :size="$store.state.style.assemblyModel" style="width: 40px;" ref="sex"
                        disabled></el-input>
              <span>1. 男  2. 女</span>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="3. 身份证号：" prop="idCard">
              <el-input v-model="form.idCard" auto-complete="off" :size="$store.state.style.assemblyModel" style="width: 220px;" ref="idCard"
                        disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="4. 本人电话：" prop="phone">
              <el-input v-model="form.phone" auto-complete="off" ref="phone" :size="$store.state.style.assemblyModel" style="width: 220px;"
                        :disabled="disabledState"
              ></el-input>
              （手机,必填）
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="" prop="contact_area" style="display: inline-block;">
              <el-input v-model="form.contact_area" auto-complete="off" ref="contact_area" :size="$store.state.style.assemblyModel"
                        @change="getTelphone" style="width: 70px;" :disabled="disabledState"
              ></el-input>
            </el-form-item>
            -
            <el-form-item label="" labelWidth="=10px" prop="contact_telephone" style="display: inline-block;">
              <el-input v-model="form.contact_telephone" ref="contact_telephone" auto-complete="off" :size="$store.state.style.assemblyModel"
                        @change="getTelphone" style="width: 136px" :disabled="disabledState"
              ></el-input>
              （固定电话,尽量填）
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="5. 联系人电话（固定电话、手机至少填一项）:" label-width="340px">(
              <el-form-item label="与本人关系:" label-width="108px" prop="contactRelationship" style="display: inline-block;">
                <el-input v-model="form.contactRelationship" ref="contactRelationship" auto-complete="off" :size="$store.state.style.assemblyModel"
                          style="width: 100px;" :disabled="disabledState"
                ></el-input>
              </el-form-item>
              )
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="手机：" prop="contactPhone">
              <el-input v-model="form.contactPhone" auto-complete="off" ref="contactPhone" :size="$store.state.style.assemblyModel"
                        style="width: 220px;" :disabled="disabledState"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="固定电话：" prop="contact_area_other" style="display: inline-block;">
              <el-input v-model="form.contact_area_other" auto-complete="off" ref="contact_area_other" :size="$store.state.style.assemblyModel"
                        @change="getContactTelephone" style="width: 70px;" :disabled="disabledState"
              ></el-input>
            </el-form-item>
            -
            <el-form-item label="" prop="contact_phone_other" style="display: inline-block;" labelWidth="10">
              <el-input v-model="form.contact_phone_other" ref="contact_phone_other" auto-complete="off" :size="$store.state.style.assemblyModel"
                        @change="getContactTelephone" style="width: 136px" :disabled="disabledState"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="6. 常住地址：" required>
              <el-form-item label=""  style="display: inline-block"  prop="address">
                <el-cascader
                  :options="$store.state.cityInfo"
                  v-model="form.address"
                  :props="props"
                  clearable
                  ref="address"
                  :size="$store.state.style.assemblyModel"
                >
                </el-cascader>
              </el-form-item>
              <el-form-item label="" prop="address1" style="display: inline-block">
                <el-input v-model="form.address1" auto-complete="off" ref="address1" :size="$store.state.style.assemblyModel" style="width: 350px;"
                          :disabled="disabledState"
                ></el-input>
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="7. 问卷填写人：" prop="fillInPerson">
              <el-input v-model="form.fillInPerson" auto-complete="off" ref="fillInPerson" :size="$store.state.style.assemblyModel"
                        style="width: 40px;" @blur="fillInPersonChange"
                        :disabled="disabledState"
              ></el-input>
              <div>
                <span>1. 本人</span> <span class="fillInPerson-other">2.他人（请注明与您的关系）
              <span>
                 <el-form-item label="" prop="fillInRelationship" style="display: inline-block;margin-left: 20px;"
                               v-if="form.fillInPerson == 2">
                   <el-input v-model="form.fillInRelationship" auto-complete="off" ref="fillInRelationship" :size="$store.state.style.assemblyModel"
                             style="width: 200px;"
                             :disabled="disabledState"></el-input>
                 </el-form-item>
              </span>
              <span>
                 <el-form-item label="" style="display: inline-block;margin-left: 20px;" v-if="form.fillInPerson != 2">
                  <el-input v-model="form.fillInRelationship" auto-complete="off" ref="fillInRelationship" :size="$store.state.style.assemblyModel"
                            style="width: 200px;"
                            disabled></el-input>
                 </el-form-item>
              </span>
            </span>
              </div>
            </el-form-item>
          </el-col>
          <el-col>
            <div class="formcon">
              <div class="title">
                A. 基本信息
              </div>
              <el-col :span="24">
                <el-form-item
                  label="1." labelWidth="80px" required>
                  <el-col :span="20">
                    <div style="width:800px;">您受过的<u style="font-weight: 600">最高</u>教育？</div>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="" label-width="" prop="education" class="formItemWidth"
                                  style="display: inline-block;">
                      <el-input v-model="form.education" auto-complete="off" :size="$store.state.style.assemblyModel" ref="education" :disabled="disabledState"
                                style="width: 40px;" @blur="educationChange()"
                                :maxlength='1' class="form-item"></el-input>
                    </el-form-item>
                  </el-col>
                  <div class="radio-div">
                    <ul>
                      <li class="radio-li">1. 未受过教育</li>
                      <li class="radio-li">2. 小学</li>
                      <li class="radio-li">3. 初中</li>
                      <li class="radio-li">4. 高中/中专/技校</li>
                      <li class="radio-li">5. 大专</li>
                      <li class="radio-li">6. 大学本科</li>
                      <li class="radio-li">7. 研究生及以上</li>
                      <li class="radio-li">8. 其他</li>
                    </ul>
                    <span>
                        <el-form-item label="" style="display: inline-block;margin-left: 20px;"
                                      v-if="form.education != 8">
                          <el-input v-model="form.educationOther" auto-complete="off" ref="educationOther" :size="$store.state.style.assemblyModel"
                                    style="width: 200px;"
                                    disabled></el-input>
                        </el-form-item>
                    </span>
                    <span>
                        <el-form-item label="" prop="educationOther" style="display: inline-block;margin-left: 20px;"
                                      v-if="form.education == 8">
                           <el-input v-model="form.educationOther" auto-complete="off" ref="educationOther" :size="$store.state.style.assemblyModel"
                                     style="width: 200px;" :disabled="disabledState"></el-input>
                        </el-form-item>
                    </span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="2." labelWidth="80px" required>
                  <el-col :span="20">
                    <div style="width:800px;">您的婚姻状况？</div>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="" label-width="" prop="marriage" class="formItemWidth"
                                  style="display: inline-block;">
                      <el-input v-model="form.marriage" auto-complete="off" :size="$store.state.style.assemblyModel" ref="marriage"
                                style="width: 40px;" @blur="marriageChange()" :disabled="disabledState"
                                :maxlength='1' class="form-item"></el-input>
                    </el-form-item>
                  </el-col>
                  <div class="radio-div">
                    <ul class="clear">
                      <li class="radio-li">1. 未婚</li>
                      <li class="radio-li">2. 初婚</li>
                      <li class="radio-li">3. 再婚</li>
                      <li class="radio-li">4. 离婚</li>
                      <li class="radio-li">5. 丧偶</li>
                      <li class="radio-li">6. 分居</li>
                      <li class="radio-li">7.未婚同居</li>
                    </ul>
                    <div class="marriage-other"
                         v-if="form.marriage == 2 || form.marriage == 3 || form.marriage == 4 || form.marriage ==5 || form.marriage == 6">
                      <span>
                        您初次结婚的年龄
                      </span>
                      <span>
                          <el-form-item label="" prop="firstMarriageAge"
                                        style="display: inline-block;margin-left: 20px;">
                             <el-input v-model="form.firstMarriageAge" auto-complete="off" ref="firstMarriageAge"
                                       :size="$store.state.style.assemblyModel" style="width: 100px;" :disabled="disabledState"></el-input> 岁
                          </el-form-item>
                      </span>

                    </div>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="3." labelWidth="80px" required>
                  <div style="display: inline-block;"> 身高（厘米）：</div>
                  <el-form-item label="" label-width="" prop="height" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.height" auto-complete="off" :size="$store.state.style.assemblyModel" ref="height" style="width: 100px;"
                              :disabled="disabledState"
                              :maxlength='3' class="form-item"></el-input>
                  </el-form-item>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  label="4." labelWidth="80px" required>
                  <div style="display: inline-block;float: left;"> 体重（公斤）：</div>
                  <ul class="weight-ul">
                    <li class="weight-ul-title">现在</li>
                    <li>
                      <el-form-item label="" label-width="" prop="weightNow" class="formItemWidth"
                                    style="display: inline-block;">
                        <el-input v-model="form.weightNow" auto-complete="off" :size="$store.state.style.assemblyModel" ref="weightNow"
                                  style="width: 100px;" :disabled="disabledState"
                                  :maxlength='3' class="form-item"></el-input>
                      </el-form-item>
                    </li>
                  </ul>
                  <ul class="weight-ul">
                    <li class="weight-ul-title">一年前</li>
                    <li>
                      <el-form-item label="" label-width="" prop="weightAYearAgo" class="formItemWidth"
                                    style="display: inline-block;">
                        <el-input v-model="form.weightAYearAgo" auto-complete="off" :size="$store.state.style.assemblyModel" ref="weightAYearAgo"
                                  style="width: 100px;" :disabled="disabledState"
                                  :maxlength='3' class="form-item"></el-input>
                      </el-form-item>
                    </li>
                  </ul>
                  <ul class="weight-ul">
                    <li class="weight-ul-title">五年前</li>
                    <li>
                      <el-form-item label="" label-width="" prop="weightFiveYearAgo" class="formItemWidth"
                                    style="display: inline-block;">
                        <el-input v-model="form.weightFiveYearAgo" auto-complete="off" :size="$store.state.style.assemblyModel" ref="weightFiveYearAgo"
                                  style="width: 100px;" :disabled="disabledState"
                                  :maxlength='3' class="form-item"></el-input>
                      </el-form-item>
                    </li>
                  </ul>
                  <ul class="weight-ul">
                    <li class="weight-ul-title">18岁时（成人时）</li>
                    <li>
                      <el-form-item label="" label-width="" prop="weightEighteenYearsOld" class="formItemWidth"
                                    style="display: inline-block;">
                        <el-input v-model="form.weightEighteenYearsOld" auto-complete="off" :size="$store.state.style.assemblyModel"
                                  ref="weightEighteenYearsOld" style="width: 100px;" :disabled="disabledState"
                                  :maxlength='3' class="form-item"></el-input>
                      </el-form-item>
                    </li>
                  </ul>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="5." labelWidth="80px" required>
                  <div style="display: inline-block;"> 腰围（厘米）：</div>
                  <el-form-item label="" label-width="" prop="waistline" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.waistline" auto-complete="off" :size="$store.state.style.assemblyModel" ref="waistline"
                              style="width: 100px;" :disabled="disabledState"
                              :maxlength='3' class="form-item"></el-input>
                  </el-form-item>
                  <br>
                  <div style="display: inline-block;margin-top: 20px;"> 臀围（厘米）：</div>
                  <el-form-item label="" label-width="" prop="hipline" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.hipline" auto-complete="off" :size="$store.state.style.assemblyModel" ref="hipline" style="width: 100px;"
                              :disabled="disabledState"
                              :maxlength='3' class="form-item"></el-input>
                  </el-form-item>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="6." labelWidth="80px" required>
                  <el-col :span="20">
                    <div style="width:800px;">您最近一次检测的空腹血糖值是：</div>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="" label-width="" prop="item061" class="formItemWidth"
                                  style="display: inline-block;">
                      <el-input v-model="form.item061" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item061" style="width: 40px;"
                                @blur="item061Change()" :disabled="disabledState"
                                :maxlength='1' class="form-item"></el-input>
                    </el-form-item>
                  </el-col>
                  <div>
                    <ul class="clear">
                      <li class="radio-li">1. 已测
                        <span>
                    <el-form-item label="" prop="item0611" style="display: inline-block;margin-left: 20px;"
                                  v-if="form.item061 == 1">
                      <el-input v-model="form.item0611" auto-complete="off" ref="item0611" :size="$store.state.style.assemblyModel"
                                style="width: 100px;" :maxlength='2' :disabled="disabledState"></el-input> mmol/L
                    </el-form-item>
                  </span>
                        <span>
                    <el-form-item label="" prop="" style="display: inline-block;margin-left: 20px;"
                                  v-if="form.item061 != 1">
                      <el-input v-model="form.item0611" auto-complete="off" ref="item0611" :size="$store.state.style.assemblyModel"
                                style="width: 100px;" disabled></el-input> mmol/L
                    </el-form-item>
                  </span>
                      </li>
                      <li class="radio-li">2. 未测</li>
                      <li class="radio-li">3. 不清楚</li>
                    </ul>
                  </div>
                  <el-col :span="20">
                    <div style="width:800px;margin-top: 10px;">您最近一次检测的餐后2小时血糖值是：</div>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="" label-width="" prop="item062" class="formItemWidth"
                                  style="display: inline-block;">
                      <el-input v-model="form.item062" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item062" style="width: 40px;"
                                @blur="item062Change()" :disabled="disabledState"
                                :maxlength='1' class="form-item"></el-input>
                    </el-form-item>
                  </el-col>
                  <div>
                    <ul class="clear">
                      <li class="radio-li">1. 已测
                        <span>
                    <el-form-item label="" prop="item0621" style="display: inline-block;margin-left: 20px;"
                                  v-if="form.item062 == 1">
                      <el-input v-model="form.item0621" auto-complete="off" ref="item0621" :size="$store.state.style.assemblyModel"
                                style="width: 100px;" :maxlength='2' :disabled="disabledState"></el-input> mmol/L
                    </el-form-item>
                  </span>
                        <span>
                    <el-form-item label="" prop="" style="display: inline-block;margin-left: 20px;"
                                  v-if="form.item062 != 1">
                      <el-input v-model="form.item0621" auto-complete="off" ref="item0621" :size="$store.state.style.assemblyModel"
                                style="width: 100px;" disabled></el-input> mmol/L
                    </el-form-item>
                  </span>
                      </li>
                      <li class="radio-li">2. 未测</li>
                      <li class="radio-li">3. 不清楚</li>
                    </ul>
                  </div>
                </el-form-item>
              </el-col>
            </div>
          </el-col>
          <el-col>
            <div class="formcon">
              <div class="title">
                B. 工作经历
              </div>
              <el-col :span="24">
                <el-form-item
                  label="7." labelWidth="80px" required>
                  <el-col :span="20">
                    <div style="width:800px;">您的职业？</div>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="" label-width="" prop="item07" class="formItemWidth"
                                  style="display: inline-block;">
                      <el-input v-model="form.item07" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item07" style="width: 40px;"
                                @blur="item07Change()"
                                :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                    </el-form-item>
                  </el-col>
                  <div class="radio-div">
                    <ul>
                      <li class="radio-li">1. 专业技术人员</li>
                      <li class="radio-li">2. 国家机关和企业事业单位负责人</li>
                      <li class="radio-li">3. 职员</li>
                      <li class="radio-li">4. 商人</li>
                      <li class="radio-li">5. 农民</li>
                      <li class="radio-li">6. 工人</li>
                      <li class="radio-li">7. 服务性工作人员</li>
                      <li class="radio-li">8. 家务</li>
                      <li class="radio-li">9. 其他</li>
                    </ul>
                    <span>
                        <el-form-item label="" style="display: inline-block;margin-left: 20px;" v-if="form.item07 != 9">
                          <el-input v-model="form.item071" auto-complete="off" ref="item071" :size="$store.state.style.assemblyModel"
                                    style="width: 200px;"
                                    disabled></el-input>
                        </el-form-item>
                    </span>
                    <span>
                        <el-form-item label="" prop="item071" style="display: inline-block;margin-left: 20px;"
                                      v-if="form.item07 == 9">
                           <el-input v-model="form.item071" auto-complete="off" ref="item071" :size="$store.state.style.assemblyModel"
                                     style="width: 200px;" :disabled="disabledState"></el-input>
                        </el-form-item>
                    </span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  label="8." labelWidth="80px" required>
                  <el-col :span="20">
                    <div style="width:800px;">您是否在以下行业/职业工作 <u style="font-weight: 600">12 个月</u>或<u
                      style="font-weight: 600">更多</u>？
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="" label-width="" prop="item08" class="formItemWidth"
                                  style="display: inline-block;">
                      <el-input v-model="form.item08" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item08" style="width: 40px;"
                                @blur="item08Change()"
                                :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                    </el-form-item>
                  </el-col>
                  <div>
                    <ul class="clear">
                      <li class="radio-li">0. 否</li>
                      <li class="radio-li">1. 是</li>
                    </ul>
                    <br>
                    <table class="radio-div-table">
                      <tr>
                        <td>石棉</td>
                        <td>棉麻加工</td>
                        <td>采矿</td>
                      </tr>
                      <tr>
                        <td>烘焙</td>
                        <td>农业</td>
                        <td>涂装</td>
                      </tr>
                      <tr>
                        <td>屠宰或肉类包装</td>
                        <td>消防</td>
                        <td>喷砂</td>
                      </tr>
                      <tr>
                        <td>化学品或塑料制造</td>
                        <td>面粉/饲料/粮食加工</td>
                        <td>焊接</td>
                      </tr>
                      <tr>
                        <td>钢铁铸造</td>
                        <td>建筑业</td>
                        <td>放射性</td>
                      </tr>
                      <tr>
                        <td>橡胶</td>
                        <td>铍、铀、氡等</td>
                        <td>农药</td>
                      </tr>
                    </table>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-if="form.item08 == 1">
                <el-form-item
                  label="9." labelWidth="80px" required>
                  <div style="width:800px;">请填写相对应的信息</div>
                  <div>
                    <table class="item08-table">
                      <thead>
                      <th>行业/职业</th>
                      <th>工作<u style="font-weight: 600">12个月</u>或<u style="font-weight: 600">更多</u><br>（0=否，1=是）</th>
                      <th>累计工作年限</th>
                      <th>工作时是否经常采取防护措施？（如：戴面具或穿防护服）<br>（0=否，1=是）</th>
                      </thead>
                      <tr>
                        <td class="td1">石棉</td>
                        <td class="td2">
                          <el-form-item label="" label-width="" prop="item0911" class="formItemWidth"
                                        style="display: inline-block;" :inline-message="true">
                            <el-input v-model="form.item0911" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0911" :disabled="disabledState"
                                      style="width: 40px;" @blur="itemChange('item0911','item0912','item0913')"
                                      :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </td>
                        <td class="td3">
                        <span>
                          <el-form-item label="" label-width="" prop="item0912" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0911 == 1" :inline-message="true">
                            <el-input v-model="form.item0912" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0912" :disabled="disabledState"
                                      style="width: 60px;"
                                      :maxlength='3' class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0911 != 1">
                            <el-input v-model="form.item0912" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0912"
                                      style="width: 60px;" disabled
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                        </td>
                        <td class="td4">
                        <span>
                          <el-form-item label="" label-width="" prop="item0913" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0911 == 1" :inline-message="true">
                            <el-input v-model="form.item0913" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0913" :disabled="disabledState"
                                      style="width: 40px;" @blur="item425('item0913')"
                                      :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0911 != 1">
                            <el-input v-model="form.item0913" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0913"
                                      style="width: 40px;" disabled
                                      class="form-item"></el-input>
                          </el-form-item>
                        </span>
                        </td>
                      </tr>
                      <tr>
                        <td class="td1">烘焙</td>
                        <td class="td2">
                          <el-form-item label="" label-width="" prop="item0921" class="formItemWidth"
                                        style="display: inline-block;" :inline-message="true">
                            <el-input v-model="form.item0921" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0921"
                                      style="width: 40px;" @blur="itemChange('item0921','item0922','item0923')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </td>
                        <td class="td3">
                        <span>
                          <el-form-item label="" label-width="" prop="item0922" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0921 == 1" :inline-message="true">
                            <el-input v-model="form.item0922" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0922"
                                      style="width: 60px;"
                                      :disabled="disabledState" :maxlength='3'
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0921 != 1">
                            <el-input v-model="form.item0922" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0922"
                                      style="width: 60px;" disabled
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                        </td>
                        <td class="td4">
                        <span>
                          <el-form-item label="" label-width="" prop="item0923" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0921 == 1" :inline-message="true">
                            <el-input v-model="form.item0923" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0923"
                                      style="width: 40px;" @blur="item425('item0923')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0921 != 1">
                            <el-input v-model="form.item0923" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0913"
                                      style="width: 40px;" disabled
                                      class="form-item"></el-input>
                          </el-form-item>
                        </span>
                        </td>
                      </tr>
                      <tr>
                        <td class="td1">屠宰或肉类包装</td>
                        <td class="td2">
                          <el-form-item label="" label-width="" prop="item0931" class="formItemWidth"
                                        style="display: inline-block;" :inline-message="true">
                            <el-input v-model="form.item0931" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0931"
                                      style="width: 40px;" @blur="itemChange('item0931','item0932','item0933')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </td>
                        <td class="td3">
                        <span>
                          <el-form-item label="" label-width="" prop="item0932" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0931 == 1" :inline-message="true">
                            <el-input v-model="form.item0932" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0932"
                                      style="width: 60px;"
                                      :disabled="disabledState" :maxlength='3'
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0931 != 1">
                            <el-input v-model="form.item0932" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0932"
                                      style="width: 60px;" disabled
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                        </td>
                        <td class="td4">
                        <span>
                          <el-form-item label="" label-width="" prop="item0933" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0931 == 1" :inline-message="true">
                            <el-input v-model="form.item0933" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0933"
                                      style="width: 40px;" @blur="item425('item0933')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0931 != 1">
                            <el-input v-model="form.item0933" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0933"
                                      style="width: 40px;" disabled
                                      class="form-item"></el-input>
                          </el-form-item>
                        </span>
                        </td>
                      </tr>
                      <tr>
                        <td class="td1">化学品或塑料制造</td>
                        <td class="td2">
                          <el-form-item label="" label-width="" prop="item0941" class="formItemWidth"
                                        style="display: inline-block;" :inline-message="true">
                            <el-input v-model="form.item0941" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0941"
                                      style="width: 40px;" @blur="itemChange('item0941','item0942','item0943')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </td>
                        <td class="td3">
                        <span>
                          <el-form-item label="" label-width="" prop="item0942" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0941 == 1" :inline-message="true">
                            <el-input v-model="form.item0942" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0942"
                                      style="width: 60px;"
                                      :disabled="disabledState" :maxlength='3'
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0941 != 1">
                            <el-input v-model="form.item0942" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0942"
                                      style="width: 60px;" disabled
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                        </td>
                        <td class="td4">
                        <span>
                          <el-form-item label="" label-width="" prop="item0943" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0941 == 1" :inline-message="true">
                            <el-input v-model="form.item0943" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0943"
                                      style="width: 40px;" @blur="item425('item0943')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0941 != 1">
                            <el-input v-model="form.item0943" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0943"
                                      style="width: 40px;" disabled
                                      class="form-item"></el-input>
                          </el-form-item>
                        </span>
                        </td>
                      </tr>
                      <tr>
                        <td class="td1">采矿：煤矿/</td>
                        <td class="td2">
                          <el-form-item label="" label-width="" prop="item0951" class="formItemWidth"
                                        style="display: inline-block;" :inline-message="true">
                            <el-input v-model="form.item0951" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0951"
                                      style="width: 40px;" @blur="itemChange('item0951','item0952','item0953')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </td>
                        <td class="td3">
                        <span>
                          <el-form-item label="" label-width="" prop="item0952" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0951 == 1" :inline-message="true">
                            <el-input v-model="form.item0952" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0952"
                                      style="width: 60px;"
                                      :disabled="disabledState" :maxlength='3'
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0951 != 1">
                            <el-input v-model="form.item0952" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0952"
                                      style="width: 60px;" disabled
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                        </td>
                        <td class="td4">
                        <span>
                          <el-form-item label="" label-width="" prop="item0953" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0951 == 1" :inline-message="true">
                            <el-input v-model="form.item0953" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0953"
                                      style="width: 40px;" @blur="item425('item0953')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0951 != 1">
                            <el-input v-model="form.item0953" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0953"
                                      style="width: 40px;" disabled
                                      class="form-item"></el-input>
                          </el-form-item>
                        </span>
                        </td>
                      </tr>
                      <tr>
                        <td class="td1"><span style="margin-left: 40px;">矽矿</span></td>
                        <td class="td2">
                          <el-form-item label="" label-width="" prop="item0961" class="formItemWidth"
                                        style="display: inline-block;" :inline-message="true">
                            <el-input v-model="form.item0961" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0961"
                                      style="width: 40px;" @blur="itemChange('item0961','item0962','item0963')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </td>
                        <td class="td3">
                        <span>
                          <el-form-item label="" label-width="" prop="item0962" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0961 == 1" :inline-message="true">
                            <el-input v-model="form.item0962" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0962"
                                      style="width: 60px;"
                                      :disabled="disabledState" :maxlength='3'
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0961 != 1">
                            <el-input v-model="form.item0962" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0962"
                                      style="width: 60px;" disabled
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                        </td>
                        <td class="td4">
                        <span>
                          <el-form-item label="" label-width="" prop="item0963" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0961 == 1" :inline-message="true">
                            <el-input v-model="form.item0963" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0963"
                                      style="width: 40px;" @blur="item425('item0963')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0961 != 1">
                            <el-input v-model="form.item0963" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0963"
                                      style="width: 40px;" disabled
                                      class="form-item"></el-input>
                          </el-form-item>
                        </span>
                        </td>
                      </tr>
                      <tr>
                        <td class="td1">
                          其他
                          <span>
                         <el-form-item label="" label-width="" prop="item0970" class="formItemWidth"
                                       style="display: inline-block;" :inline-message="true" v-if="form.item0971 == 1">
                              <el-input v-model="form.item0970" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0970"
                                        style="width: 80px;" :disabled="disabledState"
                                        class="form-item"></el-input>
                          </el-form-item>
                        </span>
                          <span>
                         <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                       style="display: inline-block;" v-if="form.item0971 != 1">
                              <el-input v-model="form.item0970" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0972"
                                        style="width: 80px;" disabled
                                        class="form-item"></el-input>
                          </el-form-item>
                        </span>
                        </td>
                        <td class="td2">
                          <el-form-item label="" label-width="" prop="item0971" class="formItemWidth"
                                        style="display: inline-block;" :inline-message="true">
                            <el-input v-model="form.item0971" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0971"
                                      style="width: 40px;" @blur="itemChange('item0971','item0972','item0973','item0970')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </td>
                        <td class="td3">
                        <span>
                          <el-form-item label="" label-width="" prop="item0972" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0971 == 1" :inline-message="true">
                            <el-input v-model="form.item0972" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0972"
                                      style="width: 60px;"
                                      :disabled="disabledState" :maxlength='3'
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0971 != 1">
                            <el-input v-model="form.item0972" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0972"
                                      style="width: 60px;" disabled
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                        </td>
                        <td class="td4">
                        <span>
                          <el-form-item label="" label-width="" prop="item0973" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0971 == 1" :inline-message="true">
                            <el-input v-model="form.item0973" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0963"
                                      style="width: 40px;" @blur="item425('item0973')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0971 != 1">
                            <el-input v-model="form.item0973" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0973"
                                      style="width: 40px;" disabled
                                      class="form-item"></el-input>
                          </el-form-item>
                        </span>
                        </td>
                      </tr>
                      <tr>
                        <td class="td1"><span style="margin-left: 40px;">棉麻加工</span></td>
                        <td class="td2">
                          <el-form-item label="" label-width="" prop="item0981" class="formItemWidth"
                                        style="display: inline-block;" :inline-message="true">
                            <el-input v-model="form.item0981" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0981"
                                      style="width: 40px;" @blur="itemChange('item0981','item0982','item0983')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </td>
                        <td class="td3">
                        <span>
                          <el-form-item label="" label-width="" prop="item0982" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0981 == 1" :inline-message="true">
                            <el-input v-model="form.item0982" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0982"
                                      style="width: 60px;"
                                      :disabled="disabledState" :maxlength='3'
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0981 != 1">
                            <el-input v-model="form.item0982" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0982"
                                      style="width: 60px;" disabled
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                        </td>
                        <td class="td4">
                        <span>
                          <el-form-item label="" label-width="" prop="item0983" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0981 == 1" :inline-message="true">
                            <el-input v-model="form.item0983" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0983"
                                      style="width: 40px;" @blur="item425('item0983')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0981 != 1">
                            <el-input v-model="form.item0983" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0983"
                                      style="width: 40px;" disabled
                                      class="form-item"></el-input>
                          </el-form-item>
                        </span>
                        </td>
                      </tr>
                      <tr>
                        <td class="td1"><span style="margin-left: 40px;">农业</span></td>
                        <td class="td2">
                          <el-form-item label="" label-width="" prop="item0991" class="formItemWidth"
                                        style="display: inline-block;" :inline-message="true">
                            <el-input v-model="form.item0991" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0991"
                                      style="width: 40px;" @blur="itemChange('item0991','item0992','item0993')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </td>
                        <td class="td3">
                        <span>
                          <el-form-item label="" label-width="" prop="item0992" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0991 == 1" :inline-message="true">
                            <el-input v-model="form.item0992" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0992"
                                      style="width: 60px;"
                                      :disabled="disabledState" :maxlength='3'
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0991 != 1">
                            <el-input v-model="form.item0992" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0992"
                                      style="width: 60px;" disabled
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                        </td>
                        <td class="td4">
                        <span>
                          <el-form-item label="" label-width="" prop="item0993" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0991 == 1" :inline-message="true">
                            <el-input v-model="form.item0993" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0993"
                                      style="width: 40px;" @blur="item425('item0993')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item0991 != 1">
                            <el-input v-model="form.item0993" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item0993"
                                      style="width: 40px;" disabled
                                      class="form-item"></el-input>
                          </el-form-item>
                        </span>
                        </td>
                      </tr>
                      <tr>
                        <td class="td1"><span style="margin-left: 40px;">消防</span></td>
                        <td class="td2">
                          <el-form-item label="" label-width="" prop="item09101" class="formItemWidth"
                                        style="display: inline-block;" :inline-message="true">
                            <el-input v-model="form.item09101" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09101"
                                      style="width: 40px;" @blur="itemChange('item09101','item09102','item09103')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </td>
                        <td class="td3">
                        <span>
                          <el-form-item label="" label-width="" prop="item09102" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09101 == 1"
                                        :inline-message="true">
                            <el-input v-model="form.item09102" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09102"
                                      style="width: 60px;"
                                      :disabled="disabledState" :maxlength='3'
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09101 != 1">
                            <el-input v-model="form.item09102" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09102"
                                      style="width: 60px;" disabled
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                        </td>
                        <td class="td4">
                        <span>
                          <el-form-item label="" label-width="" prop="item09103" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09101 == 1"
                                        :inline-message="true">
                            <el-input v-model="form.item09103" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09103"
                                      style="width: 40px;" @blur="item425('item09103')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09101 != 1">
                            <el-input v-model="form.item09103" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09103"
                                      style="width: 40px;" disabled
                                      class="form-item"></el-input>
                          </el-form-item>
                        </span>
                        </td>
                      </tr>
                      <tr>
                        <td class="td1"><span style="margin-left: 40px;">面粉/饲料/粮食加工</span></td>
                        <td class="td2">
                          <el-form-item label="" label-width="" prop="item09111" class="formItemWidth"
                                        style="display: inline-block;" :inline-message="true">
                            <el-input v-model="form.item09111" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09111"
                                      style="width: 40px;" @blur="itemChange('item09111','item09112','item09113')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </td>
                        <td class="td3">
                        <span>
                          <el-form-item label="" label-width="" prop="item09112" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09111 == 1"
                                        :inline-message="true">
                            <el-input v-model="form.item09112" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09112"
                                      style="width: 60px;"
                                      :disabled="disabledState" :maxlength='3'
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09111 != 1">
                            <el-input v-model="form.item09112" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09112"
                                      style="width: 60px;" disabled
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                        </td>
                        <td class="td4">
                        <span>
                          <el-form-item label="" label-width="" prop="item09113" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09111 == 1"
                                        :inline-message="true">
                            <el-input v-model="form.item09113" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09113"
                                      style="width: 40px;" @blur="item425('item09113')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09111 != 1">
                            <el-input v-model="form.item09113" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09113"
                                      style="width: 40px;" disabled
                                      class="form-item"></el-input>
                          </el-form-item>
                        </span>
                        </td>
                      </tr>
                      <tr>
                        <td class="td1"><span style="margin-left: 40px;">钢铁铸造</span></td>
                        <td class="td2">
                          <el-form-item label="" label-width="" prop="item09121" class="formItemWidth"
                                        style="display: inline-block;" :inline-message="true">
                            <el-input v-model="form.item09121" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09121"
                                      style="width: 40px;" @blur="itemChange('item09121','item09122','item09123')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </td>
                        <td class="td3">
                        <span>
                          <el-form-item label="" label-width="" prop="item09122" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09121 == 1"
                                        :inline-message="true">
                            <el-input v-model="form.item09122" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09122"
                                      style="width: 60px;"
                                      :disabled="disabledState" :maxlength='3'
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09121 != 1">
                            <el-input v-model="form.item09122" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09122"
                                      style="width: 60px;" disabled
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                        </td>
                        <td class="td4">
                        <span>
                          <el-form-item label="" label-width="" prop="item09123" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09121 == 1"
                                        :inline-message="true">
                            <el-input v-model="form.item09123" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09123"
                                      style="width: 40px;" @blur="item425('item09123')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09121 != 1">
                            <el-input v-model="form.item09123" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09123"
                                      style="width: 40px;" disabled
                                      class="form-item"></el-input>
                          </el-form-item>
                        </span>
                        </td>
                      </tr>
                      <tr>
                        <td class="td1"><span style="margin-left: 40px;">涂装（油漆）</span></td>
                        <td class="td2">
                          <el-form-item label="" label-width="" prop="item09131" class="formItemWidth"
                                        style="display: inline-block;" :inline-message="true">
                            <el-input v-model="form.item09131" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09131"
                                      style="width: 40px;" @blur="itemChange('item09131','item09132','item09133')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </td>
                        <td class="td3">
                        <span>
                          <el-form-item label="" label-width="" prop="item09132" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09131 == 1"
                                        :inline-message="true">
                            <el-input v-model="form.item09132" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09132"
                                      style="width: 60px;"
                                      :disabled="disabledState" :maxlength='3'
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09131 != 1">
                            <el-input v-model="form.item09132" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09132"
                                      style="width: 60px;" disabled
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                        </td>
                        <td class="td4">
                        <span>
                          <el-form-item label="" label-width="" prop="item09133" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09131 == 1"
                                        :inline-message="true">
                            <el-input v-model="form.item09133" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09133"
                                      style="width: 40px;" @blur="item425('item09133')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09131 != 1">
                            <el-input v-model="form.item09133" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09133"
                                      style="width: 40px;" disabled
                                      class="form-item"></el-input>
                          </el-form-item>
                        </span>
                        </td>
                      </tr>
                      <tr>
                        <td class="td1"><span style="margin-left: 40px;">喷砂</span></td>
                        <td class="td2">
                          <el-form-item label="" label-width="" prop="item09141" class="formItemWidth"
                                        style="display: inline-block;" :inline-message="true">
                            <el-input v-model="form.item09141" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09141"
                                      style="width: 40px;" @blur="itemChange('item09141','item09142','item09143')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </td>
                        <td class="td3">
                        <span>
                          <el-form-item label="" label-width="" prop="item09142" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09141 == 1"
                                        :inline-message="true">
                            <el-input v-model="form.item09142" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09142"
                                      style="width: 60px;"
                                      :disabled="disabledState" :maxlength='3'
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09141 != 1">
                            <el-input v-model="form.item09142" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09142"
                                      style="width: 60px;" disabled
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                        </td>
                        <td class="td4">
                        <span>
                          <el-form-item label="" label-width="" prop="item09143" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09141 == 1"
                                        :inline-message="true">
                            <el-input v-model="form.item09143" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09143"
                                      style="width: 40px;" @blur="item425('item09143')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09141 != 1">
                            <el-input v-model="form.item09143" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09143"
                                      style="width: 40px;" disabled
                                      class="form-item"></el-input>
                          </el-form-item>
                        </span>
                        </td>
                      </tr>
                      <tr>
                        <td class="td1"><span style="margin-left: 40px;">焊接</span></td>
                        <td class="td2">
                          <el-form-item label="" label-width="" prop="item09151" class="formItemWidth"
                                        style="display: inline-block;" :inline-message="true">
                            <el-input v-model="form.item09151" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09151"
                                      style="width: 40px;" @blur="itemChange('item09151','item09152','item09153')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </td>
                        <td class="td3">
                        <span>
                          <el-form-item label="" label-width="" prop="item09152" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09151 == 1"
                                        :inline-message="true">
                            <el-input v-model="form.item09152" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09152"
                                      style="width: 60px;"
                                      :disabled="disabledState" :maxlength='3'
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09151 != 1">
                            <el-input v-model="form.item09152" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09152"
                                      style="width: 60px;" disabled
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                        </td>
                        <td class="td4">
                        <span>
                          <el-form-item label="" label-width="" prop="item09153" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09151 == 1"
                                        :inline-message="true">
                            <el-input v-model="form.item09153" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09153"
                                      style="width: 40px;" @blur="item425('item09153')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09151 != 1">
                            <el-input v-model="form.item09153" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09153"
                                      style="width: 40px;" disabled
                                      class="form-item"></el-input>
                          </el-form-item>
                        </span>
                        </td>
                      </tr>
                      <tr>
                        <td class="td1"><span style="margin-left: 40px;">建筑</span></td>
                        <td class="td2">
                          <el-form-item label="" label-width="" prop="item09161" class="formItemWidth"
                                        style="display: inline-block;" :inline-message="true">
                            <el-input v-model="form.item09161" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09161"
                                      style="width: 40px;" @blur="itemChange('item09161','item09162','item09163')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </td>
                        <td class="td3">
                        <span>
                          <el-form-item label="" label-width="" prop="item09162" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09161 == 1"
                                        :inline-message="true">
                            <el-input v-model="form.item09162" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09162"
                                      style="width: 60px;"
                                      :disabled="disabledState" :maxlength='3'
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09161 != 1">
                            <el-input v-model="form.item09162" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09162"
                                      style="width: 60px;" disabled
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                        </td>
                        <td class="td4">
                        <span>
                          <el-form-item label="" label-width="" prop="item09163" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09161 == 1"
                                        :inline-message="true">
                            <el-input v-model="form.item09163" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09163"
                                      style="width: 40px;" @blur="item425('item09163')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09161 != 1">
                            <el-input v-model="form.item09163" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09163"
                                      style="width: 40px;" disabled
                                      class="form-item"></el-input>
                          </el-form-item>
                        </span>
                        </td>
                      </tr>
                      <tr>
                        <td class="td1"><span style="margin-left: 40px;">放射性</span></td>
                        <td class="td2">
                          <el-form-item label="" label-width="" prop="item09171" class="formItemWidth"
                                        style="display: inline-block;" :inline-message="true">
                            <el-input v-model="form.item09171" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09171"
                                      style="width: 40px;" @blur="itemChange('item09171','item09172','item09173')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </td>
                        <td class="td3">
                        <span>
                          <el-form-item label="" label-width="" prop="item09172" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09171 == 1"
                                        :inline-message="true">
                            <el-input v-model="form.item09172" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09172"
                                      style="width: 60px;"
                                      :disabled="disabledState" :maxlength='3'
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09171 != 1">
                            <el-input v-model="form.item09172" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09172"
                                      style="width: 60px;" disabled
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                        </td>
                        <td class="td4">
                        <span>
                          <el-form-item label="" label-width="" prop="item09173" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09171 == 1"
                                        :inline-message="true">
                            <el-input v-model="form.item09173" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09173"
                                      style="width: 40px;" @blur="item425('item09173')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09171 != 1">
                            <el-input v-model="form.item09173" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09173"
                                      style="width: 40px;" disabled
                                      class="form-item"></el-input>
                          </el-form-item>
                        </span>
                        </td>
                      </tr>
                      <tr>
                        <td class="td1"><span style="margin-left: 40px;">橡胶</span></td>
                        <td class="td2">
                          <el-form-item label="" label-width="" prop="item09181" class="formItemWidth"
                                        style="display: inline-block;" :inline-message="true">
                            <el-input v-model="form.item09181" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09181"
                                      style="width: 40px;" @blur="itemChange('item09181','item09182','item09183')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </td>
                        <td class="td3">
                        <span>
                          <el-form-item label="" label-width="" prop="item09182" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09181 == 1"
                                        :inline-message="true">
                            <el-input v-model="form.item09182" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09182"
                                      style="width: 60px;"
                                      :disabled="disabledState" :maxlength='3'
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09181 != 1">
                            <el-input v-model="form.item09182" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09182"
                                      style="width: 60px;" disabled
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                        </td>
                        <td class="td4">
                        <span>
                          <el-form-item label="" label-width="" prop="item09183" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09181 == 1"
                                        :inline-message="true">
                            <el-input v-model="form.item09183" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09183"
                                      style="width: 40px;" @blur="item425('item09183')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09181 != 1">
                            <el-input v-model="form.item09183" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09183"
                                      style="width: 40px;" disabled
                                      class="form-item"></el-input>
                          </el-form-item>
                        </span>
                        </td>
                      </tr>
                      <tr>
                        <td class="td1"><span style="margin-left: 40px;">铍、铀、氡等</span></td>
                        <td class="td2">
                          <el-form-item label="" label-width="" prop="item09191" class="formItemWidth"
                                        style="display: inline-block;" :inline-message="true">
                            <el-input v-model="form.item09191" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09191"
                                      style="width: 40px;" @blur="itemChange('item09191','item09192','item09193')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </td>
                        <td class="td3">
                        <span>
                          <el-form-item label="" label-width="" prop="item09192" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09191 == 1"
                                        :inline-message="true">
                            <el-input v-model="form.item09192" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09192"
                                      style="width: 60px;"
                                      :disabled="disabledState" :maxlength='3'
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09191 != 1">
                            <el-input v-model="form.item09192" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09192"
                                      style="width: 60px;" disabled
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                        </td>
                        <td class="td4">
                        <span>
                          <el-form-item label="" label-width="" prop="item09193" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09191 == 1"
                                        :inline-message="true">
                            <el-input v-model="form.item09193" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09193"
                                      style="width: 40px;" @blur="item425('item09193')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09191 != 1">
                            <el-input v-model="form.item09193" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09193"
                                      style="width: 40px;" disabled
                                      class="form-item"></el-input>
                          </el-form-item>
                        </span>
                        </td>
                      </tr>
                      <tr>
                        <td class="td1"><span style="margin-left: 40px;">农药</span></td>
                        <td class="td2">
                          <el-form-item label="" label-width="" prop="item09201" class="formItemWidth"
                                        style="display: inline-block;" :inline-message="true">
                            <el-input v-model="form.item09201" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09201"
                                      style="width: 40px;" @blur="itemChange('item09201','item09202','item09203')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </td>
                        <td class="td3">
                        <span>
                          <el-form-item label="" label-width="" prop="item09202" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09201 == 1"
                                        :inline-message="true">
                            <el-input v-model="form.item09202" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09202"
                                      style="width: 60px;"
                                      :disabled="disabledState" :maxlength='3'
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09201 != 1">
                            <el-input v-model="form.item09202" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09202"
                                      style="width: 60px;" disabled
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                        </td>
                        <td class="td4">
                        <span>
                          <el-form-item label="" label-width="" prop="item09203" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09201 == 1"
                                        :inline-message="true">
                            <el-input v-model="form.item09203" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09203"
                                      style="width: 40px;" @blur="item425('item09203')"
                                      :disabled="disabledState" :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </span>
                          <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item09201 != 1">
                            <el-input v-model="form.item09203" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item09203"
                                      style="width: 40px;" disabled
                                      class="form-item"></el-input>
                          </el-form-item>
                        </span>
                        </td>
                      </tr>
                    </table>
                  </div>
                </el-form-item>
              </el-col>
            </div>
          </el-col>
          <el-col>
            <div class="formcon">
              <div class="title">
                C. 吸烟史
              </div>
              <el-col>
                <el-form-item label="10." labelWidth="80px" required>
                  <el-col :span="20">
                    <div class="grid-content bg-purple">
                      <p class="option-p"> 您是否吸烟？（每周吸一支以上并连续或累计6个月以上者定义为吸烟）<br> 0. 否，从不吸； 1. 是，目前仍在吸； 2. 以前吸，目前已戒烟</p>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="grid-content bg-purple-light">
                      <el-form-item class="content-padding">
                        <el-input v-model.trim="form.item10" auto-complete="off" :size="$store.state.style.assemblyModel" disabled style="width:60px"
                                  class="smallInput"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-form-item>
              </el-col>
              <template v-if="form.item10 == 1 || form.item10 == 2">
                <el-col>
                  <el-form-item label="11." labelWidth="80px" required>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p"> 您从多少岁开始吸烟？</p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding">
                          <el-input v-model.trim="form.item11" auto-complete="off" :size="$store.state.style.assemblyModel" disabled style="width:60px"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="12." labelWidth="80px" required>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p"> 您近一年的吸烟频率？  <br> 1 每天； 2. 有时； 3. 不再吸烟</p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding">
                          <el-input v-model.trim="form.item12" auto-complete="off" :size="$store.state.style.assemblyModel" disabled style="width:60px"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="13." labelWidth="80px" required>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p"> 如果您目前已戒烟，这次戒烟已持续多少年？（不足一年用小数表示）？</p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding">
                          <el-input v-model.trim="form.item13" auto-complete="off" :size="$store.state.style.assemblyModel" disabled style="width:60px"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="14." labelWidth="80px" required>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p"> 如果您仍在吸烟或曾吸烟，扣除戒烟年数，共吸烟多少年？（不足一年用小数表示） ？</p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding">
                          <el-input v-model.trim="form.item14" auto-complete="off" :size="$store.state.style.assemblyModel" disabled style="width:60px"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="15." labelWidth="80px" required>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p"> 如果您仍在吸烟或曾吸烟，平均每天吸烟多少支（1 两烟叶≈50 支卷烟） ？</p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding">
                          <el-input v-model.trim="form.item15" auto-complete="off" :size="$store.state.style.assemblyModel" disabled style="width:60px"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col v-if="form.item10 == 2">
                  <el-form-item label="16." labelWidth="80px" required>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p"> 如果您仍在吸烟或曾吸烟，平均每天吸烟多少包 ？</p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding">
                          <el-input v-model.trim="form.item16" auto-complete="off" :size="$store.state.style.assemblyModel" disabled style="width:60px"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="17." labelWidth="80px" required>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p"> 吸烟包年数是多少？</p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding">
                          <el-input v-model.trim="form.item17" auto-complete="off" :size="$store.state.style.assemblyModel" disabled style="width:60px"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-form-item>
                </el-col>
              </template>

            </div>
          </el-col>
          <el-col>
            <div class="formcon">
              <div class="title">
                D. 被动吸烟史
              </div>
              <el-col>
                <el-form-item label="18." labelWidth="80px" required>
                  <el-col :span="20">
                    <div class="grid-content bg-purple">
                      <p class="option-p"> 您是否（正在/曾经）和吸烟者一同居住？ <br> <span style="margin-left:40px">0. 否</span> <span
                        style="margin-left: 40px;">1. 是</span></p>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="grid-content bg-purple-light">
                      <el-form-item class="content-padding" prop="item18">
                        <el-input v-model.trim="form.item18" auto-complete="off" :size="$store.state.style.assemblyModel" :disabled="disabledState"
                                  style="width:40px" @blur="item425('item18')" ref="item18"
                                  :maxlength='1' class="smallInput"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="19." labelWidth="80px" required>
                  <el-col :span="20">
                    <div class="grid-content bg-purple">
                      <p class="option-p"> 您的工作场所是否（正在/曾经）有人经常吸烟？  <br> <span style="margin-left:40px">0. 否</span> <span
                        style="margin-left: 40px;">1. 是</span></p>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="grid-content bg-purple-light">
                      <el-form-item class="content-padding" prop="item19">
                        <el-input v-model.trim="form.item19" auto-complete="off" :size="$store.state.style.assemblyModel" :disabled="disabledState"
                                  style="width:40px" ref="item19" @blur="item425('item19')"
                                  :maxlength='1' class="smallInput"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col v-if="form.item19 == 1">
                <el-form-item label="" labelWidth="80px">
                  <div style="width:800px;">请回答：您累计被动吸烟多少年？ 每天大约多少支二手烟会影响到您？</div>
                  <table class="item08-table">
                    <thead>
                    <th>关系</th>
                    <th>是否吸烟<br>（0=否，1=是）</th>
                    <th>被动吸烟</th>
                    </thead>
                    <tr>
                      <td class="td1">伴侣</td>
                      <td class="td2">
                        <el-form-item label="" label-width="" prop="item1911" class="formItemWidth"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item1911" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item1911" :disabled="disabledState"
                                    style="width: 40px;" @blur="itemChange('item1911','item1912','item1913')"
                                    :maxlength='1' class="form-item"></el-input>
                        </el-form-item>
                      </td>
                      <td class="smoke-td3">
                        被动吸烟：
                        <span>
                          <el-form-item label="" label-width="" prop="item1912" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item1911 == 1" :inline-message="true">
                            <el-input v-model="form.item1912" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item1912" :disabled="disabledState"
                                      style="width: 60px;"
                                      :maxlength='3' class="form-item"></el-input> <span>年（必填）</span>
                          </el-form-item>
                        </span>
                        <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item1911 != 1">
                            <el-input v-model="form.item1912" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item1912"
                                      style="width: 60px;" disabled
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                        <span style="margin-left: 40px;">
                          <el-form-item label="" label-width="" prop="item1913" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item1911 == 1" :inline-message="true">
                            <el-input v-model="form.item1913" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item1913" :disabled="disabledState"
                                      style="width: 60px;"
                                      :maxlength='3' class="form-item"></el-input> <span>支（尽量填）</span>
                          </el-form-item>
                        </span>
                        <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item1911 != 1">
                            <el-input v-model="form.item1913" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item1913"
                                      style="width: 60px;" disabled
                                      class="form-item"></el-input> <span>支</span>
                          </el-form-item>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="td1">子女</td>
                      <td class="td2">
                        <el-form-item label="" label-width="" prop="item1921" class="formItemWidth"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item1921" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item1921" :disabled="disabledState"
                                    style="width: 40px;" @blur="itemChange('item1921','item1922','item1923')"
                                    :maxlength='1' class="form-item"></el-input>
                        </el-form-item>
                      </td>
                      <td class="smoke-td3">
                        被动吸烟：
                        <span>
                          <el-form-item label="" label-width="" prop="item1922" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item1921 == 1" :inline-message="true">
                            <el-input v-model="form.item1922" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item1922" :disabled="disabledState"
                                      style="width: 60px;"
                                      :maxlength='3' class="form-item"></el-input> <span>年（必填）</span>
                          </el-form-item>
                        </span>
                        <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item1921 != 1">
                            <el-input v-model="form.item1922" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item1922"
                                      style="width: 60px;" disabled
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                        <span style="margin-left: 40px;">
                          <el-form-item label="" label-width="" prop="item1923" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item1921 == 1" :inline-message="true">
                            <el-input v-model="form.item1923" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item1923" :disabled="disabledState"
                                      style="width: 60px;"
                                      :maxlength='3' class="form-item"></el-input> <span>支（尽量填）</span>
                          </el-form-item>
                        </span>
                        <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item1921 != 1">
                            <el-input v-model="form.item1923" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item1923"
                                      style="width: 60px;" disabled
                                      class="form-item"></el-input> <span>支</span>
                          </el-form-item>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="td1">父母</td>
                      <td class="td2">
                        <el-form-item label="" label-width="" prop="item1931" class="formItemWidth"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item1931" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item1931" :disabled="disabledState"
                                    style="width: 40px;" @blur="itemChange('item1931','item1932','item1933')"
                                    :maxlength='1' class="form-item"></el-input>
                        </el-form-item>
                      </td>
                      <td class="smoke-td3">
                        被动吸烟：
                        <span>
                          <el-form-item label="" label-width="" prop="item1932" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item1931 == 1" :inline-message="true">
                            <el-input v-model="form.item1932" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item1932" :disabled="disabledState"
                                      style="width: 60px;"
                                      :maxlength='3' class="form-item"></el-input> <span>年（必填）</span>
                          </el-form-item>
                        </span>
                        <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item1931 != 1">
                            <el-input v-model="form.item1932" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item1932"
                                      style="width: 60px;" disabled
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                        <span style="margin-left: 40px;">
                          <el-form-item label="" label-width="" prop="item1933" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item1931 == 1" :inline-message="true">
                            <el-input v-model="form.item1933" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item1933" :disabled="disabledState"
                                      style="width: 60px;"
                                      :maxlength='3' class="form-item"></el-input> <span>支（尽量填）</span>
                          </el-form-item>
                        </span>
                        <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item1931 != 1">
                            <el-input v-model="form.item1933" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item1933"
                                      style="width: 60px;" disabled
                                      class="form-item"></el-input> <span>支</span>
                          </el-form-item>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="td1">工作同事（吸烟最多的）</td>
                      <td class="td2">
                        <el-form-item label="" label-width="" prop="item1941" class="formItemWidth"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item1941" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item1941" :disabled="disabledState"
                                    style="width: 40px;" @blur="itemChange('item1941','item1942','item1943')"
                                    :maxlength='1' class="form-item"></el-input>
                        </el-form-item>
                      </td>
                      <td class="smoke-td3">
                        被动吸烟：
                        <span>
                          <el-form-item label="" label-width="" prop="item1942" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item1941 == 1" :inline-message="true">
                            <el-input v-model="form.item1942" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item1942" :disabled="disabledState"
                                      style="width: 60px;"
                                      :maxlength='3' class="form-item"></el-input> <span>年（必填）</span>
                          </el-form-item>
                        </span>
                        <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item1941 != 1">
                            <el-input v-model="form.item1942" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item1942"
                                      style="width: 60px;" disabled
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                        <span style="margin-left: 40px;">
                          <el-form-item label="" label-width="" prop="item1943" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item1941 == 1" :inline-message="true">
                            <el-input v-model="form.item1943" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item1942" :disabled="disabledState"
                                      style="width: 60px;"
                                      :maxlength='3' class="form-item"></el-input> <span>支（尽量填）</span>
                          </el-form-item>
                        </span>
                        <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item1941 != 1">
                            <el-input v-model="form.item1943" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item1943"
                                      style="width: 60px;" disabled
                                      class="form-item"></el-input> <span>支</span>
                          </el-form-item>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="td1">
                        其他
                        <span>
                          <el-form-item label="" label-width="" prop="item1950" class="formItemWidth"
                                        style="display: inline-block;" :inline-message="true" v-if="form.item1951 == 1">
                            <el-input v-model="form.item1950" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item1950" :disabled="disabledState"
                                      style="width: 80px;"
                                      class="form-item"></el-input>
                          </el-form-item>
                      </span>
                        <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" :inline-message="true" v-if="form.item1951 != 1">
                            <el-input v-model="form.item1950" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item1950"
                                      style="width: 80px;" disabled
                                      class="form-item"></el-input>
                          </el-form-item>
                      </span>
                      </td>
                      <td class="td2">
                        <el-form-item label="" label-width="" prop="item1951" class="formItemWidth"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item1951" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item1951" :disabled="disabledState"
                                    style="width: 40px;" @blur="itemChange('item1951','item1952','item1953','item1950')"
                                    :maxlength='1' class="form-item"></el-input>
                        </el-form-item>
                      </td>
                      <td class="smoke-td3">
                        被动吸烟：
                        <span>
                          <el-form-item label="" label-width="" prop="item1952" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item1951 == 1" :inline-message="true">
                            <el-input v-model="form.item1952" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item1952" :disabled="disabledState"
                                      style="width: 60px;"
                                      :maxlength='3' class="form-item"></el-input> <span>年（必填）</span>
                          </el-form-item>
                        </span>
                        <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item1951 != 1">
                            <el-input v-model="form.item1952" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item1952"
                                      style="width: 60px;" disabled
                                      class="form-item"></el-input> <span>年</span>
                          </el-form-item>
                        </span>
                        <span style="margin-left: 40px;">
                          <el-form-item label="" label-width="" prop="item1953" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item1951 == 1" :inline-message="true">
                            <el-input v-model="form.item1953" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item1953" :disabled="disabledState"
                                      style="width: 60px;"
                                      :maxlength='3' class="form-item"></el-input> <span>支（尽量填）</span>
                          </el-form-item>
                        </span>
                        <span>
                          <el-form-item label="" label-width="" prop="" class="formItemWidth"
                                        style="display: inline-block;" v-if="form.item1951 != 1">
                            <el-input v-model="form.item1953" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item1953"
                                      style="width: 60px;" disabled
                                      class="form-item"></el-input> <span>支</span>
                          </el-form-item>
                        </span>
                      </td>
                    </tr>
                  </table>
                </el-form-item>
              </el-col>
            </div>
          </el-col>
          <el-col>
            <div class="formcon">
              <div class="title">
                E. 饮酒史
              </div>
              <el-col>
                <el-form-item label="20." labelWidth="80px" required>
                  <el-col :span="20">
                    <div class="grid-content bg-purple">
                      <p class="option-p"> 您是否<u style="font-weight: 600;">经常</u>饮酒？<br>
                        0. 否，从不饮； 1. 是，目前仍经常饮； 2. 以前是，目前已戒酒</p>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="grid-content bg-purple-light">
                      <el-form-item class="content-padding" prop="item20">
                        <el-input v-model.trim="form.item20" auto-complete="off" :size="$store.state.style.assemblyModel" disabled style="width:40px"
                                  ref="item20" :disabled="disabledState" @blur="item3Clear('item20')"
                                  class="smallInput"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col v-if="form.item20 == 2">
                <el-form-item label="21." labelWidth="80px" required>
                  <el-col :span="20">
                    <div class="grid-content bg-purple">
                      <p class="option-p"> 如果您目前已戒酒，这次戒酒已持续多少年？（不足一年按一年计）</p>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="grid-content bg-purple-light">
                      <el-form-item class="content-padding" prop="item21">
                        <el-input v-model.trim="form.item21" auto-complete="off" :size="$store.state.style.assemblyModel" disabled style="width:60px"
                                  ref="item21" :disabled="disabledState"
                                  class="smallInput"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col v-if="form.item20 != 0">
                <el-form-item label="22." labelWidth="80px" required>
                  <el-col :span="20">
                    <div class="grid-content bg-purple">
                      <p class="option-p"> 您<u style="font-weight: 600;">经常</u>饮酒的种类是什么？<br> 1. 红酒； 2. 白酒； 3. 啤酒 4. 黄酒</p>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="grid-content bg-purple-light">
                      <el-form-item class="content-padding" prop="item22">
                        <el-input v-model.trim="form.item22" auto-complete="off" :size="$store.state.style.assemblyModel" disabled style="width:40px"
                                  ref="item22" :disabled="disabledState" @blur="item4Clear('item22')"
                                  class="smallInput"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col v-if="form.item20 != 0">
                <el-form-item label="23." labelWidth="80px" required>
                  <el-col :span="20">
                    <div class="grid-content bg-purple">
                      <p class="option-p"> 您多久会喝一次酒？<br> 1. 每月1次或更少； 2. 每月2-4次； 3. 每周2-3次 4. 每周4次或更多</p>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="grid-content bg-purple-light">
                      <el-form-item class="content-padding" prop="item23">
                        <el-input v-model.trim="form.item23" auto-complete="off" :size="$store.state.style.assemblyModel" disabled style="width:40px"
                                  ref="item23" :disabled="disabledState" @blur="item4Clear('item23')"
                                  class="smallInput"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col v-if="form.item20 != 0">
                <el-form-item label="24." labelWidth="80px" required>
                  <el-col :span="20">
                    <div class="grid-content bg-purple">
                      <p class="option-p"> 通常状况下，您平均一天饮酒的总量为多少单位（一单位=一听啤酒（330ml）/一杯葡萄酒（150ml）/一两白酒）<br>
                        1. <=1；&nbsp;&nbsp; 2. 2-3；&nbsp;&nbsp; 3. 4；&nbsp;&nbsp; 4. 5-7；&nbsp;&nbsp; 5. >=8</p>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="grid-content bg-purple-light">
                      <el-form-item class="content-padding" prop="item24">
                        <el-input v-model.trim="form.item24" auto-complete="off" :size="$store.state.style.assemblyModel" disabled style="width:40px"
                                  ref="item24" :disabled="disabledState" @blur="item5Clear('item24')"
                                  class="smallInput"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-form-item>
              </el-col>
            </div>
          </el-col>
          <el-col>
            <div class="formcon">
              <div class="title">
                F. 饮食
              </div>
              <el-col>
                <el-form-item label="25." labelWidth="80px" required>
                  <p class="option-p"> 在<u style="font-weight: 600;">过去12个月</u>中，对以下食物您的食用频率及平均摄入量如何？<br> <span
                    class="span-weight"> （注：可从家庭总量除以人口数计算出个人平均量）</span></p>
                  <el-col>
                    <table class="item25-table">
                      <thead>
                      <th>过去12个月</th>
                      <th>食用频率（请用对应数字填写下表）<br>1. >1次/天；  2. 1次/天； 3. >1次/周； 4. 1次/周； 5. ≈1次/月； 6. 从不吃 </th>
                      <th>平均摄入量（请用对应数字填写下表）</th>
                      </thead>
                      <tr>
                        <td class="item25-table-td1">肉类（猪、牛、羊肉等）</td>
                        <td class="item25-table-td2">
                          <el-form-item label="" label-width="" prop="item2511" class="formItemWidth"
                                        style="display: inline-block;" :inline-message="true">
                            <el-input v-model="form.item2511" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item2511"
                                      style="width: 40px;" :disabled="disabledState" @blur="item25Change('item2511','item2512')"
                                      :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </td>
                        <td class="item25-table-td3">
                          <el-col :span="12">
                            <ul>
                              <li>
                                0. 从不吃
                              </li>
                              <li class="clear">
                                <div class="item25-table-fl item25-table-div1">
                                  1. ≤7 两/周
                                </div>
                                <div class="item25-table-fl ">
                                  <el-form-item label="" label-width="" prop="item2512" class="formItemWidth"
                                                style="display: inline-block;" :inline-message="true">
                                    <el-input v-model="form.item2512" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item2512"
                                              style="width: 40px;" :disabled="disabledState"
                                              @blur="item3Clear('item2512')"
                                              :maxlength='1' class="form-item"></el-input>
                                  </el-form-item>
                                </div>
                              </li>
                              <li>
                                2. >7两/周
                              </li>
                            </ul>
                          </el-col>
                        </td>
                      </tr>
                      <tr>
                        <td class="item25-table-td1">鱼/禽肉（鸡、鸭、鹅肉等）</td>
                        <td class="item25-table-td2">
                          <el-form-item label="" label-width="" prop="item2521" class="formItemWidth"
                                        style="display: inline-block;" :inline-message="true">
                            <el-input v-model="form.item2521" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item2521"
                                      style="width: 40px;" :disabled="disabledState" @blur="item25Change('item2521','item2522')"
                                      :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </td>
                        <td class="item25-table-td3">
                          <el-col :span="12">
                            <ul>
                              <li>
                                0. 从不吃
                              </li>
                              <li class="clear">
                                <div class="item25-table-fl item25-table-div1">
                                  1. ≤7 两/周
                                </div>
                                <div class="item25-table-fl ">
                                  <el-form-item label="" label-width="" prop="item2522" class="formItemWidth"
                                                style="display: inline-block;" :inline-message="true">
                                    <el-input v-model="form.item2522" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item2522"
                                              style="width: 40px;" :disabled="disabledState"
                                              @blur="item3Clear('item2522')"
                                              :maxlength='1' class="form-item"></el-input>
                                  </el-form-item>
                                </div>
                              </li>
                              <li>
                                2. >7两/周
                              </li>
                            </ul>
                          </el-col>
                        </td>
                      </tr>
                      <tr>
                        <td class="item25-table-td1">蛋类（鸡蛋、鸭蛋等）</td>
                        <td class="item25-table-td2">
                          <el-form-item label="" label-width="" prop="item2531" class="formItemWidth"
                                        style="display: inline-block;" :inline-message="true">
                            <el-input v-model="form.item2531" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item2531"
                                      style="width: 40px;" :disabled="disabledState" @blur="item25Change('item2531','item2532')"
                                      :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </td>
                        <td class="item25-table-td3">
                          <el-col :span="12">
                            <ul>
                              <li>
                                0. 从不吃
                              </li>
                              <li class="clear">
                                <div class="item25-table-fl item25-table-div1">
                                  1. ≤7 两/周
                                </div>
                                <div class="item25-table-fl ">
                                  <el-form-item label="" label-width="" prop="item2532" class="formItemWidth"
                                                style="display: inline-block;" :inline-message="true">
                                    <el-input v-model="form.item2532" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item2532"
                                              style="width: 40px;" :disabled="disabledState"
                                              @blur="item3Clear('item2532')"
                                              :maxlength='1' class="form-item"></el-input>
                                  </el-form-item>
                                </div>
                              </li>
                              <li>
                                2. >7两/周
                              </li>
                            </ul>
                          </el-col>
                        </td>
                      </tr>
                      <tr>
                        <td class="item25-table-td1">奶类（牛奶、羊奶）</td>
                        <td class="item25-table-td2">
                          <el-form-item label="" label-width="" prop="item2541" class="formItemWidth"
                                        style="display: inline-block;" :inline-message="true">
                            <el-input v-model="form.item2541" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item2541"
                                      style="width: 40px;" :disabled="disabledState" @blur="item25Change('item2541','item2542')"
                                      :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </td>
                        <td class="item25-table-td3">
                          <el-col :span="12">
                            <ul>
                              <li>
                                0. 从不吃
                              </li>
                              <li class="clear">
                                <div class="item25-table-fl item25-table-div1">
                                  1. ≤3.5 斤/周
                                </div>
                                <div class="item25-table-fl ">
                                  <el-form-item label="" label-width="" prop="item2542" class="formItemWidth"
                                                style="display: inline-block;" :inline-message="true">
                                    <el-input v-model="form.item2542" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item2542"
                                              style="width: 40px;" :disabled="disabledState"
                                              @blur="item3Clear('item2542')"
                                              :maxlength='1' class="form-item"></el-input>
                                  </el-form-item>
                                </div>
                              </li>
                              <li>
                                2. >3.5 斤/周
                              </li>
                            </ul>
                          </el-col>
                        </td>
                      </tr>
                      <tr>
                        <td class="item25-table-td1">香肠／熏肉／熏鱼／烹肉</td>
                        <td class="item25-table-td2">
                          <el-form-item label="" label-width="" prop="item2551" class="formItemWidth"
                                        style="display: inline-block;" :inline-message="true">
                            <el-input v-model="form.item2551" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item2551"
                                      style="width: 40px;" :disabled="disabledState" @blur="item25Change('item2551','item2552')"
                                      :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </td>
                        <td class="item25-table-td3">
                          <el-col :span="12">
                            <ul>
                              <li>
                                0. 从不吃
                              </li>
                              <li class="clear">
                                <div class="item25-table-fl item25-table-div1">
                                  1. ≤7 两/周
                                </div>
                                <div class="item25-table-fl ">
                                  <el-form-item label="" label-width="" prop="item2552" class="formItemWidth"
                                                style="display: inline-block;" :inline-message="true">
                                    <el-input v-model="form.item2552" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item2552"
                                              style="width: 40px;" :disabled="disabledState"
                                              @blur="item3Clear('item2552')"
                                              :maxlength='1' class="form-item"></el-input>
                                  </el-form-item>
                                </div>
                              </li>
                              <li>
                                2. >7两/周
                              </li>
                            </ul>
                          </el-col>
                        </td>
                      </tr>
                      <tr>
                        <td class="item25-table-td1">细粮（大米、面食）</td>
                        <td class="item25-table-td2">
                          <el-form-item label="" label-width="" prop="item2561" class="formItemWidth"
                                        style="display: inline-block;" :inline-message="true">
                            <el-input v-model="form.item2561" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item2561"
                                      style="width: 40px;" :disabled="disabledState" @blur="item25Change('item2561','item2562')"
                                      :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </td>
                        <td class="item25-table-td3">
                          <el-col :span="12">
                            <ul>
                              <li>
                                0. 从不吃
                              </li>
                              <li class="clear">
                                <div class="item25-table-fl item25-table-div1">
                                  1. ≤1 斤/周
                                </div>
                                <div class="item25-table-fl ">
                                  <el-form-item label="" label-width="" prop="item2562" class="formItemWidth"
                                                style="display: inline-block;" :inline-message="true">
                                    <el-input v-model="form.item2562" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item2562"
                                              style="width: 40px;" :disabled="disabledState"
                                              @blur="item3Clear('item2562')"
                                              :maxlength='1' class="form-item"></el-input>
                                  </el-form-item>
                                </div>
                              </li>
                              <li>
                                2. >1 斤/周
                              </li>
                            </ul>
                          </el-col>
                        </td>
                      </tr>
                      <tr>
                        <td class="item25-table-td1">粗粮（五谷杂粮，包括小米、玉米、高粱等）</td>
                        <td class="item25-table-td2">
                          <el-form-item label="" label-width="" prop="item2571" class="formItemWidth"
                                        style="display: inline-block;" :inline-message="true">
                            <el-input v-model="form.item2571" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item2571"
                                      style="width: 40px;" :disabled="disabledState" @blur="item25Change('item2571','item2572')"
                                      :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </td>
                        <td class="item25-table-td3">
                          <el-col :span="12">
                            <ul>
                              <li>
                                0. 从不吃
                              </li>
                              <li class="clear">
                                <div class="item25-table-fl item25-table-div1">
                                  1. ≤1 斤/周
                                </div>
                                <div class="item25-table-fl ">
                                  <el-form-item label="" label-width="" prop="item2572" class="formItemWidth"
                                                style="display: inline-block;" :inline-message="true">
                                    <el-input v-model="form.item2572" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item2572"
                                              style="width: 40px;" :disabled="disabledState"
                                              @blur="item3Clear('item2572')"
                                              :maxlength='1' class="form-item"></el-input>
                                  </el-form-item>
                                </div>
                              </li>
                              <li>
                                2. >1 斤/周
                              </li>
                            </ul>
                          </el-col>
                        </td>
                      </tr>
                      <tr>
                        <td class="item25-table-td1">水果</td>
                        <td class="item25-table-td2">
                          <el-form-item label="" label-width="" prop="item2581" class="formItemWidth"
                                        style="display: inline-block;" :inline-message="true">
                            <el-input v-model="form.item2581" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item2581"
                                      style="width: 40px;" :disabled="disabledState" @blur="item25Change('item2581','item2582')"
                                      :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </td>
                        <td class="item25-table-td3">
                          <el-col :span="12">
                            <ul>
                              <li>
                                0. 从不吃
                              </li>
                              <li class="clear">
                                <div class="item25-table-fl item25-table-div1">
                                  1. ≤2.5 斤/周
                                </div>
                                <div class="item25-table-fl ">
                                  <el-form-item label="" label-width="" prop="item2582" class="formItemWidth"
                                                style="display: inline-block;" :inline-message="true">
                                    <el-input v-model="form.item2582" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item2582"
                                              style="width: 40px;" :disabled="disabledState"
                                              @blur="item3Clear('item2582')"
                                              :maxlength='1' class="form-item"></el-input>
                                  </el-form-item>
                                </div>
                              </li>
                              <li>
                                2. >2.5 斤/周
                              </li>
                            </ul>
                          </el-col>
                        </td>
                      </tr>
                      <tr>
                        <td class="item25-table-td1">新鲜蔬菜</td>
                        <td class="item25-table-td2">
                          <el-form-item label="" label-width="" prop="item2591" class="formItemWidth"
                                        style="display: inline-block;" :inline-message="true">
                            <el-input v-model="form.item2591" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item2591"
                                      style="width: 40px;" :disabled="disabledState" @blur="item25Change('item2591','item2592')"
                                      :maxlength='1' class="form-item"></el-input>
                          </el-form-item>
                        </td>
                        <td class="item25-table-td3">
                          <el-col :span="12">
                            <ul>
                              <li>
                                0. 从不吃
                              </li>
                              <li class="clear">
                                <div class="item25-table-fl item25-table-div1">
                                  1. ≤5 斤/周
                                </div>
                                <div class="item25-table-fl ">
                                  <el-form-item label="" label-width="" prop="item2592" class="formItemWidth"
                                                style="display: inline-block;" :inline-message="true">
                                    <el-input v-model="form.item2592" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item2592"
                                              style="width: 40px;" :disabled="disabledState"
                                              @blur="item3Clear('item2592')"
                                              :maxlength='1' class="form-item"></el-input>
                                  </el-form-item>
                                </div>
                              </li>
                              <li>
                                2. >5 斤/周
                              </li>
                            </ul>
                          </el-col>
                        </td>
                      </tr>

                    </table>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  label="26." labelWidth="80px" required>
                  <div style="width:800px;">您平时的饮食喜好习惯：</div>
                  <el-col :span="8">
                    冷热度：<span class="item26-span">1. 烫  </span> <span class="item26-span"> 2. 适中</span> <span
                    class="item26-span">3. 凉</span>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item label="" label-width="" prop="item261" class="formItemWidth"
                                  style="display: inline-block;" :inline-message="true">
                      <el-input v-model="form.item261" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item261" style="width: 40px;"
                                :disabled="disabledState" @blur="item251Change('item261')"
                                :maxlength='1' class="form-item"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    干稀度：<span class="item26-span">1. 干  </span> <span class="item26-span"> 2. 适中</span> <span
                    class="item26-span">3. 稀</span>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item label="" label-width="" prop="item262" class="formItemWidth"
                                  style="display: inline-block;" :inline-message="true">
                      <el-input v-model="form.item262" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item262" style="width: 40px;"
                                :disabled="disabledState" @blur="item251Change('item262')"
                                :maxlength='1' class="form-item"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    口味：<span class="item26-span">1. 重盐  </span> <span class="item26-span"> 2. 适中</span> <span
                    class="item26-span">3. 清淡</span>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item label="" label-width="" prop="item263" class="formItemWidth"
                                  style="display: inline-block;" :inline-message="true">
                      <el-input v-model="form.item263" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item263" style="width: 40px;"
                                :disabled="disabledState" @blur="item251Change('item263')"
                                :maxlength='1' class="form-item"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    油脂：<span class="item26-span">1. 较高  </span> <span class="item26-span"> 2. 适中</span> <span
                    class="item26-span">3. 较低</span>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item label="" label-width="" prop="item264" class="formItemWidth"
                                  style="display: inline-block;" :inline-message="true">
                      <el-input v-model="form.item264" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item264" style="width: 40px;"
                                :disabled="disabledState" @blur="item251Change('item264')"
                                :maxlength='1' class="form-item"></el-input>
                    </el-form-item>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="27." labelWidth="80px" required>
                  <el-col :span="20">
                    <div class="grid-content bg-purple">
                      <p class="option-p"> 您<u style="font-weight: 600;">经常</u>食用腌晒食品（咸鱼、腊肉、酸菜、泡菜、咸菜等）吗？</p>
                      <p><span class="item26-span">1. 从不；</span> <span class="item26-span">2. 有时；</span> <span
                        class="item26-span">3.经常；</span></p>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="grid-content bg-purple-light">
                      <el-form-item label="" label-width="" prop="item27" class="formItemWidth"
                                    style="display: inline-block;" :inline-message="true">
                        <el-input v-model="form.item27" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item27" style="width: 40px;"
                                  :disabled="disabledState" @blur="item251Change('item27')"
                                  :maxlength='1' class="form-item"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="28." labelWidth="80px" required>
                  <el-col :span="20">
                    <div class="grid-content bg-purple">
                      <p class="option-p"> 您<u style="font-weight: 600;">经常</u>饮茶（经常指平均每周至少3次，连续6个月以上）？</p>
                      <p><span class="item26-span">1. 否，从不饮；</span> <span class="item26-span">2. 是，目前仍经常饮；</span> <span
                        class="item26-span">3.以前是，现在不经常饮；</span></p>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="grid-content bg-purple-light">
                      <el-form-item label="" label-width="" prop="item28" class="formItemWidth"
                                    style="display: inline-block;" :inline-message="true">
                        <el-input v-model="form.item28" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item28" style="width: 40px;"
                                  :disabled="disabledState" @blur="item251Change('item28')"
                                  :maxlength='1' class="form-item"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-form-item>
              </el-col>
            </div>
          </el-col>
          <el-col>
            <div class="formcon">
              <div class="title">
                G. 运动
              </div>
              <el-col>
                <el-form-item label="29." labelWidth="80px" required>
                  <el-col :span="20">
                    <div class="grid-content bg-purple">
                      <p class="option-p"> 您是否<u style="font-weight: 600;">经常</u>参加体育锻炼（经常是指平均每周3次以上，每次超过30分钟）？</p>
                      <p><span class="item26-span">0. 否；</span> <span class="item26-span">1. 是；</span></p>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="grid-content bg-purple-light">
                      <el-form-item class="content-padding" prop="item29">
                        <el-input v-model.trim="form.item29" auto-complete="off" :size="$store.state.style.assemblyModel" disabled style="width:40px"
                                  ref="item29" :disabled="disabledState" @blur="item425('item29')"
                                  class="smallInput"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="30." labelWidth="80px" required>
                  <p class="option-p"> 在<u style="font-weight: 600;">过去12个月</u>中，您每周从事以下活动的时间为多少？<br> <span
                    class="span-weight"> （填写说明：请您填写每周从事相应活动的时间，30分钟以内算0.5小时，30-59分钟算1小时，未做过相应活动请填写0）</span></p>
                  <table class="item301-table">
                    <thead>
                    <th>
                      活动类型
                    </th>
                    <th>
                      小时/周
                    </th>
                    <tr>
                      <td class="item301-table-td1">
                        照顾其他成人
                      </td>
                      <td class="item301-table-td2">
                        <el-form-item label="" label-width="" prop="item301" class="formItemWidth"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item301" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item301"
                                    style="width: 80px;" :disabled="disabledState"
                                    class="form-item"></el-input>
                          小时
                        </el-form-item>
                      </td>
                    </tr>
                    <tr>
                      <td class="item301-table-td1">
                        照顾婴儿/儿童
                      </td>
                      <td class="item301-table-td2">
                        <el-form-item label="" label-width="" prop="item302" class="formItemWidth"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item302" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item302"
                                    style="width: 80px;" :disabled="disabledState"
                                    class="form-item"></el-input>
                          小时
                        </el-form-item>
                      </td>
                    </tr>
                    <tr>
                      <td class="item301-table-td1">
                        中等强度体力家务劳动（包括扫地、擦玻璃、洗衣服、做饭、整理房间、拖地板等）
                      </td>
                      <td class="item301-table-td2">
                        <el-form-item label="" label-width="" prop="item303" class="formItemWidth"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item303" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item303"
                                    style="width: 80px;" :disabled="disabledState"
                                    class="form-item"></el-input>
                          小时
                        </el-form-item>
                      </td>
                    </tr>
                    <tr>
                      <td class="item301-table-td1">
                        高强度体力家务劳动（包括搬运重物、砍柴、扫雪等）
                      </td>
                      <td class="item301-table-td2">
                        <el-form-item label="" label-width="" prop="item304" class="formItemWidth"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item304" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item304"
                                    style="width: 80px;" :disabled="disabledState"
                                    class="form-item"></el-input>
                          小时
                        </el-form-item>
                      </td>
                    </tr>
                    <tr>
                      <td class="item301-table-td1">
                        球类运动（篮球、乒乓球、羽毛球等）
                      </td>
                      <td class="item301-table-td2">
                        <el-form-item label="" label-width="" prop="item305" class="formItemWidth"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item305" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item305"
                                    style="width: 80px;" :disabled="disabledState"
                                    class="form-item"></el-input>
                          小时
                        </el-form-item>
                      </td>
                    </tr>
                    <tr>
                      <td class="item301-table-td1">
                        散步或慢跑
                      </td>
                      <td class="item301-table-td2">
                        <el-form-item label="" label-width="" prop="item306" class="formItemWidth"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item306" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item306"
                                    style="width: 80px;" :disabled="disabledState"
                                    class="form-item"></el-input>
                          小时
                        </el-form-item>
                      </td>
                    </tr>
                    <tr>
                      <td class="item301-table-td1">
                        骑自行车
                      </td>
                      <td class="item301-table-td2">
                        <el-form-item label="" label-width="" prop="item307" class="formItemWidth"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item307" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item307"
                                    style="width: 80px;" :disabled="disabledState"
                                    class="form-item"></el-input>
                          小时
                        </el-form-item>
                      </td>
                    </tr>
                    <tr>
                      <td class="item301-table-td1">
                        高强度身体锻炼（包括游泳、爬山、器械锻炼等）
                      </td>
                      <td class="item301-table-td2">
                        <el-form-item label="" label-width="" prop="item308" class="formItemWidth"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item308" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item308"
                                    style="width: 80px;" :disabled="disabledState"
                                    class="form-item"></el-input>
                          小时
                        </el-form-item>
                      </td>
                    </tr>
                    <tr>
                      <td class="item301-table-td1">
                        低强度身体锻炼（包括太极、瑜伽等）
                      </td>
                      <td class="item301-table-td2">
                        <el-form-item label="" label-width="" prop="item309" class="formItemWidth"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item309" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item309"
                                    style="width: 80px;" :disabled="disabledState"
                                    class="form-item"></el-input>
                          小时
                        </el-form-item>
                      </td>
                    </tr>
                    <tr>
                      <td class="item301-table-td1">
                        坐着看电视或听收音机
                      </td>
                      <td class="item301-table-td2">
                        <el-form-item label="" label-width="" prop="item3010" class="formItemWidth"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item3010" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item3010"
                                    style="width: 80px;" :disabled="disabledState"
                                    class="form-item"></el-input>
                          小时
                        </el-form-item>
                      </td>
                    </tr>
                    </thead>
                  </table>
                </el-form-item>
              </el-col>
            </div>
          </el-col>
          <el-col>
            <div class="formcon">
              <div class="title">
                H. 生活环境
              </div>
              <el-col>
                <el-form-item label="31." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p"> 您<u style="font-weight: 600;">近十年</u>来的生活环境是否存在较严重的空气污染？</p>
                        <p><span class="item26-span">0. 否；</span> <span class="item26-span">1. 是；</span></p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item31">
                          <el-input v-model.trim="form.item31" auto-complete="off" :size="$store.state.style.assemblyModel" disabled style="width:40px"
                                    ref="item31" :disabled="disabledState" @blur="item425('item31')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="" labelWidth="80px" required v-if="form.item31 == 1">
                  <el-row>
                    <el-col :span="6">
                      生活超过1年的城市名称及时间
                    </el-col>
                    <el-col :span="20">
                      <span>城市：</span>
                      <el-form-item class="content-padding" prop="item311" style="display: inline-block">
                        <el-input v-model.trim="form.item311" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:140px"
                                  ref="item311" :disabled="disabledState"
                                  class="smallInput"></el-input>
                      </el-form-item>
                      <span>时间：</span>
                      <el-form-item class="content-padding" prop="item312" style="display: inline-block">
                        <el-input v-model.trim="form.item312" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:140px"
                                  ref="item312" :disabled="disabledState"
                                  class="smallInput"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="32." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p"><u style="font-weight: 600;">近十年</u>来，您的住房是否进行取暖？</p>
                        <p><span class="item26-span">0. 否；</span> <span class="item26-span">1. 是；</span></p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item32">
                          <el-input v-model.trim="form.item32" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item32" :disabled="disabledState" @blur="item425('item32')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col v-if="form.item32 == 1">
                <el-form-item label="33." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p"><u style="font-weight: 600;">主要</u>取暖方式：</p>
                        <p><span class="item26-span">1. 集中暖气 </span>
                          <span class="item26-span">2. 用电 </span>
                          <span class="item26-span">3. 太阳能 </span>
                          <span class="item26-span">4. 天然气 </span>
                          <span class="item26-span">5. 烧煤 </span>
                          <span class="item26-span">8. 其他，请注明：
                          <span>
                            <el-form-item class="content-padding" prop="item331" style="display: inline-block"
                                          v-if="form.item33 == 8">
                                <el-input v-model.trim="form.item331" auto-complete="off" :size="$store.state.style.assemblyModel"
                                          style="width:140px" ref="item331" :disabled="disabledState"
                                          @blur="item425('item32')"
                                          class="smallInput"></el-input>
                            </el-form-item>
                          </span>
                          <span>
                            <el-form-item class="content-padding" prop="" style="display: inline-block"
                                          v-if="form.item33 != 8">
                                <el-input v-model.trim="form.item331" auto-complete="off" :size="$store.state.style.assemblyModel"
                                          style="width:140px" ref="item331" disabled
                                          class="smallInput"></el-input>
                            </el-form-item>
                          </span>
                        </span>
                        </p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item33">
                          <el-input v-model.trim="form.item33" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item33" :disabled="disabledState" @blur="item33Change('item33')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="34." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">近<u style="font-weight: 600;">十年</u>来，您家的主要做饭燃料种类：</p>
                        <p><span class="item26-span">1. 天然气/液化气 </span>
                          <span class="item26-span">2. 用电 </span>
                          <span class="item26-span">3. 烧煤 </span>
                          <span class="item26-span">8. 其他，请注明：
                          <span>
                            <el-form-item class="content-padding" prop="item341" style="display: inline-block"
                                          v-if="form.item34 == 8">
                                <el-input v-model.trim="form.item341" auto-complete="off" :size="$store.state.style.assemblyModel"
                                          style="width:140px" ref="item341" :disabled="disabledState"
                                          class="smallInput"></el-input>
                            </el-form-item>
                          </span>
                          <span>
                            <el-form-item class="content-padding" prop="" style="display: inline-block"
                                          v-if="form.item34 != 8">
                                <el-input v-model.trim="form.item341" auto-complete="off" :size="$store.state.style.assemblyModel"
                                          style="width:140px" ref="item341" disabled
                                          class="smallInput"></el-input>
                            </el-form-item>
                          </span>
                        </span>
                        </p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item34">
                          <el-input v-model.trim="form.item34" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item34" :disabled="disabledState" @blur="item34Change('item34')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="35." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">近<u style="font-weight: 600;">十年</u>来，您家做饭时住房内的油烟情况?</p>
                        <p><span class="item26-span">1. 无烟 </span>
                          <span class="item26-span">2. 少许 </span>
                          <span class="item26-span">3. 较多 </span>
                          <span class="item26-span">4. 很多 </span>
                        </p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item35">
                          <el-input v-model.trim="form.item35" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item35" :disabled="disabledState" @blur="item4Clear('item35')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </div>
          </el-col>
          <el-col>
            <div class="formcon">
              <div class="title">
                I. 心理和情绪
              </div>
              <el-col>
                <el-form-item label="36." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">近些年您是否曾经受较大的精神创伤（亲人患重病或死亡、家庭不和或破裂、重大财产损失、意外失业、重大意外身体伤害、暴力恐吓等）？</p>
                        <p><span class="item26-span">0. 否；</span> <span class="item26-span">1. 是；</span></p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item36">
                          <el-input v-model.trim="form.item36" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item36" :disabled="disabledState" @blur="item425('item36')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="37." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">近些年您是否有较长一段时间内精神处于压抑状况（连续超过 6 个月）？</p>
                        <p><span class="item26-span">0. 否；</span> <span class="item26-span">1. 是；</span></p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item37">
                          <el-input v-model.trim="form.item37" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item37" :disabled="disabledState" @blur="item425('item37')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </div>
          </el-col>
          <el-col>
            <div class="formcon">
              <div class="title">
                J. 疾病史
              </div>
              <el-col>
                <el-form-item label="38." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">您是否患过<u style="font-weight: 600;">慢性呼吸系统疾病</u>？（经正规医疗机构明确诊断）</p>
                        <p><span class="item26-span">0. 否；</span> <span class="item26-span">1. 是；</span></p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item38">
                          <el-input v-model.trim="form.item38" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item38" :disabled="disabledState" @blur="item425('item38')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="" labelWidth="80px" required v-if="form.item38 == 1">
                  <p class="option-p" style="font-weight:600;">请勾选下述表格中您患有的所有疾病。如果您曾多次诊断出同一种疾病，请填写首次诊断的年龄。（可多选）</p>
                  <table class="item38-table">
                    <thead>
                    <th>
                      疾病类型  0=否  1=是（可多选）
                    </th>
                    <th>
                      首次诊断时年龄（如勾选疾病，诊断年龄必填）
                    </th>
                    </thead>
                    <tr>
                      <td class="item38-table-td1">
                        石棉肺：
                        <el-form-item class="content-padding" prop="item3811" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item3811" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item38" :disabled="disabledState" @blur="item38Change('item3811','item3812')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item3812" style="display: inline-block"
                                      v-if="form.item3811 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item3812" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item3812" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item3811 != 1">
                            <el-input v-model.trim="form.item3812" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item3812" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        儿童哮喘：
                        <el-form-item class="content-padding" prop="item3821" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item3821" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item3821" :disabled="disabledState" @blur="item38Change('item3821','item3822')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item3822" style="display: inline-block"
                                      v-if="form.item3821 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item3822" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    :inline-message="true"
                                    ref="item3822" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item3821 != 1">
                            <el-input v-model.trim="form.item3822" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item3822" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        成人哮喘：
                        <el-form-item class="content-padding" prop="item3831" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item3831" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item3831" :disabled="disabledState" @blur="item38Change('item3831','item3832')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item3832" style="display: inline-block"
                                      v-if="form.item3831 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item3832" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item3832" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item3831 != 1">
                            <el-input v-model.trim="form.item3832" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item3832" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        支气管扩张：
                        <el-form-item class="content-padding" prop="item3841" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item3841" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item3841" :disabled="disabledState" @blur="item38Change('item3841','item3842')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item3842" style="display: inline-block"
                                      v-if="form.item3841 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item3842" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item3842" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item3841 != 1">
                            <el-input v-model.trim="form.item3842" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item3842" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        慢性支气管炎：
                        <el-form-item class="content-padding" prop="item3851" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item3851" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item3851" :disabled="disabledState" @blur="item38Change('item3851','item3852')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item3852" style="display: inline-block"
                                      v-if="form.item3851 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item3852" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item3852" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item3851 != 1">
                            <el-input v-model.trim="form.item3852" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item3852" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        慢性阻塞性肺病（COPD）：
                        <el-form-item class="content-padding" prop="item3861" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item3861" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item3861" :disabled="disabledState" @blur="item38Change('item3861','item3862')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item3862" style="display: inline-block"
                                      v-if="form.item3861 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item3862" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item3862" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item3861 != 1">
                            <el-input v-model.trim="form.item3862" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item3862" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        肺气肿：
                        <el-form-item class="content-padding" prop="item3871" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item3871" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item3871" :disabled="disabledState" @blur="item38Change('item3871','item3872')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item3872" style="display: inline-block"
                                      v-if="form.item3871 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item3872" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item3872" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item3871 != 1">
                            <el-input v-model.trim="form.item3872" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item3872" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        弥漫性肺纤维化：
                        <el-form-item class="content-padding" prop="item3881" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item3881" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item3881" :disabled="disabledState" @blur="item38Change('item3881','item3882')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item3882" style="display: inline-block"
                                      v-if="form.item3881 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item3882" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item3882" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item3881 != 1">
                            <el-input v-model.trim="form.item3882" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item3882" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        肺 炎：
                        <el-form-item class="content-padding" prop="item3891" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item3891" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item3891" :disabled="disabledState" @blur="item38Change('item3891','item3892')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item3892" style="display: inline-block"
                                      v-if="form.item3891 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item3892" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item3892" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item3891 != 1">
                            <el-input v-model.trim="form.item3892" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item3892" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        结节病：
                        <el-form-item class="content-padding" prop="item38101" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item38101" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item38101" :disabled="disabledState" @blur="item38Change('item38101','item3812')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item38102" style="display: inline-block"
                                      v-if="form.item38101 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item38102" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item38102" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item38101 != 1">
                            <el-input v-model.trim="form.item38102" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item38102" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        矽肺/尘肺：
                        <el-form-item class="content-padding" prop="item38111" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item38111" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item38111" :disabled="disabledState" @blur="item38Change('item38111','item3812')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item38112" style="display: inline-block"
                                      v-if="form.item38111 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item38112" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item38112" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item38111 != 1">
                            <el-input v-model.trim="form.item38112" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item38112" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        肺结核：
                        <el-form-item class="content-padding" prop="item38121" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item38121" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item38121" :disabled="disabledState"
                                    @blur="item38Change('item38121','item38122')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item38122" style="display: inline-block"
                                      v-if="form.item38121 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item38122" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item38122" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item38121 != 1">
                            <el-input v-model.trim="form.item38122" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item38122" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        其他
                        <span>
                          <el-form-item class="content-padding" prop="item38131" style="display: inline-block"
                                        :inline-message="true">
                            <el-input v-model.trim="form.item38131" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                      ref="item38131" :disabled="disabledState"
                                      @blur="item411Change('item38131','item38132','item38133')"
                                      class="smallInput"></el-input>
                          </el-form-item>
                      </span>
                        ,请注明：
                        <span>
                         <el-form-item class="content-padding" prop="item38133" style="display: inline-block"
                                       :inline-message="true" v-if="form.item38131 == 1">
                          <el-input v-model.trim="form.item38133" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:140px"
                                    ref="item38133" :disabled="disabledState"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       :inline-message="true" v-if="form.item38131 != 1">
                          <el-input v-model.trim="form.item38133" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:140px"
                                    ref="item38133" disabled
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </span>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item38132" style="display: inline-block"
                                      v-if="form.item38131 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item38132" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item38132" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item38131 != 1">
                            <el-input v-model.trim="form.item38132" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item38132" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                  </table>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="39" labelWidth="80px" required>
                  <p class="option-p">请回答以下问题</p>
                  <div>
                  </div>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="" labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">39.1 您是否患过以下<u style="font-weight: 600;">消化系统疾病</u>？（经正规医疗机构明确诊断）</p>
                        <p><span class="item26-span">0. 否；</span> <span class="item26-span">1. 是；</span></p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item391">
                          <el-input v-model.trim="form.item391" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item391" :disabled="disabledState" @blur="item425('item391')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="" labelWidth="80px" required v-if="form.item391 == 1">
                  <p class="option-p" style="font-weight:600;">请勾选下述表格中您患有的所有疾病。如果您曾多次诊断出同一种疾病，请填写首次诊断的年龄。（可多选）</p>
                  <table class="item38-table">
                    <thead>
                    <th>
                      疾病类型  0=否  1=是（可多选）
                    </th>
                    <th>
                      首次诊断时年龄（如勾选疾病，诊断年龄必填）
                    </th>
                    </thead>
                    <tr>
                      <td class="item38-table-td1">
                        慢性结肠炎：
                        <el-form-item class="content-padding" prop="item39111" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item39111" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item39111" :disabled="disabledState"
                                    @blur="item38Change('item39111','item39112')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item39112" style="display: inline-block"
                                      v-if="form.item39111 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item39112" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item39112" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item39111 != 1">
                            <el-input v-model.trim="form.item39112" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item39112" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        肠息肉：
                        <el-form-item class="content-padding" prop="item39121" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item39121" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item39121" :disabled="disabledState"
                                    @blur="item38Change('item39121','item39122')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item39122" style="display: inline-block"
                                      v-if="form.item39121 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item39122" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    :inline-message="true"
                                    ref="item39122" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item39121 != 1">
                            <el-input v-model.trim="form.item39122" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item39122" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        慢性阑尾炎或阑尾切除史：
                        <el-form-item class="content-padding" prop="item39131" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item39131" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item39131" :disabled="disabledState"
                                    @blur="item38Change('item39131','item39132')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item39132" style="display: inline-block"
                                      v-if="form.item39131 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item39132" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item39132" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item39131 != 1">
                            <el-input v-model.trim="form.item39132" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item39132" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        慢性腹泻：
                        <el-form-item class="content-padding" prop="item39141" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item39141" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item39141" :disabled="disabledState"
                                    @blur="item38Change('item39141','item39142')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item39142" style="display: inline-block"
                                      v-if="form.item39141 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item39142" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item39142" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item39141 != 1">
                            <el-input v-model.trim="form.item39142" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item39142" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        慢性便秘：
                        <el-form-item class="content-padding" prop="item39151" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item39151" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item39151" :disabled="disabledState"
                                    @blur="item38Change('item39151','item39152')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item39152" style="display: inline-block"
                                      v-if="form.item39151 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item39152" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item39152" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item39151 != 1">
                            <el-input v-model.trim="form.item39152" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item39152" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        粘液和/或血便：
                        <el-form-item class="content-padding" prop="item39161" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item39161" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item39161" :disabled="disabledState"
                                    @blur="item38Change('item3861','item3862')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item39162" style="display: inline-block"
                                      v-if="form.item39161 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item39162" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item39162" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item39161 != 1">
                            <el-input v-model.trim="form.item39162" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item39162" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        其他
                        <span>
                          <el-form-item class="content-padding" prop="item39171" style="display: inline-block"
                                        :inline-message="true">
                            <el-input v-model.trim="form.item39171" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                      ref="item39171" :disabled="disabledState"
                                      @blur="item411Change('item39171','item39172','item39173')"
                                      class="smallInput"></el-input>
                          </el-form-item>
                      </span>
                        ,请注明：
                        <span>
                         <el-form-item class="content-padding" prop="item39173" style="display: inline-block"
                                       :inline-message="true" v-if="form.item39171 == 1">
                          <el-input v-model.trim="form.item39173" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:140px"
                                    ref="item39173" :disabled="disabledState"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       :inline-message="true" v-if="form.item39171 != 1">
                          <el-input v-model.trim="form.item39173" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:140px"
                                    ref="item39173" disabled
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </span>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item39172" style="display: inline-block"
                                      v-if="form.item39171 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item39172" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item39172" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item39171 != 1">
                            <el-input v-model.trim="form.item39172" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item39172" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                  </table>
                  <p class="option-p"><span style="font-weight:600;">慢性腹泻</span>指近2年来腹泻累计持续超过3个月，每次发作持续时间在1周以上； </p>
                  <p class="option-p"><span style="font-weight:600;">慢性便秘</span>指近2年来便秘，每年在2个月以上。 </p>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="" labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">39.2 您<u style="font-weight: 600;"> 现在</u>是否存在腹部不适或其他肠道异常的症状？</p>
                        <p><span class="item26-span">0. 否；</span> <span class="item26-span">1. 是；</span></p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item392">
                          <el-input v-model.trim="form.item392" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item392" :disabled="disabledState" @blur="item425('item392')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>

              </el-col>
              <el-col>
                <div  v-if="form.item392 == 1">
                  <el-form-item label="" labelWidth="80px" required>
                    <el-row>
                      <el-col :span="4">
                        <div class="grid-content bg-purple">
                          <p class="option-p" style="padding-left: 20px">（1）肠道的疼痛或异常症状出现的时间？</p>
                        </div>
                      </el-col>
                      <el-col :span="20">
                        <div class="grid-content bg-purple-light">
                          <el-form-item class="content-padding1" prop="year">
                            <el-input v-model.trim="form.year" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="year" :disabled="disabledState" @change="getyear"
                                      :maxlength='4' class="smallInput"></el-input>
                            年
                          </el-form-item>
                          <el-form-item class="content-padding1" prop="month">
                            <el-input v-model.trim="form.month" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:50px"
                                      ref="month" :disabled="disabledState" @change="getyear"
                                      :maxlength='2' class="smallInput"></el-input>
                            月
                          </el-form-item>
                          <el-form-item class="content-padding1" prop="day">
                            <el-input v-model.trim="form.day" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:50px"
                                      ref="day" :disabled="disabledState" @change="getyear"
                                      :maxlength='2' class="smallInput"></el-input>
                            日
                          </el-form-item>
                        </div>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="" labelWidth="80px" required>
                    <el-row>
                      <el-col :span="20">
                        <div class="grid-content bg-purple">
                          <p class="option-p" style="padding-left: 20px">（2）主要的症状为？</p>
                          <p><span class="item26-span">1. 腹痛</span>
                            <span class="item26-span">2. 排便异常（腹泻、便秘、大便不成形等）</span>
                            <span class="item26-span">3. 便血（肉眼可见）</span>
                            <span class="item26-span">4.其他（请具体阐明）
                             <span>
                                <el-form-item class="content-padding" prop="item39221" style="display:inline-block"
                                              v-if="form.item3922 == 4">
                                  <el-input v-model.trim="form.item39221" auto-complete="off" :size="$store.state.style.assemblyModel"
                                            style="width:200px"
                                            ref="item39221" :disabled="disabledState"
                                            class="smallInput"></el-input>
                                </el-form-item>
                             </span>
                             <span>
                                <el-form-item class="content-padding" prop="" style="display:inline-block"
                                              v-if="form.item3922 != 4">
                                  <el-input v-model.trim="form.item39221" auto-complete="off" :size="$store.state.style.assemblyModel"
                                            style="width:200px"
                                            ref="item39221" disabled
                                            class="smallInput"></el-input>
                                </el-form-item>
                             </span>
                           </span>
                          </p>
                        </div>
                      </el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple-light">
                          <el-form-item class="content-padding" prop="item3922">
                            <el-input v-model.trim="form.item3922" auto-complete="off" :size="$store.state.style.assemblyModel"
                                      style="width:40px"
                                      ref="item3922" :disabled="disabledState" @blur="item4Clear('item3922')"
                                      :maxlength='1' class="smallInput"></el-input>
                          </el-form-item>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="20">
                        <div class="grid-content bg-purple">
                          <p class="option-p" style="padding-left: 20px">（3）您是否<u style="font-weight: 600;">曾经</u>由于肠道疾病而服用药物？？</p>
                          <p><span class="item26-span">0. 否</span>
                            <span class="item26-span">1. 是药物的名称为
                               <span>
                                  <el-form-item class="content-padding" prop="item3931" style="display:inline-block"
                                                v-if="form.item393 == 1">
                                    <el-input v-model.trim="form.item3931" auto-complete="off" :size="$store.state.style.assemblyModel"
                                              style="width:200px"
                                              ref="item3931" :disabled="disabledState"
                                              class="smallInput"></el-input>
                                  </el-form-item>
                               </span>
                               <span>
                                  <el-form-item class="content-padding" prop="" style="display:inline-block"
                                                v-if="form.item393 != 1">
                                    <el-input v-model.trim="form.item3931" auto-complete="off" :size="$store.state.style.assemblyModel"
                                              style="width:200px"
                                              ref="item3931" disabled
                                              class="smallInput"></el-input>
                                  </el-form-item>
                               </span>
                             </span>
                          </p>
                        </div>
                      </el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple-light">
                          <el-form-item class="content-padding" prop="item393">
                            <el-input v-model.trim="form.item393" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                      ref="item393" :disabled="disabledState" @blur="item38Change('item393','item3931')"
                                      :maxlength='1' class="smallInput"></el-input>
                          </el-form-item>
                        </div>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </div>
              </el-col>
              <el-col>
                <el-form-item label="40." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">您是否患过 <u style="font-weight: 600;">上消化系统疾病</u>？（经正规医疗机构明确诊断）</p>
                        <p><span class="item26-span">0. 否；</span> <span class="item26-span">1. 是；</span></p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item40">
                          <el-input v-model.trim="form.item40" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item40" :disabled="disabledState" @blur="item425('item40')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="" labelWidth="80px" required v-if="form.item40 == 1">
                  <p class="option-p" style="font-weight:600;">请勾选下述表格中您患有的所有疾病。如果您曾多次诊断出同一种疾病，请填写首次诊断的年龄。（可多选）</p>
                  <table class="item38-table">
                    <thead>
                    <th>
                      疾病类型  0=否  1=是（可多选）
                    </th>
                    <th>
                      首次诊断时年龄（如勾选疾病，诊断年龄必填）
                    </th>
                    </thead>
                    <tr>
                      <td class="item38-table-td1">
                        反流性食管炎：
                        <el-form-item class="content-padding" prop="item4011" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item4011" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item4011" :disabled="disabledState" @blur="item38Change('item4011','item4012')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item4012" style="display: inline-block"
                                      v-if="form.item4011 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item4012" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item4012" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item4011 != 1">
                            <el-input v-model.trim="form.item4012" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item4012" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        浅表性胃炎：
                        <el-form-item class="content-padding" prop="item4021" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item4021" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item4021" :disabled="disabledState" @blur="item38Change('item4021','item4022')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item4022" style="display: inline-block"
                                      v-if="form.item4021 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item4022" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    :inline-message="true"
                                    ref="item4022" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item4021 != 1">
                            <el-input v-model.trim="form.item4022" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item4022" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        萎缩性胃炎：
                        <el-form-item class="content-padding" prop="item4031" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item4031" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item4031" :disabled="disabledState" @blur="item38Change('item4031','item4032')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item4032" style="display: inline-block"
                                      v-if="form.item4031 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item4032" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item4032" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item4031 != 1">
                            <el-input v-model.trim="form.item4032" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item4032" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        胃溃疡：
                        <el-form-item class="content-padding" prop="item4041" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item4041" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item4041" :disabled="disabledState" @blur="item38Change('item4041','item4042')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item4042" style="display: inline-block"
                                      v-if="form.item4041 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item4042" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item4042" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item4041 != 1">
                            <el-input v-model.trim="form.item4042" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item4042" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        十二指肠溃疡：
                        <el-form-item class="content-padding" prop="item4051" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item4051" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item4051" :disabled="disabledState" @blur="item38Change('item4051','item4052')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item4052" style="display: inline-block"
                                      v-if="form.item4051 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item4052" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item4052" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item4051 != 1">
                            <el-input v-model.trim="form.item4052" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item4052" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        胃息肉病：
                        <el-form-item class="content-padding" prop="item4061" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item4061" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item4061" :disabled="disabledState" @blur="item38Change('item4061','item4062')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item4062" style="display: inline-block"
                                      v-if="form.item4061 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item4062" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item4062" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item4061 != 1">
                            <el-input v-model.trim="form.item4062" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item4062" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        残胃：
                        <el-form-item class="content-padding" prop="item4071" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item4071" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item4071" :disabled="disabledState" @blur="item38Change('item4071','item4072')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item4072" style="display: inline-block"
                                      v-if="form.item4071 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item4072" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item4072" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item4071 != 1">
                            <el-input v-model.trim="form.item4072" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item4072" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        胃黏膜上皮内瘤变：
                        <el-form-item class="content-padding" prop="item4081" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item4081" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item4081" :disabled="disabledState" @blur="item38Change('item4081','item3882')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item4082" style="display: inline-block"
                                      v-if="form.item4081 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item4082" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item4082" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item4081 != 1">
                            <el-input v-model.trim="form.item4082" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item4082" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        胃肠上皮化生：
                        <el-form-item class="content-padding" prop="item4091" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item4091" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item4091" :disabled="disabledState" @blur="item38Change('item3891','item3892')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item4092" style="display: inline-block"
                                      v-if="form.item4091 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item4092" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item4092" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item4091 != 1">
                            <el-input v-model.trim="form.item4092" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item4092" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        其他
                        <span>
                          <el-form-item class="content-padding" prop="item40101" style="display: inline-block"
                                        :inline-message="true">
                            <el-input v-model.trim="form.item40101" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                      ref="item40101" :disabled="disabledState"
                                      @blur="item38Change('item40101','item40101')"
                                      class="smallInput"></el-input>
                          </el-form-item>
                      </span>
                        ,请注明：
                        <span>
                         <el-form-item class="content-padding" prop="item40103" style="display: inline-block"
                                       :inline-message="true" v-if="form.item40101 == 1">
                          <el-input v-model.trim="form.item40103" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:140px"
                                    ref="item40103" :disabled="disabledState"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       :inline-message="true" v-if="form.item40101 != 1">
                          <el-input v-model.trim="form.item40103" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:140px"
                                    ref="item40103" disabled
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </span>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item40102" style="display: inline-block"
                                      v-if="form.item40101 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item40102" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item40102" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item40101 != 1">
                            <el-input v-model.trim="form.item40102" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item40102" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                  </table>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="41." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">您是否患过 <u style="font-weight: 600;">肝胆系统疾病</u>？（经正规医疗机构明确诊断）</p>
                        <p><span class="item26-span">0. 否；</span> <span class="item26-span">1. 是；</span></p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item41">
                          <el-input v-model.trim="form.item41" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item41" :disabled="disabledState" @blur="item425('item41')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="" labelWidth="80px" required v-if="form.item41 == 1">
                  <p class="option-p" style="font-weight:600;">请勾选下述表格中您患有的所有疾病。如果您曾多次诊断出同一种疾病，请填写首次诊断的年龄。（可多选）</p>
                  <table class="item38-table">
                    <thead>
                    <th>
                      疾病类型  0=否  1=是（可多选）
                    </th>
                    <th>
                      首次诊断时年龄（如勾选疾病，诊断年龄必填）
                    </th>
                    </thead>
                    <tr>
                      <td class="item38-table-td1">
                        慢性乙型肝炎：
                        <el-form-item class="content-padding" prop="item4111" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item4111" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item4111" :disabled="disabledState" @blur="item38Change('item4111','item4112')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item4112" style="display: inline-block"
                                      v-if="form.item4111 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item4112" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item4112" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item4111 != 1">
                            <el-input v-model.trim="form.item4112" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item4112" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        慢性丙型肝炎：
                        <el-form-item class="content-padding" prop="item4121" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item4121" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item4121" :disabled="disabledState" @blur="item38Change('item4121','item4122')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item4122" style="display: inline-block"
                                      v-if="form.item4121 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item4122" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    :inline-message="true"
                                    ref="item4122" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item4121 != 1">
                            <el-input v-model.trim="form.item4122" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item4122" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        肝硬化：
                        <el-form-item class="content-padding" prop="item4131" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item4131" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item4131" :disabled="disabledState" @blur="item38Change('item4131','item4132')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item4132" style="display: inline-block"
                                      v-if="form.item4131 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item4132" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item4132" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item4131 != 1">
                            <el-input v-model.trim="form.item4132" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item4132" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        血吸虫感染病史：
                        <el-form-item class="content-padding" prop="item4141" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item4141" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item4141" :disabled="disabledState" @blur="item38Change('item4141','item4142')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item4142" style="display: inline-block"
                                      v-if="form.item4141 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item4142" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item4142" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item4141 != 1">
                            <el-input v-model.trim="form.item4142" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item4142" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1 other-td">
                        脂肪肝：
                        <el-form-item class="content-padding" prop="item4151" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item4151" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item4151" :disabled="disabledState"
                                    @blur="item411Change('item4151','item4152','item4153')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                        <span v-if="form.item4151 == 1">
                         <p style="padding-left: 20px">如果是,那么为:
                             <el-form-item class="content-padding" prop="item4153" style="display: inline-block"
                                           :inline-message="true">
                                <el-input v-model.trim="form.item4153" auto-complete="off" :size="$store.state.style.assemblyModel"
                                          style="width:40px"
                                          ref="item4153" :disabled="disabledState" @blur="item41Change('item4153')"
                                          class="smallInput"></el-input>
                              </el-form-item>
                        </p>
                        <p><span class="item26-span">1. 轻度</span> <span class="item26-span">2. 中度</span><span
                          class="item26-span">3. 重度</span><span class="item26-span">9. 不清楚</span></p>
                      </span>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item4152" style="display: inline-block"
                                      v-if="form.item4151 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item4152" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item4151" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item4151 != 1">
                            <el-input v-model.trim="form.item4152" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item4152" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1 other-td">
                        胆结石症：
                        <el-form-item class="content-padding" prop="item4161" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item4161" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item4161" :disabled="disabledState"
                                    @blur="item411Change('item4161','item4162','item4163')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                        <span v-if="form.item4161 == 1">
                         <p style="padding-left: 20px">如果是,那么为:
                             <el-form-item class="content-padding" prop="item4163" style="display: inline-block"
                                           :inline-message="true">
                                <el-input v-model.trim="form.item4163" auto-complete="off" :size="$store.state.style.assemblyModel"
                                          style="width:40px"
                                          ref="item4163" :disabled="disabledState" @blur="item41Change('item4163')"
                                          class="smallInput"></el-input>
                              </el-form-item>
                        </p>
                        <p><span class="item26-span">1. 轻度</span> <span class="item26-span">2. 中度</span><span
                          class="item26-span">3. 重度</span><span class="item26-span">9. 不清楚</span></p>
                      </span>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item4162" style="display: inline-block"
                                      v-if="form.item4161 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item4162" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item4162" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item4161 != 1">
                            <el-input v-model.trim="form.item4162" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item4162" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        慢性胆囊炎或胆囊切除史：
                        <el-form-item class="content-padding" prop="item4171" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item4171" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item4171" :disabled="disabledState" @blur="item38Change('item4171','item4172')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item4172" style="display: inline-block"
                                      v-if="form.item4171 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item4172" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item4172" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item4171 != 1">
                            <el-input v-model.trim="form.item4172" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item4172" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        其他
                        <span>
                          <el-form-item class="content-padding" prop="item4181" style="display: inline-block"
                                        :inline-message="true">
                            <el-input v-model.trim="form.item4181" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                      ref="item4181" :disabled="disabledState"
                                      @blur="item411Change('item4181','item4182','item4183')"
                                      class="smallInput"></el-input>
                          </el-form-item>
                      </span>
                        ,请注明：
                        <span>
                         <el-form-item class="content-padding" prop="item4183" style="display: inline-block"
                                       :inline-message="true" v-if="form.item4181 == 1">
                          <el-input v-model.trim="form.item4183" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:140px"
                                    ref="item4183" :disabled="disabledState"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       :inline-message="true" v-if="form.item4181 != 1">
                          <el-input v-model.trim="form.item4183" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:140px"
                                    ref="item4183" disabled
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </span>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item4182" style="display: inline-block"
                                      v-if="form.item4181 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item4182" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item4182" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item4181 != 1">
                            <el-input v-model.trim="form.item4182" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item4182" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                  </table>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="42." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">您是否患过 <u style="font-weight: 600;">其他系统疾病</u>？（经正规医疗机构明确诊断）</p>
                        <p><span class="item26-span">0. 否；</span> <span class="item26-span">1. 是；</span></p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item42">
                          <el-input v-model.trim="form.item42" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item42" :disabled="disabledState" @blur="item425('item42')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="" labelWidth="80px" required v-if="form.item42 == 1">
                  <p class="option-p" style="font-weight:600;">请勾选下述表格中您患有的所有疾病。如果您曾多次诊断出同一种疾病，请填写首次诊断的年龄。（可多选）</p>
                  <table class="item38-table">
                    <thead>
                    <th>
                      疾病类型  0=否  1=是（可多选）
                    </th>
                    <th>
                      首次诊断时年龄（如勾选疾病，诊断年龄必填）
                    </th>
                    </thead>
                    <tr>
                      <td class="item38-table-td1">
                        高血压：
                        <el-form-item class="content-padding" prop="item4211" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item4211" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item4211" :disabled="disabledState" @blur="item38Change('item4111','item4112')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item4212" style="display: inline-block"
                                      v-if="form.item4211 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item4212" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item4212" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item4211 != 1">
                            <el-input v-model.trim="form.item4212" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item4212" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        高血脂症：
                        <el-form-item class="content-padding" prop="item4221" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item4221" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item4221" :disabled="disabledState" @blur="item38Change('item4221','item4222')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item4222" style="display: inline-block"
                                      v-if="form.item4221 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item4222" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    :inline-message="true"
                                    ref="item4222" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item4221 != 1">
                            <el-input v-model.trim="form.item4222" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item4222" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        脑卒中：
                        <el-form-item class="content-padding" prop="item4231" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item4231" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item4231" :disabled="disabledState" @blur="item38Change('item4231','item4232')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item4232" style="display: inline-block"
                                      v-if="form.item4231 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item4232" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item4232" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item4231 != 1">
                            <el-input v-model.trim="form.item4232" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item4232" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        心脏病：
                        <el-form-item class="content-padding" prop="item4241" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item4241" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item4241" :disabled="disabledState" @blur="item38Change('item4241','item4242')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item4242" style="display: inline-block"
                                      v-if="form.item4241 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item4242" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item4242" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item4241 != 1">
                            <el-input v-model.trim="form.item4242" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item4242" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item38-table-td1">
                        其他
                        <span>
                          <el-form-item class="content-padding" prop="item4251" style="display: inline-block"
                                        :inline-message="true">
                            <el-input v-model.trim="form.item4251" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                      ref="item4251" :disabled="disabledState"
                                      @blur="item411Change('item4251','item4252','item4253')"
                                      class="smallInput"></el-input>
                          </el-form-item>
                      </span>
                        ,请注明：
                        <span>
                         <el-form-item class="content-padding" prop="item4253" style="display: inline-block"
                                       :inline-message="true" v-if="form.item4251 == 1">
                          <el-input v-model.trim="form.item4253" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:140px"
                                    ref="item4253" :disabled="disabledState"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       :inline-message="true" v-if="form.item4251 != 1">
                          <el-input v-model.trim="form.item4253" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:140px"
                                    ref="item4253" disabled
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </span>
                      </td>
                      <td class="item38-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item4252" style="display: inline-block"
                                      v-if="form.item4251 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item4252" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item4252" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item4251 != 1">
                            <el-input v-model.trim="form.item4252" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item4252" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                  </table>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="43." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">您是否患过 <u style="font-weight: 600;">糖尿病</u>？（经正规医疗机构明确诊断）</p>
                        <p><span class="item26-span">0. 否；</span> <span class="item26-span">1. 是；</span></p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item43">
                          <el-input v-model.trim="form.item43" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item43" :disabled="disabledState" @blur="item425('item43')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="" labelWidth="80px" required v-if="form.item43 == 1">
                  <p class="option-p" style="font-weight:600;">请填写下表。如果您曾多次诊断出同一种疾病，请填写首次诊断的年龄。（可多选）</p>
                  <table class="item43-table">
                    <thead>
                    <th>
                      首次诊断时间 <br>（未患病者不用填写）
                    </th>
                    <th>
                      是否治疗 <br>(0=否，1=是）
                    </th>
                    <th>
                      备注
                    </th>
                    </thead>
                    <tr>
                      <td class="item43-table-td1">
                        <el-form-item class="content-padding1" prop="year43">
                          <el-input v-model.trim="form.year43" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="year43" :disabled="disabledState" @change="getyear43"
                                    :maxlength='4' class="smallInput"></el-input>
                          年
                        </el-form-item>
                        <el-form-item class="content-padding1" prop="month43">
                          <el-input v-model.trim="form.month43" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:50px"
                                    ref="month43" :disabled="disabledState" @change="getyear43"
                                    :maxlength='2' class="smallInput"></el-input>
                          月
                        </el-form-item>
                      </td>
                      <td class="item43-table-td2">
                        <el-form-item class="content-padding" prop="item4302" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item4302" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item4302" :disabled="disabledState" @blur="item425('item4302')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item43-table-td3">
                        <el-col :span="24">
                          <div>
                            <span class="font-weight">糖尿病类型：</span>
                            <el-form-item class="content-padding" prop="item43031" style="display: inline-block"
                                          :inline-message="true">
                              <el-input v-model.trim="form.item43031" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                        ref="item43031" :disabled="disabledState" @blur="item43('item43031')"
                                        class="smallInput"></el-input>
                            </el-form-item>
                          </div>
                          <p><span>1. I 型</span> <span class="item26-span">2. II 型</span><span class="item26-span">3. 妊娠糖尿病</span><span
                            class="item26-span">4. 其他，请注明：
                          <span>
                             <el-form-item class="content-padding" prop="item430311" style="display: inline-block"
                                           :inline-message="true" v-if="form.item43031 == 4">
                                <el-input v-model.trim="form.item430311" auto-complete="off" :size="$store.state.style.assemblyModel"
                                          style="width:40px"
                                          ref="item430311" :disabled="disabledState"
                                          class="smallInput"></el-input>
                             </el-form-item>
                          </span>
                          <span>
                             <el-form-item class="content-padding" prop="" style="display: inline-block"
                                           :inline-message="true" v-if="form.item43031 != 4">
                                <el-input v-model.trim="form.item430311" auto-complete="off" :size="$store.state.style.assemblyModel"
                                          style="width:40px"
                                          ref="item430311" disabled
                                          class="smallInput"></el-input>
                             </el-form-item>
                          </span>
                        </span>
                            <span class="item26-span">999. 不清楚</span>
                          </p>
                          <div>
                            <span class="font-weight">服用药物种类：</span>
                            <el-form-item class="content-padding" prop="item43032" style="display: inline-block"
                                          :inline-message="true">
                              <el-input v-model.trim="form.item43032" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                        ref="item43032" :disabled="disabledState" @blur="item4303('item43032')"
                                        class="smallInput"></el-input>
                            </el-form-item>
                          </div>
                          <p>1. 磺脲类（如格列本脲-优降糖，格列齐特-达美康，格列吡嗪-美吡哒，格列喹酮-糖适平，格列美脲等）</p>
                          <p>2. 双胍类（如苯乙双胍-降糖灵，二甲双胍-甲福明）</p>
                          <p>3. 噻唑烷二酮类（如罗格列酮和吡格列酮）</p>
                          <p>4. 格列奈类（瑞格列奈和那格列奈）</p>
                          <p>5. 葡萄糖苷酶抑制剂（阿卡波糖和伏格列波糖）</p>
                          <p>6. 二肽基肽酶—4（DPP-4）抑制剂（西格列汀、维格列汀、沙格列汀、阿格列汀、利格列汀、吉格列汀和替格列汀等）</p>
                          <p>7. 胰高血糖素样肽1受体激动剂（艾塞那肽和利拉鲁肽等）</p>
                          <p>8. 胰岛素制剂（如优泌乐、优泌林、诺和灵、来得时和 诺和平等）</p>
                          <p>9. 中药制剂（如消渴丸、降糖甲片、降糖舒和玉泉丸等）</p>
                          <p class="item26-p">10. 其他，请注明：
                            <span>
                             <el-form-item class="content-padding" prop="item430321" style="display: inline-block"
                                           :inline-message="true" v-if="form.item43032 == 10">
                                <el-input v-model.trim="form.item430321" auto-complete="off" :size="$store.state.style.assemblyModel"
                                          style="width:40px"
                                          ref="item430321" :disabled="disabledState"
                                          class="smallInput"></el-input>
                             </el-form-item>
                          </span>
                            <span>
                             <el-form-item class="content-padding" prop="" style="display: inline-block"
                                           :inline-message="true" v-if="form.item43032 != 10">
                                <el-input v-model.trim="form.item430321" auto-complete="off" :size="$store.state.style.assemblyModel"
                                          style="width:40px"
                                          ref="item430321" disabled
                                          class="smallInput"></el-input>
                             </el-form-item>
                          </span>
                          </p>
                          <p>999. 不清楚</p>
                        </el-col>
                      </td>
                    </tr>
                  </table>
                </el-form-item>
              </el-col>
              <el-col v-if="form.item43 == 1">
                <el-form-item label="" labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">43.1 &nbsp;&nbsp;您的<u style="font-weight: 600;">一级亲属</u>中是否有人患有或曾经患有糖尿病？(一级亲属：父亲、母亲、子女、直系兄弟（包括同父异母/同母异父兄弟）、直系姐妹（包括同父异母/同母异父姐妹）)
                        </p>
                        <p><span class="item26-span">0. 否；</span> <span class="item26-span">1. 是；</span></p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item431">
                          <el-input v-model.trim="form.item431" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item431" :disabled="disabledState" @blur="item425('item431')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col v-if="form.sex == 2">
                <el-form-item label="44." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">您是否患过 <u style="font-weight: 600;">乳腺疾病？</u>？（经正规医疗机构明确诊断）</p>
                        <p><span class="item26-span">0. 否；</span> <span class="item26-span">1. 是；</span></p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item44">
                          <el-input v-model.trim="form.item44" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item44" :disabled="disabledState" @blur="item425('item44')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="" labelWidth="80px" required v-if="form.item44 == 1">
                  <p class="option-p" style="font-weight:600;">请勾选下述表格中您患有的所有疾病。如果您曾多次诊断出同一种疾病，请填写首次诊断的年龄。（可多选）</p>
                  <table class="item38-table">
                    <thead>
                    <th>
                      疾病类型  0=否  1=是（可多选）
                    </th>
                    <th>
                      首次诊断时年龄（如勾选疾病，诊断年龄必填）
                    </th>
                    </thead>
                    <tr>
                      <td class="item44-table-td1">
                        良性乳腺疾病（乳腺增生、结节、导管扩张、纤维腺瘤、感染等）：
                        <el-form-item class="content-padding" prop="item4411" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item4411" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item4411" :disabled="disabledState" @blur="item38Change('item4411','item4412')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item44-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item4412" style="display: inline-block"
                                      v-if="form.item4411 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item4412" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item4412" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item4411 != 1">
                            <el-input v-model.trim="form.item4412" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item4412" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item44-table-td1">
                        其他
                        <span>
                          <el-form-item class="content-padding" prop="item4421" style="display: inline-block"
                                        :inline-message="true">
                            <el-input v-model.trim="form.item4421" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                      ref="item4421" :disabled="disabledState"
                                      @blur="item411Change('item4421','item4422','item4423')"
                                      class="smallInput"></el-input>
                          </el-form-item>
                      </span>
                        ,请注明：
                        <span>
                         <el-form-item class="content-padding" prop="item4423" style="display: inline-block"
                                       :inline-message="true" v-if="form.item4421 == 1">
                          <el-input v-model.trim="form.item4423" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:140px"
                                    ref="item4423" :disabled="disabledState"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       :inline-message="true" v-if="form.item4421 != 1">
                          <el-input v-model.trim="form.item4423" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:140px"
                                    ref="item4423" disabled
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </span>
                      </td>
                      <td class="item44-table-td2">
                      <span>
                        <el-form-item class="content-padding" prop="item4422" style="display: inline-block"
                                      v-if="form.item4421 == 1" :inline-message="true">
                          <el-input v-model.trim="form.item4422" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item4422" :disabled="disabledState"
                                    class="smallInput"></el-input> 岁
                        </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       v-if="form.item4421 != 1">
                            <el-input v-model.trim="form.item4422" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                      ref="item4422" disabled
                                      class="smallInput"></el-input> 岁
                         </el-form-item>
                      </span>
                      </td>
                    </tr>
                  </table>
                </el-form-item>
              </el-col>
            </div>
          </el-col>
          <el-col>
            <div class="formcon">
              <div class="title">
                J. 检查史
              </div>
              <el-col>
                <el-form-item label="45." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">您曾经做过<u style="font-weight: 600;">胸部 X 线片</u>检查吗？</p>
                        <p><span class="item26-span">0. 否；</span> <span class="item26-span">1. 是；</span></p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item45">
                          <el-input v-model.trim="form.item45" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item45" :disabled="disabledState" @blur="item425('item45')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col v-if="form.item45 == 1">
                <el-form-item label="46." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">您最近一次做<u style="font-weight: 600;">胸部 X 线片</u>查是哪一年？</p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding1" prop="item46">
                          <el-input v-model.trim="form.item46" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item46" :disabled="disabledState"
                                    :maxlength='4' class="smallInput"></el-input>
                          年
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col v-if="form.item45 == 1">
                <el-form-item label="47." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">您最近一次做<u style="font-weight: 600;">胸部 X 线片</u>检查的原因？</p>
                        <p><span class="item26-span">1. 因为某些特定的健康问题（如咳嗽、痰中带血等）</span> <span class="item26-span">2. 因既往疾病或健康问题需要随诊</span><span
                          class="item26-span">3. 常规体检或筛查</span></p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item47">
                          <el-input v-model.trim="form.item47" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item47" :disabled="disabledState" @blur="item47('item47')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="48." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">您曾经做过<u style="font-weight: 600;">全身</u>或<u style="font-weight: 600;">肺部（胸部）CT </u>检查吗？
                        </p>
                        <p><span class="item26-span">0. 否；</span> <span class="item26-span">1. 是；</span></p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item48">
                          <el-input v-model.trim="form.item48" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item48" :disabled="disabledState" @blur="item425('item48')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col v-if="form.item48 == 1">
                <el-form-item label="49." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">您最近一次做<u style="font-weight: 600;">全身</u>或<u style="font-weight: 600;">肺部（胸部）CT </u>是哪一年？</p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding1" prop="item49">
                          <el-input v-model.trim="form.item49" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item49" :disabled="disabledState"
                                    :maxlength='4' class="smallInput"></el-input>
                          年
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col v-if="form.item48 == 1">
                <el-form-item label="50." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">您最近一次做<u style="font-weight: 600;">全身</u>或<u style="font-weight: 600;">肺部（胸部）CT </u>检查的原因？</p>
                        <p><span class="item26-span">1. 因为某些特定的健康问题（如咳嗽、痰中带血等）</span> <span class="item26-span">2. 因既往疾病或健康问题需要随诊</span><span
                          class="item26-span">3. 常规体检或筛查</span></p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item50">
                          <el-input v-model.trim="form.item50" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item50" :disabled="disabledState" @blur="item47('item50')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="51." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">您是否<u style="font-weight: 600;">曾经</u>由于肠道不适而去医院做过检查？</p>
                        <p><span class="item26-span">0. 否</span> <span class="item26-span">1. 是</span></p>
                        <div v-if="form.item51 == 1">
                          <p class="option-p" style="padding-left: 20px;">（1）检查的项目为：
                            <el-form-item class="content-padding" prop="item511" style="display: inline-block">
                              <el-input v-model.trim="form.item511" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:200px"
                                        ref="item511" :disabled="disabledState"
                                        class="smallInput"></el-input>
                            </el-form-item>
                          </p>
                          <p class="option-p" style="padding-left: 20px;margin-top:20px">（2）最后一次的检查时间为：
                            <el-form-item class="content-padding1" prop="year512">
                              <el-input v-model.trim="form.year512" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                        ref="year512" :disabled="disabledState" @change="getyear512"
                                        :maxlength='4' class="smallInput"></el-input>
                              年
                            </el-form-item>
                            <el-form-item class="content-padding1" prop="month512">
                              <el-input v-model.trim="form.month512" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:50px"
                                        ref="month512" :disabled="disabledState" @change="getyear512"
                                        :maxlength='2' class="smallInput"></el-input>
                              月
                            </el-form-item>
                            <el-form-item class="content-padding1" prop="day512">
                              <el-input v-model.trim="form.day512" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:50px"
                                        ref="day512" :disabled="disabledState" @change="getyear512"
                                        :maxlength='2' class="smallInput"></el-input>
                              日
                            </el-form-item>
                          </p>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item51">
                          <el-input v-model.trim="form.item51" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item51" :disabled="disabledState" @blur="item425('item51')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="52." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">您是否<u style="font-weight: 600;">曾经</u>做过<u style="font-weight: 600;">结肠癌</u>检查？
                        </p>
                        <p><span class="item26-span">0. 否</span> <span class="item26-span">1. 是</span></p>
                        <div v-if="form.item52 == 1">
                          <p class="option-p" style="padding-left: 20px;">（1）上次肠镜检查时间为：
                            <el-form-item class="content-padding1" prop="year521">
                              <el-input v-model.trim="form.year521" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                        ref="year521" :disabled="disabledState" @change="getyear521"
                                        :maxlength='4' class="smallInput"></el-input>
                              年
                            </el-form-item>
                            <el-form-item class="content-padding1" prop="month521">
                              <el-input v-model.trim="form.month521" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:50px"
                                        ref="month521" :disabled="disabledState" @change="getyear521"
                                        :maxlength='2' class="smallInput"></el-input>
                              月
                            </el-form-item>
                            <el-form-item class="content-padding1" prop="day521">
                              <el-input v-model.trim="form.day521" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:50px"
                                        ref="day521" :disabled="disabledState" @change="getyear521"
                                        :maxlength='2' class="smallInput"></el-input>
                              日
                            </el-form-item>
                          </p>
                          <p class="option-p" style="padding-left: 20px;margin-top:20px">（2）总共做过几次肠镜?
                            <el-form-item class="content-padding" prop="item522" style="display: inline-block">
                              <el-input v-model.trim="form.item522" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:80px"
                                        ref="item522" :disabled="disabledState"
                                        class="smallInput"></el-input>
                              次
                            </el-form-item>
                          </p>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item52">
                          <el-input v-model.trim="form.item52" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item52" :disabled="disabledState" @blur="item425('item52')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="53." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">您是否进行过<u style="font-weight: 600;">粪便潜血试验（FOBT）</u>检测？</p>
                        <p><span class="item26-span">0. 否</span> <span class="item26-span">1. 是</span></p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item53">
                          <el-input v-model.trim="form.item53" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item53" :disabled="disabledState" @blur="item425('item53')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="" labelWidth="80px" required v-if="form.item53 == 1">
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p" style="padding-left: 20px;">粪便潜血试验（FOBT）检测结果为？<span
                          class="item26-span">0. 阴性</span> <span class="item26-span">1. 阳性</span><span
                          class="item26-span">999. 不清楚</span></p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item531">
                          <el-input v-model.trim="form.item531" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item531" :disabled="disabledState" @blur="item531('item531')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="54." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">您是否进行过<u style="font-weight: 600;">乙肝表面抗原（HBsAg）</u>检测？</p>
                        <p><span class="item26-span">0. 否</span> <span class="item26-span">1. 是</span></p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item54">
                          <el-input v-model.trim="form.item54" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item54" :disabled="disabledState" @blur="item425('item54')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="" labelWidth="80px" required v-if="form.item54 == 1">
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p" style="padding-left: 20px;">乙肝表面抗原检测结果为？<span class="item26-span">0. 阴性</span>
                          <span class="item26-span">1. 阳性</span><span class="item26-span">999. 不清楚</span></p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item541">
                          <el-input v-model.trim="form.item541" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    ref="item541" :disabled="disabledState" @blur="item531('item541')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </div>
          </el-col>
          <el-col>
            <div class="formcon">
              <div class="title">
                L. 恶性肿瘤家族史
              </div>
              <el-col>
                <el-form-item label="55." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">您的<u style="font-weight: 600;">血缘亲属</u>中，是否有人曾患癌症？</p>
                        <p><span class="item26-span">0. 否；</span> <span class="item26-span">1. 是；</span></p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item55">
                          <el-input v-model.trim="form.item55" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item55" :disabled="disabledState" @blur="item425('item55')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="" labelWidth="80px" required v-if="form.item55 == 1">
                  <p class="option-p" style="font-weight:600;">请您填选下面表格：（可多选）</p>
                  <p style="width: 860px;">亲属关系代码：<span class="item55-span">1=母亲</span> <span
                    class="item55-span"> 2=父亲</span>
                    <span class="item55-span">  3=姐妹（包括同父异母姐妹或同母异父姐妹）</span> <span class="item55-span">    4=兄弟（包括同父异母兄弟或同母异父兄弟） </span>
                    <span>  5=祖父母</span> <span class="item55-span">
                  6=外祖父母</span> <span class="item55-span">    7=叔姑 </span> <span class="item55-span">   8=舅姨 </span>
                    <span class="item55-span">  9=姑姨  </span> <span class="item55-span">     10=堂兄弟姐妹</span> <span
                      class="item55-span"> 11=表兄弟姐妹 </span> <span class="item55-span">  12.其他</span>
                  </p>
                  <table class="item55-table">
                    <thead>
                    <th>
                      是否为以上癌种？（0=否，1=是）
                    </th>
                    <th>
                      是何亲属曾患此种癌症（请从代码中填选）（可多选）？
                    </th>
                    </thead>
                    <tr>
                      <td class="item55-table-td1">
                        肺癌：
                        <el-form-item class="content-padding" prop="item5511" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item5511" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item5511" :disabled="disabledState" @blur="item5512Change('item5511','item5512List')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item55-table-td2">
                      <span>
                         <el-form-item class="content-padding" prop="item5512List" style="display: inline-block"
                                       :inline-message="true" v-if="form.item5511 == 1">
                        <el-tag
                          :key="tag"
                          v-for="tag,index in form.item5512List"
                          :closable="!disabledState"
                          :disable-transitions="false"
                          @close="handleClose(tag,'item5512List')">
                          {{tag}}
                        </el-tag>
                        <el-input
                          class="input-new-tag"
                          v-model="form.item5510"
                          v-if="!disabledState"
                          ref="item5510"
                          :size="$store.state.style.assemblyModel"
                        >
                        </el-input>
                        <el-button icon="el-icon-plus" type="primary" circle :size="$store.state.style.assemblyModel"   v-if="!disabledState"
                                   @click="addInput('item5512List','item5510')"></el-button>
                      </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       :inline-message="true" v-if="form.item5511 != 1">
                        <el-tag
                          :key="tag"
                          v-for="tag,index in form.item5512List"
                          :closable="!disabledState"
                          :disable-transitions="false"
                          @close="handleClose(tag,'item5512List')">
                          {{tag}}
                        </el-tag>
                        <el-input
                          class="input-new-tag"
                          v-model="form.item5510"
                          :size="$store.state.style.assemblyModel"
                          disabled
                        >
                        </el-input>
                      </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item55-table-td1">
                        食管癌：
                        <el-form-item class="content-padding" prop="item5521" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item5521" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item5521" :disabled="disabledState" @blur="item5512Change('item5521','item5522List')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item55-table-td2">
                      <span>
                         <el-form-item class="content-padding" prop="item5522List" style="display: inline-block"
                                       :inline-message="true" v-if="form.item5521 == 1">
                        <el-tag
                          :key="tag"
                          v-for="tag,index in form.item5522List"
                          :closable="!disabledState"
                          :disable-transitions="false"
                          @close="handleClose(tag,'item5522List')">
                          {{tag}}
                        </el-tag>
                        <el-input
                          class="input-new-tag"
                          v-model="form.item5520"
                          ref="item5520"
                          :size="$store.state.style.assemblyModel"
                          v-if="!disabledState"
                        >
                        </el-input>
                        <el-button icon="el-icon-plus" type="primary" circle :size="$store.state.style.assemblyModel"  v-if="!disabledState"
                                   @click="addInput('item5522List','item5520')"></el-button>
                      </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       :inline-message="true" v-if="form.item5521 != 1">
                        <el-tag
                          :key="tag"
                          v-for="tag,index in form.item5522List"
                          :closable="!disabledState"
                          :disable-transitions="false"
                          @close="handleClose(tag,'item5522List')">
                          {{tag}}
                        </el-tag>
                        <el-input
                          class="input-new-tag"
                          v-model="form.item5520"
                          :size="$store.state.style.assemblyModel"
                          disabled
                        >
                        </el-input>
                      </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item55-table-td1">
                        胃癌：
                        <el-form-item class="content-padding" prop="item5531" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item5531" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item5531" :disabled="disabledState" @blur="item5512Change('item5531','item5532List')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item55-table-td2">
                      <span>
                         <el-form-item class="content-padding" prop="item5532List" style="display: inline-block"
                                       :inline-message="true" v-if="form.item5531 == 1">
                        <el-tag
                          :key="tag"
                          v-for="tag,index in form.item5532List"
                          :closable="!disabledState"
                          :disable-transitions="false"
                          @close="handleClose(tag,'item5532List')">
                          {{tag}}
                        </el-tag>
                        <el-input
                          class="input-new-tag"
                          v-model="form.item5530"
                          ref="item5530"
                          v-if="!disabledState"
                          :size="$store.state.style.assemblyModel"
                        >
                        </el-input>
                        <el-button icon="el-icon-plus" type="primary" circle :size="$store.state.style.assemblyModel"  v-if="!disabledState"
                                   @click="addInput('item5532List','item5530')"></el-button>
                      </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       :inline-message="true" v-if="form.item5531 != 1">
                        <el-tag
                          :key="tag"
                          v-for="tag,index in form.item5532List"
                          :closable="!disabledState"
                          :disable-transitions="false"
                          @close="handleClose(tag,'item5532List')">
                          {{tag}}
                        </el-tag>
                        <el-input
                          class="input-new-tag"
                          v-model="form.item5530"
                          :size="$store.state.style.assemblyModel"
                          disabled
                        >
                        </el-input>
                      </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item55-table-td1">
                        肝癌：
                        <el-form-item class="content-padding" prop="item5541" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item5541" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item5541" :disabled="disabledState" @blur="item5512Change('item5541','item5542List')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item55-table-td2">
                      <span>
                         <el-form-item class="content-padding" prop="item5542List" style="display: inline-block"
                                       :inline-message="true" v-if="form.item5541 == 1">
                        <el-tag
                          :key="tag"
                          v-for="tag,index in form.item5542List"
                          :closable="!disabledState"
                          :disable-transitions="false"
                          @close="handleClose(tag,'item5542List')">
                          {{tag}}
                        </el-tag>
                        <el-input
                          class="input-new-tag"
                          v-model="form.item5540"
                          ref="item5540"
                          :size="$store.state.style.assemblyModel"
                          v-if="!disabledState"
                        >
                        </el-input>
                        <el-button icon="el-icon-plus" type="primary" circle :size="$store.state.style.assemblyModel"  v-if="!disabledState"
                                   @click="addInput('item5542List','item5540')"></el-button>
                      </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       :inline-message="true" v-if="form.item5541 != 1">
                        <el-tag
                          :key="tag"
                          v-for="tag,index in form.item5542List"
                          :closable="!disabledState"
                          :disable-transitions="false"
                          @close="handleClose(tag,'item5542List')">
                          {{tag}}
                        </el-tag>
                        <el-input
                          class="input-new-tag"
                          v-model="form.item5540"
                          :size="$store.state.style.assemblyModel"
                          disabled
                        >
                        </el-input>
                      </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item55-table-td1">
                        结（直）肠癌：
                        <el-form-item class="content-padding" prop="item5551" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item5551" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item5551" :disabled="disabledState" @blur="item5512Change('item5551','item5552List')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item55-table-td2">
                      <span>
                         <el-form-item class="content-padding" prop="item5552List" style="display: inline-block"
                                       :inline-message="true" v-if="form.item5551 == 1">
                        <el-tag
                          :key="tag"
                          v-for="tag,index in form.item5552List"
                          :closable="!disabledState"
                          :disable-transitions="false"
                          @close="handleClose(tag,'item5552List')">
                          {{tag}}
                        </el-tag>
                        <el-input
                          class="input-new-tag"
                          v-model="form.item5550"
                          ref="item5550"
                          :size="$store.state.style.assemblyModel"
                          v-if="!disabledState"
                        >
                        </el-input>
                        <el-button icon="el-icon-plus" type="primary" circle :size="$store.state.style.assemblyModel"  v-if="!disabledState"
                                   @click="addInput('item5552List','item5550')"></el-button>
                      </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       :inline-message="true" v-if="form.item5551 != 1">
                        <el-tag
                          :key="tag"
                          v-for="tag,index in form.item5552List"
                          :closable="!disabledState"
                          :disable-transitions="false"
                          @close="handleClose(tag,'item5552List')">
                          {{tag}}
                        </el-tag>
                        <el-input
                          class="input-new-tag"
                          v-model="form.item5550"
                          :size="$store.state.style.assemblyModel"
                          disabled
                        >
                        </el-input>
                      </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item55-table-td1" >
                        乳腺癌：
                        <el-form-item class="content-padding" prop="item5561" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item5561" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item5561" :disabled="disabledState" @blur="item5512Change('item5561','item5562List')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                        <div v-if="form.item5561 == 1">
                          <p class="option-p">您是否有一级血缘亲属（母亲、亲姐妹）在50岁及以前曾患乳腺癌：
                            <span>
                             <el-form-item class="content-padding" prop="item5563"  style="display:inline-block">
                              <el-input v-model.trim="form.item5563" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                        ref="item5563" :disabled="disabledState" @blur="item425('item55')"
                                        class="smallInput"></el-input>
                             </el-form-item>
                          </span>
                          </p>
                          <p><span class="item26-span">0. 否；</span> <span class="item26-span">1. 是；</span></p>
                        </div>
                      </td>
                      <td class="item55-table-td2">
                      <span>
                         <el-form-item class="content-padding" prop="item5562List" style="display: inline-block"
                                       :inline-message="true" v-if="form.item5561 == 1">
                        <el-tag
                          :key="tag"
                          v-for="tag,index in form.item5562List"
                          :closable="!disabledState"
                          :disable-transitions="false"
                          @close="handleClose(tag,'item5562List')">
                          {{tag}}
                        </el-tag>
                        <el-input
                          class="input-new-tag"
                          v-model="form.item5560"
                          ref="item5560"
                          v-if="!disabledState"
                          :size="$store.state.style.assemblyModel"
                        >
                        </el-input>
                        <el-button icon="el-icon-plus" type="primary" circle :size="$store.state.style.assemblyModel"  v-if="!disabledState"
                                   @click="addInput('item5562List','item5560')"></el-button>
                      </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       :inline-message="true" v-if="form.item5561 != 1">
                        <el-tag
                          :key="tag"
                          v-for="tag,index in form.item5562List"
                          :closable="!disabledState"
                          :disable-transitions="false"
                          @close="handleClose(tag,'item5562List')">
                          {{tag}}
                        </el-tag>
                        <el-input
                          class="input-new-tag"
                          v-model="form.item5560"
                          :size="$store.state.style.assemblyModel"
                          disabled
                        >
                        </el-input>
                      </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item55-table-td1">
                        卵巢癌：
                        <el-form-item class="content-padding" prop="item5571" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item5571" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item5571" :disabled="disabledState" @blur="item5512Change('item5571','item5572List')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item55-table-td2">
                      <span>
                         <el-form-item class="content-padding" prop="item5572List" style="display: inline-block"
                                       :inline-message="true" v-if="form.item5571 == 1">
                        <el-tag
                          :key="tag"
                          v-for="tag,index in form.item5572List"
                          :closable="!disabledState"
                          :disable-transitions="false"
                          v-if="!disabledState"
                          @close="handleClose(tag,'item5572List')">
                          {{tag}}
                        </el-tag>
                        <el-input
                          class="input-new-tag"
                          v-model="form.item5570"
                          ref="item5570"
                          :size="$store.state.style.assemblyModel"
                          v-if="disabledState == false"
                        >
                        </el-input>
                        <el-button icon="el-icon-plus" type="primary" circle :size="$store.state.style.assemblyModel"   v-if="!disabledState"
                                   @click="addInput('item5572List','item5570')"></el-button>
                      </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       :inline-message="true" v-if="form.item5571 != 1">
                        <el-tag
                          :key="tag"
                          v-for="tag,index in form.item5572List"
                          :closable="!disabledState"
                          :disable-transitions="false"
                          @close="handleClose(tag,'item5572List')">
                          {{tag}}
                        </el-tag>
                        <el-input
                          class="input-new-tag"
                          v-model="form.item5570"
                          :size="$store.state.style.assemblyModel"
                          disabled
                        >
                        </el-input>
                      </el-form-item>
                      </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="item55-table-td1">
                        其他（包括不清楚）：
                        <el-form-item class="content-padding" prop="item5581" style="display: inline-block"
                                      :inline-message="true">
                          <el-input v-model.trim="form.item5581" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item5581" :disabled="disabledState" @blur="item5512Change('item5581','item5582List')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item55-table-td2">
                      <span>
                         <el-form-item class="content-padding" prop="item5582List" style="display: inline-block"
                                       :inline-message="true" v-if="form.item5581 == 1">
                        <el-tag
                          :key="tag"
                          v-for="tag,index in form.item5582List"
                          :closable="!disabledState"
                          v-if="!disabledState"
                          :disable-transitions="false"
                          @close="handleClose(tag,'item5582List')">
                          {{tag}}
                        </el-tag>
                        <el-input
                          class="input-new-tag"
                          v-model="form.item5580"
                          v-if="disabledState == false"
                          ref="item5580"
                          :size="$store.state.style.assemblyModel"
                        >
                        </el-input>
                        <el-button icon="el-icon-plus" type="primary" circle :size="$store.state.style.assemblyModel"  v-if="!disabledState"
                                   @click="addInput('item5582List','item5580')"></el-button>
                      </el-form-item>
                      </span>
                        <span>
                         <el-form-item class="content-padding" prop="" style="display: inline-block"
                                       :inline-message="true" v-if="form.item5581 != 1">
                        <el-tag
                          :key="tag"
                          v-for="tag,index in form.item5582List"
                          :closable="!disabledState"
                          :disable-transitions="false"
                          @close="handleClose(tag,'item5582List')">
                          {{tag}}
                        </el-tag>
                        <el-input
                          class="input-new-tag"
                          v-model="form.item5580"
                          :size="$store.state.style.assemblyModel"
                          disabled
                        >
                        </el-input>
                      </el-form-item>
                      </span>
                      </td>
                    </tr>
                  </table>
                </el-form-item>
              </el-col>
            </div>
          </el-col>
          <el-col>
            <div class="formcon">
              <div class="title">
                M. 药物史
              </div>
              <el-col>
                <el-form-item label="56." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">您是否正在或曾经长期服用<u style="font-weight: 600;">镇痛药或抗风湿类药物</u>（例如：阿司匹林、对乙酰氨基酚、消炎痛、扶他林、扑热息痛、布洛芬等）、<u
                          style="font-weight: 600;">维生素、降压药、调脂药（如他汀）、降糖药、抗凝血药物</u>（例如：华法林、肝素、达比加群、通心络等）？</p>
                        <p><span class="item26-span">0. 否；</span> <span class="item26-span">1. 是；</span></p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item56">
                          <el-input v-model.trim="form.item56" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item56" :disabled="disabledState" @blur="item425('item56')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="" labelWidth="80px" required v-if="form.item56 == 1">
                  <table class="item56-table">
                    <thead>
                    <th>
                      药品名
                    </th>
                    <th>
                      服用次数（次/天）
                    </th>
                    <th>
                      累计服药时间（请从年 月 周 天中勾选）
                    </th>
                    </thead>
                    <tr v-for="x,index in form.hosAnalgesicHistoryList" :key="index">
                      <td class="item56-table-td1">
                        <el-form-item class="content-padding" :prop="'hosAnalgesicHistoryList.'+index+'.drugName'"
                                      :rules="hosAnalgesicHistoryListRules.drugName">
                          <el-input v-model.trim="x.drugName" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:300px"
                                    :ref="'hosAnalgesicHistoryList.'+index+'.drugName'" :disabled="disabledState"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item56-table-td2">
                        <el-form-item class="content-padding" :prop="'hosAnalgesicHistoryList.'+index+'.frequency'"
                                      :rules="hosAnalgesicHistoryListRules.frequency">
                          <el-input v-model.trim="x.frequency" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:50px"
                                    :ref="'hosAnalgesicHistoryList.'+index+'.frequency'" :disabled="disabledState"
                                    class="smallInput"></el-input>
                          次／天
                        </el-form-item>
                      </td>
                      <td class="item56-table-td3">
                        <el-form-item class="content-padding" :prop="'hosAnalgesicHistoryList.'+index+'.countTime'"
                                      style="display:inline-block;width:150px"
                                      :rules="hosAnalgesicHistoryListRules.countTime">
                          <el-input v-model.trim="x.countTime" auto-complete="off" :size="$store.state.style.assemblyModel"
                                    style="width:100px;display: inline-block;"
                                    :ref="'hosAnalgesicHistoryList.'+index+'.countTime'" :disabled="disabledState"
                                    class="smallInput"></el-input>
                        </el-form-item>
                        <el-form-item class="content-padding" :prop="'hosAnalgesicHistoryList.'+index+'.countTimeType'"
                                      style="display:inline-block;"
                                      :rules="hosAnalgesicHistoryListRules.countTimeType">
                          <el-radio-group v-model="x.countTimeType">
                            <el-radio :label="1" :ref="'hosAnalgesicHistoryList.'+index+'.countTimeType'">年</el-radio>
                            <el-radio :label="2">月</el-radio>
                            <el-radio :label="3">周</el-radio>
                            <el-radio :label="4">日</el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </td>
                    </tr>
                  </table>
                  <div class="item56-btn" v-if="!disabledState">
                    <el-button type="primary" icon="el-icon-plus" :size="$store.state.style.assemblyModel" @click="item56Plus()"></el-button>
                    <el-button icon="el-icon-delete" :size="$store.state.style.assemblyModel" :disabled="form.hosAnalgesicHistoryList.length<2"
                               @click="item56Reduce()"></el-button>
                  </div>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="57." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">您<u style="font-weight: 600;">最近30天内</u>是否服用过<u style="font-weight: 600;">抗炎药（抗生素）</u>？
                        </p>
                        <p><span class="item26-span">0. 否；</span> <span class="item26-span">1. 是；</span></p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item57">
                          <el-input v-model.trim="form.item57" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item57" :disabled="disabledState" @blur="item425('item57')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="" labelWidth="80px" required v-if="form.item57 == 1">
                  <table class="item57-table">
                    <thead>
                    <th>
                      药品名
                    </th>
                    <th>
                      服用次数（次/天）
                    </th>
                    <th>
                      开始服用时间
                    </th>
                    <th>
                      累计服药时间（请从年 月 周 天中勾选）
                    </th>
                    </thead>
                    <tr v-for="x,index in form.hosAntibioticHistoryList" :key="index">
                      <td class="item57-table-td1">
                        <el-form-item class="content-padding" :prop="'hosAntibioticHistoryList.'+index+'.drugName'"
                                      :rules="hosAntibioticHistoryRules.drugName">
                          <el-input v-model.trim="x.drugName" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:300px"
                                    :ref="'hosAntibioticHistoryList.'+index+'.drugName'" :disabled="disabledState"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item57-table-td2">
                        <el-form-item class="content-padding" :prop="'hosAntibioticHistoryList.'+index+'.frequency'"
                                      :rules="hosAntibioticHistoryRules.frequency">
                          <el-input v-model.trim="x.frequency" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:50px"
                                    :ref="'hosAntibioticHistoryList.'+index+'.frequency'" :disabled="disabledState"
                                    class="smallInput"></el-input>
                          次／天
                        </el-form-item>
                      </td>
                      <td class="item57-table-td3">
                        <el-form-item class="content-padding1" :prop="'hosAntibioticHistoryList.'+index+'.year'"
                                      :rules="hosAntibioticHistoryRules.year">
                          <el-input v-model.trim="x.year" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    :ref="'hosAntibioticHistoryList.'+index+'.year'" :disabled="disabledState"
                                    @change="getyear57(x,index)"
                                    :maxlength='4' class="smallInput"></el-input>
                          年
                        </el-form-item>
                        <el-form-item class="content-padding1" :prop="'hosAntibioticHistoryList.'+index+'.month'"
                                      :rules="hosAntibioticHistoryRules.month">
                          <el-input v-model.trim="x.month" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:50px"
                                    :ref="'hosAntibioticHistoryList.'+index+'.month'" :disabled="disabledState"
                                    @change="getyear57(x,index)"
                                    :maxlength='2' class="smallInput"></el-input>
                          月
                        </el-form-item>
                        <el-form-item class="content-padding1" :prop="'hosAntibioticHistoryList.'+index+'.day'"
                                      :rules="hosAntibioticHistoryRules.day">
                          <el-input v-model.trim="x.day" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:50px"
                                    :ref="'hosAntibioticHistoryList.'+index+'.day'" :disabled="disabledState"
                                    @change="getyear57(x,index)"
                                    :maxlength='2' class="smallInput"></el-input>
                          日
                        </el-form-item>
                      </td>
                      <td class="item57-table-td4">
                        <el-form-item class="content-padding" :prop="'hosAntibioticHistoryList.'+index+'.countTime'"
                                      style="display:inline-block;"
                                      :rules="hosAntibioticHistoryRules.countTime">
                          <el-input v-model.trim="x.countTime" auto-complete="off" :size="$store.state.style.assemblyModel"
                                    style="width:100px;display: inline-block;"
                                    :ref="'hosAntibioticHistoryList.'+index+'.countTime'" :disabled="disabledState"
                                    class="smallInput"></el-input>
                          天
                        </el-form-item>
                      </td>
                    </tr>
                  </table>
                  <div class="item56-btn" v-if="!disabledState">
                    <el-button type="primary" icon="el-icon-plus" :size="$store.state.style.assemblyModel" @click="item57Plus()"></el-button>
                    <el-button icon="el-icon-delete" :size="$store.state.style.assemblyModel" :disabled="form.hosAntibioticHistoryList.length<2"
                               @click="item57Reduce()"></el-button>
                  </div>
                </el-form-item>
              </el-col>
            </div>
          </el-col>
          <el-col v-if="this.form.sex == 2">
            <div class="formcon">
              <div class="title">
                N. 女性相关问题
              </div>
              <el-col>
                <el-form-item label="58." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">您的<u style="font-weight: 600;">首次</u>月经年龄？</p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item58">
                          <el-input v-model.trim="form.item58" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:50px"
                                    ref="item58" :disabled="disabledState" :maxlength='2'
                                    class="smallInput"></el-input>
                          岁
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="59." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">您的月经周期是否规律？</p>
                        <p><span class="item26-span">0. 否；</span> <span class="item26-span">1. 是；</span></p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item59">
                          <el-input v-model.trim="form.item59" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item59" :disabled="disabledState" @blur="item425('item59')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="60." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">您是否已绝闭经？</p>
                        <p><span class="item26-span">0. 否；</span> <span class="item26-span">1. 是；</span></p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item60">
                          <el-input v-model.trim="form.item60" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item60" :disabled="disabledState" @blur="item425('item60')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="" labelWidth="80px" required v-if="form.item60 == 1">
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p" style="padding-left: 20px">那么您的<u style="font-weight: 600;">停经年龄</u>是（周岁）：</p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item601">
                          <el-input v-model.trim="form.item601" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:50px"
                                    ref="item601" :disabled="disabledState" :maxlength='2'
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="61." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">您是否曾分娩（包括自然分娩和剖腹产）？</p>
                        <p><span class="item26-span">0. 否；</span> <span class="item26-span">1. 是；</span></p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item61">
                          <el-input v-model.trim="form.item61" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item61" :disabled="disabledState" @blur="item425('item61')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="" labelWidth="80px" required v-if="form.item61 == 1">
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p" style="padding-left: 20px">那么您的<u style="font-weight: 600;">初次生育年龄</u>是（周岁）：
                        </p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item611">
                          <el-input v-model.trim="form.item611" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:50px"
                                    ref="item611" :disabled="disabledState" :maxlength='2'
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="62." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">您是否有哺乳史？</p>
                        <p><span class="item26-span">0. 否；</span> <span class="item26-span">1. 是；</span></p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item62">
                          <el-input v-model.trim="form.item62" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item62" :disabled="disabledState" @blur="item425('item62')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="" labelWidth="80px" required v-if="form.item62 == 1">
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p" style="padding-left: 20px">那么共累计哺乳多少个月（不足一月按一月计）？</p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item621">
                          <el-input v-model.trim="form.item621" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:80px"
                                    ref="item621" :disabled="disabledState" :maxlength='3'
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="63." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p">您是否曾进行女性生殖系统手术（子宫、卵巢和输卵管等部位的手术，包括剖腹产）？</p>
                        <p><span class="item26-span">0. 否</span> <span class="item26-span">1. 是，请注明手术名称或手术部位：
                        <span>
                            <el-form-item class="content-padding" prop="item631" v-if="form.item63 == 1"
                                          style="display:inline-block">
                              <el-input v-model.trim="form.item631" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:140px"
                                        ref="item631" :disabled="disabledState"
                                        class="smallInput"></el-input>
                            </el-form-item>
                        </span>
                         <span>
                              <el-form-item class="content-padding" prop="" v-if="form.item63 != 1"
                                            style="display:inline-block">
                                <el-input v-model.trim="form.item631" auto-complete="off" :size="$store.state.style.assemblyModel"
                                          style="width:140px"
                                          ref="item631" disabled
                                          class="smallInput"></el-input>
                              </el-form-item>
                          </span>

                      </span></p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item63">
                          <el-input v-model.trim="form.item63" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item63" :disabled="disabledState" @blur="item425('item63')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="64." labelWidth="80px" required>
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple">
                        <p class="option-p"> 您是否曾接受过<u style="font-weight: 600;">激素替代治疗（雌激素或雌/孕激素联合治疗</u>，给药途径包括口服、皮贴、涂抹霜剂或凝胶、经阴道使用的霜、片、栓、硅胶环等）？
                        </p>
                        <p><span class="item26-span">1. 否</span> <span class="item26-span">2. 是，正在接受治疗</span><span
                          class="item26-span">3. 是，曾经接受治疗</span></p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <el-form-item class="content-padding" prop="item64">
                          <el-input v-model.trim="form.item64" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:40px"
                                    ref="item64" :disabled="disabledState" @blur="item64Change('item64')"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>

              </el-col>
              <el-col v-if="form.item64 == 2 || form.item64 == 3">
                <el-form-item label="" labelWidth="80px" required>
                  <el-row>
                    <el-col :span="24">
                      <div class="grid-content bg-purple">
                        <p class="option-p"> 64.1 您的治疗方案？</p>
                        <p>
                          <el-form-item class="content-padding" prop="scheme">
                            <div style="padding-left:20px;padding-top:20px">
                              <el-radio-group v-model="form.scheme">
                                <el-radio :label="1" ref="scheme">只服用雌激素</el-radio>
                                <br>
                                <el-radio :label="2" style="margin-top:10px">联合服用雌/孕激素</el-radio>
                              </el-radio-group>
                            </div>

                          </el-form-item>
                        </p>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="" labelWidth="80px" required>
                  <table class="item64-table">
                    <thead>
                    <th>
                      请列举所有激素药物的种类或商品名
                    </th>
                    <th>
                      首次接受治疗时间
                    </th>
                    <th v-if="form.item64 == 3">
                      停止接受治疗时间
                    </th>
                    </thead>
                    <tr v-for="x,index in form.hosHormoneDrugsHistoryList" :key="index">
                      <td class="item64-table-td2">
                        <el-form-item class="content-padding" :prop="'hosHormoneDrugsHistoryList.'+index+'.drugName'"
                                      :rules="hosHormoneDrugsHistoryRules.drugName">
                          <el-input v-model.trim="x.drugName" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:300px"
                                    :ref="'hosHormoneDrugsHistoryList.'+index+'.drugName'" :disabled="disabledState"
                                    class="smallInput"></el-input>
                        </el-form-item>
                      </td>
                      <td class="item64-table-td3">
                        <el-form-item class="content-padding1" :prop="'hosHormoneDrugsHistoryList.'+index+'.year'"
                                      :rules="hosHormoneDrugsHistoryRules.year">
                          <el-input v-model.trim="x.year" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    :ref="'hosHormoneDrugsHistoryList.'+index+'.year'" :disabled="disabledState"
                                    @change="getyear64(x,index)"
                                    :maxlength='4' class="smallInput"></el-input>
                          年
                        </el-form-item>
                        <el-form-item class="content-padding1" :prop="'hosHormoneDrugsHistoryList.'+index+'.month'"
                                      :rules="hosHormoneDrugsHistoryRules.month">
                          <el-input v-model.trim="x.month" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:50px"
                                    :ref="'hosHormoneDrugsHistoryList.'+index+'.month'" :disabled="disabledState"
                                    @change="getyear64(x,index)"
                                    :maxlength='2' class="smallInput"></el-input>
                          月
                        </el-form-item>
                      </td>
                      <td class="item64-table-td3" v-if="form.item64 == 3">
                        <el-form-item class="content-padding1" :prop="'hosHormoneDrugsHistoryList.'+index+'.year1'"
                                      :rules="hosHormoneDrugsHistoryRules.year1">
                          <el-input v-model.trim="x.year1" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:60px"
                                    :ref="'hosHormoneDrugsHistoryList.'+index+'.year1'" :disabled="disabledState"
                                    @change="getyear641(x,index)"
                                    :maxlength='4' class="smallInput"></el-input>
                          年
                        </el-form-item>
                        <el-form-item class="content-padding1" :prop="'hosHormoneDrugsHistoryList.'+index+'.month1'"
                                      :rules="hosHormoneDrugsHistoryRules.month1">
                          <el-input v-model.trim="x.month1" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:50px"
                                    :ref="'hosHormoneDrugsHistoryList.'+index+'.month1'" :disabled="disabledState"
                                    @change="getyear641(x,index)"
                                    :maxlength='2' class="smallInput"></el-input>
                          月
                        </el-form-item>
                      </td>
                    </tr>
                  </table>
                  <div class="item56-btn" v-if="!disabledState">
                    <el-button type="primary" icon="el-icon-plus" :size="$store.state.style.assemblyModel" @click="item64Plus()"></el-button>
                    <el-button icon="el-icon-delete" :size="$store.state.style.assemblyModel" :disabled="form.hosHormoneDrugsHistoryList.length<2"
                               @click="item64Reduce()"></el-button>
                  </div>
                </el-form-item>
              </el-col>
            </div>
          </el-col>
          <el-col>
            <div class="formcon">
              <div class="title">
                承诺书
              </div>
              <el-form-item label="" labelWidth="80px" required>
                <p class="item-font-weight">本人承诺：本人如实回答本问卷中所有问题，该问卷能真实反映本人基本资料、疾病史、家庭史和吸烟史等信息</p>
              </el-form-item>
              <el-col :span="12">
                <el-form-item label="" labelWidth="80px" required>
                  <el-row>
                    <el-col :span="24">
                      <div class="grid-content bg-purple">
                        <p class="option-p">研究对象姓名：
                          <el-form-item class="content-padding1" prop="researchName">
                            <el-input v-model.trim="form.researchName" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:200px"
                                      ref="researchName" :disabled="disabledState"
                                      class="smallInput"></el-input>
                          </el-form-item>
                        </p>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="" labelWidth="80px" required>
                  <el-row>
                    <el-col :span="24">
                      <div class="grid-content bg-purple">
                        <p class="option-p">日期：
                          <el-form-item class="content-padding1" prop="researchDate">
                            <el-date-picker
                              v-model="form.researchDate"
                              :disabled="disabledState"
                              type="date"
                              :size="$store.state.style.assemblyModel"
                              placeholder="选择日期"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd"
                              ref="researchDate"
                              :picker-options="pickerOptions1">
                            </el-date-picker>
                          </el-form-item>
                        </p>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="" labelWidth="80px" required>
                  <el-row>
                    <el-col :span="24">
                      <div class="grid-content bg-purple">
                        <p class="option-p">研究对象或委托人签字：
                          <el-form-item class="content-padding1" prop="researchSignature">
                            <el-input v-model.trim="form.researchSignature" auto-complete="off" :size="$store.state.style.assemblyModel"
                                      style="width:200px"
                                      ref="researchSignature" :disabled="disabledState"
                                      class="smallInput"></el-input>
                          </el-form-item>
                        </p>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="" labelWidth="80px" required>
                  <el-row>
                    <el-col :span="24">
                      <div class="grid-content bg-purple">
                        <p class="option-p">若为委托人签字，与研究对象关系：
                          <el-form-item class="content-padding1" prop="clientRelationship">
                            <el-input v-model.trim="form.clientRelationship" auto-complete="off" :size="$store.state.style.assemblyModel"
                                      style="width:200px"
                                      ref="clientRelationship" :disabled="disabledState"
                                      class="smallInput"></el-input>
                          </el-form-item>
                        </p>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="" labelWidth="80px" required>
                  <el-row>
                    <el-col :span="24">
                      <div class="grid-content bg-purple">
                        <p class="option-p">调查员签名：
                          <el-form-item class="content-padding1" prop="investigator">
                            <el-input v-model.trim="form.investigator" auto-complete="off" :size="$store.state.style.assemblyModel" style="width:200px"
                                      ref="investigator" :disabled="disabledState"
                                      class="smallInput"></el-input>
                          </el-form-item>
                        </p>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="" labelWidth="80px" required>
                  <el-row>
                    <el-col :span="24">
                      <div class="grid-content bg-purple">
                        <p class="option-p">调查日期：
                          <el-form-item class="content-padding1" prop="investigationDate">
                            <el-date-picker
                              v-model="form.investigationDate"
                              :disabled="disabledState"
                              type="date"
                              :size="$store.state.style.assemblyModel"
                              placeholder="选择日期"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd"
                              ref="investigationDate"
                              :picker-options="pickerOptions1">
                            </el-date-picker>
                          </el-form-item>
                        </p>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </div>
          </el-col>
          <div class="addbtn" v-if="!disabledState">
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">生成报告</el-button>
              <el-button @click="goBack">取消</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Right',
    data () {
      var validatePhone = (rule, value, callback) => {
        if (value === '' || value == null) {
          callback(new Error('手机号不能为空'));
        } else if (!(/\d/.test(value))) {
          callback(new Error('手机号只能是数字'))
        } else if (value.length != 11) {
          callback(new Error('请输入合法的11位手机号'));
        } else {
          callback();
        }
      };
      var validatecontact_area = (rule, value, callback) => {
        if (value && !(/^\d{3,4}$/.test(value))) {
          callback(new Error('请输入3-4位区号'))
        } else {
          callback();
        }
      };
      var validatecontact_telephone = (rule, value, callback) => {
        if (value && !(/^\d{7,8}$/.test(value))) {
          callback(new Error('请输入7-8位座机号码'))
        } else {
          callback();
        }
      };
      var contactRelationship = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^[\u4e00-\u9fa5]{2,10}$/.test(value))) {
          callback(new Error('只能是2-5个汉字'))
        } else {
          callback();
        }
      };
      var validate_address = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^[\u4e00-\u9fa5]{5,30}$/.test(value))) {
          callback(new Error('只能是5-30个汉字'))
        } else {
          callback();
        }
      };
      var validat_height = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^\d{2,3}$/.test(value))) {
          callback(new Error('身高:（50-300）'))
        } else if (value > 300 || value < 50) {
          callback(new Error('身高:（50-300）'))
        } else {
          callback();
        }
      };
      var validat_weight = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^\d{2,3}$/.test(value))) {
          callback(new Error('体重:（10-200）'))
        } else if (value > 200 || value < 10) {
          callback(new Error('体重:（10-200）'))
        } else {
          callback();
        }
      };
      var validat_waistline = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^\d{1,3}$/.test(value))) {
          callback(new Error('腰围:（0-150）'))
        } else if (value > 150 || value < 0) {
          callback(new Error('腰围:（0-150）'))
        } else {
          callback();
        }
      };
      var validat_hipline = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^\d{1,3}$/.test(value))) {
          callback(new Error('臀围:（0-150）'))
        } else if (value > 150 || value < 0) {
          callback(new Error('臀围:（0-150）'))
        } else {
          callback();
        }
      };
      var validat_item0611 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^\d{1,2}$/.test(value))) {
          callback(new Error('血糖:（0-50）'))
        } else if (value > 50 || value < 0) {
          callback(new Error('血糖:（0-50）'))
        } else {
          callback();
        }
      };
      var validat_item0621 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^\d{1,2}$/.test(value))) {
          callback(new Error('血糖:（0-50）'))
        } else if (value > 50 || value < 0) {
          callback(new Error('血糖:（0-50）'))
        } else {
          callback();
        }
      };
      var validat_year = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^\d{1,2}$/.test(value))) {
          callback(new Error('数值'))
        } else {
          callback()
        }
      };
      var validat_year2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^\d{4}$/.test(value))) {
          callback(new Error('年份不对'))
        } else {
          callback()
        }
      };
      var validat_month = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else {
          callback()
        }
      };
      var validat_day = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else {
          callback()
        }
      };
      var validat_year1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^\d{1,3}$/.test(value))) {
          callback(new Error('数值'))
        } else if (value > this.form.age) {
          callback(new Error('不能大于自己的年龄'))
        } else {
          callback()
        }
      };
      var validate_item301 = (rule, value, callback) => {
        if (!( /^(?=([0-9]{1,3}$|[0-9]{1,12}\.))(0|[1-9][0-9]*)(\.[5]{1})?$/.test(value))) {
          callback(new Error('数值（小数部分只能是5）'))
        } else {
          callback();
        }
      };
      var validate_countTime = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^\d{1,6}$/.test(value))) {
          callback(new Error('数值'))
        } else {
          callback()
        }
      };
      var validate_frequency = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^\d{1,6}$/.test(value))) {
          callback(new Error('数值'))
        } else {
          callback()
        }
      };
      return {
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        //权限判定
        personalInformation_page: false,
        btnAuth: {
          countryAgencySearch_page: false,
        },
        props: {
          value: 'label',
          children: 'children',
          label: 'label'
        },
        //展示
        disabledState: false,
        addressState: false,
        submitDialog: false,
        detailData: this.$route.query.detailData,
        form: {
          age: '',
          name: null,//姓名
          sex: null,//性别
          idCard: null,//身份证号码
          phone: null,//本人电话
          telephone: null,//座机号码
          contactRelationship: null,//与本人关系
          contactPhone: null,//联系人电话
          contactTelephone: null,//联系人座机号码
          address: [],
          address1: '',
          cAddress: null,//常住地址
          fillInPerson: '',//问卷填写人
          fillInRelationship: '',//其他联系人填写
          education: '',//受过的高等教育
          educationOther: '',//高等教育其他
          marriage: '',//结婚
          firstMarriageAge: '',//结婚年龄
          height: '',//身高
          weightNow: '',//现在体重
          weightAYearAgo: '',//一年前体重
          weightFiveYearAgo: '',//五年前体重
          weightEighteenYearsOld: '',//十八岁时体重
          waistline: '',//腰围
          hipline: '',//臀围
          item061: '',//空腹血糖
          item0611: '',//已测空腹血糖
          item062: '',//最近一次检测的餐后2小时血糖
          item0621: '',//最近一次检测的餐后2小时血糖值
          item07: '',//工作职位
          item071: '',//工作职位其他
          item08: '',//是否在以下行业/职业工作12个月或更多
          item0911: '',
          item0912: '',
          item0913: '',
          item0921: '',
          item0922: '',
          item0923: '',
          item0931: '',
          item0932: '',
          item0933: '',
          item0941: '',
          item0942: '',
          item0943: '',
          item0951: '',
          item0952: '',
          item0953: '',
          item0961: '',
          item0962: '',
          item0963: '',
          item0970: '',
          item0971: '',
          item0972: '',
          item0973: '',
          item0981: '',
          item0982: '',
          item0991: '',
          item0992: '',
          item0993: '',
          item09101: '',
          item09102: '',
          item09103: '',
          item09111: '',
          item09112: '',
          item09113: '',
          item09121: '',
          item09122: '',
          item09123: '',
          item09131: '',
          item09132: '',
          item09133: '',
          item09141: '',
          item09142: '',
          item09143: '',
          item09151: '',
          item09152: '',
          item09153: '',
          item09161: '',
          item09162: '',
          item09163: '',
          item09171: '',
          item09172: '',
          item09173: '',
          item09181: '',
          item09182: '',
          item09183: '',
          item09191: '',
          item09192: '',
          item09193: '',
          item09201: '',
          item09202: '',
          item09203: '',
          item10: '',
          item11: '',
          item12: '',
          item13: '',
          item14: '',
          item15: '',
          item16: '',
          item17: '',
          item18: '',
          item19: '',
          item1911: '',
          item1912: '',
          item1913: '',
          item1921: '',
          item1922: '',
          item1923: '',
          item1931: '',
          item1932: '',
          item1933: '',
          item1941: '',
          item1942: '',
          item1943: '',
          item1950: '',
          item1951: '',
          item1952: '',
          item1953: '',
          item20: '',
          item21: '',
          item22: '',
          item23: '',
          item24: '',
          item2511: '',
          item2512: '',
          item2521: '',
          item2522: '',
          item2531: '',
          item2532: '',
          item2541: '',
          item2542: '',
          item2551: '',
          item2552: '',
          item2561: '',
          item2562: '',
          item2571: '',
          item2572: '',
          item2581: '',
          item2582: '',
          item2591: '',
          item2592: '',
          item261: '',
          item262: '',
          item263: '',
          item264: '',
          item27: '',
          item28: '',
          item29: '',
          item301: '',
          item302: '',
          item303: '',
          item304: '',
          item305: '',
          item306: '',
          item307: '',
          item308: '',
          item309: '',
          item3010: '',
          item31: '',
          item311: '',
          item312: '',
          item32: '',
          item33: '',
          item331: '',
          item34: '',
          item341: '',
          item35: '',
          item36: '',
          item37: '',
          item38: '',
          item3811: '',
          item3812: '',
          item3821: '',
          item3822: '',
          item3831: '',
          item3832: '',
          item3841: '',
          item3842: '',
          item3851: '',
          item3852: '',
          item3861: '',
          item3862: '',
          item3871: '',
          item3872: '',
          item3881: '',
          item3882: '',
          item3891: '',
          item3892: '',
          item38101: '',
          item38102: '',
          item38111: '',
          item38112: '',
          item38121: '',
          item38122: '',
          item38131: '',
          item38132: '',
          item38133: '',
          item391: '',
          item39111: '',
          item39112: '',
          item39121: '',
          item39122: '',
          item39131: '',
          item39132: '',
          item39141: '',
          item39142: '',
          item39151: '',
          item39152: '',
          item39161: '',
          item39162: '',
          item39171: '',
          item39172: '',
          item39173: '',
          item392: '',
          item3921: '',
          item3922: '',
          item39221: '',
          item393: '',
          item3931: '',
          item40: '',
          item4011: '',
          item4012: '',
          item4021: '',
          item4022: '',
          item4031: '',
          item4032: '',
          item4041: '',
          item4042: '',
          item4051: '',
          item4052: '',
          item4061: '',
          item4062: '',
          item4071: '',
          item4072: '',
          item4081: '',
          item4082: '',
          item4091: '',
          item4092: '',
          item40101: '',
          item40102: '',
          item40103: '',
          item41: '',
          item4111: '',
          item4112: '',
          item4121: '',
          item4122: '',
          item4131: '',
          item4132: '',
          item4141: '',
          item4142: '',
          item4151: '',
          item4152: '',
          item4153: '',
          item4161: '',
          item4162: '',
          item4163: '',
          item4171: '',
          item4172: '',
          item4173: '',
          item4181: '',
          item4182: '',
          item4183: '',
          item42: '',
          item4211: '',
          item4212: '',
          item4221: '',
          item4222: '',
          item4231: '',
          item4232: '',
          item4241: '',
          item4242: '',
          item4251: '',
          item4252: '',
          item4253: '',
          item43: '',
          item4301: '',
          item4302: '',
          item43031: '',
          item430311: '',
          item43032: '',
          item430321: '',
          item431: '',
          year43:'',
          month43:'',
          item44: '',
          item4411: '',
          item4412: '',
          item4421: '',
          item4422: '',
          item4423: '',
          item45: '',
          item46: '',
          item47: '',
          item48: '',
          item49: '',
          item50: '',
          item51: '',
          item511: '',
          item512: '',
          year512: '',
          month512: '',
          day512: '',
          item52: '',
          item521: '',
          item522: '',
          item523: '',
          year521: '',
          month521: '',
          day521: '',
          item53: '',
          item531: '',
          item54: '',
          item541: '',
          item55: '',
          item5510: '',
          item5511: '',
          item5512List: [],
          item5520: '',
          item5521: '',
          item5522List: [],
          item5530:'',
          item5531: '',
          item5532List: [],
          item5540: '',
          item5541: '',
          item5542List: [],
          item5550: '',
          item5551: '',
          item5552List: [],
          item5560: '',
          item5561: '',
          item5562List: [],
          item5563: '',
          item5570: '',
          item5571: '',
          item5572List: [],
          item5580:'',
          item5581: '',
          item5582List: [],
          hosAnalgesicHistoryList: [
            {
              drugName: '',
              frequency: '',
              countTimeType: '',
              countTime: ''
            },
          ],

          item56: '',
          item57: '',
          hosAntibioticHistoryList: [
            {
              drugName: '',
              frequency: '',
              startTime: '',
              countTime: '',
              year: '',
              month: '',
              day: ''
            },
          ],
          item58: '',
          item59: '',
          item60: '',
          item601: '',
          item61: '',
          item611: '',
          item62: '',
          item621: '',
          item63: '',
          item631: '',
          item64: '',
          hosHormoneDrugsHistoryList: [
            {
              drugName: '',
              year: '',
              month: '',
              year1: '',
              month1: '',
              startTime: '',
              entTime: '',
            }
          ],
          scheme: '',
          researchName: '',
          promiseYear: '',
          promiseMonth: '',
          promiseDay: '',
          researchSignature: '',
          clientRelationship: '',
          investigator: '',
          promiseYear1: '',
          promiseMonth1: '',
          promiseDay1: '',
          researchDate: '',
          investigationDate: '',

        },
        dynamicTags: ['标签一', '标签二', '标签三'],
        inputValue: '',
        hosHormoneDrugsHistoryRules: {
          drugName: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          year: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year2, trigger: 'blur'},
            {validator: validat_year2, trigger: 'change'},
          ],
          month: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_month, trigger: 'blur'},
            {validator: validat_month, trigger: 'change'},
          ],
          year1: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year2, trigger: 'blur'},
            {validator: validat_year2, trigger: 'change'},
          ],
          month1: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_month, trigger: 'blur'},
            {validator: validat_month, trigger: 'change'},
          ],
        },
        hosAntibioticHistoryRules: {
          drugName: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          year: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year2, trigger: 'blur'},
            {validator: validat_year2, trigger: 'change'},
          ],
          month: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_month, trigger: 'blur'},
            {validator: validat_month, trigger: 'change'},
          ],
          day: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_day, trigger: 'blur'},
            {validator: validat_day, trigger: 'change'},
          ],
          countTime: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validate_countTime, trigger: 'blur'},
            {validator: validate_countTime, trigger: 'change'}

          ],
          frequency: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validate_frequency, trigger: 'blur'},
            {validator: validate_frequency, trigger: 'change'}
          ],
        },
        hosAnalgesicHistoryListRules: {
          drugName: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          countTimeType: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          countTime: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validate_countTime, trigger: 'blur'},
            {validator: validate_countTime, trigger: 'change'}

          ],
          frequency: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validate_frequency, trigger: 'blur'},
            {validator: validate_frequency, trigger: 'change'}
          ],
        },
        rules: {
          name: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          sex: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          idCard: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          phone: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validatePhone, trigger: 'blur'},
            {validator: validatePhone, trigger: 'change'}
          ],
          contact_area: [
            {validator: validatecontact_area, trigger: 'blur'},
            {validator: validatecontact_area, trigger: 'change'},
          ],
          contact_telephone: [
            {validator: validatecontact_telephone, trigger: 'blur'},
            {validator: validatecontact_telephone, trigger: 'change'},
          ],
          contactRelationship: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: contactRelationship, trigger: 'blur'},
            {validator: contactRelationship, trigger: 'change'},
          ],
          contactPhone: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validatePhone, trigger: 'blur'},
            {validator: validatePhone, trigger: 'change'}
          ],
          contact_area_other: [
            {validator: validatecontact_area, trigger: 'blur'},
            {validator: validatecontact_area, trigger: 'change'},
          ],
          contact_phone_other: [
            {validator: validatecontact_telephone, trigger: 'blur'},
            {validator: validatecontact_telephone, trigger: 'change'},
          ],
          address: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          address1: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          fillInPerson: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          fillInRelationship: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: contactRelationship, trigger: 'blur'},
            {validator: contactRelationship, trigger: 'change'},
          ],
          education: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          educationOther: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          marriage: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          firstMarriageAge: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          height: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_height, trigger: 'blur'},
            {validator: validat_height, trigger: 'change'},
          ],
          weightNow: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_weight, trigger: 'blur'},
            {validator: validat_weight, trigger: 'change'},
          ],
          weightAYearAgo: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_weight, trigger: 'blur'},
            {validator: validat_weight, trigger: 'change'},
          ],
          weightFiveYearAgo: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_weight, trigger: 'blur'},
            {validator: validat_weight, trigger: 'change'},
          ],
          weightEighteenYearsOld: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_weight, trigger: 'blur'},
            {validator: validat_weight, trigger: 'change'},
          ],
          waistline: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_waistline, trigger: 'blur'},
            {validator: validat_waistline, trigger: 'change'},
          ],
          hipline: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_hipline, trigger: 'blur'},
            {validator: validat_hipline, trigger: 'change'},
          ],
          item061: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item0611: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_item0611, trigger: 'blur'},
            {validator: validat_item0611, trigger: 'change'},
          ],
          item062: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item0621: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_item0621, trigger: 'blur'},
            {validator: validat_item0621, trigger: 'change'},
          ],
          item07: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item071: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item08: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item0911: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item0912: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year, trigger: 'blur'},
            {validator: validat_year, trigger: 'change'},
          ],
          item0913: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item0921: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item0922: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year, trigger: 'blur'},
            {validator: validat_year, trigger: 'change'},
          ],
          item0923: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item0931: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item0932: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year, trigger: 'blur'},
            {validator: validat_year, trigger: 'change'},
          ],
          item0933: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],

          item0941: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item0942: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year, trigger: 'blur'},
            {validator: validat_year, trigger: 'change'},
          ],
          item0943: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],

          item0951: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item0952: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year, trigger: 'blur'},
            {validator: validat_year, trigger: 'change'},
          ],
          item0953: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],

          item0961: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item0962: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year, trigger: 'blur'},
            {validator: validat_year, trigger: 'change'},
          ],
          item0963: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item0970: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item0971: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item0972: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year, trigger: 'blur'},
            {validator: validat_year, trigger: 'change'},
          ],
          item0973: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item0981: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item0982: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year, trigger: 'blur'},
            {validator: validat_year, trigger: 'change'},
          ],
          item0983: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],

          item0991: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item0992: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year, trigger: 'blur'},
            {validator: validat_year, trigger: 'change'},
          ],
          item0993: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],

          item09101: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item09102: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year, trigger: 'blur'},
            {validator: validat_year, trigger: 'change'},
          ],
          item09103: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],

          item09111: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item09112: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year, trigger: 'blur'},
            {validator: validat_year, trigger: 'change'},
          ],
          item09113: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],

          item09121: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item09122: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year, trigger: 'blur'},
            {validator: validat_year, trigger: 'change'},
          ],
          item09123: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],

          item09131: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item09132: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year, trigger: 'blur'},
            {validator: validat_year, trigger: 'change'},
          ],
          item09133: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],

          item09141: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item09142: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year, trigger: 'blur'},
            {validator: validat_year, trigger: 'change'},
          ],
          item09143: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],

          item09151: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item09152: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year, trigger: 'blur'},
            {validator: validat_year, trigger: 'change'},
          ],
          item09153: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],

          item09161: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item09162: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year, trigger: 'blur'},
            {validator: validat_year, trigger: 'change'},
          ],
          item09163: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item09171: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item09172: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year, trigger: 'blur'},
            {validator: validat_year, trigger: 'change'},
          ],
          item09173: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],

          item09181: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item09182: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year, trigger: 'blur'},
            {validator: validat_year, trigger: 'change'},
          ],
          item09183: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],

          item09191: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item09192: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year, trigger: 'blur'},
            {validator: validat_year, trigger: 'change'},
          ],
          item09193: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],

          item09201: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item09202: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year, trigger: 'blur'},
            {validator: validat_year, trigger: 'change'},
          ],
          item09203: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item18: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item19: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item1911: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item1912: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year, trigger: 'blur'},
            {validator: validat_year, trigger: 'change'},
          ],
          item1913: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year, trigger: 'blur'},
            {validator: validat_year, trigger: 'change'},
          ],
          item1921: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item1922: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year, trigger: 'blur'},
            {validator: validat_year, trigger: 'change'},
          ],
          item1923: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year, trigger: 'blur'},
            {validator: validat_year, trigger: 'change'},
          ],
          item1931: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item1932: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year, trigger: 'blur'},
            {validator: validat_year, trigger: 'change'},
          ],
          item1933: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year, trigger: 'blur'},
            {validator: validat_year, trigger: 'change'},
          ],
          item1941: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item1942: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year, trigger: 'blur'},
            {validator: validat_year, trigger: 'change'},
          ],
          item1943: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year, trigger: 'blur'},
            {validator: validat_year, trigger: 'change'},
          ],
          item1950: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item1951: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item1952: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year, trigger: 'blur'},
            {validator: validat_year, trigger: 'change'},
          ],
          item1953: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year, trigger: 'blur'},
            {validator: validat_year, trigger: 'change'},
          ],
          item20: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item21: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item22: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item23: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item24: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item2511: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item2512: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item2521: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item2522: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item2531: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item2532: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item2541: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item2542: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item2551: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item2552: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item2561: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item2562: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item2571: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item2572: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item2581: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item2582: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item2591: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item2592: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item261: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item262: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item263: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item264: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item27: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item28: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item29: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item301: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validate_item301, trigger: 'blur'},
            {validator: validate_item301, trigger: 'change'},
          ],
          item302: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validate_item301, trigger: 'blur'},
            {validator: validate_item301, trigger: 'change'},
          ],
          item303: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validate_item301, trigger: 'blur'},
            {validator: validate_item301, trigger: 'change'},
          ],
          item304: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validate_item301, trigger: 'blur'},
            {validator: validate_item301, trigger: 'change'},
          ],
          item305: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validate_item301, trigger: 'blur'},
            {validator: validate_item301, trigger: 'change'},
          ],
          item306: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validate_item301, trigger: 'blur'},
            {validator: validate_item301, trigger: 'change'},
          ],
          item307: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validate_item301, trigger: 'blur'},
            {validator: validate_item301, trigger: 'change'},
          ],
          item308: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validate_item301, trigger: 'blur'},
            {validator: validate_item301, trigger: 'change'},
          ],
          item309: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validate_item301, trigger: 'blur'},
            {validator: validate_item301, trigger: 'change'},
          ],
          item3010: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validate_item301, trigger: 'blur'},
            {validator: validate_item301, trigger: 'change'},
          ],
          item31: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item311: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item312: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item32: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item33: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item331: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item34: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item341: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item35: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item36: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item37: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item38: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item3811: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item3812: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item3821: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item3822: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item3831: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item3832: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item3841: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item3842: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item3851: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item3852: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item3861: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item3862: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item3871: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item3872: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item3881: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item3882: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item3891: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item3892: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item38101: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item38102: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item38111: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item38112: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item38121: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item38122: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item38131: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item38132: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item38133: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item391: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item39111: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item39112: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item39121: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item39122: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item39131: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item39132: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item39141: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item39142: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item39151: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item39152: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item39161: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item39162: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item39171: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item39172: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item39173: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item392: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item3922: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          year: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year2, trigger: 'blur'},
            {validator: validat_year2, trigger: 'change'},
          ],
          month: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_month, trigger: 'blur'},
            {validator: validat_month, trigger: 'change'},
          ],
          day: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_day, trigger: 'blur'},
            {validator: validat_day, trigger: 'change'},
          ],
          item39221: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item393: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item3931: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item40: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4011: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4012: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item4021: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4022: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item4031: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4032: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item4041: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4042: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item4051: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4052: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item4061: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4062: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item4071: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4072: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item4081: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4082: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item4091: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4092: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item40101: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item40102: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item40103: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item41: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4111: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4112: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item4121: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4122: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item4131: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4132: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item4141: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4142: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item4151: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4152: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item4153: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4161: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4162: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item4163: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4171: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4172: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item4173: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4181: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4182: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item4183: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item42: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4211: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4212: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item4221: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4222: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item4231: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4232: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item4241: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4242: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item4251: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4252: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item4253: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item43: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          year43: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year2, trigger: 'blur'},
            {validator: validat_year2, trigger: 'change'},
          ],
          month43: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_month, trigger: 'blur'},
            {validator: validat_month, trigger: 'change'},
          ],
          item4302: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item43031: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item430311: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item43032: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item430321: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item431: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item44: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4411: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4412: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item4421: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item4422: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item4423: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item45: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item46: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year2, trigger: 'blur'},
            {validator: validat_year2, trigger: 'change'},
          ],
          item47: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item48: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item49: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year2, trigger: 'blur'},
            {validator: validat_year2, trigger: 'change'},
          ],
          item50: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item51: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item511: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item512: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          year512: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year2, trigger: 'blur'},
            {validator: validat_year2, trigger: 'change'},
          ],
          month512: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_month, trigger: 'blur'},
            {validator: validat_month, trigger: 'change'},
          ],
          day512: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_day, trigger: 'blur'},
            {validator: validat_day, trigger: 'change'},
          ],
          item52: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item522: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item523: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          year521: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year2, trigger: 'blur'},
            {validator: validat_year2, trigger: 'change'},
          ],
          month521: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_month, trigger: 'blur'},
            {validator: validat_month, trigger: 'change'},
          ],
          day521: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_day, trigger: 'blur'},
            {validator: validat_day, trigger: 'change'},
          ],
          item53: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item531: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item54: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item541: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item55: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item5511: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item5512List: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item5521: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item5522List: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item5531: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item5532List: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item5541: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item5542List: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item5551: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item5552List: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item5561: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item5562List: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item5563: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item5571: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item5572List: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item5581: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item5582List: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item56: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item57: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item58: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item59: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item60: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item601: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item61: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item611: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validat_year1, trigger: 'blur'},
            {validator: validat_year1, trigger: 'change'},
          ],
          item62: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item621: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validate_frequency, trigger: 'blur'},
            {validator: validate_frequency, trigger: 'change'},
          ],
          item63: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item631: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          scheme: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          item64: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          researchDate:[
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          investigationDate:[
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          researchName: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          researchSignature: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          clientRelationship: [
            {required: false, message: '必填', trigger: 'blur'},
            {required: false, message: '必填', trigger: 'change'},
          ],
          investigator: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
        },

      }
    },
    mounted(){



      this.$store.commit('LOGOUT_USER');
      let obj = this.checkPageAuth(this, "personalInformation_page", this.btnAuth);
      if (this.$route.query.type == 1) {
        this.getUserInfo()
        this.getUserFormInfo()
      }else if(this.$route.query.type == 2){
        this.getRiskFactorsInfo()
        this.disabledState = true
        this.rules = {}
        this.hosHormoneDrugsHistoryRules = {}
        this.hosAntibioticHistoryRules = {}
        this.hosAnalgesicHistoryListRules = {}
        this.addressState = true
      }
    },
    methods: {
      add(){
        let obj ={
            group:'区间'+this.ageGroup.length-2,
            age:this.ageGroup[this.ageGroup.length-3].age+1
        }
        this.ageGroup.splice(this.ageGroup.length-2,0,obj)
      },
      //查看危险因素
      getRiskFactorsInfo(){
        $axios_http({
          url: "/person/info/queryPersonRiskFactorInfo",
          data: {
            perscrid: this.$route.query.id
          },
          vueObj: this
        }).then((res) => {
          this.form = res.data.result
          this.form.researchDate = this.getDate( this.form.researchDate)
          this.form.investigationDate = this.getDate( this.form.investigationDate)
          if (res.data.result.telephone) {
            this.form.contact_area = res.data.result.telephone.split('-')[0]
            this.form.contact_telephone = res.data.result.telephone.split('-')[1]
          }
          if (res.data.result.contactTelephone) {
            this.form.contact_area_other = res.data.result.contactTelephone.split('-')[0]
            this.form.contact_phone_other = res.data.result.contactTelephone.split('-')[1]
          }
//          this.form.address1 = this.form.cAddress
          if(res.data.result.item3921){
            this.form.year = this.getDate(this.form.item3921).split('-')[0]
            this.form.month = this.getDate(this.form.item3921).split('-')[1]
            this.form.day = this.getDate(this.form.item3921).split('-')[2]
          }
          if(res.data.result.item512){
            this.form.year512 = this.getDate(this.form.item512).split('-')[0]
            this.form.month512 = this.getDate(this.form.item512).split('-')[1]
            this.form.day512 = this.getDate(this.form.item512).split('-')[2]
          }
          if(res.data.result.item521){
            this.form.year521 = this.getDate(this.form.item521).split('-')[0]
            this.form.month521 = this.getDate(this.form.item521).split('-')[1]
            this.form.day521 = this.getDate(this.form.item521).split('-')[2]
          }
          if(res.data.result.item4301){
            this.form.year43 = this.getDate(this.form.item4301).split('-')[0]
            this.form.month43 = this.getDate(this.form.item4301).split('-')[1]
          }
          if(res.data.result.hosAntibioticHistoryList.length>0){
            for(let i =0;i<res.data.result.hosAntibioticHistoryList.length;i++){
              this.form.hosAntibioticHistoryList[i].month = this.getDate(res.data.result.hosAntibioticHistoryList[i].startTime).split('-')[1]
              this.form.hosAntibioticHistoryList[i].year = this.getDate(res.data.result.hosAntibioticHistoryList[i].startTime).split('-')[0]
              this.form.hosAntibioticHistoryList[i].day = this.getDate(res.data.result.hosAntibioticHistoryList[i].startTime).split('-')[2]
            }
          }
          if(res.data.result.hosHormoneDrugsHistoryList.length>0 && this.form.item64 == 3){
            for(let i =0;i<res.data.result.hosHormoneDrugsHistoryList.length;i++){
              this.form.hosAntibioticHistoryList[i].month1 = this.getDate(res.data.result.hosHormoneDrugsHistoryList[i].endTime).split('-')[1]
              this.form.hosAntibioticHistoryList[i].year1 =  this.getDate(res.data.result.hosHormoneDrugsHistoryList[i].endTime).split('-')[0]
              this.form.hosAntibioticHistoryList[i].month = this.getDate(res.data.result.hosHormoneDrugsHistoryList[i].startTime).split('-')[1]
              this.form.hosAntibioticHistoryList[i].year =  this.getDate(res.data.result.hosHormoneDrugsHistoryList[i].startTime).split('-')[0]
            }
          }
          if(res.data.result.hosHormoneDrugsHistoryList.length>0 && this.form.item64 == 2){
            for(let i =0;i<res.data.result.hosHormoneDrugsHistoryList.length;i++){
              this.form.hosAntibioticHistoryList[i].month = this.getDate(res.data.result.hosHormoneDrugsHistoryList[i].startTime).split('-')[1]
              this.form.hosAntibioticHistoryList[i].year =  this.getDate(res.data.result.hosHormoneDrugsHistoryList[i].startTime).split('-')[0]
            }
          }


        })
      },
      printContent: function () {
        this.$print(this.$refs.print) // 使用
      },
      //查看个人信息表
      getUserFormInfo(){
        $axios_http({
          url: "/person/query/eligibility/idorperscrid",
          data: {
            perscrid: this.$route.query.id
          },
          vueObj: this
        }).then((res) => {
          this.form.item10 = res.data.result.smokeStatus
          this.form.item11 = res.data.result.smokeBeginAge
          this.form.item12 = res.data.result.smokeFrequency
          this.form.item13 = res.data.result.quitSmokeTime
          this.form.item14 = res.data.result.smokeTime
          this.form.item15 = res.data.result.smokeCountBranchDay
          this.form.item16 = res.data.result.smokeCountPackageDay
          this.form.item17 = res.data.result.smokeCountYear
        })
      },
      //格式化日期
      getDate(value){
        if (value != '' && value != null && value != undefined) {
          var value = new Date(value)
          return `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`
        }
        return value
      },
      //获取个人信息表
      getUserInfo(){
        $axios_http({
          url: "/person/query/info/id",
          data: {
            id: this.$route.query.personInfoId
          },
          vueObj: this
        }).then((res) => {
          this.form.name = res.data.result.userName
          this.form.researchName = res.data.result.userName
          this.form.sex = res.data.result.sex
          this.form.age = res.data.result.age
          this.form.idCard = res.data.result.idCard
          this.form.phone = res.data.result.phone
          this.form.telephone = res.data.result.telephone
          this.form.contactRelationship = res.data.result.contactRelationship
          this.form.contactPhone = res.data.result.contactPhone
          if (res.data.result.homeDetailedAddress) {
            this.form.address = res.data.result.homeAddress
            this.form.address1 = res.data.result.homeDetailedAddress
          }
          if (res.data.result.telephone) {
            this.form.contact_area = res.data.result.telephone.split('-')[0]
            this.form.contact_telephone = res.data.result.telephone.split('-')[1]
          }
          if (res.data.result.contactTelephone) {
            this.form.contact_area_other = res.data.result.contactTelephone.split('-')[0]
            this.form.contact_phone_other = res.data.result.contactTelephone.split('-')[1]
          }

        })
      },
      //填写人改变
      fillInPersonChange(){
        if (this.form.fillInPerson != 1 && this.form.fillInPerson != 2) {
          this.form.fillInPerson = ''
        }
        if (this.form.fillInPerson == 1) {
          this.form.fillInRelationship = ''
        }
      },
      //提交表单
      submitForm(form) {
        console.log(this.form.address1)
        this.$nextTick(function () {
          this.$refs[form].validate((valid, obj) => {
            if (!valid) {
              alert('填写错误')
//              for (var item in obj) {
//                if(item == 'address'){
//                   this.$refs[item].$refs.input.focus()
//                   return
//                }
//                if (this.$refs[item].focus) {
//                  this.$refs[item].focus();
//                } else {
//                  this.$refs[item].$el.focus();
//                }
//                return
//              }
            }
            if (valid) {
              if (!this.addressState) {
//                this.form.cAddress = this.form.address[0] + this.form.address[1] + this.form.address[2] + this.form.address1
//                console.log(this.form.address)
              }
              this.form.personScreenId = this.$route.query.id
              if(this.form.item56 != 1){
                  this.form.hosAnalgesicHistoryList = []
              }
              if(this.form.item57 != 1){
                this.form.hosAntibioticHistoryList = []
              }
              if(this.form.item64 != 2 && this.form.item64 != 3){
                this.form.hosHormoneDrugsHistoryList = []
              }
              $axios_http({
                url: "/person/info/saveHosRiskFactorInfo",
                data: this.form,
                vueObj: this
              }).then((res) => {
                this.$router.push({path: '/subject/subject',});
              })
            }
          });
        })

      },
      handleClose(tag,item,index) {
          console.log(tag,this.form[item])
        this.form[item].splice(this.form[item].indexOf(tag), 1);
      },
      addInput(item, value) {
        let inputValue = this.form[value];
        if (inputValue % 1 == 0 && inputValue > 0 && inputValue < 13) {
          for (let i = 0; i < this.form[item].length; i++) {
            if (this.form[item][i] == inputValue) {
              this.$alert('请勿重复添加', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                }
              })
              this.form[value] = ''
              return
            }
          }
          if (inputValue) {
            this.form[item].push(inputValue);
          } else {
            this.$alert('编码错误', '提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            })
          }
          this.form[value] = '';
          this.$nextTick(_ => {
            this.$refs[value].focus();
          });
        } else {
          this.$alert('编码错误', '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          })
          this.form[value] = '';
        }

      },
      getPromiseYear1(){
        if (this.form.promiseYear1 && this.form.promiseMonth1 && this.form.promiseDay1) {
          this.form.investigationDate = this.form.promiseYear1 + '-' + (this.form.promiseMonth1 < 10 ? '0' + this.form.promiseMonth1 : this.form.promiseMonth1) + '-' + (this.form.promiseDay1 < 10 ? '0' + this.form.promiseDay1 : this.form.promiseDay1)
        }
      },
      item64Change(a){
        this.form.hosHormoneDrugsHistoryList = [
          {
            drugName: '',
            year: '',
            month: '',
            year1: '',
            month1: '',
            startTime: '',
            entTime: '',
          }
        ]
        if (this.form[a] != 1 && this.form[a] != 2 && this.form[a] != 3) {
          this.form[a] = ''
        }
      },
      item57Plus(){
        this.form.hosAntibioticHistoryList.push({
          name: '',
          frequency: '',
          startTime: '',
          countTime: '',
          year: '',
          month: '',
          day: '',

        })
      },
      item64Reduce(){
        this.form.hosHormoneDrugsHistoryList.pop()
      },
      item64Plus(){
        this.form.hosHormoneDrugsHistoryList.push({
          drugName: '',
          year: '',
          month: '',
          year1: '',
          month1: '',
          startTime: '',
          entTime: '',
        })
      },
      item57Reduce(){
        this.form.hosAntibioticHistoryList.pop()
      },
      item56Plus(){
        this.form.hosAnalgesicHistoryList.push({
          name: '',
          frequency: '',
          countTimeType: '',
          countTime: '',
        })
      },
      item56Reduce(){
        this.form.hosAnalgesicHistoryList.pop()
      },
      getyear512(){
        if (this.form.year512 && this.form.month512 && this.form.day512) {
          this.form.item512 = this.form.year512 + '-' + (this.form.month512 < 10 ? '0' + this.form.month512 : this.form.month512) + '-' + (this.form.day512 < 10 ? '0' + this.form.day512 : this.form.day512)
        }
      },
      getyear521(){
        if (this.form.year521 && this.form.month521 && this.form.day521) {
          this.form.item521 = this.form.year521 + '-' + (this.form.month521 < 10 ? '0' + this.form.month521 : this.form.month521) + '-' + (this.form.day521 < 10 ? '0' + this.form.day521 : this.form.day521)
        }
      },
      getyear43(){
        if (this.form.year43 && this.form.month43) {
          this.form.item4301 = this.form.year43 + '-' + (this.form.month43 < 10 ? '0' + this.form.month43 : this.form.month43)
        }
      },
      getyear641(x, index){
        if (x.year && x.month) {
          x.endTime = x.year + '-' + (x.month < 10 ? '0' + x.month : x.month)
        }
      },
      getyear64(x, index){
        if (x.year && x.month) {
          x.startTime = x.year + '-' + (x.month < 10 ? '0' + x.month : x.month)
        }
      },
      getyear57(x, index){
        if (x.year && x.month && x.day) {
          x.startTime = x.year + '-' + (x.month < 10 ? '0' + x.month : x.month) + '-' + (x.day < 10 ? '0' + x.day : x.day)
        }
      },
      getyear(){
        if (this.form.year && this.form.month && this.form.day) {
          this.form.item3921 = this.form.year + '-' + (this.form.month < 10 ? '0' + this.form.month : this.form.month) + '-' + (this.form.day < 10 ? '0' + this.form.day : this.form.day)
        }
      },

      item531(a){
        if (this.form[a] != 0 && this.form[a] != 1 && this.form[a] != 999) {
          this.form[a] = ''
        }
      },
      item47(a){
        if (this.form[a] != 1 && this.form[a] != 2 && this.form[a] != 3) {
          this.form[a] = ''
        }
      },
      item411Change(a, b, c){
        if (this.form[a] != 1 && this.form[a] != 0) {
          this.form[a] = ''
        }
        if (this.form[a] != 1) {
          this.form[b] = ''
          this.form[c] = ''
        }
      },
      item4303(a){
        if (this.form[a] != 1 && this.form[a] != 2 && this.form[a] != 3 && this.form[a] != 4 && this.form[a] != 5 && this.form[a] != 6 && this.form[a] != 7 && this.form[a] != 8 && this.form[a] != 9 && this.form[a] != 10 && this.form[a] != 999) {
          this.form[a] = ''
        }
      },
      item43(a){
        if (this.form[a] != 1 && this.form[a] != 2 && this.form[a] != 3 && this.form[a] != 4 && this.form[a] != 999) {
          this.form[a] = ''
        }
      },
      item41Change(a){
        if (this.form[a] != 1 && this.form[a] != 2 && this.form[a] != 3 && this.form[a] != 9) {
          this.form[a] = ''
        }

      },
      item251Change(a){
        if (this.form[a] != 1 && this.form[a] != 2 && this.form[a] != 3) {
          this.form[a] = ''
        }

      },
      item38131Change(a, b){
        if (this.form[a] == '') {
          this.form[b] = ''
        }
      },
      item5512Change(a,b){
        if (this.form[a] != 0 && this.form[a] != 1) {
          this.form[a] = ''
        }
        if (this.form[a] != 1) {
          this.form[b] = []
        }
      },
      //不是0或1清空
      item38Change(a, b){
        if (this.form[a] != 0 && this.form[a] != 1) {
          this.form[a] = ''
        }
        if (this.form[a] != 1) {
          this.form[b] = ''
        }
      },
      item34Change(a){
        if (this.form[a] != 1 && this.form[a] != 2 && this.form[a] != 3 && this.form[a] != 8) {
          this.form[a] = ''
        }
        if (this.form[a] != 8) {
          this.form.item341 = ''
        }
      },
      item33Change(a){
        if (this.form[a] != 1 && this.form[a] != 2 && this.form[a] != 3 && this.form[a] != 4 && this.form[a] != 5 && this.form[a] != 8) {
          this.form[a] = ''
        }
        if (this.form[a] != 8) {
          this.form.item331 = ''
        }
      },
      item25Change(a,b){
        if (this.form[a] != 1 && this.form[a] != 2 && this.form[a] != 3 && this.form[a] != 4 && this.form[a] != 5 && this.form[a] != 6) {
           this.form[a] = ''
        }
        if(this.form[a] == 6){
           this.form[b] = 0
        }
      },
      //清空5个选项
      item5Clear(a){
        if (this.form[a] != 1 && this.form[a] != 2 && this.form[a] != 3 && this.form[a] != 4 && this.form[a] != 5) {
          this.form[a] = ''
        }
      },
      //清空4个选项
      item4Clear(a){
        if (this.form[a] != 1 && this.form[a] != 2 && this.form[a] != 3 && this.form[a] != 4) {
          this.form[a] = ''
        }
      },
      //清空三个选项
      item3Clear(a){
        if (this.form[a] != 1 && this.form[a] != 2 && this.form[a] != 0) {
          this.form[a] = ''
        }
      },
      //不是0或1清空
      item425(a){
        if (this.form[a] != 0 && this.form[a] != 1) {
            this.form[a] = ''
        }
      },
      //职业信息改变
      itemChange(a, b, c, d){
        if (this.form[a] != 0 && this.form[a] != 1) {
          this.form[a] = ''
        }
        if (this.form[a] != 1) {
          this.form[b] = ''
          this.form[c] = ''
          if (d) {
            this.form[d] = ''
          }
        }
      },
      //最近一次检测的餐后2小时血糖
      item08Change(){
        if (this.form.item08 != 0 && this.form.item08 != 1) {
          this.form.item08 = ''
        }
      },
      //最近一次检测的餐后2小时血糖
      item07Change(){
        if (this.form.item07 != 1 && this.form.item07 != 2 && this.form.item07 != 3 &&this.form.item07 != 4 && this.form.item07 != 5 && this.form.item07 != 6 && this.form.item07 != 7 && this.form.item07 != 8 && this.form.item07 != 9) {
          this.form.item07 = ''
        }
        if (this.form.item07 != 9) {
          this.form.item071 = ''
        }
      },
      //最近一次检测的餐后2小时血糖
      item062Change(){
        if (this.form.item062 != 1 && this.form.item062 != 2 && this.form.item062 != 3) {
          this.form.item062 = ''
        }
        if (this.form.item062 != 1) {
          this.form.item0621 = ''
        }
      },
      //空腹血糖改变
      item061Change(){
        if (this.form.item061 != 1 && this.form.item061 != 2 && this.form.item061 != 3) {
          this.form.item061 = ''
        }
        if (this.form.item061 != 1) {
          this.form.item0611 = ''
        }
      },

      //婚姻改变
      marriageChange(){
        if (this.form.marriage != 1 && this.form.marriage != 2 && this.form.marriage != 3 && this.form.marriage != 4 && this.form.marriage != 5 & this.form.marriage != 6 && this.form.marriage != 7) {
          this.form.marriage = ''
        }
      },
      //教育改变
      educationChange(){
        if (this.form.education != 1 && this.form.education != 2 && this.form.education != 3 && this.form.education != 4 && this.form.education != 5 & this.form.education != 6 && this.form.education != 7 && this.form.education != 8) {
          this.form.education = ''
        }
        if (this.form.education != 8) {
          this.form.educationOther = ''
        }
      },
      resetForm(form) {
        this.$refs[form].resetFields();
      },
      //拼接个人座机号码
      getTelphone(){
        if (this.form.contact_area && this.form.contact_telephone) {
          this.form.telephone = ''
          this.form.telephone = this.form.contact_area + '-' + this.form.contact_telephone
        }
      },
      //拼接其他联系人座机号码
      getContactTelephone(){
        if (this.form.contact_area_other && this.form.contact_phone_other) {
          this.form.contactTelephone = ''
          this.form.contactTelephone = this.form.contact_area_other + '-' + this.form.contact_phone_other
        }
      },
      //返回首页
      returnHome(){
        this.$router.push({path: '/home/home'})
        this.submitDialog = false
      },
    },
    watch: {
      'form.item31': function (val) {
        if (val != 1) {
          this.form.item311 = ''
          this.form.item312 = ''
        }
      },
      'form.item32': function (val) {
        if (val != 1) {
          this.form.item33 = ''
          this.form.item331 = ''
        }
      },
      'form.item38': function (val) {
        if (val != 1) {
          item3811: '',
            this.form.item3812=''
            this.form.item3821=''
            this.form.item3822=''
            this.form.item3831=''
            this.form.item3832=''
            this.form.item3841=''
            this.form.item3842=''
            this.form.item3851=''
            this.form.item3852=''
            this.form.item3861=''
            this.form.item3862=''
            this.form.item3871=''
            this.form.item3872=''
            this.form.item3881=''
            this.form.item3882=''
            this.form.item3891=''
            this.form.item3892=''
            this.form.item38101= ''
            this.form.item38102= ''
            this.form.item38111= ''
            this.form.item38112= ''
            this.form.item38121= ''
            this.form.item38122= ''
            this.form.item38131= ''
            this.form.item38132= ''
        }
      },
      'form.item38': function (val) {
        if (val != 1) {
          this.form.item3811= ''
          this.form.item3812=''
          this.form.item3821=''
          this.form.item3822=''
          this.form.item3831=''
          this.form.item3832=''
          this.form.item3841=''
          this.form.item3842=''
          this.form.item3851=''
          this.form.item3852=''
          this.form.item3861=''
          this.form.item3862=''
          this.form.item3871=''
          this.form.item3872=''
          this.form.item3881=''
          this.form.item3882=''
          this.form.item3891=''
          this.form.item3892=''
          this.form.item38101= ''
          this.form.item38102= ''
          this.form.item38111= ''
          this.form.item38112= ''
          this.form.item38121= ''
          this.form.item38122= ''
          this.form.item38131= ''
          this.form.item38132= ''
        }
      },
      'form.item391': function (val) {
        if (val != 1) {
            this.form.item39111= ''
            this.form.item39112= ''
            this.form.item39121= ''
            this.form.item39122= ''
            this.form.item39131= ''
            this.form.item39132= ''
            this.form.item39141= ''
            this.form.item39142= ''
            this.form.item39151= ''
            this.form.item39152= ''
            this.form.item39161= ''
            this.form.item39162= ''
            this.form.item39171= ''
            this.form.item39172= ''
            this.form.item39173= ''
        }
      },
      'form.item3922': function (val) {
        if (val != 4) {
          this.form.item39221 = ''
        }
      },
      'form.item392': function (val) {
        if (val != 1) {
          this.form.year = ''
          this.form.month = ''
          this.form.day = ''
          this.form.item3921= ''
          this.form.item3922= ''
          this.form.item39221= ''
          this.form.item393= ''
          this.form.item3931= ''
        }
      },
      'form.item40': function (val) {
        if (val != 1) {
            this.form.item4011=''
            this.form.item4012 = ''
            this.form.item4021 = ''
            this.form.item4022 = ''
            this.form.item4031 = ''
            this.form.item4032 = ''
            this.form.item4041 = ''
            this.form.item4042 = ''
            this.form.item4051 = ''
            this.form.item4052 = ''
            this.form.item4061 = ''
            this.form.item4062 = ''
            this.form.item4071 = ''
            this.form.item4072 = ''
            this.form.item4081 = ''
            this.form.item4082 = ''
            this.form.item4091 = ''
            this.form.item4092 = ''
            this.form.item40101 = ''
            this.form.item40102 = ''
            this.form.item40103 = ''
        }
      },
      'form.item41': function (val) {
        if (val != 1) {
            this.form.item4111 = ''
            this.form.item4112 = ''
            this.form.item4121 = ''
            this.form.item4122 = ''
            this.form.item4131 = ''
            this.form.item4132 = ''
            this.form.item4141 = ''
            this.form.item4142 = ''
            this.form.item4151 = ''
            this.form.item4152 = ''
            this.form.item4153 = ''
            this.form.item4161 = ''
            this.form.item4162 = ''
            this.form.item4163 = ''
            this.form.item4171 = ''
            this.form.item4172 = ''
            this.form.item4173 = ''
            this.form.item4181 = ''
            this.form.item4182 = ''
            this.form.item4183 = ''
        }
      },
      'form.item42': function (val) {
        if (val != 1) {
            this.form.item4211 = ''
            this.form.item4212 = ''
            this.form.item4221 = ''
            this.form.item4222 = ''
            this.form.item4231 = ''
            this.form.item4232 = ''
            this.form.item4241 = ''
            this.form.item4242 = ''
            this.form.item4251 = ''
            this.form.item4252 = ''
            this.form.item4253 = ''
        }
      },
      'form.item43': function (val) {
        if (val != 1) {
            this.form.item4301 = ''
            this.form.item4302 = ''
            this.form.item43031 = ''
            this.form.item430311 = ''
            this.form.item43032 = ''
            this.form.item430321 = ''
            this.form.item431 = ''
            this.form.year43 = ''
            this.form.month43 = ''

        }
      },
      'form.item44': function (val) {
        if (val != 1) {
          this.form.item4411 = ''
          this.form.item4412 = ''
          this.form.item4421 = ''
          this.form.item4422 = ''
          this.form.item4423 = ''
        }
      },
      'form.item45': function (val) {
        if (val != 1) {
          this.form.item46 = ''
          this.form.item47 = ''
        }
      },
      'form.item51': function (val) {
        if (val != 1) {
          this.form.item511 = ''
          this.form.year512 = ''
          this.form.month512 = ''
          this.form.day512 = ''
          this.form.item512 = ''
        }
      },
      'form.item52': function (val) {
        if (val != 1) {
          this.form.item521 = ''
          this.form.item522 = ''
          this.form.year521 = ''
          this.form.month521 = ''
          this.form.day521 = ''
          this.form.item523 = ''
        }
      },
      'form.item53': function (val) {
        if (val != 1) {
          this.form.item531 = ''
        }
      },
      'form.item54': function (val) {
        if (val != 1) {
          this.form.item541 = ''
        }
      },
      'form.item55': function (val) {
        if (val != 1) {
            this.form.item5510 = ''
            this.form.item5511 = ''
            this.form.item5512List = []
            this.form.item5520 = ''
            this.form.item5521 = ''
            this.form.item5522List = []
            this.form.item553 =''
            this.form.item5531 = ''
            this.form.item5532List = []
            this.form.item5540 = ''
            this.form.item5541 = ''
            this.form.item5542List = []
            this.form.item5550 = ''
            this.form.item5551 = ''
            this.form.item5552List = []
            this.form.item5560 = ''
            this.form.item5561 = ''
            this.form.item5562List = []
            this.form.item5563 = ''
            this.form.item5570 = ''
            this.form.item5571 = ''
            this.form.item5572List = []
            this.form.item5580=''
            this.form.item5581 = ''
            this.form.item5582List = []
        }
      },
      'form.item56': function (val) {
        if (val != 1) {
         this.form.hosAnalgesicHistoryList = [
           {
             drugName: '',
             frequency: '',
             countTimeType: '',
             countTime: ''
           },
         ]
        }
      },
      'form.item57': function (val) {
        if (val != 1) {
          this.form.hosAntibioticHistoryList =[
            {
              drugName: '',
              frequency: '',
              startTime: '',
              countTime: '',
              year: '',
              month: '',
              day: ''
            },
          ]
        }
      },
      'form.item60': function (val) {
        if (val != 1) {
          this.form.item601 = ''
        }
      },
      'form.item61': function (val) {
        if (val != 1) {
          this.form.item611 = ''
        }
      },
      'form.item62': function (val) {
        if (val != 1) {
          this.form.item621 = ''
        }
      },
      'form.item63': function (val) {
        if (val != 1) {
          this.form.item631 = ''
        }
      },
      'form.item64': function (val) {
        if (val != 2 && val != 3) {
          this.form.scheme = ''
          this.form.hosHormoneDrugsHistoryList =[
            {
              drugName: '',
              year: '',
              month: '',
              year1: '',
              month1: '',
              startTime: '',
              entTime: '',
            }
          ]
        }
      },
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .return-home {
    display: block;
    /*text-align: center;*/
    margin-bottom: 20px;
  }

  .fillInPerson-other {
    /*margin-left: 40px;*/
  }

  h3 {
    text-align: center;
    margin-bottom: 20px;
  }

  .content-page {
    background: #fff;
    padding:40px;
  }

  .addbtn {
    margin-top: 50px;
    text-align: center;
    float: left;
    margin-left: 400px;

  }

  .content-page-sid {
    color: #000;
    font-size: 16px;
    font-weight: 600;
    padding-left: 55px;
  }

  .formcon {
    margin-top: 20px;
  }

  .formcon .title {
    width: 100%;
    background: #e5e5e5;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-bottom: 20px;
  }

  .radio-li {
    margin-left: 20px;
    float: left;
    list-style-type: none;
  }

  .marriage-other {
    margin-left: 20px;
  }

  .weight-ul {
    float: left;
    margin-left: 20px;
    list-style-type: none;
  }

  .weight-ul li {
    height: 40px;
    line-height: 40px;
  }

  .weight-ul-title {
    text-align: center;
  }

  .radio-div {
    padding-top: 60px;
  }

  .radio-div-table {
    border: 1px solid #e5e5e5;
  }

  .radio-div-table td {
    padding-left: 20px;
    width: 180px;

  }

  .td1 {
    width: 200px;
    padding-left: 20px;
  }

  .td2 {
    width: 200px;

    padding-left: 80px;
  }

  .td3 {
    width: 200px;
    padding-left: 62px;
  }

  .td4 {
    width: 400px;
    /*text-align: center;*/
    padding-left: 164px;
  }

  .item08-table td {
    border: 1px solid #e5e5e5;
  }

  .item08-table th {
    border: 1px solid #e5e5e5;
    background: #d3d4d6;
  }

  .item25-table th {
    border: 1px solid #e5e5e5;
    background: #d3d4d6;
  }

  .item25-table td {
    border: 1px solid #e5e5e5;
  }

  .item25-table-td1 {
    width: 200px;
    padding-left: 20px;
  }

  .item25-table ul li {
    width: 300px;
  }

  .item25-table-td2 {
    width: 500px;
    padding-left: 230px;
  }

  .item25-table-div1 {
    width: 150px;
  }

  .item25-table-td3 {
    width: 300px;
    padding-left: 20px;
  }

  .item25-table-td3 ul {
    list-style: none;
  }

  .item301-table th {
    background: #d3d4d6
  }

  .item301-table td {
    border: 1px solid #e5e5e5;
  }

  .item301-table-td1 {
    width: 500px;
    padding-left: 20px;
  }

  .item301-table-td2 {
    width: 310px;
    padding-left: 20px;
  }

  .item38-table th {
    background: #d3d4d6;
  }

  .item38-table td {
    border: 1px solid #e5e5e5;
  }

  .item38-table-td1 {
    width: 500px;
    padding-left: 20px;
  }

  .item38-table-td2 {
    width: 400px;
    padding-left: 100px;
  }

  .item43-table th {
    background: #d3d4d6;
  }

  .item43-table td {
    border: 1px solid #e5e5e5;
  }

  .item43-table-td1 {
    width: 200px;
    padding-left: 20px;
  }

  .item43-table-td2 {
    width: 200px;
    padding-left: 50px;
  }

  .item43-table-td3 {
    width: 800px;
    padding-left: 20px;
  }

  .item55-table th {
    background: #d3d4d6;
  }

  .item55-table td {
    border: 1px solid #e5e5e5;
  }

  .item55-table-td1 {
    width: 500px;
    padding-left: 20px;
  }

  .item55-table-td2 {
    width: 400px;
    padding-left: 50px;
  }

  .item56-table th {
    background: #d3d4d6;
  }

  .item56-table td {
    border: 1px solid #e5e5e5;
    height: 80px

  }

  .item56-table-td1 {
    width: 400px;
    padding-left: 20px;
  }

  .item56-table-td2 {
    width: 200px;
    padding-left: 20px;
  }

  .item56-table-td3 {
    width: 500px;
    padding-left: 20px;
  }

  .item57-table th {
    background: #d3d4d6;
  }

  .item57-table td {
    border: 1px solid #e5e5e5;
    height: 80px
  }

  .item57-table-td1 {
    width: 400px;
    padding-left: 20px;
  }

  .item57-table-td2 {
    width: 200px;
    padding-left: 20px;
  }

  .item57-table-td3 {
    width: 300px;
    padding-left: 20px;
  }

  .item57-table-td4 {
    width: 300px;
    padding-left: 50px;
  }

  .item64-table th {
    background: #d3d4d6;
  }

  .item64-table td {
    border: 1px solid #e5e5e5;
    height: 80px
  }

  .item64-table-td1 {
    width: 200px;
    padding-left: 20px;
  }

  .item64-table-td2 {
    width: 400px;
    padding-left: 20px;
  }

  .item64-table-td3 {
    width: 200px;
    padding-left: 20px;
  }

  .td3-year {
    margin-left: 40px;
  }

  .option-p {
    font-size: 14px;
    line-height: 30px;
    margin-top: 5px;
    /*width: 850px;*/
  }

  .margin-p {
    padding-left: 80px;
  }

  .smoke-td3 {
    width: 600px;
    padding-left: 20px;
  }

  .span-weight {
    font-weight: 600;
  }

  .item25-table-fl {
    float: left;
  }

  .item26-span {
    margin-left: 40px;
  }

  .other-td {
    height: 122px;
    vertical-align: top;
  }

  .font-weight {
    font-weight: 600;
  }

  .item44-table-td2 {
    width: 300px;
    padding-left: 50px;
  }

  .item44-table-td1 {
    width: 550px;
    padding-left: 20px
  }

  th {
    border: 1px solid #e5e5e5;
  }

  .item55-span {
    margin-left: 20px;
  }

  .item56-btn {
    margin-top: 20px
  }

  .item-font-weight {
    font-weight: 600;
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
<style>
  .cmbi1 .el-input {
    width: 24px;

  }

  .cmbi1 .el-input input {
    border: 0px !important;
    padding: 0 !important;
    background: url('../../assets/formimg/input_bg_1.png') no-repeat center;
    background-size: contain;
    padding-left: 8px !important;
    padding-right: 4px;
  }

  .zdysinput input {
    border-width: 0 0 1px 0;
    border-color: #000;
    border-radius: 0;
    /*padding-left:10px;*/
  }

  .content-page .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    /*color: #000;*/
  }

  .dialog-success {
    width: 40px;
    height: 40px;
  }

  .clear:after {
    content: '';
    display: block;
    clear: both;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }

  .content-padding1 {
    display: inline-block;
  }

  .content-padding1 .el-input__inner {
    /*border-top: none;*/
    /*border-left: none;*/
    /*border-right: none;*/
    /*border-radius: 0px;*/

  }
</style>
