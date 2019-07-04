<template>
  <div>
      <el-row>
          <el-col id="KeyDriverInfo" :span="24">
               <table class="userInfoEditTable" style="border-collapse:collapse;background-color:white;" width="100%" cellspacing="0">
                   <tr v-for="(v,k,i) in form" :key="v">
                       <td class="tb_label">{{labels[i]}}</td>
                       <td>
                           {{v}}
                       </td>
                   </tr>
                   <tr>
                       <td class="tb_label">图片资料</td>
                       <td>
                           <span v-for="(v,i) in pics" :key="i">
                               <img width="400" :src="v" alt="">
                           </span>
                       </td>
                   </tr>
                    <tr>
                      <td colspan="2" align="center">
                        <el-button type="text" size="large" @click="printTable('KeyDriverInfo')">[打印]</el-button>
                      </td>
                  </tr>
               </table>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import * as api from '@/api/securityManage'

export default {
  data() {
    return {
      form: {
        inspectRecID: "", //          bigint not null auto_increment,
        inspecterCertID: "", //       char(18) comment '巡查人身份证号',
        inspecterName: "", //         varchar(50) comment '巡查人姓名',
        inspectDateTime: "", //       datetime,
        inspectContent: "", //        varchar(500),
        enterpriseUSCcode: "", //     char(18) comment '所在企业统一社会信用代码',
        remarks: "" //               varchar(500) comment '备注',
      },
      labels: ["编号", "执勤点名称", "所属网格", "所属经度", "所属纬度"],
      pics:[]
    };
  },
  methods: {
    printTable(div) {
      var div_print = document.getElementById(div);
      var newStr = div_print.innerHTML;
      var oldStr = document.body.innerHTML;
      document.body.innerHTML = newStr;
      window.print();
      window.location.reload();
      window.body.innerHTML = oldStr;
      return false;
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  props:['id'],
  watch:{
    id:function (param) {
         api.getDutyPointDetail(this.id).then(res=>{
        this.form = res.data.detail
        this.pics = res.data.pictures
    })
    }
  },
  mounted() {
    api.getDutyPointDetail(this.id).then(res=>{
        this.form = res.data.detail
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
  width: 28%;
  text-align: right;
}
</style>



// WEBPACK FOOTER //
// src/views/publicSecurityManage/viewManageInfo.vue?80df315a