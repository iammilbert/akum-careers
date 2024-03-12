<template>
  <header class="header-container">
    <div class="header-content">
      <div class="text-content mb-2">
        <h1 class="bold">AKUM</h1>
        <h1 class="bold">Careers</h1>
        <p>Work towards a future you believe in. At Akum, every employee plays a part in our mission for a better tomorrow</p>
      </div>
      <div class="login-form rounded" id="createAccount">
        <div class="card p-5">
          <div class="btn-succcess btn" v-if="successMessage">{{ successMessage }}</div>

          <form @submit.prevent="register">
            <h2 class="text-center">Create an Account</h2>
            <p class="text-center">Create Account to continue applying</p>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" v-model="email" name="email" placeholder="Enter your email" required>
              <span v-if="errors.email" class="text-danger">{{ errors.email[0] }}</span>
            </div>
          
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control" id="password" v-model="password" name="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;">
            <span class="text-danger" v-if="errors.password">{{ errors.password[0] }}</span>
            </div>
            <div class="mt-3">
              <button @click="handleSave()" type="button" class="btn btn-outline-primary mt-3 form-control" style="background-color:#00C000; font-size:20px; color:white">Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';
export default {

  name: 'Landing_page_header',
  data() {
    return {
      email: '',
      password: '',
      errors: {},
    };
  },
  methods: {
    handleSave() {
    this.errors = '';
        axios.post('https://api.cv.scola.raadaa.com/cv/register', {email: this.email, password: this.password})
        .then(response => {
          console.log(response); // Log the entire response object for debugging
          
          // Check if the response contains a message field or not
          if (response.data && response.data.message) {
            // If there is a message field, display it in SweetAlert as a success message
            Swal.fire({
              icon: 'success',
              title: 'Account Created',
              text: response.data.message, // Use response.data.message as the text of the alert
              showConfirmButton: false,
              timer: 4000,
              customClass: {
                content: 'small-text' // Define a CSS class to reduce text size
                }
            });
          } else {
            // If there is no message field, handle it as per your requirements
            console.log('Response does not contain a message field');
          }

          // Clear email and password fields
          this.email = "";
          this.password = "";

          return response; // Return the response for further handling if needed
        })
        .catch(errors => {
          // Handle validation errors
        if (errors.response.status === 422) {
        this.errors = errors.response.data.errors;
            this.successMessage = ''; // Clear success message if there was an error
          } else {
            // Handle other errors (e.g., server error)
            console.error('Registration failed:', errors);
          }
        });
    }
  }
};
</script>

<style scoped>
.small-text {
  font-size: 12px; /* Adjust the font size as needed */
}
.header-container {
  background-image: linear-gradient(to right, rgba(0, 40, 0, 10), rgba(0, 0, 0, 0)), url('@/assets/images/low-rise-building.jpg');
  background-size: cover;
  background-position: center;
  color: #fff;
  padding: 50px 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.text-content {
  width: 50%;
}

.text-content .bold{
  font-weight: bolder;
  font-size: 76px;
  letter-spacing: 2px;
}

.text-content p{
  font-size:20px;
  text-align: justify;

}

.login-form {
  width: 40%;
  background-color: #fff; /* Add background color */
   color:black;
  
}

@media (max-width: 768px) {
    .header-content .bold{
    text-align: center;
  }
  
  .header-content {
    flex-direction: column;
    text-align: justify;
  }

  .text-content,
  .login-form {
    width: 100%;
    margin-bottom: 20px;
   
  }

.form-group {
  margin-bottom: 10px;
}
span {
  color: red;
  font-size: 14px;
}
}
</style>
