<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="margin-top:10px" align="right">
          <el-input style="width:200px" v-model="filters.name" placeholder="请输入事件名称"></el-input>
          <el-date-picker v-model="range" @change="change" type="daterange" placeholder="选择发生时间范围"></el-date-picker>

          <el-select v-model="filters.type" placeholder="请选择事件类型">
            <el-option
              v-for="(v,i) of AccidentKind"
              :key="i"
              :value="v.trafficAccidentKind"
              :label="v.trafficAccidentKindName"
            ></el-option>
          </el-select>
          <el-button type="primary" icon="search" @click="getInfo">搜索</el-button>
          <el-button type="primary" @click="flushAll">刷新</el-button>
        </div>
        <el-row style="margin-top:20px" :gutter="20">
          <el-col :span="$store.getters.user.userRole=='超级管理员'?2:0">
            <treeComponent @GetNodeValue="GetNodeValue"></treeComponent>
          </el-col>
          <el-col :span="$store.getters.user.userRole=='超级管理员'?22:24">
            <el-table :data="list" border>
              <el-table-column
                v-for="(v,k,i) in props"
                :key="v.id"
                :label="labels[i]"
                align="center"
              >
                <template scope="scope">
                  <span v-if="k==='sex'">{{scope.row[k]==1?'男':'女'}}</span>
                  <span v-else>{{scope.row[k]}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200" align="center">
                <template scope="scope">
                  <el-button
                    size="small"
                    v-if="scope.row.trafficAccidentStatusTypeValue=='06'||scope.row.trafficAccidentStatusTypeValue=='08'"
                    type="primary"
                    @click="eventReview(scope.row.trafficAccidentID)"
                  >审核事件</el-button>
                  <el-button type="text" @click="ckDetail(scope.row.trafficAccidentID)">查看详情</el-button>
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
    <el-dialog title="事件审核" :visible.sync="visible">
      <el-form :model="form" label-width="220px">
        <el-form-item label="受理人" style="width:600px">
          <el-input disabled v-model="form.checkedUserID" placeholder></el-input>
        </el-form-item>
        <el-form-item label="审核时间">
          <el-date-picker v-model="form.checkedTime" placeholder></el-date-picker>
        </el-form-item>
        <el-form-item label="审核结果">
          <el-radio-group v-model="form.checkedResult">
            <el-radio :label="1">通过</el-radio>
            <el-radio :label="0">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" style="width:600px">
          <el-input type="textarea" v-model="form.remark" placeholder></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="success()">确认</el-button>
          <el-button type="warning" @click="visible = false">取消审核</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog top="5%" title="查看详情" :visible.sync="visible2">
      <info :id="id"></info>
    </el-dialog>
  </div>
</template>

<script>
import treeComponent from "../../components/common/treeComponent";
import * as api from "../../api/trafficManage";
import info from "./trafficEventInfo";

export default {
  components: {
    treeComponent: treeComponent,
    info: info
  },
  data() {
    return {
      visible: false,
      visible2: false,
      id: "",
      filters: {
        id: 5,
        name: null,
        type: null,
        netGridID: null,
        begin: null,
        end: null,
        page: 1,
        pageSize: 10
      },
      range: [],
      form: {
        eventID: "", //,
        checkedUserID: 5, //        bigint,
        checkedTime: "", //          datetime,
        checkedResult: "", //        int,
        remark: "" //              varchar(500),
      },
      AccidentType: [],
      AccidentKind: [],
      EventStatus: [],
      list: [
        {
          trafficAccidentID: "", //bigint not null auto_increment,
          trafficAccidentName: "", //事故名称
          trafficAccidentKind: "", //  int comment '交通事故性质，编码待定',
          trafficAccidentTypeValue: "", // char(2) comment '交通事故类型，待定',
          trafficAccidentContent: "", // varchar(1000) comment '交通事故内容描述',
          trafficAccidentStartDateTime: "", // datetime comment '交通事故开始时间',
          trafficAccidentEndDateTime: "", // datetime comment '交通事故结束时间',
          trafficAccidentHappenLongitude: "", // double(32,8) comment '交通事故发生地 地理经度信息',
          trafficAccidentHappenLatitude: "", // double(32,8) comment '交通事故发生地  地理纬度信息',
          trafficAccidentStatusTypeValue: "", // char(2) comment '当前交通事故处理的最新状态',
          currentRemarks: "", //       varchar(1000) comment '当前处理交通事故备注',
          currentResponsiblePersonCertID: "", // char(18) comment '当前经办人员身份证号',
          currentResponsiblePersonName: "", // varchar(50) comment '当前经办人员姓名',
          currentResponsiblePersonContact: "", // varchar(50) comment '经办人员联系方式',
          netGridID: "" //            bigint comment '事故发生地所属网格区域',
        }
      ],
      totalInfo: 0,
      props: {
        trafficAccidentName: "", //事故名称
        trafficAccidentKindName: "", //  int comment '交通事故性质，编码待定',
        trafficAccidentTypeName: "", //          '事件类型，如杀人、放火、抢劫等',
        trafficAccidentStatusTypeName: "", // char(2) comment '当前交通事故处理的最新状态',
        trafficAccidentStartDateTime: "",
        netGridName: "" //所属网格
      },
      labels: [
        "事件名称",
        "事件性质",
        "事件类型",
        "事件处理状态",
        "发生日期",
        "所属网格"
      ]
    };
  },
  methods: {
    success() {
      let type = this.form.checkedResult == 1 ? "07" : "08";
      api.addTrafficAccidentChecked(this.form).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "审核信息上传成功!"
          });
          api.updateTrafficAccidentStatus(type, this.form.eventID).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "事件审核更新成功!"
              });
              this.getInfo();
              this.visible = false;
            } else {
              this.$message({
                type: "error",
                message: "事件审核更新失败!"
              });
            }
          });
        }
      });
    },
    eventReview(id) {
      this.form.eventID = id;
      this.visible = true;
    },
    change(value) {
      if (value.length > 0) {
        let arr = value.split(" - ");
        this.filters.begin = arr[0];
        this.filters.end = arr[1];
      } else {
        this.filters.begin = null;
        this.filters.end = null;
      }
    },
    flushAll() {
      this.filters.name = this.filters.type = null;
      this.filters.begin = this.filters.end = null;
      this.range = [];
      if (this.$store.getters.user.userRole == "超级管理员") {
        this.filters.netGridID = null;
      }
      this.getInfo();
    },
    handleCurrentChange(val) {
      this.filters.page = val;
      this.getInfo();
    },
    ckDetail(id) {
      this.id = id;
      this.visible2 = true;
    },
    addNewRecord() {
      this.$router.push("add");
    },
    GetNodeValue(val) {
      this.filters.netGridID = val;
      this.getInfo();
    },
    editEvent(id) {
      this.$router.push({ path: "editReview", query: { id: id } });
    },
    getInfo() {
      api.getTrafficAccidentAuditorQuery(this.filters).then(res => {
        this.list = res.data.vos;
        this.totalInfo = res.data.page.totalCount;
      });
      // this.filters.name = this.filters.type = null;
    }
  },
  mounted() {
    this.form.checkedUserID = this.$store.getters.user.userID;
    this.filters.id = this.$store.getters.user.userID;
    if (this.$store.getters.user.userRole != "超级管理员")
      this.filters.netGridID = this.$store.getters.user.netGridID;
    this.getInfo();
    api.fetchTrafficCodes().then(res => {
      this.AccidentType = res.data.AccidentType;
      this.AccidentKind = res.data.AccidentKind;
      this.EventStatus = res.data.AccidentStatusType;
    });
  }
};
</script>


<style scoped>
</style>



// WEBPACK FOOTER //
// src/views/trafficManage/eventReview.vue?f5c8f338