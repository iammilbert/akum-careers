<template>
  <div id="login" class="container align-items-center justify-content-center vh-100">
    <div class="row">

      <div class="col-md-3"></div>

      <div class="col-md-6">
        <div class="card border-0 shadow">
          <div class="card-body">
            <h2 class="card-title text-center font-weight-bold">Login</h2>
            <h6 class="card-title text-center mb-4">Welcome back, <br>Login to check your application status</h6>
            
            <form @submit.prevent="login">
              <div class="form-group mb-3">
                <label for="email" class="font-weight-bold">Email</label>
                <input type="email" class="form-control form-control-lg" id="email" v-model="email" placeholder="Enter your email" autocomplete="email" required>
                <span v-if="errors.email" class="error">{{ errors.email }}</span>
              </div>
              <div class="form-group mb-3">
                <label for="password"  class="font-weight-bold">Password</label>
                <input type="password" class="form-control form-control-lg" id="password" v-model="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" required style="opacity: 0.6;">
                <span v-if="errors.password" class="error">{{ errors.password }}</span>
              </div>
            <button id="checkoutButton" :disabled="loading" type="submit" class="btn btn-outline-primary mt-3 form-control" style="background-color:#00C000; font-size:20px; color:white">
              <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              {{ loading ? 'Logging in...' : 'Login' }}
            </button>

              <div class="form-group mb-3 mt-3 text-center">
                  <router-link to="#" class="font-weight-bold">Forgot Password?</router-link>
              </div>

              <div class="form-group mt-2 ml-4">
                <input class="form-check-input me-2" type="checkbox" v-model="rememberMe"> Remember me
              </div>

              <div class="form-group mb-3 ml-1">
                New to AKUM Career?
                <router-link to="/" class="font-weight-bold">Register now.</router-link>
              </div>

            </form>
          </div>
        </div>
      </div>

      <div class="col-md-3"></div>

    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  data() {
    return {
      loading: false,
      email: '',
      password: '',
      errors: {} // Object to store error messages
    };
  },
  methods: {
    async login() {
      try {
        this.errors = {};
        this.loading = true;

        const response = await axios.post('https://api.portal.akum.edu.ng/api/staff/application/login', {
          email: this.email,
          password: this.password
        });

        const token = response.data.token;
        localStorage.setItem('token', token);

        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Redirecting you to dashboard',
          showConfirmButton: false,
          timer: 1300
        }).then(() => {
          window.location.href = '/applicantDashboard';
        });
      } catch (error) {
        this.loading = false;
        if (error.response && error.response.data && error.response.data.errors) {
          // Backend returned validation errors
          const backendErrors = error.response.data.errors;
          this.errors = backendErrors;
        } else {
          // Generic error handling
          console.error('Login failed:', error);
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Incorrect Login details, try again.', 
            showConfirmButton: false,
            timer: 4000,
          });
        }
      }
    }
  }
};
</script>

<style>
.error {
  color: red;
}
</style>

<style>
#login {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 60px;
}
.error {
  color: red;
}
</style>
