<template>
  <div>
      <el-row>
          <el-col :span="24">
            <div id="economyInfo">
              <table class="userInfoEditTable" style="border-collapse:collapse;background-color:white;" width="100%" cellspacing="0">
                  <tr>
                      <td class="tb_label">统一社会信用代码:</td>
                      <td>
                          {{form.enterpriseUSCcode}}
                      </td>
                      <td class="tb_label">登记证号:</td>
                      <td>
                          {{form.registerNumber}}
                      </td>
                  </tr>
                  <tr>
                    <td class="tb_label">成立日期:</td>
                    <td>
                      {{form.establishDate}}
                    </td>
                    <td class="tb_label">创建日期:</td>
                    <td>
                      {{form.creationDate}}
                    </td>
                  </tr>
                  <tr>
                    <td class="tb_label">登记管理机关代码：</td>
                    <td colspan="3">
                      {{form.registerManagOrgCode}}
                    </td>
                  </tr>
                  <tr>
                      <td class="tb_label">组织名称:</td>
                      <td>
                          {{form.societyOrgName}}
                      </td>
                       <td class="tb_label">关注程度</td>
                      <td>
                          {{form.attentionTypeName}}
                      </td>
                  </tr>
                  <tr>
                      <td class="tb_label">法定代表人姓名:</td>
                      <td>
                          {{form.headerName}}
                      </td>
                      <td class="tb_label">住所:</td>
                      <td>
                          {{form.livingHouse}}
                      </td>
                  </tr>
                  <tr>
                      <td class="tb_label">批准日期:</td>
                      <td>
                          {{form.approvalDate}}
                      </td>
                      <td class="tb_label">社会组织类型:</td>
                      <td>
                          {{form.societyOrgTypeName}}
                      </td>
                  </tr>
                  <tr>
                      <td class="tb_label">状态:</td>
                      <td>
                          {{form.status=='1'?'是':'否'}}
                      </td>
                      <td class="tb_label">负责人证件代码:</td>
                      <td>
                          {{form.responsiblePersonCertTypeName}}
                      </td>
                  </tr>
                  <tr>
                      <td class="tb_label">负责人证件号码:</td>
                      <td>
                          {{form.responsiblePersonCertifID}}
                      </td>
                      <td class="tb_label">负责人姓名:</td>
                      <td>
                          {{form.responsiblePersonName}}
                      </td>
                  </tr>
                  <tr>
                      <td class="tb_label">负责人联系方式:</td>
                      <td>
                          {{form.responsiblePersonContact}}
                      </td>
                      <td class="tb_label">办公地址:</td>
                      <td>
                          {{form.officeAddress}}
                      </td>
                  </tr>
                  <tr>
                    <td class="tb_label">行政区划代码:</td>
                    <td>
                      {{form.regionalismCode}}
                    </td>
                    <td class="tb_label">保卫负责人身份证:</td>
                    <td>
                      {{form.securityLeaderCertID}}
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
                      <td class="tb_label">资金来源</td>
                      <td>
                          {{form.sourceofFunds}}
                      </td>
                      <td class="tb_label">是否有境外背景</td>
                      <td>
                          {{form.isOverseasBackground=='1'?'是':'否'}}
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
import * as api from "@/api/orgManage";
export default {
  props:{
    id:String
  },
  watch:{
    id:function(val){
            api.getSocietyOrgDetailByCode(this.id).then(res=>{
          this.form = res.data[0]
      })
    }
  },
  data() {
    return {
      form: {
            enterpriseUSCcode:'',             //'统一社会信用代码',
            registerNumber:'',                //'登记证号',
            societyOrgName:'',                //组织名称,
            registerManagOrgCode:'',          //'登记管理机关代码',
            headerName:'',                    //'法定代表人姓名',
            livingHouse:'',                   //'住所',
            approvalDate:'',                  //'批准日期，YYYYMMDD',
            societyOrgTypeValue:'',           //'编码见5.47',
            status:'',                        //
            responsiblePersonCertTypeValue:'',//'负责人证件代码，编码符合GA/T 517',
            responsiblePersonCertifID:'',     //'负责人证件代码',
            responsiblePersonName:'',         //'负责人姓名',
            responsiblePersonContact:'',      //'负责人联系方式',
            officeAddress:'',                 //,
            securityLeaderName:'',            //'治保负责人姓名',
            securityLeaderContact:'',         //'治保负责人联系方式',
            attentionTypeValue:'',            //'关注程度，编码见5.46',
            isCanConstructCPC:'',             //'是否具备建立中共党组织条件？',
            hasCPC:'',                        //'是否有中共党组织？',
            numberofCPCMember:'',             //'中共党员数量',
            hasLabourUnion:'',                //'是否有工会？',
            numberofLUMember:'',              //'工会成员数量',
            hasCYL:'',                        //'是否有共青团？',
            numberofLCYLMember:'',            //'共青团员数量',
            hasWomenFederation:'',            //'是否有妇联？',
            numberofWomen:'',                 //'妇女数量',
            sourceofFunds:'',                 //'资金来源',
            isOverseasBackground:'',          //'是否有境外背景？',
            longitude:'',                     //'地理经度信息',
            latitude:'',                      //'地理纬度信息'
      }
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
  mounted(){
      api.getSocietyOrgDetailByCode(this.id).then(res=>{
          this.form = res.data[0]
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
// src/views/socialOrganizationManage/socialOrgInfo.vue?8ac488fc