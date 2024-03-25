<template>
  <div id="change-password" class="container align-items-center justify-content-center vh-100">
    <div class="row">

      <div class="col-md-3"></div>

      <div class="col-md-6">
        <div class="card border-0 shadow">
          <div class="card-body">
            <h5 class="card-title text-center font-weight-bold">Change your Password</h5>
            <h6 class="card-title mb-5 text-center">Provide current and new password below.</h6>
            
            <form @submit.prevent="changePassword">
              <!-- Display userId if it exists -->

                <input type="hidden" class="form-control form-control-lg" id="userId" v-model="userId" readonly>
 

              <div class="form-group mb-3">
                <label for="oldPassword" class="font-weight-bold">Current Password</label>
                <input type="password" class="form-control form-control-lg" id="oldPassword" v-model="oldPassword" placeholder="Current Password" required>
                <span v-if="errors.oldPassword" class="error">{{ errors.oldPassword }}</span>
              </div>

              <div class="form-group mb-3">
                <label for="newPassword" class="font-weight-bold">New Password</label>
                <input type="password" class="form-control form-control-lg" id="newPassword" v-model="newPassword" placeholder="New Password" required>
                <span v-if="errors.newPassword" class="error">{{ errors.newPassword }}</span>
              </div>

              <div class="form-group mb-3">
                <label for="confirm_newPassword" class="font-weight-bold">Confirm New Password</label>
                <input type="password" class="form-control form-control-lg" id="confirm_newPassword" v-model="confirm_newPassword" placeholder="Confirm New Password" required>
                <span v-if="errors.confirm_newPassword" class="error">{{ errors.confirm_newPassword }}</span>
              </div>

              <button :disabled="loading" type="submit" class="btn btn-outline-primary mt-3 form-control" style="background-color:#00C000; font-size:20px; color:white">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {{ loading ? 'Changing Password...' : 'Change Password' }}
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
      userId: localStorage.getItem('user_id'), // Retrieve userId from local storage
      oldPassword: '',
      newPassword: '',
      confirm_newPassword: '',
      errors: {} // Object to store error messages
    };
  },
  methods: {
    async changePassword() {
      try {
        this.errors = {};
        this.loading = true;

        // Check if new passwords match
        if (this.newPassword !== this.confirm_newPassword) {
          this.errors.confirm_newPassword = "Passwords do not match";
          this.loading = false;
          return;
        }

        await axios.put(`https://api.portal.akum.edu.ng/api/change-password/${this.userId}`, {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        });

        // Handle success
        Swal.fire({
          icon: 'success',
          title: 'Password Changed',
          text: 'Your password has been changed successfully',
          showConfirmButton: false,
          timer: 1000
        }).then(() => {
          window.location.href = '/applicantDashboard';
        });
         this.loading = false;
      } catch (error) {
        this.loading = false;
        if (error.response && error.response.data && error.response.data.errors) {
          // Backend returned validation errors
          const backendErrors = error.response.data.errors;
          this.errors = backendErrors;
        } else {
          // Generic error handling
          console.error('Request failed:', error);
          Swal.fire({
            icon: 'error',
            title: 'Request Failed',
            text: 'An error occurred. Please try again.', 
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
