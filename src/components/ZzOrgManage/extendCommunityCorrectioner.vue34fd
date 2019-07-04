<template>
    <div>
        <el-form ref="form2" :rules="rules" :model="communityCorrectionerForm" label-width="150px">
            <el-form-item>
                <h2>社区矫正人员</h2>
            </el-form-item>
            <el-form-item label="身份证号" prop="certifID">
                <el-input v-if="usePath=='update'" disabled v-model="communityCorrectionerForm.certifID"></el-input>
                <el-input v-else v-model="communityCorrectionerForm.certifID"></el-input>
            </el-form-item>
            <el-form-item label="社区矫正人员编号">
                <el-input v-model="communityCorrectionerForm.communityCorrectionerCode"></el-input>
            </el-form-item>
            <el-form-item label="原来的羁押场所">
                <el-input v-model="communityCorrectionerForm.originalDetentionPlace"></el-input>
            </el-form-item>
            <el-form-item label="矫正类型编码">
                <el-select v-model="communityCorrectionerForm.correctingTypeValue">
                    <el-option v-for="v of CorrectingType" :key="v.id" :label="v.correctingTypeName" :value="v.correctingTypeValue">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="案件类别">
                <el-select v-model="communityCorrectionerForm.caseTypeValue">
                    <el-option v-for="v of CaseType" :key="v.id" :label="v.caseTypeName" :value="v.caseTypeValue">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="具体罪名">
                <el-input v-model="communityCorrectionerForm.concreteAccusation"></el-input>
            </el-form-item>
            <el-form-item label="原判刑期">
                <el-input v-model="communityCorrectionerForm.originalSentence"></el-input>
            </el-form-item>
            <el-form-item label="原判刑期起止时间">
                <el-col :span="4">
                    <el-date-picker type="date" placeholder="选择日期" @change="OriginalSentenceStartDate" v-model="communityCorrectionerForm.originalSentenceStartDate" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">
                    <div style="text-align: center">
                        -
                    </div>
                </el-col>
                <el-col :span="4">
                    <el-date-picker type="date" placeholder="选择日期" @change="OriginalSentenceEndDate" v-model="communityCorrectionerForm.originalSentenceEndDate" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="矫正起止时间">
                <el-col :span="4">
                    <el-date-picker type="date" placeholder="选择日期" @change="CorrectionStartDate" v-model="communityCorrectionerForm.correctionStartDate" style="width: 100%;"></el-date-picker>                </el-col>
                <el-col class="line" :span="2">
                    <div style="text-align: center">
                        -
                    </div>
                </el-col>
                <el-col :span="4">
                    <el-date-picker type="date" placeholder="选择日期" @change="CorrectionEndDate" v-model="communityCorrectionerForm.correctionEndDate" style="width: 100%;"></el-date-picker>
                    <!-- <input type="date" v-model="communityCorrectionerForm.correctionEndDate" /> -->
                </el-col>
            </el-form-item>
            <el-form-item label="接受方式编码">
                <el-select v-model="communityCorrectionerForm.acceptTypeValue">
                    <el-option v-for="v of AcceptType" :key="v.id" :label="v.acceptTypeName" :value="v.acceptTypeValue">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否是惯犯">
                <el-radio-group v-model="communityCorrectionerForm.isRecidivist">
                    <el-radio :label="yes">是</el-radio>
                    <el-radio :label="no">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否建立矫正小组">
                <el-radio-group v-model="communityCorrectionerForm.isCreatingCorrectionGroup">
                    <el-radio :label="yes">是</el-radio>
                    <el-radio :label="no">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="矫正小组成员编码">
                <el-select v-model="communityCorrectionerForm.groupMemberTypeValue">
                    <el-option v-for="v of GroupMemberType" :key="v.id" :label="v.groupMemberTypeName" :value="v.groupMemberTypeValue">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="矫正解除(终止)类型">
                <el-select v-model="communityCorrectionerForm.stopCorrectionTypeValue" placeholder="请选择">
                    <el-option v-for="item in StopCorrectionType" :key="item.value" :label="item.stopCorrectionTypeName" :value="item.stopCorrectionTypeValue">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否有脱管">
                <el-radio-group v-model="communityCorrectionerForm.isOutofControl">
                    <el-radio :label="yes">是</el-radio>
                    <el-radio :label="no">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="脱管原因">
                <el-input v-model="communityCorrectionerForm.reasonforOutofControl"></el-input>
            </el-form-item>
            <el-form-item label="检察监督脱管情况">
                <el-input v-model="communityCorrectionerForm.checkingOutofControl"></el-input>
            </el-form-item>
            <el-form-item label="脱管纠正情况">
                <el-input v-model="communityCorrectionerForm.correctingOutofControl"></el-input>
            </el-form-item>
            <el-form-item label="是否有漏管">
                <el-radio-group v-model="communityCorrectionerForm.isMissingControl">
                    <el-radio :label="yes">是</el-radio>
                    <el-radio :label="no">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="漏管原因">
                <el-input v-model="communityCorrectionerForm.reasonforMissingControl"></el-input>
            </el-form-item>
            <el-form-item label="检察监督漏管情况">
                <el-input v-model="communityCorrectionerForm.checkingMissingControl"></el-input>
            </el-form-item>
            <el-form-item label="漏管纠正情况">
                <el-input v-model="communityCorrectionerForm.correctingMissingControl"></el-input>
            </el-form-item>
            <el-form-item label="奖惩情况">
                <el-input v-model="communityCorrectionerForm.rewardandPunishment"></el-input>
            </el-form-item>
            <el-form-item label="惩罚变更">
                <el-input v-model="communityCorrectionerForm.changingPunishment"></el-input>
            </el-form-item>
            <el-form-item label="是否重新犯罪">
                <el-radio-group v-model="communityCorrectionerForm.isRecidivism">
                    <el-radio :label="yes">是</el-radio>
                    <el-radio :label="no">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="重新犯罪罪名">
                <el-input v-model="communityCorrectionerForm.recidivismCharge"></el-input>
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
    communityCorrectionerForm: {
      type: Object
    },
    CorrectingType: {
      type: Array
    },
    AcceptType: {
      type: Array
    },
    GroupMemberType: {
      type: Array
    },
    CaseType: {
      type: Array
    },
    StopCorrectionType: {
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
    var checkCertifId2 = (rule, certifID, callback) => {
      ckApi.hasThisPerson(certifID, "02").then(res => {
        if (res.data == false) {
          return callback(new Error("此人基本信息不存在，或已存在当前特殊信息！"));
        } else {
          callback();
        }
      });
    };
    return {
      rules: {
        certifID: [{ validator: checkCertifId2, trigger: "blur" }]
      },
      yes: 1,
      no: 0
    };
  },
  methods: {
    OriginalSentenceStartDate(val) {
      this.communityCorrectionerForm.originalSentenceStartDate = val;
    },
    OriginalSentenceEndDate(val) {
      this.communityCorrectionerForm.originalSentenceEndDate = val;
    },
    CorrectionStartDate(val) {
      this.communityCorrectionerForm.correctionStartDate = val;
    },
    CorrectionEndDate(val) {
      this.communityCorrectionerForm.correctionEndDate = val;
    },
    onSubmit() {
      if (this.usePath == "update") {
        ckApi.updateSpecialPerson(this.communityCorrectionerForm, "02").then(res => {
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
      }else{
        ckApi.addSpecialPerson(this.communityCorrectionerForm,'02').then(res=>{
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
// src/components/ZzOrgManage/extendCommunityCorrectioner.vue?88be8a56