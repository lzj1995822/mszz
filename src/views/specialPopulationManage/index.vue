<template>
    <div>
        <el-row>
            <el-col :span="14">
                <div id="stackchart" style="width:100%;height:800px;margin-top:20px"></div>
            </el-col>
            <el-col :span="10">
                <div class="tjInfo">
                    <h2 style="padding:12px">数据统计</h2>
                    <div style="padding:5px">
                        <table class="userInfoEditTable" style="border-collapse:collapse;background-color:white;" width="100%" cellspacing="0">
                            <tr>
                                <td>地区</td>
                                <td v-for="(v,i) in person" :key="v.id">
                                    {{v=='肇事肇祸等严重精神障碍患者'?'精神病患者':v}}
                                </td>
                                <td>小计</td>
                            </tr>
                            <tr v-for="(v,i) in cun" :key="v.id" :class="i%2==0?'mycolor':''">
                                <td>{{v}}</td>
                                <td v-for="(m,n) in person" :key="m.id">
                                    {{datas[n][i]}}
                                </td>
                                <td>
                                    {{getLittleSum(i)}}
                                </td>
                            </tr>
                            <tr class="mycolor">
                                <td>合计</td>
                                <td v-for="(v,i) in person" :key="v.id">
                                    {{getSum(i)}}
                                </td>
                                <td>{{getTotal()}}</td>
                            </tr>
                         </table>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import * as api from "@/api/specialPopulation/index";

export default {
    data() {
        return {
            stackChart: null,
            area:[ '上杆','马梗','李塔', '潘冲','夏林','后河','天乐', '玉晨', '茅山','墓东'],
            person:[],
            cun:[],
            datas:[],
            total:0
        }
    },
    methods: {
        getLittleSum(n){
            let sum = 0
            for(let i=0;i<this.person.length;i++){
                sum +=this.datas[i][n]
            }
            return sum
        },
        getSum(x){
            let sum = 0;
            for(let i=0;i<this.datas[x].length;i++){
                sum +=this.datas[x][i]
            }
            return sum
        },
        getTotal(){
            let sum = 0;
            for(let i=0;i<this.datas.length;i++){
                for(let j=0;j<this.datas[i].length;j++){
                    sum +=this.datas[i][j]
                }
            }
            return sum
        },
        initStackCharts(person,cun,datas) {
            this.stackChart = echarts.init(document.getElementById('stackchart'))
            this.stackChart.setOption({
                title: {
                    text: '特殊人口的各村分布图'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data: person
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: cun,
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: datas
            })
        },
        initCharts(){
            api.getIndexChart().then(res=>{
                this.person = res.data[0]
                this.cun = res.data[1]
                this.datas = res.data[2]
                let self = this
                var myseries = []
                for(let i=0;i<this.datas.length;i++){
                    var obj = {
                        name: self.person[i],
                        type: 'line',
                        stack: '总量',
                        areaStyle: { normal: {} },
                        data: self.datas[i]
                    }
                    myseries.push(obj)
                }
                this.initStackCharts(this.person,this.cun, myseries)
            })
        }
    },
    mounted() {
        this.initCharts()
    }
}
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
// src/views/specialPopulationManage/index.vue?418923c7