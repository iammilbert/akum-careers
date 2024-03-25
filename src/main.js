import { createApp } from 'vue'
import App from './App.vue';
import './dependency/bootstrap';
import './dependency/fontawesome';
import { createRouter, createWebHistory } from 'vue-router';
import LandingPageLayout from './components/Layout/LandingPageLayout.vue';
import ApplicationFormLayout from './components/Layout/ApplicationFormLayout.vue';
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
  //      jobTitle: route.query.title
  // })
  },

    {
    path: '/change-password',
    name:'change-password',
    component: ChangePasswordLayout,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');



