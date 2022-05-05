<template>
  <el-container id="index-container">
    <el-aside width="100px">
      <navigation></navigation>
    </el-aside>
    <el-container>
      <el-main>
        <div class="infoshow">
          <el-row type="flex" class="row-bg">
            <div class="user">
              <img
                src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
                class="avatar"
                alt=""
              />
            </div>
            <div class="name">{{ firstName }} {{ lastName }}</div>
            <div class="userinfo">
              <div class="user-item">
                <span>email:</span>
                <span class="border-item">{{ email }}</span>
                <el-button type="text" @click="DialogVisible = true"
                  ><i class="el-icon-edit"></i
                ></el-button>

                <el-dialog
                  title="Change email"
                  :visible.sync="DialogVisible"
                  width="30%"
                >
                  <span>New email</span>
                  <el-input
                    v-model="input"
                    placeholder="Please enter your new email"
                  ></el-input>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="DialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="updateEmail"
                      >Confirm</el-button
                    >
                  </span>
                </el-dialog>
              </div>
              <div class="user-item">
                <span>password:</span>
                <span class="border-item">{{ password }}</span>

                <el-button type="text" @click="centerDialogVisible = true"
                  ><i class="el-icon-edit"></i
                ></el-button>

                <el-dialog
                  title="Change password"
                  :visible.sync="centerDialogVisible"
                  width="30%"
                  center
                >
                  <span>New password</span>
                  <el-input
                    placeholder="Please enter your new password"
                    v-model="input1"
                    show-password
                  ></el-input>
                  <span>Confirm password</span>
                  <el-input
                    placeholder="Please enter your new password again"
                    v-model="input2"
                    show-password
                  ></el-input>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false"
                      >Cancel</el-button
                    >
                    <el-button
                      type="primary"
                      @click="updatePassword"
                      >Confirm</el-button
                    >
                  </span>
                </el-dialog>
              </div>
            </div>
          </el-row>
        </div>
      </el-main>
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
      centerDialogVisible: false,
      DialogVisible: false,
      input: "",
      input1: "",
      input2: "",
      email: sessionStorage.email,
      password: sessionStorage.password,
      firstName: sessionStorage.firstName,
      lastName: sessionStorage.lastName,
    };
  },
  methods: {
    async updateEmail() {
      this.$axios
        .put(this.$path.LOGIN + "/" + sessionStorage.id, { email: this.input })
        .then((res) => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.DialogVisible = false;
            this.email = this.input;
            sessionStorage.email = this.input;
          }
        });
    },
    async updatePassword(){
      this.$axios
        .put(this.$path.LOGIN + "/" + sessionStorage.id, { newpassword: this.input1 })
        .then((res) => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.centerDialogVisible = false;
            this.password = this.input1;
            sessionStorage.password = this.input1;
          }
        });
    },
  },
};
</script>


<style scoped>
html,
body,
.el-container {
  height: 100%;
}
.el-main img {
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
.name {
  position: relative;
  top: 150px;
  left: 100px;
  font-size: 40px;
  margin-top: -40px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
}
.row-bg {
  width: 100%;
  height: 100%;
}
.user {
  position: relative;
  top: 50px;
  left: 50px;
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
  top: 260px;
  left: -70px;
  padding: 15px;
  font-size: 25px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
}
.border-item {
  position: absolute;
  left: 100%;
  text-align: right;
  padding: 4px;
  display: inline-block;
  width: 300px;
  height: 20px;
  background: #e9e9e9;
  border-radius: 5px;
}
.user-item i {
  position: absolute;
  font-size: 20px;
  left: 450px;
  top: 29%;
  padding: 4px;
  display: inline-block;
  color: black;
}
</style>