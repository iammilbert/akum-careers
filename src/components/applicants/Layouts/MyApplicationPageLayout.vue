<template>
  <div style="font-family:inter">
    <Applicant_Navbar />
    <myApplications />
    <router-view />
  </div>
</template>

<script>
import Applicant_Navbar from '@/components/applicants/Applicant_Navbar.vue';
import myApplications from '@/components/applicants/myApplications.vue';


export default {
  name: 'MyApplicationPageLayout',
  components: {
    Applicant_Navbar,
    myApplications,
  }
}
</script>

<style>
/* Add any custom styles here */
</style>
