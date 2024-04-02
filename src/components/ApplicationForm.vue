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
          <div v-if="currentStep==1" class="progress-bar" role="progressbar" :style="{ width: (0 * 33.33) + '%' }" aria-valuenow="currentStep * 33.33" aria-valuemin="0" aria-valuemax="100">{{ (currentStep * 33.33).toFixed(2) }}%</div>

          <div v-if="currentStep===3" class="progress-bar" role="progressbar" :style="{ width: (currentStep * 33.33) + '%' }" aria-valuenow="currentStep * 33.33" aria-valuemin="0" aria-valuemax="100">{{ (currentStep * 33.33).toFixed(2) }}%</div>

          <div v-if="currentStep===2" class="progress-bar" role="progressbar" :style="{ width: (currentStep * 33.33) + '%' }" aria-valuenow="currentStep * 33.33" aria-valuemin="0" aria-valuemax="100">{{ (currentStep * 33.33).toFixed(2) }}%</div>
        </div>
      </div>
      <div class="col-md-1"></div>
    </div>

    <!-- Single form for all steps -->
    <form @submit.prevent="validateAndProceed">

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
                    <small class="text-danger" v-if="employment_typeError">{{ employment_typeError }}</small> 
                  </div>
                  <div class="form-group mb-3">
                    <label for="middlename">Middle Name</label>
                    <input type="text" class="form-control" id="middlename" v-model="middlename" placeholder="Enter your middle name" autocomplete="middle name">
                  </div>
                  <div class="form-group mb-3">
                    <label for="email">Email Address</label>
                    <input type="email" class="form-control" id="email" v-model="email" placeholder="e.g. admin@example.com" autocomplete="email">
                     <small class="text-danger" v-if="emailError">{{ emailError }}</small> 
                  </div>
                  <div class="form-group mb-3">
                    <label for="dob">Date of Birth</label>
                    <input type="date" class="form-control" id="dob" v-model="dob" autocomplete="date">
                     <small class="text-danger" v-if="dobError">{{ dobError }}</small> 
                  </div>

                  <div class="form-group mb-3">
                    <label for="nationality">Nationality</label>
                    <select class="form-control" id="nationality" v-model="nationality" @change="updateStates" >
                      <option value="" disabled selected>Select Nationality</option>
                      <option v-for="nationality in nationalities" :key="nationality" :value="nationality">{{ nationality }}</option>
                    </select>
                     <small class="text-danger" v-if="nationalityError">{{ nationalityError }}</small> 
                  </div>
                  <div class="form-group mb-3">
                    <label for="local_govt">Local Government</label>
                    <input type="text" class="form-control" id="local_govt" v-model="local_govt" placeholder="Enter Local Govt">
                    <small class="text-danger" v-if="lgaError">{{ lgaError }}</small> 
                  </div>
                  
                  <div class="form-group mb-3">
                    <label for="address">Address</label>
                    <textarea v-model="address" class="form-control" placeholder="Enter Address"></textarea>
                    <small class="text-danger" v-if="addressError">{{ addressError }}</small> 
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group mb-3">
                    <label for="psn_number">PSN Number</label>
                    <input type="text" class="form-control" id="psn_number" v-model="psn_number" placeholder="Enter your PSN number" autocomplete="PSN Number">
                    <small class="text-danger" v-if="psn_numberError">{{ psn_numberError }}</small> 
                  </div>
                  <div class="form-group mb-3">
                    <label for="firstname">First Name</label>
                    <input type="text" class="form-control" id="firstname" v-model="firstname" placeholder="Enter your first name" autocomplete="first name">
                    <small class="text-danger" v-if="firstNameError">{{ firstNameError }}</small> 
                  </div>
                  <div class="form-group mb-3">
                    <label for="lastname">Last Name</label>
                    <input type="text" class="form-control" id="lastname" v-model="lastname" placeholder="Enter your last name" autocomplete="last name">
                    <small class="text-danger" v-if="lastNameError">{{ lastNameError }}</small> 
                  </div>
                  <div class="form-group mb-3">
                    <label for="phone_number">Phone number</label>
                    <input type="tel" class="form-control" id="phone_number" v-model="phone_number" placeholder="08162198753" autocomplete="phone number">
                    <small class="text-danger" v-if="phone_numberError">{{ phone_numberError }}</small> 
                  </div>

                 <div class="form-group mb-3">
                    <label for="gender">Gender</label>
                    <select class="form-control" id="gender" v-model="gender" @change="updateLocalGovernments" >
                      <option value="" disabled selected>Select Gender</option>
                      <option v-for="gender in genders" :key="gender" :value="gender">{{ gender }}</option>
                    </select>
                    <small class="text-danger" v-if="genderError">{{ genderError }}</small>
                    
                  </div>

                  <div class="form-group mb-3">
                    <label for="state_of_origin">State</label>
                    <select class="form-control" id="state" v-model="state_of_origin" >
                      <option value="" disabled selected>Select State</option>
                      <option v-for="state in nigeriaStates" :key="state" :value="state">{{ state }}</option>
                    </select>
                    <small class="text-danger" v-if="stateError">{{ stateError }}</small>
                  </div>

                  <div class="form-group mb-3">
                    <label for="city">City</label>
                    <input type="text" class="form-control" id="city" v-model="city" placeholder="Enter City" >
                    <small class="text-danger" v-if="cityError">{{ cityError}}</small>
                  </div>
                </div>
              </div>
                <!-- Add more Step 1 fields here -->
              </div>
              <div class="modal-footer justify-content-between">
                     <router-link :to="{ path: '/applicantDashboard' }" class="btn btn-outline-primary">Back</router-link>
                    <button type="submit" @click="validateStep1AndProceed()" class="btn btn-primary">Next</button>
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
                 <small class="text-danger" v-if="schoolError">{{ schoolError }}</small>
              </div>

               <div class="form-group mb-3">
                <label for="department">Department</label>
                <input type="text" class="form-control" id="department" v-model="department" placeholder="Enter department">
                <small class="text-danger" v-if="departmentError">{{ departmentError }}</small>
              </div>

              <div class="form-group mb-3">
                <label for="specialization">Specialization</label>
                <input type="text" class="form-control" id="specialization" v-model="specialization" placeholder="E.g. Enter specialization">
                 <small class="text-danger" v-if="specializationError">{{ specializationError }}</small>
              </div>
              <div class="form-group mb-3">
                <label for="date_of_first_employment">Date of First Employment</label>
                <input type="date" class="form-control" id="date_of_first_employment" v-model="date_of_first_employment">
                 <small class="text-danger" v-if="dateOfFirstEmploymentError">{{ dateOfFirstEmploymentError }}</small>
              </div>
            </div>
            <div class="col-md-6">
                <div class="form-group mb-3">
                  <label for="degree">Degree</label>
                  <input type="text" class="form-control" id="degree" v-model="degree" placeholder="E.g. Bachelor Degree">
                   <small class="text-danger" v-if="degreeError">{{ degreeError }}</small>
                </div>
                <div class="form-group mb-3">
                  <label for="discipline">Discipline</label>
                  <input type="text" class="form-control" id="discipline" v-model="discipline" placeholder="E.g. Computer Science">
                   <small class="text-danger" v-if="disciplineError">{{ disciplineError }}</small>
                </div>

              <!-- <div class="form-group mb-3" v-if="$route.query.jobType === 'special'"> -->
              <div class="form-group mb-3">                
              <label for="previous_employer">Previous Employer/Institution</label>
                <input type="text" class="form-control" id="previous_employer" v-model="previous_employer" placeholder="Enter Institution">
                 <small class="text-danger" v-if="previous_employerError">{{ previous_employerError }}</small>
              </div>

              <div class="form-group mb-3" >
                <label for="professional_association">Professional Associations Membership</label>
                <textarea type="text" class="form-control" id="professional_association" v-model="professional_association" placeholder="Enter Professional Association Membership" ></textarea>
                 <small class="text-danger" v-if="associationMembershipError">{{ associationMembershipError }}</small>
              </div>
            </div>
          </div>

           <div class="modal-footer justify-content-between">
                  <button type="button" class="btn btn-outline-primary" @click="previousStep" >Previous</button>

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
                     <small class="text-danger" v-if="no_of_international_conferencesError">{{ no_of_international_conferencesError }}</small>
                    </div>
                  <div class="form-group mb-3">
                    <label for="no_of_local_conferences">No. of Local Conference</label>
                    <input type="number" id="no_of_local_conferences" class="form-control" v-model="no_of_local_conferences">
                    <small class="text-danger" v-if="no_of_local_conferencesError">{{ no_of_local_conferencesError }}</small>
                  </div>
                  <div class="form-group mb-3">
                    <label for="no_of_workshops">No. of Workshops</label>
                    <input type="number" id="no_of_workshops" class="form-control" v-model="no_of_workshops">
                    <small class="text-danger" v-if="no_of_workshopsError">{{ no_of_workshopsError }}</small>
                  </div>
                 <div class="form-group mb-3">
                    <label for="no_of_international_journals">No. of International Journals</label>
                    <input type="number" id="no_of_international_journals" class="form-control" v-model="no_of_international_journals">
                    <small class="text-danger" v-if="no_of_international_journalsError">{{ no_of_international_journalsError }}</small>
                  </div>

                  <div class="form-group mb-3">
                    <label for="books_and_contributions">Books/Chapter Contribution (Specify Numbers):</label>
                    <textarea type="number" id="books_and_contributions" class="form-control" v-model="books_and_contributions"></textarea>
                    <small class="text-danger" v-if="books_and_contributionsError">{{ books_and_contributionsError }}</small>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group mb-3">
                    <label for="no_of_national_conferences">No. of National Conferences</label>
                    <input type="text" class="form-control" id="no_of_national_conferences" v-model="no_of_national_conferences" placeholder="Enter No.of National Conferences" autocomplete="conferences" >
                    <small class="text-danger" v-if="no_of_national_conferencesError">{{ no_of_national_conferencesError }}</small>
                  </div>
                  <div class="form-group mb-3">
                    <label for="no_of_seminars">No. of Seminars</label>
                    <input type="text" class="form-control" id="no_of_seminars" v-model="no_of_seminars" placeholder="Enter No.of seminars" autocomplete="seminars">
                    <small class="text-danger" v-if="no_of_seminarsError">{{ no_of_seminarsError }}</small>
                  </div>
                  <div class="form-group mb-3">
                    <label for="research_journals">Google Scholar/ResearchGate/Scopus Index Journals</label>
                    <textarea type="text" class="form-control" id="research_journals" v-model="research_journals" placeholder="Enter No.of National Conferences" autocomplete="journals">
                    </textarea>
                    <small class="text-danger" v-if="research_journalsError">{{ research_journalsError }}</small>
                  </div>

                 <div class="form-group mb-3">
                    <label for="no_of_national_journals">No. of National Journals</label>
                    <input class="form-control" id="no_of_national_journals" v-model="no_of_national_journals">
                    <small class="text-danger" v-if="no_of_national_journalsError">{{ no_of_national_journalsError }}</small>
                  </div>

                  <div class="form-group mb-3">
                    <label for="no_of_local_journal">No. of Local Journals</label>
                    <input class="form-control" id="no_of_local_journal" v-model="no_of_local_journal">
                    <small class="text-danger" v-if="no_of_local_journalError">{{ no_of_local_journalError }}</small>
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
                    <input type="file" class="custom-file-input" id="cv" accept=".pdf,.docx" @change="handleFileUpload($event, 'cv')" required>
                    <label class="custom-file-label" for="cv">{{ fileInputs.find(input => input.name === 'cv').fileName || 'Choose file' }}</label>
                    <small class="text-danger" v-if="cvError">{{ cvError }}</small>
                </div>
            </div>
          </div>

            <div class="form-group mb-3">
            <label for="passport_photo">Passport Photograph (PNG, JPEG)</label>
            <div class="input-group">
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="passport_photo" accept=".jpeg,.jpg,.png" @change="handleFileUpload($event, 'passport_photo')" required>
                <label class="custom-file-label" for="passport_photo">{{ fileInputs.find(input => input.name === 'passport_photo').fileName || 'Choose file' }}</label>
                <small class="text-danger" v-if="passport_photoError">{{ passport_photoError }}</small>
              </div>
            </div>
          </div>
          </div>
            
           <div class="col-md-6">

            <div class="form-group mb-3">
            <label for="cover_letter">Cover Letter (pdf, Doc.)</label>
            <div class="input-group">
              <div class="custom-file">
                 <input type="file" class="custom-file-input" id="cover_letter" accept=".pdf,.docx" @change="handleFileUpload($event, 'cover_letter')" required>
                    <label class="custom-file-label" for="cover_letter">{{ fileInputs.find(input => input.name === 'cover_letter').fileName || 'Choose file' }}</label>
                    <small class="text-danger" v-if="letterError">{{ letterError }}</small>
              </div>
            </div>
          </div>

          <div class="form-group mb-3">
              <!-- <div class="form-group mb-3" v-if="$route.query.jobType === 'special'"> -->
                <label for="letter_of_employment">Employment Letter from previous Ministry</label>
                <div class="input-group">
                  <div class="custom-file">
                    <input type="file" class="custom-file-input" id="letter_of_employment" accept=".pdf,.docx,.jpeg,.jpg,.png" @change="handleFileUpload($event, 'letter_of_employment')" required>
                    <label class="custom-file-label" for="letter_of_employment">{{ fileInputs.find(input => input.name === 'letter_of_employment').fileName || 'Choose file' }}</label>
                    <small class="text-danger" v-if="letter_of_employmentError">{{ letter_of_employmentError }}</small>
                  </div>
                </div>
              </div>
                </div>
              </div>             
              <div class="modal-footer justify-content-between">

                <button type="button" class="btn btn-outline-primary" @click="previousStep" v-if="currentStep > 1">Previous</button>
    
                 <button type="submit" :disabled="loading" class="btn rounded btn-lg text-white" style="background-color:#00C000" @click="validateAndProceed">
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
      hasApplied: false,
      jobs: [],
      // Step 1 form fields
      employment_type: '',
      psn_number: '',
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
      psn_numberError: '',
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
      // Additional nationalities
      'Djibouti', 'Dominican', 'Dutch', 'East Timorese', 'Ecuadorean', 'Egyptian', 'Emirian', 'Equatorial Guinean', 'Eritrean', 'Estonian',
      'Ethiopian', 'Fijian', 'Filipino', 'Finnish', 'French', 'Gabonese', 'Gambian', 'Georgian', 'German', 'Ghanaian',
      'Greek', 'Grenadian', 'Guatemalan', 'Guinea-Bissauan', 'Guinean', 'Guyanese', 'Haitian', 'Herzegovinian', 'Honduran', 'Hungarian',
      'I-Kiribati', 'Icelander', 'Indian', 'Indonesian', 'Iranian', 'Iraqi', 'Irish', 'Israeli', 'Italian', 'Ivorian',
      'Jamaican', 'Japanese', 'Jordanian', 'Kazakhstani', 'Kenyan', 'Kittian and Nevisian', 'Kuwaiti', 'Kyrgyz', 'Laotian', 'Latvian',
      'Lebanese', 'Liberian', 'Libyan', 'Liechtensteiner', 'Lithuanian', 'Luxembourger', 'Macedonian', 'Malagasy', 'Malawian', 'Malaysian',
      'Maldivan', 'Malian', 'Maltese', 'Marshallese', 'Mauritanian', 'Mauritian', 'Mexican', 'Micronesian', 'Moldovan', 'Monacan',
      'Mongolian', 'Montenegrin', 'Moroccan', 'Mosotho', 'Motswana', 'Mozambican', 'Namibian', 'Nauruan', 'Nepalese', 'New Zealander',
      'Nicaraguan', 'Nigerian', 'Nigerien', 'North Korean', 'Northern Irish', 'Norwegian', 'Omani', 'Pakistani', 'Palauan', 'Panamanian',
      'Papua New Guinean', 'Paraguayan', 'Peruvian', 'Polish', 'Portuguese', 'Qatari', 'Romanian', 'Russian', 'Rwandan', 'Saint Lucian',
      'Salvadoran', 'Samoan', 'San Marinese', 'Sao Tomean', 'Saudi', 'Scottish', 'Senegalese', 'Serbian', 'Seychellois', 'Sierra Leonean',
      'Singaporean', 'Slovakian', 'Slovenian', 'Solomon Islander', 'Somali', 'South African', 'South Korean', 'Spanish', 'Sri Lankan',
      'Sudanese', 'Surinamer', 'Swazi', 'Swedish', 'Swiss', 'Syrian', 'Taiwanese', 'Tajik', 'Tanzanian', 'Thai', 'Togolese',
      'Tongan', 'Trinidadian or Tobagonian', 'Tunisian', 'Turkish', 'Tuvaluan', 'Ugandan', 'Ukrainian', 'Uruguayan', 'Uzbekistani', 'Venezuelan',
      'Vietnamese', 'Welsh', 'Yemenite', 'Zambian', 'Zimbabwean'
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

     validateStep1AndProceed() {
      // Reset all error messages
      this.resetStep1Errors();

      // Perform validation for each field
      if (!this.employment_type) {
        this.employment_typeError = 'Employment type is required';
        return;
      }
      if (!this.psn_number) {
        this.psn_numberError = 'PSN number type is required';
        return;
      }
      if (!this.firstname) {
        this.firstNameError = 'First name is required';
        return;
      }
      if (!this.email) {
        this.emailError = 'Email address is required';
        return;
      }
      if (!this.dob) {
        this.dobError = 'Date of birth is required';
        return;
      }
      if (!this.nationality) {
        this.nationalityError = 'Nationality is required';
        return;
      }
      if (!this.local_govt) {
        this.lgaError = 'Local government is required';
        return;
      }
      if (!this.address) {
        this.addressError = 'Address is required';
        return;
      }
      if (!this.lastname) {
        this.lastnameError = 'Last name is required';
        return;
      }
      if (!this.phone_number) {
        this.phone_numberError = 'Phone number is required';
        return;
      }
      if (!this.gender) {
        this.genderError = 'Gender is required';
        return;
      }
      if (!this.state_of_origin) {
        this.stateError = 'State is required';
        return;
      }
      if (!this.city) {
        this.cityError = 'City is required';
        return;
      }

      // If all validations pass, proceed to the next step
      this.currentStep++;
    },
    // Method to reset Step 1 error messages
    resetStep1Errors() {
      this.employment_typeError = '';
      this.psn_numberError = '',
      this.firstNameError = '';
      this.emailError = '';
      this.dobError = '';
      this.nationalityError = '';
      this.lgaError = '';
      this.addressError = '';
      this.lastnameError = '';
      this.phone_numberError = '';
      this.genderError = '';
      this.stateError = '';
      this.cityError = '';
      // Reset other error messages for Step 1
    },



    validateStep2AndProceed() {
      // Reset all error messages
      this.resetStep2Errors();

      // Perform validation for each field
      if (!this.name_of_school) {
        this.schoolError = 'Name of school is required';
        return;
      }
      if (!this.department) {
        this.departmentError = 'Department is required';
        return;
      }
      if (!this.specialization) {
        this.specializationError = 'Specialization is required';
        return;
      }
      if (!this.date_of_first_employment) {
        this.dateOfFirstEmploymentError = 'Date of first employment is required';
        return;
      }
      if (!this.degree) {
        this.degreeError = 'Degree is required';
        return;
      }
      if (!this.discipline) {
        this.disciplineError = 'Discipline is required';
        return;
      }
      if (!this.previous_employer) {
        this.previous_employerError = 'Previous employer/institution is required';
        return;
      }
      if (!this.professional_association) {
        this.associationMembershipError = 'Professional association membership is required';
        return;
      }

      // If all validations pass, proceed to the next step
      this.currentStep++;
    },
    // Method to reset Step 2 error messages
    resetStep2Errors() {
      this.schoolError = '';
      this.departmentError = '';
      this.specializationError = '';
      this.dateOfFirstEmploymentError = '';
      this.degreeError = '';
      this.disciplineError = '';
      this.previous_employerError = '';
      this.associationMembershipError = '';
      // Reset other error messages for Step 2
    },
    // Add other methods as needed

   validateAndProceed() {
      // Reset all error messages
      this.resetStep3Errors();

      // Perform validation for each field
      if (!this.no_of_international_conferences) {
        this.no_of_international_conferencesError = 'Number of international conferences is required';
        return;
      }
      if (!this.no_of_local_conferences) {
        this.no_of_local_conferencesError = 'Number of local conferences is required';
        return;
      }
      if (!this.no_of_workshops) {
        this.no_of_workshopsError = 'Number of workshops is required';
        return;
      }
      if (!this.no_of_international_journals) {
        this.no_of_international_journalsError = 'Number of international journals is required';
        return;
      }
      if (!this.books_and_contributions) {
        this.books_and_contributionsError = 'Books/chapter contribution is required';
        return;
      }
      if (!this.no_of_national_conferences) {
        this.no_of_national_conferencesError = 'Number of national conferences is required';
        return;
      }
      if (!this.no_of_seminars) {
        this.no_of_seminarsError = 'Number of seminars is required';
        return;
      }
      if (!this.research_journals) {
        this.research_journalsError = 'Research journals information is required';
        return;
      }
      if (!this.no_of_national_journals) {
        this.no_of_national_journalsError = 'Number of national journals is required';
        return;
      }
      if (!this.no_of_local_journal) {
        this.no_of_local_journalError = 'Number of local journals is required';
        return;
      }
      if (!this.cv) {
        this.cvError = 'Resume/CV is required';
        return;
      }
      if (!this.passport_photo) {
        this.passport_photoError = 'Passport photograph is required';
        return;
      }
      if (!this.cover_letter) {
        this.letterError = 'Cover letter is required';
        return;
      }
      if (!this.letter_of_employment) {
        this.letter_of_employmentError = 'Employment letter is required';
        return;
      }

      this.submitApplication();
    },
    // Method to reset Step 3 error messages
    resetStep3Errors() {
      this.no_of_international_conferencesError = '';
      this.no_of_local_conferencesError = '';
      this.no_of_workshopsError = '';
      this.no_of_international_journalsError = '';
      this.books_and_contributionsError = '';
      this.no_of_national_conferencesError = '';
      this.no_of_seminarsError = '';
      this.research_journalsError = '';
      this.no_of_national_journalsError = '';
      this.no_of_local_journalError = '';
      this.cvError = '';
      this.passport_photoError = '';
      this.letterError = '';
      this.letter_of_employmentError = '';
      // Reset other error messages for Step 3
    },
    // Add other methods as needed

    handleFileUpload(event, name) {
      const file = event.target.files[0];
      // Update the fileName property of the corresponding file input object
      this.fileInputs.find(input => input.name === name).fileName = file ? file.name : '';
      // Update the data property with the selected file
      this[name] = file;
    },

  previousStep() {
      this.currentStep--;
    },

    

     submitApplication() {
      // Check if all steps are valid before submitting
      if (this.currentStep === 3) {
        this.loading = true;
        const formData = new FormData();
        formData.append('job_role', this.job_role);
        formData.append('user', this.user);
        formData.append('type', this.type);
        formData.append('psn_number', this.psn_number);
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
             const errorMessage = error.response ? error.response.data.message : 'Unknown error occurred';
            Swal.fire({
              icon: 'error',
              title: 'Submission Failed',
              text: errorMessage,
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


