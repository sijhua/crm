<template>
  <div class="background">
    <div class="welcome-box">
      <p class="text">
        Welcome to <br />
        Customer relationship management
      </p>
      <!-- change name "button" to register-botton -->
      <router-link to="/register">
        <button class="button">Register</button>
      </router-link>
      <router-link to="/login">
        <button class="login-button">Login</button>
      </router-link>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      input: "",
    };
  },
};
</script>





<style scoped>
.background {
  background: #4f6585;
  height: 100%;
  width: 100%;
}
.welcome-box {
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
  text-align:center;
  width: 1000px;
  height: 60px;
  top: 83px;

  font-family: Faustina;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 60px;
  text-align: center;

  color: #4f6585;
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
  top: 55%;

  background: #4f6585;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  text-indent: 60%;
  font-family: Faustina;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 50px;
  color: white;
}
.login-button {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px;

  position: absolute;
  width: 32%;
  height: 73px;
  left: 34%;
  top: 78%;

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
</style>