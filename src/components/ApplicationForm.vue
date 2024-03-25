<template>
  <div id="login" class="container align-items-center justify-content-center">
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8"  style="font-family: Gebriola;">
    <h3 class="text-center mb-5" style="background-color:#EAFAF1"><span style="font-size:40px; font-weight-bold" class="text-success">{{ $route.query.faculty }}</span><br> 
   {{ $route.query.department }}</h3>
    
        <h3 class="text-center mb-3">{{ $route.query.jobTitle }}</h3>
        <div class="card border-0 shadow" style="background-color:#EAFAF1">
          <div class="card-body">
            <div v-if="errors" style="color: red;">{{ errors }}</div>
            <form @submit.prevent="submitApplication">
              <div class="form-group mb-3">
               <input type="hidden" id="jobId" class="form-control" v-model="jobId" readonly>
                <input type="hidden" class="form-control form-control-lg" id="user" v-model="user" readonly>
                <label>Select Employment Type</label>
                <select v-model="employment_type" class="form-control">
                  <option value="" disabled selected hidden>Select an option</option>
                  <option value="fulltime">Full-time</option>
                  <option value="parttime">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
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
              
              <div class="form-group mb-3">
                <label for="state_of_origin">State of Origin</label>
                <select class="form-control" id="state_of_origin" v-model="stateOfOrigin" required>
                  <option value="" disabled>Select State</option>
                  <option v-for="state in states" :key="state" :value="state">{{ state }}</option>
                </select>
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
              <div class="form-group mb-3" v-if="$route.query.jobType === 'special'">
                <label for="institution_worked_before">Previous Institution Worked</label>
                <input type="text" class="form-control" id="institution_worked_before" v-model="institution_worked_before" placeholder="Enter Institution" required>
              </div>

              <div class="form-group mb-3" v-if="$route.query.jobType === 'special'">
                <label for="staff_id_number"  class="">Staff ID</label>
                <input type="text" class="form-control" id="staff_id_number" v-model="staff_id_number" placeholder="Enter Staff Id" required>
              </div>

              <hr class="mt-3 mb-3">
  <p><i class="fas fa-exclamation-circle text-danger"></i> Format :(pdf, docx, jpeg, png, jpg)</p>
            <div class="form-group mb-3" v-if="$route.query.jobType === 'special'">
                <label for="letter_of_employment">Letter of Employment</label>
                <div class="input-group">
                  <div class="custom-file">
                    <input type="file" class="custom-file-input" id="letter_of_employment" accept=".pdf,.docx,.jpeg,.jpg,.png" @change="handleFileUpload($event, 'letter_of_employment')" required>
                    <label class="custom-file-label" for="letter_of_employment">{{ fileInputs.find(input => input.name === 'letter_of_employment').fileName || 'Choose file' }}</label>
                  </div>
                </div>
              </div>

            <div class="form-group mb-3">
            <label for="cv">Resume</label>
            <div class="input-group">
                <div class="custom-file">
                    <input type="file" class="custom-file-input" id="cv" accept=".pdf,.docx,.jpeg,.jpg,.png" @change="handleFileUpload($event, 'cv')" required>
                    <label class="custom-file-label" for="cv">{{ fileInputs.find(input => input.name === 'cv').fileName || 'Choose file' }}</label>
                </div>
            </div>
          </div>

          <div class="form-group mb-3">
            <label for="cover_letter">Cover Letter</label>
            <div class="input-group">
              <div class="custom-file">
                 <input type="file" class="custom-file-input" id="cover_letter" accept=".pdf,.docx,.jpeg,.jpg,.png" @change="handleFileUpload($event, 'cover_letter')" required>
                    <label class="custom-file-label" for="cover_letter">{{ fileInputs.find(input => input.name === 'cover_letter').fileName || 'Choose file' }}</label>
              </div>
            </div>
          </div>


           <div class="form-group mb-3">
            <label for="passport_photo">Passport Photograph</label>
            <div class="input-group">
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="passport_photo" accept=".jpeg,.jpg,.png" @change="handleFileUpload($event, 'passport_photo')" required>
                <label class="custom-file-label" for="passport_photo">{{ fileInputs.find(input => input.name === 'passport_photo').fileName || 'Choose file' }}</label>
              </div>
            </div>
          </div>

              <div class="form-group mb-5 mt-5">
                <button type="submit" :disabled="loading" class="btn rounded btn-lg form-control text-white" style="background-color:#00C000">
                  <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  {{ loading ? 'Submitting...' : 'Submit Application' }}
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
      jobId: this.$route.query.jobId,
      user: localStorage.getItem('user_id'),
      loading: false,
      errors: '',
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
      staff_id_number: '',
      cv: null,
      letter_of_employment: null,
      cover_letter: null,
      passport_photo: null,
      fileInputs: [
        { name: 'letter_of_employment', fileName: '' },
        { name: 'cv', fileName: '' },
        { name: 'cover_letter', fileName: '' },
        { name: 'passport_photo', fileName: '' }
      ],
      states: [
        'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta',
        'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT - Abuja', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina',
        'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers',
        'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
      ],

    };
  },
  methods: {
    handleFileUpload(event, name) {
      const file = event.target.files[0];
      // Update the fileName property of the corresponding file input object
      this.fileInputs.find(input => input.name === name).fileName = file ? file.name : '';
      // Update the data property with the selected file
      this[name] = file;
    },

   submitApplication() {
      this.loading = true;
      const formData = new FormData();
      formData.append('jobId', this.jobId);
      formData.append('user', this.user);
      formData.append('employment_type', this.employment_type);
      formData.append('firstname', this.firstname);
      formData.append('middlename', this.middlename);
      formData.append('lastname', this.lastname);
      formData.append('email', this.email);
      formData.append('phone_number', this.phone_number);
      formData.append('school', this.school);
      formData.append('degree', this.degree);
      formData.append('discipline', this.discipline);
      formData.append('institution_worked_before', this.institution_worked_before);
      formData.append('state_of_origin', this.stateOfOrigin);
      formData.append('staff_id_number', this.staff_id_number);
      formData.append('cv', this.cv);
      formData.append('letter_of_employment', this.letter_of_employment);
      formData.append('cover_letter', this.cover_letter);
      formData.append('passport_photo', this.passport_photo);

      axios.post(`https://api.portal.akum.edu.ng/api/akum/career`, formData)

        .then(response => {
          console.log('Application submitted successfully:', response.data);
          console.log('User ID:', this.userId);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Application submitted successfully!'
          });
          // Optionally, you can redirect to a success page or perform other actions
        })
      .catch(error => {
        console.error('Failed to submit application:', error);
        let errorMessage = 'Failed to submit application. Please try again later.';
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage
        });
      })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style>
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
