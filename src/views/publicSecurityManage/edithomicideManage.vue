<template>
  <div style="padding:20px">
      <el-row>
          <el-col :span="24">
            <fieldset style="width:80%">
              <legend style="margin-left:40px;">
                <h1>基本信息</h1>
              </legend>
             <el-form :model="form" ref="form" label-width="200px" label-suffix="：">
                <el-form-item v-for="(v,k,i) in form" :label="labels[i]" v-if="k!=='ssEventID'&&k!=='ssEventEndDateTime'" :key="i" :prop="k">
                    <el-select v-if="k=='ssEventKind'" v-model="form[k]">
                        <el-option label="一般事件" :value="1"></el-option>
                        <el-option label="重大事件" :value="2"></el-option>
                    </el-select>
                    <el-select v-else-if="k=='ssEventTypeValue'||k=='netGridID'||k=='ssEventStatusTypeValue'" v-model="form[k]">
                      <template v-if="k=='ssEventTypeValue'">
                        <el-option v-for="(v,i) of EventType" :key="i" :label="v.sseventTypeName" :value="v.sseventTypeValue"></el-option>
                      </template>
                      <template v-else-if="k=='netGridID'">
                        <el-option  v-for="(n,i) of GridID" :value="n.netGridID" :label="n.netGridName" :key="i"></el-option>
                      </template>
                      <template v-else-if="k=='ssEventStatusTypeValue'">
                        <el-option v-for="(vs,i) in EventStatusType" :key="i" :value="vs.sseventStatusTypeValue" :label="vs.sseventStatusTypeName"></el-option>
                      </template>
                    </el-select>
                    <el-input type="textarea" v-else-if="k=='ssEventContent'||k=='currentRemarks'" v-model="form[k]"></el-input>
                    <el-date-picker type="datetime" v-else-if="k=='ssEventStartDateTime'" @change="changeDate" v-model="form[k]">
                    </el-date-picker>
                    <el-input v-else style="width:300px;" v-model="form[k]"></el-input>
                </el-form-item>
             <el-row>
               <el-col :span="20" align="center">
                 <el-form-item>
                  <!-- <el-button type="warning" @click="resetForm('form')">重置</el-button> -->
                  <el-button type="primary" @click="updateRecord">更新</el-button>
                 </el-form-item>
               </el-col>
             </el-row>
           </el-form>
          </fieldset>
          </el-col>
          <el-col :span="24">
            <fieldset style="width:80%">
              <legend style="margin-left:40px;">
                <h1>当事人</h1>
              </legend>
              <div v-for="(saform,i) in invokePerson" :key="saform.id" style="margin-top:10px;">
                <el-alert :title="'当事人('+(i+1)+')'" type="info" style="font-size:20px;color:whitesmoke" :closable="false">
                   <el-button type="danger" size="small" style="float:right" @click="deletePerson(saform.ssEPersonsID)">删除</el-button>
                </el-alert>
                <div style="border:1px;background-color:whitesmoke;padding:5px;margin-top:10px">
                  <el-form :model="saform" style="border:1px;margin-top:5px" label-width="120px" label-suffix="：">
                    <el-form-item v-for="(value,key,index) in saform" :key="index" v-if="key!=='ssEPersonsID'&&key!=='ssEventID'" :label="label[index]" :prop="key">
                    <el-input v-model="saform[key]"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="danger"  @click="updateSA(saform)">更新信息</el-button>
                    <el-button v-if="i==invokePerson.length-1" style="float:right" type="primary" @click="addSAPerson()"><i class="fa fa-plus fa-lg"></i> 新增当事人</el-button>
                  </el-form-item>
                </el-form>
                </div>
              </div>
            </fieldset>
          </el-col>
      </el-row>

      <el-dialog
      title="添加当事人"
      :visible.sync="dialogVisible"
      size="tiny">
      <el-form :model="SAForm" label-position="left">
        <el-form-item v-for="(v,k,i) in SAForm" :key="i" :label="label2[i]">
          <el-input v-model="SAForm[k]" v-if="k=='ssEventID'" disabled placeholder=""></el-input>
          <el-input v-model="SAForm[k]" v-else placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveSA()">保存</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import * as api from "@/api/securityManage";
import * as api2 from "@/api/orgManage";

export default {
  data() {
    return {
      dialogVisible:false,
      ImageList: [],
      videoList:[{id:'',url:''}],
      invokePerson:[],
      num: 4,
      form: {
        ssEventID: "", //                  bigint not null auto_increment,
        ssEventName: "",
        ssEventKind: "", //               '事件性质，如1=一般事件；2=重大事件；等',
        ssEventTypeValue: "", //          '事件类型，如杀人、放火、抢劫等',
        ssEventContent: "", //             varchar(1000),
        ssEventStartDateTime: "", //       datetime,
        SSEventEndDateTime: "", //         datetime,
        ssEventHappenLongitude: "", //     '地理经度信息',
        ssEventHappenLatitude: "", //      '地理纬度信息',
        ssEventStatusTypeValue: "", //     '当前事件处理的最新状态',
        currentRemarks: "", //              varchar(1000),
        currentResponsiblePersonCertID: "", //  '当前经办人员身份证号',
        currentResponsiblePersonName: "", //  '当前经办人员姓名',
        currentResponsiblePersonContact: "", //'经办人员联系方式',
        netGridID: "", //所属网格
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
        "事件发生网格",
      ],
      SAForm:{
        ssEventID: "", //'社会安全事件ID'
        involvedPersonCertID: "", //
        involvedPersonName: "", //'当事人姓名'
        involvedPersonRemark: "", //'当事人备注'
        involvedPersonContact: "" //'当事人号码'
      },
      label: ["编号","事件编号", "涉案人身份证", "涉案人姓名", "涉案人备注", "当事人号码"],
      label2: ["事件编号", "涉案人身份证", "涉案人姓名", "涉案人备注", "当事人号码"],
      GridID: [],
      EventType: [],
      EventStatusType: []
    };
  },
  methods: {
    saveSA(){
       api.addSSEventInvolvedPersons(this.SAForm).then(res => {
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "当事人添加成功!"
            });
            var copy = Object.assign({}, this.SAForm);
            this.invokePerson.push(copy)
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
      });
    },
    addSAPerson() {
      this.dialogVisible = true
    },
    updateSA(query){
      api.updateSSEventInvolvedPersons(query).then(res=>{
        if (res.code == 200) {
            this.$message({
              type: "success",
              message: "当事人修改成功!"
            });
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
      })
    },
    deletePerson(id){
      api.deleteSSEventInvolvedPersons(id).then(res=>{
        if (res.code == 200) {
            this.$message({
              type: "success",
              message: "当事人删除成功!"
            });
            for(let i=0;i<this.invokePerson.length;i++){
              if(this.invokePerson[i].ssEPersonsID==id){
                this.invokePerson.splice(i, 1);
                break;
              }
            }
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
      })
    },
    changeDate(val) {
      this.form.ssEventStartDateTime = val;
    },
    updateRecord() {
        api.updateSSEvent(this.form).then(res => {
          if (res.data) {
            this.$message({
              type: "success",
              message: "更新成功!"
            });
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        });
    }
  },
  mounted() {
    let id = this.$route.query.id;
    api.getSSEventCode().then(res => {
      this.EventType = res.data.EventType;
      this.EventStatusType = res.data.EventStatusType;
    });
    api2.getOrgCode().then(res => {
      this.GridID = res.data.netGrid;
    });
    api.getDetailToUpdate(id).then(res=>{
      this.form = res.data.basic
      this.ImageList = res.data.media.pictures
      this.videoList = res.data.media.video
      this.invokePerson = res.data.involvedPersons
      this.SAForm.ssEventID = this.form.ssEventID
    })
  }
};
</script>

<style scoped>

</style>



// WEBPACK FOOTER //
// src/views/publicSecurityManage/edithomicideManage.vue?c4030f9c