<template>
  <div>
    <el-row v-if="!visible">
      <el-col :span="24">
        <div id="main" style="height:800px;"></div>
      </el-col>
    </el-row>

    <el-row v-else>
      <div style="width:1500px">
        <el-col :span="5" style="margin-left:8%;margin-top:30px">
          <div class="btn_color" style="background:#FF4949;padding:13px 5px" @click="visible = false"><i class="el-icon-d-arrow-left"></i> 显示结构图</div>
          <div class="btn_color" v-for="(v,i) in tree.children" :id="'btn'+v.netGridID" @click="ckDetail(v.netGridID)" :key="i">
            {{v.netGridName}}
          </div>
        </el-col>
        <el-col :span="17" style="margin-top:35px">
          <el-row>
            <el-col :span="24">
              <div>
                <div class="btn_color2" style="padding:15px;margin-left:8px;margin-top:20px" @click="watchInfo(v.netGridID)" :id="'btn2_'+v.netGridID" v-for="(v,i) in target" :key="i">
                  {{v.netGridName}}
                </div>
              </div>
            </el-col>
            <el-col :span="24">
              <el-row style="margin-left:10px">
                <el-col style="margin-top:50px;" :span="4" v-for="(v,k,i) in arr" :key="i" :offset="i > 0 ? 4 : 0">
                  <el-card style="height:280px;" v-if="v.Name" :body-style="{ padding: '0px' }">
                    <img :src="v.photoPath" style="width:100%;height:200px;border:none">
                    <div class="photo_label">
                      {{v.Position}}
                    </div>
                    <div style="margin-top:-10px">
                      <div style="text-align:center">
                        <div >{{v.Name}}</div>
                        <el-button type="text" class="button">{{'联系电话：'+v.MobileTel}}</el-button>
                      </div>
                    </div>
                  </el-card>
                  <el-card style="height:280px" v-else :body-style="{ padding: '1px' }">
                    <div style="width:100%;height:200px;border:none;">
                      <div class="class1">暂无信息</div>
                    </div>
                    <div class="photo_label">
                      {{v.Position}}
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </div>
    </el-row>

    <el-dialog size="tiny" title="茅山风景区网格管理概况" top="30%" :visible.sync="visibleDialog">
      <p style="line-height: 2em;text-indent:2em;font-size:22px">
        茅山风景区下辖10个行政村，3万余人，11347户。共划分网格56个，其中村级网格45个、景区网格1个、专属网格10个。配备网格长46名、网格员47名、党小组长45名、警长6名、专属网格联络员10名。
      </p>
    </el-dialog>
  </div>
</template>

<script>
import * as api from "@/api/netGridManage";
import * as api2 from "@/api/zonghezhili/duiwujianshe";
export default {
  watch: {
    visible(val, nval) {
      if (val == false)
        this.$nextTick(() => {
          this.initCharts();
        });
    }
  },
  data() {
    return {
      visibleDialog: false,
      visible: false,
      tree: {},
      NetGridTree: [],
      target: [],
      graph: {
        nodes: [],
        links: []
      },
      dept: 0,
      Mychart: null,
      categories: [],
      arr: {
        WGZ: {
          Position:'网格长'
        },
        DZZ: {
          Position:'党小组长'
        },
        JZ: {
          Position:'警长'
        },
        WGY: {
          Position:'网格员'
        },
        XLY: {
          Position:'协理员'
        }
      }
    };
  },
  methods: {
    decodeTree(myNode, num) {
      var node = {
        name: myNode.netGridName,
        id: myNode.netGridID + "",
        category: num,
        symbolSize: 100 - num * 10,
        x: null,
        y: null,
        draggable: true
      };
      this.graph.nodes.push(node);
      if (myNode.children == undefined) {
        return;
      }
      var len = myNode.children.length;
      num++;
      if (num > this.dept) {
        this.dept = num;
      }
      for (var i = 0; i < len; i++) {
        var link = {
          source: myNode.netGridID + "",
          weight: 1,
          target: myNode.children[i].netGridID + ""
        };
        this.graph.links.push(link);
        this.decodeTree(myNode.children[i], num);
      }
      for (var i = 0; i < this.dept + 1; i++) {
        this.categories[i] = {
          name: "类型" + i
        };
      }
    },
    watchInfo(id) {
      this.arr = {
        WGZ: {
          Position:'网格长'
        },
        DZZ: {
          Position:'党小组长'
        },
        JZ: {
          Position:'警长'
        },
        WGY: {
          Position:'网格员'
        },
        XLY: {
          Position:'协理员'
        }
      }
      api.getNetGridMemberForOrg(id).then(res => {
        let m = res.data
        for(let i=0;i<m.length;i++){
          switch(m[i].Position){
            case '网格员':
            this.arr.WGY = m[i]
            break;
            case '协理员':
            this.arr.XLY = m[i]
            break;
            case '网格长':
            this.arr.WGZ = m[i]
            break;
            case '警长':
            this.arr.JZ = m[i]
            break;
            case '党小组长':
            this.arr.DZZ = m[i]
            break;
          }
        }
      });
      this.$nextTick(() => {
        this.$jquery(".btn_color2").removeClass("btn_active");
        this.$jquery("#btn2_" + id).addClass("btn_active");
      });
    },
    changeTarget(id) {
      this.NetGridTree.forEach(element => {
        if (element.netGridID == id) {
          this.target = element.children;
        }
      });
      this.$jquery(".btn_color").removeClass("btn_active");
      this.$jquery("#btn" + id).addClass("btn_active");
    },
    ckDetail(id) {
      this.changeTarget(id);
      this.watchInfo(this.target[0].netGridID)
    },
    openDialog(id) {
      this.visible = true;
      this.$nextTick(() => {
        this.changeTarget(id);
        this.watchInfo(this.target[0].netGridID);
      });
    },
    eConsole(param) {
      if (typeof param.seriesIndex == "undefined") {
        return;
      }
      if (param.type == "click") {
        //param.dataIndex 得到节点的index
        let id = this.graph.nodes[param.dataIndex].id;
        if (id != -1) this.openDialog(id);
        else{
          this.visibleDialog = true
        }
      }
    },
    initCharts() {
      var mcategories = this.categories;
      var mgraph = this.graph;
      this.Mychart = echarts.init(document.getElementById("main"));
      this.Mychart.on("click", this.eConsole);
      var option = {
        showContent: true,
        focusNodeAdjacency: true,
        title: {
          text: "茅山风景区网络结构图",
          subtext: "江苏-镇江-句容",
          left: 50
        },
        series: [
          {
            name: "Les Miserables",
            type: "graph",
            layout: "force",
            position:'absolute',
            data: mgraph.nodes,
            links: mgraph.links,
            categories: mcategories,
            roam: true,
            itemStyle: {
              //===============图形样式，有 normal 和 emphasis 两个状态。normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
              normal: {
                //默认样式
                label: {
                  show: true,
                  textStyle: {
                    //标签的字体样式
                    color: "#ffffff", //字体颜色
                    fontStyle: "normal", //文字字体的风格 'normal'标准 'italic'斜体 'oblique' 倾斜
                    fontWeight: "bolder", //'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的或100 | 200 | 300 | 400...
                    fontFamily: "sans-serif", //文字的字体系列
                    fontSize: 15 //字体大小
                  }
                },
                borderType: "solid", //图形描边类型，默认为实线，支持 'solid'（实线）, 'dashed'(虚线), 'dotted'（点线）。
                borderWidth: 2, //图形的描边线宽。为 0 时无描边。
                opacity: 1
                // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5
              },
              emphasis: {
                //高亮状态
              }
            },
            lineStyle: {
              //==========关系边的公用线条样式。
              normal: {
                color: "red",
                width: "1",
                type: "sold", //线的类型 'solid'（实线）'dashed'（虚线）'dotted'（点线）
                curveness: 0.3, //线条的曲线程度，从0到1
                opacity: 1
                // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5
              },
              emphasis: {
                //高亮状态
              }
            },
            force: {
              edgeLength: 50,
              repulsion: 200,
              gravity: 0,
              edgeLength: 250,
              layoutAnimation: true
            }
          }
        ]
      };
      this.Mychart.setOption(option);
      window.onresize = this.Mychart.resize;
    }
  },
  mounted() {
    api.getAllNetGrid().then(res => {
      this.NetGridTree = res.data;
      let num = 0;
      for (let i = 0; i < this.NetGridTree.length; i++) {
        if (this.NetGridTree[i].fatherNetGridID == -1) {
          this.NetGridTree[i].fatherNetGridName = "茅山风景区";
          this.NetGridTree[i].children = [];
          num++;
        }
        if (num == 10) {
          break;
        }
      }
      let root = this.NetGridTree.filter(item => {
        if (item.fatherNetGridID == -1) {
          return item;
        }
      });
      root.filter(item => {
        this.NetGridTree.filter(x => {
          if (x.fatherNetGridID == item.netGridID) {
            item.children.push(x);
          }
        });
      });
      this.NetGridTree = root;
    });

    api2.fetchServedPersonManageTypes().then(res => {
      this.tree = res.data.netGrid;
      let root = {
        fatherNetGridID: 0,
        netGridID: -1,
        netGridName: "茅山风景区",
        children: []
      };
      root.children = this.tree;
      this.tree = root;
      this.decodeTree(this.tree, 0);
      this.initCharts();
    });
  }
};
</script>

<style>
.btn_color {
  background-color: #cd5555;
  color: white;
  text-align: center;
  border-radius: 5px;
  display: block;
  margin: 30px;
  padding: 13px;
  width: 150px;
  font-size: 15px;
  cursor: pointer;
}

.btn_color2 {
  display: inline-block;
  background-color: #cd5555;
  color: white;
  text-align: center;
  border-radius: 5px;
  margin: 5px 25px;
  padding: 13px;
  width: 120px;
  font-size: 15px;
  cursor: pointer;
}

.btn_active {
  background-color: #3a5fcd;
  border: 1px solid #3a5fcd;
  color: white;
}

.userInfoEditTable,
.userInfoEditTable td {
  border: 1px solid darkgrey;
  padding: 10px;
  border-collapse: collapse;
  background-color: white;
}

.tb_label {
  width: 20%;
  text-align: right;
}
.photo_label {
  text-align: center;
  width: 100%;
  height: 25px;
  background-color: aliceblue;
  padding: 5px;
  position: relative;
  top: -30px;
  font-weight: bold;
  opacity: 0.4;
}
.class1 {
  text-align: center;
  font-size: 20px;
  color: #cd5555;
  padding: 50px;
  /* background-color: #cd5555; */
}
</style>




// WEBPACK FOOTER //
// src/views/netManage/netGrid.vue?509fa942