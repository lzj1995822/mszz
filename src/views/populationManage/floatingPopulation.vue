<template>
  <div>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="数据统计" name="sjtj">
        <el-row>
          <el-col :span="18">
            <div style="width:100%;text-align:center">
              <h1>茅山各村流动人口区域分布图</h1>
            </div>
            <div align="center" id="histogram" style="width:95%; height:700px"></div>
          </el-col>
          <el-col :span="6">
            <div class="tjInfo">
              <h2 style="padding:12px">数据统计</h2>
              <div style="padding:5px">
                 <table  class="userInfoEditTable" style="border-collapse:collapse;background-color:white;" width="100%" cellspacing="0">
                  <tr>
                    <td>地区</td>
                    <td>流动人口</td>
                  </tr>
                  <tr v-for="(v,index) in area" :key="v" :class="index%2==0?'mycolor':''">
                    <td>{{v}}</td>
                    <td>{{areaData[index]}}</td>
                  </tr>
                </table>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="数据检索" name="sjjs">
        <el-row>
          <el-col :span="3">
            <tree-component @GetNodeValue="GetNodeValue"></tree-component>
          </el-col>
          <el-col :span="21">
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
                <el-input style="width:200px" v-model="filters.name" placeholder="姓名"></el-input>
                <el-input style="width:200px" v-model="filters.certifID" placeholder="身份证号"></el-input>
                </el-select>
                <el-button type="primary" icon="search" @click="getFloatingPersonInfo">查询</el-button>
                <el-button type="primary" @click="showAll"><i class="fa fa-refresh fa-lg"></i> 显示所有</el-button>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" style="padding-top:10px">
              <el-table :data="dataList" style="width:100%">
                <el-table-column style="width:50px" label="编号" prop="servedPersonID" align="center">
                </el-table-column>
                <el-table-column label="姓名" prop="name" align="center">
                </el-table-column>
                <el-table-column label="性别" prop="sex" align="center">
                  <template scope="scope">
                     {{sexs.filter(i=>{if(i.v==scope.row.sex)return i})[0].l}}
                  </template>
                </el-table-column>
                <el-table-column label="政治面貌" prop="politics" align="center">
                </el-table-column>
                <el-table-column label="身份证号" width="300px" prop="certifID" align="center">
                </el-table-column>
                <el-table-column label="出生日期" prop="birthDate" align="center">
                </el-table-column>
                <el-table-column label="职业" prop="career" align="center">
                </el-table-column>
                <el-table-column label="移动电话" prop="mobileTel" align="center">
                </el-table-column>
                <el-table-column label="操作" width="300" align="center">
                  <template scope="scope">
                    <el-button type="text"  size="small" @click="watchDetail(scope.row.certifID)">查看详情</el-button>
                    <el-button type="text" size="small" @click="editDetail(scope.row.certifID)">编辑</el-button>
                    <el-button type="text" size="small" @click="deleteById(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
            <el-col :span="24" style="margin-top:10px" align="right">
              <el-pagination layout="prev, pager, next" :total="totalInfo" :current-page="currentPage" @current-change="handleCurrentChange">
              </el-pagination>
            </el-col>
          </el-row>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

        <el-dialog top="5%" title="查看详情" :visible.sync="visible">
      <info :id="id"></info>
    </el-dialog>
  </div>
</template>

<script>
import * as api from "@/api/realpopulation/index";
import * as api2 from "@/api/zonghezhili/duiwujianshe";
import treeComponent from "../../components/common/treeComponent";
import info from "./personInfo"

export default {
  components: {
    treeComponent: treeComponent,
    info:info
  },
  data() {
    return {
      sexs: [
        {
          v: "0",
          l: "未知的性别"
        },
        {
          v: "1",
          l: "男性"
        },
        {
          v: "2",
          l: "女性"
        },
        {
          v: "9",
          l: "未说明性别"
        }
      ],
      activeName: "sjtj",
      histogram: null,
      filters: {
        // 查询表单
        servedPersonTypeValue: "02",
        netGridID: null,
        name: null, // 姓名
        certifID: null, //身份证
        page: 1, // 页码
        pageSize: 10 // 页号
      },
      totalInfo: 40, // 页码总
      list: [],
      dataList: [],
      area: [
        "茅山村",
        "夏林村",
        "玉晨村",
        "墓东村",
        "潘冲区",
        "李塔村",
        "上杆村",
        "马埂村",
        "天乐村",
        "后河村"
      ],
      areaData: [255, 254, 300, 39, 130, 104, 60, 32, 41, 18],
      currentPage:1,
      visible:false,
      id:"1"
    };
  },
  methods: {
    showAll() {
      this.filters.name = this.filters.netGridID = this.filters.certifID = null;
      this.getFloatingPersonInfo();
    },
    GetNodeValue(id) {
      this.filters.netGridID = id;
      this.getFloatingPersonInfo();
    },
    deleteById(row) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api2
            .deleteServedPerson(row.servedPersonTypeValue, row.certifID)
            .then(res => {
              if (res.data) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
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
    editDetail(ID) {
      this.$router.push({ path: "editSyrkPersonInfo", query: { id: ID } });
    },
    watchDetail(ID) {
      this.id = ID;
      this.visible = true;
    },
    handleNodeClick(data) {
      console.log(data);
    },
    exportData() {
      // 导出数据
    },
    getFloatingPersonInfo() {
      api2.fetchServedMemberInfo(this.filters).then(res => {
        this.dataList = res.data.queryVO;
        this.totalInfo = res.data.page.totalCount;
      });
      this.filters.servedPersonTypeValue = '02';
    },
    // 翻页
    handleCurrentChange(val) {
      this.filters.page = val;
      this.getFloatingPersonInfo();
    },
    // 绘制柱状图
    drawHistogram(cun, datas) {
      this.histogram = echarts.init(document.getElementById("histogram"));
      this.histogram.setOption({
        color: ["#00CED1"],
        title: {
          text: "当前流动人口分布情况"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        legend: {
          data: cun
        },
        xAxis: [
          {
            type: "category",
            data: cun,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "流动人口",
            type: "bar",
            barWidth: "50%",
            data: datas
          }
        ]
      });
    }
  },
  mounted() {
    if (this.$store.getters.user.userRole != "超级管理员")
      this.filters.netGridID = this.$store.getters.user.netGridID;
    api.getServedHistogramCount("02").then(res => {
      let cun = res.data[0];
      let datas = res.data[1];
      this.drawHistogram(cun, datas);
      this.area = cun;
      this.areaData = datas;
    });
    this.getFloatingPersonInfo();

    this.$store.commit("INIT_PAGE","D");
    this.filters.page = this.$store.getters.page['D'];
    this.currentPage = this.filters.page;
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
// src/views/populationManage/floatingPopulation.vue?61fa4d14