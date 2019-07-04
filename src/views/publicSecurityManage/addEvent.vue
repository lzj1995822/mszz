<template>
  <div>
      <el-row style="padding:20px;margin-top:20px">
        <el-col :span="24">
          <el-steps :active="step" style="margin-left:20%;font-size:39px;cursor:pointer;">
                <el-step title="步骤 1" style="text-align:center" icon="edit" description="添加事件的的基本信息">
                </el-step>
                <el-step title="步骤 2" icon="upload" description="添加当事人">
                </el-step>
                <el-step title="步骤 3" icon="upload" description="添加图片和视频">
                </el-step>
            </el-steps>
        </el-col>
        <el-col v-if="step==1" :span="18" style="margin-top:30px;margin-left:10%">
           <el-form :model="form" :rules="rules" ref="form" label-width="200px" label-suffix="：">
                <el-form-item v-for="(v,k,i) in form" :label="labels[i]" v-if="k!=='ssEventID'&&k!=='currentResponsiblePersonCertID'" :key="i" :prop="k">
                    <el-select v-if="k=='ssEventKind'" v-model="form[k]">
                      <el-option label="一般事件" :value="1"></el-option>
                      <el-option label="重大事件" :value="2"></el-option>
                    </el-select>
                    <el-cascader :options="NetGrid" @change="changeVal" v-model="selected" :props="props" v-else-if="k=='netGridID'">
                    </el-cascader>
                    <el-select v-else-if="k=='ssEventTypeValue'||k=='ssEventStatusTypeValue'" v-model="form[k]">
                      <template v-if="k=='ssEventTypeValue'">
                        <el-option v-for="(v,i) of EventType" :key="i" :label="v.sseventTypeName" :value="v.sseventTypeValue"></el-option>
                      </template>
                      <!-- <template v-else-if="k=='netGridID'">
                        <el-option  v-for="(n,i) of GridID" :value="n.netGridID" :label="n.netGridName" :key="i"></el-option>
                      </template> -->
                      <template v-else-if="k=='ssEventStatusTypeValue'">
                        <el-option v-for="(vs,i) in EventStatusType" :key="i" :value="vs.sseventStatusTypeValue" :label="vs.sseventStatusTypeName"></el-option>
                      </template>
                    </el-select>
                    <el-input type="textarea" v-else-if="k=='ssEventContent'||k=='currentRemarks'" v-model="form[k]"></el-input>
                    <el-date-picker type="datetime" v-else-if="k=='ssEventStartDateTime'" v-model="form[k]"></el-date-picker>
                    <el-input v-else style="width:300px;" v-model="form[k]"></el-input>
                </el-form-item>
             <!-- <el-row>
               <el-col :span="20" align="center">
                 <el-form-item>
                  <el-button type="warning" @click="resetForm('form')">重置</el-button>
                  <el-button type="primary" @click="saveForm('form')">{{button}}</el-button>
                 </el-form-item>
               </el-col>
             </el-row> -->
           </el-form>
        </el-col>
        <el-col :span="18" style="margin-top:20px" v-else-if="step==2">
          <div style="margin-left:25%;">
            <fieldset>
              <legend style="font-size:20px">当事人列表</legend>
              <div v-for="(saform,i) in Forms" :key="saform.id" style="margin-top:10px;">
                <el-alert :title="'当事人<'+(i+1)+'>'" type="info" style="font-size:20px;color:black" :closable="false">
                   <el-button type="danger" size="small" style="float:right" v-if="i!=Forms.length-1" @click="deletePerson(i)">删除</el-button>
                </el-alert>
                <div style="border:1px;background-color:whitesmoke;padding:5px;margin-top:10px">
                  <el-form :model="saform" style="border:1px;margin-top:5px" label-width="120px" label-suffix="：">
                    <el-form-item v-for="(value,key,index) in saform" :key="index" v-if="key!=='ssEventID'" :label="label[index]" :prop="key">
                    <el-input v-model="saform[key]"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="warning"  v-if="i==Forms.length-1" @click="saveSAPerson">保存所有</el-button>
                    <el-button v-if="i==Forms.length-1" style="float:right" type="primary" @click="addSAPerson()"><i class="fa fa-plus fa-lg"></i> 新增当事人</el-button>
                  </el-form-item>
                </el-form>
                </div>
              </div>
            </fieldset>
          </div>

        </el-col>
        <el-col v-else-if="step==3" style="margin-top:30px;" :span="18">
          <!-- -->
          <div style="margin-left:25%">
            <h4>图片上传（支持多图）</h4>
            <el-upload
              :action="'/msmis/api/SSEvent/addSSEventPictures?ID='+form.ssEventID"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList2"
              :headers="header"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">可上传jpg/jpeg/png文件</div>
            </el-upload>
          </div>
          <div style="margin-left:25%;margin-top:100px;">
            <h4>视频上传</h4>
           <el-upload
             drag
             :action="getDomian()+'/msmis/api/SSEvent/addSSEventVideo?ID='+form.ssEventID"
             :headers="header"
             multiple>
             <i class="el-icon-upload"></i>
            <div class="el-upload__text">将视频拖到此处，或<em>点击上传</em></div>
           </el-upload>
          </div>
        </el-col>
        <el-col :span="24">
            <!-- <div class="preDiv">
                <i v-if="step!=1" class="fa fa-angle-double-left fa-5x" @click="goPre"></i>
                <div v-if="step!=1" class="directionFont"  @click="goPre">
                      上一步
                </div>
            </div> -->
            <div class="nextDiv">
                <i v-if="step==1" class="fa fa-angle-double-right fa-5x" @click="goNext"></i>
                <div v-if="step==1" class="directionFont" @click="goNext">
                    保存,下一步
                </div>
                <i v-if="step==3" class="fa fa-history fa-5x" @click="submit"></i>
                <div v-if="step==3" class="directionFont" @click="submit">
                    完成
                </div>
            </div>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import * as api from "@/api/securityManage";
import * as api2 from "@/api/orgManage";
import {formatDateTime} from '@/utils/index'
import { getToken } from '../../utils/auth';
export default {
  data() {
    return {
      header:{
        token:getToken()
      },
      selected:[],
      mytype: 2,
      flag: 0,
      button: "保存",
      step: 1,
      fileList2: [],
      dialogVisible: false,
      NetGrid:[],
      props: {
        value: "netGridID",
        label: "netGridName",
        children: "children"
      },
      form: {
        ssEventID: "", //                  bigint not null auto_increment,
        ssEventName: "",
        netGridID: "", //所属网格
        ssEventKind: "", //               '事件性质，如1=一般事件；2=重大事件；等',
        ssEventTypeValue: "", //          '事件类型，如杀人、放火、抢劫等',
        ssEventContent: "", //             varchar(1000),
        ssEventStartDateTime: "", //       datetime,
        ssEventHappenLongitude: "", //     '地理经度信息',
        ssEventHappenLatitude: "", //      '地理纬度信息',
        currentRemarks: "", //              varchar(1000),
        currentResponsiblePersonCertID: "" //  '当前经办人员身份证号',
      },
      labels: [
        "事件编号",
        "事件名称",
        "事件发生网格",
        "事件性质",
        "事件类型",
        "事件详情",
        "事件开始日期",
        "事发经度",
        "事发纬度",
        "当前事件记录",
        "当前经办人身份证号码"
      ],
      Forms: [
        {
          ssEventID: "", //'社会安全事件ID'
          involvedPersonCertID: "", //
          involvedPersonName: "", //'当事人姓名'
          involvedPersonRemark: "", //'当事人备注'
          involvedPersonContact: "" //'当事人号码'
        }
      ],
      label: ["事件编号", "涉案人身份证", "涉案人姓名", "涉案人备注", "当事人号码"],
      rules: {
        ssEventName:[
          { required: true, message: '请输入事件名称', trigger: 'blur' },
        ],
        netGridID: [
          {type:'array',required:true,message:"请选择所属网格", trigger:'change'}
        ]
      },
      GridID: [],
      EventType: [],
      EventStatusType: []
    };
  },
  methods: {
    changeVal(val) {
      this.form.netGridID = val;
    },
    saveSAPerson() {
      for (let i = 0; i < this.Forms.length; i++) {
        this.Forms[i].ssEventID = this.form.ssEventID;
        api.addSSEventInvolvedPersons(this.Forms[i]).then(res => {
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "当事人添加成功!"
            });
            this.step=3
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        });
      }
    },
    deletePerson(i) {
      this.$message.error("删除成功！");
      this.Forms.splice(i, 1);
    },
    addSAPerson() {
      let obj = {
        ssEventID: "", //'社会安全事件ID'
        involvedPersonCertID: "", //
        involvedPersonName: "", //'当事人姓名'
        involvedPersonRemark: "", //'当事人备注'
        involvedPersonContact: "" //'当事人号码'
      };
      this.Forms.push(obj);
    },
    goPre() {
      this.flag = 0;
      if (this.step > 1) {
        this.step = this.step - 1;
      }
    },
    goNext() {
      if(this.step==1){
        if(this.form.ssEventStartDateTime!=='')
          this.form.ssEventStartDateTime = formatDateTime(this.form.ssEventStartDateTime)
        this.form.currentResponsiblePersonCertID = this.$store.getters.user.userID
        this.$refs['form'].validate(valid => {
          this.form.netGridID = this.form.netGridID[1];
          if (valid) {
            api.addSSEventBasic(this.form).then(res => {
              if(res.code == 200 && res.data != null){
                this.form.ssEventID = res.data;
                this.flag = 1;
                this.$message({
                  type: "success",
                  message: "添加成功!"
                });
                this.step = 2
              }else{
                this.$message({
                  type: "error",
                  message: res.message
                });
              }
            });
          }else{
            console.log("error submit!!");
            return false;
          }
        });
      }
      if(this.step==2){
        this.step = 3
      }
    },
    getDomian(){
      return 'http://' + window.location.host;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submit() {
      this.$router.go(0);
    },
    saveForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          api.addSSEventBasic(this.form).then(res => {
            if(res.code == 200 && res.data != null){
              this.form.ssEventID = res.data;
              this.flag = 1;
              this.$message({
                type: "success",
                message: "添加成功!"
              });
            }else{
              this.$message({
                type: "error",
                message: res.message
              });
            }
          });
        }else{
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  mounted() {
    this.NetGrid = this.$store.getters.netgrid.children;
    api.getSSEventCode().then(res => {
      this.EventType = res.data.EventType;
      this.EventStatusType = res.data.EventStatusType;
    });
    api2.getOrgCode().then(res => {
      this.GridID = res.data.netGrid;
      // this.NetGrid = [...this.GridID];
      // for (let i in this.NetGrid) {
      //   this.NetGrid[i].children = [];
      // }
    });
    if(this.flag==0){
      this.step = 1
    }
  }
};
</script>


<style scoped>
.preDiv {
  position: fixed;
  top: 300px;
  left: 10%;
  cursor: pointer;
  color: #58b7ff;
  text-align: center;
  /* margin-left: 10px; */
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
// src/views/publicSecurityManage/addEvent.vue?29bd5407