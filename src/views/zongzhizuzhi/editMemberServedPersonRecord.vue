<template>
    <div style="padding:20px">
        <!-- <div>
            <fieldset style="width:60%">
                <legend>检索服务人与服务对象</legend>
                <div style="padding:20px">
                    <div>
                        <div style="margin-bottom:15px">服务人搜索:</div>
                        <el-input v-model="filter.name" placeholder="请输入服务人姓名" style="width:230px"></el-input>
                        <el-input v-model="filter.certifID" placeholder="请输入服务人身份证" style="width:230px"></el-input>
                        <el-button type="primary" @click="searchOrgMember">检索</el-button>
                    </div>
                    <div style="margin-top:20px">
                        <div style="margin-bottom:15px">(大陆)服务对象搜索:</div>
                        <el-input v-model="filter2.name" placeholder="请输入服务对象姓名" style="width:230px"></el-input>
                        <el-input v-model="filter2.certifID" placeholder="请输入服务对象身份证" style="width:230px"></el-input>
                        <el-button type="primary" @click="searchServed">检索</el-button>
                        <div style="margin-bottom:15px;margin-top:20px">(外籍人士)服务对象搜索:</div>
                        <el-input v-model="foreignerFilter.name" placeholder="请输入服务对象姓名" style="width:230px"></el-input>
                        <el-input v-model="foreignerFilter.certificateNumber" placeholder="请输入服务证件号码" style="width:230px"></el-input>
                        <el-button type="primary" @click="searchForeignerServed">检索</el-button>
                    </div>
                </div>
            </fieldset>
        </div> -->

        <div style="margin-top:20px">
           <fieldset style="width:60%">
                <legend>服务记录--编辑</legend>
                <el-form label-position="top" style="margin-top:10px" label-suffix=":">
                    <el-form-item label="服务人姓名(检索后自动填入)">
                        <el-input style="width:300px" placeholder="检索后自动填入" disabled v-model="OrgMember.name"></el-input>
                    </el-form-item>
                    <el-form-item style="width:600px" label="服务对象姓名(检索后自动填入)">
                        <el-row>
                            <el-col :span="12">
                                <el-input placeholder="检索后自动填入" disabled v-model="ServedPerson.name"></el-input>
                            </el-col>
                            <!-- <el-col :span="12">
                                <el-button @click="showServedInfo(ServedPerson.servedPersonID)" style="margin-left:10px" type="text">查看服务对象详细信息</el-button>
                            </el-col> -->
                        </el-row>
                    </el-form-item>
                    <el-form-item label="服务日期">
                        <el-date-picker v-model="ServedPersonRecord.serverDate" @change="changeDate" placeholder="请输入服务日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="服务内容">
                        <el-input v-model="ServedPersonRecord.serverInf" :rows="areaRows" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item align="center">
                        <el-button @click="save" type="primary">更新</el-button>
                        <el-button @click="$router.go(-1)">返回</el-button>
                    </el-form-item>
                </el-form>
           </fieldset> 
        </div>

        <el-dialog title="服务人检索结果" :visible.sync="dialogVisible">
            <div>
                <el-table :data="orgMemberInfo">
                    <el-table-column prop="orgMemberID" label="编号"></el-table-column>
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column prop="certID" label="身份证"></el-table-column>
                    <el-table-column label="选择">
                        <template scope="scope">
                            <input @click="selectMember(scope.row)" type="radio" name="check">
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="服务对象检索结果" :visible.sync="servedVisible">
            <div>
                <el-table :data="ServedPersonInfo">
                    <el-table-column prop="servedPersonID" label="编号"></el-table-column>
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column prop="certID" label="身份证"></el-table-column>
                    <el-table-column prop="certificateNumber" label="证件(境外人员)"></el-table-column>
                    <el-table-column label="选择">
                        <template scope="scope">
                            <input @click="selectServed(scope.row)" type="radio" name="check">
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="servedVisible = false">取 消</el-button>
                <el-button type="primary" @click="servedVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import * as api from "@/api/zonghezhili/duiwujianshe";

export default {
  data() {
    return {
      filter: {
        name: "", // 姓名
        certifID: "" // 身份证
      },
      filter2: {
        name: "", // 姓名
        certifID: "" // 身份证
      },
      foreignerFilter: {
        name: "", // 姓名
        certificateNumber: "" //证件号码
      },
      dialogVisible: false,
      servedVisible: false,
      areaRows: 5,
      orgMemberInfo: [
        //查询出来的服务人员
      ],
      ServedPersonInfo: [
        // 查询出来的服务对象
      ],
      OrgMember: {
        name: ""
      },
      ServedPerson: {
        name: ""
      },
      ServedPersonRecord: {
        id:'',
        orgMemberName: "",
        orgMemberCertID: "",
        servedPersonName: "",
        servedPersonCertID: "",
        servedPersonType: "",
        serverInf: "",
        serverDate: ""
      }
    };
  },
  methods: {
    changeDate(val) {
      this.ServedPersonRecord.serverDate = val;
    },
    searchOrgMember() {
      api.getOrgMemberByNameAndCertID(this.filter.name,this.filter.certifID).then(res=>{
            this.orgMemberInfo = res.data
      })
      this.dialogVisible = true;
    },
    searchServed() {
       api.selectByNameAndCertifID(this.filter2.name,this.filter2.certifID).then(res=>{
          this.ServedPersonInfo = res.data
      })
      this.servedVisible = true;
    },
    searchForeignerServed(row) {
      // 查询外籍服务对象
      this.servedVisible = true;
    },
    selectMember(row) {
      // 选择服务人
      this.OrgMember = row;
      this.ServedPersonRecord.orgMemberName = row.name;
      this.ServedPersonRecord.orgMemberCertID = row.certID;
    },
    selectServed(row) {
       // 选择服务对象
      this.ServedPerson = row;
      this.ServedPersonRecord.servedPersonName = row.name;
      this.ServedPersonRecord.servedPersonCertID = row.certifID
    },
    selectForeigner(row) {
      // 选择外籍服务对象
      this.ServedPerson = row;
      this.ServedPersonRecord.servedPersonID = row.servedPersonID;
    },
    showServedInfo(id) {
      // 查看服务对象的详细信息
      if (id !== undefined && id !== "")
        this.$router.push({ path: "ServedPersonDetail", query: { id: id } });
      else this.$message.error("请先检索并添加服务对象！");
    },
    save() {
      api.updateRecord(this.ServedPersonRecord.id,this.ServedPersonRecord.serverInf,this.ServedPersonRecord.serverDate).then(res=>{
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "更新成功!"
            });
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
      })
    }
  },
  mounted() {
    let id = this.$route.query.id;
    this.ServedPersonRecord.id = id
    api.fetchServedRecordDetail(id).then(res => {
      this.OrgMember.name = res.data.servedRecord.orgMemberName;
      this.ServedPerson.name = res.data.servedRecord.servedPersonName;
      this.ServedPersonRecord.serverInf = res.data.servedRecord.serverInf;
      this.ServedPersonRecord.serverDate = res.data.servedRecord.serverDate;
    });
  }
};
</script>

<style scoped>

</style>



// WEBPACK FOOTER //
// src/views/zongzhizuzhi/editMemberServedPersonRecord.vue?409423ec