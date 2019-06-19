<template>
  <div slot="right" class="content-page" v-if="home_page">
    <div class="filter-container content-search">
      <el-button :size="$store.state.style.assemblyModel" class="return-home" @click="goBack()">返 回</el-button>
    </div>
    <div class="form-title">
      <h3>低剂量螺旋CT检查结果表</h3>
    </div>
    <div class="form-body">
      <el-form :model="form" :rules="formRules" ref="form" label-width="100px" labelPosition="left"
               class="demo-ruleForm">
        <div class="formcon">
          <div class="title">
            基本信息
          </div>
          <div class="form-body-content">
            <el-row>
              <el-col :span="12">
                <el-form-item label="SID:" class="formoneline" prop="sid">
                  <el-input v-model.trim="form.sid" auto-complete="off" :size="$store.state.style.assemblyModel" style="width: 200px;"
                            class="smallInput" @blur="getInfo" disabled ref="sid"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9">

              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名:" class="formhalfline" prop="userName">
                  <el-input v-model.trim="form.userName" auto-complete="off" :size="$store.state.style.assemblyModel" ref="userName"
                            style="width: 200px;"
                            class="smallInput" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="性别:" class="formhalfline" prop="sex">
                  <el-input v-model.trim="form.sex" auto-complete="off" :size="$store.state.style.assemblyModel" style="width: 200px;" ref="sex"
                            class="smallInput" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="年龄:" class="formhalfline" prop="age">
                  <el-input v-model.trim="form.age" auto-complete="off" :size="$store.state.style.assemblyModel" style="width: 200px;" ref="age"
                            class="smallInput" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="身份证号:" class="formoneline" prop="idCard">
                  <el-input v-model.trim="form.idCard" auto-complete="off" :size="$store.state.style.assemblyModel" style="width: 200px;"
                            ref="idCard"
                            class="smallInput" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="formcon">
          <div class="title">
            检查时间
          </div>
          <div class="form-body-content">
            <el-row>
              <el-col :span="12">
                <el-form-item label="1. CT检查的日期:" prop="examinationDate" label-width="160px">
                  <el-date-picker
                    v-model="form.examinationDate"
                    type="date"
                    :size="$store.state.style.assemblyModel"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    ref="examinationDate"
                    disabled
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="2. 本次CT扫描年度:" prop="stage" label-width="160px">
                <el-radio-group v-model="form.stage" disabled>
                  <el-radio :label="1" ref="stage">1.第一年CT扫描（T0）</el-radio>
                  <el-radio :label="2">2.第二年CT扫描（T1）</el-radio>
                  <el-radio :label="3">3.第三年CT扫描（T2）</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
          </div>
        </div>
        <div class="formcon">
          <div class="title">
            技术参数
          </div>
          <div class="form-body-content">
            <el-row>
              <el-col :span="24">
                <el-form-item label="1. 扫描设备制造商和型号:" prop="equipmentMfrs" label-width="210px">
                  <el-select v-model="form.equipmentMfrs" filterable placeholder="请选择" :size="$store.state.style.assemblyModel" ref="equipmentMfrs"
                             disabled
                             @change="getModel">
                    <el-option
                      v-for="item in brands"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                  <div class="form-inline" v-if="form.equipmentMfrs!=6">
                    <el-form-item label="" prop="equipmentVersion">
                      <el-select v-model="form.equipmentVersion" filterable placeholder="请选择" :size="$store.state.style.assemblyModel"
                                 ref="equipmentVersion" disabled>
                        <el-option
                          v-for="item in models"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="form-inline" v-if="form.equipmentMfrs==6">
                    <el-form-item label="" prop="equipmentVersion">
                      <el-input v-model.trim="form.equipmentVersion" auto-complete="off" :size="$store.state.style.assemblyModel"
                                style="width: 200px;"
                                class="smallInput" disabled ref="equipmentVersion"></el-input>
                    </el-form-item>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="2. 扫描参数:" prop="scanParameters" label-width="100px">
                  <el-radio-group v-model="form.scanParameters" disabled>
                    <el-radio :label="1" ref="scanParameters">固定毫安秒扫描</el-radio>
                    <el-radio :label="2">自动毫安秒扫描</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="indent" v-if="form.scanParameters != null">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="kVp:" prop="kvpValue" labelWidth="150px">
                    <el-radio-group v-model="form.kvpValue" disabled
                                    @change="changeinputisnull('kvpValue',4,'kvpOtherValue')">
                      <el-radio :label="1" ref="kvpValue">120</el-radio>
                      <el-radio :label="2">110</el-radio>
                      <el-radio :label="3">100</el-radio>
                      <el-radio :label="4">其他，请填写
                        <div class="form-inline">
                          <el-form-item label="" prop="kvpOtherValue" v-if="form.kvpValue == 4">
                            <el-input v-model.trim="form.kvpOtherValue" placeholder="" disabled
                                      ref="kvpOtherValue"
                                      :size="$store.state.style.assemblyModel" style="width: 100px;"></el-input>
                          </el-form-item>
                        </div>
                        <div class="form-inline">
                          <el-form-item label="" prop="" v-if="form.kvpValue != 4">
                            <el-input v-model.trim="form.kvpOtherValue" placeholder="" disabled
                                      ref="kvpOtherValue"
                                      :size="$store.state.style.assemblyModel" style="width: 100px;"></el-input>
                          </el-form-item>
                        </div>
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="mA:" prop="maValue" labelWidth="150px" v-if="form.scanParameters == 1">
                <el-radio-group v-model="form.maValue" disabled>
                  <el-radio :label="1" ref="maValue">50</el-radio>
                  <el-radio :label="2">40</el-radio>
                  <el-radio :label="3">30</el-radio>
                  <el-radio :label="4">20</el-radio>
                  <el-radio :label="5">其他，请填写
                    <div class="form-inline">
                      <el-form-item label="" prop="maOtherValue" v-if="form.maValue == 5">
                        <el-input v-model.trim="form.maOtherValue" placeholder="" :size="$store.state.style.assemblyModel" style="width: 100px;" disabled
                                  ref="maOtherValue"></el-input>
                      </el-form-item>
                    </div>
                    <div class="form-inline">
                      <el-form-item label="" prop="" v-if="form.maValue != 5">
                        <el-input v-model.trim="form.maOtherValue" placeholder="" disabled :size="$store.state.style.assemblyModel"
                                  style="width: 100px;" ref="maOtherValue"></el-input>
                      </el-form-item>
                    </div>
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <div v-if="form.scanParameters == 2">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="mA(最小mA):" prop="minMaValue" labelWidth="150px">
                      <el-radio-group v-model="form.minMaValue" disabled
                                      @change="changeinputisnull('minMaValue',4,'minMaOtherValue')">
                        <el-radio :label="1" ref="minMaValue">30</el-radio>
                        <el-radio :label="2">40</el-radio>
                        <el-radio :label="3">50</el-radio>
                        <el-radio :label="4">其他，请填写
                          <div class="form-inline">
                            <el-form-item label="" prop="minMaOtherValue" v-if="form.minMaValue == 4">
                              <el-input v-model.trim="form.minMaOtherValue" ref="minMaOtherValue" placeholder=""
                                        disabled :size="$store.state.style.assemblyModel" style="width: 100px;"></el-input>
                            </el-form-item>
                          </div>
                          <div class="form-inline">
                            <el-form-item label="" prop="" v-if="form.minMaValue !=4">
                              <el-input v-model.trim="form.minMaOtherValue" ref="minMaOtherValue" placeholder=""
                                        disabled :size="$store.state.style.assemblyModel" style="width: 100px;"></el-input>
                            </el-form-item>
                          </div>
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="mA(最大mA):" prop="maxMaValue" labelWidth="150px">
                      <el-radio-group v-model="form.maxMaValue" disabled
                                      @change="changeinputisnull('maxMaValue',4,'maxMaOtherValue')">
                        <el-radio :label="1" ref="maxMaValue">300</el-radio>
                        <el-radio :label="2">250</el-radio>
                        <el-radio :label="3">200</el-radio>
                        <el-radio :label="4">其他，请填写
                          <div class="form-inline">
                            <el-form-item label="" prop="maxMaOtherValue" v-if="form.maxMaValue == 4">
                              <el-input v-model.trim="form.maxMaOtherValue" ref="maxMaOtherValue" placeholder=""
                                        disabled :size="$store.state.style.assemblyModel" style="width: 100px;"></el-input>
                            </el-form-item>
                          </div>
                          <div class="form-inline">
                            <el-form-item label="" prop="" v-if="form.maxMaValue != 4">
                              <el-input v-model.trim="form.maxMaOtherValue" ref="maxMaOtherValue" placeholder=""
                                        disabled :size="$store.state.style.assemblyModel" style="width: 100px;"></el-input>
                            </el-form-item>
                          </div>
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="噪声指数:" prop="noiseLevel" labelWidth="150px">
                      <el-radio-group v-model="form.noiseLevel" disabled
                                      @change="changeinputisnull('noiseLevel',2,'noiseLevelOther')">
                        <el-radio :label="1" ref="noiseLevel">40</el-radio>
                        <el-radio :label="2">其他，请填写
                          <div class="form-inline">
                            <el-form-item label="" prop="noiseLevelOther" v-if="form.noiseLevel == 4">
                              <el-input v-model.trim="form.noiseLevelOther" ref="noiseLevelOther" placeholder=""
                                        :disabled="form.noiseLevel != 2" :size="$store.state.style.assemblyModel" style="width: 100px;"></el-input>
                            </el-form-item>
                          </div>
                          <div class="form-inline">
                            <el-form-item label="" prop="" v-if="form.noiseLevel != 4">
                              <el-input v-model.trim="form.noiseLevelOther" ref="noiseLevelOther" placeholder=""
                                        :disabled="form.noiseLevel != 2" :size="$store.state.style.assemblyModel" style="width: 100px;"></el-input>
                            </el-form-item>
                          </div>
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <el-form-item label="旋转时间（s）:" prop="slewTime" labelWidth="150px">
                <el-radio-group v-model="form.slewTime" @change="changeinputisnull('slewTime',5,'slewTimeOther')"
                                disabled>
                  <el-radio :label="1" ref="slewTime">0.4</el-radio>
                  <el-radio :label="2">0.5</el-radio>
                  <el-radio :label="3">0.8</el-radio>
                  <el-radio :label="4">1.0</el-radio>
                  <el-radio :label="5">其他，请填写
                    <div class="form-inline">
                      <el-form-item label="" prop="slewTimeOther" v-if="form.slewTime == 5">
                        <el-input v-model.trim="form.slewTimeOther" ref="slewTimeOther" placeholder=""
                                  :disabled="form.slewTime != 5" :size="$store.state.style.assemblyModel" style="width: 100px;"></el-input>
                      </el-form-item>
                    </div>
                    <div class="form-inline">
                      <el-form-item label="" prop="" v-if="form.slewTime != 5">
                        <el-input v-model.trim="form.slewTimeOther" ref="slewTimeOther" placeholder=""
                                  :disabled="form.slewTime != 5" :size="$store.state.style.assemblyModel" style="width: 100px;"></el-input>
                      </el-form-item>
                    </div>
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <el-row>
              <el-col :span="24">
                <el-form-item label="3. 重建算法和层厚：" label-width="170px" class="form-item">
                  <br>
                  <table class="form-table">
                    <tr class="form-table-head">
                      <td>重建算法</td>
                      <td style="width: 350px;">图像层厚（mm）</td>
                      <td style="width: 350px">重建间隔（mm）</td>
                    </tr>
                    <tr>
                      <td rowspan="2">
                        <el-checkbox v-model="flabImageDeepChecked" disabled> 标准/软组织（必做）</el-checkbox>
                      </td>
                      <td>
                        <span>  常规层厚：</span>
                        <el-form-item label="" prop="flabImageDeep">
                          <el-radio-group v-model="form.flabImageDeep" @change="deepChange('flabImageDeep','flabImageDeepOther')" disabled>
                            <el-radio label="1">5．0 mm</el-radio>
                            <br>
                            <el-radio label="0">其他，请填写</el-radio>
                            <span>
                                 <el-form-item label="" prop="flabImageDeepOther"  style="display: inline-block;" :inline-message="true" v-if="form.flabImageDeep === '0'">
                                    <el-input v-model.trim="form.flabImageDeepOther" disabled :size="$store.state.style.assemblyModel"
                                              style="width: 80px;" ref="flabImageDeepOther"></el-input>　ｍｍ
                                  </el-form-item>
                              </span>
                            <span>
                                 <el-form-item label="" prop="" style="display: inline-block;"  v-if="form.flabImageDeep !== '0'">
                                    <el-input v-model.trim="form.flabImageDeepOther" disabled :size="$store.state.style.assemblyModel"
                                              style="width: 80px;" ref="flabImageDeepOther"></el-input>　ｍｍ
                                  </el-form-item>
                              </span>
                          </el-radio-group>
                        </el-form-item>

                      </td>
                      <td>
                        <span>  常规层厚：</span>
                        <el-form-item label="" prop="flabReconstructionDeep">
                          <el-radio-group v-model="form.flabReconstructionDeep" @change="deepChange('flabReconstructionDeep','flabReconstructionDeepOther')" disabled>
                            <el-radio label="1">5．0 mm</el-radio>
                            <br>
                            <el-radio label="0">其他，请填写</el-radio>
                            <span>
                                 <el-form-item label="" prop="flabReconstructionDeepOther"  style="display: inline-block;" :inline-message="true" v-if="form.flabReconstructionDeep === '0'">
                                    <el-input v-model.trim="form.flabReconstructionDeepOther" disabled :size="$store.state.style.assemblyModel"
                                              style="width: 80px;" ref="flabReconstructionDeepOther"></el-input>　ｍｍ
                                  </el-form-item>
                              </span>
                            <span>
                                 <el-form-item label="" prop="" style="display: inline-block;"  v-if="form.flabReconstructionDeep !== '0'">
                                    <el-input v-model.trim="form.flabReconstructionDeepOther" disabled :size="$store.state.style.assemblyModel"
                                              style="width: 80px;" ref="flabReconstructionDeepOther"></el-input>　ｍｍ
                                  </el-form-item>
                              </span>
                          </el-radio-group>
                        </el-form-item>

                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>  薄层：</span>
                        <el-form-item label="" prop="flabImageShallow">
                          <el-radio-group v-model="form.flabImageShallow"  @change="deepChange('flabImageShallow','flabImageShallowOther')"  disabled>
                            <el-radio label="1">1．0 mm</el-radio>
                            <br>
                            <el-radio label="2">1．25 mm</el-radio>
                            <br>
                            <el-radio label="0">其他，请填写</el-radio>
                            <span>
                                   <el-form-item label="" prop="flabImageShallowOther"  style="display: inline-block;" :inline-message="true" v-if="form.flabImageShallow === '0'">
                                      <el-input v-model.trim="form.flabImageShallowOther" disabled :size="$store.state.style.assemblyModel"
                                                style="width: 80px;" ref="flabImageShallowOther"></el-input>　ｍｍ
                                    </el-form-item>
                                </span>
                            <span>
                                   <el-form-item label="" prop="" style="display: inline-block;"  v-if="form.flabImageShallow !== '0'">
                                      <el-input v-model.trim="form.flabImageShallowOther" disabled :size="$store.state.style.assemblyModel"
                                                style="width: 80px;" ref="flabImageShallowOther"></el-input>　ｍｍ
                                    </el-form-item>
                                </span>
                          </el-radio-group>
                        </el-form-item>
                      </td>
                      <td>
                        <span>  薄层：</span>
                        <el-form-item label="" prop="flabReconstructionShallow">
                          <el-radio-group v-model="form.flabReconstructionShallow"  @change="deepChange('flabReconstructionShallow','flabReconstructionShallowOther')"  disabled>
                            <el-radio label="1">0．8 mm</el-radio>
                            <br>
                            <el-radio label="2">1．0 mm</el-radio>
                            <br>
                            <el-radio label="3">1．25 mm</el-radio>
                            <br>
                            <el-radio label="0">其他，请填写</el-radio>
                            <span>
                                 <el-form-item label="" prop="flabReconstructionShallowOther"  style="display: inline-block;" :inline-message="true" v-if="form.flabReconstructionShallow === '0'">
                                    <el-input v-model.trim="form.flabReconstructionShallowOther" disabled :size="$store.state.style.assemblyModel"
                                              style="width: 80px;" ref="flabReconstructionShallowOther"></el-input>　ｍｍ
                                  </el-form-item>
                              </span>
                            <span>
                                 <el-form-item label="" prop="" style="display: inline-block;"  v-if="form.flabReconstructionShallow !== '0'">
                                    <el-input v-model.trim="form.flabReconstructionShallowOther" disabled :size="$store.state.style.assemblyModel"
                                              style="width: 80px;" ref="flabReconstructionShallowOther"></el-input>　ｍｍ
                                  </el-form-item>
                              </span>
                          </el-radio-group>
                        </el-form-item>
                      </td>
                    </tr>
                    <tr>
                      <td rowspan="2">
                        <el-checkbox  v-model="flabImageDeepChecked1" @change="flabImageDeepChecked1Change" disabled>
                          肺（Lung）（可选做）
                        </el-checkbox>
                      </td>

                      <td>
                        <span>  常规层厚：</span>
                        <span>
                           <el-form-item label="" prop="lungImageDeep" v-if="flabImageDeepChecked1">
                            <el-radio-group v-model="form.lungImageDeep"  @change="deepChange('lungImageDeep','lungImageDeepOther')"  disabled>
                              <el-radio label="1">5．0 mm</el-radio>
                              <br>
                              <el-radio label="0">其他，请填写</el-radio>
                              <span>
                                   <el-form-item label="" prop="lungImageDeepOther"  style="display: inline-block;" :inline-message="true" v-if="form.lungImageDeep === '0'">
                                      <el-input v-model.trim="form.lungImageDeepOther" disabled :size="$store.state.style.assemblyModel"
                                                style="width: 80px;" ref="lungImageDeepOther"></el-input>　ｍｍ
                                    </el-form-item>
                                </span>
                              <span>
                                   <el-form-item label="" prop="" style="display: inline-block;"  v-if="form.lungImageDeep !== '0'">
                                      <el-input v-model.trim="form.lungImageDeepOther" disabled :size="$store.state.style.assemblyModel"
                                                style="width: 80px;" ref="lungImageDeepOther"></el-input>　ｍｍ
                                    </el-form-item>
                                </span>
                            </el-radio-group>
                          </el-form-item>
                        </span>
                        <span>
                           <el-form-item label="" prop="" v-if="!flabImageDeepChecked1 ">
                            <el-radio-group v-model="form.lungImageDeep" :disabled="!flabImageDeepChecked1 || disabledShowState">
                              <el-radio label="1">5．0 mm</el-radio>
                              <br>
                              <el-radio label="0">其他，请填写</el-radio>
                              <span>
                                   <el-form-item label="" prop="lungImageDeepOther"  style="display: inline-block;" :inline-message="true" v-if="form.lungImageDeep === '0'">
                                      <el-input v-model.trim="form.lungImageDeepOther" disabled :size="$store.state.style.assemblyModel"
                                                style="width: 80px;" ref="lungImageDeepOther"></el-input>　ｍｍ
                                    </el-form-item>
                                </span>
                              <span>
                                   <el-form-item label="" prop="" style="display: inline-block;"  v-if="form.lungImageDeep !== '0'">
                                      <el-input v-model.trim="form.lungImageDeepOther" disabled :size="$store.state.style.assemblyModel"
                                                style="width: 80px;" ref="lungImageDeepOther"></el-input>　ｍｍ
                                    </el-form-item>
                                </span>
                            </el-radio-group>
                          </el-form-item>
                        </span>
                      </td>
                      <td>
                        <span>  常规层厚：</span>
                        <span>
                           <el-form-item label="" prop="lungReconstructionDeep" v-if="flabImageDeepChecked1">
                            <el-radio-group v-model="form.lungReconstructionDeep"  @change="deepChange('lungReconstructionDeep','lungReconstructionDeepOther')"  disabled>
                              <el-radio label="1">5．0 mm</el-radio>
                              <br>
                              <el-radio label="0">其他，请填写</el-radio>
                              <span>
                                   <el-form-item label="" prop="lungReconstructionDeepOther"  style="display: inline-block;" :inline-message="true" v-if="form.lungReconstructionDeep === '0'">
                                      <el-input v-model.trim="form.lungReconstructionDeepOther" disabled :size="$store.state.style.assemblyModel"
                                                style="width: 80px;" ref="lungReconstructionDeepOther"></el-input>　ｍｍ
                                    </el-form-item>
                                </span>
                              <span>
                                   <el-form-item label="" prop="" style="display: inline-block;"  v-if="form.lungReconstructionDeep !== '0'">
                                      <el-input v-model.trim="form.lungReconstructionDeepOther" disabled :size="$store.state.style.assemblyModel"
                                                style="width: 80px;" ref="lungReconstructionDeepOther"></el-input>　ｍｍ
                                    </el-form-item>
                                </span>
                            </el-radio-group>
                          </el-form-item>
                        </span>
                        <span>
                           <el-form-item label="" prop="" v-if="!flabImageDeepChecked1">
                            <el-radio-group v-model="form.lungReconstructionDeep" :disabled="!flabImageDeepChecked1 || disabledShowState" >
                              <el-radio label="1">5．0 mm</el-radio>
                              <br>
                              <el-radio label="0">其他，请填写</el-radio>
                              <span>
                                   <el-form-item label="" prop="lungReconstructionDeepOther"  style="display: inline-block;" :inline-message="true" v-if="form.lungReconstructionDeep === '0'">
                                      <el-input v-model.trim="form.lungReconstructionDeepOther" disabled :size="$store.state.style.assemblyModel"
                                                style="width: 80px;" ref="lungReconstructionDeepOther"></el-input>　ｍｍ
                                    </el-form-item>
                                </span>
                              <span>
                                   <el-form-item label="" prop="" style="display: inline-block;"  v-if="form.lungReconstructionDeep !== '0'">
                                      <el-input v-model.trim="form.lungReconstructionDeepOther" disabled :size="$store.state.style.assemblyModel"
                                                style="width: 80px;" ref="lungReconstructionDeepOther"></el-input>　ｍｍ
                                    </el-form-item>
                                </span>
                            </el-radio-group>
                          </el-form-item>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>  薄层：</span>
                        <span>
                           <el-form-item label="" prop="lungImageShallow" v-if="flabImageDeepChecked1">
                          <el-radio-group v-model="form.lungImageShallow" @change="deepChange('lungImageShallow','lungImageShallowOther')"  disabled>
                            <el-radio label="1">1．0 mm</el-radio>
                            <br>
                            <el-radio label="2">1．25 mm</el-radio>
                            <br>
                            <el-radio label="0">其他，请填写</el-radio>
                            <span>
                                 <el-form-item label="" prop="lungImageShallowOther"  style="display: inline-block;" :inline-message="true" v-if="form.lungImageShallow === '0'">
                                    <el-input v-model.trim="form.lungImageShallowOther" disabled :size="$store.state.style.assemblyModel"
                                              style="width: 80px;" ref="lungImageShallowOther"></el-input>　ｍｍ
                                  </el-form-item>
                              </span>
                            <span>
                                 <el-form-item label="" prop="" style="display: inline-block;"  v-if="form.lungImageShallow !== '0'">
                                    <el-input v-model.trim="form.lungImageShallowOther" disabled :size="$store.state.style.assemblyModel"
                                              style="width: 80px;" ref="lungImageShallowOther"></el-input>　ｍｍ
                                  </el-form-item>
                              </span>
                          </el-radio-group>
                        </el-form-item>
                        </span>
                        <span>
                           <el-form-item label="" prop="" v-if="!flabImageDeepChecked1">
                          <el-radio-group v-model="form.lungImageShallow" :disabled="!flabImageDeepChecked1 || disabledShowState" >
                            <el-radio label="1">1．0 mm</el-radio>
                            <br>
                            <el-radio label="2">1．25 mm</el-radio>
                            <br>
                            <el-radio label="0">其他，请填写</el-radio>
                            <span>
                                 <el-form-item label="" prop="lungImageShallowOther"  style="display: inline-block;" :inline-message="true" v-if="form.lungImageShallow === '0'">
                                    <el-input v-model.trim="form.lungImageShallowOther" disabled :size="$store.state.style.assemblyModel"
                                              style="width: 80px;" ref="lungImageShallowOther"></el-input>　ｍｍ
                                  </el-form-item>
                              </span>
                            <span>
                                 <el-form-item label="" prop="" style="display: inline-block;"  v-if="form.lungImageShallow !== '0'">
                                    <el-input v-model.trim="form.lungImageShallowOther" disabled :size="$store.state.style.assemblyModel"
                                              style="width: 80px;" ref="lungImageShallowOther"></el-input>　ｍｍ
                                  </el-form-item>
                              </span>
                          </el-radio-group>
                        </el-form-item>
                        </span>
                      </td>
                      <td>
                        <span>  薄层：</span>
                        <span>
                           <el-form-item label="" prop="lungReconstructionShallow" v-if="flabImageDeepChecked1">
                          <el-radio-group v-model="form.lungReconstructionShallow"  @change="deepChange('lungReconstructionShallow','lungReconstructionShallowOther')"  disabled>
                            <el-radio label="1">0．8 mm</el-radio>
                            <br>
                            <el-radio label="2">1．0 mm</el-radio>
                            <br>
                            <el-radio label="3">1．25 mm</el-radio>
                            <br>
                            <el-radio label="0">其他，请填写</el-radio>
                            <span>
                                 <el-form-item label="" prop="lungReconstructionShallowOther"  style="display: inline-block;" :inline-message="true" v-if="form.lungReconstructionShallow === '0'">
                                    <el-input v-model.trim="form.lungReconstructionShallowOther" disabled :size="$store.state.style.assemblyModel"
                                              style="width: 80px;" ref="lungReconstructionShallowOther"></el-input>　ｍｍ
                                  </el-form-item>
                              </span>
                            <span>
                                 <el-form-item label="" prop="" style="display: inline-block;"  v-if="form.lungReconstructionShallow !== '0'">
                                    <el-input v-model.trim="form.lungReconstructionShallowOther" disabled :size="$store.state.style.assemblyModel"
                                              style="width: 80px;" ref="lungReconstructionShallowOther"></el-input>　ｍｍ
                                  </el-form-item>
                              </span>
                          </el-radio-group>
                        </el-form-item>
                        </span>
                        <span>
                           <el-form-item label="" prop="" v-if="!flabImageDeepChecked1">
                          <el-radio-group v-model="form.lungReconstructionShallow" :disabled="!flabImageDeepChecked1 ||  disabledShowState">
                            <el-radio label="1">0．8 mm</el-radio>
                            <br>
                            <el-radio label="2">1．0 mm</el-radio>
                            <br>
                            <el-radio label="3">1．25 mm</el-radio>
                            <br>
                            <el-radio label="0">其他，请填写</el-radio>
                            <span>
                                 <el-form-item label="" prop="lungReconstructionShallowOther"  style="display: inline-block;" :inline-message="true" v-if="form.lungReconstructionShallow === '0'">
                                    <el-input v-model.trim="form.lungReconstructionShallowOther" disabled :size="$store.state.style.assemblyModel"
                                              style="width: 80px;" ref="lungReconstructionShallowOther"></el-input>　ｍｍ
                                  </el-form-item>
                              </span>
                            <span>
                                 <el-form-item label="" prop="" style="display: inline-block;"  v-if="form.lungReconstructionShallow !== '0'">
                                    <el-input v-model.trim="form.lungReconstructionShallowOther" disabled :size="$store.state.style.assemblyModel"
                                              style="width: 80px;" ref="lungReconstructionShallowOther"></el-input>　ｍｍ
                                  </el-form-item>
                              </span>
                          </el-radio-group>
                        </el-form-item>
                        </span>
                      </td>
                    </tr>
                  </table>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="4. 剂量参数:" class="form-item" labelWidth="140px">
              <br>
              <table class="form-table">
                <tr class="form-table-head">
                  <td style="width: 440px;">剂量参数</td>
                  <td style="width: 200px;">数值</td>
                </tr>
                <tr>
                  <td>容积CT剂量加权指数（CTDIvol）（mGy）</td>
                  <td>
                    <p>
                      <el-form-item label="" prop="ctdlvol">
                        <el-input v-model.trim="form.ctdlvol" disabled :size="$store.state.style.assemblyModel"
                                  style="width: 60px;" ref="ctdlvol"></el-input>
                      </el-form-item>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    剂量长度乘积（DLP）（mGy·cm）
                  </td>
                  <td>
                    <p>
                      <el-form-item label="">
                        <el-input v-model.trim="form.dlp" disabled :size="$store.state.style.assemblyModel" style="width: 60px;"
                                  ref="dlp"></el-input>
                      </el-form-item>
                    </p>
                  </td>
                </tr>
              </table>
            </el-form-item>
          </div>
        </div>
        <div class="formcon">
          <div class="title">
            图像质量
          </div>
          <div class="form-body-content">
            <el-row>
              <el-col :span="24">
                <el-form-item label="1. CT图像扫描情况:" prop="ctImageScanning" labelWidth="200px" class="form-item">
                  <div style="margin-top: 40px;">
                    <el-radio-group v-model="form.ctImageScanning" disabled>
                      <el-radio :label="1" class="radio" ref="ctImageScanning">A.CT图像可以提供诊断信息</el-radio>
                      <br>
                      <el-radio :label="2" class="radio">B.CT图像提供诊断信息有限，但尚可以诊断</el-radio>
                      <br>
                      <el-radio :label="3" class="radio">C.CT图像不能提供有效诊断信息，需重新预约CT检查</el-radio>
                      <br>
                      <el-radio :label="4" class="radio">D.没有图像</el-radio>
                    </el-radio-group>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="form.ctImageScanning != 1">
              <el-col :span="24">
                <el-form-item label="2. 造成此次检查图像提供诊断信息有限或不能提供有效诊断信息的原因（可多选）:" class="form-item" prop="item2"
                              labelWidth="600px">
                  <br>
                  <el-checkbox-group v-model="form.item2" @change="item2Change">
                    <el-checkbox :label="1" ref="item2">A.非最大吸气末时屏气扫描</el-checkbox>
                    <br>
                    <el-checkbox :label="2">B.身体运动伪影</el-checkbox>
                    <br>
                    <el-checkbox :label="3">C.呼吸运动伪影</el-checkbox>
                    <br>
                    <el-checkbox :label="4">D.扫描技术参数不正确</el-checkbox>
                    <br>
                    <el-checkbox :label="5">E.CT图像未包括整个胸部范围</el-checkbox>
                    <br>
                    <el-checkbox :label="6">F.严重的硬化射束伪影（如：受检者衣物配饰、吊坠、内衣扣等高密度物体造成放射状伪影）</el-checkbox>
                    <br>
                    <el-checkbox :label="7">G.不均匀光子造成的伪影</el-checkbox>
                    <br>
                    <el-checkbox :label="8">其他,如：
                      <span>
                         <el-form-item label="" prop="ctImageScanningReasonOther"
                                       style="margin-bottom: 20px; width: 200px;display: inline-block;margin-left: -30px;"
                                       v-if="form.item2.indexOf(8)>-1">
                          <el-input v-model.trim="form.ctImageScanningReasonOther"
                                    auto-complete="off" :size="$store.state.style.assemblyModel" ref="ctImageScanningReasonOther"
                                    disabled></el-input>
                         </el-form-item>
                      </span>
                      <span>
                        <el-form-item label="" prop=""
                                      style="margin-bottom: 20px; width: 200px;display: inline-block;margin-left: -30px;"
                                      v-if="form.item2.indexOf(8)<0">
                          <el-input v-model.trim="form.ctImageScanningReasonOther" auto-complete="off" :size="$store.state.style.assemblyModel"
                                    ref="ctImageScanningReasonOther" disabled></el-input>
                        </el-form-item>
                       </span>

                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="formcon">
          <div class="title">
            既往影像回顾
          </div>
          <div class="form-body-content">
            <el-row>
              <el-col :span="24">
                <el-form-item label="1. 是否回顾既往影像检查结果（包括筛查间隔期内的影像检查结果）？" prop="reviewCtResult" labelWidth="550px"
                              class="form-item">
                  <br>
                  <el-radio-group v-model="form.reviewCtResult" disabled>
                    <el-radio :label="1" ref="reviewCtResult">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" v-if="form.reviewCtResult == 1">
                <div class="div-scroll">
                  <table class="form-table-content" v-if="$route.query.flag == 1">
                    <tr class="form-table-head">
                      <td
                        style="width: 200px;height: 40px;border-bottom: 1px solid #000000;border-right: 1px solid #000000;text-align: center;"
                        ref="form_table_td" :colspan="form.ctPastResultPOList.length+1">既往影像描述
                      </td>
                    </tr>
                    <tr>
                      <td class="form-td-title">
                        <p style="width: 160px;">既往影像日期</p>
                        <p style="width: 160px;">
                          既往影像检查方法
                        </p>
                        <p style="height: 140px;width: 160px;">
                          既往影像检查部位
                          <small>（如有CT或MRI则必填）</small>
                        </p>
                        <p style="height: 140px;width: 160px;" v-if="form.stage == 2 || form.stage == 3">既往影像检查类别</p>
                      </td>
                      <td v-for="(x,index) in form.ctPastResultPOList" class="form-td-content" :key="index">
                        <p>
                          <el-form-item label="" :prop="'ctPastResultPOList.'+index+'.examinationDate'"
                                        :rules="ctPastResultPOListRules.examinationDate">
                            <el-date-picker
                              v-model="x.examinationDate"
                              type="date"
                              placeholder="选择日期"
                              format="yyyy 年 MM 月 dd 日"
                              :size="$store.state.style.assemblyModel"
                              disabled
                              :ref="'ctPastResultPOList.'+index+'.examinationDate'"
                              style="width: 200px;"
                              value-format="yyyy-MM-dd">
                            </el-date-picker>
                          </el-form-item>
                        </p>
                        <p>
                          <el-form-item label="" :prop="'ctPastResultPOList.'+index+'.examinationMethod'"
                                        :rules="ctPastResultPOListRules.examinationMethod">
                            <el-select v-model="x.examinationMethod" placeholder="请选择" :size="$store.state.style.assemblyModel"
                                       disabled
                                       :ref="'ctPastResultPOList.'+index+'.examinationMethod'">
                              <el-option
                                v-for="items in methodsOptions"
                                :key="items.value"
                                :label="items.label"
                                :value="items.value"
                              >
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </p>
                        <p style="height: 140px;">
                          <span>
                              <el-form-item class="float-form-item" :prop="'ctPastResultPOList.'+index+'.checkList'"
                                            v-if="x.examinationMethod == 1 || x.examinationMethod == 3"
                                            :rules="ctPastResultPOListRules.checkList">
                              <el-checkbox-group v-model="x.checkList" disabled
                                                 @change="checkListChange(x,index)">
                                <el-checkbox :label="1" :ref="'ctPastResultPOList.'+index+'.checkList'">胸部</el-checkbox>
                                <el-checkbox :label="2">腹部</el-checkbox>
                                <el-checkbox :label="3">盆腔</el-checkbox>
                                <el-checkbox :label="4">脑</el-checkbox>
                                <el-checkbox :label="5">其他
                                  <span>
                                     <el-form-item label="" :prop="'ctPastResultPOList.'+index+'.examinationOtherStr'"
                                                   :rules="ctPastResultPOListRules.examinationOtherStr"
                                                   style="display: inline-block;" v-if="x.checkList.indexOf(5) >-1">
                                        <el-input v-model.trim="x.examinationOtherStr" style="width: 80px;"
                                                  disabled
                                                  auto-complete="off" :size="$store.state.style.assemblyModel"
                                                  :ref="'ctPastResultPOList.'+index+'.examinationOtherStr'"></el-input>
                                     </el-form-item>
                                  </span>
                                  <span>
                                     <el-form-item label="" prop="" style="display: inline-block;"
                                                   v-if="x.checkList.indexOf(5) < 0">
                                        <el-input v-model.trim="x.examinationOtherStr" style="width: 80px;"
                                                  auto-complete="off" :size="$store.state.style.assemblyModel" disabled></el-input>
                                     </el-form-item>
                                  </span>
                                </el-checkbox>
                                </el-checkbox-group>
                              </el-form-item>
                            </span>
                          <span>
                                <el-form-item class="float-form-item" prop=""
                                              v-if="x.examinationMethod != 1 && x.examinationMethod != 3">
                                <el-checkbox-group v-model="x.checkList" @change="checkListChange(x,index)">
                                  <el-checkbox :label="1">胸部</el-checkbox>
                                  <el-checkbox :label="2">腹部</el-checkbox>
                                  <el-checkbox :label="3">盆腔</el-checkbox>
                                  <el-checkbox :label="4">脑</el-checkbox>
                                  <el-checkbox :label="5">其他
                                   <span>
                                     <el-form-item label="" :prop="'ctPastResultPOList.'+index+'.examinationOtherStr'"
                                                   :rules="ctPastResultPOListRules.examinationOtherStr"
                                                   v-if="x.checkList.indexOf(5) >-1" style="display: inline-block;">
                                        <el-input v-model.trim="x.examinationOtherStr" style="width: 80px;"
                                                  disabled
                                                  auto-complete="off" :size="$store.state.style.assemblyModel"
                                                  :ref="'ctPastResultPOList.'+index+'.examinationOtherStr'"></el-input>
                                     </el-form-item>
                                  </span>
                                     <span>
                                     <el-form-item label="" prop="" v-if="x.checkList.indexOf(5) < 0"
                                                   style="display: inline-block;">
                                        <el-input v-model.trim="x.examinationOtherStr" style="width: 80px;" disabled
                                                  auto-complete="off" :size="$store.state.style.assemblyModel"></el-input>
                                     </el-form-item>
                                  </span>
                                  </el-checkbox>
                                  </el-checkbox-group>
                                </el-form-item>
                              </span>

                        </p>
                        <p style="height: 140px;" v-if="form.stage == 2 || form.stage == 3">
                          <el-form-item label="" :prop="'ctPastResultPOList.'+index+'.classes'"
                                        :rules="ctPastResultPOListRules.classes" style="height: 60px;">
                            <el-checkbox-group v-model="x.classes" disabled
                                               @change="classesChange(x)">
                              <el-checkbox :label="1" :ref="'ctPastResultPOList.'+index+'.classes'">基线</el-checkbox>
                              <el-checkbox :label="2">年度</el-checkbox>
                              <el-checkbox :label="3">随访</el-checkbox>
                              <el-checkbox :label="4">诊断</el-checkbox>
                            </el-checkbox-group>
                          </el-form-item>
                        </p>
                      </td>
                    </tr>
                  </table>
                </div>
                <!--<div class="addButton" v-if="$route.query.flag == 1">-->
                  <!--<el-button icon="el-icon-plus" circle :disabled="this.form.ctPastResultPOList.length>20"-->
                             <!--@click="addItem('plus')"></el-button>-->
                  <!--<el-button icon="el-icon-minus" circle :disabled="this.form.ctPastResultPOList.length<2"-->
                             <!--@click="addItem('minus')"></el-button>-->
                <!--</div>-->
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="formcon">
          <div class="title">
            结节发现
          </div>
          <div class="form-body-content">
            <el-row>
              <el-col :span="24">
                <el-form-item label="1. 是否有非钙化结节（无论大小）？" prop="tubercle" labelWidth="320px" class="form-item">
                  <br>
                  <el-radio-group v-model="form.tubercle" disabled>
                    <el-radio :label="1" ref="tubercle">是,结节数目
                      <div class="form-inline">
                        <el-form-item label="" prop="tubercleCount" class="form-item1" style="display: inline-block"
                                      v-if="form.tubercle == 1">
                          <el-input v-model.trim="form.tubercleCount" placeholder="" ref="tubercleCount"
                                    disabled
                                    :size="$store.state.style.assemblyModel" style="width: 100px;"></el-input>
                        </el-form-item>
                      </div>
                      <div class="form-inline">
                        <el-form-item label="" prop="" class="form-item1" style="display: inline-block"
                                      v-if="form.tubercle != 1">
                          <el-input v-model.trim="form.tubercleCount" placeholder="" :disabled="form.tubercle != 1"
                                    :size="$store.state.style.assemblyModel" style="width: 100px;"></el-input>
                        </el-form-item>
                      </div>
                      个
                    </el-radio>
                    <el-radio :label="2">否（跳至“其他异常情况”部分）</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <div v-if="form.tubercle == 1">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="2. 是否所有结节均＜5mm（不包括含肯定良性钙化成份的结节或肿块）？" prop="tubercleLessFive" labelWidth="540px"
                                class="form-item">
                    <br>
                    <el-radio-group v-model="form.tubercleLessFive" disabled>
                      <el-radio :label="1" ref="tubercleLessFive">是</el-radio>
                      <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <div v-if="form.tubercleLessFive == 2">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="3. 结节是否≥5mm（不包括含肯定良性钙化成份的结节或肿块）？" prop="tubercleGreaterFive" labelWidth="530px"
                                  class="form-item">
                      <br>
                      <el-radio-group v-model="form.tubercleGreaterFive" disabled>
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="2">否（跳至“其他异常情况”部分）</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" v-if="form.tubercleGreaterFive == 1">
                    <div style="margin-left: 40px;">
                      <el-form-item label="检出≥5mm结节的数量：（请按结节从大到小顺序填写）" prop="item8_3" labelWidth="450px"
                                    class="form-item">
                        <br>
                        <el-radio-group v-model="form.item8_3" @change="addTableTubercleList()"
                                        disabled>
                          <el-radio :label="1">≤10枚，共
                            <div class="form-inline">
                              <el-form-item label="" prop="lessTenCount" class="form-item1"
                                            style="display: inline-block;" v-if="form.item8_3 == 1">
                                <el-input v-model.trim="form.lessTenCount" @input="addTableTubercleList()"
                                          placeholder="" disabled :size="$store.state.style.assemblyModel"
                                          style="width: 50px;"></el-input>
                              </el-form-item>
                            </div>
                            <div class="form-inline">
                              <el-form-item label="" prop="" class="form-item1" style="display: inline-block;"
                                            v-if="form.item8_3 != 1">
                                <el-input v-model.trim="form.lessTenCount" placeholder=""
                                          disabled :size="$store.state.style.assemblyModel" style="width: 50px;"></el-input>
                              </el-form-item>
                            </div>
                            枚（每一个结节均需要填写下述“结节描述 & 位置”表）
                          </el-radio>
                          <br>
                          <el-radio :label="2" style="margin-top: 20px">超过10枚，共
                            <div class="form-inline">
                              <el-form-item label="" prop="greaterTenCount" class="form-item1"
                                            style="display: inline-block;" v-if="form.item8_3 == 2">
                                <el-input v-model.trim="form.greaterTenCount" @input="addTableTubercleList()"
                                          placeholder="" disabled :size="$store.state.style.assemblyModel"
                                          style="width: 50px;"></el-input>
                              </el-form-item>
                            </div>
                            <div class="form-inline">
                              <el-form-item label="" prop="" class="form-item1" style="display: inline-block;"
                                            v-if="form.item8_3 != 2">
                                <el-input v-model.trim="form.greaterTenCount" placeholder=""
                                          disabled :size="$store.state.style.assemblyModel" style="width: 50px;"></el-input>
                              </el-form-item>
                            </div>
                            枚（按病变严重程度，填写10个“结节描述 & 位置”表）
                          </el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <div class="div" v-if="countState">
                    <table class="ctTubercleInfoPOList-table">
                      <tr>
                        <td class="ctTubercleInfoPOList-table-title">
                          <p>
                            结节编号
                          </p>
                          <p style="height: 80px;">
                            序列编号 <br>
                            <small style="font-size: 11px;">(直径最大层面或序列编号，或最具代表性的层面)</small>
                          </p>
                          <p>
                            图像号
                          </p>
                          <p class="tabled-td-anatomicalPosition tabled-td-bt">
                            解剖位置　<br>
                            <span>1. 右上叶</span><br>
                            <span>2. 右中叶</span><br>
                            <span>3. 右下叶</span><br>
                            <span>4. 左上叶</span><br>
                            <span>5. 左下叶</span><br>
                            <span>6. 叶间胸膜面</span><br>
                          </p>
                          <p class="tabled-td-density tabled-td-bt">
                            密度<br>
                            <span>1. 实性</span><br>
                            <span>2. 部分实性</span><br>
                            <span>3. 非实性(纯磨玻璃密度)</span><br>
                          </p>
                          <p class="tabled-td-densityOther tabled-td-bt">
                            其他描述（可多选）
                          </p>
                          <p>
                            <span class="form-item-title-big">结节大小</span>
                          </p>
                          <p>
                            长径（mm）
                          </p>
                          <p>
                            垂直短径（mm）
                          </p>
                          <p>
                            平均径（mm）
                          </p>
                          <p>
                            体积（mm³）<br>
                            <small style="font-size: 11px">（如果已测量）</small>
                          </p>
                          <p>
                           <span class="form-item-title-big">实性部分大小
                           <br></span>
                            <small style="font-size: 11px">（如果为部分实性结节）</small>
                          </p>
                          <p>
                            长径（mm）
                          </p>
                          <p>
                            垂直短径（mm）
                          </p>
                          <p>
                            平均径（mm）
                          </p>
                          <p>
                            体积（mm³）<br>
                            <small style="font-size: 11px">（如果已测量）</small>
                          </p>
                          <p class="tabled-td-shape tabled-td-bt">
                            形状<br>
                            <span>1. 圆形</span><br>
                            <span>2. 椭圆形</span><br>
                            <span>3. 分叶状</span><br>
                            <span>4. 不规则</span><br>
                            <span>5. 不能定义</span><br>
                          </p>
                          <p class="tabled-td-edge tabled-td-bt">
                            边缘<br>
                            <span>1. 毛刺(星状)</span><br>
                            <span>2. 清楚</span><br>
                            <span>3. 光滑</span><br>
                            <span>4. 模糊</span><br>
                            <span>5. 难以判断</span><br>
                          </p>
                          <span v-if="form.stage ==2 || form.stage == 3">
                            <p>
                              <span class="form-item-title-big">结节的间期变化</span>
                            </p>
                            <p class="tabled-td-density tabled-td-bt">
                              是否有任何间期改变<br>
                              <span>1. 是</span><br>
                              <span>2. 否</span><br>
                            </p>
                            <p class="tabled-td-density tabled-td-bt">
                              结节总体大小改变(mm)<br>
                              <span>1. 增大</span><br>
                              <span>2. 缩小</span><br>
                              <span>3. 无变化</span><br>
                            </p>
                            <p>
                              结节总体大小改变的数值(mm)
                            </p>
                            <p class="tabled-td-edge tabled-td-bt">
                              结节实体成分的大小改变<br>
                              <span>1. 增大</span><br>
                              <span>2. 缩小</span><br>
                              <span>3. 无变化</span><br>
                              <span>4. 新出现</span><br>
                            </p>
                            <p style="height: 60px;">
                              结节实体成分大小改变的数值
                            </p>
                            <p class="tabled-td-edge tabled-td-bt">
                              结节密度改变<br>
                              <span>1. 增大</span><br>
                              <span>2. 减低</span><br>
                              <span>3. 无变化</span><br>
                            </p>
                          </span>
                          <p>
                            <span class="form-item-title-big">结节总体印象</span>
                          </p>
                          <p class="tabled-td-shape tabled-td-bt">
                            结节性质<br>
                            <span>1. 良性</span><br>
                            <span>2. 良性可能大</span><br>
                            <span>3. 不能定性</span><br>
                            <span>4. 恶性可能大</span><br>
                            <span>5. 恶性</span><br>
                          </p>
                          <p style="height: 250px;" class="tabled-td-bt">
                            结节处理建议<br>
                            <span>1. 年度复查</span><br>
                            <span>2. 3个月复查</span><br>
                            <span>3. 抗炎治疗后,1个月复查</span><br>
                            <span>4. 无需抗炎,一个月后复查</span><br>
                            <span>5. 诊断性平扫CT（薄层）进一步检查增强CT（薄层）进一步检查</span><br>
                            <span>6. PET-CT进一步检查</span><br>
                            <span>7. 活检</span><br>
                            <span>8. 临床门诊就诊</span><br>
                            <span>9. 其他</span><br>
                          </p>
                          <p>
                            <span class="form-item-title-big">会诊</span>
                          </p>
                          <p class="tabled-td-density tabled-td-bt">
                            是否需要会诊<br>
                            <span>1. 是</span><br>
                            <span>2. 否</span><br>
                          </p>
                          <p class="tabled-td-density tabled-td-bt">
                            会诊级别
                            <span>
                            <el-popover
                              placement="bottom"
                              title=""
                              width="300"
                              trigger="click"
                              slot="content"
                            >
                              系统判断条件: <br>
                              1. 非常紧急(三天内)<br>
                                选择PET/CT进一步检查；<br>
                                活检；<br>
                                临床门诊就诊；<br>
                                多学科会诊；
                                结节尺寸>=15mm”。<br>
                                2.加急（1周内）<br>
                                选择3个月复查；<br>
                                抗炎治疗后/无需抗炎1个月复查；<br>
                                诊断性平扫/增强CT（薄层）进一步检查。<br>
                                3. 普通（一个月内）
                              <span slot="reference"><i class="el-icon-question"></i></span>
                            </el-popover>
                          </span><br>
                            <span>1. 普通</span><br>
                            <span>2. 加急(一周内)</span><br>
                            <span>3. 非常紧急(马上)</span><br>
                          </p>
                          <p class="tabled-td-density tabled-td-bt">
                            提交会诊原因<br>
                            <span>1. 怀疑恶性</span><br>
                            <span>2. 性质难判定</span><br>
                            <span>3. 其他</span><br>
                          </p>
                          <p>
                            会诊原因其他
                          </p>
                        </td>
                        <td v-for="(item,index) in form.ctTubercleInfoPOList" :key="index"
                            style="padding-top: -20px!important;"
                            class="ctTubercleInfoPOList-table-content">
                          <p>
                            <el-form-item label="" class="form-item1" :prop="'ctTubercleInfoPOList.'+index+'.numName'"
                                          :rules="ctTubercleInfoPOListRules.numName">
                              <el-input v-model.trim="item.numName" placeholder="" :size="$store.state.style.assemblyModel"
                                        :ref="'ctTubercleInfoPOList.'+index+'.numName'"
                                        :disabled="disabledShowState || item.area == 1" style="width: 200px;"></el-input>
                              <span v-if="item.area == 1 && item.meetingStatus == 2">
                                <el-button type="text" :size="$store.state.style.assemblyModel" @click="addctTubercleInfoPOList(item,index)"
                                           :disabled="item.state == 2">添加</el-button>
                              </span>
                              <span v-if="item.area == 1&& item.meetingStatus == 2">
                                <el-button type="text" :size="$store.state.style.assemblyModel" @click="cutctTubercleInfoPOList(item,index)"
                                           :disabled="item.state == 1">删除</el-button>
                              </span>
                            </el-form-item>
                          </p>
                          <p style="height: 80px;">
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.serialNumber'"
                                          class="form-item1" :rules="ctTubercleInfoPOListRules.serialNumber">
                              <el-input v-model.trim="item.serialNumber" placeholder="" :size="$store.state.style.assemblyModel"
                                        :ref="'ctTubercleInfoPOList.'+index+'.serialNumber'"
                                        :disabled="disabledShowState || item.area == 1"
                                        style="width: 200px;"></el-input>
                            </el-form-item>
                          </p>
                          <p>
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.imageNum'" class="form-item1"
                                          :rules="ctTubercleInfoPOListRules.imageNum">
                              <el-input v-model.trim="item.imageNum" placeholder="" :size="$store.state.style.assemblyModel"
                                        :ref="'ctTubercleInfoPOList.'+index+'.imageNum'"
                                        :disabled="disabledShowState || item.area == 1"
                                        style="width: 200px;"></el-input>
                            </el-form-item>
                          </p>
                          <p class="tabled-td-anatomicalPosition ">
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.anatomicalPosition'"
                                          :rules="ctTubercleInfoPOListRules.anatomicalPosition"
                                          class="form-item1 form-item200" style="display: inline-block;">
                              <el-input v-model.trim="item.anatomicalPosition" placeholder=""
                                        :ref="'ctTubercleInfoPOList.'+index+'.anatomicalPosition'"
                                        :disabled="disabledShowState || item.area == 1" :size="$store.state.style.assemblyModel" style="width: 50px;"></el-input>
                            </el-form-item>
                          </p>
                          <p class="tabled-td-density">
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.density'"
                                          class="form-item1 form-item200" :rules="ctTubercleInfoPOListRules.density">
                              <el-input v-model.trim="item.density" placeholder=""
                                        :ref="'ctTubercleInfoPOList.'+index+'.density'" @blur="densityChange(item)"
                                        :disabled="disabledShowState || item.area == 1" :size="$store.state.style.assemblyModel" style="width: 50px;"></el-input>
                            </el-form-item>
                          </p>
                          <p class="tabled-td-densityOther">
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.densityOther'"
                                          class="form-item1" :rules="ctTubercleInfoPOListRules.densityOther">
                              <el-checkbox-group v-model="item.densityOther" :disabled="disabledShowState || item.area == 1">
                                <el-checkbox label="1" :ref="'ctTubercleInfoPOList.'+index+'.densityOther'">空泡
                                </el-checkbox>
                                <el-checkbox label="2">空腔</el-checkbox>
                                <el-checkbox label="3">空洞</el-checkbox>
                                <el-checkbox label="4">坏死</el-checkbox>
                                <el-checkbox label="5">钙化</el-checkbox>
                                <el-checkbox label="6">液化/水样</el-checkbox>
                              </el-checkbox-group>
                            </el-form-item>
                          </p>
                          <p>

                          </p>
                          <p>
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.diameter'" class="form-item1"
                                          :rules="ctTubercleInfoPOListRules.diameter">
                              <el-input v-model.trim="item.diameter" placeholder="" :size="$store.state.style.assemblyModel" style="width: 200px;"
                                        :ref="'ctTubercleInfoPOList.'+index+'.diameter'"
                                        :disabled="disabledShowState || item.area == 1" @input="getMeanDiameter(item,index)"
                                        @blur="countToFixed(item)"></el-input>
                            </el-form-item>
                          </p>
                          <p>
                            <el-form-item label="" class="form-item1" :prop="'ctTubercleInfoPOList.'+index+'.minorAxis'"
                                          :rules="ctTubercleInfoPOListRules.minorAxis">
                              <el-input v-model.trim="item.minorAxis" placeholder="" :size="$store.state.style.assemblyModel"
                                        :ref="'ctTubercleInfoPOList.'+index+'.minorAxis'"
                                        style="width: 200px;" @input="getMeanDiameter(item,index)"
                                        @blur="countToFixed1(item)"
                                        :disabled="disabledShowState || item.area == 1"></el-input>
                            </el-form-item>
                          </p>
                          <p>
                            <el-form-item label="" class="form-item1"
                                          :prop="'ctTubercleInfoPOList.'+index+'.averageDiameter'"
                                          :rules="ctTubercleInfoPOListRules.averageDiameter">
                              <el-input v-model.trim="item.averageDiameter" placeholder="" disabled :size="$store.state.style.assemblyModel"
                                        :ref="'ctTubercleInfoPOList.'+index+'.averageDiameter'"
                                        disabled
                                        style="width: 200px;"></el-input>
                            </el-form-item>
                          </p>
                          <p>
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.volume'"
                                          :rules="ctTubercleInfoPOListRules.volume" class="form-item1">
                              <el-input v-model.trim="item.volume" placeholder="" :size="$store.state.style.assemblyModel"
                                        @blur="countToFixed2(item)"
                                        :ref="'ctTubercleInfoPOList.'+index+'.volume'"
                                        :disabled="disabledShowState || item.area == 1" style="width: 200px;"></el-input>
                            </el-form-item>
                          </p>
                          <p>

                          </p>
                          <p>
                              <span>
                                <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.trueDiameter'"
                                              :rules="ctTubercleInfoPOListRules.trueDiameter" class="form-item1"
                                              v-if="item.density == '2'">
                                  <el-input v-model.trim="item.trueDiameter" placeholder="" @blur="countToFixed3(item)"
                                            :ref="'ctTubercleInfoPOList.'+index+'.volume'"
                                            :disabled="disabledShowState || item.area == 1" :size="$store.state.style.assemblyModel"
                                            style="width: 200px;" @input="getsxMeanDiameter(item,index)"></el-input>
                                </el-form-item>
                              </span>
                          </p>
                          <p>
                              <span>
                                <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.trueMinorAxis'"
                                              :rules="ctTubercleInfoPOListRules.trueMinorAxis" class="form-item1"
                                              v-if="item.density == '2'">
                                  <el-input v-model.trim="item.trueMinorAxis" placeholder="" @blur="countToFixed4(item)"
                                            :ref="'ctTubercleInfoPOList.'+index+'.trueMinorAxis'"
                                            :disabled="disabledShowState || item.area == 1" :size="$store.state.style.assemblyModel" style="width: 200px;"
                                            @input="getsxMeanDiameter(item,index)"></el-input>
                                </el-form-item>
                              </span>
                          </p>
                          <p>
                              <span>
                                <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.trueAverageDiameter'"
                                              :rules="ctTubercleInfoPOListRules.trueAverageDiameter" class="form-item1"
                                              v-if="item.density == '2'">
                                   <el-input v-model.trim="item.trueAverageDiameter" placeholder=""
                                             :ref="'ctTubercleInfoPOList.'+index+'.trueAverageDiameter'"
                                             disabled :size="$store.state.style.assemblyModel" style="width: 200px;"></el-input>
                                </el-form-item>
                              </span>
                          </p>
                          <p>
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.trueVolume'"
                                          :rules="ctTubercleInfoPOListRules.trueVolume" class="form-item1"
                                          v-if="item.density == '2'">
                              <el-input v-model.trim="item.trueVolume" placeholder="" @blur="countToFixed5(item)"
                                        :ref="'ctTubercleInfoPOList.'+index+'.trueVolume'"
                                        :disabled="disabledShowState || item.area == 1" :size="$store.state.style.assemblyModel" style="width: 200px;"></el-input>
                            </el-form-item>
                          </p>
                          <p class="tabled-td-shape">
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.shape'"
                                          class="form-item1 form-item200" :rules="ctTubercleInfoPOListRules.shape">
                              <el-input v-model.trim="item.shape" placeholder=""
                                        :ref="'ctTubercleInfoPOList.'+index+'.shape'"
                                        :disabled="disabledShowState || item.area == 1" :size="$store.state.style.assemblyModel" style="width: 50px;"></el-input>
                            </el-form-item>
                          </p>
                          <p class="tabled-td-edge">
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.edge'"
                                          class="form-item1 form-item200" :rules="ctTubercleInfoPOListRules.edge">
                              <el-input v-model.trim="item.edge" placeholder=""
                                        :ref="'ctTubercleInfoPOList.'+index+'.edge'"
                                        :disabled="disabledShowState || item.area == 1" :size="$store.state.style.assemblyModel" style="width: 50px;"></el-input>
                            </el-form-item>
                          </p>
                          <span v-if="form.stage ==2 || form.stage == 3">
                            <p>

                            </p>
                            <p class="tabled-td-density">
                              <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.interphaseChangeStatus'"
                                            class="form-item1 form-item200"
                                            :rules="ctTubercleInfoPOListRules.interphaseChangeStatus">
                                <el-input v-model.trim="item.interphaseChangeStatus" placeholder=""
                                          :ref="'ctTubercleInfoPOList.'+index+'.interphaseChangeStatus'"
                                          @blur="interphaseChangeStatusChange(item)"
                                          :disabled="disabledShowState || item.area == 1" :size="$store.state.style.assemblyModel" style="width: 50px;"></el-input>
                              </el-form-item>
                            </p>
                            <p class="tabled-td-density">
                              <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.interphaseChangeSizeStatus'"
                                            v-if="item.interphaseChangeStatus == 1"
                                            class="form-item1 form-item200"
                                            :rules="ctTubercleInfoPOListRules.interphaseChangeSizeStatus">
                                <el-input v-model.trim="item.interphaseChangeSizeStatus" placeholder=""
                                          @blur="interphaseChangeSizeStatusChange(item)"
                                          :ref="'ctTubercleInfoPOList.'+index+'.interphaseChangeSizeStatus'"
                                          :disabled="disabledShowState || item.area == 1" :size="$store.state.style.assemblyModel" style="width: 50px;"></el-input>
                              </el-form-item>
                            </p>
                            <p>
                              <el-form-item label="" class="form-item1"
                                            :prop="'ctTubercleInfoPOList.'+index+'.interphaseChangeSizeStr'"
                                            v-if="item.interphaseChangeStatus == 1 && item.interphaseChangeSizeStatus != 3"
                                            :rules="ctTubercleInfoPOListRules.interphaseChangeSizeStr">
                                <el-input v-model.trim="item.interphaseChangeSizeStr" placeholder="" :size="$store.state.style.assemblyModel"
                                          :ref="'ctTubercleInfoPOList.'+index+'.interphaseChangeSizeStr'"
                                          :disabled="disabledShowState || item.area == 1"
                                          style="width: 200px;"></el-input>
                              </el-form-item>
                            </p>
                            <p class="tabled-td-edge">
                              <el-form-item label=""
                                            :prop="'ctTubercleInfoPOList.'+index+'.interphaseChangeComponentStatus'"
                                            v-if="item.interphaseChangeStatus == 1"
                                            class="form-item1 form-item200" :rules="ctTubercleInfoPOListRules.shape">
                                <el-input v-model.trim="item.interphaseChangeComponentStatus" placeholder=""
                                          @blur="interphaseChangeComponentStatusChange(item)"
                                          :ref="'ctTubercleInfoPOList.'+index+'.interphaseChangeComponentStatus'"
                                          :disabled="disabledShowState || item.area == 1" :size="$store.state.style.assemblyModel" style="width: 50px;"></el-input>
                              </el-form-item>
                            </p>
                            <p style="height: 60px;">
                              <el-form-item label="" class="form-item1"
                                            :prop="'ctTubercleInfoPOList.'+index+'.interphaseChangeComponentStr'"
                                            v-if="item.interphaseChangeStatus == 1 && item.interphaseChangeComponentStatus != 3"
                                            :rules="ctTubercleInfoPOListRules.interphaseChangeComponentStr">
                                <el-input v-model.trim="item.interphaseChangeComponentStr" placeholder="" :size="$store.state.style.assemblyModel"
                                          :ref="'ctTubercleInfoPOList.'+index+'.interphaseChangeComponentStr'"
                                          :disabled="disabledShowState || item.area == 1"
                                          style="width: 200px;"></el-input>
                              </el-form-item>
                            </p>
                            <p class="tabled-td-edge">
                              <el-form-item label=""
                                            :prop="'ctTubercleInfoPOList.'+index+'.interphaseChangeDensityStatus'"
                                            v-if="item.interphaseChangeStatus == 1"
                                            class="form-item1 form-item200"
                                            :rules="ctTubercleInfoPOListRules.interphaseChangeDensityStatus">
                                <el-input v-model.trim="item.interphaseChangeDensityStatus" placeholder=""
                                          :ref="'ctTubercleInfoPOList.'+index+'.interphaseChangeDensityStatus'"
                                          :disabled="disabledShowState || item.area == 1" :size="$store.state.style.assemblyModel" style="width: 50px;"></el-input>
                              </el-form-item>
                            </p>
                          </span>
                          <p>

                          </p>
                          <p class="tabled-td-shape">
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.nodularProperties'"
                                          class="form-item1 form-item200"
                                          :rules="ctTubercleInfoPOListRules.nodularProperties">
                              <el-input v-model.trim="item.nodularProperties" placeholder=""
                                        :ref="'ctTubercleInfoPOList.'+index+'.nodularProperties'"
                                        :disabled="disabledShowState || item.area == 1" :size="$store.state.style.assemblyModel" style="width: 50px;"></el-input>
                            </el-form-item>
                          </p>
                          <p style="height: 250px;">
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.nodularView'"
                                          class="form-item1 form-item200"
                                          :rules="ctTubercleInfoPOListRules.nodularView">
                              <el-button  icon="el-icon-plus" size="mini" @click="addNodularView(item)" v-if="!disabledShowState && item.area == 2">建议</el-button>
                              <div v-for="x,index in item.nodularView" style="font-size: 12px;line-height:20px">
                                编号{{index+1}}：{{proposals[x-1].label}}
                                <template v-if="x == 7">
                                  ：<span v-for="a in item.nodularBiopsy">{{proposals1[a-1].label}}，
                               <span v-if="a == 3">
                                 {{item.nodularBiopsyOther}}
                               </span>
                               </span>
                                </template>
                                <template v-if="x == 9">
                                  <span>，{{item.nodularViewOther}}</span>
                                </template>
                              </div>
                              <el-input v-model.trim="item.nodularView" placeholder=""
                                        :ref="'ctTubercleInfoPOList.'+index+'.nodularView'"
                                        :disabled="disabledShowState" :size="$store.state.style.assemblyModel" style="width: 0px;opacity: 0"></el-input>
                            </el-form-item>
                          </p>
                          <p>

                          </p>
                          <p class="tabled-td-density">
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.meetingStatus'"
                                          class="form-item1 form-item200"
                                          :rules="ctTubercleInfoPOListRules.index" v-if="item.area != 2">
                              <el-input v-model.trim="item.meetingStatus" placeholder=""
                                        :ref="'ctTubercleInfoPOList.'+index+'.meetingStatus'"
                                        @change="meetingStatusChange(item)"
                                        :disabled="disabledShowState || item.area == 1" :size="$store.state.style.assemblyModel" style="width: 50px;"></el-input>
                            </el-form-item>
                          </p>
                          <p class="tabled-td-density">
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.meetingLevel'"
                                          v-if="item.meetingStatus == 1"
                                          class="form-item1 form-item200"
                                          :rules="ctTubercleInfoPOListRules.meetingLevel">
                              <el-input v-model.trim="item.meetingLevel" placeholder=""
                                        :ref="'ctTubercleInfoPOList.'+index+'.meetingLevel'"
                                        :disabled="disabledShowState || item.area == 1" :size="$store.state.style.assemblyModel" style="width: 50px;"></el-input>
                            </el-form-item>
                          </p>
                          <p class="tabled-td-density">
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.meetingView'"
                                          v-if="item.meetingStatus == 1"
                                          class="form-item1 form-item200"
                                          :rules="ctTubercleInfoPOListRules.meetingView">
                              <el-input v-model.trim="item.meetingView" placeholder=""
                                        :ref="'ctTubercleInfoPOList.'+index+'.meetingView'"
                                        @blur="meetingViewChange(item)"
                                        :disabled="disabledShowState || item.area == 1" :size="$store.state.style.assemblyModel" style="width: 50px;"></el-input>
                            </el-form-item>
                          </p>
                          <p>
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.meetingViewOther'"
                                          class="form-item1" :rules="ctTubercleInfoPOListRules.meetingViewOther"
                                          v-if="item.meetingView == '3'">
                              <el-input v-model.trim="item.meetingViewOther" placeholder=""
                                        :ref="'ctTubercleInfoPOList.'+index+'.meetingViewOther'"
                                        :disabled="disabledShowState || item.area == 1" :size="$store.state.style.assemblyModel"
                                        style="width: 200px;"></el-input>
                            </el-form-item>
                          </p>
                        </td>
                      </tr>
                    </table>
                    <table class="all-idea-table">
                      <tr>
                        <td class="all-idea-table-title">结节整体处理意见

                        </td>
                        <td class="all-idea-content">
                          <el-form-item label="" prop="tubercleHandlingSuggestion" class="form-item1">
                            <el-input
                              type="textarea"
                              :autosize="{ minRows: 2, maxRows: 14}"
                              disabled
                              placeholder="请输入内容"
                              style="width: 500px;"
                              v-model="form.tubercleHandlingSuggestion">
                            </el-input>
                          </el-form-item>
                        </td>
                      </tr>
                    </table>
                    <table class="all-idea-table">
                      <tr>
                        <td class="all-idea-table-title">会诊结节处理意见</td>
                        <td class="all-idea-content">
                          <el-form-item label="" prop="meetingSuggest" class="form-item1">
                            <el-input
                              type="textarea"
                              :autosize="{ minRows: 2, maxRows: 14}"
                              placeholder="请输入内容"
                              :disabled="disabledShowState"
                              ref="meetingSuggest"
                              style="width: 500px;"
                              v-model="form.meetingSuggest">
                            </el-input>
                          </el-form-item>
                        </td>
                      </tr>
                    </table>

                  </div>
                </el-row>
              </div>
            </div>
          </div>
        </div>
        <div class="formcon">
          <div class="title">
            其他异常情况（除肺结节以外）
          </div>
          <div class="form-body-content">
            <el-row>
              <el-col :span="24">
                <el-form-item label="1. 本次扫描是否检出其他异常情况？" prop="abnormalStatus" labelWidth="430px" class="form-item">
                  <br>
                  <el-radio-group v-model="form.abnormalStatus" disabled>
                    <el-radio :label="1" ref="abnormalStatus">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <table class="form-abnormalCondition-table" v-if="form.abnormalStatus == 1">
                  <tr class="form-abnormalCondition-th">
                    <td>异常情况类别</td>
                    <td>异常情况类别</td>
                  </tr>
                  <tr>
                    <td>
                      <el-form-item prop="abnormalT" labelWidth="430px" class="form-item">
                        <span class="form-span-title">
                          气道腔内结节
                        </span>
                        <el-radio-group v-model="form.abnormalT" disabled>
                          <el-radio :label="1">是</el-radio>
                          <el-radio :label="2">否</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <p class="form-index-checkbox" v-if="form.abnormalT == 1">
                        <span class="form-index-title">请勾选具体位置 <span class="red">（可多选）</span></span>
                        <el-form-item prop="abnormalT1" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalT1"
                                       disabled>气管
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalT5" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalT5"
                                       disabled>右主支气管
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalT6" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalT6"
                                       disabled>右上叶支气管
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalT7" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalT7"
                                       disabled>右中叶支气管
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalT8" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalT8"
                                       disabled>右下叶支气管
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalT2" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalT2"
                                       disabled>左主支气管
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalT3" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalT3"
                                       disabled>左上叶支气管
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalT4" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalT4"
                                       disabled>左下叶支气管
                          </el-checkbox>
                        </el-form-item>
                      </p>
                    </td>
                    <td>
                      <el-form-item prop="abnormalR" labelWidth="430px" class="form-item">
                        <span class="form-span-title">
                          气道病变
                        </span>
                        <el-radio-group v-model="form.abnormalR" disabled
                                        @change="item10_17Change">
                          <el-radio :label="1">是</el-radio>
                          <el-radio :label="2">否</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <div class="form-index-checkbox" v-if="form.abnormalR == 1">
                        <span class="form-index-title">请勾选具体类型 <span class="red">（可多选）</span></span>
                        <p>
                          <el-form-item prop="abnormalR1" labelWidth="430px" class="form-item">
                            <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalR1"
                                         disabled>支气管壁增厚
                            </el-checkbox>
                          </el-form-item>

                        </p>
                        <p>
                          <el-form-item prop="abnormalR2" labelWidth="430px" class="form-item">
                            <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalR2"
                                         disabled>树芽征”样病灶
                            </el-checkbox>
                          </el-form-item>
                        </p>
                        <p>
                          <el-form-item prop="abnormalR3" labelWidth="430px" class="form-item">
                            <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalR3"
                                         disabled>支气管扩张
                            </el-checkbox>
                          </el-form-item>
                        </p>
                        <p>
                          <el-form-item prop="abnormalR4" labelWidth="430px" class="form-item">
                            <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalR4"
                                         disabled>弥漫性“马赛克”样改变
                            </el-checkbox>
                          </el-form-item>
                        </p>
                        <p>
                          <el-form-item prop="abnormalR5" labelWidth="430px" class="form-item">
                            <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalR5"
                                         disabled>粘液栓塞
                            </el-checkbox>
                          </el-form-item>
                        </p>
                        <p>
                          <el-form-item prop="abnormalR6" labelWidth="430px" class="form-item">
                            <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalR6"
                                         disabled>空气潴留（呼气性）
                            </el-checkbox>
                          </el-form-item>
                        </p>
                        <p>
                          <el-form-item prop="abnormalR7" labelWidth="430px" class="form-item">
                            <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalR7"
                                         disabled>其他
                            </el-checkbox>
                            <div class="form-inline" style="width: 240px;">
                                  <span>
                                      <el-form-item label="" prop="abnormalR8" class="form-item1" :inline-message="true"
                                                    v-if="form.abnormalR7 == 1">
                                        <el-input v-model.trim="form.abnormalR8" placeholder=""
                                                  :disabled=" disabledShowState" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                                  :size="$store.state.style.assemblyModel"
                                                  style="width: 200px;"></el-input>
                                      </el-form-item>
                                  </span>
                              <span>
                                      <el-form-item label="" prop="" class="form-item1" :inline-message="true"
                                                    v-if="form.abnormalR7 == 2">
                                        <el-input v-model.trim="form.abnormalR8" placeholder="" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                                  disabled :size="$store.state.style.assemblyModel" style="width: 200px;"></el-input>
                                      </el-form-item>
                                  </span>
                            </div>
                          </el-form-item>
                        </p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <el-form-item prop="abnormalL" labelWidth="430px" class="form-item">
                        <span class="form-span-title">
                          肺实变
                        </span>
                        <el-radio-group v-model="form.abnormalL" disabled>
                          <el-radio :label="1">是</el-radio>
                          <el-radio :label="2">否</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <p class="form-index-checkbox" v-if="form.abnormalL == 1">
                        <span class="form-index-title">请勾选具体位置 <span class="red">（可多选）</span></span>
                        <el-form-item prop="abnormalL1" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalL1"
                                       disabled>右上叶
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalL2" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalL2"
                                       disabled>右中叶
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalL3" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalL3"
                                       disabled>右下叶
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalL4" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalL4"
                                       disabled>左上叶
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalL5" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalL5"
                                       disabled>左下叶
                          </el-checkbox>
                        </el-form-item>
                      </p>
                    </td>
                    <td>
                      <el-form-item prop="abnormalJ" labelWidth="430px" class="form-item">
                        <span class="form-span-title">
                          肺不张
                        </span>
                        <el-radio-group v-model="form.abnormalJ" disabled>
                          <el-radio :label="1">是</el-radio>
                          <el-radio :label="2">否</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <p class="form-index-checkbox" v-if="form.abnormalJ == 1">
                        <span class="form-index-title">请勾选具体位置 <span class="red">（可多选）</span></span>
                        <el-form-item prop="abnormalJ1" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalJ1"
                                       disabled>右上叶
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalJ2" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalJ2"
                                       disabled>右中叶
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalJ3" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalJ3"
                                       disabled>右下叶
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalJ4" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalJ4"
                                       disabled>左上叶
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalJ5" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalJ5"
                                       disabled>左下叶
                          </el-checkbox>
                        </el-form-item>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <el-form-item prop="abnormalN" labelWidth="430px" class="form-item">
                        <span class="form-span-title">
                          肺气肿
                        </span>
                        <el-radio-group v-model="form.abnormalN" disabled
                                        @change="item10_14Change">
                          <el-radio :label="1">是</el-radio>
                          <el-radio :label="2">否</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <div class="form-index-checkbox" v-if="form.abnormalN == 1">
                        <span class="form-index-title">请描述严重程度 <span class="red">（单选）</span>
                         <el-popover
                           placement="bottom"
                           title=""
                           width="300"
                           trigger="click"
                           slot="content"
                         >
                              <span style="font-weight: 700;">注：轻度 、中度 、重度的定义为：</span><br>
                              <span style="font-weight: 700;">轻度：</span>冠状位观察，影像诊断医生视觉上，肺气肿区域占整个肺体积<1/3<br>
                              <span style="font-weight: 700;">中度：</span>冠状位观察，影像诊断医生视觉上，肺气肿区域占整个肺体积1/3~2/3<br>
                              <span style="font-weight: 700;">重度：</span>冠状位观察，影像诊断医生视觉上，肺气肿区域占整个肺体积超过2/3<br>

                                <span slot="reference"><i class="el-icon-question" style="cursor: pointer;"></i></span>
                            </el-popover>
                        </span>
                        <span>
                           <el-form-item class="form-item-check" prop="abnormalN1">
                              <el-radio-group v-model="form.abnormalN1" disabled>
                                 <el-radio label="1">轻度</el-radio>
                                 <el-radio label="2">中度</el-radio>
                                 <el-radio label="3">重度</el-radio>
                                 <el-radio label="4">难以判断</el-radio>
                              </el-radio-group>
                           </el-form-item>
                        </span>
                      </div>
                    </td>
                    <td>
                      <el-form-item labelWidth="430px" class="form-item" prop="item10_16">
                        <span class="form-span-title">
                         肺间质纤维化
                        </span>

                        <el-radio-group v-model="form.item10_16" disabled @change="item10_16Change">
                          <el-radio :label="1">是</el-radio>
                          <el-radio :label="2">否</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <br>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <el-form-item prop="abnormalD" labelWidth="430px" class="form-item">
                        <span class="form-span-title">
                          胸膜增厚
                        </span>
                        <el-radio-group v-model="form.abnormalD" disabled>
                          <el-radio :label="1">是</el-radio>
                          <el-radio :label="2">否</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <p class="form-index-checkbox" v-if="form.abnormalD == 1">
                        <span class="form-index-title">请勾选具体位置 <span class="red">（可多选）</span></span>
                        <el-form-item prop="abnormalD1" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalD1"
                                       disabled>右侧
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalD2" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalD2"
                                       disabled>左侧
                          </el-checkbox>
                        </el-form-item>
                      </p>
                    </td>
                    <td>
                      <el-form-item labelWidth="430px" class="form-item" prop="abnormalG">
                        <!--<el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalG"-->
                        <!--disabled>胸壁异常(骨质破坏、转移等)，请注明-->
                        <!--</el-checkbox>-->
                        <span class="form-span-title">
                          胸壁异常(骨质破坏、转移等)
                        </span>
                        <el-radio-group v-model="form.abnormalG" disabled
                                        @change="abnormalG1Change">
                          <el-radio :label="1">是</el-radio>
                          <el-radio :label="2">否</el-radio>
                        </el-radio-group>
                        <div class="form-inline" v-if="form.abnormalG == 1">
                          <span>
                            请注明
                            <el-form-item label="" prop="abnormalG1" class="form-item1" :inline-message="true">
                              <el-input v-model.trim="form.abnormalG1" placeholder=""
                                        disabled type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                        :size="$store.state.style.assemblyModel" style="width: 200px;"></el-input>
                            </el-form-item>
                          </span>
                        </div>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <el-form-item prop="abnormalE" labelWidth="430px" class="form-item">
                        <span class="form-span-title">
                          胸腔积液
                        </span>
                        <el-radio-group v-model="form.abnormalE" disabled>
                          <el-radio :label="1">是</el-radio>
                          <el-radio :label="2">否</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <p class="form-index-checkbox" v-if="form.abnormalE == 1">
                        <el-form-item prop="abnormalE1" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalE1"
                                       disabled>右侧
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalE2" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalE2"
                                       disabled>左侧
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalE3" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalE3"
                                       disabled>叶间
                          </el-checkbox>
                        </el-form-item>
                      </p>
                    </td>
                    <td>
                      <el-form-item prop="abnormalA" labelWidth="430px" class="form-item">
                        <span class="form-span-title">非钙化性肺门/纵隔淋巴结肿大 (短径≥10mm）</span>
                        <el-radio-group v-model="form.abnormalA" disabled>
                          <el-radio :label="1">是</el-radio>
                          <el-radio :label="2">否</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <p class="form-index-checkbox" v-if="form.abnormalA==1">
                        <el-form-item prop="abnormalA1" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA1"
                                       disabled>1 下颈、锁骨上、胸骨切迹
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA2" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA2"
                                       disabled>2R 右上气管旁
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA3" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA3"
                                       disabled>2L 左上气管旁
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA4" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA4"
                                       disabled>3 纵隔血管前和气管后
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA5" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA5"
                                       disabled>4R 右下气管旁
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA6" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA6"
                                       disabled>4L 左下气管旁
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA7" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA7"
                                       disabled>5 主－肺动脉窗
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA8" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA8"
                                       disabled>6 主动脉弓旁
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA9" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA9"
                                       disabled>7 隆突下
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA10" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA10"
                                       disabled>8 食管旁
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA11" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA11"
                                       disabled>9 肺韧带
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA12" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA12"
                                       disabled>10R 右肺门
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA13" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA13"
                                       disabled>10L 左肺门
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA14" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA14"
                                       disabled>11R 右肺叶间
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA15" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA15"
                                       disabled>11L 左肺叶间
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA16" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA16"
                                       disabled>12R 右肺叶
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA17" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA17"
                                       disabled>12L 左肺叶
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA18" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA18"
                                       disabled>13R 右肺段
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA19" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA19"
                                       disabled>13L 左肺段
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA20" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA20"
                                       disabled>14R 右肺亚段
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA21" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA21"
                                       disabled>14L 左肺亚段
                          </el-checkbox>
                        </el-form-item>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <el-form-item prop="abnormalC" labelWidth="430px" class="form-item">
                        <span class="form-span-title">
                          冠状动脉钙化
                        </span>
                        <el-radio-group v-model="form.abnormalC"  disabled>
                          <el-radio :label="1">是</el-radio>
                          <el-radio :label="2">否</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <div class="form-index-checkbox" v-if="form.abnormalC == 1">
                        <span class="form-index-title">请描述总体严重程度 <span class="red">（单选）</span>
                          <el-popover
                            placement="bottom"
                            title=""
                            width="300"
                            trigger="click"
                            slot="content"
                          >
                              <span style="font-weight: 700;">注：轻度 、中度 、重度的定义为：</span><br>
                              <span style="font-weight: 700;">轻度：</span>冠状动脉钙化长度（如多灶不连续则计算总和）占整枝冠脉长度的<1/3 <br>
                              <span style="font-weight: 700;">中度：</span>冠状动脉钙化长度（如多灶不连续则计算总和）占整枝冠脉长度的1/3~2/3<br>
                              <span style="font-weight: 700;">重度：</span>冠状动脉钙化长度（如多灶不连续则计算总和）占整枝冠脉长度超过2/3<br>
                                <span slot="reference"><i class="el-icon-question" style="cursor: pointer;"></i></span>
                            </el-popover>
                        </span>
                        <el-form-item class="form-item" prop="abnormalC0" :inline-message="true">
                          <el-radio-group v-model="form.abnormalC0" disabled>
                            <el-radio label="1">轻度</el-radio>
                            <el-radio label="2">中度</el-radio>
                            <el-radio label="3">重度</el-radio>
                            <el-radio label="4">难以判断</el-radio>
                          </el-radio-group>
                        </el-form-item>

                        <p>
                          <span class="form-index-title">请勾选具体位置 <span class="red">（可多选）</span>及严重程度</span>
                          <el-form-item prop="abnormalC_2_1" labelWidth="430px" class="form-item">
                            <el-checkbox-group v-model="form.abnormalC_2_1" disabled
                                               @change="checkBoxChange('abnormalC_2_1','abnormalC1')">
                              <el-checkbox label="1">左主干</el-checkbox>
                              <el-form-item class="form-item" prop="abnormalC0">

                              </el-form-item>
                              <span>
                               <el-form-item prop="abnormalC1" labelWidth="430px" class="form-item form-item1"
                                             :inline-message="true" v-if="form.abnormalC_2_1 == true">
                                   <el-radio-group v-model="form.abnormalC1" disabled>
                                      <el-radio label="1">轻度</el-radio>
                                      <el-radio label="2">中度</el-radio>
                                      <el-radio label="3">重度</el-radio>
                                      <el-radio label="4">难以判断</el-radio>
                                    </el-radio-group>
                               </el-form-item>
                              </span>
                              <span>
                               <el-form-item prop="" labelWidth="430px" class="form-item form-item1"
                                             :inline-message="true" v-if="form.abnormalC_2_1 == false">
                                  <el-radio-group v-model="form.abnormalC1"  disabled>
                                      <el-radio label="1">轻度</el-radio>
                                      <el-radio label="2">中度</el-radio>
                                      <el-radio label="3">重度</el-radio>
                                      <el-radio label="4">难以判断</el-radio>
                                    </el-radio-group>
                               </el-form-item>
                              </span>
                            </el-checkbox-group>

                          </el-form-item>

                        </p>
                        <p>
                          <el-form-item prop="abnormalC_2_2" labelWidth="430px" class="form-item">
                            <el-checkbox-group v-model="form.abnormalC_2_2"
                                               @change="checkBoxChange('abnormalC_2_2','abnormalC2')">
                              <el-checkbox label="2" disabled>左前降支</el-checkbox>
                              <span>
                               <el-form-item prop="abnormalC2" labelWidth="430px" class="form-item form-item1"
                                             :inline-message="true" v-if="form.abnormalC_2_2 == true">
                                   <el-radio-group v-model="form.abnormalC2" disabled>
                                      <el-radio label="1">轻度</el-radio>
                                      <el-radio label="2">中度</el-radio>
                                      <el-radio label="3">重度</el-radio>
                                      <el-radio label="4">难以判断</el-radio>
                                    </el-radio-group>
                               </el-form-item>
                              </span>
                              <span>
                               <el-form-item prop="" labelWidth="430px" class="form-item form-item1"
                                             :inline-message="true" v-if="form.abnormalC_2_2 == false">
                                  <el-radio-group v-model="form.abnormalC2"  disabled>
                                      <el-radio label="1">轻度</el-radio>
                                      <el-radio label="2">中度</el-radio>
                                      <el-radio label="3">重度</el-radio>
                                      <el-radio label="4">难以判断</el-radio>
                                    </el-radio-group>
                               </el-form-item>
                              </span>
                            </el-checkbox-group>
                          </el-form-item>
                        </p>
                        <p>
                          <el-form-item prop="abnormalC_2_3" labelWidth="430px" class="form-item">
                            <el-checkbox-group v-model="form.abnormalC_2_3" disabled
                                               @change="checkBoxChange('abnormalC_2_3','abnormalC3')">
                              <el-checkbox label="3" disabled>左回旋支</el-checkbox>
                              <span>
                               <el-form-item prop="abnormalC3" labelWidth="430px" class="form-item form-item1"
                                             :inline-message="true" v-if="form.abnormalC_2_3 == true">
                                   <el-radio-group v-model="form.abnormalC3" disabled>
                                      <el-radio label="1">轻度</el-radio>
                                      <el-radio label="2">中度</el-radio>
                                      <el-radio label="3">重度</el-radio>
                                      <el-radio label="4">难以判断</el-radio>
                                    </el-radio-group>
                               </el-form-item>
                              </span>
                              <span>
                               <el-form-item prop="" labelWidth="430px" class="form-item form-item1"
                                             :inline-message="true" v-if="form.abnormalC_2_3 == false">
                                  <el-radio-group v-model="form.abnormalC3"  disabled>
                                      <el-radio label="1">轻度</el-radio>
                                      <el-radio label="2">中度</el-radio>
                                      <el-radio label="3">重度</el-radio>
                                      <el-radio label="4">难以判断</el-radio>
                                    </el-radio-group>
                               </el-form-item>
                              </span>
                            </el-checkbox-group>
                          </el-form-item>
                        </p>
                        <p>
                          <el-form-item prop="abnormalC_2_4" labelWidth="430px" class="form-item">
                            <el-checkbox-group v-model="form.abnormalC_2_4"
                                               @change="checkBoxChange('abnormalC_2_4','abnormalC4')"
                                               disabled>
                              <el-checkbox label="4">右主干</el-checkbox>
                              <span>
                               <el-form-item prop="abnormalC4" labelWidth="430px" class="form-item form-item1"
                                             :inline-message="true" v-if="form.abnormalC_2_4 == true">
                                   <el-radio-group v-model="form.abnormalC4" disabled>
                                      <el-radio label="1">轻度</el-radio>
                                      <el-radio label="2">中度</el-radio>
                                      <el-radio label="3">重度</el-radio>
                                      <el-radio label="4">难以判断</el-radio>
                                    </el-radio-group>
                               </el-form-item>
                              </span>
                              <span>
                               <el-form-item prop="" labelWidth="430px" class="form-item form-item1"
                                             :inline-message="true" v-if="form.abnormalC_2_4 == false">
                                  <el-radio-group v-model="form.abnormalC4"  disabled>
                                      <el-radio label="1">轻度</el-radio>
                                      <el-radio label="2">中度</el-radio>
                                      <el-radio label="3">重度</el-radio>
                                      <el-radio label="4">难以判断</el-radio>
                                    </el-radio-group>
                               </el-form-item>
                              </span>
                            </el-checkbox-group>
                          </el-form-item>
                        </p>
                      </div>
                    </td>
                    <td>
                      <el-form-item prop="abnormalF" labelWidth="430px" class="form-item">
                        <span class="form-span-title">
                          主动脉异常
                        </span>
                        <el-radio-group v-model="form.abnormalF" disabled
                                        @change="abnormalFChange">
                          <el-radio :label="1">是</el-radio>
                          <el-radio :label="2">否</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <p class="form-index-checkbox" v-if="form.abnormalF == 1">
                        <span class="form-index-title">请勾选具体类型 <span class="red">（可多选）</span></span>
                        <el-form-item prop="abnormalF1" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalF1"
                                       disabled>主动脉瘤
                          </el-checkbox>
                        </el-form-item>
                        <br>
                        <el-form-item prop="abnormalF2" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalF2"
                                       disabled>主动脉夹层
                          </el-checkbox>
                        </el-form-item>
                        <br>
                        <el-form-item prop="abnormalF3" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalF3"
                                       disabled>主动脉假性动脉瘤
                          </el-checkbox>
                        </el-form-item>
                        <br>
                        <el-form-item prop="abnormalF5" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalF5"
                                       disabled>主动脉钙化
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalF4" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalF4"
                                       disabled>其他
                          </el-checkbox>
                          <div class="form-inline">
                            <span>
                              <el-form-item label="" prop="abnormalF6" class="form-item1" :inline-message="true"
                                            v-if="form.abnormalF4 == 1">
                                <el-input  type="textarea"
                                           :autosize="{ minRows: 2, maxRows: 4}" v-model.trim="form.abnormalF6" placeholder=""
                                           :disabled="form.abnormalF4 != 1 || disabledShowState"
                                           :size="$store.state.style.assemblyModel" style="width: 200px;"></el-input>
                              </el-form-item>
                            </span>
                            <span>
                              <el-form-item label="" prop="" class="form-item1" :inline-message="true"
                                            v-if="form.abnormalF4 != 1">
                                <el-input type="textarea"
                                          :autosize="{ minRows: 2, maxRows: 4}"v-model.trim="form.abnormalF6" placeholder=""
                                          :disabled="form.abnormalF4 != 1 || disabledShowState"
                                          :size="$store.state.style.assemblyModel" style="width:200px;"></el-input>
                              </el-form-item>
                            </span>
                          </div>
                        </el-form-item>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <el-form-item labelWidth="430px" class="form-item " prop="abnormalH">
                        <span class="form-span-title">
                          其他心血管异常
                        </span>
                        <el-radio-group v-model="form.abnormalH" disabled
                                        @change="abnormalHChange">
                          <el-radio :label="1">是</el-radio>
                          <el-radio :label="2">否</el-radio>
                        </el-radio-group>
                        <div v-if="form.abnormalH == 1">
                          <span>
                            请注明
                             <el-form-item label="" prop="abnormalH1" class="form-item1" :inline-message="true"
                                           v-if="form.abnormalH == 1">
                              <el-input v-model.trim="form.abnormalH1" placeholder=""
                                        disabled type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                        :size="$store.state.style.assemblyModel" style="width: 200px;"></el-input>
                             </el-form-item>
                          </span>
                        </div>
                      </el-form-item>
                    </td>
                    <td>
                      <el-form-item labelWidth="430px" class="form-item " prop="abnormalI">
                        <span class="form-span-title">
                          其它横膈以上异常
                        </span>
                        <el-radio-group v-model="form.abnormalI" disabled
                                        @change="abnormalIChange">
                          <el-radio :label="1">是</el-radio>
                          <el-radio :label="2">否</el-radio>
                        </el-radio-group>
                        <div v-if="form.abnormalI == 1">
                          <span>
                            请注明
                            <el-form-item label="" prop="abnormalI1" class="form-item1" :inline-message="true">
                              <el-input v-model.trim="form.abnormalI1" placeholder=""
                                        disabled type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                        :size="$store.state.style.assemblyModel" style="width: 200px;"></el-input>
                            </el-form-item>
                          </span>
                        </div>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <el-form-item labelWidth="430px" class="form-item " prop="abnormalS">
                        <span class="form-span-title">
                          其它横膈下异常
                        </span>
                        <el-radio-group v-model="form.abnormalS" disabled
                                        @change="abnormalSChange">
                          <el-radio :label="1">是</el-radio>
                          <el-radio :label="2">否</el-radio>
                        </el-radio-group>
                        <div v-if="form.abnormalS == 1">
                          <span>
                            请注明
                              <el-form-item label="" prop="abnormalS1" class="form-item1" :inline-message="true">
                                <el-input v-model.trim="form.abnormalS1" placeholder=""
                                          disabled type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                          :size="$store.state.style.assemblyModel" style="width: 200px;"></el-input>
                              </el-form-item>
                          </span>
                        </div>
                      </el-form-item>
                    </td>
                    <td>
                      <el-form-item labelWidth="430px" class="form-item" prop="abnormalK">
                        <span class="form-span-title">
                          明显肝脏异常
                        </span>
                        <el-radio-group v-model="form.abnormalK" disabled
                                        @change="abnormalKChange">
                          <el-radio :label="1">是</el-radio>
                          <el-radio :label="2">否</el-radio>
                        </el-radio-group>
                        <div v-if="form.abnormalK == 1">
                          <span>
                            请注明
                            <el-form-item label="" prop="abnormalK1" class="form-item1" :inline-message="true"
                                          v-if="form.abnormalK == 1">
                              <el-input v-model.trim="form.abnormalK1" placeholder=""
                                        :disabled=" disabledShowState" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                        :size="$store.state.style.assemblyModel" style="width: 200px;"></el-input>
                            </el-form-item>
                          </span>
                        </div>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <el-form-item labelWidth="430px" class="form-item " prop="abnormalQ">
                        <span class="form-span-title">
                          胰腺异常
                        </span>
                        <el-radio-group v-model="form.abnormalQ" disabled
                                        @change="abnormalQChange">
                          <el-radio :label="1">是</el-radio>
                          <el-radio :label="2">否</el-radio>
                        </el-radio-group>
                        <div v-if="form.abnormalQ == 1">
                          <span>
                            请注明
                            <el-form-item label="" prop="abnormalQ1" class="form-item1" :inline-message="true">
                              <el-input v-model.trim="form.abnormalQ1" placeholder="" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                        disabled
                                        :size="$store.state.style.assemblyModel" style="width: 200px;"></el-input>
                            </el-form-item>
                          </span>
                        </div>
                      </el-form-item>
                    </td>
                    <td>
                      <el-form-item labelWidth="430px" class="form-item " prop="abnormalO">
                        <span class="form-span-title">
                          明显肾异常
                        </span>
                        <el-radio-group v-model="form.abnormalO" disabled
                                        @change="abnormalOChange">
                          <el-radio :label="1">是</el-radio>
                          <el-radio :label="2">否</el-radio>
                        </el-radio-group>
                        <div v-if="form.abnormalO == 1">
                          <span>
                             请注明
                               <el-form-item label="" prop="abnormalO1" class="form-item1" :inline-message="true"
                                             v-if="form.abnormalO == 1">
                                  <el-input v-model.trim="form.abnormalO1" placeholder="" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                            :disabled="form.abnormalO != 1 || disabledShowState" :size="$store.state.style.assemblyModel"
                                            style="width: 200px;"></el-input>
                               </el-form-item>
                          </span>
                        </div>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <el-form-item labelWidth="430px" class="form-item " prop="abnormalM">
                        <span class="form-span-title">
                          明显肾上腺异常
                        </span>
                        <el-radio-group v-model="form.abnormalM" disabled
                                        @change="abnormalMChange">
                          <el-radio :label="1">是</el-radio>
                          <el-radio :label="2">否</el-radio>
                        </el-radio-group>
                        <div v-if="form.abnormalM == 1">
                          <span>
                            请注明
                            <el-form-item label="" prop="abnormalM1" class="form-item1" :inline-message="true">
                              <el-input v-model.trim="form.abnormalM1" placeholder=""
                                        disabled type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                        :size="$store.state.style.assemblyModel" style="width: 200px;"></el-input>
                            </el-form-item>
                          </span>
                        </div>
                      </el-form-item>
                    </td>
                    <td></td>
                  </tr>
                  <!--<tr>-->

                  <!--<td>-->
                  <!--<el-form-item prop="abnormalB" labelWidth="430px" class="form-item">-->
                  <!--<span class="form-span-title">-->
                  <!--非特异性间质纤维化-->
                  <!--</span>-->
                  <!--<el-radio-group v-model="form.abnormalB" @change="abnormalBChange" disabled>-->
                  <!--<el-radio :label="1">是</el-radio>-->
                  <!--<el-radio :label="2">否</el-radio>-->
                  <!--</el-radio-group>-->
                  <!--</el-form-item>-->
                  <!--<p class="form-index-checkbox" v-if="form.abnormalB==1">-->
                  <!--<el-form-item prop="abnormalB1" labelWidth="430px" class="form-item-check">-->
                  <!--<el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalB1"-->
                  <!--disabled>肺尖-->
                  <!--</el-checkbox>-->
                  <!--</el-form-item>-->
                  <!--<el-form-item prop="abnormalB2" labelWidth="430px" class="form-item-check">-->
                  <!--<el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalB2"-->
                  <!--disabled>食管旁-->
                  <!--</el-checkbox>-->
                  <!--</el-form-item>-->
                  <!--<el-form-item prop="abnormalB3" labelWidth="430px" class="form-item-check">-->
                  <!--<el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalB3"-->
                  <!--@change="abnormalMeeting21Change('abnormalB3','abnormalB4')"-->
                  <!--disabled>其他 &nbsp;&nbsp;&nbsp;&nbsp;-->
                  <!--<span>-->
                  <!--<el-form-item label="" prop="abnormalB4" :inline-message="true"-->
                  <!--style="margin-bottom: 20px; width: 200px;display: inline-block;margin-left: -30px;"-->
                  <!--v-if="form.abnormalB3 == 1">-->
                  <!--<el-input v-model.trim="form.abnormalB4"  type="textarea" :autosize="{ minRows: 2, maxRows: 4}"-->
                  <!--auto-complete="off" :size="$store.state.style.assemblyModel" ref="abnormalB4" style="width:200px"-->
                  <!--disabled></el-input>-->
                  <!--</el-form-item>-->
                  <!--</span>-->
                  <!--<span>-->
                  <!--<el-form-item label="" prop=""-->
                  <!--style="margin-bottom: 20px; width: 200px;display: inline-block;margin-left: -30px;"-->
                  <!--v-if="form.abnormalB3 != 1">-->
                  <!--<el-input v-model.trim="form.abnormalB4" auto-complete="off" :size="$store.state.style.assemblyModel" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" style="width: 200px;"-->
                  <!--ref="abnormalB4" disabled></el-input>-->
                  <!--</el-form-item>-->
                  <!--</span>-->

                  <!--</el-checkbox>-->
                  <!--</el-form-item>-->
                  <!--</p>-->
                  <!--</td>-->
                  <!--</tr>-->

                  <tr>
                    <td colspan="2">
                      <span class="form-fontSize">其它，请注明</span>
                      <div class="form-inline">
                        <el-form-item label="" prop="abnormalContOther" class="form-item1" style="margin-bottom: 15px;">
                          <el-input v-model.trim="form.abnormalContOther" placeholder="" :size="$store.state.style.assemblyModel"
                                    disabled  type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                    style="width: 600px;" ref="abnormalContOther"></el-input>
                        </el-form-item>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span class="form-fontSize">首次检出日期</span>
                      <div class="form-inline form-td-height">
                        <el-form-item label="" prop="abnormalFirstDate" class="form-item1">
                          <el-date-picker
                            v-model="form.abnormalFirstDate"
                            type="date"
                            placeholder="选择日期"
                            disabled
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                          </el-date-picker>
                        </el-form-item>
                      </div>
                    </td>
                    <td>
                      <span class="form-fontSize">既往检查中是否存在</span>
                      <div class="form-inline form-td-height">
                        <el-form-item label="" prop="oldAbnormalStatus" class="form-item1" :inline-message="true">
                          <el-radio-group v-model="form.oldAbnormalStatus" disabled>
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="2">否</el-radio>
                            <el-radio :label="3">未知</el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </div>
                    </td>
                  </tr>
                  <tr>

                  </tr>
                </table>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" v-if="form.abnormalStatus == 1">
                <el-form-item label="2.	本次扫描中的其他异常情况是否需要会诊？" prop="abnormalMeetingStatus" labelWidth="430px"
                              class="form-item">
                  <br>
                  <el-radio-group v-model="form.abnormalMeetingStatus" disabled>
                    <el-radio :label="1" ref="abnormalMeetingStatus">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-if="form.abnormalMeetingStatus == 1 && form.abnormalStatus == 1">
                <el-form-item label="" prop="abnormalMeetingStatusRemark"
                              class="form-item">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows:4, maxRows: 8}"
                    placeholder="请输入内容"
                    disabled
                    ref="abnormalMeetingStatusRemark"
                    v-model="form.abnormalMeetingStatusRemark">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" v-if="form.abnormalStatus == 1">
                <el-form-item label="异常情况会诊意见？" prop="exceptionMeetingSuggest" labelWidth="430px" class="form-item">
                  <br>
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 3, maxRows: 24}"
                    placeholder="请输入内容"
                    style="width: 80%;"
                    :disabled="disabledShowState"
                    v-model="form.exceptionMeetingSuggest">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="formcon">
          <div class="title">
            诊断结果
          </div>
          <div class="form-body-content">
            <el-row>
              <el-col :span="24">
                <el-form-item label="1. 诊断结果:" prop="diagnosticResult" labelWidth="430px" class="form-item">
                  <br>
                  <el-select v-model="form.diagnosticResult" placeholder="请选择" :size="$store.state.style.assemblyModel" style="width: 500px" disabled
                             clearable>
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="" prop="diagnosticResultRemark" v-if="form.diagnosticResult == 7"
                              class="form-item" style="width: 540px">
                  <el-input
                    type="textarea"
                    disabled
                    :autosize="{ minRows:2, maxRows: 4}"
                    placeholder="请输入内容"
                    ref="diagnosticResultRemark"
                    v-model="form.diagnosticResultRemark">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="formcon">
          <div class="title">
            备注
          </div>
          <div class="form-body-content remark">
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注" prop="remark" >
                  <el-input
                    type="textarea"
                    disabled
                    :autosize="{ minRows:2, maxRows: 4}"
                    placeholder="请输入内容"
                    ref="remark"
                    v-model="form.remark">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div style="text-align: center;">
          <el-form-item style="margin-top: 20px;" v-if="!disabledShowState">
            <el-button type="primary" @click="submitForm('form')">保存</el-button>
            <el-button @click="goBack()">取消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <el-dialog
      width="30%"
      title="结节处理建议"
      center
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      append-to-body>
      <div class="dialogVisible">
        <el-form :model="addForm" :rules="addFormRule" ref="addForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="编号：" prop="checkList1">
            <br>
            <el-checkbox-group v-model="addForm.checkList1">
              <el-checkbox label="1">年度复查</el-checkbox> <br>
              <el-checkbox label="2">3个月复查</el-checkbox> <br>
              <el-checkbox label="3">抗炎治疗后，1个月复查</el-checkbox> <br>
              <el-checkbox label="4">无需抗炎，1个月后复查</el-checkbox> <br>
              <el-checkbox label="5">诊断性平扫CT（薄层）进一步检查增强CT（薄层）进一步检查</el-checkbox> <br>
              <el-checkbox label="6">PET-CT进一步检查</el-checkbox> <br>
              <el-checkbox label="7">活检</el-checkbox> <br>
              <el-checkbox label="8">临床门诊就诊</el-checkbox> <br>
              <el-checkbox label="9">其他</el-checkbox>
              <br>
              <el-form-item label="" prop="nodularViewOther" :inline-message="true"
                            class="form-item1" v-if="addForm.checkList1.indexOf('9')>-1">
                <el-input v-model.trim="addForm.nodularViewOther" placeholder="请填写其他建议"  type="textarea"
                          :rows="2"
                          :disabled="disabledShowState" size="mini"
                          style="width: 200px;"></el-input>
              </el-form-item>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="活检：" prop="checkList2" v-if="addForm.checkList1.indexOf('7')>-1">
            <el-checkbox-group v-model="addForm.checkList2" style="margin-top:20px" v-if="addForm.checkList1.indexOf('7')>-1">
              <el-checkbox label="1">经皮穿刺</el-checkbox> <br>
              <el-checkbox label="2">经支气管镜</el-checkbox> <br>
              <el-checkbox label="3">其他</el-checkbox>
              <br>
              <el-form-item label="" prop="nodularBiopsyOther" :inline-message="true"
                            class="form-item1" v-if="addForm.checkList2.indexOf('3')>-1">
                <el-input v-model.trim="addForm.nodularBiopsyOther" placeholder="请填写其他建议"  type="textarea"
                          :rows="2"
                          ref="nodularBiopsyOther" :disabled="disabledShowState" size="mini" style="width: 200px;"></el-input>
              </el-form-item>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <div style="margin-top: 20px;text-align: center;">
        <el-button @click="dialogVisible = false" :size="$store.state.style.assemblyModel">取 消</el-button>
        <el-button :size="$store.state.style.assemblyModel" @click="addFormSure('addForm')" class="dialog-footer" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Right',
    data () {
      var validate_item3_1_1 = (rule, value, callback) => {
        if (value / 1 > 10 || value / 1 < 0) {
          callback(new Error('数值:0-10（最多3位小数）'))
        } else if (!( /^(?=([0-9]{1,2}$|[0-9]{1,12}\.))(0|[1-9][0-9]*)(\.[0-9]{1,3})?$/.test(value))) {
          callback(new Error('数值:0-10（最多3位小数）'))
        } else {
          callback();
        }
      };
      var validate_item3_2_1 = (rule, value, callback) => {
        if (value == '' || value == null) {
          callback()
        } else if (value / 1 > 10 || value / 1 < 0) {
          callback(new Error('数值:0-10（最多3位小数）'))
        } else if (!( /^(?=([0-9]{1,2}$|[0-9]{1,12}\.))(0|[1-9][0-9]*)(\.[0-9]{1,3})?$/.test(value))) {
          callback(new Error('数值:0-10（最多3位小数）'))
        } else {
          callback();
        }
      };
      var validate_tubercleCount = (rule, value, callback) => {
        if (value && !(/^\d{1,13}$/.test(value))) {
          callback(new Error('数值'))
        } else {
          callback()
        }
      };
      var validate_lessTenCount = (rule, value, callback) => {
        if (value == null || value == '' || value == undefined) {
          if (this.form.item8_3 == 2) {
            this.countState = false
            callback()
          } else {
            callback(new Error('必填'));
          }
        }
        if (value > 0 && value <= 10) {
          this.countState = true
          callback()
        } else {
          this.countState = false
          callback(new Error('数值:（1-10）'))
        }
      };

      var validate_greaterTenCount = (rule, value, callback) => {
        if (value == null || value == '' || value == undefined) {
          if (this.form.item8_3 == 1) {
            this.countState = false
            callback()
          } else {
            callback(new Error('必填'));
          }
        }
        if (value > 10) {
          this.countState = true
          callback()
        } else {
          this.countState = false
          callback(new Error('数值:（10以上）'));
        }
      };
      var validate_anatomicalPosition = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('必填'))
        } else if (value && !(/^\d{1}$/.test(value))) {
          callback(new Error('数值（1-6）'))
        } else if (value < 1 || value > 6) {
          callback(new Error('数值（1-6）'))
        } else {
          callback()
        }
      };
      var validate_density = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('必填'))
        } else if (value && !(/^\d{1}$/.test(value))) {
          callback(new Error('数值（1-3）'))
        } else if (value < 1 || value > 3) {
          callback(new Error('数值（1-3）'))
        } else {
          callback()
        }
      };
      var validate_shape = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('必填'))
        } else if (value && !(/^\d{1}$/.test(value))) {
          callback(new Error('数值（1-5）'))
        } else if (value < 1 || value > 5) {
          callback(new Error('数值（1-5）'))
        } else {
          callback()
        }
      };
      var validate_interphaseChangeStatus = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('必填'))
        } else if (value != 1 && value != 2) {
          callback(new Error('数值（1或者2）'))
        } else {
          callback()
        }
      };
      var validate_edge = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('必填'))
        } else if (value && !(/^\d{1}$/.test(value))) {
          callback(new Error('数值（1-5）'))
        } else if (value < 1 || value > 5) {
          callback(new Error('数值（1-5）'))
        } else {
          callback()
        }
      };
      var validate_nodularView = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('必填'))
        } else if (value && !(/^\d{1,2}$/.test(value))) {
          callback(new Error('数值（1-9）'))
        } else if (value < 1 || value > 9) {
          callback(new Error('数值（1-9）'))
        } else {
          callback()
        }
      };
      var validate_diameter = (rule, value, callback) => {
        if (value == '' || value == null) {
          callback()
        } else if (!( /^(?=([0-9]{1,3}$|[0-9]{1,3}\.))(0|[1-9][0-9]*)(\.[0-9]{1,3})?$/.test(value))) {
          callback(new Error('数值(0-999)（最多3位小数）'))
        } else if (value >999){
          callback(new Error('数值(0-999)（最多3位小数）'))
        }else {
          callback();
        }
      };

      var validate_abnormalA = (rule, value, callback) => {
        if (value == 1) {
          if (checkitems('abnormalA', 22)) {
            if (checkitems('abnormalA', 22)) {
              callback();
            } else callback(new Error('请选择最少一项异常情况'));
          }
          else callback(new Error('请选择最少一项异常情况'));
        } else {
          set_item('abnormalA', 22, 2);
          callback();
        }
      };
      var validate_abnormalB = (rule, value, callback) => {
        if (value == 1) {
          if (checkitems('abnormalB', 3)) {
            if (checkitems('abnormalB', 3)) {
              callback();
            } else callback(new Error('请选择最少一项异常情况'));
          }
          else callback(new Error('请选择最少一项异常情况'));
        } else {
          set_item('abnormalB', 3, 2);
          callback();
        }
      };
      var validate_abnormalD = (rule, value, callback) => {
        if (value == 1) {
          if (checkitems('abnormalD', 2)) {
            if (checkitems('abnormalD', 2)) {
              callback();
            } else callback(new Error('请选择最少一项异常情况'));
          }
          else callback(new Error('请选择最少一项异常情况'));
        } else {
          set_item('abnormalD', 2, 2);
          callback();
        }
      };
      var validate_abnormalE = (rule, value, callback) => {
        if (value == 1) {
          if (checkitems('abnormalE', 2)) {
            if (checkitems('abnormalE', 2)) {
              callback();
            } else callback(new Error('请选择最少一项异常情况'));
          }
          else callback(new Error('请选择最少一项异常情况'));
        } else {
          set_item('abnormalE', 2, 2);
          callback();
        }
      };
      var validate_abnormalF = (rule, value, callback) => {
        if (value == 1) {
          if (checkitems('abnormalF', 4)) {
            if (checkitems('abnormalF', 4)) {
              callback();
            } else callback(new Error('请选择最少一项异常情况'));
          }
          else callback(new Error('请选择最少一项异常情况'));
        } else {
          set_item('abnormalF', 4, 2);
          callback();
        }
      };
      var validate_abnormalJ = (rule, value, callback) => {
        if (value == 1) {
          if (checkitems('abnormalJ', 5)) {
            if (checkitems('abnormalJ', 5)) {
              callback();
            } else callback(new Error('请选择最少一项异常情况'));
          }
          else callback(new Error('请选择最少一项异常情况'));
        } else {
          set_item('abnormalJ', 5, 2);
          callback();
        }
      };
      var validate_abnormalT = (rule, value, callback) => {
        if (value == 1) {
          if (checkitems('abnormalT', 8)) {
            if (checkitems('abnormalT', 8)) {
              callback();
            } else callback(new Error('请选择最少一项异常情况'));
          }
          else callback(new Error('请选择最少一项异常情况'));
        } else {
          set_item('abnormalT', 8, 2);
          callback();
        }
      };
      var validate_abnormalL = (rule, value, callback) => {
        if (value == 1) {
          if (checkitems('abnormalL', 5)) {
            if (checkitems('abnormalL', 5)) {
              callback();
            } else callback(new Error('请选择最少一项异常情况'));
          }
          else callback(new Error('请选择最少一项异常情况'));
        } else {
          set_item('abnormalL', 5, 2);
          callback();
        }
      };
      var validate_abnormal_A = (rule, value, callback) => {
        if (value == 1) {
          this.form.abnormalA = 1;
        }
        this.$refs.form.validateField('abnormalA');
        callback();
      };
      var validate_abnormal_B = (rule, value, callback) => {
        if (value == 1) {
          this.form.abnormalB = 1;
        }
        this.$refs.form.validateField('abnormalB');
        callback();
      };
      var validate_abnormal_D = (rule, value, callback) => {
        if (value == 1) {
          this.form.abnormalD = 1;
        }
        this.$refs.form.validateField('abnormalD');
        callback();
      };
      var validate_abnormal_E = (rule, value, callback) => {
        if (value == 1) {
          this.form.abnormalE = 1;
        }
        this.$refs.form.validateField('abnormalE');
        callback();
      };
      var validate_abnormal_F = (rule, value, callback) => {
        if (value == 1) {
          this.form.abnormalF = 1;
        }
        this.$refs.form.validateField('abnormalF');
        callback();
      };
      var validate_abnormal_J = (rule, value, callback) => {
        if (value == 1) {
          this.form.abnormalJ = 1;
        }
        this.$refs.form.validateField('abnormalJ');
        callback();
      };
      var validate_abnormal_T = (rule, value, callback) => {
        if (value == 1) {
          this.form.abnormalT = 1;
        }
        this.$refs.form.validateField('abnormalT');
        callback();
      };
      var validate_abnormal_L = (rule, value, callback) => {
        if (value == 1) {
          this.form.abnormalL = 1;
        }
        this.$refs.form.validateField('abnormalL');
        callback();
      };
      var validate_item10_3 = (rule, value, callback) => {
        if (value) {
          if (this.form.item10_3_2_1 || this.form.item10_3_2_2 || this.form.item10_3_2_3 || this.form.item10_3_2_4) {
            callback()
          } else {
            callback(new Error('请选择最少一项异常情况'));
          }
        } else {
          callback()
        }
      };
      var validate_item10_3_2_1 = (rule, value, callback) => {
        if (value) {
          this.form.item10_3 = true
        } else if (!this.form.item10_3_2_4 && !this.form.item10_3_2_2 && !this.form.item10_3_2_3) {
          this.form.item10_3 = false
        }
        this.$refs.form.validateField('item10_3');
        callback()
      };
      var validate_item10_3_2_2 = (rule, value, callback) => {
        if (value) {
          this.form.item10_3 = true
        } else if (!this.form.item10_3_2_1 && !this.form.item10_3_2_4 && !this.form.item10_3_2_3) {
          this.form.item10_3 = false
        }
        this.$refs.form.validateField('item10_3');
        callback()
      };
      var validate_item10_3_2_3 = (rule, value, callback) => {
        if (value) {
          this.form.item10_3 = true
        } else if (!this.form.item10_3_2_1 && !this.form.item10_3_2_2 && !this.form.item10_3_2_4) {
          this.form.item10_3 = false
        }
        this.$refs.form.validateField('item10_3');
        callback()
      };
      var validate_item10_3_2_4 = (rule, value, callback) => {
        if (value) {
          this.form.item10_3 = true
        } else if (!this.form.item10_3_2_1 && !this.form.item10_3_2_2 && !this.form.item10_3_2_3) {
          this.form.item10_3 = false
        }
        this.$refs.form.validateField('item10_3');
        callback()
      };
      var validate_item10_14 = (rule, value, callback) => {
        if (value == 1) {
          if (this.form.item10_14_2_1 || this.form.item10_14_2_2 || this.form.item10_14_2_3 || this.form.item10_14_2_4 || this.form.item10_14_2_5) {
            callback()
          } else {
            callback(new Error('请选择最少一项异常情况'));
          }
        } else {
          this.$refs.form.validateField('item10_14');
          callback()
        }
      };
      var validate_item10_14_2_1 = (rule, value, callback) => {
        if (value) {
          this.form.item10_14 = 1
        }
        this.$refs.form.validateField('item10_14');
        callback()
      };
      var validate_item10_14_2_2 = (rule, value, callback) => {
        if (value) {
          this.form.item10_14 = 1
        }
        this.$refs.form.validateField('item10_14');
        callback()
      };
      var validate_item10_14_2_3 = (rule, value, callback) => {
        if (value) {
          this.form.item10_14 = 1
        }
        this.$refs.form.validateField('item10_14');
        callback()
      };
      var validate_item10_14_2_4 = (rule, value, callback) => {
        if (value) {
          this.form.item10_14 = 1
        }
        this.$refs.form.validateField('item10_14');
        callback()
      };
      var validate_item10_14_2_5 = (rule, value, callback) => {
        if (value) {
          this.form.item10_14 = 1
        }
        this.$refs.form.validateField('item10_14');
        callback()
      };
      var validate_item10_17 = (rule, value, callback) => {
        if (value) {
          if (this.form.item10_17_2_1 || this.form.item10_17_2_2 || this.form.item10_17_2_3 || this.form.abnormalR4 || this.form.item10_17_2_5 || this.form.item10_17_2_6 || this.form.item10_17_2_7) {
            callback()
          } else {
            callback(new Error('请选择最少一项异常情况'));
          }
        } else {
          callback()
        }
      };
      var validate_item10_17_2_1 = (rule, value, callback) => {
        if (value) {
          this.form.item10_17 = true
        } else if (!this.form.abnormalR4 && !this.form.item10_17_2_2 && !this.form.item10_17_2_3 && !this.form.item10_17_2_5 && !this.form.item10_17_2_6 && !this.form.item10_17_2_7) {
          this.form.item10_17 = false
        }
        this.$refs.form.validateField('item10_17');
        callback()
      };
      var validate_item10_17_2_2 = (rule, value, callback) => {
        if (value) {
          this.form.item10_17 = true
        } else if (!this.form.abnormalR4 && !this.form.item10_17_2_1 && !this.form.item10_17_2_3 && !this.form.item10_17_2_5 && !this.form.item10_17_2_6 && !this.form.item10_17_2_7) {
          this.form.item10_17 = false
        }
        this.$refs.form.validateField('item10_17');
        callback()
      };
      var validate_item10_17_2_3 = (rule, value, callback) => {
        if (value) {
          this.form.item10_17 = true
        } else if (!this.form.abnormalR4 && !this.form.item10_17_2_2 && !this.form.item10_17_2_1 && !this.form.item10_17_2_5 && !this.form.item10_17_2_6 && !this.form.item10_17_2_7) {
          this.form.item10_17 = false
        }
        this.$refs.form.validateField('item10_17');
        callback()
      };
      var validate_item10_17_2_4 = (rule, value, callback) => {
        if (value) {
          this.form.item10_17 = true
        } else if (!this.form.item10_17_2_1 && !this.form.item10_17_2_2 && !this.form.item10_17_2_3 && !this.form.item10_17_2_5 && !this.form.item10_17_2_6 && !this.form.item10_17_2_7) {
          this.form.item10_17 = false
        }
        this.$refs.form.validateField('item10_17');
        callback()
      };
      var validate_item10_17_2_5 = (rule, value, callback) => {
        if (value) {
          this.form.item10_17 = true
        } else if (!this.form.abnormalR4 && !this.form.item10_17_2_2 && !this.form.item10_3_2_3 && !this.form.item10_17_2_1 && !this.form.item10_17_2_6 && !this.form.item10_17_2_7) {
          this.form.item10_17 = false
        }
        this.$refs.form.validateField('item10_17');
        callback()
      };
      var validate_item10_17_2_6 = (rule, value, callback) => {
        if (value) {
          this.form.item10_17 = true
        } else if (!this.form.abnormalR4 && !this.form.item10_17_2_2 && !this.form.item10_3_2_3 && !this.form.item10_17_2_1 && !this.form.item10_17_2_5 && !this.form.item10_17_2_7) {
          this.form.item10_17 = false
        }
        this.$refs.form.validateField('item10_17');
        callback()
      };
      var validate_item10_17_2_7 = (rule, value, callback) => {
        if (value) {
          this.form.item10_17 = true
        } else if (!this.form.abnormalR4 && !this.form.item10_17_2_2 && !this.form.item10_3_2_3 && !this.form.item10_17_2_1 && !this.form.item10_17_2_5 && !this.form.item10_17_2_6) {
          this.form.item10_17 = false
        }
        this.$refs.form.validateField('item10_17');
        callback()
      };
      var checkitems = (items, index) => {
        for (let i = 1; i <= index; i++) {
          if (this.form[items + i] == 1) {
            return true;
            break;
          }
        }
        return false;
      };
      var set_item = (items, index, b) => {
        for (let i = 1; i <= index; i++) {
          this.form[items + i] = b;
        }
      };
      var validate_abnormalMeeting1 = (rule, value, callback) => {
        if (value == 1) {
          if (checkitems('abnormalMeeting', 23)) {
            if (checkitems('abnormalMeeting', 23)) {
              callback();
            } else callback(new Error('请选择最少一项异常情况'));
          }
          else callback(new Error('请选择最少一项异常情况'));
        } else {
          set_item('abnormalMeeting', 23, 2);
          callback();
        }
      };
      var validate_abnormalMeeting = (rule, value, callback) => {
        if (value == 1) {
          this.form.abnormalMeetingStatus = 1;
        }
        this.$refs.form.validateField('abnormalMeetingStatus');
        callback();
      };
      return {
        //可选大于今天的 日期
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        addForm:{
          checkList1:[],
          checkList2:[],
          nodularViewOther:'',
          nodularBiopsyOther:'',
        },
        addFormRule:{
          checkList1: [
            {required: true, message: '必填', trigger: 'change'},
          ],
          checkList2: [
            {required: true, message: '必填', trigger: 'change'},
          ],
          nodularBiopsyOther: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          nodularViewOther: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
        },
        dialogVisible:false,
        nodularView:{},
        flabImageDeepChecked:true,
        flabImageDeepChecked1:false,
        //查看状态
        disabledShowState: false,
        //权限判定
        home_page: false,
        btnAuth: {
          list_query_btn: true,
        },
        countState: false,
        form: {
          sid: '',
          userName: '',
          sex: '',
          idCard: '',
          examinationDate: '',
          stage: '',
          equipmentMfrs: '',//扫描设备
          equipmentVersion: '',//设备型号
          scanParameters: '',//扫描参数,
          kvpValue: '',//固定毫安扫描kVp
          maValue: '',//固定毫安扫描mA
          slewTime: '',//固定毫安扫描旋转时间
          kvpOtherValue: '',//固定毫安扫描kVp其他
          maOtherValue: '',//旋转时间
          slewTimeOther: '',//旋转时间
          minMaValue: '',//自动毫安扫描mA最小
          minMaOtherValue: '',//自动毫安扫描mA最小其他
          maxMaValue: '',//自动毫安扫描mA最小
          maxMaOtherValue: '',//自动毫安扫描mA最小其他
          noiseLevel: '',//噪音指数
          noiseLevelOther: '',//噪音指数其他
          flabImageDeep: '',//标准常规图像层厚
          flabImageShallow: '',//标准常规图像薄层
          flabReconstructionDeep: '',//标准常规重建层厚
          flabReconstructionShallow: '',//标准常规重建薄层
          lungImageDeep: '',//肺常规图像层厚
          lungImageShallow: '',//肺常规图像薄层
          lungReconstructionDeep: '',//肺常规重建层厚
          lungReconstructionShallow: '',//肺常规重建薄层
          ctdlvol: '',//容积CT剂量加权指数
          dlp: '',//肺(Lung)（可选做）
          ctImageScanning: '',//CT图像扫描情况
          ctImageScanningReasonA: 2,
          ctImageScanningReasonB: 2,
          ctImageScanningReasonC: 2,
          ctImageScanningReasonD: 2,
          ctImageScanningReasonE: 2,
          ctImageScanningReasonF: 2,
          ctImageScanningReasonG: 2,
          ctImageScanningReasonH: 2,
          ctImageScanningReasonOther: '',
          reviewCtResult: null,
          ctPastResultPOList: [
            {
              examinationDate: '',
              examinationMethod: '',
              chest: 2,
              abdomen: 2,
              pelvic: 2,
              brain: 2,
              examinationOther: 2,
              examinationOtherStr: '',
              examinationTypeBase: 2,
              examinationTypeYear: 2,
              examinationTypeFollow: 2,
              examinationTypeDiagnosis: 2,
              classes: [],
              checkList: [],
            }
          ],
          tubercle: null,//是否有结节
          tubercleCount: null,//结节数量
          tubercleLessFive: null,//结节是否小于5mm
          tubercleGreaterFive: null,//结节是否≥5mm（不包括含肯定良性钙化成份的结节或肿块）
          tubercleCountLessTen: null,//是否有结节小于10
          lessTenCount: '',//小于10的 数量
          tubercleCountGreaterTen: null,//是否有结节大于10
          greaterTenCount: '',//大于10枚数量
          item8_3: null,
          ctTubercleInfoPOList: [],
          tubercleHandlingSuggestion: '',
          abnormalStatus: null,//本次扫描是否检出其他异常情况？
          abnormalA: 2,//非钙化性肺门
          abnormalA1: 2,//非钙化性肺门选项
          abnormalA2: 2,//非钙化性肺门选项
          abnormalA3: 2,//非钙化性肺门选项
          abnormalA4: 2,//非钙化性肺门选项
          abnormalA5: 2,//非钙化性肺门选项
          abnormalA6: 2,//非钙化性肺门选项
          abnormalA7: 2,//非钙化性肺门选项
          abnormalA8: 2,//非钙化性肺门选项
          abnormalA9: 2,//非钙化性肺门选项
          abnormalA10: 2,//非钙化性肺门选项
          abnormalA11: 2,//非钙化性肺门选项
          abnormalA12: 2,//非钙化性肺门选项
          abnormalA13: 2,//非钙化性肺门选项
          abnormalA14: 2,//非钙化性肺门选项
          abnormalA15: 2,//非钙化性肺门选项
          abnormalA16: 2,//非钙化性肺门选项
          abnormalA17: 2,//非钙化性肺门选项
          abnormalA18: 2,//非钙化性肺门选项
          abnormalA19: 2,//非钙化性肺门选项
          abnormalA20: 2,//非钙化性肺门选项
          abnormalA21: 2,//非钙化性肺门选项
          abnormalB: 2,//非特异性间质纤维化
          abnormalB1: 2,//非特异性间质纤维化选项
          abnormalB2: 2,//非特异性间质纤维化选项
          abnormalB3: 2,//非特异性间质纤维化选项
          abnormalB4:'',
          item10_3: false,//冠状动脉钙化
          item10_3_2_1: false,//冠状动脉钙化选项左主干
          item10_3_2_2: false,//冠状动脉钙化选项左前降支
          item10_3_2_3: false,//冠状动脉钙化选项左回旋支
          item10_3_2_4: false,//冠状动脉钙化选项右主干
          abnormalC1: null,//冠状动脉钙化选项左主干严重程度
          abnormalC2: null,//冠状动脉钙化选项左前降支严重程度
          abnormalC3: null,//冠状动脉钙化选项左回旋支严重程度
          abnormalC4: null,//冠状动脉钙化选项右主干严重程度
          abnormalD: 2,//胸膜增厚
          abnormalD1: 2,//胸膜增厚选项
          abnormalD2: 2,//胸膜增厚选项
          abnormalE: 2,//胸腔积液
          abnormalE1: 2,//胸腔积液选项
          abnormalE2: 2,//胸腔积液选项
          abnormalF: 2,//主动脉异常
          abnormalF1: 2,//主动脉异常选项
          abnormalF2: 2,//主动脉异常选项
          abnormalF3: 2,//主动脉异常选项
          abnormalF4: 2,//主动脉异常选项
          abnormalF5: 2,//主动脉异常选项
          abnormalF6:null,
          abnormalG: 2,//胸壁异常
          abnormalG1: null,//胸壁异常其他
          abnormalH: null,//心血管异常
          abnormalH1: null,//心血管异常其他
          abnormalI: null,//其它横膈以上异常
          abnormalI1: null,//其它横膈以上异常其他
          abnormalJ: 2,//肺不张
          abnormalJ1: 2,//主动脉异常选项
          abnormalJ2: 2,//主动脉异常选项
          abnormalJ3: 2,//主动脉异常选项
          abnormalJ4: 2,//主动脉异常选项
          abnormalJ5: 2,//主动脉异常选项
          abnormalK: 2,//明显肝脏异常
          abnormalK1: null,//明显肝脏异其他
          abnormalL: 2,//肺实变
          abnormalL1: 2,//肺实变选项
          abnormalL2: 2,//肺实变选项
          abnormalL3: 2,//肺实变选项
          abnormalL4: 2,//肺实变选项
          abnormalL5: 2,//肺实变选项
          abnormalM: 2,//明显肝脏异常
          abnormalM1: null,//明显肝脏异其他
          item10_14: 2,//肺气肿
          item10_14_2_1: 2,//肺气肿选项右上叶
          item10_14_2_2: 2,//肺气肿选项右中叶
          item10_14_2_3: 2,//肺气肿选项左右下叶
          item10_14_2_4: 2,//肺气肿选项左上叶
          item10_14_2_5: 2,//肺气肿选项左下叶
          abnormalN1: null,//肺气肿选项右上叶严重程度
          abnormalN2: null,//肺气肿选项右中叶严重程度
          abnormalN3: null,//气肿选项左右下叶严重程度
          abnormalN4: null,//肺气肿选项左上叶严重程度
          abnormalN5: null,//肺气肿选项左上叶严重程度
          abnormalO: 2,//明显肾异常
          abnormalO1: null,//明显肾异其他
          abnormalP: null,//明显肝脏异其他
          item10_16: null,//肺气肿
          abnormalQ: null,
          abnormalQ1: null,
          abnormalS: 2,//明显肾异常
          abnormalS1: null,//明显肾异其他
          abnormalT: 2,//主动脉异常
          abnormalT1: 2,//主动脉异常选项
          abnormalT2: 2,//主动脉异常选项
          abnormalT3: 2,//主动脉异常选项
          abnormalT4: 2,//主动脉异常选项
          abnormalT5: 2,//主动脉异常选项
          abnormalT6: 2,//主动脉异常选项
          abnormalT7: 2,//主动脉异常选项
          abnormalT8: 2,//主动脉异常选项
          item10_17: false,//气道病变
          abnormalR: null,//气道病变严重程度
          item10_17_2_1: false,//气道病变选项右上叶
          item10_17_2_2: false,//气道病变选项右中叶
          item10_17_2_3: false,//气道病变选项左右下叶
          abnormalR4: false,//气道病变选项左上叶
          item10_17_2_5: false,//气道病变选项左下叶
          item10_17_2_6: false,//气道病变选项左下叶
          item10_17_2_7: false,//气道病变选项左下叶
          abnormalR1: null,//气道病变选项右上叶严重程度
          abnormalR2: null,//气道病变选项右中叶严重程度
          abnormalR3: null,//气肿选项左右下叶严重程度
          abnormalR5: null,//气道病变选项左下叶严重程度
          abnormalR6: null,//气道病变选项左下叶严重程度
          abnormalR7: null,//气道病变选项左下叶严重程度
          abnormalR8: null,
          abnormalContOther: null,//其他请注明
          abnormalFirstDate: null,//首次检出日期
          oldAbnormalStatus: null,//既往检查是否检出
          abnormalMeetingStatus: '',//其他异常情况index
          item2: [],//图像质量第二题
          abnormalMeeting1:2,
          abnormalMeeting2:2,
          abnormalMeeting3:2,
          abnormalMeeting4:2,
          abnormalMeeting5:2,
          abnormalMeeting6:2,
          abnormalMeeting7:2,
          abnormalMeeting8:2,
          abnormalMeeting9:2,
          abnormalMeeting10:2,
          abnormalMeeting11:2,
          abnormalMeeting12:2,
          abnormalMeeting13:2,
          abnormalMeeting14:2,
          abnormalMeeting15:2,
          abnormalMeeting16:2,
          abnormalMeeting17:2,
          abnormalMeeting18:2,
          abnormalMeeting19:2,
          abnormalMeeting20:2,
          abnormalMeeting21:2,
          abnormalMeeting22:'',
          meetingSuggest:'',
          exceptionMeetingSuggest:'',
          abnormalMeetingStatusRemark:'',
          diagnosticResult:'',
          diagnosticResultRemark:'',
          remark:'',
        },
        ctTubercleInfoPOListRules: {
          numName: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          serialNumber: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          imageNum: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          anatomicalPosition: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validate_anatomicalPosition, trigger: 'blur'}
          ],
          density: [
            {required: true, message: '必填', trigger: 'change'},
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validate_density, trigger: 'blur'}
          ],
          densityOther: [
            {required: true, message: '必填', trigger: 'change'},
            {required: true, message: '必填', trigger: 'blur'},
          ],
          diameter: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validate_diameter, trigger: 'blur'}
          ],
          minorAxis: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validate_diameter, trigger: 'blur'}
          ],
          averageDiameter: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          volume: [
            {required: false, message: '必填', trigger: 'blur'},
          ],
          trueDiameter: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validate_diameter, trigger: 'blur'}
          ],
          trueMinorAxis: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validate_diameter, trigger: 'blur'}
          ],
          trueAverageDiameter: [
            {required: true, message: '必填', trigger: 'blur'},

          ],
          trueVolume: [
            {required: false, message: '必填', trigger: 'blur'},
          ],
          nodularProperties: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validate_shape, trigger: 'blur'}
          ],
          nodularView: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},

          ],
          nodularViewOther: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          nodularViewDate: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          meetingStatus: [
            {required: false, message: '必填', trigger: 'blur'},
            {validator: validate_interphaseChangeStatus, trigger: 'blur'}
          ],
          meetingLevel: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validate_density, trigger: 'blur'}
          ],
          meetingView: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validate_density, trigger: 'blur'}
          ],
          shape: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validate_shape, trigger: 'blur'}
          ],
          edge: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validate_edge, trigger: 'blur'}
          ],
          interphaseChangeStatus: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validate_interphaseChangeStatus, trigger: 'blur'}
          ],
          interphaseChangeSizeStatus: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validate_density, trigger: 'blur'}
          ],
          interphaseChangeSizeStr: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validate_diameter, trigger: 'blur'}
          ],
          interphaseChangeComponentStatus: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validate_density, trigger: 'blur'}
          ],
          interphaseChangeComponentStr: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validate_diameter, trigger: 'blur'}
          ],
          interphaseChangeDensityStatus: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validate_edge, trigger: 'blur'}
          ],
          meetingViewOther: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
        },
        ctPastResultPOListRules: {
//          examinationDate: [
//            {required: true, message: '请输入日期', trigger: 'blur'},
//            {required: true, message: '请输入日期', trigger: 'change'},
//          ],
//          examinationMethod: [
//            {required: true, message: '必填', trigger: 'blur'},
//            {required: true, message: '必填', trigger: 'change'},
//          ],
//          examinationOtherStr: [
//            {required: true, message: '必填', trigger: 'blur'},
//            {required: true, message: '必填', trigger: 'change'},
//          ],
//          checkList: [
//            {required: true, message: '必选', trigger: 'blur'},
//            {required: true, message: '必选', trigger: 'change'},
//          ],
//          classes: [
//            {required: true, message: '必选', trigger: 'blur'},
//            {required: true, message: '必选', trigger: 'change'},
//          ],

        },
        formRules: {
//          abnormalMeetingStatusRemark:[
//            {required: true, message: '必填', trigger: 'blur'},
//            {required: true, message: '必填', trigger: 'blur'},
//          ],
//          diagnosticResult:[
//            {required: true, message: '必选', trigger: 'blur'},
//            {required: true, message: '必填', trigger: 'blur'},
//          ],
//          diagnosticResultRemark:[
//            {required: true, message: '必填', trigger: 'blur'},
//            {required: true, message: '必填', trigger: 'blur'},
//          ],
//          remark:[
//            {required: true, message: '必填', trigger: 'blur'},
//            {required: true, message: '必填', trigger: 'blur'},
//          ],
//          sid: [
//            {required: true, message: '请输入sid', trigger: 'blur'},
//            {required: true, message: '请输入sid', trigger: 'change'},
//          ],
//          userName: [
//            {required: false, message: '请输入姓名', trigger: 'blur'},
//          ],
//          sex: [
//            {required: false, message: '请填写性别', trigger: 'blur'},
//          ],
//          age: [
//            {required: false, message: '请输入年龄', trigger: 'blur'},
//          ],
//          idCard: [
//            {required: false, message: '请输入身份证号', trigger: 'blur'},
//          ],
//          examinationDate: [
//            {required: true, message: '请填写检查日期', trigger: 'blur'},
//          ],
//          stage: [
//            {required: true, message: '请选择扫描年度', trigger: 'change'},
//          ],
//          equipmentMfrs: [
//            {required: true, message: '必选', trigger: 'change'},
//          ],
//          equipmentVersion: [
//            {required: true, message: '必选', trigger: 'change'},
//          ],
//          scanParameters: [
//            {required: true, message: '必选', trigger: 'change'},
//          ],
//          kvpValue: [
//            {required: true, message: '必选', trigger: 'change'},
//          ],
//          maValue: [
//            {required: true, message: '必选', trigger: 'change'},
//          ],
//          slewTime: [
//            {required: true, message: '必选', trigger: 'change'},
//          ],
//          kvpOtherValue: [
//            {required: true, message: '必填', trigger: 'blur'},
//          ],
//          maOtherValue: [
//            {required: true, message: '必填', trigger: 'blur'},
//          ],
//          slewTimeOther: [
//            {required: true, message: '必填', trigger: 'blur'},
//          ],
//          minMaValue: [
//            {required: true, message: '必选', trigger: 'change'},
//          ],
//          minMaOtherValue: [
//            {required: true, message: '必填', trigger: 'blur'},
//          ],
//          maxMaValue: [
//            {required: true, message: '必选', trigger: 'change'},
//          ],
//          maxMaOtherValue: [
//            {required: true, message: '必填', trigger: 'blur'},
//          ],
//          noiseLevel: [
//            {required: true, message: '必选', trigger: 'change'},
//          ],
//          noiseLevelOther: [
//            {required: true, message: '必填', trigger: 'blur'},
//          ],
//          flabImageDeep: [
//            {required: true, message: '必填', trigger: 'blur'},
//            {validator: validate_item3_1_1, trigger: 'blur'}
//          ],
//          flabImageShallow: [
//            {required: true, message: '必填', trigger: 'blur'},
//            {validator: validate_item3_1_1, trigger: 'blur'}
//          ],
//          flabReconstructionDeep: [
//            {required: true, message: '必填', trigger: 'blur'},
//            {validator: validate_item3_1_1, trigger: 'blur'}
//          ],
//          flabReconstructionShallow: [
//            {required: true, message: '必填', trigger: 'blur'},
//            {validator: validate_item3_1_1, trigger: 'blur'}
//          ],
//          lungImageDeep: [
//            {validator: validate_item3_2_1, trigger: 'blur'}
//          ],
//          lungImageShallow: [
//            {validator: validate_item3_2_1, trigger: 'blur'}
//          ],
//          lungReconstructionDeep: [
//            {validator: validate_item3_2_1, trigger: 'blur'}
//          ],
//          lungReconstructionShallow: [
//            {validator: validate_item3_2_1, trigger: 'blur'}
//          ],
//          ctdlvol: [
//            {required: true, message: '必填', trigger: 'blur'},
//          ],
//          dlp: [
//            {required: true, message: '必填', trigger: 'blur'},
//          ],
//          reviewCtResult: [
//            {required: true, message: '必选', trigger: 'change'},
//          ],
//          ctImageScanning: [
//            {required: true, message: '必选', trigger: 'change'},
//          ],
//          ctImageScanningReasonOther: [
//            {required: true, message: '必选', trigger: 'blur'},
//          ],
//          item2: [
//            {required: true, message: '必选', trigger: 'change'},
//          ],
//          tubercle: [
//            {required: true, message: '必选', trigger: 'change'},
//          ],
//          tubercleCount: [
//            {required: true, message: '必填', trigger: 'blur'},
//            {required: false, validator: validate_tubercleCount, trigger: 'blur'},
//          ],
//          tubercleLessFive: [
//            {required: true, message: '必选', trigger: 'change'},
//          ],
//          tubercleGreaterFive: [
//            {required: true, message: '必选', trigger: 'change'},
//          ],
//          lessTenCount: [
//            {required: false, validator: validate_lessTenCount, trigger: 'blur'},
//          ],
//          greaterTenCount: [
//            {required: false, validator: validate_greaterTenCount, trigger: 'blur'},
//          ],
//          item8_3: [
//            {required: true, message: '必填', trigger: 'change'},
//          ],
//          tubercleHandlingSuggestion: [
//            {required: true, message: '必填', trigger: 'blur'},
//          ],
//          abnormalStatus: [
//            {required: true, message: '必选', trigger: 'change'},
//          ],
//          abnormalA: [
//            {validator: validate_abnormalA, trigger: 'change'}
//          ],
//          abnormalA1: [
//            {validator: validate_abnormal_A, trigger: 'change'}
//          ],
//          abnormalA2: [
//            {validator: validate_abnormal_A, trigger: 'change'}
//          ],
//          abnormalA3: [
//            {validator: validate_abnormal_A, trigger: 'change'}
//          ],
//          abnormalA4: [
//            {validator: validate_abnormal_A, trigger: 'change'}
//          ],
//          abnormalA5: [
//            {validator: validate_abnormal_A, trigger: 'change'}
//          ],
//          abnormalA6: [
//            {validator: validate_abnormal_A, trigger: 'change'}
//          ],
//          abnormalA7: [
//            {validator: validate_abnormal_A, trigger: 'change'}
//          ],
//          abnormalA8: [
//            {validator: validate_abnormal_A, trigger: 'change'}
//          ],
//          abnormalA9: [
//            {validator: validate_abnormal_A, trigger: 'change'}
//          ],
//          abnormalA10: [
//            {validator: validate_abnormal_A, trigger: 'change'}
//          ],
//          abnormalA11: [
//            {validator: validate_abnormal_A, trigger: 'change'}
//          ],
//          abnormalA12: [
//            {validator: validate_abnormal_A, trigger: 'change'}
//          ],
//          abnormalA13: [
//            {validator: validate_abnormal_A, trigger: 'change'}
//          ],
//          abnormalA14: [
//            {validator: validate_abnormal_A, trigger: 'change'}
//          ],
//          abnormalA15: [
//            {validator: validate_abnormal_A, trigger: 'change'}
//          ],
//          abnormalA16: [
//            {validator: validate_abnormal_A, trigger: 'change'}
//          ],
//          abnormalA17: [
//            {validator: validate_abnormal_A, trigger: 'change'}
//          ],
//          abnormalA18: [
//            {validator: validate_abnormal_A, trigger: 'change'}
//          ],
//          abnormalA19: [
//            {validator: validate_abnormal_A, trigger: 'change'}
//          ],
//          abnormalA20: [
//            {validator: validate_abnormal_A, trigger: 'change'}
//          ],
//          abnormalA21: [
//            {validator: validate_abnormal_A, trigger: 'change'}
//          ],
//          abnormalA22: [
//            {validator: validate_abnormal_A, trigger: 'change'}
//          ],
//          abnormalB: [
//            {validator: validate_abnormalB, trigger: 'change'}
//          ],
//          abnormalB1: [
//            {validator: validate_abnormal_B, trigger: 'change'}
//          ],
//          abnormalB2: [
//            {validator: validate_abnormal_B, trigger: 'change'}
//          ],
//          abnormalB3: [
//            {validator: validate_abnormal_B, trigger: 'change'}
//          ],
//          abnormalB4: [
//            {required: true, message: '必选', trigger: 'change'},
//          ],
//          item10_3: [
//            {validator: validate_item10_3, trigger: 'change'}
//          ],
//          item10_3_2_1: [
//            {validator: validate_item10_3_2_1, trigger: 'change'}
//          ],
//          item10_3_2_2: [
//            {validator: validate_item10_3_2_2, trigger: 'change'}
//          ],
//          item10_3_2_3: [
//            {validator: validate_item10_3_2_3, trigger: 'change'}
//          ],
//          item10_3_2_4: [
//            {validator: validate_item10_3_2_4, trigger: 'change'}
//          ],
//          abnormalC1: [
//            {required: true, message: '必填', trigger: 'blur'},
//          ],
//          abnormalC2: [
//            {required: true, message: '必填', trigger: 'blur'},
//          ],
//          abnormalC3: [
//            {required: true, message: '必填', trigger: 'blur'},
//          ],
//          abnormalC4: [
//            {required: true, message: '必填', trigger: 'blur'},
//          ],
//          abnormalD: [
//            {validator: validate_abnormalD, trigger: 'change'}
//          ],
//          abnormalD1: [
//            {validator: validate_abnormal_D, trigger: 'change'}
//          ],
//          abnormalD2: [
//            {validator: validate_abnormal_D, trigger: 'change'}
//          ],
//          abnormalE: [
//            {validator: validate_abnormalE, trigger: 'change'}
//          ],
//          abnormalE1: [
//            {validator: validate_abnormal_E, trigger: 'change'}
//          ],
//          abnormalE2: [
//            {validator: validate_abnormal_E, trigger: 'change'}
//          ],
//          abnormalF: [
//            {validator: validate_abnormalF, trigger: 'change'}
//          ],
//          abnormalF1: [
//            {validator: validate_abnormal_F, trigger: 'change'}
//          ],
//          abnormalF2: [
//            {validator: validate_abnormal_F, trigger: 'change'}
//          ],
//          abnormalF3: [
//            {validator: validate_abnormal_F, trigger: 'change'}
//          ],
//          abnormalF4: [
//            {validator: validate_abnormal_F, trigger: 'change'}
//          ],
//          abnormalF5: [
//            {validator: validate_abnormal_F, trigger: 'change'}
//          ],
//          abnormalF6: [
//            {required: true, message: '必填', trigger: 'blur'},
//          ],
//          abnormalG1: [
//            {required: false, message: '必填', trigger: 'blur'},
//          ],
//          abnormalH1: [
//            {required: true, message: '必填', trigger: 'blur'},
//          ],
//          abnormalI1: [
//            {required: true, message: '必填', trigger: 'blur'},
//          ],
//          abnormalJ: [
//            {validator: validate_abnormalJ, trigger: 'change'}
//          ],
//          abnormalJ1: [
//            {validator: validate_abnormal_J, trigger: 'change'}
//          ],
//          abnormalJ2: [
//            {validator: validate_abnormal_J, trigger: 'change'}
//          ],
//          abnormalJ3: [
//            {validator: validate_abnormal_J, trigger: 'change'}
//          ],
//          abnormalJ4: [
//            {validator: validate_abnormal_J, trigger: 'change'}
//          ],
//          abnormalJ5: [
//            {validator: validate_abnormal_J, trigger: 'change'}
//          ],
//          abnormalT: [
//            {validator: validate_abnormalT, trigger: 'change'}
//          ],
//          abnormalT1: [
//            {validator: validate_abnormal_T, trigger: 'change'}
//          ],
//          abnormalT2: [
//            {validator: validate_abnormal_T, trigger: 'change'}
//          ],
//          abnormalT3: [
//            {validator: validate_abnormal_T, trigger: 'change'}
//          ],
//          abnormalT4: [
//            {validator: validate_abnormal_T, trigger: 'change'}
//          ],
//          abnormalT5: [
//            {validator: validate_abnormal_T, trigger: 'change'}
//          ],
//          abnormalT6: [
//            {validator: validate_abnormal_T, trigger: 'change'}
//          ],
//          abnormalT7: [
//            {validator: validate_abnormal_T, trigger: 'change'}
//          ],
//          abnormalT8: [
//            {validator: validate_abnormal_T, trigger: 'change'}
//          ],
//          abnormalK1: [
//            {required: true, message: '必填', trigger: 'blur'},
//          ],
//          abnormalL: [
//            {validator: validate_abnormalL, trigger: 'change'}
//          ],
//          abnormalL1: [
//            {validator: validate_abnormal_L, trigger: 'change'}
//          ],
//          abnormalL2: [
//            {validator: validate_abnormal_L, trigger: 'change'}
//          ],
//          abnormalL3: [
//            {validator: validate_abnormal_L, trigger: 'change'}
//          ],
//          abnormalL4: [
//            {validator: validate_abnormal_L, trigger: 'change'}
//          ],
//          abnormalL5: [
//            {validator: validate_abnormal_L, trigger: 'change'}
//          ],
//          abnormalM1: [
//            {required: true, message: '必填', trigger: 'blur'},
//          ],
//          item10_14: [
//            {required: true, message: '必选', trigger: 'change'},
//            {validator: validate_item10_14, trigger: 'change'}
//          ],
//          item10_14_2_1: [
//            {validator: validate_item10_14_2_1, trigger: 'change'}
//          ],
//          item10_14_2_2: [
//            {validator: validate_item10_14_2_2, trigger: 'change'}
//          ],
//          item10_14_2_3: [
//            {validator: validate_item10_14_2_3, trigger: 'change'}
//          ],
//          item10_14_2_4: [
//            {validator: validate_item10_14_2_4, trigger: 'change'}
//          ],
//          item10_14_2_5: [
//            {validator: validate_item10_14_2_5, trigger: 'change'}
//          ],
//          abnormalN1: [
//            {required: false, message: '必选', trigger: 'blur'},
//            {validator: validate_density, trigger: 'blur'}
//          ],
//          abnormalN2: [
//            {required: false, message: '必选', trigger: 'blur'},
//            {validator: validate_density, trigger: 'blur'}
//          ],
//          abnormalN3: [
//            {required: false, message: '必选', trigger: 'blur'},
//            {validator: validate_density, trigger: 'blur'}
//          ],
//          abnormalN4: [
//            {required: false, message: '必选', trigger: 'blur'},
//            {validator: validate_density, trigger: 'blur'}
//          ],
//          abnormalN5: [
//            {required: false, message: '必选', trigger: 'blur'},
//            {validator: validate_density, trigger: 'blur'}
//          ],
//          abnormalO1: [
//            {required: true, message: '必填', trigger: 'blur'},
//          ],
//          abnormalP: [
//            {required: true, message: '必填', trigger: 'change'},
//            {validator: validate_density, trigger: 'blur'}
//          ],
//          abnormalQ1: [
//            {required: true, message: '必填', trigger: 'blur'},
//          ],
//          abnormalS1: [
//            {required: true, message: '必填', trigger: 'blur'},
//          ],
//          item10_17: [
//            {validator: validate_item10_17, trigger: 'change'}
//          ],
//          abnormalR: [
//            {required: true, message: '必填', trigger: 'change'},
//          ],
//          item10_17_2_1: [
//            {validator: validate_item10_17_2_1, trigger: 'change'}
//          ],
//          item10_17_2_2: [
//            {validator: validate_item10_17_2_2, trigger: 'change'}
//          ],
//          item10_17_2_3: [
//            {validator: validate_item10_17_2_3, trigger: 'change'}
//          ],
//          abnormalR4: [
//            {validator: validate_item10_17_2_4, trigger: 'change'}
//          ],
//          item10_17_2_5: [
//            {validator: validate_item10_17_2_5, trigger: 'change'}
//          ],
//          item10_17_2_6: [
//            {validator: validate_item10_17_2_6, trigger: 'change'}
//          ],
//          item10_17_2_7: [
//            {validator: validate_item10_17_2_7, trigger: 'change'}
//          ],
//          abnormalR1: [
////            {validator: validate_density, trigger: 'blur'}
//          ],
//          abnormalR2: [
////            {validator: validate_density, trigger: 'blur'}
//          ],
//          abnormalR3: [
////            {validator: validate_density, trigger: 'blur'}
//          ],
//          abnormalR5: [
////            {validator: validate_density, trigger: 'blur'}
//          ],
//          abnormalR6: [
////            {validator: validate_density, trigger: 'blur'}
//          ],
//          abnormalR7: [
////            {validator: validate_density, trigger: 'blur'}
//          ],
//          abnormalR8: [
//            {required: true, message: '必选', trigger: 'blur'},
//          ],
//          abnormalMeetingStatus: [
//            {required: true, message: '必选', trigger: 'change'},
////            {validator: validate_abnormalMeeting1, trigger: 'change'}
//          ],
//          abnormalMeeting1:[
//            {required: true, message: '必选', trigger: 'change'},
//            {validator: validate_abnormalMeeting, trigger: 'change'}
//          ],
//          abnormalMeeting2:[
//            {required: true, message: '必选', trigger: 'change'},
//            {validator: validate_abnormalMeeting, trigger: 'change'}
//          ],
//          abnormalMeeting3:[
//            {required: true, message: '必选', trigger: 'change'},
//            {validator: validate_abnormalMeeting, trigger: 'change'}
//          ],
//          abnormalMeeting4:[
//            {required: true, message: '必选', trigger: 'change'},
//            {validator: validate_abnormalMeeting, trigger: 'change'}
//          ],
//          abnormalMeeting5:[
//            {required: true, message: '必选', trigger: 'change'},
//            {validator: validate_abnormalMeeting, trigger: 'change'}
//          ],
//          abnormalMeeting6:[
//            {required: true, message: '必选', trigger: 'change'},
//            {validator: validate_abnormalMeeting, trigger: 'change'}
//          ],
//          abnormalMeeting7:[
//            {required: true, message: '必选', trigger: 'change'},
//            {validator: validate_abnormalMeeting, trigger: 'change'}
//          ],
//          abnormalMeeting8:[
//            {required: true, message: '必选', trigger: 'change'},
//            {validator: validate_abnormalMeeting, trigger: 'change'}
//          ],
//          abnormalMeeting9:[
//            {required: true, message: '必选', trigger: 'change'},
//            {validator: validate_abnormalMeeting, trigger: 'change'}
//          ],
//          abnormalMeeting10:[
//            {required: true, message: '必选', trigger: 'change'},
//            {validator: validate_abnormalMeeting, trigger: 'change'}
//          ],
//          abnormalMeeting11:[
//            {required: true, message: '必选', trigger: 'change'},
//            {validator: validate_abnormalMeeting, trigger: 'change'}
//          ],
//          abnormalMeeting12:[
//            {required: true, message: '必选', trigger: 'change'},
//            {validator: validate_abnormalMeeting, trigger: 'change'}
//          ],
//          abnormalMeeting13:[
//            {required: true, message: '必选', trigger: 'change'},
//            {validator: validate_abnormalMeeting, trigger: 'change'}
//          ],
//          abnormalMeeting14:[
//            {required: true, message: '必选', trigger: 'change'},
//            {validator: validate_abnormalMeeting, trigger: 'change'}
//          ],
//          abnormalMeeting15:[
//            {required: true, message: '必选', trigger: 'change'},
//            {validator: validate_abnormalMeeting, trigger: 'change'}
//          ],
//          abnormalMeeting16:[
//            {required: true, message: '必选', trigger: 'change'},
//            {validator: validate_abnormalMeeting, trigger: 'change'}
//          ],
//          abnormalMeeting17:[
//            {required: true, message: '必选', trigger: 'change'},
//            {validator: validate_abnormalMeeting, trigger: 'change'}
//          ],
//          abnormalMeeting18:[
//            {required: true, message: '必选', trigger: 'change'},
//            {validator: validate_abnormalMeeting, trigger: 'change'}
//          ],
//          abnormalMeeting19:[
//            {required: true, message: '必选', trigger: 'change'},
//            {validator: validate_abnormalMeeting, trigger: 'change'}
//          ],
//          abnormalMeeting20:[
//            {required: true, message: '必选', trigger: 'change'},
//            {validator: validate_abnormalMeeting, trigger: 'change'}
//          ],
//          abnormalMeeting21:[
//            {required: true, message: '必选', trigger: 'change'},
//            {validator: validate_abnormalMeeting, trigger: 'change'}
//          ],
//          abnormalMeeting22:[
//            {required: true, message: '必选', trigger: 'change'},
//          ],
          meetingSuggest:[
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          exceptionMeetingSuggest:[
            {required: true, message: '必填', trigger: 'blur'},
          ]
        },
        options: [
          {
            value: '1',
            label: '本次筛查发现可以肺癌,较前增大,请尽快前往医院进一步治疗'
          },
          {
            value: '2',
            label: '本次筛查对比既往检查，可疑肺癌，较前增大，请尽快前往医院进一步诊疗'
          },
          {
            value: '3',
            label: '本次筛查对比既往检查，可疑肺癌，但无明显变化，请前往医院就诊'
          },
          {
            value: '4',
            label: '本次筛查未发现肺癌，但可见其他明显异常，请前往医院进一步诊疗'
          },
          {
            value: '5',
            label: '本次筛查未发现肺癌，但可见其他轻微异常'
          },
          {
            value: '6',
            label: '本次筛查无明显异常'
          },
          {
            value: '7',
            label: '其他，请说明：'
          },
        ],
        //品牌下拉框数据
        brands: [
          {
            label: 'GE',
            value: '1',
            child: [
              {
                label: 'Revolution CT Xtream Edition',
                value: '1'
              },
              {
                label: 'Revolution Frontier',
                value: '2'
              },
              {
                label: 'Revolution HD',
                value: '3'
              },
              {
                label: 'Revolution ACT',
                value: '4'
              },
              {
                label: 'Revolution EVO',
                value: '5'
              },
              {
                label: 'Discovery  CT750  HD',
                value: '6'
              },
              {
                label: 'Discovery  CT590 RT',
                value: '7'
              },
              {
                label: 'Discovery RT',
                value: '8'
              },
              {
                label: 'Discovery CT',
                value: '9'
              },
              {
                label: 'Optima CT680',
                value: '10'
              }, {
                label: 'Optima CT 670',
                value: '11'
              },
              {
                label: 'Optima CT660',
                value: '12'
              },
              {
                label: 'Optima CT 540',
                value: '13'
              },
              {
                label: 'Optima CT 520',
                value: '14'
              },
              {
                label: 'Optima CT520 Pro',
                value: '15'
              },
              {
                label: 'Bright Speed Elite Select',
                value: '16'
              },
              {
                label: 'Bright Speed Elite',
                value: '17'
              },
              {
                label: 'Bright Speed 16',
                value: '18'
              },
              {
                label: 'Bright Speed 16pro',
                value: '19'
              },
              {
                label: 'Bright Speed Excel',
                value: '20'
              },
              {
                label: 'Light Speed VCT',
                value: '21'
              },
              {
                label: 'Light Speed16',
                value: '22'
              },
              {
                label: 'Light speed pro16',
                value: '23'
              },
              {
                label: 'Light speed pro32',
                value: '24'
              },
              {
                label: 'Light Speed Ultra',
                value: '25'
              },
              {
                label: 'Brivo CT315',
                value: '26'
              },
              {
                label: 'Brivo CT325',
                value: '27'
              },
              {
                label: 'Brivo CT385',
                value: '28'
              },
            ]
          },
          {
            label: 'SOMATOM',
            value: '2',
            child: [
              {
                label: 'SOMATOM Spirit',
                value: '1'
              },
              {
                label: 'SOMATOM Emotion',
                value: '2'
              },
              {
                label: 'SOMATOM Perspective',
                value: '3'
              },
              {
                label: 'SOMATOM Sensation 40/Open',
                value: '4'
              },
              {
                label: 'SOMATOM Force',
                value: '5'
              },
              {
                label: 'SOMATOM Definition Edge',
                value: '6'
              },
              {
                label: 'SOMATOM Definition AS',
                value: '7'
              },
              {
                label: 'SOMATOM Definition Flash',
                value: '8'
              },
              {
                label: 'SOMATOM Drive',
                value: '9'
              }
            ]
          },
          {
            label: 'Philips',
            value: '3',
            child: [
              {
                label: 'MX16EVO2',
                value: '1'
              },
              {
                label: 'Access CT',
                value: '2'
              },
              {
                label: 'Flex 16',
                value: '3'
              },
              {
                label: 'Ingenuity CT',
                value: '4'
              },
              {
                label: 'Ingenuity core 128',
                value: '5'
              },
              {
                label: 'Brilliance iCT',
                value: '6'
              },
              {
                label: 'IQon Spectral CT',
                value: '7'
              },
            ]
          },
          {
            label: 'Toshiba',
            value: '4',
            child: [
              {
                label: 'Aquilion TM ONE',
                value: '1'
              },
              {
                label: 'Aquilion TM ViSION',
                value: '2'
              },
              {
                label: 'Aquilion TM PRIME',
                value: '3'
              },
              {
                label: 'Aquilion TM CXL',
                value: '4'
              },
              {
                label: 'Aquilion TM RXL',
                value: '5'
              },
              {
                label: 'Aquilion TM',
                value: '6'
              },
              {
                label: 'AlexionTM/Access edition',
                value: '7'
              },
              {
                label: 'Activion ONE  TSX-031A',
                value: '8'
              },
              {
                label: 'Activion ONE  TSX-101A',
                value: '9'
              },
            ]
          },
          {
            label: '联影',
            value: '5',
            child: [
              {
                label: 'uCT 780（160层）',
                value: '1'
              },
              {
                label: 'uCT 760（128层）',
                value: '2'
              },
              {
                label: 'uCT 530（40排40层）',
                value: '3'
              },
              {
                label: 'uCT 510（16层）',
                value: '4'
              },
            ]
          },
          {
            label: '其他',
            value: '6',
            child: []
          },
        ],
        //严重程度下拉框数据
        severitys: [
          {
            label: '轻度',
            value: '1',
          },
          {
            label: '中度',
            value: '2',
          },
          {
            label: '重度',
            value: '3',
          },
        ],
        //形状
        shapes: [
          {
            label: '圆形',
            value: '1'
          },
          {
            label: '椭圆形',
            value: '2'
          },
          {
            label: '分叶状',
            value: '3'
          },
          {
            label: '不规则',
            value: '4'
          },
          {
            label: '不能定义',
            value: '5'
          },
        ],
        //边缘
        edges: [
          {
            label: '毛刺(星状)',
            value: '1'
          },
          {
            label: '光滑',
            value: '2'
          },
          {
            label: '模糊',
            value: '3'
          },

          {
            label: '不能定义',
            value: '4'
          },
        ],
        //型号下拉框数据
        models: [],
        methodsOptions: [
          {
            value: '1',
            label: 'CT'
          },
          {
            value: '2',
            label: 'CXR(胸部X线片检查)'
          },
          {
            value: '3',
            label: 'MRI(磁共振)'
          },
          {
            value: '4',
            label: 'PET-CT(正电子发射CT扫描)'
          },
          {
            value: '5',
            label: 'LDCT(低剂量螺旋CT)'
          },
        ],
        anatomyPositions: [
          {
            value: '1',
            label: '右上叶'
          },
          {
            value: '2',
            label: '右中叶'
          },
          {
            value: '3',
            label: '右下叶'
          },
          {
            value: '4',
            label: '左上叶'
          },
          {
            value: '5',
            label: '左下叶'
          },
          {
            value: '6',
            label: '叶间胸膜面'
          },
        ],
        densitys: [
          {
            value: '1',
            label: '实性'
          },
          {
            value: '2',
            label: '部分实性'
          },
          {
            value: '3',
            label: '非实性(纯磨玻璃密度)'
          },
        ],
        densityOthers: [
          {
            value: '1',
            label: '空泡'
          },
          {
            value: '2',
            label: '空腔'
          },
          {
            value: '3',
            label: '空洞'
          },
          {
            value: '4',
            label: '坏死'
          },
          {
            value: '5',
            label: '钙化'
          },
        ],

        nodularViewDates: [
          {
            value: '1',
            label: '空泡'
          },
          {
            value: '2',
            label: '空腔'
          },
          {
            value: '3',
            label: '空洞'
          },
          {
            value: '4',
            label: '坏死'
          },
          {
            value: '5',
            label: '钙化'
          },
        ],
        proposals1: [
          {
            value: '1',
            label: '经皮穿刺'
          },
          {
            value: '2',
            label: '经支气管镜'
          },
          {
            value: '3',
            label: '其他'
          },
        ],
        proposals: [
          {
            value: '1',
            label: '年度复查'
          },
          {
            value: '2 ',
            label: '3个月复查'
          },
          {
            value: '3',
            label: '抗炎治疗后,1个月复查'
          },
          {
            value: '4',
            label: '无需抗炎,一个月后复查'
          },
          {
            value: '5',
            label: '诊断性平扫CT（薄层）进一步检查增强CT（薄层）进一步检查'
          },
          {
            value: '6',
            label: 'PET-CT进一步检查'
          },
          {
            value: '7',
            label: '活检'
          },
          {
            value: '8',
            label: '临床门诊就诊'
          },
          {
            value: '9',
            label: '其他'
          },
        ],
        natures: [
          {
            value: '1',
            label: '良性'
          },
          {
            value: '2',
            label: '良性可能大'
          },
          {
            value: '3',
            label: '不能定性'
          },
          {
            value: '4',
            label: '恶性可能大'
          },
          {
            value: '5',
            label: '恶性'
          },
        ],
        levels: [
          {
            value: '1',
            label: '非常紧急(马上)'
          },
          {
            value: '2',
            label: '加急(一周内)'
          },
          {
            value: '3',
            label: '普通'
          },
        ],
        reasons: [
          {
            value: '1',
            label: '怀疑恶性'
          },
          {
            value: '2',
            label: '性质难判定'
          },
          {
            value: '3',
            label: '其他'
          },
        ],
        editForm:{
          ctNationTubercleInfoPOList:[]
        }
      }

    },
    mounted(){
      this.$store.commit('LOGOUT_USER');
      let obj = this.checkPageAuth(this, "home_page", this.btnAuth);
      if (this.$route.query.flag == 1) {
        this.disabledShowState = false
          this.getCTResult()
//        this.formRules ={}
      }
      if (this.$route.query.flag == 2) {
        this.disabledShowState = true
        this.getCTResult()
        this.formRules ={}

      }
    },
    methods: {
      addNodularView(item){
        this.dialogVisible = true
        this.nodularView = item
      },
      sort(a,b){
        return a-b
      },
      addFormSure(formName){
        this.$refs[formName].validate((valid, obj) => {
          if (valid) {
            this.nodularView.nodularView = this.addForm.checkList1.sort(this.sort)
            this.nodularView.nodularBiopsy = this.addForm.checkList2.sort(this.sort)
            this.nodularView.nodularBiopsyOther = this.addForm.nodularBiopsyOther
            this.nodularView.nodularViewOther = this.addForm.nodularViewOther
            this.dialogVisible = false
            this.addForm.checkList1 = []
            this.addForm.checkList2 = []
            this.addForm.nodularBiopsyOther = ''
            this.addForm.nodularViewOther = ''
            this.$refs[formName].resetFields()
          }
        })
      },
      abnormalRChange(value){
      },
      abnormalSChange(value){
        if (value == 2) {
          this.form.abnormalS1 = ''
        }
      },
      abnormalQChange(value){
        if (value == 2) {
          this.form.abnormalQ1 = ''
        }
      },
      abnormalOChange(value){
        if (value == 2) {
          this.form.abnormalO1 = ''
        }
      },
      abnormalMChange(value){
        if (value == 2) {
          this.form.abnormalM1 = ''
        }
      },
      abnormalKChange(value){
        if (value == 2) {
          this.form.abnormalK1 = ''
        }
      },
      abnormalIChange(value){
        if (value == 2) {
          this.form.abnormalI1 = ''
        }
      },
      abnormalHChange(value){
        if (value == 2) {
          this.form.abnormalH1 = ''
        }
      },
      abnormalG1Change(value){
        if (value == 2) {
          this.form.abnormalG1 = ''
        }
      },
      abnormalFChange(value){
        if (value == 2) {
          this.form.abnormalF6 = ''
        }
      },
      abnormalBChange(value){
        if (value == 2) {
          this.form.abnormalB4 = ''
        }
      },
      //通过sid获取设备信息
      getEquipment(){
        $axios_http({
          url: '/ct/select/equipment',
          data: {},
          vueObj: this
        }).then((res) => {
          if (res.data.result) {
            this.form.equipmentMfrs = res.data.result.equipmentMfrs + ''
            this.form.equipmentVersion = res.data.result.equipmentVersion + ''
            this.getModelshow(this.form.equipmentMfrs)
          }
        })
      },
      //通过sid获取用户信息
      getInfo(){
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
        })
      },
      flabImageDeepChecked1Change(value){
        if (!value) {
          this.form.lungImageDeep = '',//肺常规图像层厚
            this.form.lungImageShallow = '',//肺常规图像薄层
            this.form.lungReconstructionDeep = '',//肺常规重建层厚
            this.form.lungReconstructionShallow = ''//肺常规重建薄层
        }
      },
      changeinputisnull(a, b, c){
        if (this.form[a] != b) {
          this.form[c] = null
        }
      },
      checkBoxChange(a, b){
        if (this.form[a] == false) {
          this.form[b] = null
        }
      },
      //提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid, obj) => {
            console.log(this.form)
          if (!valid) {
              console.log(valid)
//            for (var item in obj) {
//              if (this.$refs[item].focus) {
//                this.$refs[item].focus();
//              } else {
//                this.$refs[item].$el.focus();
//              }
//              break;
//            }
          }
          if (valid) {
            this.form.ctRecordStatusId = this.$route.query.id
            if (this.form.ctTubercleInfoPOList != null) {
              for (let i = 0; i < this.form.ctTubercleInfoPOList.length; i++) {
                if (this.form.ctTubercleInfoPOList[i].area == 2) {
                  this.editForm.ctNationTubercleInfoPOList.push(this.form.ctTubercleInfoPOList[i])
                }
              }
            }
            if (this.editForm.ctNationTubercleInfoPOList.length > 0) {
              for(let i =0;i<this.editForm.ctNationTubercleInfoPOList.length;i++){
                if(this.editForm.ctNationTubercleInfoPOList[i].densityOther){
                  this.editForm.ctNationTubercleInfoPOList[i].densityOther = this.editForm.ctNationTubercleInfoPOList[i].densityOther.join(',')
                }
                if(this.editForm.ctNationTubercleInfoPOList[i].nodularView){
                  this.editForm.ctNationTubercleInfoPOList[i].nodularView = this.editForm.ctNationTubercleInfoPOList[i].nodularView.join(',')
                }
                if(this.editForm.ctNationTubercleInfoPOList[i].nodularBiopsy){
                  this.editForm.ctNationTubercleInfoPOList[i].nodularBiopsy = this.editForm.ctNationTubercleInfoPOList[i].nodularBiopsy.join(',')
                }
              }
            }
            this.editForm.meetingSuggest = this.form.meetingSuggest
            this.editForm.exceptionMeetingSuggest = this.form.exceptionMeetingSuggest
            this.editForm.type = 1
            this.editForm.id = this.form.id
            this.editForm.tubercle = this.form.tubercle
            this.editForm.tubercleGreaterFive = this.form.tubercleGreaterFive
            this.editForm.ctRecordStatusId = this.$route.query.id
            this.editForm.flabImageDeep = this.form.flabImageDeep
            this.editForm.flabImageDeepOther = this.form.flabImageDeepOther
            this.editForm.flabImageShallow = this.form.flabImageShallow
            this.editForm.flabImageShallowOther = this.form.flabImageShallowOther
            this.editForm.flabImageShallowOther = this.form.flabImageShallowOther
            this.editForm.flabReconstructionDeep = this.form.flabReconstructionDeep
            this.editForm.flabReconstructionDeepOther = this.form.flabReconstructionDeepOther
            this.editForm.flabReconstructionShallow = this.form.flabReconstructionShallow
            this.editForm.flabReconstructionShallowOther = this.form.flabReconstructionShallowOther
            $axios_http({
              url: "/ct/add/ctresult",
              data: this.editForm,
              vueObj: this
            }).then((res) => {
              $successMsg(this, "保存成功")
              this.$router.replace({path: '/form/CTexaminationReport1', query: {nationId: res.data.result,areaId:this.$route.query.areaId, type: 3,meetingStatus:1}})
            })

          }
        });
      },
      abnormalMeeting21Change(a,b){
        if(this.form[a] != 1){
          this.form[b] = ''
        }
      },
      item10_16Change(){
        if (this.form.item10_16 == 2) {
          this.form.abnormalP = ''
        }
      },
      meetingViewChange(item){
        if (item.meetingView != 3) {
          item.meetingViewOther = ''
        }
      },
      meetingStatusChange(item){
        if (item.meetingStatus != 1) {
          item.meetingLevel = ''
          item.meetingView = ''
          item.meetingViewOther = ''
        }
      },
      interphaseChangeComponentStatusChange(item){
        if (item.interphaseChangeComponentStatus == 3) {
          item.interphaseChangeComponentStr = ''
        }
      },
      interphaseChangeSizeStatusChange(item){
        if (item.interphaseChangeSizeStatus == 3) {
          item.interphaseChangeSizeStr = ''
        }
      },
      interphaseChangeStatusChange(item){
        if (item.interphaseChangeStatus != 1) {
          item.interphaseChangeSizeStatus = ''
          item.interphaseChangeSizeStr = ''
          item.interphaseChangeComponentStatus = ''
          item.interphaseChangeComponentStr = ''
          item.interphaseChangeDensityStatus = ''
        }
      },
      densityChange(item){
        if (item.density != 2) {
          item.trueDiameter = ''
          item.trueMinorAxis = ''
          item.trueAverageDiameter = ''
          item.trueVolume = ''
        }
      },
      classesChange(x){
        if (x.checkList.indexOf(1) > -1) {
          x.examinationTypeBase = 1
        } else {
          x.examinationTypeBase = 2
        }
        if (x.checkList.indexOf(2) > -1) {
          x.examinationTypeDiagnosis = 1
        } else {
          x.examinationTypeDiagnosis = 2
        }
        if (x.checkList.indexOf(3) > -1) {
          x.examinationTypeFollow = 1
        } else {
          x.examinationTypeFollow = 2
        }
        if (x.checkList.indexOf(4) > -1) {
          x.examinationTypeYear = 1
        } else {
          x.examinationTypeYear = 2
        }
      },
      checkListChange(x){
        if (x.checkList.indexOf(1) > -1) {
          x.chest = 1
        } else {
          x.chest = 2
        }
        if (x.checkList.indexOf(2) > -1) {
          x.abdomen = 1
        } else {
          x.abdomen = 2
        }
        if (x.checkList.indexOf(3) > -1) {
          x.pelvic = 1
        } else {
          x.pelvic = 2
        }
        if (x.checkList.indexOf(4) > -1) {
          x.brain = 1
        } else {
          x.brain = 2
        }
        if (x.checkList.indexOf(5) > -1) {
          x.examinationOther = 1
        } else {
          x.examinationOther = 2
          x.examinationOtherStr = ''
        }
      },
      item2Change(value){
        if (value.indexOf(1) > -1) {
          this.form.ctImageScanningReasonA = 1
        } else {
          this.form.ctImageScanningReasonA = 2
        }
        if (value.indexOf(2) > -1) {
          this.form.ctImageScanningReasonB = 1
        } else {
          this.form.ctImageScanningReasonB = 2
        }
        if (value.indexOf(3) > -1) {
          this.form.ctImageScanningReasonC = 1
        } else {
          this.form.ctImageScanningReasonC = 2
        }
        if (value.indexOf(4) > -1) {
          this.form.ctImageScanningReasonD = 1
        } else {
          this.form.ctImageScanningReasonD = 2
        }
        if (value.indexOf(5) > -1) {
          this.form.ctImageScanningReasonE = 1
        } else {
          this.form.ctImageScanningReasonE = 2
        }
        if (value.indexOf(6) > -1) {
          this.form.ctImageScanningReasonF = 1
        } else {
          this.form.ctImageScanningReasonF = 2
        }
        if (value.indexOf(7) > -1) {
          this.form.ctImageScanningReasonG = 1
        } else {
          this.form.ctImageScanningReasonG = 2
        }
        if (value.indexOf(8) > -1) {
          this.form.ctImageScanningReasonH = 1
        } else {
          this.form.ctImageScanningReasonH = 2
          this.form.ctImageScanningReasonOther = ''
        }
      },

      item10_14Change(value){

        if (value == false) {
          this.form.item10_14_2_1 = false
          this.form.item10_14_2_2 = false
          this.form.item10_14_2_3 = false
          this.form.item10_14_2_4 = false
          this.form.item10_14_2_5 = false
          this.form.abnormalN1 = null
          this.form.abnormalN2 = null
          this.form.abnormalN3 = null
          this.form.abnormalN4 = null
          this.form.abnormalN5 = null
        }
      },
      item10_17Change(value){
        if (value == false) {
          this.form.item10_17_2_1 = false
          this.form.item10_17_2_2 = false
          this.form.item10_17_2_3 = false
          this.form.abnormalR4 = false
          this.form.item10_17_2_5 = false
          this.form.item10_17_2_6 = false
          this.form.item10_17_2_7 = false
          this.form.item10_17_2_8 = false
          this.form.abnormalR1 = null
          this.form.abnormalR2 = null
          this.form.abnormalR3 = null
          this.form.abnormalR5 = null
          this.form.abnormalR6 = null
          this.form.abnormalR7 = null
          this.form.abnormalR8 = null
          this.form.abnormalR = null
        }
      },
      item10_3Change(value){
        if (value == false) {
          this.form.item10_3_2_1 = false
          this.form.item10_3_2_2 = false
          this.form.item10_3_2_3 = false
          this.form.item10_3_2_4 = false
          this.form.abnormalC1 = null
          this.form.abnormalC2 = null
          this.form.abnormalC3 = null
          this.form.abnormalC4 = null
        }
      },
      item10_17_2_7Change(value){
        if (value == false) {
          this.form.abnormalR8 = null
          this.form.abnormalR7 = null
        }
      },
      //改变选中状态
      selectChange(a, b){
        if (this.form[a] != null || this.form[a] != '') {
          this.form[b] = true
        }
      },

      //是否会诊状态 改变
      meetingStatusChange(item){
        if (item.meetingStatus != 1) {
          item.meetingLevel = null
          item.meetingView = null
          item.meetingViewOther = null
        }
      },
      countToFixed(item){
        if (item.diameter % 1 == 0 && item.diameter != '') {
          item.diameter = this.returnFloat(item.diameter)
        }
      },
      countToFixed1(item){
        if (item.minorAxis % 1 == 0 && item.minorAxis != '') {
          item.minorAxis = this.returnFloat(item.minorAxis)
        }
      },
      countToFixed2(item){
        if (item.volume % 1 == 0 && item.volume != '') {
          item.volume = this.returnFloat(item.volume)
        }
      },
      countToFixed3(item){
        if (item.trueDiameter % 1 == 0 && item.trueDiameter != '') {
          item.trueDiameter = this.returnFloat(item.trueDiameter)
        }
      },
      countToFixed4(item){
        if (item.trueMinorAxis % 1 == 0 && item.trueMinorAxis != '') {
          item.trueMinorAxis = this.returnFloat(item.trueMinorAxis)
        }
      },
      countToFixed5(item){
        if (item.trueVolume % 1 == 0 && item.trueVolume != '') {
          item.trueVolume = this.returnFloat(item.trueVolume)
        }
      },
      returnFloat(value){
        console.log(value)
        var value = Math.round(parseFloat(value) * 1000) / 1000;
        var xsd = value.toString().split(".");

        if (xsd.length == 1) {
          value = value.toString() + ".000";
          return value;
        }
        if (xsd.length > 1) {
          if (xsd[1].length == 1) {
            value = value.toString() + "00";
          }
          if (xsd[1].length == 2) {
            value = value.toString() + "0";
          }
          return value;
        }
      },
      //获取平均径
      getMeanDiameter(item, index){
          console.log(item,1)
        if (item.diameter!='' && item.minorAxis!='') {
          item.averageDiameter = (item.diameter / 1 + item.minorAxis / 1) / 2
          item.averageDiameter = this.returnFloat(item.averageDiameter)
        }
      },
      //获取实性平均径
      getsxMeanDiameter(item, index){
        if (item.trueDiameter && item.trueMinorAxis) {
          item.trueAverageDiameter = (item.trueDiameter / 1 + item.trueMinorAxis / 1) / 2
//          item.trueAverageDiameter = this.returnFloat(item.trueAverageDiameter)
        }
      },
      //通过sid获取用户信息
      getCTResult(){
        $axios_http({
          url: '/ct/select/result',
          data: {
            id: this.$route.query.resultId,
            type: 1,
          },
          vueObj: this
        }).then((res) => {

          this.form = res.data.result
          if (this.form.abnormalFirstDate) {
            this.form.abnormalFirstDate = this.getDate((this.form.abnormalFirstDate))
          }
          if (this.form.examinationDate) {
            this.form.examinationDate = this.getDate((this.form.examinationDate))
          }
          this.getModelshow(this.form.equipmentMfrs)
          this.form.lessTenCount+=''
          if (this.form.lessTenCount) {
            this.form.item8_3 = 1
            this.countState = true
          }
          if (this.form.greaterTenCount) {
            this.form.item8_3 = 2
            this.countState = true
          }
          if (this.form.ctTubercleInfoPOList) {
            for (let j = 0; j < this.form.ctTubercleInfoPOList.length; j++) {
              for (let item in this.form.ctTubercleInfoPOList[j]) {
                if (this.form.ctTubercleInfoPOList[j][item]) {
                  if(item == 'densityOther'){
                    this.form.ctTubercleInfoPOList[j][item] = this.form.ctTubercleInfoPOList[j][item].split(',')
                  }else if (item == 'nodularView') {
                    this.form.ctTubercleInfoPOList[j][item] = this.form.ctTubercleInfoPOList[j][item].split(',')
                  }else   if (item == 'nodularBiopsy') {
                    this.form.ctTubercleInfoPOList[j][item] = this.form.ctTubercleInfoPOList[j][item].split(',')
                  }else{
                    this.form.ctTubercleInfoPOList[j][item] += ''
                  }

                }

              }
            }
          }
          console.log(this.form.ctTubercleInfoPOList,11)
          if(this.$route.query.flag == 2){
            if (this.form.ctTubercleInfoPOList!=null&&this.form.ctNationTubercleInfoPOList!=null) {
              for (let j = 0; j < this.form.ctTubercleInfoPOList.length; j++) {
//                this.form.ctTubercleInfoPOList[j].area = 2
                for (let i = 0; i < this.form.ctNationTubercleInfoPOList.length; i++) {
                  if (this.form.ctTubercleInfoPOList[j].tubercleCode == this.form.ctNationTubercleInfoPOList[i].tubercleCode) {
//                    this.form.ctNationTubercleInfoPOList[i].area = 2
                    this.form.ctNationTubercleInfoPOList[i].densityOther = this.form.ctNationTubercleInfoPOList[i].densityOther.split(',')
                    this.form.ctNationTubercleInfoPOList[i].nodularView = this.form.ctNationTubercleInfoPOList[i].nodularView.split(',')
                    this.form.ctNationTubercleInfoPOList[i].nodularBiopsy = this.form.ctNationTubercleInfoPOList[i].nodularBiopsy.split(',')
                    this.form.ctTubercleInfoPOList.splice(j + 1, 0, this.form.ctNationTubercleInfoPOList[i])
                    j += 1
                  }
                }
              }
            }
          }
          if(this.$route.query.flag == 1){
            if (this.form.ctTubercleInfoPOList) {
              for (let j = 0; j < this.form.ctTubercleInfoPOList.length; j++) {
                var obj = {
                  tubercleCode: this.form.ctTubercleInfoPOList[j].tubercleCode,
                  numName: '会诊' + this.form.ctTubercleInfoPOList[j].numName,//结节编号
                  serialNumber: this.form.ctTubercleInfoPOList[j].serialNumber,//序列编号
                  imageNum: this.form.ctTubercleInfoPOList[j].imageNum,//图像编号
                  anatomicalPosition: this.form.ctTubercleInfoPOList[j].anatomicalPosition,//解剖位置
                  density: this.form.ctTubercleInfoPOList[j].density,//密度
                  densityOther: this.form.ctTubercleInfoPOList[j].densityOther,
                  diameter: this.form.ctTubercleInfoPOList[j].diameter,//长泾
                  minorAxis: this.form.ctTubercleInfoPOList[j].minorAxis,//垂直短径
                  averageDiameter: this.form.ctTubercleInfoPOList[j].averageDiameter,//平均径
                  volume: this.form.ctTubercleInfoPOList[j].volume,//体积
                  trueDiameter: this.form.ctTubercleInfoPOList[j].trueDiameter,//实性长泾
                  trueMinorAxis: this.form.ctTubercleInfoPOList[j].trueMinorAxis,//实性垂直短径
                  trueAverageDiameter: this.form.ctTubercleInfoPOList[j].trueAverageDiameter,//实性平均径
                  trueVolume: this.form.ctTubercleInfoPOList[j].trueVolume,//实性体积
                  nodularProperties: this.form.ctTubercleInfoPOList[j].nodularProperties,//结节性质
                  nodularView: this.form.ctTubercleInfoPOList[j].nodularView,//结节处理意见
                  nodularViewOther: this.form.ctTubercleInfoPOList[j].nodularViewOther,//结节处理意见其他
                  nodularBiopsy: this.form.ctTubercleInfoPOList[j].nodularBiopsy,//结节处理意见
                  nodularBiopsyOther: this.form.ctTubercleInfoPOList[j].nodularBiopsyOther,//结节处理意见其他
                  nodularViewDate: this.form.ctTubercleInfoPOList[j].nodularViewDate,//随诊时间
                  interphaseChangeStatus:  this.form.ctTubercleInfoPOList[j].interphaseChangeStatus,
                  interphaseChangeSizeStatus:  this.form.ctTubercleInfoPOList[j].interphaseChangeSizeStatus,
                  interphaseChangeSizeStr:  this.form.ctTubercleInfoPOList[j].interphaseChangeSizeStr,
                  interphaseChangeComponentStatus:  this.form.ctTubercleInfoPOList[j].interphaseChangeComponentStatus,
                  interphaseChangeComponentStr:  this.form.ctTubercleInfoPOList[j].interphaseChangeComponentStr,
                  interphaseChangeDensityStatus:  this.form.ctTubercleInfoPOList[j].interphaseChangeDensityStatus,
                  meetingStatus: 2,//是否会诊
                  meetingLevel: '',//会诊级别
                  meetingView: '',//会诊意见
                  meetingViewOther: '',//会诊意见其他
                  shape: this.form.ctTubercleInfoPOList[j].shape,//形状
                  edge: this.form.ctTubercleInfoPOList[j].edge,//边缘
                  area: 2,
                }
                this.form.ctTubercleInfoPOList[j].area = 1
                this.form.ctTubercleInfoPOList[j].state = 1
                if(this.form.ctTubercleInfoPOList[j].meetingStatus == 1){
                  this.form.ctTubercleInfoPOList.splice(j+1,0,obj)
                  j = j+1
                }

              }
            }
          }
          if(this.form.ctPastResultPOList){
            for(let i = 0; i <this.form.ctPastResultPOList.length;i++){
              this.form.ctPastResultPOList[i].checkList=[]
              this.form.ctPastResultPOList[i].classes=[]
              if(this.form.ctPastResultPOList[i].chest == 1){
                this.form.ctPastResultPOList[i].checkList.push(1)
              }
              if(this.form.ctPastResultPOList[i].abdomen == 1){
                this.form.ctPastResultPOList[i].checkList.push(2)
              }
              if(this.form.ctPastResultPOList[i].pelvic == 1){
                this.form.ctPastResultPOList[i].checkList.push(3)
              }
              if(this.form.ctPastResultPOList[i].brain == 1){
                this.form.ctPastResultPOList[i].checkList.push(4)
              }
              if(this.form.ctPastResultPOList[i].examinationOther == 1){
                this.form.ctPastResultPOList[i].checkList.push(5)
              }
              if(this.form.ctPastResultPOList[i].examinationTypeBase == 1){
                this.form.ctPastResultPOList[i].classes.push(1)
              }
              if(this.form.ctPastResultPOList[i].examinationTypeDiagnosis == 1){
                this.form.ctPastResultPOList[i].classes.push(2)
              }
              if(this.form.ctPastResultPOList[i].examinationTypeFollow == 1){
                this.form.ctPastResultPOList[i].classes.push(3)
              }
              if(this.form.ctPastResultPOList[i].examinationTypeYear == 1){
                this.form.ctPastResultPOList[i].classes.push(4)
              }
              this.form.ctPastResultPOList[i].examinationMethod += ''
              this.form.ctPastResultPOList[i].examinationDate = this.getDate(this.form.ctPastResultPOList[i].examinationDate)
            }
          }

          this.form.equipmentMfrs += ''
          this.form.equipmentVersion += ''
          if(this.form.abnormalC0){
            this.form.abnormalC0+= ''
          }
          if (this.form.abnormalC1) {
            this.form.abnormalC_2_1 = true
            this.form.abnormalC1 += ''
          }
          if (this.form.abnormalC2) {
            this.form.abnormalC_2_2 = true
            this.form.abnormalC2 += ''
          }
          if (this.form.abnormalC3) {
            this.form.abnormalC_2_3 = true
            this.form.abnormalC3 += ''
          }
          if (this.form.abnormalC4) {
            this.form.abnormalC_2_4 = true
            this.form.abnormalC4 += ''
          }
          if (this.form.abnormalN1) {
            this.form.abnormalN1 += ''
            this.form.item10_14 = 1
            this.form.item10_14_2_1 = true
          }
          if (this.form.abnormalN2) {
            this.form.abnormalN2 += ''
            this.form.item10_14 = 1
            this.form.item10_14_2_2 = true
          }
          if (this.form.abnormalN3) {
            this.form.abnormalN3 += ''
            this.form.item10_14 = 1
            this.form.item10_14_2_3 = true
          }
          if (this.form.abnormalN4) {
            this.form.abnormalN4 += ''
            this.form.item10_14 = 1
            this.form.item10_14_2_4 = true
          }
          if (this.form.abnormalN5) {
            this.form.abnormalN5 += ''
            this.form.item10_14 = 1
            this.form.item10_14_2_5 = true
          }
          if(!this.form.abnormalN1 && !this.form.abnormalN2&& !this.form.abnormalN3&& !this.form.abnormalN4&& !this.form.abnormalN5){
            this.form.item10_14 = 2
          }
          if (this.form.abnormalP == 1) {
//            this.form.abnormalP += ''
            this.form.item10_16 = 1
          }else {
            this.form.item10_16 = 2
          }
          if (this.form.abnormalR) {
            this.form.item10_17 = 1
          }
          if (this.form.abnormalR1 ==1) {
            this.form.item10_17 = 1
            this.form.item10_17_2_1 = true
          }
          if (this.form.abnormalR2 ==1) {
            this.form.item10_17 = 1
            this.form.item10_17_2_2 = true
          }
          if (this.form.abnormalR3 ==1) {
            this.form.item10_17 = 1
            this.form.item10_17_2_3 = true
          }
          if (this.form.abnormalR4 == 1) {
            this.form.abnormalR4 = 1
            this.form.item10_17 = 1
          }
          if (this.form.abnormalR5 ==1 ) {
            this.form.item10_17 = 1
            this.form.item10_17_2_5 = true
          }
          if (this.form.abnormalR6 ==1) {
            this.form.item10_17 = 1
            this.form.item10_17_2_6 = true
          }
          if (this.form.abnormalR7 == 1) {
            this.form.item10_17 = 1
            this.form.item10_17_2_7 = true
          }

          console.log(this.form,this.countState,2)
          this.form.item2 = []
          if (this.form.ctImageScanningReasonA == 1){
            this.form.item2.push(1)
          }
          if (this.form.ctImageScanningReasonB == 1){
            this.form.item2.push(2)
          }
          if (this.form.ctImageScanningReasonC == 1){
            this.form.item2.push(3)
          }
          if (this.form.ctImageScanningReasonD == 1){
            this.form.item2.push(4)
          }
          if (this.form.ctImageScanningReasonE == 1){
            this.form.item2.push(5)
          }
          if (this.form.ctImageScanningReasonF == 1){
            this.form.item2.push(6)
          }
          if (this.form.ctImageScanningReasonG == 1){
            this.form.item2.push(7)
          }
          if (this.form.ctImageScanningReasonH == 1){
            this.form.item2.push(8)
          }
          this.form.diagnosticResult += ''
          console.log(this.form.item2)
          this.form.userName = res.data.result.hosPersonInfoPO.userName
          this.form.age = res.data.result.hosPersonInfoPO.age
          this.form.idCard = res.data.result.hosPersonInfoPO.idCard
          this.form.sex = res.data.result.hosPersonInfoPO.sex==1?'男':'女'
          console.log(this.form,this.countState)
        })
      },
      //添加结节表单数量
      addTableTubercleList(){
        this.form.ctTubercleInfoPOList = []
        if (this.form.item8_3 == '1' && this.form.lessTenCount > 0 && this.form.lessTenCount <= 10) {
          for (let j = 0; j < this.form.lessTenCount; j++) {
            this.form.ctTubercleInfoPOList.push({
              tubercleCode: (j + 1),
              numName: '结节' + (j + 1),//结节编号
              serialNumber: '',//序列编号
              imageNum: '',//图像编号
              anatomicalPosition: '',//解剖位置
              density: '',//密度
              densityOther: [],
              diameter: '',//长泾
              minorAxis: '',//垂直短径
              averageDiameter: '',//平均径
              volume: '',//体积
              trueDiameter: '',//实性长泾
              trueMinorAxis: '',//实性垂直短径
              trueAverageDiameter: '',//实性平均径
              trueVolume: '',//实性体积
              interphaseChangeStatus: '',
              interphaseChangeSizeStatus: '',
              interphaseChangeSizeStr: '',
              interphaseChangeComponentStatus: '',
              interphaseChangeComponentStr: '',
              interphaseChangeDensityStatus: '',
              nodularProperties: '',//结节性质
              nodularView: [],//结节处理意见
              nodularViewOther: '',//结节处理意见其他
              nodularBiopsy: [],//结节处理意见
              nodularBiopsyOther: '',//结节处理意见其他
              nodularViewDate: '',//随诊时间
              meetingStatus: '',//是否会诊
              meetingLevel: '',//会诊级别
              meetingView: '',//会诊意见
              meetingViewOther: '',//会诊意见其他
              shape: '',//形状
              edge: '',//边缘
            },)
          }
        } else if (this.form.item8_3 == '2' && this.form.greaterTenCount > 10) {
          for (let i = 0; i < 10; i++) {
            this.form.ctTubercleInfoPOList.push({
              tubercleCode: (i + 1),
              numName: '结节' + (i + 1),//结节编号
              serialNumber: '',//序列编号
              imageNum: '',//图像编号
              anatomicalPosition: '',//解剖位置
              density: '',//密度
              densityOther: [],//密度其他
              diameter: '',//长泾
              minorAxis: '',//垂直短径
              averageDiameter: '',//平均径
              volume: '',//体积
              trueDiameter: '',//实性长泾
              trueMinorAxis: '',//实性垂直短径
              trueAverageDiameter: '',//实性平均径
              trueVolume: '',//实性体积
              interphaseChangeStatus: '',
              interphaseChangeSizeStatus: '',
              interphaseChangeSizeStr: '',
              interphaseChangeComponentStatus: '',
              interphaseChangeComponentStr: '',
              interphaseChangeDensityStatus: '',
              nodularProperties: '',//结节性质
              nodularView: '',//结节处理意见
              nodularViewOther: '',//结节处理意见其他
              nodularBiopsy: [],//结节处理意见
              nodularBiopsyOther: '',//结节处理意见其他
              nodularViewDate: '',//随诊时间
              meetingStatus: '',//是否会诊
              meetingLevel: '',//会诊级别
              meetingView: '',//会诊意见
              meetingViewOther: '',//会诊意见其他
              shape: '',//形状
              edge: '',//边缘
            },)
          }
        }
      },
      //删除会诊
      cutctTubercleInfoPOList(item, index){
        item.state = 1
        this.form.ctTubercleInfoPOList.splice(index + 1, 1)
      },
      //添加会诊
      addctTubercleInfoPOList(item, index){
        item.state = 2
        var obj = {
          tubercleCode: this.form.ctTubercleInfoPOList[index].tubercleCode,
          numName: '会诊' + this.form.ctTubercleInfoPOList[index].numName,//结节编号
          serialNumber: this.form.ctTubercleInfoPOList[index].serialNumber,//序列编号
          imageNum: this.form.ctTubercleInfoPOList[index].imageNum,//图像编号
          anatomicalPosition: this.form.ctTubercleInfoPOList[index].anatomicalPosition,//解剖位置
          density: this.form.ctTubercleInfoPOList[index].density,//密度
          densityOther: this.form.ctTubercleInfoPOList[index].densityOther,
          diameter: this.form.ctTubercleInfoPOList[index].diameter,//长泾
          minorAxis: this.form.ctTubercleInfoPOList[index].minorAxis,//垂直短径
          averageDiameter: this.form.ctTubercleInfoPOList[index].averageDiameter,//平均径
          volume: this.form.ctTubercleInfoPOList[index].volume,//体积
          trueDiameter: this.form.ctTubercleInfoPOList[index].trueDiameter,//实性长泾
          trueMinorAxis: this.form.ctTubercleInfoPOList[index].trueMinorAxis,//实性垂直短径
          trueAverageDiameter: this.form.ctTubercleInfoPOList[index].trueAverageDiameter,//实性平均径
          trueVolume: this.form.ctTubercleInfoPOList[index].trueVolume,//实性体积
          nodularProperties: this.form.ctTubercleInfoPOList[index].nodularProperties,//结节性质
          nodularView: this.form.ctTubercleInfoPOList[index].nodularView,//结节处理意见
          nodularViewOther: this.form.ctTubercleInfoPOList[index].nodularViewOther,//结节处理意见其他
          nodularBiopsy: this.form.ctTubercleInfoPOList[index].nodularBiopsy,//结节处理意见
          nodularBiopsyOther: this.form.ctTubercleInfoPOList[index].nodularBiopsyOther,//结节处理意见其他
          nodularViewDate: this.form.ctTubercleInfoPOList[index].nodularViewDate,//随诊时间
          interphaseChangeStatus:  this.form.ctTubercleInfoPOList[index].interphaseChangeStatus,
          interphaseChangeSizeStatus:  this.form.ctTubercleInfoPOList[index].interphaseChangeSizeStatus,
          interphaseChangeSizeStr:  this.form.ctTubercleInfoPOList[index].interphaseChangeSizeStr,
          interphaseChangeComponentStatus:  this.form.ctTubercleInfoPOList[index].interphaseChangeComponentStatus,
          interphaseChangeComponentStr:  this.form.ctTubercleInfoPOList[index].interphaseChangeComponentStr,
          interphaseChangeDensityStatus:  this.form.ctTubercleInfoPOList[index].interphaseChangeDensityStatus,
          meetingStatus: 2,//是否会诊
          meetingLevel: '',//会诊级别
          meetingView: '',//会诊意见
          meetingViewOther: '',//会诊意见其他
          shape: this.form.ctTubercleInfoPOList[index].shape,//形状
          edge: this.form.ctTubercleInfoPOList[index].edge,//边缘
          area: 2,
        }
        this.form.ctTubercleInfoPOList.splice(index + 1, 0, obj)
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      //根据选择品牌获取设备型号
      getModel(value){
        for (let i = 0; i < this.brands.length; i++) {
          if (value == this.brands[i].value) {
            this.models = this.brands[i].child
            this.form.equipmentVersion = null
          }
        }
      },
      //根据选择品牌获取设备型号
      getModelshow(value){
        for (let i = 0; i < this.brands.length; i++) {
          if (value == this.brands[i].value) {
            this.models = this.brands[i].child
          }
        }
      },
      //既往影像回顾添加td
      addItem(method){
        if (method == 'plus') {
          this.form.ctPastResultPOList.push({
            examinationDate: '',
            examinationMethod: '',
            chest: 2,
            abdomen: 2,
            pelvic: 2,
            brain: 2,
            examinationOther: 2,
            examinationOtherStr: '',
            examinationTypeBase: 2,
            examinationTypeYear: 2,
            examinationTypeFollow: 2,
            examinationTypeDiagnosis: 2,
            checkList: [],
            classes: []
          })

        } else if (method == 'minus') {
          this.form.ctPastResultPOList.pop()
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

    },
    watch: {
      'form.ctImageScanning': function (val) {
        if (val == 1) {
          this.form.ctImageScanningReasonA = 2
          this.form.ctImageScanningReasonB = 2
          this.form.ctImageScanningReasonC = 2
          this.form.ctImageScanningReasonD = 2
          this.form.ctImageScanningReasonE = 2
          this.form.ctImageScanningReasonF = 2
          this.form.ctImageScanningReasonG = 2
          this.form.ctImageScanningReasonH = 2
          this.form.ctImageScanningReasonOther = ''
          this.form.item2 = []
        }
      },
      'form.reviewCtResult': function (val) {
        if (val != 1) {
          this.form.ctPastResultPOList = [
            {
              examinationDate: '',
              examinationMethod: '',
              chest: 2,
              abdomen: 2,
              pelvic: 2,
              brain: 2,
              examinationOther: 2,
              examinationOtherStr: '',
              examinationTypeBase: 2,
              examinationTypeYear: 2,
              examinationTypeFollow: 2,
              examinationTypeDiagnosis: 2,
              classes: [],
              checkList: [],
            }
          ]
        }
      },
      'form.tubercle': function (val) {
        if (val == 2) {
          this.form.tubercleLessFive = ''
          this.form.tubercleGreaterFive = ''
          this.form.item8_3 = ''
          this.form.lessTenCount = ''
          this.form.greaterTenCount = ''
          this.form.ctTubercleInfoPOList = []
          this.form.tubercleHandlingSuggestion = ''
          this.countState = false
        }
      },
      'form.tubercleLessFive': function (val) {
        if (val == 1) {
          this.form.tubercleGreaterFive = ''
          this.form.item8_3 = ''
          this.form.lessTenCount = ''
          this.form.greaterTenCount = ''
          this.form.ctTubercleInfoPOList = []
          this.form.tubercleHandlingSuggestion = ''
          this.countState = false
        }
      },
      'form.tubercleGreaterFive': function (val) {
        if (val == 2) {
          this.form.item8_3 = ''
          this.form.lessTenCount = ''
          this.form.greaterTenCount = ''
          this.form.ctTubercleInfoPOList = []
          this.form.tubercleHandlingSuggestion = ''
          this.countState = false
        }
      },
      'form.item8_3': function (val) {
        if (val == 1) {
          this.form.greaterTenCount = ''
//          this.form.ctTubercleInfoPOList = []
//          this.form.tubercleHandlingSuggestion = ''
        } else {
          this.form.lessTenCount = ''
//          this.form.ctTubercleInfoPOList = []
//          this.form.tubercleHandlingSuggestion = ''
        }
      },
      'form.stage': function (val) {
        if (val == 1) {
          for (let i = 0; i < this.form.ctTubercleInfoPOList.length; i++) {
            this.form.ctTubercleInfoPOList[i].interphaseChangeStatus = ''
            this.form.ctTubercleInfoPOList[i].interphaseChangeSizeStatus = ''
            this.form.ctTubercleInfoPOList[i].interphaseChangeSizeStr = ''
            this.form.ctTubercleInfoPOList[i].interphaseChangeComponentStatus = ''
            this.form.ctTubercleInfoPOList[i].interphaseChangeComponentStr = ''
            this.form.ctTubercleInfoPOList[i].interphaseChangeDensityStatus = ''
          }
        }
      },
      'form.lungImageDeep': function (val) {
        if (val!= '' && val != null) {
          this.flabImageDeepChecked1 = true
        }
      },
      'form.abnormalMeetingStatus': function (val) {
        if (val == 2) {
          this.form.abnormalMeetingStatusRemark = ''
        }
      },
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .form-title {
    padding-top: 40px;
    text-align: center;
  }

  .form-body {
    margin-top: 40px;
  }

  .form-body-content {
    padding: 20px 40px;
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
  }

  .content-page {
    background: #fff;
    padding: 20px;
  }

  .form-inline {
    display: inline-block;
  }

  .form-table {
    margin-top: 20px;
  }

  .form-table tr td {
    padding: 10px;
    width: 220px;
    border: 1px solid #000000;
  }

  .form-table-head {
    background: #e5e5e5;
  }

  .form-table p {
    height: 50px;
  }

  .indent {
    padding-left: 25px;
  }

  .form-table-content p {
    height: 80px;
    padding-left: 10px;
    padding-top: 10px;
    border-bottom: 1px solid #000000;
    border-right: 1px solid #000000;

  }

  .form-table-content {
    width: 100%;
    float: left;
    border-top: 1px solid #000000;
    border-left: 1px solid #000000;
    overflow: scroll;
  }

  .addButton {
    float: left;
    margin-left: 20px;
    margin-top: 60px;
  }

  .form-td-content p {
    width: 240px;
  }

  .item-check {
    float: left;
    margin-right: 20px;
  }

  .form-td-title {
    width: 160px !important;
    border-left: none;
  }

  .div-scroll {
    float: left;
    overflow-x: scroll;
    max-width: 1500px;
    margin-left: 40px;
  }

  .ctTubercleInfoPOList-table-title {
    width: 200px;
  }

  .ctTubercleInfoPOList-table-title p {
    border-bottom: 1px solid #ffffff;
    width: 200px;
    height: 50px;
    padding-top: 10px;
    padding-bottom: 20px;
    /*border-bottom:1px solid #000000;*/
    background: #e5e5e5;
    padding-left: 10px;
  }

  .ctTubercleInfoPOList-table-content {
  . padding-top: 0 px
  }

  .ctTubercleInfoPOList-table-content p {
    height: 50px;
    line-height: 50px;
    margin-left: 20px;
    border-bottom: 1px solid #ffffff;
    width: 300px;
  }

  .div {
    overflow-x: scroll;
    width: 98%;
  }

  .div-scroll {
    float: left;
    overflow-x: scroll;
    max-width: 950px;
    margin-left: 40px;
  }

  .form-abnormalCondition-table td {
    border: 1px solid #000000;
    width: 470px;
    margin-top: 20px;
    vertical-align: top;
    padding-top: 10px;
  }
  .form-abnormalCondition-table1 td {
    border: 1px solid #000000;
    width: 470px;
    vertical-align: top;
  }

  .form-abnormalCondition-th {
    background: #e5e5e5;
    text-align: center;
    height: 40px;
  }

  .form-fontSize {
    padding-left: 65px;
    color: #606266;
    font-size: 14px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    cursor: pointer;
    user-select: none;
  }

  .add-img {
    width: 20px;
    height: 20px;
    float: right;
    margin-top: 15px;
    margin-left: 5px;
  }

  .tabled-td-anatomicalPosition {
    height: 145px !important;
  }

  .tabled-td-bt span {
    font-size: 11px;
    padding-left: 20px;
    margin-top: 5px;
    /*color: #999;*/
  }

  .tabled-td-density {
    height: 90px !important;
  }

  .tabled-td-densityOther {
    height: 130px !important;
  }

  .tabled-td-shape {
    height: 130px !important;
  }

  .tabled-td-edge {
    height: 130px !important;
  }

  .form-item200 {
    width: 200px;
  }
  .form-span-title {
    display: inline-block;
    width: 300px;
  }
</style>
<style>
  .el-form-item__error {
    padding: 0 !important;

  }

  .form-item .el-form-item__content {
    margin-left: 25px !important;
  }

  .form-item-check .el-form-item__content {
    margin-left: 25px !important;
  }
  .form-item-check1 .el-form-item__content {
    margin-left: 25px !important;
  }
  .form-item-check {
    /*float: left;*/
  }

  .form-item .el-radio {
    line-height: 30px !important;
  }

  .form-table-content .el-checkbox-group {
    height: 100px;
  }

  .el-checkbox {
    margin-left: 10px !important;
  }

  .form-item1 .el-form-item__content {
    margin-left: 5px !important;
  }

  .form-index-checkbox {
    padding-left: 40px;
  }

  .form-index-checkbox1 {
    padding-left: 20px;
  }

  .form-index-checkbox .el-checkbox + .el-checkbox {
    margin-left: 10px;
    padding: 0;
  }

  .form-index-checkbox .el-checkbox {
    margin-left: 10px;
  }

  #content .el-form-item {
    margin-bottom: 0px;
    display: inline-block;
  }

  #check-group .el-form-item__content {
    line-height: 22px;
    position: relative;
    font-size: 14px;
  }

  .form-table .el-form-item__error {
    position: relative;
  }

  .form-item .el-form-item__content {
    margin-left: 40px !important;
  }

  .form-item1 .el-form-item__content {
    margin-left: 5px !important;
  }

  .form-item1 {
    display: inline-block;
  }

  .form-table .el-form-item__content {
    margin-left: 5px !important;
  }

  .form-item-title-big {
    font-weight: 700;
  }

  #content .el-checkbox-group {
    height: auto !important;
    padding-bottom: 20px;
  }

  .form-index-checkbox .el-form-item {
    margin-bottom: 0px !important;
  }

  .ctImageScanningReason .el-form-item__content {
    margin-left: -5px !important;
  }

  .float-form-item {
    float: left;
  }

  .all-idea-table {
    margin-top: 20px;
  }

  .all-idea-table-title {
    width: 200px;
    background: #e5e5e5;
    padding-left: 10px;
  }

  .all-idea-content {
    padding-left: 20px;
    padding-top: 20px;
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

  .form-td-content .el-form-item__content {
    margin-left: 10px !important;
  }
  .form-abnormalCondition-table1 td .el-form-item{
    margin-bottom:0px!important;
  }
  .dialogVisible .el-form-item__content{
    line-height:20px!important;
  }

</style>
