<template>
  <div class="content-page" v-if="lungCancerPathology_page">
    <div>
      <el-button size="mini" class="return-home" @click="goBack()">返 回</el-button>
    </div>
    <h3>表2.4‐病理检查结果表</h3>
    <el-row>
      <el-form :model="form" :rules="rules" ref="form" class="form-body">
        <div class="formcon">
          <div class="title">
            第一部分：参与者基本信息
          </div>
          <div class="form-body-content">
            <el-row>
              <el-col :span="12">
                <el-form-item label="SID:" class="formoneline" prop="sid" labelWidth="100px" :inline-message="true">
                  <el-input v-model.trim="form.sid" auto-complete="off" size="mini" style="width: 200px;"
                            class="smallInput" @blur="getInfo" :disabled="disabledShowState" ref="sid"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份证号:" class="formoneline" prop="idCard" labelWidth="100px" :inline-message="true">
                  <el-input v-model.trim="form.idCard" auto-complete="off" size="mini" style="width: 200px;"
                            ref="idCard"
                            class="smallInput" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名:" class="formhalfline" prop="userName" labelWidth="100px"
                              :inline-message="true">
                  <el-input v-model.trim="form.userName" auto-complete="off" size="mini" ref="userName"
                            style="width: 200px;"
                            class="smallInput" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别:" class="formhalfline" prop="sex" labelWidth="100px" :inline-message="true">
                  <el-input v-model.trim="form.sex" auto-complete="off" size="mini" style="width: 200px;" ref="sex"
                            class="smallInput" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="年龄:" class="formhalfline" prop="age" labelWidth="100px" :inline-message="true">
                  <el-input v-model.trim="form.age" auto-complete="off" size="mini" style="width: 200px;" ref="age"
                            class="smallInput" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="检查日期:" class="formoneline" prop="checkTime" labelWidth="100px"
                              :inline-message="true">
                  <el-date-picker
                    style="width: 200px;"
                    v-model="form.checkTime"
                    type="date"
                    ref="checkTime"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    size="small"
                    value-format="yyyy-MM-dd"
                    :disabled="disabledShowState"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="formcon">
          <div class="title">
            第二部分：病理报告上传
          </div>
          <div class="form-body-content">
            <el-row>
              <el-col :span="24">
                <!-- 多图片上传 -->
                <uploadMultipleSubmit  v-if="!disabledShowState" @getUrl='getUrl' @getUrl2='getUrl2'></uploadMultipleSubmit>
                <!-- 查看图片展示区 -->
                <seePics  :fileList="fileList" v-if="disabledShowState"></seePics>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="formcon">
          <!--<div class="title">-->
            <!--第三部分：病理结构信息-->
          <!--</div>-->
          <!--<div class="form-body-content">-->
            <!--<el-col :span="24">-->
              <!--<el-form-item label="1. 标本来源" prop="formData1">-->
                <!--<el-checkbox-group v-model="form.formData1" @change="formData1Change" :disabled="disabledShowState"><br>-->
                  <!--<el-checkbox label="1" ref="formData1">手术切除-肺切除术</el-checkbox>-->
                  <!--<br>-->
                  <!--<el-checkbox label="2">手术切除-肺叶切除术</el-checkbox>-->
                  <!--<br>-->
                  <!--<el-checkbox label="3">手术切除-楔型切除</el-checkbox>-->
                  <!--<br>-->
                  <!--<el-checkbox label="4">核芯针穿刺活检（CNB）</el-checkbox>-->
                  <!--<br>-->
                  <!--<el-checkbox label="5">细针穿刺活检（FNA）</el-checkbox>-->
                  <!--<br>-->
                  <!--<el-checkbox label="6">支气管镜活检</el-checkbox>-->
                  <!--<br>-->
                  <!--<el-checkbox label="7">其他，说明：-->
                    <!--<div class="form-inline zdysinput">-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="item0171" class="" :inline-message="true"-->
                                       <!--v-if="form.formData1.indexOf('7') > -1">-->
                            <!--<el-input v-model.trim="form.item0171" placeholder="" :disabled="disabledShowState"-->
                                      <!--size="small"-->
                                      <!--style="width: 200px;" ref="item0171"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="" class="" :inline-message="true"-->
                                       <!--v-if="form.formData1.indexOf('7') < 0">-->
                            <!--<el-input v-model.trim="form.item0171" placeholder="" disabled size="small"-->
                                      <!--style="width: 200px;" ref="item0171"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                    <!--</div>-->
                  <!--</el-checkbox>-->
                <!--</el-checkbox-group>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="24">-->
              <!--<el-form-item label="2. 固定样本方法" prop="formData2">-->
                <!--<el-checkbox-group v-model="form.formData2" @change="formData2Change" :disabled="disabledShowState"><br>-->
                  <!--<el-checkbox label="1" ref="formData2">福尔马林</el-checkbox>-->
                  <!--<br>-->
                  <!--<el-checkbox label="2">其他，说明：-->
                    <!--<div class="form-inline zdysinput">-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="item0221" class="" :inline-message="true"-->
                                       <!--v-if="form.formData2.indexOf('2') > -1">-->
                            <!--<el-input v-model.trim="form.item0221" placeholder="" :disabled="disabledShowState"-->
                                      <!--size="small"-->
                                      <!--style="width: 200px;" ref="item0221"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="" class="" :inline-message="true"-->
                                       <!--v-if="form.formData2.indexOf('2') < 0">-->
                            <!--<el-input v-model.trim="form.item0221" placeholder="" disabled size="small"-->
                                      <!--style="width: 200px;" ref="item0221"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                    <!--</div>-->
                  <!--</el-checkbox>-->
                <!--</el-checkbox-group>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="24">-->
              <!--<el-form-item label="3.	样本数量 (石蜡固定) " prop="formData3">-->
                <!--<el-checkbox-group v-model="form.formData3" @change="formData3Change" :disabled="disabledShowState"><br>-->
                  <!--<el-checkbox label="1" ref="formData3">总计</el-checkbox>-->
                  <!--<br>-->
                  <!--<el-checkbox label="2">肿瘤</el-checkbox>-->
                  <!--<br>-->
                  <!--<el-checkbox label="3">正常</el-checkbox>-->
                <!--</el-checkbox-group>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="24">-->
              <!--<el-form-item label="4. 样本来源" prop="formData4">-->
                <!--<el-checkbox-group v-model="form.formData4" @change="formData4Change" :disabled="disabledShowState"><br>-->
                  <!--<el-checkbox label="1" ref="formData4">组织切片（HE染色</el-checkbox>-->
                  <!--<br>-->
                  <!--<el-checkbox label="2">未染色</el-checkbox>-->
                  <!--<br>-->
                  <!--<el-checkbox label="3">石蜡固定</el-checkbox>-->
                  <!--<br>-->
                  <!--<el-checkbox label="4">免疫组织化学切片</el-checkbox>-->
                  <!--<br>-->
                  <!--<el-checkbox label="5">其他，说明：-->
                    <!--<div class="form-inline zdysinput">-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="item0551" class="" :inline-message="true"-->
                                       <!--v-if="form.formData4.indexOf('5') > -1">-->
                            <!--<el-input v-model.trim="form.item0451" placeholder="" :disabled="disabledShowState"-->
                                      <!--size="small"-->
                                      <!--style="width: 200px;" ref="item0221"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="" class="" :inline-message="true"-->
                                       <!--v-if="form.formData4.indexOf('5') < 0">-->
                            <!--<el-input v-model.trim="form.item0451" placeholder="" disabled size="small"-->
                                      <!--style="width: 200px;" ref="item0551"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                    <!--</div>-->
                  <!--</el-checkbox>-->
                <!--</el-checkbox-group>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="24">-->
              <!--<el-form-item label="5. 根据病理学报告选择此肿瘤最具代表性的特征" prop="formData5">-->
                <!--<el-checkbox-group v-model="form.formData5" @change="formData5Change" :disabled="disabledShowState"><br>-->
                  <!--<el-checkbox label="1" ref="formData5">主支气管 | 肺部及支气管恶性新生物</el-checkbox>-->
                  <!--<br>-->
                  <!--<el-checkbox label="2">上叶| 肺部及支气管恶性新生物—分为：左/右上叶</el-checkbox>-->
                  <!--<br>-->
                  <!--<el-checkbox label="3">中叶| 肺部及支气管恶性新生物</el-checkbox>-->
                  <!--<br>-->
                  <!--<el-checkbox label="4">下叶| 肺部及支气管恶性新生物—分为：左/右上叶</el-checkbox>-->
                  <!--<br>-->
                  <!--<el-checkbox label="5">肺部及支气管弥散性病变| 肺部及支气管恶性新生物</el-checkbox>-->
                  <!--<br>-->
                  <!--<el-checkbox label="6">未另作说明：| 肺部及支气管恶性新生物</el-checkbox>-->
                  <!--<br>-->
                  <!--<el-checkbox label="7">气管恶性肿瘤</el-checkbox>-->
                  <!--<br>-->
                  <!--<el-checkbox label="8">其他，说明：-->
                    <!--<div class="form-inline zdysinput">-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="item0581" class="" :inline-message="true"-->
                                       <!--v-if="form.formData5.indexOf('8') > -1">-->
                            <!--<el-input v-model.trim="form.item0581" placeholder="" :disabled="disabledShowState"-->
                                      <!--size="small"-->
                                      <!--style="width: 200px;" ref="item0581"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="" class="" :inline-message="true"-->
                                       <!--v-if="form.formData5.indexOf('8') < 0">-->
                            <!--<el-input v-model.trim="form.item0581" placeholder="" disabled size="small"-->
                                      <!--style="width: 200px;" ref="item0581"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                    <!--</div>-->
                  <!--</el-checkbox>-->
                  <!--<br>-->
                  <!--<el-checkbox label="9">不适用</el-checkbox>-->
                  <!--<br>-->
                <!--</el-checkbox-group>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="24">-->
              <!--<el-form-item label="6.	此组织来自身体哪侧？ (参考原始病理诊断部门出具的病理报告) " prop="formData6">-->
                <!--<el-checkbox-group v-model="form.formData6" @change="formData6Change" :disabled="disabledShowState"><br>-->
                  <!--<el-checkbox label="1" ref="formData6">RT = 右侧</el-checkbox>-->
                  <!--<br>-->
                  <!--<el-checkbox label="2">LT = 左侧</el-checkbox>-->
                  <!--<br>-->
                  <!--<el-checkbox label="3">NS = 未提供说明</el-checkbox>-->
                <!--</el-checkbox-group>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="24">-->
              <!--<el-form-item label="7.	请使用2015年的WHO肺部肿瘤分类法记录切片上的主要组织(附录 A) ">-->
                <!--<br>-->
                <!--<div class="form-inline zdysinput">-->
                  <!--<el-form-item label="" prop="item071" class="">-->
                    <!--<el-input v-model.trim="form.item071" placeholder="" size="small" style="width: 100px;"-->
                              <!--ref="item071"></el-input>-->
                  <!--</el-form-item>-->
                <!--</div>-->
                <!--<span style="font-size: 20px;">/</span>-->
                <!--<div class="form-inline zdysinput">-->
                  <!--<el-form-item label="" prop="item072" class="" style="width: 200px;">-->
                    <!--<el-input v-model.trim="form.item072" placeholder="" size="small" style="width: 50px;"-->
                              <!--ref="item072"></el-input>-->
                    <!--<el-popover-->
                      <!--placement="right"-->
                      <!--width="1000"-->
                      <!--trigger="click">-->
                      <!--<div style="height: 600px;overflow-y:auto">-->
                        <!--<appendix></appendix>-->
                      <!--</div>-->
                      <!--<el-button slot="reference" type="text">附录</el-button>-->
                    <!--</el-popover>-->
                  <!--</el-form-item>-->
                <!--</div>-->
                <!--<br>-->
                <!--<div class="zdysinput" style="margin-top: 20px;">-->
                  <!--<el-form-item label="" prop="item073" class="" :inline-message="true">-->
                    <!--<span style="margin-right: 10px;">其他，请说明：</span>-->
                    <!--<el-input v-model.trim="form.item073" placeholder="" size="small" style="width: 200px;"-->
                              <!--ref="item073"></el-input>-->
                  <!--</el-form-item>-->
                <!--</div>-->

              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="24">-->
              <!--<el-form-item label=" 8. 记录肿瘤的最高级别" prop="formData8">-->
                <!--<el-checkbox-group v-model="form.formData8" @change="formData8Change" :disabled="disabledShowState"><br>-->
                  <!--<el-checkbox label="1" ref="formData4">G1 高度分化</el-checkbox>-->
                  <!--<br>-->
                  <!--<el-checkbox label="2">G2 中度分化</el-checkbox>-->
                  <!--<br>-->
                  <!--<el-checkbox label="3">G3 低分化</el-checkbox>-->
                  <!--<br>-->
                  <!--<el-checkbox label="4">其他，说明：-->
                    <!--<div class="form-inline zdysinput">-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="item0841" class="" :inline-message="true"-->
                                       <!--v-if="form.formData8.indexOf('4') > -1">-->
                            <!--<el-input v-model.trim="form.item0841" placeholder="" :disabled="disabledShowState"-->
                                      <!--size="small"-->
                                      <!--style="width: 200px;" ref="item0841"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="" class="" :inline-message="true"-->
                                       <!--v-if="form.formData8.indexOf('4') < 0">-->
                            <!--<el-input v-model.trim="form.item0841" placeholder="" disabled size="small"-->
                                      <!--style="width: 200px;" ref="item0841"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                    <!--</div>-->
                  <!--</el-checkbox>-->
                <!--</el-checkbox-group>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="24">-->
              <!--<el-form-item label=" 9.	免疫组织化学分析记录" >-->
                <!--<br>-->
                <!--<table class="form-table">-->
                  <!--<tr>-->
                    <!--<th>项目</th>-->
                    <!--<th>1.	是；2. 否</th>-->
                    <!--<th>结果</th>-->
                  <!--</tr>-->
                  <!--<tr>-->
                    <!--<td>TITF-1 (TTF-1): 甲状腺转录因子-1基因</td>-->
                    <!--<td>-->
                      <!--<el-form-item label="" prop="item0911" class="form-inline zdysinput" :inline-message="true">-->
                        <!--<el-input v-model.trim="form.item0911" placeholder="" size="small" style="width: 40px;" :disabled="disabledShowState"-->
                                  <!--@blur="item09Change('item0911','item0912')"-->
                                  <!--ref="item0911"></el-input>-->
                      <!--</el-form-item>-->
                    <!--</td>-->
                    <!--<td>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="item0912" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item0911 == 1">-->
                            <!--<el-input v-model.trim="form.item0912" placeholder="" size="small" style="width: 240px;"-->
                                      <!--:disabled="disabledShowState"-->
                                      <!--ref="item0912"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item0911 != 1">-->
                            <!--<el-input v-model.trim="form.item0912" placeholder="" size="small" style="width: 240px;"-->
                                      <!--disabled-->
                                      <!--ref="item0912"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                    <!--</td>-->
                  <!--</tr>-->
                  <!--<tr>-->
                    <!--<td>天冬氨酸蛋白酶A</td>-->
                    <!--<td>-->
                      <!--<el-form-item label="" prop="item0921" class="form-inline zdysinput" :inline-message="true">-->
                        <!--<el-input v-model.trim="form.item0921" placeholder="" size="small" style="width: 40px;" :disabled="disabledShowState"-->
                                  <!--@blur="item09Change('item0921','item0922')"-->
                                  <!--ref="item0921"></el-input>-->
                      <!--</el-form-item>-->
                    <!--</td>-->
                    <!--<td>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="item0922" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item0921 == 1">-->
                            <!--<el-input v-model.trim="form.item0922" placeholder="" size="small" style="width: 240px;"-->
                                      <!--:disabled="disabledShowState"-->
                                      <!--ref="item0922"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item0921 != 1">-->
                            <!--<el-input v-model.trim="form.item0922" placeholder="" size="small" style="width: 240px;"-->
                                      <!--disabled-->
                                      <!--ref="item0922"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                    <!--</td>-->
                  <!--</tr>-->
                  <!--<tr>-->
                    <!--<td>p40</td>-->
                    <!--<td>-->
                      <!--<el-form-item label="" prop="item0931" class="form-inline zdysinput" :inline-message="true">-->
                        <!--<el-input v-model.trim="form.item0931" placeholder="" size="small" style="width: 40px;" :disabled="disabledShowState"-->
                                  <!--@blur="item09Change('item0931','item0932')"-->
                                  <!--ref="item0931"></el-input>-->
                      <!--</el-form-item>-->
                    <!--</td>-->
                    <!--<td>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="item0932" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item0931 == 1">-->
                            <!--<el-input v-model.trim="form.item0932" placeholder="" size="small" style="width: 240px;"-->
                                      <!--:disabled="disabledShowState"-->
                                      <!--ref="item0932"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item0931 != 1">-->
                            <!--<el-input v-model.trim="form.item0932" placeholder="" size="small" style="width: 240px;"-->
                                      <!--disabled-->
                                      <!--ref="item0932"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                    <!--</td>-->
                  <!--</tr>-->
                  <!--<tr>-->
                    <!--<td>p63</td>-->
                    <!--<td>-->
                      <!--<el-form-item label="" prop="item0941" class="form-inline zdysinput" :inline-message="true">-->
                        <!--<el-input v-model.trim="form.item0941" placeholder="" size="small" style="width: 40px;" :disabled="disabledShowState"-->
                                  <!--@blur="item09Change('item0941','item0942')"-->
                                  <!--ref="item0941"></el-input>-->
                      <!--</el-form-item>-->
                    <!--</td>-->
                    <!--<td>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="item0942" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item0941 == 1">-->
                            <!--<el-input v-model.trim="form.item0942" placeholder="" size="small" style="width: 240px;"-->
                                      <!--:disabled="disabledShowState"-->
                                      <!--ref="item0942"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item0941 != 1">-->
                            <!--<el-input v-model.trim="form.item0942" placeholder="" size="small" style="width: 240px;"-->
                                      <!--disabled-->
                                      <!--ref="item0942"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                    <!--</td>-->
                  <!--</tr>-->
                  <!--<tr>-->
                    <!--<td>细胞角蛋白 5/6 (CK5/6)</td>-->
                    <!--<td>-->
                      <!--<el-form-item label="" prop="item0951" class="form-inline zdysinput" :inline-message="true">-->
                        <!--<el-input v-model.trim="form.item0951" placeholder="" size="small" style="width: 40px;" :disabled="disabledShowState"-->
                                  <!--@blur="item09Change('item0951','item0952')"-->
                                  <!--ref="item0951"></el-input>-->
                      <!--</el-form-item>-->
                    <!--</td>-->
                    <!--<td>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="item0952" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item0951 == 1">-->
                            <!--<el-input v-model.trim="form.item0952" placeholder="" size="small" style="width: 240px;"-->
                                      <!--:disabled="disabledShowState"-->
                                      <!--ref="item0952"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item0951 != 1">-->
                            <!--<el-input v-model.trim="form.item0952" placeholder="" size="small" style="width: 240px;"-->
                                      <!--disabled-->
                                      <!--ref="item0952"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                    <!--</td>-->
                  <!--</tr>-->
                  <!--<tr>-->
                    <!--<td>嗜铬粒蛋白</td>-->
                    <!--<td>-->
                      <!--<el-form-item label="" prop="item0961" class="form-inline zdysinput" :inline-message="true">-->
                        <!--<el-input v-model.trim="form.item0961" placeholder="" size="small" style="width: 40px;" :disabled="disabledShowState"-->
                                  <!--@blur="item09Change('item0961','item0962')"-->
                                  <!--ref="item0961"></el-input>-->
                      <!--</el-form-item>-->
                    <!--</td>-->
                    <!--<td>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="item0962" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item0961 == 1">-->
                            <!--<el-input v-model.trim="form.item0962" placeholder="" size="small" style="width: 240px;"-->
                                      <!--:disabled="disabledShowState"-->
                                      <!--ref="item0962"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item0961 != 1">-->
                            <!--<el-input v-model.trim="form.item0962" placeholder="" size="small" style="width: 240px;"-->
                                      <!--disabled-->
                                      <!--ref="item0962"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                    <!--</td>-->
                  <!--</tr>-->
                  <!--<tr>-->
                    <!--<td>突触泡蛋白</td>-->
                    <!--<td>-->
                      <!--<el-form-item label="" prop="item0971" class="form-inline zdysinput" :inline-message="true">-->
                        <!--<el-input v-model.trim="form.item0971" placeholder="" size="small" style="width: 40px;" :disabled="disabledShowState"-->
                                  <!--@blur="item09Change('item0971','item0972')"-->
                                  <!--ref="item0971"></el-input>-->
                      <!--</el-form-item>-->
                    <!--</td>-->
                    <!--<td>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="item0972" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item0971 == 1">-->
                            <!--<el-input v-model.trim="form.item0972" placeholder="" size="small" style="width: 240px;"-->
                                      <!--:disabled="disabledShowState"-->
                                      <!--ref="item0972"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item0971 != 1">-->
                            <!--<el-input v-model.trim="form.item0972" placeholder="" size="small" style="width: 240px;"-->
                                      <!--disabled-->
                                      <!--ref="item0972"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                    <!--</td>-->
                  <!--</tr>-->
                  <!--<tr>-->
                    <!--<td>CD56 (NCAM)</td>-->
                    <!--<td>-->
                      <!--<el-form-item label="" prop="item0981" class="form-inline zdysinput" :inline-message="true">-->
                        <!--<el-input v-model.trim="form.item0981" placeholder="" size="small" style="width: 40px;" :disabled="disabledShowState"-->
                                  <!--@blur="item09Change('item0981','item0982')"-->
                                  <!--ref="item0981"></el-input>-->
                      <!--</el-form-item>-->
                    <!--</td>-->
                    <!--<td>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="item0982" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item0981 == 1">-->
                            <!--<el-input v-model.trim="form.item0982" placeholder="" size="small" style="width: 240px;"-->
                                      <!--:disabled="disabledShowState"-->
                                      <!--ref="item0982"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item0981 != 1">-->
                            <!--<el-input v-model.trim="form.item0982" placeholder="" size="small" style="width: 240px;"-->
                                      <!--disabled-->
                                      <!--ref="item0982"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                    <!--</td>-->
                  <!--</tr>-->
                  <!--<tr>-->
                    <!--<td>其他，请说明：-->
                      <!--<div class="form-inline zdysinput">-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="item0993" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item0991 == 1">-->
                            <!--<el-input v-model.trim="form.item0993" placeholder="" size="small" style="width: 240px;"-->
                                      <!--ref="item0993"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                        <!--<span>-->
                         <!--<el-form-item label="" prop="" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item0991 != 1">-->
                            <!--<el-input v-model.trim="form.item0993" placeholder="" size="small" style="width: 240px;"-->
                                      <!--disabled-->
                                      <!--ref="item0993"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                      <!--</div>-->
                    <!--</td>-->
                    <!--<td>-->
                      <!--<el-form-item label="" prop="item0991" class="form-inline zdysinput" :inline-message="true">-->
                        <!--<el-input v-model.trim="form.item0991" placeholder="" size="small" style="width: 40px;"  :disabled="disabledShowState"-->
                                  <!--@blur="item09Change('item0991','item0992','item0993')"-->
                                  <!--ref="item0991"></el-input>-->
                      <!--</el-form-item>-->
                    <!--</td>-->
                    <!--<td>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="item0992" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item0991 == 1">-->
                            <!--<el-input v-model.trim="form.item0992" placeholder="" size="small" style="width: 240px;"-->
                                      <!--:disabled="disabledShowState"-->
                                      <!--ref="item0992"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item0991 != 1">-->
                            <!--<el-input v-model.trim="form.item0992" placeholder="" size="small" style="width: 240px;"-->
                                      <!--disabled-->
                                      <!--ref="item0992"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                    <!--</td>-->
                  <!--</tr>-->
                  <!--<tr>-->
                    <!--<td colspan="3">-->
                      <!--<el-form-item label="备注：" >-->
                        <!--<el-input-->
                          <!--type="textarea"-->
                          <!--:autosize="{ minRows: 2, maxRows: 4}"-->
                          <!--placeholder="请输入内容"-->
                          <!--:disabled="disabledShowState"-->
                          <!--v-model="form.item0910">-->
                        <!--</el-input>-->
                      <!--</el-form-item>-->
                    <!--</td>-->
                  <!--</tr>-->
                <!--</table>-->

              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="24">-->
              <!--<el-form-item label=" 10.	基因检测" >-->
                <!--<br>-->
                <!--<table class="form-table">-->
                  <!--<tr>-->
                    <!--<th>项目</th>-->
                    <!--<th>1.	是；2. 否</th>-->
                    <!--<th>结果</th>-->
                  <!--</tr>-->
                  <!--<tr>-->
                    <!--<td>TITF-1 (TTF-1): 甲状腺转录因子-1基因</td>-->
                    <!--<td>-->
                      <!--<el-form-item label="" prop="item1011" class="form-inline zdysinput" :inline-message="true">-->
                        <!--<el-input v-model.trim="form.item1011" placeholder="" size="small" style="width: 40px;" :disabled="disabledShowState"-->
                                  <!--@blur="item09Change('item1011','item1012')"-->
                                  <!--ref="item1011"></el-input>-->
                      <!--</el-form-item>-->
                    <!--</td>-->
                    <!--<td>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="item1012" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item1011 == 1">-->
                            <!--<el-input v-model.trim="form.item1012" placeholder="" size="small" style="width: 240px;"-->
                                      <!--:disabled="disabledShowState"-->
                                      <!--ref="item1012"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item1011 != 1">-->
                            <!--<el-input v-model.trim="form.item1012" placeholder="" size="small" style="width: 240px;"-->
                                      <!--disabled-->
                                      <!--ref="item1012"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                    <!--</td>-->
                  <!--</tr>-->
                  <!--<tr>-->
                    <!--<td>天冬氨酸蛋白酶A</td>-->
                    <!--<td>-->
                      <!--<el-form-item label="" prop="item1021" class="form-inline zdysinput" :inline-message="true">-->
                        <!--<el-input v-model.trim="form.item1021" placeholder="" size="small" style="width: 40px;" :disabled="disabledShowState"-->
                                  <!--@blur="item09Change('item1021','item1022')"-->
                                  <!--ref="item1021"></el-input>-->
                      <!--</el-form-item>-->
                    <!--</td>-->
                    <!--<td>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="item1022" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item1021 == 1">-->
                            <!--<el-input v-model.trim="form.item1022" placeholder="" size="small" style="width: 240px;"-->
                                      <!--:disabled="disabledShowState"-->
                                      <!--ref="item1022"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item1021 != 1">-->
                            <!--<el-input v-model.trim="form.item1022" placeholder="" size="small" style="width: 240px;"-->
                                      <!--disabled-->
                                      <!--ref="item1022"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                    <!--</td>-->
                  <!--</tr>-->
                  <!--<tr>-->
                    <!--<td>p40</td>-->
                    <!--<td>-->
                      <!--<el-form-item label="" prop="item1031" class="form-inline zdysinput" :inline-message="true">-->
                        <!--<el-input v-model.trim="form.item1031" placeholder="" size="small" style="width: 40px;" :disabled="disabledShowState"-->
                                  <!--@blur="item09Change('item1031','item1032')"-->
                                  <!--ref="item1031"></el-input>-->
                      <!--</el-form-item>-->
                    <!--</td>-->
                    <!--<td>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="item1032" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item1031 == 1">-->
                            <!--<el-input v-model.trim="form.item1032" placeholder="" size="small" style="width: 240px;"-->
                                      <!--:disabled="disabledShowState"-->
                                      <!--ref="item1032"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item1031 != 1">-->
                            <!--<el-input v-model.trim="form.item1032" placeholder="" size="small" style="width: 240px;"-->
                                      <!--disabled-->
                                      <!--ref="item1032"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                    <!--</td>-->
                  <!--</tr>-->
                  <!--<tr>-->
                    <!--<td>p63</td>-->
                    <!--<td>-->
                      <!--<el-form-item label="" prop="item1041" class="form-inline zdysinput" :inline-message="true">-->
                        <!--<el-input v-model.trim="form.item1041" placeholder="" size="small" style="width: 40px;" :disabled="disabledShowState"-->
                                  <!--@blur="item09Change('item1041','item1042')"-->
                                  <!--ref="item1041"></el-input>-->
                      <!--</el-form-item>-->
                    <!--</td>-->
                    <!--<td>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="item1042" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item1041 == 1">-->
                            <!--<el-input v-model.trim="form.item1042" placeholder="" size="small" style="width: 240px;"-->
                                      <!--:disabled="disabledShowState"-->
                                      <!--ref="item1042"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item1041 != 1">-->
                            <!--<el-input v-model.trim="form.item1042" placeholder="" size="small" style="width: 240px;"-->
                                      <!--disabled-->
                                      <!--ref="item1042"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                    <!--</td>-->
                  <!--</tr>-->
                  <!--<tr>-->
                    <!--<td>细胞角蛋白 5/6 (CK5/6)</td>-->
                    <!--<td>-->
                      <!--<el-form-item label="" prop="item1051" class="form-inline zdysinput" :inline-message="true">-->
                        <!--<el-input v-model.trim="form.item1051" placeholder="" size="small" style="width: 40px;" :disabled="disabledShowState"-->
                                  <!--@blur="item09Change('item1051','item1052')"-->
                                  <!--ref="item1051"></el-input>-->
                      <!--</el-form-item>-->
                    <!--</td>-->
                    <!--<td>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="item1052" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item1051 == 1">-->
                            <!--<el-input v-model.trim="form.item1052" placeholder="" size="small" style="width: 240px;"-->
                                      <!--:disabled="disabledShowState"-->
                                      <!--ref="item1052"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item1051 != 1">-->
                            <!--<el-input v-model.trim="form.item1052" placeholder="" size="small" style="width: 240px;"-->
                                      <!--disabled-->
                                      <!--ref="item1052"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                    <!--</td>-->
                  <!--</tr>-->
                  <!--<tr>-->
                    <!--<td>嗜铬粒蛋白</td>-->
                    <!--<td>-->
                      <!--<el-form-item label="" prop="item1061" class="form-inline zdysinput" :inline-message="true">-->
                        <!--<el-input v-model.trim="form.item1061" placeholder="" size="small" style="width: 40px;" :disabled="disabledShowState"-->
                                  <!--@blur="item09Change('item1061','item1062')"-->
                                  <!--ref="item1061"></el-input>-->
                      <!--</el-form-item>-->
                    <!--</td>-->
                    <!--<td>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="item1062" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item1061 == 1">-->
                            <!--<el-input v-model.trim="form.item1062" placeholder="" size="small" style="width: 240px;"-->
                                      <!--:disabled="disabledShowState"-->
                                      <!--ref="item1062"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item1061 != 1">-->
                            <!--<el-input v-model.trim="form.item1062" placeholder="" size="small" style="width: 240px;"-->
                                      <!--disabled-->
                                      <!--ref="item1062"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                    <!--</td>-->
                  <!--</tr>-->
                  <!--<tr>-->
                    <!--<td>突触泡蛋白</td>-->
                    <!--<td>-->
                      <!--<el-form-item label="" prop="item1071" class="form-inline zdysinput" :inline-message="true">-->
                        <!--<el-input v-model.trim="form.item1071" placeholder="" size="small" style="width: 40px;" :disabled="disabledShowState"-->
                                  <!--@blur="item09Change('item1071','item1072')"-->
                                  <!--ref="item1071"></el-input>-->
                      <!--</el-form-item>-->
                    <!--</td>-->
                    <!--<td>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="item1072" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item1071 == 1">-->
                            <!--<el-input v-model.trim="form.item1072" placeholder="" size="small" style="width: 240px;"-->
                                      <!--:disabled="disabledShowState"-->
                                      <!--ref="item1072"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item1071 != 1">-->
                            <!--<el-input v-model.trim="form.item1072" placeholder="" size="small" style="width: 240px;"-->
                                      <!--disabled-->
                                      <!--ref="item1072"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                    <!--</td>-->
                  <!--</tr>-->
                  <!--<tr>-->
                    <!--<td>CD56 (NCAM)</td>-->
                    <!--<td>-->
                      <!--<el-form-item label="" prop="item1081" class="form-inline zdysinput" :inline-message="true">-->
                        <!--<el-input v-model.trim="form.item1081" placeholder="" size="small" style="width: 40px;" :disabled="disabledShowState"-->
                                  <!--@blur="item09Change('item1081','item1082')"-->
                                  <!--ref="item1081"></el-input>-->
                      <!--</el-form-item>-->
                    <!--</td>-->
                    <!--<td>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="item1082" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item1081 == 1">-->
                            <!--<el-input v-model.trim="form.item1082" placeholder="" size="small" style="width: 240px;"-->
                                      <!--:disabled="disabledShowState"-->
                                      <!--ref="item1082"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item1081 != 1">-->
                            <!--<el-input v-model.trim="form.item1082" placeholder="" size="small" style="width: 240px;"-->
                                      <!--disabled-->
                                      <!--ref="item1082"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                    <!--</td>-->
                  <!--</tr>-->
                  <!--<tr>-->
                    <!--<td>其他，请说明：-->
                      <!--<div class="form-inline zdysinput">-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="item1093" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item1091 == 1">-->
                            <!--<el-input v-model.trim="form.item1093" placeholder="" size="small" style="width: 240px;"-->
                                      <!--:disabled="disabledShowState"-->
                                      <!--ref="item1093"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                        <!--<span>-->
                         <!--<el-form-item label="" prop="" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item1091 != 1">-->
                            <!--<el-input v-model.trim="form.item1093" placeholder="" size="small" style="width: 240px;"-->
                                      <!--disabled-->
                                      <!--ref="item1093"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                      <!--</div>-->
                    <!--</td>-->
                    <!--<td>-->
                      <!--<el-form-item label="" prop="item1091" class="form-inline zdysinput" :inline-message="true">-->
                        <!--<el-input v-model.trim="form.item1091" placeholder="" size="small" style="width: 40px;"  :disabled="disabledShowState"-->
                                  <!--@blur="item09Change('item1091','item1092','item1093')"-->
                                  <!--ref="item1091"></el-input>-->
                      <!--</el-form-item>-->
                    <!--</td>-->
                    <!--<td>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="item1092" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item1091 == 1">-->
                            <!--<el-input v-model.trim="form.item1092" placeholder="" size="small" style="width: 240px;"  :disabled="disabledShowState"-->
                                      <!--ref="item1092"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                      <!--<span>-->
                         <!--<el-form-item label="" prop="" class="form-inline zdysinput" :inline-message="true"-->
                                       <!--v-if="form.item1091 != 1">-->
                            <!--<el-input v-model.trim="form.item1092" placeholder="" size="small" style="width: 240px;"-->
                                      <!--disabled-->
                                      <!--ref="item1092"></el-input>-->
                         <!--</el-form-item>-->
                      <!--</span>-->
                    <!--</td>-->
                  <!--</tr>-->
                  <!--<tr>-->
                    <!--<td colspan="3">-->
                      <!--<el-form-item label="备注：" class="zdysinput">-->
                        <!--<el-input-->
                          <!--type="textarea"-->
                          <!--:disabled="disabledShowState"-->
                          <!--:autosize="{ minRows: 2, maxRows: 4}"-->
                          <!--placeholder="请输入内容"-->
                          <!--v-model="form.item1010">-->
                        <!--</el-input>-->
                      <!--</el-form-item>-->
                    <!--</td>-->
                  <!--</tr>-->
                <!--</table>-->

              <!--</el-form-item>-->

            <!--</el-col>-->
         <!---->
          <!--</div>-->
          <el-row>
            <el-col :span="24" style="margin-top: 20px;">
              <el-col :span="12">
                <el-form-item label="调查员签名：" labelWidth="150px" prop="investigator" class="form-inline zdysinput"
                              :inline-message="true" style="display: inline;">
                  <el-input v-model.trim="form.investigator" placeholder="" size="small" style="width: 200px;"
                            :disabled="disabledShowState"
                            ref="investigator"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="调查日期：" prop="investigationDate" labelWidth="150px">
                  <el-date-picker
                    v-model="form.investigationDate"
                    type="date"
                    ref="investigationDate"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    size="small"
                    value-format="yyyy-MM-dd"
                    :disabled="disabledShowState"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-col>
          </el-row>

        </div>
      </el-form>
      <div class="addbtn" v-if="!disabledShowState">
        <el-button type="primary" @click="submitForm('form')">保存</el-button>
        <el-button @click="goBack()">取消</el-button>
      </div>
    </el-row>
  </div>
</template>

<script>
  import uploadMultipleSubmit from '../components/uploadMultipleSubmit'   //上传图片
  import seePics from '../components/seePics'   //查看图片
  import appendix from './text.vue'
  export default {
    components:{
      uploadMultipleSubmit,
      seePics,
      appendix
    },
    userName: 'Right',
    data () {

      var validate_count = (rule, value, callback) => {
        if (value == '') {
          callback()
        } else if (value && !(/^\d{4}$/.test(value))) {
          callback(new Error('数值不符合规则'))
        } else {
          callback()
        }
      };
      var validate_count1 = (rule, value, callback) => {
        if (value == '') {
          callback()
        } else if (value && !(/^\d{1}$/.test(value))) {
          callback(new Error('数值为0,1,3'))
        } else if (value == 1 || value == 0 || value == 3) {
          callback()
        } else {
          callback(new Error('数值为0,1,3'))
        }
      };
      return {
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        //权限判定
        lungCancerPathology_page: false,
        btnAuth: {
          countryAgencySearch_page: false,
        },
        //展示
        disabledState: false,
        fileList:'',
        form: {
          formData1: [],
          formData2: [],
          formData3: [],
          formData4: [],
          formData5: [],
          formData6: [],
          formData8: [],
          filePath:'',
          userName: '',
          sid: '',
          idCard: '',
          age: '',
          sex: '',
          checkTime: '',
          item011: '',
          item012: '',
          item013: '',
          item014: '',
          item015: '',
          item016: '',
          item017: '',
          item0171: '',
          item021: '',
          item022: '',
          item031: '',
          item032: '',
          item033: '',
          item041: '',
          item042: '',
          item043: '',
          item044: '',
          item045: '',
          item0451: '',
          item051: '',
          item052: '',
          item053: '',
          item054: '',
          item055: '',
          item056: '',
          item057: '',
          item058: '',
          item059: '',
          item0581: '',
          item061: '',
          item062: '',
          item063: '',
          item71: '',
          item072: '',
          item073: '',
          item081: '',
          item082: '',
          item083: '',
          item084: '',
          item0841: '',

          item1011: '',
          item1012: '',
          item1021: '',
          item1022: '',
          item1031: '',
          item1032: '',
          item1041: '',
          item1042: '',
          item1051: '',
          item1052: '',
          item1061: '',
          item1062: '',
          item1071: '',
          item1072: '',
          item1081: '',
          item1082: '',
          item1091: '',
          item1092: '',
          item1093: '',
          item1010: '',


          item0911: '',
          item0912: '',
          item0921: '',
          item0922: '',
          item0931: '',
          item0932: '',
          item0941: '',
          item0942: '',
          item0951: '',
          item0952: '',
          item0961: '',
          item0962: '',
          item0971: '',
          item0972: '',
          item0981: '',
          item0982: '',
          item0991: '',
          item0992: '',
          item0993: '',
          item0909: '',
          item0910: '',
          investigator: '',
        },
        rules: {
          sid: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          userName: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          age: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          idCard: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          sex: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          checkTime: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          formData1: [
            {required: false, message: '必选', trigger: 'change'},
          ],
          formData2: [
            {required: false, message: '必选', trigger: 'change'},
          ],
          formData3: [
            {required: false, message: '必选', trigger: 'change'},
          ],
          formData4: [
            {required: false, message: '必选', trigger: 'change'},
          ],
          formData5: [
            {required: false, message: '必选', trigger: 'change'},
          ],
          formData6: [
            {required: false, message: '必选', trigger: 'change'},
          ],
          formData8: [
            {required: false, message: '必选', trigger: 'change'},
          ],
          item0171: [
            {required: true, message: '必选', trigger: 'blur'},
          ],
          item0221: [
            {required: true, message: '必选', trigger: 'blur'},
          ],
          item0451: [
            {required: true, message: '必选', trigger: 'blur'},
          ],
          item0581: [
            {required: true, message: '必选', trigger: 'blur'},
          ],
          item071: [
            {required: false, message: '必选', trigger: 'blur'},
            {required: false, message: '必选', trigger: 'change'},
            {validator: validate_count, trigger: 'blur'}
          ],
          item072: [
            {required: false, message: '必选', trigger: 'blur'},
            {required: false, message: '必选', trigger: 'change'},
            {validator: validate_count1, trigger: 'blur'}
          ],
          item0841: [
            {required: false, message: '必选', trigger: 'blur'},
          ],
          item0911: [
            {required: false, message: '必选', trigger: 'blur'},
            {required: false, message: '必选', trigger: 'change'},
          ],
          item0912: [
            {required: true, message: '必选', trigger: 'blur'},
            {required: true, message: '必选', trigger: 'change'},
          ],
          item0921: [
            {required: false, message: '必选', trigger: 'blur'},
            {required: false, message: '必选', trigger: 'change'},
          ],
          item0922: [
            {required: true, message: '必选', trigger: 'blur'},
            {required: true, message: '必选', trigger: 'change'},
          ],
          item0931: [
            {required: false, message: '必选', trigger: 'blur'},
            {required: false, message: '必选', trigger: 'change'},
          ],
          item0932: [
            {required: true, message: '必选', trigger: 'blur'},
            {required: true, message: '必选', trigger: 'change'},
          ],
          item0941: [
            {required: false, message: '必选', trigger: 'blur'},
            {required: false, message: '必选', trigger: 'change'},
          ],
          item0942: [
            {required: true, message: '必选', trigger: 'blur'},
            {required: true, message: '必选', trigger: 'change'},
          ],
          item0951: [
            {required: false, message: '必选', trigger: 'blur'},
            {required: false, message: '必选', trigger: 'change'},
          ],
          item0952: [
            {required: true, message: '必选', trigger: 'blur'},
            {required: true, message: '必选', trigger: 'change'},
          ],
          item0961: [
            {required: false, message: '必选', trigger: 'blur'},
            {required: false, message: '必选', trigger: 'change'},
          ],
          item0962: [
            {required: true, message: '必选', trigger: 'blur'},
            {required: true, message: '必选', trigger: 'change'},
          ],
          item0971: [
            {required: false, message: '必选', trigger: 'blur'},
            {required: false, message: '必选', trigger: 'change'},
          ],
          item0972: [
            {required: true, message: '必选', trigger: 'blur'},
            {required: true, message: '必选', trigger: 'change'},
          ],
          item0981: [
            {required: false, message: '必选', trigger: 'blur'},
            {required: false, message: '必选', trigger: 'change'},
          ],
          item0982: [
            {required: true, message: '必选', trigger: 'blur'},
            {required: true, message: '必选', trigger: 'change'},
          ],
          item0991: [
            {required: false, message: '必选', trigger: 'blur'},
            {required: false, message: '必选', trigger: 'change'},
          ],
          item0992: [
            {required: true, message: '必选', trigger: 'blur'},
            {required: true, message: '必选', trigger: 'change'},
          ],
          item0993: [
            {required: true, message: '必选', trigger: 'blur'},
            {required: true, message: '必选', trigger: 'change'},
          ],
          item1011: [
            {required: false, message: '必选', trigger: 'blur'},
            {required: false, message: '必选', trigger: 'change'},
          ],
          item1012: [
            {required: true, message: '必选', trigger: 'blur'},
            {required: true, message: '必选', trigger: 'change'},
          ],
          item1021: [
            {required: false, message: '必选', trigger: 'blur'},
            {required: false, message: '必选', trigger: 'change'},
          ],
          item1022: [
            {required: true, message: '必选', trigger: 'blur'},
            {required: true, message: '必选', trigger: 'change'},
          ],
          item1031: [
            {required: false, message: '必选', trigger: 'blur'},
            {required: false, message: '必选', trigger: 'change'},
          ],
          item1032: [
            {required: true, message: '必选', trigger: 'blur'},
            {required: true, message: '必选', trigger: 'change'},
          ],
          item1041: [
            {required: false, message: '必选', trigger: 'blur'},
            {required: false, message: '必选', trigger: 'change'},
          ],
          item1042: [
            {required: true, message: '必选', trigger: 'blur'},
            {required: true, message: '必选', trigger: 'change'},
          ],
          item1051: [
            {required: false, message: '必选', trigger: 'blur'},
            {required: false, message: '必选', trigger: 'change'},
          ],
          item1052: [
            {required: true, message: '必选', trigger: 'blur'},
            {required: true, message: '必选', trigger: 'change'},
          ],
          item1061: [
            {required: false, message: '必选', trigger: 'blur'},
            {required: false, message: '必选', trigger: 'change'},
          ],
          item1062: [
            {required: true, message: '必选', trigger: 'blur'},
            {required: true, message: '必选', trigger: 'change'},
          ],
          item1071: [
            {required: false, message: '必选', trigger: 'blur'},
            {required: false, message: '必选', trigger: 'change'},
          ],
          item1072: [
            {required: true, message: '必选', trigger: 'blur'},
            {required: true, message: '必选', trigger: 'change'},
          ],
          item1081: [
            {required: false, message: '必选', trigger: 'blur'},
            {required: false, message: '必选', trigger: 'change'},
          ],
          item1082: [
            {required: true, message: '必选', trigger: 'blur'},
            {required: true, message: '必选', trigger: 'change'},
          ],
          item1091: [
            {required: false, message: '必选', trigger: 'blur'},
            {required: false, message: '必选', trigger: 'change'},
          ],
          item1092: [
            {required: true, message: '必选', trigger: 'blur'},
            {required: true, message: '必选', trigger: 'change'},
          ],
          item1093: [
            {required: true, message: '必选', trigger: 'blur'},
            {required: true, message: '必选', trigger: 'change'},
          ],
          investigationDate: [
            {required: true, message: '必选', trigger: 'blur'},
            {required: true, message: '必选', trigger: 'change'},
          ],
          investigator: [
            {required: true, message: '必选', trigger: 'blur'},
            {required: true, message: '必选', trigger: 'change'},
          ],
        },
        disabledShowState: false,
      }
    },
    mounted(){
      this.$store.commit('LOGOUT_USER');
      let obj = this.checkPageAuth(this, "lungCancerPathology_page", this.btnAuth);
      if (this.$route.query.flag == 2) {
        this.disabledShowState = true
        this.getResult(this.$route.query.id)
        this.rules = {}
      }
    },
    methods: {
      item09Change(a, b, c){
        if (this.form[a] != 1 && this.form[a] != 2) {
          this.form[a] = ''
        }
        if (this.form[a] != 1) {
          this.form[b] = ''
          if (c) {
            this.form[c] = ''
          }
        }
      },
      formData1Change(value){

        if (value.indexOf(1) > -1) {
          this.form.item011 = 1
        } else{
          this.form.item011 = 2
        }
        if (value.indexOf('2') > -1) {
          this.form.item012 = 1
        } else {
          this.form.item012 = 2
        }
        if (value.indexOf('3') > -1) {
          this.form.item013 = 1
        }else{
          this.form.item013 = 2
        }
        if (value.indexOf('4') > -1) {
          this.form.item014 = 1
        }else{
          this.form.item014 = 2
        }
        if (value.indexOf('5') > -1) {
          this.form.item015 = 1
        }else{
          this.form.item015 = 2
        }
        if (value.indexOf('6') > -1) {
          this.form.item016 = 1
        }else{
          this.form.item016 = 2
        }
        if (value.indexOf('7') > -1) {
          this.form.item017 = 1
        }else{
          this.form.item017 = 2
        }
        if (value.indexOf('7') < 0) {
          this.form.item0171 = ''
        }else{
          this.form.item013 = 2
        }
      },
      formData2Change(value){
        if (value.indexOf('1') > -1) {
          this.form.item021 = 1
        }else{
          this.form.item021 = 2
        }
        if (value.indexOf('2') > -1) {
          this.form.item022 = 1
        }else{
          this.form.item022 = 2
        }
        if (value.indexOf('2') < 0) {
          this.form.item0221 = ''
        }else{
          this.form.item013 = 2
        }
      },
      formData3Change(value){
        if (value.indexOf('1') > -1) {
          this.form.item031 = 1
        }else{
          this.form.item031 = 2
        }
        if (value.indexOf('2') > -1) {
          this.form.item032 = 1
        }else{
          this.form.item032 = 2
        }
        if (value.indexOf('3') > -1) {
          this.form.item033 = 1
        }else{
          this.form.item033 = 2
        }
      },
      formData4Change(value){
        if (value.indexOf('1') > -1) {
          this.form.item041 = 1
        }else{
          this.form.item041 = 2
        }
        if (value.indexOf('2') > -1) {
          this.form.item042 = 1
        }else{
          this.form.item042 = 2
        }
        if (value.indexOf('3') > -1) {
          this.form.item043 = 1
        }else{
          this.form.item043 = 2
        }
        if (value.indexOf('4') > -1) {
          this.form.item043 = 1
        }else{
          this.form.item043 = 2
        }
        if (value.indexOf('5') > -1) {
          this.form.item043 = 1
        }else{
          this.form.item043 = 2
        }
        if (value.indexOf('5') < 0) {
          this.form.item0451 = ''
        }else{
          this.form.item013 = 2
        }
      },
      formData5Change(value){
        if (value.indexOf('1') > -1) {
          this.form.item051 = 1
        }else{
          this.form.item051 = 2
        }
        if (value.indexOf('2') > -1) {
          this.form.item052 = 1
        }else{
          this.form.item052 = 2
        }
        if (value.indexOf('3') > -1) {
          this.form.item053 = 1
        }else{
          this.form.item053 = 2
        }
        if (value.indexOf('4') > -1) {
          this.form.item054 = 1
        }else{
          this.form.item054 = 2
        }
        if (value.indexOf('5') > -1) {
          this.form.item055 = 1
        }else{
          this.form.item055 = 2
        }
        if (value.indexOf('6') > -1) {
          this.form.item056 = 1
        }else{
          this.form.item056 = 2
        }
        if (value.indexOf('7') > -1) {
          this.form.item057 = 1
        }else{
          this.form.item057 = 2
        }
        if (value.indexOf('8') > -1) {
          this.form.item058 = 1
        }else{
          this.form.item058 = 2
        }
        if (value.indexOf('9') > -1) {
          this.form.item059 = 1
        }else{
          this.form.item059 = 2
        }
        if (value.indexOf('8') < 0) {
          this.form.item0581 = ''
        }
      },
      formData6Change(value){
        if (value.indexOf('1') > -1) {
          this.form.item061 = 1
        }else{
          this.form.item061 = 2
        }
        if (value.indexOf('2') > -1) {
          this.form.item062 = 1
        }else{
          this.form.item062 = 2
        }
        if (value.indexOf('3') > -1) {
          this.form.item063 = 1
        }else{
          this.form.item063 = 2
        }
      },
      formData8Change(value){
        if (value.indexOf('1') > -1) {
          this.form.item081 = 1
        }else{
          this.form.item081 = 2
        }
        if (value.indexOf('2') > -1) {
          this.form.item082 = 1
        }else{
          this.form.item082 = 2
        }
        if (value.indexOf('3') > -1) {
          this.form.item083 = 1
        }else{
          this.form.item083 = 2
        }
        if (value.indexOf('4') > -1) {
          this.form.item084 = 1
        }else{
          this.form.item084 = 2
        }
        if (value.indexOf('4') < 0) {
          this.form.item0841 = ''
        }
      },


      //通过sid获取用户信息
      getInfo(){
        this.form.userName = ''
        this.form.phone = ''
        this.form.sex = ''
        this.form.age = ''
        this.form.idCard = ''
        this.form.personScreenId = ''
        this.form.personId = ''
        $axios_http({
          url: '/fit/personInfo',
          data: {
            sid: this.form.sid
          },
          vueObj: this
        }).then((res) => {
          this.form.userName = res.data.result.userName
          this.form.phone = res.data.result.phone
          this.form.sex = res.data.result.sex == 1 ? '男' : '女'
          this.form.age = res.data.result.age + '岁'
          this.form.idCard = res.data.result.idCard
          this.form.sid = res.data.result.sid
          this.form.personScreenId = res.data.result.personScreenId
          this.form.personId = res.data.result.personId
        })
      },
      getResult(id){
        $axios_http({
          url: "/ct/pathology/result/find/id",
          data: {
            id: id
          },
          vueObj: this
        }).then((res) => {
          this.form = res.data.result
          this.getArr('item01', 7, 'formData1')
          this.getArr('item02', 2, 'formData2')
          this.getArr('item03', 3, 'formData3')
          this.getArr('item04', 4, 'formData4')
          this.getArr('item05', 9, 'formData5')
          this.getArr('item06', 3, 'formData6')
          this.getArr('item08', 4, 'formData8')
          this.form.checkTime = this.getDate(this.form.checkTime)
          this.form.investigationDate = this.getDate(this.form.investigationDate)
          this.form.userName = this.form.hosPersonInfoPO.userName
          this.form.sex = this.form.hosPersonInfoPO.sex == 1? '男': '女'
          this.form.idCard = this.form.hosPersonInfoPO.idCard
          this.form.age = this.form.hosPersonInfoPO.age
          this.fileList = this.form.filePath
        })
      },
      getUrl(data){
        this.form.filePath=data;
      },
      getUrl2(data){
        this.form.filePath=data;
      },
      getArr(a, b, c){
        this.form[c] = []
        for (let i = 1; i <= b; i++) {
          if (this.form[a + i] == 1) {
            this.form[c].push(i += '')
          }
        }
      },
      //入组时间
      getDate(value){
        if (value != '' && value != null && value != undefined) {
          var value = new Date(value)
          return `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`
        }
        return value
      },
      //提交表单
      submitForm(formuserName) {
        this.$refs[formuserName].validate((valid, obj) => {
          if (!valid) {
            for (var item in obj) {
              console.log(item)
              if (this.$refs[item].focus) {
                this.$refs[item].focus();
              } else {
                this.$refs[item].$el.focus();
              }
              break;
            }
          }
          if (valid) {
            $axios_http({
              url: "/ct/pathology/result/add",
              data: this.form,
              vueObj: this
            }).then((res) => {
              $successMsg(this, "保存成功")
              this.$router.replace({path: '/pathology/pathology'})
            })
          }
        });
      },
      resetForm(formuserName) {
        this.$refs[formuserName].resetFields();
      },
    },
    watch: {}
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .return-home {
    display: block;
    /*text-align: center;*/
    margin-bottom: 20px;
    margin-left:10px;
  }

  h3 {
    text-align: center;
    margin-bottom: 20px;
  }

  .content-page {
    background: #fff;
    padding-top:10px;
    padding-bottom: 40px;
  }

  .addbtn {
    text-align: center;
    width:200px;
    margin:50px auto;

  }

  .content-page-sid {
    color: #000;
    font-size: 16px;
    font-weight: 600;
    padding-left: 55px;
  }

  .demo-ruleForm {
    padding-left: 40px;
  }

  .form-table tr td {
    border: 1px solid #e5e5e5;
    padding: 10px 20px;
    text-align: center;
  }

  .form-table th {
    border: 1px solid #e5e5e5;
    background: #e5e5e5;
    padding: 10px 20px;
    text-align: center;
  }

  .form-table tr td:nth-child(1) {
    text-align: left;
  }

  .form-table tr td:nth-child(2) {
    text-align: left;
    width: 130px;
  }

  .form-table tr td:nth-child(3) {
    text-align: left;
    width: 350px;
  }
  .form-body{
    max-width: 1200px;
    margin:auto;
    border:1px solid #e5e5e5;
  }
</style>
<style>
  .content-page .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    /*color: #000;*/
  }

  .demo-ruleForm .el-form-item__content {
    margin-left: 30px !important;
  }

  .form-inline {
    display: inline-block;
  }

  .form-inline .el-form-item__content {
    margin-left: 10px !important;
  }

  .zdysinput .el-form-item__content {
    margin-left: 0px !important;
  }

  .formcon {
  }

  .formcon .title {
    width: 100%;
    background: #e5e5e5;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-bottom: 20px;
  }

  .form-body-content {
    padding: 20px 40px;
  }

  .zdysinput input {
    /*border-width: 0 0 1px 0;*/
    /*border-color: #000;*/
    /*border-radius: 0;*/
  }

  .content-page .el-checkbox-group {
    overflow: inherit !important;
  }
  .content-page .is-disabled .el-input__inner {
    background: #fff;
    color: #666;
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

  .content-page .el-radio__input.is-disabled.is-checked + span.el-radio__label {
    color: #409EFF;
  }

  .content-page .el-radio__input.is-disabled.is-checked .el-radio__inner {
    background-color: #409EFF;
    border-color: #409EFF;
  }

  .content-page .el-radio__input.is-disabled.is-checked .el-radio__inner::after {
    background-color: #f5f7fa;
  }

  .content-page .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    border-color: #dcdfe6;
    color: #606266;
    cursor: not-allowed;
  }
</style>
