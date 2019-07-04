<template>
  <div style="margin-left:1%">
      <el-form :model="MyForm" label-width="160px" :rules="rules">
          <el-form-item>
                <h2>重点青少年</h2>
          </el-form-item>
          <el-form-item v-for="(v,k,i) of props" :key="i" :label="Labels[i]" :prop="k"  v-if="k!=='keyYoungersID'">
              <el-select v-if="k=='populationTypeValue'||k=='familySituationTypeValue'||k=='relatedtoGuardianTypeValue'||k=='helpingSolutionTypeValue'" v-model="MyForm[k]">
                <template v-if="k=='populationTypeValue'">
                    <el-option v-for="v1 of PopulationType" :key="v1.populationTypeValue" :value="v1.populationTypeValue" :label="v1.populationTypeName"></el-option>
                </template>
                <template v-else-if="k=='familySituationTypeValue'">
                    <el-option v-for="v1 of FamilySituationType" :key="v1.familySituationTypeValue" :value="v1.familySituationTypeValue" :label="v1.familySituationTypeName"></el-option>
                </template>
                <template v-else-if="k=='helpingSolutionTypeValue'">
                    <el-option v-for="v1 of HelpingSolutionType" :key="v1.helpingSolutionTypeValue" :value="v1.helpingSolutionTypeValue" :label="v1.helpingSolutionTypeName"></el-option>
                </template>
                <template v-else-if="k=='relatedtoGuardianTypeValue'">
                    <el-option v-for="v1 of RelatedtoGuardianType" :key="v1.relatedtoGuardianTypeValue" :value="v1.relatedtoGuardianTypeValue" :label="v1.relatedtoGuardianTypeName"></el-option>
                </template>
              </el-select>
              <el-input type="textarea" v-else-if="k=='crimeInf'||k=='helpingInf'" v-model="MyForm[k]"></el-input>
              <el-radio-group v-else-if="k=='isCrime'" v-model="MyForm[k]">
                  <el-radio-button label="1">是</el-radio-button>
                  <el-radio-button label="0">否</el-radio-button>
              </el-radio-group>
              <el-input v-else-if="k=='certifID'&&usePath=='update'" disabled v-model="MyForm[k]" style="width:400px"></el-input>
              <el-input v-else v-model="MyForm[k]" style="width:400px">
              </el-input>
          </el-form-item>

          <el-row v-if="showButton==true">
            <el-col>
              <el-form-item>
                <el-button type="primary" @click="add">{{usePath=='save'?"保存":"更新"}}</el-button>
                <el-button type="warning" @click="$router.push('/keyYoungerManager')">返回</el-button>
              </el-form-item>
            </el-col>
          </el-row>
      </el-form>
  </div>
</template>

<script>
import * as ckApi from "@/api/specialPopulation";
import * as api from "@/api/zonghezhili/duiwujianshe";

export default {
  props: {
    MyForm: {
      type: Object
      // default: {},
    },
    usePath: {
      type: String,
      default: "save"
    },
    showButton: {
      type: Boolean,
      default: true
    }
  },
  data() {
    var checkCertifId = (rule, certifID, callback) => {
      ckApi.hasThisPerson(certifID, "03").then(res => {
        if (res.data == false) {
          return callback(
            new Error("此人基本信息不存在，或已存在当前特殊信息！")
          );
        } else {
          callback();
        }
      });
    };
    return {
      rules: {
        certifID: [{ validator: checkCertifId, trigger: "blur" }]
      },
      props: {
        keyYoungersID: "", //             int not null auto_increment,
        certifID: "", //                  '身份证号. 编码应符合GB 11643',
        populationTypeValue: "", //       '人员类型，编码见GBT 31000-2015文件之5.41',
        familySituationTypeValue: "", //  '家庭情况，编码见GBT 31000-2015文件之5.42',
        guardianCertifID: "", //          '监护人身份证号. 编码应符合GB 11643',
        guardianName: "", //                varchar(50),
        relatedtoGuardianTypeValue: "", // '与监护人关系，编码见GB/T 4761',
        guardianContact: "", //            '监护人联系方式，手机号码或固定电话号码',
        guardianAddressDetail: "", //      '监护人居住地详细地址',
        isCrime: "", //                    '是否犯罪？0表示没有，1表示是',
        crimeInf: "", //                   '违法犯罪情况',
        helperName: "", //                 '帮扶人姓名',
        helperContact: "", //              '帮扶人联系方式，手机号码或固定电话号码',
        helpingSolutionTypeValue: "", //   '帮扶手段类型编码，见GBT 31000-2015文件之5.43',
        helpingInf: "" //                  '帮扶情况',
      },
      Labels: [
        "编号",
        "身份证",
        "人员类型",
        "家庭情况",
        "监护人身份证号",
        "监护人姓名",
        "与监护人关系",
        "监护人联系方式",
        "监护人居住地详细地址",
        "是否犯罪",
        "违法犯罪情况",
        "帮扶人姓名",
        "帮扶人联系方式",
        "帮扶手段类型",
        "帮扶情况"
      ],
      PopulationType: [],
      FamilySituationType: [],
      HelpingSolutionType: [],
      RelatedtoGuardianType: []
    };
  },
  methods: {
    add() {
      if (this.usePath == "save") {
        ckApi.addSpecialPerson(this.MyForm, "06").then(res => {
          if (res.data) {
            this.$message({
              type: "success",
              message: "添加成功!"
            });
          } else {
            this.$message({
              type: "success",
              message: "添加失败!"
            });
          }
        });
      } else {
        ckApi.updateSpecialPerson(this.MyForm, "06").then(res => {
          if (res.data == true) {
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success"
            });
          } else {
            this.$notify({
              title: "失败",
              message: res.message,
              type: "success"
            });
          }
        });
      }
    }
  },
  mounted() {
    api.fetchServedPersonManageTypes().then(res => {
      this.PopulationType = res.data.codePopulationType;
      this.FamilySituationType = res.data.codeFamilySituationType;
      this.HelpingSolutionType = res.data.codeHelpingSolutionType;
      this.RelatedtoGuardianType = res.data.codeRelatedtoGuardianType;
    });
  }
};
</script>

<style scoped>
</style>




// WEBPACK FOOTER //
// src/components/ZzOrgManage/keyYoungForm.vue?bec5a12e