<template>
  <div id="login" class="container align-items-center justify-content-center vh-100">
    <div class="row">

      <div class="col-md-2"></div>

      <div class="col-md-8 mt-2">
       <h2 class="card-title text-center mb-4">Senior Administrative Officer</h2>
        <div class="card border-0 shadow" style="background-color:#EAFAF1">
          <div class="card-body">
            <div v-if="errors" style="color: red;">{{ errors }}</div>
            <form @submit.prevent="login">
             <div class="form-group mb-3 mt-2">
                <h5 for="first_name" class="font-weight-bold">Personal Details</h5>
              </div>
<div class="form-group mb-3">
    <!-- Select dropdown -->
    <label>Select Employment Type</label>
    <select v-model="selectedOption" class="form-control">
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
                <label for="first_name" class="">First Name</label>
                <input type="text" class="form-control" id="first_name" v-model="first_name" placeholder="Enter your first name" autocomplete="name" required>
              </div>
              <div class="form-group mb-3">
                <label for="middle_name" class="">Middle Name</label>
                <input type="text" class="form-control" id="middle_name" v-model="middle_name" placeholder="Enter your middle_name" autocomplete="middle name" required>
              </div>
              <div class="form-group mb-3">
                <label for="last_name" class="">Last Name</label>
                <input type="text" class="form-control" id="last_name" v-model="last_name" placeholder="Enter your last name" autocomplete="last name" required>
              </div>
               <div class="form-group mb-3">
                <label for="email" class="">Email Address</label>
                <input type="email" class="form-control" id="email" v-model="email" placeholder="e.g. admin@example.com" autocomplete="email" required>
              </div>
              <div class="form-group mb-3">
                <label for="phone_number" class="">Phone number</label>
                <input type="tel" class="form-control" id="phone_number" v-model="phone_number" placeholder="08162198753" autocomplete="phone number" required>
              </div>
              <div class="form-group mb-4 mt-5">
                <h5 for="email" class="font-weight-bold">Highest Education attained</h5>
              </div>

              <div class="form-group mb-3">
                <label for="school"  class="">Name of School</label>
                <input type="text" class="form-control" id="school" v-model="school" placeholder="Enter School name" required>
              </div>

             <div class="form-group mb-3">
                <label for="degree"  class="">Degree</label>
                <input type="text" class="form-control" id="degree" v-model="degree" placeholder="E.g. Batchelor Degree" required>
              </div>
              <div class="form-group mb-3">
                <label for="descipline"  class="">Descipline</label>
                <input type="text" class="form-control" id="descipline" v-model="descipline" placeholder="E.g. Computer Science" required>
              </div>
<hr class="mt-4 mb-4">
          <div class="form-group mb-3">
              <label for="cv" class="d-block">Upload Resume/CV</label>
              <div class="input-group">
                  <div class="custom-file">
                      <input type="file" class="form-control" id="cv" @change="handleFileUpload" accept="image/*" required>
                      <label class="custom-file-label" for="cv">Choose file</label>
                  </div>
              </div>
          </div>

          <div class="form-group mb-3">
              <label for="cv" class="d-block">Cover Letter</label>
              <div class="input-group">
                  <div class="custom-file">
                      <input type="file" class="form-control" id="cover_letter"  @change="handleFileUpload" accept="image/*" required>
                      <label class="custom-file-label" for="cv">Choose file</label>
                  </div>
              </div>
          </div>

            <div class="form-group mb-3">
              <label for="cv" class="d-block">Passport Photograph</label>
              <div class="input-group">
                  <div class="custom-file">
                      <input type="file" class="form-control" id="passport"  @change="handleFileUpload" accept="image/*" required>
                      <label class="custom-file-label" for="cv">Choose file</label>
                  </div>
              </div>
          </div>

              <div class="form-group mb-5 mt-5">
                <button type="submit" class="btn rounded btn-lg form-control text-white" style="background-color:#00C000">Submit Application</button>

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

export default {
  name: 'ApplicationForm',
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
