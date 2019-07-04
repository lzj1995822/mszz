<template>
    <div>
        <el-form ref="form" :rules="rules" :model="severePsychoticForm" label-width="160px">
            <el-form-item>
                <h2>严重精神病患者</h2>
            </el-form-item>
            <el-form-item label="身份证号" prop="certifID">
              <el-input v-if="usePath=='update'" disabled v-model="severePsychoticForm.certifID"></el-input>
              <el-input v-else v-model="severePsychoticForm.certifID"></el-input>
            </el-form-item>
            <el-form-item label="家庭经济状况类型编码">
                <el-select v-model="severePsychoticForm.familyEconomicSituationTypeValue">
                    <el-option v-for="v of EconomicSituationType" :key="v.id" :label="v.familyEconomicSituationTypeName" :value="v.familyEconomicSituationTypeValue"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否纳入低保">
                <el-radio-group v-model="severePsychoticForm.isSubsistenceAllowances">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="监护人身份证">
                <el-input v-model="severePsychoticForm.guardianCertifID"></el-input>
            </el-form-item>
            <el-form-item label="监护人姓名">
                <el-input v-model="severePsychoticForm.guardianName"></el-input>
            </el-form-item>
            <el-form-item label="监护人联系方式">
                <el-input v-model="severePsychoticForm.guardianContact"></el-input>
            </el-form-item>
            <el-form-item label="初次发病日期">
                <el-date-picker type="date" placeholder="选择日期" @change="PrimaryAttackDate" v-model="severePsychoticForm.primaryAttackDate"></el-date-picker>
            </el-form-item>
            <el-form-item label="当前诊断类型编码">
                <el-select v-model="severePsychoticForm.currentDiagnosisTypeValue">
                    <el-option v-for="v of currentDiagnosisType"
                    :label="v.currentDiagnosisTypeName" :value="v.currentDiagnosisTypeValue" :key="v.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否有肇事肇祸历史">
                <el-radio-group v-model="severePsychoticForm.isTroublemaking">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="肇事肇祸次数">
                <el-input-number v-model="severePsychoticForm.troublemakingNumber" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="上一次肇事肇祸时间">
                <el-date-picker type="date" placeholder="选择日期" @change="LastTroublemakingDate" v-model="severePsychoticForm.lastTroublemakingDate" ></el-date-picker>
            </el-form-item>
            <el-form-item label="危险评估等级类型编码">
                <el-select v-model="severePsychoticForm.dangerousEvaulationLevelTypeValue">
                    <el-option v-for="v of dangerousEvaulationLevelType"
                    :key="v.id" :label="v.dangerousEvaulationLevelTypeName" :value="v.dangerousEvaulationLevelTypeValue"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="治疗情况类型编码">
                <el-select v-model="severePsychoticForm.treatmentSituationTypeValue">
                    <el-option v-for="v of treatmentSituationType"
                    :label="v.treatmentSituationTypeName" :value="v.treatmentSituationTypeValue" :key="v.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="治疗医院名称">
                <el-input v-model="severePsychoticForm.treatmentHospitalName"></el-input>
            </el-form-item>
            <el-form-item label="接受康复训练机构名称">
                <el-input v-model="severePsychoticForm.recoverOrganization"></el-input>
            </el-form-item>

            <el-row v-if="showButton">
                <el-col>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">{{usePath=='save'?"保存":"更新"}}</el-button>
                        <!-- <el-button @click="onCancel">取消</el-button> -->
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
import * as ckApi from "@/api/specialPopulation";
export default {
  props: {
    severePsychoticForm: {
      type: Object
    },
    EconomicSituationType: {
      type: Array
    },
    currentDiagnosisType: {
      type: Array
    },
    dangerousEvaulationLevelType: {
      type: Array
    },
    treatmentSituationType: {
      type: Array
    },
    showButton: {
      type: Boolean,
      default: true
    },
    usePath: {
      type: String,
      default: "save"
    }
  },
  data() {
    var checkCertifId = (rule, certifID, callback) => {
      ckApi.hasThisPerson(certifID,'03').then(res => {
        if (res.data == false) {
          return callback(new Error("此人基本信息不存在，或已存在当前特殊信息！"));
        } else {
          callback();
        }
      });
    };
    return {
      rules: {
        certifID: [{ validator: checkCertifId, trigger: "blur" }]
      }
    };
  },
  methods: {
    PrimaryAttackDate(val){
        this.severePsychoticForm.primaryAttackDate = val
    },
    LastTroublemakingDate(val){
        this.severePsychoticForm.lastTroublemakingDate = val
    },
    onSubmit() {
      if (this.usePath == "update") {
        ckApi.updateSpecialPerson(this.severePsychoticForm, "03").then(res => {
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
      } else {
        ckApi.addSpecialPerson(this.severePsychoticForm,'03').then(res=>{
          if (res.data == true) {
            this.$notify({
              title: "成功",
              message: "保存成功",
              type: "success"
            });
          } else {
            this.$notify({
              title: "保存失败",
              message: res.message,
              type: "success"
            });
          }
        })
      }
    },
    onCancel() {}
  }
};
</script>



// WEBPACK FOOTER //
// src/components/ZzOrgManage/extendSeverePsychotic.vue?40ce5e2e