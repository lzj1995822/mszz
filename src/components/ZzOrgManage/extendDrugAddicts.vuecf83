<template>
  <div>
    <el-form ref="DrugAddicts" :model="DrugAddicts" :rules="rules" label-width="130px" label-position="right" label-suffix=":">
        <el-form-item>
          <h2>吸毒人员</h2>
        </el-form-item>
        <el-form-item label="身份证" prop="certifID">
          <el-input v-if="usePath=='update'" disabled v-model="DrugAddicts.certifID"></el-input>
          <el-input v-else v-model="DrugAddicts.certifID"></el-input>
        </el-form-item>
        <el-form-item label="吸毒初次被发现日期">
          <el-date-picker type="date" placeholder="选择日期" @change="FirstFoundDate" v-model="DrugAddicts.firstFoundDate"></el-date-picker>
        </el-form-item>
        <el-form-item label="管控类型">
          <el-select v-model="DrugAddicts.controlSituationTypeValue" placeholder="请选择管控类型">
            <el-option v-for="v of ControlSituationType" :key="v.id" :label="v.controlSituationTypeName" :value="v.controlSituationTypeValue">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管控人姓名">
          <el-input v-model="DrugAddicts.controlOfficerName"></el-input>
        </el-form-item>
        <el-form-item label="管控人联系方式">
          <el-input v-model="DrugAddicts.controlOfficerContact"></el-input>
        </el-form-item>
        <el-form-item label="帮扶情况">
          <el-input type="textarea" :rows="areaRows" v-model="DrugAddicts.helpingInf"></el-input>
        </el-form-item>
        <el-form-item label="帮扶人姓名">
          <el-input v-model="DrugAddicts.helperName"></el-input>
        </el-form-item>
        <el-form-item label="帮扶人联系方式">
          <el-input v-model="DrugAddicts.helperContact"></el-input>
        </el-form-item>
        <el-form-item label="是否有犯罪史">
          <el-radio-group v-model="DrugAddicts.isCrime">
              <el-radio :label="yes">是</el-radio>
              <el-radio :label="no">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="DrugAddicts.isCrime==1" label="犯罪情况描述">
          <el-input type="textarea" :rows="areaRows" v-model="DrugAddicts.crimeInf"></el-input>
        </el-form-item>
        <el-form-item v-if="DrugAddicts.isCrime==1" label="吸毒原因类型">
          <el-select v-model="DrugAddicts.drugReasonTypeValue" placeholder="吸毒原因类型">
            <el-option v-for="v of drugReasonType" :key="v.id" :label="v.drugReasonTypeName" :value="v.drugReasonTypeValue"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="DrugAddicts.isCrime==1" label="吸毒后果类型">
          <el-select v-model="DrugAddicts.drugResultTypeValue" placeholder="吸毒后果类型">
            <el-option v-for="v in drugResultType" :key="v.id" :label="v.drugResultTypeName" :value="v.drugResultTypeValue"></el-option>
          </el-select>
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
import * as api from "@/api/zonghezhili/duiwujianshe";
import * as ckApi from "@/api/specialPopulation";
export default {
  name: "DrugAddicts",
  props: {
    DrugAddicts: {
      type: Object,
      default: {}
    },
    ControlSituationType: {
      type: Array
    },
    drugReasonType: {
      type: Array
    },
    drugReasonType: {
      type: Array
    },
    drugResultType: {
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
      ckApi.hasThisPerson(certifID, "04").then(res => {
        if (res.data == false) {
          return callback(new Error("此人基本信息不存在，或已存在当前特殊信息！"));
        } else {
          callback();
        }
      });
    };
    return {
      yes: 1,
      no: 0,
      areaRows:4,
      rules: {
        certifID: [{ validator: checkCertifId, trigger: "blur" }]
      }
    };
  },
  methods: {
    FirstFoundDate(val){
      this.DrugAddicts.firstFoundDate = val
    },
    onSubmit() {
      if (this.usePath == "update") {
        ckApi.updateSpecialPerson(this.DrugAddicts, "04").then(res => {
          if (res.data == true) {
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success"
            });
          }else{
            this.$notify({
              title: "失败",
              message: res.message,
              type: "success"
            });
          }
        });
      } else {
        ckApi.addSpecialPerson(this.DrugAddicts,'04').then(res=>{
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


<style scoped>

</style>



// WEBPACK FOOTER //
// src/components/ZzOrgManage/extendDrugAddicts.vue?1533b56e