<template>
  <div>
    <el-row style="margin-top:10px">
        <el-col :span="4">
            <div class="left_nav">
                <el-input
                placeholder="视频筛选(只有展开过的列表才能被筛选)"
                icon="search"
                v-model="filterText"
                >
                </el-input>
                <el-tree style="margin-top:5px" 
                :data="data" ref="tree10" 
                :props="defaultProps"
                :load="loadNode"
                lazy 
                :filter-node-method="filterNode" 
                @node-click="handleNodeClick" 
                @check-change="handleCheckChange"></el-tree>
            </div>
        </el-col>
        <el-col :span="20">
         
            <div style="padding-left:10px">
            <object type='application/x-vlc-plugin' id='vlc' events='True' width="100%" height="700" pluginspage="http://www.videolan.org" codebase="http://downloads.videolan.org/pub/videolan/vlc-webplugins/2.0.6/npapi-vlc-2.0.6.tar.xz">  
                <param name='mrl' :value='url' /> 
                <param name='volume' value='50' />  
                <param name='autoplay' value='true' />  
                <param name='loop' value='false' />  
                <param name='fullscreen' value='true' />  
            </object>
            </div>    
      
        </el-col>
      </el-row>
  </div>
</template>

<script>
import * as api from "@/api/schoolManage";
export default {
  watch: {
    filterText(val) {
      this.$refs.tree10.filter(val);
    }
  },
  methods: {
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        api.getSchoolForTree().then(res => {
          this.gridData = res.data;
          return resolve(this.gridData);
        });
      }
      if (node.level === 1) {
        setTimeout(() => {
          api.getVideoForTree(node.data.id).then(res => {
            return resolve(res.data);
          });
        },200);
      }
      if (node.level > 1) {
        return resolve([]);
      }
    },
    handleNodeClick(data){
        this.url = data.url
        if(this.url!=null){
          var vlc=document.getElementById('vlc');
          var idd = vlc.playlist.add(this.url);
          vlc.playlist.playItem(idd);
        }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  },
  data() {
    return {
      url: "",
      filterText: "",
      data: [],
      gridData: [],
      defaultProps: {
        label: "label",
        children: "children"
      }
    };
  },
  mounted() {}
};
</script>

<style scoped>
.top_header {
  width: 100%;
  height: 100px;
  background: rebeccapurple;
}
.header_title {
  color: white;
  font-size: 30px;
  font-family: sans-serif;
  line-height: 95px;
  padding: 200px;
}
.back_menu {
  color: white;
  line-height: 100px;
  display: inline-block;
  cursor: pointer;
  padding-left: 10px;
}
.my_nav {
  padding: 12px;
  font-size: 20px;
  background-color: #e5e9f2;
}
.left_nav {
  width: 100%;
  height: 100%;
  padding-left: 5px;
}
</style>



// WEBPACK FOOTER //
// src/views/schoolSecurityManage/schoolVideoInfo.vue?468c7fc1