<template>
<!-- 机构成员查询模块 -->
  <div>
    <el-row>
      <el-row>
        <el-col :span="8">
          <el-button @click="exportData" style="float:left;" type="success">
            <!-- <i class="fa fa-cog fa-lg"></i> -->
            <img src="../../assets/daoru.png" alt="">
              导出
          </el-button>
          <el-upload action="xxxxxxxxxx" style="text-align:left;display:inline-block;width:150px;height:38px;overflow: hidden;margin-left:10px">
              <el-button type="success">
                  <img src="../../assets/daochu.png" alt="">
                  EXCEL导入
              </el-button>
          </el-upload>
        </el-col>
        <el-col :span="16" align="right">
          <el-button type="primary" @click="addMember"><i class="el-icon-plus"></i>添加成员</el-button>
          <el-input style="width:230px" v-model="filters.name" placeholder="姓名"></el-input>
          <el-select v-model="filters.positionTypeValue" placeholder="请选择职务">
              <el-option v-for="v in PersonPositionTypes"
              :key="v.perPositionTypeID"
              :label="v.positionTypeName"
              :value="v.perPositionTypeID">
              </el-option>
          </el-select>
          <el-select v-model="filters.status" placeholder="在职状态">
            <el-option v-for="v in isOnWork" :key="v.value" :label="v.label" :value="v.value">
            </el-option>
          </el-select>
          <el-button icon="search" type="primary" @click="searchInfo">查询</el-button>
          <el-button type="primary" @click="findAll">显示所有</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="padding-top:10px">
          <el-table :data="dataInfo" style="width:100%">
            <el-table-column label="编号" prop="orgMemberID" align="center">
            </el-table-column>
            <el-table-column label="姓名" prop="name" align="center">
            </el-table-column>
            <el-table-column label="性别" prop="sex" align="center">
              <template scope="scope">
                {{scope.row.sex==1?'男':'女'}}
              </template>
            </el-table-column>
            <el-table-column label="民族" prop="ethnicity" align="center">
            </el-table-column>
            <el-table-column label="政治面貌" prop="politics" align="center">
            </el-table-column>
            <el-table-column label="身份证号" prop="certID" align="center">
            </el-table-column>
            <el-table-column label="出生日期" prop="birthDate" align="center">
            </el-table-column>
            <el-table-column label="职务" prop="positionTypeName" align="center">
            </el-table-column>
            <el-table-column label="手机号码" prop="mobileTel" align="center">
            </el-table-column>
            <el-table-column label="在职状态" prop="status" align="center">
              <template scope="scope">
                {{scope.row.status==1?'在职':'离职'}}
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="300" align="center">
              <template scope="scope">
                <el-button type="text" @click="WatchInfo(scope.row)" size="small">查看详情</el-button>
                <el-button type="text" @click="editMemberInfo(scope.row)" size="small">编辑</el-button>
                <el-button type="text" @click="changeMemberInfo(scope.row.orgMemberID,scope.row.status)" size="small">
                  {{scope.row.status==1?'离职':'复员'}}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24" style="margin-top:10px" align="right">
          <el-pagination layout="prev, pager, next" :total="totalInfo" @current-change="handleCurrentChange">
          </el-pagination>
        </el-col>
      </el-row>
    </el-row>

    <el-dialog title="人员详情" :visible.sync="dialogVisible">
      <table class="userInfoEditTable" style="border-collapse:collapse;background-color:white;" width="100%" cellspacing="0">
        <tr>
          <td width="20%">编号:</td>
          <td>
            {{memberInfo.orgMemberID}}
          </td>
        </tr>
        <tr>
          <td width="20%">姓名:</td>
          <td>
            {{memberInfo.name}}
          </td>
        </tr>
        <tr>
          <td width="20%">所属机构:</td>
          <td>
            {{memberInfo.orgName}}
          </td>
        </tr>
        <tr>
          <td width="20%">性别</td>
          <td>
            {{memberInfo.sex==1?'男':'女'}}
          </td>
        </tr>

        <tr>
          <td width="20%">民族:</td>
          <td>
            {{memberInfo.ethnicity}}
          </td>
        </tr>

        <tr>
          <td width="20%">政治面貌:</td>
          <td>
            {{memberInfo.politics}}
          </td>
        </tr>
        <tr>
          <td width="20%">身份证号:</td>
          <td>
            {{memberInfo.certID}}
          </td>
        </tr>
        <tr>
          <td width="20%">出生日期:</td>
          <td>
            {{memberInfo.birthDate}}
          </td>
        </tr>
        <tr>
          <td width="20%">学历:</td>
          <td>
            {{memberInfo.education}}
          </td>
        </tr>
        <tr>
          <td width="20%">级别:</td>
          <td>
            {{memberInfo.levelTypeName}}
          </td>
        </tr>
        <tr>
          <td width="20%">职务类型:</td>
          <td>
            {{memberInfo.positionTypeName}}
          </td>
        </tr>
        <tr>
          <td width="20%">移动电话:</td>
          <td>
            {{memberInfo.mobileTel}}
          </td>
        </tr>
        <tr>
          <td width="20%">固定电话:</td>
          <td>
            {{memberInfo.fixedTel}}
          </td>
        </tr>
        <tr>
          <td width="20%">在职状态:</td>
          <td>
            {{memberInfo.status==1?'在职':'离职'}}
          </td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchJGMemberInfo, changejGMemberStatusById } from '@/api/zonghezhili/duiwujianshe'
import { mapGetters } from 'vuex'

export default {
  computed:{
    ...mapGetters({
      PersonLevelTypes:"getPersonLevelType",
      PersonPositionTypes:"getPersonPositionType",
    })
  } ,
  data() {
    return {
      filters: {//查询表单
        name: null,//姓名
        positionTypeValue : null,//职位
        status: null,//是否在职
        page: 1,//页码
        pageSize: 10//页号
      },
      memberInfo: {},//人员详细情况
      dataInfo: [{
        // orgMemberID: 1,
        // orgName: '消防队', //机构名称
        // name: '李四',//姓名
        // sex: 0,//性别
        // ethnicity: '汉族',//民族
        // politics: '共产党员',//政治面貌
        // certID: 'xxxxxx',//身份证号
        // birthDate: '2018-8-9',// 出生日期
        // levelTypeName: '科员',//级别名称
        // positionTypeName: '消防员',// 职务名称（多表查询得出）
        // education: '本科',        // '学历',
        // mobileTel: '18921484859',// 手机号码
        // fixedTel: '86341212',// 固定电话号码
        // status: 1, //'状态信息，值=1表示现有成员；值= 0 表示曾经是成员'
      }],
      isOnWork: [
        {
          value: 1,
          label: '在职'
        },
        {
          value: 0,
          label: '离职'
        }
      ],
      totalInfo: 100,
      dialogVisible: false
    }
  },
  methods: {
    //翻页
    handleCurrentChange(val) {
      this.filters.page = val
      this.getMemberInfo()
    },
    //获取所有成员信息
    getMemberInfo() {
       fetchJGMemberInfo(this.filters).then(res=>{
          this.dataInfo = res.data.queryVO
          this.totalInfo = res.data.page.totalCount
       }).catch(err=>{

       })
        this.filters = {
        name: null,//姓名
        positionTypeValue: null,//职位
        status: null,//是否在职
        page: 1,//页码
        pageSize: 10//页号
      }
    },
    //搜索信息
    searchInfo() {
      this.filters.page = 1
      this.getMemberInfo()
    },
    findAll() {
      this.filters = {
        name: null,//姓名
        positionTypeValue: null,//职位
        status: null,//是否在职
        page: 1,//页码
        pageSize: 10//页号
      }
      this.getMemberInfo()
    },
    changeMemberInfo(id, status) {
      this.$confirm('确定将更改此人的在职状态吗? 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        status = status==1?0:1
        changejGMemberStatusById(id, status).then(res => {
          if(res==='OK')
            this.$message({
              type: 'success',
              message: '更改成功!'
            });
          else{
            this.$message({
              type: 'info',
              message: '修改失败！'
            });
          }
          this.getMemberInfo()
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '取消！'
        // });
      });
    },
    editMemberInfo(row) {
      this.$router.push({ path: 'editMemberInfo', query: { OrgMemberID: row.orgMemberID } })
    },
    WatchInfo(row) {
      this.dialogVisible = true
      this.memberInfo = row
    },
    addMember(){
      this.$router.push('addMemberInfo')
    },
    exportData(){

    }
  },
  mounted() {
    this.$store.dispatch("fetchALLTYPEInfo")//获取所有类别信息
    this.getMemberInfo()
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
  padding: 10px;
  /* height: 30px; */
}
</style>



// WEBPACK FOOTER //
// src/views/zongzhizuzhi/jgMemberManage.vue?0a79c39b