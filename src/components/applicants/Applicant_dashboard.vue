<template>
  <div>
    <Applicant_Navbar />
    <welcome_message />
    <dashboard_job_search />
    <router-view />
  </div>
</template>

<script>
import Applicant_Navbar from '@/components/applicants/Applicant_Navbar.vue';
import dashboard_job_search from '@/components/applicants/dashboard_job_search';
import welcome_message from '@/components/applicants/welcome_message.vue';


export default {
  name: 'Applicant_dashboard',
  components: {
    Applicant_Navbar,
    welcome_message,
    dashboard_job_search,
  }
}
</script>

<style>
/* Add any custom styles here */
</style>
