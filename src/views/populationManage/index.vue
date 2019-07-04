<template>
    <div>
        <el-row>
            <el-col :span="16">
                <div id="pphistogram" style="width:100%;height:800px;margin-top:40px"></div>
            </el-col>
            <el-col :span="8">
                <div class="tjInfo">
                    <h2 style="text-intent:2em">数据统计</h2>
                    <div>
                        <table  class="userInfoEditTable" style="border-collapse:collapse;background-color:white;" width="100%" cellspacing="0">
                            <tr>
                                <td>地区</td>
                                <td>户籍人口</td>
                                <td>流动人口</td>
                                <td>留守人口</td>
                                <td>境外人口</td>
                                <td>小计</td>
                            </tr>
                            <tr v-for="(v,index) in area" :key="index" :class="index%2==0?'mycolor':''">
                                <td>{{v}}</td>
                                <td>{{huji[index]}}</td>
                                <td>{{ld[index]}}</td>
                                <td>{{ls[index]}}</td>
                                <td>{{jw[index]}}</td>
                                <td>{{huji[index]+ld[index]+ls[index]+jw[index]}}</td>
                            </tr>
                            <tr class="mycolor">
                                <td>合计</td>
                                <td>{{getSum(huji)}}</td>
                                <td>{{getSum(ld)}}</td>
                                <td>{{getSum(ls)}}</td>
                                <td>{{getSum(jw)}}</td>
                                <td>{{getSum(huji)+getSum(ld)+getSum(ls)+getSum(jw)}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import * as api from '@/api/realpopulation/index'

export default {
    data() {
        return {
            histogram: null,
            area:['茅山村','夏林村','玉晨村','墓东村','潘冲区','李塔村','上杆村','马埂村','天乐村','后河村'],
            type:['户籍人口','流动人口','留守人口','境外人口'],
            huji: [5729,4209,4027,2609,3450,4046,2724,2572,1606,2217],
            ld: [255,254,300,39,130,104,60,32,41,18],
            ls: [0,0,0,0,0,0,0,0,0,0],
            jw: [4,0,0,4,0,1,0,0,0,0]
        }
    },
    methods: {
        initCharts(area,type,huji,ld,ls,jw) {
            this.histogram = echarts.init(document.getElementById('pphistogram'))
            this.histogram.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                title: {
                    text: '茅山各村人口分布堆叠图'
                },
                legend: {
                    data:type
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value'
                },
                yAxis: {
                    type: 'category',
                    data: area,
                },
                series: [
                    {
                        name: '户籍人口',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideLeft'
                            }
                        },
                        data: huji
                    },
                    {
                        name: '流动人口',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideLeft'
                            }
                        },
                        data: ld
                    },
                    {
                        name: '留守人口',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideLeft'
                            }
                        },
                        data: ls
                    },
                    {
                        name: '境外人员',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideLeft'
                            }
                        },
                        data: jw
                    }
                ]
            })
        },
        getSum(data){
            let sum = 0;
            for(let i=0;i<data.length;i++){
                sum+=data[i]
            }
            return sum
        }
    },
    mounted() {
        this.$store.commit("INIT_PAGE",'');
        api.getServedPersonCount().then(res=>{
            this.area = res.data[0]
            this.type = res.data[1]
            this.huji = res.data[2]
            this.ld = res.data[3]
            this.ls = res.data[4]
            this.jw = res.data[5]
            this.initCharts(this.area,this.type,this.huji,this.ld,this.ls,this.jw)
        })
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

.tb_label {
    width: 12%;
}

.mycolor{
    background-color:#EDEDED;
    /* cursor: pointer; */
}
</style>



// WEBPACK FOOTER //
// src/views/populationManage/index.vue?2dc20a93