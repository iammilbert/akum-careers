<template>
  <div style="font-family:inter">
    <Applicant_Navbar />
    <ChangePassword />
    <router-view />
  </div>
</template>

<script>
import Applicant_Navbar from '@/components/applicants/Applicant_Navbar.vue';
import ChangePassword from '@/components/applicants/ChangePassword.vue';


export default {
  name: 'ChangePasswordLayout',
  components: {
    Applicant_Navbar,
    ChangePassword,
  }
}
</script>

<style>
/* Add any custom styles here */
</style>
