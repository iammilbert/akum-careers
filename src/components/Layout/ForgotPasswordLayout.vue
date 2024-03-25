<template>
  <div>
    <Nav_bar />
    <ForgotPassword />
    <router-view></router-view>
  </div>
</template>

<script>
import Nav_bar from '@/components/Nav_bar.vue';
import ForgotPassword from '@/components/ForgotPassword.vue';

export default {
  components: {
    Nav_bar,
    ForgotPassword,
  }
}
</script>
