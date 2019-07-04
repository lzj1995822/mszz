<template>
  <div>
    <el-row style="padding:10px">
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
      <el-col :span="16" align="right">
        <el-button type="primary" @click="addNewRecord">添加记录</el-button>
        <el-input style="width:230px" v-model="filters.orgMemberName" placeholder="服务人员"></el-input>
        <el-input style="width:230px" v-model="filters.servedPersonName" placeholder="服务对象"></el-input>
        <el-button type="primary" @click="getAllRecordInfo" icon="search">查询</el-button>
        <el-button type="primary" @click="searchAll">
          <i class="el-icon-loading"></i> 刷新</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="$store.getters.user.userRole=='超级管理员'?2:0">
          <treeComponent @GetNodeValue="GetNodeValue"></treeComponent>
      </el-col >
      <el-col :span="$store.getters.user.userRole=='超级管理员'?22:24">
        <el-table :data="serverInfo" style="width:100%">
          <el-table-column prop="orgMServedPID" label="编号" align="center">
          </el-table-column>
          <el-table-column prop="orgMemberName" label="服务人员" align="center">
          </el-table-column>
          <el-table-column prop="servedPersonName" label="服务对象" align="center">
          </el-table-column>
          <el-table-column prop="serverDate" label="服务日期" align="center">
          </el-table-column>
          <el-table-column prop="serverDate" label="操作" align="center">
            <template scope="scope">
              <el-button type="text" @click="watchDetail(scope.row)">查看详情</el-button>
              <el-button type="text" @click="editById(scope.row)">编辑</el-button>
              <el-button type="text" @click="deleteById(scope.row.orgMServedPID)" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" align="right" style="margin-top:10px">
        <el-pagination layout="prev, pager, next" :total="totalInfo" @current-change="handleCurrentChange">
        </el-pagination>
      </el-col>
    </el-row>

    <el-dialog title="服务详情" :visible.sync="dialogVisible" @close="closeDialog">
      <table class="userInfoEditTable" style="border-collapse:collapse;background-color:white;" width="100%" cellspacing="0">
        <tr>
          <td class="tb_label">服务人员</td>
          <td>
             <span>{{servedDetail.orgMemberName}}</span>
          </td>
        </tr>
        <tr>
          <td class="tb_label">服务对象</td>
          <td>
            <span>{{servedDetail.servedPersonName}}</span>
          </td>
        </tr>
        <tr>
          <td class="tb_label">服务内容</td>
          <td>
            <el-input style="font-size:20px" :rows="areaRow" v-model="servedDetail.serverInf" disabled type="textarea"></el-input>
          </td>
        </tr>
        <tr>
          <td class="tb_label">创建时间</td>
          <td>
            {{servedDetail.serverDate}}
          </td>
        </tr>
        <tr>
          <td class="tb_label">图片资料</td>
          <td>
            <img width="600" v-for="s of pictures" :key="s.id" :src="s" alt="">
          </td>
        </tr>
        <tr>
          <td class="tb_label">视频资料</td>
          <td>
            <video :src="video" width="600" controls></video>
          </td>
        </tr>
      </table>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/api/zonghezhili/duiwujianshe'
import treeComponent from "../../components/common/treeComponent";

export default {
  components:{
    treeComponent
  },
  data() {
    return {
      rowNumber:3,
      areaRow:8,
      dialogVisible: false,
      filters: {
        orgMemberName: null, // 服务人员姓名
        servedPersonName: null, // 服务对象姓名
        netGridID:null,
        page: 1,
        pageSize: 10
      },
      serverInfo: [{
        orgMServedPID: 1,  //编号
        orgMemberID: 1,
        orgMemberName: '李四',    //组织成员姓名
        servedPersonID:1,
        servedPersonName: '张三', //被服务对象姓名
        serverInf: '倒开水',    //服务内容
        serverDate: '2017-8-10'   //服务日期
      }],
      servedDetail:{ // 服务记录详细信息

      },
      totalInfo: 100,
      pictures:[],
      video:[]
    }
  },
  methods: {
     GetNodeValue(val) {
      this.filters.netGridID = val;
      this.getAllRecordInfo();
    },
    //翻页
    handleCurrentChange(val) {
      this.filters.page = val
      this.getAllRecordInfo()
    },
    //获取所有服务信息
    getAllRecordInfo() {
      api.fetchServedRecord(this.filters).then(res=>{
        this.serverInfo = res.data.queryVO
        this.totalInfo = res.data.page.totalCount
      })
      this.filters = {
        orgMemberName: null,
        servedPersonName: null,
        page: 1,
        pageSize: 10
      }
    },
    //通过id删除服务记录
    deleteById(id) {
      this.$confirm('确认删除此服务记录吗? 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteRecord(id).then(res=>{
           if (res.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getAllRecordInfo()
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        })
      }).catch(() => {
        this.getAllRecordInfo()
        this.$message({
          type: 'info',
          message: '取消！'
        });
      });
    },
    // 查询所有信息
    searchAll() {
      this.filters = {
        orgMemberName: null,
        servedPersonName: null,
        page: 1,
        pageSize: 10
      }
      this.getAllRecordInfo()
    },
    //编辑更新
    editById(row) {
      this.$router.push({ path:'editNewServedRecord', query: {id: row.orgMServedPID}})
      this.servedDetail = row
      this.dialogVisible = true
    },
    exportData(){

    },
    // 添加新的记录
    addNewRecord(){
      this.$router.push('addNewServedRecord')
    },
    watchDetail(row){
      this.dialogVisible = true
      api.fetchServedRecordDetail(row.orgMServedPID).then(res=>{
        this.servedDetail = res.data.servedRecord
        this.pictures = res.data.pictures
        this.video = res.data.video
      })
    },
    closeDialog(){
    }
  },
  mounted() {
    if(this.$store.getters.user.userRole!='超级管理员')
      this.filters.netGridID = this.$store.getters.user.netGridID
    this.getAllRecordInfo()
  }
}
</script>

<style scoped>
.userInfoEditTable,
.userInfoEditTable td {
  border: 1px solid darkgrey;
  padding: 10px;
}
.tb_label{
  width: 12%;
}
</style>



// WEBPACK FOOTER //
// src/views/zongzhizuzhi/MemberServedPersonRecord.vue?6419562b