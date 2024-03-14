<template>
  <div>
    <Applicant_Navbar />
    <welcome_message />
    <Job_search />
    <dashboard_jobs />
    <router-view />
  </div>
</template>

<script>
import Applicant_Navbar from '@/components/applicants/Applicant_Navbar.vue';
import dashboard_jobs from '@/components/applicants/dashboard_jobs.vue';
import Job_search from '@/components/applicants/Job_search';
import welcome_message from '@/components/applicants/welcome_message.vue';


export default {
  name: 'Applicant_dashboard',
  components: {
    Applicant_Navbar,
    welcome_message,
    Job_search,
    dashboard_jobs,
  }
}
</script>

<style>
/* Add any custom styles here */
</style>
