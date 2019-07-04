<template>
  <div>
    <el-row>
      <el-col :span="5" style="margin-left:10px">
        <div class="tb_body">
          <div class="tb_header">
            辖区工作开展情况
          </div>
          <div class="tb_content">
            <div class="fuwuMessage">
              <el-badge :value="fuwu.fwtd">
                <img src="../../assets/fuwutuandui.png">
              </el-badge>
              <div style="color:red">
                服务团队
              </div>
            </div>
            <div class="fuwuMessage">
              <el-badge :value="fuwu.fwry">
                <img src="../../assets/fuwurenyuan.png" alt="">
              </el-badge>
              <div style="color:red">
                服务人员
              </div>
            </div>
            <div>
              <dd align="left">
                <dl>服务对象：
                  <font style="color:red">{{fuwu.fwdx}}</font> 人</dl>
                <dl>累计服务次数：
                  <font style="color:red">{{fuwu.ljfwcs}}</font>次</dl>
                <dl>累计服务人数：
                  <font style="color:red">{{fuwu.ljfwrs}}</font> 人</dl>
              </dd>
            </div>
          </div>
        </div>

        <div class="tb_body" style="margin-top:10px">
          <div class="tb_header">
            本月服务记录
          </div>
          <div  >
            <div style="height:370px;margin-top:40px">
              <dd>
                <dl>
                  常住人口：
                  <font style="color:red">{{a}}</font> 人次</dl>
                </dl>
                <dl>
                  留守人口：
                  <font style="color:red">{{b}}</font> 人次</dl>
                </dl>
                <dl>
                  流动人口：
                  <font style="color:red">{{c}}</font> 人次</dl>
                </dl>
                <dl>
                  境外人口：
                  <font style="color:red">{{d}}</font> 人次</dl>
                </dl>
              </dd>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="18" style="margin-left:10px">
        <el-tabs type="border-card">
          <el-tab-pane label="实有人口">
            <div align="center" id="brokenline" style="width:1200px;height:800px"></div>
          </el-tab-pane>
          <el-tab-pane label="重点人口">
            <div align="center" id="ImportantLine" style="width:1200px;height:800px"></div>
          </el-tab-pane>
          <el-tab-pane label="服务记录">
            <div align="center" id="recordChart" style="width:1200px;height:800px"></div>
          </el-tab-pane>
          <!-- <el-tab-pane label="实有房屋">
            <div align="center" id="histogram" style="width:1200px;height:800px"></div>
          </el-tab-pane> -->
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as api from "@/api/zonghezhili/duiwujianshe";

export default {
  data() {
    return {
      dialogVisible: false,
      fuwu: {
        fwtd: 0, //服务团队
        fwry: 0, //服务人员
        fwdx: 0, //服务对象
        ljfwcs: 0, //累计服务次数
        ljfwrs: 0 //累计服务人数
      },
      cun:['茅山村','夏林村','玉晨村','墓东村','潘冲区','李塔村','上杆村','马埂村','天乐村','后河村'],
      a:"",
      b:"",
      c:"",
      d:"",
      czrk:[5729,4209,4027,2609,3450,4046,2724,2572,1606,2217],
      ldrk:[255,254,300,39,130,104,60,32,41,18],
      lsrk:[0,0,0,0,0,0,0,0,0,0],
      jwrk:[4,0,0,4,0,1,0,0,0,0],
      person:['户籍人口','流动人口','留守人口','境外人口'],
      brokenLine: null,
      ImportantLine: null,
      histogram: null,
      servedRecord: null
    };
  },
  methods: {
    // drawHouse() {
    //   this.histogram = echarts.init(document.getElementById("histogram"));
    //   this.histogram.setOption({
    //     color: ["#3398DB"],
    //     title: {
    //       text: "当前各村镇实有房屋"
    //     },
    //     toolbox: {
    //       feature: {
    //         saveAsImage: {}
    //       }
    //     },
    //     tooltip: {
    //       trigger: "axis",
    //       axisPointer: {
    //         // 坐标轴指示器，坐标轴触发有效
    //         type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
    //       }
    //     },
    //     grid: {
    //       left: "3%",
    //       right: "4%",
    //       bottom: "3%",
    //       containLabel: true
    //     },
    //     legend: {
    //       data: ["上杆", "马梗", "李塔", "潘冲", "夏林", "后河", "天乐", "玉晨", "茅山", "墓东"]
    //     },
    //     xAxis: [
    //       {
    //         type: "category",
    //         data: ["上杆", "马梗", "李塔", "潘冲", "夏林", "后河", "天乐", "玉晨", "茅山", "墓东"],
    //         axisTick: {
    //           alignWithLabel: true
    //         }
    //       }
    //     ],
    //     yAxis: [
    //       {
    //         type: "value"
    //       }
    //     ],
    //     series: [
    //       {
    //         name: "实有房屋",
    //         type: "bar",
    //         barWidth: "50%",
    //         data: [110, 152, 200, 334, 390, 330, 220, 457, 800, 600]
    //       }
    //     ]
    //   });
    // },
    drawSpecialPerson(cun, person, aid, xm, drug, jsb, sqjz) {
      this.ImportantLine = echarts.init(
        document.getElementById("ImportantLine")
      );
      this.ImportantLine.setOption({
        color: ["#6495ED", "#B452CD", "#87CEEB", "#7CFC00", "#7A378B"],
        title: {
          text: "各村重点人口分布图"
        },
        legend: {
          data: person
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
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
            name: person[0],
            type: "bar",
            barWidth: "10%",
            data: xm
          },
          {
            name: person[1],
            type: "bar",
            barWidth: "10%",
            data: sqjz
          },
          {
            name: person[2],
            type: "bar",
            barWidth: "10%",
            data: jsb
          },
          // {
          //   name: person[3],
          //   type: "bar",
          //   barWidth: "10%",
          //   data: drug
          // },
          // {
          //   name: person[4],
          //   type: "bar",
          //   barWidth: "10%",
          //   data: aid
          // }
        ]
      });
    },
    drawRealPopulation(cun, person, hj, ld, ls, wj) {
      this.brokenLine = echarts.init(document.getElementById("brokenline"));
      this.brokenLine.setOption({
        color: ["#6495ED", "#B452CD", "#87CEEB", "#7CFC00", "#7A378B"],
        legend: {
          data: person
        },
        title: {
          text: "各村实有人口分布图"
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
        toolbox: {
          feature: {
            saveAsImage: {}
          }
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
            name: person[0],
            type: "bar",
            barWidth: "10%",
            data: hj
          },
          {
            name: person[1],
            type: "bar",
            barWidth: "10%",
            data: ld
          },
          {
            name: person[2],
            type: "bar",
            barWidth: "10%",
            data: ls
          },
          {
            name: person[3],
            type: "bar",
            barWidth: "10%",
            data: wj
          }
        ]
      });
    },
    drawRecord(date, record) {
      this.servedRecord = echarts.init(document.getElementById("recordChart"));
      this.servedRecord.setOption({
        title: {
          text: "本周服务记录"
        },
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "服务记录",
            type: "line",
            stack: "总量",
            data: record
          }
        ]
      });
    },
    drawCharts() {
      setTimeout(() => {
        // 获取是实有人口信息
        api.fetchIndexPopulationChartInfo().then(res => {
          var cun, person, hj, ld, ls, wj;
          cun = res.data[0];
          person = res.data[1];
          hj = res.data[2];
          ld = res.data[3];
          ls = res.data[4];
          wj = res.data[5];

          this.drawRealPopulation(cun, person, hj, ld, ls, wj);
        });

        // this.drawRealPopulation(this.cun,this.person,this.czrk,this.ldrk,this.lsrk,this.jwrk)

        api.fetchSpecialPersonChartInfo().then(res => {
          var cun, person, aid, xm, drug, jsb, sqjz;
          cun = res.data[0];
          person = res.data[1];
          xm = res.data[2];
          sqjz = res.data[3];
          jsb = res.data[4];
          drug = res.data[5];
          aid = res.data[6];
          this.drawSpecialPerson(cun, person, aid, xm, drug, jsb, sqjz);
        });
        // let xm = [0,0,0,0,0,0,0,0,0,0]
        // let sqjz = [0,0,0,0,0,0,0,0,0,0]
        // let aid = [0,0,0,0,0,0,0,0,0,0]
        // let drug = [2,2,0,2,1,2,1,2,0,0]
        // let jsb = [0,0,0,0,0,0,0,0,0,0]
        // let type = ['刑满释放人员','社区矫正人口','精神病患者','吸毒人员','艾滋病']
        // this.drawSpecialPerson(this.cun,type,aid,xm,drug, jsb, sqjz)

        // this.drawHouse();

        api.fetchServedRecordChartInfo().then(res => {
          var date, record;
          date = res.data[0];
          record = res.data[1];

          this.drawRecord(date, record);
        });
      }, 200);
    }
  },
  mounted() {
    this.drawCharts();
    api.getZZHomePageCount().then(res => {
      this.fuwu.fwtd = res.data.orgBasicInf;
      this.fuwu.fwry = res.data.orgMember;
      this.fuwu.fwdx = res.data.servedTotalTimes;
      this.fuwu.ljfwcs = res.data.everyMonthPersonCount;
      this.fuwu.ljfwrs = res.data.servedTotalCount

      for(let i=0;i<res.data.currentMonthCount.length;i++){
        if(res.data.currentMonthCount[i].date==='01'){
          this.a = res.data.currentMonthCount[i].count
        }else if(res.data.currentMonthCount[i].date==='02'){
          this.b = res.data.currentMonthCount[i].count
        }else if(res.data.currentMonthCount[i].date==='03'){
          this.c = res.data.currentMonthCount[i].count
        }else{
          this.d = res.data.currentMonthCount[i].count
        }
      }
    });
  }
};
</script>

<style scoped>
.tb_header {
  border: 2px solid #eeeeee;
  background-color: #eeeeee;
  padding: 8px;
  text-indent: 1em;
  border-left: 4px solid #20a0ff;
  border-left-width: 5px;
  font-size: 20px;
  font-weight: 1200;
  color: black;
}

.tb_body {
  border: 3px solid #eeeeee;
  height: 430px;
  width: 350px;
  background-color: white;
}

.tb_content {
  text-align: center;
  height: 430px;
}

.fuwuMessage {
  display: inline-block;
  padding: 20px;
  margin-top: 20px;
}

tr td {
  padding: -10;
  margin: 0;
}

.style1 {
  padding-top: 10px;
  font-size: 20px;
  width: 100%;
  /* background-color:red; */
  text-indent: 1em;
  line-height: 30px;
}

#allmap {
  width: 100%;
  height: 580px;
  margin: 0;
  font-family: "微软雅黑";
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
  border-radius: 10px;
}

::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-image: -webkit-gradient(
    linear,
    left bottom,
    left top,
    color-stop(0.44, rgb(122, 153, 217)),
    color-stop(0.72, rgb(73, 125, 189)),
    color-stop(0.86, rgb(28, 58, 148))
  );
}
</style>





// WEBPACK FOOTER //
// src/views/zongzhizuzhi/index.vue?70903558