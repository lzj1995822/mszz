<template>
  <div style="padding:-20px">
    <div id="mytools" :style="sidebar.opened==true?s1:s2">
      <dl>
        <dd>
          <el-button plain type="primary" @click="reTurnMaoShan" style="padding:10px;margin-left:-5px;margin-right:5px">
            <i class="fa fa-dot-circle-o fa-lg"></i>
          </el-button>
          <el-button type="success" v-if="show" @click="showAllComplex" style="padding:10px;margin-left:-5px;">
            显示网格名称
          </el-button>
          <el-button type="primary" v-else @click="hideAllComplex" style="padding:10px;margin-left:-5px;">
            隐藏网格名称
          </el-button>
        </dd>
      </dl>
    </div>
    <div id="map" :style="style"></div>
    <el-row>
      <el-col :span="24">
        <el-dialog title="上传区域信息" width="30%" :visible.sync="visible">
          <el-form :model="form" ref="form" style="width:50%" :rules="rules" label-width="120px" label-suffix="：">
            <el-form-item label="区域名称">
              <el-input style="width:400px" v-model="form.regionName"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="warning" @click="reset()">取消</el-button>
              <el-button type="primary" @click="upload()">上传</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-col>
    </el-row>
    <el-input v-model="areaName" style="width:300px;position:absolute;right:200px;top:67px;" placeholder="请输入区域名称">
      <template slot="append">
        <i style="cursor:pointer;" @click="search()" class="fa fa-search fa-lg"></i>
      </template>
    </el-input>
    <dd id="Menu">
      <dl>
        <el-button size="small" style="border-radius:0" id="deleteMenu">删除选中区域</el-button>
      </dl>
      <dl>
        <el-button size="small"  style="border-radius:0;border-top:1px solid;border-bottom:1px solid" id="editMenu">编辑区域信息</el-button>
      </dl>
      <dl>
        <el-button size="small" style="border-radius:0" id="ranksMenu">巡防队伍信息</el-button>
      </dl>
    </dd>
    <el-dialog title="区域信息编辑" width="300px" :visible.sync="visible2">
      <el-form :model="editObj" label-width="100px" label-suffix="：">
        <el-form-item label="区域名称">
          <el-input v-model="editObj.regionName" style="width:300px"></el-input>
          <el-button type="success" style="margin-left:10px" @click="updateArea">更新</el-button>
          <el-button plain style="margin-left:10px" @click="visible2=false">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="巡防队伍详细信息" :visible.sync="visible3">
      <div id="table">
        <table class="userInfoEditTable" style="border-collapse:collapse;background-color:white;" width="100%" cellspacing="0">
          <tr v-for="(v,k,i) in form2[0]" v-if="form2.length>0"  :key="v">
            <td class="tb_label">{{labels2[i]}}</td>
            <td>
              {{v}}
            </td>
          </tr>
          <tr v-else>
            <td>暂无队伍信息</td>
          </tr>
          <tr v-if="form2.length>0">
            <td colspan="2" align="center">
              <el-button type="text" size="large" @click="printTable('table')">[打印]</el-button>
              <el-button type="text" size="large" @click="visible3=false">[关闭]</el-button>
            </td>
          </tr>
        </table>
        <span style="text-align:center" v-if="form2.length==0">
            <h1>暂无队伍信息</h1>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import BMap from "BMap";
  import ComplexCustomOverlay from "./ComplexCustomOverlay";
  import {
    mapGetters
  } from "vuex";
  import * as api from "@/api/skynetManage";

  export default {
    computed: {
      ...mapGetters({
        sidebar: "sidebar"
      })
    },
    data() {
      return {
        show: true,
        selcetID: "",
        areas: [],
        areaName: "",
        style: {
          width: "100%",
          height: 900 + "px"
        },
        s1: {
          position: "absolute",
          left: "340px",
          top: "66px",
          "z-index": 2000
        },
        s2: {
          position: "absolute",
          left: "200px",
          top: "65px",
          "z-index": 2000
        },
        map: null,
        overlays: [],
        overlaysColor: [],
        Coloroverlays: [],
        colors: ["red", "#EEA9B8", "blue", "#c48402", "#CD4F39", "#B0E0E6"],
        index: 0,
        visible: false,
        visible2: false,
        visible3: false,
        form: {
          regionName: "",
          regionLocation: []
        },
        form2: {},
        rules: {
          regionName: [{
            required: true,
            message: "请输入区域名称",
            trigger: "blur"
          }]
        },
        lastPloy: "",
        ComplexArr: [],
        editObj: {},
        labels2: [
          "编号",
          "队伍名称",
          "联系方式",
          "队伍职能",
          "负责人姓名",
          "负责人联系方式",
          "队伍人数",
          "巡查区域",
          "备注"
        ]
      };
    },
    methods: {
      printTable(div) {
        var div_print = document.getElementById(div);
        var newStr = div_print.innerHTML;
        var oldStr = document.body.innerHTML;
        document.body.innerHTML = newStr;
        window.print();
        window.location.reload();
        window.body.innerHTML = oldStr;
        return false;
      },
      updateArea() {
        api.updateSPRegion(this.editObj).then(res => {
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "更新成功!"
            });
            document.location.reload();
          } else {
            this.$message({
              type: "error",
              message: "更新失败!"
            });
          }
        });
      },
      locatinArea(pointArray, obj) {
        this.map.removeOverlay(this.lastPloy);
        //绘制不规则覆盖物
        var ploygon = new BMap.Polygon(pointArray, {
          strokeColor: "black",
          fillColor: "#00CED1",
          fillOpacity: 0.9,
          strokeWeight: 1,
          strokeOpacity: 0.5
        });
        let topPoint = this.getTopPoint(pointArray);
        this.map.centerAndZoom(topPoint, 13.5);
        this.overlaysColor.push(ploygon);
        this.map.addOverlay(ploygon);
        this.lastPloy = ploygon;
      },
      search() {
        api.selectByRegionName(this.areaName).then(res => {
          if (res.data.length > 0) {
            let obj = JSON.parse(res.data[0].regionLocation);
            let color = obj.color;
            let arr = [];
            for (let i = 0; i < obj.locations.length; i++) {
              arr.push(
                new BMap.Point(obj.locations[i].lng, obj.locations[i].lat)
              );
            }
            this.locatinArea(arr, res.data[0]);
          }
        });
      },
      reset() {
        for (var key in this.form) {
          this.form[key] = "";
        }
        this.visible = false;
        this.clearLastOverLay();
      },
      clearLastOverLay() {
        for (let i = 0; i < this.overlays.length; i++) {
          this.map.removeOverlay(this.overlays[i]);
          this.map.removeOverlay(this.Coloroverlays[i]);
        }

        this.overlays = this.Coloroverlays = [];
      },
      upload() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            api.addSPRegion(this.form).then(res => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "添加成功!"
                });
                this.visible = false;
                this.getAllFenceNet();
              } else {
                this.$message({
                  type: "error",
                  message: "添加失败!"
                });
              }
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      initMap() {
        //初始化茅山地区覆盖物
        this.addPolygon();
      },
      drawPloygon(pointArray, name, fillcolor) {
        //绘制不规则覆盖物
        var ploygon = new BMap.Polygon(pointArray, {
          strokeColor: "black",
          fillColor: "#F0FFFF",
          fillOpacity: 0.5,
          strokeWeight: 2,
          strokeOpacity: 0.4
        });
        this.map.addOverlay(ploygon);
      },
      hideAllComplex() {
        this.ComplexArr.forEach(item => {
          this.map.removeOverlay(item);
        });
        this.show = true;
      },
      showAllComplex() {
        this.ComplexArr = [
          new ComplexCustomOverlay(
            new BMap.Point(119.263687, 31.786298),
            "后河村",
            2
          ),
          new ComplexCustomOverlay(
            new BMap.Point(119.303357, 31.709041),
            "李塔村",
            10
          ),
          new ComplexCustomOverlay(
            new BMap.Point(119.272455, 31.676965),
            "马梗村",
            7
          ),
          new ComplexCustomOverlay(
            new BMap.Point(119.297895, 31.808088),
            "茅山村",
            4
          ),
          new ComplexCustomOverlay(
            new BMap.Point(119.333755, 31.874837),
            "墓东村",
            5
          ),
          new ComplexCustomOverlay(
            new BMap.Point(119.290134, 31.749459),
            "潘冲村",
            8
          ),
          new ComplexCustomOverlay(
            new BMap.Point(119.262538, 31.655943),
            "上杆村",
            9
          ),
          new ComplexCustomOverlay(
            new BMap.Point(119.268215, 31.832358),
            "天乐村",
            3
          ),
          new ComplexCustomOverlay(
            new BMap.Point(119.296889, 31.780896),
            "夏林村",
            6
          ),
          new ComplexCustomOverlay(
            new BMap.Point(119.309393, 31.840211),
            "玉晨村",
            1
          )
        ];
        this.ComplexArr.forEach(item => {
          this.map.addOverlay(item);
        });
        this.show = false;
      },
      addPolygon() {
        var houhe = [
          new BMap.Point(119.264709, 31.807432),
          new BMap.Point(119.263416, 31.805959),
          new BMap.Point(119.261691, 31.805877),
          new BMap.Point(119.259727, 31.806327),
          new BMap.Point(119.25805, 31.806777),
          new BMap.Point(119.256086, 31.806327),
          new BMap.Point(119.253786, 31.80555),
          new BMap.Point(119.254361, 31.804896),
          new BMap.Point(119.255822, 31.803218),
          new BMap.Point(119.25678, 31.801928),
          new BMap.Point(119.257547, 31.801314),
          new BMap.Point(119.257668, 31.799922),
          new BMap.Point(119.258243, 31.797427),
          new BMap.Point(119.257333, 31.79804),
          new BMap.Point(119.255848, 31.799186),
          new BMap.Point(119.254554, 31.800127),
          new BMap.Point(119.253931, 31.800209),
          new BMap.Point(119.253021, 31.799677),
          new BMap.Point(119.252159, 31.799022),
          new BMap.Point(119.251297, 31.798326),
          new BMap.Point(119.250058, 31.797215),
          new BMap.Point(119.250106, 31.796233),
          new BMap.Point(119.249915, 31.794924),
          new BMap.Point(119.249987, 31.793573),
          new BMap.Point(119.251429, 31.79071),
          new BMap.Point(119.251381, 31.789769),
          new BMap.Point(119.25095, 31.788541),
          new BMap.Point(119.250567, 31.787476),
          new BMap.Point(119.250375, 31.786372),
          new BMap.Point(119.250375, 31.785062),
          new BMap.Point(119.250375, 31.78367),
          new BMap.Point(119.250423, 31.782255),
          new BMap.Point(119.249896, 31.781192),
          new BMap.Point(119.248938, 31.779595),
          new BMap.Point(119.24865, 31.77849),
          new BMap.Point(119.248507, 31.777672),
          new BMap.Point(119.249752, 31.777181),
          new BMap.Point(119.251046, 31.777304),
          new BMap.Point(119.251764, 31.776731),
          new BMap.Point(119.255258, 31.772211),
          new BMap.Point(119.258517, 31.76779),
          new BMap.Point(119.261007, 31.768937),
          new BMap.Point(119.262924, 31.768773),
          new BMap.Point(119.264074, 31.770246),
          new BMap.Point(119.265031, 31.771066),
          new BMap.Point(119.268288, 31.769593),
          new BMap.Point(119.267521, 31.767712),
          new BMap.Point(119.269823, 31.76853),
          new BMap.Point(119.27174, 31.76935),
          new BMap.Point(119.274805, 31.771315),
          new BMap.Point(119.27634, 31.772788),
          new BMap.Point(119.277777, 31.774181),
          new BMap.Point(119.279789, 31.774998),
          new BMap.Point(119.280363, 31.776063),
          new BMap.Point(119.281178, 31.776431),
          new BMap.Point(119.282663, 31.776308),
          new BMap.Point(119.282543, 31.777353),
          new BMap.Point(119.283597, 31.777946),
          new BMap.Point(119.284603, 31.778438),
          new BMap.Point(119.284747, 31.779072),
          new BMap.Point(119.285226, 31.780054),
          new BMap.Point(119.285992, 31.779727),
          new BMap.Point(119.28683, 31.779808),
          new BMap.Point(119.287117, 31.780586),
          new BMap.Point(119.285728, 31.781958),
          new BMap.Point(119.285153, 31.78253),
          new BMap.Point(119.284051, 31.783021),
          new BMap.Point(119.282566, 31.783963),
          new BMap.Point(119.281446, 31.784131),
          new BMap.Point(119.280631, 31.784827),
          new BMap.Point(119.280965, 31.785768),
          new BMap.Point(119.281061, 31.786833),
          new BMap.Point(119.27948, 31.787263),
          new BMap.Point(119.277947, 31.78755),
          new BMap.Point(119.276893, 31.787713),
          new BMap.Point(119.275216, 31.788345),
          new BMap.Point(119.273827, 31.789777),
          new BMap.Point(119.273756, 31.790963),
          new BMap.Point(119.273828, 31.792231),
          new BMap.Point(119.273421, 31.793479),
          new BMap.Point(119.272415, 31.794256),
          new BMap.Point(119.271552, 31.795607),
          new BMap.Point(119.271648, 31.796548),
          new BMap.Point(119.271121, 31.797325),
          new BMap.Point(119.270019, 31.797899),
          new BMap.Point(119.269109, 31.799372),
          new BMap.Point(119.269451, 31.801012),
          new BMap.Point(119.27017, 31.801586),
          new BMap.Point(119.271367, 31.80179),
          new BMap.Point(119.270744, 31.803017),
          new BMap.Point(119.271511, 31.803059),
          new BMap.Point(119.272253, 31.803038),
          new BMap.Point(119.273426, 31.803202),
          new BMap.Point(119.27405, 31.803816),
          new BMap.Point(119.273451, 31.804307),
          new BMap.Point(119.272612, 31.804348),
          new BMap.Point(119.271534, 31.804634),
          new BMap.Point(119.270816, 31.80443),
          new BMap.Point(119.27048, 31.80533),
          new BMap.Point(119.269618, 31.805985),
          new BMap.Point(119.268995, 31.805678),
          new BMap.Point(119.268314, 31.80705),
          new BMap.Point(119.267668, 31.808053),
          new BMap.Point(119.267069, 31.808728),
          new BMap.Point(119.266709, 31.808441),
          new BMap.Point(119.266326, 31.808891),
          new BMap.Point(119.265823, 31.808646),
          new BMap.Point(119.265704, 31.807848),
          new BMap.Point(119.265584, 31.806948),
          new BMap.Point(119.265608, 31.80662),
          new BMap.Point(119.264841, 31.807009),
          new BMap.Point(119.264745, 31.80748),
          new BMap.Point(119.264709, 31.807432)
        ];
        this.drawPloygon(houhe, "后河", "#c48402");

        var lita = [
          new BMap.Point(119.256232, 31.688996),
          new BMap.Point(119.261118, 31.688975),
          new BMap.Point(119.262412, 31.68918),
          new BMap.Point(119.264029, 31.689221),
          new BMap.Point(119.266161, 31.689057),
          new BMap.Point(119.267862, 31.688955),
          new BMap.Point(119.269898, 31.688689),
          new BMap.Point(119.271718, 31.688504),
          new BMap.Point(119.272844, 31.688443),
          new BMap.Point(119.274234, 31.688156),
          new BMap.Point(119.275911, 31.687767),
          new BMap.Point(119.278378, 31.688238),
          new BMap.Point(119.279612, 31.688627),
          new BMap.Point(119.280115, 31.688986),
          new BMap.Point(119.280905, 31.690102),
          new BMap.Point(119.2816, 31.691085),
          new BMap.Point(119.282271, 31.69172),
          new BMap.Point(119.282366, 31.693195),
          new BMap.Point(119.28251, 31.694424),
          new BMap.Point(119.283301, 31.694711),
          new BMap.Point(119.284127, 31.695161),
          new BMap.Point(119.28554, 31.695325),
          new BMap.Point(119.288318, 31.695336),
          new BMap.Point(119.289804, 31.695398),
          new BMap.Point(119.291133, 31.695173),
          new BMap.Point(119.291564, 31.694743),
          new BMap.Point(119.292438, 31.693933),
          new BMap.Point(119.29263, 31.69337),
          new BMap.Point(119.292248, 31.692234),
          new BMap.Point(119.292032, 31.691353),
          new BMap.Point(119.291889, 31.690841),
          new BMap.Point(119.291817, 31.690124),
          new BMap.Point(119.291721, 31.6891),
          new BMap.Point(119.292008, 31.688752),
          new BMap.Point(119.293302, 31.688035),
          new BMap.Point(119.294045, 31.687461),
          new BMap.Point(119.294859, 31.687113),
          new BMap.Point(119.297732, 31.68704),
          new BMap.Point(119.298738, 31.686958),
          new BMap.Point(119.299816, 31.686282),
          new BMap.Point(119.300858, 31.685739),
          new BMap.Point(119.302091, 31.683374),
          new BMap.Point(119.30178, 31.682656),
          new BMap.Point(119.301564, 31.68152),
          new BMap.Point(119.301109, 31.680834),
          new BMap.Point(119.300415, 31.680147),
          new BMap.Point(119.299409, 31.679164),
          new BMap.Point(119.298773, 31.67858),
          new BMap.Point(119.298366, 31.678201),
          new BMap.Point(119.298354, 31.677648),
          new BMap.Point(119.29875, 31.677146),
          new BMap.Point(119.299576, 31.676982),
          new BMap.Point(119.30051, 31.677166),
          new BMap.Point(119.30172, 31.677382),
          new BMap.Point(119.303685, 31.677535),
          new BMap.Point(119.305266, 31.677371),
          new BMap.Point(119.30711, 31.677125),
          new BMap.Point(119.30826, 31.677084),
          new BMap.Point(119.30941, 31.677125),
          new BMap.Point(119.310703, 31.67731),
          new BMap.Point(119.312164, 31.677269),
          new BMap.Point(119.313003, 31.677248),
          new BMap.Point(119.313171, 31.676367),
          new BMap.Point(119.314177, 31.676265),
          new BMap.Point(119.315422, 31.67647),
          new BMap.Point(119.316284, 31.676613),
          new BMap.Point(119.316524, 31.678744),
          new BMap.Point(119.316644, 31.679748),
          new BMap.Point(119.317494, 31.681459),
          new BMap.Point(119.318428, 31.682627),
          new BMap.Point(119.319446, 31.684624),
          new BMap.Point(119.320477, 31.685813),
          new BMap.Point(119.321123, 31.686919),
          new BMap.Point(119.322105, 31.688045),
          new BMap.Point(119.322992, 31.689008),
          new BMap.Point(119.323782, 31.690155),
          new BMap.Point(119.324764, 31.691425),
          new BMap.Point(119.325542, 31.692408),
          new BMap.Point(119.32559, 31.694292),
          new BMap.Point(119.325757, 31.695705),
          new BMap.Point(119.325997, 31.697426),
          new BMap.Point(119.326117, 31.699669),
          new BMap.Point(119.326453, 31.701328),
          new BMap.Point(119.326979, 31.702577),
          new BMap.Point(119.327578, 31.703888),
          new BMap.Point(119.327878, 31.704953),
          new BMap.Point(119.328692, 31.705793),
          new BMap.Point(119.329555, 31.706878),
          new BMap.Point(119.329626, 31.707534),
          new BMap.Point(119.329578, 31.70868),
          new BMap.Point(119.328165, 31.708864),
          new BMap.Point(119.327327, 31.709007),
          new BMap.Point(119.326201, 31.70911),
          new BMap.Point(119.324883, 31.709437),
          new BMap.Point(119.324165, 31.709867),
          new BMap.Point(119.323111, 31.710686),
          new BMap.Point(119.322249, 31.711547),
          new BMap.Point(119.322729, 31.713839),
          new BMap.Point(119.322872, 31.715252),
          new BMap.Point(119.322968, 31.716358),
          new BMap.Point(119.322968, 31.717218),
          new BMap.Point(119.322802, 31.71899),
          new BMap.Point(119.322742, 31.720659),
          new BMap.Point(119.323868, 31.721764),
          new BMap.Point(119.324706, 31.722358),
          new BMap.Point(119.325329, 31.723034),
          new BMap.Point(119.326263, 31.723792),
          new BMap.Point(119.327089, 31.724385),
          new BMap.Point(119.328646, 31.724856),
          new BMap.Point(119.329783, 31.724845),
          new BMap.Point(119.331173, 31.724436),
          new BMap.Point(119.332406, 31.724302),
          new BMap.Point(119.332872, 31.725581),
          new BMap.Point(119.333196, 31.726626),
          new BMap.Point(119.333423, 31.72768),
          new BMap.Point(119.333326, 31.728561),
          new BMap.Point(119.33347, 31.729933),
          new BMap.Point(119.333518, 31.730998),
          new BMap.Point(119.333518, 31.732636),
          new BMap.Point(119.333038, 31.733496),
          new BMap.Point(119.332739, 31.734868),
          new BMap.Point(119.332307, 31.735462),
          new BMap.Point(119.331804, 31.735892),
          new BMap.Point(119.330583, 31.736158),
          new BMap.Point(119.329026, 31.736588),
          new BMap.Point(119.327924, 31.736793),
          new BMap.Point(119.32663, 31.736834),
          new BMap.Point(119.325504, 31.736506),
          new BMap.Point(119.32445, 31.736056),
          new BMap.Point(119.323109, 31.735687),
          new BMap.Point(119.321959, 31.735216),
          new BMap.Point(119.320666, 31.734582),
          new BMap.Point(119.319085, 31.734029),
          new BMap.Point(119.318749, 31.733845),
          new BMap.Point(119.317456, 31.735155),
          new BMap.Point(119.316954, 31.7363),
          new BMap.Point(119.316451, 31.736791),
          new BMap.Point(119.315828, 31.737733),
          new BMap.Point(119.31499, 31.737856),
          new BMap.Point(119.313481, 31.737896),
          new BMap.Point(119.312738, 31.737835),
          new BMap.Point(119.312331, 31.737917),
          new BMap.Point(119.311876, 31.738347),
          new BMap.Point(119.311828, 31.73825),
          new BMap.Point(119.311145, 31.738239),
          new BMap.Point(119.310181, 31.738434),
          new BMap.Point(119.309411, 31.738575),
          new BMap.Point(119.308432, 31.738477),
          new BMap.Point(119.307726, 31.73773),
          new BMap.Point(119.30819, 31.736822),
          new BMap.Point(119.307582, 31.735534),
          new BMap.Point(119.306839, 31.734204),
          new BMap.Point(119.305118, 31.733715),
          new BMap.Point(119.303273, 31.73371),
          new BMap.Point(119.301752, 31.73458),
          new BMap.Point(119.30145, 31.735729),
          new BMap.Point(119.30018, 31.736661),
          new BMap.Point(119.298923, 31.736216),
          new BMap.Point(119.297995, 31.735566),
          new BMap.Point(119.297485, 31.735489),
          new BMap.Point(119.296719, 31.735304),
          new BMap.Point(119.295905, 31.735069),
          new BMap.Point(119.296497, 31.735054),
          new BMap.Point(119.297126, 31.735049),
          new BMap.Point(119.297132, 31.734954),
          new BMap.Point(119.296797, 31.73458),
          new BMap.Point(119.296228, 31.733928),
          new BMap.Point(119.295923, 31.733641),
          new BMap.Point(119.295821, 31.733518),
          new BMap.Point(119.295797, 31.733308),
          new BMap.Point(119.295755, 31.733001),
          new BMap.Point(119.295722, 31.7326),
          new BMap.Point(119.295614, 31.732293),
          new BMap.Point(119.295557, 31.731973),
          new BMap.Point(119.295491, 31.731727),
          new BMap.Point(119.295563, 31.731573),
          new BMap.Point(119.296485, 31.731561),
          new BMap.Point(119.297144, 31.73152),
          new BMap.Point(119.297899, 31.731458),
          new BMap.Point(119.298467, 31.731456),
          new BMap.Point(119.298396, 31.7313),
          new BMap.Point(119.298186, 31.731085),
          new BMap.Point(119.297868, 31.730755),
          new BMap.Point(119.297545, 31.730368),
          new BMap.Point(119.297273, 31.730156),
          new BMap.Point(119.297021, 31.729956),
          new BMap.Point(119.29517, 31.729951),
          new BMap.Point(119.293631, 31.729987),
          new BMap.Point(119.291787, 31.730028),
          new BMap.Point(119.289529, 31.73014),
          new BMap.Point(119.289319, 31.73011),
          new BMap.Point(119.289098, 31.729863),
          new BMap.Point(119.288769, 31.729567),
          new BMap.Point(119.288338, 31.729147),
          new BMap.Point(119.28758, 31.72835),
          new BMap.Point(119.286879, 31.727723),
          new BMap.Point(119.2867, 31.727503),
          new BMap.Point(119.28684, 31.727273),
          new BMap.Point(119.287212, 31.726848),
          new BMap.Point(119.287122, 31.726546),
          new BMap.Point(119.286987, 31.72619),
          new BMap.Point(119.28681, 31.725796),
          new BMap.Point(119.286679, 31.725392),
          new BMap.Point(119.286954, 31.724752),
          new BMap.Point(119.287254, 31.724046),
          new BMap.Point(119.287553, 31.723406),
          new BMap.Point(119.28784, 31.722751),
          new BMap.Point(119.289933, 31.723101),
          new BMap.Point(119.291461, 31.723362),
          new BMap.Point(119.293443, 31.723741),
          new BMap.Point(119.295853, 31.724376),
          new BMap.Point(119.29665, 31.724571),
          new BMap.Point(119.297033, 31.723941),
          new BMap.Point(119.297554, 31.72304),
          new BMap.Point(119.298081, 31.722206),
          new BMap.Point(119.298419, 31.721128),
          new BMap.Point(119.298156, 31.720718),
          new BMap.Point(119.297293, 31.719961),
          new BMap.Point(119.296311, 31.719213),
          new BMap.Point(119.296192, 31.718993),
          new BMap.Point(119.29485, 31.719341),
          new BMap.Point(119.293149, 31.719771),
          new BMap.Point(119.292209, 31.719925),
          new BMap.Point(119.290676, 31.7193),
          new BMap.Point(119.28852, 31.716341),
          new BMap.Point(119.287491, 31.71501),
          new BMap.Point(119.286868, 31.71413),
          new BMap.Point(119.284903, 31.712696),
          new BMap.Point(119.282123, 31.711928),
          new BMap.Point(119.280734, 31.711703),
          new BMap.Point(119.279776, 31.711601),
          new BMap.Point(119.278171, 31.711457),
          new BMap.Point(119.276602, 31.711426),
          new BMap.Point(119.275164, 31.712236),
          new BMap.Point(119.274086, 31.712911),
          new BMap.Point(119.274254, 31.713935),
          new BMap.Point(119.274638, 31.715041),
          new BMap.Point(119.274901, 31.715737),
          new BMap.Point(119.27447, 31.715922),
          new BMap.Point(119.272601, 31.71586),
          new BMap.Point(119.271547, 31.715471),
          new BMap.Point(119.270996, 31.714386),
          new BMap.Point(119.26999, 31.712256),
          new BMap.Point(119.268097, 31.710865),
          new BMap.Point(119.266996, 31.710046),
          new BMap.Point(119.266277, 31.709595),
          new BMap.Point(119.265774, 31.709575),
          new BMap.Point(119.26478, 31.71021),
          new BMap.Point(119.263702, 31.710599),
          new BMap.Point(119.262359, 31.710659),
          new BMap.Point(119.26109, 31.710598),
          new BMap.Point(119.259485, 31.7107),
          new BMap.Point(119.258383, 31.71068),
          new BMap.Point(119.257113, 31.709328),
          new BMap.Point(119.255736, 31.707177),
          new BMap.Point(119.255592, 31.706091),
          new BMap.Point(119.255592, 31.703694),
          new BMap.Point(119.255712, 31.702444),
          new BMap.Point(119.256394, 31.700632),
          new BMap.Point(119.257328, 31.698799),
          new BMap.Point(119.258071, 31.697027),
          new BMap.Point(119.258167, 31.696187),
          new BMap.Point(119.257881, 31.694292),
          new BMap.Point(119.257401, 31.692161),
          new BMap.Point(119.256467, 31.689867),
          new BMap.Point(119.256232, 31.688996)
        ];
        this.drawPloygon(lita, "李塔", "#c40263");

        var mageng = [
          new BMap.Point(119.255853, 31.688876),
          new BMap.Point(119.253099, 31.68863),
          new BMap.Point(119.251901, 31.688876),
          new BMap.Point(119.250607, 31.689245),
          new BMap.Point(119.249386, 31.689613),
          new BMap.Point(119.247757, 31.690105),
          new BMap.Point(119.246128, 31.690842),
          new BMap.Point(119.245409, 31.690269),
          new BMap.Point(119.243828, 31.68949),
          new BMap.Point(119.242439, 31.689286),
          new BMap.Point(119.240379, 31.689327),
          new BMap.Point(119.239468, 31.689368),
          new BMap.Point(119.238629, 31.687974),
          new BMap.Point(119.238677, 31.687196),
          new BMap.Point(119.239371, 31.685025),
          new BMap.Point(119.239324, 31.684083),
          new BMap.Point(119.239228, 31.682977),
          new BMap.Point(119.238844, 31.682219),
          new BMap.Point(119.238556, 31.681071),
          new BMap.Point(119.237067, 31.679265),
          new BMap.Point(119.235917, 31.678282),
          new BMap.Point(119.235269, 31.677073),
          new BMap.Point(119.234455, 31.675085),
          new BMap.Point(119.233856, 31.673426),
          new BMap.Point(119.235054, 31.673179),
          new BMap.Point(119.236396, 31.672933),
          new BMap.Point(119.237737, 31.67359),
          new BMap.Point(119.240324, 31.673344),
          new BMap.Point(119.240084, 31.672156),
          new BMap.Point(119.240947, 31.671788),
          new BMap.Point(119.24248, 31.671215),
          new BMap.Point(119.243318, 31.670518),
          new BMap.Point(119.243594, 31.67018),
          new BMap.Point(119.244169, 31.669934),
          new BMap.Point(119.244331, 31.669822),
          new BMap.Point(119.244601, 31.669786),
          new BMap.Point(119.244954, 31.669734),
          new BMap.Point(119.245469, 31.669586),
          new BMap.Point(119.245649, 31.669596),
          new BMap.Point(119.246086, 31.669801),
          new BMap.Point(119.2465, 31.670114),
          new BMap.Point(119.2468, 31.670252),
          new BMap.Point(119.247255, 31.670237),
          new BMap.Point(119.247418, 31.670324),
          new BMap.Point(119.247777, 31.670231),
          new BMap.Point(119.248262, 31.66995),
          new BMap.Point(119.24852, 31.669673),
          new BMap.Point(119.248891, 31.66954),
          new BMap.Point(119.249394, 31.669448),
          new BMap.Point(119.249735, 31.669325),
          new BMap.Point(119.249897, 31.669278),
          new BMap.Point(119.250173, 31.669217),
          new BMap.Point(119.250424, 31.669196),
          new BMap.Point(119.250658, 31.669104),
          new BMap.Point(119.250868, 31.669063),
          new BMap.Point(119.251005, 31.669156),
          new BMap.Point(119.252078, 31.669021),
          new BMap.Point(119.252335, 31.66917),
          new BMap.Point(119.252706, 31.669272),
          new BMap.Point(119.253437, 31.669026),
          new BMap.Point(119.253676, 31.668964),
          new BMap.Point(119.255174, 31.668063),
          new BMap.Point(119.256802, 31.666834),
          new BMap.Point(119.256708, 31.665932),
          new BMap.Point(119.257952, 31.665276),
          new BMap.Point(119.259295, 31.665112),
          new BMap.Point(119.260061, 31.665194),
          new BMap.Point(119.261114, 31.665276),
          new BMap.Point(119.262169, 31.66544),
          new BMap.Point(119.263414, 31.665932),
          new BMap.Point(119.264851, 31.666341),
          new BMap.Point(119.265619, 31.666669),
          new BMap.Point(119.266576, 31.666833),
          new BMap.Point(119.267629, 31.666506),
          new BMap.Point(119.268396, 31.665932),
          new BMap.Point(119.267917, 31.664908),
          new BMap.Point(119.268396, 31.664251),
          new BMap.Point(119.269833, 31.663513),
          new BMap.Point(119.271558, 31.663595),
          new BMap.Point(119.272899, 31.664332),
          new BMap.Point(119.274718, 31.664701),
          new BMap.Point(119.275677, 31.664045),
          new BMap.Point(119.275486, 31.663061),
          new BMap.Point(119.274718, 31.662078),
          new BMap.Point(119.273952, 31.661422),
          new BMap.Point(119.273952, 31.660151),
          new BMap.Point(119.274192, 31.659372),
          new BMap.Point(119.274863, 31.658592),
          new BMap.Point(119.277642, 31.65851),
          new BMap.Point(119.27812, 31.659904),
          new BMap.Point(119.278791, 31.660723),
          new BMap.Point(119.280324, 31.660396),
          new BMap.Point(119.28109, 31.661379),
          new BMap.Point(119.281856, 31.662199),
          new BMap.Point(119.283772, 31.661871),
          new BMap.Point(119.285209, 31.661708),
          new BMap.Point(119.28497, 31.660274),
          new BMap.Point(119.286311, 31.659209),
          new BMap.Point(119.287269, 31.659209),
          new BMap.Point(119.288657, 31.659373),
          new BMap.Point(119.289903, 31.659085),
          new BMap.Point(119.290766, 31.658061),
          new BMap.Point(119.292299, 31.658142),
          new BMap.Point(119.293065, 31.65847),
          new BMap.Point(119.29388, 31.659374),
          new BMap.Point(119.295701, 31.659415),
          new BMap.Point(119.297042, 31.659661),
          new BMap.Point(119.297442, 31.659854),
          new BMap.Point(119.297466, 31.661248),
          new BMap.Point(119.297514, 31.662528),
          new BMap.Point(119.297322, 31.663163),
          new BMap.Point(119.297873, 31.66427),
          new BMap.Point(119.2984, 31.664977),
          new BMap.Point(119.298855, 31.665571),
          new BMap.Point(119.29967, 31.666022),
          new BMap.Point(119.300724, 31.66637),
          new BMap.Point(119.301731, 31.666893),
          new BMap.Point(119.302521, 31.667241),
          new BMap.Point(119.303323, 31.667179),
          new BMap.Point(119.304317, 31.667097),
          new BMap.Point(119.305156, 31.667097),
          new BMap.Point(119.305359, 31.668265),
          new BMap.Point(119.305323, 31.669423),
          new BMap.Point(119.305562, 31.67014),
          new BMap.Point(119.306353, 31.670611),
          new BMap.Point(119.307874, 31.671778),
          new BMap.Point(119.308377, 31.672075),
          new BMap.Point(119.309646, 31.672464),
          new BMap.Point(119.310533, 31.672792),
          new BMap.Point(119.311312, 31.673396),
          new BMap.Point(119.312438, 31.673969),
          new BMap.Point(119.313492, 31.674563),
          new BMap.Point(119.314235, 31.675096),
          new BMap.Point(119.315241, 31.675424),
          new BMap.Point(119.315816, 31.675854),
          new BMap.Point(119.316391, 31.676203),
          new BMap.Point(119.31627, 31.676674),
          new BMap.Point(119.314187, 31.676295),
          new BMap.Point(119.313223, 31.676377),
          new BMap.Point(119.312911, 31.677207),
          new BMap.Point(119.310635, 31.67733),
          new BMap.Point(119.310216, 31.677381),
          new BMap.Point(119.309689, 31.677258),
          new BMap.Point(119.309234, 31.677156),
          new BMap.Point(119.308587, 31.676987),
          new BMap.Point(119.308096, 31.677079),
          new BMap.Point(119.307521, 31.67713),
          new BMap.Point(119.30715, 31.677171),
          new BMap.Point(119.305617, 31.677346),
          new BMap.Point(119.303904, 31.67754),
          new BMap.Point(119.301688, 31.677459),
          new BMap.Point(119.301137, 31.677448),
          new BMap.Point(119.299832, 31.677182),
          new BMap.Point(119.298886, 31.676957),
          new BMap.Point(119.298646, 31.677223),
          new BMap.Point(119.298407, 31.677622),
          new BMap.Point(119.298359, 31.678206),
          new BMap.Point(119.299377, 31.67921),
          new BMap.Point(119.300575, 31.680419),
          new BMap.Point(119.301065, 31.680926),
          new BMap.Point(119.30152, 31.681316),
          new BMap.Point(119.301616, 31.681746),
          new BMap.Point(119.30203, 31.683436),
          new BMap.Point(119.300743, 31.685807),
          new BMap.Point(119.298617, 31.686965),
          new BMap.Point(119.29473, 31.687138),
          new BMap.Point(119.291724, 31.688956),
          new BMap.Point(119.291904, 31.691031),
          new BMap.Point(119.292694, 31.693586),
          new BMap.Point(119.290982, 31.695337),
          new BMap.Point(119.287077, 31.695353),
          new BMap.Point(119.285005, 31.695291),
          new BMap.Point(119.284119, 31.695127),
          new BMap.Point(119.282981, 31.694615),
          new BMap.Point(119.282406, 31.694431),
          new BMap.Point(119.282293, 31.69162),
          new BMap.Point(119.280921, 31.690022),
          new BMap.Point(119.279891, 31.688772),
          new BMap.Point(119.275968, 31.687789),
          new BMap.Point(119.272806, 31.688465),
          new BMap.Point(119.268854, 31.688854),
          new BMap.Point(119.266279, 31.689069),
          new BMap.Point(119.264315, 31.689182),
          new BMap.Point(119.262363, 31.689203),
          new BMap.Point(119.260823, 31.688936),
          new BMap.Point(119.258907, 31.688998),
          new BMap.Point(119.256787, 31.689059),
          new BMap.Point(119.256128, 31.689069),
          new BMap.Point(119.256104, 31.688844),
          new BMap.Point(119.255853, 31.688876)
        ];
        this.drawPloygon(mageng, "马梗", "#c40284");

        var maoshan = [
          new BMap.Point(119.265858, 31.822969),
          new BMap.Point(119.267439, 31.820248),
          new BMap.Point(119.266289, 31.820064),
          new BMap.Point(119.265643, 31.820596),
          new BMap.Point(119.264661, 31.820586),
          new BMap.Point(119.264038, 31.820484),
          new BMap.Point(119.263343, 31.819819),
          new BMap.Point(119.26308, 31.818765),
          new BMap.Point(119.263653, 31.817987),
          new BMap.Point(119.263988, 31.817189),
          new BMap.Point(119.263725, 31.816207),
          new BMap.Point(119.263772, 31.814775),
          new BMap.Point(119.263964, 31.813609),
          new BMap.Point(119.264121, 31.812115),
          new BMap.Point(119.264097, 31.810377),
          new BMap.Point(119.264481, 31.808986),
          new BMap.Point(119.264578, 31.80782),
          new BMap.Point(119.264961, 31.80696),
          new BMap.Point(119.265512, 31.806674),
          new BMap.Point(119.265656, 31.807748),
          new BMap.Point(119.2658, 31.808618),
          new BMap.Point(119.266363, 31.808884),
          new BMap.Point(119.266722, 31.808434),
          new BMap.Point(119.267045, 31.80869),
          new BMap.Point(119.267812, 31.807892),
          new BMap.Point(119.268303, 31.807094),
          new BMap.Point(119.268614, 31.806419),
          new BMap.Point(119.268974, 31.805642),
          new BMap.Point(119.269583, 31.806033),
          new BMap.Point(119.270158, 31.805624),
          new BMap.Point(119.270518, 31.805235),
          new BMap.Point(119.270757, 31.804488),
          new BMap.Point(119.271068, 31.804488),
          new BMap.Point(119.271547, 31.80457),
          new BMap.Point(119.272554, 31.804304),
          new BMap.Point(119.273512, 31.804284),
          new BMap.Point(119.27395, 31.803715),
          new BMap.Point(119.274836, 31.802917),
          new BMap.Point(119.275196, 31.802345),
          new BMap.Point(119.275471, 31.801578),
          new BMap.Point(119.279999, 31.7999),
          new BMap.Point(119.281509, 31.800473),
          new BMap.Point(119.28364, 31.800677),
          new BMap.Point(119.286396, 31.800349),
          new BMap.Point(119.290228, 31.799777),
          new BMap.Point(119.292141, 31.800658),
          new BMap.Point(119.294992, 31.800556),
          new BMap.Point(119.296764, 31.799574),
          new BMap.Point(119.297146, 31.797387),
          new BMap.Point(119.297673, 31.795219),
          new BMap.Point(119.299589, 31.792886),
          new BMap.Point(119.302105, 31.791761),
          new BMap.Point(119.305746, 31.790819),
          new BMap.Point(119.307877, 31.79108),
          new BMap.Point(119.310751, 31.791121),
          new BMap.Point(119.312572, 31.790507),
          new BMap.Point(119.314488, 31.789852),
          new BMap.Point(119.3165, 31.788502),
          new BMap.Point(119.318369, 31.78711),
          new BMap.Point(119.320278, 31.78622),
          new BMap.Point(119.321667, 31.785811),
          new BMap.Point(119.323627, 31.788774),
          new BMap.Point(119.325831, 31.79033),
          new BMap.Point(119.325735, 31.793358),
          new BMap.Point(119.325854, 31.798002),
          new BMap.Point(119.324848, 31.799843),
          new BMap.Point(119.325998, 31.802257),
          new BMap.Point(119.323602, 31.802339),
          new BMap.Point(119.322165, 31.802625),
          new BMap.Point(119.32099, 31.8042),
          new BMap.Point(119.320799, 31.806164),
          new BMap.Point(119.320416, 31.807841),
          new BMap.Point(119.321518, 31.809683),
          new BMap.Point(119.32262, 31.811974),
          new BMap.Point(119.320919, 31.812633),
          new BMap.Point(119.320823, 31.81429),
          new BMap.Point(119.320152, 31.815231),
          new BMap.Point(119.319002, 31.815947),
          new BMap.Point(119.317589, 31.816274),
          new BMap.Point(119.317014, 31.816929),
          new BMap.Point(119.313684, 31.819363),
          new BMap.Point(119.312822, 31.819015),
          new BMap.Point(119.311528, 31.81924),
          new BMap.Point(119.310355, 31.819976),
          new BMap.Point(119.308342, 31.819383),
          new BMap.Point(119.307408, 31.820202),
          new BMap.Point(119.308774, 31.820754),
          new BMap.Point(119.308606, 31.822186),
          new BMap.Point(119.305156, 31.821572),
          new BMap.Point(119.304412, 31.820343),
          new BMap.Point(119.304004, 31.819443),
          new BMap.Point(119.302375, 31.817847),
          new BMap.Point(119.299812, 31.818522),
          new BMap.Point(119.298207, 31.818645),
          new BMap.Point(119.29368, 31.819852),
          new BMap.Point(119.292123, 31.820588),
          new BMap.Point(119.290614, 31.82065),
          new BMap.Point(119.289033, 31.820179),
          new BMap.Point(119.288458, 31.82022),
          new BMap.Point(119.287116, 31.819934),
          new BMap.Point(119.286599, 31.819023),
          new BMap.Point(119.285808, 31.818471),
          new BMap.Point(119.285042, 31.81839),
          new BMap.Point(119.284491, 31.817755),
          new BMap.Point(119.28279, 31.817244),
          new BMap.Point(119.282622, 31.818001),
          new BMap.Point(119.280898, 31.817858),
          new BMap.Point(119.277185, 31.816896),
          new BMap.Point(119.276322, 31.817183),
          new BMap.Point(119.275412, 31.817673),
          new BMap.Point(119.276107, 31.819453),
          new BMap.Point(119.276514, 31.819924),
          new BMap.Point(119.277017, 31.82019),
          new BMap.Point(119.276538, 31.820619),
          new BMap.Point(119.27733, 31.822094),
          new BMap.Point(119.27824, 31.822319),
          new BMap.Point(119.278216, 31.82285),
          new BMap.Point(119.278073, 31.823178),
          new BMap.Point(119.278671, 31.824671),
          new BMap.Point(119.278504, 31.825305),
          new BMap.Point(119.278767, 31.825714),
          new BMap.Point(119.27963, 31.826369),
          new BMap.Point(119.280156, 31.827208),
          new BMap.Point(119.280444, 31.827617),
          new BMap.Point(119.28121, 31.827985),
          new BMap.Point(119.281809, 31.828313),
          new BMap.Point(119.280348, 31.829294),
          new BMap.Point(119.279677, 31.828395),
          new BMap.Point(119.277545, 31.827597),
          new BMap.Point(119.275844, 31.826042),
          new BMap.Point(119.274335, 31.824263),
          new BMap.Point(119.273484, 31.821921),
          new BMap.Point(119.272406, 31.821533),
          new BMap.Point(119.271927, 31.823763),
          new BMap.Point(119.270631, 31.825511),
          new BMap.Point(119.268595, 31.825532),
          new BMap.Point(119.269098, 31.823752),
          new BMap.Point(119.270056, 31.822852),
          new BMap.Point(119.269601, 31.822198),
          new BMap.Point(119.268163, 31.823036),
          new BMap.Point(119.266822, 31.822627),
          new BMap.Point(119.265858, 31.822969)
        ];
        this.drawPloygon(maoshan, "茅山", "#c4c402");

        var mudong = [
          new BMap.Point(119.315602, 31.856298),
          new BMap.Point(119.320584, 31.858752),
          new BMap.Point(119.321159, 31.86186),
          new BMap.Point(119.317709, 31.862022),
          new BMap.Point(119.315025, 31.863823),
          new BMap.Point(119.314642, 31.866929),
          new BMap.Point(119.315025, 31.871018),
          new BMap.Point(119.315792, 31.872817),
          new BMap.Point(119.316367, 31.87576),
          new BMap.Point(119.314642, 31.87707),
          new BMap.Point(119.3156, 31.880504),
          new BMap.Point(119.318284, 31.881486),
          new BMap.Point(119.320391, 31.882957),
          new BMap.Point(119.322309, 31.884591),
          new BMap.Point(119.321544, 31.888025),
          new BMap.Point(119.322119, 31.890642),
          new BMap.Point(119.324419, 31.896528),
          new BMap.Point(119.327483, 31.900778),
          new BMap.Point(119.33285, 31.906664),
          new BMap.Point(119.336682, 31.90928),
          new BMap.Point(119.338792, 31.90879),
          new BMap.Point(119.337067, 31.90699),
          new BMap.Point(119.338981, 31.905847),
          new BMap.Point(119.339367, 31.904047),
          new BMap.Point(119.341666, 31.903721),
          new BMap.Point(119.344923, 31.903066),
          new BMap.Point(119.349522, 31.903885),
          new BMap.Point(119.350672, 31.901433),
          new BMap.Point(119.349712, 31.899142),
          new BMap.Point(119.349522, 31.896199),
          new BMap.Point(119.34588, 31.892113),
          new BMap.Point(119.344923, 31.890478),
          new BMap.Point(119.345498, 31.889006),
          new BMap.Point(119.348373, 31.88786),
          new BMap.Point(119.350416, 31.886853),
          new BMap.Point(119.350034, 31.885217),
          new BMap.Point(119.349267, 31.881456),
          new BMap.Point(119.348692, 31.879165),
          new BMap.Point(119.346967, 31.877367),
          new BMap.Point(119.346199, 31.875569),
          new BMap.Point(119.346967, 31.873442),
          new BMap.Point(119.347542, 31.870172),
          new BMap.Point(119.349267, 31.86821),
          new BMap.Point(119.351279, 31.865592),
          new BMap.Point(119.350511, 31.864449),
          new BMap.Point(119.348883, 31.864449),
          new BMap.Point(119.347542, 31.863713),
          new BMap.Point(119.347446, 31.862404),
          new BMap.Point(119.347543, 31.860597),
          new BMap.Point(119.345913, 31.85937),
          new BMap.Point(119.345819, 31.85798),
          new BMap.Point(119.344094, 31.856671),
          new BMap.Point(119.342848, 31.855526),
          new BMap.Point(119.341314, 31.854627),
          new BMap.Point(119.340548, 31.8525),
          new BMap.Point(119.340739, 31.850864),
          new BMap.Point(119.340835, 31.848982),
          new BMap.Point(119.34141, 31.845875),
          new BMap.Point(119.340739, 31.844648),
          new BMap.Point(119.341313, 31.843093),
          new BMap.Point(119.341875, 31.840995),
          new BMap.Point(119.341395, 31.838869),
          new BMap.Point(119.339863, 31.837642),
          new BMap.Point(119.339096, 31.836988),
          new BMap.Point(119.336995, 31.835969),
          new BMap.Point(119.335174, 31.836788),
          new BMap.Point(119.334312, 31.839447),
          new BMap.Point(119.334887, 31.84141),
          new BMap.Point(119.336036, 31.845173),
          new BMap.Point(119.333928, 31.847217),
          new BMap.Point(119.331725, 31.846726),
          new BMap.Point(119.329809, 31.849099),
          new BMap.Point(119.3277, 31.849344),
          new BMap.Point(119.326454, 31.851553),
          new BMap.Point(119.323867, 31.851307),
          new BMap.Point(119.322238, 31.851388),
          new BMap.Point(119.320417, 31.850326),
          new BMap.Point(119.318885, 31.851225),
          new BMap.Point(119.318118, 31.852534),
          new BMap.Point(119.317161, 31.853924),
          new BMap.Point(119.315723, 31.854415),
          new BMap.Point(119.315602, 31.856298)
        ];
        this.drawPloygon(mudong, "墓东", "#02c4af");

        var panchong = [
          new BMap.Point(119.258518, 31.767803),
          new BMap.Point(119.258536, 31.767415),
          new BMap.Point(119.258595, 31.7669),
          new BMap.Point(119.258647, 31.766302),
          new BMap.Point(119.258695, 31.765734),
          new BMap.Point(119.258767, 31.765166),
          new BMap.Point(119.258796, 31.764674),
          new BMap.Point(119.25882, 31.764224),
          new BMap.Point(119.258844, 31.763728),
          new BMap.Point(119.258922, 31.763487),
          new BMap.Point(119.259114, 31.763293),
          new BMap.Point(119.259564, 31.762802),
          new BMap.Point(119.259863, 31.762513),
          new BMap.Point(119.260375, 31.76196),
          new BMap.Point(119.260674, 31.761694),
          new BMap.Point(119.260956, 31.761361),
          new BMap.Point(119.261714, 31.760555),
          new BMap.Point(119.262013, 31.760263),
          new BMap.Point(119.26245, 31.759721),
          new BMap.Point(119.263067, 31.759138),
          new BMap.Point(119.264124, 31.75847),
          new BMap.Point(119.264812, 31.758071),
          new BMap.Point(119.265507, 31.757605),
          new BMap.Point(119.266088, 31.757283),
          new BMap.Point(119.26707, 31.756694),
          new BMap.Point(119.267501, 31.756428),
          new BMap.Point(119.267951, 31.756137),
          new BMap.Point(119.268364, 31.75586),
          new BMap.Point(119.269131, 31.755379),
          new BMap.Point(119.269074, 31.755216),
          new BMap.Point(119.268804, 31.755016),
          new BMap.Point(119.268529, 31.754827),
          new BMap.Point(119.268005, 31.75433),
          new BMap.Point(119.267646, 31.754125),
          new BMap.Point(119.267418, 31.753903),
          new BMap.Point(119.266439, 31.753158),
          new BMap.Point(119.266067, 31.752861),
          new BMap.Point(119.265211, 31.752201),
          new BMap.Point(119.264588, 31.751728),
          new BMap.Point(119.263977, 31.751208),
          new BMap.Point(119.263762, 31.750968),
          new BMap.Point(119.263666, 31.750584),
          new BMap.Point(119.263858, 31.750359),
          new BMap.Point(119.264286, 31.750154),
          new BMap.Point(119.264792, 31.749435),
          new BMap.Point(119.265109, 31.749),
          new BMap.Point(119.265391, 31.74857),
          new BMap.Point(119.26584, 31.748025),
          new BMap.Point(119.266319, 31.747457),
          new BMap.Point(119.266691, 31.746915),
          new BMap.Point(119.26755, 31.745842),
          new BMap.Point(119.267664, 31.745505),
          new BMap.Point(119.267945, 31.744829),
          new BMap.Point(119.268424, 31.743734),
          new BMap.Point(119.268694, 31.743084),
          new BMap.Point(119.268957, 31.742413),
          new BMap.Point(119.269275, 31.74172),
          new BMap.Point(119.269445, 31.741275),
          new BMap.Point(119.269715, 31.740666),
          new BMap.Point(119.270026, 31.739944),
          new BMap.Point(119.270442, 31.739025),
          new BMap.Point(119.270568, 31.738636),
          new BMap.Point(119.271392, 31.73813),
          new BMap.Point(119.272284, 31.737515),
          new BMap.Point(119.2732, 31.736876),
          new BMap.Point(119.275668, 31.735253),
          new BMap.Point(119.276404, 31.734757),
          new BMap.Point(119.276746, 31.734542),
          new BMap.Point(119.277919, 31.73417),
          new BMap.Point(119.279009, 31.733771),
          new BMap.Point(119.279884, 31.733495),
          new BMap.Point(119.28065, 31.733265),
          new BMap.Point(119.281878, 31.732824),
          new BMap.Point(119.282621, 31.732599),
          new BMap.Point(119.284219, 31.73306),
          new BMap.Point(119.285489, 31.733449),
          new BMap.Point(119.286519, 31.733838),
          new BMap.Point(119.287621, 31.733879),
          new BMap.Point(119.288686, 31.734196),
          new BMap.Point(119.289573, 31.734544),
          new BMap.Point(119.290675, 31.734667),
          new BMap.Point(119.291753, 31.734995),
          new BMap.Point(119.292711, 31.735138),
          new BMap.Point(119.294388, 31.734994),
          new BMap.Point(119.295897, 31.735076),
          new BMap.Point(119.296616, 31.735301),
          new BMap.Point(119.297957, 31.735547),
          new BMap.Point(119.298858, 31.736161),
          new BMap.Point(119.300151, 31.736653),
          new BMap.Point(119.301444, 31.735711),
          new BMap.Point(119.301731, 31.734605),
          new BMap.Point(119.303289, 31.733684),
          new BMap.Point(119.305157, 31.733703),
          new BMap.Point(119.306858, 31.734195),
          new BMap.Point(119.307481, 31.7353),
          new BMap.Point(119.3082, 31.736836),
          new BMap.Point(119.307721, 31.737737),
          new BMap.Point(119.308391, 31.738433),
          new BMap.Point(119.309445, 31.738555),
          new BMap.Point(119.311122, 31.738228),
          new BMap.Point(119.311841, 31.738228),
          new BMap.Point(119.311649, 31.73919),
          new BMap.Point(119.311002, 31.740131),
          new BMap.Point(119.310571, 31.741562),
          new BMap.Point(119.310595, 31.742135),
          new BMap.Point(119.310188, 31.742892),
          new BMap.Point(119.310331, 31.743363),
          new BMap.Point(119.311098, 31.743629),
          new BMap.Point(119.312164, 31.743957),
          new BMap.Point(119.312931, 31.744059),
          new BMap.Point(119.313997, 31.744346),
          new BMap.Point(119.31541, 31.744499),
          new BMap.Point(119.315338, 31.744683),
          new BMap.Point(119.314931, 31.74497),
          new BMap.Point(119.314524, 31.745328),
          new BMap.Point(119.314188, 31.745533),
          new BMap.Point(119.314811, 31.74629),
          new BMap.Point(119.315099, 31.746945),
          new BMap.Point(119.314452, 31.746986),
          new BMap.Point(119.313278, 31.747272),
          new BMap.Point(119.312392, 31.747457),
          new BMap.Point(119.311865, 31.74758),
          new BMap.Point(119.312474, 31.748541),
          new BMap.Point(119.313073, 31.749278),
          new BMap.Point(119.313385, 31.75026),
          new BMap.Point(119.313912, 31.75112),
          new BMap.Point(119.314223, 31.751775),
          new BMap.Point(119.313684, 31.753054),
          new BMap.Point(119.313348, 31.754098),
          new BMap.Point(119.313013, 31.754814),
          new BMap.Point(119.312928, 31.756063),
          new BMap.Point(119.312928, 31.756841),
          new BMap.Point(119.312736, 31.757721),
          new BMap.Point(119.312569, 31.758622),
          new BMap.Point(119.312545, 31.759502),
          new BMap.Point(119.312449, 31.7603),
          new BMap.Point(119.312066, 31.761232),
          new BMap.Point(119.311611, 31.761928),
          new BMap.Point(119.311228, 31.762583),
          new BMap.Point(119.311108, 31.762972),
          new BMap.Point(119.310437, 31.763361),
          new BMap.Point(119.309383, 31.764056),
          new BMap.Point(119.308461, 31.764455),
          new BMap.Point(119.305826, 31.764609),
          new BMap.Point(119.304412, 31.764138),
          new BMap.Point(119.302628, 31.764036),
          new BMap.Point(119.300735, 31.764906),
          new BMap.Point(119.298419, 31.763407),
          new BMap.Point(119.297029, 31.763285),
          new BMap.Point(119.2957, 31.76221),
          new BMap.Point(119.293795, 31.76089),
          new BMap.Point(119.292502, 31.760511),
          new BMap.Point(119.291256, 31.761412),
          new BMap.Point(119.288987, 31.760916),
          new BMap.Point(119.287585, 31.760209),
          new BMap.Point(119.287047, 31.759258),
          new BMap.Point(119.28543, 31.759729),
          new BMap.Point(119.284064, 31.759831),
          new BMap.Point(119.282806, 31.760409),
          new BMap.Point(119.279824, 31.760501),
          new BMap.Point(119.278333, 31.761991),
          new BMap.Point(119.278441, 31.76351),
          new BMap.Point(119.277309, 31.764615),
          new BMap.Point(119.275434, 31.764452),
          new BMap.Point(119.275087, 31.764472),
          new BMap.Point(119.274584, 31.764339),
          new BMap.Point(119.27438, 31.764267),
          new BMap.Point(119.273505, 31.763796),
          new BMap.Point(119.271924, 31.763561),
          new BMap.Point(119.271464, 31.764236),
          new BMap.Point(119.27114, 31.764881),
          new BMap.Point(119.271015, 31.765699),
          new BMap.Point(119.271159, 31.766426),
          new BMap.Point(119.271159, 31.766754),
          new BMap.Point(119.271075, 31.767194),
          new BMap.Point(119.270757, 31.767552),
          new BMap.Point(119.270673, 31.768043),
          new BMap.Point(119.270781, 31.76835),
          new BMap.Point(119.270578, 31.768504),
          new BMap.Point(119.270757, 31.768759),
          new BMap.Point(119.270685, 31.768913),
          new BMap.Point(119.269578, 31.768436),
          new BMap.Point(119.268859, 31.768201),
          new BMap.Point(119.268009, 31.767914),
          new BMap.Point(119.267506, 31.767741),
          new BMap.Point(119.267721, 31.768232),
          new BMap.Point(119.267985, 31.768784),
          new BMap.Point(119.268296, 31.769613),
          new BMap.Point(119.265062, 31.771076),
          new BMap.Point(119.264403, 31.770565),
          new BMap.Point(119.264104, 31.770258),
          new BMap.Point(119.263769, 31.769849),
          new BMap.Point(119.26293, 31.768805),
          new BMap.Point(119.261014, 31.768958),
          new BMap.Point(119.258518, 31.767803)
        ];
        this.drawPloygon(panchong, "潘冲", "#c40302");

        var shanggan = [
          new BMap.Point(119.233853, 31.673425),
          new BMap.Point(119.233814, 31.673268),
          new BMap.Point(119.233773, 31.6731),
          new BMap.Point(119.233863, 31.672946),
          new BMap.Point(119.234041, 31.672731),
          new BMap.Point(119.234191, 31.672593),
          new BMap.Point(119.234364, 31.672342),
          new BMap.Point(119.234535, 31.672127),
          new BMap.Point(119.234658, 31.671945),
          new BMap.Point(119.235058, 31.671429),
          new BMap.Point(119.235225, 31.671221),
          new BMap.Point(119.235387, 31.670973),
          new BMap.Point(119.235851, 31.670383),
          new BMap.Point(119.236034, 31.670165),
          new BMap.Point(119.236192, 31.669914),
          new BMap.Point(119.236528, 31.669505),
          new BMap.Point(119.236636, 31.669349),
          new BMap.Point(119.236924, 31.668932),
          new BMap.Point(119.237002, 31.668755),
          new BMap.Point(119.237281, 31.668336),
          new BMap.Point(119.23741, 31.668124),
          new BMap.Point(119.237616, 31.667808),
          new BMap.Point(119.237781, 31.667554),
          new BMap.Point(119.238109, 31.667064),
          new BMap.Point(119.238219, 31.666869),
          new BMap.Point(119.238475, 31.666466),
          new BMap.Point(119.238601, 31.666266),
          new BMap.Point(119.238914, 31.665787),
          new BMap.Point(119.238953, 31.665708),
          new BMap.Point(119.239031, 31.665546),
          new BMap.Point(119.239212, 31.665099),
          new BMap.Point(119.239377, 31.664705),
          new BMap.Point(119.239686, 31.663949),
          new BMap.Point(119.239866, 31.663545),
          new BMap.Point(119.240146, 31.662866),
          new BMap.Point(119.240419, 31.662218),
          new BMap.Point(119.240769, 31.661343),
          new BMap.Point(119.240853, 31.661126),
          new BMap.Point(119.240659, 31.66058),
          new BMap.Point(119.240522, 31.660231),
          new BMap.Point(119.240394, 31.659885),
          new BMap.Point(119.240175, 31.65928),
          new BMap.Point(119.240008, 31.658855),
          new BMap.Point(119.23975, 31.658135),
          new BMap.Point(119.239615, 31.657774),
          new BMap.Point(119.239515, 31.657558),
          new BMap.Point(119.239698, 31.65763),
          new BMap.Point(119.239942, 31.657764),
          new BMap.Point(119.240361, 31.657995),
          new BMap.Point(119.241391, 31.658581),
          new BMap.Point(119.241837, 31.658819),
          new BMap.Point(119.242205, 31.658996),
          new BMap.Point(119.242497, 31.658891),
          new BMap.Point(119.242863, 31.65875),
          new BMap.Point(119.243324, 31.65855),
          new BMap.Point(119.245002, 31.657889),
          new BMap.Point(119.245265, 31.657777),
          new BMap.Point(119.245469, 31.657695),
          new BMap.Point(119.245783, 31.657098),
          new BMap.Point(119.245973, 31.656766),
          new BMap.Point(119.246372, 31.655999),
          new BMap.Point(119.246584, 31.655615),
          new BMap.Point(119.246737, 31.655323),
          new BMap.Point(119.24706, 31.654712),
          new BMap.Point(119.247387, 31.654128),
          new BMap.Point(119.247803, 31.653358),
          new BMap.Point(119.248081, 31.652833),
          new BMap.Point(119.248321, 31.65238),
          new BMap.Point(119.248555, 31.651925),
          new BMap.Point(119.248719, 31.651628),
          new BMap.Point(119.248692, 31.651368),
          new BMap.Point(119.248668, 31.651042),
          new BMap.Point(119.248599, 31.650379),
          new BMap.Point(119.248511, 31.649543),
          new BMap.Point(119.248463, 31.648951),
          new BMap.Point(119.248399, 31.648213),
          new BMap.Point(119.248333, 31.647814),
          new BMap.Point(119.248432, 31.64773),
          new BMap.Point(119.248682, 31.647733),
          new BMap.Point(119.249944, 31.647866),
          new BMap.Point(119.250702, 31.647943),
          new BMap.Point(119.251715, 31.648056),
          new BMap.Point(119.25388, 31.648318),
          new BMap.Point(119.2553, 31.648498),
          new BMap.Point(119.256556, 31.648682),
          new BMap.Point(119.258076, 31.649329),
          new BMap.Point(119.258709, 31.649613),
          new BMap.Point(119.258826, 31.649659),
          new BMap.Point(119.258906, 31.649626),
          new BMap.Point(119.258865, 31.649426),
          new BMap.Point(119.258796, 31.648911),
          new BMap.Point(119.258682, 31.647979),
          new BMap.Point(119.258561, 31.646939),
          new BMap.Point(119.258499, 31.646394),
          new BMap.Point(119.258971, 31.645481),
          new BMap.Point(119.259444, 31.644519),
          new BMap.Point(119.259883, 31.643684),
          new BMap.Point(119.260014, 31.643448),
          new BMap.Point(119.260131, 31.643582),
          new BMap.Point(119.260558, 31.644166),
          new BMap.Point(119.260771, 31.644453),
          new BMap.Point(119.261018, 31.644764),
          new BMap.Point(119.261375, 31.645242),
          new BMap.Point(119.261585, 31.645034),
          new BMap.Point(119.262281, 31.64435),
          new BMap.Point(119.262685, 31.643976),
          new BMap.Point(119.262919, 31.643776),
          new BMap.Point(119.263262, 31.643843),
          new BMap.Point(119.264506, 31.644058),
          new BMap.Point(119.26479, 31.644102),
          new BMap.Point(119.264874, 31.644002),
          new BMap.Point(119.265033, 31.643752),
          new BMap.Point(119.265781, 31.642545),
          new BMap.Point(119.265922, 31.642322),
          new BMap.Point(119.266075, 31.642125),
          new BMap.Point(119.266136, 31.641993),
          new BMap.Point(119.266202, 31.642003),
          new BMap.Point(119.266487, 31.642326),
          new BMap.Point(119.266837, 31.642675),
          new BMap.Point(119.267217, 31.6431),
          new BMap.Point(119.267765, 31.643396),
          new BMap.Point(119.26816, 31.643752),
          new BMap.Point(119.26843, 31.643934),
          new BMap.Point(119.268933, 31.644455),
          new BMap.Point(119.269235, 31.644624),
          new BMap.Point(119.269481, 31.644783),
          new BMap.Point(119.269625, 31.645001),
          new BMap.Point(119.270646, 31.64558),
          new BMap.Point(119.271271, 31.645903),
          new BMap.Point(119.27299, 31.646781),
          new BMap.Point(119.273763, 31.647125),
          new BMap.Point(119.274986, 31.647631),
          new BMap.Point(119.276437, 31.648272),
          new BMap.Point(119.277614, 31.64875),
          new BMap.Point(119.278848, 31.649289),
          new BMap.Point(119.28003, 31.649775),
          new BMap.Point(119.280773, 31.650252),
          new BMap.Point(119.281593, 31.650764),
          new BMap.Point(119.28224, 31.651154),
          new BMap.Point(119.283306, 31.651825),
          new BMap.Point(119.284315, 31.652488),
          new BMap.Point(119.284986, 31.652888),
          new BMap.Point(119.28604, 31.653461),
          new BMap.Point(119.287576, 31.654276),
          new BMap.Point(119.288917, 31.654957),
          new BMap.Point(119.290328, 31.655644),
          new BMap.Point(119.291591, 31.656279),
          new BMap.Point(119.292274, 31.656566),
          new BMap.Point(119.293711, 31.657583),
          new BMap.Point(119.294532, 31.658136),
          new BMap.Point(119.295173, 31.658577),
          new BMap.Point(119.295861, 31.658935),
          new BMap.Point(119.296778, 31.659504),
          new BMap.Point(119.297035, 31.659663),
          new BMap.Point(119.295727, 31.659419),
          new BMap.Point(119.293885, 31.659378),
          new BMap.Point(119.293079, 31.658486),
          new BMap.Point(119.292296, 31.65815),
          new BMap.Point(119.290778, 31.658067),
          new BMap.Point(119.289905, 31.659093),
          new BMap.Point(119.28866, 31.659376),
          new BMap.Point(119.287281, 31.659216),
          new BMap.Point(119.286315, 31.659216),
          new BMap.Point(119.284974, 31.660276),
          new BMap.Point(119.285203, 31.661718),
          new BMap.Point(119.283754, 31.661868),
          new BMap.Point(119.281855, 31.662202),
          new BMap.Point(119.281206, 31.661504),
          new BMap.Point(119.280322, 31.660413),
          new BMap.Point(119.278798, 31.66072),
          new BMap.Point(119.278126, 31.659908),
          new BMap.Point(119.277638, 31.658528),
          new BMap.Point(119.274877, 31.658587),
          new BMap.Point(119.274196, 31.659372),
          new BMap.Point(119.273962, 31.660146),
          new BMap.Point(119.27395, 31.661424),
          new BMap.Point(119.274721, 31.662085),
          new BMap.Point(119.275489, 31.663065),
          new BMap.Point(119.275684, 31.66405),
          new BMap.Point(119.274723, 31.664695),
          new BMap.Point(119.272917, 31.664333),
          new BMap.Point(119.271571, 31.663594),
          new BMap.Point(119.269842, 31.663518),
          new BMap.Point(119.2684, 31.66425),
          new BMap.Point(119.26792, 31.664904),
          new BMap.Point(119.268403, 31.665944),
          new BMap.Point(119.267644, 31.666502),
          new BMap.Point(119.266587, 31.666833),
          new BMap.Point(119.265629, 31.666676),
          new BMap.Point(119.264844, 31.666342),
          new BMap.Point(119.263443, 31.665938),
          new BMap.Point(119.262186, 31.665442),
          new BMap.Point(119.261126, 31.665278),
          new BMap.Point(119.259305, 31.665117),
          new BMap.Point(119.257953, 31.665275),
          new BMap.Point(119.256711, 31.665926),
          new BMap.Point(119.256791, 31.666842),
          new BMap.Point(119.255179, 31.668051),
          new BMap.Point(119.253685, 31.668958),
          new BMap.Point(119.252709, 31.669274),
          new BMap.Point(119.252334, 31.669163),
          new BMap.Point(119.25208, 31.66903),
          new BMap.Point(119.251006, 31.669153),
          new BMap.Point(119.250873, 31.669061),
          new BMap.Point(119.250663, 31.669101),
          new BMap.Point(119.25043, 31.669196),
          new BMap.Point(119.250174, 31.66922),
          new BMap.Point(119.249913, 31.669274),
          new BMap.Point(119.249407, 31.669435),
          new BMap.Point(119.248885, 31.669545),
          new BMap.Point(119.248522, 31.669668),
          new BMap.Point(119.248274, 31.669947),
          new BMap.Point(119.247779, 31.670229),
          new BMap.Point(119.247423, 31.670338),
          new BMap.Point(119.24727, 31.670245),
          new BMap.Point(119.246803, 31.670261),
          new BMap.Point(119.246528, 31.670116),
          new BMap.Point(119.246095, 31.669805),
          new BMap.Point(119.245646, 31.6696),
          new BMap.Point(119.245475, 31.669586),
          new BMap.Point(119.244935, 31.669741),
          new BMap.Point(119.244333, 31.669824),
          new BMap.Point(119.244167, 31.669942),
          new BMap.Point(119.243592, 31.670182),
          new BMap.Point(119.243321, 31.670518),
          new BMap.Point(119.242469, 31.671221),
          new BMap.Point(119.24108, 31.671741),
          new BMap.Point(119.240074, 31.672151),
          new BMap.Point(119.240321, 31.673343),
          new BMap.Point(119.238698, 31.673504),
          new BMap.Point(119.237737, 31.673589),
          new BMap.Point(119.236401, 31.672938),
          new BMap.Point(119.23386, 31.673424),
          new BMap.Point(119.233853, 31.673425)
        ];
        this.drawPloygon(shanggan, "上杆", "#a402c4");

        var tianle = [
          new BMap.Point(119.279652, 31.844114),
          new BMap.Point(119.28128, 31.842723),
          new BMap.Point(119.280993, 31.840597),
          new BMap.Point(119.280514, 31.837897),
          new BMap.Point(119.279364, 31.836425),
          new BMap.Point(119.280801, 31.834789),
          new BMap.Point(119.281951, 31.833152),
          new BMap.Point(119.283676, 31.832661),
          new BMap.Point(119.28291, 31.830533),
          new BMap.Point(119.281185, 31.829634),
          new BMap.Point(119.28176, 31.828324),
          new BMap.Point(119.280323, 31.829306),
          new BMap.Point(119.279652, 31.828324),
          new BMap.Point(119.277544, 31.827588),
          new BMap.Point(119.275532, 31.825625),
          new BMap.Point(119.274382, 31.824233),
          new BMap.Point(119.27352, 31.821942),
          new BMap.Point(119.272467, 31.821533),
          new BMap.Point(119.271988, 31.823661),
          new BMap.Point(119.270645, 31.82546),
          new BMap.Point(119.268538, 31.825542),
          new BMap.Point(119.269018, 31.823742),
          new BMap.Point(119.270073, 31.82276),
          new BMap.Point(119.269593, 31.822269),
          new BMap.Point(119.268156, 31.823006),
          new BMap.Point(119.266814, 31.822596),
          new BMap.Point(119.26576, 31.822923),
          new BMap.Point(119.263557, 31.824805),
          new BMap.Point(119.261161, 31.825132),
          new BMap.Point(119.258383, 31.826442),
          new BMap.Point(119.256179, 31.827832),
          new BMap.Point(119.254549, 31.829714),
          new BMap.Point(119.252921, 31.830858),
          new BMap.Point(119.252825, 31.833558),
          new BMap.Point(119.252633, 31.835522),
          new BMap.Point(119.252346, 31.836668),
          new BMap.Point(119.251292, 31.837239),
          new BMap.Point(119.251292, 31.838466),
          new BMap.Point(119.252921, 31.838303),
          new BMap.Point(119.254789, 31.837036),
          new BMap.Point(119.256945, 31.836708),
          new BMap.Point(119.258335, 31.83769),
          new BMap.Point(119.260156, 31.839327),
          new BMap.Point(119.262168, 31.840799),
          new BMap.Point(119.263701, 31.842026),
          new BMap.Point(119.265042, 31.840962),
          new BMap.Point(119.266479, 31.839081),
          new BMap.Point(119.267437, 31.837773),
          new BMap.Point(119.267629, 31.837118),
          new BMap.Point(119.268778, 31.838755),
          new BMap.Point(119.270982, 31.841046),
          new BMap.Point(119.272324, 31.842518),
          new BMap.Point(119.275103, 31.843417),
          new BMap.Point(119.279652, 31.844114)
        ];
        this.drawPloygon(tianle, "天乐", "#02c463");

        var xialin = [
          new BMap.Point(119.270763, 31.768701),
          new BMap.Point(119.270691, 31.768865),
          new BMap.Point(119.271745, 31.769377),
          new BMap.Point(119.274847, 31.771362),
          new BMap.Point(119.277746, 31.774186),
          new BMap.Point(119.27983, 31.77501),
          new BMap.Point(119.280369, 31.776105),
          new BMap.Point(119.281183, 31.776484),
          new BMap.Point(119.282627, 31.776345),
          new BMap.Point(119.282495, 31.777389),
          new BMap.Point(119.284622, 31.778479),
          new BMap.Point(119.284742, 31.779052),
          new BMap.Point(119.285227, 31.780075),
          new BMap.Point(119.285993, 31.779738),
          new BMap.Point(119.286772, 31.779789),
          new BMap.Point(119.287107, 31.780587),
          new BMap.Point(119.285167, 31.782551),
          new BMap.Point(119.284022, 31.783002),
          new BMap.Point(119.283399, 31.783431),
          new BMap.Point(119.282537, 31.783943),
          new BMap.Point(119.281399, 31.784168),
          new BMap.Point(119.280596, 31.784823),
          new BMap.Point(119.280944, 31.785836),
          new BMap.Point(119.281039, 31.786869),
          new BMap.Point(119.279427, 31.787289),
          new BMap.Point(119.278062, 31.787535),
          new BMap.Point(119.276792, 31.78775),
          new BMap.Point(119.276086, 31.78801),
          new BMap.Point(119.275164, 31.788348),
          new BMap.Point(119.273787, 31.78978),
          new BMap.Point(119.273756, 31.791028),
          new BMap.Point(119.273816, 31.792261),
          new BMap.Point(119.273409, 31.793494),
          new BMap.Point(119.272379, 31.794251),
          new BMap.Point(119.271522, 31.795586),
          new BMap.Point(119.271606, 31.796568),
          new BMap.Point(119.271115, 31.797325),
          new BMap.Point(119.270018, 31.797863),
          new BMap.Point(119.26912, 31.799346),
          new BMap.Point(119.269425, 31.801064),
          new BMap.Point(119.270168, 31.801621),
          new BMap.Point(119.271372, 31.80181),
          new BMap.Point(119.270706, 31.803047),
          new BMap.Point(119.271742, 31.803109),
          new BMap.Point(119.272209, 31.803068),
          new BMap.Point(119.273407, 31.803231),
          new BMap.Point(119.27397, 31.803733),
          new BMap.Point(119.274863, 31.802894),
          new BMap.Point(119.275234, 31.802305),
          new BMap.Point(119.275456, 31.801615),
          new BMap.Point(119.276995, 31.801032),
          new BMap.Point(119.279992, 31.799919),
          new BMap.Point(119.281531, 31.800505),
          new BMap.Point(119.283618, 31.800676),
          new BMap.Point(119.286211, 31.800382),
          new BMap.Point(119.288136, 31.800111),
          new BMap.Point(119.290205, 31.799794),
          new BMap.Point(119.290283, 31.799838),
          new BMap.Point(119.291472, 31.800369),
          new BMap.Point(119.292151, 31.800684),
          new BMap.Point(119.29496, 31.800577),
          new BMap.Point(119.296757, 31.799574),
          new BMap.Point(119.297045, 31.798019),
          new BMap.Point(119.297311, 31.796689),
          new BMap.Point(119.297676, 31.795226),
          new BMap.Point(119.299569, 31.792909),
          new BMap.Point(119.302126, 31.791771),
          new BMap.Point(119.305731, 31.790848),
          new BMap.Point(119.30783, 31.791101),
          new BMap.Point(119.310783, 31.791142),
          new BMap.Point(119.314433, 31.789896),
          new BMap.Point(119.316496, 31.788512),
          new BMap.Point(119.318311, 31.787142),
          new BMap.Point(119.32038, 31.786177),
          new BMap.Point(119.321667, 31.785814),
          new BMap.Point(119.321428, 31.784975),
          new BMap.Point(119.321086, 31.784254),
          new BMap.Point(119.320344, 31.782771),
          new BMap.Point(119.320165, 31.782331),
          new BMap.Point(119.319464, 31.782285),
          new BMap.Point(119.318722, 31.782367),
          new BMap.Point(119.317817, 31.782408),
          new BMap.Point(119.317171, 31.78247),
          new BMap.Point(119.316703, 31.782204),
          new BMap.Point(119.316069, 31.781917),
          new BMap.Point(119.31553, 31.781559),
          new BMap.Point(119.315255, 31.781416),
          new BMap.Point(119.314823, 31.780894),
          new BMap.Point(119.314392, 31.780443),
          new BMap.Point(119.313757, 31.779594),
          new BMap.Point(119.313117, 31.778852),
          new BMap.Point(119.312662, 31.777865),
          new BMap.Point(119.312482, 31.777466),
          new BMap.Point(119.312183, 31.776832),
          new BMap.Point(119.311835, 31.776054),
          new BMap.Point(119.311111, 31.774744),
          new BMap.Point(119.311027, 31.774396),
          new BMap.Point(119.310884, 31.773772),
          new BMap.Point(119.310692, 31.772677),
          new BMap.Point(119.310345, 31.771547),
          new BMap.Point(119.310058, 31.77038),
          new BMap.Point(119.309776, 31.769183),
          new BMap.Point(119.309441, 31.7682),
          new BMap.Point(119.308938, 31.767095),
          new BMap.Point(119.308555, 31.765888),
          new BMap.Point(119.308387, 31.764414),
          new BMap.Point(119.3058, 31.764619),
          new BMap.Point(119.304387, 31.764107),
          new BMap.Point(119.302566, 31.764005),
          new BMap.Point(119.301728, 31.764394),
          new BMap.Point(119.300721, 31.764885),
          new BMap.Point(119.299691, 31.764209),
          new BMap.Point(119.298422, 31.763391),
          new BMap.Point(119.297056, 31.763268),
          new BMap.Point(119.295811, 31.762265),
          new BMap.Point(119.293918, 31.760935),
          new BMap.Point(119.292505, 31.760484),
          new BMap.Point(119.291248, 31.761386),
          new BMap.Point(119.2889, 31.760854),
          new BMap.Point(119.287583, 31.760178),
          new BMap.Point(119.287055, 31.759196),
          new BMap.Point(119.285427, 31.759687),
          new BMap.Point(119.284085, 31.75983),
          new BMap.Point(119.282719, 31.760445),
          new BMap.Point(119.279795, 31.760467),
          new BMap.Point(119.278333, 31.761981),
          new BMap.Point(119.278453, 31.763517),
          new BMap.Point(119.277303, 31.764622),
          new BMap.Point(119.275099, 31.764438),
          new BMap.Point(119.274417, 31.764256),
          new BMap.Point(119.273507, 31.763745),
          new BMap.Point(119.271902, 31.76356),
          new BMap.Point(119.271423, 31.764256),
          new BMap.Point(119.271135, 31.76487),
          new BMap.Point(119.271015, 31.765689),
          new BMap.Point(119.271159, 31.766498),
          new BMap.Point(119.271087, 31.767153),
          new BMap.Point(119.270752, 31.767541),
          new BMap.Point(119.27068, 31.768053),
          new BMap.Point(119.2708, 31.768319),
          new BMap.Point(119.270584, 31.768503),
          new BMap.Point(119.270763, 31.768701)
        ];
        this.drawPloygon(xialin, "夏林", "#c44302");

        var yuchen = [
          new BMap.Point(119.315443, 31.856177),
          new BMap.Point(119.314293, 31.855686),
          new BMap.Point(119.311993, 31.856259),
          new BMap.Point(119.310269, 31.855851),
          new BMap.Point(119.308448, 31.85536),
          new BMap.Point(119.307201, 31.855278),
          new BMap.Point(119.304997, 31.856995),
          new BMap.Point(119.302984, 31.857895),
          new BMap.Point(119.301356, 31.858631),
          new BMap.Point(119.298769, 31.859203),
          new BMap.Point(119.297044, 31.858222),
          new BMap.Point(119.294887, 31.857446),
          new BMap.Point(119.293737, 31.856382),
          new BMap.Point(119.292012, 31.855074),
          new BMap.Point(119.290766, 31.854666),
          new BMap.Point(119.289425, 31.854501),
          new BMap.Point(119.28837, 31.853847),
          new BMap.Point(119.288658, 31.852866),
          new BMap.Point(119.287988, 31.852293),
          new BMap.Point(119.286645, 31.850984),
          new BMap.Point(119.284921, 31.848858),
          new BMap.Point(119.282814, 31.847508),
          new BMap.Point(119.281089, 31.845626),
          new BMap.Point(119.279555, 31.844071),
          new BMap.Point(119.281233, 31.842763),
          new BMap.Point(119.280466, 31.837855),
          new BMap.Point(119.279348, 31.836547),
          new BMap.Point(119.281887, 31.833274),
          new BMap.Point(119.283756, 31.832579),
          new BMap.Point(119.283133, 31.831106),
          new BMap.Point(119.281103, 31.829634),
          new BMap.Point(119.281678, 31.828284),
          new BMap.Point(119.280432, 31.827548),
          new BMap.Point(119.27957, 31.82628),
          new BMap.Point(119.278851, 31.825749),
          new BMap.Point(119.278468, 31.825298),
          new BMap.Point(119.278659, 31.824603),
          new BMap.Point(119.278372, 31.823784),
          new BMap.Point(119.278084, 31.82313),
          new BMap.Point(119.278276, 31.822803),
          new BMap.Point(119.27818, 31.822291),
          new BMap.Point(119.277317, 31.822087),
          new BMap.Point(119.277005, 31.821372),
          new BMap.Point(119.276527, 31.820554),
          new BMap.Point(119.277054, 31.820185),
          new BMap.Point(119.276479, 31.819776),
          new BMap.Point(119.276143, 31.819408),
          new BMap.Point(119.275664, 31.818303),
          new BMap.Point(119.275472, 31.817669),
          new BMap.Point(119.276358, 31.817178),
          new BMap.Point(119.277172, 31.816912),
          new BMap.Point(119.278921, 31.81728),
          new BMap.Point(119.280167, 31.817607),
          new BMap.Point(119.280934, 31.817832),
          new BMap.Point(119.282658, 31.818036),
          new BMap.Point(119.282802, 31.81726),
          new BMap.Point(119.283377, 31.817423),
          new BMap.Point(119.284503, 31.817791),
          new BMap.Point(119.285054, 31.818363),
          new BMap.Point(119.28582, 31.818486),
          new BMap.Point(119.28651, 31.818934),
          new BMap.Point(119.287037, 31.819874),
          new BMap.Point(119.288451, 31.820161),
          new BMap.Point(119.289026, 31.82012),
          new BMap.Point(119.290511, 31.820611),
          new BMap.Point(119.29214, 31.820529),
          new BMap.Point(119.2938, 31.819837),
          new BMap.Point(119.296723, 31.819019),
          new BMap.Point(119.298208, 31.818568),
          new BMap.Point(119.299955, 31.818487),
          new BMap.Point(119.302351, 31.817792),
          new BMap.Point(119.304052, 31.819346),
          new BMap.Point(119.304339, 31.820246),
          new BMap.Point(119.305201, 31.821555),
          new BMap.Point(119.308651, 31.82221),
          new BMap.Point(119.308795, 31.820737),
          new BMap.Point(119.307429, 31.820205),
          new BMap.Point(119.308292, 31.819284),
          new BMap.Point(119.310279, 31.819917),
          new BMap.Point(119.311573, 31.819222),
          new BMap.Point(119.312842, 31.818935),
          new BMap.Point(119.313674, 31.819299),
          new BMap.Point(119.315016, 31.818358),
          new BMap.Point(119.317076, 31.816845),
          new BMap.Point(119.317651, 31.81619),
          new BMap.Point(119.319113, 31.815842),
          new BMap.Point(119.320118, 31.815249),
          new BMap.Point(119.320837, 31.814186),
          new BMap.Point(119.320981, 31.81257),
          new BMap.Point(119.322562, 31.811854),
          new BMap.Point(119.324679, 31.815157),
          new BMap.Point(119.325373, 31.817244),
          new BMap.Point(119.32566, 31.819004),
          new BMap.Point(119.326188, 31.820967),
          new BMap.Point(119.327147, 31.823484),
          new BMap.Point(119.3282, 31.825365),
          new BMap.Point(119.3282, 31.826061),
          new BMap.Point(119.328919, 31.827247),
          new BMap.Point(119.330069, 31.827942),
          new BMap.Point(119.331171, 31.829456),
          new BMap.Point(119.332441, 31.831133),
          new BMap.Point(119.333447, 31.832933),
          new BMap.Point(119.335603, 31.834467),
          new BMap.Point(119.336992, 31.835203),
          new BMap.Point(119.33704, 31.836021),
          new BMap.Point(119.335125, 31.836819),
          new BMap.Point(119.334334, 31.839498),
          new BMap.Point(119.336073, 31.845216),
          new BMap.Point(119.333917, 31.84722),
          new BMap.Point(119.331809, 31.846729),
          new BMap.Point(119.329735, 31.849135),
          new BMap.Point(119.327746, 31.849319),
          new BMap.Point(119.326453, 31.851588),
          new BMap.Point(119.323866, 31.851322),
          new BMap.Point(119.322237, 31.851404),
          new BMap.Point(119.32044, 31.850341),
          new BMap.Point(119.318943, 31.851261),
          new BMap.Point(119.317133, 31.853909),
          new BMap.Point(119.315719, 31.85439),
          new BMap.Point(119.315576, 31.856332),
          new BMap.Point(119.315443, 31.856177)
        ];
        this.drawPloygon(yuchen, "玉晨", "#84c402");
      },
      drawMousePloygon(pointArray, fillcolor) {
        //绘制不规则覆盖物
        var ploygon = new BMap.Polygon(pointArray, {
          strokeColor: "black",
          fillColor: fillcolor,
          fillOpacity: 0.5,
          strokeWeight: 1,
          strokeOpacity: 0.5
        });
        this.Coloroverlays.push(ploygon);
        this.map.addOverlay(ploygon);
      },
      overlaycomplete(e) {
        this.overlays.push(e.overlay);
        var path = e.overlay.getPath(); //Array<Point> 返回多边型的点数组
        var arr = [];
        for (var i = 0; i < path.length - 1; i++) {
          arr.push(new BMap.Point(path[i].lng, path[i].lat));
        }
        let index = parseInt(Math.random() * this.colors.length);
        let color = this.colors[index];
        this.drawMousePloygon(arr, color);
        let obj = {
          locations: arr,
          color: color
        };
        this.form.regionLocation = JSON.stringify(obj);
        this.visible = true;
      },
      reTurnMaoShan() {
        this.map.centerAndZoom(new BMap.Point(119.307273, 31.781633), 13.5);
        this.map.removeOverlay(this.lastPloy);
      },
      //绘制巡防区域
      drawFencePloygon(pointArray, fillcolor, obj) {
        //绘制不规则覆盖物
        var ploygon = new BMap.Polygon(pointArray, {
          strokeColor: "black",
          fillColor: fillcolor,
          fillOpacity: 0.5,
          strokeWeight: 1,
          strokeOpacity: 0.5
        });

        // 右击事件
        ploygon.addEventListener("rightclick", event => {
          var menu = document.getElementById("Menu");
          var deleteMenu = document.getElementById("deleteMenu");
          var editMenu = document.getElementById("editMenu");
          var ranksMenu = document.getElementById("ranksMenu");
          var container = document.body;
          var evt = event;

          /*获取当前鼠标右键按下后的位置，据此定义菜单显示的位置*/
          var rightedge = container.clientWidth - evt.clientX;
          var bottomedge = container.clientHeight - evt.clientY;

          /*如果从鼠标位置到容器右边的空间小于菜单的宽度，就定位菜单的左坐标（Left）为当前鼠标位置向左一个菜单宽度*/
          if (rightedge < menu.offsetWidth)
            menu.style.left =
            container.scrollLeft + evt.clientX - menu.offsetWidth + "px";
          else
            /*否则，就定位菜单的左坐标为当前鼠标位置*/
            menu.style.left = container.scrollLeft + evt.clientX + "px";

          /*如果从鼠标位置到容器下边的空间小于菜单的高度，就定位菜单的上坐标（Top）为当前鼠标位置向上一个菜单高度*/
          if (bottomedge < menu.offsetHeight)
            menu.style.top =
            container.scrollTop + evt.clientY - menu.offsetHeight + "px";
          else
            /*否则，就定位菜单的上坐标为当前鼠标位置*/
            menu.style.top = container.scrollTop + evt.clientY + "px";

          /*设置菜单可见*/
          menu.style.visibility = "visible";

          ranksMenu.onclick = evt => {
            this.visible3 = true;
            api.getProcessionDetailByInspectionArea(obj.id).then(res => {
              this.form2 = res.data;
            });
          };

          editMenu.onclick = evt => {
            this.visible2 = true;
            this.editObj = obj;
          };

          deleteMenu.onclick = evt => {
            this.$confirm("是否删除此区域信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              })
              .then(() => {
                api.deleteSPRegion(obj.id).then(res => {
                  if (res.code == 200) {
                    this.$message({
                      type: "success",
                      message: "删除成功"
                    });
                    document.location.reload();
                  }
                });
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消删除"
                });
                document.getElementById("Menu").style.visibility = "hidden";
              });
          };
        });

        let topPoint = this.getTopPoint(pointArray);

        var opts = {
          position: topPoint, // 指定文本标注所在的地理位置
          offset: new BMap.Size(0, 8) //设置文本偏移量
        };
        var label = new BMap.Label(obj.regionName, opts); // 创建文本标注对象
        label.setStyle({
          color: "green",
          fontSize: "10px",
          height: "20px",
          lineHeight: "18px",
          fontFamily: "微软雅黑",
          backgroundColor: "whitesmoke",
          borderColor: "black"
        });
        this.map.addOverlay(label);
        this.map.addOverlay(ploygon);
      },
      getTopPoint(pointArray) {
        let topPoint = pointArray[0];
        for (let i = 1; i < pointArray.length; i++) {
          if (topPoint.lat < pointArray[i].lat) {
            topPoint = pointArray[i];
          }
        }
        return topPoint;
      },
      drawFenceNet(area) {
        for (let i = 0; i < area.length; i++) {
          let obj = JSON.parse(area[i].regionLocation);
          let arr = [];
          let color = obj.color;
          for (let i = 0; i < obj.locations.length; i++) {
            arr.push(new BMap.Point(obj.locations[i].lng, obj.locations[i].lat));
          }
          this.drawFencePloygon(arr, color, area[i]);
        }
      },
      getAllFenceNet() {
        api.selectAllRegion().then(res => {
          this.areas = res.data;
          this.drawFenceNet(this.areas);
        });
      }
    },
    mounted() {
      this.map = new BMap.Map("map");
      this.map.centerAndZoom(new BMap.Point(119.307273, 31.781633), 13.5);
      this.map.setCurrentCity("句容"); // 设置地图显示的城市 此项是必须设置的
      this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      this.map.addControl(new BMap.MapTypeControl());
      this.initMap();
      //实例化鼠标绘制工具
      var drawingManager = new BMapLib.DrawingManager(this.map, {
        isOpen: false, //是否开启绘制模式
        enableDrawingTool: true, //是否显示工具栏
        drawingToolOptions: {
          anchor: BMAP_ANCHOR_TOP_LEFT, //位置
          offset: new BMap.Size(5, 5), //偏离值
          drawingModes: [BMAP_DRAWING_POLYLINE]
        },
        polylineOptions: {
          strokeColor: "#333",
          strokeWeight: 1,
          strokeOpacity: 0.5
        }
      });
      drawingManager.addEventListener("overlaycomplete", this.overlaycomplete);
      this.map.addEventListener("click", event => {
        document.getElementById("Menu").style.visibility = "hidden";
      });
      this.getAllFenceNet();

      this.showAllComplex();
    }
  };

</script>

<style scoped>
  #mytools {
    position: absolute;
    left: 25%;
    top: 60px;
    z-index: 2000;
  }

  #mytools {
    background-color: #f0f8ff;
    padding: 3px;
    border: 1px solid whitesmoke;
    border-radius: 3px;
    box-shadow: 0 0 2px #666;
  }

  #mytools dl {
    margin: 0px;
    padding: 0px;
  }

  #mytools dl dd {
    float: left;
    margin-left: 5px;
    padding: 0px;
  }

  #Menu {
    visibility: hidden;
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
    /* border: 1px solid; */
    margin: 0;
    padding: 0;
  }

  #Menu dl {
    font-size: 16px;
    margin: 0;
    padding: 0;
    color: #f56c6c;
    text-align: center;
    cursor: pointer;
  }

  .userInfoEditTable,
  .userInfoEditTable td {
    border: 1px solid darkgrey;
    padding: 10px;
  }

  .tb_label {
    width: 20%;
    text-align: right;
  }

</style>



// WEBPACK FOOTER //
// src/views/skynet/fenceManage.vue?65b4388c