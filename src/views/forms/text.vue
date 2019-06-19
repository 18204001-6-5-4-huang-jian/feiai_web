<template>
  <div class="text1">
     <div>
       <span class="title1">组织学分类</span>
       <span class="title1 english">Histologic Type and Subtypes</span>
       <span class="code title1">ICD-O编码</span>
     </div>
     <div v-for="item in text">
         <div>
           <span class="title1">{{item.name}}</span>
           <span class="title1 english">{{item.english}}</span>
           <span class="code">{{item.code}}</span>
           <div v-if="item.child" v-for="x in item.child">
             <span class="title2">{{x.name}}</span>
             <span class="title2 english">{{x.english}}</span>
             <span class="code">{{x.code}}</span>
             <div v-if="x.child" v-for="a in x.child">
               <span  class="title3">{{a.name}}</span>
               <span  class="title3 english">{{a.english}}</span>
               <span  class="code">{{a.code}}</span>
               <div v-if="a.child" v-for="b in a.child">
                 <span  class="title4">{{b.name}}</span>
                 <span  class="title4 english">{{b.english}}</span>
                 <span  class="code">{{b.code}}</span>
                 <div v-if="b.child" v-for="c in b.child">
                   <span  class="title5">{{c.name}}</span>
                   <span  class="title5 english">{{c.english}}</span>
                   <span  class="code">{{c.code}}</span>
                 </div>
               </div>
             </div>
           </div>
         </div>

       </div>
  </div>
</template>

<script>
export default {
  name: 'text1',
  data () {
    return {
     text:[
       {
         name:'上皮性肿瘤',
         english:'Epithelial tumors',
         code:'',
         child:[
           {
             name:'腺癌',
             english:'Adenocarcinoma',
             code:'8140/3',
             child:[
               {
                 name:'附壁型腺癌',
                 english:'Lepidic adenocarcinoma',
                 code:'8250/3',
               },
               {
                 name:'腺泡状腺癌',
                 english:'Acinar adenocarcinoma',
                 code:'8551/3',
               },
               {
                 name:'乳头状腺癌',
                 english:'Papillary adenocarcinoma',
                 code:'8260/3',
               },
               {
                 name:'微乳头状腺癌',
                 english:'Micropapillary adenocarcinoma ',
                 code:'8265/3',
               },
               {
                 name:'实体性腺癌',
                 english:'Solid adenocarcinoma',
                 code:'8230/3',
               },
               {
                 name:'浸润性黏液腺癌',
                 english:'Invasive mucinous adenocarcinoma',
                 code:'8253/3',
                 child:[
                   {
                     name:'浸润性黏液/非黏液混合性腺癌',
                     english:'Mixed invasive mucinous and nonmucinous adenocarcinoma',
                     code:'8254/3',
                   },
                 ]
               },
               {
                 name:'胶样腺癌',
                 english:'Colloid adenocarcinoma',
                 code:'8480/3',
               },
               {
                 name:'胎儿型腺癌',
                 english:'Fetal adenocarcinoma',
                 code:'8333/3',
               },
               {
                 name:'肠型腺癌',
                 english:'Enteric adenocarcinoma',
                 code:'8144/3',
               },
               {
                 name:'微浸润性腺癌',
                 english:'Minimally invasive adenocarcinoma ',
                 code:'',
                 child:[
                   {
                     name:'非黏液型',
                     english:' Nonmucinous ',
                     code:'8250/2',
                   },
                   {
                     name:'黏液型',
                     english:' Mucinous ',
                     code:'8257/3',
                   },
                 ]
               },
               {
                 name:' 浸润前病变',
                 english:' Preinvasive lesions ',
                 code:'',
                 child:[
                   {
                     name:'非典型腺瘤样增生',
                     english:' Atypical adenomatous hyperplasia ',
                     code:'8250/0',
                   },
                   {
                     name:'原位腺癌',
                     english:' Adenocarcinoma in situ ',
                     code:'8140/2',
                     child:[
                       {
                         name:'非黏液型',
                         english:' Nonmucinous ',
                         code:'8410/2',
                       },
                       {
                         name:'黏液型',
                         english:'  Mucinous ',
                         code:'8253/2',
                       },
                     ]
                   },
                 ]
               },
             ],
           },
           {
             name:'鳞状细胞癌',
             english:'    Squamous cell carcinoma',
             code:'8070/3',
             child:[
               {
                 name: '角化型鳞状细胞癌',
                 english: ' Keratinizing squamous cell carcinoma',
                 code: '8071/3',
               },
               {
                 name: '非角化型鳞状细胞癌',
                 english: ' Nonkeratinizing squamous cell carcinoma ',
                 code: '8072/3',
               },
               {
                 name: '基底样鳞状细胞癌',
                 english: ' Basaloid squamous cell carcinoma ',
                 code: '8083/3',
               },
               {
                 name: '侵袭前病变',
                 english: ' Preinvasive lesion ',
                 code: '',
                 child:[
                   {
                     name: '原位鳞状细胞癌',
                     english: ' Squamous cell carcinoma in situ ',
                     code: '8070/2',
                   },
                 ]
               },
             ]
           },
           {
             name:'神经内分泌肿瘤',
             english:'Neuroendocrine tumors',
             code:'',
             child:[
               {
                 name: '小细胞癌',
                 english: 'Small cell carcinoma',
                 code: '8041/3',
               },
               {
                 name: '复合性小细胞癌',
                 english: 'Combined small cell carcinoma',
                 code: '8045/3',
               },
               {
                 name: '大细胞神经内分泌癌',
                 english: 'Large cell neuroendocrine carcinoma',
                 code: '8013/3',
               },
               {
                 name: '复合型大细胞神经内分泌癌',
                 english: 'Combined large cell neuroendocrine carcinoma',
                 code: '8013/3',
               },
               {
                 name: '类癌',
                 english: 'Carcinoid tumors',
                 code: '',
                 child:[
                   {
                     name: '典型类癌',
                     english: ' Typical carcinoid tumor',
                     code: '8240/3',
                   },
                   {
                     name: '非典型类癌',
                     english: 'Atypical carcinoid tumor',
                     code: '8249/3',
                   },
                 ]
               },
               {
                 name: '侵袭前病变',
                 english: ' Preinvasive lesion ',
                 code: '',
                 child:[
                   {
                     name: '弥漫性特发性肺神经内分泌细胞增生',
                     english: 'Diffuse idiopathic pulmonary neuroendocrine cell hyperplasia ',
                     code: '8040/0',
                   },
                 ]
               },
               {
                 name: '大细胞癌',
                 english: 'Large cell carcinoma',
                 code: '8012/3',
               },
               {
                 name: '腺鳞癌',
                 english: 'Adenosquamous carcinoma',
                 code: '8560/3',
               },
               {
                 name: '多形性癌',
                 english: 'Pleomorphic carcinoma',
                 code: '8022/3',
               },
               {
                 name: '梭形细胞癌',
                 english: 'Spindle cell carcinoma',
                 code: '8032/3',
               },
               {
                 name: '巨细胞癌',
                 english: ' Giant cell carcinoma',
                 code: '8031/3',
               },
               {
                 name: '癌肉瘤',
                 english: ' Carcinosarcoma',
                 code: '8980/3',
               },
               {
                 name: '其他未分类癌',
                 english: 'Other and Unclassified carcinomas',
                 code: '',
                 child:[
                   {
                     name: ' 淋巴上皮瘤样癌',
                     english: ' Lymphoepithelioma-like carcinoma',
                     code: '8082/3',
                   },
                   {
                     name: 'NUT癌',
                     english: 'NUT carcinoma',
                     code: '8023/3',
                   },
                 ]
               },
               {
                 name: '涎腺型肿瘤',
                 english: 'Salivary gland-type tumors',
                 code: '',
                 child:[
                   {
                     name: ' 黏液表皮样癌',
                     english: 'Mucoepidermoid carcinoma',
                     code: '8430/3',
                   },
                   {
                     name: '腺样囊性癌',
                     english: 'Adenoid cystic carcinoma',
                     code: '8200/3',
                   },
                   {
                     name: '上皮肌上皮癌',
                     english: 'Epithelial-myoepithelial carcinoma',
                     code: '8562/3',
                   },
                   {
                     name: '多形性腺瘤',
                     english: 'Pleomorphic adenoma',
                     code: '8940/0',
                   },
                 ]
               },
               {
                 name: '乳头状瘤',
                 english: 'Papillomas',
                 code: '',
                 child:[
                   {
                     name: ' 鳞状上皮乳头状瘤',
                     english: 'Papillomas',
                     code: '8430/3',
                     child:[
                       {
                         name: '  外生性',
                         english: 'Exophytic',
                         code: '8052/0',
                       },
                       {
                         name: '  内翻性',
                         english: ' Inverted',
                         code: '8053/0',
                       },
                     ]
                   },
                   {
                     name: '腺样乳头状瘤',
                     english: ' Glandular papilloma',
                     code: '8260/0',
                   },
                   {
                     name: '混合性鳞状细胞和腺样乳头状瘤',
                     english: ' Mixed squamous and glandular papilloma',
                     code: '8560/0',
                   },
                 ]
               },
             ]
           },

         ]
       },
       {
         name: '间叶性肿瘤',
         english: 'Mesenchymal tumors',
         code: '',
         child:[
           {
             name: '肺错构瘤',
             english: 'Pulmonary hamartoma ',
             code: '8992/0',
           },
           {
             name: '软骨瘤',
             english: 'Chondroma ',
             code: '9220/0',
           },
           {
             name: ' 血管周上皮样细胞肿瘤',
             english: 'PEComatous tumors ',
             code: '',
             child:[
               {
                 name: '淋巴管平滑肌瘤病',
                 english: 'Lymphangioleiomyomatosis',
                 code: '9174/1',
               },
               {
                 name: '血管周上皮样细胞肿瘤，良性',
                 english: ' PEComa, benign',
                 code: '8714/0',
                 child:[
                   {
                     name: '透明细胞瘤',
                     english: 'Clear cell tumor',
                     code: '8005/0',
                   },
                 ]
               },
               {
                 name: '血管周上皮样细胞肿瘤，恶性',
                 english: 'PEComa, malignant',
                 code: '8714/3',
               },
             ]
           },

         ]
       }
     ]
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  *{
    box-sizing: border-box;
  }
   span{
     display: inline-block;
     height: 30px;
     line-height: 30px;
     width: 290px;
   }
  .title1{
    display: inline-block;
    color: #000;
    font-weight: 700;
  }
   .title2{
     padding-left: 20px;
   }
  .title3{
    padding-left: 40px;
  }
  .title4{
    padding-left: 60px;
  }
  .title5{
    padding-left: 80px;
  }
  .english{
    width: 550px;
  }
  .code{
    width: 100px;
    text-align: center;
  }

</style>
