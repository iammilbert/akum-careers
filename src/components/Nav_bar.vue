<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-white">
    <div :class="containerClasses" style="font-family:inter">
      <div class="d-flex justify-content-start">
        <router-link class="navbar-brand" to="/">
          <img src="@/assets/images/Logo.png" alt="Company Logo" style="height: 50px;">
        </router-link>
      </div>

      <button class="navbar-toggler bg-dark" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link active" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="#">Area of work</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="#">Location</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="#">Success Stories</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="#">FAQ</router-link>
          </li>
        </ul>
      </div>


      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <button class="btn btn-sm" style="background-color:#00C000;">
              <router-link to="/login" class="nav-link text-white">
                <i class="fas fa-sign-in"></i> Login
              </router-link>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav_bar',

  computed: {
    containerClasses() {
      return {
        'container-fluid': this.isLargeScreen || this.isTabletScreen,
        'pl-5': this.isLargeScreen,
        'pr-5': this.isLargeScreen
      };
    },

    isLargeScreen() {
      return window.innerWidth >= 992; // Bootstrap md breakpoint
    },
    isTabletScreen() {
      return window.innerWidth < 992; // Bootstrap sm breakpoint
    }
}
}
</script>

<style scoped>
.navbar {
  background-color: #343a40; /* Dark background color */
}

.navbar-dark .navbar-nav .nav-link {
  color: #131212; /* Light text color */
  font-family: 'inter';
  cursor: pointer;
}
</style>
