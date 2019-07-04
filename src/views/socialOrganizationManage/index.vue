<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="width:100%;text-align:center">
          <h1>茅山各村常非公有制经济组织和社会组织数量统计</h1>
        </div>
        <div align="center" id="histogram" style="width:100%; height:400px"></div>
      </el-col>
      <el-col :span="24">
        <!-- <div style="width:100%;text-align:center">
          <h1>茅山各村常非公有制社会组织数量</h1>
        </div> -->
        <div align="center" id="histogram2" style="width:100%; height:400px"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as api from "@/api/orgManage";
export default {
  data() {
    return {
      area: [
        "上杆",
        "马梗",
        "李塔",
        "潘冲",
        "夏林",
        "后河",
        "天乐",
        "玉晨",
        "茅山",
        "墓东"
      ],
      areaData: [],
      area1: [],
      areaData1: [],
    };
  },
  methods: {
    initCharts1() {
      api.getEconomyHistogram().then(res => {
        this.area = res.data[0];
        this.areaData = res.data[1];
        this.drawHistogram1(this.area, this.areaData);
      });
    },
    initCharts2() {
      api.getSocietyOrgHistogram().then(res => {
        this.area1 = res.data[0];
        this.areaData1 = res.data[1];
        this.drawHistogram2(this.area1, this.areaData1);
      });
    },
    // 绘制柱状图
    drawHistogram1(area, datas) {
      this.histogram = echarts.init(document.getElementById("histogram"));
      this.histogram.setOption({
        color: ["#CD1076"],
        title: {
          text: "当前各村非公有制经济保有情况"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        legend: {
          data: area
        },
        xAxis: [
          {
            type: "category",
            data: area,
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
            name: "非公有制经济组织数量",
            type: "bar",
            barWidth: "50%",
            data: datas
          }
        ]
      });
    },
      // 绘制柱状图
    drawHistogram2(area, datas) {
      this.histogram = echarts.init(document.getElementById("histogram2"));
      this.histogram.setOption({
        color: ["#EE4000"],
        title: {
          text: "当前各村非公有制社会组织数量"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        legend: {
          data: area
        },
        xAxis: [
          {
            type: "category",
            data: area,
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
            name: "非公有制社会组织数量",
            type: "bar",
            barWidth: "50%",
            data: datas
          }
        ]
      });
    },
  },
  mounted() {
    this.initCharts1();
    this.initCharts2();
    this.$store.commit("INIT_PAGE","");
  }
};
</script>


<style scoped>

</style>



// WEBPACK FOOTER //
// src/views/socialOrganizationManage/index.vue?fefacf44