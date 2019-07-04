<template>
  <div>
    <el-row style="padding:20px;margin-top:20px">
      <el-col :span="18">
        <el-form :model="form" :rules="rules" ref="form" label-width="200px" label-suffix="：">
          <el-row>
            <el-col :span="12">
              <el-form-item label="企业名称" prop="enterpriseName">
                <el-input v-model="form.enterpriseName"></el-input>
              </el-form-item>
              <el-form-item label="企业地址" prop="enterpriseAddress">
                <el-input v-model="form.enterpriseAddress"></el-input>
              </el-form-item>
              <el-form-item label="企业员工数量">
                <el-input-number :min="0" :max="Number.max" v-model="form.enterpriseMemberNumber"></el-input-number>
              </el-form-item>
              <el-form-item label="法定代表人姓名">
                <el-input v-model="form.enterpriseLeaderName"></el-input>
              </el-form-item>
              <el-form-item label="治保负责人姓名">
                <el-input v-model="form.securityLeaderName"></el-input>
              </el-form-item>
              <el-form-item label="治保负责人联系方式">
                <el-input v-model="form.securityLeaderContact"></el-input>
              </el-form-item>
              <el-form-item label="是否危化企业">
                <el-radio-group v-model="form.isDangeriousEnterprise">
                  <el-radio-button :label="1">是</el-radio-button>
                  <el-radio-button :label="0">否</el-radio-button>
                </el-radio-group>
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
              <el-form-item label="关注程度">
                <el-select v-model="form.attentionTypeValue">
                  <el-option v-for="v in AttentionType" :key="v.id" :value="v.attentionTypeValue" :label="v.attentionTypeName"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="经度">
                <el-input v-model="form.longitude" placeholder="请输入经度"></el-input>
              </el-form-item>
              <el-form-item label="纬度">
                <el-input v-model="form.latitude" placeholder="请输入纬度"></el-input>
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
                <el-input-number :min="0" v-model="form.numberofLUMember"></el-input-number>
              </el-form-item>
            </el-col>






            <el-col :span="12">
              <el-form-item label="统一社会信用代码">
                <el-input v-model="form.enterpriseUSCcode"></el-input>
              </el-form-item>
              <el-form-item label="行政区划代码">
                <v-distpicker @selected="getValue" :province="Area.province.Name" :city="Area.city.Name" :area="Area.area.Name"></v-distpicker>
              </el-form-item>
              <el-form-item label="企业类别">
                <el-select v-model="form.enterpriseTypeValue">
                  <el-option v-for="v in EnterpriseType" :key="v.id" :label="v.enterpriseTypeName" :value="v.enterpriseTypeValue"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="经营范围">
                <el-input type="textarea" v-model="form.businessScope"></el-input>
              </el-form-item>
              <el-form-item label="企业联系方式">
                <el-input v-model="form.enterpriseContact"></el-input>
              </el-form-item>
              <el-form-item label="法定代表人证件代码">
                <el-select v-model="form.enterpriseLeaderCertTypeValue">
                  <el-option v-for="v in LeaderCertType" :key="v.id" :label="v.enterpriseLeaderCertTypeName" :value="v.enterpriseLeaderCertTypeValue"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="法定代表人证件号码">
                <el-input v-model="form.enterpriseLeaderCertID"></el-input>
              </el-form-item>
              <el-form-item label="法定代表人联系方式">
                <el-input v-model="form.enterpriseLeaderContact"></el-input>
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
                <el-input-number :min="0" v-model="form.numberofLCYLMember"></el-input-number>
              </el-form-item>
              <el-form-item label="是否有妇联">
                <el-radio-group v-model="form.hasWomenFederation">
                  <el-radio-button :label="1">是</el-radio-button>
                  <el-radio-button :label="0">否</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="妇女数量" v-if="form.hasWomenFederation">
                <el-input-number :min="0" v-model="form.numberofWomen"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" align="center">
              <el-form-item>
                <el-button type="primary" @click="saveForm('form')">更新</el-button>
                <el-button type="warning" @click="$router.go(-1)">返回</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as api from "@/api/orgManage";
import VDistpicker from "v-distpicker";
import pca from "@/utils/pca";

export default {
  components: {
    VDistpicker
  },
  data() {
    return {
      Area: {
        province: { AreaCode: "", Name: "" },
        city: { AreaCode: "", Name: "" },
        area: { AreaCode: "", Name: "" }
      },
      form: {
        enterpriseUSCcode: "", //'统一社会信用代码',
        enterpriseName: "", //'企业名称',
        netGridID: "",
        enterpriseTypeValue: "", //'企业类别，编码见GBT31000-2015， 5.44',
        enterpriseAddress: "", //'企业地址',
        regionalismCode: "", // varchar(6) DEFAULT NULL COMMENT '行政区划代码',
        enterpriseContact: "", //'企业联系方式，手机号码或固定电话',
        enterpriseMemberNumber: "", //,
        enterpriseLeaderCertTypeValue: "", //'法定代表人证件代码，符合GA/T 517',
        enterpriseLeaderCertID: "", //'法定代表人证件号码',
        enterpriseLeaderName: "", //'法定代表人姓名',
        enterpriseLeaderContact: "", // '法定代表人联系方式',
        securityLeaderCertID: "", // varchar(18) DEFAULT NULL COMMENT '保卫负责人身份证',
        securityLeaderName: "", //'治保负责人姓名',
        securityLeaderContact: "", //'治保负责人联系方式',
        chairmanCertID: "", // varchar(18) DEFAULT NULL COMMENT '董事长身份证号',
        chairmanName: "", // varchar(45) DEFAULT NULL COMMENT '董事长姓名',
        chairmanContact: "", // varchar(45) DEFAULT NULL COMMENT '董事长联系电话',
        generalManagerCertID: "", // varchar(45) DEFAULT NULL COMMENT '总经理身份证号',
        generalManagerName: "", // varchar(45) DEFAULT NULL COMMENT '总经理姓名',
        generalManagerContact: "", // varchar(45) DEFAULT NULL COMMENT '总经理联系方式',
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
        enterpriseName: [
          {
            required: true,
            message: "请输入企业名称",
            trigger: "blur"
          }
        ],
        enterpriseAddress: [
          {
            required: true,
            message: "请输入企业地址",
            trigger: "blur"
          }
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
    getValue(e) {
      this.form.regionalismCode = e.area.code;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    saveForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          api.updateEconomyOrg(this.form).then(res => {
            if (res.data) {
              this.$message({
                type: "success",
                message: "更新成功!"
              });
            } else {
              this.$message({
                type: "error",
                message: "更新失败!"
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
    let queryID = this.$route.query.id;
    api.getEcnonmyUpdateInfo(queryID).then(res => {
      this.form = res.data;
      if (this.form.regionalismCode != null)
        this.Area = pca(this.form.regionalismCode);
    });
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

</style>



// WEBPACK FOOTER //
// src/views/socialOrganizationManage/editEconomyOrgInfo.vue?4212a098