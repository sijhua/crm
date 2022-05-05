<template>
  <el-row>
    <el-col :span="2">
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#4F6585"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="0">
          <img
            src="../../public/logo.png"
            alt=""
            style="height: 120px; width: 122px; margin-left: -29px"
          />
        </el-menu-item>

        <router-link to="/manager" v-if="manager">
          <el-menu-item index="0">
            <img
              src="../../public/profile.png"
              alt=""
              style="
                height: 50px;
                width: 50px;
                margin-left: 0px;
                margin-top: 40px;
                border-radius: 50%;
              "
            />
          </el-menu-item>
        </router-link>
        <router-link to="/person" v-else>
          <el-menu-item index="0">
            <img
              src="../../public/profile.png"
              alt=""
              style="
                height: 50px;
                width: 50px;
                margin-left: 0px;
                margin-top: 40px;
                border-radius: 50%;
              "
            />
          </el-menu-item>
        </router-link>
        <router-link to="/tags" v-if="manager">
          <el-menu-item index="0">
            <i class="el-icon-menu" style="color: white"></i>
            <br />
            <span slot="title">tags</span>
          </el-menu-item>
        </router-link>
        <router-link to="/dashboard" v-else>
          <el-menu-item index="0">
            <i class="el-icon-menu" style="color: white"></i>
            <br />
            <span slot="title">dashboard</span>
          </el-menu-item>
        </router-link>
        <router-link to="/titles" v-if="manager">
          <el-menu-item index="0">
            <i class="el-icon-menu" style="color: white"></i>
            <br />
            <span slot="title">titles</span>
          </el-menu-item>
        </router-link>
        <template v-if="!manager">
          <router-link to="/contact">
            <el-menu-item index="0">
              <i class="el-icon-phone" style="color: white"></i>
              <br />
              <span slot="title">contacts</span>
            </el-menu-item>
          </router-link>
          <router-link to="/group">
            <el-menu-item index="0">
              <img
                src="../../public/group.png"
                alt=""
                style="
                  height: 30px;
                  width: 32px;
                  margin-left: 0px;
                  margin-top: 30px;
                "
              />
              <br />
              <span slot="title">groups</span>
            </el-menu-item>
          </router-link>
          <router-link to="/home">
            <div class="logout">
              <el-menu-item index="0">
                <img
                  src="../../public/logout.png"
                  alt=""
                  style="height: 50px; width: 50px"
                />
              </el-menu-item>
            </div>
          </router-link>
        </template>
        <router-link to="/home">
          <div class="logout">
            <el-menu-item index="0">
              <img
                src="../../public/logout.png"
                alt=""
                style="height: 50px; width: 50px"
              />
            </el-menu-item>
          </div>
        </router-link>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "navigation",
  data() {
    return {
      manager: sessionStorage.manager,
    };
  },
};
</script>

<style scoped>
.el-row,
.el-col,
.el-menu {
  height: 100%;
  width: 100px;
  overflow: hidden;
}
.el-menu-item {
  height: 105px;
  line-height: 30px;
  text-align: center;
  width: 100px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.el-menu-item i {
  font-size: 30px;
  margin-top: 28px;
}
.el-menu-item img {
  height: 45px;
  margin-top: 20px;
}
.el-menu::-webkit-scrollbar {
  display: none;
}
.logout {
  position: fixed;
  bottom: 0%;
}
</style>