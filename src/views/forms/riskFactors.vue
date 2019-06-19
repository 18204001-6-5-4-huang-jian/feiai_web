<template>
  <div class="content-page riskFactors" v-if="personalInformation_page">
    <div>
      <el-button :size="$store.state.style.assemblyModel" class="return-home" @click="goBack()">返 回</el-button>
      <!--<el-button :size="$store.state.style.assemblyModel" class="return-home" @click="printContent()">打印</el-button>-->
    </div>
      <h3>危险因素调查表</h3>
      <div class="form-title">
        　　欢迎您参与该筛查项目！您的参与将对肺癌和结直肠癌筛查乃至整体健康有非常重要的意义。作为筛查的一部分，我们需要获得您生活习惯及个人疾病史方面的相关信息，您的所有回答都会被严格保密。您只需根据真实情况花几分钟时间填写即可。
      </div>
      <div class="form-content">
        <el-form :model="form" :rules="rules" ref="form" :inline="true">
          <el-row>
              <el-form-item label="1. 姓名：" required>
                {{form.name}}
              </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="2. 性别：" required>
              {{form.sex | sex}}
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="3. 身份证号：" required>
              {{form.idCard }}
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="4. 联系电话：" prop="phone">
              <el-input v-model="form.phone" auto-complete="off" ref="phone" :size="$store.state.style.assemblyModel" style="width: 220px;"
                        :disabled="disabledState"
              ></el-input>
              （手机）
            </el-form-item>
            <el-form-item label="" prop="phone_area">
              <el-input v-model="form.phone_area" auto-complete="off" ref="phone_area" :size="$store.state.style.assemblyModel"
                         style="width: 70px;" :disabled="disabledState"
              ></el-input>
            </el-form-item>
            <span style="display: inline-block;line-height: 40px">
             -
           </span>
            <el-form-item label="" labelWidth="=10px" prop="phone_phone" style="display: inline-block;">
              <el-input v-model="form.phone_phone" ref="phone_phone" auto-complete="off" :size="$store.state.style.assemblyModel"
                         style="width: 136px" :disabled="disabledState"
              ></el-input>
              （固定电话）
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="5. 其他联系电话（可为亲属号码）:" required>(
              <el-form-item label="与本人关系:" label-width="115px" prop="contactRelationship" style="display: inline-block;">
                <el-input v-model="form.contactRelationship" ref="contactRelationship" auto-complete="off" :size="$store.state.style.assemblyModel"
                          style="width: 100px;" :disabled="disabledState"
                ></el-input>
              </el-form-item>
              )
            </el-form-item>
          </el-row>
          <el-row>
              <el-form-item label="" prop="contactPhone" style="margin-left: 120px;">
                <el-input v-model="form.contactPhone" auto-complete="off" ref="contactPhone" :size="$store.state.style.assemblyModel"
                          style="width: 220px;" :disabled="disabledState"
                ></el-input> （手机）
              </el-form-item>
              <el-form-item label="" prop="telephone_area" style="display: inline-block;" labelWidth="200px">
                <el-input v-model="form.telephone_area" auto-complete="off" ref="telephone_area" :size="$store.state.style.assemblyModel"
                         style="width: 70px;" :disabled="disabledState"
                ></el-input>
              </el-form-item>
            <span style="display: inline-block;line-height: 40px">
             -
           </span>
              <el-form-item label="" prop="telephone_phone" style="display: inline-block;" labelWidth="10">
                <el-input v-model="form.telephone_phone" ref="telephone_phone" auto-complete="off" :size="$store.state.style.assemblyModel"
                         style="width: 136px" :disabled="disabledState"
                ></el-input>  （固定电话）
              </el-form-item>
          </el-row>
          <el-row v-if="addressState">
            <el-form-item label="6. 常住地址："  style="display: inline-block">
              {{form.address2}}
            </el-form-item>
          </el-row>
          <el-row v-else>
              <el-form-item label="6. 常住地址："  style="display: inline-block"  prop="address" >
                <el-cascader
                  :options="$store.state.cityInfo"
                  v-model="form.address"
                  :props="props"
                  clearable
                  :disabled="disabledState"
                  ref="address"
                  @change="getAddress"
                  :size="$store.state.style.assemblyModel"
                >
                </el-cascader >
              </el-form-item >
              <el-form-item label="" prop="address1" style="display: inline-block">
                <el-input v-model="form.address1" auto-complete="off" ref="address1"  type="textarea" :rows="1" :size="$store.state.style.assemblyModel" style="width: 350px;"
                          :disabled="disabledState"
                ></el-input>
              </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="7. 问卷填写人：" prop="fillInPerson">
              <el-input v-model="form.fillInPerson" auto-complete="off" ref="fillInPerson" :size="$store.state.style.assemblyModel"
                        style="width: 70px;"  @change="clear(2,'fillInPerson',true,['fillInRelationship'],2)"
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
                 <el-form-item label=""  style="display: inline-block;margin-left: 20px;" v-if="form.fillInPerson != 2">
                  <el-input v-model="form.fillInRelationship" auto-complete="off" ref="fillInRelationship" :size="$store.state.style.assemblyModel"
                            style="width: 200px;"
                            disabled></el-input>
                 </el-form-item>
              </span>
            </span>
              </div>
            </el-form-item>
          </el-row>
          <div class="title">
            A. 基本信息
          </div>
          <el-row>
            <el-form-item
              label="A1." required>
                <div style="width:800px;">您受过的<u style="font-weight: 600">最高</u>教育？
                  <el-form-item label="" label-width="" prop="item1" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item1" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item1" :disabled="disabledState"
                              style="width: 80px;" @change="clear(8,'item1',true,['item2'],8)"
                              :maxlength='1' class="form-item"></el-input>
                  </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">1. 未受过教育</li>
                  <li class="radio-li">2. 小学</li>
                  <li class="radio-li">3. 初中</li>
                  <li class="radio-li">4. 高中/中专/技校</li>
                  <li class="radio-li">5. 大专</li>
                  <li class="radio-li">6. 大学本科</li>
                  <li class="radio-li">7. 研究生及以上</li>
                  <li class="radio-li">8. 其他
                    <span>
                        <el-form-item label="" style="display: inline-block;margin-left: 20px;"
                                      v-if="form.item1 != 8">
                          <el-input v-model="form.item2" auto-complete="off" ref="item2" type="textarea" :rows='1' :size="$store.state.style.assemblyModel"
                                    style="width: 200px;"
                                    disabled></el-input>
                        </el-form-item>
                    </span>
                    <span>
                        <el-form-item label="" prop="item2" style="display: inline-block;margin-left: 20px;"
                                      v-if="form.item1 == 8">
                           <el-input v-model="form.item2" auto-complete="off" ref="item2" type="textarea" :rows='1' :size="$store.state.style.assemblyModel"
                                     style="width: 200px;" :disabled="disabledState"></el-input>
                        </el-form-item>
                    </span>
                  </li>
                </ul>

              </div>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="A2." required>
              <div style="width:800px;">您的<u style="font-weight: 600">累积</u>受教育年限（从小学开始）：
                <el-form-item label="" label-width="" prop="item3" class="formItemWidth"
                              style="display: inline-block;">
                  <el-input v-model="form.item3" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item3" :disabled="disabledState"
                            style="width: 80px;" class="form-item"></el-input>
                </el-form-item></div>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="A3." required>
              <div style="width:800px;">您的婚姻状况？
                <el-form-item label="" label-width="" prop="item4" class="formItemWidth"
                              style="display: inline-block;">
                  <el-input v-model="form.item4" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item4" :disabled="disabledState"
                            style="width: 80px;" @blur="clear('marriage')"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">1. 未婚</li>
                  <li class="radio-li">2. 初婚</li>
                  <li class="radio-li">3. 再婚</li>
                  <li class="radio-li">4. 离婚</li>
                  <li class="radio-li">5. 丧偶</li>
                  <li class="radio-li">6. 分居</li>
                  <li class="radio-li">7.未婚同居</li>
                </ul>
              </div>
            </el-form-item>
            <div class="marriage-other"
                 v-if="form.item4 == 2 || form.item4 == 3 || form.item4 == 4 || form.item4 ==5 || form.item4 == 6">
                    <span>
                      您初次结婚的年龄：
                      <el-form-item label="" prop="item5"
                                     style="display: inline-block;">
                           <el-input v-model="form.item5" auto-complete="off" ref="item5"
                                     :size="$store.state.style.assemblyModel" style="width: 80px;" :disabled="disabledState"></el-input> 岁
                       </el-form-item>
                    </span>
            </div>
          </el-row>
          <el-row>
            <el-form-item
              label="A4." required>
              <div>身高（厘米）：
                <el-form-item  prop="item6" class="formItemWidth"
                              style="display: inline-block;">
                  <el-input v-model="form.item6" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item6" :disabled="disabledState"
                            style="width: 80px;" class="form-item"></el-input>
                </el-form-item></div>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="A5."  required>
              <div style="display: inline-block;float: left;"> 体重（公斤）：</div>
              <ul class="weight-ul">
                <li class="weight-ul-title">现在</li>
                <li>
                  <el-form-item label="" label-width="" prop="item7" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item7" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item7"
                              style="width: 80px;" :disabled="disabledState"
                              :maxlength='5' class="form-item"></el-input>
                  </el-form-item>
                </li>
              </ul>
              <ul class="weight-ul">
                <li class="weight-ul-title">五年前</li>
                <li>
                  <el-form-item label="" label-width="" prop="item8" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item8" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item8"
                              style="width: 80px;" :disabled="disabledState"
                              :maxlength='5' class="form-item"></el-input>
                  </el-form-item>
                </li>
              </ul>
              <ul class="weight-ul">
                <li class="weight-ul-title">18岁时（成人时）</li>
                <li>
                  <el-form-item label="" label-width="" prop="item9" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item9" auto-complete="off" :size="$store.state.style.assemblyModel"
                              ref="item9" style="width: 80px;" :disabled="disabledState"
                              :maxlength='5' class="form-item"></el-input>
                  </el-form-item>
                </li>
              </ul>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="A6." required>
              <div style="display: inline-block;"> 腰围（厘米）：</div>
              <el-form-item label="" label-width="" prop="item10" class="formItemWidth"
                            style="display: inline-block;">
                <el-input v-model="form.item10" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item10"
                          style="width: 80px;" :disabled="disabledState"
                          :maxlength='3' class="form-item"></el-input>
              </el-form-item>
              <div style="display: inline-block;"> 臀围（厘米）：</div>
              <el-form-item label="" label-width="" prop="item11" class="formItemWidth"
                            style="display: inline-block;">
                <el-input v-model="form.item11" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item11" style="width: 80px;"
                          :disabled="disabledState"
                          :maxlength='3' class="form-item"></el-input>
              </el-form-item>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="A7." required>
              <div>您是否清楚自己的血糖值？
                <el-form-item label="" label-width="" prop="item12" class="formItemWidth"
                              style="display: inline-block;">
                  <el-input v-model="form.item12" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item12" :disabled="disabledState"
                            style="width: 80px;" @blur="clear(1,'item12',true,['item13','item14'],1)"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">0. 不清楚（跳转至B部分“工作经历”）</li>
                  <li class="radio-li">1. 清楚（继续填写）</li>
                </ul>
              </div>
            </el-form-item>
            <br>
            <el-form-item label="A7.1．"  required v-if="form.item12 == 1">
              <div>您最近一次检测的空腹血糖值是：
                <el-form-item label="" label-width="" prop="item13" class="formItemWidth"
                              style="display: inline-block;">
                  <el-input v-model="form.item13" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item13" style="width: 80px;" :disabled="disabledState"
                            :maxlength='4' class="form-item"></el-input>　mmol/L
                </el-form-item>
              </div>
            </el-form-item>
            <br>
            <el-form-item label="A7.2．"  required v-if="form.item12 == 1">
              <div> 您最近一次检测的餐后2小时血糖值是：
                <el-form-item label="" label-width="" prop="item14" class="formItemWidth"
                              style="display: inline-block;">
                  <el-input v-model="form.item14" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item14" style="width: 80px;" :disabled="disabledState"
                            :maxlength='4' class="form-item"></el-input>　mmol/L
                </el-form-item>
              </div>
            </el-form-item>
          </el-row>
          <div class="title">
            B. 工作经历
          </div>
          <el-row>
            <el-form-item
              label="B1." required>
              <div>您的职业是：
                <el-form-item  prop="item15" class="formItemWidth"
                               style="display: inline-block;">
                  <el-input v-model="form.item15" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item15" :disabled="disabledState"
                             style="width: 400px;" class="form-item"></el-input>
                </el-form-item></div>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="B2." required>
              <div>您的职业类型是：
                <el-form-item label="" label-width="" prop="item16" class="formItemWidth"
                              style="display: inline-block;">
                  <el-input v-model="form.item16" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item16" :disabled="disabledState"
                            style="width: 80px;" @change="clear(9,'item16',true,['item17'],9)"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">1. 专业技术人员</li>
                  <li class="radio-li">2. 国家机关和企业事业单位负责人</li>
                  <li class="radio-li">3. 职员</li>
                  <li class="radio-li">4. 商人</li>
                  <li class="radio-li">5. 农民 </li>
                  <li class="radio-li">6. 工人</li>
                  <li class="radio-li">7. 服务性工作人员</li>
                  <li class="radio-li">8. 家务</li>
                  <li class="radio-li">9. 其他
                    <span>
                      <span>，请注明</span>
                        <el-form-item label="" prop="item17" style="display: inline-block;margin-left: 20px;"
                                      v-if="form.item16 == 9">
                           <el-input v-model="form.item17" auto-complete="off" ref="item17" type="textarea" :rows='1' :size="$store.state.style.assemblyModel"
                                     style="width: 200px;" :disabled="disabledState"></el-input>
                        </el-form-item>
                    </span>
                  </li>
                </ul>

              </div>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="B3." required>
              <div> 您是否在以下行业/职业工作 12 个月或更多：
                <el-form-item label="" label-width="" prop="item18" class="formItemWidth"
                              style="display: inline-block;">
                  <el-input v-model="form.item18" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item18" :disabled="disabledState"
                            style="width: 80px;" @change="clearItem18()"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item>
              </div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">0. 否（跳至C部分）</li>
                  <li class="radio-li">1. 是 （请勾选具体职业，并填写具体信息，可多选）</li>
                </ul>
              </div>
              <span>
                 <el-form-item  prop="jobList" class="formItemWidth radio-div" v-if="form.item18 == 1">
                <div class="job">
                  <el-checkbox-group v-model="form.jobList" :disabled="disabledState">
                    <template v-for="item in job">
                      <el-checkbox :label="item.value">{{item.label}}</el-checkbox>
                    </template>
                  </el-checkbox-group>
                </div>
              </el-form-item>
              </span>
              <span>
                 <el-form-item  prop="" class="formItemWidth radio-div" v-if="form.item18 != 1">
                <div class="job">
                  <el-checkbox-group v-model="form.jobList" disabled>
                    <el-checkbox :label="item.value" v-for="item in job">{{item.label}}</el-checkbox>
                  </el-checkbox-group>
                </div>
              </el-form-item>
              </span>
            </el-form-item>
            <table class="raskFactors-table" v-if="form.jobList.length >0">
              <tr class="raskFactors-table-tr">
                <td class="raskFactors-table-title">行业/职业</td>
                <td class="raskFactors-table-title">累计工作年限</td>
                <td class="raskFactors-table-title">工作时是否经常采取防护措施？（如：戴面具或穿防护服）（1=是，0=否）</td>
              </tr>
              <tr v-if="findItem(form.jobList,1)">
                <td>石棉</td>
                <td>
                  <el-form-item label="" label-width="" prop="item20" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item20" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item20" :disabled="disabledState"
                              style="width: 80px;"
                               class="form-item"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="" label-width="" prop="item21" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item21" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item21" :disabled="disabledState"
                              :maxlength='1' style="width: 80px;" @change="clear(1,'item21')"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr  v-if="findItem(form.jobList,2)">
                <td>烘烤</td>
                <td>
                  <el-form-item label="" label-width="" prop="item23" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item23" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item23" :disabled="disabledState"
                              style="width: 80px;"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="" label-width="" prop="item24" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item24" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item24" :disabled="disabledState"
                              :maxlength='1' style="width: 80px;" @change="clear(1,'item24')"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
              </tr>

              <tr  v-if="findItem(form.jobList,3)">
                <td>屠宰或肉类包装</td>
                <td>
                  <el-form-item label="" label-width="" prop="item26" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item26" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item26" :disabled="disabledState"
                              style="width: 80px;"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="" label-width="" prop="item27" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item27" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item27" :disabled="disabledState"
                              :maxlength='1' style="width: 80px;" @change="clear(1,'item27')"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr  v-if="findItem(form.jobList,4)">
                <td>石油/化工业</td>
                <td>
                  <el-form-item label="" label-width="" prop="item29" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item29" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item29" :disabled="disabledState"
                              style="width: 80px;"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="" label-width="" prop="item30" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item30" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item30" :disabled="disabledState"
                              :maxlength='1' style="width: 80px;" @change="clear(1,'item30')"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr  v-if="findItem(form.jobList,5)">
                <td>采矿：煤矿</td>
                <td>
                  <el-form-item label="" label-width="" prop="item32" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item32" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item32" :disabled="disabledState"
                              style="width: 80px;"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="" label-width="" prop="item33" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item33" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item33" :disabled="disabledState"
                              :maxlength='1' style="width: 80px;" @change="clear(1,'item33')"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.jobList,6)">
                <td>采矿：矽矿</td>
                <td>
                  <el-form-item label="" label-width="" prop="item35" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item35" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item35" :disabled="disabledState"
                              style="width: 80px;"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="" label-width="" prop="item36" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item36" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item36" :disabled="disabledState"
                              :maxlength='1' style="width: 80px;" @change="clear(1,'item36')"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.jobList,7)">
                <td>棉麻加工</td>
                <td>
                  <el-form-item label="" label-width="" prop="item38" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item38" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item38" :disabled="disabledState"
                              style="width: 80px;"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="" label-width="" prop="item39" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item39" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item39" :disabled="disabledState"
                              :maxlength='1' style="width: 80px;" @change="clear(1,'item39')"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.jobList,8)">
                <td>垃圾回收</td>
                <td>
                  <el-form-item label="" label-width="" prop="item41" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item41" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item41" :disabled="disabledState"
                              style="width: 80px;"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="" label-width="" prop="item42" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item42" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item42" :disabled="disabledState"
                              :maxlength='1' style="width: 80px;" @change="clear(1,'item42')"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.jobList,9)">
                <td>消防</td>
                <td>
                  <el-form-item label="" label-width="" prop="item44" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item44" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item44" :disabled="disabledState"
                              style="width: 80px;"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="" label-width="" prop="item45" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item45" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item45" :disabled="disabledState"
                              :maxlength='1' style="width: 80px;" @change="clear(1,'item45')"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.jobList,10)">
                <td>面粉/饲料/粮食加工</td>
                <td>
                  <el-form-item label="" label-width="" prop="item47" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item47" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item47" :disabled="disabledState"
                              style="width: 80px;"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="" label-width="" prop="item48" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item48" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item48" :disabled="disabledState"
                              :maxlength='1' style="width: 80px;" @change="clear(1,'item48')"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.jobList,11)">
                <td>钢铁铸造</td>
                <td>
                  <el-form-item label="" label-width="" prop="item50" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item50" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item50" :disabled="disabledState"
                              style="width: 80px;"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="" label-width="" prop="item51" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item51" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item51" :disabled="disabledState"
                              :maxlength='1' style="width: 80px;" @change="clear(1,'item51')"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.jobList,12)">
                <td>涂装（油漆）</td>
                <td>
                  <el-form-item label="" label-width="" prop="item53" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item53" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item53" :disabled="disabledState"
                              style="width: 80px;"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="" label-width="" prop="item54" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item54" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item54" :disabled="disabledState"
                              :maxlength='1' style="width: 80px;" @change="clear(1,'item54')"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.jobList,13)">
                <td>喷砂</td>
                <td>
                  <el-form-item label="" label-width="" prop="item56" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item56" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item56" :disabled="disabledState"
                              style="width: 80px;"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="" label-width="" prop="item57" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item57" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item57" :disabled="disabledState"
                              :maxlength='1' style="width: 80px;" @change="clear(1,'item57')"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.jobList,14)">
                <td>焊接</td>
                <td>
                  <el-form-item label="" label-width="" prop="item59" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item59" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item59" :disabled="disabledState"
                              style="width: 80px;"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="" label-width="" prop="item60" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item60" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item60" :disabled="disabledState"
                              :maxlength='1' style="width: 80px;" @change="clear(1,'item60')"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.jobList,15)">
                <td>建筑业</td>
                <td>
                  <el-form-item label="" label-width="" prop="item62" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item62" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item62" :disabled="disabledState"
                              style="width: 80px;"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="" label-width="" prop="item63" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item63" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item63" :disabled="disabledState"
                              :maxlength='1' style="width: 80px;" @change="clear(1,'item63')"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.jobList,16)">
                <td>农药生产</td>
                <td>
                  <el-form-item label="" label-width="" prop="item65" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item65" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item65" :disabled="disabledState"
                              style="width: 80px;"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="" label-width="" prop="item66" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item66" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item66" :disabled="disabledState"
                              :maxlength='1' style="width: 80px;" @change="clear(1,'item66')"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.jobList,17)">
                <td>厨师</td>
                <td>
                  <el-form-item label="" label-width="" prop="item68" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item68" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item68" :disabled="disabledState"
                              style="width: 80px;"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="" label-width="" prop="item69" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item69" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item69" :disabled="disabledState"
                              :maxlength='1' style="width: 80px;" @change="clear(1,'item69')"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.jobList,18)">
                <td>橡胶/轮胎</td>
                <td>
                  <el-form-item label="" label-width="" prop="item71" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item71" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item71" :disabled="disabledState"
                              style="width: 80px;"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="" label-width="" prop="item72" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item72" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item72" :disabled="disabledState"
                              :maxlength='1' style="width: 80px;" @change="clear(1,'item72')"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
              </tr>
            </table>
          </el-row>
          <div class="title">
            C. 吸烟史 （此部来源于资格审核表，无需重复填写）
          </div>
          <el-row>
            <el-form-item
              label="C1." required>
              <div>您是否吸烟？（每周吸一支以上并连续或累计6个月以上者定义为吸烟）：
                <el-form-item label="" label-width="" class="formItemWidth"
                              style="display: inline-block;">
                  <el-input v-model="form.item73" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item73" disabled
                            style="width: 80px;"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">0. 否，从不吸（跳至问题D）</li>
                  <li class="radio-li">1. 是，目前仍在吸</li>
                  <li class="radio-li">2. 以前吸，目前已戒烟</li>
                </ul>
              </div>
            </el-form-item>
          </el-row>
          <template v-if="form.item73 == 1 || form.item73 == 2">
            <el-row>
              <el-form-item
                label="C2." required>
                <div>从多少岁开始吸烟？
                  <el-form-item label="" label-width="" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item74" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item74" disabled
                              style="width: 80px;"
                              :maxlength='1' class="form-item"></el-input>　岁
                  </el-form-item></div>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="C3." required>
                <div>您曾经或现在早上醒来<u style="font-weight: 600">吸第一支烟</u>的时间大约为：
                  <el-form-item label="" label-width="" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item75" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item75" disabled
                              style="width: 80px;"
                              :maxlength='1' class="form-item"></el-input>
                  </el-form-item></div>
                <div class="radio-div">
                  <ul>
                    <li class="radio-li">1. 不到5分钟</li>
                    <li class="radio-li">2. 6-30分钟</li>
                    <li class="radio-li">3. 31-60分钟</li>
                    <li class="radio-li">4.  超过60分钟</li>
                  </ul>
                </div>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="C4." required>
                <div>您主要吸下列哪一种烟草产品？
                  <el-form-item label="" label-width="" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item76" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item76" disabled
                              style="width: 80px;"
                              :maxlength='1' class="form-item"></el-input>
                  </el-form-item></div>
                <div class="radio-div">
                  <ul>
                    <li class="radio-li">1. 机制卷烟</li>
                    <li class="radio-li">2. 手卷烟</li>
                    <li class="radio-li">3. 烟斗</li>
                    <li class="radio-li">4. 雪茄</li>
                    <li class="radio-li">5. 水烟</li>
                    <li class="radio-li">6. 其他
                      <span>具体类型</span>
                      <el-input v-model="form.item77" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item77" disabled
                                style="width: 80px;"
                                :maxlength='1' class="form-item"></el-input>
                    </li>
                  </ul>
                </div>
              </el-form-item>
            </el-row>
            <el-row  v-if="form.item73 == 2">
              <el-form-item
                label="C5." required>
                <div>这次戒烟已持续多少年？（不足1年按0.5年计）
                  <el-form-item label="" label-width="" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item78" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item78" disabled
                              style="width: 80px;"
                              :maxlength='1' class="form-item"></el-input>　年
                  </el-form-item></div>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="C6." required>
                <div>如果您仍在吸烟或曾吸烟，扣除戒烟年数，共吸烟多少年（不足1年按0.5年计）
                  <el-form-item label="" label-width="" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item79" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item79" disabled
                              style="width: 80px;"
                              :maxlength='1' class="form-item"></el-input>　年
                  </el-form-item></div>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="C7." required>
                <div>如果您仍在吸烟或曾吸烟，平均每天吸烟多少支（1包=20支；1两烟叶≈50支卷烟）
                  <el-form-item label="" label-width="" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item80" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item80" disabled
                              style="width: 80px;"
                              :maxlength='1' class="form-item"></el-input>　支
                  </el-form-item></div>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="C8." required>
                <div>吸烟包年数是多少（自动计算）
                  <el-form-item label="" label-width="" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item81" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item81" disabled
                              style="width: 80px;"
                              :maxlength='1' class="form-item"></el-input>　包年
                  </el-form-item></div>
              </el-form-item>
            </el-row>
          </template>

          <div class="title">
            D. 被动吸烟史 （此部来源于资格审核表，无需重复填写）
          </div>
          <el-row>
            <el-form-item
              label="D1." required>
              <div>被动吸烟：同您一起生活的家人或者工作的同事是否吸烟（平均每周5天或以上）？
                <el-form-item label="" label-width="" class="formItemWidth"
                              style="display: inline-block;">
                  <el-input v-model="form.item82" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item82" disabled
                            style="width: 80px;"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">0. 否，跳至E部分</li>
                  <li class="radio-li">1. 是</li>
                </ul>
              </div>
            </el-form-item>
            <br>
            <el-form-item
              label="D1.1." required v-if="form.item82 == 1">
              <div>如果是，那么在有烟雾的室内环境中，您居住和/或工作了多少年（不足1年按0.5年计）？
                <el-form-item label="" label-width="" class="formItemWidth"
                              style="display: inline-block;">
                  <el-input v-model="form.item83" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item83" disabled
                            style="width: 80px;"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item>
              </div>
            </el-form-item>
          </el-row>
          <template v-if="form.item83 == 1">
            <el-row>
              <el-form-item
                label="D2." required>
                <div>.吸烟者与您的关系（多选）？</div>
                <div class="radio-div">
                  <el-checkbox-group v-model="form.smokeCheckList" :disabled="disabledState">
                    <el-checkbox :label="1" ref="smokeCheckList">配偶</el-checkbox>
                    <el-checkbox :label="2">伴侣</el-checkbox>
                    <el-checkbox :label="3">其它家庭成员
                      <span v-if="form.smokeCheckList.indexOf(3)>-1" style="display: inline-block;width: 180px;">
                              ，具体人数
                               <el-form-item prop="item87" class="content-padding" labelWidth="0"
                                             :inline-message="true" style="display: inline-block;">
                              <el-input v-model.trim="form.item87" auto-complete="off" size="small"
                                        style="width: 80px;"
                                        :disabled="disabledState"
                                        class="smallInput" ref="item87"></el-input>
                            </el-form-item>
                            </span>

                    </el-checkbox>
                    <el-checkbox :label="4">同一办公室同事
                      <span v-if="form.smokeCheckList.indexOf(4)>-1" style="display: inline-block;width: 180px;">
                              ，具体人数
                               <el-form-item prop="item89" class="content-padding" labelWidth="0"
                                             :inline-message="true" style="display: inline-block;">
                              <el-input v-model.trim="form.item89" auto-complete="off" size="small"
                                        style="width: 80px;"
                                        :disabled="disabledState"
                                        class="smallInput" ref="item89"></el-input>
                            </el-form-item>
                            </span>
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="D3." required>
                <div>如果该吸烟者仍在吸烟或曾吸烟，扣除戒烟年数，共吸烟多少年（不足1年按0.5年计）
                  <el-form-item label="" label-width="" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item90" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item90" disabled
                              style="width: 80px;"
                              :maxlength='1' class="form-item"></el-input>　年
                  </el-form-item></div>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="D4." required>
                <div> 如果该吸烟者仍在吸烟或曾吸烟，平均每天吸烟多少支（1包=20支；1两烟叶≈50支卷烟）
                  <el-form-item label="" label-width="" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item91" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item91" disabled
                              style="width: 80px;"
                              :maxlength='1' class="form-item"></el-input>　支
                  </el-form-item></div>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="D5." required>
                <div> 吸烟包年数是多少（自动计算）
                  <el-form-item label="" label-width="" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item92" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item92" disabled
                              style="width: 80px;"
                              :maxlength='1' class="form-item"></el-input>　支
                  </el-form-item></div>
              </el-form-item>
            </el-row>
          </template>
          <div class="title">
            E. 饮酒史
          </div>
          <el-row>
            <el-form-item
              label="E1." required>
              <div>您是否<u style="font-weight: 600">经常</u>饮酒（经常是指平均每周至少1次，连续6个月以上）？
                <el-form-item label="" label-width="" class="formItemWidth" prop="item93"
                              style="display: inline-block;">
                  <el-input v-model="form.item93" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item93" :disabled="disabledState"
                            style="width: 80px;" @change="clear('item93')"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">0. 否，不经常饮酒（跳至F部分）</li>
                  <li class="radio-li">1. 是，目前仍经常饮（跳至E3题）</li>
                  <li class="radio-li">2. 以前是，目前已戒酒（请回答E2）</li>
                </ul>
              </div>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="E2." required v-if="form.item93 == 2">
              <div>如果您目前已戒酒，这次戒酒已持续多少年？（不足1年按1年计）
                <el-form-item label="" label-width="" class="formItemWidth" prop="item94"
                              style="display: inline-block;">
                  <el-input v-model="form.item94" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item94" :disabled="disabledState"
                            style="width: 80px;"
                             class="form-item"></el-input>　年
                </el-form-item></div>

            </el-form-item>
          </el-row>
          <el-row v-if="form.item93 == 2 || form.item93 == 1">
            <el-form-item
              label="E3." required>
              <div>您<u style="font-weight: 600">经常</u>饮酒的种类是什么？
                <el-form-item label="" label-width="" class="formItemWidth" prop="item95"
                              style="display: inline-block;">
                  <el-input v-model="form.item95" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item95" :disabled="disabledState"
                            style="width: 80px;" @change="clear(5,'item95')"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">1. 葡萄酒</li>
                  <li class="radio-li">2. 白酒</li>
                  <li class="radio-li">3. 啤酒</li>
                  <li class="radio-li">4. 黄酒</li>
                  <li class="radio-li">5. 其他</li>
                </ul>
              </div>
            </el-form-item>
          </el-row>
          <el-row v-if="form.item93 == 2 || form.item93 == 1">
            <el-form-item
              label="E4." required>
              <div>您多久会喝一次酒？
                <el-form-item label="" label-width="" class="formItemWidth" prop="item96"
                              style="display: inline-block;">
                  <el-input v-model="form.item96" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item96" :disabled="disabledState"
                            style="width: 80px;" @change="clear(4,'item96')"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">1. 每月1次或更少</li>
                  <li class="radio-li">2. 每月2-4次</li>
                  <li class="radio-li">3. 每周2-3次</li>
                  <li class="radio-li">4.  每周4次或更多</li>
                </ul>
              </div>
            </el-form-item>
          </el-row>
          <el-row v-if="form.item93 == 2 || form.item93 == 1">
            <el-form-item
              label="E5." required>
              <div>通常状况下，您平均<u style="font-weight: 600">一天</u>饮酒的总量为多少单位？一单位等于一听啤酒（330ml）或一杯葡萄酒（150ml）或（一两白酒）
                <el-form-item label="" label-width="" class="formItemWidth" prop="item96"
                              style="display: inline-block;">
                  <el-input v-model="form.item97" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item97" :disabled="disabledState"
                            style="width: 80px;" @change="clear(5,'item97')"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">1. ≤1</li>
                  <li class="radio-li">2. 2-3</li>
                  <li class="radio-li">3. 4</li>
                  <li class="radio-li">4.  5-7</li>
                  <li class="radio-li">5.  ≥8</li>
                </ul>
              </div>
            </el-form-item>
          </el-row>
          <div class="title">
            F. 饮食
          </div>
          <el-row>
            <el-form-item
              label="F1." required>
              <div>在<u style="font-weight: 600">过去12个月</u>中，对以下食物您的食用频率及平均摄入量如何？</div>
              <table class="item98-table">
                <thead>
                <th class="item98-table-title">过去12个月</th>
                <th class="item98-table-title" style="padding: 0 20px;">食用频率（请用对应数字填写下表）<br>1. >1次/天；  2. 1次/天； 3. >1次/周； 4. 1次/周； 5. ≈1次/月； 6. 从不吃 </th>
                <th class="item98-table-title">平均摄入量（请用对应数字填写下表）</th>
                </thead>
                <tr>
                  <td>细粮（大米、面食）</td>
                  <td>
                    <el-form-item label="" label-width="" prop="item98" class="formItemWidth"
                                  style="display: inline-block;" :inline-message="true">
                      <el-input v-model="form.item98" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item98"
                                style="width: 40px;" :disabled="disabledState" @change="clear('vegetables','item98',false,['item99'])"
                                :maxlength='1' class="form-item"></el-input>
                    </el-form-item>
                  </td>
                  <td>
                    <el-col :span="12">
                      <ul>
                        <li>
                          1．<1.5 两/天
                        </li>
                        <li>
                          2．≥1.5 两/天
                        </li>
                      </ul>
                    </el-col>
                    <el-col :span="12">
                      <div>
                        <el-form-item label="" label-width="" prop="item99" class="formItemWidth"  v-if="returnTrueOrFalse1(form.item98)"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item99" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item99"
                                    style="width: 40px;margin-top:10px" :disabled="disabledState || form.item98 == 6"
                                    @change="clear(2,'item99')"
                                    :maxlength='1' class="form-item"></el-input>
                        </el-form-item>
                      </div>
                      <div>
                        <el-form-item label="" label-width="" prop="" class="formItemWidth"  v-if="returnTrueOrFalse(form.item98)"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item99" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item99"
                                    style="width: 40px;margin-top:10px" disabled
                                    @change="clear(2,'item99')"
                                    :maxlength='1' class="form-item"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </td>
                </tr>
                <tr>
                  <td class="item25-table-td1">粗粮（五谷杂粮，包括小米、玉米、高粱等）</td>
                  <td>
                    <el-form-item label="" label-width="" prop="item100" class="formItemWidth"
                                  style="display: inline-block;" :inline-message="true">
                      <el-input v-model="form.item100" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item100"
                                style="width: 40px;" :disabled="disabledState" @change="clear('vegetables','item100',false,['item101'])"
                                :maxlength='1' class="form-item"></el-input>
                    </el-form-item>
                  </td>
                  <td>
                    <el-col :span="12">
                      <ul>
                        <li>
                          1．<1.5 两/天
                        </li>
                        <li>
                          2．≥1.5 两/天
                        </li>
                      </ul>
                    </el-col>
                    <el-col :span="12">
                      <div>
                        <el-form-item label="" label-width="" prop="item101" class="formItemWidth"  v-if="returnTrueOrFalse1(form.item100)"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item101" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item101"
                                    style="width: 40px;margin-top:10px" :disabled="disabledState"
                                    @change="clear(2,'item101')"
                                    :maxlength='1' class="form-item"></el-input>
                        </el-form-item>
                      </div>
                      <div>
                        <el-form-item label="" label-width="" prop="" class="formItemWidth"  v-if="returnTrueOrFalse(form.item100)"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item101" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item101"
                                    style="width: 40px;margin-top:10px" disabled
                                    @change="clear(2,'item101')"
                                    :maxlength='1' class="form-item"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </td>
                </tr>
                <tr>
                  <td class="item25-table-td1">新鲜水果</td>
                  <td>
                    <el-form-item label="" label-width="" prop="item102" class="formItemWidth"
                                  style="display: inline-block;" :inline-message="true">
                      <el-input v-model="form.item102" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item102"
                                style="width: 40px;" :disabled="disabledState" @change="clear('vegetables','item102',false,['item103'])"
                                :maxlength='1' class="form-item"></el-input>
                    </el-form-item>
                  </td>
                  <td>
                    <el-col :span="12">
                      <ul>
                        <li>
                          1．<4 两/天
                        </li>
                        <li>
                          2．≥4 两/天
                        </li>
                      </ul>
                    </el-col>
                    <el-col :span="12">
                      <div>
                        <el-form-item label="" label-width="" prop="item103" class="formItemWidth"  v-if="returnTrueOrFalse1(form.item102)"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item103" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item103"
                                    style="width: 40px;margin-top:10px" :disabled="disabledState"
                                    @change="clear(2,'item103')"
                                    :maxlength='1' class="form-item"></el-input>
                        </el-form-item>
                      </div>
                      <div>
                        <el-form-item label="" label-width="" prop="" class="formItemWidth"  v-if="returnTrueOrFalse(form.item102)"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item103" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item103"
                                    style="width: 40px;margin-top:10px" disabled
                                    :maxlength='1' class="form-item"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </td>
                </tr>
                <tr>
                  <td class="item25-table-td1">新鲜蔬菜</td>
                  <td>
                    <el-form-item label="" label-width="" prop="item104" class="formItemWidth"
                                  style="display: inline-block;" :inline-message="true">
                      <el-input v-model="form.item104" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item104"
                                style="width: 40px;" :disabled="disabledState" @change="clear('vegetables','item104',false,['item105'])"
                                :maxlength='1' class="form-item"></el-input>
                    </el-form-item>
                  </td>
                  <td>
                    <el-col :span="12">
                      <ul>
                        <li>
                          1．<7 两/天
                        </li>
                        <li>
                          2．≥7 两/天
                        </li>
                      </ul>
                    </el-col>
                    <el-col :span="12">
                      <div>
                        <el-form-item label="" label-width="" prop="item105" class="formItemWidth"  v-if="returnTrueOrFalse1(form.item104)"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item105" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item105"
                                    style="width: 40px;margin-top:10px" :disabled="disabledState"
                                    @change="clear(2,'item105')"
                                    :maxlength='1' class="form-item"></el-input>
                        </el-form-item>
                      </div>
                      <div>
                        <el-form-item label="" label-width="" prop="" class="formItemWidth"  v-if="returnTrueOrFalse(form.item104)"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item105" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item105"
                                    style="width: 40px;margin-top:10px" disabled
                                    @change="clear(2,'item105')"
                                    :maxlength='1' class="form-item"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </td>
                </tr>
                <tr>
                  <td class="item25-table-td1">畜肉（猪、牛、羊肉等）</td>
                  <td>
                    <el-form-item label="" label-width="" prop="item106" class="formItemWidth"
                                  style="display: inline-block;" :inline-message="true">
                      <el-input v-model="form.item106" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item106"
                                style="width: 40px;" :disabled="disabledState" @change="clear('vegetables','item106',false,['item107'])"
                                :maxlength='1' class="form-item"></el-input>
                    </el-form-item>
                  </td>
                  <td>
                    <el-col :span="12">
                      <ul>
                        <li>
                          1．≤1 个/天
                        </li>
                        <li>
                          2．>1 个/天
                        </li>
                      </ul>
                    </el-col>
                    <el-col :span="12">
                      <div>
                        <el-form-item label="" label-width="" prop="item107" class="formItemWidth"  v-if="returnTrueOrFalse1(form.item106)"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item107" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item107"
                                    style="width: 40px;margin-top:10px" :disabled="disabledState || form.item106 == 6"
                                    @change="clear(2,'item107')"
                                    :maxlength='1' class="form-item"></el-input>
                        </el-form-item>
                      </div>
                      <div>
                        <el-form-item label="" label-width="" prop="" class="formItemWidth"  v-if="returnTrueOrFalse(form.item106)"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item107" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item107"
                                    style="width: 40px;margin-top:10px" disabled
                                    @change="clear(2,'item107')"
                                    :maxlength='1' class="form-item"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </td>
                </tr>
                <tr>
                  <td class="item25-table-td1">鱼/禽肉（鸡、鸭、鹅肉等）</td>
                  <td>
                    <el-form-item label="" label-width="" prop="item108" class="formItemWidth"
                                  style="display: inline-block;" :inline-message="true">
                      <el-input v-model="form.item108" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item108"
                                style="width: 40px;" :disabled="disabledState" @change="clear('vegetables','item108',false,['item109'])"
                                :maxlength='1' class="form-item"></el-input>
                    </el-form-item>
                  </td>
                  <td>
                    <el-col :span="12">
                      <ul>
                        <li>
                          1．≤1 个/天
                        </li>
                        <li>
                          2．>1 个/天
                        </li>
                      </ul>
                    </el-col>
                    <el-col :span="12">
                      <div>
                        <el-form-item label="" label-width="" prop="item109" class="formItemWidth"  v-if="returnTrueOrFalse1(form.item108)"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item109" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item109"
                                    style="width: 40px;margin-top:10px" :disabled="disabledState"
                                    @change="clear(2,'item109')"
                                    :maxlength='1' class="form-item"></el-input>
                        </el-form-item>
                      </div>
                      <div>
                        <el-form-item label="" label-width="" prop="" class="formItemWidth"  v-if="returnTrueOrFalse(form.item108)"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item109" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item109"
                                    style="width: 40px;margin-top:10px" disabled
                                    @change="clear(2,'item109')"
                                    :maxlength='1' class="form-item"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </td>
                </tr>
                <tr>
                  <td class="item25-table-td1">蛋类（鸡蛋、鸭蛋等）</td>
                  <td>
                    <el-form-item label="" label-width="" prop="item110" class="formItemWidth"
                                  style="display: inline-block;" :inline-message="true">
                      <el-input v-model="form.item110" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item110"
                                style="width: 40px;" :disabled="disabledState" @change="clear('vegetables','item110',false,['item111'])"
                                :maxlength='1' class="form-item"></el-input>
                    </el-form-item>
                  </td>
                  <td>
                    <el-col :span="12">
                      <ul>
                        <li>
                          1．≤1 个/天
                        </li>
                        <li>
                          2．>1 个/天
                        </li>
                      </ul>
                    </el-col>
                    <el-col :span="12">
                      <div>
                        <el-form-item label="" label-width="" prop="item111" class="formItemWidth"  v-if="returnTrueOrFalse1(form.item110)"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item111" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item111"
                                    style="width: 40px;margin-top:10px" :disabled="disabledState"
                                    @change="clear(2,'item111')"
                                    :maxlength='1' class="form-item"></el-input>
                        </el-form-item>
                      </div>
                      <div>
                        <el-form-item label="" label-width="" prop="" class="formItemWidth"  v-if="returnTrueOrFalse(form.item110)"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item111" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item111"
                                    style="width: 40px;margin-top:10px" disabled
                                    @change="clear(2,'item111')"
                                    :maxlength='1' class="form-item"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </td>
                </tr>
                <tr>
                  <td class="item25-table-td1">奶类（牛奶、羊奶）</td>
                  <td>
                    <el-form-item label="" label-width="" prop="item112" class="formItemWidth"
                                  style="display: inline-block;" :inline-message="true">
                      <el-input v-model="form.item112" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item112"
                                style="width: 40px;" :disabled="disabledState" @change="clear('vegetables','item112',false,['item99'])"
                                :maxlength='1' class="form-item"></el-input>
                    </el-form-item>
                  </td>
                  <td>
                    <el-col :span="12">
                      <ul>
                        <li>
                          1．≤0.5 斤/天
                        </li>
                        <li>
                          2．>0.5 斤/天
                        </li>
                      </ul>
                    </el-col>
                    <el-col :span="12">
                      <div>
                        <el-form-item label="" label-width="" prop="item99" class="formItemWidth"  v-if="returnTrueOrFalse1(form.item112)"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item113" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item113"
                                    style="width: 40px;margin-top:10px" :disabled="disabledState"
                                    @change="clear(2,'item113')"
                                    :maxlength='1' class="form-item"></el-input>
                        </el-form-item>
                      </div>
                      <div>
                        <el-form-item label="" label-width="" prop="" class="formItemWidth"  v-if="returnTrueOrFalse(form.item112)"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item113" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item113"
                                    style="width: 40px;margin-top:10px" disabled
                                    @change="clear(2,'item113')"
                                    :maxlength='1' class="form-item"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </td>
                </tr>
                <tr>
                  <td class="item25-table-td1">香肠／熏肉／熏鱼／咸鱼/腊肉</td>
                  <td>
                    <el-form-item label="" label-width="" prop="item114" class="formItemWidth"
                                  style="display: inline-block;" :inline-message="true">
                      <el-input v-model="form.item114" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item114"
                                style="width: 40px;" :disabled="disabledState" @change="clear('vegetables','item114',false,['item115'])"
                                :maxlength='1' class="form-item"></el-input>
                    </el-form-item>
                  </td>
                  <td>
                    <el-col :span="12">
                      <ul>
                        <li>
                          1．≤1 两/天
                        </li>
                        <li>
                          2．>1 两/天
                        </li>
                      </ul>
                    </el-col>
                    <el-col :span="12">
                      <div>
                        <el-form-item label="" label-width="" prop="item115" class="formItemWidth"  v-if="returnTrueOrFalse1(form.item114)"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item115" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item115"
                                    style="width: 40px;margin-top:10px" :disabled="disabledState"
                                    @change="clear(2,'item115')"
                                    :maxlength='1' class="form-item"></el-input>
                        </el-form-item>
                      </div>
                      <div>
                        <el-form-item label="" label-width="" prop="" class="formItemWidth"  v-if="returnTrueOrFalse(form.item114)"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item115" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item115"
                                    style="width: 40px;margin-top:10px" disabled
                                    @change="clear(2,'item115')"
                                    :maxlength='1' class="form-item"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </td>
                </tr>
                <tr>
                  <td class="item25-table-td1">腌制食品（酸菜、泡菜、咸菜等）</td>
                  <td>
                    <el-form-item label="" label-width="" prop="item116" class="formItemWidth"
                                  style="display: inline-block;" :inline-message="true">
                      <el-input v-model="form.item116" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item116"
                                style="width: 40px;" :disabled="disabledState" @change="clear('vegetables','item116',false,['item117'])"
                                :maxlength='1' class="form-item"></el-input>
                    </el-form-item>
                  </td>
                  <td>
                    <el-col :span="12">
                      <ul>
                        <li>
                          1．≤1 两/天
                        </li>
                        <li>
                          2．>1 两/天
                        </li>
                      </ul>
                    </el-col>
                    <el-col :span="12">
                      <div>
                        <el-form-item label="" label-width="" prop="item117" class="formItemWidth"  v-if="returnTrueOrFalse1(form.item116)"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item117" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item117"
                                    style="width: 40px;margin-top:10px" :disabled="disabledState"
                                    @change="clear(2,'item117')"
                                    :maxlength='1' class="form-item"></el-input>
                        </el-form-item>
                      </div>
                      <div>
                        <el-form-item label="" label-width="" prop="" class="formItemWidth"  v-if="returnTrueOrFalse(form.item116)"
                                      style="display: inline-block;" :inline-message="true">
                          <el-input v-model="form.item117" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item117"
                                    style="width: 40px;margin-top:10px" disabled
                                    @change="clear(2,'item117')"
                                    :maxlength='1' class="form-item"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </td>
                </tr>
              </table>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="F2." required>
              <div>您平时的饮食喜好习惯？
              </div>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="F2.1." required>
              <div>冷热度（包括饮茶、饮水）：
                <el-form-item label="" label-width="" class="formItemWidth" prop="item118"
                              style="display: inline-block;">
                  <el-input v-model="form.item118" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item118" :disabled="disabledState"
                            style="width: 80px;" @change="clear(4,'item118')"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">1. 烫</li>
                  <li class="radio-li">2. 热</li>
                  <li class="radio-li">3. 温</li>
                  <li class="radio-li">4. 凉</li>
                </ul>
              </div>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="F2.2." required>
              <div>干稀度：
                <el-form-item label="" label-width="" class="formItemWidth" prop="item119"
                              style="display: inline-block;">
                  <el-input v-model="form.item119" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item119" :disabled="disabledState"
                            style="width: 80px;" @change="clear(3,'item119')"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">1. 干</li>
                  <li class="radio-li">2. 适中</li>
                  <li class="radio-li">3. 稀</li>
                </ul>
              </div>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="F2.3." required>
              <div>口味：
                <el-form-item label="" label-width="" class="formItemWidth" prop="item120"
                              style="display: inline-block;">
                  <el-input v-model="form.item120" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item120" :disabled="disabledState"
                            style="width: 80px;" @change="clear(3,'item120')"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">1. 重盐</li>
                  <li class="radio-li">2. 适中</li>
                  <li class="radio-li">3. 清淡</li>
                </ul>
              </div>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="F2.4." required>
              <div>油脂：
                <el-form-item label="" label-width="" class="formItemWidth" prop="item121"
                              style="display: inline-block;">
                  <el-input v-model="form.item121" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item121" :disabled="disabledState"
                            style="width: 80px;" @change="clear(3,'item121')"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">1. 较高</li>
                  <li class="radio-li">2. 适中</li>
                  <li class="radio-li">3. 较低</li>
                </ul>
              </div>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="F3." required>
              <div>您是否<u style="font-weight: 600">经常</u>饮茶？（经常指平均每周至少3次，连续6个月以上）？
                <el-form-item label="" label-width="" class="formItemWidth" prop="item122"
                              style="display: inline-block;">
                  <el-input v-model="form.item122" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item122" :disabled="disabledState"
                            style="width: 80px;" @change="clear(12,'item122')"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">0. 否，不经常饮茶</li>
                  <li class="radio-li">1. 是，目前仍经常饮</li>
                  <li class="radio-li">2. 以前是，现在不经常饮</li>
                </ul>
              </div>
            </el-form-item>
          </el-row>
          <div class="title">
            G. 运动
          </div>
          <el-row>
          <el-form-item
            label="G1." required>
            <div>在过去<u style="font-weight: 600">12个月</u>中，您是否<u style="font-weight: 600">经常</u>加体育锻炼（经常是指平均每周3次以上，每次超过30分钟）？
              <el-form-item label="" label-width="" class="formItemWidth" prop="item123"
                            style="display: inline-block;">
                <el-input v-model="form.item123" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item123" :disabled="disabledState"
                          style="width: 80px;" @change="clear(1,'item123')"
                          :maxlength='1' class="form-item"></el-input>
              </el-form-item></div>
            <div class="radio-div">
              <ul>
                <li class="radio-li">0.	否（跳至H部分）</li>
                <li class="radio-li">1. 是（请勾选具体从事的活动，并说明活动时间和频率，可多选）</li>
              </ul>
            </div>
            <div class="radio-div" v-if="form.item123 == 1">
              <el-form-item  prop="sportList" class="formItemWidth radio-div" >
                <div class="job">
                  <el-checkbox-group v-model="form.sportList"  :disabled="disabledState" :size="$store.state.style.assemblyModel">
                    <template v-for="item in sport">
                      <el-checkbox :label="item.value">{{item.label}}</el-checkbox>
                      <p>{{item.notice}}</p>
                    </template>
                  </el-checkbox-group>
                </div>
              </el-form-item>
              <template v-if="form.sportList.indexOf(1)>-1">
                <br>
                <el-form-item  prop="sportList" class="formItemWidth radio-div sport" style="margin-top: 20px;" v-if="form.sportList.indexOf(1)>-1">
                  <div>您从事低强度活动时,每周平均活动
                    <el-form-item label="" label-width="" class="formItemWidth" prop="item125"
                                  style="display: inline-block;">
                      <el-input v-model="form.item125" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item125" :disabled="disabledState"
                                style="width: 80px;" class="form-item"></el-input>　次，每次平均活动时间
                      <el-form-item label="" label-width="" class="formItemWidth" prop="item126"
                                    style="display: inline-block;">
                        <el-input v-model="form.item126" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item126" :disabled="disabledState"
                                  style="width: 80px;" class="form-item"></el-input>　分钟。

                      </el-form-item>
                    </el-form-item>
                  </div>
                </el-form-item>
              </template>
              <template v-if="form.sportList.indexOf(2)>-1">
                <br>
                <el-form-item  prop="sportList" class="formItemWidth radio-div sport" style="margin-top: 20px;" v-if="form.sportList.indexOf(2)>-1">
                  <div>您从事中等强度活动时,每周平均活动
                    <el-form-item label="" label-width="" class="formItemWidth" prop="item128"
                                  style="display: inline-block;">
                      <el-input v-model="form.item128" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item128" :disabled="disabledState"
                                style="width: 80px;" class="form-item"></el-input>　次，每次平均活动时间
                      <el-form-item label="" label-width="" class="formItemWidth" prop="item129"
                                    style="display: inline-block;">
                        <el-input v-model="form.item129" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item129" :disabled="disabledState"
                                  style="width: 80px;"  class="form-item"></el-input>　分钟。

                      </el-form-item>
                    </el-form-item>
                  </div>
                </el-form-item>
              </template>
              <template v-if="form.sportList.indexOf(3)>-1">
                <br>
                <el-form-item  prop="sportList" class="formItemWidth radio-div sport" style="margin-top: 20px;" v-if="form.sportList.indexOf(3)>-1">
                  <div>您从事高等强度活动时,每周平均活动
                    <el-form-item label="" label-width="" class="formItemWidth" prop="item131"
                                  style="display: inline-block;">
                      <el-input v-model="form.item131" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item131" :disabled="disabledState"
                                style="width: 80px;"  class="form-item"></el-input>　次，每次平均活动时间
                      <el-form-item label="" label-width="" class="formItemWidth" prop="item132"
                                    style="display: inline-block;">
                        <el-input v-model="form.item132" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item132" :disabled="disabledState"
                                  style="width: 80px;" class="form-item"></el-input>　分钟。

                      </el-form-item>
                    </el-form-item>
                  </div>
                </el-form-item>
              </template>
            </div>
          </el-form-item>
        </el-row>
          <el-row>
            <el-form-item
              label="G2." required>
              <div>在过去<u style="font-weight: 600">12个月</u>中，您每天平均坐着的时间（包括伏案工作、看手机、看电视等）？
                <el-form-item label="" label-width="" class="formItemWidth" prop="item133"
                              style="display: inline-block;">
                  <el-input v-model="form.item133" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item133" :disabled="disabledState"
                            style="width: 80px;" @ class="form-item"></el-input>　小时/天
                </el-form-item></div>
            </el-form-item>
          </el-row>
          <div class="title">
            H. 生活环境
          </div>
          <el-row>
            <el-form-item
              label="H1." required>
              <div>您近十年来的生活环境是否存在较严重空气污染（如长期在大城市生活则直接被认定有空气污染）？
                <el-form-item label="" label-width="" class="formItemWidth" prop="item134"
                              style="display: inline-block;">
                  <el-input v-model="form.item134" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item134" :disabled="disabledState"
                            style="width: 80px;" @change="clear(1,'item134')"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">0. 否</li>
                  <li class="radio-li">1. 是</li>
                </ul>
              </div>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="H2." required>
              <div>近十年来，您的住房是否进行取暖？
                <el-form-item label="" label-width="" class="formItemWidth" prop="item135"
                              style="display: inline-block;">
                  <el-input v-model="form.item135" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item135" :disabled="disabledState"
                            style="width: 80px;" @change="clear(1,'item135')"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">0. 否（跳转至H3）</li>
                  <li class="radio-li">1. 是</li>
                </ul>
              </div>
            </el-form-item>
            <br>
            <el-form-item
              label="H2.1." required>
              <div>主要取暖方式：
                <el-form-item label="" label-width="" class="formItemWidth" prop="item136"
                              style="display: inline-block;">
                  <el-input v-model="form.item136" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item136" :disabled="disabledState"
                            style="width: 80px;" @change="clear('item136','item136')"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">1. 集中暖气</li>
                  <li class="radio-li">2. 用电</li>
                  <li class="radio-li">3. 太阳能</li>
                  <li class="radio-li">4. 天然气</li>
                  <li class="radio-li">5. 烧煤</li>
                  <li class="radio-li">8. 其他
                    <el-form-item label="" label-width="" class="formItemWidth" prop="item137" v-if="form.item136 == 8"
                                  style="display: inline-block;">
                      <el-input v-model="form.item137" auto-complete="off" type="textarea" :rows="1" :size="$store.state.style.assemblyModel" ref="item137" :disabled="disabledState"
                                style="width: 200px;"  class="form-item"></el-input>
                    </el-form-item>
                  </li>
                </ul>
              </div>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="H3." required>
              <div>近十年来，您家的主要做饭燃料种类？
                <el-form-item label="" label-width="" class="formItemWidth" prop="item138"
                              style="display: inline-block;">
                  <el-input v-model="form.item138" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item138" :disabled="disabledState"
                            style="width: 80px;" @change="clear('item138','item138')"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">1. 天然气/液化气</li>
                  <li class="radio-li">2. 用电</li>
                  <li class="radio-li">3. 烧煤</li>
                  <li class="radio-li">8. 其他
                    <el-form-item label="" label-width="" class="formItemWidth" prop="item139" v-if="form.item138 == 8"
                                  style="display: inline-block;">
                      <el-input v-model="form.item139" auto-complete="off" type="textarea" :rows="1" :size="$store.state.style.assemblyModel" ref="item139" :disabled="disabledState"
                                style="width: 200px;"  class="form-item"></el-input>
                    </el-form-item>
                  </li>
                </ul>
              </div>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="H4." required>
              <div>近十年来，您家做饭时住房內的油烟情况？
                <el-form-item label="" label-width="" class="formItemWidth" prop="item140"
                              style="display: inline-block;">
                  <el-input v-model="form.item140" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item140" :disabled="disabledState"
                            style="width: 80px;" @change="clear(4,'item140')"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">1. 无烟</li>
                  <li class="radio-li">2. 少许</li>
                  <li class="radio-li">3. 较多</li>
                  <li class="radio-li">4. 很多</li>
                </ul>
              </div>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="H5." required>
              <div>您家厨房采用什么排风设施？
                <el-form-item label="" label-width="" class="formItemWidth" prop="item141"
                              style="display: inline-block;">
                  <el-input v-model="form.item141" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item141" :disabled="disabledState"
                            style="width: 80px;" @change="clear(5,'item141',true,['item142'],5)"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">1. 无</li>
                  <li class="radio-li">2. 油烟机</li>
                  <li class="radio-li">3. 换气扇</li>
                  <li class="radio-li">4. 烟囱</li>
                  <li class="radio-li">5. 其他
                    <el-form-item label="" label-width="" class="formItemWidth" prop="item142" v-if="form.item141 == 5"
                                  style="display: inline-block;">
                      <el-input v-model="form.item142" auto-complete="off" type="textarea" :rows="1" :size="$store.state.style.assemblyModel" ref="item142" :disabled="disabledState"
                                style="width: 200px;"  class="form-item"></el-input>
                    </el-form-item>
                  </li>
                </ul>
              </div>
            </el-form-item>
          </el-row>
          <div class="title">
            I．心理和情绪
          </div>
          <el-row>
            <el-form-item
              label="I1." required>
              <div>近些年您是否曾经受较大的精神创伤（配偶或直系亲属患重病或死亡、夫妇分居或离婚、重大财产损失、意外失业、重大意外身体伤害、暴力侵害等）？
                <el-form-item label="" label-width="" class="formItemWidth" prop="item143"
                              style="display: inline-block;">
                  <el-input v-model="form.item143" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item143" :disabled="disabledState"
                            style="width: 80px;" @change="clear(1,'item143')"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">0. 否</li>
                  <li class="radio-li">1. 是</li>
                </ul>
              </div>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="I2." required>
              <div>近10年您是否有较长一段时间内精神处于压抑状况（连续超过6个月）？
                <el-form-item label="" label-width="" class="formItemWidth" prop="item144"
                              style="display: inline-block;">
                  <el-input v-model="form.item144" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item144" :disabled="disabledState"
                            style="width: 80px;" @change="clear(1,'item144')"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">0. 否</li>
                  <li class="radio-li">1. 是</li>
                </ul>
              </div>
            </el-form-item>
          </el-row>
          <div class="title">
            J．疾病史
          </div>
          <el-row>
            <el-form-item
              label="J1." required>
              <div>您是否患过 <u style="font-weight: 700;">慢性呼吸系统疾病</u>？（经正规医疗机构明确诊断）
                <el-form-item label="" label-width="" class="formItemWidth" prop="item145"
                              style="display: inline-block;">
                  <el-input v-model="form.item145" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item145" :disabled="disabledState"
                            style="width: 80px;" @change="clear(1,'item145')"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">0. 否（跳转至问题J2）</li>
                  <li class="radio-li">1. 是（请勾选具体慢性呼吸系统疾病，并填写具体信息，可多选）</li>
                </ul>
              </div>
            </el-form-item>
            <br>
            <el-form-item  prop="diseaseList" class="formItemWidth radio-div" v-if="form.item145 == 1">
              <div class="job disease">
                <el-checkbox-group v-model="form.diseaseList" :disabled="disabledState">
                  <el-checkbox :label="item.value" v-for="item in disease">{{item.label}}
                    <el-form-item label="" label-width="" prop="item171"  :inline-message="true" v-if="findItem(form.diseaseList,13) &&item.value == 13" style="margin-top: -12px;">
                      <el-input v-model="form.item171" auto-complete="off" type="textarea" :rows="1" :size="$store.state.style.assemblyModel" ref="item171" :disabled="disabledState"
                                style="width: 200px;" class="form-item"></el-input>　
                    </el-form-item>
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </el-form-item>
            <table class="raskFactors-table" v-if="form.diseaseList.length >0 && form.item145 == 1">
              <tr class="item146-table-tr">
                <td class="item146-table-title" style="width: 250px;">疾病类型（可多选）</td>
                <td class="item146-table-title"style="width: 400px;">首次诊断时年龄（如勾选疾病，诊断年龄必填）</td>
              </tr>
              <tr v-if="findItem(form.diseaseList,1)">
                <td>石棉肺</td>
                <td>
                  <el-form-item label="" label-width="" prop="item147" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item147" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item147" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.diseaseList,2)">
                <td>儿童哮喘</td>
                <td>
                  <el-form-item label="" label-width="" prop="item149" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item149" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item149" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.diseaseList,3)">
                <td>成人哮喘</td>
                <td>
                  <el-form-item label="" label-width="" prop="item151" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item151" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item151" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.diseaseList,4)">
                <td>支气管扩张</td>
                <td>
                  <el-form-item label="" label-width="" prop="item153" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item153" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item153" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.diseaseList,5)">
                <td>慢性支气管炎</td>
                <td>
                  <el-form-item label="" label-width="" prop="item155" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item155" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item155" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.diseaseList,6)">
                <td>慢性阻塞性肺病（COPD）</td>
                <td>
                  <el-form-item label="" label-width="" prop="item157" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item157" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item157" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.diseaseList,7)">
                <td>肺气肿</td>
                <td>
                  <el-form-item label="" label-width="" prop="item159" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item159" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item159" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.diseaseList,8)">
                <td>弥漫性肺间质纤维化</td>
                <td>
                  <el-form-item label="" label-width="" prop="item161" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item161" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item161" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.diseaseList,9)">
                <td>肺 炎</td>
                <td>
                  <el-form-item label="" label-width="" prop="item163" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item163" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item163" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.diseaseList,10)">
                <td>结节病</td>
                <td>
                  <el-form-item label="" label-width="" prop="item165" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item165" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item165" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.diseaseList,11)">
                <td>矽肺/尘肺</td>
                <td>
                  <el-form-item label="" label-width="" prop="item167" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item167" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item167" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.diseaseList,12)">
                <td>肺结核</td>
                <td>
                  <el-form-item label="" label-width="" prop="item169" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item169" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item169" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.diseaseList,13)">
                <td>其他 <span v-if="form.item171">，{{form.item171}}</span>
                </td>
                <td>
                  <el-form-item label="" label-width="" prop="item172" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item172" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item172" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
            </table>
          </el-row>
          <el-row>
            <el-form-item
              label="J2." required>
              <div>您是否患过 <u style="font-weight: 700;">下消化系统疾病</u>？（经正规医疗机构明确诊断）
                <el-form-item label="" label-width="" class="formItemWidth" prop="item173"
                              style="display: inline-block;">
                  <el-input v-model="form.item173" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item173" :disabled="disabledState"
                            style="width: 80px;" @change="clear(1,'item173')"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">0. 否（跳转至问题J2.1）</li>
                  <li class="radio-li">1. 是（请勾选下消化系统疾病，并填写具体信息，可多选）</li>
                </ul>
              </div>
            </el-form-item>
            <br>
            <el-form-item  prop="digestiveList" class="formItemWidth radio-div" v-if="form.item173 == 1">
              <div class="job disease">
                <el-checkbox-group v-model="form.digestiveList" :disabled="disabledState">
                  <el-checkbox :label="item.value" v-for="item in digestive ">{{item.label}}
                    <el-form-item label="" label-width="" prop="item187"  :inline-message="true" v-if="findItem(form.digestiveList,7) &&item.value == 7" style="margin-top: -12px;">
                      <el-input v-model="form.item187" auto-complete="off" type="textarea" :rows="1" :size="$store.state.style.assemblyModel" ref="item187" :disabled="disabledState"
                                style="width: 200px;" class="form-item"></el-input>　
                    </el-form-item>
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </el-form-item>
            <table class="raskFactors-table" v-if="form.digestiveList.length >0&&form.item173==1">
              <tr class="item146-table-tr">
                <td class="item146-table-title" style="width: 250px;">疾病类型（可多选）</td>
                <td class="item146-table-title"style="width: 400px;">首次诊断时年龄（如勾选疾病，诊断年龄必填）</td>
              </tr>
              <tr v-if="findItem(form.digestiveList,1)">
                <td>慢性结肠炎</td>
                <td>
                  <el-form-item label="" label-width="" prop="item175" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item175" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item175" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.digestiveList,2)">
                <td>肠息肉</td>
                <td>
                  <el-form-item label="" label-width="" prop="item177" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item177" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item177" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.digestiveList,3)">
                <td>慢性阑尾炎或阑尾切除史</td>
                <td>
                  <el-form-item label="" label-width="" prop="item179" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item179" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item179" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.digestiveList,4)">
                <td>慢性腹泻*</td>
                <td>
                  <el-form-item label="" label-width="" prop="item181" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item181" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item181" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.digestiveList,5)">
                <td>慢性便秘**</td>
                <td>
                  <el-form-item label="" label-width="" prop="item183" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item183" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item183" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.digestiveList,6)">
                <td>粘液和/或血便</td>
                <td>
                  <el-form-item label="" label-width="" prop="item185" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item185" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item185" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.digestiveList,7)">
                <td>其他 <span v-if="form.item187">，{{form.item187}}</span>
                </td>
                <td>
                  <el-form-item label="" label-width="" prop="item188" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item188" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item188" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
            </table>
            <div style="margin-left: 50px;font-size:14px">
              <p>注：<u style="font-weight: 700;">慢性腹泻*</u>指近2年来腹泻累计持续超过3个月，每次发作持续时间在1周以上；</p>
              <p style="padding-left:30px"><u style="font-weight: 700;">慢性便秘**</u>指近2年来便秘，每年在2个月以上</p>
            </div>
          </el-row>
          <el-row>
            <el-form-item
              label="J2.1." required>
              <div>您<u style="font-weight: 700;">现在</u>是否存在腹部不适或其他肠道异常的症状？
                <el-form-item label="" label-width="" class="formItemWidth" prop="item189"
                              style="display: inline-block;">
                  <el-input v-model="form.item189" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item189" :disabled="disabledState"
                            style="width: 80px;" @change="clear(1,'item189',true,['item190','item191','item192'],1)"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">0. 否（请跳转至J2.2题）</li>
                  <li class="radio-li">1. 是（如果是，请继续回答J2.1.1）</li>
                </ul>
              </div>
            </el-form-item>
            <br>
            <el-form-item
              label="J2.1.1." required v-if="form.item189 == 1">
              <div>肠道的疼痛或异常症状出现的时间？
                <el-form-item label="" label-width="" class="formItemWidth" prop="item190"
                              style="display: inline-block;">
                  <el-date-picker
                    v-model="form.item190"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-form-item>
            <br>
            <el-form-item
              label="J2.1.2." required v-if="form.item189 == 1">
              <div><u style="font-weight: 700;">主要</u>的症状为？
                <el-form-item label="" label-width="" class="formItemWidth" prop="item191"
                              style="display: inline-block;">
                  <el-input v-model="form.item191" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item191" :disabled="disabledState"
                            style="width: 80px;" @change="clear(4,'item191',true,['item192'],4)"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item>
              </div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">1. 腹痛</li>
                  <li class="radio-li">2. 排便异常（腹泻、便秘、大便不成形等）</li>
                  <li class="radio-li">3. 便血（肉眼可见）</li>
                  <li class="radio-li">4. 其他
                    <el-form-item label="" label-width="" class="formItemWidth" prop="item192" v-if="form.item191 == 4"
                                  style="display: inline-block;">
                      <el-input v-model="form.item192" auto-complete="off" type="textarea" :rows="1" :size="$store.state.style.assemblyModel" ref="item192" :disabled="disabledState"
                                style="width: 200px;"  class="form-item"></el-input>
                    </el-form-item>
                  </li>
                </ul>
              </div>
            </el-form-item>
            <br>
            <el-form-item
              label="J2.2." required>
              <div>您是否<u style="font-weight: 700;">曾经</u>进行过<u style="font-weight: 700;">粪便潜血试验（FOBT）</u>检测？
                <el-form-item label="" label-width="" class="formItemWidth" prop="item193"
                              style="display: inline-block;">
                  <el-input v-model="form.item193" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item193" :disabled="disabledState"
                            style="width: 80px;" @change="clear(1,'item193',true,['item194'],1)"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item>
              </div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">0. 否（跳转至问题J3）</li>
                  <li class="radio-li">1. 是</li>
                </ul>
              </div>
            </el-form-item>
            <br>
            <el-form-item
              label="J2.2.1." required v-if="form.item193 == 1">
              <div>如果是，那么结果为：
                <el-form-item label="" label-width="" class="formItemWidth" prop="item194"
                              style="display: inline-block;">
                  <el-input v-model="form.item194" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item194" :disabled="disabledState"
                            style="width: 80px;" @change="clear('item194','item194')"
                             class="form-item"></el-input>
                </el-form-item>
              </div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">0. 阴性</li>
                  <li class="radio-li">1. 阳性</li>
                  <li class="radio-li">999. 不清楚</li>
                </ul>
              </div>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="J3." required>
              <div>您是否患过 <u style="font-weight: 700;">上消化系统疾病</u>？（经正规医疗机构明确诊断）
                <el-form-item label="" label-width="" class="formItemWidth" prop="item195"
                              style="display: inline-block;">
                  <el-input v-model="form.item195" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item195" :disabled="disabledState"
                            style="width: 80px;" @change="clear(1,'item195')"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">0. 否（跳转至问题J4）</li>
                  <li class="radio-li">1. 是（请勾选具体上消化系统疾病，并填写具体信息，可多选）</li>
                </ul>
              </div>
            </el-form-item>
            <br>
            <el-form-item  prop="upDigestiveList" class="formItemWidth radio-div" v-if="form.item195 == 1">
              <div class="job disease">
                <el-checkbox-group v-model="form.upDigestiveList" :disabled="disabledState">
                  <el-checkbox :label="item.value" v-for="item in upDigestive">{{item.label}}
                    <el-form-item label="" label-width="" prop="item215"  :inline-message="true" v-if="findItem(form.upDigestiveList,10) &&item.value == 10" style="margin-top: -12px;">
                      <el-input v-model="form.item215" auto-complete="off" type="textarea" :rows="1" :size="$store.state.style.assemblyModel" ref="item215" :disabled="disabledState"
                                style="width: 200px;" class="form-item"></el-input>　
                    </el-form-item>
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </el-form-item>
            <table class="raskFactors-table" v-if="form.upDigestiveList.length >0&&form.item195==1">
              <tr class="item146-table-tr">
                <td class="item146-table-title" style="width: 250px;">疾病类型（可多选）</td>
                <td class="item146-table-title"style="width: 400px;">首次诊断时年龄（如勾选疾病，诊断年龄必填）</td>
              </tr>
              <tr v-if="findItem(form.upDigestiveList,1)">
                <td>反流性食管炎</td>
                <td>
                  <el-form-item label="" label-width="" prop="item197" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item197" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item197" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.upDigestiveList,2)">
                <td>浅表性胃炎</td>
                <td>
                  <el-form-item label="" label-width="" prop="item199" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item199" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item199" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.upDigestiveList,3)">
                <td>萎缩性胃炎</td>
                <td>
                  <el-form-item label="" label-width="" prop="item201" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item201" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item201" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.upDigestiveList,4)">
                <td>胃溃疡</td>
                <td>
                  <el-form-item label="" label-width="" prop="item203" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item203" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item203" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.upDigestiveList,5)">
                <td>十二指肠溃疡</td>
                <td>
                  <el-form-item label="" label-width="" prop="item205" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item205" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item205" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.upDigestiveList,6)">
                <td>胃息肉病</td>
                <td>
                  <el-form-item label="" label-width="" prop="item207" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item207" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item207" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.upDigestiveList,7)">
                <td>残胃</td>
                <td>
                  <el-form-item label="" label-width="" prop="item209" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item209" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item209" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.upDigestiveList,8)">
                <td>胃黏膜上皮内瘤变</td>
                <td>
                  <el-form-item label="" label-width="" prop="item211" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item211" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item211" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.upDigestiveList,9)">
                <td>胃肠上皮化生</td>
                <td>
                  <el-form-item label="" label-width="" prop="item213" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item213" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item213" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.upDigestiveList,10)">
                <td>其他 <span v-if="form.item215">，{{form.item215}}</span>
                </td>
                <td>
                  <el-form-item label="" label-width="" prop="item216" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item216" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item216" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
            </table>
          </el-row>
          <el-row>
            <el-form-item
              label="J4." required>
              <div>您是否患过 <u style="font-weight: 700;">肝胆系统疾病</u>？（经正规医疗机构明确诊断）
                <el-form-item label="" label-width="" class="formItemWidth" prop="item217"
                              style="display: inline-block;">
                  <el-input v-model="form.item217" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item217" :disabled="disabledState"
                            style="width: 80px;" @change="clear(1,'item217')"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">0. 否（跳转至问题J5）</li>
                  <li class="radio-li">1. 是（请勾选具体肝胆系统疾病，并填写具体信息，可多选）</li>
                </ul>
              </div>
            </el-form-item>
            <br>
            <el-form-item  prop="gallbladderList" class="formItemWidth radio-div" v-if="form.item217 == 1">
              <div class="job disease">
                <el-checkbox-group v-model="form.gallbladderList" :disabled="disabledState">
                  <el-checkbox :label="item.value" v-for="item in gallbladder" style="width: 230px!important;">{{item.label}}
                    <el-form-item label="" label-width="" prop="item235"  :inline-message="true" v-if="findItem(form.gallbladderList,8) &&item.value == 8" style="margin-top: -12px;">
                      <el-input v-model="form.item235" auto-complete="off" type="textarea" :rows="1" :size="$store.state.style.assemblyModel" ref="item235" :disabled="disabledState"
                                style="width: 200px;" class="form-item"></el-input>　
                    </el-form-item>
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </el-form-item>
            <table class="raskFactors-table" v-if="form.gallbladderList.length >0&&form.item217==1">
              <tr class="item146-table-tr">
                <td class="item146-table-title" style="width: 250px;">疾病类型（可多选）</td>
                <td class="item146-table-title"style="width: 400px;">首次诊断时年龄（如勾选疾病，诊断年龄必填）</td>
              </tr>
              <tr v-if="findItem(form.gallbladderList,1)">
                <td>慢性乙型肝炎</td>
                <td>
                  <el-form-item label="" label-width="" prop="item219" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item219" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item219" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.gallbladderList,2)">
                <td>慢性丙型肝炎</td>
                <td>
                  <el-form-item label="" label-width="" prop="item221" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item221" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item221" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.gallbladderList,3)">
                <td>肝硬化</td>
                <td>
                  <el-form-item label="" label-width="" prop="item223" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item223" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item223" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.gallbladderList,4)">
                <td>血吸虫感染病史</td>
                <td>
                  <el-form-item label="" label-width="" prop="item225" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item225" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item225" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.gallbladderList,5)">
                <td>脂肪肝
                  <div style="margin-top: 10px;font-size: 14px;">脂肪肝严重程度：
                    <el-form-item  prop="item228" style="margin-left: 20px;">
                      <el-radio-group v-model="form.item228">
                        <el-radio :label="1" ref="item228" style="margin-top: 10px;">1. 轻度</el-radio><br>
                        <el-radio :label="2" style="margin-top: 10px;">2. 中度</el-radio><br>
                        <el-radio :label="3" style="margin-top: 10px;">3. 重度</el-radio>
                        <br>
                        <el-radio :label="4" style="margin-top: 10px;">999. 不清楚</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </div>
                </td>
                <td>
                  <el-form-item label="" label-width="" prop="item227" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item227" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item227" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.gallbladderList,6)">
                <td>胆结石症
                 <div style="margin-top: 10px;font-size: 14px;">胆结石症种类：
                   <el-form-item  prop="item231" style="margin-left: 20px;" >
                     <el-checkbox-group v-model="form.item231" :disabled="disabledState">
                       <el-checkbox label="1" ref="item231">1. 肝内胆管结石</el-checkbox><br>
                       <el-checkbox label="2">2. 肝外胆管结石</el-checkbox><br>
                       <el-checkbox label="3">3. 胆囊结石</el-checkbox>
                       <br>
                       <el-checkbox label="4">999. 不清楚</el-checkbox>
                     </el-checkbox-group>
                   </el-form-item>
                 </div>
                </td>
                <td>
                  <el-form-item label="" label-width="" prop="item230" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item230" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item230" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.gallbladderList,7)">
                <td>慢性胆囊炎或胆囊切除史</td>
                <td>
                  <el-form-item label="" label-width="" prop="item233" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item233" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item233" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.gallbladderList,8)">
                <td>其他 <span v-if="form.item235">，{{form.item235}}</span>
                </td>
                <td>
                  <el-form-item label="" label-width="" prop="item236" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item236" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item236" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
            </table>
          </el-row>
          <el-row>
            <el-form-item
              label="J4.1．" required>
              <div>您是否进行过 <u style="font-weight: 700;">乙肝表面抗原（HBsAg）</u>检测？
                <el-form-item label="" label-width="" class="formItemWidth" prop="item237"
                              style="display: inline-block;">
                  <el-input v-model="form.item237" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item237" :disabled="disabledState"
                            style="width: 80px;" @change="clear(1,'item237',true,['item238'],1)"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">0. 否（跳转至问题J5）</li>
                  <li class="radio-li">1. 是</li>
                </ul>
              </div>
            </el-form-item>
            <br>
            <el-form-item
              label="J4.1.1．" required v-if="form.item237 == 1">
              <div>如果是，那么结果为：
                <el-form-item label="" label-width="" class="formItemWidth" prop="item238"
                              style="display: inline-block;">
                  <el-input v-model="form.item238" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item238" :disabled="disabledState"
                            style="width: 80px;" @change="clear('item194','item238')"
                            class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">0. 阴性</li>
                  <li class="radio-li">1. 阳性</li>
                  <li class="radio-li">999. 不清楚</li>
                </ul>
              </div>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="J5." required>
              <div>您是否患过 <u style="font-weight: 700;">心脑血管疾病</u>？（经正规医疗机构明确诊断）
                <el-form-item label="" label-width="" class="formItemWidth" prop="item239"
                              style="display: inline-block;">
                  <el-input v-model="form.item239" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item239" :disabled="disabledState"
                            style="width: 80px;" @change="clear(1,'item239')"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">0. 否（跳转至问题J6）</li>
                  <li class="radio-li">1. 是（请勾选具体心脑血管疾病，并填写具体信息，可多选）</li>
                </ul>
              </div>
            </el-form-item>
            <br>
            <el-form-item  prop="brainwashingList" class="formItemWidth radio-div" v-if="form.item239 == 1">
              <div class="job disease">
                <el-checkbox-group v-model="form.brainwashingList" :disabled="disabledState">
                  <el-checkbox :label="item.value"  v-for="item in brainwashing" style="width: 230px!important;">{{item.label}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </el-form-item>
            <table class="raskFactors-table" v-if="form.brainwashingList.length >0">
              <tr class="item146-table-tr">
                <td class="item146-table-title" style="width: 250px;">疾病类型（可多选）</td>
                <td class="item146-table-title"style="width: 400px;">首次诊断时年龄（如勾选疾病，诊断年龄必填）</td>
              </tr>
              <tr v-if="findItem(form.brainwashingList,1)">
                <td>高血压</td>
                <td>
                  <el-form-item label="" label-width="" prop="item241" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item241" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item241" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.brainwashingList,2)">
                <td>血脂异常/高血脂症</td>
                <td>
                  <el-form-item label="" label-width="" prop="item243" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item243" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item243" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.brainwashingList,3)">
                <td>冠心病</td>
                <td>
                  <el-form-item label="" label-width="" prop="item245" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item245" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item245" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.brainwashingList,4)">
                <td>脑卒中/脑中风</td>
                <td>
                  <el-form-item label="" label-width="" prop="item247" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item247" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item247" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.brainwashingList,5)">
                <td>糖尿病
                  <div style="margin-top: 10px;font-size: 14px;">糖尿病类型：
                    <el-form-item  prop="item249" style="margin-left: 20px;">
                      <el-radio-group v-model="form.item249">
                        <el-radio :label="1" ref="item249" style="margin-top: 10px;">1. I型</el-radio><br>
                        <el-radio :label="2" style="margin-top: 10px;">2. II型</el-radio><br>
                        <el-radio :label="3" style="margin-top: 10px;">3. 妊娠糖尿病</el-radio>
                        <br>
                        <el-radio :label="4" style="margin-top: 10px;">4. 其他</el-radio>
                        <el-form-item label="" label-width="" class="formItemWidth" prop="item250"
                                      style="display: inline-block;" v-if="form.item249 == 4">
                          <el-input v-model="form.item250" type="textarea" :rows="1" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item250" :disabled="disabledState"
                                    style="width: 200px;"  class="form-item"></el-input>
                        </el-form-item>
                        <br>
                        <el-radio :label="5" style="margin-top: 10px;">999. 不清楚</el-radio>
                        <br>
                      </el-radio-group>
                    </el-form-item>
                  </div>
                </td>
                <td>
                  <el-form-item label="" label-width="" prop="item251" class="formItemWidth"
                                style="display: inline-block;">
                    <el-input v-model="form.item251" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item251" :disabled="disabledState"
                              style="width: 80px;" class="form-item"></el-input>　岁
                  </el-form-item>
                </td>
              </tr>
            </table>
          </el-row>
          <el-row v-if="form.sex == 2">
            <el-form-item
              label="J6．" required>
              <div>您是否患过 <u style="font-weight: 700;">良性乳腺疾病</u>？（经正规医疗机构明确诊断：乳腺增生、结节、导管扩张、纤维腺瘤、炎症等）（仅女性填写）
                <el-form-item label="" label-width="" class="formItemWidth" prop="item252"
                              style="display: inline-block;">
                  <el-input v-model="form.item252" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item252" :disabled="disabledState"
                            style="width: 80px;" @change="clear(1,'item252',true,['item253'],1)"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">0. 否（跳转至问题J5）</li>
                  <li class="radio-li">1. 是</li>
                </ul>
              </div>
            </el-form-item>
            <br>
            <el-form-item
              label="J6.1．" required v-if="form.item252 == 1">
              <div>如果是，请填写<u style="font-weight: 700;">首次诊断</u>的年龄：
                <el-form-item label="" label-width="" class="formItemWidth" prop="item253" style="display: inline-block;">
                  <el-input v-model="form.item253" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item253" :disabled="disabledState"
                            style="width: 80px;" class="form-item"></el-input>　岁
                </el-form-item></div>
            </el-form-item>
          </el-row>
          <div class="title">
            L．恶性肿瘤家族史
          </div>
          <el-row>
            <el-form-item
              label="L1." required>
              <div>您的 <u style="font-weight: 700;">血缘亲属</u>中，是否有人曾患癌症？
                <el-form-item label="" label-width="" class="formItemWidth" prop="item254"
                              style="display: inline-block;">
                  <el-input v-model="form.item254" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item254" :disabled="disabledState"
                            style="width: 80px;" @change="clear(1,'item254')"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">0. 否（跳至M部分）</li>
                  <li class="radio-li">1. 是（请勾选具体癌种，并填写具体信息，可多选）</li>
                </ul>
              </div>
            </el-form-item>
            <br>
            <el-form-item  prop="cancerList" class="formItemWidth radio-div" v-if="form.item254 == 1">
              <div class="job disease">
                <el-checkbox-group v-model="form.cancerList" :disabled="disabledState">
                  <el-checkbox :label="item.value" v-for="item in cancer">{{item.label}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </el-form-item>
            <table class="raskFactors-table" v-if="form.cancerList.length >0&&form.item254==1" style="margin-bottom: 20px">
              <tr class="item146-table-tr">
                <td class="item146-table-title" style="width: 350px;">癌种（可多选）</td>
                <td class="item146-table-title"style="width: 400px;">是何亲属曾患此种癌症</td>
              </tr>
              <tr v-if="findItem(form.cancerList,1)">
                <td>肺癌</td>
                <td>
                  <el-form-item label="" label-width="" prop="item256List" class="formItemWidth"
                                style="display: inline-block;">
                    <span v-for="item in this.form.item256List">
                      {{relatives[item-1].label}}，
                    </span>
                    <!--<el-input v-model="form.item256List" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item147" :disabled="disabledState"-->
                              <!--style="width: 0px;opacity:0;" class="form-item"></el-input>-->
                    <el-button type="text" style="margin-left:20px" @click="openDialog('item256List')" v-if="!disabledState">点击添加</el-button>　
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.cancerList,2)">
                <td>食管癌</td>
                <td>
                  <el-form-item label="" label-width="" prop="item258List" class="formItemWidth"
                                style="display: inline-block;">
                    <span v-for="item in this.form.item258List">
                      {{relatives[item-1].label}}，
                    </span>
                    <!--<el-input v-model="form.item256List" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item147" :disabled="disabledState"-->
                    <!--style="width: 0px;opacity:0;" class="form-item"></el-input>-->
                    <el-button type="text" style="margin-left:20px" @click="openDialog('item258List')" v-if="!disabledState">点击添加</el-button>　
                  </el-form-item>
                </td>
              </tr>

              <tr v-if="findItem(form.cancerList,3)">
                <td>胃癌</td>
                <td>
                  <el-form-item label="" label-width="" prop="item260List" class="formItemWidth"
                                style="display: inline-block;">
                    <span v-for="item in this.form.item260List">
                      {{relatives[item-1].label}}，
                    </span>
                    <!--<el-input v-model="form.item256List" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item147" :disabled="disabledState"-->
                    <!--style="width: 0px;opacity:0;" class="form-item"></el-input>-->
                    <el-button type="text" style="margin-left:20px" @click="openDialog('item260List')" v-if="!disabledState">点击添加</el-button>　
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.cancerList,4)">
                <td>肝癌</td>
                <td>
                  <el-form-item label="" label-width="" prop="item262List" class="formItemWidth"
                                style="display: inline-block;">
                    <span v-for="item in this.form.item262List">
                      {{relatives[item-1].label}}，
                    </span>
                    <!--<el-input v-model="form.item256List" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item147" :disabled="disabledState"-->
                    <!--style="width: 0px;opacity:0;" class="form-item"></el-input>-->
                    <el-button type="text" style="margin-left:20px" @click="openDialog('item262List')" v-if="!disabledState">点击添加</el-button>　
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.cancerList,5)">
                <td>结直肠癌</td>
                <td>
                  <el-form-item label="" label-width="" prop="item264List" class="formItemWidth"
                                style="display: inline-block;">
                    <span v-for="item in this.form.item264List">
                      {{relatives[item-1].label}}，
                    </span>
                    <!--<el-input v-model="form.item256List" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item147" :disabled="disabledState"-->
                    <!--style="width: 0px;opacity:0;" class="form-item"></el-input>-->
                    <el-button type="text" style="margin-left:20px" @click="openDialog('item264List')" v-if="!disabledState">点击添加</el-button>　
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.cancerList,6)">
                <td>前列腺癌</td>
                <td>
                  <el-form-item label="" label-width="" prop="item266List" class="formItemWidth"
                                style="display: inline-block;">
                    <span v-for="item in this.form.item266List">
                      {{relatives[item-1].label}}，
                    </span>
                    <!--<el-input v-model="form.item256List" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item147" :disabled="disabledState"-->
                    <!--style="width: 0px;opacity:0;" class="form-item"></el-input>-->
                    <el-button type="text" style="margin-left:20px" @click="openDialog('item266List')" v-if="!disabledState">点击添加</el-button>　
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.cancerList,7)">
                <td>膀胱癌</td>
                <td>
                  <el-form-item label="" label-width="" prop="item268List" class="formItemWidth"
                                style="display: inline-block;">
                    <span v-for="item in this.form.item268List">
                      {{relatives[item-1].label}}，
                    </span>
                    <!--<el-input v-model="form.item256List" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item147" :disabled="disabledState"-->
                    <!--style="width: 0px;opacity:0;" class="form-item"></el-input>-->
                    <el-button type="text" style="margin-left:20px" @click="openDialog('item268List')" v-if="!disabledState">点击添加</el-button>　
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.cancerList,8)">
                <td>鼻咽癌</td>
                <td>
                  <el-form-item label="" label-width="" prop="item270List" class="formItemWidth"
                                style="display: inline-block;">
                    <span v-for="item in this.form.item270List">
                      {{relatives[item-1].label}}，
                    </span>
                    <!--<el-input v-model="form.item256List" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item147" :disabled="disabledState"-->
                    <!--style="width: 0px;opacity:0;" class="form-item"></el-input>-->
                    <el-button type="text" style="margin-left:20px" @click="openDialog('item270List')" v-if="!disabledState">点击添加</el-button>　
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.cancerList,9)">
                <td>乳腺癌
                  <el-form-item
                    label="" required>
                    <div style="font-size: 12px"> 您是否有一级血缘亲属（母亲、亲姐妹）在 <u style="font-weight: 700;">50岁及以前</u>曾患乳腺癌：
                      <el-form-item label="" label-width="" class="formItemWidth" prop="item272"
                                    style="display: inline-block;">
                        <el-input v-model="form.item272" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item272" :disabled="disabledState"
                                  style="width: 80px;" @change="clear(2,'item272')"
                                  :maxlength='1' class="form-item"></el-input>
                      </el-form-item></div>
                    <div class="radio-div" style="font-size: 12px;">
                      <ul>
                        <li class="radio-li">1. 是</li>
                        <li class="radio-li">2. 否</li>
                      </ul>
                    </div>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="" label-width="" prop="item273List" class="formItemWidth"
                                style="display: inline-block;">
                    <span v-for="item in this.form.item273List">
                      {{relatives[item-1].label}}，
                    </span>
                    <!--<el-input v-model="form.item256List" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item147" :disabled="disabledState"-->
                    <!--style="width: 0px;opacity:0;" class="form-item"></el-input>-->
                    <el-button type="text" style="margin-left:20px" @click="openDialog('item273List')" v-if="!disabledState">点击添加</el-button>　
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.cancerList,10)">
                <td>宫颈癌</td>
                <td>
                  <el-form-item label="" label-width="" prop="item275List" class="formItemWidth"
                                style="display: inline-block;">
                    <span v-for="item in this.form.item275List">
                      {{relatives[item-1].label}}，
                    </span>
                    <!--<el-input v-model="form.item256List" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item147" :disabled="disabledState"-->
                    <!--style="width: 0px;opacity:0;" class="form-item"></el-input>-->
                    <el-button type="text" style="margin-left:20px" @click="openDialog('item275List')" v-if="!disabledState">点击添加</el-button>　
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.cancerList,11)">
                <td>卵巢癌</td>
                <td>
                  <el-form-item label="" label-width="" prop="item277List" class="formItemWidth"
                                style="display: inline-block;">
                    <span v-for="item in this.form.item277List">
                      {{relatives[item-1].label}}，
                    </span>
                    <!--<el-input v-model="form.item256List" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item147" :disabled="disabledState"-->
                    <!--style="width: 0px;opacity:0;" class="form-item"></el-input>-->
                    <el-button type="text" style="margin-left:20px" @click="openDialog('item277List')" v-if="!disabledState">点击添加</el-button>　
                  </el-form-item>
                </td>
              </tr>

              <tr v-if="findItem(form.cancerList,12)">
                <td>甲状腺癌</td>
                <td>
                  <el-form-item label="" label-width="" prop="item279List" class="formItemWidth"
                                style="display: inline-block;">
                    <span v-for="item in this.form.item279List">
                      {{relatives[item-1].label}}，
                    </span>
                    <!--<el-input v-model="form.item256List" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item147" :disabled="disabledState"-->
                    <!--style="width: 0px;opacity:0;" class="form-item"></el-input>-->
                    <el-button type="text" style="margin-left:20px" @click="openDialog('item279List')" v-if="!disabledState">点击添加</el-button>　
                  </el-form-item>
                </td>
              </tr>
              <tr v-if="findItem(form.cancerList,13)">
                <td>其他（包括不清楚）</td>
                <td>
                  <el-form-item label="" label-width="" prop="item281List" class="formItemWidth"
                                style="display: inline-block;">
                    <span v-for="item in this.form.item281List">
                      {{relatives[item-1].label}}，
                    </span>
                    <!--<el-input v-model="form.item256List" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item147" :disabled="disabledState"-->
                    <!--style="width: 0px;opacity:0;" class="form-item"></el-input>-->
                    <el-button type="text" style="margin-left:20px" @click="openDialog('item281List')" v-if="!disabledState">点击添加</el-button>　
                  </el-form-item>
                </td>
              </tr>
            </table>
          </el-row>
          <div class="title">
            M．药物史
          </div>
          <el-row>
            <el-form-item
              label="M1." required>
              <div>您是否 <u style="font-weight: 700;">正在</u>或<u style="font-weight: 700;">曾经</u>规律服用药物（超过一年）？
                <el-form-item label="" label-width="" class="formItemWidth" prop="item282"
                              style="display: inline-block;">
                  <el-input v-model="form.item282" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item282" :disabled="disabledState"
                            style="width: 80px;" @change="clear(1,'item282')"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item></div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">0. 否（如果男性，结束问卷；如果女性，跳转至N部分）</li>
                  <li class="radio-li">1. 是</li>
                </ul>
              </div>
            </el-form-item>
            <table class="item282 item282-table" v-if="form.item282 == 1" style="margin-bottom: 20px">
              <tr>
                <td class="item282-title" style="width: 200px">药物种类</td>
                <td class="item282-title" style="width:200px">药物种类细分</td>
                <td class="item282-title" style="width:200px">具体药品名</td>
                <td class="item282-title" style="width:200px">开始服药年龄（周岁）</td>
                <td class="item282-title" style="width:200px">累计服药年龄（不足一年按0.5年算）</td>
              </tr>
              <tr v-for="x,index in form.hosDrugHistoryList">
                <td>
                  <el-form-item label="" label-width="" class="formItemWidth" :prop="'hosDrugHistoryList.'+index+'.drugType'"
                                style="display: inline-block;" :rules="rules.drugType">
                    <el-select v-model="x.drugType" clearable placeholder="请选择" @change="drugTypeChange(x,index)" :size="$store.state.style.assemblyModel"  :disabled="disabledState">
                      <el-option
                        v-for="item in x.drugTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="" label-width="" class="formItemWidth" :prop="'hosDrugHistoryList.'+index+'.drugSmallType'"
                                style="display: inline-block;" :rules="rules.drugSmallType">
                    <el-select v-model="x.drugSmallType" clearable placeholder="请选择" :size="$store.state.style.assemblyModel" ref="item282" :disabled="disabledState">
                      <el-option
                        v-for="item in x.drugSmallTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="" label-width="" class="formItemWidth" :prop="'hosDrugHistoryList.'+index+'.drugName'"
                                style="display: inline-block;" :rules="rules.drugName">
                    <el-autocomplete
                      v-model="x.drugName"
                      :disabled="disabledState"
                      :size="$store.state.style.assemblyModel"
                      :fetch-suggestions="querySearchAsync"
                      placeholder="请输入内容"
                      @select="handleSelect(x)"
                    ></el-autocomplete>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="" label-width="" class="formItemWidth"  :prop="'hosDrugHistoryList.'+index+'.startAge'"
                                style="display: inline-block;" :rules="rules.startAge">
                    <el-input v-model="x.startAge" auto-complete="off" :size="$store.state.style.assemblyModel"  :disabled="disabledState"
                              style="width: 80px;" @change="startAgeChange(x)"
                               class="form-item"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="" label-width="" class="formItemWidth" :prop="'hosDrugHistoryList.'+index+'.countTime'"
                                style="display: inline-block;" :rules="rules.countTime">
                    <el-input v-model="x.countTime" auto-complete="off" :size="$store.state.style.assemblyModel" :disabled="disabledState"
                              style="width: 80px;"
                              class="form-item"></el-input>
                  </el-form-item>
                </td>
              </tr>
            </table>
            <div v-if="form.item282 == 1">
              <el-button type="text" @click="addDrug" :disabled="form.hosDrugHistoryList.length>9" v-if="!disabledState">添加</el-button>
              <el-button type="text" @click="delDrug" :disabled="form.hosDrugHistoryList.length<2" v-if="!disabledState">删除</el-button>
            </div>
          </el-row>
          <template v-if="this.form.sex == 2">
          <div class="title">
            N．女性相关问题
          </div>
          <el-row>
            <el-form-item
              label="N1." required>
              <div>您的<u style="font-weight: 700;">首次</u>月经年龄是（周岁）：
                <el-form-item label="" label-width="" class="formItemWidth" prop="item283"
                              style="display: inline-block;">
                  <el-input v-model="form.item283" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item283" :disabled="disabledState"
                            style="width: 80px;" class="form-item"></el-input>
                </el-form-item>
              </div>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="N2." required>
              <div>您的月经周期是否规律？
                <el-form-item label="" label-width="" class="formItemWidth" prop="item284"
                              style="display: inline-block;">
                  <el-input v-model="form.item284" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item284" :disabled="disabledState"
                            style="width: 80px;" @change="clear(1,'item284')"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item>
              </div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">0. 否</li>
                  <li class="radio-li">1. 是</li>
                </ul>
              </div>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
            label="N3." required>
            <div>您是否已绝闭经？
              <el-form-item label="" label-width="" class="formItemWidth" prop="item285"
                            style="display: inline-block;">
                <el-input v-model="form.item285" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item285" :disabled="disabledState"
                          style="width: 80px;" @change="clear(1,'item285',true,['item286'],1)"
                          :maxlength='1' class="form-item"></el-input>
              </el-form-item>
            </div>
            <div class="radio-div">
              <ul>
                <li class="radio-li">0. 否（跳转至问题N4）</li>
                <li class="radio-li">1. 是</li>
              </ul>
            </div>
          </el-form-item>
            <br>
            <el-form-item
              label="N3.1." required v-if="form.item285==1">
              <div>如果是，那么您的<u style="font-weight: 700;">停经年龄</u>是（周岁）：
                <el-form-item label="" label-width="" class="formItemWidth" prop="item286"
                              style="display: inline-block;">
                  <el-input v-model="form.item286" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item286" :disabled="disabledState"
                            style="width: 80px;"  class="form-item"></el-input>
                </el-form-item>
              </div>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="N4." required>
              <div>您是否曾分娩（包括自然分娩和剖腹产）？
                <el-form-item label="" label-width="" class="formItemWidth" prop="item287"
                              style="display: inline-block;">
                  <el-input v-model="form.item287" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item287" :disabled="disabledState"
                            style="width: 80px;" @change="clear(1,'item287',true,['item288','item289','item290'],1)"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item>
              </div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">0. 否（跳转至N6）</li>
                  <li class="radio-li">1. 是</li>
                </ul>
              </div>
            </el-form-item>
            <br>
            <el-form-item
              label="N4.1." required v-if="form.item287==1">
              <div>如果是，那么您的<u style="font-weight: 700;">初次生育年龄</u>是（周岁）：
                <el-form-item label="" label-width="" class="formItemWidth" prop="item288"
                              style="display: inline-block;">
                  <el-input v-model="form.item288" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item288" :disabled="disabledState"
                            style="width: 80px;"  class="form-item"></el-input>
                </el-form-item>
              </div>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="N5." required  v-if="form.item287==1">
              <div>您是否有哺乳史？
                <el-form-item label="" label-width="" class="formItemWidth" prop="item289"
                              style="display: inline-block;">
                  <el-input v-model="form.item289" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item289" :disabled="disabledState"
                            style="width: 80px;" @change="clear(1,'item289',true,['item290'],1)"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item>
              </div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">0. 否（跳转至N6）</li>
                  <li class="radio-li">1. 是</li>
                </ul>
              </div>
            </el-form-item>
            <br>
            <el-form-item
              label="N5.1." required v-if="form.item289==1">
              <div>如果是，那么共累计哺乳多少个月（不足一月按一月计）：
                <el-form-item label="" label-width="" class="formItemWidth" prop="item290"
                              style="display: inline-block;">
                  <el-input v-model="form.item290" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item290" :disabled="disabledState"
                            style="width: 80px;"  class="form-item"></el-input>
                </el-form-item>
              </div>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="N6." required>
              <div>您是否曾进行女性生殖系统手术（子宫、卵巢和输卵管等部位的手术，包括剖腹产）
                <el-form-item label="" label-width="" class="formItemWidth" prop="item291"
                              style="display: inline-block;">
                  <el-input v-model="form.item291" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item291" :disabled="disabledState"
                            style="width: 80px;" @change="clear(1,'item291',true,['item292'],1)"
                            :maxlength='1' class="form-item"></el-input>
                </el-form-item>
              </div>
              <div class="radio-div">
                <ul>
                  <li class="radio-li">0. 否</li>
                  <li class="radio-li">1. 是
                  <span v-if="form.item291 == 1">
                    ,请注明手术名称或手术部位：
                     <el-form-item label="" label-width="" class="formItemWidth" prop="item292"
                                   style="display: inline-block;">
                      <el-input v-model="form.item292" type="textarea" :rows="1" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item292" :disabled="disabledState"
                                style="width: 200px;"  class="form-item"></el-input>
                    </el-form-item>
                  </span>

                  </li>
                </ul>
              </div>
            </el-form-item>
          </el-row>
            <el-row>
              <el-form-item
                label="N7." required>
                <div>您是否曾接受过<u style="font-weight: 700;">激素替代治疗</u>（<u style="font-weight: 700;">雌激素或雌/孕激素联合治疗</u>，给药途径包括口服、皮贴、涂抹霜剂或凝胶、经阴道使用的霜、片、栓、硅胶环等）？
                  <el-form-item label="" label-width="" class="formItemWidth" prop="item293"
                                style="display: inline-block;">
                    <el-input v-model="form.item293" auto-complete="off" :size="$store.state.style.assemblyModel" ref="item293" :disabled="disabledState"
                              style="width: 80px;" @change="clear('item293','item293')"
                              :maxlength='1' class="form-item"></el-input>
                  </el-form-item>
                </div>
                <div class="radio-div">
                  <ul>
                    <li class="radio-li">1. 否（跳转至承诺书）</li>
                    <li class="radio-li">2. 是，正在接受治疗（请填写下表）</li>
                    <li class="radio-li">3. 是，曾经接受治疗（请填写下表）</li>
                  </ul>
                </div>
              </el-form-item>
              <br>
              <el-form-item
                label="N7.1." required  v-if="form.item293==2||form.item293 == 3">
                <div>治疗方案？
                  <el-form-item label="" label-width="" class="formItemWidth" prop="scheme"
                                style="display: inline-block;">
                    <el-input v-model="form.scheme" auto-complete="off" :size="$store.state.style.assemblyModel" ref="scheme" :disabled="disabledState"
                              style="width: 80px;" @change="clear(2,'scheme')" @blur="schemeChange"
                              :maxlength='1' class="form-item"></el-input>
                  </el-form-item>
                </div>
                <div class="radio-div">
                  <ul>
                    <li class="radio-li">1. 只服用雌激素</li>
                    <li class="radio-li">2. 联合服用雌/孕激素</li>
                  </ul>
                </div>
              </el-form-item>
              <table class="item282 item282-table" v-if="form.scheme ==1 || form.scheme == 2" style="margin-left: 60px;margin-bottom:20px">
                <tr>
                  <td class="item282-title" style="width: 200px">具体药物名称</td>
                  <td class="item282-title" style="width:200px">首次服用年龄</td>
                  <td class="item282-title" style="width:200px">服用的年限（不足1年按0.5年算）</td>
                </tr>
                <tr v-for="x,index in form.hosHormoneDrugsHistoryList">
                  <td>
                    <el-form-item label="" label-width="" class="formItemWidth" :prop="'hosHormoneDrugsHistoryList.'+index+'.drugName'"
                                  style="display: inline-block;" :rules="rules.drugName">
                      <el-select v-model="x.drugName" clearable placeholder="请选择"  :size="$store.state.style.assemblyModel"  :disabled="disabledState">
                        <el-option
                          v-for="item in x.hormone"
                          :key="item.value"
                          :label="item.label"
                          :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <br>
                    <el-form-item label="" label-width="" class="formItemWidth"  :prop="'hosHormoneDrugsHistoryList.'+index+'.drugNameOther'"
                                  style="display: inline-block;" :rules="rules.drugNameOther" v-if="x.drugName == 6">
                      <el-input v-model="x.drugNameOther" auto-complete="off" :size="$store.state.style.assemblyModel"  :disabled="disabledState"
                                style="width: 220px;"
                                class="form-item"></el-input>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item label="" label-width="" class="formItemWidth"  :prop="'hosHormoneDrugsHistoryList.'+index+'.startAge'"
                                  style="display: inline-block;" :rules="rules.startAge">
                      <el-input v-model="x.startAge" auto-complete="off" :size="$store.state.style.assemblyModel"  :disabled="disabledState"
                                style="width: 80px;"
                                class="form-item"></el-input>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item label="" label-width="" class="formItemWidth" :prop="'hosHormoneDrugsHistoryList.'+index+'.endTime'"
                                  style="display: inline-block;" :rules="rules.endTime">
                      <el-input v-model="x.endTime" auto-complete="off" :size="$store.state.style.assemblyModel" :disabled="disabledState"
                                style="width: 80px;"
                                class="form-item"></el-input>
                    </el-form-item>
                  </td>
                </tr>
              </table>
              <div v-if="form.scheme==1 || form.scheme == 2" style="margin-left: 60px">
                <el-button type="text" @click="addHormone" :disabled="form.hosHormoneDrugsHistoryList.length>9" v-if="!disabledState">添加</el-button>
                <el-button type="text" @click="delHormone" :disabled="form.hosHormoneDrugsHistoryList.length<2" v-if="!disabledState">删除</el-button>
              </div>
            </el-row>

         </template>
          <div class="title">
            承诺书
          </div>
          <el-row>
            <div style="text-align: center;font-weight:700;font-size: 16px;">
              本人承诺：本人如实回答本问卷中所有问题，该问卷能真实反映本人基本资料、疾病史、家庭史和吸烟史等信息
            </div>
          </el-row>
          <el-row style="margin-top:20px">
            <el-form-item
              label="" required >
              <div>研究对象或委托人签字：
                <el-form-item class="content-padding1" prop="researchSignature">
                  <el-input v-model.trim="form.researchSignature" auto-complete="off" :size="$store.state.style.assemblyModel"
                            style="width:200px"
                            ref="researchSignature" :disabled="disabledState"
                            class="smallInput"></el-input>
                </el-form-item>
              </div>
            </el-form-item>
          </el-row>
          <el-row >
            <el-form-item
              label="" required>
              <div>日期：
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
              </div>
            </el-form-item>
          </el-row>
          <el-row v-if="form.researchSignature !== form.name">
            <el-form-item
              label="" required>
              <p class="option-p">若为委托人签字，与研究对象关系：
                <el-form-item class="content-padding1" prop="clientRelationship">
                  <el-input v-model.trim="form.clientRelationship" auto-complete="off" :size="$store.state.style.assemblyModel"
                            style="width:200px"
                            ref="clientRelationship" :disabled="disabledState"
                            class="smallInput"></el-input>
                </el-form-item>
              </p>
            </el-form-item>
          </el-row>
          <el-row>
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
          </el-row>
        </el-form>
        <el-dialog
          :width="$store.state.style.dialogWidth"
          title="选择亲属"
          center
          :close-on-click-modal="false"
          :visible.sync="dialogVisible"
          append-to-body>
          <div class="dialogVisible">
            <el-checkbox-group v-model="relativesCheckList">
              <el-checkbox :label="1">1=母亲</el-checkbox>
              <el-checkbox :label="2">2=父亲</el-checkbox>
              <el-checkbox :label="3">3=子女</el-checkbox>
              <el-checkbox :label="4">4=姐妹</el-checkbox>
              <el-checkbox :label="5">5=兄弟</el-checkbox>
              <el-checkbox :label="6">6=祖父</el-checkbox>
              <el-checkbox :label="7">7=祖母</el-checkbox>
              <el-checkbox :label="8">8=外祖父 </el-checkbox>
              <el-checkbox :label="9">9=外祖母</el-checkbox>
              <el-checkbox :label="10">10=叔叔</el-checkbox>
              <el-checkbox :label="11">11=姑姑 </el-checkbox>
              <el-checkbox :label="12">12=舅舅</el-checkbox>
              <el-checkbox :label="13">13=姨妈</el-checkbox>
              <el-checkbox :label="14">14=堂兄弟姐妹</el-checkbox>
              <el-checkbox :label="15">15=表兄弟姐妹</el-checkbox>
              <el-checkbox :label="16">16=其他</el-checkbox>
            </el-checkbox-group>
            <div style="margin-top: 20px;font-size: 14px;">
              <p>兄弟：（包括同父异母兄弟或同母异父兄弟）</p>
              <p>姐妹：（包括同父异母姐妹或同母异父姐妹）</p>
            </div>
          </div>
          <div style="margin-top: 20px;text-align: center;">
            <el-button @click="dialogVisible = false" :size="$store.state.style.assemblyModel">取 消</el-button>
            <el-button :size="$store.state.style.assemblyModel" @click="addFormSure()" class="dialog-footer" type="primary">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="addbtn" v-if="!disabledState">
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
          <el-button @click="goBack">取消</el-button>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'Right',
    data(){
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
      var validatecontact_address = (rule, value, callback) => {
        if (value && (value.length>50)) {
          callback(new Error('1-50个字符'))
        } else {
          callback();
        }
      };
      var validatecontact_count20 = (rule, value, callback) => {
        if (value && (value.length>20)) {
          callback(new Error('1-20个字符'))
        } else {
          callback();
        }
      };
      var contactRelationship = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^[\u4e00-\u9fa5]{2,5}$/.test(value))) {
          callback(new Error('只能是2-5个汉字'))
        } else {
          callback();
        }
      };
      var contactRelationship1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^[\u4e00-\u9fa5]{2,10}$/.test(value))) {
          callback(new Error('只能是2-10个汉字'))
        } else {
          callback();
        }
      };
      var validatecontact_item3 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^\d{1,10}$/.test(value)) ) {
          callback(new Error('请输入正整数'))
        } else if(value > this.form.age){
          callback(new Error('不能大于您的年龄'))
        }else{
          callback();
        }
      };
      var validatecontact_age = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!( /^(?=([0-9]{1,10}$|[0-9]{1,3}\.))(0|[1-9][0-9]*)(\.[0-9]{1})?$/.test(value))) {
          callback(new Error('请输入数字，并保留一位小数'))
        } else if (value>this.form.age) {
          callback(new Error('数值且不能大于您的年龄'))
        } else {
          callback();
        }
      };
      var validatecontact_height = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^\d{1,3}$/.test(value))) {
          callback(new Error('50-300的整数'))
        } else if(value>300 || value<50){
          callback(new Error('50-300的整数'))
        }else {
          callback();
        }
      };
      var validatecontact_count24 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!( /^(?=([0-9]{1,2}$|[0-9]{1,3}\.))(0|[1-9][0-9]*)(\.[0-9]{1})?$/.test(value))) {
          callback(new Error('0-24的数字'))
        } else if(value>24 || value<0){
          callback(new Error('0-24的数字'))
        }else {
          callback();
        }
      };
      var validatecontact_count150 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^\d{1,3}$/.test(value))) {
          callback(new Error('0-150的数字'))
        } else if(value>150 || value<0){
          callback(new Error('0-150的数字'))
        }else {
          callback();
        }
      };
      var validatecontact_count100 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^\d{1,4}$/.test(value))) {
          callback(new Error('1-100的正整数'))
        } else if(value>100 || value<1){
          callback(new Error('1-100的整数'))
        }else {
          callback();
        }
      };
      var validatecontact_count1000 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^\d{1,4}$/.test(value))) {
          callback(new Error('1-1000的整数'))
        } else if(value>1000 || value<1){
          callback(new Error('1-1000的整数'))
        }else {
          callback();
        }
      };
      var item290 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^\d{1,10}$/.test(value))) {
          callback(new Error('请输入正整数'))
        }else {
          callback();
        }
      };
      var validatecontact_count50 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!( /^(?=([0-9]{1,3}$|[0-9]{1,3}\.))(0|[1-9][0-9]*)(\.[0-9]{1})?$/.test(value))) {
          callback(new Error('0-50的数字'))
        } else if(value>50 || value<0){
          callback(new Error('0-50的数字'))
        }else {
          callback();
        }
      };
      var validatecontact_weight = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!( /^(?=([0-9]{1,3}$|[0-9]{1,3}\.))(0|[1-9][0-9]*)(\.[0-9]{1})?$/.test(value))) {
          callback(new Error('50-200的数字'))
        } else if(value>200 || value<50){
          callback(new Error('50-200的数字'))
        }else {
          callback();
        }
      };
      var validatecontact_weight1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!( /^(?=([0-9]{1,3}$|[0-9]{1,3}\.))(0|[1-9][0-9]*)(\.[0-9]{1})?$/.test(value))) {
          callback(new Error('10-200的数字'))
        } else if(value>200 || value<10){
          callback(new Error('10-200的数字'))
        }else {
          callback();
        }
      };
      var validateNumber = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^[0-9]+([.]{1}[5]+){0,1}$/.test(value))) {
          callback(new Error('数值且小数部分为0.5的倍数'))
        } else {
          callback();
        }
      };
        return{
          pickerOptions1: {
            disabledDate(time) {
              return time.getTime() > Date.now();
            },
          },
          //弹窗
          dialogVisible:false,
          //权限判定
          personalInformation_page: false,
          btnAuth: {
            countryAgencySearch_page: false,
          },
          //地址转换
          props: {
            value: 'label',
            children: 'children',
            label: 'label'
          },
          addressState:false,
          //选择亲属数组
          relativesCheckList:[],
          relativesItem:[],
          restaurants:[],
          timeout:'null',
          //查看
          disabledState:false,
          //selectForm
          selectForm:{
            bType:'',
            cType:'',
            drugName:''
          },
          //表单对象
          form:{
//            //不提交的字段
            jobList:[],
            sportList:[],
            diseaseList:[],
            digestiveList:[],
            upDigestiveList:[],
            gallbladderList:[],
            brainwashingList:[],
            cancerList:[],
            age:25,//年龄


            name:'',//姓名
            sex:'',//'性别 1，男：2，女',
            idCard:'',//身份证号
            phone:'',//手机号
            telephone:'',//座机
            contactRelationship:'',//联系人关系
            contactPhone:'',//联系人手机号
            contact_telephone:'',//联系人固定电话
            address1:'',//常住地址(详细地址)
            address:[],//详细地址
            address_postcode:'',//常住地址邮编
            fillInPerson:'',//问卷填写人 1：本人, 2：其他
            fillInRelationship:'',//其他 联系人与本人关系
            item1:'',//'您的最高学历是：1：未受过教育，2：小学，3：初中，4：高中／中专／技校，5：大专，6：大学本科，7：研究生及以上，8：其他',
            item2:'',//'教育状况其他',
            item3:'',//'累计累积受教育年限（从小学开始）(年)',
            item4:'',//'婚姻 状况，1：未婚，2：初婚，3：再婚，4：离婚，5：丧偶，6：分居，7：未婚同居',
            item5:'',//'初次结婚年龄',
            item6:null,//'身高(cm)',
            item7:'',//'当前体重(kg)',
            item8:'',//'五年前体重(kg)',
            item9:'',//'18岁时体重(kg)',
            item10:'',//'腰围(cm)',
            item11:'',//'臀围(cm)',
            item12:'',//'您是否清楚自己的血糖值  0：不清楚，1：清楚',
            item13:'',//'最近一次空腹血糖值(mmol/L)',
            item14:'',//'最近一次检测的餐后2小时血糖值(mmol/L)',
            item15:'',//'您的职业',
            item16:'',//'职业类型 1：专业技术人员，2：国家机关和企业事业单位负责人，3：职员，4：商人，5：农民，6：工人，7：服务性工作人员，8：家务，9：其他',
            item17:'',//'其他职业类型',
            item18:'',//'是否在以下行业/职业工作12个月或更多 0：否，1：是',
            item19:'',//'在石棉 行业/职业工作12个月或更多 0：否，1：是',
            item20:'',//'在石棉 行业/职业累计工作年限(年)',
            item21:'',//'在石棉 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item22:'',//'在烘焙 行业/职业工作12个月或更多 0：否，1：是',
            item23:'',//'在烘焙 行业/职业累计工作年限(年)',
            item24:'',//'在烘焙 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item25:'',//'在屠宰或肉类包装 行业/职业工作12个月或更多 0：否，1：是',
            item26:'',//'在屠宰或肉类包装 行业/职业累计工作年限(年)',
            item27:'',//'在屠宰或肉类包装 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item28:'',//'在石油/化工业 行业/职业工作12个月或更多 0：否，1：是',
            item29:'',//'在石油/化工业 行业/职业累计工作年限(年)',
            item30:'',//'在石油/化工业 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item31:'',//'在采矿：煤矿 行业/职业工作12个月或更多 0：否，1：是',
            item32:'',//'在采矿：煤矿 行业/职业累计工作年限(年)',
            item33:'',//'在采矿：煤矿 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item34:'',//'在采矿：矽矿 行业/职业工作12个月或更多 0：否，1：是',
            item35:'',//'在采矿：矽矿 行业/职业累计工作年限(年)',
            item36:'',//'在采矿：矽矿 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item37:'',//'在棉麻加工 行业/职业工作12个月或更多 0：否，1：是',
            item38:'',//'在棉麻加工 行业/职业累计工作年限(年)',
            item39:'',//'在棉麻加工 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item40:'',//'在垃圾回收 行业/职业工作12个月或更多 0：否，1：是',
            item41:'',//'在垃圾回收 行业/职业累计工作年限(年)',
            item42:'',//'在垃圾回收 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item43:'',//'在消防 行业/职业工作12个月或更多 0：否，1：是',
            item44:'',//'在消防 行业/职业累计工作年限(年)',
            item45:'',//'在消防 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item46:'',//'在面粉/饲料/粮食加工 行业/职业工作12个月或更多 0：否，1：是',
            item47:'',//'在面粉/饲料/粮食加工 行业/职业累计工作年限(年)',
            item48:'',//'在面粉/饲料/粮食加工 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item49:'',//'在钢铁铸造 行业/职业工作12个月或更多 0：否，1：是',
            item50:'',//'在钢铁铸造 行业/职业累计工作年限(年)',
            item51:'',//'在钢铁铸造 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item52:'',//'在涂装（油漆） 行业/职业工作12个月或更多 0：否，1：是',
            item53:'',//'在涂装（油漆） 行业/职业累计工作年限(年)',
            item54:'',//'在涂装（油漆） 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item55:'',//'在喷砂 行业/职业工作12个月或更多 0：否，1：是',
            item56:'',//'在喷砂 行业/职业累计工作年限(年)',
            item57:'',//'在喷砂 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item58:'',//'在焊接 行业/职业工作12个月或更多 0：否，1：是',
            item59:'',//'在焊接 行业/职业累计工作年限(年)',
            item60:'',//'在焊接 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item61:'',//'在建筑 行业/职业工作12个月或更多 0：否，1：是',
            item62:'',//'在建筑 行业/职业累计工作年限(年)',
            item63:'',//'在建筑 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item64:'',//'在农药 行业/职业工作12个月或更多 0：否，1：是',
            item65:'',//'在农药 行业/职业累计工作年限(年)',
            item66:'',//'在农药 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item67:'',//'在厨师 行业/职业工作12个月或更多 0：否，1：是',
            item68:'',//'在厨师 行业/职业累计工作年限(年)',
            item69:'',//'在厨师 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item70:'',//'在橡胶/轮胎 行业/职业工作12个月或更多 0：否，1：是',
            item71:'',//'在橡胶/轮胎 行业/职业累计工作年限(年)',
            item72:'',//'在橡胶/轮胎 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item73:'',//'是否吸烟（每周吸一支以上并连续或累计6个月以上者定义为吸烟） 0：否，从不吸，1：是，目前仍在吸，2：以前吸，目前已戒烟 ',
            item74:'',//'从多少岁开始吸烟(岁)',
            item75:'',//'您曾经或现在早上醒来吸第一支烟的时间大约 1. 不到5分钟 2. 6-30分钟 3. 31-60分钟 4. 超过60分钟',
            item76:'',//'您主要吸下列哪一种烟草产品（1. 机制卷烟；2. 手卷烟；3. 烟斗；4. 雪茄；5. 水烟；6. 其他',
            item77:'',//'其他烟草类型',
            item78:'',//'如果您目前已戒烟，这次戒烟已持续多少年（不足1年按0.5年计）',
            item79:'',//'如果您仍在吸烟或曾吸烟，扣除戒烟年数，共吸烟多少年（不足1年按0.5年计）',
            item80:'',//'如果您仍在吸烟或曾吸烟，平均每天吸烟多少支（1包=20支；1两烟叶≈50支卷烟）',
            item81:'',//'吸烟包年数是多少',
            item82:'',//'同您一起生活的家人或者工作的同事是否吸烟（平均每周5天或以上） 0：否，1：是',
            item83:'',//'在有烟雾的室内环境中，您居住和/或工作了多少年（不足1年按0.5年计）',
            item84:'',//'吸烟人为配偶 0未勾选 1勾选',
            item85:'',//'吸烟人为伴侣 0未勾选 1勾选',
            item86:'',//'吸烟人为其他家庭成员 0未勾选 1勾选',
            item87:'',//'其他家庭成员吸烟人数',
            item88:'',//'吸烟人为同一办公室同事 0未勾选 1勾选',
            item89:'',//'同一办公室同事吸烟人数',
            item90:'',//'该吸烟者总共吸烟多少年 （不足1年按0.5年计）',
            item91:'',//'该吸烟者每天吸多少支烟 （1包=20支；1两烟叶≈50支卷烟）',
            item92:'',//'该吸烟者吸烟包年数是多少',
            item93:'',//'您是否经常饮酒（经常是指平均每周至少1次，连续6个月以上） 0：否，从不饮，1：是，目前仍经常饮，2：以前是，目前已戒酒',
            item94:'',//'如果您目前已戒酒，这次戒酒已持续多少年？（不足一年按一年计）',
            item95:'',//'您经常饮酒的种类是什么？ 1：葡萄酒，2：白酒，3：啤酒，4：黄酒，5：其他',
            item96:'',//'您多久会喝一次酒？1：每月1次或更少，2：每月2-4次，3：每周2-3次，4：每周4次或更多',
            item97:'',//'通常状况下，您平均一天饮酒的总量为多少单位？（一单位=一听啤酒（330ml）/一杯葡萄酒（150ml）/一两白酒）1：≤1，2：2-3，3：4，4：5-7，5：≥8',
            item98:'',//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 细粮（大米、面食），1：>1次/天，2：1次/天，3：>1次/周，4：1次/周，5：≈1次/月，6：未吃',
            item99:'',//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 细粮（大米、面食） 平均摄入量 1：＜1.5 两/天，2：≥1.5 两/天',
            item100:'',//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 粗粮（五谷杂粮，包括小米、玉米、高粱等），1：>1次/天，2：1次/天，3：>1次/周，4：1次/周，5：≈1次/月，6：未吃',
            item101:'',//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 粗粮（五谷杂粮，包括小米、玉米、高粱等） 平均摄入量 1：＜1.5 两/天，2：≥1.5 两/天',
            item102:'',//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 新鲜水果，1：>1次/天，2：1次/天，3：>1次/周，4：1次/周，5：≈1次/月，6：未吃',
            item103:'',//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 新鲜水果 平均摄入量 1：＜4 两/天，2： ≥4 两/天',
            item104:'',//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 新鲜蔬菜，1：>1次/天，2：1次/天，3：>1次/周，4：1次/周，5：≈1次/月，6：未吃',
            item105:'',//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 新鲜蔬菜 平均摄入量 1：＜7 两/天，2：≥7 两/天',
            item106:'',//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 畜肉（猪、牛、羊肉等），1：>1次/天，2：1次/天，3：>1次/周，4：1次/周，5：≈1次/月，6：未吃',
            item107:'',//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 畜肉（猪、牛、羊肉等） 平均摄入量 1：≤1 两/天，2：＞1 两/天',
            item108:'',//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 鱼/禽肉（鸡、鸭、鹅肉等），1：>1次/天，2：1次/天，3：>1次/周，4：1次/周，5：≈1次/月，6：未吃',
            item109:'',//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 鱼/禽肉（鸡、鸭、鹅肉等） 平均摄入量 1：≤1 两/天，2：＞1 两/天',
            item110:'',//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 蛋类（鸡蛋、鸭蛋等），1：>1次/天，2：1次/天，3：>1次/周，4：1次/周，5：≈1次/月，6：未吃',
            item111:'',//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 蛋类（鸡蛋、鸭蛋等） 平均摄入量 1：≤1 个/天，2：＞1 个/天',
            item112:'',//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 奶类（牛奶、羊奶），1：>1次/天，2：1次/天，3：>1次/周，4：1次/周，5：≈1次/月，6：未吃',
            item113:'',//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 奶类（牛奶、羊奶） 平均摄入量 1：≤0.5 斤/天，2：＞0.5 斤/天',
            item114:'',//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 香肠／熏肉／熏鱼／咸鱼/腊肉，1：>1次/天，2：1次/天，3：>1次/周，4：1次/周，5：≈1次/月，6：未吃',
            item115:'',//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 香肠／熏肉／熏鱼／咸鱼/腊肉 平均摄入量 1：≤1 两/天，2：＞1 两/天',
            item116:'',//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 腌制食品（酸菜、泡菜、咸菜等），1：>1次/天，2：1次/天，3：>1次/周，4：1次/周，5：≈1次/月，6：未吃',
            item117:'',//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 腌制食品（酸菜、泡菜、咸菜等） 平均摄入量 1：≤1 两/天，2：＞1 两/天',
            item118:'',//'您平时的饮食喜好习惯（包括饮茶、饮水） 冷热度：1：烫，2：热，3：温，4：凉',
            item119:'',//'您平时的饮食喜好习惯 干稀度 1：干，2：适中，3：稀',
            item120:'',//'您平时的饮食喜好习惯 口味 1：重盐，2：适中，3：清淡',
            item121:'',//'您平时的饮食喜好习惯 油脂 1：较高，2：适中，3：较低',
            item122:'',//'您是否经常饮茶（经常指平均每周至少3次，连续6个月以上）？  0：否，从不饮，1：是，目前仍经常饮，2：以前是，现在不经常饮',
            item123:'',//'您是否经常参加体育锻炼（经常是指平均每周3次以上，每次超过30分钟）？0：否，1：是',
            item124:'',//'是否从事低强度活动，如：太极、瑜伽等',
            item125:'',//'从事低强度活动，如：太极、瑜伽等 每周平均活动次数',
            item126:'',//'从事低强度活动，如：太极、瑜伽等 每次活动时间(分钟)',
            item127:'',//'是否从事中等强度体力家务劳动 如：快走、慢跑、跳舞、乒乓球、家务（如扫地、擦玻璃、洗衣服、做饭、整理房间、拖地板等）、与儿童一起参与游戏或运动等',
            item128:'',//'从事中等强度体力家务劳动 如：快走、慢跑、跳舞、乒乓球、家务（如扫地、擦玻璃、洗衣服、做饭、整理房间、拖地板等）、与儿童一起参与游戏或运动等 每周平均活动次数',
            item129:'',//'从事中等强度体力家务劳动 如：快走、慢跑、跳舞、乒乓球、家务（如扫地、擦玻璃、洗衣服、做饭、整理房间、拖地板等）、与儿童一起参与游戏或运动等 每次活动时间(分钟)',
            item130:'',//'是否从事高强度活动，如：快跑、爬山、游泳、器械锻炼、球类运动（足球、排球、篮球、羽毛球等）、搬运重物等',
            item131:'',//'从事高强度活动，如：快跑、爬山、游泳、器械锻炼、球类运动（足球、排球、篮球、羽毛球等）、搬运重物等 每周平均活动次数',
            item132:'',//'从事高强度活动，如：快跑、爬山、游泳、器械锻炼、球类运动（足球、排球、篮球、羽毛球等）、搬运重物等 每次活动时间(分钟)',
            item133:'',//'在过去12个月中，您每天平均坐着的时间（包括伏案工作、看手机、看电视等）（小时/天）',
            item134:'',//'您近十年来的生活环境是否存在较严重空气污染（如长期在大城市生活则直接被认定有空气污染）？0：否，1：是',
            item135:'',//'近十年来，您的住房是否进行取暖？0：否，1：是',
            item136:'',//'主要取暖方式 1：集中暖气，2：用电，3：太阳能，4：天然气，5：烧煤，8：其他',
            item137:'',//'其他主要取暖方式',
            item138:'',//'近十年来，您家的主要做饭燃料种类 1：天然气/液化气，2：用电，3：烧煤，8：其他',
            item139:'',//'其他主要做饭燃料种类',
            item140:'',//'近十年来，您家做饭时住房内的油烟情况 1：无烟，2：少许，3：较多，4：很多',
            item141:'',//'您家厨房采用什么排风设施 1：无，2：油烟机，3：换气扇。4：烟囱，5：其他',
            item142:'',//'其他排风设施',
            item143:'',//'近些年您是否曾经受较大的精神创伤（亲人患重病或死亡、夫妇分居或离婚、重大财产损失、意外失业、重大意外身体伤害、暴力侵害等）0：否，1：是',
            item144:'',//'近些年您是否有较长一段时间内精神处于压抑状况（连续超过 6 个月）0：否，1：是',
            item145:'',//'您是否患过慢性呼吸系统疾病？（经正规医疗机构明确诊断）0：否，1：是',
            item146:'',//'是否患有石棉肺 0：否，1：是',
            item147:'',//'首次诊断石棉肺时年龄 (岁)',
            item148:'',//'是否患有儿童哮喘 0：否，1：是',
            item149:'',//'首次诊断儿童哮喘时年龄 (岁)',
            item150:'',//'是否患有成人哮喘 0：否，1：是',
            item151:'',//'首次诊断成人哮喘时年龄 (岁)',
            item152:'',//'是否患有支气管扩张 0：否，1：是',
            item153:'',//'首次诊断支气管扩张时年龄 (岁)',
            item154:'',//'是否患有慢性支气管炎 0：否，1：是',
            item155:'',//'首次诊断慢性支气管炎时年龄 (岁)',
            item156:'',//'是否患有慢性阻塞性肺病（COPD） 0：否，1：是',
            item157:'',//'首次诊断慢性阻塞性肺病（COPD）时年龄 (岁)',
            item158:'',//'是否患有肺气肿 0：否，1：是',
            item159:'',//'首次诊断肺气肿时年龄 (岁)',
            item160:'',//'是否患有弥漫性肺间质纤维化 0：否，1：是',
            item161:'',//'首次诊断弥漫性肺间质纤维化时年龄 (岁)',
            item162:'',//'是否患有肺炎 0：否，1：是',
            item163:'',//'首次诊断肺炎时年龄 (岁)',
            item164:'',//'是否患有结节病 0：否，1：是',
            item165:'',//'首次诊断结节病时年龄 (岁)',
            item166:'',//'是否患有矽肺/尘肺 0：否，1：是',
            item167:'',//'首次诊断矽肺/尘肺时年龄 (岁)',
            item168:'',//'是否患有肺结核 0：否，1：是',
            item169:'',//'首次诊断肺结核时年龄 (岁)',
            item170:'',//'是否患有其他慢性呼吸系统疾病 0：否，1：是',
            item171:'',//'其他慢性呼吸系统疾病',
            item172:'',//'首次诊断其他慢性呼吸系统疾病时年龄 (岁)',
            item173:'',//'您是否患过下消化系统疾病？（经正规医疗机构明确诊断）0：否，1：是',
            item174:'',//'您是否患过慢性结肠炎 0：否，1：是',
            item175:'',//'首次诊断慢性结肠炎时年龄 (岁)',
            item176:'',//'您是否患过肠息肉 0：否，1：是',
            item177:'',//'首次诊断肠息肉时年龄 (岁)',
            item178:'',//'您是否患过慢性阑尾炎或阑尾切除史 0：否，1：是',
            item179:'',//'首次诊断慢性阑尾炎或阑尾切除史时年龄 (岁)',
            item180:'',//'您是否患过慢性腹泻 0：否，1：是',
            item181:'',//'首次诊断慢性腹泻时年龄 (岁)',
            item182:'',//'您是否患过慢性便秘 0：否，1：是',
            item183:'',//'首次诊断慢性便秘时年龄 (岁)',
            item184:'',//'您是否患过粘液和/或血便 0：否，1：是',
            item185:'',//'首次诊断粘液和/或血便时年龄 (岁)',
            item186:'',//'您是否患过其他下消化系统疾病 0：否，1：是',
            item187:'',//'其他下消化系统疾病',
            item188:'',//'首次诊断其他下消化系统疾病时年龄 (岁)',
            item189:'',//'您现在是否存在腹部不适或其他肠道异常的症状？0：否，1：是',
            item190:'',//'肠道的疼痛或异常症状出现的时间？',
            item191:'',//'主要的症状 1：腹痛，2：排便异常（腹泻、便秘、大便不成形等），3：便血（肉眼可见），4：其他',
            item192:'',//'其他腹部不适或其他肠道异常的症状',
            item193:'',//'您是否曾经进行过粪便潜血试验（FOBT）检测 0：否，1：是',
            item194:'',//'粪便潜血试验（FOBT）检测结果 0：阴性，1：阳性，999：不清楚',
            item195:'',//'您是否患过上消化系统疾病？（经正规医疗机构明确诊断）0：否，1：是',
            item196:'',//'您是否患过反流性食管炎 0：否，1：是',
            item197:'',//'首次诊断反流性食管炎时年龄 (岁)',
            item198:'',//'您是否患过浅表性胃炎 0：否，1：是',
            item199:'',//'首次诊断浅表性胃炎时年龄 (岁)',
            item200:'',//'您是否患过萎缩性胃炎 0：否，1：是',
            item201:'',//'首次诊断萎缩性胃炎时年龄 (岁)',
            item202:'',//'您是否患过胃溃疡 0：否，1：是',
            item203:'',//'首次诊断胃溃疡时年龄 (岁)',
            item204:'',//'您是否患过十二指肠溃疡 0：否，1：是',
            item205:'',//'首次诊断十二指肠溃疡时年龄 (岁)',
            item206:'',//'您是否患过胃息肉病 0：否，1：是',
            item207:'',//'首次诊断胃息肉病时年龄 (岁)',
            item208:'',//'您是否患过残胃 0：否，1：是',
            item209:'',//'首次诊断残胃时年龄 (岁)',
            item210:'',//'您是否患过胃黏膜上皮内瘤变 0：否，1：是',
            item211:'',//'首次诊断胃黏膜上皮内瘤变时年龄 (岁)',
            item212:'',//'您是否患过胃肠上皮化生 0：否，1：是',
            item213:'',//'首次诊断胃肠上皮化生时年龄 (岁)',
            item214:'',//'您是否患过其他上消化系统疾病 0：否，1：是',
            item215:'',//'其他上消化系统疾病',
            item216:'',//'首次诊断其他上消化系统疾病时年龄 (岁)',
            item217:'',//'您是否患过肝胆系统疾病？（经正规医疗机构明确诊断）0：否，1：是',
            item218:'',//'您是否患过慢性乙型肝炎 0：否，1：是',
            item219:'',//'首次诊断慢性乙型肝炎时年龄 (岁)',
            item220:'',//'您是否患过慢性丙型肝炎 0：否，1：是',
            item221:'',//'首次诊断慢性丙型肝炎时年龄 (岁)',
            item222:'',//'您是否患过肝硬化 0：否，1：是',
            item223:'',//'首次诊断肝硬化时年龄 (岁)',
            item224:'',//'您是否患过血吸虫感染病史 0：否，1：是',
            item225:'',//'首次诊断血吸虫感染病史时年龄 (岁)',
            item226:'',//'您是否患过脂肪肝 0：否，1：是',
            item227:'',//'首次诊断脂肪肝时年龄 (岁)',
            item228:'',//'脂肪肝程度 1：轻度，2：中度，3：重度，999：不清楚',
            item229:'',//'您是否患过胆结石症 0：否，1：是',
            item230:'',//'首次诊断胆结石症病时年龄 (岁)',
            item231:[],//'胆结石症类型（可多选） 1：肝内胆管结石，2：肝外胆管结石，3：胆囊结石，999：不清楚',
            item232:'',//'您是否患过慢性胆囊炎或胆囊切除史 0：否，1：是',
            item233:'',//'首次慢性胆囊炎或胆囊切除史残胃时年龄 (岁)',
            item234:'',//'您是否患过其他肝胆系统疾病 0：否，1：是',
            item235:'',//'其他肝胆系统疾病',
            item236:'',//'首次诊断其他肝胆系统疾病时年龄 (岁)',
            item237:'',//'您是否进行过乙肝表面抗原（HBsAg）检测 0：否，1：是',
            item238:'',//'乙肝表面抗原（HBsAg）检测结果 0：阴性，1：阳性，999：不清楚',
            item239:'',//'您是否患过心脑血管疾病疾病？（经正规医疗机构明确诊断）0：否，1：是',
            item240:'',//'您是否患过高血压 0：否，1：是',
            item241:'',//'首次诊断高血压时年龄 (岁)',
            item242:'',//'您是否患过血脂异常/高血脂症 0：否，1：是',
            item243:'',//'首次诊断血脂异常/高血脂症时年龄 (岁)',
            item244:'',//'您是否患过冠心病 0：否，1：是',
            item245:'',//'首次诊断冠心病时年龄 (岁)',
            item246:'',//'您是否患过脑卒中/脑中风 0：否，1：是',
            item247:'',//'首次诊断脑卒中/脑中风时年龄 (岁)',
            item248:'',//'您是否患过糖尿病 0：否，1：是',
            item249:'',//'糖尿病类型 1：Ⅰ型，2：Ⅱ型，3：妊娠糖尿病，4：其他，999：不清楚',
            item250:'',//'其他糖尿病',
            item251:'',//'首次诊断糖尿病时年龄 (岁)',
            item252:'',//'您是否患过良性乳腺疾病（经正规医疗机构明确诊断：乳腺增生、结节、导管扩张、纤维腺瘤、炎症等）（仅女性填写） 0：否，1：是',
            item253:'',//'首次诊断良性乳腺疾病时年龄 (岁)',
            item254:'',//'您的血缘亲属中，是否有人曾患癌症？ 0：否，1：是',
            item255:'',//'是否为肺癌 0：否，1：是',
            item256List:[],//'患肺癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
            item257:'',//'是否为食管癌 0：否，1：是',
            item258List:[],//'患食管癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
            item259:'',//'是否为胃癌 0：否，1：是',
            item260List:[],//'患胃癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
            item261:'',//'是否为肝癌 0：否，1：是',
            item262List:[],//'患肝癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
            item263:'',//'是否为结直肠癌 0：否，1：是',
            item264List:[],//'患结直肠癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
            item265:'',//'是否为前列腺癌 0：否，1：是',
            item266List:[],//'患前列腺癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
            item267:'',//'是否为膀胱癌 0：否，1：是',
            item268List:[],//'患膀胱癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
            item269:'',//'是否为结鼻咽癌 0：否，1：是',
            item270List:[],//'患鼻咽癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
            item271:'',//'是否为乳腺癌 0：否，1：是',
            item272:'',//'您是否有一级血缘亲属（母亲、亲姐妹）在50岁及以前曾患乳腺癌 1：是，2：否',
            item273List:[],//'患乳腺癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
            item274:'',//'是否为宫颈癌 0：否，1：是',
            item275List:[],//'患宫颈癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
            item276:'',//'是否为卵巢癌 0：否，1：是',
            item277List:[],//'患卵巢癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
            item278:'',//'是否为甲状腺癌 0：否，1：是',
            item279List:[],//'患甲状腺癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
            item280:'',//'是否为其他癌症（包括不清楚） 0：否，1：是',
            item281List:[],//'患其他癌症亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
            item282:'',//'您是否正在或曾经规律服用药物（超过一年）0：否，1：是',
            item283:'',//'您的首次月经年龄(周岁)',
            item284:'',//'您的月经周期是否规律？0：否，1：是',
            item285:'',//'您是否已绝闭经？0：否，1：是',
            item286:'',//'停经年龄 （周岁）',
            item287:'',//'您是否曾分娩（包括自然分娩和剖腹产）？0：否，1：是',
            item288:'',//'初次生育年龄 （周岁）',
            item289:'',//'您是否有哺乳史？0：否，1：是',
            item290:'',//'累计哺乳多少个月（不足一月按一月计）',
            item291:'',//'您是否曾进行女性生殖系统手术（子宫、卵巢和输卵管等部位的手术，包括剖腹产）？0：否，1：是',
            item292:'',//'女性生殖系统手术 手术名称或手术部位',
            item293:'',//'您是否曾接受过激素替代治疗（雌激素或雌/孕激素联合治疗，给药途径包括口服、皮贴、涂抹霜剂或凝胶、经阴道使用的霜、片、栓、硅胶环等）?1：否，2：是，正在接受治疗，3：是，曾经接受治疗',
            scheme:'',//'治疗方案 1：只服用雌激素，2：联合服用雌/孕激素',
            researchSignature:'',//'研究对象或委托人签字',
            researchDate:'',//'日期',
            clientRelationship:'',//'委托人与研究对象关系',
            investigator:'',//'调查员姓名',
            investigationDate:'',//'调查日期',
            pathurl:'',//'文件上传路径表id',
            flag:'',//'有效标志 0、有效 -1、无效',
            hosDrugHistoryList:[
              {
                drugType:'',
                drugSmallType:'',
                drugName:'',
                startAge:'',
                countTime:'',
                drugTypeList:this.drugTypeList,
                drugSmallTypeList:[]
              }
            ],
            hosHormoneDrugsHistoryList:[
              {
                drugName:'',
                drugNameOther:'',
                startAge:'',
                endTime:'',
                hormone:[]

              }
            ],




            contact_area:'',//本人座机区号
            phone_phone:'',//本人座机号码
          },
          //表单验证规则
          rules:{
            jobList: [
              {required: true, message: '必选', trigger: 'blur'},
              {required: true, message: '必选', trigger: 'change'},
            ],//'工作',
            sportList:[
              {required: true, message: '必选', trigger: 'blur'},
              {required: true, message: '必选', trigger: 'change'},
            ],
            diseaseList:[
              {required: true, message: '必选', trigger: 'blur'},
              {required: true, message: '必选', trigger: 'change'},
            ],
            digestiveList:[
              {required: true, message: '必选', trigger: 'blur'},
              {required: true, message: '必选', trigger: 'change'},
            ],
            upDigestiveList:[
              {required: true, message: '必选', trigger: 'blur'},
              {required: true, message: '必选', trigger: 'change'},
            ],
            gallbladderList:[
              {required: true, message: '必选', trigger: 'blur'},
              {required: true, message: '必选', trigger: 'change'},
            ],
            brainwashingList:[
              {required: true, message: '必选', trigger: 'blur'},
              {required: true, message: '必选', trigger: 'change'},
            ],
            cancerList:[
              {required: true, message: '必选', trigger: 'blur'},
              {required: true, message: '必选', trigger: 'change'},
            ],
            drugType:[
              {required: false, message: '必填', trigger: 'blur'},
              {required: false, message: '必填', trigger: 'change'},
            ],
            drugSmallType:[
              {required: false, message: '必填', trigger: 'blur'},
              {required: false, message: '必填', trigger: 'change'},
            ],
            drugName:[
              {required: true, message: '必填', trigger: 'blur'},
              {required: true, message: '必填', trigger: 'change'},
            ],
            startAge:[
              {required: true, message: '必填', trigger: 'blur'},
              {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'},
            ],
            countTime:[
              {required: true, message: '必填', trigger: 'blur'},
              {required: true, message: '必填', trigger: 'change'},
              {validator: validateNumber, trigger: 'blur'},
              {validator: validateNumber, trigger: 'change'},
            ],
            endTime:[
              {required: true, message: '必填', trigger: 'blur'},
              {required: true, message: '必填', trigger: 'change'},
            ],
            drugNameOther:[
              {required: true, message: '必填', trigger: 'blur'},
              {required: true, message: '必填', trigger: 'change'},
            ],






            phone_area: [
              {validator: validatecontact_area, trigger: 'blur'},
              {validator: validatecontact_area, trigger: 'change'},
            ],
            phone_phone: [
              {validator: validatecontact_telephone, trigger: 'blur'},
              {validator: validatecontact_telephone, trigger: 'change'},
            ],
            telephone_area: [
              {validator: validatecontact_area, trigger: 'blur'},
              {validator: validatecontact_area, trigger: 'change'},
            ],
            telephone_phone: [
              {validator: validatecontact_telephone, trigger: 'blur'},
              {validator: validatecontact_telephone, trigger: 'change'},
            ],
            name: [
              {required: true, message: '必填', trigger: 'blur'},
              {required: true, message: '必填', trigger: 'change'},
            ],//'姓名',
            sex: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'性别 1，男：2，女',
            idCard: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//身份证号
            phone: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatePhone, trigger: 'blur'},
              {validator: validatePhone, trigger: 'change'}
          ],//手机号
            telephone: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//座机
            contactRelationship: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: contactRelationship, trigger: 'blur'},
              {validator: contactRelationship, trigger: 'change'}
          ],//联系人关系
            contactPhone: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatePhone, trigger: 'blur'},
              {validator: validatePhone, trigger: 'change'}
          ],//联系人手机号
            contact_telephone: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//联系人固定电话
            address1: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_address, trigger: 'blur'},
              {validator: validatecontact_address, trigger: 'change'}
          ],//常住地址(详细地址)
            address: [
              {required: true, message: '必填', trigger: 'blur'},
              {required: true, message: '必填', trigger: 'change'},
            ],//常住地址(详细地址)
            addressPostcode: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//常住地址邮编
            fillInPerson: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//问卷填写人 1：本人, 2：其他
            fillInRelationship: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: contactRelationship, trigger: 'blur'},
              {validator: contactRelationship, trigger: 'change'}
          ],//其他 联系人与本人关系
            item1: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您的最高学历是：1：未受过教育，2：小学，3：初中，4：高中／中专／技校，5：大专，6：大学本科，7：研究生及以上，8：其他',
            item2: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_count20, trigger: 'blur'},
              {validator: validatecontact_count20, trigger: 'change'}
          ],//'教育状况其他',
            item3: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_age, trigger: 'blur'},
              {validator: validatecontact_age, trigger: 'change'}
          ],//'累计累积受教育年限（从小学开始）(年)',
            item4: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'婚姻 状况，1：未婚，2：初婚，3：再婚，4：离婚，5：丧偶，6：分居，7：未婚同居',
            item5: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'初次结婚年龄',
            item6: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_height, trigger: 'blur'},
              {validator: validatecontact_height, trigger: 'change'}
          ],//'身高(cm)',
            item7: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_weight1, trigger: 'blur'},
              {validator: validatecontact_weight1, trigger: 'change'},
          ],//'当前体重(kg)',
            item8: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_weight1, trigger: 'blur'},
              {validator: validatecontact_weight1, trigger: 'change'},
          ],//'五年前体重(kg)',
            item9: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_weight1, trigger: 'blur'},
              {validator: validatecontact_weight1, trigger: 'change'},
          ],//'18岁时体重(kg)',
            item10: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_count150, trigger: 'blur'},
              {validator: validatecontact_count150, trigger: 'change'},
          ],//'腰围(cm)',
            item11: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_count150, trigger: 'blur'},
              {validator: validatecontact_count150, trigger: 'change'},
          ],//'臀围(cm)',
            item12: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否清楚自己的血糖值  0：不清楚，1：清楚',
            item13: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_count50, trigger: 'blur'},
              {validator: validatecontact_count50, trigger: 'change'},
          ],//'最近一次空腹血糖值(mmol/L)',
            item14: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_count50, trigger: 'blur'},
              {validator: validatecontact_count50, trigger: 'change'},
          ],//'最近一次检测的餐后2小时血糖值(mmol/L)',
            item15: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_count20, trigger: 'blur'},
              {validator: validatecontact_count20, trigger: 'change'},
          ],//'您的职业',
            item16: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'职业类型 1：专业技术人员，2：国家机关和企业事业单位负责人，3：职员，4：商人，5：农民，6：工人，7：服务性工作人员，8：家务，9：其他',
            item17: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_count20, trigger: 'blur'},
              {validator: validatecontact_count20, trigger: 'change'},
          ],//'其他职业类型',
            item18: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'是否在以下行业/职业工作12个月或更多 0：否，1：是',
            item19: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在石棉 行业/职业工作12个月或更多 0：否，1：是',
            item20: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'},
          ],//'在石棉 行业/职业累计工作年限(年)',
            item21: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在石棉 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item22: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在烘焙 行业/职业工作12个月或更多 0：否，1：是',
            item23: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'},
          ],//'在烘焙 行业/职业累计工作年限(年)',
            item24: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在烘焙 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item25: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在屠宰或肉类包装 行业/职业工作12个月或更多 0：否，1：是',
            item26: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'},
          ],//'在屠宰或肉类包装 行业/职业累计工作年限(年)',
            item27: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在屠宰或肉类包装 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item28: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在石油/化工业 行业/职业工作12个月或更多 0：否，1：是',
            item29: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'},
          ],//'在石油/化工业 行业/职业累计工作年限(年)',
            item30: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在石油/化工业 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item31: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在采矿：煤矿 行业/职业工作12个月或更多 0：否，1：是',
            item32: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'},
          ],//'在采矿：煤矿 行业/职业累计工作年限(年)',
            item33: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在采矿：煤矿 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item34: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在采矿：矽矿 行业/职业工作12个月或更多 0：否，1：是',
            item35: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'},
          ],//'在采矿：矽矿 行业/职业累计工作年限(年)',
            item36: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在采矿：矽矿 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item37: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在棉麻加工 行业/职业工作12个月或更多 0：否，1：是',
            item38: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'},
          ],//'在棉麻加工 行业/职业累计工作年限(年)',
            item39: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在棉麻加工 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item40: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在垃圾回收 行业/职业工作12个月或更多 0：否，1：是',
            item41: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'},
          ],//'在垃圾回收 行业/职业累计工作年限(年)',
            item42: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在垃圾回收 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item43: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在消防 行业/职业工作12个月或更多 0：否，1：是',
            item44: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'},
          ],//'在消防 行业/职业累计工作年限(年)',
            item45: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在消防 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item46: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在面粉/饲料/粮食加工 行业/职业工作12个月或更多 0：否，1：是',
            item47: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'},
          ],//'在面粉/饲料/粮食加工 行业/职业累计工作年限(年)',
            item48: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在面粉/饲料/粮食加工 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item49: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在钢铁铸造 行业/职业工作12个月或更多 0：否，1：是',
            item50: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'},
          ],//'在钢铁铸造 行业/职业累计工作年限(年)',
            item51: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在钢铁铸造 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item52: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在涂装（油漆） 行业/职业工作12个月或更多 0：否，1：是',
            item53: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'},
          ],//'在涂装（油漆） 行业/职业累计工作年限(年)',
            item54: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在涂装（油漆） 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item55: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在喷砂 行业/职业工作12个月或更多 0：否，1：是',
            item56: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'},
          ],//'在喷砂 行业/职业累计工作年限(年)',
            item57: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在喷砂 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item58: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在焊接 行业/职业工作12个月或更多 0：否，1：是',
            item59: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'},
          ],//'在焊接 行业/职业累计工作年限(年)',
            item60: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在焊接 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item61: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在建筑 行业/职业工作12个月或更多 0：否，1：是',
            item62: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'},
          ],//'在建筑 行业/职业累计工作年限(年)',
            item63: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在建筑 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item64: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在农药 行业/职业工作12个月或更多 0：否，1：是',
            item65: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'},
          ],//'在农药 行业/职业累计工作年限(年)',
            item66: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在农药 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item67: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在厨师 行业/职业工作12个月或更多 0：否，1：是',
            item68: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'},
          ],//'在厨师 行业/职业累计工作年限(年)',
            item69: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在厨师 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item70: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在橡胶/轮胎 行业/职业工作12个月或更多 0：否，1：是',
            item71: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'},
          ],//'在橡胶/轮胎 行业/职业累计工作年限(年)',
            item72: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在橡胶/轮胎 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
            item73: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'是否吸烟（每周吸一支以上并连续或累计6个月以上者定义为吸烟） 0：否，从不吸，1：是，目前仍在吸，2：以前吸，目前已戒烟 ',
            item74: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'从多少岁开始吸烟(岁)',
            item75: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您曾经或现在早上醒来吸第一支烟的时间大约 1. 不到5分钟 2. 6-30分钟 3. 31-60分钟 4. 超过60分钟',
            item76: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您主要吸下列哪一种烟草产品（1. 机制卷烟；2. 手卷烟；3. 烟斗；4. 雪茄；5. 水烟；6. 其他',
            item77: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'其他烟草类型',
            item78: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'如果您目前已戒烟，这次戒烟已持续多少年（不足1年按0.5年计）',
            item79: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'如果您仍在吸烟或曾吸烟，扣除戒烟年数，共吸烟多少年（不足1年按0.5年计）',
            item80: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'如果您仍在吸烟或曾吸烟，平均每天吸烟多少支（1包=20支；1两烟叶≈50支卷烟）',
            item81: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'吸烟包年数是多少',
            item82: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'同您一起生活的家人或者工作的同事是否吸烟（平均每周5天或以上） 0：否，1：是',
            item83: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在有烟雾的室内环境中，您居住和/或工作了多少年（不足1年按0.5年计）',
            item84: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'吸烟人为配偶 0未勾选 1勾选',
            item85: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'吸烟人为伴侣 0未勾选 1勾选',
            item86: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'吸烟人为其他家庭成员 0未勾选 1勾选',
            item87: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'其他家庭成员吸烟人数',
            item88: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'吸烟人为同一办公室同事 0未勾选 1勾选',
            item89: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'同一办公室同事吸烟人数',
            item90: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'该吸烟者总共吸烟多少年 （不足1年按0.5年计）',
            item91: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'该吸烟者每天吸多少支烟 （1包=20支；1两烟叶≈50支卷烟）',
            item92: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'该吸烟者吸烟包年数是多少',
            item93: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否经常饮酒（经常是指平均每周至少1次，连续6个月以上） 0：否，从不饮，1：是，目前仍经常饮，2：以前是，目前已戒酒',
            item94: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'如果您目前已戒酒，这次戒酒已持续多少年？（不足一年按一年计）',
            item95: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您经常饮酒的种类是什么？ 1：葡萄酒，2：白酒，3：啤酒，4：黄酒，5：其他',
            item96: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您多久会喝一次酒？1：每月1次或更少，2：每月2-4次，3：每周2-3次，4：每周4次或更多',
            item97: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'通常状况下，您平均一天饮酒的总量为多少单位？（一单位=一听啤酒（330ml）/一杯葡萄酒（150ml）/一两白酒）1：≤1，2：2-3，3：4，4：5-7，5：≥8',
            item98: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 细粮（大米、面食），1：>1次/天，2：1次/天，3：>1次/周，4：1次/周，5：≈1次/月，6：未吃',
            item99: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 细粮（大米、面食） 平均摄入量 1：＜1.5 两/天，2：≥1.5 两/天',
            item100: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 粗粮（五谷杂粮，包括小米、玉米、高粱等），1：>1次/天，2：1次/天，3：>1次/周，4：1次/周，5：≈1次/月，6：未吃',
            item101: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 粗粮（五谷杂粮，包括小米、玉米、高粱等） 平均摄入量 1：＜1.5 两/天，2：≥1.5 两/天',
            item102: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 新鲜水果，1：>1次/天，2：1次/天，3：>1次/周，4：1次/周，5：≈1次/月，6：未吃',
            item103: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 新鲜水果 平均摄入量 1：＜4 两/天，2： ≥4 两/天',
            item104: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 新鲜蔬菜，1：>1次/天，2：1次/天，3：>1次/周，4：1次/周，5：≈1次/月，6：未吃',
            item105: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 新鲜蔬菜 平均摄入量 1：＜7 两/天，2：≥7 两/天',
            item106: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 畜肉（猪、牛、羊肉等），1：>1次/天，2：1次/天，3：>1次/周，4：1次/周，5：≈1次/月，6：未吃',
            item107: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 畜肉（猪、牛、羊肉等） 平均摄入量 1：≤1 两/天，2：＞1 两/天',
            item108: [
            {required: false, message: '必填', trigger: 'blur'},
            {required: false, message: '必填', trigger: 'change'},
          ],//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 鱼/禽肉（鸡、鸭、鹅肉等），1：>1次/天，2：1次/天，3：>1次/周，4：1次/周，5：≈1次/月，6：未吃',
            item109: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 鱼/禽肉（鸡、鸭、鹅肉等） 平均摄入量 1：≤1 两/天，2：＞1 两/天',
            item110: [
            {required: false, message: '必填', trigger: 'blur'},
            {required: false, message: '必填', trigger: 'change'},
          ],//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 蛋类（鸡蛋、鸭蛋等），1：>1次/天，2：1次/天，3：>1次/周，4：1次/周，5：≈1次/月，6：未吃',
            item111: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 蛋类（鸡蛋、鸭蛋等） 平均摄入量 1：≤1 个/天，2：＞1 个/天',
            item112: [
            {required: false, message: '必填', trigger: 'blur'},
            {required: false, message: '必填', trigger: 'change'},
          ],//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 奶类（牛奶、羊奶），1：>1次/天，2：1次/天，3：>1次/周，4：1次/周，5：≈1次/月，6：未吃',
            item113: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 奶类（牛奶、羊奶） 平均摄入量 1：≤0.5 斤/天，2：＞0.5 斤/天',
            item114: [
            {required: false, message: '必填', trigger: 'blur'},
            {required: false, message: '必填', trigger: 'change'},
          ],//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 香肠／熏肉／熏鱼／咸鱼/腊肉，1：>1次/天，2：1次/天，3：>1次/周，4：1次/周，5：≈1次/月，6：未吃',
            item115: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 香肠／熏肉／熏鱼／咸鱼/腊肉 平均摄入量 1：≤1 两/天，2：＞1 两/天',
            item116: [
            {required: false, message: '必填', trigger: 'blur'},
            {required: false, message: '必填', trigger: 'change'},
          ],//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 腌制食品（酸菜、泡菜、咸菜等），1：>1次/天，2：1次/天，3：>1次/周，4：1次/周，5：≈1次/月，6：未吃',
            item117: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'在过去12个月中，对以下食物您的食用频率及平均摄入量如何? 腌制食品（酸菜、泡菜、咸菜等） 平均摄入量 1：≤1 两/天，2：＞1 两/天',
            item118: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您平时的饮食喜好习惯（包括饮茶、饮水） 冷热度：1：烫，2：热，3：温，4：凉',
            item119: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您平时的饮食喜好习惯 干稀度 1：干，2：适中，3：稀',
            item120: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您平时的饮食喜好习惯 口味 1：重盐，2：适中，3：清淡',
            item121: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您平时的饮食喜好习惯 油脂 1：较高，2：适中，3：较低',
            item122: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否经常饮茶（经常指平均每周至少3次，连续6个月以上）？  0：否，从不饮，1：是，目前仍经常饮，2：以前是，现在不经常饮',
            item123: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否经常参加体育锻炼（经常是指平均每周3次以上，每次超过30分钟）？0：否，1：是',
            item124: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'是否从事低强度活动，如：太极、瑜伽等',
            item125: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_count100, trigger: 'blur'},
              {validator: validatecontact_count100, trigger: 'change'},
          ],//'从事低强度活动，如：太极、瑜伽等 每周平均活动次数',
            item126: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_count1000, trigger: 'blur'},
              {validator: validatecontact_count1000, trigger: 'change'},
          ],//'从事低强度活动，如：太极、瑜伽等 每次活动时间(分钟)',
            item127: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'是否从事中等强度体力家务劳动 如：快走、慢跑、跳舞、乒乓球、家务（如扫地、擦玻璃、洗衣服、做饭、整理房间、拖地板等）、与儿童一起参与游戏或运动等',
            item128: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_count100, trigger: 'blur'},
              {validator: validatecontact_count100, trigger: 'change'},
          ],//'从事中等强度体力家务劳动 如：快走、慢跑、跳舞、乒乓球、家务（如扫地、擦玻璃、洗衣服、做饭、整理房间、拖地板等）、与儿童一起参与游戏或运动等 每周平均活动次数',
            item129: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_count1000, trigger: 'blur'},
              {validator: validatecontact_count1000, trigger: 'change'},
          ],//'从事中等强度体力家务劳动 如：快走、慢跑、跳舞、乒乓球、家务（如扫地、擦玻璃、洗衣服、做饭、整理房间、拖地板等）、与儿童一起参与游戏或运动等 每次活动时间(分钟)',
            item130: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},

          ],//'是否从事高强度活动，如：快跑、爬山、游泳、器械锻炼、球类运动（足球、排球、篮球、羽毛球等）、搬运重物等',
            item131: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_count100, trigger: 'blur'},
              {validator: validatecontact_count100, trigger: 'change'},
          ],//'从事高强度活动，如：快跑、爬山、游泳、器械锻炼、球类运动（足球、排球、篮球、羽毛球等）、搬运重物等 每周平均活动次数',
            item132: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_count1000, trigger: 'blur'},
              {validator: validatecontact_count1000, trigger: 'change'},
          ],//'从事高强度活动，如：快跑、爬山、游泳、器械锻炼、球类运动（足球、排球、篮球、羽毛球等）、搬运重物等 每次活动时间(分钟)',
            item133: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_count24, trigger: 'blur'},
              {validator: validatecontact_count24, trigger: 'change'},
          ],//'在过去12个月中，您每天平均坐着的时间（包括伏案工作、看手机、看电视等）（小时/天）',
            item134: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您近十年来的生活环境是否存在较严重空气污染（如长期在大城市生活则直接被认定有空气污染）？0：否，1：是',
            item135: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'近十年来，您的住房是否进行取暖？0：否，1：是',
            item136: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'主要取暖方式 1：集中暖气，2：用电，3：太阳能，4：天然气，5：烧煤，8：其他',
            item137: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_count20, trigger: 'blur'},
              {validator: validatecontact_count20, trigger: 'change'},
          ],//'其他主要取暖方式',
            item138: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'近十年来，您家的主要做饭燃料种类 1：天然气/液化气，2：用电，3：烧煤，8：其他',
            item139: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_count20, trigger: 'blur'},
              {validator: validatecontact_count20, trigger: 'change'},
          ],//'其他主要做饭燃料种类',
            item140: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'近十年来，您家做饭时住房内的油烟情况 1：无烟，2：少许，3：较多，4：很多',
            item141: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您家厨房采用什么排风设施 1：无，2：油烟机，3：换气扇。4：烟囱，5：其他',
            item142: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_count20, trigger: 'blur'},
              {validator: validatecontact_count20, trigger: 'change'},
          ],//'其他排风设施',
            item143: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'近些年您是否曾经受较大的精神创伤（亲人患重病或死亡、夫妇分居或离婚、重大财产损失、意外失业、重大意外身体伤害、暴力侵害等）0：否，1：是',
            item144: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'近些年您是否有较长一段时间内精神处于压抑状况（连续超过 6 个月）0：否，1：是',
            item145: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过慢性呼吸系统疾病？（经正规医疗机构明确诊断）0：否，1：是',
            item146: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'是否患有石棉肺 0：否，1：是',
            item147: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断石棉肺时年龄 (岁)',
            item148: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'是否患有儿童哮喘 0：否，1：是',
            item149: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断儿童哮喘时年龄 (岁)',
            item150: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'是否患有成人哮喘 0：否，1：是',
            item151: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断成人哮喘时年龄 (岁)',
            item152: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'是否患有支气管扩张 0：否，1：是',
            item153: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断支气管扩张时年龄 (岁)',
            item154: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'是否患有慢性支气管炎 0：否，1：是',
            item155: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断慢性支气管炎时年龄 (岁)',
            item156: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'是否患有慢性阻塞性肺病（COPD） 0：否，1：是',
            item157: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断慢性阻塞性肺病（COPD）时年龄 (岁)',
            item158: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'是否患有肺气肿 0：否，1：是',
            item159: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断肺气肿时年龄 (岁)',
            item160: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'是否患有弥漫性肺间质纤维化 0：否，1：是',
            item161: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断弥漫性肺间质纤维化时年龄 (岁)',
            item162: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'是否患有肺炎 0：否，1：是',
            item163: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断肺炎时年龄 (岁)',
            item164: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'是否患有结节病 0：否，1：是',
            item165: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断结节病时年龄 (岁)',
            item166: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'是否患有矽肺/尘肺 0：否，1：是',
            item167: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断矽肺/尘肺时年龄 (岁)',
            item168: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'是否患有肺结核 0：否，1：是',
            item169: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断肺结核时年龄 (岁)',
            item170: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'是否患有其他慢性呼吸系统疾病 0：否，1：是',
            item171: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_count20, trigger: 'blur'},
              {validator: validatecontact_count20, trigger: 'change'}

          ],//'其他慢性呼吸系统疾病',
            item172: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断其他慢性呼吸系统疾病时年龄 (岁)',
            item173: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过下消化系统疾病？（经正规医疗机构明确诊断）0：否，1：是',
            item174: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过慢性结肠炎 0：否，1：是',
            item175: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断慢性结肠炎时年龄 (岁)',
            item176: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过肠息肉 0：否，1：是',
            item177: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断肠息肉时年龄 (岁)',
            item178: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过慢性阑尾炎或阑尾切除史 0：否，1：是',
            item179: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断慢性阑尾炎或阑尾切除史时年龄 (岁)',
            item180: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过慢性腹泻 0：否，1：是',
            item181: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断慢性腹泻时年龄 (岁)',
            item182: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过慢性便秘 0：否，1：是',
            item183: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断慢性便秘时年龄 (岁)',
            item184: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过粘液和/或血便 0：否，1：是',
            item185: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断粘液和/或血便时年龄 (岁)',
            item186: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过其他下消化系统疾病 0：否，1：是',
            item187: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_count20, trigger: 'blur'},
              {validator: validatecontact_count20, trigger: 'change'}
          ],//'其他下消化系统疾病',
            item188: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断其他下消化系统疾病时年龄 (岁)',
            item189: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您现在是否存在腹部不适或其他肠道异常的症状？0：否，1：是',
            item190: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'肠道的疼痛或异常症状出现的时间？',
            item191: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'主要的症状 1：腹痛，2：排便异常（腹泻、便秘、大便不成形等），3：便血（肉眼可见），4：其他',
            item192: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_count20, trigger: 'blur'},
              {validator: validatecontact_count20, trigger: 'change'}
          ],//'其他腹部不适或其他肠道异常的症状',
            item193: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否曾经进行过粪便潜血试验（FOBT）检测 0：否，1：是',
            item194: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'粪便潜血试验（FOBT）检测结果 0：阴性，1：阳性，999：不清楚',
            item195: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过上消化系统疾病？（经正规医疗机构明确诊断）0：否，1：是',
            item196: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过反流性食管炎 0：否，1：是',
            item197: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断反流性食管炎时年龄 (岁)',
            item198: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过浅表性胃炎 0：否，1：是',
            item199: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断浅表性胃炎时年龄 (岁)',
            item200: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过萎缩性胃炎 0：否，1：是',
            item201: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断萎缩性胃炎时年龄 (岁)',
            item202: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过胃溃疡 0：否，1：是',
            item203: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断胃溃疡时年龄 (岁)',
            item204: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过十二指肠溃疡 0：否，1：是',
            item205: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断十二指肠溃疡时年龄 (岁)',
            item206: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过胃息肉病 0：否，1：是',
            item207: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断胃息肉病时年龄 (岁)',
            item208: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过残胃 0：否，1：是',
            item209: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断残胃时年龄 (岁)',
            item210: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过胃黏膜上皮内瘤变 0：否，1：是',
            item211: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断胃黏膜上皮内瘤变时年龄 (岁)',
            item212: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过胃肠上皮化生 0：否，1：是',
            item213: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断胃肠上皮化生时年龄 (岁)',
            item214: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过其他上消化系统疾病 0：否，1：是',
            item215: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_count20, trigger: 'blur'},
              {validator: validatecontact_count20, trigger: 'change'}
          ],//'其他上消化系统疾病',
            item216: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断其他上消化系统疾病时年龄 (岁)',
            item217: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过肝胆系统疾病？（经正规医疗机构明确诊断）0：否，1：是',
            item218: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过慢性乙型肝炎 0：否，1：是',
            item219: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断慢性乙型肝炎时年龄 (岁)',
            item220: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过慢性丙型肝炎 0：否，1：是',
            item221: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断慢性丙型肝炎时年龄 (岁)',
            item222: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过肝硬化 0：否，1：是',
            item223: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断肝硬化时年龄 (岁)',
            item224: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过血吸虫感染病史 0：否，1：是',
            item225: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断血吸虫感染病史时年龄 (岁)',
            item226: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过脂肪肝 0：否，1：是',
            item227: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断脂肪肝时年龄 (岁)',
            item228: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'脂肪肝程度 1：轻度，2：中度，3：重度，999：不清楚',
            item229: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过胆结石症 0：否，1：是',
            item230: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断胆结石症病时年龄 (岁)',
            item231: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'胆结石症类型（可多选） 1：肝内胆管结石，2：肝外胆管结石，3：胆囊结石，999：不清楚',
            item232: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过慢性胆囊炎或胆囊切除史 0：否，1：是',
            item233: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次慢性胆囊炎或胆囊切除史残胃时年龄 (岁)',
            item234: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过其他肝胆系统疾病 0：否，1：是',
            item235: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_count20, trigger: 'blur'},
              {validator: validatecontact_count20, trigger: 'change'}
          ],//'其他肝胆系统疾病',
            item236: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断其他肝胆系统疾病时年龄 (岁)',
            item237: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否进行过乙肝表面抗原（HBsAg）检测 0：否，1：是',
            item238: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'乙肝表面抗原（HBsAg）检测结果 0：阴性，1：阳性，999：不清楚',
            item239: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过心脑血管疾病疾病？（经正规医疗机构明确诊断）0：否，1：是',
            item240: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过高血压 0：否，1：是',
            item241: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断高血压时年龄 (岁)',
            item242: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过血脂异常/高血脂症 0：否，1：是',
            item243: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断血脂异常/高血脂症时年龄 (岁)',
            item244: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过冠心病 0：否，1：是',
            item245: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断冠心病时年龄 (岁)',
            item246: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过脑卒中/脑中风 0：否，1：是',
            item247: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断脑卒中/脑中风时年龄 (岁)',
            item248: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过糖尿病 0：否，1：是',
            item249: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'糖尿病类型 1：Ⅰ型，2：Ⅱ型，3：妊娠糖尿病，4：其他，999：不清楚',
            item250: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_count20, trigger: 'blur'},
              {validator: validatecontact_count20, trigger: 'change'}
          ],//'其他糖尿病',
            item251: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断糖尿病时年龄 (岁)',
            item252: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否患过良性乳腺疾病（经正规医疗机构明确诊断：乳腺增生、结节、导管扩张、纤维腺瘤、炎症等）（仅女性填写） 0：否，1：是',
            item253: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'首次诊断良性乳腺疾病时年龄 (岁)',
            item254: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您的血缘亲属中，是否有人曾患癌症？ 0：否，1：是',
            item255: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'是否为肺癌 0：否，1：是',
            item256List: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'患肺癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
            item257: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'是否为食管癌 0：否，1：是',
            item258List: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'患食管癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
            item259: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'是否为胃癌 0：否，1：是',
            item260List: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'患胃癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
            item261: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'是否为肝癌 0：否，1：是',
            item262List: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'患肝癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
            item263: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'是否为结直肠癌 0：否，1：是',
            item264List: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'患结直肠癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
            item265: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'是否为前列腺癌 0：否，1：是',
            item266List: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'患前列腺癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
            item267: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'是否为膀胱癌 0：否，1：是',
            item268List: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'患膀胱癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
            item269: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'是否为结鼻咽癌 0：否，1：是',
            item270List: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'患鼻咽癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
            item271: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'是否为乳腺癌 0：否，1：是',
            item272: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否有一级血缘亲属（母亲、亲姐妹）在50岁及以前曾患乳腺癌 1：是，2：否',
            item273List: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'患乳腺癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
            item274: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'是否为宫颈癌 0：否，1：是',
            item275List: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'患宫颈癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
            item276: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'是否为卵巢癌 0：否，1：是',
            item277List: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'患卵巢癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
            item278: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'是否为甲状腺癌 0：否，1：是',
            item279List: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'患甲状腺癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
            item280: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'是否为其他癌症（包括不清楚） 0：否，1：是',
            item281List: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'患其他癌症亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
            item282: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否正在或曾经规律服用药物（超过一年）0：否，1：是',
            item283: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'您的首次月经年龄(周岁)',
            item284: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您的月经周期是否规律？0：否，1：是',
            item285: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否已绝闭经？0：否，1：是',
            item286: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'停经年龄 （周岁）',
            item287: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否曾分娩（包括自然分娩和剖腹产）？0：否，1：是',
            item288: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_item3, trigger: 'blur'},
              {validator: validatecontact_item3, trigger: 'change'}
          ],//'初次生育年龄 （周岁）',
            item289: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否有哺乳史？0：否，1：是',
            item290: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: item290, trigger: 'blur'},
              {validator: item290, trigger: 'change'}
          ],//'累计哺乳多少个月（不足一月按一月计）',
            item291: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否曾进行女性生殖系统手术（子宫、卵巢和输卵管等部位的手术，包括剖腹产）？0：否，1：是',
            item292: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: validatecontact_count20, trigger: 'blur'},
              {validator: validatecontact_count20, trigger: 'change'}
          ],//'女性生殖系统手术 手术名称或手术部位',
            item293: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'您是否曾接受过激素替代治疗（雌激素或雌/孕激素联合治疗，给药途径包括口服、皮贴、涂抹霜剂或凝胶、经阴道使用的霜、片、栓、硅胶环等）?1：否，2：是，正在接受治疗，3：是，曾经接受治疗',
            scheme: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'治疗方案 1：只服用雌激素，2：联合服用雌/孕激素',
            researchSignature: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: contactRelationship1, trigger: 'blur'},
              {validator: contactRelationship1, trigger: 'change'}
          ],//'研究对象或委托人签字',
            researchDate: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'日期',
            clientRelationship: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: contactRelationship, trigger: 'blur'},
              {validator: contactRelationship, trigger: 'change'}
          ],//'委托人与研究对象关系',
            investigator: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
              {validator: contactRelationship1, trigger: 'blur'},
              {validator: contactRelationship1, trigger: 'change'}
          ],//'调查员姓名',
            investigationDate: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],//'调查日期',
          },
          job:[
            {
                value:'1',
                label:'石棉'
            },
            {
              value:'2',
              label:'烘烤'
            },
            {
              value:'3',
              label:'屠宰或肉类包装'
            },
            {
              value:'4',
              label:'石油/化工业'
            },
            {
              value:'5',
              label:'采矿：煤矿'
            },
            {
              value:'6',
              label:'采矿：矽矿'
            },
            {
              value:'7',
              label:'棉麻加工'
            },
            {
              value:'8',
              label:'垃圾回收'
            },
            {
              value:'9',
              label:'消防'
            },
            {
              value:'10',
              label:'面粉/饲料/粮食加工'
            },
            {
              value:'11',
              label:'钢铁铸造'
            },
            {
              value:'12',
              label:'涂装（油漆）'
            },
            {
              value:'13',
              label:'喷砂'
            },
            {
              value:'14',
              label:'焊接'
            },
            {
              value:'15',
              label:'建筑业'
            },
            {
              value:'16',
              label:'农药生产'
            },
            {
              value:'17',
              label:'厨师'
            },
            {
              value:'18',
              label:'橡胶/轮胎'
            },
          ],
          sport:[
            {
              value:1,
              label:'低强度活动',
              notice:'如：太极、瑜伽等'
            },
            {
              value:2,
              label:'中等强度活动',
              notice:'如：快走、慢跑、跳舞、乒乓球、家务（如扫地、擦玻璃、洗衣服、做饭、整理房间、拖地板等）、与儿童一起参与游戏或运动等'
            },
            {
              value:3,
              label:'高强度活动',
              notice:'如：快跑、爬山、游泳、器械锻炼、球类运动（足球、排球、篮球、羽毛球等）、搬运重物等'
            },

          ],
          disease:[
            {
              value:'1',
              label:'石棉肺'
            },
            {
              value:'2',
              label:'儿童哮喘'
            },
            {
              value:'3',
              label:'成人哮喘'
            },
            {
              value:'4',
              label:'支气管扩张'
            },
            {
              value:'5',
              label:'慢性支气管炎'
            },
            {
              value:'6',
              label:'慢性阻塞性肺病（COPD）'
            },
            {
              value:'7',
              label:'肺气肿'
            },
            {
              value:'8',
              label:'弥漫性肺间质纤维化'
            },
            {
              value:'9',
              label:'肺 炎'
            },
            {
              value:'10',
              label:'结节病'
            },
            {
              value:'11',
              label:'矽肺/尘肺'
            },
            {
              value:'12',
              label:'肺结核'
            },
            {
              value:'13',
              label:'其他'
            },
          ],
          digestive:[
            {
              value:'1',
              label:'慢性结肠炎'
            },
            {
              value:'2',
              label:'肠息肉'
            },
            {
              value:'3',
              label:'慢性阑尾炎或阑尾切除史'
            },
            {
              value:'4',
              label:'慢性腹泻*'
            },
            {
              value:'5',
              label:'慢性便秘**'
            },
            {
              value:'6',
              label:'粘液和/或血便'
            },
            {
              value:'7',
              label:'其他'
            },
          ],
          upDigestive:[
            {
              value:'1',
              label:'反流性食管炎'
            },
            {
              value:'2',
              label:'浅表性胃炎'
            },
            {
              value:'3',
              label:'萎缩性胃炎'
            },
            {
              value:'4',
              label:'胃溃疡'
            },
            {
              value:'5',
              label:'十二指肠溃疡'
            },
            {
              value:'6',
              label:'胃息肉病'
            },
            {
              value:'7',
              label:' 残胃'
            },
            {
              value:'8',
              label:'胃黏膜上皮内瘤变'
            },
            {
              value:'9',
              label:'胃肠上皮化生'
            },
            {
              value:'10',
              label:'其他'
            },
          ],
          gallbladder:[
            {
              value:'1',
              label:'慢性乙型肝炎'
            },
            {
              value:'2',
              label:'慢性丙型肝炎'
            },
            {
              value:'3',
              label:'肝硬化'
            },
            {
              value:'4',
              label:'血吸虫感染病史'
            },
            {
              value:'5',
              label:'脂肪肝'
            },
            {
              value:'6',
              label:'胆结石症'
            },
            {
              value:'7',
              label:' 慢性胆囊炎或胆囊切除史'
            },
            {
              value:'8',
              label:'其他'
            },
          ],
          brainwashing:[
            {
              value:'1',
              label:'高血压'
            },
            {
              value:'2',
              label:'血脂异常/高血脂症'
            },
            {
              value:'3',
              label:' 冠心病'
            },
            {
              value:'4',
              label:'脑卒中/脑中风'
            },
            {
              value:'5',
              label:'糖尿病'
            },
          ],
          cancer:[
            {
              value:'1',
              label:'肺癌'
            },
            {
              value:'2',
              label:'食管癌'
            },
            {
              value:'3',
              label:' 胃癌'
            },
            {
              value:'4',
              label:'肝癌'
            },
            {
              value:'5',
              label:'结直肠癌'
            },
            {
              value:'6',
              label:'前列腺癌'
            },
            {
              value:'7',
              label:' 膀胱癌'
            },
            {
              value:'8',
              label:'鼻咽癌'
            },
            {
              value:'9',
              label:'乳腺癌'
            },
            {
              value:'10',
              label:'宫颈癌'
            },
            {
              value:'11',
              label:'卵巢癌'
            },
            {
              value:'12',
              label:'甲状腺癌'
            },
            {
              value:'13',
              label:'其他（包括不清楚）'
            },
          ],
          relatives:[
            {
              value:'1',
              label:'1=母亲'
            },
            {
              value:'2',
              label:'2=父亲'
            },
            {
              value:'3',
              label:' 3=子女'
            },
            {
              value:'4',
              label:'4=姐妹'
            },
            {
              value:'5',
              label:'5=兄弟'
            },
            {
              value:'6',
              label:'6=祖父'
            },
            {
              value:'7',
              label:' 7=祖母'
            },
            {
              value:'8',
              label:'8=外祖父'
            },
            {
              value:'9',
              label:'9=外祖母'
            },
            {
              value:'10',
              label:'10=叔叔'
            },
            {
              value:'11',
              label:'11=姑姑'
            },
            {
              value:'12',
              label:'12=舅舅'
            },
            {
              value:'13',
              label:'13=姨妈'
            },
            {
              value:'14',
              label:'14=堂兄弟姐妹'
            },
            {
              value:'15',
              label:'15=表兄弟姐妹'
            },
            {
              value:'16',
              label:'16=其他'
            },
          ],
          drugSmallTypeList:[],
          drugTypeList:[
            {
              value:'1',
              label:'降压药',
              children:[
                {
                  value:'1',
                  label:'钙通道阻滞剂（CCB）'
                },
                {
                  value:'2',
                  label:'固定复方制剂'
                },
                {
                  value:'3',
                  label:'利尿剂'
                },
                {
                  value:'4',
                  label:'肾上腺素能受体阻滞剂'
                },
                {
                  value:'5',
                  label:'肾素抑制剂'
                },
                {
                  value:'6',
                  label:'血管紧张素Ⅱ受体拮抗剂（ARB）'
                },
                {
                  value:'7',
                  label:'血管紧张素转换酶抑制剂（ACE I）'
                },
                {
                  value:'8',
                  label:'中枢性常用降压药'
                },
              ]
            },
            {
              value:'2',
              label:'抗血小板药物',
              children:[
                {
                  value:'1',
                  label:'环氧化酶抑制剂'
                },
                {
                  value:'2',
                  label:'二磷酸腺苷受体抑制剂'
                },
                {
                  value:'3',
                  label:'磷酸二酯酶抑制剂'
                },
              ]
            },
            {
              value:'3',
              label:'中药',
              children:[
                {
                  value:'1',
                  label:'寒凝血瘀'
                },
                {
                  value:'2',
                  label:'气虚血瘀'
                },
                {
                  value:'3',
                  label:'气阴两虚'
                },
                {
                  value:'4',
                  label:'气滞血瘀'
                },
                {
                  value:'5',
                  label:'痰浊内阻'
                },
                {
                  value:'6',
                  label:'心肾阳虚'
                },
                {
                  value:'7',
                  label:'心肾阴虚'
                },
                {
                  value:'8',
                  label:'心血瘀阻'
                },
                {
                  value:'9',
                  label:'阳气虚衰'
                },
                {
                  value:'10',
                  label:'瘀热互结'
                },
              ]
            },
            {
              value:'4',
              label:'降糖药',
              children:[
                {
                  value:'1',
                  label:'DPP-4抑制剂'
                },
                {
                  value:'2',
                  label:'DPP-5抑制剂'
                },
                {
                  value:'3',
                  label:'DPP-6抑制剂'
                },
                {
                  value:'4',
                  label:'DPP-7抑制剂'
                },
                {
                  value:'5',
                  label:'DPP-8抑制剂'
                },
                {
                  value:'6',
                  label:'DPP-9抑制剂'
                },
                {
                  value:'7',
                  label:'SGLT2抑制剂'
                },
                {
                  value:'8',
                  label:'α-糖苷酶抑制剂'
                },
                {
                  value:'9',
                  label:'格列奈类药物'
                },
                {
                  value:'10',
                  label:'磺脲类药物'
                },
                {
                  value:'11',
                  label:'双胍类'
                },
                {
                  value:'12',
                  label:'胰岛素'
                },
                {
                  value:'13',
                  label:'胰高血糖素样肽-1受体激动剂（GLP-1激动剂）'
                },   {
                  value:'14',
                  label:'中成药'
                },
                {
                  value:'15',
                  label:'TZDs'
                },

              ]
            },
            {
              value:'5',
              label:'调脂药/降脂药',
              children:[
                {
                  value:'1',
                  label:'贝特类'
                },
                {
                  value:'2',
                  label:'胆固醇吸收抑制剂'
                },
                {
                  value:'3',
                  label:'胆酸螯合剂'
                },
                {
                  value:'4',
                  label:'高纯度鱼油制剂'
                },
                {
                  value:'5',
                  label:'普罗布考'
                },
                {
                  value:'6',
                  label:'其他调脂药'
                },
                {
                  value:'7',
                  label:'他汀类'
                },
                {
                  value:'8',
                  label:'烟酸类'
                },
              ]
            },
          ],
          hormone1:[
            {
                value:'1',
                label:'雌二醇'
            },
            {
              value:'2',
              label:'雌二醇地屈孕酮'
            },
            {
              value:'3',
              label:'炔雌醇环丙孕酮 '
            },
            {
              value:'4',
              label:'替勃龙'
            },
            {
              value:'5',
              label:'戊酸雌二醇环丙孕酮'
            },
            {
              value:'6',
              label:'其他'
            },
          ],
          hormone2:[
            {
              value:'1',
              label:'黄体酮'
            },
            {
              value:'2',
              label:'地屈孕酮'
            },
            {
              value:'3',
              label:'甲地孕酮'
            },
            {
              value:'4',
              label:'甲羟孕酮'
            },
            {
              value:'5',
              label:'烯丙雌醇'
            },
            {
              value:'6',
              label:'其他'
            },
          ]


        }
    },
    mounted(){
      this.$store.commit('LOGOUT_USER');
      let obj = this.checkPageAuth(this, "personalInformation_page", this.btnAuth);
      this.form.hosDrugHistoryList[0].drugTypeList = this.drugTypeList
      if (this.$route.query.type == 1) {
        this.getUserInfo()
        this.getUserFormInfo()
      }else if(this.$route.query.type == 2){
        this.getRiskFactorsInfo()
        this.disabledState = true
      }
    },
   methods:{
     //获取危险因素表单内容
     getRiskFactorsInfo(){
       $axios_http({
         url: "/person/info/queryPersonRiskFactorInfo",
         data: {
           perscrid: this.$route.query.id
         },
         vueObj: this
       }).then((res) => {
         this.rules = {}
         this.form = res.data.result
         this.form.researchDate = this.getDate(this.form.researchDate)
         this.form.investigationDate = this.getDate(this.form.investigationDate)
         this.form.item190 = this.getDate(this.form.item190)
         if(this.form.item231){
           this.form.item231 = this.form.item231.split(',')
           console.log(this.form.item231,1)

         }
         if(this.form.address[0]!=null){
             this.addressState = true
             this.form.address2=this.form.address[0]+this.form.address[1]+this.form.address[2]+this.form.address1
         }
         if (res.data.result.telephone) {
           this.form.phone_area = res.data.result.telephone.split('-')[0]
           this.form.phone_phone = res.data.result.telephone.split('-')[1]
         }
         if (res.data.result.contactTelephone) {
           this.form.telephone_area = res.data.result.contactTelephone.split('-')[0]
           this.form.telephone_phone = res.data.result.contactTelephone.split('-')[1]
         }
         this.form.smokeCheckList = []
         this.form.jobList = []
         this.form.sportList = []
         this.form.brainwashingList = []
         this.form.cancerList = []
         this.form.gallbladderList = []
         this.form.upDigestiveList = []
         this.form.digestiveList = []
         this.form.diseaseList = []
         //工作
         if(this.form.item19 == 1){
           this.form.jobList.push('1')
         }
         if(this.form.item22 == 1){
           this.form.jobList.push('2')
         }
         if(this.form.item25 == 1){
           this.form.jobList.push('3')
         }
         if(this.form.item28 == 1){
           this.form.jobList.push('4')
         }
         if(this.form.item31 == 1){
           this.form.jobList.push('5')
         }
         if(this.form.item34 == 1){
           this.form.jobList.push('6')
         }
         if(this.form.item37 == 1){
           this.form.jobList.push('7')
         }
         if(this.form.item40 == 1){
           this.form.jobList.push('8')
         }
         if(this.form.item43 == 1){
           this.form.jobList.push('9')
         }
         if(this.form.item46 == 1){
           this.form.jobList.push('10')
         }
         if(this.form.item49 == 1){
           this.form.jobList.push('11')
         }
         if(this.form.item52 == 1){
           this.form.jobList.push('12')
         }
         if(this.form.item55 == 1){
           this.form.jobList.push('13')
         }
         if(this.form.item58 == 1){
           this.form.jobList.push('14')
         }
         if(this.form.item61 == 1){
           this.form.jobList.push('15')
         }
         if(this.form.item64 == 1){
           this.form.jobList.push('16')
         }
         if(this.form.item67 == 1){
           this.form.jobList.push('17')
         }
         if(this.form.item70 == 1){
           this.form.jobList.push('18')
         }
         //运动
         if(this.form.item124 == 1){
           this.form.sportList.push(1)
         }
         if(this.form.item128 == 1){
           this.form.sportList.push(2)
         }
         if(this.form.item131 == 1){
           this.form.sportList.push(3)
         }

         //心脑血管疾病
         if(this.form.item240 == 1){
           this.form.brainwashingList.push('1')
         }
         if(this.form.item242 == 1){
           this.form.brainwashingList.push('2')
         }
         if(this.form.item244 == 1){
           this.form.brainwashingList.push('3')
         }
         if(this.form.item246 == 1){
           this.form.brainwashingList.push('4')
         }
         if(this.form.item248 == 1){
           this.form.brainwashingList.push('5')
         }
         // //癌症
         if(this.form.item255 == 1){
           this.form.cancerList.push('1')
         }
         if(this.form.item257 == 1){
           this.form.cancerList.push('2')
         }
         if(this.form.item259 == 1){
           this.form.cancerList.push('3')
         }
         if(this.form.item261 == 1){
           this.form.cancerList.push('4')
         }
         if(this.form.item263 == 1){
           this.form.cancerList.push('5')
         }
         if(this.form.item265 == 1){
           this.form.cancerList.push('6')
         }
         if(this.form.item267 == 1){
           this.form.cancerList.push('7')
         }
         if(this.form.item269 == 1){
           this.form.cancerList.push('8')
         }
         if(this.form.item271 == 1){
           this.form.cancerList.push('9')
         }
         if(this.form.item274 == 1){
           this.form.cancerList.push('10')
         }
         if(this.form.item276 == 1){
           this.form.cancerList.push('11')
         }
         if(this.form.item278 == 1){
           this.form.cancerList.push('12')
         }
         if(this.form.item280 == 1){
           this.form.cancerList.push('13')
         }
         // //肝胆系统疾病
         if(this.form.item218 == 1){
           this.form.gallbladderList.push('1')
         }
         if(this.form.item220 == 1){
           this.form.gallbladderList.push('2')
         }
         if(this.form.item222 == 1){
           this.form.gallbladderList.push('3')
         }
         if(this.form.item224 == 1){
           this.form.gallbladderList.push('4')
         }
         if(this.form.item226 == 1){
           this.form.gallbladderList.push('5')
         }
         if(this.form.item229 == 1){
           this.form.gallbladderList.push('6')
         }
         if(this.form.item232 == 1){
           this.form.gallbladderList.push('7')
         }
         if(this.form.item234 == 1){
           this.form.gallbladderList.push('8')
         }

         //上消化系统疾病
         if(this.form.item196 == 1){
           this.form.upDigestiveList.push('1')
         }
         if(this.form.item198 == 1){
           this.form.upDigestiveList.push('2')
         }
         if(this.form.item200 == 1){
           this.form.upDigestiveList.push('3')
         }
         if(this.form.item202 == 1){
           this.form.upDigestiveList.push('4')
         }
         if(this.form.item204 == 1){
           this.form.upDigestiveList.push('5')
         }
         if(this.form.item206 == 1){
           this.form.upDigestiveList.push('6')
         }
         if(this.form.item208 == 1){
           this.form.upDigestiveList.push('7')
         }
         if(this.form.item210 == 1){
           this.form.upDigestiveList.push('8')
         }
         if(this.form.item212 == 1){
           this.form.upDigestiveList.push('9')
         }
         if(this.form.item214 == 1){
           this.form.upDigestiveList.push('10')
         }
         //下消化系统疾病
         if(this.form.item174 == 1){
           this.form.digestiveList.push('1')
         }
         if(this.form.item176 == 1){
           this.form.digestiveList.push('2')
         }
         if(this.form.item178 == 1){
           this.form.digestiveList.push('3')
         }
         if(this.form.item180 == 1){
           this.form.digestiveList.push('4')
         }
         if(this.form.item182 == 1){
           this.form.digestiveList.push('5')
         }
         if(this.form.item184 == 1){
           this.form.digestiveList.push('6')
         }
         if(this.form.item186 == 1){
           this.form.digestiveList.push('7')
         }
         //下消化系统疾病
         if(this.form.item146 == 1){
           this.form.diseaseList.push('1')
         }
         if(this.form.item148 == 1){
           this.form.diseaseList.push('2')
         }
         if(this.form.item150 == 1){
           this.form.diseaseList.push('3')
         }
         if(this.form.item152 == 1){
           this.form.diseaseList.push('4')
         }
         if(this.form.item154 == 1){
           this.form.diseaseList.push('5')
         }
         if(this.form.item156 == 1){
           this.form.diseaseList.push('6')
         }
         if(this.form.item158 == 1){
           this.form.diseaseList.push('7')
         }
         if(this.form.item160 == 1){
           this.form.diseaseList.push('8')
         }
         if(this.form.item162 == 1){
           this.form.diseaseList.push('9')
         }
         if(this.form.item164 == 1){
           this.form.diseaseList.push('10')
         }
         if(this.form.item166 == 1){
           this.form.diseaseList.push('11')
         }
         if(this.form.item168 == 1){
           this.form.diseaseList.push('12')
         }
         if(this.form.item170 == 1){
           this.form.diseaseList.push('13')
         }
         if (res.data.result.smokeExposureSpouse == 1) {
           this.form.smokeCheckList.push(1)
         }
         if (res.data.result.smokeExposurePartner == 1) {
           this.form.smokeCheckList.push(2)
         }
         if (res.data.result.smokeExposureFamily == 1) {
           this.form.smokeCheckList.push(3)
         }
         if (res.data.result.smokeExposureColleague == 1) {
           this.form.smokeCheckList.push(4)
         }
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
         if(res.data.result.permanentAddress[0]!=null){
           this.addressState = true
           this.form.address2 = res.data.result.permanentAddress[0]+res.data.result.permanentAddress[1]+res.data.result.permanentAddress[2]+res.data.result.permanentDetailedAddress
           this.form.address = res.data.result.permanentAddress
           this.form.address1 = res.data.result.permanentDetailedAddress
         }
         if (res.data.result.telephone) {
           this.form.phone_area = res.data.result.telephone.split('-')[0]
           this.form.phone_phone = res.data.result.telephone.split('-')[1]
         }
         if (res.data.result.contactTelephone) {
           this.form.telephone_area = res.data.result.contactTelephone.split('-')[0]
           this.form.telephone_phone = res.data.result.contactTelephone.split('-')[1]
         }
       })
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
         this.form.smokeCheckList = []
         this.form.item73 = res.data.result.smokeStatus
         this.form.item74 = res.data.result.smokeBeginAge
         this.form.item75 = res.data.result.smokeMorningTime
         this.form.item76 = res.data.result.smokeMajorTobacco
         this.form.item77 = res.data.result.smokeOtherTobacco
         this.form.item78 = res.data.result.quitSmokeTime
         this.form.item79 = res.data.result.smokeTime
         this.form.item80 = res.data.result.smokeCountBranchDay
         this.form.item81 = res.data.result.smokeCountYear
         this.form.item82 = res.data.result.smokeExposure
         this.form.item83 = res.data.result.smokeExposureYear
         this.form.item87 = res.data.result.smokeExposureFamilyNumber
         this.form.item89 = res.data.result.smokeExposureColleagueNumber
         this.form.item90 = res.data.result.smokeExposurTime
         this.form.item91 = res.data.result.smokeExposurCountBranchDay
         this.form.item92 = res.data.result.smokeExposurCountYear

         if (res.data.result.smokeExposureSpouse == 1) {
           this.form.smokeCheckList.push(1)
         }
         if (res.data.result.smokeExposurePartner == 1) {
           this.form.smokeCheckList.push(2)
         }
         if (res.data.result.smokeExposureFamily == 1) {
           this.form.smokeCheckList.push(3)
         }
         if (res.data.result.smokeExposureColleague == 1) {
           this.form.smokeCheckList.push(4)
         }
       })
     },
     //提交表单
     submitForm(form) {
       this.$nextTick(function () {
         this.$refs[form].validate((valid, obj) => {
             console.log(this.form)
           if (!valid) {
               console.log(obj)
             this.$message({
               message: '您有必填项未填',
               type: 'error'
             });
             for (var item in obj) {
               if(item == 'address'){
                 this.$refs[item].$refs.input.focus()
                 return
               }
               if (this.$refs[item].focus) {
                 this.$refs[item].focus();
               } else {
                 this.$refs[item].$el.focus();
               }
               return
             }
           }

           if (valid) {
             if(this.form.item231){
               this.form.item231 = this.form.item231.join(',')
             }
             if(this.form.jobList.length>0){
               if(this.findItem(this.form.jobList,1)){
                 this.form.item19 = 1
               }
               if(this.findItem(this.form.jobList,2)){
                 this.form.item22 = 1
               }
               if(this.findItem(this.form.jobList,3)){
                 this.form.item25 = 1
               }
               if(this.findItem(this.form.jobList,4)){
                 this.form.item28 = 1
               }
               if(this.findItem(this.form.jobList,5)){
                 this.form.item31 = 1
               }
               if(this.findItem(this.form.jobList,6)){
                 this.form.item34 = 1
               }
               if(this.findItem(this.form.jobList,7)){
                 this.form.item37 = 1
               }
               if(this.findItem(this.form.jobList,8)){
                 this.form.item40 = 1
               }
               if(this.findItem(this.form.jobList,9)){
                 this.form.item43 = 1
               }
               if(this.findItem(this.form.jobList,10)){
                 this.form.item46 = 1
               }
               if(this.findItem(this.form.jobList,11)){
                 this.form.item49 = 1
               }
               if(this.findItem(this.form.jobList,12)){
                 this.form.item52 = 1
               }
               if(this.findItem(this.form.jobList,13)){
                 this.form.item55 = 1
               }
               if(this.findItem(this.form.jobList,14)){
                 this.form.item58 = 1
               }
               if(this.findItem(this.form.jobList,15)){
                 this.form.item61 = 1
               }
               if(this.findItem(this.form.jobList,16)){
                 this.form.item64 = 1
               }
               if(this.findItem(this.form.jobList,17)){
                 this.form.item67 = 1
               }
               if(this.findItem(this.form.jobList,18)){
                 this.form.item70 = 1
               }
             }
             //运动
             if(this.form.sportList.length>0){
               if(this.findItem(this.form.sportList,1)){
                 this.form.item124 = 1
               }
               if(this.findItem(this.form.sportList,2)){
                 this.form.item128 = 1
               }
               if(this.findItem(this.form.sportList,3)){
                 this.form.item131 = 1
               }
             }
             //心脑血管疾病
             if(this.form.brainwashingList.length>0){
               if(this.findItem(this.form.brainwashingList,1)){
                 this.form.item240 = 1
               }
               if(this.findItem(this.form.brainwashingList,2)){
                 this.form.item242 = 1
               }
               if(this.findItem(this.form.brainwashingList,3)){
                 this.form.item244 = 1
               }
               if(this.findItem(this.form.brainwashingList,4)){
                 this.form.item246 = 1
               }
               if(this.findItem(this.form.brainwashingList,5)){
                 this.form.item248 = 1
               }
             }
             //癌症
             if(this.form.cancerList.length>0){
               if(this.findItem(this.form.cancerList,1)){
                 this.form.item255 = 1
               }
               if(this.findItem(this.form.cancerList,2)){
                 this.form.item257 = 1
               }
               if(this.findItem(this.form.cancerList,3)){
                 this.form.item259 = 1
               }
               if(this.findItem(this.form.cancerList,4)){
                 this.form.item261 = 1
               }
               if(this.findItem(this.form.cancerList,5)){
                 this.form.item263 = 1
               }
               if(this.findItem(this.form.cancerList,6)){
                 this.form.item265 = 1
               }
               if(this.findItem(this.form.cancerList,7)){
                 this.form.item267 = 1
               }
               if(this.findItem(this.form.cancerList,8)){
                 this.form.item269 = 1
               }
               if(this.findItem(this.form.cancerList,9)){
                 this.form.item271 = 1
               }
               if(this.findItem(this.form.cancerList,10)){
                 this.form.item274 = 1
               }
               if(this.findItem(this.form.cancerList,11)){
                 this.form.item276 = 1
               }
               if(this.findItem(this.form.cancerList,12)){
                 this.form.item278 = 1
               }
               if(this.findItem(this.form.cancerList,13)){
                 this.form.item280 = 1
               }
             }
             //肝胆系统疾病
             if(this.form.gallbladderList.length>0){
               if(this.findItem(this.form.gallbladderList,1)){
                 this.form.item218 = 1
               }
               if(this.findItem(this.form.gallbladderList,2)){
                 this.form.item220 = 1
               }
               if(this.findItem(this.form.gallbladderList,3)){
                 this.form.item222 = 1
               }
               if(this.findItem(this.form.gallbladderList,4)){
                 this.form.item224 = 1
               }
               if(this.findItem(this.form.gallbladderList,5)){
                 this.form.item226 = 1
               }
               if(this.findItem(this.form.gallbladderList,6)){
                 this.form.item229 = 1
               }
               if(this.findItem(this.form.gallbladderList,7)){
                 this.form.item232 = 1
               }
               if(this.findItem(this.form.gallbladderList,8)){
                 this.form.item234 = 1
               }
             }
             //上消化系统疾病
             if(this.form.upDigestiveList.length>0){
               if(this.findItem(this.form.upDigestiveList,1)){
                 this.form.item196 = 1
               }
               if(this.findItem(this.form.upDigestiveList,2)){
                 this.form.item198 = 1
               }
               if(this.findItem(this.form.upDigestiveList,3)){
                 this.form.item200 = 1
               }
               if(this.findItem(this.form.upDigestiveList,4)){
                 this.form.item202 = 1
               }
               if(this.findItem(this.form.upDigestiveList,5)){
                 this.form.item204 = 1
               }
               if(this.findItem(this.form.upDigestiveList,6)){
                 this.form.item206 = 1
               }
               if(this.findItem(this.form.upDigestiveList,7)){
                 this.form.item208 = 1
               }
               if(this.findItem(this.form.upDigestiveList,8)){
                 this.form.item210 = 1
               }
               if(this.findItem(this.form.upDigestiveList,9)){
                 this.form.item212 = 1
               }
               if(this.findItem(this.form.upDigestiveList,10)){
                 this.form.item214 = 1
               }
             }
             //下消化系统疾病
             if(this.form.digestiveList.length>0){
               if(this.findItem(this.form.digestiveList,1)){
                 this.form.item174 = 1
               }
               if(this.findItem(this.form.digestiveList,2)){
                 this.form.item176 = 1
               }
               if(this.findItem(this.form.digestiveList,3)){
                 this.form.item178 = 1
               }
               if(this.findItem(this.form.digestiveList,4)){
                 this.form.item180 = 1
               }
               if(this.findItem(this.form.digestiveList,5)){
                 this.form.item182 = 1
               }
               if(this.findItem(this.form.digestiveList,6)){
                 this.form.item184 = 1
               }
               if(this.findItem(this.form.digestiveList,7)){
                 this.form.item186 = 1
               }
             }
             //慢性呼吸系统疾病
             if(this.form.diseaseList.length>0){
               if(this.findItem(this.form.diseaseList,1)){
                 this.form.item146 = 1
               }
               if(this.findItem(this.form.diseaseList,2)){
                 this.form.item148 = 1
               }
               if(this.findItem(this.form.diseaseList,3)){
                 this.form.item150 = 1
               }
               if(this.findItem(this.form.diseaseList,4)){
                 this.form.item152 = 1
               }
               if(this.findItem(this.form.diseaseList,5)){
                 this.form.item154 = 1
               }
               if(this.findItem(this.form.diseaseList,6)){
                 this.form.item156 = 1
               }
               if(this.findItem(this.form.diseaseList,7)){
                 this.form.item158 = 1
               }
               if(this.findItem(this.form.diseaseList,8)){
                 this.form.item160 = 1
               }
               if(this.findItem(this.form.diseaseList,9)){
                 this.form.item162 = 1
               }
               if(this.findItem(this.form.diseaseList,10)){
                 this.form.item164 = 1
               }
               if(this.findItem(this.form.diseaseList,11)){
                 this.form.item166 = 1
               }
               if(this.findItem(this.form.diseaseList,12)){
                 this.form.item168 = 1
               }
               if(this.findItem(this.form.diseaseList,13)){
                 this.form.item170 = 1
               }
               if(this.form.phone_area){
                   this.form.telephone = this.form.phone_area+'-'+this.form.phone_phone
               }
               if(this.form.phone_area){
                 this.form.contactTelephone = this.form.telephone_area+'-'+this.form.telephone_phone
               }

             }
             this.form.personScreenId = this.$route.query.id
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
     clearItem18(){
       if(this.form.item18 != 1){
           this.form.jobList = []
       }
       if(this.form.item18!=1 && this.form.item18!= 0){
           this.form.item18 = ''
       }
     },
     //清空选项
     clearItem(item,arr,count){
         if(this.form[item]!=count){
             for(let item in arr){
                 this.form[arr[item]] = ''
             }
         }
     },
     //判断不符合条件清空其他选项
     //type判断类型
     //item判断变量
     //flag
     //arr选项数组
     clear(type,item,flag,arr,count){
       if(type == 0){
         //只有一个选项
         this.clearRadio(item,1,1)
       }
       if(type == 1){
           //不是0或者1清空
         this.clearRadio(item,0,1)
       }
       if(type == 12){
         //不是0或者1或者2清空
         this.clearRadio(item,0,2)
       }
       if(type == 2){
         //1-2
         this.clearRadio(item,1,2)
       }
       if(type == 3){
         //1-3
         this.clearRadio(item,1,3)
       }
       if(type == 4){
         //1-4
         this.clearRadio(item,1,4)
       }
       if(type == 5){
         //1-5
         this.clearRadio(item,1,5)
       }
       if(type == 8){
         //1-7
         this.clearRadio(item,1,8)
       }
       if(type == 9){
         //1-9
         this.clearRadio(item,1,9)
       }
       if (type == 'marriage'){
         this.clearRadio('item4',1,7)
           if(this.form.item4 !=2 &&this.form.item4 !=3 &&this.form.item4 !=4 &&this.form.item4 !=5 &&this.form.item4 !=6){
             this.form.item5 =''
           }
       }
       if(type== 'item93'){
         this.clearRadio('item93',0,2)
       }
       if(type== 'item136'){
         if(this.form[item] != 1&&this.form[item] != 2&&this.form[item] != 3&&this.form[item] != 4&&this.form[item] != 5&&this.form[item] != 8){
             this.form[item] = ''
         }
         if(this.form[item]!= 8){
             this.form.item137 = ''
         }
       }
       if(type== 'item138'){
         if(this.form[item] != 1&&this.form[item] != 2&&this.form[item] != 3&&this.form[item] != 8){
           this.form[item] = ''
         }
         if(this.form[item]!= 8){
           this.form.item139 = ''
         }
       }
       if(type== 'item194'){
         if(this.form[item] != 0&&this.form[item] != 1&&this.form[item] != 999){
           this.form[item] = ''
         }
       }
       if(type== 'item293'){
         if(this.form[item] != 2&&this.form[item] != 3&&this.form[item] != 1){
           this.form[item] = ''
         }
         if(this.form[item] != 2&&this.form[item] != 3){
             this.form.scheme = ''
         }
       }
       if(type == 'vegetables'){
         this.clearRadio(item,1,6)
         if(this.form[item] != 1 &&this.form[item] != 2 &&this.form[item] != 3 &&this.form[item] != 4 &&this.form[item] != 5){
             this.form[arr[0]] = ''
         }
       }

       if(flag){
         this.clearItem(item,arr,count)
       }
     },
     //验证选项是否正确
     clearRadio(a,b,c){
         let flag = false
         if(/^\d{1}$/.test(this.form[a])){
           for(let i = b;i<c+1;i++){
             if(this.form[a] == i){
               flag = true
             }
           }
           if(!flag){
             this.form[a] = ''
           }
         }else {
             this.form[a] = ''
         }

     },
     getAddress(){
       console.log(this.form.address)
     },
     //查找数组中的某一项
     findItem(arr,count){
           for(let i =0;i<arr.length;i++){
               if(arr[i] == count){
                   return true
               }
           }
           return false
     },
     //是否必填
     returnTrueOrFalse(item){
         if(item !=1&&item !=2&&item !=3&&item !=4&&item !=5){
             return true
         }
         return false
     },
     //是否必填
     returnTrueOrFalse1(item){
       if(item ==1||item ==2||item ==3||item ==4||item ==5){
         return true
       }
       return false
     },
     //弹窗
     openDialog(item){
         this.relativesCheckList = this.form[item]
         this.dialogVisible = true
       this.relativesItem = item
     },
     addFormSure(){
       this.form[this.relativesItem] = this.relativesCheckList.sort(this.sort)
       this.dialogVisible = false
       this.relativesCheckList = []
     },
     sort(a,b){
       return a-b
     },
     //药物种类修改
     drugTypeChange(item,index){
         if(item.drugType){
             for(let i =0;i<this.drugTypeList.length;i++){
                 if(item.drugType == this.drugTypeList[i].label){
                   item.drugSmallTypeList = this.drugTypeList[i].children
                 }
             }

         }else {
           item.drugSmallTypeList = []
         }

     },
     addDrug(){
         this.form.hosDrugHistoryList.push(
           {
             drugType:'',
             drugSmallType:'',
             drugName:'',
             startAge:'',
             countTime:'',
             drugTypeList:this.drugTypeList,
             drugSmallTypeList:[]
           }
         )
     },
     addHormone(){
       if(this.form.scheme == 1){
         this.form.hosHormoneDrugsHistoryList.push(
           {
             drugName:'',
             drugNameOther:'',
             startAge:'',
             endTime:'',
             hormone:this.hormone1
           }
         )
       }else if(this.form.scheme == 2){
         this.form.hosHormoneDrugsHistoryList.push(
           {
             drugName:'',
             drugNameOther:'',
             startAge:'',
             endTime:'',
             hormone:this.hormone2
           }
         )
       }
     },
     delHormone(){
       this.form.hosHormoneDrugsHistoryList.pop()

     },
     delDrug(){
       this.form.hosDrugHistoryList.pop()
     },
     //查询药品名称
     querySearchAsync(queryString, cb) {
       this.restaurants = []
       for(let i = 0;i<this.form.hosDrugHistoryList.length;i++){
         if(queryString && queryString === this.form.hosDrugHistoryList[i].drugName){
           this.selectForm.bType = this.form.hosDrugHistoryList[i].drugType
           this.selectForm.cType = this.form.hosDrugHistoryList[i].drugSmallType
//           this.drugNameChange(this.form.hosDrugHistoryList[i].drugType,this.form.hosDrugHistoryList[i].drugSmallType)
//           this.selectForm.aType = this.form.hosDrugHistoryList[i].drugType
//           this.selectForm.cType = this.form.hosDrugHistoryList[i].drugSmallType
         }
       }
       this.selectForm.drugName = queryString
       $axios_http({
         url: "/system/queryDruglibrary",
         data: this.selectForm,
         vueObj: this
       }).then((res) => {
         if(res.data.result.length>0){
              for(let i=0;i<res.data.result.length; i++){
                this.restaurants.push({
                  value:res.data.result[i].productname,
                  bType:res.data.result[i].btype,
                  cType:res.data.result[i].ctype
                })
              }
          }
       })

         clearTimeout(this.timeout);
         this.timeout = setTimeout(() => {
           cb(this.restaurants);
         }, 3000 * Math.random());
     },
     handleSelect(x) {
         let a = []
        x.drugType = this.restaurants.filter(item =>item.value == x.drugName).map(item => item.bType)[0]
       x.drugSmallType = this.restaurants.filter(item =>item.value == x.drugName).map(item => item.cType)[0]
     },
     drugNameChange(value,value1){
         console.log(value,value1)
         for(let i = 0;i<this.drugTypeList.length;i++){
             if(value == this.drugTypeList[i].value){
               this.selectForm.aType = this.drugTypeList[i].label
               for(let j =0;j<this.drugTypeList[i].children.length;j++){
                   if(value1 == this.drugTypeList[i].children[j].value){
                     this.selectForm.cType = this.drugTypeList[i].children[j].label
                   }
               }
             }

         }
     },
     //服用年龄
     startAgeChange(item){
         if(item.startAge<this.form.age){
             item.countTime = this.form.age/1-item.startAge
         }
     },
     //治疗方案改变
     schemeChange(){
         if(this.form.scheme == 1){
             for(let i=0;i<this.form.hosHormoneDrugsHistoryList.length;i++){
               this.form.hosHormoneDrugsHistoryList[i].hormone = this.hormone1
             }
         }else if(this.form.scheme == 2){
           for(let i=0;i<this.form.hosHormoneDrugsHistoryList.length;i++){
             this.form.hosHormoneDrugsHistoryList[i].hormone = this.hormone2
           }
         }
     }

   },
   watch:{

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content-page{
    background: #fff;
    padding: 20px;
  }
  h3{
    text-align: center;
  }
  .form-content{
    padding:40px;
  }
  .form-title{
    font-weight:700;
    width:70%;
    margin:20px auto;
    font-size:14px;
  }
  .el-form-item{
   /*margin-bottom: 0px!important;*/
  }
  .title {
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
    margin-left: 45px;
    line-height:40px;
  }
  .weight-ul {
    float: left;
    margin-left:5px;
    margin-right:20px;
    list-style-type: none;
  }

  .weight-ul li {
    height: 40px;
    line-height: 40px;
  }

  .weight-ul-title {
    text-align: center;
  }
  .job{
    width:600px;
    margin-left: 20px;
  }
  .job .el-checkbox{
    margin-right: 30px;
    margin-left: 0px;
    width: 130px;
  }
  .raskFactors-table{
    margin-left:60px;
    margin-bottom: 20px;
  }
  .raskFactors-table td{
    border:1px solid #e5e5e5;
    padding:5px 20px;
    line-height:16px;
    height: 20px!important;
  }
  .raskFactors-table td:nth-child(1){
      width: 190px;
    }
  .raskFactors-table-tr td:nth-child(2){
    width: 190px;
  }
  .raskFactors-table-tr td:nth-child(3){
    width: 300px;
  }
  .raskFactors-table-title{
    text-align: center;
    background: #e5e5e5;
  }
  .item146-table-title{
    text-align: center;
    background: #e5e5e5;
  }
  .item98-table{
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .item98-table td{
    border:1px solid #e5e5e5;
    padding: 5px 20px;
  }
  .item98-table td ul{
    list-style-type: none;
  }
  .item98-table tr td:nth-child(2){
    text-align: center;
  }

  .item98-table-title{
    background: #e5e5e5;
  }
  .item98-table-title td:nth-child(1){
    width:120px;
  }
  .item98-table-title td:nth-child(2){
    width:300px;
  }
  .item98-table-title td:nth-child(3){
    width:120px;
  }
  .job p{
    font-size:14px;
    line-height:15px;
    padding-left:23px;
  }
  .disease{
    margin-left: 60px;
  }
  .dialogVisible{
    width:500px;
    margin:auto;
  }
  .item282-title{
    background: #e5e5e5;
    padding: 5px 10px;
  }
  .item282-table td{
    padding:5px 10px;
    border:1px solid #e5e5e5;
  }
  .item282-table .el-form-item{
    margin-bottom: 0px!important;
  }
  .addbtn{
    text-align: center;
  }
</style>
<style>
  .riskFactors .el-form-item__error{
    position: relative!important;
  }
  .raskFactors-table .el-form-item{
    margin-bottom: 0px !important;
  }
  .item98-table tr td .el-form-item__content{
    line-height: 20px!important;
  }
  .job .el-checkbox__label{
    font-size:16px!important;
  }
  .job .el-checkbox{
    margin-right:20px!important;
    width:160px!important;
  }
  .sport .el-form-item__error{
    position:absolute!important;
  }
  .dialogVisible .el-checkbox{
    margin-right: 20px!important;
    margin-left: 0px!important;
  }
  .dialogVisible .el-checkbox__label{
    width:100px;
  }
</style>
