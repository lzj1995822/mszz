<template>
  <div>
    <el-form ref="form" :rules="rules" :model="emancipistForm" label-width="130px">
      <el-form-item>
      <h2>刑满释放人员</h2>
      </el-form-item>
      <el-form-item label="身份证号" prop="certifID">
         <el-input v-if="usePath=='update'" disabled v-model="emancipistForm.certifID"></el-input>
        <el-input v-else v-model="emancipistForm.certifID"></el-input>
      </el-form-item>
      <el-form-item label="是否是惯犯">
        <el-radio-group v-model="emancipistForm.isRecidivist">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="原罪名">
        <el-select v-model="emancipistForm.originalSinType" placeholder="">
          <el-option v-for="(v,i) in OrginalSinType" :key="i" :value="v.originalSinType" :label="v.originalSinTypeName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="原判刑期">
        <el-input v-model="emancipistForm.originalSentence"></el-input>
      </el-form-item>
      <el-form-item label="服刑地址">
        <el-input v-model="emancipistForm.imprisonmentAddress"></el-input>
      </el-form-item>
      <el-form-item label="释放日期">
        <el-date-picker type="date" @change="ReleaseDate" placeholder="选择日期" v-model="emancipistForm.releaseDate"></el-date-picker>
      </el-form-item>
      <el-form-item label="危险评估类型">
        <el-select v-model="emancipistForm.dangerousEvaulationTypeValue" placeholder="请选择危险类型">
          <el-option v-for="v of DangerousEvaulationType" :key="v.id" :label="v.dangerousEvaulationTypeName" :value="v.dangerousEvaulationTypeValue">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="衔接日期">
        <el-date-picker format="yyyy-MM-dd" type="date" @change="ConnectionDate" placeholder="选择日期" v-model="emancipistForm.connectionDate"></el-date-picker>
      </el-form-item>
      <el-form-item label="衔接情况类型编码">
        <el-select v-model="emancipistForm.connectionTypeValue" placeholder="请选择危险类型">
          <el-option v-for="v of ConnectionType" :key="v.id" :label="v.connectionTypeName" :value="v.connectionTypeValue">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="安置日期">
        <el-date-picker format="yyyy-MM-dd" type="date" @change="PlacementDate" placeholder="选择日期" v-model="emancipistForm.placementDate"></el-date-picker>
      </el-form-item>
      <el-form-item label="安置情况类型编码">
        <el-select v-model="emancipistForm.placementTypeValue" placeholder="请选择安置类型">
          <el-option v-for="v of PlacementType" :key="v.id" :label="v.placementTypeName" :value="v.placementTypeValue">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="未安置原因说明">
        <el-input v-model="emancipistForm.noPlacementReason"></el-input>
      </el-form-item>
      <el-form-item label="帮教情况">
        <el-input v-model="emancipistForm.helpingSituation"></el-input>
      </el-form-item>
      <el-form-item label="是否重新犯罪">
        <el-radio-group v-model="emancipistForm.isRecidivism">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="重新犯罪罪名">
        <el-input v-model="emancipistForm.recidivismCharge"></el-input>
      </el-form-item>

      <el-row v-if="showButton">
        <el-col>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">{{usePath=='save'?"保存":"更新"}}</el-button>
            <!-- <el-button @click="onCancel">取消</el-button> -->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import * as ckApi from "@/api/specialPopulation";
import * as api from '@/api/zonghezhili/duiwujianshe'

export default {
  props: {
    emancipistForm: {
      type: Object
    },
    DangerousEvaulationType: {
      type: Array
    },
    ConnectionType: {
      type: Array
    },
    PlacementType: {
      type: Array
    },
    showButton: {
      type: Boolean,
      default: true
    },
    usePath: {
      type: String,
      default: "save"
    }
  },
  data() {
    var checkCertifId = (rule, certifID, callback) => {
      ckApi.hasThisPerson(certifID,'01').then(res => {
        if (res.data == false) {
          return callback(new Error("此人基本信息不存在，或已存在当前特殊信息！"));
        } else {
          callback();
        }
      });
    };
    return {
      rules: {
        certifID: [{ validator: checkCertifId, trigger: "blur" }]
      },
      OrginalSinType:''
    };
  },
  methods: {
    ReleaseDate(val){
      this.emancipistForm.releaseDate = val
    },
    ConnectionDate(val){
      this.emancipistForm.connectionDate = val
    },
    PlacementDate(val){
      this.emancipistForm.placementDate = val
    },
    onSubmit() {
      if (this.usePath == "update") {
        ckApi.updateSpecialPerson(this.emancipistForm, "01").then(res => {
          if (res.data == true) {
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success"
            });
          } else {
            this.$notify({
              title: "失败",
              message: res.message,
              type: "success"
            });
          }
        });
      } else {
        ckApi.addSpecialPerson(this.emancipistForm,'01').then(res=>{
          if (res.data == true) {
            this.$notify({
              title: "成功",
              message: "保存成功",
              type: "success"
            });
          } else {
            this.$notify({
              title: "保存失败",
              message: res.message,
              type: "success"
            });
          }
        })
      }
    },
    onCancel() {}
  },
  mounted(){
    api.fetchServedPersonManageTypes().then(res=>{
      this.OrginalSinType = res.data.codeOriginalSinType
    })
  }
};
</script>



// WEBPACK FOOTER //
// src/components/ZzOrgManage/extendEmancipist.vue?5cbd3453