<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <levelbar></levelbar>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" src="../../assets/shza.png">
        <!-- <i class="el-icon-caret-bottom"></i> -->
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class='inlineBlock' to="/index">
          <el-dropdown-item>
            主菜单
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided><span @click="logout" style="display:block;">退出</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Levelbar from './Levelbar'
import Hamburger from '@/components/Hamburger'
import {deleteLogin} from '../../utils/auth'

export default {
  components: {
    Levelbar,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      deleteLogin()
      this.$router.push('/login')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .navbar {
        height: 50px;
        line-height: 50px;
        border-radius: 0px !important;
        .hamburger-container {
            line-height: 58px;
            height: 50px;
            float: left;
            padding: 0 10px;
        }
        .errLog-container {
            display: inline-block;
            position: absolute;
            right: 150px;
        }
        .screenfull {
            position: absolute;
            right: 90px;
            top: 16px;
            color: red;
        }
        .avatar-container {
            height: 50px;
            display: inline-block;
            position: absolute;
            right: 35px;
            .avatar-wrapper {
                cursor: pointer;
                margin-top: 5px;
                position: relative;
                .user-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }
                .el-icon-caret-bottom {
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
</style>




// WEBPACK FOOTER //
// src/views/layout/Navbar.vue?5b2efc70