<template>
  <div class="background">
    <router-link to="/home">
      <i class="el-icon-back" style="color: white"></i>
    </router-link>

    <p class="text">Register</p>
    <div class="login-box">
      <el-form :model="signForm" :rules="rules" ref="signForm">
        <div class="password-input">
          <p>Password</p>
          <el-form-item prop="password">
            <el-input
              placeholder="Please input password"
              v-model="signForm.password"
              show-password
            ></el-input>
          </el-form-item>
        </div>

        <div class="email-input">
          <p>Email</p>
          <el-form-item prop="email">
            <el-input
              placeholder="Please input email"
              v-model="signForm.email"
            ></el-input>
          </el-form-item>
        </div>

        <div class="name">
          <el-row>
            <el-col style="margin-right: 30px; width: 180px">
              <p>First Name</p>
              <el-form-item prop="firstName">
                <el-input
                  class="textarea"
                  placeholder="First Name"
                  v-model="signForm.firstName"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col style="width: 180px">
              <p>Last Name</p>
              <el-form-item prop="lastName">
                <el-input
                  placeholder="Last Name"
                  v-model="signForm.lastName"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="confirm-password">
          <p>Confirm Password</p>
          <el-form-item prop="repassword">
            <el-input
              placeholder="Please input password again"
              v-model="signForm.repassword"
              show-password
            ></el-input>
          </el-form-item>
        </div>
        <button class="button" type="button" @click="handleRegister">Register</button>
      </el-form>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    let pass = (rule, value, callback) => {
      if (value === this.signForm.password) {
        callback();
      } else {
        callback(new Error("Please keep the two inputs consistent！"));
      }
    };
    return {
      signForm: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repassword: "",
      },
      rules: {
        firstName: {
          required: true,
          message: "please input firstname",
          trigger: "blur",
        },
        lastName: {
          required: true,
          message: "please input lastname",
          trigger: "blur",
        },
        email: [
          {
            required: true,
            message: "please input email",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Please enter the correct email address",
            trigger: "blur",
          },
        ],
        password: {
          required: true,
          message: "please input password",
          trigger: "blur",
        },
        repassword: [
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
    };
  },
  methods: {
    async handleRegister() {
      this.$refs.signForm.validate(async (v) => {
        if (v) {
          let res = await this.$axios.post(this.$path.SIGN, this.signForm);
          if (res.data.code === 200) {
            this.$message.success("success");
            this.$router.push({ name: "Login" });
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>





<style scoped>
.background {
  background: #4f6585;
  height: 100%;
  width: 100%;
}
.login-box {
  position: absolute;

  width: 60%;
  height: 70%;
  left: 20%;
  top: 15%;

  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}
.name {
  top: 500px;
}
.name /deep/ el-input.textarea {
  color: black;
}
.text {
  position: absolute;
  width: 168px;
  height: 81px;
  left: 20%;
  top: 7%;

  font-family: Faustina;
  font-style: normal;
  font-weight: bold;
  font-size: 64px;
  line-height: 81px;
  /* identical to box height */

  text-align: center;

  color: #ffffff;
}
.button {
  display: inline-block;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px;

  position: absolute;
  width: 32%;
  height: 73px;
  left: 34%;
  top: 80%;

  background: #4f6585;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  text-align: center;
  font-family: Faustina;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 50px;
  text-align: absolute;
  color: white;
}

.password-input {
  position: absolute;
  width: 392px;
  height: 100px;
  left: 30%;
  top: 43%;

  font-family: Basic;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 28px;
  /* identical to box height */

  text-align: center;

  color: #000000;
}

.email-input {
  position: absolute;
  width: 392px;
  height: 100px;
  left: 30%;
  top: 27%;

  font-family: Basic;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 28px;
  /* identical to box height */

  text-align: center;

  color: #000000;
}
.el-icon-back {
  font-size: 50px;
}
.name {
  position: absolute;
  width: 50%;
  left: 30%;
  top: 10%;

  font-family: Basic;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 28px;
  /* identical to box height */

  text-align: center;

  color: #000000;
}

.confirm-password {
  position: absolute;
  width: 392px;
  height: 100px;
  left: 30%;
  top: 60%;

  font-family: Basic;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 28px;
  /* identical to box height */

  text-align: center;

  color: #000000;
}
</style>
