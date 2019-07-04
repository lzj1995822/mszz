<template>
  <div>
      <el-row style="padding:20px;margin-top:20px">
        <el-col :span="24">
          <el-steps :active="step" style="margin-left:20%;font-size:39px;cursor:pointer;">
                <el-step title="步骤 1" style="text-align:center" icon="edit" description="添加事故的基本信息">
                </el-step>
                <el-step title="步骤 2" icon="edit" description="添加当事人">
                </el-step>
                <el-step title="步骤 3" icon="upload" description="添加图片和视频">
                </el-step>
            </el-steps>
        </el-col>
        <el-col v-if="step==1" :span="18" style="margin-top:30px;margin-left:10%">
           <el-form :model="form" :rules="rules" ref="form" label-width="200px" label-suffix="：">
                <el-form-item v-for="(v,k,i) in form" :label="labels[i]" v-if="k!=='trafficAccidentID'&&k!=='trafficAccidentEndDateTime'&&k!=='trafficAccidentStatusTypeValue'&&k!=='currentResponsiblePersonCertID'" :key="i" :prop="k">
                    <el-select v-if="k=='trafficAccidentKind'||k=='trafficAccidentTypeValue'||k=='trafficAccidentStatusTypeValue'" v-model="form[k]">
                      <!-- <template v-if="k=='netGridID'">
                        <el-option  v-for="(n,i) of GridID" :value="n.netGridID" :label="n.netGridName" :key="i"></el-option>
                      </template> -->
                      <template v-if="k=='trafficAccidentTypeValue'">
                        <el-option  v-for="(n,i) of AccidentType" :value="n.trafficAccidentTypeValue" :label="n.trafficAccidentTypeName" :key="i"></el-option>
                      </template>
                      <template v-else-if="k=='trafficAccidentKind'">
                        <el-option  v-for="(n,i) of AccidentKind" :value="n.trafficAccidentKind" :label="n.trafficAccidentKindName" :key="i"></el-option>
                      </template>
                    </el-select>
                    <el-cascader :options="NetGrid" @change="changeVal" v-model="selected" :props="props" v-else-if="k=='netGridID'">
                    </el-cascader>
                    <el-input type="textarea" v-else-if="k=='trafficAccidentContent'||k=='currentRemarks'" v-model="form[k]"></el-input>
                    <el-date-picker type="datetime" v-else-if="k=='trafficAccidentStartDateTime'" v-model="form[k]"></el-date-picker>
                    <!-- <el-date-picker v-else-if="k=='trafficAccidentEndDateTime'" @change="changeDate2" v-model="form[k]"></el-date-picker> -->
                    <el-input v-else style="width:300px;" v-model="form[k]"></el-input>
                </el-form-item>
             <el-row>
               <el-col :span="20" align="center">
                 <el-form-item>
                  <el-button type="warning" @click="resetForm('form')">重置</el-button>
                  <el-button type="primary" @click="saveForm('form')">{{button}}</el-button>
                 </el-form-item>
               </el-col>
             </el-row>
           </el-form>
        </el-col>
        <el-col :span="18" style="margin-top:20px" v-else-if="step==2">
          <div style="margin-left:25%;">
            <fieldset>
              <legend style="font-size:20px">当事人列表</legend>
              <div v-for="(saform,i) in Forms" :key="saform.id" style="margin-top:10px;">
                <el-alert :title="'当事人('+(i+1)+')'" type="info" style="font-size:20px;font-weight:bold" :closable="false">
                   <el-button type="danger" size="small" style="float:right" v-if="i!=Forms.length-1" @click="deletePerson(i)">删除</el-button>
                </el-alert>
                <div style="border:1px;background-color:whitesmoke;padding:5px;margin-top:10px">
                  <el-form :model="saform" style="border:1px;margin-top:5px" label-width="120px" label-suffix="：">
                    <el-form-item v-for="(value,key,index) in saform" :key="index" v-if="key!=='trafficAccidentID'" :label="label[index]" :prop="key">
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
          <div style="margin-left:25%">
            <h4>图片上传（支持多图）</h4>
            <el-upload
              class="upload-demo"
              :action="'http://223.112.65.198:9898/msmis/api/trafficAccident/addTrafficAccidentPicture?ID='+form.trafficAccidentID"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :headers="header"
              :file-list="fileList2"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
          <div style="margin-left:25%;margin-top:100px;">
            <h4>视频上传</h4>
           <el-upload
             class="upload-demo"
             drag
             :headers="header"
             :action="getDomain()+'/msmis/api/trafficAccident/addTrafficAccidentVideo?ID='+form.trafficAccidentID"
             multiple>
             <i class="el-icon-upload"></i>
            <div class="el-upload__text">将视频拖到此处，或<em>点击上传</em></div>
           </el-upload>
          </div>
        </el-col>
        <el-col :span="24">
            <div class="nextDiv">
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
import * as api from "@/api/trafficManage";
import * as api2 from "@/api/orgManage";
import { formatDateTime } from "@/utils/index";
import { getToken } from '../../utils/auth';

export default {
  data() {
    return {
      selected:[],
      header:{
        token:getToken()
      },
      mytype: 2,
      flag: 0,
      button: "保存",
      step: 1,
      fileList2: [],
      dialogVisible: false,
      form: {
        trafficAccidentID: "",
        trafficAccidentName: "",
        trafficAccidentKind: "", //  int comment '交通事故性质，编码待定',
        trafficAccidentTypeValue: "", // char(2) comment '交通事故类型，待定',
        trafficAccidentContent: "", // varchar(1000) comment '交通事故内容描述',
        trafficAccidentStartDateTime: "", // datetime comment '交通事故开始时间',
        // trafficAccidentEndDateTime:'',// datetime comment '交通事故结束时间',
        trafficAccidentHappenLongitude: "", // double(32,8) comment '交通事故发生地 地理经度信息',
        trafficAccidentHappenLatitude: "", // double(32,8) comment '交通事故发生地  地理纬度信息',
        trafficAccidentStatusTypeValue: "", // char(2) comment '当前交通事故处理的最新状态',
        currentRemarks: "", //       varchar(1000) comment '当前处理交通事故备注',
        currentResponsiblePersonCertID: 1, // char(18) comment '当前经办人员身份证号',
        // currentResponsiblePersonName: "", // varchar(50) comment '当前经办人员姓名',
        // currentResponsiblePersonContact: "", // varchar(50) comment '经办人员联系方式',
        netGridID: "" //            bigint comment '事故发生地所属网格区域',
      },
      // ' 事故结束时间'
      labels: [
        "编号",
        "事故名称",
        "事故性质",
        "事故类型",
        "事故内容描述",
        "事故开始时间",
        "事故发生经度",
        "事故发生纬度",
        "当前事故处理状态",
        "当前交通事故备注",
        "当前经办人身份证号码",
        // "当前经办人姓名",
        // "当前经办人联系方式",
        "事故发生网格"
      ],
      Forms: [
        {
          trafficAccidentID: "", //    bigint comment '交通事故ID',
          involvedPersonCertID: "", // char(18),
          involvedPersonName: "", //   varchar(50) comment '当事人姓名',
          involvedPersonRemark: "", // varchar(500) comment '当事人备注',
          involvedPersonContact: "" // varchar(50) comment '当事人号码',
        }
      ],
      label: [
        "交通事故编号",
        "当事人身份证",
        "当事人姓名",
        "当事人备注",
        "当事人号码"
      ],
      rules: {
        netGridID: [
          {type:'array',required:true,message:"请输入所属网格", trigger:'blur'},
        ]
      },
      GridID: [],
      AccidentKind: [],
      AccidentType: [],
      NetGrid:[],
      props: {
        value: "netGridID",
        label: "netGridName",
        children: "children"
      },
    };
  },
  methods: {
    changeVal(val) {
      this.form.netGridID = val;
    },
    getDomain(){
      return 'http://' + window.location.host;
    },
    saveSAPerson() {
      for (let i = 0; i < this.Forms.length; i++) {
        this.Forms[i].trafficAccidentID = this.form.trafficAccidentID;
        api.addTrafficAccidentInvolvedPersons(this.Forms[i]).then(res => {
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "当事人添加成功!"
            });
            this.step = 3;
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
        trafficAccidentID: "", //    bigint comment '交通事故ID',
        involvedPersonCertID: "", // char(18),
        involvedPersonName: "", //   varchar(50) comment '当事人姓名',
        involvedPersonRemark: "", // varchar(500) comment '当事人备注',
        involvedPersonContact: "" // varchar(50) comment '当事人号码',
      };
      this.Forms.push(obj);
    },
    goPre() {
      this.flag = 0;
      if (this.step > 1) {
        this.step = this.step - 1;
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    resetForm(formName) {
      var ids = this.$store.getters.user.userID
      this.form = {
        trafficAccidentID: "",
        trafficAccidentName: "",
        trafficAccidentKind: "", //  int comment '交通事故性质，编码待定',
        trafficAccidentTypeValue: "", // char(2) comment '交通事故类型，待定',
        trafficAccidentContent: "", // varchar(1000) comment '交通事故内容描述',
        trafficAccidentStartDateTime: "", // datetime comment '交通事故开始时间',
        // trafficAccidentEndDateTime:'',// datetime comment '交通事故结束时间',
        trafficAccidentHappenLongitude: "", // double(32,8) comment '交通事故发生地 地理经度信息',
        trafficAccidentHappenLatitude: "", // double(32,8) comment '交通事故发生地  地理纬度信息',
        trafficAccidentStatusTypeValue: "", // char(2) comment '当前交通事故处理的最新状态',
        currentRemarks: "", //       varchar(1000) comment '当前处理交通事故备注',
        currentResponsiblePersonCertID: ids, // char(18) comment '当前经办人员身份证号',
        // currentResponsiblePersonName: "", // varchar(50) comment '当前经办人员姓名',
        // currentResponsiblePersonContact: "", // varchar(50) comment '经办人员联系方式',
        netGridID: "" //            bigint comment '事故发生地所属网格区域',
      };
      this.flag == 0;
      this.$refs[formName].resetFields();
    },
    submit() {
      this.$router.push("index");
    },
    saveForm(formName) {
      if (this.form.trafficAccidentStartDateTime !== "")
        this.form.trafficAccidentStartDateTime = formatDateTime(this.form.trafficAccidentStartDateTime);
      this.$refs[formName].validate(valid => {
        this.form.netGridID = this.form.netGridID[1];
        if (valid) {
          this.form.currentResponsiblePersonCertID = this.$store.getters.user.userID
          api.addTrafficAccidentBasic(this.form).then(res => {
            if (res.code == 200 && res.data != null) {
              this.form.trafficAccidentID = res.data;
              this.flag = 1;
              this.$message({
                type: "success",
                message: "添加成功!"
              });
              this.step = 2;
            } else {
              this.$message({
                type: "error",
                message: res.message
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  mounted() {
    this.NetGrid = this.$store.getters.netgrid.children;
    api.fetchTrafficCodes().then(res => {
      this.AccidentKind = res.data.AccidentKind;
      this.AccidentType = res.data.AccidentType;
    });
    api2.getOrgCode().then(res => {
      this.GridID = res.data.netGrid;
    });
    if (this.flag == 0) {
      this.step = 1;
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
// src/views/trafficManage/addTrafficEvent.vue?e4f9f43a