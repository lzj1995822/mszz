<template>
  <div>
     <iframe frameborder="no" border="0" allowfullscreen="true" allowtransparency="true"  style="width:100%;height:900px;scrolling:no" src="/msmis/map/map.html">
     </iframe>
  </div>
</template>

<script>
import pca from '../../utils/pca.js'
export default {
  data(){
    return{

    }
  },
  methods:{

  },
  mounted(){
    // console.log(pca('654023'))
    this.$store.dispatch('CLOSESideBar')
  },
  destroyed(){
    this.$store.dispatch('OPENSIDERBAR')
  }
}
</script>

<style scoped>

</style>



// WEBPACK FOOTER //
// src/views/geographyManage/index.vue?eafc85c8