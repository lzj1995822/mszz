<template>
  <div style="padding:3%">
      <el-row>
          <el-col :span="12">
              <el-form :model="form" ref="videoForm" label-suffix=":" label-width="200px">
                <el-form-item v-for="(v,k,i) in form" :label="labels[i]" :key="v.id" :prop="k">
                    <el-select v-if="k=='videoTypeValue'" v-model="form[k]">
                        <el-option v-for="v in videoType" :key="v.id" :value="v.videoTypeValue" :label="v.videoTypeName"></el-option>
                    </el-select>
                    <!-- <el-cascader change-on-select :options="NetGrid" @change="changeVal"  :props="props" v-else-if="k=='netGridID'">
                    </el-cascader> -->
                    <el-select v-else-if="k=='netGridID'" v-model="form[k]">
                        <el-option v-for="v in netGridType" :key="v.id" :value="v.netGridID" :label="v.netGridName"></el-option>
                    </el-select>
                    <el-input autosize v-else-if="k=='remarks'" v-model="form[k]" type="textarea"></el-input>
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
import * as api from "@/api/videoManage";

export default {
  data() {
    return {
      num: 4,
      form: {
        videoName: "", //varchar(100),
        videoTypeValue: "", //'视频类型编码值，如01表示森林监控；02表示交通监控。',
        videoURL: "", //'视频流地址URL表示',
        longitude: "", //'地理经度信息',
        latitude: "", //'地理纬度信息',
        // netGridID: "", //'网格编号，表示所述网格区域',
        producter: "", //'生产厂家',
        remarks: "" //'备注',
      },
      labels: ["监控名称", "监控类型", "监控UUID", "经度", "纬度",
      // "所属网格",
       "生产厂家", "备注"],
      videoType: [],
      netGridType: [],
      // NetGrid: [],
      props: {
        value: "netGridID",
        label: "netGridName",
        children: "children"
      },
    };
  },
  methods: {
    changeVal(val){
      this.form.netGridID = val[val.length-1];
    },
    addNewRecord() {
      api.addVideo(this.form).then(res => {
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
    // this.NetGrid = this.$store.getters.netgrid.children;
    api.fetchVideoCode().then(res => {
      this.videoType = res.data;
    });
    api.fetchNetGrid().then(res => {
      this.netGridType = res.data;
    });
  }
};
</script>

<style scoped>

</style>



// WEBPACK FOOTER //
// src/views/videoWatch/addVideo.vue?06e34d16