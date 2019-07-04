<template>
  <div>
      <el-row style="padding:20px;margin-top:20px">
        <el-col :span="24">
          <el-steps :active="step" style="margin-left:20%;font-size:39px;cursor:pointer;">
                <el-step title="步骤 1" style="text-align:center" icon="edit" description="添加重点驾驶员信息">
                </el-step>
                <el-step title="步骤 2" icon="upload" description="添加图片信息">
                </el-step>
            </el-steps>
        </el-col>
        <el-col v-if="step==1" :span="18" style="margin-top:30px;">
           <el-form :model="form" :rules="rules" ref="form" label-width="200px" style="margin-left:200px" label-suffix="：">
               <el-form-item v-for="(v,k,i) in form" :label="labels[i]" :key="i" :prop="k" v-if="k!='id'">
                    <el-select v-if="k=='drivingLicenseTypeValue'||k=='netGridID'" v-model="form[k]">
                      <template v-if="k=='drivingLicenseTypeValue'">
                        <el-option v-for="v in lisenceType" :key="i" :value="v.drivingLicenseTypeValue" :label="v.drivingLicenseTypeName"></el-option>
                      </template>
                      <template v-else-if="k=='netGridID'">
                        <el-option v-for="v in netGridType" :key="i" :value="v.netGridID" :label="v.netGridName"></el-option>
                      </template>
                    </el-select>
                    <el-radio-group v-else-if="k=='sex'" v-model="form[k]">
                      <el-radio-button :label="1">男</el-radio-button>
                      <el-radio-button :label="0">女</el-radio-button>
                    </el-radio-group>
                    <el-input autosize v-else-if="k=='remarks'||k=='homeAddress'" v-model="form[k]" :rows="3" type="textarea"></el-input>
                    <el-input v-else v-model="form[k]" style="width:400px"></el-input>
                </el-form-item>
                <el-form-item align="center">
                    <el-button type="warning">重置</el-button>
                    <el-button type="primary" @click="addNewRecord">添加</el-button>
                </el-form-item>
           </el-form>
        </el-col>
        <el-col v-else-if="step==2" style="margin-top:30px;" :span="18">
          <div style="margin-left:25%">
            <h4>图片上传（支持多图）</h4>
            <el-upload
              class="upload-demo"
              :action="getDomain()+'/msmis/api/key/uploadKeyDriverPictures?id='+form.id"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :headers="header"
              :file-list="fileList2"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </el-col>
        <el-col :span="24">
            <div class="preDiv">
                <i v-if="step!=1" class="fa fa-angle-double-left fa-5x" @click="goPre"></i>
                <div v-if="step!=1" class="directionFont"  @click="goPre">
                    上一步(继续添加信息)
                </div>
            </div>
            <div class="nextDiv">
                <i v-if="step!=2" class="fa fa-angle-double-right fa-5x" @click="goNext"></i>
                <div v-if="step!=2" class="directionFont" @click="goNext">
                    下一步(上传图片)
                </div>
                <i v-if="step==2" class="fa fa-history fa-5x" @click="submit"></i>
                <div v-if="step==2" class="directionFont" @click="submit">
                    完成
                </div>
            </div>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import * as api from "@/api/videoManage";
import * as api2 from "@/api/trafficManage";
import { getToken } from '../../utils/auth';

export default {
  data() {
    return {
      mytype: 2,
      flag: 0,
      step: 1,
      fileList2: [],
      dialogVisible: false,
      form: {
        id: "",
        keyDriverName: "", //        varchar(50),
        certifID: "", //             char(18) not null comment '身份证号. 编码应符合GB 11643',
        sex: 1, //                  char(1) comment '1=男性；0=女性，编码应符合 GB/T 2261.1',
        contact: "", //              varchar(50) comment '联系方式',
        drivingLicenseTypeValue: "", // char(2) comment '准驾车型',
        homeAddress: "", //          varchar(200) comment '家庭住址',
        netGridID: 1, //            bigint comment '常住地址所在网格',
        enterpriseUSCcode: "", //    char(18) comment '如果该驾驶员属于某个公司，则填入该公司统一社会信用代码；否则，可不填。',
        remarks: "" //              varchar(500)
      },
      labels: [
        "编号",
        "姓名",
        "身份证号",
        "性别",
        "联系方式",
        "准驾车型",
        "家庭住址",
        "所属网格",
        "全国统一代码",
        "备注"
      ],
      netGridType: [],
      lisenceType: [],
      rules: {}
    };
  },
  methods: {
    header:{
      token:getToken()
    },
    getDomain() {
      return 'http://' + window.location.host;
    },
    goPre() {
      this.flag = 0;
      if (this.step > 1) {
        this.step = this.step - 1;
      }
    },
    goNext() {
      // if (this.flag == 0 || this.form.keyDriverName == "") {
      //   this.$notify.error({
      //     title: "错误",
      //     message: "请先您保存基本信息，再添加图片信息！"
      //   });
      //   return;
      // }
      if (this.step < 2) {
        this.step = this.step + 1;
      }
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
      this.$router.go(-1);
    },
    addNewRecord(formName) {
      api2.addKeyDriver(this.form).then(res => {
        if (res.data) {
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          this.form.id = res.data;
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
    api.fetchNetGrid().then(res => {
      this.netGridType = res.data;
    });
    api2.fetchDriverLiscenseCode().then(res => {
      this.lisenceType = res.data;
    });
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
// src/views/trafficManage/addKeyDriver.vue?6e3b4398