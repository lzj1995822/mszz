<template>
  <div>
      <el-row>
          <el-col :span="24" align="right">
              <div style="margin-top:10px">
                <el-button @click="addNewRecord" type="primary">添加治安事件</el-button>
                <el-select placeholder="请输入事件类型" v-model="filters.kind">
                   <el-option label="一般事件" :value="1"></el-option>
                   <el-option label="重大事件" :value="2"></el-option>
                </el-select>
                <el-input style="width:200px" v-model="filters.name" placeholder="事件名称"></el-input>
                <el-button type="primary" icon="search" @click="getEvents">搜索</el-button>
                <el-button type="primary" @click="flushAll">刷新</el-button>
              </div>
              <el-row style="margin-top:20px">
                  <el-col :span="$store.getters.user.userRole=='超级管理员'?3:0">
                      <treeComponent style="margin-top:-52px" @GetNodeValue="GetNodeValue"></treeComponent>
                  </el-col>
                  <el-col :span="$store.getters.user.userRole=='超级管理员'?21:24">
                      <el-table border :data="list">
                          <el-table-column type="index" width="50"></el-table-column>
                          <el-table-column v-for="(v,k,i) in props"  :key="v.id" :label="labels[i]" align="center">
                              <template scope="scope">
                                  <span v-if="k=='ssEventKind'">
                                    {{scope.row[k]==1?'一般事件':'重大事件'}}
                                  </span>
                                  <span v-else>
                                      {{scope.row[k]}}
                                  </span>
                              </template>
                          </el-table-column>
                          <el-table-column label="操作" width="200" align="center">
                              <template scope="scope">
                                  <el-button type="text" @click="ckDetail(scope.row.ssEventID)">查看详情</el-button>
                                  <el-button type="text" @click="editDrivers(scope.row.ssEventID)">编辑</el-button>
                                  <el-button type="text" @click="deleteEvent(scope.row.ssEventID)">删除</el-button>
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
  </div>
</template>

<script>
import treeComponent from "../../components/common/treeComponent";
import * as api from "@/api/securityManage";
export default {
  components: {
    treeComponent: treeComponent
  },
  data() {
    return {
      filters: {
        kind: null, //事件类型
        name: null, //事件名称
        netGridID: null, // 所属网格
        page: 1,
        pageSize: 10
      },
      list: [
        {
            ssEventID: "", //                  bigint not null auto_increment,
            ssEventName: "",
            netGridID: "", //所属网格
            ssEventKind: "", //               '事件性质，如1=一般事件；2=重大事件；等',
            ssEventTypeValue: "", //          '事件类型，如杀人、放火、抢劫等',
            ssEventContent: "", //             varchar(1000),
            ssEventStartDateTime: "", //       datetime,
            // SSEventEndDateTime: "", //         datetime,
            ssEventHappenLongitude: "", //     '地理经度信息',
            ssEventHappenLatitude: "", //      '地理纬度信息',
            ssEventStatusTypeValue: "", //     '当前事件处理的最新状态',
            currentRemarks: "", //              varchar(1000),
            currentResponsiblePersonCertID: "", //  '当前经办人员身份证号',
            currentResponsiblePersonName: "", //  '当前经办人员姓名',
            currentResponsiblePersonContact: "" //'经办人员联系方式',
        }
      ],
      totalInfo: 0,
      props: {
          ssEventName:'',
          ssEventKind:'',//               '事件性质，如1=一般事件；2=重大事件；等',
          ssEventTypeName:'',//          '事件类型，如杀人、放火、抢劫等',
          ssEventStatusTypeName:'',//     '当前事件处理的最新状态',
          currentResponsiblePersonName:'',//  '当前经办人员姓名',
          currentResponsiblePersonContact:'',//'经办人员联系方式',
          netGridName:'',//所属网格
      },
      labels: ["事件名称", "事件性质", "事件类型", "事件处理状态", "当前经办人员姓名", "当前经办人员联系方式", "所属网格"]
    };
  },
  methods: {
    deleteEvent(id) {
      this.$confirm("是否删除此事件记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.deleteSSEvent(id).then(res => {
            if (res.data) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getEvents();
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
      this.filters.name = this.filters.kind = this.filters.netGridID = null;
      this.getEvents();
    },
    handleCurrentChange(val) {
      this.filters.page = val;
      this.getEvents();
    },
    ckDetail(id) {
      this.$router.push({ path: "eventInfo", query: { id: id } });
    },
    addNewRecord() {
      this.$router.push("addEvent");
    },
    GetNodeValue(val) {
      this.filters.netGridID = val;
      this.getEvents();
    },
    editDrivers(id) {
      this.$router.push({ path: "editEvent", query: { id: id } });
    },
    getEvents() {
      api.getSSQuery(this.filters).then(res => {
        this.list = res.data.vos;
        this.totalInfo = res.data.page.totalCount;
      });
      this.filters.name = this.filters.kind = this.filters.netGridID = null;
    }
  },
  mounted() {
    this.getEvents();
  }
};
</script>


<style scoped>

</style>



// WEBPACK FOOTER //
// src/views/publicSecurityManage/homicideManage.vue?4fdfb9e2