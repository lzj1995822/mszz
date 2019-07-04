<template>
  <div style="padding:3%">
      <el-row>
          <el-col :span="12">
              <el-form :model="form" ref="videoForm" label-width="200px">
                <el-form-item v-for="(v,k,i) in form" :label="labels[i]" :key="v.id" :prop="k">
                    <el-select v-if="k=='ethnicity'" v-model="form[k]">
                        <el-option v-for="(v,i) in Ethnicity" :key="i" :value="v.ethnicity" :label="v.ethnicityName"></el-option>
                    </el-select>
                    <el-select v-else-if="k=='politics'" v-model="form[k]">
                        <el-option v-for="(v,i) in Politics" :key="i" :value="v.politicsTypeValue" :label="v.politicsTypeName"></el-option>
                    </el-select>
                    <el-select v-else-if="k=='education'" v-model="form[k]">
                        <el-option v-for="(v,i) in Education" :key="i" :value="v.education" :label="v.educationTypeName"></el-option>
                    </el-select>
                    <el-select v-else-if="k=='netGridID'" v-model="form[k]">
                        <el-option v-for="(v,i) in netGridType" :key="i" :value="v.netGridID" :label="v.netGridName"></el-option>
                    </el-select>
                    <el-date-picker v-else-if="k=='birthDate'" v-model="form[k]"></el-date-picker>
                    <el-radio-group v-else-if="k=='sex'" v-model="form[k]">
                      <el-radio-button :label="1">男</el-radio-button>
                      <el-radio-button :label="0">女</el-radio-button>
                    </el-radio-group>
                    <el-input v-else v-model="form[k]"></el-input>
                </el-form-item>
                <el-form-item align="center">
                    <el-button type="warning">重置</el-button>
                    <el-button type="primary" @click="addNewRecord">添加</el-button>
                </el-form-item>
              </el-form>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import * as api from "@/api/zonghezhili/duiwujianshe"
import * as api2 from "@/api/netGridManage"

export default {
  data() {
    return {
      num: 4,
      form: {
        name: "", //                varchar(50),
        sex: 1, //                  int comment '值=1，代表男性；值=0，代表女性。',
        ethnicity: "", //            varchar(20) comment '民族',
        politics: "", //             varchar(20) comment '政治面貌',
        certID: "", //               varchar(18),
        birthDate: "", //            date,
        education: "", //            varchar(10) comment '学历',
        mobileTel: "", //            varchar(18) comment '移动电话',
        fixedTel: "", //             varchar(18) comment '固定电话',
        netGridID: "", //            bigint,
      },
      labels: ["姓名", "性别", "民族","政治面貌","身份证","出生日期","学历","移动电话","固定电话","所属网格"],
      Politics: [],
      Education:[],
      Ethnicity:[],
      netGridType: []
    };
  },
  methods: {
    addNewRecord() {
      api2.addInfo(this.form).then(res => {
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
    api.fetchServedPersonManageTypes().then(res=>{
        this.Politics = res.data.codePoliticsType
        this.netGridType = res.data.netGrid
        this.Education = res.data.codeEducationTypeMapper
        this.Ethnicity = res.data.codeEthnicityType
    })
  }
};
</script>

<style scoped>

</style>



// WEBPACK FOOTER //
// src/views/netManage/addNetMember.vue?00581e00