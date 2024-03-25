<template>
  <div style="font-family:inter">
  <Applicant_Navbar /> 
  <ApplicationForm />
  <router-view></router-view>
  </div>
</template>

<script>
import Applicant_Navbar from '../applicants/Applicant_Navbar.vue';
import ApplicationForm from '../ApplicationForm.vue';

export default {
  components: {
  Applicant_Navbar, 
  ApplicationForm
  }
}
</script>
