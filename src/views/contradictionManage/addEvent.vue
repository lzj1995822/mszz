<template>
  <div style="padding:20px">
    <el-row>
      <el-col :span="16">
        <el-form :model="form" label-width="180px" ref="form" :rules="rules" label-suffix=":">
          <el-form-item label="事件名称" prop="eventName">
            <el-input v-model="form.eventName"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="发生网格">
                <el-select placeholder="请选择网格" v-model="form.netGridID">
                  <el-option v-for="(v,i) of netGrid" :key="i" :value="v.netGridID" :label="v.netGridName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发生时间">
                <el-date-picker v-model="form.eventDate"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="发生地点">
            <el-input v-model="form.eventPlace"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="事件规模">
                <el-select placeholder="请选择事件规模" v-model="form.evenScaleTypeValue">
                    <el-option v-for="(v,i) of EventScale" :key="i" :value="v.eventScaleTypeValue" :label="v.eventScaleTypeName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="事件类型">
                <el-select placeholder="请选择事件类型" v-model="form.eventTypeValue">
                    <el-option v-for="(v,i) of EventType" :key="i" :label="v.eventTypeName" :value="v.eventTypeValue"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="涉及人数">
                <el-input-number :min="zero" v-model="form.numberofJoinning"></el-input-number>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item label="事件处理状态">
                <el-select v-model="form.eventStatus" placeholder="请选择事件处理状态">

                </el-select>
              </el-form-item>
            </el-col> -->
          </el-row>

          <el-form-item label="事件描述">
            <el-input type="textarea" v-model="form.eventIntroduction"></el-input>
          </el-form-item>
          <el-form-item label="涉及单位">
            <el-input type="textarea" v-model="form.relatedOrg"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="主要当事人证件编码">
                <el-select v-model="form.majorPersonCertTypeCode" placeholder="请输入主要当事人证件编码">
                    <el-option v-for="(v,i) of CertificateType" :key="i" :label="v.certificateTypeName" :value="v.certificateTypeValue"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="主要当事人证件号码">
                <el-input v-model="form.majorPersonCertID" placeholder="请输入主要当事人证件号码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="主要当事人姓名">
                <el-input style="width:160px" v-model="form.majorPersonName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="主要当事人性别">
                <el-radio-group v-model="form.majorPersonSex">
                  <el-radio :label="'1'">男</el-radio>
                  <el-radio :label="'0'">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="主要当事人学历">
                <el-select v-model="form.majorPersonEducation" placeholder="请选择学历">
                  <el-option v-for="v of EducationType" :key="v.id" :label="v.educationTypeName" :value="v.education"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="主要当事人民族">
                <el-select v-model="form.majorPersonEthnicity" placeholder="请输入主要当事人民族">
                    <el-option v-for="(v,i) of EthnicityType" :key="i" :label="v.ethnicityName" :value="v.ethnicity"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="主要当事人人员类型">
                <el-select v-model="form.majorPersonType" placeholder="主要当事人人员类型">
                  <el-option v-for="(v,i) of MajorPersonType" :key="i" :value="v.majorPersonTypeValue" :label="v.majorPersonTypeName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="主要当事人居住详细地址">
                <el-input type="textarea" v-model="form.majorPersonDetailAddress">

                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="化解时限">
                <el-date-picker v-model="form.solvingDeadline" placeholder="请输入化解时限"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="请选择化解方式">
                <el-select v-model="form.solvingMethodType" placeholder="请选择化解方式">
                  <el-option v-for="(v,i) of SolvingMethodType" :key="i" :label="v.solvingMethodTypeName" :value="v.solvingMethodTypeValue"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="化解组织">
            <el-input type="textarea" v-model="form.solvingManagment"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="化解责任人姓名">
                <el-input v-model="form.solvingByPersonName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="化解人责任人联系方式">
                <el-input v-model="form.solvingByPersonContact"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="化解是否成功">
            <el-radio-group v-model="form.isSuccessInSolving">
              <el-radio :label="1">成功</el-radio>
              <el-radio :label="0">失败</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="化解情况">
            <el-input v-model="form.solvingIntroduction" type="textarea" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="考评日期">
            <el-date-picker v-model="form.evaluationDate" placeholder=""></el-date-picker>
          </el-form-item>
          <el-form-item label="考评意见">
            <el-input v-model="form.evaluationSuggestion" type="textarea" placeholder=""></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="事发经度">
                <el-input v-model="form.longitude"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="事发纬度">
                <el-input v-model="form.latitude"></el-input>
              </el-form-item>
            </el-col>
            <el-form-item align="center">
                <el-button type="primary" @click="update()">更新</el-button>
                <el-button type="warning" @click="$router.push('branchEvents')">返回</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as api from "@/api/zonghezhili/duiwujianshe";
import * as api2 from "@/api/contradictionManage";
import { formatDateTime } from "@/utils/index";

export default {
  data() {
    return {
      step: 1,
      zero: 0,
      yes: 1,
      no: 0,
      fileList: [],
      form: {
        disputeEventID: "", //       bigint not null auto_increment,
        eventName: "", //             '事件名称',
        eventDate: "", //             '事件发生日期',
        eventPlace: "", //            '事件发生地点',
        evenScaleTypeValue: "", //    '事件规模',
        eventTypeValue: "", //        '事件类型编码',
        numberofJoinning: "", //      '涉及人数',
        eventIntroduction: "", //     '事件简述，不超2000字',
        relatedOrg: "", //            '涉及单位',
        majorPersonCertTypeCode: "", //'主要当事人证件代码类型，编码规范GA/T 517',
        majorPersonCertID: "", //     '主要当事人证件号码',
        majorPersonName: "", //       char(80),
        majorPersonSex: "", //        '主要当事人性别，编码符合GB/T 2261.1',
        majorPersonEthnicity: "", //  '主要当事人名族类别，详细见字典表',
        majorPersonEducation: "", //  '主要当事人学历类别，编码见表',
        majorPersonType: "", //       '主要当事人人员类别',
        majorPersonDetailAddress: "", //  '主要当事人居住详细地址',
        solvingDeadline: "", //      '化解时限',
        solvingMethodType: "", //    '化解方式，编码见 GBT 31000-2015文件之5.58',
        solvingManagment: "", //     '化解组织',
        solvingByPersonName: "", //   '化解责任人姓名',
        solvingByPersonContact: "", //'化解责任人联系方式，手机号或固定电话',
        isSuccessInSolving: "", //   '化解是否成功？值1表示成功，0表示不成功。',
        solvingIntroduction: "", //  '化解情况，不超2000字',
        evaluationDate: "", //       '考评日期，格式为YYYYMMDD',
        evaluationSuggestion: "", // '考评意见，不超2000字。',
        longitude: "", //            '地理经度信息，数字32，8',
        latitude: "", //             '地理纬度信息',
        eventStatus: "", //          '事件处理状态编码类型，见编码状态类型表',
        netGridID: 1
      },
      EventScale: [],
      EventType: [],
      MajorPersonType: [],
      SolvingMethodType: [],
      EducationType: [],
      EthnicityType: [],
      netGrid: [],
      CertificateType:[],
      rules: {
        eventName: [{ required: true, message: "请输入事件名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    update(){
        api2.updateDisputeEvent(this.form).then(res=>{
            if(res.code==200){
                this.$message({
                    type:'success',
                    message:'更新成功！'
                })
            }
        })
    },
    goNext() {
      if(this.form.eventDate!=='')
        this.form.eventDate = formatDateTime(this.form.eventDate)
      if (this.step == 1) {
        this.$refs["form"].validate(valid => {
          if (valid) {
            api2.insertDisputeEvent(this.form).then(res => {
              if (res.code == 200) {
                this.step = 2;
                this.form.disputeEventID = res.data;
                this.$message({
                  message: "保存成功！"
                });
              }
            });
          } else {
            return false;
          }
        });
      }
    },
    submit() {
      this.$router.push("/DisputeeventUp");
    },
    getAllCode() {
      api.fetchServedPersonManageTypes().then(res => {
        this.EventScale = res.data.codeEventScaleType;
        this.EventType = res.data.codeEventType;
        this.MajorPersonType = res.data.codeMajorPersonType;
        this.SolvingMethodType = res.data.codeSolvingMethodType;
        this.EducationType = res.data.codeEducationTypeMapper; // 学历
        this.EthnicityType = res.data.codeEthnicityType;
        this.CertificateType = res.data.codeCertificateType
        this.netGrid = res.data.netGrid;
      });
    }
  },
  mounted() {
    this.getAllCode();
    let id = this.$route.query.id
    api2.getDisputeBasicDetailToUpdate(id).then(res=>{
        this.form = res.data
        this.form.majorPersonEthnicity = parseInt(this.form.majorPersonEthnicity)
    })
  }
};
</script>

<style scoped>
.userInfoEditTable,
.userInfoEditTable td {
  border: 1px solid darkgrey;
  padding: 10px;
}

.tb_label {
  width: 12%;
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
// src/views/contradictionManage/addEvent.vue?dfbaeae0