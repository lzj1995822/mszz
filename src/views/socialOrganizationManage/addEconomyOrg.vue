<template>
  <div>
      <el-row style="padding:20px;margin-top:20px">
        <el-col :span="24">
          <el-steps :active="step" style="margin-left:20%;font-size:39px;cursor:pointer;">
                <el-step title="步骤 1" style="text-align:center" icon="edit" description="添加企业的基本信息">
                </el-step>
                <el-step title="步骤 2" icon="upload" description="添加图片">
                </el-step>
            </el-steps>
        </el-col>
        <el-col v-if="step==1" :span="18" style="margin-top:30px;margin-left:200px">
           <el-form :model="form" :rules="rules" ref="form" label-width="200px" label-suffix="：">
              <el-form-item label="统一社会信用代码" prop="enterpriseUSCcode">
                <el-input style="width:300px" v-model="form.enterpriseUSCcode"></el-input>
              </el-form-item>
              <el-form-item label="企业名称" prop="enterpriseName">
                <el-input style="width:300px" v-model="form.enterpriseName"></el-input>
              </el-form-item>
              <el-form-item label="企业地址" prop="enterpriseAddress">
                <el-input style="width:300px" v-model="form.enterpriseAddress"></el-input>
              </el-form-item>
              <el-form-item label="行政区划代码" prop="regionalismCode">
                <v-distpicker @selected="getValue"></v-distpicker>
              </el-form-item>
              <el-form-item label="所属网格">
                <el-select v-model="form.netGridID">
                  <el-option v-for="v in GridID" :value="v.netGridID" :label="v.netGridName" :key="v.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="企业员工数量">
                <el-input-number style="width:300px" :min="0" :max="Number.max" v-model="form.enterpriseMemberNumber"></el-input-number>
              </el-form-item>
              <el-form-item label="治保负责人姓名">
                <el-input style="width:300px" v-model="form.securityLeaderName"></el-input>
              </el-form-item>
              <el-form-item label="是否危化企业">
                <el-radio-group v-model="form.isDangeriousEnterprise">
                  <el-radio-button :label="1">是</el-radio-button>
                  <el-radio-button :label="0">否</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="关注程度">
                <el-select v-model="form.attentionTypeValue">
                  <el-option v-for="v in AttentionType" :key="v.id" :value="v.attentionTypeValue" :label="v.attentionTypeName"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否有中共党组织">
                  <el-radio-group v-model="form.hasCPC">
                  <el-radio-button :label="1">是</el-radio-button>
                  <el-radio-button :label="0">否</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="中共党员数量" v-if="form.hasCPC==1">
                <el-input-number :min="0" v-model="form.numberofCPCMember"></el-input-number>
              </el-form-item>
              <el-form-item label="是否有工会">
                  <el-radio-group v-model="form.hasLabourUnion">
                  <el-radio-button :label="1">是</el-radio-button>
                  <el-radio-button :label="0">否</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="工会成员数量" v-if="form.hasLabourUnion==1">
                <el-input-number style="width:300px" :min="0" v-model="form.numberofLUMember"></el-input-number>
              </el-form-item>
              <el-form-item label="是否有妇联">
                <el-radio-group v-model="form.hasWomenFederation">
                  <el-radio-button :label="1">是</el-radio-button>
                  <el-radio-button :label="0">否</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="妇女数量" v-if="form.hasWomenFederation">
                <el-input-number style="width:300px" :min="0" v-model="form.numberofWomen"></el-input-number>
              </el-form-item>
              <el-form-item label="企业类别">
                <el-select v-model="form.enterpriseTypeValue">
                  <el-option v-for="v in EnterpriseType" :key="v.id" :label="v.enterpriseTypeName" :value="v.enterpriseTypeValue"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="业务范围">
                  <el-input style="width:300px" type="textarea" v-model="form.businessScope"></el-input>
              </el-form-item>
              <el-form-item label="企业联系方式">
                <el-input style="width:300px" v-model="form.enterpriseContact"></el-input>
              </el-form-item>
              <el-form-item label="法定代表人姓名">
                <el-input style="width:300px" v-model="form.enterpriseLeaderName"></el-input>
              </el-form-item>
              <el-form-item label="法定代表人证件代码">
                <el-select v-model="form.enterpriseLeaderCertTypeValue">
                  <el-option v-for="v in LeaderCertType" :key="v.id" :label="v.enterpriseLeaderCertTypeName" :value="v.enterpriseLeaderCertTypeValue"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="法定代表人证件号码">
                <el-input style="width:300px" v-model="form.enterpriseLeaderCertID"></el-input>
              </el-form-item>
              <el-form-item label="法定代表人联系方式">
                <el-input style="width:300px" v-model="form.enterpriseLeaderContact"></el-input>
              </el-form-item>
              <el-form-item label="治保负责人联系方式">
                <el-input style="width:300px" v-model="form.securityLeaderContact"></el-input>
              </el-form-item>

              <el-form-item label="董事长身份证">
                <el-input style="width:300px" v-model="form.chairmanCertID"></el-input>
              </el-form-item>
              <el-form-item label="董事长姓名">
                <el-input style="width:300px" v-model="form.chairmanName"></el-input>
              </el-form-item>
              <el-form-item label="董事长联系电话">
                <el-input style="width:300px" v-model="form.chairmanContact"></el-input>
              </el-form-item>
              <el-form-item label="总经理身份证号">
                <el-input style="width:300px" v-model="form.generalManagerCertID"></el-input>
              </el-form-item>
              <el-form-item label="总经理姓名">
                <el-input style="width:300px" v-model="form.generalManagerName"></el-input>
              </el-form-item>
              <el-form-item label="总经理联系方式">
                <el-input style="width:300px" v-model="form.generalManagerContact"></el-input>
              </el-form-item>



              <el-form-item label="安全隐患类型">
                <el-select v-model="form.hiddenDangerTypeValue">
                  <el-option v-for="v in HiddenDangerType" :key="v.id" :value="v.hiddenDangerTypeValue" :label="v.hiddenDangerTypeName"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="否具备建立中共党组织条件">
                <el-radio-group v-model="form.isCanConstructCPC">
                  <el-radio-button :label="1">是</el-radio-button>
                  <el-radio-button :label="0">否</el-radio-button>
                </el-radio-group>
              </el-form-item>
                <el-form-item label="是否有共青团">
                <el-radio-group v-model="form.hasCYL">
                  <el-radio-button :label="1">是</el-radio-button>
                  <el-radio-button :label="0">否</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="共青团员数量" v-if="form.hasCYL">
                <el-input-number style="width:300px" :min="0" v-model="form.numberofLCYLMember"></el-input-number>
              </el-form-item>
              <el-form-item label="经度">
                <el-input style="width:300px" v-model="form.longitude" placeholder="请输入经度"></el-input>
              </el-form-item>
              <el-form-item label="纬度">
                <el-input style="width:300px" v-model="form.latitude" placeholder="请输入纬度"></el-input>
              </el-form-item>
             <el-row>
               <el-col :span="20">
                 <el-form-item>
                  <el-button type="warning" @click="resetForm('form')">重置</el-button>
                  <el-button type="primary" @click="saveForm('form')">保存</el-button>
                 </el-form-item>
               </el-col>
             </el-row>
           </el-form>
        </el-col>
        <el-col v-else-if="step==2" style="margin-top:30px;" :span="18">
          <div style="margin-left:25%">
            <h4>企业图片上传（支持多图）</h4>
            <el-upload
               class="upload-demo"
              :action="getDomian()+'/msmis/api/Nonpublic/uploadEnterprisePicture?code='+form.enterpriseUSCcode"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :headers="header"
              :file-list="fileList2"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </el-col>
        <el-col :span="24">
            <div class="preDiv">
                <i v-if="step!=1" class="fa fa-angle-double-left fa-5x" @click="goPre()"></i>
                <div v-if="step!=1" class="directionFont" @click="goPre()">
                    上一步(继续添加信息)
                </div>
            </div>
            <div class="nextDiv">
                <i v-if="step!=2" class="fa fa-angle-double-right fa-5x" @click="goNext"></i>
                <div v-if="step!=2" class="directionFont" @click="goNext">
                    下一步(上传企业图片)
                </div>
                <i v-if="step==2" class="fa fa-history fa-5x" @click="submit"></i>
                <div v-if="step==2" class="directionFont" @click="submit">
                    完成
                </div>
            </div>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import * as api from "@/api/orgManage";
import VDistpicker from 'v-distpicker'
import { getToken } from '../../utils/auth';

export default {
  components:{
    VDistpicker
  },
  data() {
    var validateExist = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("统一代码不能为空!"));
      } else {
        api.getEcnonmyUpdateInfo(value).then(res => {
          if (res.code == 200 && res.data != null) {
            this.form = res.data;
            if(this.mytype=1){
              this.form.isKeyEnterprise = 0;
              this.form.isLogisticsEnterprise = 1;
            }else{
              this.form.isKeyEnterprise = 1;
              this.form.isLogisticsEnterprise = 0;
            }
            this.button = "更新";
          }
          callback();
        });
      }
    };
    return {
      header:{
        token:getToken()
      },
      mytype:2,
      flag: 0,
      button: "保存",
      step: 1,
      fileList2: [],
      dialogVisible: false,
      form: {
        enterpriseUSCcode: "", //'统一社会信用代码',
        enterpriseName: "", //'企业名称',
        netGridID: "",
        enterpriseTypeValue: "", //'企业类别，编码见GBT31000-2015， 5.44',
        enterpriseAddress: "", //'企业地址',
        regionalismCode:'',// varchar(6) DEFAULT NULL COMMENT '行政区划代码',
        enterpriseContact: "", //'企业联系方式，手机号码或固定电话',
        enterpriseMemberNumber: "", //,
        enterpriseLeaderCertTypeValue: "", //'法定代表人证件代码，符合GA/T 517',
        enterpriseLeaderCertID: "", //'法定代表人证件号码',
        enterpriseLeaderName: "", //'法定代表人姓名',
        enterpriseLeaderContact: "", // '法定代表人联系方式',
        securityLeaderCertID:'', // varchar(18) DEFAULT NULL COMMENT '保卫负责人身份证',
        securityLeaderName: "", //'治保负责人姓名',
        securityLeaderContact: "", //'治保负责人联系方式',
        chairmanCertID:'',// varchar(18) DEFAULT NULL COMMENT '董事长身份证号',
        chairmanName:'',// varchar(45) DEFAULT NULL COMMENT '董事长姓名',
        chairmanContact:'',// varchar(45) DEFAULT NULL COMMENT '董事长联系电话',
        generalManagerCertID:'',// varchar(45) DEFAULT NULL COMMENT '总经理身份证号',
        generalManagerName:'',// varchar(45) DEFAULT NULL COMMENT '总经理姓名',
        generalManagerContact:'',// varchar(45) DEFAULT NULL COMMENT '总经理联系方式',
        isDangeriousEnterprise: 0, //'是否危化企业？1表示是，0表示否',
        hiddenDangerTypeValue: "", //'安全隐患类型，编码见5.45',
        attentionTypeValue: "", //'关注程度，编码见5.46',
        isCanConstructCPC: 0, //'是否具备建立中共党组织条件？',
        hasCPC: 0, //'是否有中共党组织？',
        numberofCPCMember: "", //'中共党员数量',
        hasLabourUnion: 0, //'是否有工会？',
        numberofLUMember: "", //'工会成员数量',
        hasCYL: 0, //'是否有共青团？',
        numberofLCYLMember: "", //'共青团员数量',
        hasWomenFederation: 0, //'是否有妇联？',
        numberofWomen: "", //'妇女数量',
        longitude: "", //'地理经度信息',
        latitude: "", //'地理纬度信息',
        isLogisticsEnterprise: 0, //'是否物流企业？1=是，0=否',
        isKeyEnterprise: 0, //'是否重点企业？1=是，0=否。',
        businessScope: "" //'业务经营范围'
      },
      rules: {
        enterpriseUSCcode: [{ validator: validateExist, trigger: "blur" }],
        enterpriseName: [
          { required: true, message: "请输入企业名称", trigger: "blur" }
        ],
        enterpriseAddress: [
          { required: true, message: "请输入企业地址", trigger: "blur" }
        ]
      },
      EnterpriseType: [],
      LeaderCertType: [],
      HiddenDangerType: [],
      AttentionType: [],
      GridID: []
    };
  },
  methods: {
    getDomian(){
      return 'http://' + window.location.host;
    },
    getValue(e){
      this.form.regionalismCode = e.area.code
    },
    goPre() {
      if (this.step > 1) {
        this.step = this.step - 1;
      }
    },
    goNext() {
      if(this.flag==0||this.form.enterpriseUSCcode==''){
         this.$notify.error({
          title: '错误',
          message: '请先您保存基本信息，再添加图片信息！'
        });
        return
      }
      if (this.step < 2) {
        this.step = this.step + 1;
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submit() {
      this.$router.go(-1);
    },
    saveForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          api.addEconomyOrg(this.form).then(res => {
            if (res.data) {
              this.$message({
                type: "success",
                message: "添加成功!"
              });
              this.flag = 1
            } else {
               this.$message({
                  type: "error",
                  message: res.message
               });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  mounted() {
    api.getOrgCode().then(res => {
      this.EnterpriseType = res.data.codeEnterpriseType;
      this.LeaderCertType = res.data.codeDocumentType;
      this.HiddenDangerType = res.data.codeHiddenDangerType;
      this.AttentionType = res.data.codeAttentionTypeValue;
      this.GridID = res.data.netGrid;
    });
  }
};
</script>


<style scoped>
.preDiv {
  position: fixed;
  top: 300px;
  left: 10%;
  cursor: pointer;
  color: #58b7ff;
  text-align: center;
  /* margin-left: 10px; */
}
.nextDiv {
  position: fixed;
  top: 300px;
  right: 0;
  cursor: pointer;
  color: #58b7ff;
  text-align: center;
  margin-right: 10px;
}
</style>



// WEBPACK FOOTER //
// src/views/socialOrganizationManage/addEconomyOrg.vue?2b0e37e8