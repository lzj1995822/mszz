<template>
  <div>
    <el-row>
      <el-col :span="24" align="left">
        <el-button type="primary" @click="add">添加角色</el-button>
      </el-col>
      <el-col style="margin-top:10px" :span="24">
        <el-table :data="List">
          <el-table-column type="index">
          </el-table-column>
          <el-table-column label="角色名称" prop="roleName" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template scope="scope">
              <el-button @click="watch(scope.row)" v-if="scope.row.roleName!='超级管理员'&&scope.row.roleName!='APP'" type="text">查看详情/编辑</el-button>
              <el-button style="color:red" v-if="scope.row.roleName!='超级管理员'&&scope.row.roleName!='APP'" @click="del(scope.row.roleID)" type="text">删除</el-button>
              <el-button type="text" @click="return;" v-if="scope.row.roleName=='超级管理员'" style="color:blue">超级管理员默认拥有全部权限</el-button>
              <el-button type="text" v-if="scope.row.roleName=='APP'" style="color:blue">APP端无法登陆本系统</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as api from "@/api/systemManage";
export default {
  data: () => {
    return {
      List: [{}]
    };
  },
  methods: {
    del(id) {
      this.$confirm("是否删除此角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.deleteRole(id).then(res => {
            if (res.data) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getInfo();
            } else {
              this.$message({
                type: "success",
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
    watch(obj) {
      if (obj.roleName == "超级管理员" || obj.roleName == "APP") {
        this.$message("超级管理员默认拥有全部权限,APP端无法更改权限");
        return;
      }
      this.$router.push({ path: "editRole", query: { id: obj.roleID } });
    },
    add() {
      this.$router.push("addRole");
    },
    getInfo() {
      api.getAllRoleMenu().then(res => {
        this.List = res.data;
      });
    }
  },
  mounted() {
    this.getInfo();
  }
};
</script>


<style scoped>

</style>



// WEBPACK FOOTER //
// src/views/systemManage/roleManage.vue?52a10a82