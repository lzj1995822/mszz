<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button type="primary"> <i class="fa fa-refresh fa-spin"></i>刷新</el-button>
      </el-col>
      <el-col :span="24" style="margin-top:10px">
        <el-table :data="myEvents" border style="width: 100%" >
          <el-table-column prop="disputeEventID" label="编号"align="center"></el-table-column>
          <el-table-column prop="eventName" label="事件名称" align="center"></el-table-column>
          <el-table-column prop="eventPlace" label="发生地点" align="center"></el-table-column>
          <el-table-column prop="majorPersonName" label="主要当事人"align="center"></el-table-column>
          <el-table-column prop="eventDate" label="发生时间" align="center"></el-table-column>
          <el-table-column prop="eventDate" label="发生时间" align="center"></el-table-column>
          <el-table-column label="问题类型" align="center">
            <template scope="scope">
              加急
            </template>
          </el-table-column>
          <el-table-column prop="reviewComments" label="督促类型" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template scope="scope">
              <el-button type="text">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myEvents: [
        {
          disputeEventID: 20171012,      // 服务单号
          eventName: '打架斗殴',          // 事件名称
          eventDate: '2017-12-12',       // 发生日期
          eventPlace: '茅山风景区',       // 事件发生地点
          evenScaleTypeValue: '',        // 事件规模（编码）
          eventTypeValue: '',            // 事件类型 (编码)
          numberofJoinning: '',          // 涉及人数,
          eventIntroduction: '',         // 事件简述，不超2000字',
          relatedOrg: '',                // 涉及单位,
          majorPersonCertTypeCode: '',   // 主要当事人证件代码类型，编码规范GA/T 517,
          majorPersonCertID: '',         // 主要当事人证件号码,
          majorPersonName: '李四',       // 主要当事人姓名
          majorPersonSex: '',            // 主要当事人性别，编码符合GB/T 2261.1,
          majorPersonEthnicity: '',      // 主要当事人名族类别，详细见字典表,
          majorPersonEducation: '',      // 主要当事人学历类别，编码见表,
          majorPersonType: '',           // 主要当事人人员类别,
          majorPersonDetailAddress: '',  // 主要当事人居住详细地址,
          solvingDeadline: '',           // 化解时限',
          solvingMethodType: '',         // 化解方式，编码见 GBT 31000-2015文件之5.58',
          solvingManagment: '',          // 化解组织',
          reviewType: '01',              // 督办类型（编码）
          reviewComments: '普通督办',     // 督办内容
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>



// WEBPACK FOOTER //
// src/views/contradictionManage/myEvents.vue?52f207e2