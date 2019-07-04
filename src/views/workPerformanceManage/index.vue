<template>
  <div>
    <el-row>
      <el-col :span="24" style="margin-bottom:10px;">
        <div style="float:right">
          <el-button type="text">请选择日期范围：</el-button>
          <el-date-picker v-model="time1" type="daterange" @change="change1" placeholder="选择日期范围"></el-date-picker>
          <el-button type="primary" @click="flush">刷新</el-button>
        </div>
      </el-col>
      <el-col :span="24">
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane label="总计" name="first">
            <el-col :span="24">
              <div id="pphistogram" style="width:98%;height:780px;"></div>
            </el-col>
          </el-tab-pane>
          <el-tab-pane label="事件类型" name="second">
            <el-col :span="24">
              <div id="chart2" style="width:1700px;height:600px"></div>
            </el-col>
            <el-col :span="24">
              <div class="tjInfo">
                <h2 style="text-intent:2em">数据统计</h2>
                <div>
                  <table
                    class="userInfoEditTable"
                    style="border-collapse:collapse;background-color:white;"
                    width="100%"
                    celskyNetpacing="0"
                  >
                    <tr>
                      <td>地区</td>
                      <td>社会治安</td>
                      <td>矛盾纠纷</td>
                      <td>交通事故</td>
                      <td>天网巡防事件</td>
                      <td>问题上报</td>
                      <td>小计</td>
                    </tr>
                    <tr
                      v-for="(v,index) in area"
                      @click="open('area_icon_',index,v,$event)"
                      :ref="'tr_'+index"
                      title="点击展开"
                      :key="index"
                      :class="index%2==0?'mycolor':''"
                      style="cursor:pointer"
                    >
                      <td style="color:#20A0FF">
                        {{v}}
                        <i
                          :ref="'area_icon_'+index"
                          class="el-icon-caret-right"
                          style="color:#20A0FF;transition:1s"
                        ></i>
                      </td>
                      <td>{{social[index]}}</td>
                      <td>{{dispute[index]}}</td>
                      <td>{{traffic[index]}}</td>
                      <td>{{skyNet[index]}}</td>
                      <td>{{wtsb[index]}}</td>
                      <td>{{social[index]+dispute[index]+skyNet[index]+traffic[index]+wtsb[index]}}</td>
                    </tr>
                    <tr class="mycolor">
                      <td>合计</td>
                      <td>{{getSum(social)}}</td>
                      <td>{{getSum(dispute)}}</td>
                      <td>{{getSum(traffic)}}</td>
                      <td>{{getSum(skyNet)}}</td>
                      <td>{{getSum(wtsb)}}</td>
                      <td>{{getSum(social)+getSum(dispute)+getSum(skyNet)+getSum(traffic)+getSum(wtsb)}}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </el-col>
          </el-tab-pane>
          <el-tab-pane name="third" label="完成情况">
            <el-col :span="24">
              <div id="chart1" style="width:1700px;height:500px"></div>
            </el-col>
            <el-col :span="24">
              <div class="tjInfo">
                <h2 style="text-intent:2em">数据统计</h2>
                <div>
                  <table
                    class="userInfoEditTable"
                    style="border-collapse:collapse;background-color:white;"
                    width="100%"
                    celskyNetpacing="0"
                  >
                    <tr>
                      <td>地区</td>
                      <td>已完成</td>
                      <td>未完成</td>
                      <td>小计</td>
                    </tr>
                    <tr v-for="(v,index) in types" :key="index" :class="index%2==0?'mycolor':''">
                      <td>{{v}}</td>
                      <td>{{solved[index]}}</td>
                      <td>{{unsolved[index]}}</td>
                      <td>{{solved[index]+unsolved[index]}}</td>
                    </tr>
                    <tr class="mycolor">
                      <td>合计</td>
                      <td>{{getSum(solved)}}</td>
                      <td>{{getSum(unsolved)}}</td>
                      <td>{{getSum(solved)+getSum(unsolved)}}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </el-col>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-dialog :title="title" :visible.sync="visible" width="800">
      <el-row>
        <!-- <el-col :span="24" style="margin-bottom:10px;">
          <div style="float:right">
            <el-button type="text">请选择日期范围：</el-button>
            <el-date-picker
              v-model="subTime"
              type="daterange"
              @change="change2"
              placeholder="选择日期范围"
            ></el-date-picker>
            <el-button type="primary" @click="flush2">刷新</el-button>
          </div>
        </el-col> -->
        <el-col :span="24">
          <div id="subChart" style="width:100%;height:500px"></div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import * as api from "../../api/performance";
import * as api2 from "@/api/orgManage";
import { Loading } from "element-ui";

export default {
  data() {
    return {
      activeName: "first",
      areaData: [],
      histogram: null,
      type: ["社会治安事件", "矛盾纠纷事件", "交通事故", "天网巡防事件"],
      area: [],
      wtsbY: [],
      wtsbN: [],
      socialY: [],
      socialN: [],
      disputeY: [],
      disputeN: [],
      trafficY: [],
      trafficN: [],
      skyNetY: [],
      skyNetN: [],
      chart1: {},
      dispute: [],
      traffic: [],
      social: [],
      skyNet: [],
      types: [],
      solved: [],
      unsolved: [],
      time1: [],
      subTime: [],

      filter: {
        start: null,
        end: null
      },
      subFilter: {
        start: null,
        end: null,
        netGridID: null
      },
      wtsb: [],
      visible: false,
      subChart: null,
      lastTd:null,
      title: "",
      currentType: 1,
      lastNodes:[]
    };
  },
  methods: {
    insertAfter(newNode, parentNode, curNode) {
      parentNode.insertBefore(newNode, curNode);
    },
    async open(dom, index, name, e) {
      var target = e.currentTarget.nextElementSibling;
      var parent = e.currentTarget.parentElement;
      var td = this.$refs[dom + index][0];
      if (td != undefined) {
        if (td.className == "el-icon-caret-right" &&target.className != "tr_child_" + index) {
          td.className = "el-icon-caret-bottom";
          let id = this.getAreaIDByName(name);
          let loadingInstance1 = Loading.service({
            fullscreen: true,
            target: parent
          });
          let res = await api.getSubMeshEventDataByNetGrid({
            netGridID: id,
            start:this.filter.start,
            end:this.filter.end
          });
          loadingInstance1.close();
          var area = res.data.dispute[0];
          var dispute = res.data.dispute[1];
          var traffic = res.data.traffic[1];
          var social = res.data.societySecurity[1];
          var skyNet = res.data.skynet[1];
          var wtsb = res.data.netGrid[1];

          for (let i = 0; i < area.length; i++) {
            var tr = document.createElement("tr");
            tr.className = "tr_child_" + index;
            for (let j = 0; j < 7; j++) {
              var td = document.createElement("td");
              td.className = 'new_td_Node';
              var text = "";
              switch (j) {
                case 0:
                  text = area[i];
                  break;
                case 1:
                  text = social[i];
                  break;
                case 2:
                  text = dispute[i];
                  break;
                case 3:
                  text = traffic[i];
                  break;
                case 4:
                  text = skyNet[i];
                  break;
                case 5:
                  text = wtsb[i];
                  break;
                case 6:
                  text =
                    social[i] + dispute[i] + skyNet[i] + traffic[i] + wtsb[i];
                  break;
              }
              td.innerText = text;
              tr.appendChild(td);
            }
            this.insertAfter(tr, parent, target);
          }
        } else {
          var nodes = document.getElementsByClassName("tr_child_" + index);
          this.changeNodesVisible(nodes,td);
        }
      }
    },
    changeNodesVisible(nodes,td) {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].style.visibility != "collapse") {
          nodes[i].style.visibility = "collapse";
          td.className = "el-icon-caret-right";
        } else {
          nodes[i].style.visibility = "";
          td.className = "el-icon-caret-bottom";
        }
      }
    },
    getAreaIDByName(name) {
      for (let obj of this.areaData) {
        if (obj.netGridName == name) {
          return obj.netGridID;
        }
      }
    },
    change1(value) {
      if (value.length > 0) {
        let arr = value.split(" - ");
        this.filter.start = arr[0];
        this.filter.end = arr[1];
      } else {
        this.filter.start = null;
        this.filter.end = null;
      }
      for(let i=0;i<this.area.length;i++){
        var tds = document.getElementsByClassName('tr_child_'+i);
        var index = 0;
        while(tds.length>0){
          tds[0].parentNode.removeChild(tds[0]);
        }
      }
      var m = document.getElementsByClassName('el-icon-caret-bottom');
      while(m.length>0){
          m[0].className = 'el-icon-caret-right';
      }
      this.init();
    },
    change2(value) {
      if (value.length > 0) {
        let arr = value.split(" - ");
        this.subFilter.start = arr[0];
        this.subFilter.end = arr[1];
      } else {
        this.subFilter.start = null;
        this.subFilter.end = null;
      }
      this.initSub();
    },
    initSub() {
      if (this.currentType == 1) {
        this.initSubCheckChart();
      } else {
        this.initSubMeshEventDataByNetGrid();
      }
    },
    flush() {
      this.time1 = [];
      this.filter.start = null;
      this.filter.end = null;
      this.init();
    },
    flush2() {
      this.subTime = [];
      this.subFilter.start = null;
      this.subFilter.end = null;
      this.initSub();
    },
    getSum(data) {
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        sum += data[i];
      }
      return sum;
    },
    initChart1(name, s, us) {
      this.chart1 = echarts.init(document.getElementById("chart1"));
      this.chart1.setOption({
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["已完成", "未完成"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: name,
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
            name: "已完成",
            type: "bar",
            barWidth: "10%",
            data: s
          },
          {
            name: "未完成",
            type: "bar",
            barWidth: "10%",
            data: us
          }
        ]
      });
    },
    initChart2(
      chart,
      dom,
      area,
      dispute,
      skynet,
      societySecurity,
      traffic,
      wtsb,
      callback
    ) {
      this.chart2 = echarts.init(document.getElementById(dom));
      this.chart2.setOption({
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: [
            "社会治安事件",
            "矛盾纠纷事件",
            "交通事故",
            "天网巡防事件",
            "问题上报"
          ]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: area
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "社会治安事件",
            type: "bar",
            data: societySecurity
          },
          {
            name: "矛盾纠纷事件",
            type: "bar",
            data: dispute
          },
          {
            name: "交通事故",
            type: "bar",
            data: traffic
          },
          {
            name: "天网巡防事件",
            type: "bar",
            data: skynet
          },
          {
            name: "问题上报",
            type: "bar",
            data: wtsb
          }
        ]
      });
      callback && callback(this.chart2);
    },
    commonInitChart(
      chart,
      dom,
      area,
      socialY,
      socialN,
      disputeY,
      disputeN,
      trafficY,
      trafficN,
      skyNetY,
      skyNetN,
      wtsbY,
      wtsbN,
      callback
    ) {
      chart = echarts.init(document.getElementById(dom));
      chart.setOption({
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: [
            "社会治安事件->已完成",
            "社会治安事件->未完成",
            "矛盾纠纷事件->已完成",
            "矛盾纠纷事件->未完成",
            "交通事故->已完成",
            "交通事故->未完成",
            "天网巡防->已完成",
            "天网巡防->未完成",
            "问题上报->已完成",
            "问题上报->未完成"
          ]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: area
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "社会治安事件->已完成",
            type: "bar",
            stack: "社会治安事件",
            data: socialY
          },
          {
            name: "社会治安事件->未完成",
            type: "bar",
            stack: "社会治安事件",
            data: socialN
          },
          {
            name: "矛盾纠纷事件->已完成",
            type: "bar",
            stack: "矛盾纠纷事件",
            data: disputeY
          },
          {
            name: "矛盾纠纷事件->未完成",
            type: "bar",
            stack: "矛盾纠纷事件",
            data: disputeN
          },
          {
            name: "交通事故->已完成",
            type: "bar",
            stack: "交通事故",
            data: trafficY
          },
          {
            name: "交通事故->未完成",
            type: "bar",
            stack: "交通事故",
            data: trafficN
          },
          {
            name: "天网巡防->已完成",
            type: "bar",
            stack: "天网巡防",
            data: skyNetY
          },
          {
            name: "天网巡防->未完成",
            type: "bar",
            stack: "天网巡防",
            data: skyNetN
          },
          {
            name: "问题上报->已完成",
            type: "bar",
            stack: "问题上报",
            data: wtsbY
          },
          {
            name: "问题上报->未完成",
            type: "bar",
            stack: "问题上报",
            data: wtsbN
          }
        ]
      });
      callback && callback(chart);
    },
    onclickOne(chart) {
      chart.off("click");
      chart.on("click", ({ name }) => {
        this.subFilter.netGridID = this.getAreaIDByName(name);
        this.title = name + "各网格事件处理情况统计";
        this.visible = true;
        this.$nextTick(async () => {
          if (this.currentType != 1) {
            for (var key in this.subFilter) {
              if (key != "netGridID") this.subFilter[key] = null;
              this.subTime = [];
            }
            this.currentType = 1;
          }
          await this.initSubCheckChart();
        });
      });
    },
    async initSubCheckChart() {
      let loadingInstance1 = Loading.service({
        fullscreen: true,
        text: "数据加载中...",
        target: document.getElementById("subChart")
      });
      this.subFilter.start = this.filter.start;
      this.subFilter.end = this.filter.end;
      let { data } = await api.getSubMeshEventDataForCheck(this.subFilter);
      //       socialY,
      // socialN,
      // disputeY,
      // disputeN,
      // trafficY,
      // trafficN,
      // skyNetY,
      // skyNetN,
      // wtsbY,
      // wtsbN,
      this.commonInitChart(
        this.subChart,
        "subChart",
        data.netGrid[0],
        data.societySecurity[1],
        data.societySecurity[2],
        data.dispute[1],
        data.dispute[2],
        data.traffic[1],
        data.traffic[2],
        data.skynet[1],
        data.skynet[2],
        data.netGrid[1],
        data.netGrid[2],
      );
      loadingInstance1.close();
    },
    async initSubMeshEventDataByNetGrid() {
      let loadingInstance1 = Loading.service({
        fullscreen: true,
        text: "数据加载中...",
        target: document.getElementById("subChart")
      });
      this.subFilter.start = this.filter.start;
      this.subFilter.end = this.filter.end;
      let { data } = await api.getSubMeshEventDataByNetGrid(this.subFilter);
      this.initChart2(
        this.subChart,
        "subChart",
        data.dispute[0],
        data.dispute[1],
        data.skynet[1],
        data.societySecurity[1],
        data.traffic[1],
        data.netGrid[1]
      );
      loadingInstance1.close();
    },
    onclickTwo(chart) {
      chart.off("click");
      chart.on("click", ({ name }) => {
        this.subFilter.netGridID = this.getAreaIDByName(name);
        this.title = name + "各网格事件处理情况统计";
        this.visible = true;
        this.$nextTick(async () => {
          if (this.currentType != 2) {
            for (var key in this.subFilter) {
              if (key != "netGridID") this.subFilter[key] = null;
              this.subTime = [];
            }
            this.currentType = 2;
          }
          await this.initSubMeshEventDataByNetGrid();
        });
      });
    },

    init() {
      api.getEventDataForCheck(this.filter).then(res => {
        this.wtsbY = res.data.netGrid[1];
        this.wtsbN = res.data.netGrid[2];

        this.socialY = res.data.societySecurity[1];
        this.socialN = res.data.societySecurity[2];

        this.disputeY = res.data.dispute[1];
        this.disputeN = res.data.dispute[2];

        this.trafficY = res.data.traffic[1];
        this.trafficN = res.data.traffic[2];

        this.skyNetY = res.data.skynet[1];
        this.skyNetN = res.data.skynet[2];

        this.area = res.data.dispute[0];

        this.commonInitChart(
          this.histogram,
          "pphistogram",
          this.area,
          this.socialY,
          this.socialN,
          this.disputeY,
          this.disputeN,
          this.trafficY,
          this.trafficN,
          this.skyNetY,
          this.skyNetN,
          this.wtsbY,
          this.wtsbN,
          this.onclickOne
        );
      });

      api.getEventCountByStatus(this.filter).then(res => {
        this.types = res.data.name;
        this.solved = res.data.solved;
        this.unsolved = res.data.unsolved;
        this.initChart1(res.data.name, res.data.solved, res.data.unsolved);
      });

      api.getEventDataByNetGrid(this.filter).then(res => {
        this.dispute = res.data.dispute[1];
        this.traffic = res.data.traffic[1];
        this.social = res.data.societySecurity[1];
        this.skyNet = res.data.skynet[1];
        this.wtsb = res.data.netGrid[1];
        this.initChart2(
          this.chart2,
          "chart2",
          res.data.dispute[0],
          res.data.dispute[1],
          res.data.skynet[1],
          res.data.societySecurity[1],
          res.data.traffic[1],
          res.data.netGrid[1],
          this.onclickTwo
        );
      });
    }
  },
  async mounted() {
    let loadingInstance1 = Loading.service({
      fullscreen: true,
      text: "数据加载中..."
    });
    let { data } = await api2.getOrgCode();
    this.areaData = data.netGrid;
    this.init();
    loadingInstance1.close();
    window.onresize = () => {
      if (this.chart != null) {
        this.chart.resize();
      }
      if (this.chart2 != null) {
        this.chart2.resize();
      }
      if (this.histogram != null) {
        this.histogram.resize();
      }
      if (this.subChart != null) {
        this.subChart.resize();
      }
    };
  }
};
</script>
<style scoped>
.userInfoEditTable,
.userInfoEditTable td {
  border: 1px solid darkgrey;
  padding: 10px;
  text-align: center;
}

.tjInfo {
  background-color: aliceblue;
  width: 100%;
  padding: 10px;
}
</style>



// WEBPACK FOOTER //
// src/views/workPerformanceManage/index.vue?2d683d76