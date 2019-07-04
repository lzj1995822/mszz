<template>
<div>
    <el-row style="margin-left:10%;margin-top:10px">
        <el-col :span="23">
            <el-steps :active="step" style="margin-left:10%;font-size:39px;cursor:pointer;">
                <el-step title="步骤 1" style="text-align:center" icon="edit" description="添加人员的基本信息">
                </el-step>
                <el-step title="步骤 2" icon="edit" description="添加人员的户籍信息">
                </el-step>
            </el-steps>
            <div  style="margin-top:30px">
                <div v-if="step==1">
                    <add-population style="width:95%" :form="form" v-on:sendImageUrlToParent='getImageUrl'></add-population>
                </el-tabs>
                </div>
                <div v-if="step==2" style="width:90%">
                    <div v-if="form.servedPersonTypeValue==='01'" style="width:80%;margin-left:5%">
                        <resident-form
                        :Resident="resident"
                        :ConsistforPersonHouseType="ConsistforPersonHouseType"
                        :showButton="false"></resident-form>
                    </div>
                    <div v-if="form.servedPersonTypeValue==='02'" style="width:80%;margin-left:5%">
                        <floating-population-form :floatingPopulation="floatingPopulation"
                        :HouseType="HouseType"
                        :CertificateType="CertificateType"
                        :FolatingReasonType="FolatingReasonType"
                        :UnSettledReasonType="UnSettledReasonType"
                        :showButton="false">
                        </floating-population-form>
                    </div>
                    <div v-if="form.servedPersonTypeValue==='03'" style="width:80%;margin-left:5%">
                        <stayed-person-form :StayedPerson="StayedPerson"
                        :ConsistforPersonHouseType="ConsistforPersonHouseType"
                        :StayedPersonType="StayedPersonType"
                        :HealthStatusType="HealthStatusType"
                        :showButton="false">
                        </stayed-person-form>
                    </div>
                    <div v-if="form.servedPersonTypeValue==='99'" style="width:80%;margin-left:5%">
                        <foreigner-person-form :Foreigner='foreignerForm'
                        :showButton="false">
                        </foreigner-person-form>
                    </div>
                </div>
                <div v-if="step==3">
                    <el-tabs style="width:90%" type="border-card">
                        <el-tab-pane label="基本信息">
                            <baisc-info-table :memberInfo='form' :imageUrl='imageUrl'></baisc-info-table>
                        </el-tab-pane>
                        <el-tab-pane label="户籍信息">
                            <div v-if="form.servedPersonTypeValue==='01'" style="width:80%;margin-left:5%">
                                <resident-form :Resident="resident"
                                :ConsistforPersonHouseType="ConsistforPersonHouseType"
                                :showButton="false"></resident-form>
                            </div>
                            <div v-if="form.servedPersonTypeValue==='02'" style="width:80%;margin-left:5%">
                                <floating-population-form :floatingPopulation="floatingPopulation"
                                :HouseType="HouseType"
                                :CertificateType="CertificateType"
                                :FolatingReasonType="FolatingReasonType"
                                :UnSettledReasonType="UnSettledReasonType"
                                :showButton="false">
                                </floating-population-form>
                            </div>
                            <div v-if="form.servedPersonTypeValue==='03'" style="width:80%;margin-left:5%">
                                <stayed-person-form :StayedPerson="StayedPerson"
                                :ConsistforPersonHouseTypes="ConsistforPersonHouseType"
                                :StayedPersonType="StayedPersonType"
                                :HealthStatusType="HealthStatusType"
                                :showButton="false">
                                </stayed-person-form>
                            </div>
                            <div v-if="form.servedPersonTypeValue==='99'" style="width:80%;margin-left:5%">
                                <foreigner-person-form
                                :Foreigner='foreignerForm'
                                :showButton="false">
                                </foreigner-person-form>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </el-col>
        <el-col :span="24">
            <div class="preDiv">
                <i v-if="step!=1" class="fa fa-angle-double-left fa-5x" @click="goPre()"></i>
                <div v-if="step!=1" class="directionFont"  @click="goPre()">
                    上一步
                </div>
            </div>
            <div class="nextDiv">
                <i v-if="step!=2" class="fa fa-angle-double-right fa-5x" @click="goNext"></i>
                <div v-if="step!=2" class="directionFont" @click="goNext">
                    下一步
                </div>
                <i v-if="step==2" class="fa fa-upload fa-5x" @click="submit"></i>
                <div v-if="step==2" class="directionFont" @click="submit">
                    提交数据
                </div>
            </div>
        </el-col>
    </el-row>
</div>
</template>

<script>
import addPopulation from "../../components/common/addPopulation";

// 人员类型组件
import FloatingPopulationForm from "../../components/ZzOrgManage/extendFloatingPopulation";
import ResidentForm from "../../components/ZzOrgManage/extendResident";
import StayedPersonForm from "../../components/ZzOrgManage/extendStayedPerson";
import ForeignerPersonForm from "../../components/ZzOrgManage/extendForeignerPerson";
// 基本表格组件
import BaiscInfoTable from "../../components/ZzOrgManage/servedBasicTable";

import * as api from "@/api/zonghezhili/duiwujianshe";

export default {
  components: {
    addPopulation: addPopulation,
    FloatingPopulationForm: FloatingPopulationForm,
    ResidentForm: ResidentForm,
    StayedPersonForm: StayedPersonForm,
    ForeignerPersonForm: ForeignerPersonForm,
    BaiscInfoTable: BaiscInfoTable
  },
  watch: {
    "form.servedPersonTypeValue": function(val, oldval) {
      if (val === "01") {
        this.obj = this.resident;
        this.obj.certifID = this.form.certifID
      } else if (val === "02") {
        this.obj = this.floatingPopulation;
        this.obj.certifID = this.form.certifID
      } else if (val === "03") {
        this.obj = this.StayedPerson;
        this.obj.certifID = this.form.certifID
      } else {
        this.obj = this.foreignerForm;
        this.obj.certifID = this.form.certifID
      }
    }
  },
  data() {
    return {
      imageUrl: null,
      step: 1,
      form: {
        imgId: -1, //头像的id
        servedPersonTypeValue: "01", // 服务对象类型
        netGridID:1,
        // servedPersonTypeName: '流动人口',  // '服务对象的类型，包括01=户籍人口，02=流动人口，03=留守人员，99=境外人员。';
        certifID: "", // 身份证号
        name: "", // 姓名
        nameUsed: "", // 曾用名
        sex: '1', // 性别
        birthDate: "", // 出生日期，格式为“YYYYMMDD”
        ethnicity: "", // 民族
        nativePlace: "", // 籍贯，出生地，老家
        politics: "", // 政治面貌
        maritalStatus: "", // 婚姻状况
        education: null, // 学历
        religiousBelief: null, // 宗教信仰，后期需要符合标准编码
        careerType: null, // 职业类别
        career: "", // 职业
        mobileTel: "", // 移动电话
        fixedTel: "", // 固定电话
        isSpecialPopulation: 0, // 是否为特殊人群
        servedPlace: "", // 服务处所
        domicileAddress: "", // 户籍地
        domicileAddressDetail: "", // 户籍门(楼)详细地址',
        presentAddress: "", // 现住地',
        presentAddressDetail: "" // 现住地门(楼)详细地址',
      },
      floatingPopulation: {
        // 流动人口信息表
        certifID: "",
        isSettled: 0,
        unSettledReason: null, //待补充
        folatingReasonTypeValue: null, // 流入原因编码
        certificateTypeValue: null, // 办证类型编码
        houseTypeValue: null, //住所类型编码
        registerDate: "",
        dueDate: "",
        unSettledDate: "",
        isFocusPerson: 0
      },
      resident: {
        // 户籍人口信息
        certifID: "",
        relationshipTypeWithHouseholder: null, // 与户主关系
        consistforPersonHouseTypeValue: null // 人户一致编码
      },
      StayedPerson: {
        // 留守人口信息
        certifID: "",
        consistforPersonHouseTypeValue: null, // 人户一致编码
        stayedPersonValue: null, // 留守人员编码
        healthStatusTypeValue: null, // 健康状况编码
        familyHeadRelationWithStayedPersonTypeID: null, //家庭主要成员与留守人员关
        familyHeadHealthStatusTypeValue: null,
        personalAnualEarnings: 0,
        familyAnualEarnings: 0
      },
      foreignerForm: {},

      // 常住人口
      ConsistforPersonHouseType: [], //常住户籍人口编码
      // 流动人口所需编码
      UnSettledReasonType: [], // 未落户原因
      FolatingReasonType: [], // 流入原因编码
      CertificateType: [], // 办证类型编码
      HouseType: [], //住所类型编码
      // 留守人口所需编码表
      StayedPersonType: [], // 留守人口类型
      HealthStatusType: [], // 健康状况编码
      obj: {}
    };
  },
  methods: {
    goPre() {
      if (this.step > 1) {
        this.step = this.step - 1;
      }
    },
    goNext() {
      if (this.step < 3) {
        this.step = this.step + 1;
      }
    },
    getImageUrl(url) {
      this.imageUrl = url;
    },
    resCode(res) {
      if (res.code == 200) {
        this.$notify({
          title: "成功",
          message: "户籍信息保存成功",
          type: "success"
        });
      } else {
        this.$notify({
          title: "户籍信息保存失败",
          message: res.message,
          type: "error"
        });
      }
    },
    addPersonType() {
      if (this.form.servedPersonTypeValue == "01") {
        api.addResidentServedPersonInfo(this.obj).then(res => {
            this.resCode(res)
        });
      } else if (this.form.servedPersonTypeValue == "02") {
        api.addFloatServedPersonInfo(this.obj).then(res => {
            this.resCode(res)
        });
      } else if (this.form.servedPersonTypeValue == "03") {
        api.addStayedServedPersonInfo(this.obj).then(res => {
           this.resCode(res)
        });
      } else if (this.form.servedPersonTypeValue == "99") {
      }
    },
    submit() {
      api.addServedMemberBasicInfo(this.form).then(res => {
        if (res.code == 200) {
          this.$notify({
            title: "成功",
            message: "基本信息保存成功！",
            type: "success"
          });
          this.addPersonType();
        } else {
          this.$notify({
            title: "失败",
            message: "添加失败！",
            type: "error"
          });
        }
      });
    }
  },
  mounted() {
    this.obj = this.resident;
    this.obj.certifID = this.form.certifID
    api.fetchServedPersonManageTypes().then(res => {
      this.EducationType = res.data.codeEducationTypeMapper; // 学历
      this.CareerType = res.data.codeCareerType; // 职业类别
      this.CaseType = res.data.codeCaseType; // 案件类型
      this.ReligiousBeliefType = res.data.codeReligiousBeliefType;
      this.specialTypes = res.data.codeSpecialPopulationType; //特殊人员类型
      this.ConsistforPersonHouseType = res.data.codeConsistforPersonHouseType; //常住户籍人口编码
      this.FolatingReasonType = res.data.codeFloatingReasonType; // 流入原因编码
      this.UnSettledReasonType = res.data.codeUnSettledReasonType; // 未落户原因
      this.CertificateType = res.data.codeCertificateType; // 办证类型编码
      this.HouseType = res.data.codeHouseType; // 住所类型编码
      this.StayedPersonType = res.data.codeStayedPersonType; // 留守人口类型
      this.HealthStatusType = res.data.codeHealthStatusType; // 健康状况编码
    });
  }
};
</script>

<style scoped>
.preDiv {
  position: absolute;
  top: 300px;
  left: -11%;
  cursor: pointer;
  color: #58b7ff;
  text-align: center;
  margin-left: 10px;
}
.nextDiv {
  position: absolute;
  top: 300px;
  right: 0;
  cursor: pointer;
  color: #58b7ff;
  text-align: center;
  margin-right: 10px;
}
.directionFont {
  color: #1d8ce0;
  font-weight: bold;
  text-align: center;
}
</style>



// WEBPACK FOOTER //
// src/views/populationManage/addPopulationByType.vue?0e610aac