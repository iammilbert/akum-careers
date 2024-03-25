<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-white">
    <div class="container">
      <!-- Navbrand moved to the left -->
      <div class="d-flex justify-content-start">
        <router-link class="navbar-brand" to="/applicantDashboard">
          <!-- Increased size of the logo -->
          <img src="@/assets/images/Logo.png" alt="Company Logo" style="height: 50px;">
        </router-link>
      </div>

      <!-- Toggler button for collapsed navbar -->
      <button class="navbar-toggler bg-dark" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar links moved to the right -->
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link active" to="/applicantDashboard">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/myApplication">My Job Application</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="#">Job Alerts</router-link>
          </li>
          <li class="nav-item mr-5">
            <router-link class="nav-link" to="#">Help Centre</router-link>
          </li>

          <!-- Notification dropdown -->
          <li class="nav-item mr-2 dropdown mb-2" style="height:100%">
            <button class="btn btn-lg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="background-color:#F2F2F2">
              <i class="bi bi-bell-fill"></i>
              
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <!-- <router-link v-for="(notification, index) in notifications" :key="index" :to="notification.link" class="dropdown-item">{{ notification.title }}</router-link> -->
            </div>
          </li>

          <!-- User dropdown -->
          <li class="nav-item dropdown">
            <button class="btn dropdown-toggle" type="button" id="userDropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="background-color:#F2F2F2">
              <img src="@/assets/profile_images/avarta.jpg" alt="User" class="rounded-circle" style="width: 32px; height: 100%; margin-right: 5px;">
            </button>
            <div class="dropdown-menu" aria-labelledby="userDropdownMenuButton">
              <router-link to="#" class="dropdown-item">Settings</router-link>
              <hr>
              <router-link to="/change-password" class="dropdown-item">Change Password</router-link>
              <hr>
              <a @click="logout" class="dropdown-item">Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Applicant_Navbar',
  data() {
    return {
      // notifications: [
      //   { title: 'Notification 1', link: '/notification/1' },
      //   { title: 'Notification 2', link: '/notification/2' },
      //   // Add more notifications as needed
      // ],
    };
  },

    methods: {
    logout() {
      // Perform logout actions here, such as clearing session data, redirecting to login page, etc.
      // For example, you can clear local storage:
      localStorage.removeItem('user');
      // Then redirect to login page:
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
/* Add any custom styles here */
.navbar {
  background-color: #343a40; /* Dark background color */
}

.navbar-dark .navbar-nav .nav-link {
  color: black; /* Light text color */
  font-family: 'Times New Roman', Times, serif;
  cursor: pointer;
}

/* Style for login button */
.navbar-nav .btn-dark {
  margin-left: 10px; /* Adjust margin for spacing */
}

/* Style for logout link */
.dropdown-item {
  cursor: pointer; /* Change cursor to pointer (hand) */
}
</style>
