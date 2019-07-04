<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="基本信息">
        <baisc-info-table :memberInfo="memberInfo" :imageUrl="imageUrl"></baisc-info-table>
      </el-tab-pane>
      <el-tab-pane label="户籍信息">
        <div v-if="resident!=null" style="width:80%;margin-left:5%">
          <resident-form :Resident="resident" :ConsistforPersonHouseType="ConsistforPersonHouseType" :showButton="noButton"></resident-form>
        </div>
        <div v-if="floatingPopulation!=null" style="width:80%;margin-left:5%">
          <floating-population-form :floatingPopulation="floatingPopulation" :showButton="noButton" :HouseType="HouseType" :CertificateType="CertificateType" :FolatingReasonType="FolatingReasonType" :UnSettledReasonType="UnSettledReasonType">
          </floating-population-form>
        </div>
        <div v-if="StayedPerson!=null" style="width:80%;margin-left:5%">
          <stayed-person-form :StayedPerson="StayedPerson" :showButton="noButton" :ConsistforPersonHouseTypes="ConsistforPersonHouseType" :StayedPersonType="StayedPersonType" :HealthStatusType="HealthStatusType">
          </stayed-person-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="特殊信息">
        <div v-if="Emancipist!=null" style="width:80%;margin-left:5%;margin-top:20px">
          <emancipist-form :emancipistForm="Emancipist" :showButton="noButton" :DangerousEvaulationType="DangerousEvaulationType" :ConnectionType="ConnectionType" :PlacementType="PlacementType"></emancipist-form>
        </div>
        <div v-if="communityCorrectioner!=null" style="width:80%;margin-left:5%;margin-top:20px">
          <community-correctioner-form :communityCorrectionerForm="communityCorrectioner" :showButton="noButton" :CorrectingType="CorrectingType" :AcceptType="AcceptType" :GroupMemberType="GroupMemberType" :StopCorrectionType="StopCorrectionType" :CaseType="CaseType"></community-correctioner-form>
        </div>
        <div v-if="SeverePsychotic!=null" style="width:80%;margin-left:5%;margin-top:20px">
          <severe-psychotic-form :severePsychoticForm="SeverePsychotic" :showButton="noButton" :EconomicSituationType="EconomicSituationType" :currentDiagnosisType="currentDiagnosisType" :dangerousEvaulationLevelType="dangerousEvaulationLevelType" :treatmentSituationType="treatmentSituationType"></severe-psychotic-form>
        </div>
        <div v-if="DrugAddicts!=null" style="width:80%;margin-left:5%;margin-top:20px">
          <DrugAddictsForm :DrugAddicts="DrugAddicts" :showButton="noButton" :ControlSituationType="controlSituationType" :drugReasonType="drugReasonType" :drugResultType="drugResultType"></DrugAddictsForm>
        </div>
        <div v-if="AIDSdisease!=null" style="width:80%;margin-left:5%;margin-top:20px">
          <AIDSdiseaseForm :AIDSdisease="AIDSdisease" :showButton="noButton" :InfectedWayType="InfectedWayType" :AIDSAttentionType="AIDSAttentionType" :AIDSReceiveCType="AIDSReceiveCType" :CaseType="CaseType"></AIDSdiseaseForm>
        </div>

        <div v-if="specialValues.length==0" align="center">
          <span style="font-size:30px;color:#808080">无不良记录</span>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 基本表格组件
import BaiscInfoTable from '../../components/ZzOrgManage/servedBasicTable'

// 人员类型组件
import FloatingPopulationForm from '../../components/ZzOrgManage/extendFloatingPopulation'
import ResidentForm from '../../components/ZzOrgManage/extendResident'
import StayedPersonForm from '../../components/ZzOrgManage/extendStayedPerson'

// 特殊人口组件
import DrugAddictsForm from '../../components/ZzOrgManage/extendDrugAddicts'
import AIDSdiseaseForm from '../../components/ZzOrgManage/extendAIDsdisease'
import SeverePsychoticForm from '../../components/ZzOrgManage/extendSeverePsychotic'
import CommunityCorrectionerForm from '../../components/ZzOrgManage/extendCommunityCorrectioner'
import EmancipistForm from '../../components/ZzOrgManage/extendEmancipist'

import * as api from '@/api/zonghezhili/duiwujianshe'

export default {
  components: {
    'BaiscInfoTable': BaiscInfoTable,
    'FloatingPopulationForm': FloatingPopulationForm,
    'ResidentForm': ResidentForm,
    'StayedPersonForm': StayedPersonForm,
    'DrugAddictsForm': DrugAddictsForm,
    'AIDSdiseaseForm': AIDSdiseaseForm,
    'SeverePsychoticForm': SeverePsychoticForm,
    'CommunityCorrectionerForm': CommunityCorrectionerForm,
    'EmancipistForm': EmancipistForm
  },
  props:{
    id:String
  },
  watch:{
    id:function(val){
       this.getServedBasicInfo(this.id);
    }
  },
  data() {
    return {
      noButton:false,
      memberInfo: {
        servedPersonTypeValue: '01'
      },
      floatingPopulation: {},
      resident: {},
      StayedPerson: {},
      DrugAddicts: {     // 吸毒信息扩展表
        extendCorrectionerID: 1,
        certifID: '',             // '身份证号'
        firstFoundDate: '',       // '吸毒初次被发现的日期',
        controlSituationTypeValue: '', // '管控情况类型编码',
        controlSituationTypeName: '', // 管控类型名称
        controlOfficerName: '',   // comment '管控人姓名',
        controlOfficerContact: '', // comment '管控人联系方式，手机号码或固定电话号码',
        helpingInf: '',           // comment '帮扶情况',
        helperName: '',           // comment '帮扶人姓名',
        helperContact: '',        // comment '帮扶人联系方式',
        isCrime: 1,              // '是否有犯罪史？0表示无，1表示有',
        crimeInf: '',             // comment '犯罪情况描述',
        drugReasonTypeValue: '',  // comment '吸毒原因类型编码，标准GA 332.2',
        drugResultTypeValue: ''  // comment '吸毒后果类型编码，标准GA 332.4',
      },
      AIDSdisease: {
        extendCorrectionerID: 1,
        certifID: '',             // '身份证号'
        InfectedWayTypeValue: '', // '感染途径类型编码',
        isCrime: 1,              // '是否有犯罪史？0表示无，1表示有',
        crimeInf: '',             // comment '犯罪情况描述',
        caseType: '',              // comment '案件类别，编码符合GA 240.1',
        aIDSAttentionTypeValue: '', // comment '艾滋病关注类型编码',
        helpingInf: '',           // comment '帮扶情况',
        helperName: '',           // comment '帮扶人姓名',
        helperContact: '',        // comment '帮扶人联系方式',
        aIDSReceiveCTypeValue: '', // comment '艾滋病收治情况类型编码',
        receiveCOrganization: '' // comment '收治机构名称',
      },
      Emancipist: { // 刑满释放人员扩充信息表
        extendEmancipistID:'',
        certifID:'',
        isRecidivist:'',
        originalSinType:'',
        originalSentence:'',
        imprisonmentAddress:'',
        releaseDate:'',
        dangerousEvaulationTypeValue:'',
        connectionDate:'',
        connectionTypeValue:'',
        placementDate:'',
        placementTypeValue:'',
        noPlacementReason:'',
        helpingSituation:'',
        isRecidivism:'',
        recidivismCharge:''
      },
      communityCorrectioner: { // 社区改造扩展信息表
        acceptTypeValue: null,
        correctingTypeValue: null,
        caseTypeValue: null,
        groupMemberTypeValue: null,
        stopCorrectionTypeValue: null,
        isCreatingCorrectionGroup: 1,
        isMissingControl: 1,
        isOutofControl: 1,
        isRecidivist: 1,
        isRecidivism: 1, //是否重新犯罪
      },
      SeverePsychotic: { // 精神病扩展信息表
        currentDiagnosisTypeValue: null,
        dangerousEvaulationLevelTypeValue: null,
        treatmentSituationTypeValue: null,
        familyEconomicSituationTypeValue: null
      },
      imageUrl: '',
      specialValues: ['01', '02'],

      specialTypes: [],              // 特殊人口类型的编码等待服务器上传
      CareerType: [],                // 职业类别
      ReligiousBeliefType: [],       // 宗教信仰
      EducationType: [],             //  学历
      // 常住人口
      ConsistforPersonHouseType: [], //常住户籍人口编码
      // 流动人口所需编码
      UnSettledReasonType: [],       // 未落户原因
      FolatingReasonType: [],        // 流入原因编码
      CertificateType: [],           // 办证类型编码
      HouseType: [],                 // 住所类型编码
      // 留守人口所需编码表
      StayedPersonType: [],          // 留守人口类型
      HealthStatusType: [],          // 健康状况编码

      // 特殊人群之艾滋病所需编码
      InfectedWayType: [], // 感染途径类型编码
      CaseType: [], // 案件类别
      AIDSAttentionType: [], // 艾滋病关注类型编码
      AIDSReceiveCType: [], // 艾滋病收治情况类型编码

      // 特殊人群之吸毒记录
      controlSituationType: [], // 管控类型编码
      drugReasonType: [], // 吸毒原因类型编码(缺失)
      drugResultType: [], // 吸毒后果编码(缺失)

      // 特殊人群之刑满释放人员
      DangerousEvaulationType: [],// 危险评估类型
      ConnectionType: [], // 衔接情况类型
      PlacementType: [], // 安置情况类型

      // 特殊人群之社区矫正人员
      CorrectingType: [], // 矫正类型编码
      AcceptType: [], // 接收方式
      GroupMemberType: [], // 矫正成员小组编码
      StopCorrectionType: [], //终止矫正类型

      // 特殊人群之精神病所需编码
      EconomicSituationType: [],
      currentDiagnosisType: [],
      dangerousEvaulationLevelType: [],
      treatmentSituationType: []
    }
  },
  methods: {
    getServedBasicInfo(queryID) {
      api.fetchServedMemberInfoById(queryID).then(res => {
        this.memberInfo = res.data.basicDetailVOs[0]
        this.imageUrl = res.data.path[0]
        this.floatingPopulation = res.data.floatingPopulations[0]
        this.resident = res.data.residents[0]
        this.StayedPerson = res.data.stayedPersons[0]
        this.DrugAddicts = res.data.drugAddicts[0]
        this.AIDSdisease = res.data.aidSdiseases[0]
        this.Emancipist = res.data.emancipists[0]
        this.communityCorrectioner = res.data.communityCorrectioners[0]
        this.SeverePsychotic = res.data.severePsychotics[0]
      })
    },
    getServedPersonImage() {

    }
  },
  mounted() {
    //获取路由传递过来的id
    this.getServedBasicInfo(this.id);

    api.fetchServedPersonManageTypes().then(res => {
      this.EducationType = res.data.codeEducationTypeMapper // 学历
      this.CareerType = res.data.codeCareerType // 职业类别
      this.CaseType = res.data.codeCaseType // 案件类型
      this.ReligiousBeliefType = res.data.codeReligiousBeliefType;
      this.specialTypes = res.data.codeSpecialPopulationType //特殊人员类型
      this.ConsistforPersonHouseType = res.data.codeConsistforPersonHouseType //常住户籍人口编码
      this.FolatingReasonType = res.data.codeFloatingReasonType // 流入原因编码
      this.UnSettledReasonType = res.data.codeUnSettledReasonType // 未落户原因
      this.CertificateType = res.data.codeCertificateType // 办证类型编码
      this.HouseType = res.data.codeHouseType // 住所类型编码
      this.StayedPersonType = res.data.codeStayedPersonType // 留守人口类型
      this.HealthStatusType = res.data.codeHealthStatusType // 健康状况编码

      this.InfectedWayType = res.data.codeInfectedWayType // 感染途径编码
      this.AIDSAttentionType = res.data.codeaidsAttentionType // 艾滋病关注类型编码
      this.AIDSReceiveCType = res.data.codeAIDSReceiveCType // 艾滋病收治编码

      this.controlSituationType = res.data.codeControlSituationType // 控制类型编码
      this.drugReasonType = res.data.codeDrugReasonType // 吸毒原因编码
      this.drugResultType = res.data.codeDrugResultType // 吸毒后果编码

      this.DangerousEvaulationType = res.data.codeDangerousEvaulationType // 危险评估类型
      this.ConnectionType = res.data.codeConnectionType // 衔接类型编码
      this.PlacementType = res.data.codePlacementType // 安置情况

      this.CorrectingType = res.data.codeCorrectingType // 矫正编码
      this.AcceptType = res.data.codeAcceptType // 接收方式
      this.StopCorrectionType = res.data.codeStopCorrectionType // 终止矫正

      this.EconomicSituationType = res.data.codeFamilyEconomicSituationType
      this.currentDiagnosisType = res.data.codeCurrentDiagnosisType
      this.dangerousEvaulationLevelType = res.data.codeDangerousEvaulationLevelType
      this.treatmentSituationType = res.data.codeTreatmentSituationType
    })
  }
}
</script>
<style>
.userInfoEditTable,
.userInfoEditTable td {
  border: 1px solid darkgrey;
  padding: 10px;
}

.tb_label {
  width: 12%;
}
</style>



// WEBPACK FOOTER //
// src/views/zongzhizuzhi/ServedPersonDetailInfo.vue?1a461026