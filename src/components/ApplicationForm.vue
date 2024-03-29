<template>
  <div id="login" class="container align-items-center justify-content-center" style="font-family:inter">

    <div class="row">
      <div class="col-md-1"></div>
      <div class="col-md-10">
        <h3 class="text-center mb-3" style="background-color:#EAFAF1">
          <span style="font-size:40px; font-weight:bold" class="text-success">{{ faculty }}</span><br> 
          {{ jobDepartment }}
        </h3>
        <h3 class="text-center mb-3" style="font-size:30px; font-weight:500px;">{{ jobTitle }}</h3>

        <div class="progress mb-3">
          <div class="progress-bar" role="progressbar" :style="{ width: (currentStep * 33.33) + '%' }" aria-valuenow="33.33" aria-valuemin="0" aria-valuemax="100">{{ currentStep * 33.33 }}%</div>
        </div>
      </div>
      <div class="col-md-1"></div>
    </div>

    <!-- Single form for all steps -->
    <form @submit.prevent="submitApplication">

      <!-- Step 1 Content -->
      <div v-if="currentStep === 1">
        <div class="row">
          <div class="col-md-1"></div>
          <div class="col-md-10">
            <div class="card border-0 shadow" style="background-color:#EAFAF1">
              <div class="card-body">
                <h3 class="mb-3" style="font-size:16" >Personal Details</h3>
                <!-- Step 1 form fields -->
              <div class="row">
                <div class="col-md-6">
                    <div class="form-group mb-3">
                    <input type="hidden" id="job_role" class="form-control" v-model="job_role" readonly>
                    <input type="hidden" class="form-control form-control-lg" id="user" v-model="user" readonly>
                     <input type="hidden" class="form-control form-control-lg" id="type" v-model="type" readonly>
                    <label>Select Employment Type</label>
                    <select v-model="employment_type" class="form-control">
                      <option value="" disabled selected hidden>Select an option</option>
                      <option value="fulltime">Full-time</option>
                      <option value="parttime">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                    </select>
                    <small class="text-danger">{{ employment_typeError }}</small> 
                  </div>
                  <div class="form-group mb-3">
                    <label for="middlename">Middle Name</label>
                    <input type="text" class="form-control" id="middlename" v-model="middlename" placeholder="Enter your middle name" autocomplete="middle name">
                  </div>
                  <div class="form-group mb-3">
                    <label for="email">Email Address</label>
                    <input type="email" class="form-control" id="email" v-model="email" placeholder="e.g. admin@example.com" autocomplete="email">
                     <small class="text-danger">{{ emailError }}</small> 
                  </div>
                  <div class="form-group mb-3">
                    <label for="dob">Date of Birth</label>
                    <input type="date" class="form-control" id="dob" v-model="dob" autocomplete="date">
                     <small class="text-danger">{{ dobError }}</small> 
                  </div>

                  <div class="form-group mb-3">
                    <label for="nationality">Nationality</label>
                    <select class="form-control" id="nationality" v-model="nationality" @change="updateStates" >
                      <option value="" disabled selected>Select Nationality</option>
                      <option v-for="nationality in nationalities" :key="nationality" :value="nationality">{{ nationality }}</option>
                    </select>
                     <small class="text-danger">{{ nationalityError }}</small> 
                  </div>
                  <div class="form-group mb-3">
                    <label for="local_govt">Local Government</label>
                    <input type="text" class="form-control" id="local_govt" v-model="local_govt" placeholder="Enter Local Govt">
                    <small class="text-danger">{{ lgaError }}</small> 
                  </div>
                  
                  <div class="form-group mb-3">
                    <label for="address">Address</label>
                    <textarea v-model="address" class="form-control" placeholder="Enter Address"></textarea>
                    <small class="text-danger">{{ addressError }}</small> 
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group mb-3">
                    <label for="firstname">First Name</label>
                    <input type="text" class="form-control" id="firstname" v-model="firstname" placeholder="Enter your first name" autocomplete="first name">
                    <small class="text-danger">{{ firstNameError }}</small> 
                  </div>
                  <div class="form-group mb-3">
                    <label for="lastname">Last Name</label>
                    <input type="text" class="form-control" id="lastname" v-model="lastname" placeholder="Enter your last name" autocomplete="last name">
                    <small class="text-danger">{{ lastNameError }}</small> 
                  </div>
                  <div class="form-group mb-3">
                    <label for="phone_number">Phone number</label>
                    <input type="tel" class="form-control" id="phone_number" v-model="phone_number" placeholder="08162198753" autocomplete="phone number">
                    <small class="text-danger">{{ phone_numberError }}</small> 
                  </div>

                 <div class="form-group mb-3">
                    <label for="gender">Gender</label>
                    <select class="form-control" id="gender" v-model="gender" @change="updateLocalGovernments" >
                      <option value="" disabled selected>Select Gender</option>
                      <option v-for="gender in genders" :key="gender" :value="gender">{{ gender }}</option>
                    </select>
                    <small class="text-danger">{{ genderError }}</small>
                    
                  </div>

                  <div class="form-group mb-3">
                    <label for="state_of_origin">State</label>
                    <select class="form-control" id="state" v-model="state_of_origin" >
                      <option value="" disabled selected>Select State</option>
                      <option v-for="state in nigeriaStates" :key="state" :value="state">{{ state }}</option>
                    </select>
                    <small class="text-danger">{{ stateError }}</small>
                  </div>

                  <div class="form-group mb-3">
                    <label for="city">City</label>
                    <input type="text" class="form-control" id="city" v-model="city" placeholder="Enter City" >
                    <small class="text-danger">{{ cityError}}</small>
                  </div>
                </div>
              </div>
                <!-- Add more Step 1 fields here -->
              </div>
              <div class="modal-footer justify-content-between">
                     <router-link :to="{ path: '/applicantDashboard' }" class="btn btn-outline-primary">Back</router-link>
                    <button type="submit" @click="validateStep1AndProceed" class="btn btn-primary">Next</button>
                </div>
            </div>
          </div>
          <div class="col-md-1"></div>
        </div>
      </div>

      <!-- Step 2 Content -->
      <div v-if="currentStep === 2">
        <div class="row">
          <div class="col-md-1"></div>
          <div class="col-md-10">
            <div class="card border-0 shadow" style="background-color:#EAFAF1">
              <div class="card-body">
                <h3 class="mb-3" style="font-size:16" >Educational Qualification</h3>
                <!-- Step 2 form fields -->
              <div class="row">
                <div class="col-md-6">
              <div class="form-group mb-3">
                <label for="name_of_school">Name of School</label>
                <input type="text" class="form-control" id="name_of_school" v-model="name_of_school" placeholder="Enter School name">
                 <small class="text-danger">{{ schoolError }}</small>
              </div>

               <div class="form-group mb-3">
                <label for="department">Department</label>
                <input type="text" class="form-control" id="department" v-model="department" placeholder="Enter department">
                <small class="text-danger">{{ departmentError }}</small>
              </div>

              <div class="form-group mb-3">
                <label for="specialization">Specialization</label>
                <input type="text" class="form-control" id="specialization" v-model="specialization" placeholder="E.g. Enter specialization">
                 <small class="text-danger">{{ specializationError }}</small>
              </div>
              <div class="form-group mb-3">
                <label for="date_of_first_employment">Date of First Employment</label>
                <input type="date" class="form-control" id="date_of_first_employment" v-model="date_of_first_employment">
                 <small class="text-danger">{{ dateOfFirstEmploymentError }}</small>
              </div>
            </div>
            <div class="col-md-6">
                <div class="form-group mb-3">
                  <label for="degree">Degree</label>
                  <input type="text" class="form-control" id="degree" v-model="degree" placeholder="E.g. Bachelor Degree">
                   <small class="text-danger">{{ degreeError }}</small>
                </div>
                <div class="form-group mb-3">
                  <label for="discipline">Discipline</label>
                  <input type="text" class="form-control" id="discipline" v-model="discipline" placeholder="E.g. Computer Science">
                   <small class="text-danger">{{ disciplineError }}</small>
                </div>

              <!-- <div class="form-group mb-3" v-if="$route.query.jobType === 'special'"> -->
              <div class="form-group mb-3">                
              <label for="previous_employer">Previous Employer/Institution</label>
                <input type="text" class="form-control" id="previous_employer" v-model="previous_employer" placeholder="Enter Institution">
                 <small class="text-danger">{{ previous_employerError }}</small>
              </div>

              <div class="form-group mb-3" >
                <label for="professional_association">Professional Associations Membership</label>
                <textarea type="text" class="form-control" id="professional_association" v-model="professional_association" placeholder="Enter Professional Association Membership" ></textarea>
                 <small class="text-danger">{{ associationMembershipError }}</small>
              </div>
            </div>
          </div>

           <div class="modal-footer justify-content-between">
                  <button type="button" class="btn btn-outline-primary" @click="previousStep" >Back</button>

                  <button type="button" class="btn btn-primary" @click="validateStep2AndProceed">Next</button>
              </div>
              </div>
            </div>
          </div>
          <div class="col-md-1"></div>
        </div>
      </div>

      <!-- Step 3 Content -->
      <div v-if="currentStep === 3">
        <div class="row">
          <div class="col-md-1"></div>
          <div class="col-md-10">
            <div class="card border-0 shadow" style="background-color:#EAFAF1">
              <div class="card-body">
                <h3 class="mb-3" style="font-size:16" >Conferences/Workshops/Seminars Attended</h3>
              <div class="row">
                <div class="col-md-6">
                    <div class="form-group mb-3">                                
                    <label>No. of International Conferences</label>
                    <input type="number" id="no_of_international_conferences" class="form-control" v-model="no_of_international_conferences">
                     <small class="text-danger">{{ no_of_international_conferencesError }}</small>
                    </div>
                  <div class="form-group mb-3">
                    <label for="no_of_local_conferences">No. of Local Conference</label>
                    <input type="number" id="no_of_local_conferences" class="form-control" v-model="no_of_local_conferences">
                    <small class="text-danger">{{ no_of_local_conferencesError }}</small>
                  </div>
                  <div class="form-group mb-3">
                    <label for="no_of_workshops">No. of Workshops</label>
                    <input type="number" id="no_of_workshops" class="form-control" v-model="no_of_workshops">
                    <small class="text-danger">{{ no_of_workshopsError }}</small>
                  </div>
                 <div class="form-group mb-3">
                    <label for="no_of_international_journals">No. of International Journals</label>
                    <input type="number" id="no_of_international_journals" class="form-control" v-model="no_of_international_journals">
                    <small class="text-danger">{{ no_of_international_journalsError }}</small>
                  </div>

                  <div class="form-group mb-3">
                    <label for="books_and_contributions">Books/Chapter Contribution (Specify Numbers):</label>
                    <textarea type="number" id="books_and_contributions" class="form-control" v-model="books_and_contributions"></textarea>
                    <small class="text-danger">{{ books_and_contributionsError }}</small>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group mb-3">
                    <label for="no_of_national_conferences">No. of National Conferences</label>
                    <input type="text" class="form-control" id="no_of_national_conferences" v-model="no_of_national_conferences" placeholder="Enter No.of National Conferences" autocomplete="conferences" >
                    <small class="text-danger">{{ no_of_national_conferencesError }}</small>
                  </div>
                  <div class="form-group mb-3">
                    <label for="no_of_seminars">No. of Seminars</label>
                    <input type="text" class="form-control" id="no_of_seminars" v-model="no_of_seminars" placeholder="Enter No.of seminars" autocomplete="seminars">
                    <small class="text-danger">{{ no_of_seminarsError }}</small>
                  </div>
                  <div class="form-group mb-3">
                    <label for="research_journals">Google Scholar/ResearchGate/Scopus Index Journals</label>
                    <textarea type="text" class="form-control" id="research_journals" v-model="research_journals" placeholder="Enter No.of National Conferences" autocomplete="journals">
                    </textarea>
                    <small class="text-danger">{{ research_journalsError }}</small>
                  </div>

                 <div class="form-group mb-3">
                    <label for="no_of_national_journals">No. of National Journals</label>
                    <input class="form-control" id="no_of_national_journals" v-model="no_of_national_journals">
                    <small class="text-danger">{{ no_of_national_journalsError }}</small>
                  </div>

                  <div class="form-group mb-3">
                    <label for="no_of_local_journal">No. of Local Journals</label>
                    <input class="form-control" id="no_of_local_journal" v-model="no_of_local_journal">
                    <small class="text-danger">{{ no_of_local_journalError }}</small>
                  </div>
                </div>
              </div>

              <h4>Attach Relevant Documents</h4>

        <div class="row">
          <div class="col-md-6">
            <div class="form-group mb-3">
            <label for="cv">Upload Resume/CV (pdf, doc.)</label>
            <div class="input-group">
                <div class="custom-file">
                    <input type="file" class="custom-file-input" id="cv" accept=".pdf,.docx" @change="handleFileUpload($event, 'cv')">
                    <label class="custom-file-label" for="cv">{{ fileInputs.find(input => input.name === 'cv').fileName || 'Choose file' }}</label>
                    <small class="text-danger">{{ cvError }}</small>
                </div>
            </div>
          </div>

            <div class="form-group mb-3">
            <label for="passport_photo">Passport Photograph (PNG, JPEG)</label>
            <div class="input-group">
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="passport_photo" accept=".jpeg,.jpg,.png" @change="handleFileUpload($event, 'passport_photo')">
                <label class="custom-file-label" for="passport_photo">{{ fileInputs.find(input => input.name === 'passport_photo').fileName || 'Choose file' }}</label>
                <small class="text-danger">{{ passport_photoError }}</small>
              </div>
            </div>
          </div>
          </div>
            
           <div class="col-md-6">

            <div class="form-group mb-3">
            <label for="cover_letter">Cover Letter (pdf, Doc.)</label>
            <div class="input-group">
              <div class="custom-file">
                 <input type="file" class="custom-file-input" id="cover_letter" accept=".pdf,.docx" @change="handleFileUpload($event, 'cover_letter')">
                    <label class="custom-file-label" for="cover_letter">{{ fileInputs.find(input => input.name === 'cover_letter').fileName || 'Choose file' }}</label>
                    <small class="text-danger">{{ letterError }}</small>
              </div>
            </div>
          </div>

          <div class="form-group mb-3">
              <!-- <div class="form-group mb-3" v-if="$route.query.jobType === 'special'"> -->
                <label for="letter_of_employment">Employment Letter from previous Ministry</label>
                <div class="input-group">
                  <div class="custom-file">
                    <input type="file" class="custom-file-input" id="letter_of_employment" accept=".pdf,.docx,.jpeg,.jpg,.png" @change="handleFileUpload($event, 'letter_of_employment')">
                    <label class="custom-file-label" for="letter_of_employment">{{ fileInputs.find(input => input.name === 'letter_of_employment').fileName || 'Choose file' }}</label>
                    <small class="text-danger">{{ letter_of_employmentError }}</small>
                  </div>
                </div>
              </div>
                </div>
              </div>             
              <div class="modal-footer justify-content-between">
                  <button type="button" class="btn btn-outline-primary" @click="previousStep" >Back</button>

                 <button type="submit" :disabled="loading" class="btn rounded btn-lg text-white" style="background-color:#00C000">
                  <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  {{ loading ? 'Submitting...' : 'Submit Application' }}
                </button>


              </div>
              </div>
            </div>
          </div>
          <div class="col-md-1"></div>
        </div>
      </div>

    </form>

  </div>
</template>


<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  computed: {
    // Retrieve faculty, department, and job title from local storage
    faculty() {
      return localStorage.getItem('faculty');
    },
    jobDepartment() {
      return localStorage.getItem('department');
    },
    jobTitle() {
      return localStorage.getItem('jobTitle');
    },
  },
  data() {
    return {
      currentStep: 1,
      loading: false,
      // Step 1 form fields
      employment_type: '',
      middlename: '',
      email: '',
      dob: '',
      nationality: '',
      local_govt: '',
      address: '',
      firstname: '',
      lastname: '',
      phone_number: '',
      gender: '',
      state_of_origin: '',
      city: '',
      job_role: this.$route.query.jobId,
      user: localStorage.getItem('user_id'),
      type: this.$route.query.job_type,

      // Step 2 form fields
      name_of_school: '',
      department: '',
      specialization: '',
      date_of_first_employment: '',
      degree: '',
      discipline: '',
      previous_employer: '',
      professional_association: '',

      // Step 3 form fields
      cv: null,
      letter_of_employment: null,
      cover_letter: null,
      passport_photo: null,
      no_of_international_conferences: '',
      no_of_local_conferences: '',
      no_of_workshops: '',
      no_of_national_journals: '',
      no_of_local_journal: '',
      research_journals: '',
      no_of_seminars: '',
      no_of_national_conferences: '',
      books_and_contributions: '',
      no_of_international_journals: '',

      fileInputs: [
        { name: 'letter_of_employment', fileName: '' },
        { name: 'cv', fileName: '' },
        { name: 'cover_letter', fileName: '' },
        { name: 'passport_photo', fileName: '' }
      ],

      // Step 1 error messages
      employment_typeError: '',
      emailError: '',
      dobError: '',
      nationalityError: '',
      lgaError: '',
      addressError: '',
      firstNameError: '',
      lastNameError: '',
      phone_numberError: '',
      genderError: '',
      stateError: '',
      cityError: '',

      // Step 2 error messages
      schoolError: '',
      departmentError: '',
      specializationError: '',
      dateOfFirstEmploymentError: '',
      degreeError: '',
      disciplineError: '',
      previous_employerError: '',
      associationMembershipError: '',

      // Step 3 error messages
      cvError: '',
      letter_of_employmentError: '',
      letterError: '',
      passport_photoError: '',
      no_of_international_conferencesError: '',
      no_of_local_conferencesError: '',
      no_of_workshopsError: '',
      no_of_national_journalsError: '',
      no_of_local_journalError: '',
      research_journalsError: '',
      no_of_seminarsError: '',
      no_of_national_conferencesError: '',
      books_and_contributionsError: '',
      no_of_international_journalsError: '',

      nationalities: [
        'Afghan', 'Albanian', 'Algerian', 'American', 'Andorran', 'Angolan', 'Antiguans', 'Argentinean', 'Armenian', 'Australian',
        'Austrian', 'Azerbaijani', 'Bahamian', 'Bahraini', 'Bangladeshi', 'Barbadian', 'Barbudans', 'Batswana', 'Belarusian',
        'Belgian', 'Belizean', 'Beninese', 'Bhutanese', 'Bolivian', 'Bosnian', 'Brazilian', 'British', 'Bruneian', 'Bulgarian',
        'Burkinabe', 'Burmese', 'Burundian', 'Cambodian', 'Cameroonian', 'Canadian', 'Cape Verdean', 'Central African', 'Chadian',
        'Chilean', 'Chinese', 'Colombian', 'Comoran', 'Congolese', 'Costa Rican', 'Croatian', 'Cuban', 'Cypriot', 'Czech',
        // Add more nationalities here
      ],
      nigeriaStates: [
        'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta',
        'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT - Abuja', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina',
        'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers',
        'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
      ],
      genders:[
        'Male', 'Femaile'
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

    // Step 1 validation logic
    isStep1Valid() {
      // Check if all required fields in step 1 are filled
      if (
        this.employment_type &&
        this.email &&
        this.dob &&
        this.nationality &&
        this.local_govt &&
        this.address &&
        this.firstname &&
        this.lastname &&
        this.phone_number &&
        this.gender &&
        this.state_of_origin &&
        this.city
      ) {
        // Reset error messages
        this.employment_typeError = '';
        this.emailError = '';
        this.dobError = '';
        this.nationalityError = '';
        this.lgaError = '';
        this.addressError = '';
        this.firstNameError = '';
        this.lastNameError = '';
        this.phone_numberError = '';
        this.genderError = '';
        this.stateError = '';
        this.cityError = '';
        return true; // All fields filled
      } else {
        // Set error messages for any unfilled required fields
        this.employment_typeError = this.employment_type && typeof this.employment_type === 'string' ? (!this.employment_type.trim() ? 'Employment type is required' : '') : 'Employment type is required';
        this.emailError = this.email && typeof this.email === 'string' ? (!this.email.trim() ? 'Email address is required' : '') : 'Email address is required';
        this.dobError = this.dob && typeof this.dob === 'string' ? (!this.dob.trim() ? 'Date of birth is required' : '') : 'Date of birth is required';
        this.nationalityError = this.nationality && typeof this.nationality === 'string' ? (!this.nationality.trim() ? 'Nationality is required' : '') : 'Nationality is required';
        this.lgaError = this.local_govt && typeof this.local_govt === 'string' ? (!this.local_govt.trim() ? 'Local Government Area is required' : '') : 'Local Government Area is required';
        this.addressError = this.address && typeof this.address === 'string' ? (!this.address.trim() ? 'Address is required' : '') : 'Address is required';
        this.firstNameError = this.firstname && typeof this.firstname === 'string' ? (!this.firstname.trim() ? 'First name is required' : '') : 'First name is required';
        this.lastNameError = this.lastname && typeof this.lastname === 'string' ? (!this.lastname.trim() ? 'Last name is required' : '') : 'Last name is required';
        this.phone_numberError = this.phone_number && typeof this.phone_number === 'string' ? (!this.phone_number.trim() ? 'Phone number is required' : '') : 'Phone number is required';
        this.genderError = this.gender && typeof this.gender === 'string' ? (!this.gender.trim() ? 'Gender is required' : '') : 'Gender is required';
        this.stateError = this.state_of_origin && typeof this.state_of_origin === 'string' ? (!this.state_of_origin.trim() ? 'State is required' : '') : 'State is required';
        this.cityError = this.city && typeof this.city === 'string' ? (!this.city.trim() ? 'City is required' : '') : 'City is required';

        return false; // Some fields are unfilled
      }
    },

   // Step 2 validation logic
isStep2Valid() {
  if (
    !this.schoolError &&
    !this.departmentError &&
    !this.specializationError &&
    !this.dateOfFirstEmploymentError &&
    !this.degreeError &&
    !this.disciplineError &&
    !this.previous_employerError &&
    !this.associationMembershipError
  ) {
    // All fields are filled, no errors
    return true;
  } else {
    // Some fields are unfilled or have errors
    // Implement validation logic for step 2 fields
    this.schoolError = (!this.name_of_school || !this.name_of_school.trim()) ? 'School name is required' : '';
    this.departmentError = (!this.department || !this.department.trim()) ? 'Department is required' : '';
    this.specializationError = (!this.specialization || !this.specialization.trim()) ? 'Specialization is required' : '';
    this.dateOfFirstEmploymentError = (!this.date_of_first_employment || !this.date_of_first_employment.trim()) ? 'Date of first employment is required' : '';
    this.degreeError = (!this.degree || !this.degree.trim()) ? 'Degree is required' : '';
    this.disciplineError = (!this.discipline || !this.discipline.trim()) ? 'Discipline is required' : '';
    this.previous_employerError = (!this.previous_employer || !this.previous_employer.trim()) ? 'Previous employer is required' : '';
    this.associationMembershipError = (!this.professional_association || !this.professional_association.trim()) ? 'Professional association membership is required' : '';

    return false;
  }
},


  // Step 3 validation logic
isStep3Valid() {
  if (
    !this.cvError &&
    !this.letter_of_employmentError &&
    !this.letterError &&
    !this.passport_photoError &&
    !this.no_of_international_conferencesError &&
    !this.no_of_international_journalsError &&
    !this.no_of_local_conferencesError &&
    !this.no_of_national_conferencesError &&
    !this.no_of_national_journalsError &&
    !this.no_of_seminarsError &&
    !this.books_and_contributionsError &&
    !this.no_of_workshopsError &&
    !this.no_of_local_journalError &&
    !this.research_journalsError
  ) {
    // All fields filled, no errors
    return true;
  } else {
    // Some fields are unfilled or have errors
    // Implement validation logic for step 3 fields
    this.cvError = (!this.cv || !this.cv.trim()) ? 'Your resume/cv is required' : '';
    this.letter_of_employmentError = (!this.letter_of_employment || !this.letter_of_employment.trim()) ? 'Your letter of employment is required' : '';
    this.letterError = (!this.cover_letter || !this.cover_letter.trim()) ? 'Your Cover letter is required' : '';
    this.passport_photoError = (!this.passport_photo || !this.passport_photo.trim()) ? 'Your Passport photograph is required' : '';
    this.no_of_international_conferencesError = (!this.no_of_international_conferences || !this.no_of_international_conferences.trim()) ? 'Number of international conferences is required' : '';
    this.no_of_local_conferencesError = (!this.no_of_local_conferences || !this.no_of_local_conferences.trim()) ? 'Number of local conferences is required' : '';
    this.no_of_workshopsError = (!this.no_of_workshops || !this.no_of_workshops.trim()) ? 'Number of workshops is required' : '';
    this.no_of_national_journalsError = (!this.no_of_national_journals || !this.no_of_national_journals.trim()) ? 'Number of national journals is required' : '';
    this.no_of_local_journalError = (!this.no_of_local_journal || !this.no_of_local_journal.trim()) ? 'Number of local journals is required' : '';
    this.research_journalsError = (!this.research_journals || !this.research_journals.trim()) ? 'Number of research journals is required' : '';
    this.no_of_seminarsError = (!this.no_of_seminars || !this.no_of_seminars.trim()) ? 'Number of seminars is required' : '';
    this.no_of_national_conferencesError = (!this.no_of_national_conferences || !this.no_of_national_conferences.trim()) ? 'Number of national conferences is required' : '';
    this.books_and_contributionsError = (!this.books_and_contributions || !this.books_and_contributions.trim()) ? 'Books and contributions is required' : '';
    this.no_of_international_journalsError = (!this.no_of_international_journals || !this.no_of_international_journals.trim()) ? 'Number of international journals is required' : '';

    return false;
  }
},


    validateStep1AndProceed() {
      if (this.isStep1Valid()) {
        this.currentStep++;
      } else {
        console.log('Step 1 is not valid');
      }
    },

    validateStep2AndProceed() {
      if (this.isStep2Valid()) {
        this.currentStep++;
      } else {
        console.log('Step 2 is not valid');
      }
    },

    previousStep() {
      this.currentStep--;
    },

    // API call to submit form data
    submitApplication() {
      // Check if all steps are valid before submitting
      if (this.isStep3Valid() && this.isStep1Valid() && this.isStep2Valid() ) {
        this.loading = true;
        const formData = new FormData();
        formData.append('job_role', this.job_role);
        formData.append('user', this.user);
        formData.append('type', this.type);
        formData.append('employment_type', this.employment_type);
        formData.append('firstname', this.firstname);
        formData.append('middlename', this.middlename);
        formData.append('lastname', this.lastname);
        formData.append('email', this.email);
        formData.append('phone_number', this.phone_number);
        formData.append('nationality', this.nationality);
        formData.append('state_of_origin', this.state_of_origin);
        formData.append('dob', this.dob);
        formData.append('gender', this.gender);
        formData.append('city', this.city);
        formData.append('address', this.address);
        formData.append('local_govt', this.local_govt);
        formData.append('name_of_school', this.name_of_school);
        formData.append('department', this.department);
        formData.append('specialization', this.specialization);
        formData.append('date_of_first_employment', this.date_of_first_employment);
        formData.append('previous_employer', this.previous_employer);
        formData.append('professional_association', this.professional_association);
        formData.append('degree', this.degree);
        formData.append('discipline', this.discipline);
        formData.append('cv', this.cv);
        formData.append('letter_of_employment', this.letter_of_employment);
        formData.append('cover_letter', this.cover_letter);
        formData.append('passport_photo', this.passport_photo);
        formData.append('no_of_international_conferences', this.no_of_international_conferences);
        formData.append('no_of_international_journals', this.no_of_international_journals);
        formData.append('no_of_local_conferences', this.no_of_local_conferences);
        formData.append('no_of_workshops', this.no_of_workshops);
        formData.append('no_of_national_journals', this.no_of_national_journals);
        formData.append('no_of_local_journal', this.no_of_local_journal);
        formData.append('research_journals', this.research_journals);
        formData.append('no_of_seminars', this.no_of_seminars);
        formData.append('no_of_national_conferences', this.no_of_national_conferences);
        formData.append('books_and_contributions', this.books_and_contributions);
        const token = localStorage.getItem('token');

        // Set up headers for the request
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        };

        // Make the API call
        axios.post('https://api.portal.akum.edu.ng/api/akum/career', formData, config)
          .then(response => {
            console.log(response.data);
            this.loading = false;
            Swal.fire({
              icon: 'success',
              title: 'Application Submitted!',
              text: 'Your application has been successfully submitted.',
              showConfirmButton: false,
              timer: 1300
            }).then(() => {
              window.location.href = '/applicantDashboard';
            });
          })
          .catch(error => {
            console.error(error);
            this.loading = false;
            Swal.fire({
              icon: 'error',
              title: 'Submission Failed',
              text: 'There was an error submitting your application. Please try again later.',
            });
          });
      } else {
        console.log('Step 3 is not valid');
      }
    }
  }
}
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


