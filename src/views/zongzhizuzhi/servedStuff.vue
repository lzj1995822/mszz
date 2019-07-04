<template>
  <div>
      <el-row>
          <el-col :span="24">
              <div style="margin-top:10px" align="right">
                <el-input style="width:200px" v-model="filters.name" placeholder="请输入网格员姓名"></el-input>
                <el-input style="width:200px" v-model="filters.certID" placeholder="请输入网格员身份证"></el-input>
                <el-button type="primary" icon="search" @click="getInfo">搜索</el-button>
                <el-button type="primary" @click="flushAll">刷新</el-button>
              </div>
              <el-row style="margin-top:20px" :gutter="20">
                  <el-col :span="$store.getters.user.userRole=='超级管理员'?2:0">
                      <treeComponent @GetNodeValue="GetNodeValue"></treeComponent>
                  </el-col>
                  <el-col :span="$store.getters.user.userRole=='超级管理员'?22:24">
                      <el-table :data="list">
                          <el-table-column type="index" width="100"></el-table-column>
                          <el-table-column v-for="(v,k,i) in props" :key="i" :label="labels[i]" align="center">
                              <template scope="scope">
                                  <span v-if="k==='sex'">
                                    {{getSex(scope.row[k])}}
                                  </span>
                                  <span v-else-if="k==='netGridName'">
                                    {{scope.row.fatherNetGridName+"->"+scope.row[k]}}
                                  </span>
                                  <span v-else>
                                      {{scope.row[k]}}
                                  </span>
                              </template>
                          </el-table-column>
                          <el-table-column label="操作" align="center">
                              <template scope="scope">
                                  <el-button type="text" @click="ckDetail(scope.row.netGridMemberID)">查看详情</el-button>
                                  <el-button type="text" @click="editInfo(scope.row.netGridMemberID)">编辑</el-button>
                                  <el-button type="text" @click="deleteInfo(scope.row.netGridMemberID)">删除</el-button>
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
      <el-dialog title="网格员详细信息" :visible.sync="visible">
        <info-template :item="form" :names="labels2" hasimg :imgUrl="img"></info-template>
      </el-dialog>
  </div>
</template>

<script>
import treeComponent from "../../components/common/treeComponent";
import * as api from "@/api/netGridManage";
import * as api2 from '@/api/zonghezhili/duiwujianshe'

import infoTemplate from "../../components/InfoTemplate/index"
export default {
  components: {
    treeComponent: treeComponent,
    infoTemplate:infoTemplate
  },
  data() {
    return {
      visible:false,
      filters: {
        name: null, //网格员姓名
        certID: null, //网格员身份证号
        netGridID: null, // 所属网格
        page: 1,
        pageSize: 10
      },
      list: [
        {
            netGridMemberID:'',//      bigint not null auto_increment,
            netGridID:'',//            bigint,
            name:'',//                varchar(50),
            sex:'',//                  int comment '值=1，代表男性；值=0，代表女性。',
            ethnicity:'',//            varchar(20) comment '民族',
            politics:'',//             varchar(20) comment '政治面貌',
            certID:'',//               varchar(18),
            birthDate:'',//            date,
            education:'',//            varchar(10) comment '学历',
            mobileTel:'',//            varchar(18) comment '移动电话',
            fixedTel:'',//             varchar(18) comment '固定电话',
        }
      ],
      totalInfo: 0,
      props: {
        name:'',//                varchar(50),
        sex:'',//                  int comment '值=1，代表男性；值=0，代表女性。',
        // certID:'',//               varchar(18),
        mobileTel:'',//            varchar(18) comment '移动电话',
        netGridName:''
      },
      form:{

      },
      labels: ["姓名", "性别", "移动电话","所属网格"],
      labels2: ["编号","上级网格","所属网格","姓名", "性别", "民族","政治面貌","身份证","出生日期","学历","移动电话","固定电话","职位"],
      img:''
    };
  },
  methods: {
    getSex(val){
      switch(val){
        case 0:
          return '未知的性别';
        case 1:
          return '男性';
        case 2:
          return '女性';
        case 99:
          return '未说明性别';
      }
    },
    deleteInfo(id) {
      this.$confirm("是否删除此网格员信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.deleteById(id).then(res => {
            if (res.data) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getInfo();
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
      this.filters.name = this.filters.certID = this.filters.netGridID = null;
      this.getInfo();
    },
    handleCurrentChange(val) {
      this.filters.page = val;
      this.getInfo();
    },
    ckDetail(id) {
      this.visible = true
      api.getNetGridMemberDetail(id).then(res=>{
        this.form = res.data.memberDetail
        this.img = res.data.photoPath
      })
    },
    addNewRecord() {
      this.$router.push("addServedPerson");
    },
    GetNodeValue(val) {
      this.filters.netGridID = val;
      this.getInfo();
    },
    editInfo(id) {
      this.$router.push({ path: "editServedPerson", query: { id: id } });
    },
    getInfo() {
      api2.getServedStuff(this.filters).then(res => {
        this.list = res.data.vos;
        this.totalInfo = res.data.p.totalCount;
      });
    }
  },
  mounted() {
    this.getInfo();

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
// src/views/zongzhizuzhi/servedStuff.vue?3ac506ff