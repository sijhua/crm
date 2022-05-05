<template>
  <div class="background">
    <router-link to="/home">
      <i class="el-icon-back" style="color: white"></i>
    </router-link>
    <p class="text">Login</p>
    <div class="login-box">
      <div class="password-input">
        <p>Password</p>
        <el-input
          placeholder="Please input password"
          v-model="loginForm.password"
          show-password
        ></el-input>
      </div>

      <div class="email-input">
        <p>Email</p>
        <el-input
          placeholder="Please input email"
          v-model="loginForm.email"
        ></el-input>
      </div>
      <button class="button" @click="handleLogin">Login</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async handleLogin() {
      let res = await this.$axios.post(this.$path.LOGIN, this.loginForm);
      if (res.data.code === 200) {
        this.$message.success("success");
        sessionStorage.id = res.data.id;
        sessionStorage.email = res.data.email;
        sessionStorage.password = res.data.password;
        sessionStorage.firstName = res.data.firstName;
        sessionStorage.lastName = res.data.lastName;

        this.$router.push({ name: "Person" });
      }
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
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px;

  position: absolute;
  width: 32%;
  height: 73px;
  left: 34%;
  top: 70%;

  background: #4f6585;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  text-indent: 100%;
  font-family: Faustina;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 50px;
  text-align: absolute;
  color: white;
}
.login-button {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px;

  position: absolute;
  width: 340.07px;
  height: 69.57px;
  left: 286.18px;
  top: 420px;

  background: #4f6585;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  text-indent: 105%;
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
  width: 40%;
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
  width: 40%;
  height: 100px;
  left: 30%;
  top: 25%;

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
</style>