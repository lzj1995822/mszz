<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane id="userBasicInfo" label="基本信息">
                <baisc-info-table :memberInfo="memberInfo" :imageUrl="imageUrl"></baisc-info-table>
                <div style="text-align:center">
                    <el-button style="font-size:25px" type="text" @click="printTable('userBasicInfo')">[打印]</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane id="personInfo" label="特殊信息">
                <div v-if="specialId=='01'" style="width:80%;margin-left:5%;margin-top:20px">
                    <emancipist-form :emancipistForm="Emancipist"
                    :DangerousEvaulationType="DangerousEvaulationType"
                    :ConnectionType="ConnectionType"
                    :PlacementType="PlacementType"
                    :showButton="false"></emancipist-form>
                </div>
                <div v-if="specialId=='02'" style="width:80%;margin-left:5%;margin-top:20px">
                    <community-correctioner-form :communityCorrectionerForm="communityCorrectioner"
                    :CorrectingType=" CorrectingType"
                    :AcceptType="AcceptType"
                    :GroupMemberType="GroupMemberType"
                    :StopCorrectionType="StopCorrectionType"
                    :CaseType="CaseType"
                    :showButton="false"></community-correctioner-form>
                </div>
                <div v-if="specialId=='03'" style="width:80%;margin-left:5%;margin-top:20px">
                    <severe-psychotic-form
                    :severePsychoticForm="SeverePsychotic"
                    :EconomicSituationType="EconomicSituationType"
                    :currentDiagnosisType="currentDiagnosisType"
                    :dangerousEvaulationLevelType="dangerousEvaulationLevelType"
                    :treatmentSituationType="treatmentSituationType"
                    :showButton="false"></severe-psychotic-form>
                </div>
                <div v-if="specialId=='04'" style="width:80%;margin-left:5%;margin-top:20px">
                    <DrugAddictsForm :DrugAddicts="DrugAddicts"
                    :ControlSituationType="controlSituationType"
                    :drugReasonType="drugReasonType"
                    :drugResultType="drugResultType"
                    :showButton="false"></DrugAddictsForm>
                </div>
                <div v-if="specialId=='05'" style="width:80%;margin-left:5%;margin-top:20px">
                    <AIDSdiseaseForm :AIDSdisease="AIDSdisease"
                    :InfectedWayType="InfectedWayType"
                    :AIDSAttentionType="AIDSAttentionType"
                    :AIDSReceiveCType="AIDSReceiveCType"
                    :CaseType="CaseType"
                    :showButton="false"></AIDSdiseaseForm>
                </div>
                <div v-if="specialId=='06'" style="width:80%;margin-left:5%;margin-top:20px">
                  <key-young-form :MyForm='keyYoungForm' :showButton="false"></key-young-form>
                </div>
                <div v-if="specialId=='07'" style="width:80%;margin-left:5%;margin-top:20px">
                  <key-petitioner :form="KeyPetitioner" :showButton="false"></key-petitioner>
                </div>
                <div style="text-align:center">
                  <el-button style="font-size:25px" type="text" @click="printTable('personInfo')">[打印]</el-button>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
// 基本表格组件
import BaiscInfoTable from "../../components/ZzOrgManage/servedBasicTable";

import * as api from "@/api/zonghezhili/duiwujianshe";
import * as SpeApi from "@/api/specialPopulation/index";

// 特殊人口组件
import DrugAddictsForm from '../../components/ZzOrgManage/extendDrugAddicts'
import AIDSdiseaseForm from '../../components/ZzOrgManage/extendAIDsdisease'
import SeverePsychoticForm from '../../components/ZzOrgManage/extendSeverePsychotic'
import CommunityCorrectionerForm from '../../components/ZzOrgManage/extendCommunityCorrectioner'
import EmancipistForm from '../../components/ZzOrgManage/extendEmancipist'
import keyYoungForm from "../../components/ZzOrgManage/keyYoungForm"
import keyPetitioner from "../../components/ZzOrgManage/extendKeyPetitioners"

export default {
  components: {
    BaiscInfoTable: BaiscInfoTable,
    'DrugAddictsForm': DrugAddictsForm,
    'AIDSdiseaseForm': AIDSdiseaseForm,
    'SeverePsychoticForm': SeverePsychoticForm,
    'CommunityCorrectionerForm': CommunityCorrectionerForm,
    'EmancipistForm': EmancipistForm,
    keyYoungForm:keyYoungForm,
    keyPetitioner:keyPetitioner
  },
  data() {
    return {
      specialId:'01',
      memberInfo: {
        servedPersonTypeValue: "01"
      },
      KeyPetitioner:{
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
      keyYoungForm: {
        keyYoungersID: "", //             int not null auto_increment,
        certifID: "", //                  '身份证号. 编码应符合GB 11643',
        populationTypeValue: "", //       '人员类型，编码见GBT 31000-2015文件之5.41',
        familySituationTypeValue: "", //  '家庭情况，编码见GBT 31000-2015文件之5.42',
        guardianCertifID: "", //          '监护人身份证号. 编码应符合GB 11643',
        guardianName: "", //         varchar(50),
        relatedtoGuardianTypeValue: "", // '与监护人关系，编码见GB/T 4761',
        guardianContact: "", //            '监护人联系方式，手机号码或固定电话号码',
        huardianAddressDetail: "", //      '监护人居住地详细地址',
        isCrime: "", //                    '是否犯罪？0表示没有，1表示是',
        crimeInf: "", //                   '违法犯罪情况',
        helperName: "", //                 '帮扶人姓名',
        helperContact: "", //              '帮扶人联系方式，手机号码或固定电话号码',
        helpingSolutionTypeValue: "", //   '帮扶手段类型编码，见GBT 31000-2015文件之5.43',
        helpingInf: "" //                  '帮扶情况',
      },
       DrugAddicts: {     // 吸毒信息扩展表
        extendCorrectionerID: 1,
        certifID: '',             // '身份证号'
        firstFoundDate: '2012-1-1',       // '吸毒初次被发现的日期',
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
        infectedWayTypeValue: null, // '感染途径类型编码',
        isCrime: 1,               // '是否有犯罪史？0表示无，1表示有',
        crimeInf: '',             // comment '犯罪情况描述',
        caseType: '',             // comment '案件类别，编码符合GA 240.1',
        aIDSAttentionTypeValue: null, // comment '艾滋病关注类型编码',
        helpingInf: '',           // comment '帮扶情况',
        helperName: '',           // comment '帮扶人姓名',
        helperContact: '',        // comment '帮扶人联系方式',
        aIDSReceiveCTypeValue: null, // comment '艾滋病收治情况类型编码',
        receiveCOrganization: '' // comment '收治机构名称',
      },
      SeverePsychotic: { // 精神病扩展信息表
        isTroublemaking:1,
        isSubsistenceAllowances:0,
        troublemakingNumber:0,
        currentDiagnosisTypeValue:null,
        dangerousEvaulationLevelTypeValue:null,
        treatmentSituationTypeValue:null,
        familyEconomicSituationTypeValue:null
      },
      communityCorrectioner: { // 社区改造扩展信息表
        acceptTypeValue:null,
        correctingTypeValue:null,
        caseTypeValue:null,
        groupMemberTypeValue:null,
        stopCorrectionTypeValue:null,
        isCreatingCorrectionGroup:1,
        isMissingControl:1,
        isOutofControl:1,
        isRecidivist:1,
        isRecidivism:1, //是否重新犯罪
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
      imageUrl: "",
      // 常住人口
      specialTypes: [], // 特殊人口类型的编码等待服务器上传
      CareerType:[], // 职业类别
      ReligiousBeliefType:[], // 宗教信仰
      EducationType:[], //  学历
      // 常住人口
      ConsistforPersonHouseType:[], //常住户籍人口编码
      // 流动人口所需编码
      UnSettledReasonType:[],// 未落户原因
      FolatingReasonType:[],// 流入原因编码
      CertificateType:[],// 办证类型编码
      HouseType:[], //住所类型编码
      // 留守人口所需编码表
      StayedPersonType:[], // 留守人口类型
      HealthStatusType:[], // 健康状况编码

      // 特殊人群之艾滋病所需编码
      InfectedWayType:[], // 感染途径类型编码
      CaseType:[], // 案件类别
      AIDSAttentionType: [], // 艾滋病关注类型编码
      AIDSReceiveCType: [], // 艾滋病收治情况类型编码

      // 特殊人群之吸毒记录
      controlSituationType: [], // 管控类型编码
      drugReasonType: [], // 吸毒原因类型编码(缺失)
      drugResultType: [], // 吸毒后果编码(缺失)

      // 特殊人群之刑满释放人员
      DangerousEvaulationType: [],// 危险评估类型
      ConnectionType:[], // 衔接情况类型
      PlacementType:[], // 安置情况类型

      // 特殊人群之社区矫正人员
      CorrectingType:[], // 矫正类型编码
      AcceptType:[], // 接收方式
      GroupMemberType:[], // 矫正成员小组编码
      StopCorrectionType:[], //终止矫正类型

      // 特殊人群之精神病所需编码
      EconomicSituationType:[],
      currentDiagnosisType:[],
      dangerousEvaulationLevelType:[],
      treatmentSituationType:[],
    }
  },
  methods:{
    printTable(div){
        var div_print = document.getElementById(div)
        var newStr = div_print.innerHTML
        var oldStr = document.body.innerHTML
        document.body.innerHTML = newStr
        window.print()
        window.location.reload();
        window.body.innerHTML = oldStr
        return false
    },
    initInfo(queryID){
        SpeApi.fetchSpecialPeronDetail(queryID,this.specialId).then(res=>{
            this.memberInfo = res.data.basic[0]
            switch(this.specialId){
                case '01':
                    this.Emancipist = res.data.special[0]
                    break;
                case '02':
                    this.communityCorrectioner = res.data.special[0]
                    break;
                case '03':
                    this.SeverePsychotic = res.data.special[0]
                    break;
                case '04':
                    this.DrugAddicts = res.data.special[0]
                    break;
                case '05':
                    this.AIDSdisease = res.data.special[0]
                    break;
                case '06':
                    this.keyYoungForm = res.data.special[0]
                case '07':
                    this.KeyPetitioner = res.data.special
            }
        })
    }
  },
  props:['specialId','id'],
  watch:{
    id:function(val){
      this.initInfo(this.id);
    }
  },
  mounted() {
    api.fetchServedPersonManageTypes().then(res=>{
      this.EducationType = res.data.codeEducationTypeMapper // 学历
      this.CareerType = res.data.codeCareerType // 职业类别
      this.CaseType = res.data.codeCaseType // 案件类型
      this.ReligiousBeliefType=res.data.codeReligiousBeliefType;
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
      // this.GroupMemberType = res.data.
      this.StopCorrectionType = res.data.codeStopCorrectionType // 终止矫正

      this.EconomicSituationType = res.data.codeFamilyEconomicSituationType
      this.currentDiagnosisType = res.data.codeCurrentDiagnosisType
      this.dangerousEvaulationLevelType = res.data.codeDangerousEvaulationLevelType
      this.treatmentSituationType = res.data.codeTreatmentSituationType
    })

    this.initInfo(this.id);
  }
};
</script>

<style scoped>

</style>




// WEBPACK FOOTER //
// src/views/specialPopulationManage/specialInfo.vue?abe1b20a