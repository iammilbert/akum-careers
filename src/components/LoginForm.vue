<template>
  <div id="login" class="container align-items-center justify-content-center vh-100">
    <div class="row">

      <div class="col-md-3"></div>

      <div class="col-md-6 mt-5">
        <div class="card border-0 shadow">
          <div class="card-body">
            <h2 class="card-title text-center">Login</h2>
            <h6 class="card-title text-center mb-4">Welcome back, <br>Login to check your application status</h6>
            <div v-if="errors" style="color: red;">{{ errors }}</div>
            <form @submit.prevent="login">
              <div class="form-group mb-3">
                <label for="email" class="font-weight-bold">Email</label>
                <input type="email" class="form-control" id="email" v-model="email" placeholder="Enter your email" autocomplete="email" required>
              </div>
              <div class="form-group mb-3">
                <label for="password"  class="font-weight-bold">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" placeholder="" required>
              </div>
              <button type="submit" class="btn form-control text-white" style="background-color:#00C000;">Login</button>
            </form>
          </div>
        </div>
      </div>

      <div class="col-md-3"></div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      errors: '',
    };
  },
  methods: {
    login() {
      this.errors = '';
      axios.post('https://api.cv.scola.raadaa.com/cv/login', { email: this.email, password: this.password })
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: 'dashboardIndex',  params: { userDetails: response.data.success } });
        })
        .catch(errors => {
          this.errors = 'Invalid credentials';
          console.error(errors);
        });
    },
  },
};
</script>

<style>
#login {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
