<template>
  <div style="padding:3%">
      <el-row>
          <el-col :span="12">
              <el-form :model="form" ref="keyCarForm" label-width="200px">
                <el-form-item v-for="(v,k,i) in form" :label="labels[i]" :key="i" :prop="k">
                     <el-input v-if="k=='keyDriverID'" disabled v-model="form[k]"></el-input>
                    <el-select v-else-if="k=='drivingLicenseTypeValue'" v-model="form[k]">
                        <el-option v-for="v in lisenceType" :key="v.id" :value="v.drivingLicenseTypeValue" :label="v.drivingLicenseTypeName"></el-option>                    </el-select>
                    <el-select v-else-if="k=='netGridID'" v-model="form[k]">
                        <el-option v-for="v in netGridType" :key="v.id" :value="v.netGridID" :label="v.netGridName"></el-option>
                    </el-select>
                    <el-radio-group v-else-if="k=='sex'" v-model="form[k]">
                      <el-radio-button :label="1">男</el-radio-button>
                      <el-radio-button :label="0">女</el-radio-button>
                    </el-radio-group>
                    <el-input autosize v-else-if="k=='remarks'||k=='insuranceInf'||k=='yearCheckInf'" v-model="form[k]" type="textarea"></el-input>
                    <el-input v-else v-model="form[k]"></el-input>
                </el-form-item>
                <el-form-item align="center">
                    <el-button type="primary" @click="addNewRecord">更新</el-button>
                </el-form-item>
              </el-form>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import * as api from "@/api/videoManage";
import * as api2 from "@/api/trafficManage";

export default {
  data() {
    return {
      num: 4,
      form: {
          keyDriverID: "1", //          bigint,
          keyDriverName: "张三丰", //        varchar(50),
          certifID: "3456", //             char(18) not null comment '身份证号. 编码应符合GB 11643',
          sex: 1, //                  char(1) comment '1=男性；0=女性，编码应符合 GB/T 2261.1',
          contact: "189xxxxxx", //              varchar(50) comment '联系方式',
          drivingLicenseTypeValue: "02", // char(2) comment '准驾车型',
          homeAddress: "江苏", //          varchar(200) comment '家庭住址',
          netGridID: "1", //            bigint comment '常住地址所在网格',
          enterpriseUSCcode: "123", //    char(18) comment '如果该驾驶员属于某个公司，则填入该公司统一社会信用代码；否则，可不填。',
          remarks: "123" //              varchar(500)
      },
      labels: ["编号","姓名", "身份证号", "性别", "联系方式",'准驾车型','家庭住址',"所属网格","全国统一代码","备注"],
      netGridType: [],
      lisenceType: []
    };
  },
  methods: {
    addNewRecord() {
      api2.updateKeyDriver(this.form).then(res => {
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
    api.fetchNetGrid().then(res => {
      this.netGridType = res.data;
    });
    api2.fetchDetailToUpdateDriver(id).then(res=>{
      this.form = res.data
    })
    api2.fetchDriverLiscenseCode().then(res => {
      this.lisenceType = res.data;
    });
  }
};
</script>

<style scoped>

</style>



// WEBPACK FOOTER //
// src/views/trafficManage/editDriverInfo.vue?16eb9fb5