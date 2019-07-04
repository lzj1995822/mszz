<template>
  <div class="dashboard-container" align="center">
    <el-row style="width:80%">
      <el-col :span="24" style="margin-top:240px;" align="center">
        <el-row>
          <el-row>
            <el-col :span="4">
              <button id="dlxt" @click="goTo(8)">
                <div>
                  <img src="../../assets/neiye/dlxx_b.png">
                  <div>
                    地理信息系统
                  </div>
                </div>
              </button>
            </el-col>
            <el-col :span="4">
              <button id="zhyw" @click="goTo(1)">
                <div>
                  <img src="../../assets/neiye/zz_b.png">
                  <div >
                    综治组织及综合业务
                  </div>
                </div>
              </button>
            </el-col>
            <el-col :span="4">
              <button id="syrk" @click="goTo(2)">
                <div>
                  <img src="../../assets/neiye/syrk_b.png">
                  <div>
                    实有人口
                  </div>
                </div>
              </button>
            </el-col>
            <el-col :span="4">
              <button id="tsrq" @click="goTo(3)">
                <div>
                  <img src="../../assets/neiye/tsrq_b.png">
                  <div>
                    特殊人群
                  </div>
                </div>
              </button>
            </el-col>
            <el-col :span="4">
              <button id="wtsb" @click="goTo(11)">
                <div>
                  <img src="../../assets/wtsb.png">
                  <div>
                    问题上报
                  </div>
                </div>
              </button>
            </el-col>


            <el-col :span="4">
              <button id="fgyz" @click="goTo(6)">
                <div>
                  <img src="../../assets/neiye/fgyz_b.png">
                  <div >
                    非公有制经济组织和社会组织
                  </div>
                </div>
              </button>
            </el-col>
          </el-row>
          <el-row style="margin-top:40px">
            <el-col :span="4">
              <button id="shza" @click="goTo(5)">
                <div>
                  <img src="../../assets/neiye/shza_b.png">
                  <div >
                    社会治安
                  </div>
                </div>
              </button>
            </el-col>
            <el-col :span="4">
              <button id="mdpc" @click="goTo(7)">
                <div>
                  <img src="../../assets/neiye/mdjf_b.png">
                  <div>
                    矛盾纠纷排查化解
                  </div>
                </div>
              </button>
            </el-col>
            <el-col :span="4">
              <button id="xyzb" @click="goTo(14)">
                <div>
                  <img src="../../assets/neiye/xy_b.png">
                  <div>
                    校园及周边安全
                  </div>
                </div>
              </button>
            </el-col>
            <el-col :span="4">
              <button id="hlhx">
                <div>
                  <img src="../../assets/neiye/hlhx_z.png">
                  <div>
                    护路护线模块
                  </div>
                </div>
              </button>
            </el-col>
            <el-col :span="4">
              <button id="jtgl" @click="goTo(4)">
                <div>
                  <img src="../../assets/neiye/jtgl_b.png">
                  <div>
                    交通管理
                  </div>
                </div>
              </button>
            </el-col>
            <el-col :span="4">
              <button id="wghgl" @click="goTo(13)">
                <div>
                  <img src="../../assets/neiye/wghgl_b.png">
                  <div>
                    网格化管理
                  </div>
                </div>
              </button>
            </el-col>


          </el-row>
          <el-row style="margin-top:40px">
            <el-col :span="4">
              <button id="twxf"  @click="goTo(12)">
                <div>
                  <img src="../../assets/neiye/twcx_b.png">
                  <div>
                    天网巡防
                  </div>
                </div>
              </button>
            </el-col>


            <el-col :span="4">
              <button id="hlhx">
                <div>
                  <img src="../../assets/neiye/zhgz_b.png">
                  <div>
                    综合工作信息
                  </div>
                </div>
              </button>
            </el-col>

            <el-col :span="4">
              <button id="gzjxkh" @click="goTo(9)">
                <div>
                  <img src="../../assets/neiye/gzjx_b.png">
                  <div>
                    工作绩效考评
                  </div>
                </div>
              </button>
            </el-col>
            <el-col :span="4">
              <button id="spjk" @click="goTo(10)">
                <div>
                  <img src="../../assets/neiye/shiphuiyi_b.png">
                  <div>
                    视频监控
                  </div>
                </div>
              </button>
            </el-col>
            <el-col :span="4">
              <button id="xtgl" @click="goTo(15)">
                <div>
                  <img src="../../assets/neiye/ywzc_b.png">
                  <div>
                    运维支持(系统管理)
                  </div>
                </div>
              </button>
            </el-col>
            <el-col :span="4">
              <button id="more">
                <div>
                  <img src="../../assets/neiye/sphy_b.png">
                  <div>
                    视频会议
                  </div>
                </div>
              </button>
            </el-col>
          </el-row>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import { getToken, setRoute } from "@/utils/auth"; // 验权
  import constRouters from "@/utils/constRouter";
  export default {
    name: "dashboard",
    data() {
      return {
        show: false,
        menus: constRouters
      };
    },
    methods: {
      GenerateRoutes(path) {
        this.$store
                .dispatch("GenerateRoutes", this.$store.getters.user)
                .then(() => {
                  this.$router.addRoutes(this.$store.getters.addRouters);
                  this.$router.push(path);
                });
      },
      goTo(val) {
        setRoute("routeNum", val);
        this.$store.commit("SETROUTE", val);
        if (val === 1) {
          this.GenerateRoutes("/zongzhizuzhi");
        } else if (val === 2) {
          this.GenerateRoutes("/syrkIndex");
        } else if (val === 3) {
          this.GenerateRoutes("/tsrkIndex");
        } else if (val === 4) {
          this.GenerateRoutes("/trafficIndex");
        } else if (val === 5) {
          this.GenerateRoutes("/publicSecurityManage");
        } else if (val === 6) {
          this.GenerateRoutes("/ecAndsocial");
        } else if (val === 7) {
          this.GenerateRoutes("/disputeIndex");
        } else if (val === 8) {
          this.GenerateRoutes("/dlxxIndex");
        } else if (val === 9) {
          this.GenerateRoutes("/performanceIndex");
        } else if (val === 10) {
          this.GenerateRoutes("/videoWatchIndex");
        } else if (val === 11) {
          this.GenerateRoutes("/wtsbIndex");
        } else if (val === 12) {
          this.GenerateRoutes("/skynetManage");
        } else if (val === 13) {
          this.GenerateRoutes("/netManage");
        } else if (val === 14) {
          this.GenerateRoutes("/schoolSecurity");
        } else if (val === 15) {
          this.GenerateRoutes("/systemManage");
        }
      },
      getRoutes(menus) {
        menus.forEach(item => {
          if (item.visible) {
            this.$jquery("#" + item.className)
                    .removeAttr("disabled")
                    .removeClass("is-disabled")
                    .addClass("mylabel");
          }
        });
      },
      init() {
        // 设置所有按钮禁用
        this.$jquery(".dashboard-container button")
                .addClass("is-disabled")
                .attr("disabled", "true");
        if (this.$store.getters.user == null) {
          this.$store.dispatch("GetInfo").then(res => {
            let menus = res.menu;
            if (res.userRole == "超级管理员") {
              menus = this.menus;
              this.$store.commit("SET_ADMIN_ROUTE", menus);
            }
            this.getRoutes(menus);
          });
        } else {
          let menus = this.$store.getters.user.menu;
          if (this.$store.getters.user.userRole == "超级管理员") {
            menus = this.menus;
            this.$store.commit("SET_ADMIN_ROUTE", menus);
          }
          this.getRoutes(menus);
        }
      }
    },
    mounted() {
      // 没有登录信息，就转发到首页
      if (!getToken()) {
        this.GenerateRoutes("login");
      }
      this.init();

      if (this.$store.getters.loginInfo != null) {
        const h = this.$createElement;
        let message = '历史登录'+this.$store.getters.loginInfo.count+'次,上次登录时间'+this.$store.getters.loginInfo.date
        this.$notify({
          title: "登录信息",
          message:h('i',{style:"color:blue"},message),
          offset: 800
        });

        this.$store.commit('SET_LOGIN_INFO',null);
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .mylabel {
    font-size: 18px;
    color: white;
    font-weight: bold;
  }
  .menu td {
    padding: 20px;
  }

  .dashboard {
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }

  .is-disabled {
    color: gray;
    cursor: default;
  }

  .dashboard-container {
    height: 100vh;
    background-image: url(../../assets/neiye/neiye_bg.png);
    background-size: cover;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  button:hover {
    width: 110%;
    height: 110%;
  }

  .sys_btn {
    width: 300px;
    height: 180px;
    border-radius: 20px;
    font-size: 30px;
    text-align: center; // display: none
  }

  .ms_title {
    text-align: center;
    font-size: 50px;
    color: #1d8ce0;
    font-family: cursive; // font-weight: 1200;
    margin-top: 20px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
    border-radius: 10px;
  }

  ::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-image: -webkit-gradient(
                    linear,
                    left bottom,
                    left top,
                    color-stop(0.44, rgb(122, 153, 217)),
                    color-stop(0.72, rgb(73, 125, 189)),
                    color-stop(0.86, rgb(28, 58, 148))
    );
  }
</style>



// WEBPACK FOOTER //
// src/views/dashboard/index.vue?a02dc2de