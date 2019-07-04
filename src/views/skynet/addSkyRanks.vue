<template>
  <div style="padding:3%">
      <el-row>
          <el-col :span="12">
              <el-form :model="form" ref="videoForm" label-width="200px">
                <el-form-item v-for="(v,k,i) in form" :label="labels[i]" :key="v.id" :prop="k">
                    <el-select v-if="k=='inspectionArea'" filterable  v-model="form[k]">
                        <el-option v-for="(v,i) in Types" :key="i" :value="v.id" :label="v.regionName"></el-option>
                    </el-select>
                    <el-input-number :min="0" v-else-if="k=='processionNumbers'" v-model="form[k]"></el-input-number>
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
import * as api from "@/api/skynetManage";

export default {
  data() {
    return {
      num: 4,
      form: {
          processionName:'',// VARCHAR(45) NULL COMMENT '队伍名称',
          processionContact:'',// VARCHAR(45) NULL COMMENT '联系方式',
          processionDuty:'',// VARCHAR(500) NULL COMMENT '队伍职能',
          processionLeaderName:'',// VARCHAR(45) NULL COMMENT '负责人姓名',
          processionLeaderContact:'',// VARCHAR(45) NULL COMMENT '负责人联系方式',
          processionNumbers:'',// INT NULL COMMENT '队伍人数',
          inspectionArea:'',// BIGINT NULL COMMENT '巡查区域',
          remark:'',// VARCHAR(500) NULL,
      },
      labels: ['队伍名称','联系方式','队伍职能','负责人姓名','负责人联系方式','队伍人数','巡查区域','备注'],
      Types: [],
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
      api.addProcession(this.form).then(res => {
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
    api.selectAllRegion().then(res=>{
      this.Types = res.data
    })
    
  }
};
</script>

<style scoped>

</style>



// WEBPACK FOOTER //
// src/views/skynet/addSkyRanks.vue?3324732a