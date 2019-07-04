<template>
  <div>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="数据统计" name="sjtj">
        <el-row>
          <el-col :span="18">
            <div align="center" id="histogram" style="width:100%; height:700px;"></div>
          </el-col>
          <el-col :span="6">
            <div class="tjInfo">
              <h2 style="padding:12px">数据统计</h2>
              <div style="padding:5px">
                <table class="userInfoEditTable" style="border-collapse:collapse;background-color:white;" width="100%" cellspacing="0">
                  <tr>
                    <td>地区</td>
                    <td>重点青少年人口</td>
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
                  <el-button type="primary" @click="getKeyYounger">查询</el-button>
                  <el-button type="primary" @click="showAll">显示所有</el-button>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" style="padding-top:10px">
                <el-table :data="list">
                  <el-table-column v-for="(v,k,i) in props" :key="v.id" :label="labels[i]" align="center">
                    <template scope="scope">
                      <span v-if="k==='sex'">
                        {{scope.row[k]==1?'男':'女'}}
                      </span>
                      <span v-else>
                        {{scope.row[k]}}
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="200" align="center">
                    <template scope="scope">
                      <el-button type="text" @click="watchDetail(scope.row.certifID)">查看详情</el-button>
                      <el-button type="text" @click="editKeyYounger(scope.row.certifID)">编辑</el-button>
                      <el-button type="text" @click="deleteKeyYounger(scope.row.keyYoungersID)">删除</el-button>
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
        netGridID: null,
        page: 1, // 页码
        pageSize: 10 // 页号
      },
      totalInfo: 40, // 页码总数
      currentPage:1,
      list: [],
      myobj: [],
      props: {
        keyYoungersID: "",
        certifID: "", //             '身份证号. 编码应符合GB 11643',
        name: "", //
        sex: "", //                   '1=男性；0=女性，编码应符合 GB/T 2261.1',
        guardianName: "", //         varchar(50),
        guardianContact: "", //      varchar(50) comment '监护人联系方式，手机号码或固定电话号码',
        netGridName: "" //            bigint,
      },
      labels: ["编号", "身份证号", "姓名", "性别", "监护人姓名", "监护人联系方式", "所属网格"]
    };
  },
  methods: {
    showAll() {
      this.filters.name = this.filters.certifID = null;
      this.getKeyYounger();
    },
    GetNodeValue(id) {
      this.filters.netGridID = id;
      this.getKeyYounger();
    },
   deleteKeyYounger(id) {
      this.$confirm("是否删除此人记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.deleteSpecialPerson(id, "06").then(res => {
            if (res.data) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getKeyYounger();
            } else {
              this.$message({
                type: "success",
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
    editKeyYounger(ID) {
      let that = this;
      this.$store.commit('SET_PAGE',{name:'I',index:that.filters.page});
      this.$router.push({
        path: "editSpecialPerson",
        query: {
          id: ID,
          specialId: "06"
        }
      });
    },
    watchDetail(ID) {
      let that = this;
      this.$store.commit('SET_PAGE',{name:'I',index:that.filters.page});
      this.$router.push({
        path: "keyYoungerInfo",
        query: {
          id: ID,
          specialId: "06"
        }
      });
    },
    exportData() {
      // 导出数据
    },
    getKeyYounger() {
      api.getKeyYoungersQuery(this.filters).then(res => {
        this.list = res.data.vos;
        this.totalInfo = res.data.page.totalCount;
      });
    },
    // 翻页
    handleCurrentChange(val) {
      this.filters.page = val;
      this.getKeyYounger();
    },
    // 绘制柱状图
    drawHistogram(obj) {
      this.histogram = echarts.init(document.getElementById("histogram"));
      this.histogram.setOption({
        backgroundColor: "#eeeeee",
        title: {
          text: "重点青少年各村分布图",
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
            data: obj.sort(function(a, b) {
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
    initChart() {
      api.getSpecialPersonPieChart("06").then(res => {
        this.myobj = res.data;
        this.drawHistogram(this.myobj);
      });
    }
  },
  mounted() {
    if(this.$store.getters.user.userRole!='超级管理员')
      this.filters.netGridID = this.$store.getters.user.netGridID
    this.initChart();
    this.getKeyYounger();


    this.$store.commit("INIT_PAGE","I");
    this.filters.page = this.$store.getters.page['I'];
    this.currentPage = this.filters.page;
  }
};
</script>

<style scoped>
.tjInfo {
  /* margin-top: 50px; */
  background-color: aliceblue;
  width: 100%;
  height: 700px;
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
// src/views/specialPopulationManage/keyYoungManage.vue?65a1be97