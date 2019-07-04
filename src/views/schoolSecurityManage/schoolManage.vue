<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="margin-top:10px" align="right">
          <el-button @click="addNewRecord" type="primary">添加校园信息</el-button>
          <el-input style="width:200px" v-model="filters.name" placeholder="请输入校园名称"></el-input>
          <el-select v-model="filters.type" placeholder="请输入办学类型">
            <el-option
              v-for="(v,i) in SchoolType"
              :key="i"
              :value="v.schoolRunningTypeValue"
              :label="v.schoolRunningTypeName"
            ></el-option>
          </el-select>
          <el-button type="primary" icon="search" @click="getSchoolInfo">搜索</el-button>
          <el-button type="primary" @click="flushAll">刷新</el-button>
        </div>
        <el-row style="margin-top:20px">
          <el-col :span="$store.getters.user.userRole=='超级管理员'?3:0">
            <treeComponent style="margin-top:-52px" @GetNodeValue="GetNodeValue"></treeComponent>
          </el-col>
          <el-col :span="$store.getters.user.userRole=='超级管理员'?21:24">
            <el-table :data="list" border>
              <el-table-column v-for="(v,k,i) in props" :key="i" :label="labels[i]" align="center">
                <template scope="scope">
                  <span v-if="k!=='url'||k!='longitude'||k!=='latitude'">{{scope.row[k]}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template scope="scope">
                  <el-button type="text" @click="ckDetail(scope.row.id)">查看详情</el-button>
                  <el-button type="text" @click="editSchool(scope.row.id)">编辑</el-button>
                  <el-button type="text" @click="deleteSchool(scope.row.id)">删除</el-button>
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
    <el-dialog title="校园详细信息" :visible.sync="visible">
      <div id="table">
        <table
          class="userInfoEditTable"
          style="border-collapse:collapse;background-color:white;"
          width="100%"
          cellspacing="0"
        >
          <tr v-for="(v,k,i) in form" :key="i">
            <td class="tb_label">{{labels2[i]}}</td>
            <td>
              <span v-if="k=='sex'">{{v==1?'男':'女'}}</span>
              <span v-else>{{v}}</span>
            </td>
          </tr>
          <tr>
            <td colspan="2" align="center">
              <el-button type="text" size="large" @click="printTable('table')">[打印]</el-button>
              <el-button type="text" size="large" @click="visible=false">[关闭]</el-button>
            </td>
          </tr>
        </table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import treeComponent from "../../components/common/treeComponent";
import * as api from "@/api/schoolManage";
export default {
  components: {
    treeComponent: treeComponent
  },
  data() {
    return {
      visible: false,
      SchoolType: [],
      form: {},
      filters: {
        name: null,
        type: null,
        netGridID: null,
        page: 1,
        pageSize: 10
      },
      list: [
        {
          id: "", //
          schoolName: "", //'学校名称',
          schoolAddress: "", //'学校地址',
          schoolOrganizationCode: "", //'组织机构代码',
          schoolRegionalismCode: "", //'学校行政区划代码',
          schoolRunningType: "", //'学校办学类型',
          schoolNature: "", // 学校性质
          schoolSuperior: "", //'学校所属主管教育行政部门',
          stuNumbers: "", //'在校学生人数',
          principalCertID: "", //校长身份证号码
          principalName: "", //'校长姓名',
          principalContact: "", // '校长联系方式',
          branchSecurityName: "", // '分管安全保卫责任人姓名',
          branchSecurityContact: "", //'分管安全保卫责任人联系方式',
          securityName: "", // '安全保卫责任人姓名',
          securityContact: "", // '安全保卫责任人联系方式',
          policeName: "", // '治安责任人姓名',
          policeContact: "", // '治安责任人联系方式',
          securityNumbers: "", // '安全保卫人数',
          schoolLongitude: "", //'经度',
          schoolLatitude: "", //'纬度',
          netGridID: "" // '网格'
        }
      ],
      totalInfo: 0,
      props: {
        schoolName: "", //'学校名称',
        schoolAddress: "", //'学校地址',
        schoolRunningTypeName: "", //'学校办学类型',
        schoolSuperior: "", //'学校所属主管教育行政部门',
        stuNumbers: "", //'在校学生人数',
        principalName: "", //'校长姓名',
        principalContact: "" // '校长联系方式',
      },
      labels: [
        "学校名称",
        "学校地址",
        "学校办学类型",
        "学校所属主管教育行政部门",
        "在校学生人数",
        "校长姓名",
        "校长联系方式"
      ],
      labels2: [
        "编号",
        "学校名称",
        "组织机构代码",
        "学校行政区划代码",
        "学校地址",
        "学校办学类型",
        "学校性质",
        "学校所属主管教育行政部门",
        "在校学生人数",
        "校长身份证",
        "校长姓名",
        "校长联系方式",
        "分管安全保卫责任人姓名",
        "分管安全保卫责任人联系方式",
        "安全保卫责任人姓名",
        "分管安全保卫责任人联系方式",
        "治安责任人姓名",
        "治安责任人联系方式",
        "安全保卫人数",
        "经度",
        "纬度",
        "网格"
      ],
      SchoolNature: [
        { value: 1, type: "公办" },
        { value: 2, type: "民办" },
        { value: 9, type: "其他" }
      ]
    };
  },
  methods: {
    deleteSchool(id) {
      this.$confirm("是否删除此校园信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.deleteSchool(id).then(res => {
            if (res.data) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getSchoolInfo();
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
      this.filters.name = this.filters.type = this.filters.netGridID = null;
      this.getSchoolInfo();
    },
    handleCurrentChange(val) {
      this.filters.page = val;
      this.getSchoolInfo();
    },
    ckDetail(id) {
      this.visible = true;
      api.getSchoolDetail(id).then(res => {
        this.form = res.data;
        this.form.schoolNature = this.SchoolNature.filter(item => {
          if (item.value == this.form.schoolNature) {
            return item;
          }
        })[0].type;

        this.form = JSON.parse(JSON.stringify(this.form));
      });
    },
    addNewRecord() {
      this.$router.push("addSchool");
    },
    GetNodeValue(val) {
      this.filters.netGridID = val;
      this.getSchoolInfo();
    },
    editSchool(id) {
      this.$router.push({ path: "editSchool", query: { id: id } });
    },
    getSchoolInfo() {
      api.getSchoolQuery(this.filters).then(res => {
        this.list = res.data.vos;
        this.totalInfo = res.data.page.totalCount;
      });
      this.filters.name = this.filters.type = this.filters.netGridID = null;
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
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.getSchoolInfo();
    api.getSchoolCode().then(res => {
      this.SchoolType = res.data.SchoolRunningType;
    });
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
  width: 20%;
  text-align: right;
}
</style>



// WEBPACK FOOTER //
// src/views/schoolSecurityManage/schoolManage.vue?57a5de78