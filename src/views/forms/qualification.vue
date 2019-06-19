<template>
  <div slot="right" class="content-page qulification" id="content" v-if="qualification_page">
    <div>
      <el-button type="normal" size="small" class='return-home' @click="goBack()" >返回</el-button>
      <!--<el-button @click="add()"></el-button>-->
    </div>
    <div v-if="disabledState">
      <el-button size="mini" class="print" @click="printContent('form-print')">打印</el-button>
    </div>
    <div id="form-print">
        <h3 style="text-align: center;">研究对象资格审核表</h3>

        <table class="form-print-table">
          <tr>
            <td colspan="8" class="form-print-table-title">基本信息</td>
          </tr>
          <tr>
            <td colspan="2">姓名</td>
            <td colspan="2">{{form.userName}}</td>
            <td colspan="2">身份证号</td>
            <td colspan="2">{{form.idCard}}</td>
          </tr>
          <tr>
            <td colspan="2">联系电话</td>
            <td colspan="2">{{form.phone}}</td>
            <td colspan="2">性别</td>
            <td colspan="2">{{form.sex | sex}}</td>
          </tr>
          <tr>
            <td colspan="2">出生日期</td>
            <td colspan="2">{{form.birth}}</td>
            <td colspan="2">实足年龄</td>
            <td colspan="2">{{form.age}}岁</td>
          </tr>
          <tr>
            <td colspan="7">1．您是否具有完全的民事行为能力？（请回答 0=否； 1=是）<br><span class="form-print-table-notice">（完全民事行为能力，是指公民能够通过自己的独立行为进行任何民事活动。年满18周岁且精神健康的公民是完全民事行为能力人。考虑到我国九年义务教育制度的现状，年满16周岁不满18周岁的公民，若以自己的劳动收入作为主要生活来源的，也视为完全民事行为能力人。）</span></td>
            <td class="form-print-table-okorno">{{form.havingFullCivilCapacity }}</td>
          </tr>
          <tr>
            <td colspan="7">2．您是否为本市常住户籍人口（居住时间≥5年以上）？（请回答 0=否； 1=是）<br><span class="form-print-table-notice">（常住人口，指全年经常在家或在家居住6个月以上，而且经济和生活与本户连成一体的人口。）</span></td>
            <td class="form-print-table-okorno">{{form.permanentPerson }}</td>
          </tr>
          <tr>
            <td colspan="8" class="form-print-table-title"> A. 主动吸烟情况</td>
          </tr>
          <tr>
            <td colspan="7">A1. 您是否吸烟？（ 0=否，从不吸； 1=是，目前仍在吸； 2=以前吸，目前已戒烟）<br><span class="form-print-table-notice">（每周吸一支以上并连续或累计6个月以上者定义为吸烟）</span></td>
            <td class="form-print-table-okorno">{{form.smokeStatus }}</td>
          </tr>
          <tr v-if="form.smokeStatus == 1 || form.smokeStatus == 2">
            <td colspan="7">A2. 从多少岁开始吸烟？</td>
            <td class="form-print-table-okorno">{{form.smokeBeginAge }} 岁</td>
          </tr>
          <tr v-if="form.smokeStatus == 1 || form.smokeStatus == 2">
            <td colspan="7">A3. 您曾经或现在早上醒来吸第一支烟的时间大约为（ 1. 不到5分钟； 2. 6-30分钟； 3. 31-60分钟； 4. 超过60分钟；）</td>
            <td class="form-print-table-okorno">{{form.smokeMorningTime }}</td>
          </tr>
          <tr v-if="form.smokeStatus == 1 || form.smokeStatus == 2">
            <td colspan="7">A4. 您主要吸下列哪一种烟草产品？（1. 机制卷烟；2. 手卷烟；3. 烟斗；4. 雪茄；5. 水烟；6. 其他；）</td>
            <td class="form-print-table-okorno">{{form.smokeMajorTobacco }}</td>
          </tr>
          <tr v-if="form.smokeMajorTobacco == 6">
            <td colspan="8">A4. 1 具体类型？<span class="underline">{{form.smokeOtherTobacco}}</span></td>
          </tr>
          <tr v-if="form.smokeStatus == 2">
            <td colspan="7">A5.这次戒烟已持续多少年？（不足1年按0.5年计）</td>
            <td class="form-print-table-okorno">{{form.quitSmokeTime }}</td>
          </tr>
          <tr v-if="form.smokeStatus == 1 || form.smokeStatus == 2">
            <td colspan="7">A6. 如果您仍在吸烟或曾吸烟，扣除戒烟年数，共吸烟多少年（不足1年按0.5年计）</td>
            <td class="form-print-table-okorno">{{form.smokeTime }} 年</td>
          </tr>
          <tr v-if="form.smokeStatus == 1 || form.smokeStatus == 2">
            <td colspan="7">A7. 如果您仍在吸烟或曾吸烟，平均每天吸烟多少支（1包=20支；1两烟叶≈50支卷烟）</td>
            <td class="form-print-table-okorno">{{form.smokeCountBranchDay }} 支</td>
          </tr>
          <tr v-if="form.smokeStatus == 1 || form.smokeStatus == 2">
            <td colspan="7">A8.吸烟包年数是多少？</td>
            <td class="form-print-table-okorno">{{form.smokeCountYear }} 包年</td>
          </tr>
          <tr>
            <td colspan="8" class="form-print-table-title">B. 被动吸烟情况</td>
          </tr>
          <tr>
            <td colspan="7">B1. 被动吸烟：同您一起生活的家人或者工作的同事是否吸烟（平均每周5天或以上）？（0. 否，跳转至C    1. 是）</td>
            <td class="form-print-table-okorno">{{form.smokeExposure }} </td>
          </tr>
          <tr v-if="form.smokeExposure == 1">
            <td colspan="7">B1.1 如果是，那么在有烟雾的室内环境中，您居住和/或工作了多少年（不足1年按0.5年计）？</td>
            <td class="form-print-table-okorno">{{form.smokeExposureYear }}</td>
          </tr>
          <tr v-if="form.smokeExposure == 1">
            <td colspan="8">B2. 吸烟者与您的关系(多选)
              <el-checkbox-group v-model="form.smokeCheckList" :disabled="disabledState">
                <el-checkbox :label="1" ref="smokeCheckList">配偶</el-checkbox>
                <el-checkbox :label="2">伴侣</el-checkbox>
                <el-checkbox :label="3">其它家庭成员
                  <span v-if="form.smokeCheckList.indexOf(3)>-1" style="display: inline-block;width: 180px;">
                              ，具体人数 <span>{{form.smokeExposureFamilyNumber}}</span></span>
                </el-checkbox>
                <el-checkbox :label="4">同一办公室同事
                  <span v-if="form.smokeCheckList.indexOf(4)>-1" style="display: inline-block;width: 180px;">
                              ，具体人数 <span>{{form.smokeExposureColleagueNumber}}人</span>
                            </span>
                </el-checkbox>
              </el-checkbox-group>
            </td>
          </tr>
          <!--<tr v-if="form.smokeExposure == 1">-->
            <!--<td colspan="7">B3. 与您共处时间最长的吸烟者，是从多少岁开始吸烟？</td>-->
            <!--<td class="form-print-table-okorno">{{form.smokeExposurBeginAge }} 岁</td>-->
          <!--</tr>-->
          <!--<tr v-if="form.smokeExposure == 1">-->
            <!--<td colspan="7">B4. 与您共处时间最长的吸烟者，近一年的吸烟频率？（1. 每天； 2. 不是每天； 3. 不吸烟； 4. 不知道；）</td>-->
            <!--<td class="form-print-table-okorno">{{form.smokeExposurFrequency }}</td>-->
          <!--</tr>-->
          <!--<tr v-if="form.smokeExposure == 1">-->
            <!--<td colspan="7">B5. 与您共处时间最长的吸烟者，主要吸哪种类型的烟？（1. 机制卷烟；2. 手卷烟；3. 烟斗；4. 雪茄；5. 水烟；6. 其他；） </td>-->
            <!--<td class="form-print-table-okorno">{{form.smokeExposurMajorTobacco }}</td>-->
          <!--</tr>-->
          <!--<tr v-if="form.smokeExposure == 1">-->
            <!--<td colspan="8">B5.1具体类型 <span class="underline">{{form.smokeExposurOtherTobacco}}</span></td>-->
          <!--</tr>-->
          <!--<tr v-if="form.smokeExposure == 1">-->
            <!--<td colspan="7">B6. 与您共处时间最长的吸烟者，如果目前已戒烟，这次戒烟已持续多少年？（不足1年按1年计）</td>-->
            <!--<td class="form-print-table-okorno">{{form.smokeExposurQuitTime }} 年</td>-->
          <!--</tr>-->
          <tr v-if="form.smokeExposure == 1">
            <td colspan="7">B3. 如果该吸烟者仍在吸烟或曾吸烟，扣除戒烟年数，共吸烟多少年（不足1年按1年计）</td>
            <td class="form-print-table-okorno">{{form.smokeExposurTime }} 年</td>
          </tr>
          <tr v-if="form.smokeExposure == 1">
            <td colspan="7">B4. 如果该吸烟者仍在吸烟或曾吸烟，平均每天吸烟多少支（1包=20支；1两烟叶≈50支卷烟）</td>
            <td class="form-print-table-okorno">{{form.smokeExposurCountBranchDay }} 支</td>
          </tr>
          <tr v-if="form.smokeExposure == 1">
            <td colspan="7">B5. 吸烟包年数是多少？</td>
            <td class="form-print-table-okorno">{{form.smokeExposurCountYear }} 包年</td>
          </tr>
          <tr>
            <td colspan="8" class="form-print-table-title">C. 您是否有如下情况（请回答 0=否 1=是）</td>
          </tr>
          <tr>
            <td colspan="7">C1. 您是否患有慢性阻塞性肺病（COPD）或弥漫性肺纤维化疾病？</td>
            <td class="form-print-table-okorno">{{form.sufferFromCopd }}</td>
          </tr>
          <tr>
            <td colspan="7">C2. 您从事的工作是否暴露于以下物质（至少≥1年）：石棉、氡、铍、铀、铬、镉、镍、硅、矽、柴油废气、煤烟和煤烟灰？</td>
            <td class="form-print-table-okorno">{{form.touchChemical }}</td>
          </tr>
          <tr>
            <td colspan="8" class="form-print-table-title">D. 其他因素 （请回答 0=否 1=是）</td>
          </tr>
          <tr>
            <td colspan="7">D1. 您的胸部或背部有任何金属植入物吗 (包括心脏支架、心脏起搏器)？</td>
            <td class="form-print-table-okorno">{{form.bodyImplants }}</td>
          </tr>
          <tr>
            <td colspan="7">D2. 您是否有在家进行氧疗？</td>
            <td class="form-print-table-okorno">{{form.oxygenTherapy }}</td>
          </tr>
          <tr>
            <td colspan="7">D3. 在过去五年中, 您是否因癌症接受治疗或被医生告知您患有癌症？(不包括皮肤基底细胞癌、子宫颈原位癌)</td>
            <td class="form-print-table-okorno">{{form.cancerStatus }}</td>
          </tr>
          <tr>
            <td colspan="8">D3.1请勾选所患癌症种类
              <el-checkbox-group v-model="form.cancerCheckList"  v-if="form.cancerStatus == 1">
                <el-checkbox :label="1"></el-checkbox>
                <el-checkbox :label="2">结直肠癌</el-checkbox>
                <el-checkbox :label="3">乳腺癌</el-checkbox>
                <el-checkbox :label="4">食管癌（贲门癌）</el-checkbox>
                <el-checkbox :label="5">前列腺癌</el-checkbox>
                <el-checkbox :label="6">宫颈癌</el-checkbox>
                <el-checkbox :label="7">胃癌</el-checkbox>
                <el-checkbox :label="6">膀胱癌</el-checkbox>
                <el-checkbox :label="7">卵巢癌</el-checkbox>
                <el-checkbox :label="6">肝癌</el-checkbox>
                <el-checkbox :label="7">鼻咽癌</el-checkbox>
                <el-checkbox :label="6">甲状腺癌</el-checkbox>
                <br>
                <el-checkbox :label="8">其他,请说明 <span class="underline">{{form.otherCancerDescribe}}</span></el-checkbox>
              </el-checkbox-group>
            </td>
          </tr>
          <tr>
            <td colspan="7">D4. 您过去5年内中是否有过结肠镜、纤维乙状结肠镜、气钡双对比造影、CT仿真结肠镜检查？</td>
            <td class="form-print-table-okorno">{{form.medicalExamination }}</td>
          </tr>
          <tr>
            <td colspan="7">D5. 您最近2年是否患有肺结核？</td>
            <td class="form-print-table-okorno">{{form.sufferFromTuberculosis }}</td>
          </tr>
          <tr>
            <td colspan="7">D6. 您是否手术切除过肺组织（包括全肺、肺叶、亚肺叶、肺段、楔形，不包括肺穿刺、肺活检）？</td>
            <td class="form-print-table-okorno">{{form.lobectomy}}</td>
          </tr>
          <tr>
            <td colspan="7">D7. 过去一年中您是否有过无明显原因的体重减轻超过5公斤或曾咳血？</td>
            <td class="form-print-table-okorno">{{form.weightLoss}}</td>
          </tr>
          <tr>
            <td colspan="7">D8. 您目前是否患有某些可引发生命危险的疾病，如严重的心脑血管疾病、严重肾病、肝硬化等？</td>
            <td class="form-print-table-okorno">{{form.triggerLifeDangerous}}</td>
          </tr>
          <tr>
            <td colspan="7">D9. 您在过去3个月内是否因感染肺炎或急性呼吸道感染而使用抗生素治疗？</td>
            <td class="form-print-table-okorno">{{form.useAntibiotics}}</td>
          </tr>
          <tr v-if="form.useAntibiotics == 1">
            <td colspan="7">D9.1 近2个月内是否还有症状（如咳嗽、咳痰、咳血或发热等）？</td>
            <td class="form-print-table-okorno">{{form.symptomExit}}</td>
          </tr>
          <tr>
            <td colspan="7">D10. 您是否存在身体或精神方面的问题而无法完成知情同意程序？</td>
            <td class="form-print-table-okorno">{{form.unCompleteAgreeForm}}</td>
          </tr>
          <tr>
            <td colspan="7">D11. 您是否在过去18个月内做过胸部CT检查？</td>
            <td class="form-print-table-okorno">{{form.ctExamination}}</td>
          </tr>
          <tr>
            <td colspan="7">D12. 您现在是否正在参与癌症预防或者筛查相关的研究（助您戒烟的研究除外）？</td>
            <td class="form-print-table-okorno">{{form.otherScreen}}</td>
          </tr>
          <tr v-if="form.otherScreen == 1">
            <td colspan="7">D12.1 您的研究负责人是否确定您可以参加本研究？</td>
            <td class="form-print-table-okorno">{{form.sureTakeScreen}}</td>
          </tr>
          <tr>
            <td colspan="7">D13. 仰卧时，您的手臂是否可以举过头顶？</td>
            <td class="form-print-table-okorno">{{form.handOverHead}}</td>
          </tr>
          <tr>
            <td colspan="7">D14. 您是否愿意提供生物样本（血液、体液、排泄物、组织标本等）进行检测？</td>
            <td class="form-print-table-okorno">{{form.provideSample}}</td>
          </tr>
          <tr>
            <td colspan="7">D15. 您是否愿意在正式进入研究前签署《附件一：知情同意书》</td>
            <td class="form-print-table-okorno">{{form.signInformedConsent}}</td>
          </tr>
          <tr>
            <td colspan="7">D16. 您是否愿意完整填写《表1.2个人信息记录表》《表1.3-危险因素与联系信息调查表》？</td>
            <td class="form-print-table-okorno">{{form.signSurveyForm}}</td>
          </tr>
          <tr>
            <td colspan="7">D17. 您是否愿意接受随访？</td>
            <td class="form-print-table-okorno">{{form.willingAcceptFollowup}}</td>
          </tr>
          <tr>
            <td colspan="2">调查员签名</td>
            <td colspan="2">{{form.surveyName}}</td>
            <td colspan="2">调查日期</td>
            <td colspan="2">{{form.surveyDate | entryTime}}</td>
          </tr>
        </table>
    </div>
    <div  >
      <div class="form-title">
        <h3>研究对象资格审核表</h3>
      </div>
      <div class="form-body">
        <el-form :model="form" :rules="formRules" ref="form" labelPosition="left" labelWidth="120px">
          <div class="formcon">
            <div class="title">
              基本信息
            </div>
            <div class="formcon-container">
              <el-row>
                <el-col :span="24">
                  <div class="grid-content">
                    <el-form-item :inline-message="true" label="姓名：" prop="userName">
                      <el-input v-model.trim="form.userName" placeholder="" ref="userName" size="small"
                                :disabled="disabledState" style="width: 220px;"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item :inline-message="true" label="身份证号：" prop="idCard">
                    <el-input v-model.trim="form.idCard" placeholder="" :disabled="disabledState" ref="idCard"
                              size="small"
                              style="width: 220px;"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item :inline-message="true" label="联系电话：" prop="phone">
                    <el-input v-model.trim="form.phone" placeholder="" :disabled="disabledState" ref="phone" size="small"
                              style="width: 220px;"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item :inline-message="true" label="性别：" required>
                    <el-radio-group v-model="form.sex" disabled>
                      <el-radio :label="1" ref="sex">男</el-radio>
                      <el-radio :label="2">女</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div>
                    <el-form-item :inline-message="true" label="出生日期：" required>
                      <el-date-picker
                        v-model="form.birth"
                        :disabled="disabledState"
                        type="date"
                        size="small"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        disabled
                        ref="birth"
                        :picker-options="pickerOptions1">
                      </el-date-picker>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item :inline-message="true" label="实足年龄：" required>
                      <el-input v-model.trim="form.age" placeholder="" ref="age" size="small" style="width: 80px;"
                                disabled></el-input>&nbsp;&nbsp;岁
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row class="formcon-row-bg-light">
                <el-col :sm="19" :lg="18" :xl="20">
                  <el-form-item label="1. 您是否具有完全的民事行为能力？（请回答 0=否；   1=是）" class="content-padding" labelWidth="100%"
                                required>

                  </el-form-item>
                  <div class="formcon-title-notice">
                    （完全民事行为能力，是指公民能够通过自己的独立行为进行任何民事活动。年满18周岁且精神健康的公民是完全民事行为能力人。考虑到我国九年义务教育制度的现状，年满16周岁不满18周岁的公民，若以自己的劳动收入作为主要生活来源的，也视为完全民事行为能力人。）
                  </div>
                </el-col>
                <el-col :sm="5" :lg="6" :xl="4">
                  <el-form-item prop="havingFullCivilCapacity" class="content-padding" labelWidth="20px"
                                :inline-message="true">
                    <el-input v-model.trim="form.havingFullCivilCapacity" auto-complete="off" size="small"
                              style="width: 80px;"
                              :disabled="disabledState" :maxlength="1"
                              class="smallInput" ref="havingFullCivilCapacity"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="formcon-row-bg">
                <el-col :sm="19" :lg="18" :xl="20">
                  <el-form-item label="2. 您是否为本市常住户籍人口（居住时间≥5年以上）？（请回答 0=否；   1=是）  " class="content-padding" labelWidth="100%"
                                required></el-form-item>
                  <div class="formcon-title-notice">（常住人口，指全年经常在家或在家居住6个月以上，而且经济和生活与本户连成一体的人口。）</div>
                </el-col>
                <el-col :sm="5" :lg="6" :xl="4">
                  <el-form-item prop="permanentPerson" class="content-padding" labelWidth="20px" :inline-message="true">
                    <el-input v-model.trim="form.permanentPerson" auto-complete="off" size="small" style="width: 80px;"
                              :disabled="disabledState"
                              class="smallInput" ref="permanentPerson"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="formcon">
            <div class="title">
              A. 主动吸烟情况
            </div>
            <div class="formcon-container1">
              <el-row>
                <el-col :sm="19" :lg="18" :xl="20">
                  <el-form-item label="A1. 您是否吸烟？（ 0=否，从不吸；    1=是，目前仍在吸；    2=以前吸，目前已戒烟）" class="content-padding"
                                labelWidth="100%"
                                required></el-form-item>
                  <div class="formcon-title-notice">（每周吸一支以上并连续或累计6个月以上者定义为吸烟） </div>
                </el-col>
                <el-col :sm="5" :lg="6" :xl="4">
                  <el-form-item prop="smokeStatus" class="content-padding" labelWidth="20px" :inline-message="true">
                    <el-input v-model.trim="form.smokeStatus" auto-complete="off" size="small" style="width: 80px;"
                              :disabled="disabledState" @change="smokeStatusChange('smokeStatus')"
                              class="smallInput" ref="smokeStatus"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <template v-if="form.smokeStatus == 1 || form.smokeStatus == 2">
                <el-row>
                  <el-col :sm="19" :lg="18" :xl="20">
                    <el-form-item label="A2. 从多少岁开始吸烟？" class="content-padding" labelWidth="100%"
                                  required></el-form-item>
                  </el-col>
                  <el-col :sm="5" :lg="6" :xl="4">
                    <el-form-item prop="smokeBeginAge" class="content-padding" labelWidth="20px" :inline-message="true">
                      <el-input v-model.trim="form.smokeBeginAge" auto-complete="off" size="small" style="width: 80px;"
                                :disabled="disabledState"
                                class="smallInput" ref="smokeBeginAge"></el-input>
                      岁
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :sm="19" :lg="18" :xl="20">
                    <el-form-item label="A3. 您曾经或现在早上醒来吸第一支烟的时间大约为（ 1. 不到5分钟； 2. 6-30分钟； 3. 31-60分钟； 4. 超过60分钟；） " class="content-padding"
                                  labelWidth="100%"
                                  required></el-form-item>
                  </el-col>
                  <el-col :sm="5" :lg="6" :xl="4">
                    <el-form-item prop="smokeMorningTime" class="content-padding" labelWidth="20px" :inline-message="true">
                      <el-input v-model.trim="form.smokeMorningTime" auto-complete="off" size="small" style="width: 80px;"
                                :disabled="disabledState"
                                class="smallInput" ref="smokeMorningTime"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :sm="19" :lg="18" :xl="20">
                    <el-form-item label="A4. 您主要吸下列哪一种烟草产品？（1. 机制卷烟；2. 手卷烟；3. 烟斗；4. 雪茄；5. 水烟；6. 其他；） "
                                  class="content-padding" labelWidth="100%"
                                  required></el-form-item>
                  </el-col>
                  <el-col :sm="5" :lg="6" :xl="4">
                    <el-form-item prop="smokeMajorTobacco" class="content-padding" labelWidth="20px"
                                  :inline-message="true">
                      <el-input v-model.trim="form.smokeMajorTobacco" auto-complete="off" size="small"
                                style="width: 80px;"
                                :disabled="disabledState"
                                class="smallInput" ref="smokeMajorTobacco"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="formcon-title-grade" v-if="form.smokeMajorTobacco == 6">
                  <el-col :sm="19" :lg="18" :xl="20">
                    <el-form-item label="A4. 1 具体类型？ " prop="smokeOtherTobacco" labelWidth="170px" >
                      <el-input v-model.trim="form.smokeOtherTobacco" auto-complete="off" size="small" placeHolder="请输入具体的烟草类型"
                                style="width: 200px;"
                                :disabled="disabledState"
                                class="" ref="smokeOtherTobacco"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row v-if="form.smokeStatus == 2">
                  <el-col :sm="19" :lg="18" :xl="20" >
                    <el-form-item label="A5.这次戒烟已持续多少年？（不足1年按0.5年计）" class="content-padding" labelWidth="100%"
                                  required></el-form-item>
                  </el-col>
                  <el-col :sm="5" :lg="6" :xl="4">
                    <el-form-item prop="quitSmokeTime" class="content-padding" labelWidth="20px" :inline-message="true">
                      <el-input v-model.trim="form.quitSmokeTime" auto-complete="off" size="small" style="width: 80px;"
                                :disabled="disabledState"
                                class="smallInput" ref="quitSmokeTime"></el-input>
                      年
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :sm="19" :lg="18" :xl="20">
                    <el-form-item label="A6. 如果您仍在吸烟或曾吸烟，扣除戒烟年数，共吸烟多少年（不足1年按0.5年计）" class="content-padding"
                                  labelWidth="100%"
                                  required></el-form-item>
                  </el-col>
                  <el-col :sm="5" :lg="6" :xl="4">
                    <el-form-item prop="smokeTime" class="content-padding" labelWidth="20px" :inline-message="true">
                      <el-input v-model.trim="form.smokeTime" auto-complete="off" size="small" style="width: 80px;"
                                :disabled="disabledState"
                                @blur="calCount('smokeTime','smokeCountBranchDay','smokeCountYear')"
                                class="smallInput" ref="smokeTime"></el-input>
                      年
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :sm="19" :lg="18" :xl="20">
                    <el-form-item label="A7. 如果您仍在吸烟或曾吸烟，平均每天吸烟多少支（1包=20支；1两烟叶≈50支卷烟） " class="content-padding"
                                  labelWidth="100%"
                                  required></el-form-item>
                  </el-col>
                  <el-col :sm="5" :lg="6" :xl="4">
                    <el-form-item prop="smokeCountBranchDay" class="content-padding" labelWidth="20px"
                                  :inline-message="true">
                      <el-input v-model.trim="form.smokeCountBranchDay" auto-complete="off" size="small"
                                style="width: 80px;"
                                :disabled="disabledState"
                                @blur="calCount('smokeTime','smokeCountBranchDay','smokeCountYear')"
                                class="smallInput" ref="smokeCountBranchDay"></el-input>
                      支
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :sm="19" :lg="18" :xl="20">
                    <el-form-item label="A8.吸烟包年数是多少？ " class="content-padding" labelWidth="100%"
                                  required></el-form-item>
                  </el-col>
                  <el-col :sm="5" :lg="6" :xl="4">
                    <el-form-item prop="smokeCountYear" class="content-padding" labelWidth="20px" :inline-message="true">
                      <el-input v-model.trim="form.smokeCountYear" auto-complete="off" size="small" style="width: 80px;"
                                disabled
                                class="smallInput" ref="smokeCountYear"></el-input>
                      包年
                    </el-form-item>
                  </el-col>
                </el-row>
              </template>
            </div>
          </div>
          <div class="formcon">
            <div class="title">
              B. 被动吸烟情况
            </div>
            <div class="formcon-container1">
              <el-row>
                <el-col :sm="19" :lg="18" :xl="20">
                  <el-form-item label="B1. 被动吸烟：同您一起生活的家人或者工作的同事是否吸烟（平均每周5天或以上）？（0. 否，跳转至C    1. 是）" class="content-padding"
                                labelWidth="100%"
                                required></el-form-item>
                </el-col>
                <el-col :sm="5" :lg="6" :xl="4">
                  <el-form-item prop="smokeExposure" class="content-padding" labelWidth="20px" :inline-message="true">
                    <el-input v-model.trim="form.smokeExposure" auto-complete="off" size="small" style="width: 80px;"
                              :disabled="disabledState"
                              class="smallInput" ref="smokeExposure"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="formcon-title-grade" v-if="form.smokeExposure == 1">
                <el-col :sm="19" :lg="18" :xl="20">
                  <el-form-item label="B1.1 如果是，那么在有烟雾的室内环境中，您居住和/或工作了多少年（不足1年按0.5年计） " prop="smokeExposureYear" labelWidth="700px" :inline-message="true">
                    <el-input v-model.trim="form.smokeExposureYear" auto-complete="off" size="small" placeHolder="请输入具体多少年"
                              style="width: 200px;"
                              :disabled="disabledState"
                              class="" ref="smokeExposureYear"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <template v-if="form.smokeExposure == 1">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="B2. 吸烟者与您的关系(多选)" class="content-padding" labelWidth="230px"
                                  prop="smokeCheckList" :inline-message="true">
                      <div>
                        <el-checkbox-group v-model="form.smokeCheckList" :disabled="disabledState">
                          <el-checkbox :label="1" ref="smokeCheckList">配偶</el-checkbox>
                          <el-checkbox :label="2">伴侣</el-checkbox>
                          <el-checkbox :label="3">其它家庭成员
                            <span v-if="form.smokeCheckList.indexOf(3)>-1" style="display: inline-block;width: 180px;">
                              ，具体人数
                               <el-form-item prop="smokeExposureFamilyNumber" class="content-padding" labelWidth="0"
                                             :inline-message="true" style="display: inline-block;">
                              <el-input v-model.trim="form.smokeExposureFamilyNumber" auto-complete="off" size="small"
                                        style="width: 80px;"
                                        :disabled="disabledState"
                                        class="smallInput" ref="smokeExposureFamilyNumber"></el-input>
                            </el-form-item>
                            </span>

                          </el-checkbox>
                          <el-checkbox :label="4">同一办公室同事
                            <span v-if="form.smokeCheckList.indexOf(4)>-1" style="display: inline-block;width: 180px;">
                              ，具体人数
                               <el-form-item prop="smokeExposureColleagueNumber" class="content-padding" labelWidth="0"
                                             :inline-message="true" style="display: inline-block;">
                              <el-input v-model.trim="form.smokeExposureColleagueNumber" auto-complete="off" size="small"
                                        style="width: 80px;"
                                        :disabled="disabledState"
                                        class="smallInput" ref="smokeExposureColleagueNumber"></el-input>
                            </el-form-item>
                            </span>
                          </el-checkbox>
                        </el-checkbox-group>
                      </div>
                    </el-form-item>
                    <div class="formcon-title-notice blue">请根据与您<u style="font-weight: 700;">共处时间最长的吸烟者</u>情况，填写下列问题：</div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :sm="19" :lg="18" :xl="20">
                    <el-form-item label="B3. 如果该吸烟者仍在吸烟或曾吸烟，扣除戒烟年数，共吸烟多少年（不足1年按0.5年计）" class="content-padding"
                                  labelWidth="100%"
                                  required></el-form-item>
                  </el-col>
                  <el-col :sm="5" :lg="6" :xl="4">
                    <el-form-item prop="smokeExposurTime" class="content-padding" labelWidth="20px"
                                  :inline-message="true">
                      <el-input v-model.trim="form.smokeExposurTime" auto-complete="off" size="small" style="width:80px;"
                                :disabled="disabledState"
                                @blur="calCount('smokeExposurTime','smokeExposurCountBranchDay','smokeExposurCountYear')"
                                class="smallInput" ref="smokeExposurTime"></el-input>
                      年
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :sm="19" :lg="18" :xl="20">
                    <el-form-item label="B4. 如果该吸烟者仍在吸烟或曾吸烟，平均每天吸烟多少支（1包=20支；1两烟叶≈50支卷烟） " class="content-padding"
                                  labelWidth="100%"
                                  required></el-form-item>
                  </el-col>
                  <el-col :sm="5" :lg="6" :xl="4">
                    <el-form-item prop="smokeExposurCountBranchDay" class="content-padding" labelWidth="20px"
                                  :inline-message="true">
                      <el-input v-model.trim="form.smokeExposurCountBranchDay" auto-complete="off" size="small"
                                style="width:80px;"
                                :disabled="disabledState"
                                @blur="calCount('smokeExposurTime','smokeExposurCountBranchDay','smokeExposurCountYear')"
                                class="smallInput" ref="smokeExposurCountBranchDay"></el-input>
                      支
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :sm="19" :lg="18" :xl="20">
                    <el-form-item label="B5. 吸烟包年数是多少？ " class="content-padding" labelWidth="100%"
                                  required></el-form-item>
                  </el-col>
                  <el-col :sm="5" :lg="6" :xl="4">
                    <el-form-item prop="smokeExposurCountYear" class="content-padding" labelWidth="20px"
                                  :inline-message="true">
                      <el-input v-model.trim="form.smokeExposurCountYear" auto-complete="off" size="small"
                                style="width:80px;" disabled
                                class="smallInput" ref="smokeExposurCountYear"></el-input>
                      包年
                    </el-form-item>
                  </el-col>
                </el-row>
              </template>
            </div>
          </div>
          <div class="formcon">
            <div class="title">
              C. 您是否有如下情况（请回答 0=否   1=是）
            </div>
            <div class="formcon-container1">
              <el-row>
                <el-col :sm="19" :lg="18" :xl="20">
                  <el-form-item label="C1. 您是否患有慢性阻塞性肺病（COPD）或弥漫性肺纤维化疾病？ " class="content-padding" labelWidth="100%"
                                required></el-form-item>
                </el-col>
                <el-col :sm="5" :lg="6" :xl="4">
                  <el-form-item prop="sufferFromCopd" class="content-padding" labelWidth="20px" :inline-message="true">
                    <el-input v-model.trim="form.sufferFromCopd" auto-complete="off" size="small" style="width: 80px;"
                              :disabled="disabledState"
                              class="smallInput" ref="sufferFromCopd"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :sm="19" :lg="18" :xl="20">
                  <el-form-item label="C2. 您从事的工作是否暴露于以下物质（至少≥1年）：石棉、氡、铍、铀、铬、镉、镍、硅、矽、柴油废气、煤烟和煤烟灰？ " class="content-padding"
                                labelWidth="100%"
                                required></el-form-item>
                </el-col>
                <el-col :sm="5" :lg="6" :xl="4">
                  <el-form-item prop="touchChemical" class="content-padding" labelWidth="20px" :inline-message="true">
                    <el-input v-model.trim="form.touchChemical" auto-complete="off" size="small" style="width: 80px;"
                              :disabled="disabledState"
                              class="smallInput" ref="touchChemical"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="formcon">
            <div class="title">
              D. 其他因素 （请回答 0=否   1=是）
            </div>
            <div class="formcon-container1">
              <el-row>
                <el-col :sm="19" :lg="18" :xl="20">
                  <el-form-item label="D1. 您的胸部或背部有任何金属植入物吗 (包括心脏支架、心脏起搏器)？ " class="content-padding" labelWidth="100%"
                                required></el-form-item>
                </el-col>
                <el-col :sm="5" :lg="6" :xl="4">
                  <el-form-item prop="bodyImplants" class="content-padding" labelWidth="20px" :inline-message="true">
                    <el-input v-model.trim="form.bodyImplants" auto-complete="off" size="small" style="width: 80px;"
                              :disabled="disabledState"
                              class="smallInput" ref="bodyImplants"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :sm="19" :lg="18" :xl="20">
                  <el-form-item label="D2. 您是否有在家进行氧疗？" class="content-padding" labelWidth="100%"
                                required></el-form-item>
                </el-col>
                <el-col :sm="5" :lg="6" :xl="4">
                  <el-form-item prop="oxygenTherapy" class="content-padding" labelWidth="20px" :inline-message="true">
                    <el-input v-model.trim="form.oxygenTherapy" auto-complete="off" size="small" style="width: 80px;"
                              :disabled="disabledState"
                              class="smallInput" ref="oxygenTherapy"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :sm="19" :lg="18" :xl="20">
                  <el-form-item label="D3. 在过去五年中, 您是否因癌症接受治疗或被医生告知您患有癌症？(不包括皮肤基底细胞癌、子宫颈原位癌)" class="content-padding"
                                labelWidth="100%"
                                required></el-form-item>
                </el-col>
                <el-col :sm="5" :lg="6" :xl="4">
                  <el-form-item prop="cancerStatus" class="content-padding" labelWidth="20px" :inline-message="true">
                    <el-input v-model.trim="form.cancerStatus" auto-complete="off" size="small" style="width: 80px;"
                              :disabled="disabledState"
                              class="smallInput" ref="cancerStatus"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="formcon-title-grade check" v-if="form.cancerStatus == 1">
                <el-col :span="24">
                  <el-form-item label="D3.1（若回答“是”）请勾选所患癌症种类（可多选）：" class="content-padding" labelWidth="100%"
                                required></el-form-item>
                  <div>
                    <el-form-item prop="cancerCheckList" class="content-padding" labelWidth="20px"
                                  :inline-message="true">
                      <el-checkbox-group v-model="form.cancerCheckList" :disabled="disabledState" >
                        <el-checkbox :label="1" style="margin-right: 20px;">肺癌</el-checkbox>
                        <el-checkbox :label="2">结(直)肠癌</el-checkbox>
                        <el-checkbox :label="3">乳腺癌</el-checkbox>
                        <el-checkbox :label="4">食管癌（贲门癌）</el-checkbox>
                        <el-checkbox :label="5">前列腺癌</el-checkbox>
                        <el-checkbox :label="6">宫颈癌</el-checkbox>
                        <el-checkbox :label="7">胃癌</el-checkbox>
                        <el-checkbox :label="8">膀胱癌</el-checkbox>
                        <el-checkbox :label="9">卵巢癌</el-checkbox>
                        <el-checkbox :label="10">肝癌</el-checkbox>
                        <el-checkbox :label="11">鼻咽癌</el-checkbox>
                        <el-checkbox :label="12">甲状腺癌</el-checkbox>
                        <el-checkbox :label="13">其他,请说明
                          <span v-if="form.cancerCheckList.indexOf(13)>-1" style="display: inline-block;width: 180px;">
                               <el-form-item prop="otherCancerDescribe" class="content-padding" labelWidth="0"
                                             :inline-message="true" style="display: inline-block;">
                              <el-input v-model.trim="form.otherCancerDescribe" auto-complete="off" size="small"
                                        style="width: 400px;" placeHolder="请输入癌症名称"
                                        :disabled="disabledState"
                                        class="smallInput" ref="otherCancerDescribe"></el-input>
                            </el-form-item>
                            </span>
                        </el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :sm="19" :lg="18" :xl="20">
                  <el-form-item label="D4. 您过去5年内中是否有过结肠镜、纤维乙状结肠镜、气钡双对比造影、CT仿真结肠镜检查？" class="content-padding"
                                labelWidth="100%"
                                required></el-form-item>
                </el-col>
                <el-col :sm="5" :lg="6" :xl="4">
                  <el-form-item prop="medicalExamination" class="content-padding" labelWidth="20px"
                                :inline-message="true">
                    <el-input v-model.trim="form.medicalExamination" auto-complete="off" size="small" style="width: 80px;"
                              :disabled="disabledState"
                              class="smallInput" ref="medicalExamination"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :sm="19" :lg="18" :xl="20">
                  <el-form-item label="D5. 您是否在过去18个月内做过胸部CT检查？" class="content-padding" labelWidth="100%"
                                required></el-form-item>
                </el-col>
                <el-col :sm="5" :lg="6" :xl="4">
                  <el-form-item prop="ctExamination" class="content-padding" labelWidth="20px" :inline-message="true">
                    <el-input v-model.trim="form.ctExamination" auto-complete="off" size="small" style="width: 80px;"
                              :disabled="disabledState"
                              class="smallInput" ref="ctExamination"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :sm="19" :lg="18" :xl="20">
                  <el-form-item label="D6. 您最近2年是否患有活动性肺结核？" class="content-padding" labelWidth="100%"
                                required></el-form-item>
                </el-col>
                <el-col :sm="5" :lg="6" :xl="4">
                  <el-form-item prop="sufferFromTuberculosis" class="content-padding" labelWidth="20px"
                                :inline-message="true">
                    <el-input v-model.trim="form.sufferFromTuberculosis" auto-complete="off" size="small"
                              style="width: 80px;"
                              :disabled="disabledState"
                              class="smallInput" ref="sufferFromTuberculosis"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :sm="19" :lg="18" :xl="20">
                  <el-form-item label="D7. 您是否手术切除过肺组织（包括全肺、肺叶、亚肺叶、肺段、楔形，不包括肺穿刺、肺活检）？" class="content-padding"
                                labelWidth="100%"
                                required></el-form-item>
                </el-col>
                <el-col :sm="5" :lg="6" :xl="4">
                  <el-form-item prop="lobectomy" class="content-padding" labelWidth="20px" :inline-message="true">
                    <el-input v-model.trim="form.lobectomy" auto-complete="off" size="small" style="width: 80px;"
                              :disabled="disabledState"
                              class="smallInput" ref="lobectomy"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :sm="19" :lg="18" :xl="20">
                  <el-form-item label="D8. 过去一年中您是否有过无明显原因的体重减轻超过5公斤或曾咳血？" class="content-padding" labelWidth="100%"
                                required></el-form-item>
                </el-col>
                <el-col :sm="5" :lg="6" :xl="4">
                  <el-form-item prop="weightLoss" class="content-padding" labelWidth="20px" :inline-message="true">
                    <el-input v-model.trim="form.weightLoss" auto-complete="off" size="small" style="width: 80px;"
                              :disabled="disabledState"
                              class="smallInput" ref="weightLoss"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :sm="19" :lg="18" :xl="20">
                  <el-form-item label="D9. 您目前是否患有某些可引发生命危险的疾病，如严重的心脑血管疾病、严重肾病、肝硬化等？" class="content-padding"
                                labelWidth="100%"
                                required></el-form-item>
                </el-col>
                <el-col :sm="5" :lg="6" :xl="4">
                  <el-form-item prop="triggerLifeDangerous" class="content-padding" labelWidth="20px"
                                :inline-message="true">
                    <el-input v-model.trim="form.triggerLifeDangerous" auto-complete="off" size="small"
                              style="width: 80px;"
                              :disabled="disabledState"
                              class="smallInput" ref="triggerLifeDangerous"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :sm="19" :lg="18" :xl="20">
                  <el-form-item label="D10. 您在过去3个月内是否因感染肺炎或急性呼吸道感染而使用抗生素治疗？" class="content-padding" labelWidth="100%"
                                required></el-form-item>
                </el-col>
                <el-col :sm="5" :lg="6" :xl="4">
                  <el-form-item prop="useAntibiotics" class="content-padding" labelWidth="20px" :inline-message="true">
                    <el-input v-model.trim="form.useAntibiotics" auto-complete="off" size="small" style="width: 80px;"
                              :disabled="disabledState"
                              class="smallInput" ref="useAntibiotics"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="form.useAntibiotics == 1">
                <el-col :sm="19" :lg="18" :xl="20">
                  <el-form-item label="D10.1 近2个月内是否还有症状（如咳嗽、咳痰、咳血或发热等）？" class="content-padding" labelWidth="100%"
                                required></el-form-item>
                </el-col>
                <el-col :sm="5" :lg="6" :xl="4">
                  <el-form-item prop="symptomExit" class="content-padding" labelWidth="20px" :inline-message="true">
                    <el-input v-model.trim="form.symptomExit" auto-complete="off" size="small" style="width: 80px;"
                              :disabled="disabledState"
                              class="smallInput" ref="symptomExit"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :sm="19" :lg="18" :xl="20">
                  <el-form-item label="D11. 您是否存在身体或精神方面的问题而无法完成知情同意程序？" class="content-padding" labelWidth="100%"
                                required></el-form-item>
                </el-col>
                <el-col :sm="5" :lg="6" :xl="4">
                  <el-form-item prop="unCompleteAgreeForm" class="content-padding" labelWidth="20px"
                                :inline-message="true">
                    <el-input v-model.trim="form.unCompleteAgreeForm" auto-complete="off" size="small"
                              style="width: 80px;"
                              :disabled="disabledState"
                              class="smallInput" ref="unCompleteAgreeForm"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :sm="19" :lg="18" :xl="20">
                  <el-form-item label="D12. 您现在是否正在参与癌症预防或者筛查相关的研究（助您戒烟的研究除外）？" class="content-padding" labelWidth="100%"
                                required></el-form-item>
                </el-col>
                <el-col :sm="5" :lg="6" :xl="4">
                  <el-form-item prop="otherScreen" class="content-padding" labelWidth="20px" :inline-message="true">
                    <el-input v-model.trim="form.otherScreen" auto-complete="off" size="small" style="width: 80px;"
                              :disabled="disabledState"  @blur="otherScreenCahange('otherScreen')"
                              class="smallInput" ref="otherScreen"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="form.otherScreen == 1">
                <el-col :sm="19" :lg="18" :xl="20">
                  <el-form-item label="D12.1 您的研究负责人是否确定您可以参加本研究？" class="content-padding" labelWidth="100%"
                                required></el-form-item>
                </el-col>
                <el-col :sm="5" :lg="6" :xl="4">
                  <el-form-item prop="sureTakeScreen" class="content-padding" labelWidth="20px" :inline-message="true">
                    <el-input v-model.trim="form.sureTakeScreen" auto-complete="off" size="small" style="width: 80px;"
                              :disabled="disabledState"
                              class="smallInput" ref="sureTakeScreen"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :sm="19" :lg="18" :xl="20">
                  <el-form-item label="D13. 仰卧时，您的手臂是否可以举过头顶？" class="content-padding" labelWidth="100%"
                                required></el-form-item>
                </el-col>
                <el-col :sm="5" :lg="6" :xl="4">
                  <el-form-item prop="handOverHead" class="content-padding" labelWidth="20px" :inline-message="true">
                    <el-input v-model.trim="form.handOverHead" auto-complete="off" size="small" style="width: 80px;"
                              :disabled="disabledState"
                              class="smallInput" ref="handOverHead"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :sm="19" :lg="18" :xl="20">
                  <el-form-item label="D14. 您是否愿意提供生物样本（血液、体液、排泄物、组织标本等）进行检测？" class="content-padding" labelWidth="100%"
                                required></el-form-item>
                </el-col>
                <el-col :sm="5" :lg="6" :xl="4">
                  <el-form-item prop="provideSample" class="content-padding" labelWidth="20px" :inline-message="true">
                    <el-input v-model.trim="form.provideSample" auto-complete="off" size="small" style="width: 80px;"
                              :disabled="disabledState"
                              class="smallInput" ref="provideSample"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :sm="19" :lg="18" :xl="20">
                  <el-form-item label="D15. 您是否愿意在正式进入研究前签署《附件一：知情同意书》" class="content-padding" labelWidth="100%"
                                required></el-form-item>
                </el-col>
                <el-col :sm="5" :lg="6" :xl="4">
                  <el-form-item prop="signInformedConsent" class="content-padding" labelWidth="20px"
                                :inline-message="true">
                    <el-input v-model.trim="form.signInformedConsent" auto-complete="off" size="small"
                              style="width: 80px;"
                              :disabled="disabledState"
                              class="smallInput" ref="signInformedConsent"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :sm="19" :lg="18" :xl="20">
                  <el-form-item label="D16. 您是否愿意完整填写《表1.2个人信息记录表》《表1.3-危险因素与联系信息调查表》？" class="content-padding"
                                labelWidth="100%"
                                required></el-form-item>
                </el-col>
                <el-col :sm="5" :lg="6" :xl="4">
                  <el-form-item prop="signSurveyForm" class="content-padding" labelWidth="20px" :inline-message="true">
                    <el-input v-model.trim="form.signSurveyForm" auto-complete="off" size="small" style="width: 80px;"
                              :disabled="disabledState"
                              class="smallInput" ref="signSurveyForm"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :sm="19" :lg="18" :xl="20">
                  <el-form-item label="D17. 您是否愿意完整接受社区人员后续的长期随访？" class="content-padding" labelWidth="100%"
                                required></el-form-item>
                </el-col>
                <el-col :sm="5" :lg="6" :xl="4">
                  <el-form-item prop="willingAcceptFollowup" class="content-padding" labelWidth="20px"
                                :inline-message="true">
                    <el-input v-model.trim="form.willingAcceptFollowup" auto-complete="off" size="small"
                              style="width: 80px;"
                              :disabled="disabledState"
                              class="smallInput" ref="willingAcceptFollowup"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                 <div style="text-align: center;font-weight: 700;line-height: 30px;">
                   承诺书
                 </div>
                 <div style="font-weight: 700;line-height: 30px;">
                   本人承诺：本人如实回答本问卷中所有问题，该问卷能真实反映本人基本资料、疾病史、家庭史和吸烟史等信息。
                 </div>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item :inline-message="true" label="研究对象或委托人签名：" prop="researchSignature" label-width="200px">
                    <el-input v-model.trim="form.researchSignature" ref="researchSignature" :disabled="disabledState"
                              size="small" style="width: 150px;"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :inline-message="true" label="日期：" prop="investigationDate" label-width="120px">
                    <el-date-picker
                      v-model="form.investigationDate"
                      :disabled="disabledState"
                      type="date"
                      size="small"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                      ref="investigationDate"
                      :picker-options="pickerOptions1">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="form.researchSignature !== form.userName">
                <el-col :span="24">
                  <el-form-item :inline-message="true" label="若为委托人签字，与研究对象的关系：" prop="clientRelationship" label-width="300px">
                    <el-input v-model.trim="form.clientRelationship" ref="clientRelationship" :disabled="disabledState"
                              size="small" style="width: 150px;"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item :inline-message="true" label="调查员签名：" prop="surveyName" label-width="200px">
                    <el-input v-model.trim="form.surveyName" ref="surveyName" :disabled="disabledState"
                              size="small" style="width: 150px;"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :inline-message="true" label="调查日期：" prop="surveyDate" label-width="120px">
                    <el-date-picker
                      v-model="form.surveyDate"
                      :disabled="disabledState"
                      type="date"
                      size="small"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                      ref="surveyDate"
                      :picker-options="pickerOptions1">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
      <div style="margin-top: 40px;text-align: center;" v-if="$route.query.type == 2">
        <el-button type="primary" @click="submitForm('form')" :loading="buttonDisabled">保存</el-button>
        <el-button @click="resetForm('form')">取消</el-button>
      </div>
    </div>
    <el-dialog
      title=""
      :visible.sync="submitDialog"
      width="30%"
      :close-on-click-modal="false"
      :show-close="false"
      center>
      <div v-if="subjectInsertState" class="submitDialog-form">
        <div class="submitDialog-title"><h2>符合筛选条件，进入项目</h2></div>
        <!--<p><span class="submitDialog-item-title">随机化/纳入日期:</span> <span>{{groupInfo.inGroupDate}}</span></p>-->
        <p class="submitDialog-item-title"><span>SID:</span> <span>{{groupInfo.sid}}</span></p>
        <p class="submitDialog-item-title"><span>随机化分组:</span>
          <span>{{groupInfo.group}}
          </span>
          <span v-if="groupInfo.group=='A'">组-每年CT加任意一年肠镜</span>
          <span v-if="groupInfo.group=='B'">组-隔年CT加每年FIT</span>
          <span v-if="groupInfo.group=='C'">组-每年FIT</span>
        </p>
        <p class="submitDialog-item-title">
          <el-checkbox v-model="checked" class="submitDialog-item-check">短信发送受试者</el-checkbox>
        </p>
      </div>
      <div v-else>
        <div class="submitDialog-title"><h3>对不起，您不符合筛选条件</h3></div>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="next()" v-if="subjectInsertState">去填写《个人信息表》</el-button>
      <el-button @click="returnHome()">返回首页</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Right',
    data () {
      var contactRelationship = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^[\u4e00-\u9fa5]{1,10}$/.test(value))) {
          callback(new Error('请输入1-10个汉字'))
        } else {
          callback();
        }
      };
      var validateIdCard = (rule, value, callback) => {
        if (value == " ") {
          callback(new Error('身份证号不能为空'));
        }
        //校验长度，类型
        else if (isCardNo(value) == false) {
          this.form.birth = ''
          this.form.age = ''
          callback(new Error('身份证号码不正确，请重新输入'));
        }
        //检查省份
        else if (checkProvince(value) == false) {
          this.form.birth = ''
          this.form.age = ''
          callback(new Error('身份证号码不正确，请重新输入'));
        }
        //校验生日
        else if (checkBirthday(value) == false) {
          this.form.birth = ''
          this.form.age = ''
          callback(new Error('身份证号码不正确，请重新输入'));
        }
        //检验位的检测
        else if (checkParity(value) == false) {
          this.form.birth = ''
          this.form.age = ''
          callback(new Error('身份证校验不通过,请重新输入'));
        } else if (value) {
          this.getBirthday1(value);
          this.getSex(value)
          callback();

          // $axios_http({
          //   url:'/base/hospital/personinfo/verify/idcard/'+this.insertForm.idCard,
          //   data: {},
          //   vueObj: this
          // }).then((res) => {
          //   this.insertForm.item1 = res.data.data
          //   if(res.data.statusCode == '860004'){
          //     callback(new Error('身份证号已存在'));
          //   }else if(res.data.statusCode == '860003') {
          //     callback(new Error('受试者年龄不符合纳入标准'));
          //   }else if(res.data.statusCode == '860030') {
          //     callback(new Error('受试者5年内参加过结肠镜筛查项目'));
          //   }else{
          //     this.getBirthday1(value);
          //     this.getSex(value);
          //     callback();
          //   }
          // })
        }
      };
      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('手机号不能为空'));
        } else if (!(/\d/.test(value))) {
          callback(new Error('手机号只能是数字'))
        } else if (value.length != 11) {
          callback(new Error('请输入合法的11位手机号'));
        } else {
          // $axios_http({
          //   url:'/base/hospital/personinfo/verify/phone/'+this.insertForm.phone,
          //   data: {},
          //   vueObj: this
          // }).then((res) => {
          //   if(res.data.statusCode == '860029'){
          //     callback(new Error('手机号已存在'));
          //   }else{
          //     callback();
          //   }
          // })
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
      var validateNumber300 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^[0-9]{1,3}$/.test(value))) {
          callback(new Error('只能是数字'))
        } else if(value > 300) {
          callback(new Error('最多300支'))
        }else{
          callback()
        }
      };
      var validateNumberage = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^[0-9]{1,3}$/.test(value))) {
          callback(new Error('只能是数字'))
        } else if(value > this.form.age) {
          callback(new Error('不能超过您的年龄'))
        }else{
          callback()
        }
      };
      var validateCount = (rule, value, callback) => {
        if (value .length>20) {
          callback(new Error('不大于20个汉字'));
        }  else {
          callback();
        }
      };
      var validateCount = (rule, value, callback) => {
        if (value .length>50) {
          callback(new Error('不大于50个字符'));
        }  else {
          callback();
        }
      };
      var validatesmokeBeginAge = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^[0-9]{1,3}$/.test(value))) {
          callback(new Error('只能是数字'))
        } else if(value >this.form.age) {
          callback(new Error('小于您的年龄'))
        }else{
          callback()
        }
      };
      var vcity = {
        11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
        21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏",
        33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南",
        42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆",
        51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃",
        63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
      };

//检查号码是否符合规范，包括长度，类型
      function isCardNo(card) {
        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
        var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
        if (reg.test(card) == false) {
          return false;
        }
        return true;
      }

//取身份证前两位,校验省份
      function checkProvince(card) {
        var province = card.substr(0, 2);
        if (vcity[province] == undefined) {
          return false;
        }
        return true;
      }

//检查生日是否正确
      function checkBirthday(card) {
        //debugger
        var len = card.length;
        //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
        if (len == '15') {
          var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
          var arr_data = card.match(re_fifteen);
          var year = arr_data[2];
          var month = arr_data[3];
          var day = arr_data[4];
          var birthday = new Date('19' + year + '/' + month + '/' + day);
          return verifyBirthday('19' + year, month, day, birthday);
        }
        //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
        if (len == '18') {
          var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
          var arr_data = card.match(re_eighteen);
          var year = arr_data[2];
          var month = arr_data[3];
          var day = arr_data[4];
          var birthday = new Date(year + '/' + month + '/' + day);
          return verifyBirthday(year, month, day, birthday);
        }
        return false;
      }

//校验日期
      function verifyBirthday(year, month, day, birthday) {
        var now = new Date();
        var now_year = now.getFullYear();
        //年月日是否合理
        if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
          //判断年份的范围（3岁到100岁之间)
          var time = now_year - year;
          if (time >= 1 && time <= 120) {
            return true;
          }
          return false;
        }
        return false;
      }

//校验位的检测
      function checkParity(card) {
        //15位转18位
        //debugger
        card = changeFivteenToEighteen(card);
        var len = card.length;
        if (len == '18') {
          var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
          var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
          var cardTemp = 0, i, valnum;
          for (i = 0; i < 17; i++) {
            cardTemp += card.substr(i, 1) * arrInt[i];
          }
          valnum = arrCh[cardTemp % 11];
          if (valnum == card.substr(17, 1)) {
            return true;
          }
          return false;
        }
        return false;
      }

//15位转18位身份证号
      function changeFivteenToEighteen(card) {
        if (card.length == '15') {
          var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
          var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
          var cardTemp = 0, i;
          card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
          for (i = 0; i < 17; i++) {
            cardTemp += card.substr(i, 1) * arrInt[i];
          }
          card += arrCh[cardTemp % 11];
          return card;
        }
        return card;
      };
      return {
        //可选大于今天的 日期
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        htmlTitle:'研究对象资格审核表',
        //权限判定
        qualification_page: false,
        btnAuth: {
          buttonRoleAdd: false,
        },
        submitDialog: false,
        //弹窗分组信息
        cancerCheckList: [],


        groupInfo: {},
        //是否符合筛选条件
        subjectInsertState: true,

        item1_1_show: false,
        item3_10_show: false,
        checked: true,
        disabledState: false,
        buttonDisabled:false,
        //表单
        form: {
          userName: '',
          idCard: '',
          phone: '',
          sex: '',
          birth: '',
          age: '',
          havingFullCivilCapacity: '',
          permanentPerson: '',
          smokeStatus: '',
          smokeBeginAge: '',
          smokeMorningTime: '',
          smokeMajorTobacco: '',
          smokeOtherTobacco: '',
          quitSmokeTime: '',
          smokeExposureYear:'',
          smokeTime: '',
          smokeCountBranchDay: '',
          smokeCountYear: '',
          smokeCountPackageDay: '',
          smokeCheckList: [],
          smokeExposureColleagueNumber: '',
          smokeExposureFamilyNumber: '',
          smokeExposure: null,
          smokeExposurBeginAge: '',
          smokeExposurFrequency: '',
          smokeExposurMajorTobacco: '',
          smokeExposurOtherTobacco: '',
          smokeExposurQuitTime: '',
          smokeExposurTime: '',
          smokeExposurCountBranchDay: '',
          smokeExposurCountYear: '',
          touchChemical: '',
          sufferFromCopd: '',
          cancerStatus: '',
          cancerCheckList: [],
          otherCancerDescribe: '',
          familyLung: '',
          bodyImplants: '',
          oxygenTherapy: '',
          colorectalStatus: '',
          medicalExamination: '',
          cancerTreatment: '',
          sufferFromTuberculosis: '',
          lobectomy: '',
          weightLoss: '',
          triggerLifeDangerous: '',
          useAntibiotics: '',
          symptomExit: '',
          unCompleteAgreeForm: '',
          ctExamination: '',
          sureTakeScreen: '',
          otherScreen: '',
          handOverHead: '',
          provideSample: '',
          signInformedConsent: '',
          signSurveyForm: '',
          willingAcceptFollowup: '',
          remark: '',
          surveyName: '',
          surveyDate: '',
          smokeExposureSpouse: 0,
          smokeExposurePartner: 0,
          smokeExposureFamily: 0,
          smokeExposureColleague: 0,
          lungCancer: 0,
          colorectalCancer: 0,
          esophagealCancer: 0,
          mammaryCancer: 0,
          prostaticCancer:0,
          cervicalCancer:0,
          bladderCancer:0,
          livercancer:0,
          nasopharyngealCancer:0,
          thyroidCancer:0,
          gastricCancer: 0,
          ovaryCancer: 0,
          liverCancer: 0,
          otherCancer: 0,
          researchSignature:'',
          investigationDate:'',
          clientRelationship:'',
        },
        form1:{"userName":"chenmo","idCard":"11010109307611","phone":"11111111111","sex":1,"birth":"1949-05-15","age":69,"havingFullCivilCapacity":"1","permanentPerson":"1","smokeStatus":"1","smokeBeginAge":"1","smokeMorningTime":"1","smokeMajorTobacco":"1","smokeOtherTobacco":"","quitSmokeTime":"","smokeExposureYear":"","smokeTime":"1","smokeCountBranchDay":"111","smokeCountYear":111,"smokeCountPackageDay":"","smokeCheckList":[],"smokeExposureColleagueNumber":"","smokeExposureFamilyNumber":"","smokeExposure":"0","smokeExposurBeginAge":"","smokeExposurFrequency":"","smokeExposurMajorTobacco":"","smokeExposurOtherTobacco":"","smokeExposurQuitTime":"","smokeExposurTime":"","smokeExposurCountBranchDay":"","smokeExposurCountYear":"","touchChemical":"1","sufferFromCopd":"1","cancerStatus":"0","cancerCheckList":[],"otherCancerDescribe":"","familyLung":"","bodyImplants":"0","oxygenTherapy":"0","colorectalStatus":"","medicalExamination":"0","cancerTreatment":"","sufferFromTuberculosis":"0","lobectomy":"0","weightLoss":"0","triggerLifeDangerous":"0","useAntibiotics":"0","symptomExit":"","unCompleteAgreeForm":"0","ctExamination":"0","sureTakeScreen":"","otherScreen":"0","handOverHead":"1","provideSample":"1","signInformedConsent":"1","signSurveyForm":"1","willingAcceptFollowup":"1","remark":"","surveyName":"1","surveyDate":"2018-09-19","smokeExposureSpouse":0,"smokeExposurePartner":0,"smokeExposureFamily":0,"smokeExposureColleague":0,"lungCancer":0,"colorectalCancer":0,"esophagealCancer":0,"mammaryCancer":0,"gastricCancer":0,"ovaryCancer":0,"liverCancer":0,"otherCancer":0},
        //表单验证规则
        formRules: {
          userName: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: contactRelationship, trigger: 'blur'}
          ],
          idCard: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validateIdCard, trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validatePhone, trigger: 'blur'}
          ],
//          sex: [
//            {required: true, message: '必填', trigger: 'change'}
//          ],
          havingFullCivilCapacity: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          smokeStatus: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          smokeBeginAge: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validatesmokeBeginAge, trigger: 'blur'}
          ],
          smokeExposureYear:[
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validateNumberage, trigger: 'blur'}
          ],
          smokeMorningTime: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          smokeMajorTobacco: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          smokeOtherTobacco: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validateCount, trigger: 'blur'}
          ],
          quitSmokeTime: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validateNumber, trigger: 'blur'}
          ],
          smokeTime: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validateNumber, trigger: 'blur'}
          ],
          smokeCheckList: [
            {required: true, message: '必填', trigger: 'change'}
          ],
          smokeCountBranchDay: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validateNumber300, trigger: 'blur'}
          ],
          smokeCountYear: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          smokeCountPackageDay: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validateNumber, trigger: 'blur'}
          ],
          smokeExposure: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          smokeExposurBeginAge: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validatesmokeBeginAge, trigger: 'blur'}
          ],
          smokeExposurFrequency: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          smokeExposurMajorTobacco: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          smokeExposurOtherTobacco: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          smokeExposurQuitTime: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validatesmokeBeginAge, trigger: 'blur'}
          ],
          smokeExposurTime: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validateNumberage, trigger: 'blur'}
          ],
          smokeExposurCountBranchDay: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validateNumber300, trigger: 'blur'}
          ],
          smokeExposurCountYear: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          touchChemical: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          sufferFromCopd: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          familyLung: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          bodyImplants: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          oxygenTherapy: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          cancerStatus: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          cancerCheckList: [
            {required: true, message: '必填', trigger: 'change'}
          ],
          otherCancerDescribe: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validateCount, trigger: 'blur'}
          ],
          colorectalStatus: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          medicalExamination: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          cancerTreatment: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          sufferFromTuberculosis: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          lobectomy: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          weightLoss: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          triggerLifeDangerous: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          useAntibiotics: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          item3_10: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          symptomExit: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          unCompleteAgreeForm: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          ctExamination: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          sureTakeScreen: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          handOverHead: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          provideSample: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          signInformedConsent: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          signSurveyForm: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          willingAcceptFollowup: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          permanentPerson: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          surveyName: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          surveyDate: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          otherScreen: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          researchSignature: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: contactRelationship, trigger: 'blur'}
          ],
          investigationDate: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          clientRelationship: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: contactRelationship, trigger: 'blur'}
          ],



        }
      }
    },
    mounted(){
      this.$store.commit('LOGOUT_USER');
      let obj = this.checkPageAuth(this, "qualification_page", this.btnAuth);
      if (this.$route.query.type == 1) {
        this.disabledState = true
        this.formRules = {}
        this.getUserFormInfo()
      } else {
        this.disabledState = false
      }
    },
    methods: {
      //查看个人信息表
      getUserFormInfo(){
        $axios_http({
          url: "/person/query/eligibility/idorperscrid",
          data: {
            perscrid: this.$route.query.id
          },
          vueObj: this
        }).then((res) => {
          this.form = res.data.result
          this.form.smokeCheckList = []
          this.form.cancerCheckList = []

          if (this.form.smokeExposureSpouse == 1) {
            this.form.smokeCheckList.push(1)
          }
          if (this.form.smokeExposurePartner == 1) {
            this.form.smokeCheckList.push(2)
          }
          if (this.form.smokeExposureFamily == 1) {
            this.form.smokeCheckList.push(3)
          }
          if (this.form.smokeExposureColleague == 1) {
            this.form.smokeCheckList.push(4)
          }
          if (this.form.lungCancer == 1) {
            this.form.cancerCheckList.push(1)
          }
          if (this.form.colorectalCancer == 1) {
            this.form.cancerCheckList.push(2)
          }
          if (this.form.mammaryCancer == 1) {
            this.form.cancerCheckList.push(3)
          }
          if (this.form.esophagealCancer == 1) {
            this.form.cancerCheckList.push(4)
          }
          if (this.form.prostaticCancer == 1) {
            this.form.cancerCheckList.push(5)
          }
          if (this.form.cervicalCancer == 1) {
            this.form.cancerCheckList.push(6)
          }
          if (this.form.gastricCancer == 1) {
            this.form.cancerCheckList.push(7)
          }
          if (this.form.bladderCancer == 1) {
            this.form.cancerCheckList.push(8)
          }
          if (this.form.ovaryCancer == 1) {
            this.form.cancerCheckList.push(9)
          }
          if (this.form.livercancer == 1) {
            this.form.cancerCheckList.push(10)
          }
          if (this.form.nasopharyngealCancer == 1) {
            this.form.cancerCheckList.push(11)
          }
          if (this.form.thyroidCancer == 1) {
            this.form.cancerCheckList.push(12)
          }
          if (this.form.otherCancer == 1) {
            this.form.cancerCheckList.push(13)
          }
          this.form.birth = this.getDate(this.form.birth)
          this.form.surveyDate = this.getDate(this.form.surveyDate)
          this.form.investigationDate = this.getDate(this.form.investigationDate)
        })
      },
      //格式化日期
      getDate(value){
        console.log(value)
        if (value != '' && value != null && value != undefined) {
          var value = new Date(value)
          return `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`
        }
        return value
      },
      calCount(a, b, c){
        if (this.form[a] != "" && this.form[b] != "") {
          console.log(this.form[a], this.form[b])
          this.form[c] = Number(this.form[a] * this.form[b]);
          let arr = [];
          if ((this.form[a] * this.form[b]).toString().indexOf('.') > -1) {
            arr = (this.form[a] * this.form[b]).toString().split('.');
            if (arr[1].length > 3) {
              this.form[b] = this.form[b].toFixed(3)
            }
          }
        } else {
          this.form[c] = '';
        }
      },
      getBirthday1(value) {
        var len = value.length;
        if (len == '15') {
          var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
          var arr_data = value.match(re_fifteen);
          var year = arr_data[2];
          var month = arr_data[3];
          var day = arr_data[4];
          var birthday = '19' + year + '/' + month + '/' + day;
          this.form.birth = birthday
        }
        if (len == '18') {
          var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
          var arr_data = value.match(re_eighteen);
          var year = arr_data[2];
          var month = arr_data[3];
          var day = arr_data[4];
          var birthday = year + '-' + month + '-' + day;
          this.form.birth = birthday
        }
      },
      getSex(value) {
        var len = value.length;
        if (len == '15') {
          var seqNo = value.substr(12, 3);
        }
        if (len == '18') {
          var seqNo = value.substr(14, 3);
        }
        if (seqNo % 2 == 0) {
          var sex = "2";
        }
        if (seqNo % 2 == 1) {
          var sex = "1";
        }
        this.form.sex = sex / 1
        var strBirthday = "";
        if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
        {
          strBirthday = value.substr(6, 4) + "/" + value.substr(10, 2) + "/" + value.substr(12, 2);
        }
        if (len == 15) {
          strBirthday = "19" + value.substr(6, 2) + "/" + value.substr(8, 2) + "/" + value.substr(10, 2);
        }
        //时间字符串里，必须是“/”
        var birthDate = new Date(strBirthday);
        var nowDateTime = new Date();
        var age = nowDateTime.getFullYear() - birthDate.getFullYear();
        //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
        if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
          age--;
        }
        this.form.age = age
        console.log(age)
      },
      add(){
        $axios_http({
          url: "/person/create/person",
          data: this.form1,
          vueObj: this
        }).then((res) => {
          $successMsg(this, "添加成功")
          this.subjectInsertState = true
          this.groupInfo = res.data.result
          this.submitDialog = true
        })
      },
      //下一步
      next(){
        this.$router.replace({
          name: 'personalInformation',
          query: {id: this.groupInfo.personInfoId, sid: this.groupInfo.sid}
        })
//        if(this.checked){
//          $axios_http({
//            url: "/base/hospital/person/sms/noticesid/"+this.groupInfo.sid,
//            data: {},
//            vueObj: this
//          }).then((res) => {
//            //显示操作成功浮动提示框
//            $successMsg(this, "发送成功")
//
//          })
//        }
      },
      print(element) {
        this.$print(this.$refs.print) // 使用
      },
      printContent:function(element){
        let subOutputRankPrint = document.getElementById(element);
        let newContent =subOutputRankPrint.innerHTML;
        let oldContent = document.body.innerHTML;
        document.body.innerHTML = newContent;
        window.print();
        window.location.reload();
        document.body.innerHTML = oldContent;
        return false;
      },
      //提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid, obj) => {
          if (valid) {
            if(this.form.userName === this.form.researchSignature){
              this.form.clientRelationship = ''
            }
            if (this.form.smokeCheckList.indexOf(1) > -1) {
              this.form.smokeExposureSpouse = 1
            }
            if (this.form.smokeCheckList.indexOf(2) > -1) {
              this.form.smokeExposurePartner = 1
            }
            if (this.form.smokeCheckList.indexOf(3) > -1) {
              this.form.smokeExposureFamily = 1
            }
            if (this.form.smokeCheckList.indexOf(4) > -1) {
              this.form.smokeExposureColleague = 1
            }
            if (this.form.cancerCheckList.indexOf(1) > -1) {
              this.form.lungCancer = 1
            }
            if (this.form.cancerCheckList.indexOf(2) > -1) {
              this.form.colorectalCancer = 1
            }
            if (this.form.cancerCheckList.indexOf(3) > -1) {
              this.form.mammaryCancer= 1
            }
            if (this.form.cancerCheckList.indexOf(4) > -1) {
              this.form.esophagealCancer = 1
            }
            if (this.form.cancerCheckList.indexOf(5) > -1) {
              this.form.prostaticCancer = 1
            }
            if (this.form.cancerCheckList.indexOf(6) > -1) {
              this.form.cervicalCancer = 1
            }
            if (this.form.cancerCheckList.indexOf(7) > -1) {
              this.form.gastricCancer = 1
            }
            if (this.form.cancerCheckList.indexOf(8) > -1) {
              this.form.bladderCancer = 1
            }
            if (this.form.cancerCheckList.indexOf(9) > -1) {
              this.form.ovaryCancer = 1
            }
            if (this.form.cancerCheckList.indexOf(10) > -1) {
              this.form.livercancer = 1
            }
            if (this.form.cancerCheckList.indexOf(11) > -1) {
              this.form.nasopharyngealCancer = 1
            }
            if (this.form.cancerCheckList.indexOf(12) > -1) {
              this.form.thyroidCancer = 1
            }
            if (this.form.cancerCheckList.indexOf(13) > -1) {
              this.form.otherCancer = 1
            }
            $axios_http({
              url: "/person/create/person",
              data: this.form,
              vueObj: this
            }).then((res) => {
              $successMsg(this, "添加成功")
              this.subjectInsertState = true
              this.groupInfo = res.data.result
              this.submitDialog = true
            })
          } else {
            console.log(obj,'2222')
            for (var item in obj) {
              if (item == 'address') {
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
            return
          }
        });
      },
      //返回首页
      returnHome(){
        this.$router.push({path: '/home/home'})
        this.submitDialog = false
      },

      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //监控
      watchInputVal(val, opt, a, b) {
        if (val != '0' && val != '1') {
          this.$nextTick(function () {
            opt[a][b] = ''
          })
        }
      },
      watchInputVal3(val, opt, a, b) {
          console.log(val)
        if (val != '0' && val != '1' && val != '2') {
          this.$nextTick(function () {
            opt[a][b] = ''
          })
        }
      },
      watchInputVal4(val, opt, a, b) {
        if (val != '3' && val != '1' && val != '2' && val != '4') {
          this.$nextTick(function () {
            opt[a][b] = ''
          })
        }
      },
      watchInputVal6(val, opt, a, b) {
        if (val != '3' && val != '1' && val != '2' && val != '4' && val != '5' && val != '6') {
          this.$nextTick(function () {
            opt[a][b] = ''
          })
        }
      },
      otherScreenCahange(value){
          if(this.form[value] != '0' && this.form[value] != '1'){
              this.form[value] = ''
          }
          if(this.form[value] != '1'){
              this.form.sureTakeScreen = ''
          }
      },
      smokeStatusChange(value){
        if(this.form[value] != '0' && this.form[value] != '1'&& this.form[value] != '2'){
          this.form[value] = ''
          this.form.smokeBeginAge = ''
          this.form.smokeFrequency = ''
          this.form.smokeMajorTobacco = ''
          this.form.smokeOtherTobacco = ''
          this.form.quitSmokeTime = ''
          this.form.smokeCountBranchDay = ''
          this.form.smokeCountYear = ''
          this.form.smokeTime = ''
          this.form.smokeMorningTime = ''
        }
      },
      smokeExposureChange(value){
        if(this.form[value] != '0' && this.form[value] != '1'){
          this.form[value] = ''
          this.form.smokeCheckList = []
          this.form.smokeExposureFamilyNumber = ''
          this.form.smokeExposureColleagueNumber = ''
          this.form.smokeExposurBeginAge = ''
          this.form.smokeExposurFrequency = ''
          this.form.smokeExposurMajorTobacco = ''
          this.form.smokeExposurOtherTobacco = ''
          this.form.smokeExposurQuitTime = ''
          this.form.smokeExposurTime = ''
          this.form.smokeExposurCountBranchDay = ''
          this.form.smokeExposurCountYear = ''
          this.form.smokeExposureYear = ''
        }
      }
    },
    watch: {
      'form.havingFullCivilCapacity': function (val, b) {
        this.watchInputVal(val, this, 'form', 'havingFullCivilCapacity')
      },
      'form.permanentPerson': function (val, b) {
        this.watchInputVal(val, this, 'form', 'permanentPerson')
      },
      'form.smokeStatus': function (val, b) {
        this.watchInputVal3(val, this, 'form', 'smokeStatus')
        if (val != 1 && val != 2 && val != 0) {
          this.form.smokeStatus = ''
        }else {
          this.form.smokeBeginAge = ''
          this.form.smokeFrequency = ''
          this.form.smokeMajorTobacco = ''
          this.form.smokeOtherTobacco = ''
          this.form.quitSmokeTime = ''
          this.form.smokeCountBranchDay = ''
          this.form.smokeCountYear = ''
          this.form.smokeTime = ''
        }
      },
      'form.smokeMorningTime': function (val, b) {
        this.watchInputVal4(val, this, 'form', 'smokeMorningTime')
      },
      'form.smokeMajorTobacco': function (val, b) {
        this.watchInputVal6(val, this, 'form', 'smokeMajorTobacco')
        if (val != 6) {
          this.form.smokeOtherTobacco = ''
        }
      },
      'form.smokeExposure': function (val, b) {

        if (val != 1 && val != 0) {
          this.form.smokeExposure = ''
        } else if (val == '' || val == null) {
          this.form.smokeCheckList = []
          this.form.smokeExposureFamilyNumber = ''
          this.form.smokeExposureColleagueNumber = ''
          this.form.smokeExposurBeginAge = ''
          this.form.smokeExposurFrequency = ''
          this.form.smokeExposurMajorTobacco = ''
          this.form.smokeExposurOtherTobacco = ''
          this.form.smokeExposurQuitTime = ''
          this.form.smokeExposurTime = ''
          this.form.smokeExposurCountBranchDay = ''
          this.form.smokeExposurCountYear = ''
        }
      },
      'form.smokeExposurFrequency': function (val, b) {
        this.watchInputVal4(val, this, 'form', 'smokeExposurFrequency')
      },
      'form.smokeExposurMajorTobacco': function (val, b) {
        this.watchInputVal6(val, this, 'form', 'smokeExposurMajorTobacco')
        if (val != 6) {
          this.form.smokeExposurOtherTobacco = ''
        }
      },
      'form.sufferFromCopd': function (val, b) {
        this.watchInputVal(val, this, 'form', 'sufferFromCopd')
      },
      'form.touchChemical': function (val, b) {
        this.watchInputVal(val, this, 'form', 'touchChemical')
      },
      'form.bodyImplants': function (val, b) {
        this.watchInputVal(val, this, 'form', 'bodyImplants')
      },
      'form.oxygenTherapy': function (val, b) {
        this.watchInputVal(val, this, 'form', 'oxygenTherapy')
      },
      'form.cancerStatus': function (val, b) {
        this.watchInputVal(val, this, 'form', 'cancerStatus')
      },
      'form.medicalExamination': function (val, b) {
        this.watchInputVal(val, this, 'form', 'medicalExamination')
      },
      'form.sufferFromTuberculosis': function (val, b) {
        this.watchInputVal(val, this, 'form', 'sufferFromTuberculosis')
      },
      'form.lobectomy': function (val, b) {
        this.watchInputVal(val, this, 'form', 'lobectomy')
      },
      'form.weightLoss': function (val, b) {
        this.watchInputVal(val, this, 'form', 'weightLoss')
      },
      'form.triggerLifeDangerous': function (val, b) {
        this.watchInputVal(val, this, 'form', 'triggerLifeDangerous')
      },
      'form.useAntibiotics': function (val, b) {
        this.watchInputVal(val, this, 'form', 'useAntibiotics')
        if (val != 1) {
          this.form.symptomExit = ''
        }
      },
      'form.symptomExit': function (val, b) {
        this.watchInputVal(val, this, 'form', 'symptomExit')
      },
      'form.unCompleteAgreeForm': function (val, b) {
        this.watchInputVal(val, this, 'form', 'unCompleteAgreeForm')
      },
      'form.ctExamination': function (val, b) {
        this.watchInputVal(val, this, 'form', 'ctExamination')
      },
//      'form.otherScreen': function (val, b) {
//        if (val != '0' && val != '1') {
//          this.form.otherScreen = ''
//        }
//        if (val != '1') {
//          this.form.sureTakeScreen = ''
//        }
//      },
      'form.sureTakeScreen': function (val, b) {
        this.watchInputVal(val, this, 'form', 'sureTakeScreen')
      },
      'form.handOverHead': function (val, b) {
        this.watchInputVal(val, this, 'form', 'handOverHead')
      },
      'form.provideSample': function (val, b) {
        this.watchInputVal(val, this, 'form', 'provideSample')
      },
      'form.signInformedConsent': function (val, b) {
        this.watchInputVal(val, this, 'form', 'signInformedConsent')
      },
      'form.signSurveyForm': function (val, b) {
        this.watchInputVal(val, this, 'form', 'signSurveyForm')
      },
      'form.willingAcceptFollowup': function (val, b) {
        this.watchInputVal(val, this, 'form', 'willingAcceptFollowup')
      },
      'form.smokeCheckList': function (val, b) {
        if (val.indexOf(3) == -1) {
          this.form.smokeExposureFamilyNumber = ''
        }
        if (val.indexOf(4) == -1) {
          this.form.smokeExposureColleagueNumber = ''
        }
      },
      'form.cancerCheckList': function (val, b) {
        if (val.indexOf(8) == -1) {
          this.form.otherCancerDescribe = ''
        }
      },
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .return-home {
    display: inline-block;
    text-align: center;
    margin: 20px;
    float: left;
  }

  .print {
    display: inline-block;
    text-align: center;
    float: right;
    margin: 20px;

  }
  #print{
    /*max-width: 1202px;*/
    /*margin:auto;*/
  }
  .content-page {
    padding-bottom: 30px;
    background: #fff;
  }

  .form-title {
    padding-top: 80px;
    text-align: center;
  }

  .form-body {
    max-width: 1200px;
    margin:40px auto;
    border:1px solid #e5e5e5;
  }

  .formcon {
    /*margin-top: 20px;*/
  }

  .formcon-container {
    padding: 0 40px 20px 40px;
  }

  .formcon-container1 {
    padding: 0 40px 20px 40px;
  }

  .formcon .title {
    width: 100%;
    background: #e5e5e5;
    height: 40px;
    font-weight: 700;
    line-height: 40px;
    text-align: center;
    margin-bottom: 20px;
  }

  .formcon-title-notice {
    font-size: 13px;
    padding-left: 10px;
  }

  .formcon-title-grade {
    padding-left: 40px !important;
  }

  .formcon-container1 .el-row:nth-child(odd) {
    background: #fff;
    padding: 10px 10px;
  }

  .formcon-container1 .el-row:nth-child(even) {
    background: #f9f9f9;
    margin-top: 10px;
    padding: 10px 10px;

  }

  .submitDialog-title {
    width: 100%;
    text-align: center;
  }

  .submitDialog-form {
    width: 300px;
    margin: 0 auto
  }

  .submitDialog-item-title {
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    margin-top: 20px;
  }

</style>
<style>
  .formcon-container1 .el-form-item {
    margin-bottom: 0px !important;
  }

  .content-page .el-radio__input.is-disabled.is-checked + span.el-radio__label {
    color: #000!important;
  }

  .content-page .el-radio__input.is-disabled.is-checked .el-radio__inner {
    background-color: #409EFF;
    border-color: #409EFF;
  }

  .content-page .el-radio__input.is-disabled.is-checked .el-radio__inner::after {
    background-color: #f5f7fa;
  }

  .content-page .is-disabled .el-input__inner {
    background: #fff;
    color: #000!important;
  }

  .content-page .el-checkbox__input.is-disabled.is-checked + span.el-checkbox__label {
    color: #409EFF;
    cursor: not-allowed;
  }

  .content-page .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background-color: #409EFF;
    border-color: #409EFF;
  }

  .content-page .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
    border-color: #fff;
  }
  .qulification .el-form-item{
    margin-bottom:0px!important;
  }
  .blue{
    color: #409EFF;
  }
</style>
<style>
  @media screen and (max-width:1030px) {
   .formcon-container{
     padding:20px!important;
   }
    .formcon-container1{
      padding:20px!important;
    }
  }
  .el-input__inner{
    color: #000!important;
  }
  .check .el-checkbox+.el-checkbox {
    margin-left:0px!important;
    margin-right:20px!important;
  }
</style>

