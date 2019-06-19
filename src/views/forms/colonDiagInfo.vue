<template>
  <div v-if="colonDiagInfo_page" class="form-wrapper">
    <!--<router-link to="/home/home">

    </router-link>-->
    <el-button size="mini" class="return" @click="goBack()">返 回</el-button>
    <div class="form-title">
      <h3>原发性结直肠癌诊断信息表</h3>
    </div>
    <el-form :model="insertForm" :rules="rules" ref="insertForm" :inline="false">
      <div>
        <div class="subject-form-first">
          <div class="subject-form-title">
            第一部分：管理部分
          </div>
          <el-row>
            <el-col :span="12" style="border-right: 1px solid #CCCCCC;border-radius: 0">
              <div class="form-first-left">
                <div class="grid-content bg-purple">
                  <div style="display: block;">
                    <el-col :span="21">
                      <div style="height: 40px;line-height: 40px" class="form-item-title">受试者是否曾填写过此表</div>
                      <div style="padding-left:40px">1. 是 2. 否 3. 不详</div>
                    </el-col>
                    <el-col :span="3">
                      <el-form-item label="" label-width="" prop="name" class="formItemWidth"
                                    style="float: right;margin-right: 30px;">
                        <span class="cmbi1">
                            <el-input v-model="insertForm.name" auto-complete="off" size="small" ref="name"
                                      :maxlength='1' class="form-item"
                                      @keyup.enter.native="focusName()"></el-input>
                        </span>
                      </el-form-item>
                    </el-col>
                  </div>
                  <div style="display: block;">
                    <el-col :span="14">
                      <div style="height: 40px;line-height: 40px" class="form-item-title">摘录日期</div>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="" label-width="" prop="name" class="formItemWidth"
                                    style="float: right;margin-right: 30px;">
                        <span class="cmbi4">
                          <el-input v-model="insertForm.date" auto-complete="off" size="small" ref="name" :maxlength='4'
                                    class="form-item"
                                    @keyup.enter.native="focusName()"></el-input> -
                        </span>
                        <span class="cmbi2">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='2' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                         </span>
                        -
                        <span class="cmbi2">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='2' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                         </span>
                      </el-form-item>

                    </el-col>
                  </div>
                  <div style="display: block;">
                    <el-col :span="19">
                      <div style="height: 40px;line-height: 40px" class="form-item-title">摘录员 ID</div>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="" label-width="" prop="name" class="formItemWidth"
                                    style="float: right;margin-right: 30px;">
                        <span class="cmbi4">
                          <el-input v-model="insertForm.date" auto-complete="off" size="small" ref="name" :maxlength='4'
                                    class="form-item"
                                    @keyup.enter.native="focusName()"></el-input>
                        </span>
                      </el-form-item>
                    </el-col>
                  </div>
                  <div style="display: block;">
                    <el-col :span="19">
                      <div style="height: 40px;line-height: 40px" class="form-item-title">筛查现场 ID</div>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="" label-width="" prop="name" class="formItemWidth"
                                    style="float: right;margin-right: 30px;">
                        <span class="cmbi1">
                            <el-input v-model="insertForm.name" auto-complete="off" size="small" ref="name"
                                      :maxlength='1' class="form-item"
                                      @keyup.enter.native="focusName()"></el-input>
                        </span>
                      </el-form-item>
                    </el-col>
                  </div>
                  <div style="display: block;">
                    <el-col :span="19">
                      <div style="height: 40px;line-height: 40px" class="form-item-title">研究年份（T0-T2）</div>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="" label-width="" prop="name" class="formItemWidth"
                                    style="float: right;margin-right: 30px;">
                        <span class="cmbi1">
                           T <el-input v-model="insertForm.name" auto-complete="off" size="small" ref="name"
                                       :maxlength='1' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                        </span>
                      </el-form-item>
                    </el-col>
                  </div>
                  <div style="display: block;">
                    <el-col :span="19">
                      <div style="height: 40px;line-height: 40px" class="form-item-title">该病例是否为筛查发现</div>
                      <div style="padding-left:40px">1. 是 2. 否 3. 不详</div>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="" label-width="" prop="name" class="formItemWidth"
                                    style="float: right;margin-right: 30px;">
                        <span class="cmbi1">
                          <el-input v-model="insertForm.name" auto-complete="off" size="small" ref="name" :maxlength='1'
                                    class="form-item"
                                    @keyup.enter.native="focusName()"></el-input>
                        </span>
                      </el-form-item>
                    </el-col>
                  </div>
                  <div style="display: block;">
                    <el-col :span="14">
                      <div style="height: 40px;line-height: 40px" class="form-item-title">筛查日期或《癌症诊断表》填表日期：</div>
                      <div style="font-size: 13px;padding-left: 40px;">（优先填筛查日期）</div>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="" label-width="" prop="name" class="formItemWidth"
                                    style="float: right;margin-right: 30px;">
                        <span class="cmbi4">
                          <el-input v-model="insertForm.date" auto-complete="off" size="small" ref="name" :maxlength='4'
                                    class="form-item"
                                    @keyup.enter.native="focusName()"></el-input> -
                        </span>
                        <span class="cmbi2">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='2' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                         </span>
                        -
                        <span class="cmbi2">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='2' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                         </span>
                      </el-form-item>

                    </el-col>
                  </div>
                  <div style="display: block;">
                    <el-col :span="19">
                      <div style="height: 40px;line-height: 40px" class="form-item-title">摘录目的：</div>
                      <div style="padding-left:40px">1=初次摘录</div>

                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="" label-width="" prop="name" class="formItemWidth"
                                    style="float: right;margin-right: 30px;">
                        <span class="cmbi1">
                          <el-input v-model="insertForm.name" auto-complete="off" size="small" ref="name" :maxlength='1'
                                    class="form-item"
                                    @keyup.enter.native="focusName()"></el-input>
                        </span>
                      </el-form-item>
                    </el-col>
                  </div>
                  <div style="display: block;">
                    <el-col :span="19">
                      <div class="form-title-count">2=为质量保证（QA）再次摘录，本次为第几次：</div>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="" label-width="" prop="name" class="formItemWidth"
                                    style="float: right;margin-right: 30px;">
                        <span class="cmbi1">
                          <el-input v-model="insertForm.name" auto-complete="off" size="small" ref="name" :maxlength='1'
                                    class="form-item"
                                    @keyup.enter.native="focusName()"></el-input>
                        </span>
                      </el-form-item>
                    </el-col>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light form-first-right">
                <el-form-item label="调查员签名" :label-width="formLabelWidth" prop="investigator" class="formItemWidth">
                  <el-input v-model="insertForm.investigator" auto-complete="off" size="small" ref="investigator"
                            class="filter-item"
                            @keyup.enter.native="focusInvestigator()"></el-input>
                </el-form-item>
                <el-form-item label="质控者签名" :label-width="formLabelWidth" prop="reviewer" class="formItemWidth">
                  <el-input v-model="insertForm.reviewer" auto-complete="off" size="small" ref="reviewer"
                            class="filter-item"
                            @keyup.enter.native="focusReviewer()"></el-input>
                </el-form-item>

                <el-form-item label="受试者ID" :label-width="formLabelWidth" prop="reviewer" class="formItemWidth">
                  <el-input v-model="insertForm.reviewer" auto-complete="off" size="small" ref="reviewer"
                            class="filter-item"
                            @keyup.enter.native="focusReviewer()"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="subject-form-first">
          <div class="subject-form-title">
            A部分：结直肠癌外的其余诊断信息
          </div>
          <el-row>
            <div class="form-first-left">
              <div style="display: block;">
                <el-col :span="20">
                  <div style="height: 40px;line-height: 40px" class="form-item-title">1a. 是否有非肿瘤诊断：</div>
                  <div style="padding-left:40px">
                    <el-form-item label="" label-width="" prop="name" class="formItemWidth"
                                  style="margin-left: 23px;float: left;">
                      <span> 1=是，诊断日期：</span>
                      <span class="cmbi4">
                          <el-input v-model="insertForm.date" auto-complete="off" size="small" ref="name" :maxlength='4'
                                    class="form-item"
                                    @keyup.enter.native="focusName()"></el-input> -
                        </span>
                      <span class="cmbi2">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='2' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                         </span>
                      -
                      <span class="cmbi2">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='2' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                         </span>
                      ，
                    </el-form-item>
                    <el-form-item label="" label-width="" prop="name" style="margin-left: 23px;float: left;">
                      <span>ICD-10 分类：</span>
                      <span class="cmbi3">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='3' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                         </span>.
                      <span class="cmbi2">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='2' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                         </span>
                      ，
                    </el-form-item>
                    <el-form-item label="" label-width="" prop="name" style="float: left;margin-left: 65px;">
                      <span>疾病分类员/摘录员 ID：</span>
                      <span class="cmbi4">
                          <el-input v-model="insertForm.date" auto-complete="off" size="small" ref="name" :maxlength='4'
                                    class="form-item"
                                    @keyup.enter.native="focusName()"></el-input> -
                         </span>
                      <span class="cmbi2">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='2' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                         </span>
                      -
                      <span class="cmbi2">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='2' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                         </span>
                    </el-form-item>
                    <br>
                  </div>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="" label-width="" prop="name" class="formItemWidth"
                                style="float: right;margin-right: 130px;">
                        <span class="cmbi1">
                          <el-input v-model="insertForm.name" auto-complete="off" size="small" ref="name" :maxlength='1'
                                    class="form-item"
                                    @keyup.enter.native="focusName()"></el-input>
                        </span>
                  </el-form-item>
                </el-col>
              </div>
            </div>
            <div class="form-first-left">
              <div style="display: block;">
                <el-col :span="20">
                  <div style="padding-left:60px">
                    <el-form-item label="" label-width="">
                      <span> 2=否</span>
                    </el-form-item>
                  </div>
                </el-col>
              </div>
            </div>
          </el-row>
          <el-row>
            <div class="form-first-left">
              <div style="display: block;">
                <el-col :span="20">
                  <div style="height: 40px;line-height: 40px" class="form-item-title">1b. 是否有其他部位肿瘤（非原发性侵润性大肠癌）:</div>
                  <div style="padding-left:40px">
                    <el-form-item label="" label-width="" prop="name" class="formItemWidth"
                                  style="margin-left: 23px;float: left;">
                      <span> 1=是，诊断日期：</span>
                      <span class="cmbi4">
                          <el-input v-model="insertForm.date" auto-complete="off" size="small" ref="name" :maxlength='4'
                                    class="form-item"
                                    @keyup.enter.native="focusName()"></el-input> -
                        </span>
                      <span class="cmbi2">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='2' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                         </span>
                      -
                      <span class="cmbi2">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='2' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                         </span>
                      ，
                    </el-form-item>
                    <el-form-item label="" label-width="" prop="name" style="margin-left: 23px;float: left;">
                      <span>ICD-O-3 分类：</span>
                      <span class="cmbi4">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='4' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>-
                      </span>
                      <span class="cmbi4">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='4' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>-
                      </span>
                      <span class="cmbi2">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='2' class="form-item"
                             ></el-input>-
                      </span>
                      <span class="cmbi2">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='2' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                      </span>
                      ，
                    </el-form-item>
                    <el-form-item label="" label-width="" prop="name" style="float: left;margin-left: 65px;">
                      <span>肿瘤登记员（CTR） ID：</span>
                      <span class="cmbi4">
                          <el-input v-model="insertForm.date" auto-complete="off" size="small" ref="name" :maxlength='4'
                                    class="form-item"
                                    @keyup.enter.native="focusName()"></el-input> -
                         </span>
                      <span class="cmbi2">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='2' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                         </span>
                      -
                      <span class="cmbi2">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='2' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                         </span>
                    </el-form-item>
                    <br>
                  </div>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="" label-width="" prop="name" class="formItemWidth"
                                style="float: right;margin-right: 130px;">
                  <span class="cmbi1">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='1' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                         </span>
                  </el-form-item>
                </el-col>
              </div>
            </div>
            <div class="form-first-left">
              <div style="display: block;">
                <el-col :span="20">
                  <div style="padding-left:60px">
                    <el-form-item label="" label-width="">
                      <span> 2=否</span>
                    </el-form-item>
                  </div>
                </el-col>
              </div>
            </div>
          </el-row>
          <el-row>
            <div class="form-first-left">
              <div style="display: block;">
                <el-col :span="20">
                  <div style="height: 40px;line-height: 40px" class="form-item-title">1c.  肿瘤是否转移到大肠？ <span
                    style="margin-left: 20px;">1. 是 2. 否</span></div>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="" label-width="" prop="name" class="formItemWidth"
                                style="float: right;margin-right: 130px;">
                  <span class="cmbi1">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='1' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                         </span>
                  </el-form-item>
                </el-col>
              </div>
            </div>
          </el-row>

        </div>
        <div class="subject-form-first">
          <div class="subject-form-title">
            B 部分：原发性结直肠癌诊断信息
          </div>
          <el-row>
            <div class="form-first-left">
              <div style="display: block;">
                <el-col :span="24">
                  <el-form-item label="" label-width="" prop="name" class="formItemWidth">
                    <span class="form-item-title"> 2. 原发性结直肠癌诊断日期：</span>
                    <span class="cmbi4">
                          <el-input v-model="insertForm.date" auto-complete="off" size="small" ref="name" :maxlength='4'
                                    class="form-item"
                                    @keyup.enter.native="focusName()"></el-input> -
                        </span>
                    <span class="cmbi2">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='2' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                         </span>
                    -
                    <span class="cmbi2">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='2' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                         </span>
                    ，
                  </el-form-item>
                </el-col>
              </div>
            </div>
          </el-row>
          <el-row>
            <div class="form-first-left">
              <div style="display: block;">
                <el-col :span="20">
                  <div style="height: 40px;line-height: 40px" class="form-item-title">3.  确诊原发性结直肠癌诊断报告的复印件（单选）  :</div>
                  <div style="padding-left:40px">
                    <ul class="form-item-radio">
                      <li>1=组织学/组织病理学；</li>
                      <li>2=细胞学/细胞病理学；</li>
                      <li>3=有报告但无法获得；</li>
                      <li>4=无报告/临床检查</li>
                    </ul>
                  </div>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="" label-width="" prop="name" class="formItemWidth"
                                style="float: right;margin-right: 130px;">
                  <span class="cmbi1">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='1' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                         </span>
                  </el-form-item>
                </el-col>
              </div>
            </div>
          </el-row>
          <el-row>
            <div class="form-first-left">
              <div style="display: block;">
                <el-col :span="24">
                  <el-form-item label="" label-width="" prop="name" class="formItemWidth">
                    <span class="form-item-title"> 若有报告无法获得或者无报告/临床检查，请详细描述病历中原发性结直肠癌的诊断：</span>
                    <el-input
                      type="textarea"
                      :rows="4"
                      placeholder="请输入内容"
                      style="width: 90%;"
                      v-model="insertForm.textarea">
                    </el-input>
                  </el-form-item>
                </el-col>
              </div>
            </div>
          </el-row>
          <el-row>
            <div class="form-first-left">
              <div style="display: block;">
                <el-col :span="24">
                  <div style="height: 40px;line-height: 40px" class="form-item-title">
                    4. ICD-O-3 肿瘤分类：（由 CTR 或有 CTR 资质的人员填写）  :
                  </div>
                  <div style="padding-left:40px">
                    <el-form-item label="" label-width="" prop="name" style=";float: left;">
                      <span class="cmbi4">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='4' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>-
                      </span>
                      <span class="cmbi4">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='4' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>-
                      </span>
                      <span class="cmbi2">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='2' class="form-item"
                             ></el-input>-
                      </span>
                      <span class="cmbi2">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='2' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                      </span>
                      ，
                    </el-form-item>
                    <el-form-item label="" label-width="" prop="name" style="float: left;margin-left: 65px;">
                      <span>CTR ID：</span>
                      <span class="cmbi4">
                          <el-input v-model="insertForm.date" auto-complete="off" size="small" ref="name" :maxlength='4'
                                    class="form-item"
                                    @keyup.enter.native="focusName()"></el-input>
                         </span>
                    </el-form-item>
                  </div>
                </el-col>
              </div>
            </div>
          </el-row>
          <el-row>
            <div class="form-first-left">
              <div style="display: block;">
                <el-col :span="24">
                  <div style="height: 40px;line-height: 40px" class="form-item-title">5.  原发肿瘤位置:</div>
                  <div style="padding-left: 40px;">
                    <el-form-item label="" label-width="" prop="name" style="float: left">
                      <el-checkbox-group v-model="insertForm.checkList">
                        <el-checkbox :label="1">回肠
                          <div class="form-inline zdysinput">
                            <el-form-item label="" prop="item2_1_3_other">
                              ，距肛缘
                              <el-input v-model.trim="insertForm.item2_1_3_other" ref="item2_1_3_other" placeholder=""
                                        :disabled="insertForm.checkList == 5" size="small"
                                        style="width: 40px;"></el-input>
                              cm
                            </el-form-item>
                          </div>
                        </el-checkbox>
                        <br>
                        <el-checkbox :label="2">升结肠
                          <div class="form-inline zdysinput">
                            <el-form-item label="" prop="item2_1_3_other">
                              ，距肛缘
                              <el-input v-model.trim="insertForm.item2_1_3_other" ref="item2_1_3_other" placeholder=""
                                        :disabled="insertForm.checkList == 5" size="small"
                                        style="width: 40px;"></el-input>
                              cm
                            </el-form-item>
                          </div>
                        </el-checkbox>
                        <br>
                        <el-checkbox :label="3">结肠肝曲
                          <div class="form-inline zdysinput">
                            <el-form-item label="" prop="item2_1_3_other">
                              ，距肛缘
                              <el-input v-model.trim="insertForm.item2_1_3_other" ref="item2_1_3_other" placeholder=""
                                        :disabled="insertForm.checkList == 5" size="small"
                                        style="width: 40px;"></el-input>
                              cm
                            </el-form-item>
                          </div>
                        </el-checkbox>
                        <br>
                        <el-checkbox :label="4">横结肠
                          <div class="form-inline zdysinput">
                            <el-form-item label="" prop="item2_1_3_other">
                              ，距肛缘
                              <el-input v-model.trim="insertForm.item2_1_3_other" ref="item2_1_3_other" placeholder=""
                                        :disabled="insertForm.checkList == 5" size="small"
                                        style="width: 40px;"></el-input>
                              cm
                            </el-form-item>
                          </div>
                        </el-checkbox>
                        <br>
                        <el-checkbox :label="5">结肠脾曲
                          <div class="form-inline zdysinput">
                            <el-form-item label="" prop="item2_1_3_other">
                              ，距肛缘
                              <el-input v-model.trim="insertForm.item2_1_3_other" ref="item2_1_3_other" placeholder=""
                                        :disabled="insertForm.checkList == 5" size="small"
                                        style="width: 40px;"></el-input>
                              cm
                            </el-form-item>
                          </div>
                        </el-checkbox>
                        <br>
                        <el-checkbox :label="6">降结肠
                          <div class="form-inline zdysinput">
                            <el-form-item label="" prop="item2_1_3_other">
                              ，距肛缘
                              <el-input v-model.trim="insertForm.item2_1_3_other" ref="item2_1_3_other" placeholder=""
                                        :disabled="insertForm.checkList == 5" size="small"
                                        style="width: 40px;"></el-input>
                              cm
                            </el-form-item>
                          </div>
                        </el-checkbox>
                        <br>
                        <el-checkbox :label="7">乙状结肠
                          <div class="form-inline zdysinput">
                            <el-form-item label="" prop="item2_1_3_other">
                              ，距肛缘
                              <el-input v-model.trim="insertForm.item2_1_3_other" ref="item2_1_3_other" placeholder=""
                                        :disabled="insertForm.checkList == 5" size="small"
                                        style="width: 40px;"></el-input>
                              cm
                            </el-form-item>
                          </div>
                        </el-checkbox>
                        <br>
                        <el-checkbox :label="8">直肠
                          <div class="form-inline zdysinput">
                            <el-form-item label="" prop="item2_1_3_other">
                              ，距肛缘
                              <el-input v-model.trim="insertForm.item2_1_3_other" ref="item2_1_3_other" placeholder=""
                                        :disabled="insertForm.checkList == 5" size="small"
                                        style="width: 40px;"></el-input>
                              cm
                            </el-form-item>
                          </div>
                        </el-checkbox>
                        <br>
                        <el-checkbox :label="9">阑尾
                          <div class="form-inline zdysinput">
                            <el-form-item label="" prop="item2_1_3_other">
                              ，距肛缘
                              <el-input v-model.trim="insertForm.item2_1_3_other" ref="item2_1_3_other" placeholder=""
                                        :disabled="insertForm.checkList == 5" size="small"
                                        style="width: 40px;"></el-input>
                              cm
                            </el-form-item>
                          </div>
                        </el-checkbox>
                        <br>
                        <el-checkbox :label="99">不详</el-checkbox>

                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </div>
            </div>
          </el-row>
          <el-row>
            <div class="form-first-left">
              <div style="display: block;">
                <el-col :span="20">
                  <div style="height: 40px;line-height: 40px" class="form-item-title">
                    6.  原发性结直肠癌的病理类型：（由 CTR 资质或相当人员填写）:
                  </div>
                  <div style="padding-left:40px">
                    <ul class="form-item-radio">
                      <li><span>1=腺癌</span><span class="form-item-radio-odd">2=粘液腺癌</span><span
                        class="form-item-radio-odd">3=印戒细胞癌</span></li>
                      <li><span>4=鳞状细胞癌</span><span class="form-item-radio-odd">5=腺鳞癌</span><span
                        class="form-item-radio-odd">6=未分化癌</span></li>
                      <li><span>7=类癌（神经内分泌肿瘤）</span><span class="form-item-radio-odd">8=其它
                        <div class="form-inline zdysinput">
                            <el-form-item label="" prop="item2_1_3_other">
                             <el-input v-model.trim="insertForm.item2_1_3_other" ref="item2_1_3_other" placeholder=""
                                       :disabled="insertForm.checkList == 5" size="small"
                                       style="width: 100px;"></el-input>
                            </el-form-item>
                        </div></span>
                        <span class="form-item-radio-odd">9=不详</span></li>

                    </ul>
                  </div>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="" label-width="" prop="name" class="formItemWidth"
                                style="float: right;margin-right: 130px;">
                  <span class="cmbi1">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='1' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                         </span>
                  </el-form-item>
                </el-col>
              </div>
            </div>
          </el-row>
          <el-row>
            <div class="form-first-left">
              <div style="display: block;">
                <el-col :span="20">
                  <div style="height: 40px;line-height: 40px" class="form-item-title">
                    7.  原发性结直肠癌的分化程度：（由 CTR 资质或相当人员填写）:
                  </div>
                  <div style="padding-left:40px">
                    <ul class="form-item-radio">
                      <li><span>1=无法评估（GX）</span><span class="form-item-radio-odd">2=高分化（G1）</span><span
                        class="form-item-radio-odd">3=中分化（G2）</span></li>
                      <li><span>4=低分化（G3）</span><span class="form-item-radio-odd">5=未分化（G4）</span><span
                        class="form-item-radio-odd">6=病理报告中未描述</span></li>
                      <li><span>9=不详---病理报告丢失</span></li>

                    </ul>
                  </div>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="" label-width="" prop="name" class="formItemWidth"
                                style="float: right;margin-right: 130px;">
                  <span class="cmbi1">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='1' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                         </span>
                  </el-form-item>
                </el-col>
              </div>
            </div>
          </el-row>
          <el-row>
            <div class="form-first-left">
              <div style="display: block;">
                <el-col :span="20">
                  <div style="height: 40px;line-height: 40px" class="form-item-title">
                    8.  原发性结直肠癌的 TNM 分期：（由 CTR 资质或相当人员填写）:
                  </div>
                  <table class="form-first-table">
                    <tr>
                      <td colspan="3" style="width: 50%;">
                        <div class="form-first-left">
                          <div style="display: block;">
                            <el-col :span="20">
                              <div class="form-item-title">
                                8a. TNM 临床分期:
                              </div>
                              <div style="padding-left:40px">
                                <ul class="form-table-ul">
                                  <li>1=是</li>
                                  <li>2=否</li>
                                </ul>
                              </div>
                            </el-col>
                            <el-col :span="4">
                              <el-form-item label="" label-width="" prop="name" class="formItemWidth"
                                            style="float: right;margin-right: 20px;">
                               <span class="cmbi1">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='1' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                               </span>
                              </el-form-item>
                            </el-col>
                          </div>

                        </div>
                      </td>
                      <td colspan="3">
                        <div class="form-first-left">
                          <div style="display: block;">
                            <el-col :span="20">
                              <div style="height: 40px;line-height: 40px" class="form-item-title">
                                8b. TNM 病理分期:
                              </div>
                              <div style="padding-left:40px">
                                <ul class="form-table-ul">
                                  <li>1=是</li>
                                  <li>2=否</li>
                                </ul>
                              </div>
                            </el-col>
                            <el-col :span="4">
                              <el-form-item label="" label-width="" prop="name" class="formItemWidth"
                                            style="float: right;margin-right: 20px;">
                                 <span class="cmbi1">
                                <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                          :maxlength='1' class="form-item"
                                          @keyup.enter.native="focusName()"></el-input>
                                 </span>
                              </el-form-item>
                            </el-col>
                          </div>
                          <div style="display: block;">
                            <el-col :span="22">
                              <div class="form-item-title">
                                明确分期信息前（通常为手术前）是否进行了新辅助治疗？
                              </div>
                              <div style="padding-left:40px;">
                                <ul class="form-table-ul">
                                  <li>1=是</li>
                                  <li>2=否</li>
                                </ul>
                              </div>
                            </el-col>
                            <el-col :span="2">
                              <el-form-item label="" label-width="" prop="name" class="formItemWidth"
                                            style="float: right;margin-right: 20px;">
                               <span class="cmbi1">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='1' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                               </span>
                              </el-form-item>
                            </el-col>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <el-col :span="22">
                          <div class="form-item-title">
                            原发肿瘤大小（T）
                          </div>
                          <div style="padding-left:40px">
                            <ul class="form-table-ul ul-height">
                              <li>1=Tx</li>
                              <li>2=T0</li>
                              <li>3=T1</li>
                              <li>4=T2</li>
                              <li>5=T3</li>
                              <li>6=T4</li>
                              <li>9=不详</li>
                            </ul>
                          </div>
                        </el-col>
                        <el-col :span="2">
                          <el-form-item label="" label-width="" prop="name" class="formItemWidth"
                                        style="float: right;margin-right: 20px;">
                               <span class="cmbi1">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='1' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                               </span>
                          </el-form-item>
                        </el-col>
                      </td>
                      <td>
                        <el-col :span="22">
                          <div class="form-item-title">
                            淋巴结转移（N）
                          </div>
                          <div style="padding-left:40px">
                            <ul class="form-table-ul ul-height">
                              <li>1=Nx</li>
                              <li>2=N0</li>
                              <li>3=N1</li>
                              <li>4=N2</li>
                              <li>5=N3</li>
                              <li>9=不详</li>
                            </ul>
                          </div>
                        </el-col>
                        <el-col :span="2">
                          <el-form-item label="" label-width="" prop="name" class="formItemWidth"
                                        style="float: right;margin-right: 20px;">
                               <span class="cmbi1">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='1' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                               </span>
                          </el-form-item>
                        </el-col>
                      </td>
                      <td style="padding-top: 0!important;">
                        <el-col :span="22">
                          <div class="form-item-title">
                            远处转移（M）
                          </div>
                          <div style="padding-left:40px">
                            <ul class="form-table-ul ul-height">
                              <li>1=Mx</li>
                              <li>2=M0</li>
                              <li>3=M1</li>
                              <li>9=不详</li>
                            </ul>
                          </div>
                        </el-col>
                        <el-col :span="2">
                          <el-form-item label="" label-width="" prop="name" class="formItemWidth"
                                        style="float: right;margin-right: 20px;">
                               <span class="cmbi1">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='1' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                               </span>
                          </el-form-item>
                        </el-col>
                      </td>
                      <td>
                        <el-col :span="22">
                          <div class="form-item-title">
                            原发肿瘤大小（T）
                          </div>
                          <div style="padding-left:40px">
                            <ul class="form-table-ul ul-height">
                              <li>1=Tx</li>
                              <li>2=T0</li>
                              <li>3=T1</li>
                              <li>4=T2</li>
                              <li>5=T3</li>
                              <li>6=T4</li>
                              <li>9=不详</li>
                            </ul>
                          </div>
                        </el-col>
                        <el-col :span="2">
                          <el-form-item label="" label-width="" prop="name" class="formItemWidth"
                                        style="float: right;margin-right: 20px;">
                               <span class="cmbi1">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='1' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                               </span>
                          </el-form-item>
                        </el-col>
                      </td>
                      <td>
                        <el-col :span="22">
                          <div class="form-item-title">
                            淋巴结转移（N）
                          </div>
                          <div style="padding-left:40px">
                            <ul class="form-table-ul ul-height">
                              <li>1=Nx</li>
                              <li>2=N0</li>
                              <li>3=N1</li>
                              <li>4=N2</li>
                              <li>5=N3</li>
                              <li>9=不详</li>
                            </ul>
                          </div>
                        </el-col>
                        <el-col :span="2">
                          <el-form-item label="" label-width="" prop="name" class="formItemWidth"
                                        style="float: right;margin-right: 20px;">
                               <span class="cmbi1">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='1' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                               </span>
                          </el-form-item>
                        </el-col>
                      </td>
                      <td style="padding-top: 0!important;">
                        <el-col :span="22">
                          <div class="form-item-title">
                            远处转移（M）
                          </div>
                          <div style="padding-left:40px">
                            <ul class="form-table-ul ul-height">
                              <li>1=Mx</li>
                              <li>2=M0</li>
                              <li>3=M1</li>
                              <li>9=不详</li>
                            </ul>
                          </div>
                        </el-col>
                        <el-col :span="2">
                          <el-form-item label="" label-width="" prop="name" class="formItemWidth"
                                        style="float: right;margin-right: 20px;">
                               <span class="cmbi1">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='1' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                               </span>
                          </el-form-item>
                        </el-col>
                      </td>
                    </tr>
                  </table>
                </el-col>
              </div>
            </div>
          </el-row>
          <el-row>
            <div class="form-first-left">
              <div style="display: block;">
                <el-col :span="20">
                  <div style="height: 40px;line-height: 40px" class="form-item-title">
                    9. 记录分期：仅在 TNM 分期中有不详项目时才完成此表（由 CTR 资质或相当人员填写）
                  </div>
                  <table class="form-first-table">
                    <tr>
                      <td>
                        <el-col :span="22">
                          <div class="form-item-title">
                            分期
                          </div>
                          <div style="padding-left:40px">
                            <ul class="form-table-ul ul-height1">
                              <li>1=隐匿癌</li>
                              <li>2=IA</li>
                              <li>3=IB</li>
                              <li>4=IIA </li>
                              <li>5=IIB</li>
                              <li>6=IIIA</li>
                              <li>7=IIIB</li>
                              <li>8=IV</li>
                              <li>9=无法提供</li>
                            </ul>
                          </div>
                        </el-col>
                        <el-col :span="2">
                          <el-form-item label="" label-width="" prop="name" class="formItemWidth"
                                        style="float: right;margin-right: 20px;">
                               <span class="cmbi1">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='1' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                               </span>
                          </el-form-item>
                        </el-col>
                      </td>
                      <td>
                        <el-col :span="22">
                          <div class="form-item-title">
                            DUKES
                          </div>
                          <div style="padding-left:40px">
                            <ul class="form-table-ul ul-height1">
                              <li>1=A</li>
                              <li>2=B</li>
                              <li>3=C</li>
                              <li>9=无法提供</li>
                            </ul>
                          </div>
                        </el-col>
                        <el-col :span="2">
                          <el-form-item label="" label-width="" prop="name" class="formItemWidth"
                                        style="float: right;margin-right: 20px;">
                               <span class="cmbi1">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='1' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                               </span>
                          </el-form-item>
                        </el-col>
                      </td>
                      <td style="padding-top: 0!important;">
                        <el-col :span="22">
                          <div class="form-item-title">
                            简要分期
                          </div>
                          <div style="padding-left:40px">
                            <ul class="form-table-ul ul-height1">
                              <li>1=局部/未扩散</li>
                              <li>2=局部浸润</li>
                              <li>3=远处转移</li>
                              <li>9=无法提供</li>
                            </ul>
                          </div>
                        </el-col>
                        <el-col :span="2">
                          <el-form-item label="" label-width="" prop="name" class="formItemWidth"
                                        style="float: right;margin-right: 20px;">
                               <span class="cmbi1">
                             <el-input v-model="insertForm.date1" auto-complete="off" size="small" ref="name"
                                       :maxlength='1' class="form-item"
                                       @keyup.enter.native="focusName()"></el-input>
                               </span>
                          </el-form-item>
                        </el-col>
                      </td>
                    </tr>
                  </table>
                </el-col>
              </div>
            </div>
          </el-row>
        </div>
        <div class="subject-form-first">
          <div class="subject-form-title">
            C部分：备注
          </div>
          <el-row>
            <el-col :span="24" style="border-right: 1px solid #CCCCCC;border-radius: 0">
              <div class="form-first-left">
                <div class="grid-content bg-purple">
                  <div style="display: block;">
                    <el-col :span="24">
                      <el-form-item label="" label-width="" prop="name" class="formItemWidth">
                        <el-input
                          type="textarea"
                          :rows="2"
                          placeholder="请输入内容"
                          v-model="insertForm.textarea">
                        </el-input>
                      </el-form-item>
                    </el-col>
      </div>
  </div>
  </div>
  </el-col>
  </el-row>
  </div>
      </div>
      <el-form-item>
        <div class="submit-btn">
          <el-button type="primary" @click="add('insertForm')" v-if="btnAuth.buttonSubjectSave">提交</el-button>
            <el-button @click="goBack()">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import CityInfo from'../../utils/citys.js'
  export default {
    ...CityInfo,
    name: 'Right',
    data() {
      return {
        colonDiagInfo_page: false,
        btnAuth: {
          buttonSubjectSave: false,
        },
        //添加表单数据对象
        'insertForm': {
          "date": '',
          "name": '',
          "idCard": '',
          "birthDate": '',
          "address1": [],
          "address2": '',
          "address": '',
          "phone": '',
          "siteId": '',
          "surveyDate": '',
          "investigator": '',
          "reviewer": '',
          "item1": '',
          "item2": '',
          "item3": '',
          "item4": '',
          "item5": '',
          "item6": '',
          "item7": '',
          "item8": '',
          "item9": '',
          "item10": '',
        },
        formLabelWidth: '120px',
        rules: {
          name: [
            {required: true, message: '必填', trigger: 'blur'},
            {min: 2, max: 30, message: '长度在2到30个字符', trigger: 'blur'}
          ],
          reviewer: [
            {required: true, message: '必填', trigger: 'blur'},
            {min: 2, max: 30, message: '长度在2到30个字符', trigger: 'blur'}
          ],
          investigator: [
            {required: true, message: '必填', trigger: 'blur'},
            {min: 2, max: 30, message: '长度在2到30个字符', trigger: 'blur'}
          ],
          idCard: [
            {required: true, message: '必填', trigger: 'change'},
          ],
          sex: [
            {required: false, message: '必填', trigger: 'change'}
          ],
          birthDate: [
            {required: false, message: '必填',},
            {min: 8, max: 10, message: '格式不正确', trigger: 'blur'}
          ],
          siteId: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          address1: [
            {required: true, message: '必填', trigger: 'change'},
//            {min: 4, max: 30, message: '长度在4到30个字符', trigger: 'blur'}
          ],
          address2: [
            {required: true, message: '必填', trigger: 'blur'},
//            {min: 4, max: 30, message: '长度在4到30个字符', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '必填', trigger: 'blur'},

          ],
          surveyDate: [
            {required: true, message: '必填', trigger: 'blur'},
            {min: 8, max: 10, message: '格式不正确', trigger: 'blur'}
          ],
//          item1: [
//            {required: true, message: '必填', trigger: 'blur'}
//          ],
          item2: [
            {required: true, message: '必填',},

          ],
          item3: [
            {required: true, message: '必填',},


          ],
          item4: [
            {required: true, message: '必填',},

          ],
          item5: [
            {required: true, message: '必填',},

          ],
          item6: [
            {required: true, message: '必填',},

          ],
          item7: [
            {required: true, message: '必填',},

          ],
          item8: [
            {required: true, message: '必填',},

          ],
          item9: [
            {required: true, message: '必填',},

          ],
          item10: [
            {required: true, message: '必填',},
          ],
        }
      }
    },

    mounted() {
      let obj = this.checkPageAuth(this, "colonDiagInfo_page", this.btnAuth);
    },
    watch: {
//
    },
    methods: {
      //获取筛查现场id
      getSiteId(){
        $axios_http({
          url: "/base/hospital/screeningtype/get/",
          data: {},
          vueObj: this
        }).then((res) => {
          this.insertForm.siteId = res.data.data
        })
      },
    }
  }
</script>
<style scoped>
  。filter-item {
    width: 200px;
  }

  .option {
    margin: 0 40px;
  }

  .submit-btn {
    text-align: center;
    margin: 20px;
  }

  h3 {
    padding: 50px 0 20px 0;
  }

  .form-title {
    text-align: center;
  }

  .form-first-left {
    padding-left: 50px;
    padding-top: 20px;
    height: 100%;
  }

  .form-first-right {
    padding-left: 50px;
    padding-top: 20px;

  }

  .subject-form-first {
    border: 1px solid #CCCCCC;
    margin: 0 20px;
  }

  .subject-form-title {
    height: 40px;
    background: #ccc;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
  }

  .subject-form-title2 {
    height: 40px;
    background: #ccc;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
    margin: 40px 20px;
  }

  .submitDialog-item-title {
    width: 120px;
    display: inline-block;
    text-align: right;
    margin-right: 20px;
    height: 30px;
    line-height: 30px;
  }

  .submitDialog-item-check {
    margin-left: 10px;
  }

  .submitDialog-title h3 {
    text-align: center;
    height: 40px;
  }

  .form-item {
    width: 40px;
  }

  .form-item1 {
    width: 100px;
  }

  .form-item-title {
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 5px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-weight: 700;
    height: 40px;

  }

  .form-item-radio {
    list-style-type: none
  }

  .form-item-radio li {
    margin-top: 20px;
  }

  .form-title-count {
    padding-left: 40px;
    height: 50px;
    line-height: 50px;
  }

  .form-inline {
    display: inline-block;
  }

  .form-item-radio-odd {
    margin-left: 50px;
  }

  .form-item-radio span {
    display: inline-block;
    width: 200px;
  }

  .form-first-table {
    width: 100%;
    margin-bottom: 10px;
  }

  .form-first-table td {
    border: 1px solid #ccc;
    padding-bottom: 10px;
    /*width: 50%;*/
  }

  .form-table-ul {
    list-style-type: none;
  }

  .ul-height {
    height: 140px;
  }

  .ul-height1 {
    height: 180px;
  }
</style>
<style>
  #test .el-form-item {
    margin-bottom: 0px;
    display: inline-block;
  }

  .option .el-form-item__error {
    top: 85%;
  }

  .answerBox .el-input__inner {
    padding: 0;
    font-weight: 800;
    text-align: center;
  }

  .el-form-item__error {
    padding: 0;
  }

  .return {
    margin-top: 20px;
    display: block;
    text-align: center;
    float: left;
    margin-left: 20px;
  }

  .form-wrapper {
    background: #ffffff;
  }

  .form-wrapper .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    border-color: #dcdfe6;
    color: #606266;
    cursor: not-allowed;
  }

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

  .cmbi4 .el-input {
    width: 84px;
  }

  .cmbi4 .el-input input {
    border: 0px !important;
    padding: 0 !important;
    background: url('../../assets/formimg/input_bg_4.png') no-repeat center;
    background-size: contain;
    letter-spacing: 12px !important;
    padding-left: 10px !important;
  }

  .cmbi2 .el-input {
    width: 42px;
  }

  .cmbi2 .el-input input {
    border: 0px !important;
    padding: 0 !important;
    background: url('../../assets/formimg/input_bg_2.png') no-repeat center;
    background-size: contain;
    letter-spacing: 12px !important;
    padding-left: 7px !important;
  }

  .cmbi3 .el-input {
    width: 63px;
  }

  .cmbi3 .el-input input {
    border: 0px !important;
    padding: 0 !important;
    background: url('../../assets/formimg/input_bg_3.png') no-repeat center;
    background-size: contain;
    letter-spacing: 12px !important;
    padding-left: 7px !important;
  }

  .zdysinput input {
    border-width: 0 0 1px 0;
    border-color: #000;
    border-radius: 0;
    padding-left: 5px;
  }

  .zdysinput .el-form-item__content {
    /*line-height:22px;*/
    padding-left: 5px !important;
    position: relative;
    height: 20px;

    font-size: 14px;
  }

  .zdysinput .el-input--small .el-input__inner {
    height: 20px !important;
  }

  .el-checkbox + .el-checkbox {
    margin-left: 0px !important;
    margin-right: 20px;
  }

  .el-checkbox {
    margin-right: 20px;
  }
</style>
