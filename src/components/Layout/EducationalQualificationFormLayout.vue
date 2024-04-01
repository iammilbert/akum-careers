<template>
  <div style="font-family:inter">
  <Applicant_Navbar /> 
  <EducationalQualificationForm />
  <router-view></router-view>
  </div>
</template>

<script>
import Applicant_Navbar from '../applicants/Applicant_Navbar.vue';
import EducationalQualificationForm from '../EducationalQualificationForm.vue';

export default {
  components: {
  Applicant_Navbar, 
  EducationalQualificationForm
  }
}
</script>
