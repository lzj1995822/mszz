<template>
  <div>
    <el-form :model="form" label-width="160px" label-suffix=":" :rules="rules">
      <el-form-item>
        <h2>重点上访人员</h2>
      </el-form-item>
      <el-form-item v-for="(v,k,i) in prop" :key="i" :label="labels[i]" :prop="k" v-if="k!='tEKeyPID'">
        <el-select v-if="k=='activityCode'||k=='measuresCode'
          ||k=='economicSourceCode'||k=='steadyStateCode'||
          k=='steadyGradeCode'||k=='petitionTypeCode'||k=='petitionStatusCode'" v-model="form[k]">
          <template v-if="k=='petitionStatusCode'">
            <el-option v-for="(v,i) in PetitionStatus" :key="i" :value="v.value" :label="v.name"></el-option>
          </template>

          <template v-else-if="k=='activityCode'">
            <el-option v-for="(v,i) in ActivityType" :key="i" :value="v.activityTypeValue" :label="v.activityTypeName">
            </el-option>
          </template>

          <template v-else-if="k=='measuresCode'">
            <el-option v-for="(v,i) in MeasuresType" :key="i" :value="v.measuresTypeValue" :label="v.measuresTypeName">
            </el-option>
          </template>

          <template v-else-if="k=='economicSourceCode'">
            <el-option v-for="(v,i) in EconomicSourceType" :key="i" :value="v.economicSourceTypeValue" :label="v.economicSourceTypeName">
            </el-option>
          </template>

          <template v-else-if="k=='steadyStateCode'">
            <el-option v-for="(v,i) in SteadyStateType" :key="i" :value="v.steadyStateTypeValue" :label="v.steadyStateTypeName">
            </el-option>
          </template>

          <template v-else-if="k=='steadyGradeCode'">
            <el-option v-for="(v,i) in SteadyGradeType" :key="i" :value="v.steadyGradeTypeValue" :label="v.steadyGradeTypeName">
            </el-option>
          </template>
        </el-select>
        <el-input type="textarea" style="width:600px"
        v-else-if="k=='reasonsPetitionReasons'||k=='detailSituation'
        ||k=='treatmentDetailSituation'||k=='workCoordinationDetails'
        ||k=='talkEducationAdmonitionDetails'" v-model="form[k]"></el-input>
        <el-input v-else v-model="form[k]" style="width:400px"></el-input>
      </el-form-item>
       <el-row v-if="showButton">
          <el-col>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">{{usePath=='save'?'保存':'更新'}}</el-button>
              <!-- <el-button @click="onCancel">取消</el-button> -->
            </el-form-item>
          </el-col>
        </el-row>
    </el-form>
  </div>
</template>

<script>
  import * as api from "@/api/zonghezhili/duiwujianshe";
  import * as ckApi from "@/api/specialPopulation/index";
  export default {
    props: {
      form: Object,
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
        ckApi.hasThisPerson(certifID, '07').then(res => {
          if (res.data == false) {
            return callback(new Error("此人基本信息不存在，或已存在当前特殊信息！"));
          } else {
            callback();
          }
        });
      };
      return {
        ActivityType: [],
        MeasuresType: [],
        EconomicSourceType: [],
        SteadyGradeType: [],
        SteadyStateType: [],
        prop: {
          tEKeyPID: '',
          certifID: '',
          activityCode: '',
          measuresCode: '',
          economicSourceCode: '',
          steadyStateCode: '',
          steadyGradeCode: '',
          petitionTypeCode: '',
          petitionStatusCode: '',
          reasonsPetitionReasons: '',
          detailSituation: '',
          treatmentDetailSituation: '',
          workCoordinationDetails: '',
          talkEducationAdmonitionDetails: ''
        },
        PetitionStatus: [{
            name: '问题已解决',
            value: '1'
          },
          {
            name: '问题未解决',
            value: '2'
          }
        ],
        labels: ['信息主键编号', '公民身份证', '活跃度', '措施手段',
          '经济来源', '涉稳状态', '涉稳等级', '上访类型',
          '上访状态', '上访原因', '在位情况', '处理情况',
          '工作协调会', '谈话教育训诫等'
        ],
        rules: {
          certifID: [{
            validator: checkCertifId,
            trigger: "blur"
          }]
        }
      }
    },
    methods: {
      onSubmit() {
        if (this.usePath == "update") {
          ckApi.updateSpecialPerson(this.form, "07").then(res => {
            if (res.data == true) {
              this.$notify({
                title: "成功",
                message: "更新成功",
                type: "success"
              });
              this.$emit('closeDialog')
            } else {
              this.$notify({
                title: "失败",
                message: res.message,
                type: "success"
              });
            }
          });
        } else {
          ckApi.addSpecialPerson(this.form, '07').then(res => {
            if (res.data == true) {
              this.$notify({
                title: "成功",
                message: "保存成功",
                type: "success"
              });
              this.$emit('closeDialog')
            } else {
              this.$notify({
                title: "保存失败",
                message: res.message,
                type: "success"
              });
            }
          })
        }
      }
    },
    mounted() {
      api.fetchServedPersonManageTypes().then(res => {
        this.ActivityType = res.data.codeActivityType
        this.MeasuresType = res.data.codeMeasuresType
        this.EconomicSourceType = res.data.codeEconomicSourceType
        this.SteadyGradeType = res.data.codeSteadyGradeType
        this.SteadyStateType = res.data.codeSteadyStateType
      })
    }
  }
</script>

<style>

</style>




// WEBPACK FOOTER //
// src/components/ZzOrgManage/extendKeyPetitioners.vue?3b79d1b3