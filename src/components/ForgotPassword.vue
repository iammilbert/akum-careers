<template>
  <div id="login" class="container align-items-center justify-content-center vh-100">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <div class="card border-0 shadow">
          <div class="card-body">
            <h5 class="card-title text-center font-weight-bold">Recover your Password</h5>
            <h6 class="card-title mb-5 text-center">You can request a password reset below. <br>We will send a security link to the email address.</h6>
            <form @submit.prevent="sendPasswordResetEmail">
              <div class="form-group mb-3">
                <input type="email" class="form-control form-control-lg" id="email" v-model="email" placeholder="Enter your email" autocomplete="email" required>
                <span v-if="errors.email" class="error">{{ errors.email }}</span>
              </div>
              <button id="checkoutButton" :disabled="loading" type="submit" class="btn btn-outline-primary mt-3 form-control" style="background-color:#00C000; font-size:20px; color:white">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {{ loading ? 'Sending mail...' : 'Password Reset' }}
              </button>
              <div class="form-group mb-3 mt-5 text-center">
                For further support, you may visit the Help Center <br>or contact our customer service team.
              </div>
              <h3 class="text-center font-weight-bold" style="color:#00C000;">AKUM</h3>
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
      errors: {} // Object to store error messages
    };
  },
  methods: {
    async sendPasswordResetEmail() {
      try {
        this.errors = {};
        this.loading = true;

        // Check if email exists
        const response = await axios.post('https://api.portal.akum.edu.ng/api/check-email', {
          email: this.email
        });

        if (!response.data.exists) {
          Swal.fire({
            icon: 'error',
            title: 'Email Not Found',
            text: 'The provided email does not exist. Please enter a valid email address.',
            showConfirmButton: false,
            timer: 4000,
          });
          return;
        }

        // Email exists, proceed to send password reset email
        await axios.post('https://api.portal.akum.edu.ng/api/staff/application/send-password-reset-email', {
          email: this.email
        });

        Swal.fire({
          icon: 'success',
          title: 'Recover Password',
          text: 'Email sent successfully. Please check your inbox for the password reset link.',
          showConfirmButton: false,
          timer: 3000
        });
      } catch (error) {
        this.loading = false;
        if (error.response && error.response.data && error.response.data.errors) {
          // Backend returned validation errors
          const backendErrors = error.response.data.errors;
          this.errors = backendErrors;
        } else {
          // Generic error handling
          console.error('request failed:', error);
          Swal.fire({
            icon: 'error',
            title: 'Request Failed',
            text: 'Incorrect detail, try again.', 
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
