<template>
  <div>
      <el-row>
          <el-col :span="24" align="right">
              <div style="margin-top:10px">
                <el-button @click="addNewRecord" type="primary">添加队员信息</el-button>
                    <el-input style="width:200px" v-model="filters.name" placeholder="请输入姓名"></el-input>
                <el-select v-model="filters.processionID" placeholder="请选择所属队伍">
                   <el-option v-for="v of Processions" :key="v.id" :value="v.id" :label="v.processionName"></el-option>
                </el-select>
                <el-button type="primary" icon="search" @click="getProcessionPersonQuery()">搜索</el-button>
                <el-button type="primary" @click="flushAll">刷新</el-button>
              </div>
              <el-row style="margin-top:20px">
                  <el-col :span="24">
                      <el-table :data="list" border>
                          <el-table-column type="index"></el-table-column>
                          <el-table-column v-for="(v,k,i) in props" :key="i" :label="labels[i]" align="center">
                              <template scope="scope">
                                  <span  v-if="k!=='url'||k!='longitude'||k!=='latitude'" >
                                      {{scope.row[k]}}
                                  </span>
                              </template>
                          </el-table-column>
                          <el-table-column label="操作" align="center">
                              <template scope="scope">
                                  <el-button type="text" @click="ckDetail(scope.row.personID)">查看详情</el-button>
                                  <el-button type="text" @click="editProcession(scope.row.personID)">编辑</el-button>
                                  <el-button type="text" @click="deleteProcession(scope.row.personID)">删除</el-button>
                              </template>  
                          </el-table-column>
                      </el-table>
                  </el-col>
                  <el-col :span="24" style="margin-top:10px" align="right">
                      <el-pagination layout="prev, pager, next" :total="totalInfo" @current-change="handleCurrentChange">
                      </el-pagination>
                  </el-col>
              </el-row>
          </el-col>
      </el-row>
      <el-dialog  title="巡防队伍详细信息" :visible.sync="visible">
        <info-template :names="labels2" :hasimg="true" :imgUrl="imgUrl" :item="form"></info-template>
      </el-dialog>
  </div>
</template>

<script>
import infoTemplate from "../../components/InfoTemplate";
import * as api from "@/api/skynetManage";
export default {
  components: {
    infoTemplate
  },
  data() {
    return {
      visible: false,
      ProcessionType: [],
      form: {},
      filters: {
        name: "",
        processionID: "",
        page: 1,
        pageSize: 10
      },
      list: [{}],
      totalInfo: 0,
      props: {
        processionName: "", // bigint(20) DEFAULT NULL,
        name: "", // varchar(50) DEFAULT NULL,
        education: "", // char(2) DEFAULT NULL COMMENT '学历类型编码，编码应符合GB/T 4658',
        mobileTel: "", // varchar(18) DEFAULT NULL COMMENT '移动电话',
        presentAddressDetail: "" // varchar(200) DEFAULT NULL COMMENT '现住地门(楼)详细地址',
      },
      labels: ["所属队伍", "姓名", "学历", "移动电话", "现住地门(楼)详细地址"],
      labels2: [
        "编号",
        "所属队伍",
        "身份证号",
        "姓名",
        "性别",
        "出生日期",
        "民族",
        "籍贯",
        "政治面貌",
        "婚姻状况",
        "学历",
        "宗教信仰",
        "移动电话",
        "固定电话",
        "现住地",
        "现住地门(楼)详细地址"
      ],
      Processions: [],
      imgUrl: "",
    };
  },
  methods: {
    deleteProcession(id) {
      this.$confirm("是否删除此人员信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.deleteSPProcessionPerson(id).then(res => {
            if (res.data) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getProcessionPersonQuery();
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
      this.filters.name = this.filters.processionID = null;
      this.getProcessionPersonQuery();
    },
    handleCurrentChange(val) {
      this.filters.page = val;
      this.getProcessionPersonQuery();
    },
    ckDetail(id) {
      this.visible = true;
      api.getProcessionPersonDetail(id).then(res => {
        this.form = res.data.PersonBasic;
        this.imgUrl = res.data.PhotoPath;
      });
    },
    addNewRecord() {
      this.$router.push("add");
    },
    GetNodeValue(val) {
      this.filters.netGridID = val;
      this.getProcessionPersonQuery();
    },
    editProcession(id) {
      this.$router.push({ path: "edit", query: { id: id } });
    },
    getProcessionPersonQuery() {
      api.getProcessionPersonQuery(this.filters).then(res => {
        this.list = res.data.vos;
        this.totalInfo = res.data.page.totalCount;
      });
      this.filters.name = this.filters.processionID = null;
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
    this.getProcessionPersonQuery();
    api.getAllProcession().then(res => {
      this.Processions = res.data;
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

.MapTools{
  position: relative;
  top: 40px;
  left: 10px;
  z-index: 2000;
}
</style>



// WEBPACK FOOTER //
// src/views/skynet/skyperson.vue?1ef618c1