import { createApp } from 'vue'
import App from './App.vue';
import './dependency/bootstrap';
import './dependency/fontawesome';
import vueCountriesCities from "vue-countries-cities";
import { createRouter, createWebHistory } from 'vue-router';
import LandingPageLayout from './components/Layout/LandingPageLayout.vue';
import ApplicationFormLayout from './components/Layout/ApplicationFormLayout.vue';
import ConferenceFormLayout from './components/Layout/ConferenceFormLayout.vue';
import EducationalQualificationFormLayout from './components/Layout/EducationalQualificationFormLayout.vue';
import MyApplicationPageLayout from './components/applicants/Layouts/MyApplicationPageLayout.vue';
import LoginPageLayout from './components/Layout/LoginPageLayout.vue';
import ForgotPasswordLayout from './components/Layout/ForgotPasswordLayout.vue';
import ChangePasswordLayout from './components/applicants/Layouts/ChangePasswordLayout.vue';
import ResetPasswordLayout from './components/Layout/ResetPasswordLayout.vue';
import ApplicantDashboard from '@/components/applicants/Applicant_dashboard.vue';


const routes = [
  { 
    path: '/',
    component: LandingPageLayout, // Use the LandingPageLayout for the landing page
  },

  { 
    path: '/login',
    name: 'login',
    component: LoginPageLayout,
  },

    { 
    path: '/forgotPassword',
    component: ForgotPasswordLayout, 
  },

  { 
    path: '/resetPassword',
    component: ResetPasswordLayout, 
  },

  { 
    path: '/applicantDashboard', 
    name: 'Dashboard', 
    component: ApplicantDashboard,
  },

  {
    path: '/myapplication',
    component: MyApplicationPageLayout,
  },

  {
    path: '/application-form',
    name:'applicationForm',
    component: ApplicationFormLayout,
  //     props: route => ({
  //      department: route.query.dept,
  //      faculty: route.query.faculty,
  //      jobTitle: route.query.title,
  //      job_type: route.query.job_type
  // })
  },

    {
    path: '/change-password',
    name:'change-password',
    component: ChangePasswordLayout,
  },

  {
    path: '/form-b',
    name:'education-form',
    component: EducationalQualificationFormLayout,
  },
    {
    path: '/form-c',
    name:'conference-form',
    component: ConferenceFormLayout,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.component("vueCountriesCities", vueCountriesCities);
app.use(router);
app.mount('#app');



