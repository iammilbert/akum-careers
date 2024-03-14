<template>
  <div class="container">
    <div class="input-group mb-3 mt-5">
      <div>
        <h3>Hello {{ displayName }};</h3>
        <h6>{{ welcomeMessage }}</h6>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      userName: '',
      userEmail: '',
      user: {
      }
    };
  },
  mounted() {
    this.fetchUserInfo();
  },
  methods: {
    async fetchUserInfo() {
      const token = localStorage.getItem('token');
      if (!token) {
        // Handle case when token is not available
        return;
      }

      try {
        const response = await axios.get('https://api.portal.akum.edu.ng/api/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Assuming the backend returns the user's name in the 'name' field
        // and email in the 'email' field
        this.userName = response.data.firstname;
        this.userEmail = response.data.email;
      } catch (error) {
        console.error('Error fetching user info:', error);
        // Handle error fetching user info
      }
    }
  },
  computed: {
    displayName() {
      return this.userName || this.userEmail
    },
    welcomeMessage() {
      return "Welcome to your Dashboard. Check out what's happening";
    }
  }
};
</script>