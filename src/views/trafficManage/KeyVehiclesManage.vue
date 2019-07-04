<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="margin-top:10px"  align="right">
          <el-button @click="addNewRecord" type="primary">添加重点车辆</el-button>
          <el-input style="width:200px" v-model="filters.vehiclesHolderName" placeholder="请输入车主姓名"></el-input>
          <el-input
            style="width:200px"
            v-model="filters.vehiclesHolderCertID"
            placeholder="请输入车主身份证"
          ></el-input>
          <el-input style="width:200px" v-model="filters.vechiclesNumber" placeholder="请输入车牌号"></el-input>
          <el-button type="primary" icon="search" @click="getCarInfo">搜索</el-button>
          <el-button type="primary" @click="flushAll">刷新</el-button>
        </div>
        <el-row style="margin-top:20px" :gutter="20">
          <el-col :span="$store.getters.user.userRole=='超级管理员'?2:0">
            <tree-component @GetNodeValue="GetNodeValue"></tree-component>
          </el-col>
          <el-col :span="$store.getters.user.userRole=='超级管理员'?22:24">
            <el-table :data="list">
              <el-table-column v-for="(v,k,i) in props" :key="i" :label="labels[i]" align="center">
                <template scope="scope">{{scope.row[k]}}</template>
              </el-table-column>
              <el-table-column label="操作" width="200" align="center">
                <template scope="scope">
                  <el-button type="text" @click="ckDetail(scope.row.keyVehiclesID)">查看详情</el-button>
                  <el-button type="text" @click="editCar(scope.row.keyVehiclesID)">编辑</el-button>
                  <el-button type="text" @click="deleteCar(scope.row.keyVehiclesID)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="24" style="margin-top:10px" align="right">
            <el-pagination
              layout="prev, pager, next"
              :total="totalInfo"
              @current-change="handleCurrentChange"
            ></el-pagination>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-dialog title="查看重点车辆信息" :visible.sync="visible">
      <div id="tableInfo">
        <table
          class="userInfoEditTable"
          style="border-collapse:collapse;background-color:white;"
          width="100%"
          cellspacing="0"
        >
          <tr v-for="(v,k,i) in form" :key="i">
            <template v-if="k!=='netGridID'&&k!=='vechiclesTypeValue'&&k!='keyVehiclesID'">
              <td class="tb_label">{{label2[i]}}</td>
              <td>{{v}}</td>
            </template>
          </tr>
          <tr>
            <td class="tb_label">图片资料</td>
            <td>
              <img v-for="(v,i) in pic" width="300" :key="i" :src="v" alt>
            </td>
          </tr>
          <tr>
            <td colspan="2" align="center">
              <el-button type="text" size="large" @click="printTable('tableInfo')">[打印]</el-button>
            </td>
          </tr>
        </table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import treeComponent from "../../components/common/treeComponent";
import * as apiv from "@/api/videoManage";
import * as api from "@/api/trafficManage";
import BaiscInfoTable from "../../components/InfoTemplate";
export default {
  components: {
    treeComponent: treeComponent,
    BaiscInfoTable: BaiscInfoTable
  },
  data() {
    return {
      visible: false,
      filters: {
        vehiclesHolderName: null, //车主姓名
        vehiclesHolderCertID: null, //车主身份证
        vechiclesNumber: null, // 车牌号
        netGridID: null, // 所属网格
        page: 1,
        pageSize: 10
      },
      list: [
        {
          keyVehiclesID: "1", //
          vehiclesHolderCertID: "320683", //'车主身份证号',
          vehiclesHolderName: "张三", //'车主姓名',
          vechiclesNumber: "9889", //'车牌号码',
          vechiclesTypeValue: "02", //'车辆类型编码，具体待确认。',
          insuranceInf: "", //'保险情况',
          enterpriseUSCcode: "", //'如果登记在企业内，则填入企业统一社会信用代码；如果是个人，该字段留空',
          yearCheckInf: "", //'年检情况',
          netGridID: "茅山镇", //'登记地或所属企业地的所在网格号。',
          contact: "123213", //'联系方式，电话等',
          remarks: "" //varchar(500),
        }
      ],
      totalInfo: 0,
      props: {
        keyVehiclesID: "", //
        vehiclesHolderName: "", //'车主姓名',
        vehiclesHolderCertID: "", //'车主身份证号',
        vechiclesNumber: "", //'车牌号码',
        vechiclesTypeName: "", //'车辆类型编码，具体待确认。',
        netGridName: "", //'登记地或所属企业地的所在网格号。',
        contact: "" //'联系方式，电话等'
      },
      labels: [
        "编号",
        "所属单位/个人",
        "身份证号",
        "车牌号码",
        "车辆类型",
        "所属网格",
        "联系方式"
      ],
      form: {},
      label2: [
        "编号",
        "车辆持有人证件号码",
        "所属单位/个人",
        "车牌号码",
        "保险情况",
        "统一社会信用代码",
        "年检情况",
        "联系方式",
        "备注",
        "车辆类型",
        "所属网格"
      ],
      pic: null
    };
  },
  methods: {
    deleteCar(id) {
      this.$confirm("是否删除此车辆记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.deleteKeyVehicles(id).then(res => {
            if (res.data) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getCarInfo();
            } else {
              this.$message({
                type: "error",
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
    flushAll() {
      this.filters.vehiclesHolderName = this.filters.vehiclesHolderCertID = this.filters.vechiclesNumber = null;
      this.getCarInfo();
    },
    handleCurrentChange(val) {
      this.filters.page = val;
      this.getCarInfo();
    },
    ckDetail(id) {
      api.fetchDetailByID(id).then(res => {
        this.form = res.data.detail;
        this.pic = res.data.pictures;

        delete this.form["netGridID"];
        delete this.form["vechiclesTypeValue"];
        this.visible = true;
      });
    },
    addNewRecord() {
      this.$router.push("addKeyCar");
    },
    GetNodeValue(val) {
      this.filters.netGridID = val;
      this.getCarInfo();
    },
    editCar(id) {
      this.$router.push({
        path: "editKeyCar",
        query: {
          id: id
        }
      });
    },
    getCarInfo() {
      api.fetchVehiclesInfo(this.filters).then(res => {
        this.list = res.data.vos;
        this.totalInfo = res.data.page.totalCount;
      });
      this.filters.vehiclesHolderName = this.filters.vehiclesHolderCertID = this.filters.vechiclesNumber = null;
    },
    printTable(div) {
      var div_print = document.getElementById(div);
      var newStr = div_print.innerHTML;
      var oldStr = document.body.innerHTML;
      document.body.innerHTML = newStr;
      window.print();
      window.location.reload();
      window.body.innerHTML = oldStr;
      return false;
    }
  },
  mounted() {
    if (this.$store.getters.user.userRole != "超级管理员")
      this.filters.netGridID = this.$store.getters.user.netGridID;
    this.getCarInfo();
  }
};
</script>


<style scoped>
.userInfoEditTable,
.userInfoEditTable td {
  border: 1px solid darkgrey;
  padding: 10px;
}

.tb_label {
  width: 18%;
  text-align: right;
}
</style>



// WEBPACK FOOTER //
// src/views/trafficManage/KeyVehiclesManage.vue?63caaf3e