<template>
  <div>
      <table class="userInfoEditTable" style="border-collapse:collapse;background-color:white;" width="100%" cellspacing="0">
          <tr>
              <td>地区</td>
              <td v-for="(v,i) in area" :key="i">
                  {{area[i]}}
              </td>
              <td>合计</td>
          </tr>
          <tr>
              <td>{{title[0]}}</td>
              <td v-for="(v,i) in common" :key="i">
                  {{common[i]}}
              </td>
              <td>{{getSum(common)}}</td>
          </tr>
          <tr>
              <td>{{title[1]}}</td>
              <td v-for="(v,i) in great" :key="i">
                  {{great[i]}}
              </td>
              <td>{{getSum(great)}}</td>
          </tr>
          <tr>
              <td>小计</td>
              <td v-for="(v,i) in area" :key="i">
                  {{common[i]+great[i]}}
              </td>
              <td>
                  {{getSum(common)+getSum(great)}}
              </td>
          </tr>
      </table>
  </div>
</template>

<script>
export default {
  props: {
    area: {
      type: Array,
      default: []
    },
    common: {
      type: Array,
      default: []
    },
    great: {
      type: Array,
      default: []
    },
    title:{
      type:Array,
      default:['一般事件','重大事件']
    }
  },
  methods: {
    getSum(data) {
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        sum += data[i];
      }
      return sum;
    }
  }
};
</script>



// WEBPACK FOOTER //
// src/components/common/statistics.vue?0574c7fe