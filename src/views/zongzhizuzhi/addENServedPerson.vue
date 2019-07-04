<template>
  <div>
    <el-steps :space="200" :active="1">
      <el-step title="步骤 1" description="添加基本信息">
        <div style="width:100%;">
        </div>
      </el-step>
      <el-step title="步骤 2" description="添加外籍信息"></el-step>
    </el-steps>
    
          <el-form ref="form" :model="form" label-width="160px" style="margin-left:10%">
            <fieldset style="width:80%">
                <legend style="margin-left:40px;"><h1>基本信息</h1></legend>
            <div style="display:inline-block;width:40%;padding:10px">
              <el-form-item label="头像上传">
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>

              <el-form-item label="人口类型">
                <el-input v-model="foreigner" disabled></el-input>
              </el-form-item>

              <el-form-item label="出生日期">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.birthDate"></el-date-picker>
              </el-form-item>

              <el-form-item label="婚姻状况">
                <el-input v-model="form.maritalStatus"></el-input>
              </el-form-item>

              <el-form-item label="学历">
                <el-input v-model="form.education"></el-input>
              </el-form-item>

              <el-form-item label="宗教信仰">
                <el-input v-model="form.religiousBelief"></el-input>
              </el-form-item>
            </div>

            <div style="display:inline-block;width:40%">
              <el-form-item label="职业类别">
                <el-input v-model="form.careerType"></el-input>
              </el-form-item>

              <el-form-item label="职业">
                <el-input v-model="form.career"></el-input>
              </el-form-item>

              <el-form-item label="移动电话">
                <el-input v-model="form.mobileTel"></el-input>
              </el-form-item>

              <el-form-item label="固定电话">
                <el-input v-model="form.fixedTel"></el-input>
              </el-form-item>

              <el-form-item label="服务处所:">
                <el-input v-model="form.servedPlace"></el-input>
              </el-form-item>

              <el-form-item label="现住地:">
                <el-input v-model="form.PresentAddress"></el-input>
              </el-form-item>

              <el-form-item label="现住地门(楼)详细地址:">
                <el-input v-model="form.presentAddressDetail"></el-input>
              </el-form-item>
            </div>
            </fieldset>
          </el-form>
       
        <fieldset style="width:72%;margin-left:10%;">
            <legend style="margin-left:40px;"><h1>人口类型</h1></legend>
            <div style="width:80%;margin-left:5%">
              <foreigner-form :Foreigner="foreignerForm"></foreigner-form>
            </div>
            <el-row>
              <el-col align="center" :span="18">    
                  <el-button type="primary" @click="onSubmit">保存</el-button>
                  <el-button @click="onCancel">取消</el-button>
              </el-col>
            </el-row>
        </fieldset>
  </div>
</template>

<script>
import foreignerForm from '../../components/ZzOrgManage/extendForeignerPerson'

export default {
  components:{
    "foreignerForm":foreignerForm
  },
  data(){
    return{
      colNum: 12,
      areaRows:5,
      imageUrl:'',
      foreigner:'境外人员',
      form: {
        servedPersonID: '1',       // 服务对象编号
        servedPersonTypeValue: '99',// 服务对象类型
        servedPersonTypeName: '境外人员',  // '服务对象的类型，包括01=户籍人口，02=流动人口，03=留守人员，99=境外人员。';
        certifID: '2342424234',    // 身份证号
        name: '王五',               // 姓名
        nameUsed: '王思',           // 曾用名
        sex: '男',                  // 性别
        birthDate: '1990-07-14',    // 出生日期，格式为“YYYYMMDD”
        ethnicity: '汉',            // 民族
        nativePlace: '江苏苏州',     // 籍贯，出生地，老家
        politics: '党员',            // 政治面貌
        maritalStatus: '未婚',       // 婚姻状况
        education: '本科',           // 学历
        religiousBelief: '无',       // 宗教信仰，后期需要符合标准编码
        careerType: '公职',          // 职业类别
        career: '公务员',            // 职业
        mobileTel: '124353466',      // 移动电话
        fixedTel: '457547457',       // 固定电话
        isSpecialPopulation: 1,   // 是否为特殊人群
        servedPlace: '公安局',        // 服务处所
        domicileAddress: '',          // 户籍地
        domicileAddressDetail: '',    // 户籍门(楼)详细地址',
        presentAddress: '',           // 现住地',
        presentAddressDetail: '',     // 现住地门(楼)详细地址',
      },
      foreignerForm:{}
    }
  },
  methods:{
     onSubmit() {
      this.$notify({
        title: '成功',
        message: '保存成功',
        type: 'success'
      })
      // this.$router.push({ path: 'ServedPersonInfo' })
    },
    onCancel() {
      // this.$router.push({ path: 'ServedPersonInfo' })
    },
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
    },
  }
}
</script>

<style>
.divStyle{
  border: 1px solid black;
}
.avatar-uploader .el-upload {
    border: 1px dashed black;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .tb_header {
  border: 2px solid #eeeeee;
  background-color: whitesmoke;
  padding: 1px;
  text-indent: 1em;
  border-left: 4px solid #20A0FF;
  border-left-width: 5px;
  width: 80%;
}
</style>



// WEBPACK FOOTER //
// src/views/zongzhizuzhi/addENServedPerson.vue?16e0acc5