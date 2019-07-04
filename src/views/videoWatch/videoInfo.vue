<template>
  <div>
      <el-row>
          <el-col id="videoInfo" :span="10">
               <table class="userInfoEditTable" style="border-collapse:collapse;background-color:white;" width="100%" cellspacing="0">
                   <tr v-for="(v,k,i) in form" :key="v">
                       <td class="tb_label">{{labels[i]}}</td>
                       <td>
                           {{v}}
                       </td>
                   </tr>
                    <tr>
                      <td colspan="2" align="center">
                        <el-button type="text" size="large" @click="printTable('videoInfo')">[打印]</el-button>
                        <el-button type="text" size="large" @click="goBack()">[返回]</el-button>
                      </td>
                  </tr>
               </table>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import * as api from '@/api/videoManage'
export default {
  data(){
      return{
        form: {
            videoID:'1',             //bigint not null auto_increment,
            videoName:'2',           //varchar(100),
            videoTypeValue:'3',      //'视频类型编码值，如01表示森林监控；02表示交通监控。',
            longitude:'222',           //'地理经度信息',
            latitude:'33',            //'地理纬度信息',
            videoURL:'123',            //'视频流地址URL表示',
            netGridID:'1232',           //'网格编号，表示所述网格区域',
            producter:'3213',           //'生产厂家',
            remarks:'3213'              //'备注',
        },
        labels:['编号','监控名称','视频类型','经度','纬度','url','所属网格','生成厂家','备注']
      }
  },
  methods:{ 
    printTable(div){
        var div_print = document.getElementById(div)
        var newStr = div_print.innerHTML
        var oldStr = document.body.innerHTML
        document.body.innerHTML = newStr
        window.print()
        window.location.reload();
        window.body.innerHTML = oldStr
        return false
    },
    goBack(){
      this.$router.go(-1)
    }
  },
  mounted(){
      let id = this.$route.query.id
      api.fetchDetail(id).then(res=>{
          this.form = res.data
      })
  }
}
</script>

<style scoped>
.userInfoEditTable,
.userInfoEditTable td {
  border: 1px solid darkgrey;
  padding: 10px;
}

.tb_label {
  width: 12%;
  text-align: right;
}
</style>



// WEBPACK FOOTER //
// src/views/videoWatch/videoInfo.vue?0a4053fe