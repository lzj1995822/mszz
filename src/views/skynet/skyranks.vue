<template>
  <div>
      <el-row>
          <el-col :span="24" align="right">
              <div style="margin-top:10px">
                <el-button @click="addNewRecord" type="primary">添加队伍信息</el-button>
                <el-input style="width:200px" v-model="filters.processionName" placeholder="请输入队伍名称"></el-input>
                <el-input style="width:200px" v-model="filters.processionLeaderName" placeholder="请输入负责人名称"></el-input>
                <el-select v-model="filters.area" placeholder="请选择寻查区域">
                  <el-option v-for="(v,i) in Types" :key="i" :value="v.id" :label="v.regionName"></el-option>
                </el-select>
                <el-button type="primary" icon="search" @click="getProcessionInfo">搜索</el-button>
                <el-button type="primary" @click="flushAll">刷新</el-button>
              </div>
              <el-row style="margin-top:20px">
                  <el-col :span="24">
                      <el-table :data="list" border>
                          <el-table-column v-for="(v,k,i) in props" :key="i" :label="labels[i]" align="center">
                              <template scope="scope">
                                  <span  v-if="k!=='url'||k!='longitude'||k!=='latitude'" >
                                      {{scope.row[k]}}
                                  </span>
                              </template>
                          </el-table-column>
                          <el-table-column label="操作" align="center">
                              <template scope="scope">
                                  <el-button type="text" @click="ckDetail(scope.row.id)">查看详情</el-button>
                                  <el-button type="text" @click="editProcession(scope.row.id)">编辑</el-button>
                                  <el-button type="text" @click="deleteProcession(scope.row.id)">删除</el-button>
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
      <el-dialog title="巡防队伍详细信息" :visible.sync="visible">
           <div id="table">
         <table class="userInfoEditTable" style="border-collapse:collapse;background-color:white;" width="100%" cellspacing="0">
            <tr v-for="(v,k,i) in form" :key="v">
                <td class="tb_label">{{labels2[i]}}</td>
                <td>
                    {{v}}
                </td>
            </tr>
            <tr>
              <td colspan="2" align="center">
                <el-button type="text" size="large" @click="printTable('table')">[打印]</el-button>
                <el-button type="text" size="large" @click="visible=false">[关闭]</el-button>
              </td>
          </tr>
        </table>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import treeComponent from "../../components/common/treeComponent";
import * as api from "@/api/skynetManage";
export default {
  components: {
    treeComponent: treeComponent
  },
  data() {
    return {
      visible: false,
      ProcessionType: [],
      form: {},
      filters: {
        processionName: null,
        processionLeaderName: null,
        area: null,
        netGridID: null,
        page: 1,
        pageSize: 10
      },
      list: [
        {
          id: "", // bigint(20) NOT NULL AUTO_INCREMENT,
          videoName: "", // varchar(100) DEFAULT NULL,
          longitude: "", // double(32,8) DEFAULT NULL COMMENT '经度',
          latitude: "", // double(32,8) DEFAULT NULL COMMENT '纬度',
          videoURL: "", // varchar(200) DEFAULT NULL COMMENT '视频流地址URL表示',
          schoolName: "", // bigint(20) DEFAULT NULL COMMENT '所属学校',
          producter: "", // varchar(200) DEFAULT NULL COMMENT '生产厂家',
          remarks: "", // varchar(200) DEFAULT NULL COMMENT '备注',
          netGridName: ""
        }
      ],
      totalInfo: 0,
      props: {
        processionName: "", // VARCHAR(45) NULL COMMENT '队伍名称',
        processionContact: "", // VARCHAR(45) NULL COMMENT '联系方式',
        processionDuty: "", // VARCHAR(500) NULL COMMENT '队伍职能',
        processionLeaderName: "", // VARCHAR(45) NULL COMMENT '负责人姓名',
        processionLeaderContact: "", // VARCHAR(45) NULL COMMENT '负责人联系方式',
        processionNumbers: "", // INT NULL COMMENT '队伍人数',
        regionName: "" // BIGINT NULL COMMENT '巡查区域',
        // remark:'',// VARCHAR(500) NULL,
      },
      labels: [
        "队伍名称",
        "联系方式",
        "队伍职能",
        "负责人姓名",
        "负责人联系方式",
        "队伍人数",
        "巡查区域",
        "备注"
      ],
      labels2: [
        "编号",
        "队伍名称",
        "联系方式",
        "队伍职能",
        "负责人姓名",
        "负责人联系方式",
        "队伍人数",
        "巡查区域",
        "备注"
      ],
      Types: []
    };
  },
  methods: {
    deleteProcession(id) {
      this.$confirm("是否删除此校园信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.deleteProcession(id).then(res => {
            if (res.data) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getProcessionInfo();
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
      this.filters.processionLeaderName = this.filters.processionName = this.filters.area = null;
      this.getProcessionInfo();
    },
    handleCurrentChange(val) {
      this.filters.page = val;
      this.getProcessionInfo();
    },
    ckDetail(id) {
      this.visible = true;
      api.getProcessionDetail(id).then(res => {
        this.form = res.data;
      });
    },
    addNewRecord() {
      this.$router.push("add");
    },
    GetNodeValue(val) {
      this.filters.netGridID = val;
      this.getProcessionInfo();
    },
    editProcession(id) {
      this.$router.push({ path: "edit", query: { id: id } });
    },
    getProcessionInfo() {
      api.getSPProcessionQuery(this.filters).then(res => {
        this.list = res.data.list;
        this.totalInfo = res.data.page.totalCount;
      });
      this.filters.processionLeaderName = this.filters.processionName = this.filters.area = null;
    },
    printTable(div) {
      var div_print = document.getElementById(div);
      var newStr = div_print.innerHTML;
      var oldStr = document.body.innerHTML;
      document.body.innerHTML = newStr;
      window.print();
      window.location.reload();
      window.body.innerHTML = oldStr;
      return false;
    }
  },
  mounted() {
    if(this.$store.getters.user.userRole!='超级管理员')
      this.filters.netGridID = this.$store.getters.user.netGridID
    this.getProcessionInfo();
    api.selectAllRegion().then(res => {
      this.Types = res.data;
    });
  }
};
</script>


<style scoped>
.userInfoEditTable,
.userInfoEditTable td {
  border: 1px solid darkgrey;
  padding: 10px;
}

.tb_label {
  width: 20%;
  text-align: right;
}
</style>



// WEBPACK FOOTER //
// src/views/skynet/skyranks.vue?28967e54