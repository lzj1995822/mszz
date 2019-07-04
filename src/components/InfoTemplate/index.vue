<template>
  <div id="tableInfo">
      <table class="info-basic">
          <tr v-for="(v,k,i) in item" :key="i" >
              <td class="label">{{names[i]}}</td>
              <td v-if="i<=4&&hasimg" class="table_content">
                  <span v-if="k==='sex'">
                     {{getSex(v)}}
                  </span>
                  <span v-else>
                     {{v}}
                  </span>
              </td>
              <td v-else-if="i>4&&hasimg" class="table_content" colspan="2">
                  <span v-if="k==='sex'">
                     {{getSex(v)}}
                  </span>
                  <span v-else>
                     {{v}}
                  </span>
              </td>
              <td v-else class="table_content">
                  <span v-if="k==='sex'">
                     {{getSex(v)}}
                  </span>
                  <span v-else>
                     {{v}}
                  </span>
              </td>
              <td v-if="i==0&&hasimg" rowspan="5" style="width:140px;text-align:center;padding:0px;margin:0px">
                  <img style="width:150px;height:200px"  :src="imgUrl" alt="">
              </td>
          </tr>
          <tr>
              <td colspan="3" align="right">
                  <el-tooltip content="打印" placement="bottom" effect="light">
                    <el-button type="text" @click="printTable('tableInfo')">
                      <i style="font-size:30px" class="fa fa-print fa-1x">
                      </i>
                    </el-button>
                  </el-tooltip>
              </td>
          </tr>
      </table>
  </div>
</template>

<script>
// import {printer} from '@/utils'

export default {
  props: {
    item: {
      default: Object
    },
    names: {
      default: Array
    },
    hasimg: {
      type:Boolean,
      default:false
    },
    imgUrl: {
      default: String
    },
    title:{
      default:String
    },
    visible:{
      default:false
    },

  },
  methods: {
     getSex(val){
       val = parseInt(val)
      switch(val){
        case 0:
          return '未知的性别';
        case 1:
          return '男性';
        case 2:
          return '女性';
        case 99:
          return '未说明性别';
      }
    },
    printTable(table) {
      var div_print = document.getElementById(table);
      var newStr = div_print.innerHTML;
      var oldStr = document.body.innerHTML;
      document.body.innerHTML = newStr;
      window.print();
      window.location.reload();
      window.body.innerHTML = oldStr;
      return false;
    }
  }
};
</script>

<style scoped>
.info-basic {
  border-collapse: collapse;
  background-color: white;
  border: 1px solid black;
  padding: 10px;
  color:darkblue;
  width: 100%;
  height: 100%;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.1);
}
td {
  border: 2px solid #e6ebf5;
  padding: 8px;
}
.label {
  width: 16%;
  text-align: center;
}
.table_content{
  height: 20px;
  width: 500px;
}
</style>



// WEBPACK FOOTER //
// src/components/InfoTemplate/index.vue?3f1dc2dd