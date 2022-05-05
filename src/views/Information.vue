<template>
  <el-container id="index-container">
    <el-aside width="100px">
      <navigation></navigation>
    </el-aside>
    <el-container>
      <el-header>
        <div class="infoshow">
          <el-row type="flex" class="row-bg">
            <div class="user">
              <img :src="info.profilePhote" class="avatar" alt="" width="100" />
              <div class="contact">
                <el-descriptions class="margin-top" :column="2" border>
                  <el-descriptions-item>
                    <template slot="label">
                      <i class="el-icon-user"></i>
                      Name
                    </template>
                    {{ info.name }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      <i class="el-icon-tickets"></i>
                      title
                    </template>
                    {{ info.title }}
                  </el-descriptions-item>

                  <el-descriptions-item>
                    <template slot="label">
                      <i class="el-icon-mobile-phone"></i>
                      job title
                    </template>
                    {{ info.jobTitle }}
                  </el-descriptions-item>

                  <el-descriptions-item
                    v-for="item in info.emails"
                    :key="item.key"
                  >
                    <template slot="label">
                      <i class="el-icon-office-building"></i>
                      emails
                    </template>
                    {{ item.value }}
                  </el-descriptions-item>
                  <el-descriptions-item
                    v-for="item in info.addresses"
                    :key="item.key"
                  >
                    <template slot="label">
                      <i class="el-icon-office-building"></i>
                      address
                    </template>
                    {{ item.value }}
                  </el-descriptions-item>
                  <el-descriptions-item
                    v-for="item in info.companys"
                    :key="item.key"
                  >
                    <template slot="label">
                      <i class="el-icon-office-building"></i>
                      company
                    </template>
                    {{ item.value }}
                  </el-descriptions-item>
                  <el-descriptions-item
                    v-for="item in info.websites"
                    :key="item.key"
                  >
                    <template slot="label">
                      <i class="el-icon-office-building"></i>
                      website
                    </template>
                    {{ item.value }}
                  </el-descriptions-item>
                  <el-descriptions-item
                    v-for="item in info.socialMediaProfiles"
                    :key="item.key"
                  >
                    <template slot="label">
                      <i class="el-icon-office-building"></i>
                      socialMediaProfile
                    </template>
                    {{ item.value }}
                  </el-descriptions-item>
                  <el-descriptions-item
                    v-for="item in info.impDates"
                    :key="item.key"
                  >
                    <template slot="label">
                      <i class="el-icon-office-building"></i>
                      impDates
                    </template>
                    {{ item.value }}
                  </el-descriptions-item>
                  <el-descriptions-item
                    v-for="item in info.tags"
                    :key="item.key"
                  >
                    <template slot="label">
                      <i class="el-icon-office-building"></i>
                      tags
                    </template>
                    {{ item.value }}
                  </el-descriptions-item>
                </el-descriptions>
              </div>
            </div>
          </el-row>
        </div>
      </el-header>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import navigation from "@/components/navigation";

export default {
  name: "Person",
  components: {
    navigation,
  },
  data() {
    return {
      info: {},
    };
  },
  async mounted() {
    let { id } = this.$route.query;
    let res = await this.$axios.get(this.$path.CONTACT + "/" + id);
    this.info = res.data.data[0];
  },
};
</script>

<style scoped>
html,
body,
.el-container {
  height: 100%;
}
.el-divider {
  position: relative;
  width: 100%;
  height: 20%;
  left: 0%;
  top: 490%;

  background: #7dc4d3;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.el-header img {
  height: 100px;
  margin-top: 28px;
  margin-left: 50px;
  border-radius: 50%;
}

.infoshow {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.row-bg {
  width: 100%;
  height: 100%;
}
.user {
  position: relative;
  top: 1%;
  left: 1%;
}
.user span {
  display: block;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.userinfo {
  height: 100%;
}
.user-item {
  position: relative;
  top: 33%;
  left: -60%;
  padding: 15px;
  font-size: 25px;
  font-family: Alatsi;
  font-style: normal;
  font-weight: normal;
}

.contact {
  position: relative;
  left: 241px;
  top: -90px;
  width: 700px;
}
.personal-infor {
  position: relative;
  left: 61px;
  top: 150px;
  width: 1000px;
}

.note {
  position: relative;
  top: 250px;
  left: 61px;
  width: 600px;
}
.note-title {
  display: inline-block;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 25px;
  margin-top: 30px;
  margin-left: 3%;
}
</style>