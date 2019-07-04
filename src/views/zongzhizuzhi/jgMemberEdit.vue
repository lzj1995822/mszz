<template>
<!-- 机构成员编辑模块 -->
<div style="padding:20px">
  <el-row>
    <el-col :span="24">
      <table class="userInfoEditTable" style="border-collapse:collapse;background-color:white;" width="80%" cellspacing="0">
        <tr>
          <td class="tb_label">编号：</td>
          <td>{{EditMemberInfo.orgMemberID}}</td>
          <td class="tb_label">姓名：</td>
           <td>
            <el-input style="width:200px" v-model="EditMemberInfo.name"></el-input>
          </td>
        </tr>
        <tr>
          <td class="tb_label">所属机构：</td>
          <td colspan="3">
            <el-select v-model="EditMemberInfo.orgID" placeholder="请选择">
              <el-option v-for="v in OrgNames"
              :key="v.orgID"
              :label="v.orgName"
              :value="v.orgID">
              </el-option>

            </el-select>
          </td>
        </tr>

        <tr>
          <td class="tb_label">性别：</td>
          <td>
            <el-radio-group v-model="EditMemberInfo.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
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
              placeholder="选择日期">
            </el-date-picker>
          </td>
          <td class="tb_label">级别：</td>
          <td>
            <el-select v-model="EditMemberInfo.personLevelTypeID" placeholder="请选择">
              <el-option v-for="v in PersonLevelTypes"
              :key="v.personLevelTypeID"
              :label="v.levelTypeName"
              :value="v.personLevelTypeID">
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
            <el-select v-model="EditMemberInfo.perPositionTypeID" placeholder="请选择">
              <el-option v-for="v in PersonPositionTypes"
              :key="v.perPositionTypeID"
              :label="v.positionTypeName"
              :value="v.perPositionTypeID">
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
              <el-button type="primary" @click="save" size="large">更改</el-button>
              <el-button size="large" @click="cancel">返回</el-button>
            </div>
          </td>
        </tr>
      </table>
    </el-col>
  </el-row>
</div>
</template>

<script>
import { fetchMemberInfoById, updateZuzhiMemberInfo } from '@/api/zonghezhili/duiwujianshe'
import { mapGetters } from 'vuex'

export default {
  computed:{
    ...mapGetters({
      PersonLevelTypes:"getPersonLevelType",
      PersonPositionTypes:"getPersonPositionType",
      OrgNames:"getOrgName"
    })
  },
  data(){
    return{
      EditMemberInfo:{},
    }
  },
  methods:{
    save(){
      this.$confirm('确认保存更改吗? 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateZuzhiMemberInfo(this.EditMemberInfo).then(res=>{
            if(res=='OK'){
              this.$message({
                type: 'info',
                message: '修改成功！'
              });
            }else{

            }
          }).catch(err=>{
            this.$message({
              type: 'info',
              message: '修改失败！'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消！'
          });
      });
    },
    cancel(){
      this.$router.go(-1)
    }
  },
  mounted(){
     this.$store.dispatch("fetchALLTYPEInfo")//获取所有类别信息
     let queryID = this.$route.query.OrgMemberID
     fetchMemberInfoById(queryID).then(res=>{
       this.EditMemberInfo = res.data
     }).catch(err=>{
       
     })
  }
}
</script>

<style scoped>
.userInfoEditTable,
.userInfoEditTable td {
    border: 1px solid darkgrey;
}

td {
    text-align: left;
    padding:10px;
    /* height: 30px; */
}

.tb_label {
    width: 140px;
    font-size: 20px;
}

</style>



// WEBPACK FOOTER //
// src/views/zongzhizuzhi/jgMemberEdit.vue?0d61df0f