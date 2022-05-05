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
              <el-upload
                class="avatar-uploader"
                :action="upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <el-button type="text"
                  ><img
                    src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
                    class="avatar"
                    alt=""
                  />
                </el-button>
                <img
                  :src="addForm.thumb"
                  alt=""
                  v-if="addForm.thumb"
                  width="100"
                  style="position:absolute;height: 100px;margin-top: 40px;margin-left: -100px;border-radius: 50%; z-index:11"
                />
              </el-upload>
              <!-- <img
                src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
                class="avatar"
                alt=""
              /> -->
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
                  <el-form :model="passwordForm" :rules="rules" ref="password">
                    <span>New password</span>
                    <el-form-item prop="input1">
                      <el-input
                        placeholder="Please enter your new password"
                        v-model="passwordForm.input1"
                        show-password
                      ></el-input>
                    </el-form-item>
                    <span>Confirm password</span>
                    <el-form-item prop="input2">
                      <el-input
                        placeholder="Please enter your new password again"
                        v-model="passwordForm.input2"
                        show-password
                      ></el-input>
                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false"
                      >Cancel</el-button
                    >
                    <el-button type="primary" @click="updatePassword"
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
    let pass = (rule, value, callback) => {
      if (value === this.passwordForm.input1) {
        callback();
      } else {
        callback(new Error("Please keep the two inputs consistent！"));
      }
    };
    return {
      centerDialogVisible: false,
      DialogVisible: false,
      input: "",
      passwordForm: {
        input1: "",
        input2: "",
      },
      upload: this.$path.UPLOAD,
      addForm: {
        name: "",
        desc: "",
        thumb: "",
        uid: sessionStorage.id,
      },
      rules: {
        input1: {
          required: true,
          message: "please input password",
          trigger: "blur",
        },
        input2: [
          {
            required: true,
            message: "please input password",
            trigger: "blur",
          },
          {
            validator: pass,
            trigger: "blur",
          },
        ],
      },
      email: sessionStorage.email,
      password: sessionStorage.password,
      firstName: sessionStorage.firstName,
      lastName: sessionStorage.lastName,
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.addForm.thumb = res;
    },
    beforeAvatarUpload(file) {
      return true;
    },
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
    async updatePassword() {
      this.$refs.password.validate((v) => {
        if (v) {
          this.$axios
            .put(this.$path.LOGIN + "/" + sessionStorage.id, {
              newpassword: this.passwordForm.input1,
            })
            .then((res) => {
              if (res.data.code === 200) {
                this.$message.success(res.data.msg);
                this.centerDialogVisible = false;
                this.password = this.passwordForm.input1;
                sessionStorage.password = this.passwordForm.input1;
              }
            });
        } else {
          return false;
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
  left: -100px;
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