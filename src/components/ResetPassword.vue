<template>
  <div id="login" class="container align-items-center justify-content-center vh-100" style="font-family:inter">
    <div class="row">

      <div class="col-md-3"></div>

      <div class="col-md-6">
        <div class="card border-0 shadow">
          <div class="card-body">
            <h5 class="card-title text-center font-weight-bold">Reset your Password</h5>
            <h6 class="card-title mb-5 text-center">Provide new password below.</h6>
            
            <form @submit.prevent="login">
              <div class="form-group mb-3">
                <label for="password"  class="font-weight-bold">New Password</label>
                <input type="password" class="form-control form-control-lg" id="password" v-model="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" required style="opacity: 0.6;">
                <span v-if="errors.password" class="error">{{ errors.password }}</span>
              </div>

             <div class="form-group mb-3">
                <label for="confirm_password"  class="font-weight-bold">Confirm Password</label>
                <input type="password" class="form-control form-control-lg" id="confirm_password" v-model="confirm_password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" required style="opacity: 0.6;">
                <span v-if="errors.confirm_password" class="error">{{ errors.confirm_password }}</span>
              </div>

            <button id="checkoutButton" :disabled="loading" type="submit" class="btn btn-outline-primary mt-3 form-control" style="background-color:#00C000; font-size:20px; color:white">
              <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              {{ loading ? 'Reseting Password...' : 'Recover Password' }}
            </button>
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
      password: '',
      confirm_password: '',
      errors: {} // Object to store error messages
    };
  },
  methods: {
    async login() {
      try {
        this.errors = {};
        this.loading = true;

       // Check if passwords match
        if (this.password !== this.confirm_password) {
          this.errors.confirm_password = "Passwords do not match";
          this.loading = false;
          return;
        }

        const response = await axios.post('https://api.portal.akum.edu.ng/api/staff/application/forgot-password', {
          password: this.password
        });

        const token = response.data.token;
        localStorage.setItem('token', token);

        Swal.fire({
          icon: 'success',
          title: 'Recover Password',
          text: 'Password reset successfully',
          showConfirmButton: false,
          timer: 1300
        });
      } catch (error) {
        this.loading = false;
        if (error.response && error.response.data && error.response.data.errors) {
          // Backend returned validation errors
          const backendErrors = error.response.data.errors;
          this.errors = backendErrors;
        } else {
          // Generic error handling
          console.error('Requets failed:', error);
          Swal.fire({
            icon: 'error',
            title: 'Request Failed',
            text: 'Error Occured, try again.', 
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
