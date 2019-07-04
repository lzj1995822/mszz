<template>
  <div>
    <el-row>
      <el-col :span="24" style="margin-bottom:10px;text-align:right">
        <el-button type="primary" @click="add">
          <i class="fa fa-plus"></i>
          添加配置
        </el-button>
        <el-input v-model="query.name" clearable style="width:200px" placeholder="请输入网格名"></el-input>
        <el-button type="primary" @click="getInfo">查询</el-button>
        <el-button type="primary" @click="flush">刷新</el-button>
      </el-col>
      <el-col :span="24">
        <el-table border :data="list">
          <el-table-column type="index" width="60" align="center"></el-table-column>
          <el-table-column v-for="(v,i) in props" :key="i" :label="v.n" :prop="v.v" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template scope="scope">
              <el-button type="text" @click="edit(scope.row)">编辑</el-button>
              <el-button type="text" @click="del(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" style="margin-top:10px;text-align:right">
        <el-pagination @current-change="handleCurrentChange" small layout="prev, pager, next" :total="total"></el-pagination>
      </el-col>
    </el-row>
    <el-dialog :title="title" :visible.sync="visible">
      <el-form ref="forms" :rules="rules" :model="form" label-suffix=":" label-width="120px">
        <el-form-item label="网格员名称" prop="netGridMemberName">
          <el-select
            style="width:300px"
            v-model="form.netGridMemberName"
            clearable
            filterable
            placeholder="请搜索"
          >
            <el-option
              v-for="item in options"
              :key="item.username"
              :label="item.userName+'  '+item.dept+'->'+item.realName"
              :value="item.userName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-time-picker
            v-model="form.startTime"
            :picker-options="{
                selectableRange: '00:00:00 - 23:00:00'
            }"
            placeholder="开始时间"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-time-picker
            v-model="form.endTime"
            :picker-options="{
                selectableRange: '00:00:00 - 23:00:00'
            }"
            placeholder="结束时间"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-if="title=='添加轨迹配置'" @click="save">添加</el-button>
          <el-button type="primary" v-else @click="update">保存</el-button>
          <el-button type="warning" @click="visible=false,$refs['forms'].resetFields()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import * as api from "@/api/netGridManage";
import { formatTimeX,formatDateTime } from "@/utils/index.js";
export default {
  data() {
    return {
      props: [
        { n: "网格员名称", v: "netGridMemberName" },
        { n: "开始时间", v: "startTime" },
        { n: "结束时间", v: "endTime" },
        { n: "所属网格", v: "netGridName" },
        { n: "备注", v: "remark" }
      ],
      form: {
        netGridMemberName: "", //网格员名称
        startTime: "",
        endTime: "",
        remark: ""
      },
      list: [],
      total: 10,
      visible: false,
      query: {
        name: null,
        page: 1,
        pageSize: 10
      },
      rules: {},
      options: [],
      title: "",
      row: {}
    };
  },
  methods: {
    handleCurrentChange(val){
      this.query.page = val;
      this.getInfo();
    },
    edit(row) {
      this.row = row;
      this.form = { ...this.row };
      let sh = this.form.startTime.split(':')[0]; 
      let sm = this.form.startTime.split(':')[1]; 
      let ss = this.form.startTime.split(':')[2]; 
      let eh = this.form.endTime.split(':')[0]; 
      let em = this.form.endTime.split(':')[1]; 
      let es = this.form.endTime.split(':')[2]; 
      this.form.startTime = new Date(1970,1,1,sh,sm,ss);
      this.form.endTime = new Date(1970,1,1,eh,em,es);
      this.title = "更新轨迹配置";
      this.visible = true;
    },
    async del(id) {
      this.$confirm("确认删除此配置吗？", "是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await api.deleteNetGridMemberTrailConfig(id);
          this.getInfo();
          this.$refs['forms'].resetFields();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async update() {
      let form = { ...this.form };
      let { data } = await api.updateNetGridMemberTrailConfig(form);
      if (data == true) {
        this.$message({
          message: "更新成功！",
          type: "success"
        });
        this.visible = false;
        this.$refs['forms'].resetFields();
        this.getInfo();
      } else {
        this.$message({
          message: "更新失败！",
          type: "error"
        });
      }
    },
    async save() {
      delete this.form['id'];
      let form = { ...this.form };
      let { data } = await api.addNetGridMemberTrailConfig(form);
      if (data == true) {
        this.$message({
          message: "添加成功！",
          type: "success"
        });
        this.visible = false;
        this.$refs['forms'].resetFields();
        this.getInfo();
      } else {
        this.$message({
          message: "添加失败！",
          type: "error"
        });
      }
    },
    add() {
      this.title = "添加轨迹配置";
      this.visible = true;
      this.$refs['forms'].resetFields();
    },
    async getInfo() {
      let { data } = await api.getAllMemberConfig(this.query);
      this.list = data.list;
      this.total = data.total;
    },
    async flush() {
      this.query.name = "";
      this.getInfo();
    },
    async getUserForMember() {
      let { data } = await api.getUserForNetGridMember();
      this.options = data.list;
    },
    initRules() {
      Object.keys(this.form).forEach(key => {
        if (key == "netGridMemberName")
          this.rules[key] = [
            { required: true, message: "内容不得为空!", trigger: "blur" }
          ];
        else if (key == "startTime" || key == "endTime") {
          this.rules[key] = [
            {
              type: "date",
              required: true,
              message: "内容不得为空!",
              trigger: "blur"
            }
          ];
        }
      });
    }
  },
  mounted() {
    this.initRules();
    this.getInfo();
    this.getUserForMember();
  }
};
</script>


// WEBPACK FOOTER //
// src/views/netManage/netMemberOrbit.vue?855029e6