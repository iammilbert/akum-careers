<template>
  <header class="header-container">
    <div class="header-content" style="font-family:inter">
      <div class="text-content mb-2">
        <h3 class="bold d-block d-md-none" style="font-size:40px;">AKUM Careers</h3> <!-- Visible on small screens -->
        <h1 class="bold d-none d-md-block d-sm-none">AKUM</h1> <!-- Visible on medium and larger screens -->
        <h1 class="bold d-none d-md-block d-sm-none">Careers</h1> <!-- Visible on medium and larger screens -->
        <p style="font-size:18px;">Work towards a future you believe in. At Akum, every employee plays a part in our mission for a better tomorrow</p>
      </div>
      <div class="login-form rounded" id="createAccount">
        <div class="card">
         <div class="card-body">
          <form @submit.prevent="register">
            <h2 class="text-center">Create an Account</h2>
            <p class="text-center">Create Account to continue applying</p>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control form-control-lg" id="email" v-model="email" name="email" placeholder="Enter your email" required>
              </div>
            
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control form-control-lg" id="password" v-model="password" name="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" required style="opacity: 0.6;">
              </div>
            <div class="mt-3">
                <button id="checkoutButton" :disabled="loading" type="submit" class="btn btn-outline-primary mt-3 form-control" style="background-color:#00C000; font-size:20px; color:white">
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {{ loading ? 'Processing...' : 'Create Account' }}
                </button>

                <div class="form-group mb-3 ml-1 mt-4">
                  Already Registered?
                  <router-link to="/login" class="font-weight-bold">Login now.</router-link>
                </div>
            </div>
          </form>
        </div>
        </div>
      </div>
    </div>
  </header>
</template>


<script>
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  name: 'LandingPageHeader',
  data() {
    return {
    isMediumAndAbove: false,
      email: '',
      password: '',
      errors: {},
      loading: false,
    };
  },
   created() {
    // Check the screen size on component creation
    this.checkScreenSize();
    // Listen for window resize events to update the screen size
    window.addEventListener('resize', this.checkScreenSize);
  },
  unmounted() {
    // Remove the resize event listener when the component is unmounted
    window.removeEventListener('resize', this.checkScreenSize);
  },
  methods: {
    // Method to check the screen size and update the isMediumAndAbove variable
    checkScreenSize() {
      this.isMediumAndAbove = window.innerWidth >= 768; // 768px is the Bootstrap medium breakpoint
    },
    async register() {
      this.loading = true;
      this.buttonText = 'Processing...';
      this.errors = '';

    try {
        const response = await axios.post('https://api.portal.akum.edu.ng/api/staff/application/create', {
          email: this.email,
          password: this.password
        });

        console.log(response);

        if (response.data && response.data.code === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Registration',
            text: 'Account Created Successfully',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
          window.location.href = '/login';
        });

          // Clear email and password fields
          this.email = '';
          this.password = '';
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: response.data.message,
            showConfirmButton: false,
            timer: 4000,
          });
        } 

        return response; // Return the response for further handling if needed
      } catch (error) {
        // Handle network errors
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to connect to the server. Please try again later.',
          showConfirmButton: false,
          timer: 4000,
        });
      } finally {
        this.loading = false;
        this.buttonText = 'Create Account';
      }
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

/* Hide AKUM Careers on medium and larger screens */
.header-container .text-content h3.bold {
  display: none;
}

/* Hide AKUM header on small screens */
.header-container .text-content h1.bold {
  display: none;
}

/* Show AKUM Careers on small screens */
.header-container .text-content h1.bold.d-block.d-md-none {
  display: block;
}

/* Show AKUM header on medium and larger screens */
.header-container .text-content h1.bold.d-none.d-md-block {
  display: block;
}
</style>


