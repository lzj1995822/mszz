<template>
  <div>
      <el-row>
          <el-tabs v-model="activeName">
            <el-tab-pane label="基本信息" name="first">
              <el-col id="KeyDriverInfo"  :span="24">
               <table class="userInfoEditTable" style="border-collapse:collapse;background-color:white;" width="100%" cellspacing="0">
                   <tr>
                       <td style="text-align:left;font-weight:bold" colspan="2"><h3>事件基本信息</h3></td>
                     </tr>
                   <tr v-for="(v,k,i) in form"  v-if="k!=='eventID'&&k!=='currentResponsiblePersonCertID'&& k!=='currentResponsiblePersonName'&&k!=='currentResponsiblePersonContact'">
                       <td class="tb_label">{{labels[i]}}</td>
                       <td>
                           <span v-if="k=='eventKind'">
                               {{getEventKind(v)}}
                           </span>
                           <span v-else>
                                {{v}}
                           </span>
                       </td>
                   </tr>
                   <tr v-if="pics!=''">
                     <td class="tb_label">图像资料</td>
                     <td>
                       <span v-for="(v,i) of pics">
                         <img :src="v.url" width="300" alt="">
                       </span>
                     </td>
                   </tr>
                   <tr v-if="video!==''">
                     <td class="tb_label">视频资料</td>
                     <td>
                       <video :src="video.url" controls width="600"></video>
                     </td>
                   </tr>
                   <template v-for="(k,i) of SAPerson">
                     <tr>
                       <td style="text-align:center;font-weight:bold" colspan="2">当事人({{i+1}})</td>
                     </tr>
                      <tr v-for="(x,y,z) of k" v-if="y!=='eventID'&&y!=='spEPersonsID'&&y!=='taccidentPersonsID'">
                        <td class="tb_label">{{label[z]}}</td>
                        <td>{{x}}</td>
                      </tr>
                   </template>

                    <tr>
                      <td colspan="2" align="center">
                        <el-button type="text" size="large" @click="printTable('KeyDriverInfo')">[打印]</el-button>
                      </td>
                  </tr>
               </table>
          </el-col>
            </el-tab-pane>
            <el-tab-pane label="流程信息" name="second">
              <el-col :span="24">
                 <table class="userInfoEditTable" style="border-collapse:collapse;background-color:white;width:100%;height:100%"  cellspacing="0">

                    <tr v-if="DealingBasic&&DealingBasic.length>0">
                       <td style="text-align:left;font-weight:bold" colspan="2"><h3>事件处理信息</h3></td>
                     </tr>
                     <template v-for="(k,i) of DealingBasic">
                     <tr>
                       <td style="text-align:center;font-weight:bold" colspan="2">处理信息({{i+1}})</td>
                     </tr>
                      <tr v-for="(x,y,z) of k" v-if="y!=='eventID'&&y!=='eventDealingID'">
                        <td class="tb_label">{{label2[z]}}</td>
                        <td>{{x}}</td>
                      </tr>
                   </template>
                   <tr v-if="DealingMedia.pictures&&DealingMedia.pictures.length>0">
                    <td style="text-align:center;font-weight:bold" colspan="2">
                     事件处理图像信息
                    </td>
                   </tr>
                   <tr v-if="DealingMedia.pictures&&DealingMedia.pictures.length>0">
                     <td class="tb_label">图像资料</td>
                     <td>
                       <span v-for="(v,i) of DealingMedia.pictures">
                         <img :src="v.url" width="300" alt="">
                       </span>
                     </td>
                   </tr>
                   <tr v-if="DealingMedia.video&&DealingMedia.video.length>0">
                    <td style="text-align:center;font-weight:bold" colspan="2">
                     事件处理视频资料
                    </td>
                   </tr>
                   <tr v-if="DealingMedia.video&&DealingMedia.video.length>0">
                     <td class="tb_label">视频资料</td>
                     <td>
                       <span v-for="(v,i) of DealingMedia.video">
                         <video :src="v.url" width="600" controls />
                       </span>
                     </td>
                   </tr>
                   <tr>
                   </tr>
                    <tr v-if="Check&&Check.length>0">
                   <td style="text-align:left;font-weight:bold" colspan="2"><h3>事件审核信息</h3></td>
                   </tr>
                   <template v-for="(k,i) of Check">
                     <tr>
                       <td style="text-align:center;font-weight:bold" colspan="2">审核信息({{i+1}})</td>
                     </tr>
                      <tr v-for="(x,y,z) of k" v-if="y!=='eventID'&&y!=='eventCheckedID'">
                        <td class="tb_label">{{label3[z]}}</td>
                        <td>
                          <span v-if="y=='checkedResult'">
                            {{x==1?'审核通过':'审核未通过'}}
                          </span>
                          <span v-else>
                             {{x}}
                          </span>
                        </td>
                      </tr>
                   </template>
                   <tr v-if="Check.length==0&&DealingBasic.length==0&&Distribute.length==0">
                     <td>
                       <span style="text-align:center;padding:400px;color:#909399;font-size:30px">
                         事件未立案或尚未处理
                       </span>
                     </td>
                   </tr>
                    <tr v-if="Distribute&&Distribute.length>0">
                       <td style="text-align:left;font-weight:bold" colspan="2"><h3>事件经办信息</h3></td>
                    </tr>
                    <template v-for="(v,i) of Distribute">
                      <tr>
                        <td style="text-align:center;font-weight:bold" colspan="2">事件经办人({{i+1}})</td>
                      </tr>
                      <tr v-for="(x,y,z) of v" v-if="y!=='eventID'&&y!=='eventDistributeID'">
                        <td class="tb_label">{{label4[z]}}</td>
                        <td>{{x}}</td>
                      </tr>
                    </template>
                 </table>
              </el-col>
            </el-tab-pane>
          </el-tabs>
      </el-row>
  </div>
</template>

<script>
import * as api from "@/api/trafficManage";
export default {
  data() {
    return {
      form: {
        eventID: "", //            bigint not null auto_increment,
        eventName: "", //           '事件名称',
        eventKind: "", //           '事件性质，如1=一般事件；2=重大事件；等',
        eventTypeValue: "", //      '事件类型，如杀人、放火、抢劫等',
        eventContent: "", //         ,
        eventStartDateTime: "", //   datetime,
        // eventEndDateTime:'',//     datetime,
        eventHappenLongitude: "", // '地理经度信息',
        eventHappenLatitude: "", //  comment '地理纬度信息',
        eventStatusTypeValue: "", //   '当前事件处理的最新状态',
        currentRemarks: "", //        ,
        currentResponsiblePersonCertID: "", // '当前经办人员身份证号',
        currentResponsiblePersonName: "", //'当前经办人员姓名',
        currentResponsiblePersonContact: "", //'经办人员联系方式',
        netGridID: "", // ,
        realName: "",
        dept: "",
        mobileTel: ""
      },
      labels: [
        "事件编号",
        "事件名称",
        "事件性质",
        "事件类型",
        "事件详情",
        "事件开始日期",
        "事件结束日期",
        "事发经度",
        "事发纬度",
        "事件处理状态",
        "当前事件记录",
        "当前经办人身份证号码",
        "当前经办人员姓名",
        "当前经办人员联系方式",
        "所属网格",
        "上报人",
        "部门",
        "联系方式"
      ],
      label: [
        "事故编号",
        "当事人身份证",
        "当事人姓名",
        "备注",
        "当事人联系方式"
      ],
      label2: [
        "编号",
        "事件编号",
        "姓名",
        "部门",
        "联系方式",
        "处理日期",
        "处理内容",
        "备注"
      ],
      label3: [
        "编号",
        "人员编号",
        "审核人",
        "所属部门",
        "审核日期",
        "审核结果",
        "备注",
        "事故编号"
      ],
      label4: [
        "编号",
        "人员编号",
        "派发人姓名",
        "所属部门",
        "派发对象姓名",
        "所属部门",
        "开始时间",
        "结束时间",
        "备注"
      ],
      pics: [],
      video: {
        id: 1,
        url: ""
      },
      SAPerson: [],
      Check: [],
      DealingBasic: [],
      DealingMedia: {
        video: [],
        pictures: []
      },
      Distribute: [],
      activeName: "first"
    };
  },
  methods: {
    getEventKind(v) {
      if (v == 1) {
        return "一般事件";
      } else {
        return "重大事件";
      }
    },
    printTable(div) {
      var div_print = document.getElementById(div);
      var newStr = div_print.innerHTML;
      var oldStr = document.body.innerHTML;
      document.body.innerHTML = newStr;
      window.print();
      window.location.reload();
      window.body.innerHTML = oldStr;
      return false;
    }
  },
  props: ["id"],
  watch: {
    id: function(id) {
      api.getTrafficAccidentDetail(this.id).then(res => {
        this.form = res.data.trafficAccidentBasic[0];
        this.pics = res.data.pictures.length > 0 ? res.data.pictures : "";
        this.video = res.data.video.length > 0 ? res.data.video[0] : "";
        this.SAPerson = res.data.involvedPersons;

        this.DealingBasic = res.data.trafficAccidentDealingBasic;
        this.DealingMedia = res.data.trafficAccidentDealingMedia;
        this.Check = res.data.checked;
        this.Distribute = res.data.distribute;
      });
    }
  },
  mounted() {
    api.getTrafficAccidentDetail(this.id).then(res => {
      this.form = res.data.trafficAccidentBasic[0];
      this.pics = res.data.pictures.length > 0 ? res.data.pictures : "";
      this.video = res.data.video.length > 0 ? res.data.video[0] : "";
      this.SAPerson = res.data.involvedPersons;

      this.DealingBasic = res.data.trafficAccidentDealingBasic;
      this.DealingMedia = res.data.trafficAccidentDealingMedia;
      this.Check = res.data.checked;
      this.Distribute = res.data.distribute;
    });
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
  width: 20%;
  text-align: right;
}
</style>



// WEBPACK FOOTER //
// src/views/trafficManage/trafficEventInfo.vue?fc7afb06