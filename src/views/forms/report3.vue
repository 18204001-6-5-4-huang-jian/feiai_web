<template>
  <div class="j_content" v-if="report3_page">
    <div style="min-width: 941px;">
      <div class="btns">
        <el-button type="normal" size="small" class="fl" @click="goBack()">返回</el-button>
        <el-button size="small" class="print" @click="printContent('#print')" v-if="show">打印</el-button>
        <!--<el-button type="normal" size="small" class="fr" @click="submitForm()"  v-if="!show">保存</el-button>-->
      </div>

      <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="170px" :rules="rules" ref="formInline" :disabled="show" style="max-width: 1200px;margin: 20px auto;">
        <div id="print">
        <p class="text">结直肠癌筛查结果告知书</p>
        <div style="margin:auto;width:941px">
          <p class="texts" style="margin-bottom: 12px;">
            尊敬的<span class="underline">{{formInline.name}}</span>
          </p>
          <p class="texts">
            您好！前不久您参加了由中国结直肠癌筛查和干预新技术新方案研究组织的结直肠筛查，以下为您的检查结果以及进一步处理建议。
          </p>
        <table class="j_table cmc">
          <tr class="title">
            <td width="210">检查类型</td>
            <td width="520">检查结果</td>
            <td >进一步处理建议</td>
          </tr>
          <tr>
            <td>
                <el-form-item  prop="itemAType">
                  <el-checkbox-group v-model="formInline.itemAType" style="height: 30px;">
                    <el-checkbox name="itemAType">1.结肠镜镜下检查结果</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
            </td>
            <td>
              <div class="dbib">
                <el-form-item  prop="itemAR1" class=" mb0">
                  <el-checkbox-group v-model="formInline.itemAR1" style="height: auto;">
                    <el-checkbox name="itemAR1" label="1" class="specialCheck">1=正常</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemAR2" class=" mb0">
                  <el-checkbox-group v-model="formInline.itemAR2" style="height: auto;">
                    <el-checkbox name="itemAR2" label="2" class="specialCheck">2=息肉</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemAR3" class=" mb0">
                  <el-checkbox-group v-model="formInline.itemAR3" style="height: auto;">
                    <el-checkbox name="itemAR3" label="3" class="specialCheck">3=直肠癌</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemAR4" class=" mb0">
                  <el-checkbox-group v-model="formInline.itemAR4" style="height: auto;">
                    <el-checkbox name="itemAR4" label="4" class="specialCheck">4=疑似直肠癌</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemAR5" class=" mb0">
                  <el-checkbox-group v-model="formInline.itemAR5" style="height: auto;">
                    <el-checkbox name="itemAR5" label="5" class="specialCheck">5=结肠癌</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemAR6" class=" mb0">
                  <el-checkbox-group v-model="formInline.itemAR6" style="height: auto;">
                    <el-checkbox name="itemAR6" label="6" class="specialCheck">6=疑似结肠癌</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemAR7" class=" mb0">
                  <el-checkbox-group v-model="formInline.itemAR7" style="height: auto;">
                    <el-checkbox name="itemAR7" label="7" class="specialCheck">7=克隆恩病</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemAR8" class=" mb0">
                  <el-checkbox-group v-model="formInline.itemAR8" style="height: auto;">
                    <el-checkbox name="itemAR8" label="8" class="specialCheck">8=溃疡性结肠炎</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>

              </div>
              <div class="dbib">
                <el-form-item  prop="itemAR9" class=" mb0">
                  <el-checkbox-group v-model="formInline.itemAR9" style="height: auto;">
                  <el-checkbox name="itemAR9" label="9" class="specialCheck">9=非典型结肠炎</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemAR10" class=" mb0">
                <el-checkbox-group v-model="formInline.itemAR10" style="height: auto;">
                <el-checkbox name="itemAR10" label="10" class="specialCheck">10=血管畸形</el-checkbox>
                </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemAR11" class=" mb0">
                <el-checkbox-group v-model="formInline.itemAR11" style="height: auto;">
                <el-checkbox name="itemAR11" label="11" class="specialCheck">11=憩室</el-checkbox>
                </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemAR12" class=" mb0">
                <el-checkbox-group v-model="formInline.itemAR12" style="height: auto;">
                <el-checkbox name="itemAR12" label="12" class="specialCheck">12=肛裂</el-checkbox>
                </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemAR13" class=" mb0">
                <el-checkbox-group v-model="formInline.itemAR13" style="height: auto;">
                <el-checkbox name="itemAR13" label="13" class="specialCheck">13=痔疮</el-checkbox>
                </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemAR14" class=" mb0">
                <el-checkbox-group v-model="formInline.itemAR14" style="height: auto;">
                <el-checkbox name="itemAR14" label="14" class="specialCheck">14=直肠脱垂</el-checkbox>
                </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemAR15" class="formhalfline mb0">
                  <el-checkbox-group v-model="formInline.itemAR15" style="height: auto;">
                    <el-checkbox name="itemAR15" label="15" class="specialCheck">15=其它，请说明：</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemAR15Other" class="formhalfline">
                  <el-input type="textarea" :rows="4" v-model="formInline.itemAR15Other" style="width: 150px; margin-left: 20px;" size="mini" v-if="!show"></el-input>
                  <div v-if="show" class="textArea-font">{{formInline.itemAR15Other}}</div>
                </el-form-item>
              </div>

            </td>
            <td>
              <div class="dbib">
                <el-form-item  prop="itemAS1" class="formhalfline mb0">
                  <el-checkbox-group v-model="formInline.itemAS1" style="height: auto;">
                <el-checkbox name="itemAS1" label="1" class="specialCheck">待病理诊断</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemAS2" class="formhalfline mb0">
                  <el-checkbox-group v-model="formInline.itemAS2" style="height: auto;">
                <el-checkbox name="itemAS2" label="2" class="specialCheck">密切观察</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemAS3" class="formhalfline mb0">
                  <el-checkbox-group v-model="formInline.itemAS3" style="height: auto;">
                <el-checkbox name="itemAS3" label="3" class="specialCheck">保守治疗</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemAS4" class="formhalfline mb0">
                  <el-checkbox-group v-model="formInline.itemAS4" style="height: auto;">
                <el-checkbox name="itemAS4" label="4" class="specialCheck">内镜治疗</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemAS5" class="formhalfline mb0">
                  <el-checkbox-group v-model="formInline.itemAS5" style="height: auto;">
                <el-checkbox name="itemAS5" label="5" class="specialCheck">手术治疗</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemAS6" class="formhalfline mb0">
                  <el-checkbox-group v-model="formInline.itemAS6" style="height: auto;">
                    <el-checkbox name="itemAS6" label="6" class="specialCheck">其它，请说明：</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemAS6Other" class="formhalfline">
                  <el-input type="textarea" :rows="4" v-model="formInline.itemAS6Other" style="width: 150px; margin-left: 20px;" size="mini" v-if="!show"></el-input>
                  <div v-if="show" class="textArea-font">{{formInline.itemAS6Other}}</div>
                </el-form-item>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item  prop="itemBType">
                <el-checkbox-group v-model="formInline.itemBType"   style="height: 30px;">
                  <el-checkbox name="itemBType">2. FIT大便潜血试验</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </td>
            <td style="padding-top: 0;padding-bottom: 0;" v-if="!show">
              <div class="dbib cmb">
                <el-form-item prop="item_b_r">
                  <el-radio-group v-model="formInline.item_b_r">
                    <el-radio :label="1" style="display:block;margin:10px 20px;">1=阴性</el-radio>
                    <el-radio :label="2" style="display:block;margin:10px 20px;">2=阳性</el-radio>
                    <el-radio :label="3" style="display:block;margin:10px 20px;">3=无效</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </td>
            <td style="padding-top: 0;padding-bottom: 0;" v-if="show">
              <div class="dbib cmb" style="padding-left: 20px;padding-top: 10px;">
                  <span>
                    <input  type="radio" :checked="formInline.item_b_r == 1" disabled /><span style="color: #c0c4cc!important;font-size: 14px;;margin-left: 10px;position: relative;top: -2px;">1=阴性</span>
                  </span>
                  <br>
                  <span style="margin-top: 8px;display: inline-block;">
                    <input  type="radio" :checked="formInline.item_b_r == 2" disabled style="color: #c0c4cc;"/><span style="color: #c0c4cc!important;font-size: 14px;;margin-left: 10px;position: relative;top: -2px;">2=阳性</span>
                  </span>
                <br>
                <span style="margin-top: 8px;display: inline-block;">
                   <input  type="radio" :checked="formInline.item_b_r == 3" disabled style="color: #c0c4cc;"/><span style="color: #c0c4cc!important;margin-left: 10px;font-size: 14px;position: relative;top: -2px;">3=无效</span>
                </span>
              </div>
            </td>
            <td style="padding-top: 0;padding-bottom: 0;" v-if="!show">
              <div class="dbib cmb">
                <el-form-item prop="item_b_s">
                  <el-radio-group v-model="formInline.item_b_s">
                    <el-radio label="1" style="display:block;margin:10px 20px;">第二年回访</el-radio>
                    <el-radio label="2" style="display:block;margin:10px 20px;">尽快进行全肠镜检查</el-radio>
                    <el-radio label="3" style="display:block;margin:10px 20px;">重新取粪便标本</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </td>
            <td style="padding-top: 0;padding-bottom: 0;" v-if="show">
              <div class="dbib cmb" style="padding-left: 20px;padding-top: 10px;">
                  <span>
                    <input  type="radio" :checked="formInline.item_b_s == 1" disabled style="color: red;"/><span style="color: #c0c4cc!important;font-size: 14px;;margin-left: 10px;position: relative;top: -2px;">第二年回访</span>
                  </span>
                <br>
                <span style="margin-top: 8px;display: inline-block;">
                    <input  type="radio" :checked="formInline.item_b_s == 2" disabled style="color: #000;background: #fff;"/><span style="color: #c0c4cc!important;font-size: 14px;;margin-left: 10px;position: relative;top: -2px;">尽快进行全肠镜检查</span>
                  </span>
                <br>
                <span style="margin-top: 8px;display: inline-block;">
                   <input  type="radio" :checked="formInline.item_b_s == 3" disabled style="color: #000;"/><span style="color: #c0c4cc!important;margin-left: 10px;font-size: 14px;position: relative;top: -2px;">重新取粪便标本</span>
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item  prop="itemCType">
                <el-checkbox-group v-model="formInline.itemCType" style="height: 30px;">
                  <el-checkbox name="itemCType">3. 结肠镜病理检查结果</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </td>
            <td>
              <div class="dbib">
                <p class="texts">病变类型</p>
                <el-form-item  prop="itemCR1" class=" mb0 mr0">
                  <el-checkbox-group v-model="formInline.itemCR1" style="height: auto;">
                    <el-checkbox name="itemCR1" label="1" class="specialCheck">良性肿瘤</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemCR2" class=" mb0 mr0">
                  <el-checkbox-group v-model="formInline.itemCR2" style="height: auto;">
                  <el-checkbox name="itemCR2" label="2" class="specialCheck">管状腺瘤</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemCR3" class=" mb0 mr0">
                  <el-checkbox-group v-model="formInline.itemCR3" style="height: auto;">
                    <el-checkbox name="itemCR3" label="3" class="specialCheck">管状绒毛状腺瘤</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemCR4" class=" mb0 mr0">
                  <el-checkbox-group v-model="formInline.itemCR4" style="height: auto;">
                   <el-checkbox name="itemCR4" label="4" class="specialCheck">绒毛状腺瘤</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemCR5" class=" mb0 mr0">
                  <el-checkbox-group v-model="formInline.itemCR5" style="height: auto;">
                    <el-checkbox nmae="itemCR5" label="5" class="specialCheck">扁平腺瘤（管状型）</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemCR6" class=" mb0 mr0" >
                  <el-checkbox-group v-model="formInline.itemCR6" style="height: auto;">
                    <el-checkbox name="itemCR6" label="6" class="specialCheck">扁平腺瘤（管状绒毛状型）</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemCR7" class=" mb0 mr0">
                  <el-checkbox-group v-model="formInline.itemCR7" style="height: auto;">
                    <el-checkbox name="itemCR7" label="7" class="specialCheck">扁平腺瘤（绒毛状型）</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemCR8" class=" mb0 mr0">
                  <el-checkbox-group v-model="formInline.itemCR8" style="height: auto;">
                    <el-checkbox name="itemCR8" label="8" class="specialCheck">混合型腺瘤</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemCR9" class=" mb0 mr0" >
                  <el-checkbox-group v-model="formInline.itemCR9" style="height: auto;">
                    <el-checkbox name="itemCR9" class="specialCheck">其它，请说明：</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemCR9Other" class="formhalfline">
                  <el-input  type="textarea" :rows="4" v-model="formInline.itemCR9Other" style="width: 150px; margin-left: 20px;" size="mini" v-if="!show"></el-input>
                  <div v-if="show" class="textArea-font">{{formInline.itemCR9Other}}</div>
                </el-form-item>
              </div>
              <div class="dbib">
                <p class="texts">其它良性病变</p>
                <el-form-item  prop="itemCR10" class=" mb0">
                  <el-checkbox-group v-model="formInline.itemCR10" style="height: auto;">
                    <el-checkbox name="itemCR10" label="10" class="specialCheck">增生性息肉</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemCR11" class=" mb0">
                  <el-checkbox-group v-model="formInline.itemCR11" style="height: auto;">
                    <el-checkbox name="itemCR11" label="11" class="specialCheck">肉芽肿性息肉</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemCR12" class=" mb0">
                  <el-checkbox-group v-model="formInline.itemCR12" style="height: auto;">
                    <el-checkbox name ="itemCR12" label="12" class="specialCheck">炎性息肉</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemCR13" class=" mb0">
                  <el-checkbox-group v-model="formInline.itemCR13" style="height: auto;">
                    <el-checkbox  type="textarea" name="itemCR13" label="13" class="specialCheck">其它，请说明：</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemCR13Other" class="formhalfline">
                    <el-input type="textarea" :rows="4" v-model="formInline.itemCR13Other" style="width: 150px; margin-left: 20px;" size="mini" v-show="!show"></el-input>
                  <div v-if="show" class="textArea-font">{{formInline.itemCR13Other}}</div>
                </el-form-item>
                    <span style="font-size:14px;line-height:1.5;display:block;color: #606266;margin-left:20px;">不典型增生（上皮内瘤变）</span>
                    <span style="font-size:14px;line-height:1.5;display:block;color: #606266;margin-left:20px;">/ 分化程度</span>

                <el-form-item  prop="itemCR14" class=" mb0">
                  <el-checkbox-group v-model="formInline.itemCR14" style="height: auto;">
                    <el-checkbox name="itemCR14" label="14" class="specialCheck">低级别上皮内瘤变</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemCR15" class=" mb0">
                  <el-checkbox-group v-model="formInline.itemCR15" style="height: auto;">
                    <el-checkbox name="itemCR15" label="15" class="specialCheck">高级别上皮内瘤变</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemCR16" class=" mb0">
                  <el-checkbox-group v-model="formInline.itemCR16" style="height: auto;">
                    <el-checkbox name="itemCR16" label="16" class="specialCheck">高分化腺癌</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemCR17" class=" mb0">
                  <el-checkbox-group v-model="formInline.itemCR17" style="height: auto;">
                    <el-checkbox name="itemCR17" label="17" class="specialCheck">中分化腺癌</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemCR18" class=" mb0">
                  <el-checkbox-group v-model="formInline.itemCR18" style="height: auto;">
                    <el-checkbox name="itemCR18" label="18" class="specialCheck">低分化腺癌</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemCR19" class=" mb0">
                  <el-checkbox-group v-model="formInline.itemCR19" style="height: auto;">
                    <el-checkbox name="itemCR19" label="19" class="specialCheck">其它，请说明：</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemCR19Other" class="formhalfline">
                    <el-input type="textarea" :rows="4" v-model="formInline.itemCR19Other" style="width: 150px; margin-left: 20px;" size="mini" v-if="!show"></el-input>
                   <div v-if="show" class="textArea-font">{{formInline.itemCR13Other}}</div>
                </el-form-item>
              </div>
            </td>
            <td>
              <div class="dbib">
                <el-form-item  prop="itemCS1" class=" mb0">
                  <el-checkbox-group v-model="formInline.itemCS1" style="height: auto;">
                    <el-checkbox name="itemCS1" label="1" class="specialCheck">密切观察</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemCS2" class=" mb0">
                  <el-checkbox-group v-model="formInline.itemCS2" style="height: auto;">
                    <el-checkbox name="itemCS2" label="2" class="specialCheck">保守治疗</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemCS3" class=" mb0">
                  <el-checkbox-group v-model="formInline.itemCS3" style="height: auto;">
                    <el-checkbox name="itemCS3" label="3" class="specialCheck">内镜治疗</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemCS4" class=" mb0">
                  <el-checkbox-group v-model="formInline.itemCS4" style="height: auto;">
                    <el-checkbox name="itemCS4" label="4" class="specialCheck">手术治疗</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemCS5" class="formhalfline mb0">
                  <el-checkbox-group v-model="formInline.itemCS5" style="height: auto;">
                    <el-checkbox v-model="formInline.itemCS5" label="5" class="specialCheck">其它，请说明：</el-checkbox>

                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="itemCS5Other" class="formhalfline">
                  <el-input type="textarea" :rows="4" v-model="formInline.itemCS5Other" style="width: 150px; margin-left: 20px;" size="mini" v-if="!show"></el-input>
                  <div v-if="show" class="textArea-font">{{formInline.itemCS5Other}}</div>
                </el-form-item>
              </div>
            </td>
          </tr>
        </table>
          <p class="texts" style="line-height:2;">
            本项目仅负担结直肠癌筛查的费用，若您需进一步检查/治疗，建议您选择当地肿瘤医院，中国医学科学院肿瘤医院也可为您提供绿色通道，但其间花费应由您的医疗保险或其他方式支付。本筛查并不是充分的身体检查，也不能替代在医院的全面检查。如果您对筛查结果或关于本筛查有任何疑问，请直接致电当地协调员。衷心感谢您的参与！
          </p>
      </div>
        <div class="tables" style="margin:20px auto;width:941px">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="200px" :rules="rules" ref="formInline1" :disabled="show" v-if="!show" style="max-width: 1200px;margin: 20px auto;">
            <el-form-item label="筛查现场协调员姓名：" prop="xtyName" class="formhalfline zdysinput">
              <el-input v-model="formInline.xtyName"  size="small" style="width: 220px;"></el-input>
            </el-form-item>
            <el-form-item label="肿瘤医院：" prop="hosName" class="formhalfline zdysinput">
              <el-input v-model="formInline.hosName"  size="small" style="width: 220px;"></el-input>
            </el-form-item>
            <el-form-item label="筛查现场协调员电话：" prop="xtyPhone" class="formhalfline zdysinput">
              <el-input v-model="formInline.xtyPhone"  size="small" style="width: 220px;"></el-input>
            </el-form-item>
            <el-form-item label="日期：" class="formhalfline">
              <el-date-picker
                v-model="formInline.scDate"
                :clearable="false"
                align="right"
                size="small"
                format="yyyy年MM月dd日"
                value-format="yyyy-MM-dd"
                style="width:160px;"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="180px" :rules="rules" ref="formInline1" :disabled="show" v-if="show">
            <el-row>
              <el-col :span="12">
                <el-form-item label="筛查现场协调员姓名：" prop="xtyName" class="formhalfline zdysinput">
                  <div>{{formInline.xtyName}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="肿瘤医院：" prop="hosName" class="formhalfline zdysinput">
                  <div>{{formInline.hosName}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="筛查现场协调员电话：" prop="xtyPhone" class="formhalfline zdysinput">
                  <div>{{formInline.xtyPhone}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="日期：" class="formhalfline">
                  <div>{{formInline.scDate | entryTime }}</div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        </div>
      </el-form>

      <div class="text-center" style="margin-top: 40px;" v-if="!show">
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="cancel()">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'report4',
    data() {
      var checkitems = (items,index)=>{

        console.log('3')
        for(let i=1;i<=index;i++){
          if(this.formInline[items+i]){
            return  true;
            break;
          }
        }
        return false;
      };
      var set_item = (items,index,b)=>{
        for(let i=1;i<=index;i++){
          this.formInline[items+i] = b;
        }
      };
      var validate_item_a_type = (rule, value, callback) => {
        console.log('2')
        if (value) {
          if(checkitems('itemAR',15) ){
            if(checkitems('itemAS',6) ){
              callback();
            }else callback(new Error('请选择最少一项处理建议'));
          }
          else callback(new Error('请选择最少一项检查结果'));
        }else{
          set_item('itemAR',15,false);
          set_item('itemAS',6,false);
          callback();
        }
      };

      var item_a_r = (rule, value, callback) => {
        console.log('99')
        if(value){
          console.log('9999')
          this.formInline.itemAType = true;
         }
        this.$refs.formInline.validateField('itemAType');
        callback();
      };
      var validate_item_a_r_15 = (rule, value, callback) => {
        if(!value)
          this.formInline.itemAR15Other = '';
        this.$refs.formInline.validateField('itemAR15Other');
        callback();
      };
      var itemAR15Other = (rule, value, callback) => {
        if(this.formInline.itemAR15){
          this.formInline.itemAType = true;
          if (value === '') {
           this.$refs.formInline.validateField('itemAType');
             callback(new Error('请说明其他结果'));
          }else{
            this.$refs.formInline.validateField('itemAType');
            callback();
          }
        }else{
          if (value === '') {}
          else {this.formInline.itemAR15 = true;}
          this.$refs.formInline.validateField('itemAType');
          callback();
        }
      };
      var itemAS6 = (rule, value, callback) => {
        if(!value)
          this.formInline.itemAS6Other = '';
        this.$refs.formInline.validateField('itemAS6Other');
        callback();
      };
      var itemAS6Other = (rule, value, callback) => {
        if(this.formInline.itemAS6){
          if (value === '') {
             callback(new Error('请说明其他建议'));
          }else{
            callback();
          }
        }else{
          if (value !== '') { this.formInline.itemAS6 = true;}
          callback()
        }
      };
      var itemBType = (rule, value, callback) => {
          console.log(value)
        if(value) {
          if(this.formInline.item_b_r == 1 || this.formInline.item_b_r == 2 || this.formInline.item_b_r==3){
            callback();
          }else {
            callback(new Error('请选择检查结果'));
          }
        }else{
          this.formInline.item_b_r= '';
          this.formInline.item_b_s= '';
        }
      };
      var item_b_r =  (rule, value, callback) => {//console.log(this.formInline.item_b_r)
        if(value == 1 || value == 2 || value == 3){
          this.formInline.itemBType = true;
          this.$refs.formInline.validateField('itemBType');
        }
        callback();
      };
      var item_b_s =  (rule, value, callback) => {//console.log(this.formInline.item_b_r)
        if(value == 1 || value == 2 || value==3){
          this.formInline.itemBType = true;
          this.$refs.formInline.validateField('itemBType');
        }
        callback();
      };
//itemCType
      var itemCType = (rule, value, callback) => {
        if (value) {
          if(checkitems('itemCR',19)){
            if(checkitems('itemCS',5) ){
              callback();
            }else callback(new Error('请选择最少一项处理建议'));
          }
          else callback(new Error('请选择最少一项检查结果'));
        }else{
          set_item('itemCR',19,false);
          set_item('itemCS',5,false);
          callback();
        }
      };

      var item_c_r = (rule, value, callback) => {
        if(value){
          this.formInline.itemCType = true;
        }
        this.$refs.formInline.validateField('itemCType');
        callback();
      };
      var itemCR9 = (rule, value, callback) => {
        if(!value)
          this.formInline.itemCR9Other = '';
        this.$refs.formInline.validateField('itemCR9Other');
        callback();
      };
      var itemCR9Other = (rule, value, callback) => {
        if(this.formInline.itemCR9){
          this.formInline.itemCType = true;
          if (value === '') {
            this.$refs.formInline.validateField('itemCType');
            callback(new Error('请说明其他结果'));
          }else{
            this.$refs.formInline.validateField('itemCType');
            callback();
          }
        }else{
          if (value === '') {}
          else {this.formInline.itemCR9 = true;}
          this.$refs.formInline.validateField('itemCType');
          callback();
        }
      };
      var itemCR13 = (rule, value, callback) => {
        if(!value)
          this.formInline.itemCR13Other = '';
        this.$refs.formInline.validateField('itemCR13Other');
        callback();
      };
      var itemCR13Other = (rule, value, callback) => {
        if(this.formInline.itemCR13){
          this.formInline.itemCType = true;
          if (value === '') {
            this.$refs.formInline.validateField('itemCType');
            callback(new Error('请说明其他结果'));
          }else{
            this.$refs.formInline.validateField('itemCType');
            callback();
          }
        }else{
          if (value === '') {}
          else {this.formInline.itemCR13 = true;}
          this.$refs.formInline.validateField('itemCType');
          callback();
        }
      };

      var itemCR19 = (rule, value, callback) => {
        if(!value)
          this.formInline.itemCR19Other = '';
        this.$refs.formInline.validateField('itemCR19Other');
        callback();
      };
      var itemCR19Other = (rule, value, callback) => {
        if(this.formInline.itemCR19){
          this.formInline.itemCType = true;
          if (value === '') {
            this.$refs.formInline.validateField('itemCType');
            callback(new Error('请说明其他结果'));
          }else{
            this.$refs.formInline.validateField('itemCType');
            callback();
          }
        }else{
          if (value === '') {}
          else {this.formInline.itemCR19 = true;}
          this.$refs.formInline.validateField('itemCType');
          callback();
        }
      };

      var itemCS5 = (rule, value, callback) => {
        if(!value)
          this.formInline.itemCS5Other = '';
        this.$refs.formInline.validateField('itemCS5Other');
        callback();
      };
      var itemCS5Other = (rule, value, callback) => {
        if(this.formInline.itemCS5){
          this.formInline.itemCType = true;
          if (value === '') {
            this.$refs.formInline.validateField('itemCType');
            callback(new Error('请说明其他建议'));
          }else{
            this.$refs.formInline.validateField('itemCType');
            callback();
          }
        }else{
          if (value !== '') { this.formInline.itemCS5 = true;}
          this.$refs.formInline.validateField('itemCType');
          callback()
        }
      };

      return {
        report3_page:false,
        show:'',
        show:false,
        btnAuth:{},
        formInline: {
          name: '张三',
          sid: 'TC10001',//受试者唯一编号值固定为TC0001
          todoId:'1',//待办id 值固定为1
          colonoscopyRecordId :'1',//结肠镜检查记录id 值固定1
          scDate: new Date(),//筛查日期
          xtyName: '',//协调员项目
          xtyPhone: '',//协调员电话
          hosName: '',//肿瘤医院名称
          itemAType: false,
          itemAR1:false,
          itemAR2:false,
          itemAR3:false,
          itemAR4:false,
          itemAR5:false,
          itemAR6:false,
          itemAR7:false,
          itemAR8:false,
          itemAR9:false,
          itemAR10:false,
          itemAR11:false,
          itemAR12:false,
          itemAR13:false,
          itemAR14:false,
          itemAR15:false,
          itemAR15Other:'',
          itemAS1:false,
          itemAS2:false,
          itemAS3:false,
          itemAS4:false,
          itemAS5:false,
          itemAS6:false,
          itemAS6Other:'',
          itemBType:false,
          item_b_r:'',
          item_b_s:'',
          itemCType: false,//结肠镜病理检查结果 1：是，2：否
          itemCR1: false,//良性肿瘤  1：是，2：否
          itemCR2: false,//管状腺瘤 1：是，2：否
          itemCR3: false,//管状绒毛状腺瘤 1：是，2：否
          itemCR4: false,//绒毛状腺瘤 1：是，2：否
          itemCR5: false,//扁平腺瘤（管状型） 1：是，2：否
          itemCR6: false,//扁平腺瘤（管状绒毛状型） 1：是，2：否
          itemCR7: false,//扁平腺瘤（绒毛状型） 1：是，2：否
          itemCR8: false,// 混合型腺瘤 1：是，2：否
          itemCR9: false,//其它 1：是，2：否
          itemCR9Other: "",//其它内容
          itemCR10: false,//增生性息肉 1：是，2：否
          itemCR11: false,//肉芽肿性息肉 1：是，2：否
          itemCR12: false,//炎性息肉 1：是，2：否
          itemCR13: false,//其它 1：是，2：否
          itemCR13Other: "",//其它内容
          itemCR14: false,//低级别上皮内瘤变 1：是，2：否
          itemCR15: false,//高级别上皮内瘤变 1：是，2：否
          itemCR16: false,//高分化腺癌 1：是，2：否
          itemCR17: false,//中分化腺癌 1：是，2：否
          itemCR18: false,//低分化腺癌 1：是，2：否
          itemCR19: false,//其它 1：是，2：否
          itemCR19Other: "",//其它内容
          itemCS1: false,//密切观察 1：是，2：否
          itemCS2: false,// 保守治疗 1：是，2：否
          itemCS3: false,//int 内镜治疗 1：是，2：否
          itemCS4: false,// int 手术治疗 1：是，2：否
          itemCS5: false,// int 其它 1：是，2：否
          itemCS5Other: "",// varchar(255) 其它内容
        }
        ,rules:{
          itemAType: [ { validator: validate_item_a_type, trigger: 'change' }],
          itemAR1:[ { validator: item_a_r, trigger: 'change' } ],
          itemAR2:[ { validator: item_a_r, trigger: 'change' } ],
          itemAR3:[ { validator: item_a_r, trigger: 'change' } ],
          itemAR4:[ { validator: item_a_r, trigger: 'change' } ],
          itemAR5:[ { validator: item_a_r, trigger: 'change' } ],
          itemAR6:[ { validator: item_a_r, trigger: 'change' } ],
          itemAR7:[ { validator: item_a_r, trigger: 'change' } ],
          itemAR8:[ { validator: item_a_r, trigger: 'change' } ],
          itemAR9:[ { validator: item_a_r, trigger: 'change' } ],
          itemAR10:[ { validator: item_a_r, trigger: 'change' } ],
          itemAR11:[ { validator: item_a_r, trigger: 'change' } ],
          itemAR12:[ { validator: item_a_r, trigger: 'change' } ],
          itemAR13:[ { validator: item_a_r, trigger: 'change' } ],
          itemAR14:[ { validator: item_a_r, trigger: 'change' } ],
          itemAR15:[  { validator: validate_item_a_r_15, trigger: 'change' }],
          itemAR15Other:[ { validator: itemAR15Other, trigger: 'blur' },{ min: 0, max: 120, message: '长度在 0 到 120 个汉字', trigger: 'blur'} ],
          itemAS1:[{ validator: item_a_r, trigger: 'change' }  ],
          itemAS2:[{ validator: item_a_r, trigger: 'change' }  ],
          itemAS3:[{ validator: item_a_r, trigger: 'change' }  ],
          itemAS4:[{ validator: item_a_r, trigger: 'change' }  ],
          itemAS5:[{ validator: item_a_r, trigger: 'change' }  ],
          itemAS6:[{ validator: itemAS6, trigger: 'change' }  ],
          itemAS6Other:[{ validator: itemAS6Other, trigger: 'blur' },{ min: 0, max: 120, message: '长度在 0 到 120 个汉字', trigger: 'blur'} ],
          itemBType:[
            { validator: itemBType,trigger: 'change'}
          ],
          item_b_r:[
            { validator: item_b_r,trigger: 'change'}
          ],
          item_b_s:[
            { validator: item_b_s,trigger: 'change'}
          ],
          itemCType: [ { validator: itemCType, trigger: 'change' }],
          itemCR1:[ { validator: item_c_r, trigger: 'change' } ],
          itemCR2:[ { validator: item_c_r, trigger: 'change' } ],
          itemCR3:[ { validator: item_c_r, trigger: 'change' } ],
          itemCR4:[ { validator: item_c_r, trigger: 'change' } ],
          itemCR5:[ { validator: item_c_r, trigger: 'change' } ],
          itemCR6:[ { validator: item_c_r, trigger: 'change' } ],
          itemCR7:[ { validator: item_c_r, trigger: 'change' } ],
          itemCR8:[ { validator: item_c_r, trigger: 'change' } ],
          itemCR9:[ { validator: itemCR9, trigger: 'change' } ],
          itemCR9Other:[ { validator: itemCR9Other, trigger: 'blur' },{ min: 0, max: 120, message: '长度在 0 到 120 个汉字', trigger: 'change'} ],
          itemCR10:[ { validator: item_c_r, trigger: 'change' } ],
          itemCR11:[ { validator: item_c_r, trigger: 'change' } ],
          itemCR12:[ { validator: item_c_r, trigger: 'change' } ],
          itemCR13:[ { validator: itemCR13, trigger: 'change' } ],
          itemCR13Other:[ { validator: itemCR13Other, trigger: 'blur' },{ min: 0, max: 120, message: '长度在 0 到 120 个汉字', trigger: 'change'} ],
          itemCR14:[ { validator: item_c_r, trigger: 'change' } ],
          itemCR15:[ { validator: item_c_r, trigger: 'change' } ],
          itemCR16:[ { validator: item_c_r, trigger: 'change' } ],
          itemCR17:[ { validator: item_c_r, trigger: 'change' } ],
          itemCR18:[ { validator: item_c_r, trigger: 'change' } ],
          itemCR19:[ { validator: itemCR19, trigger: 'change' } ],
          itemCR19Other:[  { validator: itemCR19Other, trigger: 'blur' },{ min: 0, max: 120, message: '长度在 0 到 120 个汉字', trigger: 'change'}],
          itemCS1:[{ validator: item_c_r, trigger: 'change' }  ],
          itemCS2:[{ validator: item_c_r, trigger: 'change' }  ],
          itemCS3:[{ validator: item_c_r, trigger: 'change' }  ],
          itemCS4:[{ validator: item_c_r, trigger: 'change' }  ],
          itemCS5:[{ validator: itemCS5, trigger: 'change' }  ],
          itemCS5Other:[{ validator: itemCS5Other, trigger: 'blur' },
            { min: 0, max: 120, message: '长度在 0 到 120 个汉字', trigger: 'change'}],
          xtyPhone:[{ required: true, message: '请输入', trigger: 'change' }],
          hosName:[{ required: true, message: '请输入', trigger: 'change' }],
          xtyName:[{ required: true, message: '请输入', trigger: 'change' }]
        }
      }
    },
    // mounted(){
    //   let obj = this.checkPageAuth(this,"report3_page",this.btnAuth);
    //   //this.formInline.name
    //   this.queryInfo()
    //   this.formInline.sid=this.$route.query.sid;
    //
    // },
    created() {
      let obj = this.checkPageAuth(this,"report3_page",this.btnAuth)
      this.formInline.sid=this.$route.query.sid;
      this.formInline.hosCjRecordStatusId = this.$route.query.hosCjRecordStatusId;
      this.show = this.$route.query.show;
      if(this.show){
        this.queryDate();
        this.rules = {};
      }else{
//        this.queryFITResult()
//        this.queryHospitalName()
      }
      this.queryInfo();
    },
    mounted(){
      if(window.sessionStorage.getItem('COOKIE_XTYNAME')){
        this.formInline.xtyName=window.sessionStorage.getItem('COOKIE_XTYNAME')
      }
      if(window.sessionStorage.getItem('COOKIE_XTYPHONE')){
        this.formInline.xtyPhone=window.sessionStorage.getItem('COOKIE_XTYPHONE')
      }
    },
    methods:{
      cancel(){
        this.$router.go(-1)
      },
      queryFITResult(){
        $axios_http({
          url:"/base/fit/result/queryLatestFitInfo/"+this.$route.query.sid,
          data:{},
          vueObj:this
        }).then((res)=> {
          if (res.data.data){
            this.formInline.item_b_r = res.data.data.result
          }
          //显示操作成功浮动提示框
          //$successMsg(this,"保存成功")
          // this.$router.push({ path: '/dictionary/dictionary'})
          //清空数据
          //this.clearFiled()
        })
      },
      queryInfo(){
        $axios_http({
          url: '/fit/personInfo',
          data:{
            sid:this.$route.query.sid
          },
          vueObj:this
        }).then((res)=> {
          this.formInline.name=res.data.result.userName;
          //显示操作成功浮动提示框
          //$successMsg(this,"保存成功")
          // this.$router.push({ path: '/dictionary/dictionary'})
          //清空数据
          //this.clearFiled()
        })
      },
      queryHospitalName(){
        $axios_http({
          url:"/base/department/hospital/findHospitalByLoginName",
          data:{},
          vueObj:this
        }).then((res)=> {
          if(res.data.data){
            this.formInline.hosName=res.data.data.name;
          }
          //显示操作成功浮动提示框
          //$successMsg(this,"保存成功")
          // this.$router.push({ path: '/dictionary/dictionary'})
          //清空数据
          //this.clearFiled()
        })
      },
      queryDate(){
        var set_item_values=(items,data,is,ie)=>{
          for(let i=is;i<=ie;i++){
            this.formInline[items+i] = data[items+i] == 1 ?true:false;
          }
        }
        // item_b_r_1:1
        var inttobool_radio = (items,data,index)=>{
          var v = '';
          for(let i=1;i<=index;i++){
            if(data[items+i] == 1){
              v = i;
              break;
            }
          }
          return v;
        }
        $axios_http({
          url:"/hospital/colonoscopy/queryHosCjScreenNotificationById",
          data:{
              id:this.$route.query.reportId
          },
          vueObj:this
        }).then((res)=> {
          this.formInline.sid= res.data.result.sid;
//          this.formInline.name=res.data.result.userName;
          this.formInline.scDate=res.data.result.scDate;
          this.formInline.xtyName=res.data.result.xtyName;
          this.formInline.xtyPhone=res.data.result.xtyPhone;
          this.formInline.hosName=res.data.result.hosName;
          this.formInline.itemAType=res.data.result.itemAType === 1?true:false;
          set_item_values('itemAR',res.data.result,1,15);
          this.formInline.itemAR15Other=res.data.result.itemAR15Other;
          set_item_values('itemAS',res.data.result,1,6);
          this.formInline.itemAS6Other=res.data.result.itemAS6Other;
          this.formInline.itemBType=res.data.result.itemBType === 1?true:false;

          this.formInline.item_b_r = inttobool_radio('itemBR',res.data.result,3);
          this.formInline.item_b_s = ""+inttobool_radio('itemBS',res.data.result,3);
           console.log(this.formInline.item_b_r,this.formInline.item_b_s)
          this.formInline.itemCType=res.data.result.itemCType === 1?true:false;
          set_item_values('itemCR',res.data.result,1,19);
          this.formInline.itemCR9Other=res.data.result.itemCR9Other;
          this.formInline.itemCR13Other=res.data.result.itemCR13Other;
          this.formInline.itemCR19Other=res.data.result.itemCR19Other;

          set_item_values('itemCS',res.data.result,1,5);
          this.formInline.itemCS5Other=res.data.result.itemCS5Other;



          //显示操作成功浮动提示框
          //$successMsg(this,"保存成功")
          // this.$router.push({ path: '/dictionary/dictionary'})
          //清空数据
          //this.clearFiled()
        })
      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      addbbFun(){// 添加病变部位//最多3个//对应数据：addbb
        if(this.addbb.length>=3){
          this.$alert('您最多可添加3个表格', '提示', {
            confirmButtonText: '确定',
            callback: action => {
//              this.$message({
//                type: 'info',
//                message: `action: ${ action }`
//              });
            }
          });
        }else{
          this.addbb.push({})
        }
      },
      submitForm() {
        var that = this;
        let validd = true

        this.$refs.formInline1.validate((valid) => {
          if (!valid){
          validd = false
          }
        })
          this.$refs.formInline.validate((valid) => {
            if (!valid){
            validd = false
          }
        })
          if (validd){
            console.log('valid true');
            let dd = JSON.parse(JSON.stringify(that.formInline))


            var booltoint = (items,index)=>{
              for(let i=1;i<=index;i++){
                dd[items+i] =  dd[items+i] == false ? 2 : 1;
              }
            }
            var booltoint_radio = (items,index,ischeck,istype)=>{
              for(let i=1;i<=index;i++){
                dd[items+i] =  i == ischeck && istype ? 1 : 2;
              }
            }

            dd.itemAType =  dd.itemAType === false ? 2 : 1;
            booltoint('itemAR',15);
            booltoint('itemAS',6);

            if(dd.itemBType)
              booltoint_radio('itemBR',3,dd.item_b_r,true);
            else  booltoint_radio('itemBR',3,dd.item_b_r,false);
            delete  dd.item_b_r;
            if(dd.itemBType)
              booltoint_radio('itemBR',3,dd.item_b_s,true);
            else  booltoint_radio('itemBR',3,dd.item_b_r,false);
            if(dd.item_b_s == 1){
              dd.itemBS1 = 1
            }else if(dd.item_b_s == 2){
              dd.itemBS2 = 1
            }else if(dd.item_b_s == 3){
              dd.itemBS3 = 1
            }
            delete  dd.item_b_r;
            delete  dd.item_b_s;
            dd.itemBType =  dd.itemBType === false ? 2 : 1;

            dd.itemCType =  dd.itemCType === false ? 2 : 1;
            booltoint('itemCR',19);
            booltoint('itemCS',5);
            if(dd.scDate.indexOf("T")>-1)
            dd.scDate = dd.scDate.split('T')[0];
            //item_b_r

//            console.log(dd);
//            return;
            $axios_http({
              url:"/hospital/colonoscopy/updateReportEnterStatusDetails",
              data:dd,
              vueObj:this
            }).then((res)=> {
              //显示操作成功浮动提示框
              $successMsg(this,"保存成功")
              this.$router.push('/enteroscopy/enteroscopy')
              //清空数据
              //this.clearFiled()
            })

          }


      },
      printContent:function(element){
          this.$print(element)
//          this.Print(element)

//            let subOutputRankPrint = document.getElementById(element);
//            let newContent =subOutputRankPrint.innerHTML;
//            let oldContent = document.body.innerHTML;
//            document.body.innerHTML = newContent;
//            window.print();
//            window.location.reload();
//            document.body.innerHTML = oldContent;
//            return false;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.j_content{
  overflow: auto;
}
  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .text-right {
    text-align: right;
  }

  .text-center {
    text-align: center;
  }

  .j_content {
    padding: 10px;
    height: 100%;
    overflow: auto;
    background: #fff;
  }

  .btns {
    padding: 20px;
  }

   .text {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    line-height: 1.5;
    padding: 0;
  }

  .formcon {
    margin:0 20px 20px;
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
    margin: 20px 50px 30px 160px;
    font-size: 0;
    line-height: 0;
  }
  .formoneline {
    width: 100%;
    margin-right: 0 !important;
  }



  .formhalfline {
    /*width: 49%;*/
    margin-right: 0 !important;
  }

  .mb0 {
    margin-bottom:0 !important;
  }
  .mr0 {
    margin-right:0 !important;
  }

  .addbb {
    font-size: 20px;
    font-weight: bold;
    color: #3a8ee6;
  }

  .zdysinput input {
    border-width: 0 0 1px 0;
  }

  .texts{
    color: #000000;
    line-height: 1;
    font-size: 14px;

  }
  .texts .underline{
    border-bottom: 1px solid #000000;
    text-decoration: underline;
    min-width: 120px;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
  }
  .j_table{
    margin: 20px 0;
    border-collapse: collapse;
    table-layout: auto;
  }
  .j_table td{
    border:1px solid #000000;
    padding:10px;
    vertical-align: top;
  }
  .j_table .title{
    font-size: 14px;
    text-align: center;
    color: #000000;
    line-height: 15px;
  }
  .db{
    display: block;
    margin-left: 30px;
    line-height: 30px;
  }
  .specialWidth{
    width:calc(100% - 450px);
    min-width: 220px;
  }
  .specialCheck{
    /*width: 170px;*/
    margin: 5px 20px;
  }
  .dbib{
    float:left;
    width: 215px;
  }
  .zdysinput{
    margin-bottom: 10px;
  }
  .mb22{
    margin-bottom: 22px;
  }
  .textArea-font{
    margin-left: 20px;
    width: 200px;
    font-size: 14px;
    color: #666;
    line-height: 20px;
    word-break: break-all;
    padding: 10px;
    border: 1px solid #e5e5e5;

  }
</style>
<style>

.db .el-checkbox__input{
  vertical-align: top;
  margin-top: 11px;
}
.mb0 .el-checkbox__label{
  white-space: normal;
  width: 100%;
  line-height: 34px;
  font-size: 16px!important;
}
.zdysinput input {
  border-width: 0 0 1px 0;
  border-radius: 0;
}
.el-input-group__append{
  padding:0 10px;
}
.cmc .el-form-item__content{
  line-height: 0;
}
.cmc .el-form-item__error{
  padding-left:20px !important;
}
.cmb .el-form-item{
  margin-bottom: 0;
}

.j_content .el-radio__input.is-disabled.is-checked+span.el-radio__label {
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
.j_content .el-checkbox__input.is-disabled.is-checked+span.el-checkbox__label {
  color: #409EFF;
  cursor: not-allowed;
}
.j_content .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background-color: #aaaaaa;
  border-color: #ffff;
}
.j_content .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
  border-color: #fff;
}

.zdysinput.el-input.is-disabled .el-input__inner{
  background: transparent;
}
  .print{
    float: right;
  }

</style>
