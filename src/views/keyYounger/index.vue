<template>
    <div>
        <el-row>
            <el-col :span="18">
                <div id="stackchart" style="width:100%;height:800px;margin-top:20px"></div>
            </el-col>
            <el-col :span="6">
                <div class="tjInfo">
                    <h2 style="padding:12px">数据统计</h2>
                    <div style="padding:5px">
                        <table  class="userInfoEditTable" style="border-collapse:collapse;background-color:white;" width="100%" cellspacing="0">
                            <tr>
                                <td>地区</td>
                                <td>本月各村镇问题事件统计</td>
                            </tr>
                            <tr v-for="(v,index) in area" :key="v" :class="index%2==0?'mycolor':''">
                                <td>{{v}}</td>
                                <td>{{areaData[index]}}</td>
                            </tr>
                            <tr class="mycolor">
                                <td>合计</td>
                                <td>
                                    {{getSum(areaData)}}
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import * as api2 from "@/api/specialPopulation/index";

export default {
  data() {
    return {
      stackChart: null,
      area: ["上杆", "马梗", "李塔", "潘冲", "夏林", "后河", "天乐", "玉晨", "茅山", "墓东"],
      areaData: [40, 52, 200, 134, 290, 230, 120, 90, 190, 200]
    };
  },
  methods: {
    // 绘制饼状图
    initCharts(area,datas) {
        this.stackChart = echarts.init(document.getElementById("stackchart"));
        this.stackChart.setOption({
          color: ["#EE2C2C"],
          title: {
            text: "一个月内各村问题事件发生次数柱状图"
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
          xAxis: [{
            type: "category",
            data: area,
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: "value"
          }],
          series: [{
            name: "交通事故",
            type: "bar",
            barWidth: "50%",
            data: datas
          }]
        });
    },
    getSum(data){
        let sum = 0;
        for(let i=0;i<data.length;i++){
            sum +=data[i]
        }
        return sum;
    }
  },
  mounted() {
    api2.getKeyYoungerHistogramCount().then(res=>{
      this.area = res.data[0]
      this.areaData = res.data[1]
      this.initCharts(this.area,this.areaData);
    })
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
// src/views/keyYounger/index.vue?4e5ca605