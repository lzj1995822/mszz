<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="margin-top:10px" align="right">
          <el-input style="width:200px" v-model="filters.name" placeholder="请输入事件名称"></el-input>
          <el-date-picker v-model="range" @change="change" type="daterange" placeholder="选择发生时间范围"></el-date-picker>
          <el-select v-model="filters.type" placeholder="请选择事件类型">
            <el-option :value="1" label="一般事件"></el-option>
            <el-option :value="2" label="重大事件"></el-option>
          </el-select>
          <!-- <el-select v-model="filters.status" placeholder="请输入事件处理状态">
                  <el-option v-for="(v,i) of EventStatus" :key="i" :label="v.sseventStatusTypeName" :value="v.sseventStatusTypeValue"></el-option>
          </el-select>-->
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
              <el-table-column label="操作" align="center">
                <template scope="scope">
                  <el-button
                    type="warning"
                    v-if="scope.row.spEventStatusTypeValue=='04'"
                    size="small"
                    @click="eventUp(scope.row.spEventID)"
                  >事件指派</el-button>
                  <el-button type="text" @click="ckDetail(scope.row.spEventID)">查看详情</el-button>
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
import * as api from "../../api/skynetManage";
import * as api2 from "../../api/securityManage";
import * as socket from "@/api";
import info from "./eventInfo";

export default {
  components: {
    treeComponent: treeComponent,
    info: info
  },
  data() {
    return {
      EventStatus: [],
      visible: false,
      visible2: false,
      id: "",
      dialogVisible: false,
      filters: {
        id: 3,
        name: null,
        type: null,
        status: null,
        netGridID: null,
        begin: null,
        end: null,
        page: 1,
        pageSize: 10
      },
      range: [],
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
        spEventID: "",
        userID: 3, //        '派发任务的人的ID',
        acceptedUserID: "", // '接受任务人的用户ID号',
        startTime: "", //       datetime,
        endTime: "", //              datetime,
        remark: "", //               varchar(1000),
        intent: 1
      },
      list: [
        {
          spEventID: "", //bigint not null auto_increment,
          spEventName: "", //'事件名称',
          spEventKind: "", //'事件性质，如1=一般事件；2=重大事件；等',
          spEventTypeValue: "", //'事件类型，如杀人、放火、抢劫等',
          spEventContent: "",
          spEventStartDateTime: "",
          spEventEndDateTime: "",
          spEventHappenLongitude: "", //'地理经度信息',
          spEventHappenLatitude: "", //'地理纬度信息',
          spEventStatusTypeValue: "", //'当前事件处理的最新状态',
          currentRemarks: "",
          currentResponsiblePersonCertID: "", //'当前经办人员身份证号',
          currentResponsiblePersonName: "", //'当前经办人员姓名',
          currentResponsiblePersonContact: "", //'经办人员联系方式',
          netGridID: ""
        }
      ],
      totalInfo: 0,
      props: {
        spEventID: "", //bigint not null auto_increment,
        spEventName: "", //'事件名称',
        spEventTypeName: "", //'事件类型，如杀人、放火、抢劫等',
        spEventStatusTypeName: "",
        spEventStartDateTime: "",
        netGridName: ""
      },
      labels: [
        "编号",
        "事件名称",
        "事件类型",
        "当前事件处理状态",
        "发生日期",
        "所属网格"
      ],
      tempId: null
    };
  },
  methods: {
    search() {
      this.dialogVisible = true;
      api.getUserInfoByKey(this.filter.key).then(res => {
        this.memberInfo = res.data;
      });
    },
    selectMember(n, id) {
      this.result.nameB = n;
      this.tempId = id;
    },
    eventLiAn(type, id) {
      let m =
        type == "03"
          ? "事件成功！等待派发！"
          : "事件取消立案，等待上报人处理。";
      api.changeSPEventStatus(type, id).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: m
          });
          this.getInfo();
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
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
      this.form.spEventID = this.currentID;
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
            api.insertSPEventDistribute(this.form).then(res => {
              if (res.code == 200) {
                api.changeSPEventStatus("05", this.form.spEventID).then(res => {
                  if (res.code == 200) {
                    this.$message({
                      type: "success",
                      message: "派发成功！"
                    });
                    this.form = {
                      spEventID: "",
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
                    this.visible = false;
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
    deleteEvent(id) {
      this.$confirm("是否删除此事件记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.deleteSPEvent(id).then(res => {
            if (res.data) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getInfo();
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
      this.filters.name = this.filters.type = this.filters.status = null;
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
    getInfo() {
      api.getSPEventDeptDespatcherQuery(this.filters).then(res => {
        this.list = res.data.list;
        this.totalInfo = res.data.page.totalCount;
      });
      // this.filters.name = this.filters.type = this.filters.status = null;
    }
  },
  mounted() {
    this.filters.id = this.$store.getters.user.userID;
    this.form.userID = this.$store.getters.user.userID;
    if (this.$store.getters.user.userRole != "超级管理员")
      this.filters.netGridID = this.$store.getters.user.netGridID;
    this.getInfo();
    api2.getSSEventCode().then(res => {
      this.EventStatus = res.data.EventStatusType;
    });
  }
};
</script>


<style scoped>
</style>



// WEBPACK FOOTER //
// src/views/skynet/eventSelect.vue?d5f27ee6