<template>
  <div>
      <el-row>
          <el-col :span="24">
            <div id="economyInfo">
              <table class="userInfoEditTable" style="border-collapse:collapse;background-color:white;" width="100%" cellspacing="0">
                  <tr>
                      <td class="tb_label">企业名称:</td>
                      <td>
                          {{form.enterpriseName}}
                      </td>
                      <td class="tb_label">统一社会信用代码:</td>
                      <td>
                          {{form.enterpriseUSCcode}}
                      </td>
                  </tr>
                  <tr>
                    <td class="tb_label">企业区划代码:</td>
                    <td colspan="3">
                      {{form.regionalismCode}}
                    </td>
                  </tr>
                  <tr>
                      <td class="tb_label">企业地址:</td>
                      <td>
                          {{form.enterpriseAddress}}
                      </td>
                      <td class="tb_label">企业类别:</td>
                      <td>
                          {{form.enterpriseTypeName}}
                      </td>
                  </tr>
                  <tr>
                      <td class="tb_label">所属网格:</td>
                      <td >{{form.netGridName}}</td>
                      <td class="tb_label">
                          经营范围
                      </td>
                      <td>
                          {{form.businessScope}}
                      </td>
                  </tr>
                  <tr>
                      <td class="tb_label">企业联系方式:</td>
                      <td>
                          {{form.enterpriseContact}}
                      </td>
                      <td class="tb_label">企业员工数量:</td>
                      <td>
                          {{form.enterpriseMemberNumber}}
                      </td>
                  </tr>
                  <tr>
                      <td class="tb_label">法定代表人证件代码:</td>
                      <td>
                          {{form.enterpriseLeaderCertTypeName}}
                      </td>
                      <td class="tb_label">法定代表人证件号码:</td>
                      <td>
                          {{form.enterpriseLeaderCertID}}
                      </td>
                  </tr>
                  <tr>
                      <td class="tb_label">法定代表人姓名:</td>
                      <td>
                          {{form.enterpriseLeaderName}}
                      </td>
                      <td class="tb_label">法定代表人联系方式:</td>
                      <td>
                          {{form.enterpriseLeaderContact}}
                      </td>
                  </tr>
                  <tr>
                      <td class="tb_label">治保负责人姓名:</td>
                      <td>
                          {{form.securityLeaderName}}
                      </td>
                      <td class="tb_label">治保负责人联系方式:</td>
                      <td>
                          {{form.securityLeaderContact}}
                      </td>
                  </tr>
                  <tr>
                    <td class="tb_label">董事长身份证:</td>
                    <td>
                      {{form.chairmanCertID}}
                    </td>
                    <td class="tb_label">董事长姓名:</td>
                    <td>
                      {{form.chairmanName}}
                    </td>
                  </tr>
                  <tr>
                    <td class="tb_label">董事长联系电话:</td>
                    <td>
                      {{form.chairmanContact}}
                    </td>
                    <td class="tb_label">总经理身份证号码:</td>
                    <td>
                      {{form.generalManagerCertID}}
                    </td>
                  </tr>
                  <tr>
                    <td class="tb_label">总经理姓名:</td>
                    <td>
                      {{form.chairmanName}}
                    </td>
                    <td class="tb_label">总经理联系方式:</td>
                    <td>
                      {{form.generalManagerContact}}
                    </td>
                  </tr>
                  <tr>
                      <td class="tb_label">是否危化企业:</td>
                      <td>
                          {{form.isDangeriousEnterprise==1?'是':'否'}}
                      </td>
                      <td class="tb_label">安全隐患类型:</td>
                      <td>
                          {{form.hiddenDangerTypeName}}
                      </td>
                  </tr>
                  <tr>
                      <td class="tb_label">关注程度:</td>
                      <td>
                          {{form.attentionTypeName}}
                      </td>
                      <td class="tb_label">是否具备建立中共党组织条件:</td>
                      <td>
                          {{form.isCanConstructCPC=='1'?'是':'否'}}
                      </td>
                  </tr>
                  <tr>
                      <td class="tb_label">是否有中共党组织:</td>
                      <td>
                          {{form.hasCPC=='1'?'是':'否'}}
                      </td>
                      <td class="tb_label">中共党员数量:</td>
                      <td>
                          {{form.numberofCPCMember}}
                      </td>
                  </tr>
                  <tr>
                      <td class="tb_label">是否有工会:</td>
                      <td>
                          {{form.hasLabourUnion=='1'?'是':'否'}}
                      </td>
                      <td class="tb_label">工会成员数量:</td>
                      <td>
                          {{form.numberofLUMember}}
                      </td>
                  </tr>
                  <tr>
                      <td class="tb_label">是否有共青团:</td>
                      <td>
                          {{form.hasCYL=='1'?'是':'否'}}
                      </td>
                      <td class="tb_label">共青团员数量:</td>
                      <td>
                          {{form.numberofLCYLMember}}
                      </td>
                  </tr>
                  <tr>
                      <td class="tb_label">是否有妇联:</td>
                      <td>
                          {{form.hasWomenFederation=='1'?'是':'否'}}
                      </td>
                      <td class="tb_label">妇女数量:</td>
                      <td>
                          {{form.numberofWomen}}
                      </td>
                  </tr>
                  <tr>
                      <td class="tb_label">经度:</td>
                      <td>{{form.longitude}}</td>
                      <td class="tb_label">纬度:</td>
                      <td>{{form.latitude}}</td>
                  </tr>
                  <tr>
                      <td class="tb_label">图片资料</td>
                      <td colspan="3">
                          <span v-for="(v,i) in pics" :key="i">
                              <img :src="v" width="400" alt="">
                          </span>
                      </td>
                  </tr>
                  <tr>
                      <td colspan="4" align="center">
                        <el-button type="text" size="large" @click="printTable('economyInfo')">[打印]</el-button>
                      </td>
                  </tr>
              </table>
            </div>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import * as api from '@/api/orgManage'
export default {
  props:{
    id:String
  },
  data() {
    return {
      form: {
        enterpriseUSCcode: "", //'统一社会信用代码',
        enterpriseName: "", //'企业名称',
        netGridID: "",
        enterpriseTypeValue: "", //'企业类别，编码见GBT31000-2015， 5.44',
        enterpriseAddress: "", //'企业地址',
        regionalismCode:'',// varchar(6) DEFAULT NULL COMMENT '行政区划代码',
        enterpriseContact: "", //'企业联系方式，手机号码或固定电话',
        enterpriseMemberNumber: "", //,
        enterpriseLeaderCertTypeValue: "", //'法定代表人证件代码，符合GA/T 517',
        enterpriseLeaderCertID: "", //'法定代表人证件号码',
        enterpriseLeaderName: "", //'法定代表人姓名',
        enterpriseLeaderContact: "", // '法定代表人联系方式',
        securityLeaderCertID:'', // varchar(18) DEFAULT NULL COMMENT '保卫负责人身份证',
        securityLeaderName: "", //'治保负责人姓名',
        securityLeaderContact: "", //'治保负责人联系方式',
        chairmanCertID:'',// varchar(18) DEFAULT NULL COMMENT '董事长身份证号',
        chairmanName:'',// varchar(45) DEFAULT NULL COMMENT '董事长姓名',
        chairmanContact:'',// varchar(45) DEFAULT NULL COMMENT '董事长联系电话',
        generalManagerCertID:'',// varchar(45) DEFAULT NULL COMMENT '总经理身份证号',
        generalManagerName:'',// varchar(45) DEFAULT NULL COMMENT '总经理姓名',
        generalManagerContact:'',// varchar(45) DEFAULT NULL COMMENT '总经理联系方式',
        isDangeriousEnterprise: 0, //'是否危化企业？1表示是，0表示否',
        hiddenDangerTypeValue: "", //'安全隐患类型，编码见5.45',
        attentionTypeValue: "", //'关注程度，编码见5.46',
        isCanConstructCPC: 0, //'是否具备建立中共党组织条件？',
        hasCPC: 0, //'是否有中共党组织？',
        numberofCPCMember: "", //'中共党员数量',
        hasLabourUnion: 0, //'是否有工会？',
        numberofLUMember: "", //'工会成员数量',
        hasCYL: 0, //'是否有共青团？',
        numberofLCYLMember: "", //'共青团员数量',
        hasWomenFederation: 0, //'是否有妇联？',
        numberofWomen: "", //'妇女数量',
        longitude: "", //'地理经度信息',
        latitude: "", //'地理纬度信息',
        isLogisticsEnterprise: 0, //'是否物流企业？1=是，0=否',
        isKeyEnterprise: 0, //'是否重点企业？1=是，0=否。',
        businessScope: "" //'业务经营范围'
      },
      pics:[]
    };
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
    goBack(){
      this.$router.go(-1)
    }
  },
  watch:{
    id:function(val){
      api.getEconomyOrgDetail(val).then(res=>{
        this.form = res.data.basic[0]
        this.pics = res.data.pictures
      })
    }
  },
  mounted(){
      api.getEconomyOrgDetail(this.id).then(res=>{
        this.form = res.data.basic[0]
        this.pics = res.data.pictures
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
    width: 15%;
    text-align: right;
  }
</style>




// WEBPACK FOOTER //
// src/views/socialOrganizationManage/economyOrgInfo.vue?906fd22c