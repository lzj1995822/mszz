<template>
    <div>
        <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane label="数据统计" name="sjtj">
                <el-row>
                    <el-col :span="18">
                        <div align="center" id="histogram" style="width:100%; height:700px"></div>
                    </el-col>
                    <el-col :span="6">
                        <div class="tjInfo">
                            <h2 style="padding:12px">数据统计</h2>
                            <div style="padding:5px">
                              <table  class="userInfoEditTable" style="border-collapse:collapse;background-color:white;" width="100%" cellspacing="0">
                                  <tr>
                                    <td>地区</td>
                                    <td>艾滋病人口</td>
                                  </tr>
                                  <tr v-for="(v,index) in myobj" :key="v.id" :class="index%2==0?'mycolor':''">
                                    <td>{{v.name}}</td>
                                    <td>{{v.value}}</td>
                                  </tr>
                              </table>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="数据检索" name="sjjs">
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
                                    <el-input style="width:200px" v-model="filters.name" placeholder="姓名"></el-input>
                                    <el-input style="width:200px" v-model="filters.certifID" placeholder="身份证号"></el-input>
                                    </el-select>
                                    <el-button type="primary" @click="getAIDSPersonInfo">查询</el-button>
                                    <el-button type="primary" @click="showAll">显示所有</el-button>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24" style="padding-top:10px">
                                <el-table :data="dataList" style="width:100%">
                                    <el-table-column label="编号" prop="id" align="center"></el-table-column>
                                    <el-table-column label="姓名" prop="name" align="center">
                                    </el-table-column>
                                    <el-table-column label="性别" prop="sex" align="center">
                                        <template scope="scope">
                                            {{scope.row.sex == 1 ? '男' : '女'}}
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
                                            <el-button type="text" size="small" @click="watchDetail(scope.row.certifID)">查看详情</el-button>
                                            <el-button type="text" size="small" @click="editDetail(scope.row.certifID)">编辑</el-button>
                                            <el-button type="text" size="small" @click="deleteById(scope.row.id)">删除</el-button>
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
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import * as api from "@/api/specialPopulation/index";
import treeComponent from "../../components/common/treeComponent";

export default {
  components: {
    treeComponent: treeComponent
  },
  data() {
    return {
      activeName: "sjtj",
      histogram: null,
      filters: {
        // 查询表单
        name: null, // 姓名
        certifID: null, //身份证
        netGridID: null, // 网格id
        page: 1, // 页码
        pageSize: 10 // 页号
      },
      totalInfo: 40, // 页码总数
      dataList: [],
      myobj:[]
    };
  },
  methods: {
    showAll(){
      this.filters.name = this.filters.certifID = null
      this.getAIDSPersonInfo()
    },
    GetNodeValue(id){
       this.filters.netGridID = id
       this.getAIDSPersonInfo()
    },
    deleteById(id){
       this.$confirm('是否删除此人记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.deleteSpecialPerson(id,'05').then(res=>{
            if(res.data){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getAIDSPersonInfo()
            }else{
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    editDetail(ID){
      this.$router.push({path:"editSpecialPerson",query:{id:ID,specialId:'05'}});
    },
    watchDetail(ID){
       this.$router.push({path:"watchSpecialInfo",query:{id:ID,specialId:'05'}});
    },
    exportData() {
      // 导出数据
    },
    getAIDSPersonInfo() {
      api.fetchAIDSPerson(this.filters).then(res => {
        this.dataList = res.data.vos;
        this.totalInfo = res.data.page.totalCount;
      });
      this.filters.name = this.filters.certifID = null
    },
    // 翻页
    handleCurrentChange(val) {
      this.filters.page = val;
      this.getAIDSPersonInfo()
    },
    // 绘制饼状图
    drawPie(obj) {
      this.histogram = echarts.init(document.getElementById("histogram"));
      this.histogram.setOption({
        backgroundColor: "#eeeeee",
        title: {
          text: "艾滋病感染者各村分布图",
          left: "center",
          top: 20,
          textStyle: {
            color: "#000000"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}人({d}%)"
        },
        series: [
          {
            name: "分布比例",
            type: "pie",
            radius: "80%",
            center: ["50%", "55%"],
            data:obj.sort(function(a, b) {
              return a.value - b.value;
            }),
            roseType: "radius",
            label: {
              normal: {
                textStyle: {
                  color: "rgba(25,25,112, 1)"
                }
              }
            },
            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx) {
              return Math.random() * 200;
            }
          }
        ]
      });
    },
    initChart(){
       api.getSpecialPersonPieChart('05').then(res=>{
        this.myobj = res.data
        this.drawPie(this.myobj);
      })
    }
  },
  mounted() {
    if(this.$store.getters.user.userRole!='超级管理员')
      this.filters.netGridID = this.$store.getters.user.netGridID
    this.initChart()
    this.getAIDSPersonInfo()
  }
};
</script>

<style scoped>
.tjInfo {
  background-color: aliceblue;
  width: 100%;
  height: 700px;
  padding: 10px;
}
.userInfoEditTable,
.userInfoEditTable td {
  border: 1px solid darkgrey;
  padding: 10px;
  text-align: center;
}
</style>



// WEBPACK FOOTER //
// src/views/specialPopulationManage/AIDSManage.vue?04c57cb7