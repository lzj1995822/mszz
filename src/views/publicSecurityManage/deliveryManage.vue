<template>
  <div>
    <el-row>
      <el-col :span="$store.getters.user.userRole=='超级管理员'?3:0">
        <tree-component @GetNodeValue="GetNodeValue"></tree-component>
      </el-col>
      <el-col :span="$store.getters.user.userRole=='超级管理员'?21:24">
        <el-row>
          <el-col :span="8">
            <el-button @click="exportData" style="float:left;" type="success">
              <img src="../../assets/daoru.png" alt=""> 导出
            </el-button>
            <el-upload action="xxxxxxxxxx" style="text-align:left;display:inline-block;width:150px;height:38px;overflow: hidden;margin-left:10px">
              <el-button type="success">
                <img src="../../assets/daochu.png" alt=""> EXCEL导入
              </el-button>
            </el-upload>
          </el-col>
          <el-col :span="16">
            <div align="right">
              <el-button type="primary" @click="addEconomyOrg">
                <i class="el-icon-plus">添加物流企业</i>
              </el-button>
              <el-input style="width:200px" v-model="filters.name" placeholder="企业名称"></el-input>
              <el-select v-model="filters.type" placeholder="请输入企业类型">
                <el-option v-for="v in Types" :key="v.id" :label="v.enterpriseTypeName" :value="v.enterpriseTypeValue"></el-option>
              </el-select>
              </el-select>
              <el-button type="primary" icon="search" @click="getEconomyInfo">查询</el-button>
              <el-button type="primary" @click="showAll">显示所有</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="padding-top:10px">
            <el-table border :data="dataList" style="width:100%">
              <el-table-column style="width:50px" label="统一社会信用代码" prop="enterpriseUSCcode" align="center">
              </el-table-column>
              <el-table-column label="企业名称" prop="enterpriseName" align="center">
              </el-table-column>
              <el-table-column label="企业类别" prop="enterpriseTypeName" align="center">
              </el-table-column>
              <el-table-column label="企业地址" prop="enterpriseAddress" align="center">
              </el-table-column>
              <el-table-column label="法人姓名" prop="enterpriseLeaderName" align="center">
              </el-table-column>
              <el-table-column label="法人联系方式" prop="enterpriseLeaderContact" align="center">
              </el-table-column>
              <el-table-column label="治保负责人联系方式" prop="securityLeaderContact" align="center">
              </el-table-column>
              <el-table-column label="操作" width="300" align="center">
                <template scope="scope">
                  <el-button type="text" @click="watchDetail(scope.row.enterpriseUSCcode)" size="small">查看详情</el-button>
                  <el-button type="text" size="small" @click="editForm(scope.row.enterpriseUSCcode)">编辑</el-button>
                  <el-button type="text" size="small" @click="deleteForm(scope.row.enterpriseUSCcode)">删除</el-button>
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
  import * as api from "@/api/orgManage";
  import info from "./CompanyInfo"

  export default {
    components: {
      treeComponent: treeComponent,
      info: info
    },
    data() {
      return {
        activeName: "sjtj",
        histogram: null,
        filters: {
          // 查询表单
          name: null, // 企业名称
          type: null, // 企业类型
          netGridID: null,
          isLogisticsEnterprise: 1,
          isKeyEnterprise: null,
          page: 1, // 页码
          pageSize: 10 // 页号
        },
        totalInfo: 0, // 页码总数
        dataList: [],
        Types: [],
        visible:false,
        id:''
      };
    },
    methods: {
      GetNodeValue(id) {
        this.filters.netGridID = id
        this.getEconomyInfo()
      },
      deleteForm(id) {
        this.$confirm("是否删除此人记录, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            api.deleteEconomyOrg(id).then(res => {
              if (res.data) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getEconomyInfo();
              } else {
                this.$message({
                  type: "success",
                  message: "删除失败!"
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
      addEconomyOrg() {
        this.$router.push({
          path: "addDeliveryOrg",
          query: {
            type: 1
          }
        });
      },
      getCount(data) {
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
          sum += data[i];
        }
        return sum;
      },
      exportData() {
        // 导出数据
      },
      // 翻页
      handleCurrentChange(val) {
        this.filters.page = val;
        this.getEconomyInfo()
      },
      watchDetail(id) {
        this.id = id;
        this.visible = true;
      },
      editForm(id) {
        this.$router.push({
          path: "editDeliveryOrg",
          query: {
            id: id
          }
        });
      },
      showAll() {
        this.filters.name = this.filters.type = this.filters.netGridID = null;
        this.getEconomyInfo();
      },
      getEconomyInfo() {
        api.fetchEconomyInfo(this.filters).then(res => {
          this.dataList = res.data.nonPublicEconomyOrgInfo;
          this.totalInfo = res.data.page.totalCount;
        });
        this.filters.name = this.filters.type = this.filters.netGridID = null;
      }
    },
    mounted() {
      api.getOrgCode().then(res => {
        this.Types = res.data.codeEnterpriseType;
      });
      this.getEconomyInfo();
    }
  };

</script>

<style scoped>
  .tjInfo {
    /* margin-top: 50px; */
    background-color: aliceblue;
    width: 100%;
    height: 800px;
    padding: 10px;
    /* text-indent: 2em; */
  }

  .userInfoEditTable,
  .userInfoEditTable td {
    /* font-size: 8px; */
    border: 1px solid darkgrey;
    padding: 10px;
    text-align: center;
  }

</style>



// WEBPACK FOOTER //
// src/views/publicSecurityManage/deliveryManage.vue?6e1e717c