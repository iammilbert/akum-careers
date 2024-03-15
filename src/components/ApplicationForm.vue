<template>
  <div id="login" class="container align-items-center justify-content-center vh-100">
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8 mt-2">
        <h6 class="card-title text-center">Faculty : {{ $route.query.jobFaculty }}</h6>
        <h6 class="card-title text-center">Department: {{ $route.query.jobDepartment }}</h6>
        <h4 class="card-title text-center mb-4">{{ $route.query.jobTitle }}</h4>
        <div class="card border-0 shadow" style="background-color:#EAFAF1">
          <div class="card-body">
            <div v-if="errors" style="color: red;">{{ errors }}</div>
            <form @submit.prevent="submitApplication">
              <div class="form-group mb-3">
               <input type="hidden" id="jobId" class="form-control" v-model="jobId" readonly>
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
              <div class="form-group mb-3">
                <label for="institution_worked_before">Previous Institution Worked</label>
                <input type="text" class="form-control" id="institution_worked_before" v-model="institution_worked_before" placeholder="Enter Institution" required>
              </div>

              <div class="form-group mb-3">
                <label for="staff_id_number"  class="">Staff ID</label>
                <input type="text" class="form-control" id="staff_id_number" v-model="staff_id_number" placeholder="Enter Staff Id" required>
              </div>

              <hr class="mt-3 mb-3">
  <p><i class="fas fa-exclamation-circle text-danger"></i> Format :(pdf, docx, jpeg, png, jpg)</p>
              <div class="form-group mb-3" v-for="fileInput in fileInputs" :key="fileInput.id">
                <label :for="fileInput.id" class="d-block">{{ fileInput.label }}</label>
                <div class="input-group">
                  <div class="custom-file">
                    <input type="file" class="form-control" :id="fileInput.id" @change="handleFileUpload($event, fileInput.name)" :accept="fileInput.accept" required>
                    <label class="custom-file-label" :for="fileInput.id">{{ fileInput.fileName || 'Choose file' }}</label>
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
      loading: false,
      errors: '',
      email: '',
      employment_type: '',
      firstname: '',
      middlename: '',
      lastname: '',
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
      states: [
        'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta',
        'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT - Abuja', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina',
        'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers',
        'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
      ],
      fileInputs: [
        { id: 'cv', label: 'Upload Resume/CV', name: 'cv', accept: '.pdf,.docx,.jpeg,.jpg,.png' },
        { id: 'cover_letter', label: 'Cover Letter', name: 'cover_letter', accept: '.pdf,.docx,.jpeg,.jpg,.png' },
        { id: 'letter_of_employment', label: 'Letter of Employment', name: 'letter_of_employment', accept: '.pdf,.docx,.jpeg,.jpg,.png' },
        { id: 'passport_photo', label: 'Passport Photograph', name: 'passport_photo', accept: '.pdf,.docx,.jpeg,.jpg,.png' }
      ]
    };
  },
  methods: {
    handleFileUpload(event, fileType) {
      const file = event.target.files[0];
      const fieldName = event.target.id;
      this[fieldName] = file;
      // Update the fileName property for the corresponding file input
      const fileInput = this.fileInputs.find(input => input.name === fileType);
      if (fileInput) {
        fileInput.fileName = file ? file.name : null;
      }
    },

    submitApplication() {
      this.loading = true;
      const formData = new FormData();
      formData.append('jobId', this.jobId);
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

      axios.post('https://api.portal.akum.edu.ng/api/akum/career', formData)
        .then(response => {
          console.log('Application submitted successfully:', response.data);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Application submitted successfully!'
          });
          // Optionally, you can redirect to a success page or perform other actions
        })
        .catch(error => {
          console.error('Failed to submit application:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to submit application. Please try again later.'
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
