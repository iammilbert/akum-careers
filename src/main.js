import { createApp } from 'vue'
import App from './App.vue';
import './dependency/bootstrap';
import './dependency/fontawesome';
import { createRouter, createWebHistory } from 'vue-router';
import LandingPageLayout from './components/Layout/LandingPageLayout.vue';
import ApplicationFormLayout from './components/Layout/ApplicationFormLayout.vue';
import MyApplicationPageLayout from './components/applicants/Layouts/MyApplicationPageLayout.vue';
import LoginPageLayout from './components/Layout/LoginPageLayout.vue';
import ApplicantDashboard from '@/components/applicants/Applicant_dashboard.vue';


const routes = [
  { 
    path: '/',
    component: LandingPageLayout, // Use the LandingPageLayout for the landing page
  },

  { 
    path: '/loginForm',
    component: LoginPageLayout, // Use the LoginPageLayout for the landing page
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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');
