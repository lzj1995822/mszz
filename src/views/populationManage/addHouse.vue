<template>
  <div style="padding:3%">
    <el-row>
      <el-col :span="12">
        <el-form :model="form" ref="videoForm" label-width="200px">
          <el-form-item v-for="(v,k,i) in form" :label="labels[i]" :key="v.id" :prop="k" >
              <el-select v-if="k=='buildingPurposeTypeValue'" v-model="form[k]">
                <el-option v-for="(v,i) in BuildingPurposeType" :key="i" :value="v.buildingPurposeTypeValue" :label="v.buildingPurposeTypeName"></el-option>
              </el-select>
              <el-select v-else-if="k=='houseCertificateType'" filterable  v-model="form[k]">
                <el-option v-for="(v,i) in HouseType" :key="i" :value="v.certificateTypeValue" :label="v.certificateTypeName"></el-option>
              </el-select>
              <el-select v-else-if="k=='rentalPurposeTypeValue'" v-model="form[k]">
                <el-option v-for="(v,i) in RentalPurposeType" :key="v.id" :value="v.rentalPurposeTypeValue" :label="v.rentalPurposeTypeName"></el-option>
              </el-select>
              <el-select v-else-if="k=='hiddenTroubleTypeValue'" v-model="form[k]">
                <el-option v-for="(v,i) in HiddenTroubleType" :key="i" :value="v.hiddenTroubleTypeValue" :label="v.hiddenTroubleTypeName"></el-option>
              </el-select>
              <el-radio-group v-else-if="k=='isRental'" v-model="form[k]">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
              <el-input-number :min="0" v-else-if="k=='longitude'||k=='latitude'||k=='houseArea'" v-model="form[k]"></el-input-number>
              <el-input autosize v-else-if="k=='remarks'" v-model="form[k]" type="textarea"></el-input>
              <el-input style="width:600px" v-else v-model="form[k]"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" @click="reset">重置</el-button>
            <el-button type="primary" @click="saveHouse">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as api from "@/api/realpopulation";
  import * as api2 from "@/api/zonghezhili/duiwujianshe";
  
  export default {
    data() {
      return {
        num: 4,
        form: {
          houseCode: '', //              '房屋编号'
          houseAddress: '', //        
          longitude: '', //              '地理经度信息',
          latitude: '', //               '地理纬度信息',
          buildingPurposeTypeValue: '', //'危险评估等级类型编码',
          houseArea: '', //              '房屋面积,单位平方米，(8,2)',
          houseCertificateType: '', //   '证件代码，编码符合GA/T 517',
          houseCertificateNumber: '', // '房屋证件号码',
          houseHolderName: '', //        '房主姓名',
          houseHolderContact: '', //     '房主联系方式，手机号码或固定电话号码',
          houseHolderPresentDetailAddress: '', //'房主现居住详细地址',
          isRental: 0, //               '是否租赁？0表示否，1表示租赁',
          rentalPurposeTypeValue: '', // '出租用途类型编码',
          hiddenTroubleTypeValue: '', // '隐患类型编码',
          lesseeCertifID: '', //         '承租人公民身份证',
          lesseeName: '', //             '承租人姓名',
          lesseeContact: '', //          '承租人联系方式',
        },
        labels: ["房屋编号", "房屋地址", "经度", "纬度", "房屋用途", "房屋面积",
          "房屋证件代码类型", "房屋证件号码", "房主姓名", "房主联系方式", "房主现住详细地址",
          "是否租赁", "出租类型编码", "隐患类型", "承租人身份证", "承租人姓名", "承租人联系方式"
        ],
        HouseType: [],
        netGridType: [],
        BuildingPurposeType:[],
        RentalPurposeType:[],
        HiddenTroubleType:[]
      };
    },
    methods: {
      reset(){
          for(var key in this.form){
              this.form[key] = ''
          }
          this.form.isRental = 0
      },
      saveHouse() {
          api.addHouse(this.form).then(res => {
            if (res.data) {
              this.$message({
                type: "success",
                message: "添加成功!"
              });
            } else {
              this.$message({
                type: "error",
                message: res.message
              });
            }
          });
      }
    },
    mounted() {
        api2.fetchServedPersonManageTypes().then(res=>{
            this.HouseType = res.data.codeCertificateType
        })
        api.getHouseCode().then(res=>{
            this.BuildingPurposeType = res.data.BuildingPurposeType
            this.HiddenTroubleType = res.data.HiddenTroubleType
            this.RentalPurposeType = res.data.RentalPurposeType
        })
    }
  };

</script>

<style scoped>


</style>



// WEBPACK FOOTER //
// src/views/populationManage/addHouse.vue?33391267