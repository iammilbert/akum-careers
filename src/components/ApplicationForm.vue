<template>
  <div id="login" class="container align-items-center justify-content-center vh-100">
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8 mt-2">
        <h2 class="card-title text-center mb-4">{{ $route.query.jobTitle }}</h2>
        <div class="card border-0 shadow" style="background-color:#EAFAF1">
          <div class="card-body">
            <div v-if="errors" style="color: red;">{{ errors }}</div>
            <form @submit.prevent="register">
              <div class="form-group mb-3">
                <label>Select Employment Type</label>
                <select v-model="employment_type" class="form-control">
                  <option value="" disabled selected hidden>Select an option</option>
                  <option value="fulltime">Full-time</option>
                  <option value="parttime">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="temporary">Temporary</option>
                  <option value="internship">Internship</option>
                  <option value="freelance">Freelance</option>
                  <!-- Add more options as needed -->
                </select>
              </div>
              <div class="form-group mb-3">
                <label for="firstname">First Name</label>
                <input type="text" class="form-control" id="firstname" v-model="firstname" placeholder="Enter your first name" autocomplete="name" required>
              </div>
              <div class="form-group mb-3">
                <label for="middlename">Middle Name</label>
                <input type="text" class="form-control" id="middlename" v-model="middlename" placeholder="Enter your middle name" autocomplete="middle name">
              </div>
              <div class="form-group mb-3">
                <label for="lastname">Last Name</label>
                <input type="text" class="form-control" id="lastname" v-model="lastname" placeholder="Enter your last name" autocomplete="last name" required>
              </div>
              <div class="form-group mb-3">
                <label for="email">Email Address</label>
                <input type="email" class="form-control" id="email" v-model="email" placeholder="e.g. admin@example.com" autocomplete="email" required>
              </div>
              <div class="form-group mb-3">
                <label for="phone_number">Phone number</label>
                <input type="tel" class="form-control" id="phone_number" v-model="phone_number" placeholder="08162198753" autocomplete="phone number" required>
              </div>
              <div class="form-group mb-4 mt-5">
                <h5 class="font-weight-bold">Highest Education attained</h5>
              </div>
              <div class="form-group mb-3">
                <label for="school">Name of School</label>
                <input type="text" class="form-control" id="school" v-model="school" placeholder="Enter School name" required>
              </div>
              <div class="form-group mb-3">
                <label for="degree">Degree</label>
                <input type="text" class="form-control" id="degree" v-model="degree" placeholder="E.g. Bachelor Degree" required>
              </div>
              <div class="form-group mb-3">
                <label for="discipline">Discipline</label>
                <input type="text" class="form-control" id="discipline" v-model="discipline" placeholder="E.g. Computer Science" required>
              </div>
              <div class="form-group mb-3">
                <label for="institution_worked_before">Previous Institution Worked</label>
                <input type="text" class="form-control" id="institution_worked_before" v-model="institution_worked_before" placeholder="Enter Institution" required>
              </div>
              <div class="form-group mb-3">
                <label for="state_of_origin">State of Origin</label>
                <select class="form-control" id="state_of_origin" v-model="stateOfOrigin" required>
                  <option value="" disabled>Select State</option>
                  <option v-for="state in states" :key="state" :value="state">{{ state }}</option>
                </select>
              </div>
              <div class="form-group mb-5 mt-5">
                <button type="submit" class="btn rounded btn-lg form-control text-white" style="background-color:#00C000">
                  <span v-if="isSubmitting" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> Processing</span>
                  <span v-else>Register</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-2"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'RegistrationForm',
  data() {
    return {
      isSubmitting: false,
      employment_type: '',
      firstname: '',
      middlename: '',
      lastname: '',
      email: '',
      phone_number: '',
      school: '',
      degree: '',
      discipline: '',
      institution_worked_before: '',
      stateOfOrigin: '',
      states: [
        'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta',
        'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT - Abuja', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina',
        'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers',
        'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
      ]
    };
  },
  methods: {
    register() {
      this.isSubmitting = true;
      const formData = {
        employment_type: this.employment_type,
        firstname: this.firstname,
        middlename: this.middlename,
        lastname: this.lastname,
        email: this.email,
        phone_number: this.phone_number,
        school: this.school,
        degree: this.degree,
        discipline: this.discipline,
        institution_worked_before: this.institution_worked_before,
        state_of_origin: this.stateOfOrigin
      };

      axios.post('https://api.portal.akum.edu.ng/api/akum/career', formData)
        .then(response => {
          console.log('Registration successful:', response.data);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Registration successful!'
          });
          // Optionally, you can redirect to a success page or perform other actions
        })
        .catch(error => {
          console.error('Failed to register:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to register. Please try again later.'
          });
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    }
  }
};
</script>


<style>
#login {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 60px;
}

.custom-file-label::after {
  content: "Browse";
}

.input-group > .custom-file .custom-file-label {
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn.rounded,
.btn.rounded:focus {
  border-radius: 13px !important; /* Adjust the value as needed */
}
</style>
