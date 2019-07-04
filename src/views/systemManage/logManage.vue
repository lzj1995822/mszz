<template>
  <div>
    <el-row>
      <el-col :span="24" >
        <el-form style="float:right" :model="filters" label-suffix=":" inline>
          <el-form-item label="用户名">
            <el-input  v-model="filters.username"></el-input>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker type="datetime" v-model="filters.startTime" placeholder="开始时间"></el-date-picker>--
            <el-date-picker type="datetime" v-model="filters.endTime" placeholder="结束时间"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getInfo" icon="search">查询</el-button>
            <el-button type="primary" @click="flush" >刷新</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-table stripe border :data="List">
      <el-table-column type="index" align="center"></el-table-column>
      <el-table-column label="用户名" prop="userName" align="center"></el-table-column>
      <el-table-column label="ip地址" prop="ip" align="center"></el-table-column>
      <el-table-column label="登录时间" prop="date" align="center"></el-table-column>
      <el-table-column label="登录情况" prop="result" align="center"></el-table-column>
    </el-table>
    <el-col :span="24" style="margin-top:10px" align="right">
      <el-pagination layout="prev, pager, next" :total="total" @current-change="handleCurrentChange">
      </el-pagination>
    </el-col>
  </div>
</template>

<script>
import * as api from "@/api/systemManage"
import { formatDateTime } from "@/utils/index";
export default {
  data() {
    return {
      List: [],
      total: 0,
      filters: {
        username:'',
        startTime:null,
        endTime:null,
        page: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.filters.page = val;
      this.getInfo();
    },
    flush(){
      this.filters.username = this.filters.startTime = this.filters.endTime = null;
      this.getInfo();
    },
    async getInfo(){
      if(this.filters.startTime!=null){
        this.filters.startTime = formatDateTime(this.filters.startTime)
      }
      if(this.filters.endTime!=null){
        this.filters.endTime = formatDateTime(this.filters.endTime)
      }
      let res = await api.getLog(this.filters);
      this.List = res.data.list;
      this.total = res.data.page.totalCount;
    }
  },
  mounted() {
    this.getInfo();
  }
};
</script>



// WEBPACK FOOTER //
// src/views/systemManage/logManage.vue?e2a1a3b2