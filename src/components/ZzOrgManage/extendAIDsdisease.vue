<template>
  <div>
    <el-form ref="DrugAddicts" :model="AIDSdisease" :rules="rules" label-width="150px" label-position="right" label-suffix=":">
      <el-form-item>
        <h2>艾滋病感染者</h2>
      </el-form-item>
      <el-form-item label="身份证" prop="certifID">
        <el-input v-if="usePath=='update'" disabled v-model="AIDSdisease.certifID"></el-input>
        <el-input v-else v-model="AIDSdisease.certifID"></el-input>
      </el-form-item>
      <el-form-item label="感染途径类型编码">
        <el-select v-model="AIDSdisease.infectedWayTypeValue" placeholder="请选择案件类型编码">
          <el-option v-for="v of InfectedWayType" :key="v.id" :label="v.infectedWayTypeName" :value="v.infectedWayTypeValue">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="艾滋病关注类型编码">
        <el-select v-model="AIDSdisease.aidsattentionTypeValue" placeholder="请选择艾滋病关注类型编码">
          <el-option v-for="v of AIDSAttentionType" :key="v.id" :label="v.aidsattentionTypeName" :value="v.aidsattentionTypeValue">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="帮扶人姓名">
        <el-input v-model="AIDSdisease.helperName"></el-input>
      </el-form-item>

      <el-form-item label="帮扶人联系方式">
        <el-input v-model="AIDSdisease.helperContact"></el-input>
      </el-form-item>

      <el-form-item label="帮扶情况">
        <el-input type="textarea" :rows="areaRows" v-model="AIDSdisease.helpingInf"></el-input>
      </el-form-item>

      <el-form-item label="是否有犯罪史">
        <el-radio-group v-model="AIDSdisease.isCrime">
          <el-radio :label="yes">是</el-radio>
          <el-radio :label="no">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-if="AIDSdisease.isCrime==1" label="犯罪情况描述">
        <el-input type="textarea" :rows="areaRows" v-model="AIDSdisease.crimeInf"></el-input>
      </el-form-item>
      <el-form-item v-if="AIDSdisease.isCrime==1" label="案件类型">
        <el-select v-model="AIDSdisease.caseType" placeholder="请选择案件类型">
          <el-option v-for="v of CaseType" :key="v.id" :label="v.caseTypeName" :value="v.caseTypeValue"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="艾滋病收治情况类型">
        <el-select v-model="AIDSdisease.aidsreceiveCTypeValue" placeholder="请选择艾滋病收治情况类型编码">
          <el-option v-for="v of AIDSReceiveCType" :key="v.id" :label="v.aidsreceiveCTypeName" :value="v.aidsreceiveCTypeValue">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="收治机构名称">
        <el-input v-model="AIDSdisease.receiveCOrganization"></el-input>
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
  props: {
    AIDSdisease: {
      type: Object,
      default: {}
    },
    InfectedWayType: {
      type: Array
    },
    AIDSAttentionType: {
      type: Array
    },
    AIDSReceiveCType: {
      type: Array
    },
    CaseType: {
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
      ckApi.hasThisPerson(certifID,'05').then(res => {
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
      areaRows: 5,
      rules: {
        certifID: [{ validator: checkCertifId, trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit() {
      if (this.usePath == "update") {
        ckApi.updateSpecialPerson(this.AIDSdisease, "05").then(res => {
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
       ckApi.addSpecialPerson(this.AIDSdisease,'05').then(res=>{
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
// src/components/ZzOrgManage/extendAIDsdisease.vue?469b8023