<template>
  <div class="container">
    <div class="input-group mb-3 mt-5">
      <div>
        <h3>Hello;</h3>
        <input type="hidden" v-model="user_id" id="user_id">
        <h6>{{ welcomeMessage }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_id: localStorage.getItem('user_id'),
      loading: true
    };
  },
  computed: {
    welcomeMessage() {
      return "Welcome to your Dashboard. Check out what's happening";
    }
  }
};
</script>
