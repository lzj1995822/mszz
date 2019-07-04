<template>
  <div>
      <el-row>
          <el-col :span="24" align="right">
              <div style="margin-top:10px">
                <el-button @click="addNewRecord" type="primary">添加景区执勤点</el-button>
                <el-input style="width:200px" v-model="filters.name" placeholder="请输入景区执勤点名称"></el-input>
                <el-button type="primary" icon="search" @click="getRecord">搜索</el-button>
                <el-button type="primary" @click="flushAll">刷新</el-button>
              </div>
              <el-row style="margin-top:20px">
                  <el-col :span="$store.getters.user.userRole=='超级管理员'?3:0">
                      <treeComponent style="margin-top:-52px" @GetNodeValue="GetNodeValue"></treeComponent>
                  </el-col>
                  <el-col :span="$store.getters.user.userRole=='超级管理员'?21:24">
                      <el-table :data="list">
                          <el-table-column v-for="(v,k,i) in props" :key="v.id" :label="labels[i]" align="center">
                              <template scope="scope">
                                {{scope.row[k]}}
                              </template>
                          </el-table-column>
                          <el-table-column label="操作" width="200" align="center">
                              <template scope="scope">
                                  <el-button type="text" @click="ckDetail(scope.row.scenicAreaDutyPointID)">查看详情</el-button>
                                  <el-button type="text" @click="editRecord(scope.row.scenicAreaDutyPointID)">编辑</el-button>
                                  <el-button type="text" @click="deleteRecord(scope.row.scenicAreaDutyPointID)">删除</el-button>
                              </template>
                          </el-table-column>
                      </el-table>
                  </el-col>
                  <el-col :span="24" style="margin-top:10px" align="right">
                      <el-pagination layout="prev, pager, next" :total="totalInfo" @current-change="handleCurrentChange">
                      </el-pagination>
                  </el-col>
              </el-row>
          </el-col>
      </el-row>

      <el-dialog top="5%" title="查看详情" :visible.sync="visible">
      <info :id="id"></info>
    </el-dialog>
  </div>
</template>

<script>
import treeComponent from "../../components/common/treeComponent";
import * as api from "@/api/securityManage";
import info from "./viewManageInfo";
export default {
  components: {
    treeComponent: treeComponent,
    info:info
  },
  data() {
    return {
      filters: {
        name: null, //景区执勤点名称
        netGridID: null, // 所属网格
        page: 1,
        pageSize: 10
      },
      list: [
        {
            scenicAreaDutyPointID:'',
            scenicAreaDutyPointName:'',
            netGridName:'',// '景区执勤点所属网格区域',
            scenicAreaDutyPointLongitude:'',// comment '执勤点 地理经度信息',
            scenicAreaDutyPointLatitude:''// comment '执勤点 地理纬度信息',
        }
      ],
      totalInfo: 0,
      props: {
        scenicAreaDutyPointID:'',
        scenicAreaDutyPointName:'',
        netGridName:'',// '景区执勤点所属网格区域',
        scenicAreaDutyPointLongitude:'',// comment '执勤点 地理经度信息',
        scenicAreaDutyPointLatitude:''// comment '执勤点 地理纬度信息',
      },
      labels: ["编号", "执勤点名称", "所属网格", "所属经度", "所属纬度"],
      visible:false,
      id:'01'
    };
  },
  methods: {
    deleteRecord(id) {
      this.$confirm("是否删除此景区执勤点记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.deleteDutyPoint(id).then(res => {
            if (res.data) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getRecord();
            } else {
              this.$message({
                type: "error",
                message: res.message
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    flushAll() {
      this.filters.scenicAreaDutyPointName = this.filters.netGridID = null;
      this.getRecord();
    },
    handleCurrentChange(val) {
      this.filters.page = val;
      this.getRecord();
    },
    ckDetail(id) {
      this.id = id;
      this.visible = true;
      // this.$router.push({ path: "viewManageInfo", query: { id: id } });
    },
    addNewRecord() {
      this.$router.push('addViewManager');
    },
    GetNodeValue(val) {
      this.filters.netGridID = val;
      this.getRecord();
    },
    editRecord(id) {
      this.$router.push({ path: "EditviewManage", query: { id: id } });
    },
    getRecord() {
      api.getDutyPointQuery(this.filters).then(res=>{
        this.list = res.data.vos
      })
       this.filters.scenicAreaDutyPointName = null;
    }
  },
  mounted() {
    if(this.$store.getters.user.userRole!='超级管理员')
      this.filters.netGridID = this.$store.getters.user.netGridID
    this.getRecord();
  }
};
</script>


<style scoped>

</style>



// WEBPACK FOOTER //
// src/views/publicSecurityManage/viewManager.vue?1ca6ee1b