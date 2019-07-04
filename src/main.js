import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN'
import App from './App.js'
import router from './router'
import store from './store'
import '@/icons' // icon
import '@/permission' // 权限
import jquery from 'jquery'
import VDistpicker from 'v-distpicker'

Vue.component('v-distpicker', VDistpicker);

Vue.use(ElementUI, { locale });

import 'font-awesome/css/font-awesome.css' // 图标库
import 'vue-orgchart/dist/style.min.css'

Vue.prototype.$jquery = jquery
Vue.config.productionTip = false;


Vue.filter("formDate", function(date) {   //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
  if(!date instanceof Date) return ''
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h=h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  minute = minute < 10 ? ('0' + minute) : minute;
  var second=date.getSeconds();
  second=second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})



// WEBPACK FOOTER //
// ./src/main.js