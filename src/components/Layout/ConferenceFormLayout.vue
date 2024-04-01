<template>
  <div style="font-family:inter">
  <Applicant_Navbar /> 
  <ConferenceForm />
  <router-view></router-view>
  </div>
</template>

<script>
import Applicant_Navbar from '../applicants/Applicant_Navbar.vue';
import ConferenceForm from '../ConferenceForm.vue';

export default {
  components: {
  Applicant_Navbar, 
  ConferenceForm
  }
}
</script>
