<template>
  <div style="padding:3%">
      <el-row>
          <el-col :span="12">
              <el-form :model="form" ref="videoForm" label-width="200px">
                <el-form-item v-for="(v,k,i) in form" :label="labels[i]" :key="v.id" :prop="k">
                    <el-select v-if="k=='schoolID'" filterable  v-model="form[k]">
                        <el-option v-for="(v,i) in SchoolCode" :key="i" :value="v.id" :label="v.schoolName"></el-option>
                    </el-select>
                    <el-select v-else-if="k=='netGridID'" v-model="form[k]">
                        <el-option v-for="v in netGridType" :key="v.id" :value="v.netGridID" :label="v.netGridName"></el-option>
                    </el-select>
                    <el-input-number :min="0" v-else-if="k=='longitude'||k=='latitude'" v-model="form[k]"></el-input-number>
                    <el-input v-else v-model="form[k]"></el-input>
                </el-form-item>
                <el-form-item align="center">
                    <el-button type="warning" @click="reset">重置</el-button>
                    <el-button type="primary" @click="addNewRecord">添加</el-button>
                </el-form-item>
              </el-form>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import * as api from "@/api/schoolManage";
import * as api2 from "@/api/videoManage";

export default {
  data() {
    return {
      num: 4,
      form: {
        videoName: "", // varchar(100) DEFAULT NULL,
        longitude: "", // double(32,8) DEFAULT NULL COMMENT '经度',
        latitude: "", // double(32,8) DEFAULT NULL COMMENT '纬度',
        videoURL: "", // varchar(200) DEFAULT NULL COMMENT '视频流地址URL表示',
        schoolID: "", // bigint(20) DEFAULT NULL COMMENT '所属学校',
        producter: "", // varchar(200) DEFAULT NULL COMMENT '生产厂家',
        remarks: "", // varchar(200) DEFAULT NULL COMMENT '备注',
        netGridID: ""
      },
      labels: ['监控名称','经度','纬度','监控URL','所属学校','生产厂家','备注','所属网格'],
      SchoolType: [],
      SchoolCode: [],
      netGridType: []
    };
  },
  methods: {
    reset() {
      for (var key in this.form) {
        this.form[key] = "";
      }
    },
    addNewRecord() {
      api.addSchoolVideo(this.form).then(res => {
        if (res.data) {
          this.$message({
            type: "success",
            message: "添加成功!"
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
    api2.fetchNetGrid().then(res => {
      this.netGridType = res.data;
    });
    api.getSchoolCode().then(res => {
      this.SchoolType = res.data.SchoolRunningType;
      this.SchoolCode = res.data.SchoolCode
    });
  }
};
</script>

<style scoped>

</style>



// WEBPACK FOOTER //
// src/views/schoolSecurityManage/addSchoolVideo.vue?43a746b7