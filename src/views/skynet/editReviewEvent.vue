<template>
  <div>
    <el-form :model="form" label-width="220px">
          <el-form-item label="受理人" style="width:600px">
            <el-input v-model="form.checkedUserID" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="审核时间">
            <el-date-picker  v-model="form.checkedTime" placeholder=""></el-date-picker>
          </el-form-item>
          <el-form-item label="审核结果">
              <el-radio-group v-model="form.checkedResult">
                <el-radio :label="1">通过</el-radio>
                <el-radio :label="0">不通过</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="备注" style="width:600px">
            <el-input type="textarea" v-model="form.remark" placeholder=""></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">确认审核</el-button>
          </el-form-item>
        </el-form>
  </div>
</template>

<script>
export default {
  data(){
    return{
      form:{
        checkedUserID:'',//        bigint,
        checkedTime:'',//          datetime,
        checkedResult:'',//        int,
        remark:'',//              varchar(500),
      }
    }
  }
}
</script>


<style scoped>

</style>



// WEBPACK FOOTER //
// src/views/skynet/editReviewEvent.vue?62c881b6