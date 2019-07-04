<template>
<div style="padding:20px">
  <el-row>
    <el-col :span="24">
      <table class="userInfoEditTable" style="border-collapse:collapse;background-color:white;" width="80%" cellspacing="0">
        <tr>
          <td class="tb_label">姓名：</td>
           <td colspan="3">
            <el-input style="width:400px" v-model="EditMemberInfo.name"></el-input>
          </td>
        </tr>
        <tr>
          <td class="tb_label">所属机构：</td>
          <td colspan="3">
            <el-select v-model="EditMemberInfo.orgID" placeholder="请选择">
              <!-- <el-option v-for="v in OrgNames"
              :key="v.orgID"
              :label="v.orgName"
              :value="v.orgID">
              </el-option> -->
            </el-select>
          </td>
        </tr>

        <tr>
          <td class="tb_label">性别：</td>
          <td>
            <el-radio-group v-model="EditMemberInfo.sex">
              <el-radio :label="yes">男</el-radio>
              <el-radio :label="no">女</el-radio>
            </el-radio-group>
          </td>
          <td class="tb_label">民族：</td>
          <td>
            <el-input style="width:200px" v-model="EditMemberInfo.ethnicity"></el-input>
          </td>
        </tr>
        <tr>
          <td class="tb_label">政治面貌：</td>
          <td>
            <el-input style="width:200px" v-model="EditMemberInfo.politics"></el-input>
          </td>
          <td class="tb_label">身份证号：</td>
          <td>
            <el-input style="width:200px" v-model="EditMemberInfo.certID "></el-input>
          </td>
        </tr>
        <tr>
          <td class="tb_label">出生日期：</td>
          <td>
            <el-date-picker
              v-model="EditMemberInfo.birthDate"
              type="date"
              @change="changeDate"
              placeholder="选择日期">
            </el-date-picker>
          </td>
          <td class="tb_label">级别：</td>
          <td>
            <el-select v-model="EditMemberInfo.levelTypeValue" placeholder="请选择">
              <el-option v-for="v in PersonLevelTypes"
              :key="v.personLevelTypeID"
              :label="v.levelTypeName"
              :value="v.levelTypeValue">
              </el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td class="tb_label">学历：</td>
          <td>
            <el-input width="200px" style="width:200px" v-model="EditMemberInfo.education"></el-input>
          </td>
          <td class="tb_label">职务：</td>
          <td>
            <el-select v-model="EditMemberInfo.positionTypeValue" placeholder="请选择">
              <el-option v-for="v in PersonPositionTypes"
              :key="v.perPositionTypeID"
              :label="v.positionTypeName"
              :value="v.positionTypeValue">
              </el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td class="tb_label">移动电话：</td>
          <td>
            <el-input width="200px" v-model="EditMemberInfo.mobileTel"></el-input>
          </td>
          <td class="tb_label">固定电话：</td>
          <td>
            <el-input width="200px" v-model="EditMemberInfo.fixedTel"></el-input>
          </td>
        </tr>
        <tr>
           <td class="tb_label">在职状态：</td>
           <td colspan="3">
              <el-radio-group v-model="EditMemberInfo.status">
                <el-radio :label="1">在职</el-radio>
                <el-radio :label="0">离职</el-radio>
              </el-radio-group>
           </td>
        </tr>
        <tr>
          <td colspan="4">
            <div align="right">
              <el-button type="primary" @click="save" size="large">保存</el-button>
              <el-button size="large" @click="cancel">取消</el-button>
            </div>
          </td>
        </tr>
      </table>
    </el-col>
  </el-row>
</div>
</template>

<script>
import {
  fetchMemberInfoById,
  updateZuzhiMemberInfo,
  addJGMemberInfo
} from "@/api/zonghezhili/duiwujianshe";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      PersonLevelTypes: "getPersonLevelType",
      PersonPositionTypes: "getPersonPositionType"
      // OrgNames: "getOrgName"
    })
  },
  data() {
    return {
      EditMemberInfo: {
        sex: 1,
        levelTypeValue: null,
        positionTypeValue: null,
        birthDate: "",
        status: 1
      },
      yes: 1,
      no: 0
    };
  },
  methods: {
    changeDate(val){
      this.birthDate = val
    },
    save() {
      this.$confirm("确认新增成员吗? 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          addJGMemberInfo(this.EditMemberInfo)
            .then(res => {
              if (res == "OK") {
                this.$message({
                  type: "info",
                  message: "添加成功！"
                });
                this.$confirm("是否继续添加?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                }).then(()=>{
                  this.$router.go(0)
                }).catch(()=>{
                   this.$router.push("jgMemberInfo");
                });
              } else {
                this.$message({
                  type: "error",
                  message: "ERROR"
                });
              }
            })
            .catch(err => {
              this.$message({
                type: "info",
                message: "添加失败！"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消！"
          });
        });
    },
    cancel() {
      this.$router.push("orgMemberInfo");
    }
  },
  mounted() {
    this.$store.dispatch("fetchALLTYPEInfo"); //获取所有类别信息
  }
};
</script>

<style scoped>
.userInfoEditTable,
.userInfoEditTable td {
  border: 1px solid darkgrey;
}

td {
  text-align: left;
  padding: 10px;
  /* height: 30px; */
}

.tb_label {
  width: 140px;
  font-size: 20px;
}
</style>



// WEBPACK FOOTER //
// src/views/zongzhizuzhi/addjgMember.vue?786a369e