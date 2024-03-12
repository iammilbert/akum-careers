<template>
  <div class="container">
    <div class="input-group mb-3 mt-5">
      <div>
        <h3>{{ greeting }}</h3>
        <h6>{{ welcomeMessage }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        firstName: "John",
        lastName: "Doe"
      }
    };
  },
  computed: {
    greeting() {
      return `Hello ${this.user.firstName} ${this.user.lastName}`;
    },
    welcomeMessage() {
      return "Welcome to your Dashboard. Check out what's happening";
    }
  }
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>
