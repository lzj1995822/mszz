<template>
  <div>
    <el-row>
      <el-col :span="24" align="right">
        <div style="margin-top:10px">
          <el-button @click="addNewRecord" type="primary">添加用户</el-button>
          <el-input style="width:200px" v-model="filters.key" placeholder="请输入信息"></el-input>
          <el-button type="primary" icon="search" @click="getUserInfo">搜索</el-button>
          <el-button type="primary" @click="flushAll">刷新</el-button>
        </div>
        <el-row style="margin-top:20px">
          <el-col :span="24">
            <el-table border  :data="list">
              <el-table-column type="index" width="90" align="center"></el-table-column>
              <el-table-column v-for="(v,k,i) in props" :key="i" :label="labels[i]" align="center">
                <template scope="scope">
                  {{scope.row[k]}}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200" align="center">
                <template scope="scope">
                  <el-button type="text" @click="editUsers(scope.row)">编辑</el-button>
                  <el-button type="text" @click="deleteUser(scope.row.userID)">删除</el-button>
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
    <el-dialog size="tiny" title="添加用户" :visible.sync="visible">
      <el-form :model="item" :rules="rules" ref="form" label-width="100px" label-suffix=":">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="item.userName" style="width:300px" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="item.password" style="width:300px"  placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="item.realName" style="width:300px"  placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="所属网格">
          <el-select v-model="item.netGridID">
            <el-option v-for="(v,i) in NetGrid" :key="i" :value="v.netGridID" :label="v.netGridName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="item.roleID">
            <el-option v-for="(v,i) in AllRole" :key="i" :value="v.roleID" :label="v.roleName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="item.certID" style="width:300px"  placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="item.mobileTel" style="width:300px"  placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-input v-model="item.dept" style="width:300px"  placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="reset">重置</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog size="tiny" title="编辑用户" :visible.sync="visible2" @close="closeDialog()">
       <el-form :model="editUser" :rules="rules2" ref="form" label-width="100px" label-suffix=":">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="editUser.userName" style="width:300px" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="editPassWord" style="width:300px"  placeholder="输入新密码(默认不修改)"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="editUser.realName" style="width:300px"  placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="所属网格">
            <el-select v-model="editUser.netGridID">
            <el-option v-for="(v,i) in NetGrid" :key="i" :value="v.netGridID" :label="v.netGridName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色">
           <el-select v-model="editUser.roleID">
            <el-option v-for="(v,i) in AllRole" :key="i" :value="v.roleID" :label="v.roleName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="editUser.certID" style="width:300px"  placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="editUser.mobileTel" style="width:300px"  placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-input v-model="editUser.dept" style="width:300px"  placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="update">更新</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import * as api from "@/api/systemManage";
import * as api2 from "@/api/zonghezhili/duiwujianshe";
export default {
  data() {
    return {
      visible: false,
      visible2: false,
      filters: {
        key: null,
        page: 1,
        pageSize: 10
      },
      editPassWord: null,
      list: [],
      totalInfo: 0,
      item: {
        userName: "",
        password: "",
        realName: "",
        netGridID: "",
        roleID: "",
        certID: "",
        mobileTel: "",
        dept: ""
      },
      editUser: {},
      NetGrid: [],
      AllRole: [],
      props: {
        userName: "",
        realName: "",
        certID: "",
        mobileTel: "",
        userRole: "",
        dept: ""
      },
      labels: ["用户名", "真实姓名", "身份证", "手机号", "角色", "所属部门"],
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      rules2: {
        userName: [{ required: true, message: "请输入用户名", trigger: "blur" }]
      }
    };
  },
  methods: {
    update() {
      if (this.editPassWord != null) {
        this.editUser.password = this.editPassWord;
      }
      api.updateUser(this.editUser).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "更新成功！"
          });
          this.editPassWord = null
          this.getUserInfo();
          this.visible2 = false;
        } else {
          this.$message({
            type: "error",
            message: "更新失败！"
          });
        }
      });
    },
    reset() {
      for (var key in this.item) {
        this.item[key] = "";
      }
    },
    closeDialog(){
      this.editPassWord = null
    },
    save() {
      api.addUser(this.item).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "保存成功！"
          });
          this.reset();
          this.getUserInfo();
          this.visible = false;
        } else {
          this.$message({
            type: "error",
            message: "保存失败！"
          });
        }
      });
    },
    deleteUser(id) {
      this.$confirm("是否删除此用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.deleteUser(id).then(res => {
            if (res.data) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getUserInfo();
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
      this.filters.key = null;
      this.getUserInfo();
    },
    handleCurrentChange(val) {
      this.filters.page = val;
      this.getUserInfo();
    },
    addNewRecord() {
      this.visible = true;
      // this.$router.push("addUser");
    },
    editUsers(obj) {
      this.visible2 = true;
      api.getUserDetail(obj.userID).then(res => {
        this.editUser = res.data;
      });
      // this.$router.push({ path: "editUser", query: { id: id } });
    },
    getUserInfo() {
      api.getUserQuery(this.filters).then(res => {
        this.list = res.data.list;
        this.totalInfo = res.data.page.totalCount;
      });
    }
  },
  mounted() {
    this.getUserInfo();

    api.getAllRoleMenu().then(res => {
      this.AllRole = res.data;
    });

    api2.fetchServedPersonManageTypes().then(res => {
      this.NetGrid = res.data.netGrid;
    });
  }
};
</script>


<style scoped>

</style>



// WEBPACK FOOTER //
// src/views/systemManage/index.vue?86e3dc38