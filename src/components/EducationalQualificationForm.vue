<template>
  <div id="login" class="container align-items-center justify-content-center mb-5" style="font-family:inter">
    <div class="row">
      <div class="col-md-1"></div>
      <div class="col-md-10">
        <h3 class="text-center mb-5" style="background-color:#EAFAF1">
          <span style="font-size:40px; font-weight:bold" class="text-success">{{ faculty }}</span><br> 
          {{ department }}
        </h3>
        <h3 class="text-center mb-3" style="font-size:30px; font-weight:500px;">{{ jobTitle }}</h3>
        <div class="card border-0 shadow" style="background-color:#EAFAF1">
          <div class="card-body">
           
          <h3 class="mb-3" style="font-size:16" >Educational Qualification</h3>
          
            <form @submit.prevent="submitApplication">
              <div class="row">
                <div class="col-md-6">
              <div class="form-group mb-3">
                <label for="name_of_school">Name of School</label>
                <input type="text" class="form-control" id="name_of_school" v-model="name_of_school" placeholder="Enter School name" required>
              </div>

               <div class="form-group mb-3">
                <label for="department">Department</label>
                <input type="text" class="form-control" id="department" v-model="department" placeholder="Enter department" required>
              </div>

              <div class="form-group mb-3">
                <label for="specialization">Specialization</label>
                <input type="text" class="form-control" id="specialization" v-model="specialization" placeholder="E.g. Enter specialization" required>
              </div>
              <div class="form-group mb-3">
                <label for="date_of_first_employment">Date of First Employment</label>
                <input type="date" class="form-control" id="date_of_first_employment" v-model="date_of_first_employment" required>
              </div>
            </div>
            <div class="col-md-6">
                <div class="form-group mb-3">
                  <label for="degree">Degree</label>
                  <input type="text" class="form-control" id="degree" v-model="degree" placeholder="E.g. Bachelor Degree" required>
                </div>
                <div class="form-group mb-3">
                  <label for="discipline">Discipline</label>
                  <input type="text" class="form-control" id="discipline" v-model="discipline" placeholder="E.g. Computer Science" required>
                </div>

              <!-- <div class="form-group mb-3" v-if="$route.query.jobType === 'special'"> -->
              <div class="form-group mb-3">                
              <label for="institution_worked_before">Previous Institution Worked</label>
                <input type="text" class="form-control" id="institution_worked_before" v-model="institution_worked_before" placeholder="Enter Institution" required>
              </div>

              <div class="form-group mb-3" >
                <label for="association_membership">Professional Associations Membership</label>
                <textarea type="text" class="form-control" id="association_membership" v-model="association_membership" placeholder="Enter Professional Association Membership" required></textarea>
              </div>
            </div>
          </div>

           <div class="modal-footer justify-content-between">
                  <button type="button" class="btn btn-outline-primary" @click="goBack" >Back</button>

                  <button type="button" class="btn btn-primary" @click="goNext" :disabled="currentStep === totalSteps">Next</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-1"></div>
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
      formData: {}, // Object to store form data
      stepsData: [], // Array to store data for each step
      scho: this.$route.query.jobId,
      user: localStorage.getItem('user_id'),
      faculty: localStorage.getItem('faculty') || '',
      department: localStorage.getItem('department') || '',
      jobTitle: localStorage.getItem('jobTitle') || '',
      loading: false,
      errors: '',
      nationality: '',
      state: '',
      lga: '',
      city: '',
      gender:'',
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
      letter: null,
      passport: null,
      fileInputs: [
        { name: 'letter_of_employment', fileName: '' },
        { name: 'cv', fileName: '' },
        { name: 'letter', fileName: '' },
        { name: 'passport', fileName: '' }
      ],

      genders:[
      'Male', 'Femaile'
      ],
      
      // Step management
      currentStep: 1,
      totalSteps: 2, // Update this value according to the total number of steps
     nationalities: [
          'Afghan', 'Albanian', 'Algerian', 'American', 'Andorran', 'Angolan', 'Antiguans', 'Argentinean', 'Armenian', 'Australian',
          'Austrian', 'Azerbaijani', 'Bahamian', 'Bahraini', 'Bangladeshi', 'Barbadian', 'Barbudans', 'Batswana', 'Belarusian',
          'Belgian', 'Belizean', 'Beninese', 'Bhutanese', 'Bolivian', 'Bosnian', 'Brazilian', 'British', 'Bruneian', 'Bulgarian',
          'Burkinabe', 'Burmese', 'Burundian', 'Cambodian', 'Cameroonian', 'Canadian', 'Cape Verdean', 'Central African', 'Chadian',
          'Chilean', 'Chinese', 'Colombian', 'Comoran', 'Congolese', 'Costa Rican', 'Croatian', 'Cuban', 'Cypriot', 'Czech',
          'Danish', 'Djibouti', 'Dominican', 'Dutch', 'East Timorese', 'Ecuadorean', 'Egyptian', 'Emirian', 'Equatorial Guinean',
          'Eritrean', 'Estonian', 'Ethiopian', 'Fijian', 'Filipino', 'Finnish', 'French', 'Gabonese', 'Gambian', 'Georgian',
          'German', 'Ghanaian', 'Greek', 'Grenadian', 'Guatemalan', 'Guyanese', 'Haitian', 'Herzegovinian', 'Honduran', 'Hungarian',
          'I-Kiribati', 'Icelander', 'Indian', 'Indonesian', 'Iranian', 'Iraqi', 'Irish', 'Israeli', 'Italian', 'Ivorian', 'Jamaican',
          'Japanese', 'Jordanian', 'Kazakhstani', 'Kenyan', 'Kittian and Nevisian', 'Kuwaiti', 'Kyrgyz', 'Laotian', 'Latvian',
          'Lebanese', 'Liberian', 'Libyan', 'Liechtensteiner', 'Lithuanian', 'Luxembourger', 'Macedonian', 'Malagasy', 'Malawian',
          'Malaysian', 'Maldivan', 'Malian', 'Maltese', 'Marshallese', 'Mauritanian', 'Mauritian', 'Mexican', 'Micronesian',
          'Moldovan', 'Monacan', 'Mongolian', 'Moroccan', 'Mosotho', 'Motswana', 'Mozambican', 'Namibian', 'Nauruan', 'Nepalese',
          'New Zealander', 'Nicaraguan', 'Nigerian', 'Nigerien', 'North Korean', 'Northern Irish', 'Norwegian', 'Omani', 'Pakistani',
          'Palauan', 'Panamanian', 'Papua New Guinean', 'Paraguayan', 'Peruvian', 'Polish', 'Portuguese', 'Qatari', 'Romanian',
          'Russian', 'Rwandan', 'Saint Lucian', 'Salvadoran', 'Samoan', 'San Marinese', 'Sao Tomean', 'Saudi', 'Scottish', 'Senegalese',
          'Serbian', 'Seychellois', 'Sierra Leonean', 'Singaporean', 'Slovakian', 'Slovenian', 'Solomon Islander', 'Somali', 'South African',
          'South Korean', 'Spanish', 'Sri Lankan', 'Sudanese', 'Surinamer', 'Swazi', 'Swedish', 'Swiss', 'Syrian', 'Taiwanese', 'Tajik',
          'Tanzanian', 'Thai', 'Togolese', 'Tongan', 'Trinidadian or Tobagonian', 'Tunisian', 'Turkish', 'Tuvaluan', 'Ugandan', 'Ukrainian',
          'Uruguayan', 'Uzbekistani', 'Venezuelan', 'Vietnamese', 'Welsh', 'Yemenite', 'Zambian', 'Zimbabwean'
        ],
        nigeriaStates: {
          'Abia': ['Aba North', 'Aba South', 'Arochukwu', 'Bende', 'Ikwuano', 'Isiala Ngwa North', 'Isiala Ngwa South', 'Isuikwuato', 'Obi Ngwa', 'Ohafia', 'Osisioma Ngwa', 'Ugwunagbo', 'Ukwa East',   'Ukwa West', 'Umuahia North', 'Umuahia South', 'Umu Nneochi'],
          'Adamawa': ['Demsa', 'Fufore', 'Ganye', 'Girei', 'Gombi', 'Guyuk', 'Hong', 'Jada', 'Lamurde', 'Madagali', 'Maiha', 'Mayo-Belwa', 'Michika', 'Mubi North', 'Mubi South', 'Numan', 'Shelleng', 'Song', 'Toungo', 'Yola North', 'Yola South'],
          'Akwa Ibom': ['Abak', 'Eastern Obolo', 'Eket', 'Esit-Eket', 'Essien Udim', 'Etim-Ekpo', 'Etinan', 'Ibeno', 'Ibesikpo-Asutan', 'Ibiono-Ibom', 'Ika', 'Ikono', 'Ikot Abasi', 'Ikot Ekpene', 'Ini', 'Itu', 'Mbo', 'Mkpat-Enin', 'Nsit-Atai', 'Nsit-Ibom', 'Nsit-Ubium', 'Obot-Akara', 'Okobo', 'Onna', 'Oron', 'Oruk Anam', 'Udung-Uko', 'Ukanafun', 'Uruan', 'Urue-Offong/Oruko', 'Uyo'],
          // Add other states and their local governments
        },
        ghanaStates: {
        'Ashanti': ['Adansi North', 'Adansi South', 'Afigya-Kwabre', 'Ahafo Ano North', 'Ahafo Ano South', 'Amansie Central', 'Amansie West', 'Asante Akim Central', 'Asante Akim North', 'Asante Akim South', 'Atwima Kwanwoma', 'Atwima Mponua', 'Atwima Nwabiagya', 'Bekwai Municipal', 'Bosome Freho', 'Bosome', 'Ahafo', 'Dormaa East', 'Dormaa Municipal', 'Dormaa West', 'Ejisu-Juaben Municipal District', 'Ejura/Sekyedumase', 'Ejura', 'Ejura Sekyedumase', 'Kumasi Metropolitan', 'Kwabre', 'Municipal District'],
        'Brong-Ahafo': ['Atebubu-Amantin', 'Banda', 'Berekum', 'Dormaa', 'Jaman North', 'Jaman South', 'Kintampo North', 'Kintampo South', 'Nkoranza North', 'Nkoranza South', 'Pru', 'Sene', 'Sunyani', 'Sunyani Municipal', 'Tain', 'Techiman', 'Techiman Municipal', 'Tano North', 'Tano South', 'Wenchi', 'Wenchi Municipal'],
        'Central': ['Abura/Asebu/Kwamankese', 'Agona East', 'Agona West Municipal District', 'Ajumako/Enyan/Essiam', 'Asikuma/Odoben/Brakwa', 'Assin North Municipal District', 'Assin South', 'Awutu-Senya', 'Cape Coast', 'Cape Coast Municipal District', 'Effutu Municipal District', 'Ekumfi', 'Gomoa East', 'Gomoa West', 'Mfantsiman Municipal District', 'Twifo-Heman/Lower Denkyira', 'Upper Denkyira East Municipal District', 'Upper Denkyira West', 'Upper Manya Krobo', 'Yilo Krobo'],
        // Add other states and their districts
      },

      states: [
        'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta',
        'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT - Abuja', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina',
        'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers',
        'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
      ], // Will be populated based on the selected nationality
      localGovernments: [] // Will be populated based on the selected state
    };
  },
  methods: {
    saveStepData() {
      this.stepsData[this.currentStep - 1] = { ...this.formData };
    },
    // Method to navigate to the previous step
    goBack() {
      if (this.currentStep > 1) {
        this.saveStepData(); // Save current step data before going back
        this.currentStep--;
        this.formData = { ...this.stepsData[this.currentStep - 1] }; // Load data for the previous step
      } else {
        // If it's the first step, navigate back to the application form
        this.$router.push({ path: '/application-form' });
      }
    },
    // Method to navigate to the next step
  // Method to navigate to the next step
  goNext() {
    this.saveStepData(); // Save current step data before proceeding
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.formData = { ...this.stepsData[this.currentStep - 1] }; // Load data for the next step
      this.$router.push({ path: '/form-c' });
    }
  },

    },
     updateStates() {
        if (this.selectedNationality === 'German') {
        this.states = ['Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT - Abuja', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'];
      } else if (this.selectedNationality === 'Ghanaian') {
        this.states = ['Ashanti', 'Brong-Ahafo', 'Central', 'Eastern', 'Greater Accra', 'Northern', 'Upper East', 'Upper West', 'Volta', 'Western'];
      }
      // Clear previously selected state and local government
      this.selectedState = '';
      this.selectedLocalGovernment = '';
    },
        updateLocalGovernments() {
      // Perform an API call or fetch data to get local governments based on the selected state
      // For demonstration purposes, let's assume we have local governments already predefined for each state
      // You would replace this with your actual implementation
      // Example:
      if (this.selectedState === 'Lagos') {
        this.localGovernments = ['Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa', 'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye', 'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland', 'Mushin', 'Ojo', 'Oshodi-Isolo', 'Shomolu', 'Surulere'];
      } else if (this.selectedState === 'Abia') {
        this.localGovernments = ['Aba North', 'Aba South', 'Arochukwu', 'Bende', 'Ikwuano', 'Isiala Ngwa North', 'Isiala Ngwa South', 'Isuikwuato', 'Obi Ngwa', 'Ohafia', 'Osisioma Ngwa', 'Ugwunagbo', 'Ukwa East', 'Ukwa West', 'Umuahia North', 'Umuahia South', 'Umu Nneochi'];
      }
      // Clear previously selected local government
      this.selectedLocalGovernment = '';
    },
    handleFileUpload(event, name) {
      const file = event.target.files[0];
      // Update the fileName property of the corresponding file input object
      this.fileInputs.find(input => input.name === name).fileName = file ? file.name : '';
      // Update the data property with the selected file
      this[name] = file;
    },

   submitApplication() {
      this.saveStepData();
      this.loading = true;
      const formData = new FormData();
      formData.append('scho', this.scho);
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
      formData.append('letter', this.letter);
      formData.append('passport', this.passport);
      const token = localStorage.getItem('token');

       const combinedData = this.stepsData.reduce((acc, stepData) => {
        return { ...acc, ...stepData };
      }, {});

      // Set up headers for the request
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      };

      axios.post(`https://api.portal.akum.edu.ng/api/akum/career`, combinedData, config)
      .then(response => {
          console.log('Application submitted successfully:', response.data);
          console.log('User ID:', this.userId);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Application submitted successfully!',
            showConfirmButton: false,
            timer: 1300
          }).then(() => {
          window.location.href = 'applicantDashboard';
        });
        })
      .catch(error => {
        console.log('formData', formData);
        console.log('letter', this.letter);
        console.log('passport', this.passport);
         console.log('letter_of_employment', this.letter_of_employment);
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
    },
    computed: {
    // Computed property to check if the current step is the first step
    isFirstStep() {
      return this.currentStep === 1;
    },
    // Computed property to check if the current step is the last step
    isLastStep() {
      return this.currentStep === this.totalSteps;
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
