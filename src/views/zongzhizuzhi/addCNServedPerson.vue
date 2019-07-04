<template>
  <div>
    <div style="width:100%;">
      <el-form ref="form" :model="form" label-width="160px" style="margin-left:10%">
        <fieldset style="width:80%">
          <legend style="margin-left:40px;">
            <h1>基本信息</h1>
          </legend>
          <div style="display:inline-block;width:40%;padding:10px">
            <el-form-item label="头像上传">
              <el-upload class="avatar-uploader"
              :headers="header"
              :action="getDomain()+'/msmis/api/served/image/upload?type=add'"
              :show-file-list="false" :on-success="handleAvatarSuccess">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="曾用名">
              <el-input v-model="form.nameUsed"></el-input>
            </el-form-item>

            <el-form-item label="所属网格">
              <el-select v-model="form.netGridID" placeholder="">
                <el-option v-for="(v,i) in NetGrid" :key="i" :value="v.netGridID" :label="v.netGridName"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="性别">
              <el-radio-group v-model="form.sex">
                <el-radio :label="yes">男</el-radio>
                <el-radio :label="no">女</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="身份证号">
              <el-input v-model="form.certifID"></el-input>
            </el-form-item>

            <el-form-item label="人口类型">
              <el-select v-model="form.servedPersonTypeValue" placeholder="请选择服务类型">
                <el-option label="户籍人口" value="01"></el-option>
                <el-option label="流动人口" value="02"></el-option>
                <el-option label="留守人口" value="03"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="出生日期">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.birthDate"></el-date-picker>
            </el-form-item>

            <el-form-item label="民族">
              <el-select v-model="form.ethnicity" placeholder="请选择民族">
                <el-option label="汉族" value="1"></el-option>
                <el-option label="维吾尔族" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="籍贯">
              <el-input v-model="form.nativePlace"></el-input>
            </el-form-item>

            <el-form-item label="政治面貌">
              <el-select  v-model="form.politics" placeholder="">
                <el-option v-for="(v,i) of Politics" :key="i" :value="v.politicsTypeValue" :label="v.politicsTypeName"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="婚姻状况">
              <el-select v-model="form.maritalStatus" placeholder="请输入婚姻状况">
                <el-option v-for="(v,i) of Marital" :key="i" :value="v.maritalStatus" :label="v.maritalStatusName"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="学历">
              <el-select v-model="form.education" placeholder="请选择学历">
                <el-option v-for="v of EducationType" :key="v.id" :label="v.educationTypeName" :value="v.education"></el-option>
              </el-select>
            </el-form-item>
          </div>

          <div style="display:inline-block;width:40%">
            <el-form-item label="宗教信仰">
              <!-- 等待类型编码 -->
              <el-select v-model="form.religiousBelief" placeholder="请选择宗教信仰">
                <el-option v-for="v of ReligiousBeliefType" :key="v.id" :label="v.religiousBeliefName" :value="v.religiousBelief"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职业类别">
              <!-- 等待类型编码 -->
              <el-select v-model="form.careerType" placeholder="请选择职业类别">
                <el-option v-for="v of CareerType" :key="v.id" :label="v.careerTypeName" :value="v.careerType"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="职业">
              <el-input v-model="form.career"></el-input>
            </el-form-item>

            <el-form-item label="移动电话">
              <el-input v-model="form.mobileTel"></el-input>
            </el-form-item>

            <el-form-item label="固定电话">
              <el-input v-model="form.fixedTel"></el-input>
            </el-form-item>

            <el-form-item label="是否为特殊人群:">
              <el-radio-group v-model="form.isSpecialPopulation">
                <el-radio :label="yes">是</el-radio>
                <el-radio :label="no">否</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item v-if="form.isSpecialPopulation" label="特殊人群类型">
              <el-tooltip content="温馨提示!此下拉菜单可多选" placement="top">
                <el-select v-model="specialValues" multiple placeholder="请选择特殊人群类型">
                  <el-option v-for="item in specialTypes" :key="item.specialPopulationTypeValue" :label="item.specialPopulationTypeName" :value="item.specialPopulationTypeValue">
                  </el-option>
                </el-select>
              </el-tooltip>
            </el-form-item>

            <el-form-item label="服务处所:">
              <el-input v-model="form.servedPlace"></el-input>
            </el-form-item>

            <el-form-item label="户籍地:">
              <el-input v-model="form.domicileAddress"></el-input>
            </el-form-item>

            <el-form-item label="户籍门(楼)详细地址:">
              <el-input v-model="form.domicileAddressDetail"></el-input>
            </el-form-item>

            <el-form-item label="现住地:">
              <el-input v-model="form.presentAddress"></el-input>
            </el-form-item>

            <el-form-item label="现住地门(楼)详细地址:">
              <el-input v-model="form.presentAddressDetail"></el-input>
            </el-form-item>
          </div>

          <el-row>
            <el-col align="center" :span="18">
              <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button @click="$router.go(-1)">取消</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </fieldset>
      </el-form>
    </div>
    <fieldset style="width:72%;margin-left:10%;">
      <legend style="margin-left:40px;">
        <h1>人口类型</h1>
      </legend>
      <div v-if="form.servedPersonTypeValue==='01'" style="width:80%;margin-left:5%">
        <resident-form :Resident="resident"
        :ConsistforPersonHouseType="ConsistforPersonHouseType" ></resident-form>
      </div>
      <div v-if="form.servedPersonTypeValue==='02'" style="width:80%;margin-left:5%">
        <floating-population-form :floatingPopulation="floatingPopulation"
        :HouseType="HouseType"
        :CertificateType="CertificateType"
        :FolatingReasonType="FolatingReasonType"
        :UnSettledReasonType="UnSettledReasonType">
        </floating-population-form>
      </div>
      <div v-if="form.servedPersonTypeValue==='03'" style="width:80%;margin-left:5%">
        <stayed-person-form :StayedPerson="StayedPerson"
        :ConsistforPersonHouseTypes="ConsistforPersonHouseType"
        :StayedPersonType="StayedPersonType"
        :HealthStatusType="HealthStatusType">
        </stayed-person-form>
      </div>
    </fieldset>
    <fieldset style="width:72%;margin-left:10%;">
      <legend style="margin-left:40px;">
        <h1>特殊人群类型</h1>
      </legend>
      <div v-if="specialValues.indexOf('01')>=0" style="width:80%;margin-left:5%;margin-top:20px">
        <emancipist-form
        :emancipistForm="Emancipist"
        :DangerousEvaulationType="DangerousEvaulationType"
        :ConnectionType="ConnectionType"
        :PlacementType="PlacementType"></emancipist-form>
      </div>
      <div v-if="specialValues.indexOf('02')>=0" style="width:80%;margin-left:5%;margin-top:20px">
        <community-correctioner-form :communityCorrectionerForm="communityCorrectioner"
        :CorrectingType=" CorrectingType"
        :AcceptType="AcceptType"
        :GroupMemberType="GroupMemberType"
        :StopCorrectionType="StopCorrectionType"
        :CaseType="CaseType"
        ></community-correctioner-form>
      </div>
      <div v-if="specialValues.indexOf('03')>=0" style="width:80%;margin-left:5%;margin-top:20px">
        <severe-psychotic-form
        :severePsychoticForm="SeverePsychotic"
        :EconomicSituationType="EconomicSituationType"
        :currentDiagnosisType="currentDiagnosisType"
        :dangerousEvaulationLevelType="dangerousEvaulationLevelType"
        :treatmentSituationType="treatmentSituationType"></severe-psychotic-form>
      </div>
      <div v-if="specialValues.indexOf('04')>=0" style="width:80%;margin-left:5%;margin-top:20px">
        <DrugAddictsForm :DrugAddicts="DrugAddicts"
        :ControlSituationType="controlSituationType"
        :drugReasonType="drugReasonType"
        :drugResultType="drugResultType"></DrugAddictsForm>
      </div>
      <div v-if="specialValues.indexOf('05')>=0" style="width:80%;margin-left:5%;margin-top:20px">
        <AIDSdiseaseForm :AIDSdisease="AIDSdisease"
        :InfectedWayType="InfectedWayType"
        :AIDSAttentionType="AIDSAttentionType"
        :AIDSReceiveCType="AIDSReceiveCType"
        :CaseType="CaseType"></AIDSdiseaseForm>
      </div>
      <div v-if="specialValues.length==0" align="center">
        <span style="font-size:30px;color:#808080">无不良记录</span>
      </div>
    </fieldset>

  </div>
</template>
<script>
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
import { getToken } from '../../utils/auth';

export default {
  components: {
    'FloatingPopulationForm': FloatingPopulationForm,
    'ResidentForm': ResidentForm,
    'StayedPersonForm': StayedPersonForm,
    'DrugAddictsForm': DrugAddictsForm,
    'AIDSdiseaseForm': AIDSdiseaseForm,
    'SeverePsychoticForm': SeverePsychoticForm,
    'CommunityCorrectionerForm': CommunityCorrectionerForm,
    'EmancipistForm': EmancipistForm
  },
  watch:{
    "form.certifID":function(val){
      this.floatingPopulation.certifID = val
      this.resident.certifID = val
      this.StayedPerson.certifID = val
      this.DrugAddicts.certifID = val
      this.AIDSdisease.certifID = val
      this.SeverePsychotic.certifID = val
      this.communityCorrectioner.certifID = val
      this.Emancipist.certifID = val
    }
  },
  data() {
    return {
      header:{
        token:getToken()
      },
      colNum: 12,
      areaRows: 5,
      imageUrl: '', // 头像路径
      form: {
        imgId: -1, //头像的id
        servedPersonTypeValue: '01',// 服务对象类型
        netGridID:1,
        // servedPersonTypeName: '流动人口',  // '服务对象的类型，包括01=户籍人口，02=流动人口，03=留守人员，99=境外人员。';
        certifID: '',    // 身份证号
        name: '',               // 姓名
        nameUsed: '',           // 曾用名
        sex: 1,                  // 性别
        birthDate: '',    // 出生日期，格式为“YYYYMMDD”
        ethnicity: '',            // 民族
        nativePlace: '',     // 籍贯，出生地，老家
        politics: '',            // 政治面貌
        maritalStatus: '',       // 婚姻状况
        education: null,           // 学历
        religiousBelief: null,       // 宗教信仰，后期需要符合标准编码
        careerType: null,          // 职业类别
        career: '',            // 职业
        mobileTel: '',      // 移动电话
        fixedTel: '',       // 固定电话
        isSpecialPopulation: 1,   // 是否为特殊人群
        servedPlace: '',        // 服务处所
        domicileAddress: '',          // 户籍地
        domicileAddressDetail: '',    // 户籍门(楼)详细地址',
        presentAddress: '',           // 现住地',
        presentAddressDetail: '',     // 现住地门(楼)详细地址',
      },
      floatingPopulation: { // 流动人口信息表
        certifID: '',
        isSettled: 0,
        unSettledReason:null,//待补充
        folatingReasonTypeValue:null,// 流入原因编码
        certificateTypeValue:null,// 办证类型编码
        houseTypeValue:null, //住所类型编码
        registerDate:'',
        dueDate:'',
        unSettledDate:'',
        isFocusPerson:0
      },
      resident: { // 户籍人口信息
        certifID: '',
        relationshipTypeWithHouseholder: null, // 与户主关系
        consistforPersonHouseTypeValue:null  // 人户一致编码
      },
      StayedPerson: { // 留守人口信息
        certifID: '',
        consistforPersonHouseTypeValue:null, // 人户一致编码
        stayedPersonValue:null, // 留守人员编码
        healthStatusTypeValue:null,// 健康状况编码
        familyHeadRelationWithStayedPersonTypeID:null, //家庭主要成员与留守人员关
        familyHeadHealthStatusTypeValue: null,
        personalAnualEarnings:0,
        familyAnualEarnings:0
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
        certifID: '',
        currentDiagnosisTypeValue:null,
        dangerousEvaulationLevelTypeValue:null,
        treatmentSituationTypeValue:null,
        familyEconomicSituationTypeValue:null
      },
      communityCorrectioner: { // 社区改造扩展信息表
        certifID: '',
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
      yes: 1,
      no: 0,
      specialValues: [],
      specialTypes: [], // 特殊人口类型的编码等待服务器上传
      CareerType:[], // 职业类别
      ReligiousBeliefType:[], // 宗教信仰
      Marital:[],
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

      NetGrid:[],
      Politics:[],
    }
  },
  methods: {
    getDomain(){
      return 'http://' + window.location.host;
    },
    onSubmit() {
      api.addServedMemberBasicInfo(this.form).then(res=>{
          if(res.code==200){
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success'
            })
          }else{
            this.$notify({
              title: '失败',
              message: '添加失败！',
              type: 'error'
            })
          }
      })
    },
    onCancel() {
      this.$router.push({ path: 'ServedPersonInfo' })
    },
    // 上传头像
    handleAvatarSuccess(res, file) {
      this.form.imgId = res.data  // 保存头像的id
      this.imageUrl = URL.createObjectURL(file.raw)
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
      this.StopCorrectionType = res.data.codeStopCorrectionType // 终止矫正

      this.EconomicSituationType = res.data.codeFamilyEconomicSituationType
      this.currentDiagnosisType = res.data.codeCurrentDiagnosisType
      this.dangerousEvaulationLevelType = res.data.codeDangerousEvaulationLevelType
      this.treatmentSituationType = res.data.codeTreatmentSituationType
      this.Marital = res.data.codeMaritalStatusType

      this.NetGrid = res.data.netGrid
      this.Politics = res.data.codePoliticsType
    })
  }
}
</script>

<style>
.divStyle {
  border: 1px solid black;
}

.avatar-uploader .el-upload {
  border: 1px dashed black;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.tb_header {
  border: 2px solid #eeeeee;
  background-color: whitesmoke;
  padding: 1px;
  text-indent: 1em;
  border-left: 4px solid #20A0FF;
  border-left-width: 5px;
  width: 80%;
}
</style>



// WEBPACK FOOTER //
// src/views/zongzhizuzhi/addCNServedPerson.vue?3da6a37b