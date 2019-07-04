<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="margin-top:10px;text-align:right">
          <el-input style="width:200px" v-model="filters.eventName" placeholder="事件名称"></el-input>
          <el-date-picker v-model="range" @change="change" type="daterange" placeholder="选择发生时间范围"></el-date-picker>
          <el-select style="width:200px" v-model="filters.eventTypeValue" placeholder="事件类型">
            <el-option
              v-for="(v,i) of EventType"
              :key="i"
              :label="v.eventTypeName"
              :value="v.eventTypeValue"
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
              <el-table-column type="index" width="50"></el-table-column>
              <el-table-column prop="eventName" label="事件名称" align="center"></el-table-column>
              <el-table-column prop="eventPlace" label="发生地点" align="center"></el-table-column>
              <el-table-column prop="netGridName" label="所属网格" align="center"></el-table-column>
              <el-table-column prop="evenScaleTypeName" label="事件规模" align="center"></el-table-column>
              <el-table-column prop="eventTypeName" label="事件类型" align="center"></el-table-column>
              <el-table-column prop="eventDate" label="发生时间" align="center"></el-table-column>
              <el-table-column prop="eventStatusName" label="事件处理状态" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
                <template scope="scope">
                  <el-button
                    type="warning"
                    v-if="scope.row.eventStatus=='04'"
                    size="small"
                    @click="eventUp(scope.row.disputeEventID)"
                  >事件指派</el-button>
                  <el-button type="text" @click="ckDetail(scope.row.disputeEventID)">查看详情</el-button>
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
    <el-dialog title="事件派发" :visible.sync="visible">
      <fieldset style="width:625px;margin-left:160px;margin-bottom:20px">
        <legend>检索负责人</legend>
        <div style="margin-top:20px">
          <el-input
            v-model="filter.key"
            style="width:450px"
            placeholder="请输入负责人查询信息(输入姓名、身份证、电话、部门均可)"
          ></el-input>
          <el-button type="primary" @click="search">查询</el-button>
        </div>
      </fieldset>
      <fieldset style="width:500px;margin-left:160px;margin-bottom:20px">
        <legend>事件派发单</legend>
        <el-form :model="form" ref="form" label-width="80px" :rules="rules">
          <el-form-item label="派发者ID" style="width:600px" prop="userID">
            <el-input disabled v-model="form.userID" placeholder></el-input>
          </el-form-item>
          <el-form-item label="负责人" style="width:600px">
            <el-input disabled v-model="result.nameB" placeholder></el-input>
          </el-form-item>
          <el-form-item label="开始时间" prop="startTime">
            <el-date-picker v-model="form.startTime" placeholder></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker v-model="form.endTime" placeholder></el-date-picker>
          </el-form-item>
          <el-form-item label="备注" style="width:600px">
            <el-input type="textarea" v-model="form.remark" placeholder></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="paifa('form')">派发</el-button>
          </el-form-item>
        </el-form>
      </fieldset>
    </el-dialog>

    <el-dialog title="检索结果" :visible.sync="dialogVisible">
      <div>
        <el-table :data="memberInfo" border>
          <el-table-column prop="userID" label="编号"></el-table-column>
          <el-table-column prop="realName" label="真实姓名"></el-table-column>
          <el-table-column prop="certID" label="身份证"></el-table-column>
          <el-table-column prop="dept" label="所属部门"></el-table-column>
          <el-table-column label="选择">
            <template scope="scope">
              <input
                @click="selectMember(scope.row.realName,scope.row.userID)"
                type="radio"
                name="check"
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog top="5%" title="查看详情" :visible.sync="visible2">
      <info :id="id"></info>
    </el-dialog>
  </div>
</template>

<script>
import treeComponent from "../../components/common/treeComponent";
import * as api from "@/api/contradictionManage/index";
import * as api2 from "../../api/securityManage";
import * as api3 from "@/api/zonghezhili/duiwujianshe";
import * as socket from "@/api";
import info from "./checkDetail";

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
      dialogVisible: false,
      AccidentType: [],
      AccidentKind: [],
      EventStatus: [],
      filters: {
        id: 3,
        eventName: null, // 事件名称
        majorPersonName: null, // 主要当事人
        eventTypeValue: null,
        netGridID: null,
        begin:null,
        end:null,
        page: 1,
        pageSize: 10
      },
      result: {
        nameA: "",
        nameB: ""
      },
      filter: {
        key: ""
      },
      rules: {
        acceptedUserID: [
          {
            required: true,
            message: "请输搜索负责人",
            trigger: "change"
          }
        ]
      },
      memberInfo: [
        {
          //
        }
      ],
      currentID: "",
      form: {
        eventID: "",
        userID: 3, //        '派发任务的人的ID',
        acceptedUserID: "", // '接受任务人的用户ID号',
        startTime: "", //       datetime,
        endTime: "", //              datetime,
        remark: "", //               varchar(1000),
        intent: 1
      },
      list: [
        {
          disputeEventID: "", //       bigint not null auto_increment,
          eventName: "", //             '事件名称',
          eventDate: "", //             '事件发生日期',
          eventPlace: "", //            '事件发生地点',
          evenScaleTypeValue: "", //    '事件规模',
          eventTypeValue: "", //        '事件类型编码',
          numberofJoinning: "", //      '涉及人数',
          eventIntroduction: "", //     '事件简述，不超2000字',
          relatedOrg: "", //            '涉及单位',
          majorPersonCertTypeCode: "", //'主要当事人证件代码类型，编码规范GA/T 517',
          majorPersonCertID: "", //     '主要当事人证件号码',
          majorPersonName: "", //       char(80),
          majorPersonSex: "", //        '主要当事人性别，编码符合GB/T 2261.1',
          majorPersonEthnicity: "", //  '主要当事人名族类别，详细见字典表',
          majorPersonEducation: "", //  '主要当事人学历类别，编码见表',
          majorPersonType: "", //       '主要当事人人员类别',
          majorPersonDetailAddress: "", //  '主要当事人居住详细地址',
          solvingDeadline: "", //      '化解时限',
          solvingMethodType: "", //    '化解方式，编码见 GBT 31000-2015文件之5.58',
          solvingManagment: "", //     '化解组织',
          solvingByPersonName: "", //   '化解责任人姓名',
          solvingByPersonContact: "", //'化解责任人联系方式，手机号或固定电话',
          isSuccessInSolving: "", //   '化解是否成功？值1表示成功，0表示不成功。',
          solvingIntroduction: "", //  '化解情况，不超2000字',
          evaluationDate: "", //       '考评日期，格式为YYYYMMDD',
          evaluationSuggestion: "", // '考评意见，不超2000字。',
          longitude: "", //            '地理经度信息，数字32，8',
          latitude: "", //             '地理纬度信息',
          eventStatus: "", //          '事件处理状态编码类型，见编码状态类型表',
          eventCheckStatus: "",
          netGridID: 1
        }
      ],
      totalInfo: 0,
      tempId: null,
      EventType: [],
      range: []
    };
  },
  methods: {
    search() {
      this.dialogVisible = true;
      api2.getUserInfoByKey(this.filter.key).then(res => {
        this.memberInfo = res.data;
      });
    },
    selectMember(n, id) {
      this.result.nameB = n;
      this.tempId = id;
    },
    cancel() {
      this.form.acceptedUserID = this.tempId = null;
      this.dialogVisible = false;
    },
    sure() {
      this.form.acceptedUserID = this.tempId;
      this.dialogVisible = false;
    },
    eventUp(id) {
      this.currentID = id;
      this.visible = true;
    },
    paifa(formName) {
      this.form.eventID = this.currentID;
      if (
        this.form.acceptedUserID !== "" &&
        this.form.acceptedUserID !== null
      ) {
        this.$confirm("是否确认派发此事件,是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            api.addDisputeEventDistribute(this.form).then(res => {
              if (res.code == 200) {
                api
                  .updateDisputeEventStatus("05", this.form.eventID)
                  .then(res => {
                    if (res.code == 200) {
                      this.$message({
                        type: "success",
                        message: "派发成功！"
                      });
                      this.visible = false;
                      this.form = {
                        eventID: "",
                        userID: 3, //        '派发任务的人的ID',
                        acceptedUserID: "", // '接受任务人的用户ID号',
                        startTime: "", //       datetime,
                        endTime: "", //              datetime,
                        remark: "", //               varchar(1000),
                        intent: 1
                      };
                      this.form.userID = this.$store.getters.user.userID;
                      let that = this;
                      this.getInfo();
                    } else {
                      this.$message({
                        type: "error",
                        message: "派发失败"
                      });
                    }
                  });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消派发"
            });
          });
      }
    },
    flushAll() {
      this.filters.eventName = this.filters.eventTypeValue = null;
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
      this.$router.push({
        path: "editPaifa",
        query: {
          id: id
        }
      });
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
    getInfo() {
      api.getDisputeEventDeptDespatcherQuery(this.filters).then(res => {
        this.list = res.data.disputeEvents;
        this.totalInfo = res.data.page.totalCount;
      });
      this.filters.eventName = this.filters.eventTypeValue = null;
    }
  },
  mounted() {
    this.form.userID = this.$store.getters.user.userID;
    this.filters.id = this.$store.getters.user.userID;
    if (this.$store.getters.user.userRole != "超级管理员")
      this.filters.netGridID = this.$store.getters.user.netGridID;
    this.getInfo();
    api3.fetchServedPersonManageTypes().then(res => {
      this.EventType = res.data.codeEventType;
    });
  }
};
</script>


<style scoped>
</style>



// WEBPACK FOOTER //
// src/views/contradictionManage/eventSelect.vue?64a19085